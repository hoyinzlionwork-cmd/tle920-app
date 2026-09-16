/* 離線快取。策略：有網路就拿最新版（最多等 3 秒），沒網路或太慢就用快取。
 * 山上訊號時有時無，純 cache-first 會讓更新永遠推不上去，純 network-first 又會在
 * 訊號微弱時卡住畫面——所以取中間：先問網路、限時、失敗退快取、成功就順手更新快取。
 * 改任何檔案不需要動這裡；想強制所有 iPad 清掉舊快取時，把 CACHE 的版號加一即可。 */
const CACHE = "tle920-v3";
const SHELL = ["./", "./index.html", "./app.js", "./menu-img.js", "./manifest.json", "./icon.png", "./icon-180.png"];
const NET_TIMEOUT = 3000;

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => c.addAll(SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function networkFirst(req) {
  return new Promise((resolve) => {
    let settled = false;
    const done = (r) => { if (!settled) { settled = true; resolve(r); } };

    const timer = setTimeout(async () => {
      const cached = await caches.match(req, { ignoreSearch: true });
      if (cached) done(cached);
    }, NET_TIMEOUT);

    fetch(req).then(async (res) => {
      clearTimeout(timer);
      if (res && res.ok) {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
      }
      done(res);
    }).catch(async () => {
      clearTimeout(timer);
      const cached = await caches.match(req, { ignoreSearch: true });
      // 網址列直接打開或從主畫面啟動時，拿不到就退回 index.html
      done(cached || (req.mode === "navigate" ? await caches.match("./index.html") : Response.error()));
    });
  });
}

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.origin !== self.location.origin) return;
  e.respondWith(networkFirst(e.request));
});
