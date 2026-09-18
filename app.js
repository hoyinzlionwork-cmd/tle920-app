/* 導領e化平台 · 920董事會 Demo（UI 依雄獅導領E化平台設計規範）
 * 純前端 PWA：載入一次後可完全離線使用。
 * 資料來源：920董事會團作業手冊（2026/08/27 版）＋高鐵開票紀錄。
 * 座位對應為示意（票已開、對號以現場發票為準）。 */
"use strict";
const PUBLIC_BUILD = true;   /* 公開站台：個資已清除，完整資料請由「資料保全 → 還原」匯入 */

/* ============================================================ ICONS */
const P = {
  /* 線條圖示（24 格、2px 線、圓頭），風格統一、在 iPad 上一眼分得出來 */
  home:'<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
  clip:'<rect width="8" height="4" x="8" y="2" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4M12 16h4M8 11h.01M8 16h.01"/>',
  flag:'<path d="M4 22V4"/><path d="M4 4h12.5l-2.5 4 2.5 4H4"/>',
  bkmk:'<path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>',
  user:'<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  bell:'<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  live:'<path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"/><circle cx="12" cy="12" r="2"/><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"/><path d="M19.1 4.9C23 8.8 23 15.1 19.1 19.1"/>',
  back:'<path d="m15 18-6-6 6-6"/>',
  chev:'<path d="m9 18 6-6-6-6"/>',
  dl:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>',
  cloudok:'<path d="m17 15-5.5 5.5L9 18"/><path d="M5 17.7A7 7 0 1 1 15.7 8h1.8a4.5 4.5 0 0 1 1.5 8.7"/>',
  route:'<circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/>',
  mega:'<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>',
  team:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  seat:'<path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3"/><path d="M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H7v-2a2 2 0 0 0-4 0z"/><path d="M5 18v2M19 18v2"/>',
  train:'<path d="M8 3.1V7a4 4 0 0 0 8 0V3.1"/><path d="m9 15-1-1M15 15l1-1"/><path d="M9 19c-2.8 0-5-2.2-5-5v-4a8 8 0 0 1 16 0v4c0 2.8-2.2 5-5 5z"/><path d="m8 19-2 3M16 19l2 3"/>',
  bed:'<path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8"/><path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"/><path d="M12 4v6"/><path d="M2 18h20"/>',
  folder:'<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z"/>',
  pen:'<path d="M21.17 6.81a1 1 0 0 0-3.98-3.99L3.84 16.17a2 2 0 0 0-.5.83l-1.32 4.35a.5.5 0 0 0 .62.63l4.35-1.32a2 2 0 0 0 .83-.5z"/><path d="m15 5 4 4"/>',
  calen:'<path d="M8 2v4M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
  sms:'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  cup:'<path d="M10 2v2M14 2v2M6 2v2"/><path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"/>',
  lug:'<path d="M6 20a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2"/><path d="M8 18V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v12"/><path d="M10 20h4"/><circle cx="16" cy="20" r="2"/><circle cx="8" cy="20" r="2"/>',
  table:'<circle cx="12" cy="12" r="4"/><circle cx="12" cy="4" r="1.6"/><circle cx="12" cy="20" r="1.6"/><circle cx="4" cy="12" r="1.6"/><circle cx="20" cy="12" r="1.6"/><circle cx="6.3" cy="6.3" r="1.6"/><circle cx="17.7" cy="17.7" r="1.6"/><circle cx="17.7" cy="6.3" r="1.6"/><circle cx="6.3" cy="17.7" r="1.6"/>',
  hand:'<path d="M18 11V6a2 2 0 0 0-4 0v1"/><path d="M14 10V4a2 2 0 0 0-4 0v2"/><path d="M10 10.5V6a2 2 0 0 0-4 0v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>',
  clock:'<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  link:'<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
  meal:'<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/>',
  refresh:'<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>',
  coin:'<rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 12h.01M18 12h.01"/>',
  phone:'<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
  pin:'<path d="M20 10c0 5-5.54 10.19-7.4 11.8a1 1 0 0 1-1.2 0C9.54 20.19 4 15 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
  copy:'<rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
  warn:'<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4M12 17h.01"/>',
  mail:'<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  shield:'<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
  gear:'<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
  sunrise:'<path d="M12 2v8"/><path d="m4.93 10.93 1.41 1.41M17.66 12.34l1.41-1.41"/><path d="M2 18h2M20 18h2"/><path d="M22 22H2"/><path d="m8 6 4-4 4 4"/><path d="M16 18a4 4 0 0 0-8 0"/>',
  camera:'<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3z"/><circle cx="12" cy="13" r="3"/>',
};
const ic=(n,s)=>`<svg class="ic" viewBox="0 0 24 24" style="font-size:${s||18}px">${P[n]||""}</svg>`;

/* ============================================================ SEED DATA（作業手冊 0827 版） */
let TOUR = {
  code:"26TS920A3A T",
  name:"雄獅董事會嘉義福森AC3日",
  sub:"920 董事會阿里山參訪團｜福森號×水山巨木×小山霂茗茶席×優遊吧斯 三日",
  ctrl:"NJ6-12139 雄獅董事會", deadline:"09/19", seats:"團位 25・HL 29・保留 1・可賣 24・團 30",
  dateTxt:"2026/09/20(日)~2026/09/22(二)",
  days:3,
  dates:["9/20 (日)","9/21 (一)","9/22 (二)"],
  leader:"薛永南 領隊",
  rc:"莊學憲 0963149442", tp:"林詠凱（鐵道）", op:"陳璟茹 0935665146（國內OP・訂房）／周冠廷（產品）／洪采吟（嘉義）",
  checkin:"05:30 領隊報到", meet:"05:50 台北雄獅 站前門市", total:"30 人（交班表）", cashOut:"NT$97,000",
  taxTitle:"雄獅旅行社股份有限公司", taxId:"04655091", budgetPrinted:"2026/09/18",
};

/* 旅客名單（作業手冊「名單」＋「高鐵」分頁）
 * group: 貴賓 / 雄獅主管 / 工作人員；days: 在團日
 * hsrGo/hsrBack: 高鐵開票區塊之示意對位（PNR 為實際訂位代號） */
let PAX = [
  { id:"p01", name:"王文傑", rel:"董事長",       en:"Jason",  group:"貴賓", days:[1,2,3],
    idNo:"—", birth:"—", tkt:"商務・敬老", hsrGo:"6車 17A", hsrBack:"6車 6A", pnrGo:"—", pnrBk:"—",
    trainSeat:"3車 1號", table:1, meal:"" },
  { id:"p02", name:"凌瓏",   rel:"董事長夫人",   en:"Vicky",  group:"貴賓", days:[1,2,3],
    idNo:"—", birth:"—", tkt:"商務・敬老", hsrGo:"6車 17C", hsrBack:"6車 6C", pnrGo:"—", pnrBk:"—",
    trainSeat:"3車 2號", table:1, meal:"", note:"高鐵票開立待確認" },
  { id:"p03", name:"魏寶生", rel:"董事",         en:"",       group:"貴賓", days:[1,2],
    idNo:"—", birth:"—", tkt:"商務・敬老", hsrGo:"6車 14A", hsrBack:"—", pnrGo:"—", pnrBk:"—",
    trainSeat:"3車 3號", table:1, meal:"",
    note:"9/21 提早返北：茶席後送嘉義高鐵，672車次 嘉義18:32→台北19:59（6車3D）" },
  { id:"p04", name:"趙秋芬", rel:"魏董夫人",     en:"",       group:"貴賓", days:[1,2],
    idNo:"—", birth:"—", tkt:"商務・敬老", hsrGo:"6車 14C", hsrBack:"—", pnrGo:"—", pnrBk:"—",
    trainSeat:"3車 4號", table:1, meal:"",
    note:"9/21 提早返北（672車次 6車3E）" },
  { id:"p05", name:"游張松", rel:"董事",         en:"Neo",    group:"貴賓", days:[1,2,3],
    idNo:"—", birth:"—", tkt:"商務・敬老", hsrGo:"6車 14D", hsrBack:"6車 6D", pnrGo:"—", pnrBk:"—",
    trainSeat:"3車 5號", table:1, meal:"" },
  { id:"p06", name:"王　雍", rel:"游董夫人",     en:"Vicky",  group:"貴賓", days:[1,2,3],
    idNo:"—", birth:"—", tkt:"商務・敬老", hsrGo:"6車 14E", hsrBack:"6車 6E", pnrGo:"—", pnrBk:"—",
    trainSeat:"3車 6號", table:1, meal:"" },
  { id:"p07", name:"陳聖德", rel:"董事",         en:"Eric",   group:"貴賓", days:[1,2,3],
    idNo:"—", birth:"—", tkt:"商務・敬老", hsrGo:"6車 15A", hsrBack:"6車 7A", pnrGo:"—", pnrBk:"—",
    trainSeat:"3車 7號", table:1, meal:"" },
  { id:"p08", name:"張振明", rel:"陳董夫人",     en:"Cindy",  group:"貴賓", days:[1,2,3],
    idNo:"—", birth:"—", tkt:"商務・敬老", hsrGo:"6車 15C", hsrBack:"6車 7C", pnrGo:"—", pnrBk:"—",
    trainSeat:"3車 8號", table:1, meal:"" },
  { id:"p09", name:"盧希鵬", rel:"獨立董事",     en:"Peng",   group:"貴賓", days:[1,2,3],
    idNo:"—", birth:"—", tkt:"商務・成人", hsrGo:"6車 15D", hsrBack:"6車 7D", pnrGo:"—", pnrBk:"—",
    trainSeat:"3車 9號", table:1, meal:"" },
  { id:"p10", name:"游慧茹", rel:"盧董夫人",     en:"Grace",  group:"貴賓", days:[1,2,3],
    idNo:"—", birth:"—", tkt:"商務・成人", hsrGo:"6車 15E", hsrBack:"6車 7E", pnrGo:"—", pnrBk:"—",
    trainSeat:"3車 10號", table:1, meal:"" },
  { id:"p11", name:"利明献", rel:"獨立董事",     en:"Morris", group:"貴賓", days:[1,2,3],
    idNo:"—", birth:"—", tkt:"商務・敬老", hsrGo:"6車 16A", hsrBack:"6車 8D", pnrGo:"—", pnrBk:"—",
    trainSeat:"3車 11號", table:1, meal:"" },
  { id:"p12", name:"張郁芬", rel:"利董夫人",     en:"Fanny",  group:"貴賓", days:[1,2,3],
    idNo:"—", birth:"—", tkt:"商務・敬老", hsrGo:"6車 16C", hsrBack:"6車 8E", pnrGo:"—", pnrBk:"—",
    trainSeat:"3車 12號", table:1, meal:"" },
  { id:"p13", name:"柳婉郁", rel:"獨立董事",     en:"WY",     group:"貴賓", days:[1,2,3],
    idNo:"—", birth:"—", tkt:"商務・成人", hsrGo:"6車 13A", hsrBack:"6車 8A", pnrGo:"—", pnrBk:"—",
    trainSeat:"4車 1號", table:1, meal:"",
    note:"台中上下車（去程 台中07:20 上車／回程 台中17:30 下車）" },
  { id:"p14", name:"鄭兆剛", rel:"旅天下獨立董事", en:"CK",   group:"貴賓", days:[1,2,3],
    idNo:"—", birth:"—", tkt:"商務・成人", hsrGo:"6車 16D", hsrBack:"6車 9D", pnrGo:"—", pnrBk:"—",
    trainSeat:"4車 2號", table:1, meal:"" },
  { id:"p15", name:"螘金花", rel:"董事夫人",     en:"",       group:"貴賓", days:[1,2,3],
    idNo:"—", birth:"—", tkt:"商務・成人", hsrGo:"6車 16E", hsrBack:"6車 9E", pnrGo:"—", pnrBk:"—",
    trainSeat:"4車 3號", table:1, meal:"" },
  { id:"p16", name:"黃信川", rel:"董事總經理",   en:"Andy",   group:"雄獅主管", days:[1,2,3],
    idNo:"—", birth:"—", tkt:"商務・敬老", hsrGo:"6車 17D", hsrBack:"6車 10C", pnrGo:"—", pnrBk:"—",
    trainSeat:"4車 4號", table:1, meal:"", note:"高鐵票開立待確認" },
  { id:"p17", name:"王岳聰", rel:"總經理",       en:"",       group:"雄獅主管", days:[1,2,3],
    idNo:"—", birth:"—", tkt:"經濟・成人", hsrGo:"5車 3A", hsrBack:"5車 3A", pnrGo:"—", pnrBk:"—",
    trainSeat:"4車 5號", table:2, meal:"" },
  { id:"p18", name:"陳曉穎", rel:"總經理（東京事業處部長）", en:"", group:"雄獅主管", days:[1,2,3],
    idNo:"—", birth:"—", tkt:"經濟・成人", hsrGo:"5車 3B", hsrBack:"5車 3B", pnrGo:"—", pnrBk:"—",
    trainSeat:"4車 6號", table:2, meal:"", note:"出席待確認" },
  { id:"p19", name:"劉惟珺", rel:"顧問",         en:"",       group:"雄獅主管", days:[1,2,3],
    idNo:"—", birth:"—", tkt:"商務・成人", hsrGo:"6車 17E", hsrBack:"6車 10D", pnrGo:"—", pnrBk:"—",
    trainSeat:"4車 7號", table:2, meal:"", note:"住宿 9/21–9/22（英迪格）" },
  { id:"p20", name:"邱浩軒", rel:"總經理",       en:"",       group:"雄獅主管", days:[1,2,3],
    idNo:"—", birth:"—", tkt:"經濟・成人", hsrGo:"5車 3C", hsrBack:"5車 3C", pnrGo:"—", pnrBk:"—",
    trainSeat:"4車 8號", table:2, meal:"", note:"9/20 在嘉義高鐵站等貴賓，只搭回程" },
  { id:"p21", name:"戴啟珩", rel:"董事",         en:"",       group:"雄獅主管", days:[2,3],
    idNo:"—", birth:"—", tkt:"商務・敬老", hsrGo:"—", hsr609:"6車 3E", hsrBack:"6車 10E", pnrGo:"—", pnrBk:"—",
    trainSeat:"—", table:2, meal:"",
    note:"9/21 加入：609車次 台北07:46→嘉義09:13，預計奮起湖會合（待確認）" },
  { id:"p22", name:"陸嘉琪", rel:"總經理",       en:"",       group:"雄獅主管", days:[1,2,3],
    idNo:"—", birth:"—", tkt:"經濟・成人", hsrGo:"5車 4A", hsrBack:"5車 3D", pnrGo:"—", pnrBk:"—",
    trainSeat:"4車 9號", table:2, meal:"" },
  { id:"p23", name:"王村煌", rel:"董事長（合作夥伴）", en:"", group:"貴賓", days:[1,2,3],
    idNo:"—", birth:"—", tkt:"商務・成人", hsrGo:"6車 13C", hsrBack:"6車 8C", pnrGo:"—", pnrBk:"—",
    trainSeat:"4車 10號", table:2, meal:"", note:"台中上下車" },
  { id:"p24", name:"陳婉如 Paris", rel:"副總經理（隨團）", en:"", group:"工作人員", days:[1,2,3],
    idNo:"—", birth:"—", tkt:"經濟・成人", hsrGo:"5車 4B", hsrBack:"5車 3E", pnrGo:"—", pnrBk:"—",
    trainSeat:"4車 11號", table:2, meal:"", note:"外宿" },
  { id:"p25", name:"林詠凱", rel:"鐵道（工作人員）", en:"", group:"工作人員", days:[1,2,3],
    idNo:"—", birth:"—", tkt:"經濟・成人", hsrGo:"9/19 先行抵達", hsrBack:"5車 4E", pnrGo:"—", pnrBk:"—",
    trainSeat:"—", table:0, meal:"", note:"9/19 提前南下、外宿" },
  { id:"p26", name:"周冠廷", rel:"產品（工作人員）", en:"", group:"工作人員", days:[1,2,3],
    idNo:"—", birth:"—", tkt:"經濟・成人", hsrGo:"5車 4C", hsrBack:"5車 4D", pnrGo:"—", pnrBk:"—",
    trainSeat:"—", table:0, meal:"", note:"同團體（待確認）" },
  { id:"p27", name:"洪采吟", rel:"嘉義（工作人員）", en:"", group:"工作人員", days:[1,2,3],
    idNo:"—", birth:"—", tkt:"—", hsrGo:"嘉義當地", hsrBack:"嘉義當地", pnrGo:"—", pnrBk:"—",
    trainSeat:"—", table:0, meal:"", note:"嘉義在地支援" },
];
PAX.forEach((p,i)=>{ p.orderNo = p.group==="貴賓"?`2731-${String(i+1).padStart(2,"0")}`:`ST-${String(i+1).padStart(2,"0")}`; });

/* 福森號配位（作業手冊：D1 A+C段 24＋領隊1＝25席，配位區塊 4車1-8號／5車1-17號）
 * 貴賓＋領隊 → 5車1-17號；主管＋隨團副總 → 4車1-8號；
 * 隨行李車（冠廷）、先行南下（詠凱）、在地支援（采吟）無列車席。實際對號由林鐵配位。 */
/* 高鐵座位（作業手冊 9/11 版「高鐵座位圖」分頁）——以這裡為準，覆蓋上面名單的座位欄位。
 * 表上綠色格子＝台中上／下車，對應 board:"台中"。薛永南 0203 坐 5車13C、0664 坐 5車11D 是照表填的。 */
const HSR_0911 = {
  go: { p06:"6車 13A", p08:"6車 14A", p19:"6車 15A", p02:"6車 16A", p13:"6車 17A",
        p05:"6車 13C", p07:"6車 14C", p28:"6車 15C", p01:"6車 16C", p23:"6車 17C",
        p16:"6車 13D", p14:"6車 14D", p09:"6車 15D", p03:"6車 16D", p11:"6車 17D",
        p15:"6車 14E", p10:"6車 15E", p04:"6車 16E", p12:"6車 17E",
        p24:"5車 3A", p17:"5車 4A", p29:"5車 3B", p18:"5車 4B", p30:"5車 3C", p31:"5車 13C" },
  back:{ p10:"6車 6A", p06:"6車 7A", p23:"6車 8A",
         p09:"6車 6C", p05:"6車 7C", p21:"6車 10C",
         p14:"6車 6D", p19:"6車 7D", p07:"6車 8D", p01:"6車 9D", p11:"6車 10D", p16:"6車 11D",
         p15:"6車 6E", p28:"6車 7E", p08:"6車 8E", p02:"6車 9E", p12:"6車 10E",
         p30:"5車 3A", p29:"5車 3B", p24:"5車 3C", p17:"5車 3D", p20:"5車 4D", p31:"5車 11D",
         p18:"5車 3E", p25:"5車 4E", p26:"5車 11E" },
  h609:{ p21:"6車 3E" },
  /* 訂位代號（表上「高鐵統計」）：同一代號的人坐同一塊；沒對到代號的標「待確認」，座位圖會用虛線框提醒 */
  pnrGo:{ "03573047":["p13","p23"], "03574156":["p08","p07","p14","p15","p19","p28","p09","p10","p02","p01"],
          "03575602":["p03","p04","p11","p12"], "4362481":["p06"], "05130881":["p05"],
          "03575971":["p24","p29","p30","p17","p18"], "04203413":["p21"], "已確認":["p16","p31"] },
  pnrBk:{ "04421386":["p10","p09","p14","p15","p06","p05","p19","p28","p07","p08"], "04414571":["p01","p02","p11","p12"],
          "04420933":["p23"], "05130881":["p21"], "04414767":["p30","p29","p24","p17","p18","p20","p25"],
          "04199621":["p03","p04"], "已確認":["p16","p31","p26"], "待確認":["p13"] },
  board:{ p13:"台中", p23:"台中" },
  days:{ p13:[1,2] },
  remove:["p22","p15"],   /* 陸嘉琪 9/1 取消；螘金花 9/15 取消（0916 分房表） */
  add:[
    { id:"p28", name:"陳萱",   rel:"陳董女兒",     en:"Lorraine", group:"貴賓",     days:[1,2,3], idNo:"—", birth:"—", tkt:"商務・成人", pnrGo:"—", pnrBk:"—", table:1, meal:"" },
    { id:"p29", name:"李沛祐", rel:"工作人員",     en:"Tony",     group:"工作人員", days:[1,2,3], idNo:"—", birth:"—", tkt:"經濟・成人", pnrGo:"—", pnrBk:"—", table:0, meal:"" },
    { id:"p30", name:"賴怡娟", rel:"副總（工作人員）", en:"Debbie", group:"工作人員", days:[1,2,3], idNo:"—", birth:"—", tkt:"經濟・成人", pnrGo:"—", pnrBk:"—", table:0, meal:"" },
    { id:"p31", name:"薛永南", rel:"領隊",         en:"",         group:"工作人員", days:[1,2,3], idNo:"—", birth:"—", tkt:"經濟・成人", pnrGo:"—", pnrBk:"—", table:0, meal:"" },
  ],
};
/* 9/17 名單（____0920-0922 名單 PDF）：關係、英文名、職稱；新增工作人員羅元榮。座位、訂位代號不動。 */
const DOC0917_PAX = {
  /* [關係, 英文, 職稱, 稱謂]（0917 Google 名單第一頁） */
  p01:["董事長","Jason Wang","雄獅旅行社董事長","董事長"], p02:["董事長夫人","Vicky Lin","雄獅旅行社董事長夫人","董事長"],
  p03:["董事長（新光人壽）","Mark Wei","新光人壽保險 董事長","董事長"], p04:["魏董夫人","Agnes Chao","新光人壽 董事長夫人","女士"],
  p05:["董事","Neo Yu","雄獅旅行社董事","董事"], p06:["游董太太","Vicky Wang","雄獅旅行社董事夫人","女士"],
  p07:["董事","Eric Chen","雄獅董事・台灣商業銀行教父・前台北富邦銀董座","董事長"], p08:["陳董太太","Cindy Chang","雄獅旅行社董事夫人","女士"],
  p28:["陳董女兒","Lorraine Chen","","小姐"],
  p09:["獨立董事","Peng Lu","雄獅獨董・台灣大哥大獨董・台科大教授","獨立董事"], p10:["盧董太太","Grace Yu","雄獅獨立董事夫人","女士"],
  p11:["獨立董事","Morris Li","雄獅獨董・中信商銀董事長","董事長"], p12:["利董太太","Fanny Chang","雄獅董事夫人","女士"],
  p13:["獨立董事","WY","雄獅獨董・台大農經博士","獨立董事"], p14:["旅天下獨立董事","CK Cheng","亞揪遊科技董事長・旅天下獨董","創辦人"],
  p15:["董事夫人","Cindy Yi","亞揪遊科技董事長夫人","女士"],
  p16:["董事總經理（不帶眷）","Andy Huang","雄獅旅行社董事總經理","董事"], p17:["總經理","Eagle Wang","","總經理"], p18:["總經理","Ying Chen","","總經理"],
  p19:["總經理","Weichun Liu","","顧問"], p20:["總經理","Sean Chiu","","總經理"], p21:["執行董事","Dianna Dai","","執行董事"],
  p23:["薰衣草森林董事長（合作夥伴）","Ed Wang","","董事長"],
  p24:["副總經理（隨團）","Paris","TL",""], p29:["經理（產品）","Tony","TL",""], p25:["資深協理（鐵道）","Jimmy","TL",""],
  p26:["經理（產品）","Jason","TL",""], p30:["副總經理（產品）","Debbie","TL",""], p27:["經理（嘉義）","Charis","TL",""], p31:["領隊","薛永南","TL",""],
};
/* 名單順序照 Google 名單第一頁（0917）：2731 → 雄獅主管 → 合作夥伴 → 工作人員；領隊自己新增的人排在同組最後 */
const SHEET_ORDER=["p01","p02","p03","p04","p05","p06","p07","p08","p28","p09","p10","p11","p12","p13","p14","p15",
  "p16","p17","p18","p19","p20","p21","p22","p23","p24","p29","p25","p32","p26","p30","p27","p31"];
function sortPaxBySheet(list){
  const idx=p=>{ const i=SHEET_ORDER.indexOf(p.id); return i>=0?i:999; };
  const withPos=list.map((p,i)=>[p,i]); withPos.sort((a,b)=>(idx(a[0])-idx(b[0]))||(a[1]-b[1]));
  list.splice(0,list.length,...withPos.map(x=>x[0]));
  return list;
}
function applyDoc0917(list){
  const i32=list.findIndex(p=>p.id==="p32"); if(i32>=0) list.splice(i32,1);   /* 羅元榮 9/11 取消（0917 Google 名單） */
  list.forEach(p=>{ const d=DOC0917_PAX[p.id]; if(!d) return; p.rel=d[0]; p.en=d[1]; if(d[2]) p.title=d[2]; else delete p.title; if(d[3]) p.hon=d[3]; else delete p.hon; });
  return sortPaxBySheet(list);
}
function applyHsr0911(list){
  const byId=Object.fromEntries(list.map(p=>[p.id,p]));
  HSR_0911.add.forEach(np=>{ if(!byId[np.id]){ const c=JSON.parse(JSON.stringify(np)); list.push(c); byId[np.id]=c; } });
  list.forEach(p=>{
    if(!/^p\d\d$/.test(p.id)) return;            /* 使用者自己新增的人不動 */
    p.hsrGo   = HSR_0911.go[p.id]   || "—";
    p.hsrBack = HSR_0911.back[p.id] || "—";
    if(HSR_0911.h609[p.id]) p.hsr609=HSR_0911.h609[p.id]; else delete p.hsr609;
    p.board = HSR_0911.board[p.id] || "";
    if(HSR_0911.days[p.id]) p.days=HSR_0911.days[p.id];
    const find=(m)=>{ for(const [pnr,ids] of Object.entries(m)) if(ids.includes(p.id)) return pnr; return "—"; };
    p.pnrGo=find(HSR_0911.pnrGo); p.pnrBk=find(HSR_0911.pnrBk);
    p.hsrGoTbc = p.pnrGo==="待確認"; p.hsrBackTbc = p.pnrBk==="待確認";
  });
  HSR_0911.remove.forEach(id=>{ const i=list.findIndex(p=>p.id===id); if(i>=0) list.splice(i,1); });
  return list;
}
applyHsr0911(PAX);
applyDoc0917(PAX);


/* 分房（作業手冊「分房表」）：兩晚不同飯店 */
let NIGHTS = [
  { key:1, date:"9/20(日)", hotel:"阿里山賓館【現代館 6–9F】", vendor:"v_alishan",
    info:"歐套二大床 1801(愛心)／1822／1901／1922・歐套一大床 1625・和洋套房 1725／1817／1915(愛心)・豪華家庭房(兩大床，主管) 1902／1903／1905／1906／1907／1908／1909／1910／1911",
    rooms:[
    { no:"1922", type:"歐式套房（兩大床）DBLB",        who:["王文傑","凌瓏"],            floor:9 },
    { no:"1817", type:"和洋套房（一大床＋軟墊）DBLB",  who:["魏寶生","趙秋芬"],          floor:8, note:"不用軟墊・只住 9/20" },
    { no:"1901", type:"歐式套房（兩大床）TWIN",        who:["游張松","王　雍"],          floor:9 },
    { no:"1725", type:"和洋套房（一大床＋軟墊）DBLB",  who:["陳聖德","張振明","陳萱"],   floor:7, note:"女兒睡軟墊" },
    { no:"1822", type:"歐式套房（兩大床）TWIN",        who:["盧希鵬","游慧茹"],          floor:8 },
    { no:"1625", type:"歐式套房（一大床）DBLB",        who:["利明献","張郁芬"],          floor:6, note:"分房 6 不可動・唯一歐套一大" },
    { no:"1915", type:"和洋套房（一大床＋軟墊）DBLB",  who:["柳婉郁"],                   floor:9, note:"不用軟墊・愛心房（無障礙扶手）" },
    { no:"1801", type:"歐式套房（兩大床・愛心）DBLB",  who:["鄭兆剛"],                   floor:8, note:"分房 8 不可動・CK 備註愛心（無障礙扶手）・螘金花 9/15 取消" },
    { no:"1911", type:"豪華家庭房 SGLB",      who:["黃信川"],  floor:9 },
    { no:"1907", type:"豪華家庭房 SGLB",      who:["王岳聰"],  floor:9 },
    { no:"1903", type:"豪華家庭房 SGLB",      who:["陳曉穎"],  floor:9 },
    { no:"1905", type:"豪華家庭房 SGLB",      who:["劉惟珺"],  floor:9 },
    { no:"1910", type:"豪華家庭房 SGLB",      who:["邱浩軒"],  floor:9 },
    { no:"1909", type:"豪華家庭房 SGLB",      who:["王村煌"],  floor:9 },
    { no:"1902／1906／1908", type:"豪華家庭房", who:[], floor:9, note:"未分配" },
    { no:"外宿 1", type:"SGLB", who:["陳婉如 Paris"], note:"外宿" },
    { no:"外宿 2", type:"TWIN", who:["林詠凱"], note:"外宿" },
    { no:"外宿 3", type:"TWIN", who:["賴怡娟","洪采吟"], note:"外宿" },
    { no:"歷史館 4", type:"TWIN", who:["李沛祐","薛永南"], note:"歷史館" },
    { no:"外宿 5", type:"TWIN", who:["周冠廷"], note:"外宿・與司機同房" },
  ]},
  { key:2, date:"9/21(一)", hotel:"阿里山英迪格酒店【6F】", vendor:"v_indigo",
    info:"豪華房 13 坪 601・豪華房加沙發床 622・精品浴缸大床 11 坪 602／605／607／609／610／612／617／619／620・精品浴缸雙床 606／608",
    rooms:[
    { no:"601", type:"豪華房 13 坪 DBLB",     who:["王文傑","凌瓏"],   floor:6 },
    { no:"622", type:"豪華房加沙發床 DBLB",   who:["陳聖德","張振明"], floor:6 },
    { no:"620", type:"精品浴缸大床 DBLB",     who:["陳萱"],            floor:6 },
    { no:"606", type:"精品浴缸雙床 TWIN",     who:["游張松","王　雍"], floor:6 },
    { no:"608", type:"精品浴缸雙床 TWIN",     who:["盧希鵬","游慧茹"], floor:6 },
    { no:"610", type:"精品浴缸大床 DBLB",     who:["利明献","張郁芬"], floor:6 },
    { no:"617", type:"精品浴缸大床 DBLB",     who:["鄭兆剛"],          floor:6 },
    { no:"609", type:"精品浴缸大床 SGLB",     who:["黃信川"],  floor:6 },
    { no:"611", type:"精品浴缸大床 SGLB",     who:["王岳聰"],  floor:6 },
    { no:"605", type:"精品浴缸大床 SGLB",     who:["陳曉穎"],  floor:6 },
    { no:"602", type:"精品浴缸大床 SGLB",     who:["劉惟珺"],  floor:6 },
    { no:"619", type:"精品浴缸大床 SGLB",     who:["邱浩軒"],  floor:6 },
    { no:"612", type:"精品浴缸大床 SGLB",     who:["戴啟珩"],  floor:6, note:"9/21 加入" },
    { no:"607", type:"精品浴缸大床 SGLB",     who:["王村煌"],  floor:6 },
    { no:"615／616／618／621", type:"未分配", who:[], floor:6 },
    { no:"工作人員", type:"外宿", who:["陳婉如 Paris","李沛祐","林詠凱","周冠廷","賴怡娟","洪采吟","薛永南"], note:"外宿 6 人・房號待確認" },
  ]},
];

/* 鳴心咖啡（十字路站）：9/15 店家提供的品項；temp 是固定冷／熱，price 待店家報價（0 = 不顯示） */
let MENU = [
  { id:"c_cold",   em:"🧊", name:"冰釀咖啡",   temp:"冰", price:0 },
  { id:"c_oolong", em:"🍵", name:"烏龍茶",     temp:"熱", price:0 },
  { id:"c_geisha", em:"☕", name:"阿里山藝妓", temp:"熱", price:0 },
  { id:"c_cascara",em:"🫖", name:"咖啡果皮茶", temp:"熱", price:0 },
  { id:"c_flower", em:"🌸", name:"咖啡花茶",   temp:"熱", price:0, note:"口味淡薄・無法回沖" },
];
/* 客製選項：冰量只有冰飲才問；甜度每杯都問；「正常」不會出現在訂單上 */
const ORD_ICE   = ["正常冰","少冰","微冰","去冰"];
const ORD_SUGAR = ["正常甜","少甜","微甜","無糖"];

/* 餐食（作業手冊「菜單」分頁）
 * 每列：餐次／地點／內容／狀態／對應店家 id（見 VENDORS，用來掛電話捷徑） */
let MEALS = {
  1:[["早餐","高鐵站發放（領隊領取）","阜杭豆漿 招牌厚餅夾蛋＋豆漿・需 20 個雄獅小紅袋（品項待確認）","OK",["v_fuhang"]],
     ["午餐","福森號列車上","福森號九宮格（列車費用內含）","OK",["v_fusen"]],
     ["小點","十字路站・鳴心咖啡","樟腦寮區間統計致電預約、十字路站領取外帶（菜單待確認）","待確認",["v_mingxin"]],
     ["晚餐","阿里山賓館・外場地（3F 中餐廳＋舞台）","合菜分菜・魏董＆魏董夫人備無海鮮套餐｜A 桌 11／B 桌 10（現場改平行）｜2,280/人（房費內含 1,000/人）","OK",["v_alishan"]]],
  2:[["早餐","阿里山賓館・麗景廳（現代館1F）","07:00–10:00（最後進場 09:30）","OK",["v_alishan"]],
     ["點心","祝山站小舖","日出行程・現場點","待確認",["v_zhushan"]],
     ["小點","奮起湖老街","甜甜圈＋愛玉・裝袋拿著吃","OK",["v_donut","v_aiyu"]],
     ["午餐","山芙蓉 無菜單料理","無菜單套餐式（忌食已提供餐廳）・A 長桌 10／B 桌 7／C 桌 6・戴董加入、魏董伉儷午餐後離團","OK",["v_fkuo"]],
     ["茶席","小山霂茗（林園製茶）","老闆親自接待・每桌 7 人分 3–4 桌、每桌一位茶師","OK",["v_xiaoshan","v_linyuan"]],
     ["晚餐","阿里山英迪格・HUFU氛饗亭（宴會廳C）","套餐式・座位圖 20 人（A 桌 10／B 桌 9），見「分桌」","OK",["v_indigo"]]],
  3:[["早餐","阿里山英迪格・粟餐廳（1F）","07:00–10:30","OK",["v_indigo"]],
     ["午餐","優遊吧斯 鄒族文化部落","合菜（需分菜）・800/人｜大桌 19 人＋小桌 16 人，門在大桌 6 點方向｜是否品茗待確認（與小山霂茗類似，菜色須避免重複）","OK",["v_yuyupas"]],
     ["點心","高鐵站發放","piepiya 麵包＋飲品・裝袋（數量以房為單位？口味待確認）","待確認",["v_piepiya"]]],
};

/* 店家聯絡簿（網路公開資訊 2026/09/01 查詢・出團前務必逐一致電確認）
 * days：在團第幾天會用到；slots：顯示用的餐次標籤
 * warn：與作業手冊規劃衝突、需優先釐清者，會在頁首獨立列出 */
let VENDORS = [
  { id:"v_fuhang", name:"阜杭豆漿", sub:"D1 早餐", days:[1], slots:["早餐"],
    tel:["02-2392-2175"], addr:"台北市中正區忠孝東路一段108號2樓（華山市場）",
    hours:"週二–週日 05:30–12:30（週一公休）",
    note:"不接受預訂、僅現場排隊。9/20 為週日有營業；領隊 05:30 領取，正好是開門時間。" },

  { id:"v_fusen", name:"福森號九宮格", sub:"D1 午餐・列車上", days:[1], slots:["午餐"],
    tel:["05-277-9843"], telNote:"林鐵及文資處", addr:"嘉義市文化路308號",
    note:"列車費用內含，不需另行訂餐。" },

  { id:"v_mingxin", name:"十字鳴心咖啡", sub:"D1 小點・十字路站", days:[1], slots:["小點"],
    tel:["0933-274774"], addr:"嘉義縣阿里山鄉十字村1鄰十字路4號",
    hours:"週五–週一 09:00–16:00",
    note:"作業手冊規劃：10:07–10:41 樟腦寮區間由領隊統計後致電預約，13:20 十字路站領取。",
    warn:"網路資訊寫「不接受訂位」，與車上預點的計畫衝突。須先與店家談定流程，含 22 杯的產能與備料時間。" },

  { id:"v_alishan", name:"阿里山賓館", sub:"D1 晚餐 3F 中餐廳外場地／D2 早餐 麗景廳／住宿一晚", days:[1,2], slots:["晚餐","早餐","住宿"],
    tel:["05-267-9811"], email:"service@alishanhotel.com.tw", addr:"嘉義縣阿里山鄉香林村16號",
    hours:"麗景廳早餐 07:00–10:00（最後進場 09:30）",
    note:"晚餐改在 3F 中餐廳外場地（加舞台），A、B 兩圓桌改平行。2,280/人（房費內含 1,000/人）。合菜分菜，魏董伉儷備無海鮮套餐。" },

  { id:"v_zhushan", name:"祝山站小舖", sub:"D2 點心・日出行程", days:[2], slots:["點心"],
    tel:[], addr:"祝山車站",
    note:"現場點，無獨立聯絡資訊。" },

  { id:"v_donut", name:"百年檜木甜甜圈", sub:"D2 小點・奮起湖老街", days:[2], slots:["小點"],
    tel:["05-256-1340"], addr:"嘉義縣竹崎鄉中和村奮起湖50-2號", hours:"08:00–17:00" },

  { id:"v_aiyu", name:"愛山屋 野生愛玉專賣店", sub:"D2 小點・奮起湖老街", days:[2], slots:["小點"],
    tel:["05-256-1548"], addr:"嘉義縣竹崎鄉107號",
    hours:"一–五 09:00–17:00／六日 08:30–18:00",
    note:"9/21 為週一 → 09:00 開門。" },

  { id:"v_fkuo", name:"FKUO 山芙蓉茶業", sub:"D2 午餐・無菜單料理", days:[2], slots:["午餐"],
    tel:["05-256-1483"], email:"remrema0929@hotmail.com", addr:"嘉義縣阿里山鄉樂野村9鄰280號",
    hours:"08:30–17:00", note:"預約制・8 菜 1 湯。與優遊吧斯同為原住民風味，菜色已協調避免重複。" },

  { id:"v_xiaoshan", name:"小山霂茗", sub:"D2 茶席・林家茶園", days:[2], slots:["茶席"],
    tel:["05-256-2129","05-256-1458"], email:"a2561728@yahoo.com.tw", line:"@976nhden",
    addr:"嘉義縣竹崎鄉石棹19-66號", hours:"09:00–18:00",
    note:"老闆親自接待・每桌 7 人分 3–4 桌、每桌一位茶師。",
    warn:"有資料稱僅週末營業，9/21 是週一。作業手冊已標 OK 且註明老闆會出來接待（應已包場），仍建議再確認一次。" },

  { id:"v_linyuan", name:"林園製茶", sub:"D2 茶席・與小山霂茗相鄰", days:[2], slots:["茶席"],
    tel:["05-256-1523"], addr:"嘉義縣竹崎鄉中和村石棹19-57號",
    note:"Budget 表：茶席體驗＋導覽 500/人×24，需求老闆講解。" },

  { id:"v_suwana", name:"宿瓦納咖啡屋", sub:"D1 雨備・不插電咖啡＋解說", days:[1], slots:["雨備"],
    tel:["05-256-1702","0988-263828"], addr:"嘉義縣阿里山鄉樂野301-8號",
    note:"水山巨木步道的雨備方案：不插電咖啡體驗＋解說 400/人×24。需三天前取消。" },

  { id:"v_jiacheng", name:"阿里山加成遊園車", sub:"D2 日出包車", days:[2], slots:["包車"],
    tel:["0800-263-520"], addr:"阿里山森林遊樂區",
    note:"祝山日出包車 2 台×4,500，每台最多 19 人。05:00 出發。" },

  { id:"v_indigo", name:"阿里山英迪格酒店", sub:"D2 晚餐 HUFU／D3 早餐 粟餐廳／住宿一晚", days:[2,3], slots:["晚餐","早餐","住宿"],
    tel:["05-258-6800"], addr:"嘉義縣番路鄉阿里山龍頭20號",
    hours:"粟餐廳早餐 07:00–10:30",
    note:"D2 晚餐於 HUFU 氛饗亭（宴會廳C），HUFU 套餐菜單調整中。" },

  { id:"v_meiyuan", name:"梅園樓觀景飯店", sub:"D2 工作人員外宿／D3 茶敘", days:[2,3], slots:["住宿","茶敘"],
    tel:["05-258-6282"], addr:"嘉義縣番路鄉公田村龍頭19之6號",
    note:"Budget 表：雙床含早 3,780×4 間（銀存轉帳）。D3 14:30 貴賓茶敘，行程與岳聰總確認中。" },

  { id:"v_yuyupas", name:"優遊吧斯 鄒族文化部落", sub:"D3 午餐", days:[3], slots:["午餐"],
    tel:["05-256-2788"], url:"https://www.yuyupastribe.com", addr:"嘉義縣阿里山鄉樂野村4鄰127-2號",
    hours:"09:00–17:00", note:"800/人・合菜需分菜。是否安排品茗待確認（避免與小山霂茗重複）。" },

  { id:"v_piepiya", name:"Piepiya 廚房", sub:"D3 點心・部落第一麥老麵包", days:[3], slots:["點心"],
    tel:["0934-015557"], addr:"嘉義縣番路鄉觸口村梅花五路一巷20號",
    note:"9/22 16:30 嘉義高鐵站發放。",
    warn:"限量手作、須電話預約。店在番路鄉觸口，與嘉義高鐵站有距離——須確認誰去取、幾點取、裝袋方式。" },
];

/* 尚未查得聯絡資訊，須向 OP 或內部窗口取得 */
let VENDOR_TODO = [
  ["遊覽車車行","作業手冊寫「43客座大巴（三內）」，「三內」疑為車行或內裝規格，須向 OP 確認。"],
];

/* 預算表（公司系統 BOOK01 Budget 表，26TS920A3A T，9/18 版）
 * 每筆：day 第幾天／t 時間／cat 元件（餐廳・活動・團房・其它）／slot 餐次／vendor 店家／name 訂購明細
 *      price 單價／qty 數量／unit 單位／dep 已付訂金（公司行前已付）／grp 同一張單的合併小計
 * 領隊現金 TOTAL＝所有卡片的「剩餘金額」（TOTAL－已付訂金）加總；表上為 NTD 97,000。
 * 「實付」欄由領隊逐張填入，存於 S.budgetFinal（以卡片 key 為索引）；已付訂金可在表上改，存於 S.budgetDeposit。 */
let BUDGET_HEADCOUNT = 21;
let BUDGET_ITEMS = [
  { id:"k01", day:1, t:"05:30", cat:"餐廳", slot:"早餐",   vendor:"阜杭豆漿",           name:"葷食－厚燒餅夾蛋",           price:50,   qty:27, unit:"人", pay:"現金", grp:"g_fuhang" },
  { id:"k02", day:1, t:"05:30", cat:"餐廳", slot:"早餐",   vendor:"阜杭豆漿",           name:"熱豆漿",                     price:35,   qty:27, unit:"人", pay:"現金", grp:"g_fuhang" },
  { id:"k03", day:1, t:"13:20", cat:"餐廳", slot:"下午茶", vendor:"十字鳴心咖啡",       name:"點心（現場統計）",           price:200,  qty:21, unit:"人", pay:"現金", grp:"g_coffee" },
  { id:"k04", day:1, t:"13:20", cat:"餐廳", slot:"下午茶", vendor:"十字鳴心咖啡",       name:"冰釀咖啡／烏龍茶（熱）／阿里山藝妓（熱）／咖啡果皮茶（熱）／咖啡花茶（熱，口味淡薄無法回沖）", price:0, qty:0, unit:"", pay:"現金", grp:"g_coffee", note:"品項現場統計，單價店家報價" },
  { id:"k05", day:1, t:"14:00", cat:"活動", slot:"",       vendor:"阿里山國家森林遊樂區", name:"國人全票",                 price:200,  qty:16, unit:"人", pay:"現金", grp:"g_park" },
  { id:"k06", day:1, t:"14:00", cat:"活動", slot:"",       vendor:"阿里山國家森林遊樂區", name:"優待票－65 歲／導領人員",  price:10,   qty:12, unit:"人", pay:"現金", grp:"g_park" },
  { id:"k07", day:1, t:"14:00", cat:"活動", slot:"",       vendor:"宿瓦納咖啡屋",       name:"不插電咖啡＋解說（此為雨備方案）", price:400, qty:21, unit:"人", pay:"現金" },
  { id:"k08", day:1, t:"14:00", cat:"活動", slot:"",       vendor:"阿里山加成遊園車",   name:"來回接駁車（21＋6 工作人員＋1 領）", price:120, qty:27, unit:"人", pay:"現金", note:"14:00 候車亭→沼平車站＋15:30 沼平車站→阿里山賓館" },
  { id:"k09", day:1, t:"16:30", cat:"團房", slot:"",       vendor:"阿里山賓館",         name:"（歷史館）貴賓四人房二大床－2 人（領隊住）", price:12500, qty:1, unit:"間", pay:"現金", grp:"g_abin", dep:12500 },
  { id:"k10", day:1, t:"16:30", cat:"團房", slot:"",       vendor:"阿里山賓館",         name:"（現代館）豪華家庭二大床－1 人",   price:13500, qty:6, unit:"間", pay:"現金", grp:"g_abin", dep:81000 },
  { id:"k11", day:1, t:"16:30", cat:"團房", slot:"",       vendor:"阿里山賓館",         name:"（現代館）歐式套房一大床－2 人",   price:21000, qty:1, unit:"間", pay:"現金", grp:"g_abin", dep:21000 },
  { id:"k12", day:1, t:"16:30", cat:"團房", slot:"",       vendor:"阿里山賓館",         name:"（現代館）歐式套房二大床－2 人",   price:21000, qty:3, unit:"間", pay:"現金", grp:"g_abin", dep:63000 },
  { id:"k13", day:1, t:"16:30", cat:"團房", slot:"",       vendor:"阿里山賓館",         name:"（現代館）歐式套房二大床－1 人",   price:21000, qty:1, unit:"間", pay:"現金", grp:"g_abin", dep:21000 },
  { id:"k14", day:1, t:"16:30", cat:"團房", slot:"",       vendor:"阿里山賓館",         name:"（現代館）和洋式套房一大床－2 人", price:21000, qty:1, unit:"間", pay:"現金", grp:"g_abin", dep:21000 },
  { id:"k15", day:1, t:"16:30", cat:"團房", slot:"",       vendor:"阿里山賓館",         name:"（現代館）和洋式套房一大床－1 人", price:21000, qty:1, unit:"間", pay:"現金", grp:"g_abin", dep:21000 },
  { id:"k16", day:1, t:"16:30", cat:"團房", slot:"",       vendor:"阿里山賓館",         name:"（現代館）和洋式套房一大床＋一軟墊－3 人", price:22500, qty:1, unit:"間", pay:"現金", grp:"g_abin", dep:22500 },
  { id:"k17", day:1, t:"16:30", cat:"團房", slot:"",       vendor:"阿里山賓館",         name:"中式合菜加價餐費",           price:1280, qty:21, unit:"人", pay:"現金", grp:"g_abin", dep:26880 },
  { id:"k18", day:1, t:"16:30", cat:"其它", slot:"",       vendor:"阿里山賓館",         name:"進房禮（簽領據）",           price:50,   qty:21, unit:"人", pay:"現金" },
  { id:"k19", day:1, t:"16:30", cat:"其它", slot:"",       vendor:"阿里山賓館",         name:"入房禮（簽領據）",           price:50,   qty:15, unit:"間", pay:"現金" },
  { id:"k20", day:1, t:"21:00", cat:"團房", slot:"",       vendor:"阿里山高山青大飯店", name:"雙床（含早）",               price:2000, qty:1,  unit:"間", pay:"現金", dep:2000 },
  { id:"k21", day:2, t:"05:00", cat:"活動", slot:"",       vendor:"阿里山加成遊園車",   name:"日出包車",                   price:4500, qty:2,  unit:"台", pay:"現金", note:"日出取消最慢前一天；發車後臨時取消需支付 1,200／車" },
  { id:"k22", day:2, t:"05:40", cat:"其它", slot:"",       vendor:"領隊",               name:"日出點心（領隊現場購買）",   price:100,  qty:21, unit:"人", pay:"現金" },
  { id:"k23", day:2, t:"11:00", cat:"餐廳", slot:"下午茶", vendor:"老街第一家現烤甜甜圈", name:"甜甜圈（實際 30／人）買 10 送 1，招待 2 司領", price:100, qty:22, unit:"人", pay:"現金" },
  { id:"k24", day:2, t:"13:00", cat:"餐廳", slot:"午餐",   vendor:"FKUO山芙蓉茶業",     name:"餐標 600／人",               price:600,  qty:23, unit:"人", pay:"現金" },
  { id:"k25", day:2, t:"14:30", cat:"活動", slot:"",       vendor:"林園製茶",           name:"茶席體驗＋導覽（需求老闆講解）", price:500, qty:22, unit:"人", pay:"現金" },
  { id:"k26", day:2, t:"16:20", cat:"團房", slot:"",       vendor:"阿里山英迪格酒店",   name:"精品雙床 浴缸－2 人",        price:16170, qty:3, unit:"間", pay:"現金", grp:"g_indigo", dep:48510 },
  { id:"k27", day:2, t:"16:20", cat:"團房", slot:"",       vendor:"阿里山英迪格酒店",   name:"精品大床 浴缸－2 人",        price:16170, qty:3, unit:"間", pay:"現金", grp:"g_indigo", dep:48510 },
  { id:"k28", day:2, t:"16:20", cat:"團房", slot:"",       vendor:"阿里山英迪格酒店",   name:"精品大床 浴缸－1 人",        price:16170, qty:6, unit:"間", pay:"現金", grp:"g_indigo", dep:97020 },
  { id:"k29", day:2, t:"16:20", cat:"團房", slot:"",       vendor:"阿里山英迪格酒店",   name:"豪華房大床－1 人",           price:16170, qty:1, unit:"間", pay:"現金", grp:"g_indigo", dep:16170 },
  { id:"k30", day:2, t:"16:20", cat:"團房", slot:"",       vendor:"阿里山英迪格酒店",   name:"豪華房大床（大床＋沙發床）－3 人", price:24460, qty:1, unit:"間", pay:"現金", grp:"g_indigo", dep:24460 },
  { id:"k31", day:2, t:"16:20", cat:"團房", slot:"",       vendor:"阿里山英迪格酒店",   name:"主廚套餐",                   price:3980, qty:19, unit:"人", pay:"現金", grp:"g_indigo", dep:75620 },
  { id:"k32", day:2, t:"21:00", cat:"團房", slot:"",       vendor:"梅園樓觀景飯店",     name:"雙床（含早）",               price:3780, qty:1,  unit:"間", pay:"現金", grp:"g_meiyuan", dep:3780 },
  { id:"k33", day:2, t:"21:00", cat:"團房", slot:"",       vendor:"梅園樓觀景飯店",     name:"雙床（含早）",               price:3780, qty:6,  unit:"間", pay:"現金", grp:"g_meiyuan", dep:22680 },
  { id:"k34", day:3, t:"11:00", cat:"活動", slot:"",       vendor:"優遊吧斯",           name:"門票（雄獅專案價）",         price:100,  qty:19, unit:"人", pay:"現金", grp:"g_yuyu_tkt" },
  { id:"k35", day:3, t:"11:00", cat:"活動", slot:"",       vendor:"優遊吧斯",           name:"品茗",                       price:100,  qty:19, unit:"人", pay:"現金", grp:"g_yuyu_tkt" },
  { id:"k36", day:3, t:"12:30", cat:"餐廳", slot:"午餐",   vendor:"優遊吧斯",           name:"合菜（需求 20 人坐包廂）",   price:8200, qty:2,  unit:"桌", pay:"現金", grp:"g_yuyu_meal" },
  { id:"k37", day:3, t:"12:30", cat:"餐廳", slot:"午餐",   vendor:"優遊吧斯",           name:"飲料（一茶一果）",           price:60,   qty:4,  unit:"瓶", pay:"現金", grp:"g_yuyu_meal" },
  { id:"k38", day:3, t:"12:30", cat:"餐廳", slot:"午餐",   vendor:"優遊吧斯",           name:"工作人員餐費（暫抓）",       price:800,  qty:6,  unit:"人", pay:"現金" },
  { id:"k39", day:3, t:"13:30", cat:"其它", slot:"",       vendor:"優遊吧斯",           name:"伴手禮－紅茶禮盒",           price:1200, qty:10, unit:"份", pay:"現金", grp:"g_yuyu_gift", dep:12000 },
  { id:"k40", day:3, t:"13:30", cat:"其它", slot:"",       vendor:"優遊吧斯",           name:"樣品－精品綠禮盒",           price:1000, qty:1,  unit:"份", pay:"現金", grp:"g_yuyu_gift", dep:1000 },
  { id:"k41", day:3, t:"13:30", cat:"其它", slot:"",       vendor:"優遊吧斯",           name:"樣品－紅茶禮盒",             price:1200, qty:1,  unit:"份", pay:"現金", grp:"g_yuyu_gift", dep:1200 },
  { id:"k42", day:3, t:"",      cat:"其它", slot:"",       vendor:"領隊",               name:"【司機差旅費】$2,500／天（報價已含，現場不用支付）", price:0, qty:0, unit:"天", pay:"現金", grp:"g_misc" },
  { id:"k43", day:3, t:"",      cat:"其它", slot:"",       vendor:"領隊",               name:"【停車費】實報實銷",         price:500,  qty:3,  unit:"天", pay:"現金", grp:"g_misc" },
  { id:"k44", day:3, t:"",      cat:"其它", slot:"",       vendor:"領隊",               name:"【司機誤餐費】D1 午",        price:150,  qty:1,  unit:"人", pay:"現金", grp:"g_misc" },
  { id:"k45", day:3, t:"",      cat:"其它", slot:"",       vendor:"領隊",               name:"【工作人員誤餐費】D2 早",    price:100,  qty:5,  unit:"人", pay:"現金", grp:"g_misc" },
  { id:"k46", day:3, t:"",      cat:"其它", slot:"",       vendor:"領隊",               name:"【零用金】$3,000×3 天",      price:8255, qty:1,  unit:"團", pay:"現金", grp:"g_misc" },
];
BUDGET_ITEMS.forEach(b=>{ b.budget = b.price*b.qty; });
const BUDGET_CATS = ["餐廳","活動","團房","其它"];
const BUDGET_PAYS = ["現金","信用卡","銀存轉帳"];

/* 行程（作業手冊「行程細流」＋「Rundown」工作分派） */
let ITIN = {
  1: [
    { t:"05:30", title:"領取早餐（阜杭豆漿）", desc:"招牌厚餅夾蛋＋豆漿（品項待確認）。",
      staff:["領隊前往阜杭豆漿領取早餐","董辦準備早餐提袋，需 20 個雄獅小紅袋"], links:[["vendors:v_fuhang","阜杭豆漿 資訊"]] },
    { t:"05:50", title:"集合 · 台北雄獅 站前門市", desc:"領隊 05:30 報到（集合時間前 20 分鐘，遲到依導領部規範扣 300 元）；貴賓 05:50 站前門市集合報到，06:10 出發前往台北車站月台。",
      staff:["冠廷 05:50 站前門市開門、擺設報到區","領隊：帶雄獅旗、背心、布條、福森號車牌"], links:[["roster","點名報到"]] },
    { t:"06:10", title:"台北車站 集合出發", desc:"集合報到、發送早餐及高鐵車票。",
      staff:["領隊：集合報到、發送早餐及車票","冠廷：聯絡行李車司機（西1門上行李）","采欣＋Eunice：收取貴賓行李放上行李車","冠廷隨行李車一同前往嘉義"],
      links:[["roster","點名報到"],["seats:hsr","高鐵座位表"],["luggage","行李點收"]] },
    { t:"06:30", title:"高鐵 0203 台北 → 嘉義", desc:"06:30 台北發車，07:20 台中（柳教授、村煌董上車），07:43 抵嘉義。商務 6 車、經濟 5 車。",
      links:[["seats:hsr","高鐵座位表"]] },
    { t:"08:00", title:"專車前往北門車站", desc:"嘉義高鐵站出站上巴士（43 客座大巴、四排椅），08:40 抵達。車上備福森保溫瓶溫水＋每日一箱紙盒水。",
      staff:["村煌董安排導覽（待確認）"], links:[] },
    { t:"09:10", title:"北門車站 報到 · 福森號 A 段", desc:"報到 09:10–09:20，地點：北門車站新站 林鐵售票口旁（嘉義市東區忠孝路306號）。09:30 月台上車。",
      links:[["roster","點名報到"],["fusen","福森號座位"]] },
    { t:"09:30", title:"福森號 A 段（北門→十字路）", desc:"09:52 鹿滿站復古拍照 → 10:41 樟腦寮站月台音樂表演 → 11:32 第三景觀台俯瞰嘉南平原 → 12:36 奮起湖 → 12:56 多林（緩行）。午餐：福森號九宮格。",
      staff:["10:07–10:41 樟腦寮區間：領隊統計鳴心咖啡並致電預約（領隊、采吟、元榮）"],
      links:[["coffee","鳴心咖啡預點"],["fusen","福森號座位"]] },
    { t:"13:06", title:"十字路站 · 鄒族迎賓＋鳴心咖啡", desc:"13:20–13:25 鄒族迎賓歌舞表演。",
      staff:["領隊領取預訂之鳴心咖啡"], links:[["coffee","咖啡點餐"],["vendors:v_mingxin","鳴心咖啡 資訊"]] },
    { t:"13:30", title:"專車前往水山巨木步道", desc:"〈雨備：宿瓦納咖啡屋 不插電咖啡體驗＋解說，需三天前取消〉遊覽車同時送行李至飯店。",
      links:[["luggage","行李點收"],["vendors:v_suwana","雨備 宿瓦納咖啡屋"]] },
    { t:"14:00", title:"水山巨木步道（導覽）", desc:"14:00–15:20 領隊導覽。導覽耳機可否沿用福森號設備待確認。", links:[] },
    { t:"15:30", title:"行李與桌牌前置", desc:"行李車抵達阿里山賓館。",
      staff:["冠廷：行李、入房禮請飯店放入房","冠廷：前往 3F 中餐廳外場地放置桌牌"], links:[["luggage","行李點收"]] },
    { t:"16:30", title:"阿里山賓館 Check-in", desc:"16:30–16:45 辦理入住【現代館】。行李服務每件 $50／單趟。",
      links:[["rooms","分房表"],["luggage","行李點收"]] },
    { t:"18:00", title:"晚餐 · 3F 中餐廳外場地（加舞台）", desc:"A 桌 11／B 桌 10，主要出入口在舞台右側。2,280/人。合菜分菜，魏董伉儷無海鮮套餐。開席時間待確認。",
      staff:["巴黎（陳婉如）與岳聰總坐外面"], links:[["meals","餐廳分桌"]] },
  ],
  2: [
    { t:"04:20", title:"自選 · 祝山日出", desc:"晨喚後搭遊園車前往祝山（加成遊園車包車兩台、每台最多19人）。預計日出 05:40，06:20 返程回飯店。點心：祝山站小舖現場點（領隊現場購買，50/人）。",
      links:[["optin:sunrise","日出名單"],["vendors:v_jiacheng","加成遊園車"]] },
    { t:"07:10", title:"早餐 · 麗景廳（現代館1F）", desc:"07:10–08:00 用餐（餐廳 07:00–10:00，最後進場 09:30）。", links:[] },
    { t:"08:00", title:"專車前往阿里山車站", desc:"阿里山賓館專車接送，08:30 抵達。",
      staff:["冠廷：協助行李上行李車（大巴停車場）","魏董及夫人行李放在遊覽車上（當日離團）"],
      links:[["luggage","行李點收"]] },
    { t:"08:35", title:"阿里山車站 報到 · 福森號 C 段", desc:"報到 08:35–08:45，地點：阿里山車站 2F 林鐵售票口旁。08:45 月台上車。",
      links:[["roster","點名報到"],["fusen","福森號座位"]] },
    { t:"08:55", title:"福森號 C 段（阿里山→奮起湖）", desc:"09:15–10:00 二萬坪森林音樂演奏會＋輕食 → 10:40 十字路景觀台拍照 → 11:30 抵奮起湖。",
      links:[["fusen","福森號座位"]] },
    { t:"09:13", title:"戴董抵嘉義（609車次）", desc:"台北07:46→嘉義09:13，奮起湖會合（待確認）。",
      staff:["元榮：接戴董","冠廷：聯絡九人座司機將戴董行李送至阿里山英迪格"],
      links:[["roster","點名報到"]] },
    { t:"11:30", title:"奮起湖老街", desc:"11:30–12:30 自由漫遊。小點：甜甜圈＋愛玉（裝袋、拿著吃）。",
      staff:["采吟：處理小點心裝袋","冠廷：前往山芙蓉擺桌牌"], links:[] },
    { t:"13:00", title:"午餐 · 山芙蓉 無菜單料理", desc:"8 菜 1 湯：肉類×2、豆腐×1、蛋料理×1、湯品×1，其餘由主廚依當日食材搭配 2–3 道特色料理。",
      staff:["冠廷：前往小山霂茗擺桌牌"], links:[["meals","餐廳分桌"]] },
    { t:"14:30", title:"小山霂茗 · 導覽＋茶席體驗", desc:"14:30–16:00。老闆親自接待，每桌 7 人分 3–4 桌、每桌安排一位茶師。",
      staff:["冠廷：前往阿里山英迪格確認行李入房"], links:[["roster","點名報到"]] },
    { t:"16:00", title:"魏董伉儷 離團返北", desc:"茶席後專車送嘉義高鐵站，672車次 嘉義18:32→台北19:59。",
      staff:["元榮：送魏董及夫人上九人座（行李需自大巴取下）"], links:[["consent","離隊切結"]] },
    { t:"16:20", title:"阿里山英迪格酒店 Check-in", desc:"16:20–16:30 辦理入住，全體人員住館內。",
      links:[["rooms","分房表"],["luggage","行李點收"]] },
    { t:"18:30", title:"晚餐 · HUFU氛饗亭（宴會廳C）", desc:"HUFU 套餐（菜單調整中）。",
      staff:["冠廷：前往餐廳擺桌牌"], links:[["meals","餐廳分桌"]] },
  ],
  3: [
    { t:"07:00", title:"早餐 · 粟餐廳（1F）", desc:"07:00–10:30。", links:[] },
    { t:"09:00", title:"飯店設施 或 龍銀山步道", desc:"自選活動。", links:[] },
    { t:"10:30", title:"行李上行李車", desc:"行李車路線：英迪格 → 台北車站（台中、桃園點無法停靠）。",
      staff:["冠廷：村煌董、柳教授行李上大巴（台中下車）"], links:[["luggage","行李點收"]] },
    { t:"11:00", title:"優遊吧斯 鄒族文化部落", desc:"11:00–14:30 用餐＋品茗＋表演（800/人）。是否品茗待確認（與小山霂茗類似）。伴手禮：優遊吧斯周邊商品，客製包裝。",
      links:[["meals","餐廳分桌"]] },
    { t:"14:30", title:"梅園樓觀景飯店（公司場域）", desc:"14:30–15:00 貴賓茶敘。行程與岳聰總確認中。", links:[["vendors:v_meiyuan","梅園樓 資訊"]] },
    { t:"16:30", title:"嘉義高鐵站", desc:"發放回程點心：piepiya 麵包＋飲品（裝袋，數量／口味待確認）。",
      staff:["采欣＋Eunice：台北車站接送行李車"],
      links:[["roster","點名報到"],["seats:hsr","高鐵座位表"],["luggage","行李點收"]] },
    { t:"17:08", title:"高鐵 0664 嘉義 → 台北", desc:"17:08 嘉義發車，17:30 台中（柳教授、村煌董下車），18:33 抵台北，溫馨賦歸。",
      links:[["seats:hsr","高鐵座位表"]] },
  ],
};

/* 訂購證明：店家在 LINE 群回覆的 FNL／預約確認，照原文放在對應的行程節點下（by＝哪個群、誰回的）。
 * 以節點標題對應；存檔裡的節點在 bindData 用 applyStopConf 補上。 */
const STOP_CONF = {
  "領取早餐（阜杭豆漿）": { img:"fuhang", by:"阜杭豆漿 LINE 群・小雪(MoMo)", lines:[
    "團號：26TS920A3A T　團名：雄獅董事會嘉義福森AC3日",
    "取餐日期：09/20 (日)　時間：早上 05:30 取餐",
    "取餐人：薛永南 0935175805",
    "內容：葷食－厚燒餅夾蛋 $50×27 份、熱豆漿 $35／個×27 杯（份數少一份，以此筆為主）",
    "★ 請提供吸管 ＆ 每份要 1 個小提袋",
    "◆ 費用領隊當日付清",
    "◆ 發票：抬頭 雄獅旅行社股份有限公司／統編 04655091",
    "訂餐人：OP 陳璟茹 02-8793-2902" ] },
  "水山巨木步道（導覽）": { img:"jiacheng", by:"阿里山加成電動車 LINE 群・Kaiyi", lines:[
    "團號：26TS920A3A T　團名：雄獅董事",
    "日期：09/20 日　人數：22＋5 工作人員＋1 領",
    "領隊：薛永南 0935175805",
    "價格：來回 $120／人",
    "項目：14:00 候車亭→沼平車站接駁（2 台包車）",
    "　　　15:30 沼平車站→阿里山賓館（2 台包車）" ] },
  "自選 · 祝山日出": { img:"jiacheng", by:"阿里山加成電動車 LINE 群・Kaiyi", lines:[
    "原訂日出包車　日期：09/21 一",
    "時間：請與領隊約正確時間",
    "項目：日出包車費用 4,500×2 台＝9,000 元",
    "人數：22＋1 領　領隊：薛永南 0935175805" ] },
  "奮起湖老街": { img:"donut", by:"老街第一家甜甜圈 LINE・淑玲", lines:[
    "團名：雄獅董事會　日期：9/21 一　時間：11:00",
    "外送地點：奮起湖車站月台",
    "聯絡人：周冠廷 0953527741",
    "品項：甜甜圈 $30　份數：22",
    "★ 費用現場結清",
    "發票：抬頭 雄獅旅行社股份有限公司／統編 04655091",
    "OP 陳璟茹 02-8793-2902" ] },
  "午餐 · 山芙蓉 無菜單料理": { img:"shanfurong", by:"山芙蓉茶業 LINE 群・佩琪", lines:[
    "團號：26TS920A3A T　團名：雄獅董事",
    "日期：09/21 一　時間：13:00–14:00",
    "人數：23＋6 工作人員＋2 司領（招待）",
    "領隊：薛永南 0935175805",
    "項目：餐標 $600／人（開 3 桌／每桌分成 2 份出餐）",
    "分桌明細：A 桌 10 人（忌生食/海鮮(含魚)×2、忌雞×1、忌辣×1、忌乳製品含起司×1）",
    "　　　　　B 桌 6 人（忌奶製品含起司×1）／C 桌 7 人（忌起司、生食×1）",
    "A 桌新增一位用餐；周先生已另外提供過",
    "★ 費用領隊現場結清",
    "發票：抬頭 雄獅旅行社股份有限公司／統編 04655091" ] },
  "小山霂茗 · 導覽＋茶席體驗": { img:"linyuan", by:"林園製茶 雄獅工作群・陳璟茹 Ruby", lines:[
    "團號：26TS920A3A T　團名：雄獅董事",
    "日期：09/21 一　時間：14:30–16:00",
    "人數：22＋6 工作人員＋2 司領",
    "領隊：薛永南 0935175805",
    "項目：茶席體驗＋導覽 $500／人（需求老闆講解）",
    "★ 費用領隊現場結清",
    "發票：抬頭 雄獅旅行社股份有限公司／統編 04655091" ] },
  "工作人員入住 梅園樓觀景飯店（司領寄舖）": { img:"meiyuan", by:"梅園樓觀景飯店 LINE", lines:[
    "團名：雄獅董事　團號：26TS920A3A T",
    "日期：09/21 一　領隊：薛永南 0935175805",
    "項目：1.（司領寄舖）兩小床（含早）$3,780×1 間——8/10 已匯款完成",
    "　　　2.（司領寄舖）兩小床（含早）$3,780×3 間——8/25 新增",
    "　　　3.（司領寄舖）兩小床（含早）$3,780×3 間——9/11 新增",
    "★ 費用已匯款完成",
    "發票：抬頭 雄獅旅行社股份有限公司／統編 04655091" ] },
  "優遊吧斯 鄒族文化部落": { img:"yuyu", by:"雄獅×優遊吧斯團體對接工作檔・優遊吧斯業務部", lines:[
    "團號：26TS920A3A T　團名：雄獅董事",
    "日期：09/22 二　時間：11:00–14:30",
    "客人：19 人　司領：工作人員 6＋司領 2（請協助招待）",
    "領隊：薛永南 0935175805",
    "項目：門票 $100／人（雄獅專案價）、品茗 $100／人",
    "　　　合菜 $8,200×2 桌＋每桌 2 飲（需求包廂 20 人桌坐）",
    "特殊餐食：忌雞×1／忌奶製品含起司×2",
    "另外周先生有預訂禮盒金額 $3,900（此筆費用會行前匯款）",
    "★ 費用領隊現場結清",
    "發票：抬頭 雄獅旅行社股份有限公司／統編 04655091" ] },
};
const MEIYUAN_STOP = { t:"21:00", title:"工作人員入住 梅園樓觀景飯店（司領寄舖）", desc:"貴賓住英迪格；工作人員（司領寄舖）當晚住梅園樓，兩小床含早共 7 間，費用已匯款。", staff:["冠廷：確認 7 間房與早餐時間"], links:[["vendors","店家聯絡"]] };
function applyStopConf(itin){
  for(const d of Object.keys(itin)) (itin[d]||[]).forEach(st=>{ const c=STOP_CONF[st.title]; if(c) st.conf=c; });
  const d2=itin[2]||(itin[2]=[]);
  if(!d2.some(x=>x.title===MEIYUAN_STOP.title)){ d2.push(Object.assign({conf:STOP_CONF[MEIYUAN_STOP.title]},JSON.parse(JSON.stringify(MEIYUAN_STOP)))); d2.sort((a,b)=>String(a.t).localeCompare(String(b.t))); }
  return itin;
}
applyStopConf(ITIN);

/* 行李車路線（作業手冊「代辦事項」） */
let LUGGAGE_ROUTE = {
  1:"台北車站（西1門上行李）→ 阿里山賓館　｜　冠廷隨車、采欣＋Eunice 台北車站收行李",
  2:"阿里山賓館 → 阿里山英迪格　｜　魏董伉儷行李改放遊覽車（當日離團）、戴董行李由九人座送英迪格",
  3:"阿里山英迪格 → 台北車站（台中、桃園點無法停靠）　｜　村煌董、柳教授行李上大巴",
};


const FUNCS = [
  ["itin",   "route",  "行程表"],
  ["roster", "team",   "團體大表"],
  ["seats",  "seat",   "高鐵座位圖"],
  ["fusen",  "train",  "福森號座位"],
  ["rooms",  "bed",    "分房表"],
  ["meals",  "meal",   "餐廳分桌"],
  ["vendors","phone",  "店家聯絡"],
  ["coffee", "cup",    "咖啡點餐"],
  ["luggage","lug",    "行李點收"],
  ["budget", "coin",   "預算表"],
  ["optin:sunrise","sunrise","日出名單"],
  ["ink",    "pen",    "手寫備註"],
];

/* 團體大表的欄位：全部都能勾選隱藏；第三個值＝預設是否顯示 */
const ROSTER_FIELDS = [
  ["grp","名義",true],["seq","序",false],["hon","稱謂",true],["rel","關係",true],["title","職稱",true],["en","英文名",true],["days","在團",true],
  ["orderNo","訂單編號",true],["idNo","身分證號",true],["birth","生日",true],["tkt","高鐵票種",false],
  ["hsrGo","高鐵去",false],["hsrBack","高鐵回",false],["pnr","訂位代號",false],["train","福森號",false],
  ["room1","9/20 房",false],["room2","9/21 房",false],["meal","特殊餐食",true],["note","備註",true],
];
const fld=k=>{ const d=ROSTER_FIELDS.find(f=>f[0]===k); const v=(S.fields||{})[k]; return v===undefined?(d?d[2]:true):!!v; };


/* 高鐵車次（原本在座位圖區，因可編輯資料層載入時要讀，移到這裡） */
let HSR_TRAINS = {
  1:[{ no:"0203", route:"台北 06:30 → 台中 07:20 → 嘉義 07:43", dir:"南下", key:"hsrGo", cars:[6,5],
       unused:{ "6車 14E":"03574156 已訂・螘金花 9/15 取消" } }],
  2:[{ no:"0609", route:"台北 07:46 → 嘉義 09:13", dir:"南下", cars:[6], tag:"戴董南下加入", key:"hsr609" },
     { no:"0672", route:"嘉義 18:32 → 台中 18:58 → 台北 19:59", dir:"北上", cars:[6], tag:"魏董伉儷、柳董提前返北",
       fixed:{ "6車 3D":"p03", "6車 3E":"p04", "6車 4A":"p13" }, tbc:["6車 4A"] }],
  3:[{ no:"0664", route:"嘉義 17:08 → 台中 17:30 → 台北 18:33", dir:"北上", key:"hsrBack", cars:[6,5],
       unused:{ "6車 8C":"04420933 已訂・柳董改搭 672", "6車 6E":"04421386 已訂・螘金花 9/15 取消" } }],
};

/* ============================================================ 可編輯資料層
 * 上面那些 seed 只是「出廠預設」。第一次開啟時整份深拷貝進 S.data，之後所有頁面都從
 * S.data 讀，領隊或 OP 在 App 裡改的東西跟點名紀錄一樣走雙寫存檔、快照、匯出。
 * 每個區塊都能「還原預設」，把 S.data 的那一塊換回 seed。 */
const clone = o => JSON.parse(JSON.stringify(o));

function buildSeed(){
  /* 餐食 seed 是 tuple，進 S.data 前先變成物件，表單才好編 */
  const meals = {};
  for(const d of Object.keys(MEALS_SEED)) meals[d] = MEALS_SEED[d].map(m => Array.isArray(m)
    ? { slot:m[0], place:m[1], menu:m[2], st:m[3], vids:m[4]||[] } : m);
  return clone({
    tour:TOUR_SEED, pax:PAX_SEED, nights:NIGHTS_SEED, menu:MENU_SEED, meals,
    vendors:VENDORS_SEED, vendorTodo:VENDOR_TODO_SEED,
    budget:BUDGET_ITEMS_SEED, headcount:BUDGET_HEADCOUNT_SEED,
    itin:ITIN_SEED, luggageRoute:LUGGAGE_ROUTE_SEED, hsrTrains:HSR_TRAINS_SEED, _seatVer:5, _menuVer:1, _budgetVer:2, _tourVer:3, _docVer:11,
  });
}
/* 出廠預設另存一份，之後 TOUR / PAX… 這些名字都指向 S.data */
const TOUR_SEED=TOUR, PAX_SEED=PAX, NIGHTS_SEED=NIGHTS, MENU_SEED=MENU, MEALS_SEED=MEALS,
      VENDORS_SEED=VENDORS, VENDOR_TODO_SEED=VENDOR_TODO, BUDGET_ITEMS_SEED=BUDGET_ITEMS,
      BUDGET_HEADCOUNT_SEED=BUDGET_HEADCOUNT, ITIN_SEED=ITIN, LUGGAGE_ROUTE_SEED=LUGGAGE_ROUTE,
      HSR_TRAINS_SEED=HSR_TRAINS;

function bindData(){
  if(!S.data || typeof S.data!=="object") S.data = buildSeed();
  /* 舊存檔可能缺某一塊，補上 */
  const seed = buildSeed();
  for(const k of Object.keys(seed)) if(S.data[k]===undefined) S.data[k]=seed[k];
  TOUR=S.data.tour; PAX=S.data.pax; NIGHTS=S.data.nights; MENU=S.data.menu; MEALS=S.data.meals;
  for(const d of Object.keys(MEALS)) (MEALS[d]||[]).forEach((m,i)=>{ if(!m.id) m.id="d"+d+"m"+i; });   /* 分桌用的餐次 id */
  applyFusen0917(PAX);   /* 福森號座位一律以產品部 A／C 段座位圖為準 */
  VENDORS=S.data.vendors; VENDOR_TODO=S.data.vendorTodo; BUDGET_ITEMS=S.data.budget;
  BUDGET_HEADCOUNT=S.data.headcount; ITIN=S.data.itin; LUGGAGE_ROUTE=S.data.luggageRoute;
  HSR_TRAINS=S.data.hsrTrains;
  BUDGET_ITEMS.forEach(b=>{ b.budget=(+b.price||0)*(+b.qty||0); });
  /* 一次性：高鐵座位換成 9/11 版表格（含新增／取消人員、台中標記、672 柳董） */
  if((S.data._seatVer||0)<2){
    applyHsr0911(PAX);
    NIGHTS.forEach(n=>{ n.rooms=n.rooms.filter(r=>!((r.who||[]).length===1&&r.who[0]==="陸嘉琪")); });
    const t672=(HSR_TRAINS[2]||[]).find(x=>x.no==="0672");
    if(t672){ t672.fixed=Object.assign({},t672.fixed,{"6車 4A":"p13"}); t672.route="嘉義 18:32 → 台中 18:58 → 台北 19:59"; t672.tag="魏董伉儷、柳董提前返北"; }
    S.data._seatVer=2;
  }
  /* 一次性：依訂位代號校正（薛永南 0203 改 4C）、補訂位代號、標票待確認與已訂未用座位 */
  if((S.data._seatVer||0)<3){
    applyHsr0911(PAX);
    const t672=(HSR_TRAINS[2]||[]).find(x=>x.no==="0672"); if(t672) t672.tbc=["6車 4A"];
    const t664=(HSR_TRAINS[3]||[]).find(x=>x.no==="0664"); if(t664) t664.unused={ "6車 8C":"04420933 已訂・柳董改搭 672" };
    S.data._seatVer=3;
  }
  /* 一次性：0917 高鐵座位表——薛永南 0203 改 5車13C、黃信川 13D 已確認 */
  if((S.data._seatVer||0)<4){ applyHsr0911(PAX); S.data._seatVer=4; }
  /* 一次性：9/22 0664 全部座位已確認（黃信川 11D、薛永南 5車11D、周冠廷 5車11E） */
  if((S.data._seatVer||0)<5){ applyHsr0911(PAX); S.data._seatVer=5; }
  /* 一次性：鳴心咖啡菜單換成店家 9/15 提供的品項，舊示意品項的訂單一併清掉 */
  if((S.data._menuVer||0)<1){
    S.data.menu=buildSeed().menu; MENU=S.data.menu;
    for(const id of Object.keys(S.orders||{})) if(!MENU.find(m=>m.id===S.orders[id].item)) delete S.orders[id];
    S.data._menuVer=1;
  }
  /* 一次性：預算表換成公司系統 9/10 Budget 表；補上新查到的店家與正式團號 */
  if((S.data._budgetVer||0)<1){
    S.data.budget=seed.budget; BUDGET_ITEMS=S.data.budget; S.budgetFinal={};
    if(TOUR.code==="TLE920-2609200A"){ Object.assign(TOUR,{code:seed.tour.code, rc:seed.tour.rc, op:seed.tour.op}); }
    for(const k of ["taxTitle","taxId","budgetPrinted"]) if(TOUR[k]===undefined) TOUR[k]=seed.tour[k];
    seed.vendors.forEach(sv=>{ const v=VENDORS.find(x=>x.id===sv.id); if(!v) VENDORS.push(sv);
      else if(sv.id==="v_linyuan"||sv.id==="v_indigo"){ if(!v.note||sv.id==="v_indigo") Object.assign(v,{addr:sv.addr}); if(sv.id==="v_linyuan"&&!v.note) v.note=sv.note; } });
    S.data.vendorTodo=VENDOR_TODO.filter(([n])=>n!=="梅園樓");
    for(const d of Object.keys(seed.itin)) seed.itin[d].forEach(ss=>{ const st=(ITIN[d]||[]).find(x=>x.t===ss.t&&x.title.slice(0,4)===ss.title.slice(0,4)); if(!st) return;
      ss.links.forEach(l=>{ if(l[0].startsWith("vendors:")&&!(st.links||[]).some(x=>x[0]===l[0])) (st.links=st.links||[]).push([l[0],l[1]]); }); });
    S.data._budgetVer=1;
  }
  if((S.data._tourVer||0)<1){
    if(TOUR.name==="920 董事會阿里山參訪團｜福森號×水山巨木×小山霂茗茶席×優遊吧斯 三日"){ TOUR.name=seed.tour.name; TOUR.sub=seed.tour.sub; }
    if(TOUR.code==="26TS920A3A") TOUR.code=seed.tour.code;
    for(const k of ["ctrl","deadline","seats"]) if(TOUR[k]===undefined) TOUR[k]=seed.tour[k];
    S.data._tourVer=1;
  }
  /* 一次性：9/17 產品部文件——名單職稱／英文名／羅元榮、兩晚實際房號、HUFU 與優遊吧斯餐食說明 */
  if((S.data._docVer||0)<1){
    applyDoc0917(PAX);
    S.data.nights=seed.nights; NIGHTS=S.data.nights;
    for(const d of [2,3]) (MEALS[d]||[]).forEach((m,i)=>{ const sm=(seed.meals[d]||[])[i]; if(sm && m.place===sm.place && /HUFU 套餐（菜單調整中）|合菜（需分菜）・800\/人｜是否品茗/.test(m.menu)) m.menu=sm.menu; });
    S.data._docVer=1;
  }
  if((S.data._docVer||0)<2){
    const fix=(d,i,test)=>{ const m=(MEALS[d]||[])[i], sm=(seed.meals[d]||[])[i]; if(m&&sm&&test.test(m.menu||"")){ m.place=sm.place; m.menu=sm.menu; } };
    fix(1,3,/餐廳已安排分菜/); fix(2,3,/8 菜 1 湯/);
    const st=(ITIN[1]||[]).find(x=>x.t==="18:00"&&/神木廳/.test(x.title)); const ss=(seed.itin[1]||[]).find(x=>x.t==="18:00");
    if(st&&ss){ st.title=ss.title; st.desc=ss.desc; st.staff=ss.staff; }
    const va=VENDORS.find(v=>v.id==="v_alishan"), sva=seed.vendors.find(v=>v.id==="v_alishan"); if(va&&sva&&/神木廳/.test(va.note||"")){ va.sub=sva.sub; va.note=sva.note; }
    S.data._docVer=2;
  }
  if((S.data._docVer||0)<3){
    for(const d of Object.keys(ITIN)) (ITIN[d]||[]).forEach(st=>(st.links||[]).forEach(l=>{ if(l[0]==="meals"&&l[1]==="餐食・分桌") l[1]="餐廳分桌"; }));
    S.data._docVer=3;
  }
  /* 一次性：0916 分房表（Excel）——螘金花 9/15 取消、工作人員房、床型代碼、職稱 */
  if((S.data._docVer||0)<4){
    applyHsr0911(PAX); applyDoc0917(PAX);
    S.data.nights=seed.nights; NIGHTS=S.data.nights;
    const t203=(HSR_TRAINS[1]||[]).find(x=>x.no==="0203"); if(t203) t203.unused=Object.assign({},t203.unused,{ "6車 14E":"03574156 已訂・螘金花 9/15 取消" });
    const t664b=(HSR_TRAINS[3]||[]).find(x=>x.no==="0664"); if(t664b) t664b.unused=Object.assign({},t664b.unused,{ "6車 6E":"04421386 已訂・螘金花 9/15 取消" });
    for(const k of Object.keys(S.seating||{})) (S.seating[k].tables||[]).forEach(t=>{ t.seats=t.seats.map(v=>v==="p15"?null:v); });
    S.data._docVer=4;
  }
  if((S.data._docVer||0)<5){
    for(const d of Object.keys(ITIN)) (ITIN[d]||[]).forEach(st=>{ if(st.links) st.links=st.links.filter(l=>l[0]!=="seats:bus"); });
    if(S.seatTab==="bus") S.seatTab="hsr";
    S.data._docVer=5;
  }
  /* 一次性：0917 Google 名單第一頁——稱謂、關係、特殊餐食（陳萱、王岳聰、張振明）、邱浩軒只搭回程、羅元榮 9/11 取消 */
  if((S.data._docVer||0)<6){
    applyDoc0917(PAX);
    const setMeal=(id,v)=>{ const p=pax(id); if(p) p.meal=v; };
    setMeal("p28","忌乳製品含起司"); setMeal("p17","忌乳製品含起司"); setMeal("p08","");
    const p20=pax("p20"); if(p20&&!/只搭回程/.test(p20.note||"")) p20.note=[p20.note,"9/20 在嘉義高鐵站等貴賓，只搭回程"].filter(Boolean).join("；");
    NIGHTS.forEach(n=>n.rooms.forEach(r=>{ r.who=(r.who||[]).filter(w=>w!=="羅元榮"); }));
    for(const k of Object.keys(S.seating||{})) (S.seating[k].tables||[]).forEach(t=>{ t.seats=t.seats.map(v=>v==="p32"?null:v); });
    S.data._docVer=6;
  }
  /* 一次性：名單順序改成照 Google 名單第一頁 */
  if((S.data._docVer||0)<7){ sortPaxBySheet(PAX); S.data._docVer=7; }
  /* 一次性：英迪格房號改回三位數（0601 → 601） */
  /* 一次性：預算表換成 9/18 版 Budget 表（已付訂金改由表帶入） */
  if((S.data._budgetVer||0)<2){
    S.data.budget=seed.budget; BUDGET_ITEMS=S.data.budget; S.data.headcount=seed.headcount; BUDGET_HEADCOUNT=seed.headcount;
    S.budgetFinal={}; S.budgetDeposit={}; S.budgetNote={}; TOUR.budgetPrinted=seed.tour.budgetPrinted;
    S.data._budgetVer=2;
  }
  /* 一次性：店家 LINE 回覆的訂購證明掛到行程節點；補梅園樓司領寄舖節點 */
  if((S.data._docVer||0)<10){ applyStopConf(ITIN); S.data._docVer=10; }
  /* 一次性：點名「筆記」併進旅客「備註」——同一個欄位，改一處全部同步 */
  if((S.data._docVer||0)<11){
    for(const [id,n] of Object.entries(S.notes||{})){ const p=pax(id); if(p&&n&&!(p.note||"").includes(n)) p.note=[p.note,n].filter(Boolean).join("；"); }
    S.notes={}; S.data._docVer=11;
  }
  if((S.data._docVer||0)<8){
    const N2=NIGHTS.find(n=>n.key===2);
    if(N2){ N2.rooms.forEach(r=>{ r.no=String(r.no||"").replace(/\b0(6\d\d)\b/g,"$1"); }); if(N2.info) N2.info=N2.info.replace(/\b0(6\d\d)\b/g,"$1"); }
    S.data._docVer=8;
  }
  if((S.data._tourVer||0)<2){
    const st=(ITIN[2]||[]).find(x=>x.title==="自選 · 祝山日出");
    if(st){ st.links=(st.links||[]).filter(l=>l[0]!=="roster"); if(!st.links.some(l=>l[0]==="optin:sunrise")) st.links.unshift(["optin:sunrise","日出名單"]); }
    S.data._tourVer=2;
  }
  /* 一次性：9/18 交班表——報到／集合時間、人數、出團款、RC／OP 電話；D1 加「集合 · 站前門市」節點 */
  if((S.data._tourVer||0)<3){
    for(const k of ["checkin","meet","total","cashOut"]) if(!TOUR[k]) TOUR[k]=seed.tour[k];
    if(TOUR.rc==="莊學憲") TOUR.rc=seed.tour.rc;
    if(/^陳璟茹（/.test(TOUR.op||"")) TOUR.op=seed.tour.op;
    const d1=ITIN[1]||(ITIN[1]=[]); const ss=(seed.itin[1]||[]).find(x=>x.title==="集合 · 台北雄獅 站前門市");
    if(ss&&!d1.some(x=>x.title===ss.title)){ d1.push(JSON.parse(JSON.stringify(ss))); d1.sort((a,b)=>String(a.t).localeCompare(String(b.t))); }
    S.data._tourVer=3;
  }
  /* 一次性升級：舊資料裡泛用的「店家聯絡」捷徑換成 seed 指到特定店家的版本；分房補上飯店對應 */
  for(const d of Object.keys(ITIN)) (ITIN[d]||[]).forEach(st=>(st.links||[]).forEach(l=>{
    if(l[0]!=="vendors") return;
    const ss=(seed.itin[d]||[]).find(x=>x.title===st.title);
    const sl=ss&&(ss.links||[]).find(x=>String(x[0]).startsWith("vendors:"));
    if(sl){ l[0]=sl[0]; l[1]=sl[1]; }
  }));
  NIGHTS.forEach(n=>{ if(n.vendor===undefined){ const sn=seed.nights.find(x=>x.key===n.key); if(sn&&sn.vendor) n.vendor=sn.vendor; } });
}
function resetSection(key){ S.data[key]=buildSeed()[key]; }
function newId(prefix){ return prefix+Date.now().toString(36)+Math.random().toString(36).slice(2,5); }
/* 任何一筆資料改完都走這裡：重新綁定、存檔、關表單、重畫 */
function dataChanged(msg){ bindData(); save(); closeModal(); render(); if(msg) toast(msg); }

/* ============================================================ STATE
 * 三天兩夜的團，資料掉了就是災難，所以每次存檔同時寫兩個地方：
 *   localStorage  同步寫入，當下就落地，但 Safari 只給約 5MB
 *   IndexedDB     非同步寫入，容量大，是真正的主力
 * 兩邊都帶 rev 版號，開啟時取版號較新的那份。
 * 任何一次存檔若兩邊都失敗，畫面頂端會出現紅色橫幅——絕不無聲失敗。
 * 大的東西（簽名、照片、上傳檔案）一律不進 localStorage，只走 IndexedDB。 */
const PREVIEW = false;            /* artifact 預覽版由 build.py 翻成 true：資料不保存，提示改用中性語氣 */
const SKEY   = "tle920_v3";
const SKEY_B = "tle920_v3_bak";   /* localStorage 第二份，主檔毀損時的救生圈 */

function DEFAULTS(){
  return { tab:"lead", page:null, day:1, seatTab:"hsr", homeTab:"list",
    rosterMode:"roll",
    fields:{}, fieldsVer:2,   /* 欄位預設見 ROSTER_FIELDS */
    roll:{1:{},2:{},3:{}}, notes:{}, orders:{}, lug:{}, sigs:[], budgetFinal:{}, budgetDeposit:{}, budgetNote:{}, budgetDone:{}, vconf:{}, optin:{}, seating:{},
    dl:{status:"idle",ts:null}, rev:0, savedAt:0 };
}

/* 寧可不收，也不要收到半殘的存檔：結構不對就當作壞檔，改用備份 */
function parseState(raw){
  if(!raw) return null;
  const o = JSON.parse(raw);
  if(!o || typeof o!=="object" || !o.roll || !o.fields) throw new Error("存檔結構不符");
  return o;
}

function loadLocal(){
  for(const key of [SKEY, SKEY_B]){
    try{
      const o = parseState(localStorage.getItem(key));
      if(o){ if(key===SKEY_B) console.warn("主存檔毀損，改用 localStorage 備份"); return o; }
    }catch(e){ console.warn("讀取存檔失敗：", key, e.message); }
  }
  return null;
}

let S = loadLocal() || DEFAULTS();

/* 補齊舊版本存檔缺少的欄位 */
if(!S.budgetFinal) S.budgetFinal={};
if(!S.vconf) S.vconf={};
if(!S.optin) S.optin={};
if(!S.seating) S.seating={};
if(!S.sigs) S.sigs=[];
if(typeof S.rev!=="number") S.rev=0;

/* ---------- 存檔健康狀態（畫面頂端橫幅與「資料保全」頁共用）---------- */
const HEALTH = {
  ls:null,          /* 上次 localStorage 寫入是否成功 */
  idb:null,         /* 上次 IndexedDB 寫入是否成功 */
  lastOk:S.savedAt||0,
  err:"",
  persisted:null,   /* 是否已取得常駐儲存許可 */
  quota:null,
  lastBackup:0,
  backups:0,
};

function durable(){ return HEALTH.ls===true || (HEALTH.idb===true && !memMode); }

function updateSaveBar(){
  const bar = document.getElementById("savebar");
  if(!bar) return;
  if(HEALTH.ls===null && HEALTH.idb===null){ bar.className="savebar"; bar.innerHTML=""; return; }

  if(PREVIEW){
    bar.className="savebar warn";
    bar.innerHTML = `<b>預覽版</b><span>資料只留在這個瀏覽器分頁。正式帶團請用 GitHub Pages 加入主畫面的版本。</span>`;
    return;
  }
  if(!durable()){
    bar.className="savebar bad";
    bar.innerHTML = `<b>⚠️ 資料沒有存進去</b>
      <span>${esc(HEALTH.err||"儲存空間寫入失敗")}。請立刻到「資料保全」匯出備份，避免資料遺失。</span>
      <button data-go="storage">前往處理</button>`;
  }else if(memMode){
    bar.className="savebar warn";
    bar.innerHTML = `<b>照片僅存在記憶體</b>
      <span>此裝置封鎖了 IndexedDB，關掉程式後照片與上傳檔案會消失。點名與紀錄不受影響。</span>
      <button data-go="storage">查看說明</button>`;
  }else{
    bar.className="savebar"; bar.innerHTML=""; return;
  }
  const b = bar.querySelector("[data-go]");
  if(b) b.onclick = ()=>goPage(b.dataset.go);
}

/* ---------- 存檔 ---------- */
function save(){
  S.rev = (S.rev||0)+1;
  S.savedAt = Date.now();
  let json;
  try{ json = JSON.stringify(S); }
  catch(e){ HEALTH.ls=false; HEALTH.idb=false; HEALTH.err="資料無法序列化："+e.message; updateSaveBar(); return; }

  /* 1) localStorage：同步，當下就落地 */
  try{
    localStorage.setItem(SKEY, json);
    HEALTH.ls=true; HEALTH.err="";
  }catch(e){
    /* 配額爆掉時先丟掉 localStorage 的第二份騰空間，再試一次 */
    try{
      localStorage.removeItem(SKEY_B);
      localStorage.setItem(SKEY, json);
      HEALTH.ls=true; HEALTH.err="";
    }catch(e2){
      HEALTH.ls=false;
      HEALTH.err = /quota|exceed/i.test(e2.name+e2.message)
        ? "localStorage 容量已滿" : ("localStorage 寫入失敗："+e2.message);
    }
  }
  /* 每 10 次留一份 localStorage 備份，成本低但救得回大部分情況 */
  if(HEALTH.ls && S.rev%10===0){ try{ localStorage.setItem(SKEY_B, json); }catch(e){} }

  /* 2) IndexedDB：主力，容量大 */
  idbPut("state",{ id:"S", json, rev:S.rev, ts:S.savedAt })
    .then(()=>{ HEALTH.idb = !memMode; if(durable()){ HEALTH.lastOk=S.savedAt; HEALTH.err=""; } updateSaveBar(); })
    .catch(e=>{ HEALTH.idb=false; if(!HEALTH.ls) HEALTH.err="IndexedDB 寫入失敗："+(e&&e.message||e); updateSaveBar(); });

  if(durable()) HEALTH.lastOk=S.savedAt;
  updateSaveBar();
  scheduleBackup();
}

/* ---------- 自動備份：每次存檔後最多 60 秒寫一份快照，保留最近 40 份 ---------- */
let bkTimer=null;
function scheduleBackup(){
  if(bkTimer) return;
  bkTimer = setTimeout(()=>{ bkTimer=null; writeBackup("auto"); }, 60000);
}
async function writeBackup(kind){
  try{
    const ts = Date.now();
    await idbPut("backups",{ id:"bk"+ts, ts, kind, rev:S.rev, day:S.day, json:JSON.stringify(S) });
    const all = await idbAll("backups");
    all.sort((a,b)=>b.ts-a.ts);
    for(const old of all.slice(40)) await idbDel("backups", old.id);
    HEALTH.lastBackup = ts;
    HEALTH.backups = Math.min(all.length, 40);
    return true;
  }catch(e){ console.warn("備份寫入失敗", e); return false; }
}

/* ---------- 常駐儲存：向 iOS 要求不要在空間不足時清掉我們的資料 ---------- */
async function requestPersist(){
  try{
    if(!navigator.storage || !navigator.storage.persist) return null;
    if(await navigator.storage.persisted()) return true;
    return await navigator.storage.persist();
  }catch(e){ return null; }
}
async function readQuota(){
  try{
    if(!navigator.storage || !navigator.storage.estimate) return null;
    const q = await navigator.storage.estimate();
    return { usage:q.usage||0, quota:q.quota||0 };
  }catch(e){ return null; }
}
const pax = id => PAX.find(p=>p.id===id);
const esc = s => String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const GUESTS = ()=>PAX.filter(p=>p.group!=="工作人員");

/* ============================================================ IndexedDB */
/* Safari 以 file:// 開啟時會封鎖 IndexedDB，改用記憶體備援（當次開啟有效）。
 * iOS 把 App 丟到背景久一點，IndexedDB 連線會被系統關掉（InvalidStateError）；
 * 所以每次操作失敗先「重連再試一次」，真的不行才退回記憶體，絕不因一次閃失就整團照片都只留在記憶體裡。 */
let idb=null;
const MEM={files:new Map(),photos:new Map(),state:new Map(),backups:new Map(),sigs:new Map()};
let memMode=false;
let idbOpening=null;
function idbConnect(timeoutMs){
  if(idbOpening) return idbOpening;
  idbOpening = new Promise(res=>{
    let rq;
    try{ rq = indexedDB.open("tle920", 2); }
    catch(e){ console.warn("IndexedDB 不可用",e); idbOpening=null; return res(null); }
    let settled=false;
    const done=db=>{ if(settled) return; settled=true; idbOpening=null; res(db); };
    rq.onupgradeneeded = e=>{
      const db=e.target.result;
      if(!db.objectStoreNames.contains("files"))   db.createObjectStore("files",{keyPath:"id"});
      if(!db.objectStoreNames.contains("photos"))  db.createObjectStore("photos",{keyPath:"id"});
      /* v2 新增：狀態主檔、滾動備份、電子簽名 */
      if(!db.objectStoreNames.contains("state"))   db.createObjectStore("state",{keyPath:"id"});
      if(!db.objectStoreNames.contains("backups")) db.createObjectStore("backups",{keyPath:"id"});
      if(!db.objectStoreNames.contains("sigs"))    db.createObjectStore("sigs",{keyPath:"id"});
    };
    rq.onsuccess=()=>{
      const db=rq.result;
      db.onclose=()=>{ console.warn("IndexedDB 連線被系統關閉，下次操作會自動重連"); if(idb===db) idb=null; };
      db.onversionchange=()=>{ try{ db.close(); }catch(e){} if(idb===db) idb=null; };
      idb=db;
      if(memMode){ memMode=false; flushMem(); }   /* 開太慢逾時過，但其實開成功：接回來並把記憶體裡的東西補寫進去 */
      done(db);
    };
    rq.onerror=()=>{ console.warn("IndexedDB 開啟失敗", rq.error); done(null); };
    rq.onblocked=()=>done(null);
    if(timeoutMs) setTimeout(()=>done(null), timeoutMs);   /* 逾時保護：確保畫面一定會出來；之後開成功仍會接回 */
  });
  return idbOpening;
}
async function idbOpen(){
  const db = await idbConnect(2500);
  if(!db) memMode=true;
}
/* 逾時期間或斷線期間寫進記憶體的東西，連線恢復後補寫回 IndexedDB */
async function flushMem(){
  for(const st of Object.keys(MEM)){
    for(const v of [...MEM[st].values()]){
      try{ await idbPut(st,v); MEM[st].delete(v.id); }catch(e){ console.warn("補寫失敗", st, v.id, e); }
    }
  }
  updateSaveBar();
}
/* 每個操作：沒連線→先連；失敗→重連再試一次；還是不行→記憶體 */
async function idbRun(st, mode, fn, memFn){
  if(memMode) return memFn();
  let lastErr=null;
  for(let attempt=0; attempt<2; attempt++){
    if(!idb){ await idbConnect(4000); if(!idb) break; }
    try{
      return await new Promise((res,rej)=>{
        const t=idb.transaction(st,mode); const os=t.objectStore(st);
        const out=fn(os);
        t.oncomplete=()=>res(out && out.__rq ? (out.__rq.result ?? out.dflt) : undefined);
        t.onerror=()=>rej(t.error); t.onabort=()=>rej(t.error||new Error("aborted"));
      });
    }catch(e){
      lastErr=e; console.warn("IndexedDB 操作失敗", st, e && e.message);
      const closed = e && /InvalidState|closing|closed|TransactionInactive/i.test(String(e.name||"")+String(e.message||""));
      if(closed && attempt===0){ idb=null; continue; }   /* 連線被關掉：重連再試一次 */
      if(/Quota/i.test(String(e&&e.name))) throw e;     /* 空間滿了要讓上層知道，不能默默丟進記憶體 */
    }
  }
  /* 連線根本開不起來才退回記憶體；連線好好的但某次寫入失敗，就把錯誤丟給上層跳警告，不能把整個 session 都改成記憶體 */
  if(idb && lastErr) throw lastErr;
  memMode=true; updateSaveBar();
  return memFn();
}
const idbPut=(st,v)=>idbRun(st,"readwrite",os=>{ os.put(v); }, ()=>{ MEM[st].set(v.id,v); });
const idbGet=(st,id)=>idbRun(st,"readonly",os=>({__rq:os.get(id),dflt:null}), ()=>MEM[st].get(id)||null);
const idbAll=st=>idbRun(st,"readonly",os=>({__rq:os.getAll(),dflt:[]}), ()=>[...MEM[st].values()]);
const idbDel=(st,id)=>idbRun(st,"readwrite",os=>{ os.delete(id); }, ()=>{ MEM[st].delete(id); });
const idbClear=st=>idbRun(st,"readwrite",os=>{ os.clear(); }, ()=>{ MEM[st].clear(); });
/* 存不進去絕不能無聲：照片／檔案／手寫這類只在 IndexedDB 的東西，失敗要跳出來講 */
async function idbPutOrWarn(st, v, what){
  try{ await idbPut(st, v); return true; }
  catch(e){
    console.error(what+" 儲存失敗", e);
    HEALTH.idb=false; HEALTH.err=(/Quota/i.test(String(e&&e.name))?"儲存空間已滿":"IndexedDB 寫入失敗：")+(e&&e.message||"");
    updateSaveBar();
    openModal("⚠️ "+what+"沒有存進去",`<p style="line-height:1.7">${esc(HEALTH.err)}。<br>請先到「設定 · 資料保全」匯出完整備份，再檢查 iPad 剩餘空間。</p>`,[["前往資料保全","pri",()=>{ closeModal(); goPage("storage"); }],["關閉","sec",closeModal]]);
    return false;
  }
}

/* ============================================================ SHELL */
const $=s=>document.querySelector(s);
function toast(msg){
  const t=$("#toast"); t.textContent=msg; t.classList.add("on");
  clearTimeout(t._h); t._h=setTimeout(()=>t.classList.remove("on"),1900);
}
/* 只有一個主畫面「帶團中」；底部分頁列拿掉了（首頁分頁只是回到同一頁，標題列已有「首頁」） */
const NAVS=[["lead","flag","帶團中"]];
function goTab(t){ S.tab=t; S.page=null; save(); render(); }
/* 上一頁：記住走過的頁面（只在這次開啟期間），標題列「上一頁」照原路退回；「首頁」直接回帶團中 */
const NAV_HIST=[];
const navSnap=()=>({tab:S.tab,page:S.page,seatTab:S.seatTab,mealId:S.mealId,optKey:S.optKey,night:S.night,fusenSeg:S.fusenSeg,fusenCar:S.fusenCar});
const navSame=(a,b)=>a.tab===b.tab&&a.page===b.page&&a.seatTab===b.seatTab&&a.mealId===b.mealId&&a.optKey===b.optKey;
function goPage(p,opts={}){
  if(p&&p.startsWith("vendors:")){ openVendorModal(p.slice(8)); return; }
  if(!opts.back){ const cur=navSnap(); if(!NAV_HIST.length||!navSame(NAV_HIST[NAV_HIST.length-1],cur)) NAV_HIST.push(cur); if(NAV_HIST.length>40) NAV_HIST.shift(); }
  if(p&&p.includes(":")){ const [a,b]=p.split(":"); S.page=a; if(a==="seats") S.seatTab=(b==="bus"?"hsr":b); if(a==="optin") S.optKey=b; if(a==="tables") S.mealId=b; }
  else S.page=p;
  S.tab="lead"; if(p===null) NAV_HIST.length=0; save(); render();
}
function goBack(){
  const cur=navSnap(); let prev=null;
  while(NAV_HIST.length){ const c=NAV_HIST.pop(); if(!navSame(c,cur)){ prev=c; break; } }
  if(!prev){ goPage(null,{back:true}); return; }
  Object.assign(S,{tab:prev.tab,page:prev.page,seatTab:prev.seatTab,mealId:prev.mealId,optKey:prev.optKey,night:prev.night,fusenSeg:prev.fusenSeg,fusenCar:prev.fusenCar});
  save(); render();
}
function render(){
  bindData();
  S.editMode=false;   /* 編輯改成長按，沒有編輯模式了 */
  document.body.classList.toggle("wide-page", S.tab==="lead"&&((S.page==="seats"&&S.seatTab==="hsr")||S.page==="budget"||S.page==="rooms"||(S.page==="roster"&&S.rosterMode==="list")));
  EDIT_HANDLER=null; window.LB_WIRE=null;
  if(!NAVS.some(n=>n[0]===S.tab)) S.tab="lead";
  if(S.page && !PAGES[S.page]) S.page=null;   /* 舊存檔指到已拿掉的頁面（例如交班文件）就回帶團中 */
  const hdr=$("#hdr"), scr=$("#screen");
  scr.innerHTML=""; hdr.innerHTML="";
  if(S.tab==="lead"&&S.page){ PAGES[S.page](hdr,scr); }
  else if(S.tab==="lead"){ renderLead(hdr,scr); }
  else if(S.tab==="home"){ renderHome(hdr,scr); }
  else{ renderStub(hdr,scr); }
  tagLongPress(scr); tagLongPress(hdr);
  updateSaveBar();
  scr.scrollTop=0;
}
function hbar(hdr,title,{back=false,dark=false}={}){
  hdr.innerHTML=`<div class="hbar${dark?" dark":""}">
    <div class="hleft">${back?`<button class="backbtn" title="上一頁">${ic("back",16)}<span>上一頁</span></button><button class="homebtn" title="首頁">${ic("home",16)}<span>首頁</span></button>`:""}</div>
    <div class="htitle">${esc(title)}</div>
    <div class="hright"></div>
  </div>`;
  const bk=hdr.querySelector(".backbtn"); if(bk) bk.onclick=goBack;
  const hm=hdr.querySelector(".homebtn"); if(hm) hm.onclick=()=>goPage(null);
}

/* ============================================================ 通用編輯表單
 * fields: [{k, label, type, opts, ph, hint, required, rows}]
 * type: text | textarea | number | select | days | chips | lines
 *   lines  → textarea 一行一筆，存成陣列
 *   days   → 第 1/2/3 天多選，存成 [1,2]
 *   chips  → 多選，opts 為 [[值,標籤]]，存成值的陣列 */
function editForm(title, fields, obj, {onSave, onDelete, extra=[]}={}){
  const html = fields.map(f=>{
    const v = obj ? obj[f.k] : undefined;
    const id = "ef_"+f.k, t = f.type||"text";
    let ctl = "";
    if(t==="textarea")   ctl=`<textarea id="${id}" rows="${f.rows||3}" placeholder="${esc(f.ph||"")}">${esc(v??"")}</textarea>`;
    else if(t==="lines") ctl=`<textarea id="${id}" rows="${f.rows||3}" placeholder="${esc(f.ph||"一行一筆")}">${esc((v||[]).join("\n"))}</textarea>`;
    else if(t==="number")ctl=`<input type="text" inputmode="decimal" id="${id}" value="${v??""}" placeholder="${esc(f.ph||"")}">`;
    else if(t==="select")ctl=`<select id="${id}">${f.opts.map(o=>{ const [ov,ol]=Array.isArray(o)?o:[o,o];
                           return `<option value="${esc(ov)}"${String(v)===String(ov)?" selected":""}>${esc(ol)}</option>`; }).join("")}</select>`;
    else if(t==="days")  ctl=`<div class="efchips" id="${id}">${[1,2,3].map(d=>`<button type="button" class="chip${(v||[]).includes(d)?" on":""}" data-v="${d}">第 ${d} 天</button>`).join("")}</div>`;
    else if(t==="chips") ctl=`<div class="efchips" id="${id}">${f.opts.map(([ov,ol])=>`<button type="button" class="chip${(v||[]).includes(ov)?" on":""}" data-v="${esc(ov)}">${esc(ol)}</button>`).join("")}</div>`;
    else                 ctl=`<input type="text" id="${id}" value="${esc(v??"")}" placeholder="${esc(f.ph||"")}">`;
    return `<div class="field"><label for="${id}">${esc(f.label)}${f.required?'<span class="efreq">*</span>':""}${f.hint?`<span class="efhint">${esc(f.hint)}</span>`:""}</label>${ctl}</div>`;
  }).join("");

  const btns=[...extra];
  if(onDelete) btns.push(["刪除","ghost",()=>confirmBox("確定刪除這一筆？",()=>{ onDelete(); })]);
  btns.push(["取消","sec",closeModal]);
  btns.push(["儲存","pri",()=>{
    const out = Object.assign({}, obj||{});
    for(const f of fields){
      const el=$("#ef_"+f.k); if(!el) continue;
      const t=f.type||"text";
      if(t==="lines")        out[f.k]=el.value.split("\n").map(x=>x.trim()).filter(Boolean);
      else if(t==="number"){ const n=parseFloat(String(el.value).replace(/[^\d.-]/g,"")); out[f.k]=isNaN(n)?0:n; }
      else if(t==="days")    out[f.k]=[...el.querySelectorAll(".chip.on")].map(c=>+c.dataset.v);
      else if(t==="chips")   out[f.k]=[...el.querySelectorAll(".chip.on")].map(c=>c.dataset.v);
      else                   out[f.k]=el.value.trim();
    }
    for(const f of fields) if(f.required && (out[f.k]==="" || out[f.k]==null || (Array.isArray(out[f.k])&&!out[f.k].length))){
      toast(`請填寫「${f.label}」`); return;
    }
    onSave(out);
  }]);
  openModal(title, `<div class="efform">${html}</div>`, btns);
  $("#mbox").querySelectorAll(".efchips .chip").forEach(c=>c.onclick=()=>c.classList.toggle("on"));
  const first=$("#mbox").querySelector("input,textarea"); if(first) setTimeout(()=>first.focus(),80);
}

/* 頁尾工具列：＋新增（還原預設只在有給的頁面）。修改一律「長按卡片」 */
function editBar(parent, {add, addLabel="新增", reset, resetLabel="還原此頁預設"}={}){
  const bar=document.createElement("div");
  bar.className="editbar";
  bar.innerHTML=`<span class="ebl">${ic("hand",13)} 長按卡片可修改</span>
    ${add?`<button class="btn sec" data-a="add">＋ ${esc(addLabel)}</button>`:""}
    ${reset?`<button class="btn ghost" data-a="reset">${esc(resetLabel)}</button>`:""}`;
  const a=bar.querySelector('[data-a="add"]');   if(a) a.onclick=add;
  const r=bar.querySelector('[data-a="reset"]'); if(r) r.onclick=()=>confirmBox(`${resetLabel}？這一頁改過的內容會被覆蓋。`,()=>{ reset(); dataChanged("已還原預設"); });
  parent.appendChild(bar);
}
/* 長按＝編輯：render 後把每個 ✎ 錨點所在的卡片標成 data-lp，長按 0.5 秒開表單 */
let LP_MODAL=null;   /* 彈窗（店家資訊）內的長按處理 */
function tagLongPress(root){
  root.querySelectorAll(".ebtn").forEach(b=>{
    const host=b.closest("tr.prow,.mealcard2,.reccard,.rollcard,.vcard,.roomcard,.bgitem,.ordrow,td.det,.bh1,.tinfo,.stop,.card")||b.parentElement;
    if(host){ host.dataset.lp=b.dataset.e; host.classList.add("lp"); }
  });
}
(function installLongPress(){
  let press=null;
  const cancel=()=>{ if(!press) return; clearTimeout(press.timer); press.el.classList.remove("lp-hold"); press=null; };
  document.addEventListener("pointerdown",e=>{
    if(e.pointerType==="mouse"&&e.button!==0) return;
    const host=e.target.closest("[data-lp]"); if(!host) return;
    if(e.target.closest("input,textarea,select,button,a,.tseat,.zw,.bgpaper.on,canvas,.pen,.chip,.ckbox,.arrived,.vck,.lugck,.stepper")) return;
    cancel();
    press={el:host,id:e.pointerId,x:e.clientX,y:e.clientY,timer:setTimeout(()=>{
      const key=host.dataset.lp, inModal=!!host.closest("#mbox");
      host.classList.remove("lp-hold"); press=null;
      if(navigator.vibrate) navigator.vibrate(12);
      const swallow=ev=>{ ev.stopPropagation(); ev.preventDefault(); };
      document.addEventListener("click",swallow,{capture:true,once:true}); setTimeout(()=>document.removeEventListener("click",swallow,{capture:true}),600);
      if(inModal){ if(LP_MODAL) LP_MODAL(key,host); }
      else if(EDIT_HANDLER) EDIT_HANDLER(key,host);
    },500)};
    host.classList.add("lp-hold");
  },true);
  document.addEventListener("pointermove",e=>{ if(press&&press.id===e.pointerId&&Math.hypot(e.clientX-press.x,e.clientY-press.y)>8) cancel(); },true);
  document.addEventListener("pointerup",cancel,true); document.addEventListener("pointercancel",cancel,true);
  document.addEventListener("contextmenu",e=>{ if(e.target.closest("[data-lp]")) e.preventDefault(); });
})();
let EDIT_HANDLER=null;   /* 每頁 render 時設定；#screen 上的委派會呼叫它 */
const ebtn = (key,inline)=>`<button class="ebtn${inline?" inl":""}" data-e="${esc(key)}" title="編輯">${ic("pen",13)}</button>`;
/* 上下移動：行程節點這種有順序的清單用 */
function moveItem(arr,i,dir){ const j=i+dir; if(j<0||j>=arr.length) return false; [arr[i],arr[j]]=[arr[j],arr[i]]; return true; }

/* ---- 各頁面共用的欄位描述 ---- */
const GROUP_OPTS=["貴賓","雄獅主管","工作人員"];
const PAX_FIELDS=[
  {k:"name",label:"姓名",required:true},{k:"rel",label:"稱謂／職稱",ph:"董事、董事長夫人…"},
  {k:"en",label:"英文名"},{k:"hon",label:"稱謂（現場稱呼）"},{k:"title",label:"職稱（名單）"},{k:"group",label:"分組",type:"select",opts:GROUP_OPTS},
  {k:"days",label:"在團日",type:"days"},{k:"table",label:"分桌",type:"select",opts:[[0,"不分桌"],[1,"第 1 桌"],[2,"第 2 桌"]]},
  {k:"idNo",label:"身分證號"},{k:"birth",label:"生日",ph:"1953/02/26"},{k:"tkt",label:"高鐵票種",ph:"商務・敬老"},
  {k:"hsrGo",label:"高鐵去程座位",ph:"6車 17A"},{k:"hsrBack",label:"高鐵回程座位",ph:"6車 6A"},
  {k:"pnrGo",label:"去程訂位代號"},{k:"pnrBk",label:"回程訂位代號"},
  {k:"trainSeat",label:"福森號座位（以產品部 A／C 段圖為準，改這裡不會動圖）",ph:"5車 1號"},
  {k:"board",label:"台中上／下車",type:"select",opts:[["","否"],["台中","台中"]]},
  {k:"meal",label:"特殊餐食",ph:"忌生食／海鮮…"},{k:"note",label:"備註",type:"textarea",rows:2},
];
const linkOpts=()=>FUNCS.map(([id,,lb])=>[id,lb])
  .concat([["seats:hsr","高鐵座位表"],["consent","離隊切結"],["storage","資料保全"]])
  .concat(VENDORS.map(v=>["vendors:"+v.id, v.name+" 資訊"]));
const linkLabel=v=>{ const o=linkOpts().find(x=>x[0]===v); return o?o[1]:v; };
const ITIN_FIELDS=()=>[
  {k:"t",label:"時間",ph:"09:30",required:true},{k:"title",label:"標題",required:true},
  {k:"desc",label:"說明",type:"textarea",rows:3},
  {k:"staff",label:"工作事項",type:"lines",rows:3,hint:"一行一項"},
  {k:"_links",label:"捷徑",type:"chips",opts:linkOpts()},
];
const MEAL_FIELDS=()=>[
  {k:"slot",label:"餐次",type:"select",opts:["早餐","午餐","晚餐","小點","點心","茶席","宵夜"]},
  {k:"place",label:"地點",required:true},{k:"menu",label:"內容",type:"textarea",rows:3},
  {k:"st",label:"狀態",type:"select",opts:["OK","待確認"]},
  {k:"vids",label:"對應店家",type:"chips",opts:VENDORS.map(v=>[v.id,v.name])},
];
const VENDOR_FIELDS=[
  {k:"name",label:"店家名稱",required:true},{k:"sub",label:"副標",ph:"D1 早餐"},
  {k:"days",label:"哪幾天會用到",type:"days"},{k:"slots",label:"餐次標籤",type:"lines",rows:2},
  {k:"tel",label:"電話",type:"lines",rows:2,hint:"一行一支"},{k:"telNote",label:"電話備註",ph:"林鐵及文資處"},
  {k:"addr",label:"地址"},{k:"hours",label:"營業時間"},{k:"email",label:"Email"},{k:"line",label:"LINE ID"},{k:"url",label:"網址"},
  {k:"note",label:"備註",type:"textarea",rows:2},{k:"warn",label:"須優先釐清",type:"textarea",rows:2,hint:"有填就會置頂"},
];
const ROOM_FIELDS=[
  {k:"no",label:"房號／代號",required:true},{k:"type",label:"房型"},
  {k:"floor",label:"樓層（數字）",type:"number"},
  {k:"who",label:"入住",type:"lines",rows:3,hint:"一行一人"},{k:"note",label:"備註"},
];
const MENU_FIELDS=[{k:"em",label:"圖示",ph:"☕"},{k:"name",label:"品名",required:true},
  {k:"temp",label:"冷／熱",type:"select",opts:[["熱","熱"],["冰","冰"]]},{k:"price",label:"價格（未定填 0）",type:"number"},
  {k:"note",label:"品項說明",ph:"例：口味淡薄・無法回沖"}];
const BUDGET_FIELDS=()=>[
  {k:"day",label:"第幾天",type:"select",opts:[[1,"第 1 天"],[2,"第 2 天"],[3,"第 3 天"]]},{k:"t",label:"時間",ph:"13:20"},
  {k:"cat",label:"元件",type:"select",opts:BUDGET_CATS},{k:"slot",label:"餐次",ph:"早餐／午餐／下午茶（非餐廳留空）"},
  {k:"vendor",label:"店家／對象",required:true},{k:"name",label:"訂購明細",required:true},
  {k:"price",label:"項次單價",type:"number"},{k:"qty",label:"數量",type:"number"},{k:"unit",label:"單位",ph:"人／台／間／桌"},
  {k:"dep",label:"已付訂金（公司行前已付，此筆）",type:"number"},
  {k:"pay",label:"付款方式",type:"select",opts:BUDGET_PAYS},{k:"grp",label:"合併小計代碼",ph:"同一張單的項目填相同代碼，例 g_yuyu_meal"},
  {k:"note",label:"備註",type:"textarea",rows:2},
];
const TOUR_FIELDS=[
  {k:"code",label:"團號"},{k:"name",label:"標準團名"},{k:"sub",label:"副標（行程名）",type:"textarea",rows:2},{k:"ctrl",label:"團控說明"},{k:"seats",label:"團位／HL／可賣"},{k:"dateTxt",label:"出團日"},
  {k:"leader",label:"領隊"},{k:"checkin",label:"報到時間"},{k:"meet",label:"集合時間／地點"},{k:"total",label:"交班人數"},{k:"cashOut",label:"出團款"},
  {k:"rc",label:"RC"},{k:"tp",label:"TP"},{k:"op",label:"OP"},
  {k:"taxTitle",label:"發票抬頭"},{k:"taxId",label:"統一編號"},
];

/* 名單：編輯／新增，roster 兩種模式共用 */
function editPax(p){
  editForm(p?`編輯 · ${p.name}`:"新增旅客", PAX_FIELDS, p||{group:"貴賓",days:[1,2,3],table:1,meal:"",note:""}, {
    onSave:o=>{ o.table=+o.table||0; if(!p){ o.id=newId("p"); PAX.push(o); } else Object.assign(p,o); dataChanged("已儲存"); },
    onDelete:p?()=>{ S.data.pax=PAX.filter(x=>x!==p); dataChanged("已刪除"); }:null,
  });
}
function wireEbtns(root, handler){
  root.querySelectorAll(".ebtn").forEach(b=>b.onclick=e=>{ e.stopPropagation(); handler(b.dataset.e, b); });
}

/* ============================================================ 首頁 */
function renderHome(hdr,scr){
  hdr.innerHTML=`<div class="hbar dark" style="padding-bottom:0;border:none">
    <div class="brand"><div class="lion">獅</div><div class="bt"><div class="b1">LION TRAVEL</div><div class="b2">雄獅旅遊</div></div></div>
    <div class="hright"><button class="iconbtn">${ic("bell",19)}</button><button class="iconbtn" style="color:var(--red)">${ic("live",19)}</button></div>
  </div>`;
  const wrap=document.createElement("div");
  wrap.innerHTML=`
  <div class="homedark">
    <div class="htour" id="htour">
      <div class="r1"><span class="pill red">帶團中</span><span>${TOUR.code}</span></div>
      <div class="nm">${esc(TOUR.name)}${TOUR.sub?`<span style="display:block;font-size:12px;font-weight:500;opacity:.85;margin-top:2px">${esc(TOUR.sub)}</span>`:""}</div>
      <div class="qbtns">
        <button class="hq" data-p="roster">${ic("team",20)}團體大表</button>
        <button class="hq" data-p="itin">${ic("route",20)}行程表</button>
        <button class="hq" data-p="fusen">${ic("train",20)}福森號座位</button>
      </div>
    </div>
    <div class="htabs">
      <button class="htab${S.homeTab==="list"?" on":""}" data-h="list">出團日期</button>
      <button class="htab${S.homeTab==="cal"?" on":""}" data-h="cal">出團月曆</button>
    </div>
  </div>
  <div class="pagepad" id="homebody"></div>`;
  scr.appendChild(wrap);
  wrap.querySelector("#htour .nm").onclick=()=>goTab("lead");
  wrap.querySelectorAll(".hq").forEach(b=>b.onclick=e=>{ e.stopPropagation(); goPage(b.dataset.p); });
  wrap.querySelectorAll(".htab").forEach(b=>b.onclick=()=>{ S.homeTab=b.dataset.h; save(); render(); });
  const body=wrap.querySelector("#homebody");
  if(S.homeTab==="list"){
    body.innerHTML=`<span class="mchip">9月 <span style="color:#C8102E">2026</span></span>
      <div class="tourrow"><div class="d"><div class="w">週日</div><div class="n">20</div></div>
        <div class="m"><div class="c">${TOUR.code}</div><div class="t">${esc(TOUR.name)}</div></div>
        <span class="chev" style="color:var(--ink3)">${ic("chev",15)}</span></div>`;
    body.querySelector(".tourrow").onclick=()=>goTab("lead");
  }else{
    const wds=["一","二","三","四","五","六","日"];
    let cells=wds.map(w=>`<div class="wd">${w}</div>`).join("");
    cells+=`<div></div>`;      /* 2026/9/1 週二 */
    for(let d=1;d<=30;d++){
      const isTour=d>=20&&d<=22;
      cells+=`<div class="dd${isTour?" tour":""}" ${isTour?`data-go="1"`:""}>${d}</div>`;
    }
    body.innerHTML=`<span class="mchip">2026 年 9 月</span><div class="cal"><div class="grid">${cells}</div></div>
      <p class="vs" style="margin-top:10px">紅色日期為出團日，點選可進入該團。</p>`;
    body.querySelectorAll("[data-go]").forEach(el=>el.onclick=()=>goTab("lead"));
  }
}

/* ============================================================ 其他頁籤（示意） */
function renderStub(hdr,scr){
  const names={pre:"出團前",post:"回團後",me:"我的"};
  hbar(hdr,names[S.tab]||"");
  scr.innerHTML=`<div class="placeholder-page"><div class="big">🚧</div>
    <div class="tt">「${names[S.tab]}」示意頁</div>
    <div class="dd">920 Demo 聚焦「帶團中」情境，此區沿用現行系統。</div>
    ${S.tab==="me"?`<div style="margin-top:22px"><button class="btn sec" id="goSet">⚙️ Demo 設定／重置資料</button></div>`:""}</div>`;
  const gs=scr.querySelector("#goSet");
  if(gs) gs.onclick=()=>goPage("settings");
}

/* ============================================================ 帶團中（主畫面） */
function renderLead(hdr,scr){
  hbar(hdr,"帶團中");
  const done=Object.keys(S.roll[S.day]||{}).length;
  const el=document.createElement("div");
  el.className="pagepad";
  el.innerHTML=`
  <div class="card tinfo">
    <div class="ttop"><span class="pill redln">共 ${TOUR.days} 天</span>${ebtn("tour",true)}</div>
    <div class="trow"><span class="k">出團日</span><span class="v">${TOUR.dateTxt}</span></div>
    ${TOUR.checkin||TOUR.meet?`<div class="trow meet"><span class="k">報到集合</span><span class="v"><span class="meetpill">${esc(TOUR.checkin||"")}</span><span class="meetpill hot">${esc(TOUR.meet||"")}</span></span></div>`:""}
    ${TOUR.total||TOUR.cashOut?`<div class="trow"><span class="k">交班表</span><span class="v">人數 ${esc(TOUR.total||"—")}　出團款 ${esc(TOUR.cashOut||"—")}</span></div>`:""}
    <div class="trow"><span class="k">團號</span><span class="v">${TOUR.code}</span></div>
    <div class="trow"><span class="k">團名</span><span class="v">${esc(TOUR.name)}${TOUR.sub?`<span style="display:block;font-size:11.5px;font-weight:500;color:var(--ink2);line-height:1.5">${esc(TOUR.sub)}</span>`:""}</span></div>
    ${TOUR.ctrl?`<div class="trow"><span class="k">團控</span><span class="v">${esc(TOUR.ctrl)}${TOUR.seats?`<span style="display:block;font-size:11.5px;font-weight:500;color:var(--ink2)">${esc(TOUR.seats)}</span>`:""}</span></div>`:""}
    <div class="trow"><span class="k">領　隊</span><span class="v">${esc(TOUR.leader)}</span></div>
    <div class="trow"><span class="k">旅客名單</span><span class="v">${GUESTS().length}人 / ${done}人 <span style="color:var(--ink3);font-size:11px;font-weight:400">(KK/已報到)</span>　<span class="pill gray">工作人員 ${PAX.length-GUESTS().length}</span></span></div>
    <div class="trow"><span class="k">RC/TP/OP</span><span class="v rcline"><span>RC　${esc(TOUR.rc)}</span><span>TP　${esc(TOUR.tp)}</span><span>OP　${esc(TOUR.op)}</span></span></div>
  </div>
  <div class="fgrid">${FUNCS.map(([id,icn,lb])=>`
    <button class="fbtn" data-p="${id}"><span class="fic">${ic(icn,28)}</span><span class="flb">${lb}</span></button>`).join("")}
  </div>
  <div class="setlink" id="setLink">設定 · 資料保全（備份／還原）</div>`;
  scr.appendChild(el);
  EDIT_HANDLER=()=>editForm("團資料",TOUR_FIELDS,TOUR,{onSave:o=>{ Object.assign(TOUR,o); dataChanged("已儲存"); }});
  el.querySelectorAll(".fbtn").forEach(b=>b.onclick=()=>goPage(b.dataset.p));
  el.querySelector("#setLink").onclick=()=>goPage("settings");
}

function confirmBox(msg,onOk){
  const mb=$("#mbox");
  mb.className="mbox confirm";
  mb.innerHTML=`<div class="mb">${esc(msg)}</div><div class="mf">
    <button class="btn line" style="min-width:100px">取消</button>
    <button class="btn pri" style="min-width:100px">確定</button></div>`;
  const [no,ok]=mb.querySelectorAll(".mf .btn");
  no.onclick=closeModal;
  ok.onclick=()=>{ closeModal(); onOk&&onOk(); };
  $("#modal").classList.add("on");
}

/* ============================================================ PAGES */
const PAGES={};
/* 今天是第幾天：出團日之後第 n 天回 n（1–3），不在團期回 null */
function todayDay(){
  const m=String(TOUR.dateTxt||"").match(/(\d{4})\/(\d{1,2})\/(\d{1,2})/); if(!m) return null;
  const start=new Date(+m[1],+m[2]-1,+m[3]), now=new Date();
  const n=Math.floor((new Date(now.getFullYear(),now.getMonth(),now.getDate())-start)/86400000)+1;
  return n>=1&&n<=(TOUR.days||3)?n:null;
}
/* 每天第一次開啟自動切到當天；當天手動切去看別天的話，不會被硬拉回來 */
function autoDay(){
  const d=todayDay(); if(!d) return false;
  const key=new Date().toDateString();
  if(S.dayAutoAt===key) return false;
  S.dayAutoAt=key; S.day=d; return true;
}
function dayPills(scr){
  const d=document.createElement("div"), td=todayDay();
  d.className="daypills";
  d.innerHTML=[1,2,3].map(i=>`<button class="daypill${S.day===i?" on":""}" data-d="${i}">第 ${i} 天 · ${TOUR.dates[i-1]}${td===i?`<span class="today">今天</span>`:""}</button>`).join("");
  d.querySelectorAll(".daypill").forEach(b=>b.onclick=()=>{ S.day=+b.dataset.d; save(); render(); });
  scr.appendChild(d);
}

/* ---------- 行程表 ---------- */
PAGES.itin=(hdr,scr)=>{
  hbar(hdr,"行程表",{back:true});
  dayPills(scr);
  const el=document.createElement("div");
  el.className="pagepad";
  el.innerHTML=`<p class="vs">點行程節點下方捷徑，直接開啟該環節要用的功能——走到哪、點到哪。</p><div class="tl"></div>`;
  const tl=el.querySelector(".tl");
  const stops=ITIN[S.day]||(ITIN[S.day]=[]);
  stops.forEach((st,i)=>{
    const d=document.createElement("div");
    d.className="stop";
    const links=(st.links||[]).map(([v,lb])=>`<button class="chip" data-v="${v}">${lb}</button>`).join("");
    const cf=STOP_CONF[st.title]||st.conf||null;
    d.innerHTML=`<div class="card">${ebtn(String(i))}
      <div class="head"><span class="time">${esc(st.t)}</span><span class="title">${esc(st.title)}</span></div>
      ${st.desc?`<div class="desc">${esc(st.desc)}</div>`:""}
      ${st.staff&&st.staff.length?`<div class="staffbox"><div class="sh">工作事項</div>${st.staff.map(x=>`<div class="si">${esc(x)}</div>`).join("")}</div>`:""}
      ${links||cf?`<div class="links">${cf?`<button class="chip conf">${ic("clip",14)} 訂購證明</button>`:""}${links}</div>`:""}</div>`;
    d.querySelectorAll(".chip[data-v]").forEach(ch=>ch.onclick=()=>goPage(ch.dataset.v));
    const cb=d.querySelector(".chip.conf"); if(cb) cb.onclick=()=>{
      const src=cf.img&&typeof CONF_IMG!=="undefined"?CONF_IMG[cf.img]:"";
      if(src) openLightbox([{ title:`訂購證明 · ${st.title}`, render:()=>{ const im=new Image(); im.src=src; return im; } }],0);
      else openModal(`訂購證明 · ${st.title}`,`<p class="vs" style="margin:0 0 8px">${esc(cf.by||"")}</p><div class="confb open" style="border:none;padding:0">${(cf.lines||[]).map(x=>`<div>${esc(x)}</div>`).join("")}</div>`,[["關閉","sec",closeModal]]); };
    tl.appendChild(d);
  });
  editBar(el,{add:()=>editStop(null),addLabel:"新增節點"});
  EDIT_HANDLER=i=>editStop(+i);
  scr.appendChild(el);
};
/* 節點存檔後依時間排序，所以不需要上下移；時間統一補成 hh:mm 才排得對 */
function editStop(i){
  const stops=ITIN[S.day];
  const st=i==null?null:stops[i];
  const obj=st?Object.assign({},st,{_links:(st.links||[]).map(l=>l[0])}):{t:"",title:"",desc:"",staff:[],_links:[]};
  editForm(st?"編輯行程節點":"新增行程節點", ITIN_FIELDS(), obj, {
    onSave:o=>{
      o.links=(o._links||[]).map(v=>[v,linkLabel(v)]); delete o._links;
      const m=/^(\d{1,2}):(\d{2})$/.exec(o.t); if(m) o.t=m[1].padStart(2,"0")+":"+m[2];
      if(st) Object.assign(st,o); else stops.push(o);
      stops.sort((a,b)=>String(a.t).localeCompare(String(b.t)));
      dataChanged("已儲存");
    },
    onDelete:st?()=>{ stops.splice(i,1); dataChanged("已刪除"); }:null,
  });
}

/* ---------- 團體大表 ---------- */
PAGES.roster=(hdr,scr)=>{
  hbar(hdr,"團體大表",{back:true});
  const seg=document.createElement("div");
  seg.className="segtabs";
  seg.innerHTML=`<button class="seg${S.rosterMode==="list"?" on":""}" data-m="list">團體大表</button>
    <button class="seg${S.rosterMode==="roll"?" on":""}" data-m="roll">點名模式</button>`;
  seg.querySelectorAll(".seg").forEach(b=>b.onclick=()=>{ S.rosterMode=b.dataset.m; save(); render(); });
  scr.appendChild(seg);
  if(S.rosterMode==="list") rosterList(scr); else rosterRoll(scr);
};

function rosterList(scr){
  const cks=document.createElement("div");
  cks.className="fieldcks";
  cks.innerHTML=ROSTER_FIELDS.map(([k,lb])=>`<span class="fck${fld(k)?" on":""}" data-k="${k}">
    <span class="ckbox">${fld(k)?"✓":""}</span>${lb}</span>`).join("")+`<span class="fck all" data-all="1">全部顯示</span>`;
  cks.querySelectorAll(".fck[data-k]").forEach(f=>f.onclick=()=>{ S.fields[f.dataset.k]=!fld(f.dataset.k); save(); render(); });
  cks.querySelector("[data-all]").onclick=()=>{ ROSTER_FIELDS.forEach(([k])=>S.fields[k]=true); save(); render(); };
  scr.appendChild(cks);
  const el=document.createElement("div");
  el.className="pagepad";
  /* 照分房表「BY 人」的排法：董事 → 主管 → 合作夥伴 → 工作人員；重要資訊用色塊標出 */
  const ORDER={"貴賓":0,"雄獅主管":1,"工作人員":3};
  const people=[...PAX].sort((a,b)=>(a.id==="p23"?2:ORDER[a.group]??9)-(b.id==="p23"?2:ORDER[b.group]??9));
  const grpName=p=>p.group==="貴賓"?(p.id==="p23"?"合作夥伴":"2731"):p.group;
  const cls=g=>g==="2731"?"g-vip":g==="雄獅主管"?"g-mgr":g==="合作夥伴"?"g-pt":"g-stf";
  const norm=x=>String(x||"").replace(/\s/g,"");
  const roomOf=(N,p)=>N&&N.rooms.find(r=>(r.who||[]).some(w=>norm(w)===norm(p.name)||norm(w).startsWith(norm(p.name))));
  const roomCell=(N,p)=>{ const r=roomOf(N,p); if(!r) return `<span class="dimtxt">—</span>`;
    const love=/愛心/.test((r.type||"")+(r.note||"")); return `<b>${esc(r.no)}</b>${love?` <span class="pill amber">愛心</span>`:""}`; };
  const t672=(HSR_TRAINS[2]||[]).find(t=>t.no==="0672"), fixed672=t672&&t672.fixed?Object.entries(t672.fixed).find(([k,v])=>v===undefined):null;
  const seat672=p=>{ if(!t672||!t672.fixed) return ""; const e=Object.entries(t672.fixed).find(([k,v])=>v===p.id); return e?e[0]:""; };
  const dayTxt=p=>{ const d=p.days||[]; if(d.length===3) return `<span class="dimtxt">全程</span>`; if(!d.length) return `<span class="pill gray">未在團</span>`;
    return `<span class="pill amber">${d.map(x=>"9/"+(19+x)).join("、")}</span>`; };
  const seatTxt=(seat,pnr,tbc,extra)=>{ if(!seat||seat==="—") return `<span class="dimtxt">—</span>`;
    return `<b>${esc(seat)}</b>${fld("pnr")&&pnr&&pnr!=="—"&&pnr!=="已確認"?`<i class="pnr">${esc(pnr)}</i>`:""}${tbc?` <span class="pill amber">票待確認</span>`:""}${extra||""}`; };
  const cols=[];
  if(fld("grp")) cols.push(["名義"]); if(fld("seq")) cols.push(["序"]); cols.push(["姓名"]); if(fld("hon")) cols.push(["稱謂"]); if(fld("rel")) cols.push(["關係"]); if(fld("title")) cols.push(["職稱"]);
  if(fld("en")) cols.push(["英文"]); if(fld("days")) cols.push(["在團"]);
  if(fld("orderNo")) cols.push(["訂單編號"]); if(fld("idNo")) cols.push(["身分證號"]); if(fld("birth")) cols.push(["生日"]); if(fld("tkt")) cols.push(["票種"]);
  if(fld("hsrGo")) cols.push(["高鐵去 0203"]); if(fld("hsrBack")) cols.push(["高鐵回"]); if(fld("train")) cols.push(["福森號"]);
  if(fld("room1")) cols.push(["9/20 房"]); if(fld("room2")) cols.push(["9/21 房"]);
  if(fld("meal")) cols.push(["特殊餐食"]); if(fld("note")) cols.push(["備註"]);
  const N1=NIGHTS.find(n=>n.key===1), N2=NIGHTS.find(n=>n.key===2);
  let lastG="", gseq=0;
  const rows=people.map((p,i)=>{
    const g=grpName(p); if(g!==lastG) gseq=0; gseq++; const gh=g!==lastG?`<tr class="ghead ${cls(g)}"><td colspan="${cols.length}">${esc(g==="2731"?"董事・貴賓":g)}</td></tr>`:""; lastG=g;
    const back = (p.days||[]).includes(3) ? seatTxt(p.hsrBack,p.pnrBk,p.hsrBackTbc,"") : (seat672(p)?seatTxt(seat672(p),"",t672.tbc&&t672.tbc.includes(seat672(p)),` <span class="pill blue">0672 提前返北</span>`):`<span class="dimtxt">—</span>`);
    const go = p.hsr609 ? seatTxt(p.hsr609,"",false,` <span class="pill blue">0609 9/21 加入</span>`) : seatTxt(p.hsrGo,p.pnrGo,p.hsrGoTbc, p.board?` <span class="pill blue">${esc(p.board)}上車</span>`:"");
    const tds=[];
    if(fld("grp")) tds.push(`<td class="gm">${esc(g)}</td>`); if(fld("seq")) tds.push(`<td class="sq">${gseq}</td>`);
    tds.push(`<td class="nm">${ebtn(p.id,true)}${esc(p.name)}</td>`);
    if(fld("hon")) tds.push(`<td class="hn">${p.hon?`<b>${esc(p.hon)}</b>`:""}</td>`);
    if(fld("rel")) tds.push(`<td class="rl">${esc(p.rel||"")}</td>`);
    if(fld("title")) tds.push(`<td class="tt">${esc(p.title||"")}</td>`);
    if(fld("en")) tds.push(`<td class="en">${esc(p.en||"")}</td>`);
    if(fld("days")) tds.push(`<td class="dy">${dayTxt(p)}</td>`);
    if(fld("orderNo")) tds.push(`<td class="mono">${esc(p.orderNo||"")}</td>`);
    if(fld("idNo")) tds.push(`<td class="mono">${esc(p.idNo||"")}</td>`);
    if(fld("birth")) tds.push(`<td class="mono">${esc(p.birth||"")}</td>`);
    if(fld("tkt")) tds.push(`<td class="tk">${esc(p.tkt||"")}</td>`);
    if(fld("hsrGo")) tds.push(`<td class="st">${go}</td>`); if(fld("hsrBack")) tds.push(`<td class="st">${back}</td>`);
    if(fld("train")) tds.push(`<td class="st">${p.fusenA||p.fusenC?`<b>A ${esc(p.fusenA||"—")}</b><i class="pnr">C ${esc(p.fusenC||"—")}</i>`:`<span class="dimtxt">—</span>`}</td>`);
    if(fld("room1")) tds.push(`<td class="rm">${(p.days||[]).includes(1)?roomCell(N1,p):`<span class="dimtxt">—</span>`}</td>`);
    if(fld("room2")) tds.push(`<td class="rm">${(p.days||[]).includes(2)?roomCell(N2,p):`<span class="dimtxt">—</span>`}</td>`);
    if(fld("meal")) tds.push(`<td class="ml">${p.meal?`<span class="pill amber">${esc(p.meal)}</span>`:""}</td>`);
    if(fld("note")) tds.push(`<td class="nt">${esc(p.note||"")}</td>`);
    return gh+`<tr class="prow ${cls(g)}">${tds.join("")}</tr>`;
  }).join("");
  el.innerHTML=`<div class="card rtablewrap"><div class="cardh">團體大表 <span class="pill gray">${PAX.length} 人</span>
      <span class="legendline"><span class="pill amber">黃＝要特別注意</span><span class="pill blue">藍＝行程不同</span></span></div>
    <table class="rtable byp roster"><thead><tr>${cols.map(([c])=>`<th>${c}</th>`).join("")}</tr></thead><tbody>${rows}</tbody></table></div>
    <p class="vs">上方勾選要顯示的欄位。長按任何一列可以修改該旅客。</p>`;
  editBar(el,{add:()=>editPax(null),addLabel:"新增旅客"});
  EDIT_HANDLER=id=>editPax(pax(id));
  scr.appendChild(el);
}

/* 點名場次：行程表裡有「點名報到」捷徑的節點，每個各點一次（台北車站集合、北門報到…）。
 * 第一場存在 S.roll[day]（首頁的「已報到」人數用這個），其餘存 S.rollS["day:節點標題"]。 */
function rollSessions(day){
  const ss=(ITIN[day]||[]).filter(st=>(st.links||[]).some(l=>l[0]==="roster")).map(st=>({t:st.t,title:st.title}));
  return ss.length?ss:[{t:"",title:"本日點名"}];
}
function rollRec(day,idx,sess){
  if(idx===0){ if(!S.roll[day]) S.roll[day]={}; return S.roll[day]; }
  if(!S.rollS) S.rollS={}; const k=`${day}:${sess.title}`; if(!S.rollS[k]) S.rollS[k]={}; return S.rollS[k];
}
function rosterRoll(scr){
  dayPills(scr);
  const sessions=rollSessions(S.day);
  if(!S.rollSess) S.rollSess={};
  let si=S.rollSess[S.day]||0; if(si>=sessions.length) si=0;
  const sess=sessions[si], rec=rollRec(S.day,si,sess);
  if(sessions.length>1){
    const sp=document.createElement("div"); sp.className="sesspills";
    sp.innerHTML=`<span class="sl">點名場次</span>`+sessions.map((x,i)=>{ const r=rollRec(S.day,i,x), n=Object.keys(r).length;
      return `<button class="tab${i===si?" on":""}" data-i="${i}">${esc(x.t?x.t+" ":"")}${esc(x.title)}${n?`<b>${n}</b>`:""}</button>`; }).join("");
    sp.querySelectorAll(".tab").forEach(b=>b.onclick=()=>{ S.rollSess[S.day]=+b.dataset.i; save(); render(); });
    scr.appendChild(sp);
  }
  const act=GUESTS().filter(p=>p.days.includes(S.day));
  const missing=act.filter(p=>!rec[p.id]), done=act.length-missing.length;
  const pct=act.length?Math.round(done/act.length*100):0;
  const only=!!S.rollOnlyMissing;
  const seatOfDay=p=> S.day===3?p.hsrBack:(S.day===1?p.hsrGo:p.trainSeat);
  const mark=(p,on)=>{ if(on) rec[p.id]=Date.now(); else delete rec[p.id]; if(navigator.vibrate) navigator.vibrate(8); save(); render(); };
  const el=document.createElement("div");
  el.className="pagepad";
  el.innerHTML=`
  <div class="card rollhead${missing.length?"":" alldone"}">
    <div class="rh1">
      <div class="rhbig"><b>${done}</b><span>/ ${act.length}</span><i>已到${sessions.length>1?`・${esc(sess.title)}`:""}</i></div>
      <div class="rhacts">
        <button class="btn sec${only?" on":""}" id="rollOnly">${only?"顯示全部":"只看未到"}</button>
        <button class="btn sec" id="rollAll">全部已到</button>
        <button class="btn ghost" id="rollRedo">重新點名</button>
      </div>
    </div>
    <div class="rhbar"><i style="width:${pct}%"></i></div>
    ${missing.length?`<div class="rhmiss"><span class="ml">未到 ${missing.length} 位・點名字直接標已到</span><div class="mchips">${missing.map(p=>`<button class="mchip" data-p="${esc(p.id)}">${esc(p.name)}</button>`).join("")}</div></div>`
      :`<div class="rhmiss ok">✓ 全部到齊</div>`}
    <p class="vs" style="margin:8px 0 0">點名對象：貴賓＋雄獅主管（工作人員不計）。點整張卡片切換已到／未到。</p>
  </div>
  <div class="rolllist compact"></div>`;
  const rlist=el.querySelector(".rolllist");
  GUESTS().forEach(p=>{
    const inDay=p.days.includes(S.day), ck=!!rec[p.id];
    if(only && (ck || !inDay)) return;
    const card=document.createElement("div");
    card.className="rollcard2"+(ck?" on":"")+(inDay?"":" out");
    card.innerHTML=`<div class="rc1"><b class="nm">${esc(p.name)}</b><span class="pill gray">${esc(p.rel)}</span>${ebtn(p.id,true)}
        <span class="rcstate">${inDay?(ck?"✓ 已到":"未到"):"未在團"}</span></div>
      <div class="rc2"><span class="pill gray">${esc(seatOfDay(p)||"—")}</span>${p.meal?`<span class="pill amber">${esc(p.meal)}</span>`:""}${p.hon?`<span class="pill gray">${esc(p.hon)}</span>`:""}
        <button class="rcnote${p.note?" has":""}" title="備註">${ic("pen",13)}${p.note?esc(p.note):"備註"}</button></div>`;
    if(inDay) card.addEventListener("click",e=>{ if(e.target.closest(".rcnote,.ebtn")) return; mark(p,!ck); });
    card.querySelector(".rcnote").onclick=e=>{ e.stopPropagation();
      editForm(`${p.name} 的備註`,[{k:"note",label:"備註（團體大表、旅客資料卡都會一起顯示）",type:"textarea",rows:3,ph:"例：需輪椅、靠窗座位…"}],{note:p.note||""},{onSave:o=>{ p.note=o.note.trim(); dataChanged("已儲存"); }}); };
    rlist.appendChild(card);
  });
  if(!rlist.children.length) rlist.innerHTML=`<div class="tempty">✓ 全部到齊，沒有未到的人</div>`;
  el.querySelectorAll(".mchip").forEach(b=>b.onclick=()=>{ const p=pax(b.dataset.p); if(p) mark(p,true); });
  el.querySelector("#rollOnly").onclick=()=>{ S.rollOnlyMissing=!only; save(); render(); };
  el.querySelector("#rollAll").onclick=()=>confirmBox(`把「${sess.title}」還沒到的 ${missing.length} 位全部標成已到？`,()=>{ missing.forEach(p=>rec[p.id]=Date.now()); save(); render(); toast("全部已到"); });
  el.querySelector("#rollRedo").onclick=()=>confirmBox(`清空「${sess.title}」的點名紀錄，重新點？`,()=>{ for(const k of Object.keys(rec)) delete rec[k]; save(); render(); toast("已重新點名"); });
  editBar(el,{add:()=>editPax(null),addLabel:"新增旅客"});
  EDIT_HANDLER=id=>editPax(pax(id));
  scr.appendChild(el);
  const sb=document.createElement("div");
  sb.className="statbar";
  sb.innerHTML=`<div class="st">全部<b>${act.length}</b></div>
    <div class="st hot">已到<b>${done}</b></div>
    <div class="st">未到<b>${missing.length}</b></div>`;
  scr.appendChild(sb);
}

/* ---------- 座位表 ---------- */
PAGES.seats=(hdr,scr)=>{
  hbar(hdr,"高鐵座位圖",{back:true});
  S.seatTab="hsr";   /* 只剩高鐵；遊覽車座位圖已拿掉 */
  /* 第二天本團沒有整團的高鐵，只做 9/20 與 9/22 */
  if(![1,3].includes(S.hsrDay)) S.hsrDay = S.day===2 ? 3 : (S.day||1);
  const dp=document.createElement("div"); dp.className="daypills"; const td=todayDay();
  dp.innerHTML=[1,3].map(i=>`<button class="daypill${S.hsrDay===i?" on":""}" data-d="${i}">${i===1?"去程":"回程"} · 第 ${i} 天 ${TOUR.dates[i-1]}${td===i?`<span class="today">今天</span>`:""}</button>`).join("");
  dp.querySelectorAll(".daypill").forEach(b=>b.onclick=()=>{ S.hsrDay=+b.dataset.d; save(); render(); });
  scr.appendChild(dp);
  const el=document.createElement("div");
  el.className="pagepad";
  {
    el.classList.add("wide");   /* 座位圖在 iPad 橫放要吃滿寬度才排得下橫式 */
    el.innerHTML=`<div id="seatArea"></div>
      <p class="vs">座位依開票紀錄對位。實際入座以現場票面為準。</p>`;
    scr.appendChild(el);
    const w=el.clientWidth-28;   /* pagepad 兩側各 14 */
    el.querySelector("#seatArea").innerHTML=svgHsr(w);
    el.querySelectorAll(".zw[data-train]").forEach(zw=>{
      const t=(HSR_TRAINS[S.hsrDay]||[]).find(x=>x.no===zw.dataset.train); if(!t) return;
      zw._slides=()=>{ const map=hsrSeatIndex(t); return t.cars.map(c=>({ title:`高鐵 ${t.no} · ${c} 車 ${HSR_CARS[c].cls}`, render:()=>svgCarThsrc(c,map,t) })); };
      zw._slideIdx=Math.max(0,t.cars.indexOf(+zw.dataset.car));
    });
    el.querySelectorAll(".zw").forEach(zoomify);
    const tc=document.createElement("div"); tc.className="card";
    tc.innerHTML=`<div style="font-weight:800;margin-bottom:8px;font-size:14px">本日車次</div>
      ${(HSR_TRAINS[S.hsrDay]||[]).map((t,i)=>`<div class="ordrow"><span class="who">${esc(t.no)}</span><span class="what">${esc(t.route)}${t.tag?"・"+esc(t.tag):""}</span>${ebtn(String(i),true)}</div>`).join("")}`;
    el.appendChild(tc);
    editBar(el,{});
    EDIT_HANDLER=i=>{ const t=(HSR_TRAINS[S.hsrDay]||[])[+i]; if(!t) return;
      editForm("編輯車次",[{k:"no",label:"車次",required:true},{k:"route",label:"路線／時間"},{k:"dir",label:"方向",type:"select",opts:["南下","北上"]},{k:"tag",label:"標籤"}],
        t,{onSave:o=>{ Object.assign(t,o); dataChanged("已儲存"); }});
    };
  }
  el.querySelectorAll(".cartabs .tab").forEach(b=>b.onclick=()=>{ S.hsrCar[b.dataset.tk]=+b.dataset.car; save(); render(); });
  const wireHsr=root=>root.querySelectorAll(".seat.mine,.seatg.mine").forEach(s=>s.addEventListener("click",ev=>{ ev.stopPropagation(); const p=pax(s.dataset.p); if(p) openPaxModal(p); }));
  wireHsr(el); window.LB_WIRE=wireHsr;
  if(!el.isConnected) scr.appendChild(el);
};
/* 轉向時橫式／直式要重排 */
let rzT=null;
window.addEventListener("resize",()=>{ if(S.page==="seats"&&S.seatTab==="hsr"){ clearTimeout(rzT); rzT=setTimeout(render,180); } });
function seatRect(x,y,w,h,label,name,pid){
  const mine=!!pid;
  return `<rect class="seat${mine?" mine":""}" ${mine?`data-p="${pid}"`:""} x="${x}" y="${y}" width="${w}" height="${h}" rx="6"></rect>
  <text class="seatlb" x="${x+w/2}" y="${y+12}">${label}</text>
  ${name?`<text class="seatnm" x="${x+w/2}" y="${y+h-7}">${esc(name)}</text>`:""}`;
}
/* ===== 高鐵座位圖（依作業手冊「高鐵座位圖」實際格局重繪） =====
 * 6車 商務：A,C｜走道｜D,E（2+2）；1排僅 D/E，A/C 位置為行李放置區
 * 5車 標準：A,B,C｜走道｜D,E（3+2）；座位 2–17 排，兩端皆行李放置區
 * 車廂朝向：第1排在南下方向（往台中/嘉義），排號往北上遞增 */
const HSR_CARS = {
  6:{ cls:"商務車廂", side:"2+2", cols:["A","C","D","E"], aisleBefore:"D",
      rowFrom:1, rowTo:17, noRow1:["A","C"],
      lugTop:[["A","C"]], lugBottom:[["A","C"],["D","E"]], prev:"5車", next:"7車", exits:[3,9,15] },
  5:{ cls:"標準車廂", side:"3+2", cols:["A","B","C","D","E"], aisleBefore:"D",
      rowFrom:2, rowTo:17, noRow1:[],
      lugTop:[["A","B","C"],["D","E"]], lugBottom:[["A","B","C"],["D","E"]], prev:"4車", next:"6車", exits:[4,9,14] },
};
const VIP2 = ["p01","p02"];                      /* 董事長伉儷（原表以綠色標示） */
const shortName = n => {
  const cn = n.replace(/[^\u4e00-\u9fff]/g,"");
  return (cn.length>=2 ? cn : n.replace(/\s+/g,"")).slice(0,4);
};

function hsrSeatIndex(train){
  const map={};
  if(train.fixed){ for(const [k,id] of Object.entries(train.fixed)) map[k]=pax(id); }
  if(train.key){
    PAX.forEach(p=>{
      const v=p[train.key];
      if(!v||v==="—") return;
      const m=String(v).match(/^([56])車\s*(\d+)([A-E])$/);
      if(m) map[`${m[1]}車 ${m[2]}${m[3]}`]=p;
    });
  }
  return map;
}

function svgCar(carNo, seatMap, t, horiz){
  const C=HSR_CARS[carNo];
  const south = t.dir==="南下";
  const rows=[]; for(let r=C.rowFrom;r<=C.rowTo;r++) rows.push(r);
  const cols=C.cols;
  const dest = String(t.route||"").split("→").pop().replace(/[\d:\s]/g,"") || (south?"嘉義":"台北");

  /* 顏色：客人一眼找到自己這一群 */
  const paint=p=> !p ? {f:"#FFFFFF",s:"#DCDCE2",lb:"#C4C4CA",t:""}
    : VIP2.includes(p.id)   ? {f:"#C8102E",s:"#B8000F",lb:"rgba(255,255,255,.8)",t:"#FFFFFF"}
    : p.group==="貴賓"      ? {f:"#FDECEE",s:"#C8102E",lb:"#9F0B22",t:"#7A000B"}
    : p.group==="雄獅主管"  ? {f:"#E9F0FD",s:"#2563EB",lb:"#2563EB",t:"#1E3A8A"}
    :                         {f:"#F0F0F2",s:"#9A9AA0",lb:"#8E8E93",t:"#48484D"};

  const SW = horiz?58:64, SH = horiz?40:38, G = 4, AISLE = horiz?24:26, LUG = horiz?50:28, RX=9;
  const seatAt = (r,c)=>seatMap[`${carNo}車 ${r}${c}`];
  const defs = `<defs><pattern id="lug${carNo}" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect width="8" height="8" fill="#F4F4F6"/><line x1="0" y1="0" x2="0" y2="8" stroke="#E0E0E6" stroke-width="2"/></pattern></defs>`;

  /* ── 幾何：橫式 x=排、y=座位字母；直式反過來 ── */
  let W,H, X0, Y0, colPos={}, rowPos=r=>0, aisleAt, bodyRect, lugRects=[], winLines=[], endLabels=[], gaps=[];
  if(horiz){
    const PADL=30, PADT=22, PADR=30, PADB=22;
    X0 = PADL + LUG + 10;
    let y=PADT+14;
    cols.forEach(c=>{ if(c===C.aisleBefore){ aisleAt=y; y+=AISLE; } colPos[c]=y; y+=SH+G; });
    Y0=PADT+14;
    const seatsH = y-G-Y0;
    rowPos = r => X0 + (r-C.rowFrom)*(SW+G);
    const seatsW = rows.length*(SW+G)-G;
    W = X0 + seatsW + 10 + LUG + PADR;
    H = PADT + 14 + seatsH + PADB + 14;
    bodyRect = {x:PADL-8, y:PADT+2, w:W-PADL-PADR+16, h:seatsH+24};
    const blockSpan = gr => { const ys=gr.map(c=>colPos[c]); return [Math.min(...ys), Math.max(...ys)+SH]; };
    C.lugTop.forEach(gr=>{ const [a,b]=blockSpan(gr);    lugRects.push({x:PADL+2, y:a, w:LUG-6, h:b-a}); });
    C.lugBottom.forEach(gr=>{ const [a,b]=blockSpan(gr); lugRects.push({x:X0+seatsW+8, y:a, w:LUG-6, h:b-a}); });
    winLines.push({x1:X0, y1:Y0-7, x2:X0+seatsW, y2:Y0-7},{x1:X0, y1:Y0+seatsH+7, x2:X0+seatsW, y2:Y0+seatsH+7});
    endLabels.push({x:PADL-2, y:H-6, anchor:"start", text:`◀ ${C.prev}`},{x:W-PADR+2, y:H-6, anchor:"end", text:`${C.next} ▶`});
  }else{
    const PADL=26, PADT=18, PADR=18, PADB=18, GAPH=24;
    let x=PADL;
    cols.forEach(c=>{ if(c===C.aisleBefore){ aisleAt=x; x+=AISLE; } colPos[c]=x; x+=SW+G; });
    const seatsW = x-G-PADL;
    W = x-G+PADR;
    Y0 = PADT + LUG + 22;     /* 行李區與欄位字母之間留足空間 */
    /* 有人坐的排前後各留一排，其餘連續空排收成一條「第 a–b 排 · 空位」；車頭車尾那一排永遠保留 */
    const occ=rows.filter(r=>cols.some(c=>seatAt(r,c)));
    const lo=occ.length?Math.min(...occ)-1:Infinity, hi=occ.length?Math.max(...occ)+1:-Infinity;
    const keep=r=>!occ.length || (r>=lo&&r<=hi) || r===C.rowFrom || r===C.rowTo;
    const layout=[]; let yy=Y0;
    for(let i=0;i<rows.length;i++){
      const r=rows[i];
      if(keep(r)){ layout.push({type:"row",r,y:yy}); yy+=SH+G; }
      else{ let j=i; while(j+1<rows.length && !keep(rows[j+1])) j++;
            layout.push({type:"gap",a:r,b:rows[j],y:yy}); yy+=GAPH+G; i=j; }
    }
    const rowY={}; layout.forEach(it=>{ if(it.type==="row") rowY[it.r]=it.y; });
    rowPos = r => rowY[r];
    gaps = layout.filter(it=>it.type==="gap");
    const seatsH = yy-G-Y0;
    H = Y0 + seatsH + 10 + LUG + PADB + 12;
    bodyRect = {x:PADL-12, y:PADT-4, w:W-PADL-PADR+24, h:H-PADT-PADB+4-12};
    const blockSpan = gr => { const xs=gr.map(c=>colPos[c]); return [Math.min(...xs), Math.max(...xs)+SW]; };
    C.lugTop.forEach(gr=>{ const [a,b]=blockSpan(gr);    lugRects.push({x:a, y:PADT+2, w:b-a, h:LUG-6}); });
    C.lugBottom.forEach(gr=>{ const [a,b]=blockSpan(gr); lugRects.push({x:a, y:Y0+seatsH+8, w:b-a, h:LUG-6}); });
    winLines.push({x1:PADL-6, y1:Y0, x2:PADL-6, y2:Y0+seatsH},{x1:PADL+seatsW+6, y1:Y0, x2:PADL+seatsW+6, y2:Y0+seatsH});
    endLabels.push({x:W/2, y:PADT-6, anchor:"middle", text:`▲ ${C.prev}`},{x:W/2, y:H-4, anchor:"middle", text:`▼ ${C.next}`});
  }

  let g=`<svg viewBox="0 0 ${W} ${H}" class="carsvg${horiz?" horiz":""}">${defs}`;
  g+=`<rect x="${bodyRect.x}" y="${bodyRect.y}" width="${bodyRect.w}" height="${bodyRect.h}" rx="${horiz?22:26}" fill="#FCFCFD" stroke="#D5D5DB" stroke-width="1.5"/>`;
  lugRects.forEach(l=>{
    g+=`<rect x="${l.x}" y="${l.y}" width="${l.w}" height="${l.h}" rx="6" fill="url(#lug${carNo})" stroke="#E0E0E6"/>`;
    const cx=l.x+l.w/2, cy=l.y+l.h/2;
    g+= (horiz||l.w<70)
      ? `<text x="${cx}" y="${cy}" text-anchor="middle" font-size="8.5" fill="#8E8E93" transform="rotate(${horiz?-90:0} ${cx} ${cy})" dominant-baseline="middle">行李區</text>`
      : `<text x="${cx}" y="${cy+3}" text-anchor="middle" font-size="9" fill="#8E8E93">行李放置區</text>`;
  });
  winLines.forEach(l=>{ g+=`<line x1="${l.x1}" y1="${l.y1}" x2="${l.x2}" y2="${l.y2}" stroke="#BFD9F7" stroke-width="3" stroke-linecap="round"/>`; });
  if(horiz){
    const x1=rowPos(C.rowFrom), x2=rowPos(C.rowTo)+SW;
    g+=`<rect x="${x1}" y="${aisleAt+3}" width="${x2-x1}" height="${AISLE-6}" rx="5" fill="#F4F4F6"/>`;
    rows.forEach(r=>{ g+=`<text x="${rowPos(r)+SW/2}" y="${aisleAt+AISLE/2+3.5}" text-anchor="middle" font-size="10" font-weight="800" fill="#9A9AA0">${r}</text>`; });
    cols.forEach(c=>{ g+=`<text x="${X0-10}" y="${colPos[c]+SH/2+4}" text-anchor="end" font-size="10.5" font-weight="800" fill="#B0B0B6">${c}</text>`; });
  }else{
    const y1=rowPos(C.rowFrom), y2=rowPos(C.rowTo)+SH;
    g+=`<rect x="${aisleAt+3}" y="${y1}" width="${AISLE-6}" height="${y2-y1}" rx="5" fill="#F4F4F6"/>`;
    rows.forEach(r=>{ if(rowPos(r)==null) return; g+=`<text x="${aisleAt+AISLE/2}" y="${rowPos(r)+SH/2+3.5}" text-anchor="middle" font-size="10" font-weight="800" fill="#9A9AA0">${r}</text>`; });
    gaps.forEach(gp=>{
      const x0=colPos[cols[0]], x1=colPos[cols[cols.length-1]]+SW;
      g+=`<rect x="${x0}" y="${gp.y}" width="${x1-x0}" height="24" rx="6" fill="#FAFAFB" stroke="#E6E6EB" stroke-dasharray="3 3"/>
          <text x="${(x0+x1)/2}" y="${gp.y+15.5}" text-anchor="middle" font-size="10" font-weight="700" fill="#B0B0B6">第 ${gp.a}–${gp.b} 排 · 空位</text>`;
    });
    cols.forEach(c=>{ g+=`<text x="${colPos[c]+SW/2}" y="${Y0-8}" text-anchor="middle" font-size="10.5" font-weight="800" fill="#B0B0B6">${c}</text>`; });
  }
  rows.forEach(r=>cols.forEach(c=>{
    if(r===1&&C.noRow1.includes(c)) return;
    if(!horiz && rowPos(r)==null) return;
    const p=seatAt(r,c), k=paint(p);
    const x = horiz? rowPos(r) : colPos[c];
    const y = horiz? colPos[c] : rowPos(r);
    const label=`${r}${c}`;
    let back;
    if(horiz) back = south ? `<rect x="${x+SW-6}" y="${y+5}" width="3.5" height="${SH-10}" rx="1.5"/>` : `<rect x="${x+2.5}" y="${y+5}" width="3.5" height="${SH-10}" rx="1.5"/>`;
    else      back = south ? `<rect x="${x+5}" y="${y+SH-6}" width="${SW-10}" height="3.5" rx="1.5"/>` : `<rect x="${x+5}" y="${y+2.5}" width="${SW-10}" height="3.5" rx="1.5"/>`;
    g+=`<g class="seatg${p?" mine":""}"${p?` data-p="${p.id}"`:""}>
      <rect x="${x}" y="${y}" width="${SW}" height="${SH}" rx="${RX}" fill="${k.f}" stroke="${k.s}" stroke-width="${p?1.6:1.1}"/>
      <g fill="${p?(VIP2.includes(p.id)?"rgba(255,255,255,.55)":k.s):"#E4E4E9"}" opacity="${p?".9":"1"}">${back}</g>
      <text x="${x+(horiz&&!south?9:5)}" y="${y+10}" font-size="7.5" font-weight="700" fill="${k.lb}">${label}</text>
      ${p?`<text x="${x+SW/2}" y="${y+SH/2+(horiz?6:5)}" text-anchor="middle" font-size="${horiz?12.5:12}" font-weight="800" fill="${k.t}">${esc(shortName(p.name))}</text>`:""}
      ${p&&p.board&&String(t.route||"").includes(p.board)?`<rect x="${x+SW-25}" y="${y+2.5}" width="22" height="10" rx="3" fill="#1E9E4A"/>
        <text x="${x+SW-14}" y="${y+10}" text-anchor="middle" font-size="7" font-weight="800" fill="#fff">${esc(p.board)}</text>`:""}
    </g>`;
  }));
  endLabels.forEach(l=>{ g+=`<text x="${l.x}" y="${l.y}" text-anchor="${l.anchor}" font-size="10" font-weight="700" fill="#A6A6AC">${esc(l.text)}</text>`; });
  if(horiz){
    g+=`<text x="${bodyRect.x+bodyRect.w/2}" y="${H-6}" text-anchor="middle" font-size="10" font-weight="800" fill="#C8102E">${south?"◀ ":""}行進方向 · 往${esc(dest)}${south?"":" ▶"}</text>`;
  }
  return g+`</svg>`;
}

/* ===== 高鐵車廂圖：照高鐵官網「車廂座位配置圖」的樣子畫 =====
 * 深灰標題列（車號・車廂類型・總席數）、圓角車體、左右「往N號車／南北」、
 * 上排 A–C、走道、下排 D–E，兩端行李放置區，滅火器／垃圾桶／列車長室／AED，逃生窗口橘三角，底下圖例。
 * 本團座位依身分上色並寫名字，空位只寫座位號。 */
function svgCarThsrc(carNo, seatMap, t){
  const C=HSR_CARS[carNo], south=t.dir==="南下";
  const dest=String(t.route||"").split("→").pop().replace(/[\d:\s]/g,"")||(south?"嘉義":"台北");
  const rows=[]; for(let r=C.rowFrom;r<=C.rowTo;r++) rows.push(r);
  const ai=C.cols.indexOf(C.aisleBefore);
  const blocks=[C.cols.slice(0,ai), C.cols.slice(ai)];
  const seatAt=(r,c)=>seatMap[`${carNo}車 ${r}${c}`];
  const isTbc=(p,key)=> (t.tbc||[]).includes(key) || !!(t.key && p[t.key+"Tbc"]);
  const unusedOf=key=> (t.unused||{})[key];
  const paint=p=> VIP2.includes(p.id) ? {f:"#C8102E",s:"#B8000F",lb:"rgba(255,255,255,.75)",t:"#FFFFFF"}
    : p.group==="貴賓"     ? {f:"#FDECEE",s:"#C8102E",lb:"#9F0B22",t:"#7A000B"}
    : p.group==="雄獅主管" ? {f:"#E9F0FD",s:"#2563EB",lb:"#2563EB",t:"#1E3A8A"}
    :                        {f:"#F0F0F2",s:"#9A9AA0",lb:"#8E8E93",t:"#48484D"};
  const total=rows.length*C.cols.length-(C.rowFrom===1?C.noRow1.length:0);

  /* ── 幾何 ── */
  const SW=46, SH=38, G=5, ROWG=6, AISLE=34;
  const HEAD=54, PADX=74, PADT=24, PADB=24, BODY_PAD=16, FAC=44, FACR=60, LUG=30, LUGG=8, LEG=46;
  const seatsW=rows.length*(SW+G)-G;
  const leftRack = C.noRow1.length ? 0 : (C.lugTop.length?LUG+LUGG:0);    /* 6車第1排本來就沒 A/C，行李架就放在那格 */
  const bodyX=PADX, X0=bodyX+BODY_PAD+FAC+LUGG+leftRack;
  const bodyW=BODY_PAD+FAC+LUGG+leftRack+seatsW+LUGG+LUG+LUGG+FACR+BODY_PAD;
  const W=PADX*2+bodyW;
  const rowX=r=>X0+(r-C.rowFrom)*(SW+G);
  const colY={}; let y=HEAD+PADT+BODY_PAD;
  blocks.forEach((b,i)=>{ if(i) y+=AISLE-ROWG; b.forEach(c=>{ colY[c]=y; y+=SH+ROWG; }); });
  const seatsBottom=y-ROWG;
  const bodyY=HEAD+PADT, bodyH=seatsBottom+BODY_PAD-bodyY;
  const H=bodyY+bodyH+PADB+LEG;
  const span=b=>[colY[b[0]], colY[b[b.length-1]]+SH];

  /* ── 小圖示 ── */
  const icoLug=(x,y,w,h)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="#F1F1F3" stroke="#D5D5DA"/>
    <rect x="${x+w/2-8}" y="${y+h/2-7}" width="16" height="14" rx="2" fill="#6B6B70"/><rect x="${x+w/2-4}" y="${y+h/2-10}" width="8" height="3" rx="1" fill="#6B6B70"/>`;
  const icoFire=(x,y)=>`<rect x="${x-4}" y="${y-2}" width="8" height="18" rx="3" fill="#C8102E"/><rect x="${x-2}" y="${y-6}" width="4" height="5" fill="#333"/><path d="M${x+4} ${y+1} q5 0 5 5" stroke="#333" fill="none" stroke-width="1.5"/>`;
  const icoTrash=(x,y)=>`<path d="M${x-6} ${y-3} h12 l-1.5 16 h-9 z" fill="#8E8E93"/><rect x="${x-7}" y="${y-6}" width="14" height="3" rx="1" fill="#8E8E93"/>`;
  const icoAED=(x,y)=>`<path d="M${x} ${y+12} C${x-12} ${y+2} ${x-8} ${y-8} ${x} ${y-2} C${x+8} ${y-8} ${x+12} ${y+2} ${x} ${y+12}z" fill="none" stroke="#C8102E" stroke-width="2"/>
    <path d="M${x+1} ${y-1} l-4 6 h4 l-1 5 l4 -6 h-4z" fill="#C8102E"/><text x="${x}" y="${y-10}" text-anchor="middle" font-size="7" font-weight="800" fill="#333">AED</text>`;
  const icoCond=(x,y)=>`<circle cx="${x}" cy="${y-4}" r="4" fill="#333"/><path d="M${x-7} ${y+10} q7 -10 14 0z" fill="#333"/><rect x="${x-5}" y="${y-9}" width="10" height="2" fill="#333"/>`;
  const tri=(x,y,up)=>`<path d="M${x-4} ${up?y+5:y-5} L${x+4} ${up?y+5:y-5} L${x} ${up?y-2:y+2}z" fill="#F08A24"/>`;

  let g=`<svg viewBox="0 0 ${W} ${H}" class="carsvg thsrc"><defs><pattern id="hatch${carNo}" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="6" height="6" fill="#F4F4F6"/><line x1="0" y1="0" x2="0" y2="6" stroke="#D5D5DA" stroke-width="2"/></pattern></defs>`;
  /* 標題列 */
  g+=`<rect x="0" y="0" width="${W}" height="${HEAD}" rx="6" fill="#4E4E52"/>
    <text x="26" y="${HEAD/2+12}" font-size="34" font-weight="900" fill="#fff">${carNo}</text>
    <text x="${carNo>9?66:52}" y="${HEAD/2-3}" font-size="11" font-weight="700" fill="#fff">號</text><text x="${carNo>9?66:52}" y="${HEAD/2+11}" font-size="11" font-weight="700" fill="#fff">車</text>
    <text x="${W/2}" y="${HEAD/2+8}" text-anchor="middle" font-size="22" font-weight="800" fill="#fff">${esc(C.cls)}</text>
    <text x="${W-24}" y="${HEAD/2+5}" text-anchor="end" font-size="13" font-weight="700" fill="#fff">共${total}席</text>`;
  /* 車體 */
  g+=`<rect x="${bodyX}" y="${bodyY}" width="${bodyW}" height="${bodyH}" rx="16" fill="#FAFAFB" stroke="#C9C9CF" stroke-width="1.5"/>`;
  /* 兩端：往N號車 + 南／北 + 行進方向 */
  const endLbl=(x,txt,dir,arrow)=>{
    const cy=bodyY+bodyH/2;
    g+=txt.split("").map((ch,i)=>`<text x="${x}" y="${cy-56+i*16}" text-anchor="middle" font-size="12" fill="#6B6B70">${ch}</text>`).join("");
    g+=`<path d="M${x-14} ${cy+22} L${x} ${cy+8} L${x+14} ${cy+22}" fill="none" stroke="#B9B9BF" stroke-width="1.5" transform="rotate(${dir==="南"?-90:90} ${x} ${cy+15})"/>`;
    g+=`<text x="${x}" y="${cy+58}" text-anchor="middle" font-size="26" font-weight="800" fill="#4E4E52">${dir}</text>`;
    if(arrow) g+=`<text x="${x}" y="${cy+84}" text-anchor="middle" font-size="10.5" font-weight="800" fill="#C8102E">${arrow}</text>`;
  };
  endLbl(PADX/2, `往${C.prev.replace("車","號車")}`, "南", south?`◀ 往${esc(dest)}`:"");
  endLbl(W-PADX/2, `往${C.next.replace("車","號車")}`, "北", south?"":`往${esc(dest)} ▶`);
  /* 逃生窗口三角（上下車壁） */
  (C.exits||[]).forEach(r=>{ if(r<C.rowFrom||r>C.rowTo) return; const x=rowX(r)+SW/2; g+=tri(x,bodyY-3,true)+tri(x,bodyY+bodyH+3,false); });
  /* 左側設施：滅火器（上）、垃圾桶（下）；右側：AED、列車長室 */
  const facX=bodyX+BODY_PAD+FAC/2, [t1a,t1b]=span(blocks[0]), [t2a,t2b]=span(blocks[1]);
  g+=icoFire(facX,(t1a+t1b)/2-6)+icoTrash(facX,(t2a+t2b)/2-4);
  const facRX=X0+seatsW+LUGG+LUG+LUGG+FACR/2;
  g+=icoFire(facRX,(t1a+t1b)/2-6)+icoAED(facRX,(t2a+t2b)/2-12)+icoCond(facRX,(t2a+t2b)/2+22);
  /* 行李放置區 */
  C.lugTop.forEach(b=>{ const [a,z]=span(b); if(C.noRow1.length&&b.some(c=>C.noRow1.includes(c))) g+=icoLug(rowX(C.rowFrom),a,SW,z-a); else g+=icoLug(X0-LUGG-LUG,a,LUG,z-a); });
  C.lugBottom.forEach(b=>{ const [a,z]=span(b); g+=icoLug(X0+seatsW+LUGG,a,LUG,z-a); });
  /* 座位 */
  rows.forEach(r=>C.cols.forEach(c=>{
    if(r===1&&C.noRow1.includes(c)) return;
    const p=seatAt(r,c), x=rowX(r), y=colY[c], label=`${r}${c}`;
    const key=`${carNo}車 ${label}`, un=unusedOf(key);
    if(!p){
      if(un){
        g+=`<g class="seatg"><title>${esc(un)}</title><rect x="${x}" y="${y}" width="${SW}" height="${SH}" rx="5" fill="url(#hatch${carNo})" stroke="#B9B9BF" stroke-dasharray="3 2"/>
          <text x="${x+SW/2}" y="${y+SH/2-1}" text-anchor="middle" font-size="10" font-weight="700" fill="#6B6B70">${label}</text>
          <text x="${x+SW/2}" y="${y+SH/2+11}" text-anchor="middle" font-size="7.5" font-weight="700" fill="#8E8E93">已訂未用</text></g>`;
        return;
      }
      g+=`<g class="seatg"><rect x="${x}" y="${y}" width="${SW}" height="${SH}" rx="5" fill="#ECECEF" stroke="#D5D5DA"/>
        <text x="${x+SW/2}" y="${y+SH/2+4}" text-anchor="middle" font-size="11" font-weight="700" fill="#6B6B70">${label}</text></g>`;
      return;
    }
    const k=paint(p), nm=shortName(p.name), fs=nm.length>=4?10.5:12, tbc=isTbc(p,key);
    g+=`<g class="seatg mine" data-p="${p.id}">
      <rect x="${x}" y="${y}" width="${SW}" height="${SH}" rx="5" fill="${k.f}" stroke="${tbc?"#F08A24":k.s}" stroke-width="${tbc?2:1.6}"${tbc?' stroke-dasharray="3 2"':""}/>
      ${tbc&&!(p.board&&String(t.route||"").includes(p.board))?`<rect x="${x+SW-26}" y="${y+2}" width="24" height="9" rx="2.5" fill="#F08A24"/><text x="${x+SW-14}" y="${y+9}" text-anchor="middle" font-size="6.5" font-weight="800" fill="#fff">票待確認</text>`:""}
      <text x="${x+3}" y="${y+9}" font-size="7" font-weight="700" fill="${k.lb}">${label}</text>
      <text x="${x+SW/2}" y="${y+SH/2+7}" text-anchor="middle" font-size="${fs}" font-weight="800" fill="${k.t}">${esc(nm)}</text>
      ${p.board&&String(t.route||"").includes(p.board)?`<rect x="${x+SW-22}" y="${y+2}" width="20" height="9" rx="2.5" fill="#1E9E4A"/><text x="${x+SW-12}" y="${y+9}" text-anchor="middle" font-size="6.5" font-weight="800" fill="#fff">${esc(p.board)}</text>`:""}
    </g>`;
  }));
  /* 圖例 */
  const ly=H-LEG/2+4, items=[]; let lx=bodyX+8;
  const legend=(w,draw,txt)=>{ items.push(draw(lx,ly)); items.push(`<text x="${lx+w}" y="${ly+4}" font-size="11" fill="#4E4E52">${txt}</text>`); lx+=w+txt.length*11+30; };
  g+=`<line x1="${bodyX}" y1="${H-LEG}" x2="${W-PADX}" y2="${H-LEG}" stroke="#E5E5EA"/>`;
  legend(16,(x,y)=>icoTrash(x+6,y-4),"垃圾桶");
  legend(16,(x,y)=>tri(x+6,y-3,false),"緊急逃生窗口");
  legend(22,(x,y)=>`<rect x="${x}" y="${y-7}" width="16" height="13" rx="2" fill="#6B6B70"/><rect x="${x+4}" y="${y-10}" width="8" height="3" fill="#6B6B70"/>`,"行李放置區");
  legend(16,(x,y)=>icoFire(x+6,y-6),"滅火器");
  legend(18,(x,y)=>icoCond(x+6,y-2),"列車長室");
  legend(22,(x,y)=>icoAED(x+8,y-2),"自動體外心臟電擊去顫器");
  g+=items.join("");
  return g+`</svg>`;
}

/* ===== 兩指縮放／拖曳：座位圖共用 =====
 * 沒放大時單指照常捲頁面（touch-action: pan-y）；兩指捏合放大、放大後單指拖曳、雙擊切換 1x/2x；
 * 右上角 ＋ － 1:1。不用 pointer capture，座位本身的點擊才不會被吃掉。 */
/* 光箱：把座位圖／平面圖放到全螢幕黑底，可雙指縮放、拖曳；座位一樣可以點 */
/* 光箱：全螢幕；同一天有多節車廂（或多個樓層）時可左右滑切換；縮放不受原圖大小限制 */
function openLightbox(src, idx, title){
  closeLightbox();
  let slides = Array.isArray(src) ? src : [{ title: title||"", render: ()=>src.cloneNode(true) }];
  if(!slides.length) return;
  let cur = Math.min(Math.max(0, idx||0), slides.length-1);
  const box=document.createElement("div"); box.id="lightbox";
  box.innerHTML=`<div class="lbhead">
      <button class="lbnav" data-nav="-1" title="上一節">‹</button>
      <span class="lbtitle"></span>
      <span class="lbdots"></span>
      <button class="lbnav" data-nav="1" title="下一節">›</button>
      <span class="lbzoom"><button data-z="out">－</button><span class="lbpct">100%</span><button data-z="in">＋</button><button data-z="fit">符合</button></span>
      <button class="lbx" title="關閉">✕</button></div>
    <div class="lbbody"><div class="lbstage"></div></div>
    <div class="lbfoot">${slides.length>1?"左右滑動切換車廂・":""}兩指縮放・雙擊放大・拖曳移動・點座位看資料</div>`;
  const stage=box.querySelector(".lbstage"), body=box.querySelector(".lbbody"), pct=box.querySelector(".lbpct");
  document.body.appendChild(box); document.body.classList.add("lb-open");
  box.querySelector(".lbx").onclick=closeLightbox;
  let clone=null, base={w:0,h:0}, s=1, tx=0, ty=0, minS=1;
  const ratio=()=>{ if(!clone) return 4/3; if(clone.tagName.toLowerCase()==="img") return (clone.naturalWidth||4)/(clone.naturalHeight||3);
    const vb=(clone.getAttribute("viewBox")||"").split(/[\s,]+/).map(Number); return vb.length===4&&vb[3]?vb[2]/vb[3]:(clone.clientWidth||4)/(clone.clientHeight||3); };
  const apply=()=>{ const W=body.clientWidth, H=body.clientHeight, cw=base.w*s, ch=base.h*s;
    tx = cw<=W ? (W-cw)/2 : Math.min(0,Math.max(W-cw,tx));
    ty = ch<=H ? (H-ch)/2 : Math.min(0,Math.max(H-ch,ty));
    stage.style.transform=`translate(${tx}px,${ty}px) scale(${s})`; pct.textContent=Math.round(s*100)+"%"; };
  const fit=()=>{ if(!clone) return; const W=body.clientWidth, H=body.clientHeight, r=ratio();
    base.w=Math.min(W, H*r); base.h=base.w/r; clone.style.width=base.w+"px"; clone.style.height=base.h+"px";
    s=1; tx=(W-base.w)/2; ty=(H-base.h)/2; apply(); };
  const zoomAt=(f,cx,cy)=>{ const ns=Math.min(12,Math.max(minS,s*f)); f=ns/s; tx=cx-(cx-tx)*f; ty=cy-(cy-ty)*f; s=ns; apply(); };
  const rel=e=>{ const r=body.getBoundingClientRect(); return [e.clientX-r.left,e.clientY-r.top]; };
  const show=(i,dir)=>{
    cur=(i+slides.length)%slides.length; const sl=slides[cur];
    let el=sl.render(); if(typeof el==="string"){ const d=document.createElement("div"); d.innerHTML=el.trim(); el=d.firstElementChild; }
    el.style.transform=""; el.classList.remove("zin"); el.classList.add("lbimg");
    stage.innerHTML=""; stage.appendChild(el); clone=el;
    if(dir){ stage.classList.remove("slide-l","slide-r"); void stage.offsetWidth; stage.classList.add(dir>0?"slide-l":"slide-r"); }
    box.querySelector(".lbtitle").textContent=sl.title||"";
    box.querySelector(".lbdots").innerHTML=slides.length>1?slides.map((x,j)=>`<i class="${j===cur?"on":""}"></i>`).join(""):"";
    box.querySelectorAll(".lbnav").forEach(b=>b.style.visibility=slides.length>1?"visible":"hidden");
    const start=()=>{ fit(); if(window.LB_WIRE) window.LB_WIRE(el); };
    if(el.tagName.toLowerCase()==="img"&&!el.complete) el.onload=start; else requestAnimationFrame(start);
  };
  box.querySelectorAll(".lbnav").forEach(b=>b.onclick=ev=>{ ev.stopPropagation(); show(cur+ +b.dataset.nav, +b.dataset.nav); });
  const ptrs=new Map(); let pinch=null, drag=null, lastTap=0, moved=false, swiped=false;
  /* 不在 pointerdown 就抓 capture：抓了以後 click 會落在 body 而不是座位，座位就點不開了。等真的拖動／兩指才抓。 */
  const grab=id=>{ try{ if(!body.hasPointerCapture(id)) body.setPointerCapture(id); }catch(_){} };
  body.addEventListener("pointerdown",e=>{ ptrs.set(e.pointerId,{x:e.clientX,y:e.clientY});
    if(ptrs.size===2){ ptrs.forEach((_,id)=>grab(id)); const [p,q]=[...ptrs.values()]; const r=body.getBoundingClientRect();
      pinch={d:Math.hypot(p.x-q.x,p.y-q.y),s0:s,cx:(p.x+q.x)/2-r.left,cy:(p.y+q.y)/2-r.top,tx0:tx,ty0:ty}; drag=null; }
    else if(ptrs.size===1){ drag={x:e.clientX,y:e.clientY,tx0:tx,ty0:ty}; moved=false; swiped=false; } });
  body.addEventListener("pointermove",e=>{ if(!ptrs.has(e.pointerId)) return; ptrs.set(e.pointerId,{x:e.clientX,y:e.clientY});
    if(pinch&&ptrs.size===2){ const [p,q]=[...ptrs.values()]; const d=Math.hypot(p.x-q.x,p.y-q.y); const r=body.getBoundingClientRect();
      const cx=(p.x+q.x)/2-r.left, cy=(p.y+q.y)/2-r.top, ns=Math.min(12,Math.max(minS,pinch.s0*d/pinch.d)), f=ns/pinch.s0;
      tx=cx-(pinch.cx-pinch.tx0)*f; ty=cy-(pinch.cy-pinch.ty0)*f; s=ns; apply(); }
    else if(drag&&ptrs.size===1){ const dx=e.clientX-drag.x, dy=e.clientY-drag.y; if(Math.hypot(dx,dy)>4){ moved=true; grab(e.pointerId); }
      if(s<=1.02 && slides.length>1){ stage.style.transform=`translate(${tx+dx*0.6}px,${ty}px) scale(${s})`; }   /* 沒放大：橫滑＝換車廂 */
      else { tx=drag.tx0+dx; ty=drag.ty0+dy; apply(); } } });
  const up=e=>{ const wasDrag=drag; ptrs.delete(e.pointerId);
    if(ptrs.size===0){ const now=Date.now();
      if(wasDrag && s<=1.02 && slides.length>1){ const dx=e.clientX-wasDrag.x, dy=e.clientY-wasDrag.y;
        if(Math.abs(dx)>60 && Math.abs(dx)>Math.abs(dy)*1.3){ show(cur+(dx<0?1:-1), dx<0?1:-1); swiped=true; } else apply(); }
      if(!pinch&&!moved&&!swiped){ if(now-lastTap<320){ const [cx,cy]=rel(e); if(s>1.5){ fit(); } else zoomAt(2.5,cx,cy); lastTap=0; } else lastTap=now; }
      pinch=null; drag=null; }
    else if(ptrs.size===1){ pinch=null; const [p]=[...ptrs.values()]; drag={x:p.x,y:p.y,tx0:tx,ty0:ty}; } };
  body.addEventListener("pointerup",up); body.addEventListener("pointercancel",up);
  body.addEventListener("wheel",e=>{ e.preventDefault(); const [cx,cy]=rel(e); zoomAt(e.deltaY<0?1.15:1/1.15,cx,cy); },{passive:false});
  box.querySelectorAll(".lbzoom button").forEach(bt=>bt.onclick=ev=>{ ev.stopPropagation(); const W=body.clientWidth,H=body.clientHeight;
    if(bt.dataset.z==="fit") fit(); else zoomAt(bt.dataset.z==="in"?1.5:1/1.5,W/2,H/2); });
  stage.addEventListener("click",e=>{ if(moved||swiped){ e.stopPropagation(); e.preventDefault(); } },true);
  const onKey=e=>{ if(e.key==="Escape") closeLightbox(); if(e.key==="ArrowRight") show(cur+1,1); if(e.key==="ArrowLeft") show(cur-1,-1); };
  window.addEventListener("resize",fit); window.addEventListener("keydown",onKey);
  box._cleanup=()=>{ window.removeEventListener("resize",fit); window.removeEventListener("keydown",onKey); };
  show(cur,0);
}
function closeLightbox(){ const b=document.getElementById("lightbox"); if(b){ if(b._cleanup) b._cleanup(); b.remove(); } document.body.classList.remove("lb-open"); }
/* 頁面上的座位圖／平面圖只是預覽：點一下開光箱，所有縮放都在光箱裡做（頁面上不再跟捲動搶手勢） */
function zoomify(wrap){
  const inner=wrap.firstElementChild; if(!inner||wrap.dataset.zoom) return;
  wrap.dataset.zoom="1"; inner.classList.add("zin");
  const badge=document.createElement("span"); badge.className="pvbadge"; badge.innerHTML="⤢ 放大"; wrap.appendChild(badge);
  wrap.addEventListener("click",e=>{
    if(e.target.closest(".seat.mine,.seatg.mine,.sseat")) return;
    if(wrap._slides) openLightbox(wrap._slides(), wrap._slideIdx||0);
    else openLightbox(inner, 0, wrap.dataset.title||"");
  });
}
/* 站名時刻拆成 chip：「台北 06:30 → 台中 07:20 → 嘉義 07:43」 */
function routeChips(route){
  return String(route||"").split("→").map(seg=>{
    const m=seg.trim().match(/^(\S+?)\s*(\d{1,2}:\d{2})?$/);
    return m ? `<span class="st"><b>${esc(m[1])}</b>${m[2]?`<i>${m[2]}</i>`:""}</span>` : `<span class="st"><b>${esc(seg.trim())}</b></span>`;
  }).join(`<span class="arr">→</span>`);
}

function svgHsr(containerW){
  const trains=HSR_TRAINS[S.hsrDay||S.day]||[];
  const horiz = true;                      /* 一律照高鐵官網的橫式車廂圖；畫面不夠寬就左右滑 */
  const narrow = containerW<980;
  let out="";
  if(!S.hsrCar) S.hsrCar={};
  trains.forEach(t=>{
    const map=hsrSeatIndex(t);
    const n=Object.keys(map).length;
    const south=t.dir==="南下";
    const dest=String(t.route||"").split("→").pop().replace(/[\d:\s]/g,"");
    /* 一次只畫一節車廂，畫面留給它；兩節以上的車次用分頁切 */
    const tk=`${S.day}:${t.no}`;
    let cur=S.hsrCar[tk]; if(!t.cars.includes(cur)) cur=t.cars[0];
    const cnt=c=>Object.keys(map).filter(k=>k.startsWith(`${c}車 `)).length;
    const tabs = t.cars.length>1 ? `<div class="cartabs">${t.cars.map(c=>`
      <button class="tab${c===cur?" on":""}" data-car="${c}" data-tk="${esc(tk)}">第 ${c} 車<span>${esc(HSR_CARS[c].cls.slice(0,2))} · ${cnt(c)} 席</span></button>`).join("")}</div>` : "";
    out+=`<div class="traincard">
      <div class="trainhead">
        <span class="trainno">${esc(t.no)}<small>車次</small></span>
        <span class="trainroute">${routeChips(t.route)}</span>
        <span class="pill ${south?"red":"redln"}">${esc(t.dir)}</span>
        ${t.tag?`<span class="pill amber">${esc(t.tag)}</span>`:""}
        <span class="pill gray">本團 ${n} 席</span>
      </div>
      ${tabs}
      <div class="cars">${[cur].map(c=>`
        <div class="carblk">
          <div class="zw" data-train="${esc(t.no)}" data-car="${c}" data-title="高鐵 ${esc(t.no)} · ${c} 車">${svgCarThsrc(c,map,t)}</div>
          <div class="zoomhint">點圖放大・光箱裡左右滑切換車廂</div>
        </div>`).join("")}</div>
    </div>`;
  });
  out+=`<div class="hsrlegend">
    <span><i style="background:#C8102E;border-color:#B8000F"></i>董事長伉儷</span>
    <span><i style="background:#FDECEE;border-color:#C8102E"></i>貴賓</span>
    <span><i style="background:#E9F0FD;border-color:#2563EB"></i>雄獅主管</span>
    <span><i style="background:#F0F0F2;border-color:#9A9AA0"></i>工作人員</span>
    <span><i style="background:#fff;border-color:#DCDCE2"></i>空位</span>
    <span><i style="background:#1E9E4A;border-color:#1E9E4A"></i>台中上／下車</span>
    <span><i style="background:#fff;border:2px dashed #F08A24"></i>票待確認（沒對到訂位代號）</span>
    <span><i style="background:repeating-linear-gradient(45deg,#F4F4F6 0 3px,#D5D5DA 3px 4px);border-color:#B9B9BF"></i>已訂未用</span>
    <span>點有名字的座位看貴賓資料</span>
  </div>`;
  return out;
}
/* ===== 福森號座位圖（依林鐵原廠車廂配置圖重繪，供領隊向貴賓展示） =====
 * 4車 客座車廂 16座（設洗手間）：上排 1–8 號、下排 9–16 號
 * 5車 守車車廂 18座（設守車室）：上排 1–10 號、下排 11–18 號
 * 本團配位 25 席＝4車 1–8 號（8）＋5車 1–17 號（17，含領隊）
 * 座位以林鐵配位區塊對應，實際對號以現場安排為準。 */
/* ============================================================ 福森號（嚴格照林鐵原廠配置圖）
 * 車頭之後 1→5 車：觀畫(18)・客座(16)・吧檯(10)・客座(16)・守車(18)。本團用 4 車客座、5 車守車。
 * 圖上排是「靠窗＋走道」兩人座（小號靠窗），下排是單人座；棕色是小桌。座位配置：產品部 9/17「A段」「C段」座位圖。 */
const FUSEN_TRAIN=[["觀畫車廂",18],["客座車廂",16],["吧檯車廂",10],["客座車廂",16],["守車車廂",18]];
/* 每節車廂的平面：x 是車廂長度的比例（0 車頭端 → 1 車尾端），依原廠圖量的 */
const FUSEN_LAYOUT = {
  4:{ name:"客座車廂", seats:16, left:"toilet",
      top:[["seat",1,.26],["table",.31],["bench",[3,4],.38],["table",.43],["bench",[6,7],.48],["bench",[9,10],.56],["table",.61],["bench",[12,13],.67],["table",.73],["crew",.78],["ac",.865]],
      bot:[["seat",2,.26],["table",.31],["seat",5,.38],["table",.43],["seat",8,.48],["seat",11,.56],["table",.61],["seat",14,.67],["table",.73],["seat",16,.78],["rack",.865]] },
  5:{ name:"守車車廂", seats:18, left:"cab",
      top:[["seat",1,.165],["table",.225],["seat",3,.28],["bench",[5,6],.365],["table",.415],["bench",[8,9],.47],["bench",[11,12],.55],["table",.605],["bench",[14,15],.66],["table",.72],["seat",17,.78],["ac",.865]],
      bot:[["seat",2,.165],["table",.225],["seat",4,.28],["seat",7,.365],["table",.415],["seat",10,.47],["seat",13,.55],["table",.605],["seat",16,.66],["table",.72],["crew",.78],["rack",.865]] },
};
/* 產品部 9/17 座位圖：A 段（9/20 北門→十字路）、C 段（9/21 阿里山→奮起湖）；"crew"＝車服座 */
const FUSEN_SEATS = {
  A:{ 4:{ 2:"p30", 3:"p18", 4:"p25", 5:"p29", 6:"p23", 7:"p17", 8:"p24" },
      5:{ 1:"p20", 2:"p14", 3:"p10", 4:"p09", 5:"p28", 6:"p19", 7:"p05", 8:"p08", 9:"p07", 10:"p06", 11:"p04", 12:"p03", 13:"p01", 14:"p12", 15:"p11", 16:"p02", 17:"p13", crew:"p16" } },
  C:{ 4:{ 2:"p30", 3:"p18", 4:"p25", 5:"p29", 6:"p23", 7:"p17", 8:"p24" },
      5:{ 1:"p14", 2:"p13", 3:"p20", 4:"p16", 5:"p04", 6:"p03", 7:"p19", 8:"p08", 9:"p07", 10:"p28", 11:"p02", 12:"p01", 13:"p06", 14:"p12", 15:"p11", 16:"p05", 17:"p10", crew:"p09" } },
};
const FUSEN_SEG = { A:{ label:"A 段", date:"9/20", route:"北門 → 鹿滿 → 樟腦寮 → 第三景觀台 → 奮起湖 → 多林 → 十字路", dir:"left" },
                    C:{ label:"C 段", date:"9/21", route:"阿里山 → 二萬坪 → 十字路 → 奮起湖", dir:"right" } };
const fusenSeatLabel=(car,no)=> no==="crew" ? `${car}車 車服座` : `${car}車 ${no}號`;
/* 領隊改過的福森號座位存 S.fusenSeats[段]（{車:{號:pid}}）；沒改過就用產品部的 */
function fusenSeatsOf(seg){ let c=null; try{ c=S&&S.fusenSeats?S.fusenSeats[seg]:null; }catch(_){} return c||FUSEN_SEATS[seg]; }
function ensureFusen(seg){ if(!S.fusenSeats) S.fusenSeats={}; if(!S.fusenSeats[seg]) S.fusenSeats[seg]=JSON.parse(JSON.stringify(FUSEN_SEATS[seg])); return S.fusenSeats[seg]; }
let FUSEN_CHG=null;   /* {"車-號": 原本的 pid 或 null}，畫圖時標橘框 */
function fusenDiff(seg){ const cur=fusenSeatsOf(seg), base=FUSEN_SEATS[seg], out={};
  for(const car of [4,5]){ const keys=new Set([...Object.keys(cur[car]||{}),...Object.keys(base[car]||{})]);
    keys.forEach(no=>{ const a=(cur[car]||{})[no]||null, b=(base[car]||{})[no]||null; if(a!==b) out[`${car}-${no}`]=b; }); }
  return out; }
/* 把 A／C 段座位寫回旅客資料（團體大表、旅客卡片用） */
function applyFusen0917(list){
  const byId=Object.fromEntries(list.map(p=>[p.id,p]));
  list.forEach(p=>{ delete p.fusenA; delete p.fusenC; });
  for(const seg of ["A","C"]) for(const car of [4,5]) for(const [no,pid] of Object.entries(fusenSeatsOf(seg)[car]||{})){
    const p=byId[pid]; if(p) p["fusen"+seg]=fusenSeatLabel(car,no);
  }
  list.forEach(p=>{ p.trainSeat = p.fusenA || p.fusenC || "—"; });
  return list;
}
const TRAIN_TL = { name:"薛永南 領隊", seat:"" };
function fusenMap(seg){ const m={}; for(const car of [4,5]) for(const [no,pid] of Object.entries(fusenSeatsOf(seg)[car]||{})){ const p=pax(pid); if(p) m[`${car}-${no}`]=p; } return m; }

/* 整列福森號：車頭＋五節，可點選；本團用的兩節標紅 */
function svgFusenTrain(sel){
  const W=900,H=118, x0=8, locoW=118, carW=142, gap=10;
  let g=`<svg viewBox="0 0 ${W} ${H}" class="fusentrain">`;
  g+=`<g><rect x="${x0}" y="24" width="${locoW}" height="50" rx="8" fill="#C8102E"/><rect x="${x0+8}" y="14" width="${locoW-40}" height="14" rx="4" fill="#8A0A1F"/>
      <rect x="${x0+12}" y="32" width="18" height="14" rx="2" fill="#FFF3D6"/><rect x="${x0+38}" y="32" width="18" height="14" rx="2" fill="#FFF3D6"/>
      ${[0,1,2,3].map(i=>`<circle cx="${x0+18+i*28}" cy="80" r="7" fill="#333"/>`).join("")}<text x="${x0+locoW/2}" y="104" text-anchor="middle" font-size="11" fill="#8E8E93">車頭</text></g>`;
  FUSEN_TRAIN.forEach(([nm,n],i)=>{
    const carNo=i+1, x=x0+locoW+gap+i*(carW+gap), used=carNo===4||carNo===5, on=sel===carNo;
    g+=`<g class="fcar${used?" used":" nouse"}${on?" on":""}" data-car="${carNo}" style="cursor:pointer">
      <rect x="${x}" y="24" width="${carW}" height="50" rx="7" fill="${used?"#F5E6C4":"#EFE7D6"}" stroke="${on?"#C8102E":(used?"#C8935A":"#D5CDBE")}" stroke-width="${on?3:1.5}"/>
      ${[0,1,2,3,4,5].map(j=>`<rect x="${x+10+j*21}" y="33" width="14" height="14" rx="2" fill="#fff" stroke="#C8935A" stroke-width="1"/>`).join("")}
      ${[0,1].map(j=>`<circle cx="${x+30+j*80}" cy="80" r="6" fill="#333"/>`).join("")}
      ${used?`<rect x="${x+carW-30}" y="4" width="26" height="16" rx="4" fill="#C8102E"/><text x="${x+carW-17}" y="16" text-anchor="middle" font-size="10" font-weight="800" fill="#fff">${carNo}車</text>`:""}
      <text x="${x+carW/2}" y="104" text-anchor="middle" font-size="11.5" font-weight="${used?800:600}" fill="${used?"#8A5A20":"#B9B9BF"}">${esc(nm)}</text>
      <text x="${x+carW/2}" y="116" text-anchor="middle" font-size="9.5" fill="${used?"#8A5A20":"#C9C9CF"}">${n} 座位${used?"":"・本團未使用"}</text>
    </g>`;
  });
  return g+"</svg>";
}

/* 單節車廂平面圖：嚴格照原廠圖的位置畫（上排兩人座、下排單人座、小桌、車服座、空調、行李架、洗手間／駕駛艙） */
function svgFusenCar(carNo, map, seg){
  const L=FUSEN_LAYOUT[carNo], W=1000, H=310, dir=(FUSEN_SEG[seg]||{}).dir||"left";
  const bx=18, bw=W-36, by=48, bh=224;          /* 車體 */
  const X=f=>bx+20+f*(bw-40);
  const uid="fz"+carNo;
  let g=`<svg viewBox="0 0 ${W} ${H}" class="carsvg fusencarsvg" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="${uid}-floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FBF1D8"/><stop offset="1" stop-color="#F3E3C0"/></linearGradient>
    <linearGradient id="${uid}-shell" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E8D9B7"/><stop offset="1" stop-color="#D9C79F"/></linearGradient>
    <linearGradient id="${uid}-wood" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#D2A06A"/><stop offset="1" stop-color="#B27A45"/></linearGradient>
    <linearGradient id="${uid}-vip" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#D93A55"/><stop offset="1" stop-color="#B70D2A"/></linearGradient>
    <linearGradient id="${uid}-glass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#DCE9F3"/><stop offset="1" stop-color="#B9CEDF"/></linearGradient>
    <filter id="${uid}-sh" x="-20%" y="-20%" width="140%" height="160%"><feDropShadow dx="0" dy="1.5" stdDeviation="1.4" flood-color="#6B4E1E" flood-opacity=".25"/></filter>
  </defs>`;
  /* 運行方向 */
  const arrow=(x1,x2,color,label,anchor)=>`<g><rect x="${Math.min(x1,x2)-10}" y="6" width="${Math.abs(x2-x1)+20+64}" height="24" rx="12" fill="${color}" fill-opacity=".1" transform="translate(${anchor==="end"?-64:0},0)"/>
    <path d="M${x1} 18 L${x2} 18" stroke="${color}" stroke-width="5" stroke-linecap="round"/>
    <path d="${x2<x1?`M${x2+11} 9 L${x2} 18 L${x2+11} 27`:`M${x2-11} 9 L${x2} 18 L${x2-11} 27`}" fill="none" stroke="${color}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="${anchor==="end"?x1-14:x1+14}" y="23" text-anchor="${anchor}" font-size="13" font-weight="800" fill="${color}">${label}</text></g>`;
  g+= dir==="left" ? arrow(120,40,"#2B6BE0","運行方向","start") : arrow(W-120,W-40,"#E07B12","運行方向","end");
  /* 車體外殼、地板 */
  g+=`<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="16" fill="url(#${uid}-shell)" stroke="#8C7A55" stroke-width="1.5"/>
      <rect x="${bx+8}" y="${by+14}" width="${bw-16}" height="${bh-28}" rx="8" fill="url(#${uid}-floor)"/>`;
  /* 車窗：嵌在上下兩道車壁裡（俯視圖），不超出車體外框 */
  for(let i=0;i<14;i++){ const wx=bx+34+i*(bw-68)/13;
    g+=`<rect x="${wx-21}" y="${by+3}" width="42" height="8" rx="2.5" fill="url(#${uid}-glass)" stroke="#7A8794" stroke-width="1"/><rect x="${wx-21}" y="${by+bh-11}" width="42" height="8" rx="2.5" fill="url(#${uid}-glass)" stroke="#7A8794" stroke-width="1"/>`; }
  /* 門柱 */
  const post=(x)=>`<rect x="${x}" y="${by+10}" width="11" height="58" rx="3" fill="#4A4A50"/><rect x="${x}" y="${by+bh-68}" width="11" height="58" rx="3" fill="#4A4A50"/>`;
  /* 左端 */
  if(L.left==="toilet"){
    g+=`<rect x="${bx+16}" y="${by+16}" width="118" height="${bh-32}" rx="10" fill="#F1E6CE" stroke="#C9B58A" stroke-width="1"/>
        <rect x="${bx+26}" y="${by+26}" width="40" height="30" rx="8" fill="#fff" stroke="#6B6B72" stroke-width="1.8"/><text x="${bx+46}" y="${by+46}" text-anchor="middle" font-size="12" font-weight="800" fill="#6B6B72">WC</text>
        <text x="${bx+75}" y="${by+bh/2+4}" text-anchor="middle" font-size="11" font-weight="700" fill="#8A7550">洗手間</text>
        <circle cx="${bx+112}" cy="${by+36}" r="11" fill="#fff" stroke="#6B6B72" stroke-width="1.8"/><line x1="${bx+112}" y1="${by+36}" x2="${bx+112}" y2="${by+26}" stroke="#6B6B72" stroke-width="2"/>
        <path d="M${bx+16} ${by+bh-70} L${bx+134} ${by+bh-52} L${bx+134} ${by+bh-16} L${bx+16} ${by+bh-16} Z" fill="#4A4A50" opacity=".85"/>`
        + post(X(.215));
  }else{
    g+=`<rect x="${bx+18}" y="${by+20}" width="82" height="${bh-40}" rx="14" fill="#F1E6CE" stroke="#4A4A50" stroke-width="2.5"/>
        <text x="${bx+59}" y="${by+80}" text-anchor="middle" font-size="18" font-weight="800" fill="#3A3A40">駕</text><text x="${bx+59}" y="${by+116}" text-anchor="middle" font-size="18" font-weight="800" fill="#3A3A40">駛</text><text x="${bx+59}" y="${by+152}" text-anchor="middle" font-size="18" font-weight="800" fill="#3A3A40">艙</text>`
        + post(X(.125));
  }
  g+=post(X(.955));
  const seatW=54, seatH=42;
  const drawSeat=(cx,cy,no,key)=>{
    const p=map[key], mine=!!p, vip=p&&(p.id==="p01"||p.id==="p02"), chg=!!(FUSEN_CHG&&key in FUSEN_CHG);
    const fill=mine?(vip?`url(#${uid}-vip)`:(chg?"#FFF4E8":"#FFFFFF")):(chg?"#FFF4E8":"#F6F2EA"), stroke=chg?"#E07B12":mine?(vip?"#8A0A1F":"#C8102E"):"#D9CFBC", tc=mine?(vip?"#fff":"#1E1E24"):"#B9B0A0";
    const back=mine?(vip?"#8A0A1F":"#F3C3C8"):"#E6DECF";
    const nm=p?p.name.replace(/\s+[A-Za-z].*$/,"").replace(/\s/g,"").slice(0,4):"";
    return `<g class="seatg${mine?" mine":""}${chg?" chg":""}" ${p?`data-p="${esc(p.id)}"`:""} data-key="${key}" ${mine?`filter="url(#${uid}-sh)"`:""}>
      <rect x="${cx-seatW/2}" y="${cy-seatH/2}" width="${seatW}" height="${seatH}" rx="9" fill="${fill}" stroke="${stroke}" stroke-width="${chg?3:mine?2:1.4}"/>
      <rect x="${cx-seatW/2+4}" y="${cy-seatH/2+4}" width="7" height="${seatH-8}" rx="3.5" fill="${back}"/>
      ${p?`<text x="${cx+4}" y="${cy+4.5}" text-anchor="middle" font-size="${nm.length>3?9.5:11.5}" font-weight="800" fill="${tc}">${esc(nm)}</text>`
         :`<text x="${cx+4}" y="${cy+5}" text-anchor="middle" font-size="13" font-weight="800" fill="#C6BCA9">${no==="crew"?"車服":no}</text>`}
      <g><circle cx="${cx-seatW/2+2}" cy="${cy-seatH/2+1}" r="7.5" fill="${mine?"#C8102E":"#B9B0A0"}"/><text x="${cx-seatW/2+2}" y="${cy-seatH/2+4}" text-anchor="middle" font-size="${no==="crew"?6.5:8}" font-weight="800" fill="#fff">${no==="crew"?"服":no}</text></g>
      ${chg?`<circle cx="${cx+seatW/2-3}" cy="${cy-seatH/2+1}" r="8" fill="#E07B12"/><text x="${cx+seatW/2-3}" y="${cy-seatH/2+4.5}" text-anchor="middle" font-size="9" font-weight="900" fill="#fff">改</text>`:""}
    </g>`;
  };
  const drawTable=(cx,cy)=>`<g filter="url(#${uid}-sh)"><rect x="${cx-16}" y="${cy-31}" width="32" height="62" rx="10" fill="url(#${uid}-wood)" stroke="#8F5E2E" stroke-width="1"/><rect x="${cx-11}" y="${cy-26}" width="22" height="52" rx="7" fill="none" stroke="#FFFFFF" stroke-opacity=".28" stroke-width="1"/></g>`;
  const topY=by+56, botY=by+bh-56;
  L.top.forEach(it=>{ const [t,a,f]=it, cx=X(t==="table"||t==="crew"||t==="ac"?a:f);
    if(t==="seat") g+=drawSeat(cx,topY,a,`${carNo}-${a}`);
    else if(t==="bench"){ g+=drawSeat(cx,topY-2,a[0],`${carNo}-${a[0]}`)+drawSeat(cx,topY+46,a[1],`${carNo}-${a[1]}`); }
    else if(t==="table") g+=drawTable(cx,topY+8);
    else if(t==="crew") g+=drawSeat(cx,topY,"crew",`${carNo}-crew`);
    else if(t==="ac") g+=`<rect x="${cx-36}" y="${topY-22}" width="72" height="44" rx="8" fill="#F1E6CE" stroke="#8C7A55" stroke-width="1.5"/><text x="${cx}" y="${topY+5}" text-anchor="middle" font-size="12.5" font-weight="800" fill="#6B5A3A">空調</text>`; });
  L.bot.forEach(it=>{ const [t,a,f]=it, cx=X(t==="table"||t==="crew"||t==="rack"?a:f);
    if(t==="seat") g+=drawSeat(cx,botY,a,`${carNo}-${a}`);
    else if(t==="table") g+=drawTable(cx,botY-8);
    else if(t==="crew") g+=drawSeat(cx,botY,"crew",`${carNo}-crew`);
    else if(t==="rack") g+=`<rect x="${cx-40}" y="${botY-22}" width="80" height="44" rx="6" fill="#F1E6CE" stroke="#8C7A55" stroke-width="1.2"/>${[0,1,2,3,4,5,6,7].map(i=>`<line x1="${cx-32+i*9}" y1="${botY-17}" x2="${cx-32+i*9}" y2="${botY+17}" stroke="#B27A45" stroke-width="1.6" stroke-linecap="round"/>`).join("")}<text x="${cx}" y="${botY+34}" text-anchor="middle" font-size="9" fill="#8A7550">行李架</text>`; });
  /* 圖例 */
  g+=`<g font-size="11" fill="#6B6B76"><rect x="${bx}" y="${H-24}" width="14" height="14" rx="4" fill="url(#${uid}-vip)"/><text x="${bx+19}" y="${H-13}">董事長伉儷</text>
      <rect x="${bx+96}" y="${H-24}" width="14" height="14" rx="4" fill="#fff" stroke="#C8102E" stroke-width="2"/><text x="${bx+115}" y="${H-13}">本團</text>
      <rect x="${bx+160}" y="${H-24}" width="14" height="14" rx="4" fill="#F6F2EA" stroke="#D9CFBC"/><text x="${bx+179}" y="${H-13}">空位</text>
      <rect x="${bx+224}" y="${H-24}" width="14" height="14" rx="4" fill="url(#${uid}-wood)"/><text x="${bx+243}" y="${H-13}">小桌</text>
      <text x="${W-bx}" y="${H-13}" text-anchor="end">上排靠窗＋走道兩人座（小號靠窗）・下排單人座・依林鐵原廠配置圖</text></g>`;
  return g+"</svg>";
}

PAGES.fusen=(hdr,scr)=>{
  hbar(hdr,"福森號座位",{back:true});
  if(!S.fusenSeg||!FUSEN_SEG[S.fusenSeg]) S.fusenSeg=(S.day>=2?"C":"A");
  if(!S.fusenCar||![4,5].includes(S.fusenCar)) S.fusenCar=5;
  const seg=S.fusenSeg, car=S.fusenCar, SG=FUSEN_SEG[seg], map=fusenMap(seg), L=FUSEN_LAYOUT[car];
  const used=Object.keys(map).filter(k=>k.startsWith(car+"-")).length, total=Object.keys(map).length;
  const diff=fusenDiff(seg); FUSEN_CHG=diff; const nChg=Object.keys(diff).length, custom=!!(S.fusenSeats&&S.fusenSeats[seg]);
  const segDay=seg==="A"?1:2, seated=new Set(Object.values(map).map(p=>p.id));
  const pool=PAX.filter(p=>p.days.includes(segDay)&&!seated.has(p.id));
  const nameOf=v=>{ const q=v?pax(v):null; return q?q.name:"空位"; };
  const chgList=[4,5].map(c=>{ const items=Object.keys(diff).filter(k=>k.startsWith(c+"-")).sort((a,b)=>(a.split("-")[1]==="crew"?99:+a.split("-")[1])-(b.split("-")[1]==="crew"?99:+b.split("-")[1]));
    return items.length?`<div class="chgrow"><b>${c} 車</b>${items.map(k=>{ const no=k.split("-")[1], cur=(fusenSeatsOf(seg)[c]||{})[no]||null;
      return `<span class="chgitem">${no==="crew"?"車服座":no+" 號"}：<s>${esc(nameOf(diff[k]))}</s> → <b>${esc(nameOf(cur))}</b></span>`; }).join("")}</div>`:""; }).join("");
  const chip=p=>{ const g=p.group==="貴賓"?"vip":p.group==="雄獅主管"?"mgr":"stf"; return `<div class="tseat ${g}" data-t="pool" data-p="${esc(p.id)}"><b>${esc(p.name)}</b>${p.group==="工作人員"?`<i>工作人員</i>`:""}</div>`; };
  const el=document.createElement("div");
  el.className="pagepad";
  el.innerHTML=`
  <div class="tabbar fusenseg" style="padding:0;border:none;background:none;margin-bottom:10px">
    ${Object.entries(FUSEN_SEG).map(([k,v])=>`<button class="tab${seg===k?" on":""}" data-seg="${k}">${v.label}・${v.date}</button>`).join("")}
  </div>
  <div class="card fusenhero">
    <div style="display:flex;align-items:baseline;gap:8px;flex-wrap:wrap">
      <b style="font-size:16px;color:#8A5A20">阿里山林鐵 · 福森號 ${esc(SG.label)}</b>
      <span class="pill redln">${esc(SG.date)}</span><span class="pill gray">配位 ${total} 席</span>
    </div>
    <div style="font-size:12.5px;color:#7A6A52;margin-top:7px;line-height:1.75">${esc(SG.route)}</div>
  </div>
  <div class="card fusentrainwrap">${svgFusenTrain(car)}<div class="zoomhint">點車廂看座位圖・本團使用 4 車客座、5 車守車</div></div>
  <div class="fusencar">
    <div class="fchead">
      <svg viewBox="0 0 28 32" class="fchev"><path d="M20 2 L4 16 L20 30 L26 25 L15 16 L26 7 Z" fill="#C8102E"/></svg>
      <b>${esc(L.name)}</b><span class="fcsub">（${L.seats} 座）</span><span class="pill red">${car} 車</span>
      <span class="pill ${used?"redln":"gray"}">本團 ${used} 席</span>
      <span class="fcsub" style="margin-left:auto">${seg==="A"?"運行方向 ←":"運行方向 →"}</span>
    </div>
    <div class="zw">${svgFusenCar(car,map,seg)}</div>
    <div class="zoomhint">點圖放大・光箱裡左右滑切換 4 車／5 車・<b>長按名字可拖到別的座位</b>（互換；拖到空位是搬過去）</div>
  </div>
  ${nChg?`<div class="card chgcard"><div class="thead"><b>${ic("refresh",15)} 跟產品部座位圖不同的座位</b><span class="pill orange">${nChg} 席</span><span class="roomhint">橘框＋「改」＝換過位子</span></div>${chgList}</div>`:""}
  <div class="card tcard pool tzone" data-t="pool">
    <div class="thead"><b>未配位</b><span class="pill gray">${pool.length} 人</span><span class="roomhint">長按拖到車廂空位；把車上的人拖到這裡＝取消座位</span></div>
    <div class="tseats">${pool.map(chip).join("")||`<div class="tempty">全部都有座位了</div>`}</div>
  </div>
  <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:4px;align-items:center">
    <span class="pill ${nChg?"orange":custom?"green":"gray"}">${nChg?`已換位 ${nChg} 席`:custom?"已自訂":"產品部配位"}</span>
    <button class="btn ghost" id="fzReset" ${custom?"":"disabled"}>還原成產品部配位</button>
  </div>
  <p class="vs">A 段與 C 段的 4 車相同；5 車兩段不同，請看各段。未配位的工作人員（薛永南、周冠廷、洪采吟）坐 4 車空位（1、9–16 號）。</p>`;
  el.querySelector("#fzReset").onclick=()=>confirmBox(`${SG.label}的福森號座位還原成產品部配位？`,()=>{ delete S.fusenSeats[seg]; save(); render(); toast("已還原"); });
  installSeatDrag(el,{ seatSel:".seatg.mine[data-p],.tseat[data-p]",
    targetAt:n=>n.closest(".seatg[data-key]")||n.closest(".tzone"),
    applyDrop:(src,tgt)=>{
      const cur=ensureFusen(seg), pid=src.dataset.p;
      const parse=k=>{ const [c,no]=String(k).split("-"); return {c:+c,no}; };
      const from=src.dataset.key?parse(src.dataset.key):null;
      if(tgt.dataset.key){ const to=parse(tgt.dataset.key); if(from&&from.c===to.c&&from.no===to.no) return false;
        if(!cur[to.c]) cur[to.c]={}; const other=cur[to.c][to.no]||null;
        cur[to.c][to.no]=pid; if(from){ if(other) cur[from.c][from.no]=other; else delete cur[from.c][from.no]; }
        return true; }
      if(tgt.dataset.t==="pool"){ if(!from) return false; delete cur[from.c][from.no]; return true; }
      return false;
    } });
  el.querySelectorAll("[data-seg]").forEach(b=>b.onclick=()=>{ S.fusenSeg=b.dataset.seg; save(); render(); });
  el.querySelectorAll(".fcar").forEach(c=>c.addEventListener("click",()=>{ const n=+c.dataset.car; if(n===4||n===5){ S.fusenCar=n; save(); render(); } else toast(`${n} 車本團未使用`); }));
  const wireSeats=root=>root.querySelectorAll(".seatg.mine").forEach(s=>s.addEventListener("click",ev=>{ ev.stopPropagation(); const p=pax(s.dataset.p); if(p) openPaxModal(p); }));
  wireSeats(el); window.LB_WIRE=wireSeats;
  const zw=el.querySelector(".fusencar .zw"); zw.dataset.title=`福森號 ${SG.label} · ${car} 車 ${L.name}`;
  zw._slides=()=>[4,5].map(c=>({ title:`福森號 ${SG.label} · ${c} 車 ${FUSEN_LAYOUT[c].name}`, render:()=>svgFusenCar(c,map,seg) })); zw._slideIdx=car===4?0:1;
  el.querySelectorAll(".zw").forEach(zoomify);
  scr.appendChild(el);
};

function openPaxModal(p){
  const ord=S.orders[p.id];
  openModal(`${p.name} · ${p.rel}`,`
    <div class="field"><label>座位資訊</label>
      <div style="display:flex;gap:6px;flex-wrap:wrap">
        <span class="pill gray">🚄 去程 ${esc(p.hsrGo)}</span>
        <span class="pill gray">🚄 回程 ${esc(p.hsrBack)}</span>
        <span class="pill gray">🚂 福森號 ${esc(p.trainSeat)}</span>
        ${p.table?`<span class="pill gray">${ic("table",12)} 第 ${p.table} 桌</span>`:""}
      </div></div>
    ${p.meal?`<div class="field"><label>特殊餐食</label><span class="pill amber">${esc(p.meal)}</span></div>`:""}
    ${p.note?`<div class="field"><label>備註</label><span style="font-size:13px">${esc(p.note)}</span></div>`:""}
    <div class="field"><label>鳴心咖啡（十字路）</label>${ord?`<span class="pill redln">☕ ${esc(ordText(ord))}</span>${ord.note?`<div style="font-size:12.5px;color:var(--ink2);margin-top:5px">✍️ ${esc(ord.note)}</div>`:""}`:`<span class="pill gray">尚未點餐</span>`}</div>
  `,[["前往咖啡點餐","pri",()=>{ closeModal(); goPage("coffee"); }],["關閉","sec",closeModal]]);
}

/* ---------- 鳴心咖啡點餐 ---------- */
const mName=id=>{ const m=MENU.find(x=>x.id===id); return m?m.name:id; };
const mItem=id=>MENU.find(x=>x.id===id);
const mImg=id=>(typeof MENU_IMG!=="undefined"&&MENU_IMG[id])||"";
/* 訂單一行字：品名＋非預設的客製，例「冰釀咖啡・少冰・微甜」 */
function ordOpts(o){
  const m=mItem(o.item), out=[];
  const temp=m?m.temp:(o.temp||"熱");
  if(temp==="冰"&&o.ice&&o.ice!==ORD_ICE[0]) out.push(o.ice);
  if(o.sugar&&o.sugar!==ORD_SUGAR[0]) out.push(o.sugar);
  return out;
}
function ordText(o){ const m=mItem(o.item); return [m?m.name:o.item, ...ordOpts(o)].join("・"); }
PAGES.coffee=(hdr,scr)=>{
  hbar(hdr,"鳴心咖啡 · 車上預點",{back:true});
  const orders=Object.entries(S.orders);
  /* 統計：先依品項數杯，再列客製明細，打電話給店家照著唸 */
  const byItem={};
  orders.forEach(([pid,o])=>{ const b=byItem[o.item]||(byItem[o.item]={n:0,opts:{},notes:[]}); b.n++;
    const k=ordOpts(o).join("・")||"正常"; b.opts[k]=(b.opts[k]||0)+1;
    if(o.note){ const p=PAX.find(x=>x.id===pid); b.notes.push(`${p?p.name:pid}：${o.note}`); } });
  const sum=MENU.filter(m=>byItem[m.id]).map(m=>{ const b=byItem[m.id];
    return `<div class="oi">
      <div class="oih">${mImg(m.id)?`<img class="oith" src="${mImg(m.id)}" alt="">`:`<span class="oith em">${esc(m.em||"☕")}</span>`}
        <span class="oin1"><span class="nm">${esc(m.name)}</span><span class="pill ${m.temp==="冰"?"cold":"hot"}">${esc(m.temp||"熱")}</span></span>
        <b class="cnt">${b.n}<small>杯</small></b></div>
      <div class="oid">${Object.entries(b.opts).map(([k,n])=>`<span>${esc(k)} <b>${n}</b></span>`).join("")}</div>
      ${b.notes.length?`<div class="oin">${b.notes.map(t=>`${ic("pen",12)} ${esc(t)}`).join("<br>")}</div>`:""}</div>`; }).join("")
    ||`<span style="color:#8E8E93;font-size:13px">尚無訂單</span>`;
  const total=orders.reduce((s,[,o])=>{ const m=mItem(o.item); return s+(m?+m.price||0:0); },0);
  const el=document.createElement("div");
  el.className="pagepad";
  el.innerHTML=`<div class="coffeehero">${mImg("c_cold")?`<img src="${mImg("c_cold")}" alt="">`:""}
    <div class="t"><span>阿里山林鐵 · 十字路站</span><b>鳴心咖啡 車上預點</b><span>福森號抵站前點好，領隊一通電話下單，到站即取</span></div></div>
  <div class="card"><div class="cardh">📊 下單統計 <span class="pill redln">共 ${orders.length} 杯${total?` · $${total}`:""}</span></div>
    <div class="ordsum">${sum}</div></div>
  <div class="card"><div class="cardh">貴賓點餐 <span class="pill gray">${PAX.filter(p=>p.days.includes(1)).length} 位（含工作人員）</span><span class="pill redln">9/20 福森號 A 段</span></div><div id="ordRows"></div></div>
  <button class="btn sec" id="clearOrd">清空全部訂單</button>
  ${typeof MENU_IMG_CREDIT!=="undefined"?`<p class="imgcredit">品項照片為示意（Flickr CC BY 2.0：${Object.values(MENU_IMG_CREDIT).map(c=>esc(c.by)).join("、")}），非鳴心咖啡實拍。</p>`:""}`;
  const rows=el.querySelector("#ordRows");
  /* 依福森號 A 段的車廂分成 A 車（5 車守車）、B 車（4 車客座）；領隊在車上點餐時一節一節收 */
  const carOf=p=>{ const st=fusenSeatsOf("A"); for(const c of [5,4]) if(Object.values(st[c]||{}).includes(p.id)) return c; return 0; };
  /* 只有 A 段（9/20）有咖啡預點，名單固定看第 1 天在團的人 */
  const people=PAX.filter(p=>p.days.includes(1));
  const groups=[[5,"5 車","守車車廂"],[4,"4 車","客座車廂"],[0,"未配位","不在福森號座位圖上"]];
  groups.forEach(([car,lb,sub])=>{
    const list=people.filter(p=>carOf(p)===car); if(!list.length) return;
    const done=list.filter(p=>S.orders[p.id]).length;
    const h=document.createElement("div"); h.className="ordgrp";
    h.innerHTML=`<b>${esc(lb)}</b><span>${esc(sub)}</span><span class="pill ${done===list.length?"green":"gray"}">${done} / ${list.length} 已點</span>`;
    rows.appendChild(h);
    list.forEach(p=>{
    const o=S.orders[p.id];
    const r=document.createElement("div");
    r.className="ordrow";
    r.innerHTML=`<span class="who">${esc(p.name)}${p.group==="工作人員"?`<i class="stfTag">工作人員</i>`:""}</span>
      ${o&&mImg(o.item)?`<img class="oith sm" src="${mImg(o.item)}" alt="">`:""}
      <span class="what">${o?`<b>${esc(ordText(o))}</b>${o.note?`<div class="onote">${ic("pen",12)} ${esc(o.note)}</div>`:""}`:"尚未點餐"}</span>
      <button class="btn ${o?"sec":"pri"}" style="padding:6px 13px;font-size:12.5px">${o?"修改":"點餐"}</button>`;
    r.querySelector("button").onclick=()=>openOrderModal(p);
    rows.appendChild(r);
    });
  });
  el.querySelector("#clearOrd").onclick=()=>confirmBox("清空全部咖啡訂單？",()=>{ S.orders={}; save(); render(); toast("訂單已清空"); });
  const mcard=document.createElement("div");
  mcard.className="card";
  mcard.innerHTML=`<div style="font-weight:800;margin-bottom:8px;font-size:14px">菜單品項</div>
    ${MENU.map((m,i)=>`<div class="ordrow"><span class="who">${esc(m.em||"")} ${esc(m.name)}</span><span class="what"><span class="pill gray">${esc(m.temp||"熱")}</span> ${+m.price?`$${+m.price}`:"價格未定"}${m.note?` · ${esc(m.note)}`:""}</span>${ebtn(String(i),true)}</div>`).join("")}`;
  el.appendChild(mcard);
  editBar(el,{add:()=>editMenuItem(null),addLabel:"新增品項"});
  EDIT_HANDLER=i=>editMenuItem(+i);
  scr.appendChild(el);
};
function editMenuItem(i){
  const m=i==null?null:MENU[i];
  editForm(m?"編輯品項":"新增品項", MENU_FIELDS, m||{em:"☕",temp:"熱",price:0}, {
    onSave:o=>{ if(m) Object.assign(m,o); else { o.id=newId("m"); MENU.push(o); } dataChanged("已儲存"); },
    onDelete:m?()=>{ MENU.splice(i,1); dataChanged("已刪除"); }:null,
  });
}
function openOrderModal(p){
  const cur=S.orders[p.id]||{item:null};
  let sel={item:cur.item,ice:cur.ice||ORD_ICE[0],sugar:cur.sugar||ORD_SUGAR[0],note:cur.note||""};
  const chips=(id,list,on)=>`<div class="efchips" id="${id}">${list.map(v=>`<button type="button" class="chip${v===on?" on":""}" data-v="${v}">${v}</button>`).join("")}</div>`;
  openModal(`${p.name} · 咖啡點餐`,`
    <div class="menu" id="mm">${MENU.map(m=>`
      <div class="mitem${sel.item===m.id?" on":""}" data-m="${m.id}">
        ${mImg(m.id)?`<img class="ph" src="${mImg(m.id)}" alt="">`:`<div class="em">${m.em||"☕"}</div>`}
        <span class="chk">✓</span>
        <div class="body"><div class="nm">${esc(m.name)}</div>
          <div class="pr"><span class="tmp ${m.temp==="冰"?"cold":"hot"}">${m.temp==="冰"?"冰飲":"熱飲"}</span>${+m.price?`<span class="money">$${+m.price}</span>`:""}</div>
          ${m.note?`<div class="nt">${esc(m.note)}</div>`:""}</div>
      </div>`).join("")}</div>
    <div class="optbox">
      <div class="optrow" id="iceF"><label>冰量</label>${chips("ice",ORD_ICE,sel.ice)}</div>
      <div class="optrow"><label>甜度</label>${chips("sugar",ORD_SUGAR,sel.sugar)}</div>
      <div class="optrow note"><label>備註</label><textarea id="ordNote" rows="2" placeholder="可用 Apple Pencil 直接手寫。例：不要奶、幫王董一起拿…">${esc(sel.note)}</textarea></div>
    </div>
  `,[["取消點餐","ghost",()=>{ delete S.orders[p.id]; save(); closeModal(); render(); }],
     ["確認","pri",()=>{
        if(!sel.item){ toast("請先選飲品"); return; }
        sel.note=$("#ordNote").value.trim();
        const m=mItem(sel.item);
        S.orders[p.id]={item:sel.item,temp:m?m.temp:"熱",ice:sel.ice,sugar:sel.sugar,note:sel.note};
        save(); closeModal(); render(); toast(`${p.name}：${ordText(S.orders[p.id])}`);
     }]]);
  const box=$("#mbox"); box.classList.add("wide");
  const syncIce=()=>{ const m=mItem(sel.item); box.querySelector("#iceF").style.display=(m&&m.temp==="冰")?"":"none"; };
  syncIce();
  box.querySelectorAll(".mitem").forEach(mi=>mi.onclick=()=>{
    sel.item=mi.dataset.m;
    box.querySelectorAll(".mitem").forEach(x=>x.classList.toggle("on",x.dataset.m===sel.item));
    syncIce();
  });
  for(const k of ["ice","sugar"]) box.querySelectorAll(`#${k} .chip`).forEach(c=>c.onclick=()=>{
    sel[k]=c.dataset.v;
    box.querySelectorAll(`#${k} .chip`).forEach(x=>x.classList.toggle("on",x.dataset.v===sel[k]));
  });
}

/* ---------- 餐食總覽 ---------- */
PAGES.meals=(hdr,scr)=>{
  hbar(hdr,"餐廳分桌",{back:true});
  const el=document.createElement("div");
  el.className="pagepad";
  const specials=GUESTS().filter(p=>p.meal);
  /* 只放產品部有給座位圖的 4 家餐廳；早餐發放、福森號九宮格、點心這類不在這裡（行程表有） */
  const list=[1,2,3].flatMap(d=>(MEALS[d]||[]).map((m,i)=>({m,i,d})).filter(x=>hasSeating(x.m)));
  el.innerHTML=`
  <div class="mealgrid">
  ${list.map(({m,i,d})=>{
    const {slot,place,menu,st,vids}=m;
    const st_=seatingOf(m), custom=!!S.seating[m.id];
    const tables=st_.tables.map(t=>({name:t.name.split("（")[0].replace(/\s/g,""),n:t.seats.filter(Boolean).length})).filter(t=>t.n);
    const seated=tables.reduce((n,t)=>n+t.n,0);
    const vs=(vids||[]).map(vendor).filter(Boolean), tel=vs.find(v=>(v.tel||[]).length);
    return `<div class="mealcard2" data-tb="${esc(m.id)}">
      ${ebtn(d+":"+i,true)}
      <div class="mdate"><b>D${d}</b><span>${esc(String(TOUR.dates[d-1]||"").replace(/\s*\(/,"("))}</span><em>${esc(slot)}</em></div>
      <div class="mmain">
        <div class="mname">${esc(place)}${st!=="OK"?`<span class="pill amber">${esc(st)}</span>`:""}</div>
        <div class="mtables">${tables.map(t=>`<span><b>${esc(t.name)}</b> ${t.n}</span>`).join("")}<span class="msum">共 ${seated} 人${custom?"・已調整":""}</span></div>
        <div class="mmenu">${esc(menu)}</div>
      </div>
      <div class="macts">
        ${tel?`<a class="mact" href="${telHref(tel.tel[0])}" title="撥號 ${esc(tel.name)}">${ic("phone",16)}</a>`:""}
        ${vs.length?`<button class="mact" data-vm="${esc(vs.map(v=>v.id).join(","))}" title="店家資訊">${ic("pin",16)}</button>`:""}
        <span class="mgo">${ic("chev",16)}</span>
      </div>
    </div>`;
  }).join("")}
  </div>

  <h3 class="sect">特殊餐食 <span class="efhint">每餐向餐廳確認</span></h3>
  <div class="card mealspec">
    <div class="speclist">${specials.map(p=>`<div class="specrow"><b>${esc(p.name)}</b><span>${esc(p.meal)}</span></div>`).join("")}</div>
    <div class="specnotes">
      <div><b>分菜</b>阿里山賓館外場地（D1）、優遊吧斯（D3）為合菜，餐廳已安排分菜；午間桌菜從簡避免浪費。</div>
      <div><b>座位</b>D1 晚宴：巴黎（陳婉如）與岳聰總坐外面。</div>
      <div><b>其他餐點</b>早餐發放、福森號九宮格、奮起湖點心、茶席請看行程表。</div>
    </div>
  </div>`;
  el.querySelectorAll(".mealcard2").forEach(c=>c.addEventListener("click",e=>{ if(e.target.closest(".mact")) return; goPage("tables:"+c.dataset.tb); }));
  el.querySelectorAll("[data-vm]").forEach(b=>b.onclick=e=>{ e.stopPropagation(); openVendorModal(b.dataset.vm); });
  el.querySelectorAll("a.mact").forEach(a=>a.addEventListener("click",e=>e.stopPropagation()));
  EDIT_HANDLER=k=>{ const [d,i]=String(k).split(":"); editMeal(+i,+d); };
  scr.appendChild(el);
};
function editMeal(i,day){
  const list=MEALS[day||S.day]||(MEALS[day||S.day]=[]);
  const m=i==null?null:list[i];
  editForm(m?"編輯餐次":"新增餐次", MEAL_FIELDS(), m||{slot:"午餐",st:"待確認",vids:[]}, {
    onSave:o=>{ if(m) Object.assign(m,o); else { o.id=newId("m"); list.push(o); } dataChanged("已儲存"); },
    onDelete:m?()=>{ list.splice(i,1); dataChanged("已刪除"); }:null,
  });
}

/* ---------- 店家聯絡 ---------- */
const vendor    = id => VENDORS.find(v=>v.id===id);
const telHref   = t  => "tel:" + String(t).replace(/[^0-9+]/g,"");
const mapHref   = a  => "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(a);
const vendorsOf = d  => VENDORS.filter(v=>v.days.includes(d));

/* 複製：Safari 在 file:// 下沒有 clipboard API，退回 execCommand */
function copyText(t){
  const ok=()=>toast("已複製");
  const fallback=()=>{
    const ta=document.createElement("textarea");
    ta.value=t; ta.setAttribute("readonly","");
    ta.style.cssText="position:fixed;top:0;left:0;opacity:0";
    document.body.appendChild(ta); ta.select(); ta.setSelectionRange(0,t.length);
    try{ document.execCommand("copy"); ok(); }catch(e){ toast("複製失敗，請長按選取"); }
    ta.remove();
  };
  if(navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(t).then(ok, fallback);
  else fallback();
}

/* 一顆撥號鍵：tel: 在 iPad 上會帶出 FaceTime／接續通話，離線也能用 */
function telBtn(t,note){
  return `<a class="vtel" href="${telHref(t)}">${ic("phone",16)}<b>${esc(t)}</b>${note?`<span class="vtn">${esc(note)}</span>`:""}</a>`;
}

function vendorCard(v){
  const c=S.vconf[v.id]||{};
  return `<div class="vcard${v.warn?" warnbd":""}" data-v="${v.id}">
    <div class="vtop">
      <div class="vhead">
        <b class="vnm">${esc(v.name)}</b>
        ${v.sub?`<span class="vsub">${esc(v.sub)}</span>`:""}
      </div>
      ${ebtn(v.id,true)}
      <button class="vck${c.ok?" on":""}" data-ck="${v.id}">
        <span class="ckbox">${c.ok?"✓":""}</span>${c.ok?"已確認":"待致電"}
      </button>
    </div>
    ${v.tel.length ? v.tel.map((t,i)=>telBtn(t, i===0?v.telNote:"")).join("")
                   : `<div class="vnotel">無獨立聯絡電話・現場洽詢</div>`}
    ${v.addr?`<div class="vrow"><span class="vk">${ic("pin",14)}</span><span class="vv">${esc(v.addr)}</span>
      <a class="vmini" href="${mapHref(v.addr)}" target="_blank" rel="noopener">地圖</a></div>`:""}
    ${v.hours?`<div class="vrow"><span class="vk">${ic("clock",14)}</span><span class="vv">${esc(v.hours)}</span></div>`:""}
    ${v.email?`<div class="vrow"><span class="vk">${ic("mail",14)}</span>
      <a class="vv vlink" href="mailto:${esc(v.email)}">${esc(v.email)}</a>
      <button class="vmini" data-cp="${esc(v.email)}">複製</button></div>`:""}
    ${v.line?`<div class="vrow"><span class="vk">LINE</span><span class="vv">${esc(v.line)}</span>
      <button class="vmini" data-cp="${esc(v.line)}">複製</button></div>`:""}
    ${v.url?`<div class="vrow"><span class="vk">${ic("link",14)}</span>
      <a class="vv vlink" href="${esc(v.url)}" target="_blank" rel="noopener">${esc(v.url.replace(/^https?:\/\//,""))}</a></div>`:""}
    ${v.note?`<div class="vnote">${esc(v.note)}</div>`:""}
    ${v.warn?`<div class="vwarn">${ic("warn",14)}<span>${esc(v.warn)}</span></div>`:""}
    ${c.ok&&c.at?`<div class="vstamp">已於 ${esc(c.at)} 致電確認</div>`:""}
  </div>`;
}

function toggleVconf(id){
  const cur=S.vconf[id]||{};
  if(cur.ok) S.vconf[id]={ok:false};
  else{
    const d=new Date(), p2=n=>String(n).padStart(2,"0");
    S.vconf[id]={ok:true, at:`${d.getMonth()+1}/${d.getDate()} ${p2(d.getHours())}:${p2(d.getMinutes())}`};
  }
  save();
  toast(S.vconf[id].ok?"已記錄確認":"已取消確認");
}

/* 只彈出指定店家：餐食頁、行程捷徑、分房表的飯店都走這裡，不必跳去整頁清單 */
function openVendorModal(ids){
  const list=(Array.isArray(ids)?ids:String(ids).split(",")).map(vendor).filter(Boolean);
  if(!list.length){ toast("找不到店家資料"); return; }
  openModal(list.length===1?list[0].name:"店家資訊", list.map(vendorCard).join(""), [["關閉","sec",closeModal]]);
  const mb=$("#mbox");
  mb.querySelectorAll("[data-ck]").forEach(b=>b.onclick=()=>{ toggleVconf(b.dataset.ck); openVendorModal(ids); });
  mb.querySelectorAll("[data-cp]").forEach(b=>b.onclick=()=>copyText(b.dataset.cp));
  tagLongPress(mb); LP_MODAL=id=>{ closeModal(); editVendor(vendor(id)); };
}

PAGES.vendors=(hdr,scr)=>{
  hbar(hdr,"店家聯絡",{back:true});
  dayPills(scr);
  const el=document.createElement("div");
  el.className="pagepad";
  const list=vendorsOf(S.day);
  const warns=VENDORS.filter(v=>v.warn);
  const done=VENDORS.filter(v=>(S.vconf[v.id]||{}).ok).length;

  el.innerHTML=`
  <p class="vs">資料來源為 2026/09/01 網路公開查詢，OP 手上另有實際訂位窗口。<b>出團前逐一致電確認</b>，確認完按右上角打勾記錄。</p>

  <h3 class="sect">須優先釐清（${warns.length}）</h3>
  <div class="card" style="border-color:#F5DFA0;background:#FFF8E6;padding:12px 14px">
    ${warns.map((v,i)=>`<div class="wline" data-jump="${v.id}">
      <span class="wno">${i+1}</span>
      <span class="wtx"><b>${esc(v.name)}</b>　${esc(v.warn)}</span></div>`).join("")}
  </div>

  <h3 class="sect">第 ${S.day} 天 · ${TOUR.dates[S.day-1]}（${list.length} 家）</h3>
  <div class="vlist">${list.map(vendorCard).join("")}</div>

  <h3 class="sect">尚未查得</h3>
  <div class="card">${ebtn("__todo")}
    ${VENDOR_TODO.map(([n,d])=>`<div class="vrow" style="align-items:flex-start">
      <span class="vk" style="min-width:74px;color:var(--ink);font-weight:700">${esc(n)}</span>
      <span class="vv" style="color:var(--ink2)">${esc(d)}</span></div>`).join("")}
  </div>
  <div class="endmark">全團共 ${VENDORS.length} 家店家，已確認 ${done} 家</div>`;

  el.querySelectorAll("[data-ck]").forEach(b=>b.onclick=()=>{ toggleVconf(b.dataset.ck); render(); });
  el.querySelectorAll("[data-cp]").forEach(b=>b.onclick=()=>copyText(b.dataset.cp));
  el.querySelectorAll("[data-jump]").forEach(w=>w.onclick=()=>{
    const v=vendor(w.dataset.jump);
    if(!v) return;
    if(!v.days.includes(S.day)){ S.day=v.days[0]; save(); render(); }
    setTimeout(()=>{
      const t=document.querySelector(`.vcard[data-v="${v.id}"]`);
      if(t){ t.scrollIntoView({behavior:"smooth",block:"center"}); t.classList.add("flash"); setTimeout(()=>t.classList.remove("flash"),1200); }
    },60);
  });
  editBar(el,{add:()=>editVendor(null),addLabel:"新增店家"});
  EDIT_HANDLER=k=>{
    if(k==="__todo"){
      editForm("尚未查得",[{k:"_l",label:"清單",type:"lines",rows:4,hint:"每行：名稱｜說明"}],
        {_l:VENDOR_TODO.map(([n,d])=>n+"｜"+d)},
        {onSave:o=>{ S.data.vendorTodo=o._l.map(l=>{ const [n,...r]=l.split("｜"); return [n.trim(),r.join("｜").trim()]; }); dataChanged("已儲存"); }});
    } else editVendor(vendor(k));
  };
  scr.appendChild(el);
};
function editVendor(v){
  editForm(v?`編輯 · ${v.name}`:"新增店家", VENDOR_FIELDS, v||{days:[S.day],slots:[],tel:[]}, {
    onSave:o=>{ if(!v){ o.id=newId("v_"); VENDORS.push(o); } else Object.assign(v,o); dataChanged("已儲存"); },
    onDelete:v?()=>{ S.data.vendors=VENDORS.filter(x=>x!==v); dataChanged("已刪除"); }:null,
  });
}

/* ---------- 預算表 ---------- */
function fmtNT(n){ return "NT$"+Math.round(n).toLocaleString("en-US"); }
/* 同一張單（grp）合成一張卡；沒 grp 的自己一張。實際金額以卡片 key 記在 S.budgetFinal */
function budgetCards(){
  const cards=[], byKey={};
  BUDGET_ITEMS.forEach(b=>{
    const key=b.grp||b.id;
    let c=byKey[key];
    if(!c){ c=byKey[key]={ key, day:+b.day||1, t:b.t||"", cat:b.cat, slot:b.slot||"", vendor:b.vendor||"", pay:b.pay||"現金", lines:[], budget:0, dep:0, notes:[] }; cards.push(c); }
    c.lines.push(b); c.budget+=(+b.price||0)*(+b.qty||0); c.dep+=(+b.dep||0); if(b.note) c.notes.push(b.note);
  });
  cards.sort((a,b)=>a.day-b.day||(a.t?String(a.t):"99").localeCompare(b.t?String(b.t):"99"));   /* 沒時間的雜支排在當天最後 */
  return cards;
}
/* 已付訂金：領隊在表上改過就用改過的，否則用 Budget 表帶的（公司行前已付） */
function cardDep(c){ return +c.dep||0; }   /* 已付訂金＝公司行前付的，表上鎖住 */
function budgetTotals(){
  let cash=0, cashFinal=0, recorded=0, cashCards=0, depTotal=0, transfer=0, card=0, variance=0;
  budgetCards().forEach(c=>{
    if(c.pay==="現金"){ const dep=cardDep(c), rem=c.budget-dep; depTotal+=dep; cash+=rem; if(rem>0) cashCards++;
      const f=S.budgetFinal[c.key]; if(f!=null&&rem>0){ cashFinal+=f; recorded++; variance+=f-rem; } }
    else if(c.pay==="信用卡") card++;
    else transfer+=c.budget;
  });
  return { cash, cashFinal, recorded, cashCards, depTotal, transfer, card, variance };
}
function refreshBudgetSummary(){
  const t=budgetTotals();
  const box=document.getElementById("bgSummary");
  if(!box) return;
  const set=(id,v)=>{ const e=document.getElementById(id); if(e) e.textContent=v; };
  set("bgCash",fmtNT(t.cash)); set("bgDep",fmtNT(t.depTotal)); set("bgCash2",Math.round(t.cash).toLocaleString("en-US")); set("bgFinal2",Math.round(t.cashFinal).toLocaleString("en-US"));
  box.querySelector("#bgFinal").textContent=fmtNT(t.cashFinal);
  const vEl=box.querySelector("#bgVariance");
  vEl.textContent=(t.variance>0?"＋":t.variance<0?"－":"")+fmtNT(Math.abs(t.variance));
  vEl.className="v "+(t.variance>0?"over":t.variance<0?"under":"even");
  box.querySelector("#bgRecorded").textContent=`${t.recorded} / ${t.cashCards} 張已填實付`;
}
const payPill=p=>`<span class="pill ${p==="現金"?"red":p==="信用卡"?"gray":"blue"}">${esc(p)}</span>`;
PAGES.budget=(hdr,scr)=>{
  hbar(hdr,"預算表",{back:true});
  const el=document.createElement("div");
  el.className="pagepad";
  const t=budgetTotals();
  if(!S.budgetNote) S.budgetNote={};
  if(!S.budgetDone) S.budgetDone={};
  const cards=budgetCards();
  const dateOf=d=>{ const m=String(TOUR.dateTxt||"").match(/(\d{4})\/(\d{1,2})\/(\d{1,2})/); if(!m) return `第 ${d} 天`;
    const dt=new Date(+m[1],+m[2]-1,+m[3]+d-1); return `${dt.getFullYear()}${String(dt.getMonth()+1).padStart(2,"0")}${String(dt.getDate()).padStart(2,"0")}`; };
  const nt=n=>Math.round(n).toLocaleString("en-US");
  const tx=(b,f,cls,ph)=>`<input class="bgtx ${cls||""}" data-id="${esc(b.id)}" data-f="${f}" value="${esc(b[f]??"")}" placeholder="${ph||""}">`;
  const num=(b,f,cls)=>`<input class="bgcell ${cls||""}" data-id="${esc(b.id)}" data-f="${f}" inputmode="decimal" value="${+b[f]||""}" placeholder="0">`;
  /* 表格：照公司 Budget 表的欄位；每一格直接改，小計／TOTAL／剩餘／領隊現金即時重算。已付訂金是公司行前付的，鎖住不能改 */
  let rows="";
  [1,2,3].forEach(d=>{
    const cs=cards.filter(c=>c.day===d); if(!cs.length) return;
    const dayRows=cs.reduce((n,c)=>n+c.lines.length,0);
    let first=true;
    cs.forEach(c=>{
      const n=c.lines.length, cash=c.pay==="現金", dep=cardDep(c), rem=c.budget-dep, fin=S.budgetFinal[c.key], paid=cash&&dep>0&&rem<=0, b0=c.lines[0];
      const done=paid||!!S.budgetDone[c.key];
      c.lines.forEach((b,i)=>{
        rows+=`<tr class="${cash?"":"nocash"}${i===0?" cardtop":""}${done?" done":""}" data-key="${esc(c.key)}">`;
        if(first){ rows+=`<td class="date" rowspan="${dayRows}">${dateOf(d)}</td>`; first=false; }
        if(i===0) rows+=`<td class="donecell" rowspan="${n}">${paid?`<span class="pill gray">—</span>`:cash?`<label class="donebox${done?" on":""}"><input type="checkbox" data-key="${esc(c.key)}"${done?" checked":""}><span class="ckbox">${done?"✓":""}</span>完成</label>`:""}</td>`;
        if(i===0) rows+=`<td class="comp" rowspan="${n}"><select class="bgsel" data-key="${esc(c.key)}" data-f="cat">${BUDGET_CATS.map(x=>`<option${x===c.cat?" selected":""}>${x}</option>`).join("")}</select>
            <span class="row2">${tx(b0,"slot","w-slot","餐次")}${tx(b0,"t","w-time","時間")}</span>${tx(b0,"vendor","w-vend","店家／對象")}</td>`;
        rows+=`<td class="det"><span class="detrow">${tx(b,"name","","訂購明細")}<button class="bgdel" data-id="${esc(b.id)}" title="刪除這一列">✕</button></span>${b.note?`<div class="dnote">${esc(b.note)}</div>`:""}${i===n-1?`<button class="bgaddline" data-key="${esc(c.key)}">＋ 加一列</button>`:""}</td>
          <td class="num edit">${num(b,"qty","w-qty")}</td><td class="edit">${tx(b,"unit","w-unit","單位")}</td>
          <td class="num edit">${num(b,"price","w-price")}</td><td class="num" id="sub_${esc(b.id)}">${+b.qty?nt((+b.price||0)*(+b.qty||0)):""}</td>`;
        if(i===0){
          rows+=`<td class="tot" rowspan="${n}"><span class="paylbl">${esc(c.pay)}</span><b id="tot_${esc(c.key)}">NTD ${nt(c.budget)}</b></td>
            <td class="num dep" rowspan="${n}">${cash?(dep?nt(dep):"0"):"—"}</td>
            <td class="num" rowspan="${n}" id="rem_${esc(c.key)}">${cash?nt(rem):"—"}</td>
            <td class="num edit" rowspan="${n}">${paid?`<span class="pill green">公司已付</span>`:cash?`<input class="bgcell fin" data-key="${esc(c.key)}" data-f="fin" inputmode="numeric" value="${fin!=null?fin:""}" placeholder="填實付">`:`<span class="pill gray">${c.pay==="信用卡"?"公司刷卡":"公司轉帳"}</span>`}</td>
            <td class="edit notecell" rowspan="${n}"><textarea class="bgnote2" data-k="${esc(c.key)}" rows="2" placeholder="備註">${esc(S.budgetNote[c.key]||"")}</textarea></td>`;
        }
        rows+=`</tr>`;
      });
    });
  });
  el.innerHTML=`
  <div class="card budgethead">
    <div class="bh1"><span class="pill redln">BOOK01 Budget 表</span><b>${esc(TOUR.code)}</b><span class="bhsub">${esc(TOUR.name)}</span>${ebtn("__head",true)}</div>
    <div class="bh2">
      <span><i>抬頭</i>${esc(TOUR.taxTitle||"—")}</span><span><i>統編</i>${esc(TOUR.taxId||"—")}</span>
      <span><i>印表</i>${esc(TOUR.budgetPrinted||"—")}</span><span><i>TL/TG</i>${esc(TOUR.leader||"")}</span><span><i>分攤</i>${BUDGET_HEADCOUNT} 人</span>
    </div>
  </div>
  <div class="card budgetsum" id="bgSummary">
    <div class="bgstats">
      <div class="st hot"><span class="k">領隊現金 TOTAL</span><b id="bgCash">${fmtNT(t.cash)}</b></div>
      <div class="st"><span class="k">實付合計（已填的）</span><b id="bgFinal">${fmtNT(t.cashFinal)}</b></div>
      <div class="st"><span class="k">差額（已填的）</span><b id="bgVariance" class="v ${t.variance>0?"over":t.variance<0?"under":"even"}">${(t.variance>0?"＋":t.variance<0?"－":"")+fmtNT(Math.abs(t.variance))}</b></div>
    </div>
    <div class="bgfoot">
      <span>飯店、梅園樓、禮盒等 <b>已付訂金 <span id="bgDep">${fmtNT(t.depTotal)}</span></b> 公司行前已付，鎖住不能改；領隊現金＝各單「剩餘金額」加總，格子改了會自動重算</span>
      <span class="pill gray" id="bgRecorded">${t.recorded} / ${t.cashCards} 張已填實付</span>
    </div>
    <div class="bgprog">
      <span class="pill green" id="bgDoneCnt"></span>
      <span class="hint">勾「完成」那張單會反灰鎖住；取消勾選就能再改</span>
      <button class="btn sec" id="bgNext">→ 跳到下一張未完成</button>
    </div>
  </div>
  <div class="card bgtablewrap">
    <div class="bgpaper" id="bgPaper">
    <table class="bgtable">
      <thead><tr><th>日期</th><th>完成</th><th>元件</th><th>訂購明細</th><th>數量</th><th>單位</th><th>項次單價</th><th>小計</th><th>TOTAL</th><th>已付訂金 🔒</th><th>剩餘金額</th><th>實付金額</th><th>備註</th></tr></thead>
      <tbody>${rows}</tbody>
      <tfoot><tr><td colspan="8" class="rep"><b>領隊報告：</b><textarea class="bgreport" id="bgReport" rows="3" placeholder="超支原因、店家未收款、發票缺漏…">${esc(S.budgetReport||"")}</textarea></td>
        <td colspan="5" class="grand"><span>TOTAL：</span><b>現金 <span id="bgCash2">${nt(t.cash)}</span> NTD</b><span class="sub">實付（已填）<span id="bgFinal2">${nt(t.cashFinal)}</span> NTD</span></td></tr></tfoot>
    </table>
    </div>
  </div>
`;
  scr.appendChild(el);

  const item=id=>BUDGET_ITEMS.find(b=>b.id===id);
  const cardOf=key=>budgetCards().find(c=>c.key===key);
  const refreshCard=key=>{ const c=cardOf(key); if(!c) return;
    c.lines.forEach(b=>{ const sc=el.querySelector(`#sub_${CSS.escape(b.id)}`); if(sc) sc.textContent=+b.qty?nt((+b.price||0)*(+b.qty||0)):""; });
    const tot=el.querySelector(`#tot_${CSS.escape(key)}`); if(tot) tot.textContent="NTD "+nt(c.budget);
    const rem=el.querySelector(`#rem_${CSS.escape(key)}`); if(rem&&c.pay==="現金") rem.textContent=nt(c.budget-cardDep(c));
    refreshBudgetSummary(); };
  /* 數字格：數量、單價、實付 */
  el.querySelectorAll(".bgcell").forEach(inp=>inp.addEventListener("input",()=>{
    const raw=inp.value.replace(/[^\d.]/g,""), v=raw===""?null:parseFloat(raw);
    if(inp.dataset.f==="fin"){ const k=inp.dataset.key; if(v==null) delete S.budgetFinal[k]; else S.budgetFinal[k]=Math.round(v); refreshBudgetSummary(); }
    else { const b=item(inp.dataset.id); if(!b) return; b[inp.dataset.f]=v==null?0:v; b.budget=(+b.price||0)*(+b.qty||0); refreshCard(inp.closest("tr").dataset.key); }
    save();
  }));
  /* 文字格：明細、備註、單位、店家、時間、餐次（店家／時間／餐次是整張單共用） */
  el.querySelectorAll(".bgtx").forEach(inp=>inp.addEventListener("input",()=>{
    const b=item(inp.dataset.id); if(!b) return; const f=inp.dataset.f, v=inp.value;
    if(f==="vendor"||f==="t"||f==="slot"){ const c=cardOf(inp.closest("tr").dataset.key); (c?c.lines:[b]).forEach(x=>x[f]=v.trim()); }
    else b[f]=f==="note"?v.trim():v;
    save();
  }));
  el.querySelectorAll(".bgtx[data-f=t]").forEach(inp=>inp.addEventListener("change",()=>render()));   /* 時間改了要重排 */
  el.querySelectorAll(".bgsel").forEach(sel=>sel.onchange=()=>{ const c=cardOf(sel.dataset.key); if(c) c.lines.forEach(x=>x.cat=sel.value); save(); });
  el.querySelectorAll(".bgdel").forEach(bt=>bt.onclick=()=>{ const b=item(bt.dataset.id); if(!b) return;
    confirmBox(`刪掉「${b.name||"這一列"}」？`,()=>{ const key=b.grp||b.id; S.data.budget=BUDGET_ITEMS.filter(x=>x!==b); BUDGET_ITEMS=S.data.budget;
      if(!BUDGET_ITEMS.some(x=>(x.grp||x.id)===key)){ delete S.budgetFinal[key]; delete S.budgetNote[key]; } dataChanged("已刪除"); }); });
  el.querySelectorAll(".bgaddline").forEach(bt=>bt.onclick=()=>{ const c=cardOf(bt.dataset.key); if(!c) return;
    c.lines.forEach(x=>{ if(!x.grp) x.grp=c.key; });
    BUDGET_ITEMS.push({ id:newId("k"), day:c.day, t:c.t, cat:c.cat, slot:c.slot, vendor:c.vendor, name:"", price:0, qty:1, unit:c.lines[0].unit||"", pay:c.pay, grp:c.key });
    save(); render(); setTimeout(()=>{ const last=[...document.querySelectorAll(`tr[data-key="${CSS.escape(c.key)}"] .bgtx[data-f=name]`)].pop(); if(last){ last.scrollIntoView({block:"center"}); last.focus(); } },50); });
  el.querySelectorAll(".bgnote2").forEach(ta=>ta.addEventListener("input",()=>{ const v=ta.value.trim(); if(v) S.budgetNote[ta.dataset.k]=v; else delete S.budgetNote[ta.dataset.k]; save(); }));
  /* 完成：那張單反灰鎖住；就地切換，不重畫（免得捲回最上面） */
  const lockRows=(key,on)=>{ el.querySelectorAll(`tr[data-key="${CSS.escape(key)}"]`).forEach(tr=>{ tr.classList.toggle("done",on);
      tr.querySelectorAll(".bgtx,.bgcell,.bgsel,.bgdel,.bgaddline,.bgnote2").forEach(x=>x.disabled=on); }); };
  const doneCount=()=>{ const cs=budgetCards().filter(c=>c.pay==="現金"&&c.budget-cardDep(c)>0); const d=cs.filter(c=>S.budgetDone[c.key]).length;
    const e=el.querySelector("#bgDoneCnt"); if(e){ e.textContent=`已完成 ${d} / ${cs.length} 張`; e.className="pill "+(d===cs.length&&cs.length?"green":"gray"); } };
  el.querySelectorAll(".donebox input").forEach(ck=>ck.onchange=()=>{ const k=ck.dataset.key, on=ck.checked;
    if(on) S.budgetDone[k]=Date.now(); else delete S.budgetDone[k];
    ck.parentElement.classList.toggle("on",on); ck.parentElement.querySelector(".ckbox").textContent=on?"✓":""; lockRows(k,on); doneCount(); save(); });
  el.querySelectorAll("tr.done").forEach(tr=>tr.querySelectorAll(".bgtx,.bgcell,.bgsel,.bgdel,.bgaddline,.bgnote2").forEach(x=>x.disabled=true));
  doneCount();
  el.querySelector("#bgNext").onclick=()=>{ const tr=el.querySelector("tr.cardtop:not(.done)"); if(!tr){ toast("全部都完成了"); return; }
    tr.scrollIntoView({block:"center",behavior:"smooth"}); const key=tr.dataset.key; el.querySelectorAll(`tr[data-key="${CSS.escape(key)}"]`).forEach(x=>{ x.classList.add("flash"); setTimeout(()=>x.classList.remove("flash"),1600); }); };
  el.querySelector("#bgReport").onchange=e=>{ S.budgetReport=e.target.value; save(); toast("領隊報告已存"); };
  editBar(el,{add:()=>editBudget(null),addLabel:"新增項目"});
  el.querySelector(".editbar .ebl").textContent="表上的格子直接改；每張單最後一列有「＋ 加一列」";
  EDIT_HANDLER=k=>{
    if(k==="__head") editForm("Budget 表抬頭",[{k:"code",label:"團號"},{k:"taxTitle",label:"發票抬頭"},{k:"taxId",label:"統一編號"},{k:"budgetPrinted",label:"印表日期"},{k:"headcount",label:"分攤人數",type:"number",required:true}],
      Object.assign({},TOUR,{headcount:BUDGET_HEADCOUNT}),
      {onSave:o=>{ S.data.headcount=Math.max(1,Math.round(+o.headcount||1)); delete o.headcount; Object.assign(TOUR,o); dataChanged("已儲存"); }});
  };
};
/* 新增一張單：只問必要的欄位；其他都在表上直接改 */
function editBudget(b){
  editForm("新增預算項目", [
    {k:"day",label:"第幾天",type:"select",opts:[[1,"第 1 天"],[2,"第 2 天"],[3,"第 3 天"]]},{k:"t",label:"時間",ph:"13:20"},
    {k:"cat",label:"元件",type:"select",opts:BUDGET_CATS},{k:"vendor",label:"店家／對象",required:true},
    {k:"name",label:"訂購明細",required:true},{k:"qty",label:"數量",type:"number"},{k:"unit",label:"單位",ph:"人／台／間／桌"},{k:"price",label:"單價",type:"number"},
  ], b||{day:S.day,cat:"餐廳",price:0,qty:21,unit:"人"}, {
    onSave:o=>{ o.day=+o.day||1; o.pay="現金"; o.id=newId("k"); o.budget=(+o.price||0)*(+o.qty||0); BUDGET_ITEMS.push(o); dataChanged("已新增"); },
  });
}

/* Budget 手寫模式已拿掉（S.budgetInk 舊資料保留不動） */

/* ---------- 手寫備註：Apple Pencil 直接寫，存成圖片在 IndexedDB（files 表，cat:"ink"） ---------- */
PAGES.ink=(hdr,scr)=>{
  hbar(hdr,"手寫備註",{back:true});
  const el=document.createElement("div");
  el.className="pagepad";
  el.innerHTML=`<p class="vs">用 Apple Pencil 或手指在畫布上寫，存起來就是一張圖，離線也在；每晚「完整備份」會一起帶走。</p>
    <button class="btn pri" id="inkNew" style="margin-bottom:12px">${ic("pen",16)} 新的手寫備註</button>
    <div id="inkList">讀取中…</div>`;
  scr.appendChild(el);
  el.querySelector("#inkNew").onclick=()=>openInk(null);
  idbAll("files").then(files=>{
    const box=el.querySelector("#inkList"); box.innerHTML="";
    const items=files.filter(f=>f.cat==="ink").sort((a,b)=>b.ts-a.ts);
    if(!items.length){ box.innerHTML=`<div class="docrow placeholder"><div class="fic2 other">${ic("pen",18)}</div><div class="meta"><div class="fn">還沒有手寫備註</div><div class="fs">按上面的按鈕開始寫</div></div></div>`; return; }
    items.forEach(f=>{
      const url=URL.createObjectURL(f.blob);
      const r=document.createElement("div"); r.className="inkcard";
      r.innerHTML=`<img src="${url}" alt=""><div class="meta"><div class="fn">${esc(f.name)}</div><div class="fs">${f.day?`第 ${f.day} 天 · `:""}${new Date(f.ts).toLocaleString("zh-TW",{month:"numeric",day:"numeric",hour:"2-digit",minute:"2-digit"})}</div></div>
        <div class="acts"><button class="btn sec" data-a="edit">續寫</button><button class="btn ghost" data-a="del">刪除</button></div>`;
      r.querySelector("img").onclick=()=>openModal(f.name,`<img src="${url}" style="max-width:100%;border-radius:12px;display:block;background:#fff">`,[["續寫","pri",()=>{ closeModal(); openInk(f); }],["關閉","sec",closeModal]]);
      r.querySelector('[data-a="edit"]').onclick=()=>openInk(f);
      r.querySelector('[data-a="del"]').onclick=()=>confirmBox(`刪除「${f.name}」？`,async()=>{ await idbDel("files",f.id); render(); });
      box.appendChild(r);
    });
  });
};
function openInk(rec){
  const d=new Date(), p2=n=>String(n).padStart(2,"0");
  const title = rec ? rec.name : `手寫 ${d.getMonth()+1}/${d.getDate()} ${p2(d.getHours())}:${p2(d.getMinutes())}`;
  openModal(rec?"續寫手寫備註":"新的手寫備註",`
    <input type="text" id="inkTitle" class="inktitle" value="${esc(title)}" placeholder="標題">
    <div class="inkwrap"><canvas id="inkCv"></canvas></div>
    <div class="pens">
      <div class="pen on" data-c="#1C1C1E" style="background:#1C1C1E"></div>
      <div class="pen" data-c="#C8102E" style="background:#C8102E"></div>
      <div class="pen" data-c="#2563EB" style="background:#2563EB"></div>
      <div class="pen" data-c="#1E9E4A" style="background:#1E9E4A"></div>
      <button class="btn sec" id="inkEraser">橡皮擦</button>
      <button class="btn sec" id="inkUndo">↩︎ 復原</button>
      <button class="btn sec" id="inkClear">清空</button>
      <span style="font-size:12px;color:#8E8E93;margin-left:auto">Apple Pencil 寫字時手掌可以靠在螢幕上</span>
    </div>`,
    [["儲存","pri",async()=>{
      const cv=$("#inkCv"), name=($("#inkTitle").value.trim()||title);
      const blob=await new Promise(r=>cv.toBlob(r,"image/png"));
      const id=rec?rec.id:"ink"+Date.now()+Math.random().toString(36).slice(2,5);
      if(!await idbPutOrWarn("files",{ id, name, type:"image/png", size:blob.size, cat:"ink", blob, ts:Date.now(), day:S.day },"手寫備註")) return;
      closeModal(); render(); toast("手寫備註已存");
    }],["取消","sec",closeModal]]);
  $("#mbox").classList.add("wide");
  const cv=$("#inkCv"), ctx=cv.getContext("2d"), wrap=cv.parentElement;
  const dpr=Math.min(2,window.devicePixelRatio||1);
  const cssW=wrap.clientWidth, cssH=Math.max(360,Math.min(620,Math.round(window.innerHeight*0.58)));
  cv.width=Math.round(cssW*dpr); cv.height=Math.round(cssH*dpr); cv.style.height=cssH+"px";
  const strokes=[]; let cur=null, color="#1C1C1E", eraser=false, penActive=false, bg=null;
  const paper=()=>{ ctx.setTransform(dpr,0,0,dpr,0,0); ctx.fillStyle="#fff"; ctx.fillRect(0,0,cssW,cssH);
    ctx.strokeStyle="#EEF0F4"; ctx.lineWidth=1; for(let y=40;y<cssH;y+=36){ ctx.beginPath(); ctx.moveTo(16,y); ctx.lineTo(cssW-16,y); ctx.stroke(); }
    if(bg) ctx.drawImage(bg,0,0,cssW,cssH); };
  const redraw=()=>{ paper(); ctx.lineCap="round"; ctx.lineJoin="round";
    for(const st of strokes){
      ctx.globalCompositeOperation=st.erase?"destination-out":"source-over"; ctx.strokeStyle=st.c;
      for(let i=1;i<st.pts.length;i++){ const a=st.pts[i-1], b=st.pts[i]; ctx.lineWidth=st.erase?22:st.w*(0.55+b.p); ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke(); }
      if(st.pts.length===1){ const a=st.pts[0]; ctx.beginPath(); ctx.arc(a.x,a.y,(st.erase?11:st.w*0.6),0,Math.PI*2); ctx.fillStyle=st.c; ctx.fill(); }
    }
    ctx.globalCompositeOperation="source-over"; };
  if(rec){ bg=new Image(); bg.onload=()=>redraw(); bg.src=URL.createObjectURL(rec.blob); } else paper();
  const pos=e=>{ const r=cv.getBoundingClientRect(); return {x:(e.clientX-r.left)*cssW/r.width, y:(e.clientY-r.top)*cssH/r.height, p:e.pointerType==="pen"?Math.max(0.15,e.pressure||0.5):0.5}; };
  cv.addEventListener("pointerdown",e=>{
    if(e.pointerType==="pen") penActive=true;
    if(e.pointerType==="touch"&&penActive) return;        /* 手掌靠在螢幕上不畫線 */
    e.preventDefault(); cv.setPointerCapture(e.pointerId);
    cur={c:color,w:e.pointerType==="pen"?3.2:4,erase:eraser,pts:[pos(e)],id:e.pointerId}; strokes.push(cur); redraw();
  });
  cv.addEventListener("pointermove",e=>{ if(!cur||cur.id!==e.pointerId) return; const evs=e.getCoalescedEvents?e.getCoalescedEvents():[e]; evs.forEach(x=>cur.pts.push(pos(x))); redraw(); });
  const end=e=>{ if(cur&&cur.id===e.pointerId) cur=null; };
  cv.addEventListener("pointerup",end); cv.addEventListener("pointercancel",end);
  $("#mbox").querySelectorAll(".pen").forEach(pn=>pn.onclick=()=>{ color=pn.dataset.c; eraser=false; $("#inkEraser").classList.remove("on"); $("#mbox").querySelectorAll(".pen").forEach(x=>x.classList.toggle("on",x===pn)); });
  $("#inkEraser").onclick=()=>{ eraser=!eraser; $("#inkEraser").classList.toggle("on",eraser); $("#mbox").querySelectorAll(".pen").forEach(x=>x.classList.toggle("on",!eraser&&x.dataset.c===color)); };
  $("#inkUndo").onclick=()=>{ strokes.pop(); redraw(); };
  $("#inkClear").onclick=()=>confirmBox("清空這張畫布？",()=>{ strokes.length=0; bg=null; redraw(); });
}

const LUG_OPEN=new Set();
let LUG_FOCUS=null;   /* 展開後待聚焦的對象（列是非同步渲染，用旗標處理） */
PAGES.luggage=(hdr,scr)=>{
  hbar(hdr,"行李點收",{back:true});
  EDIT_HANDLER=k=>{ if(k==="route") editForm("本日行李路線",[{k:"r",label:"路線與分工",type:"textarea",rows:4}],{r:LUGGAGE_ROUTE[S.day]||""},
    {onSave:o=>{ LUGGAGE_ROUTE[S.day]=o.r; dataChanged("已儲存"); }}); };
  dayPills(scr);
  const el=document.createElement("div");
  el.className="pagepad";
  el.innerHTML=`<div class="card" style="border-color:#CFE3FB;background:#F0F6FF">
    <div style="font-weight:800;font-size:13px;margin-bottom:5px;display:flex;align-items:center;gap:6px">${ic("lug",15)} 第 ${S.day} 天 行李車路線</div>
    <div style="font-size:12.5px;line-height:1.7;display:flex;gap:8px;align-items:flex-start"><span style="flex:1">${esc(LUGGAGE_ROUTE[S.day]||"")}</span>${ebtn("route",true)}</div>
  </div>
  <p class="vs">逐件拍照綁定貴賓、記錄件數；裝車或錄放行李時勾選核對。行李服務每件 $50／單趟。</p>
  <div id="lugList">讀取中…</div>`;
  scr.appendChild(el);
  idbAll("photos").then(photos=>{
    const box=el.querySelector("#lugList");
    box.innerHTML="";
    const act=GUESTS().filter(p=>p.days.includes(S.day));
    const tot=act.reduce((s,p)=>s+((S.lug[p.id]||{}).count||0),0);
    const head=document.createElement("div");
    head.className="card";
    head.innerHTML=`<b style="font-size:14px">第 ${S.day} 天行李合計：${tot} 件</b>`;
    box.appendChild(head);
    act.forEach(p=>{
      const lg=S.lug[p.id]||(S.lug[p.id]={count:0,checks:{}});
      const ck=!!lg.checks[S.day];
      const ph=photos.filter(x=>x.pax===p.id);
      const r=document.createElement("div");
      r.className="lugrow";
      /* 備註欄：每位都可展開，但不預先全部展開（避免 22 個輸入框佔滿畫面）
       * 拍照或已填內容 → 自動展開且不可收起；手動展開且尚無內容 → 可收起 */
      const pinned  = ph.length>0 || !!lg.note;
      const showNote = pinned || LUG_OPEN.has(p.id);
      r.innerHTML=`<span class="nm">${esc(p.name)}</span>
        <div class="stepper"><button data-a="-">−</button><span class="v">${lg.count}</span><button data-a="+">＋</button></div>
        <span style="font-size:11.5px;color:#8E8E93">件</span>
        <label class="camlbl" style="padding:7px 11px">📷 拍照<input type="file" accept="image/*" capture="environment"></label>
        <div class="thumbs">${ph.map(x=>`<img data-id="${x.id}" alt="">`).join("")}</div>
        ${showNote?"":`<button class="notebtn" data-act="open">✎ 備註</button>`}
        <span style="flex:1"></span>
        <div class="lugck${ck?" on":""}"><span class="ckbox">${ck?"✓":""}</span>已裝車</div>
        ${showNote?`<div class="lugnotewrap">
          <label>行李備註</label>
          <input class="lugnote" placeholder="例：黑色 29 吋 × 1、手提袋 × 1；把手有破損" value="${esc(lg.note||"")}">
          ${pinned?"":`<button class="notebtn ghost" data-act="close">收起</button>`}
        </div>`:""}`;
      r.querySelectorAll(".notebtn").forEach(b=>b.onclick=()=>{
        if(b.dataset.act==="open"){ LUG_OPEN.add(p.id); LUG_FOCUS=p.id; }
        else { LUG_OPEN.delete(p.id); LUG_FOCUS=null; }
        render();
      });
      r.querySelectorAll(".stepper button").forEach(b=>b.onclick=()=>{
        lg.count=Math.max(0,lg.count+(b.dataset.a==="+"?1:-1)); save(); render();
      });
      const noteInp=r.querySelector(".lugnote");
      if(noteInp && LUG_FOCUS===p.id){
        LUG_FOCUS=null;
        requestAnimationFrame(()=>{ try{ noteInp.focus(); }catch(e){} });
      }
      if(noteInp){
        noteInp.onchange=()=>{ lg.note=noteInp.value.trim(); save(); toast(`${p.name} 行李備註已存`); };
        noteInp.onkeydown=e=>{ if(e.key==="Enter") noteInp.blur(); };
      }
      r.querySelector("input[type=file]").onchange=async e=>{
        const file=e.target.files[0]; if(!file) return;
        if(!await idbPutOrWarn("photos",{id:"ph"+Date.now(),pax:p.id,blob:file,ts:Date.now()},"行李照片")) return;
        lg.count=Math.max(lg.count,1); save(); render(); toast(`${p.name} 行李照片已存，可填備註`);
      };
      r.querySelectorAll(".thumbs img").forEach(imEl=>{
        const rec2=ph.find(x=>x.id===imEl.dataset.id);
        const u=URL.createObjectURL(rec2.blob); imEl.src=u;
        imEl.onclick=()=>openModal(`${p.name} · 行李照片`,`<img src="${u}" style="max-width:100%;border-radius:12px">`,
          [["刪除照片","ghost",async()=>{ await idbDel("photos",rec2.id); closeModal(); render(); }],["關閉","sec",closeModal]]);
      });
      r.querySelector(".lugck").onclick=()=>{ lg.checks[S.day]=!ck; save(); render(); };
      box.appendChild(r);
    });
  });
};

/* ---------- 分房表 ---------- */
/* 分房總表「BY 人」：照公司 Excel 分房表的排法——名義／序／姓名／關係／英文／分房／房號／床型／房型／備註，
 * 同房的人房號欄合併；順序照名單（董事 → 主管 → 合作夥伴 → 工作人員） */
function roomsByPersonTable(N){
  const norm=x=>String(x||"").replace(/\s/g,"");
  const bedOf=t=>{ const m=String(t||"").match(/\b(DBLB|TWIN|SGLB)\b/); return m?m[1]:""; };
  const typeOf=t=>String(t||"").replace(/\s*\b(DBLB|TWIN|SGLB)\b\s*/,"").trim();
  const grpName=p=>p.group==="貴賓"?(p.id==="p23"?"合作夥伴":"2731"):p.group;
  const ORDER={"貴賓":0,"雄獅主管":1,"工作人員":3};
  const people=[...PAX].sort((a,b)=>(a.id==="p23"?2:ORDER[a.group]??9)-(b.id==="p23"?2:ORDER[b.group]??9));
  const roomOf=p=>N.rooms.find(r=>(r.who||[]).some(w=>norm(w)===norm(p.name)||norm(w).startsWith(norm(p.name))));
  const done=new Set(), rows=[], counters={};
  let seq=0;
  people.forEach(p=>{
    const r=roomOf(p), g=grpName(p);
    if(r && done.has(r)) return;
    if(r){ done.add(r);
      const occ=people.filter(q=>roomOf(q)===r);
      const ck=g==="合作夥伴"?"雄獅主管":g; counters[ck]=(counters[ck]||0)+1;
      occ.forEach((q,i)=>rows.push({p:q,g,seq:++seq,r,first:i===0,span:occ.length,no:counters[ck]}));
    } else rows.push({p,g,seq:++seq,r:null,first:true,span:1,no:""});
  });
  const cls=g=>g==="2731"?"g-vip":g==="雄獅主管"?"g-mgr":g==="合作夥伴"?"g-pt":"g-stf";
  return `<table class="rtable byp"><thead><tr><th>名義</th><th>序</th><th>姓名</th><th>關係</th><th>英文</th><th>分房</th><th>房號</th><th>床型</th><th>房型</th><th>備註</th></tr></thead><tbody>
    ${rows.map(x=>{ const bed=x.r?bedOf(x.r.type):"", note=x.r?(x.r.note||""):(x.p.days&&x.p.days.length===3?"":x.p.days.map(d=>"9/2"+(d-1)).join("–"));
      return `<tr class="${cls(x.g)}${x.r?"":" dim"}">
        <td class="gm">${esc(x.g)}</td><td class="sq">${x.seq}</td><td class="nm">${esc(x.p.name)}</td><td class="rl">${esc(x.p.rel||"")}</td><td class="en">${esc(x.p.en||"")}</td>
        ${x.first?`<td class="no" rowspan="${x.span}">${x.no}</td><td class="no" rowspan="${x.span}">${x.r?esc(x.r.no):"—"}</td>
          <td class="bed${bed==="TWIN"?" twin":""}" rowspan="${x.span}">${bed}</td><td class="tp" rowspan="${x.span}">${x.r?esc(typeOf(x.r.type)):""}</td>
          <td class="nt" rowspan="${x.span}">${esc(note)}</td>`:""}
      </tr>`; }).join("")}
  </tbody></table>`;
}
PAGES.rooms=(hdr,scr)=>{
  hbar(hdr,"分房表",{back:true});
  const night=S.night||1;
  const tb=document.createElement("div");
  tb.className="tabbar";
  tb.innerHTML=NIGHTS.map(n=>`<button class="tab${night===n.key?" on":""}" data-n="${n.key}">${esc(n.date)} ${esc(n.hotel.slice(0,6))}…</button>`).join("");
  tb.querySelectorAll(".tab").forEach(t=>t.onclick=()=>{ S.night=+t.dataset.n; save(); render(); });
  scr.appendChild(tb);
  const N=NIGHTS.find(n=>n.key===night)||NIGHTS[0];
  const PLANS={1:{6:"d1_6f",7:"d1_7f",8:"d1_8f",9:"d1_9f"},2:{6:"d2_6f"}};
  const planOf=f=>(typeof FLOOR_IMG!=="undefined")&&PLANS[N.key]&&PLANS[N.key][f]&&FLOOR_IMG[PLANS[N.key][f]]||"";
  /* 樓層：seed 有 floor；使用者自己加的房用房號第 2 碼推（1922→9F、0601→6F） */
  const floorOf=r=>{ if(r.floor) return r.floor; const no=String(r.no||""); return /^\d{3,4}$/.test(no)?+no[no.length-3]:0; };
  const rooms=N.rooms.map((r,i)=>({r,i,f:floorOf(r)}));
  const floors=[...new Set(rooms.map(x=>x.f).filter(Boolean))].sort((a,b)=>a-b);
  const other=rooms.filter(x=>!x.f);
  if(!S.floor) S.floor={};
  const view=S.roomView==="floor"?"floor":"person";   /* 預設 BY 人 */
  const want=S.floor[N.key], curF=(want==="other"&&other.length)?"other":(floors.includes(want)?want:(floors[0]||"other"));
  const isSuite=t=>(t||"").includes("套")||(t||"").includes("豪華");
  const card=({r,i})=>`<div class="roomcard">${ebtn(String(i))}<div class="no">${esc(r.no)}</div>
      <div class="tp"><span class="pill ${isSuite(r.type)?"redln":"gray"}">${esc(r.type)}</span>${r.note?`<span class="pill amber">${esc(r.note)}</span>`:""}</div>
      <div class="gs">${(r.who||[]).map(esc).join("、")||"<span style='color:var(--ink3)'>—</span>"}</div></div>`;
  const el=document.createElement("div");
  el.className="pagepad";
  el.innerHTML=`<div class="vs" style="display:flex;gap:8px;align-items:center;flex-wrap:wrap"><b style="flex:1">${esc(N.date)}｜${esc(N.hotel)}</b>
    ${N.vendor&&vendor(N.vendor)?`<button class="chip" data-vm="${esc(N.vendor)}">${ic("phone",13)}飯店聯絡</button>`:""}${ebtn("__night",true)}</div>
  ${N.info?`<div class="card" style="font-size:12.5px;line-height:1.7;color:var(--ink2)"><b style="color:var(--ink)">房型</b>　${esc(N.info)}</div>`:""}
  <div class="card rtablewrap">
    <div class="cardh" style="flex-wrap:wrap">分房總表 <span class="pill gray">${N.rooms.reduce((n,r)=>n+(r.who||[]).length,0)} 人・${N.rooms.filter(r=>(r.who||[]).length).length} 間</span>
      <span class="viewtabs"><button class="tab${view==="person"?" on":""}" data-rv="person">BY 人（Excel）</button><button class="tab${view==="floor"?" on":""}" data-rv="floor">BY 樓層</button></span></div>
    ${view==="floor"?`<table class="rtable"><thead><tr><th>樓層</th><th>房號</th><th>房型</th><th>入住</th><th>備註</th></tr></thead><tbody>
      ${rooms.slice().sort((a,b)=>(a.f||99)-(b.f||99)||String(a.r.no).localeCompare(String(b.r.no))).map(({r,f})=>`<tr class="${(r.who||[]).length?"":"dim"}">
        <td class="fl">${f?f+"F":"—"}</td><td class="no">${esc(r.no)}</td><td class="tp">${esc(r.type||"")}</td>
        <td class="who">${(r.who||[]).map(esc).join("、")||"—"}</td><td class="nt">${esc(r.note||"")}</td></tr>`).join("")}
    </tbody></table>`:roomsByPersonTable(N)}
  </div>
  <p class="vs">發放房卡時照表引導；魏董伉儷、柳董 9/21 提前返北，第二晚無房。異動請用「手寫備註」記下。</p>
  <div class="floorjump" id="floorJump">${floors.map(f=>`<button class="tab${curF===f?" on":""}" data-jf="${f}">${f}F</button>`).join("")}${other.length?`<button class="tab${curF==="other"?" on":""}" data-jf="other">其他</button>`:""}</div>
  ${curF==="other"?`<h3 class="sect">其他 <span class="efhint">工作人員・外宿</span></h3><div class="roomgrid">${other.map(card).join("")}</div>`:(()=>{
    const f=curF, list=rooms.filter(x=>x.f===f), img=planOf(f);
    return `<h3 class="sect">${f}F <span class="efhint">${list.filter(x=>(x.r.who||[]).length).length} 間・${list.reduce((n,x)=>n+(x.r.who||[]).length,0)} 人</span></h3>
    <div class="floorsec${img?"":" noplan"}">
      ${img?`<div class="card floorwrap"><div class="zw" data-title="${esc(N.hotel)} ${f}F 平面圖"><img class="zin" src="${img}" alt="${f}F 平面圖"></div><div class="zoomhint">產品部 9/16 原圖・兩指縮放、拖曳；＋－回 1:1</div></div>`:""}
      <div class="roomgrid floorrooms">${list.map(card).join("")}</div>
    </div>`; })()}`;
  el.querySelectorAll("[data-vm]").forEach(b=>b.onclick=()=>openVendorModal(b.dataset.vm));
  el.querySelectorAll("[data-rv]").forEach(b=>b.onclick=()=>{ S.roomView=b.dataset.rv; save(); render(); });
  el.querySelectorAll(".floorwrap .zw").forEach(zw=>{
    const fl=floors.filter(f=>planOf(f)); zw._slides=()=>fl.map(f=>({ title:`${N.hotel} ${f}F 平面圖`, render:()=>{ const im=new Image(); im.src=planOf(f); return im; } })); zw._slideIdx=Math.max(0,fl.indexOf(curF));
    zoomify(zw); });
  /* 樓層分頁：切換只顯示該層 */
  el.querySelectorAll("#floorJump [data-jf]").forEach(b=>b.onclick=()=>{ const v=b.dataset.jf; S.floor[N.key]=v==="other"?"other":+v; save(); render();
    requestAnimationFrame(()=>{ const j=$("#floorJump"); if(j) j.scrollIntoView({block:"start"}); }); });
  editBar(el,{add:()=>editRoom(N,null),addLabel:"新增房間"});
  EDIT_HANDLER=k=>{
    if(k==="__night") editForm("飯店資料",[{k:"date",label:"日期",ph:"9/20(日)"},{k:"hotel",label:"飯店",required:true},{k:"info",label:"房型說明",type:"textarea",rows:2},
      {k:"vendor",label:"對應店家（飯店聯絡鍵）",type:"select",opts:[["","（無）"]].concat(VENDORS.map(v=>[v.id,v.name]))}],N,{onSave:o=>{ Object.assign(N,o); dataChanged("已儲存"); }});
    else editRoom(N,+k);
  };
  scr.appendChild(el);
};
function editRoom(N,i){
  const r=i==null?null:N.rooms[i];
  editForm(r?`編輯 · ${r.no}`:"新增房間", ROOM_FIELDS, r||{who:[]}, {
    onSave:o=>{ if(r) Object.assign(r,o); else N.rooms.push(o); dataChanged("已儲存"); },
    onDelete:r?()=>{ N.rooms.splice(i,1); dataChanged("已刪除"); }:null,
  });
}
/* ============================================================ 分桌（每家餐廳各自一份）
 * S.seating[mealId] = { tables:[ { name, seats:[pid|null,...] } ] }；沒有自訂就用 PAX 的 table 欄位當預設。
 * 位子可異動：長按名字 → 抬起 → 拖到別的位子（互換）、空位（搬過去）、桌子（加入）、未入座區（移出）。 */
/* 9/17 官方座位圖（產品部 PDF）：順時針、從 12 點方向開始；用姓名對到 PAX */
const SEAT_DOC = {
  d1m3:{ note:"合菜分菜・魏董＆魏董夫人備無海鮮套餐・舞台在上方，主要出入口在右下（A、B 桌現場改平行）",
    room:{ w:1000, h:650, marks:[ {type:"bar",x:300,y:28,w:400,h:46,label:"舞台"},
      {type:"arrow",x1:940,y1:585,x2:690,y2:585,label:"主要出入口",lx:815,ly:628} ], tables:[ {t:1,x:250,y:350}, {t:0,x:750,y:350} ] }, tables:[
    { name:"A 桌（11 人）", who:["王文傑","魏寶生","趙秋芬","游慧茹","盧希鵬","邱浩軒","利明献","張郁芬","張振明","陳萱","陳聖德"] },
    { name:"B 桌（10 人）", who:["凌瓏","游張松","王　雍","劉惟珺","鄭兆剛","黃信川","王村煌","王岳聰","陳曉穎","柳婉郁"] } ] },
  d2m3:{ note:"無菜單料理、套餐式，忌食已由冠廷提供餐廳・戴董來、魏董及夫人走・廁所在上方，門在下方（C 桌後）",
    room:{ w:1000, h:800, marks:[ {type:"bar",x:400,y:28,w:200,h:44,label:"廁所"}, {type:"bar",x:110,y:700,w:350,h:40,label:"門"},
      {type:"arrow",x1:345,y1:795,x2:345,y2:702} ], tables:[ {t:1,x:345,y:300}, {t:2,x:345,y:568}, {t:0,x:800,y:440} ] }, tables:[
    { name:"A 桌（10 人・長桌）", shape:"long", dir:"v", split:5, who:["張郁芬","柳婉郁","黃信川","盧希鵬","游慧茹","利明献","g:龔處長","王文傑","魏寶生","趙秋芬"], side:["左排（上→下）","右排（上→下）"] },
    { name:"B 桌（7 人・長桌）",  shape:"long", dir:"h", split:3, who:["游張松","戴啟珩","張振明","王　雍","凌瓏","陳聖德","陳萱"], side:["上排（廁所側）","下排"] },
    { name:"C 桌（6 人・長桌）",  shape:"long", dir:"h", split:3, who:["王村煌","陳曉穎","邱浩軒","王岳聰","鄭兆剛","劉惟珺"], side:["上排","下排（門側）"], door:"下方：門" } ] },
  d2m5:{ note:"套餐式・座位圖 20 人（產品部座位圖未標示門或舞台方位）",
    room:{ w:1000, h:420, tables:[ {t:1,x:250,y:210,R:130}, {t:0,x:750,y:210,R:130} ] }, tables:[
    { name:"A 桌（10 人）", who:["王文傑","利明献","張郁芬","游慧茹","盧希鵬","邱浩軒","劉惟珺","張振明","陳萱","陳聖德"] },
    { name:"B 桌（9 人）",  who:["凌瓏","王　雍","游張松","黃信川","王村煌","戴啟珩","陳曉穎","王岳聰","鄭兆剛"] } ] },
  d3m1:{ note:"大桌 19 人＋小桌 16 人・門在 6 點方向（正門／外場），側門與廁所在左",
    room:{ w:1000, h:800, marks:[ {type:"bar",x:140,y:655,w:330,h:40,label:"門"}, {type:"bar",x:600,y:655,w:330,h:40,label:"門"},
      {type:"arrow",x1:300,y1:748,x2:160,y2:748,color:"#5B8DD6",label:"側門及廁所方向",lx:325,ly:755,anchor:"start"},
      {type:"arrow",x1:640,y1:712,x2:640,y2:788,color:"#5B8DD6",label:"外場及正門出入口",lx:668,ly:757,anchor:"start"} ],
      tables:[ {t:0,x:500,y:370,R:220} ] }, tables:[
    { name:"大桌（19 人）", who:["王文傑","利明献","張郁芬","邱浩軒","黃信川","陳曉穎","王岳聰","王村煌","戴啟珩","凌瓏","陳聖德","陳萱","張振明","劉惟珺","鄭兆剛","游張松","王　雍","游慧茹","盧希鵬"], door:"6 點方向：正門" },
    { name:"小桌（16 人）", who:[], cap:8 } ] },
};
/* 座位值：PAX 的 id，或 "g:姓名"＝名單外的來賓（例：龔處長） */
function seatPerson(v){ if(!v) return null; if(String(v).startsWith("g:")) return {id:v,name:v.slice(2),group:"來賓",guest:true}; return pax(v); }
function defaultSeating(m){
  const day=+String(m.id||"").match(/^d(\d)/)?.[1] || S.day;
  const here=PAX.filter(p=>p.days.includes(day));
  const doc=SEAT_DOC[m.id];
  if(doc){
    const byName=n=>{ if(n.startsWith("g:")) return n; const p=PAX.find(x=>x.name.replace(/\s/g,"")===n.replace(/\s/g,"")); return p?p.id:null; };
    return { note:doc.note, tables:doc.tables.map(t=>{ const ids=t.who.map(byName).filter(Boolean);
      return { name:t.name, door:t.door||"", shape:t.shape||"round", dir:t.dir||"h", split:t.split||0, side:t.side||null,
               seats:ids.concat(Array(Math.max(0,(t.cap||ids.length)-ids.length)).fill(null)) }; }) };
  }
  const t1=here.filter(p=>p.table===1).map(p=>p.id), t2=here.filter(p=>p.table===2).map(p=>p.id);
  const pad=a=>a.concat(Array(Math.max(2, (Math.ceil((a.length+2)/2)*2)-a.length)).fill(null));
  return { tables:[ {name:"第 1 桌（貴賓桌）",seats:pad(t1)}, {name:"第 2 桌（主管桌）",seats:pad(t2)} ] };
}
/* ---- 座位圖共用零件 ---- */
const SEAT_FONT='font-family="PingFang TC,Microsoft JhengHei,system-ui,sans-serif"';
/* 座位圖共用的漸層／陰影／地板紋 */
const SEAT_DEFS=`<defs>
  <radialGradient id="st-tbl" cx="50%" cy="42%" r="60%"><stop offset="0" stop-color="#FFFBF0"/><stop offset=".72" stop-color="#FBEED2"/><stop offset="1" stop-color="#F0DDB4"/></radialGradient>
  <linearGradient id="st-tbl2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFF9EA"/><stop offset="1" stop-color="#F3E1BC"/></linearGradient>
  <linearGradient id="st-stage" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4A4A55"/><stop offset="1" stop-color="#2A2A33"/></linearGradient>
  <linearGradient id="st-door" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E9E9EE"/><stop offset="1" stop-color="#CFCFD6"/></linearGradient>
  <pattern id="st-floor" width="26" height="26" patternUnits="userSpaceOnUse"><circle cx="13" cy="13" r="1.1" fill="#E4DFD3"/></pattern>
  <filter id="st-sh" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="1.5" stdDeviation="1.6" flood-color="#3A2E10" flood-opacity=".18"/></filter>
  <filter id="st-sh2" x="-10%" y="-10%" width="120%" height="140%"><feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#3A2E10" flood-opacity=".16"/></filter>
</defs>`;
/* 跟產品部座位圖不同的位子：{ "桌:位": 原本坐的人 id 或 null }，畫圖時用來標橘框 */
let SEAT_CHG=null;
function seatDiff(m,st){
  const base=defaultSeating(m).tables, out={};
  st.tables.forEach((t,ti)=>{ const d=base[ti]; t.seats.forEach((pid,i)=>{ const o=d?(d.seats[i]||null):null; if((pid||null)!==o) out[ti+":"+i]=o; }); });
  return out;
}
function seatG(pid,ti,i,x,y,r){
  const p=seatPerson(pid), fs=r>=20?11.5:10, chg=!!(SEAT_CHG&&(ti+":"+i) in SEAT_CHG);
  let out=`<g class="sseat${p?"":" empty"}${chg?" chg":""}" data-t="${ti}" data-i="${i}"${p?` data-p="${esc(p.id)}"`:""}>`;
  if(!p) return out+`<circle cx="${x}" cy="${y}" r="${r-1}" fill="${chg?"#FFF4E8":"#FFFFFF"}" fill-opacity=".7" stroke="${chg?"#E07B12":"#CFCAC0"}" stroke-width="${chg?2.5:1.6}" stroke-dasharray="4 3"/>${chg?`<text x="${x}" y="${y+4}" text-anchor="middle" font-size="9" fill="#E07B12" font-weight="800">空</text>`:""}</g>`;
  const g=p.group==="貴賓"?["#FFF8F8","#E89AA6"]:p.group==="雄獅主管"?["#F5F8FF","#9DB8E6"]:p.guest?["#FFFBEA","#DDB65A"]:["#FAFAFB","#C9C9CF"];
  const nm=p.name.replace(/\s/g,"").slice(0,4), two=nm.length>2&&r<22;
  out+=`<circle cx="${x}" cy="${y}" r="${r}" fill="${chg?"#FFF4E8":g[0]}" stroke="${chg?"#E07B12":g[1]}" stroke-width="${chg?3:2.2}" filter="url(#st-sh)"/>`;
  if(two) out+=`<text x="${x}" y="${y-2}" text-anchor="middle" font-size="${fs}" font-weight="800" fill="#2B2B30">${esc(nm.slice(0,2))}</text><text x="${x}" y="${y+fs}" text-anchor="middle" font-size="${fs}" font-weight="800" fill="#2B2B30">${esc(nm.slice(2))}</text>`;
  else out+=`<text x="${x}" y="${y+4}" text-anchor="middle" font-size="${fs}" font-weight="800" fill="#2B2B30">${esc(nm)}</text>`;
  if(chg) out+=`<circle cx="${x+r*0.72}" cy="${y-r*0.72}" r="8.5" fill="#E07B12"/><text x="${x+r*0.72}" y="${y-r*0.72+3.5}" text-anchor="middle" font-size="9.5" font-weight="900" fill="#fff">改</text>`;
  return out+`</g>`;
}
/* 圓桌：seats[0] 在 12 點方向，順時針；跟產品部座位圖同一種畫法。回傳 <g>，給單桌圖跟全景圖共用 */
function roundTableG(t,ti,cx,cy,R){
  const n=t.seats.length, r=Math.max(14,Math.min(24,Math.floor((2*Math.PI*R/Math.max(n,1))/2)-3));
  const TR=R-r-14;
  let out=`<g class="tzone" data-t="${ti}"><circle class="tbl" cx="${cx}" cy="${cy}" r="${TR}" fill="url(#st-tbl)" stroke="#D9B876" stroke-width="2" filter="url(#st-sh2)"/>
    <circle cx="${cx}" cy="${cy}" r="${TR-9}" fill="none" stroke="#E7D3A6" stroke-width="1" stroke-dasharray="3 5"/>
    <text x="${cx}" y="${cy-6}" text-anchor="middle" font-size="${R>180?24:16}" font-weight="900" fill="#6E4A00" letter-spacing="1">${esc(t.name.split("（")[0])}</text>
    <text x="${cx}" y="${cy+(R>180?22:15)}" text-anchor="middle" font-size="${R>180?14:12}" font-weight="600" fill="#A8843A">${t.seats.filter(Boolean).length} 人</text>`;
  t.seats.forEach((pid,i)=>{
    const a=-Math.PI/2 + i*2*Math.PI/n, x=cx+R*Math.cos(a), y=cy+R*Math.sin(a), nx=cx+(R+r+11)*Math.cos(a), ny=cy+(R+r+11)*Math.sin(a);
    out+=`<circle cx="${nx}" cy="${ny}" r="7.5" fill="#EFEBE2"/><text x="${nx}" y="${ny+3}" text-anchor="middle" font-size="8.5" font-weight="800" fill="#8A8478">${i+1}</text>`;
    out+=seatG(pid,ti,i,x,y,r);
  });
  return out+"</g>";
}
/* 長桌：seats 前 split 個在第一側（上排或左排），其餘在第二側；每側由左到右／由上到下 */
function longTableG(t,ti,cx,cy){
  const n=t.seats.length, sp=t.split||Math.ceil(n/2), s1=t.seats.slice(0,sp), s2=t.seats.slice(sp), m=Math.max(s1.length,s2.length,1);
  const vert=t.dir==="v", step=64, r=22, len=m*step+20;
  let out=`<g class="tzone" data-t="${ti}">`;
  if(vert) out+=`<rect class="tbl" x="${cx-28}" y="${cy-len/2}" width="56" height="${len}" rx="10" fill="url(#st-tbl2)" stroke="#D9B876" stroke-width="2" filter="url(#st-sh2)"/>
    <rect x="${cx-20}" y="${cy-len/2+8}" width="40" height="${len-16}" rx="6" fill="none" stroke="#E7D3A6" stroke-width="1" stroke-dasharray="3 5"/>
    <text x="${cx}" y="${cy+5}" text-anchor="middle" font-size="16" font-weight="900" fill="#6E4A00" letter-spacing="1" transform="rotate(-90 ${cx} ${cy})">${esc(t.name.split("（")[0])}</text>`;
  else out+=`<rect class="tbl" x="${cx-len/2}" y="${cy-28}" width="${len}" height="56" rx="10" fill="url(#st-tbl2)" stroke="#D9B876" stroke-width="2" filter="url(#st-sh2)"/>
    <rect x="${cx-len/2+8}" y="${cy-20}" width="${len-16}" height="40" rx="6" fill="none" stroke="#E7D3A6" stroke-width="1" stroke-dasharray="3 5"/>
    <text x="${cx}" y="${cy+5}" text-anchor="middle" font-size="16" font-weight="900" fill="#6E4A00" letter-spacing="1">${esc(t.name.split("（")[0])}</text>`;
  [s1,s2].forEach((side,si)=>{
    const off=si===0?-70:70, start=(vert?cy:cx)-((side.length-1)*step)/2;
    side.forEach((pid,i)=>{ const pos=start+i*step, idx=si===0?i:sp+i, x=vert?cx+off:pos, y=vert?pos:cy+off;
      const nx=vert?(si===0?x-r-11:x+r+11):x, ny=vert?y:(si===0?y-r-11:y+r+11);
      out+=`<circle cx="${nx}" cy="${ny}" r="7.5" fill="#EFEBE2"/><text x="${nx}" y="${ny+3}" text-anchor="middle" font-size="8.5" font-weight="800" fill="#8A8478">${idx+1}</text>`+seatG(pid,ti,idx,x,y,r); });
    if(t.side&&t.side[si]){ const lx=vert?cx+off:cx, ly=vert?cy-len/2-16:(si===0?cy-70-r-26:cy+70+r+28);
      out+=`<text x="${lx}" y="${ly}" text-anchor="middle" font-size="10.5" font-weight="700" fill="#A09A8E" letter-spacing=".5">${esc(t.side[si])}</text>`; }
  });
  return out+"</g>";
}
function svgRoundTable(t,ti){
  const W=420, R=t.seats.length>14?152:140;
  let out=`<svg class="roundtbl" viewBox="0 0 ${W} ${W}" xmlns="http://www.w3.org/2000/svg">`+SEAT_DEFS+roundTableG(t,ti,W/2,W/2,R);
  if(t.door) out+=`<rect x="${W/2-70}" y="${W-22}" width="140" height="18" rx="4" fill="#E5E5EA"/><text x="${W/2}" y="${W-9}" text-anchor="middle" font-size="11" fill="#333336">門 · ${esc(t.door)}</text>`;
  return out+"</svg>";
}
function svgLongTable(t,ti){
  const n=t.seats.length, sp=t.split||Math.ceil(n/2), m=Math.max(sp,n-sp,1), vert=t.dir==="v", len=m*64+20;
  const W=vert?260:len+40, H=vert?len+40:250;
  let out=`<svg class="roundtbl long${vert?" v":""}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">`+SEAT_DEFS+longTableG(t,ti,W/2,H/2);
  if(t.door) out+=`<rect x="${W/2-60}" y="${H-20}" width="120" height="16" rx="4" fill="#E5E5EA"/><text x="${W/2}" y="${H-8}" text-anchor="middle" font-size="10" fill="#333336">門 · ${esc(t.door)}</text>`;
  return out+"</svg>";
}
/* 餐廳全景圖：照產品部座位圖的方位畫——舞台、門、廁所、出入口箭頭都放在原本的位置，桌子也照圖上的左右擺 */
function svgRoom(st,room){
  const W=room.w, H=room.h;
  let out=`<svg class="roomplan" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">`+SEAT_DEFS+`
    <rect x="1" y="1" width="${W-2}" height="${H-2}" rx="18" fill="#FBF8F1" stroke="#E2DCCF" stroke-width="1.5"/>
    <rect x="1" y="1" width="${W-2}" height="${H-2}" rx="18" fill="url(#st-floor)"/>
    <rect x="9" y="9" width="${W-18}" height="${H-18}" rx="13" fill="none" stroke="#EEE8DA" stroke-width="1"/>`;
  const head=(x,y,dx,dy,c)=>{ const L=Math.hypot(dx,dy)||1, ux=dx/L, uy=dy/L, px=-uy, py=ux, b=14, h=22;
    return `<polygon points="${x},${y} ${x-ux*h+px*b},${y-uy*h+py*b} ${x-ux*h-px*b},${y-uy*h-py*b}" fill="${c}"/>`; };
  (room.marks||[]).forEach(mk=>{
    if(mk.type==="bar"){ const stage=/舞台/.test(mk.label);
      out+=`<g filter="url(#st-sh2)"><rect x="${mk.x}" y="${mk.y}" width="${mk.w}" height="${mk.h}" rx="7" fill="${stage?"url(#st-stage)":"url(#st-door)"}" stroke="${stage?"#1E1E26":"#B9B9C2"}" stroke-width="1.5"/></g>
      ${stage?`<rect x="${mk.x+10}" y="${mk.y+mk.h-6}" width="${mk.w-20}" height="3" rx="1.5" fill="#C8102E" opacity=".85"/>`:""}
      <text x="${mk.x+mk.w/2}" y="${mk.y+mk.h/2+7}" text-anchor="middle" font-size="19" font-weight="900" fill="${stage?"#FFFFFF":"#2B2B30"}" letter-spacing="6">${esc(mk.label)}</text>`; }
    else if(mk.type==="arrow"){ const c=mk.color||"#E0281E", dx=mk.x2-mk.x1, dy=mk.y2-mk.y1, L=Math.hypot(dx,dy)||1;
      out+=`<g filter="url(#st-sh)"><line x1="${mk.x1}" y1="${mk.y1}" x2="${mk.x2-dx/L*18}" y2="${mk.y2-dy/L*18}" stroke="${c}" stroke-width="12" stroke-linecap="round"/>`+head(mk.x2,mk.y2,dx,dy,c)+`</g>`;
      if(mk.label) out+=`<text x="${mk.lx}" y="${mk.ly}" text-anchor="${mk.anchor||"middle"}" font-size="17" font-weight="900" fill="#2B2B30" letter-spacing="1">${esc(mk.label)}</text>`; }
    else if(mk.type==="text") out+=`<text x="${mk.x}" y="${mk.y}" text-anchor="${mk.anchor||"middle"}" font-size="${mk.size||13}" fill="${mk.color||"#8E8E93"}">${esc(mk.label)}</text>`;
  });
  (room.tables||[]).forEach(pl=>{ const t=st.tables[pl.t]; if(!t) return;
    out+= t.shape==="long" ? longTableG(t,pl.t,pl.x,pl.y) : roundTableG(t,pl.t,pl.x,pl.y,pl.R||(t.seats.length>14?200:140)); });
  return out+"</svg>";
}
function seatingOf(m){
  const st=S.seating[m.id];
  if(st && Array.isArray(st.tables)) return st;
  return defaultSeating(m);
}
function ensureSeating(m){ if(!S.seating[m.id]) S.seating[m.id]=clone(seatingOf(m)); return S.seating[m.id]; }
/* 拖拉中把觸控捲動擋掉（Safari 對 SVG 的 touch-action 不一定買單） */
let DRAG_ACTIVE=false;
window.addEventListener("touchmove",e=>{ if(DRAG_ACTIVE) e.preventDefault(); },{passive:false});

/* 長按 0.38 秒抬起名字、拖到別的位子放下。餐廳分桌、福森號座位共用。
 * opts.seatSel 可拖的元素／opts.targetAt(node) 找放下的目標／opts.applyDrop(src,tgt) 改資料，回 true 就存檔重畫 */
function installSeatDrag(el,opts){
  const scrEl=$("#screen"); let press=null, drag=null, ghost=null;
  const clearPress=()=>{ if(press){ clearTimeout(press.timer); press=null; } };
  const targetAt=(x,y)=>{ if(ghost) ghost.style.display="none"; const n=document.elementFromPoint(x,y); if(ghost) ghost.style.display="";
    return n ? opts.targetAt(n) : null; };
  const mkGhost=(c,e)=>{
    const p=seatPerson(c.dataset.p), r=c.getBoundingClientRect();
    const g=document.createElement("div");
    const cls=p?(p.group==="貴賓"?"vip":p.group==="雄獅主管"?"mgr":p.guest?"gst":"stf"):"";
    g.className="tseat tghost "+cls; g.innerHTML=`<b>${esc(p?p.name:"")}</b>`;
    g.style.width=Math.max(96,r.width)+"px"; document.body.appendChild(g);
    drag.ox=Math.max(96,r.width)/2; drag.oy=22;
    g.style.left=(e.clientX-drag.ox)+"px"; g.style.top=(e.clientY-drag.oy)+"px";
    return g;
  };
  el.querySelectorAll(opts.seatSel).forEach(c=>{
    c.addEventListener("pointerdown",e=>{
      if(e.pointerType==="mouse" && e.button!==0) return;
      clearPress();
      press={el:c,id:e.pointerId,x:e.clientX,y:e.clientY,scroll:false,
        timer:setTimeout(()=>{ if(!press||press.el!==c) return;
          drag={el:c,id:e.pointerId,ox:0,oy:0}; DRAG_ACTIVE=true;
          try{ c.setPointerCapture(e.pointerId); }catch(_){}
          ghost=mkGhost(c,e);
          c.classList.add("lift"); if(navigator.vibrate) navigator.vibrate(10); press=null; },380)};
      try{ c.setPointerCapture(e.pointerId); }catch(_){}
    });
    c.addEventListener("pointermove",e=>{
      if(drag && drag.id===e.pointerId){
        e.preventDefault(); ghost.style.left=(e.clientX-drag.ox)+"px"; ghost.style.top=(e.clientY-drag.oy)+"px";
        const t=targetAt(e.clientX,e.clientY); el.querySelectorAll(".over").forEach(x=>{ if(x!==t) x.classList.remove("over"); }); if(t&&t!==drag.el) t.classList.add("over");
        if(e.clientY<90) scrEl.scrollTop-=8; else if(e.clientY>window.innerHeight-120) scrEl.scrollTop+=8;   /* 拖到邊緣自動捲 */
        return;
      }
      if(press && press.id===e.pointerId){
        const dx=e.clientX-press.x, dy=e.clientY-press.y;
        if(!press.scroll && Math.hypot(dx,dy)>6){ press.scroll=true; clearTimeout(press.timer); }   /* 還沒長按就滑動＝要捲頁 */
        if(press.scroll){ scrEl.scrollTop-=dy; press.x=e.clientX; press.y=e.clientY; }
      }
    });
    const end=e=>{
      if(press && press.id===e.pointerId) clearPress();
      if(drag && drag.id===e.pointerId){
        const t=targetAt(e.clientX,e.clientY);
        ghost.remove(); ghost=null; drag.el.classList.remove("lift"); el.querySelectorAll(".over").forEach(x=>x.classList.remove("over"));
        const src=drag.el; drag=null; DRAG_ACTIVE=false;
        if(t && t!==src && opts.applyDrop(src,t)){ save(); render(); toast("已調整座位"); }
      }
    };
    c.addEventListener("pointerup",end); c.addEventListener("pointercancel",end);
    c.addEventListener("contextmenu",e=>e.preventDefault());
  });
}
/* 只有產品部給了座位圖（或領隊自己排過）的餐次才有分桌 */
function hasSeating(m){ return !!(m && (SEAT_DOC[m.id] || S.seating[m.id])); }
function mealById(id){ for(const d of Object.keys(MEALS)) for(const m of MEALS[d]||[]) if(m.id===id) return {m,day:+d}; return null; }

PAGES.tables=(hdr,scr)=>{
  const found=mealById(S.mealId)||{m:(MEALS[S.day]||[])[0],day:S.day};
  if(!found.m){ goPage("meals"); return; }
  const {m,day}=found;
  if(!hasSeating(m)){ goPage("meals"); return; }
  hbar(hdr,"分桌 · "+m.place,{back:true});
  const st=seatingOf(m), custom=!!S.seating[m.id], room=(SEAT_DOC[m.id]||{}).room||null;
  const here=PAX.filter(p=>p.days.includes(day));
  const seatedIds=new Set(st.tables.flatMap(t=>t.seats.filter(Boolean)));
  const pool=here.filter(p=>!seatedIds.has(p.id));
  const GO={"貴賓":0,"雄獅主管":1,"工作人員":2};
  pool.sort((a,b)=>(GO[a.group]??9)-(GO[b.group]??9));
  const diff=seatDiff(m,st); SEAT_CHG=diff; const nChg=Object.keys(diff).length;
  const nameOf=v=>{ const q=seatPerson(v); return q?q.name:"空位"; };
  const chip=(pid,t,i)=>{ const p=seatPerson(pid); const no=i>=0?`<s>${i+1}</s>`:""; const k=t+":"+i, chg=t!=="pool"&&(k in diff);
    const orig=chg?`<u>原 ${esc(nameOf(diff[k]))}</u>`:"";
    if(!p) return `<div class="tseat empty${chg?" chg":""}" data-t="${t}" data-i="${i}">${no}${orig}</div>`;
    const g=p.group==="貴賓"?"vip":p.group==="雄獅主管"?"mgr":p.guest?"gst":"stf";
    return `<div class="tseat ${g}${chg?" chg":""}" data-t="${t}" data-i="${i}" data-p="${esc(p.id)}">${no}<b>${esc(p.name)}</b>${p.meal?`<i>${esc(p.meal)}</i>`:p.guest?`<i>來賓</i>`:""}${orig}</div>`; };
  const chgList=st.tables.map((t,ti)=>{ const items=t.seats.map((pid,i)=>({i,k:ti+":"+i,pid})).filter(x=>x.k in diff);
    return items.length?`<div class="chgrow"><b>${esc(t.name.split("（")[0])}</b>${items.map(x=>`<span class="chgitem">第 ${x.i+1} 位：<s>${esc(nameOf(diff[x.k]))}</s> → <b>${esc(nameOf(x.pid))}</b></span>`).join("")}</div>`:""; }).join("");
  const el=document.createElement("div");
  el.className="pagepad";
  el.innerHTML=`
  <div class="mealswitch">${[1,2,3].flatMap(d=>(MEALS[d]||[]).filter(hasSeating).map(x=>`<button class="tab${x.id===m.id?" on":""}" data-m="${esc(x.id)}">D${d} ${esc(x.slot)}・${esc(x.place.split("・")[0].split("（")[0])}</button>`)).join("")}</div>
  ${st.note?`<div class="card" style="font-size:13px;line-height:1.6;background:#FFF3D6;border-color:#E8C98A;color:#7A5200"><b>產品部座位圖</b>　${esc(st.note)}　<span style="color:#A87800">圓桌圖 12 點方向＝第 1 位，順時針。</span></div>`:""}
  <div class="card tblhint"><span>${ic("hand",16)}</span><span><b>長按名字</b>（全景圖上或下方格子都可以）抬起來，拖到別的位子就互換；拖到空位是搬過去；拖到「未入座」是移出。改完自動存，只影響這家餐廳。</span>
    <span class="pill ${nChg?"orange":custom?"green":"gray"}">${nChg?`已換位 ${nChg} 席`:custom?"已自訂":"預設分桌"}</span></div>
  ${nChg?`<div class="card chgcard"><div class="thead"><b>${ic("refresh",15)} 跟產品部座位圖不同的位子</b><span class="pill orange">${nChg} 席</span><span class="roomhint">橘框＋「改」＝換過位子；格子下方寫原本是誰</span></div>${chgList}</div>`:""}
  ${room?`<div class="card tcard roomcard2"><div class="thead"><b>餐廳全景圖</b><span class="pill gray">方位照產品部座位圖</span><span class="roomhint">點空白處放大・長按名字拖拉</span></div>
    <div class="roomwrap"><div class="zw" data-title="${esc(m.place)} 分桌圖">${svgRoom(st,room)}</div></div></div>`:""}
  <div class="tables">
    ${st.tables.map((t,ti)=>{ const n=t.seats.filter(Boolean).length;
      return `<div class="card tcard tzone" data-t="${ti}">
        <div class="thead"><b class="tname" data-t="${ti}">${esc(t.name)}</b><span class="pill redln">${n} 人</span><button class="notebtn" data-tedit="${ti}">✎ 桌名／位數</button></div>
        ${t.seats.length>2&&!(room&&room.tables.some(x=>x.t===ti))?`<div class="roundwrap">${t.shape==="long"?svgLongTable(t,ti):svgRoundTable(t,ti)}</div>`:""}
        <div class="tseats">${t.seats.map((pid,i)=>chip(pid,ti,i)).join("")}</div>
      </div>`; }).join("")}
    <div class="card tcard pool tzone" data-t="pool">
      <div class="thead"><b>未入座／工作人員</b><span class="pill gray">${pool.length} 人</span></div>
      <div class="tseats">${pool.map(p=>chip(p.id,"pool",-1)).join("")||`<div class="tempty">全部都有位子了</div>`}</div>
    </div>
  </div>
  <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:4px">
    <button class="btn sec" id="tblAdd">＋ 加一桌</button>
    <button class="btn ghost" id="tblReset" ${custom?"":"disabled"}>還原成預設</button>
  </div>`;
  scr.appendChild(el);

  el.querySelectorAll(".mealswitch .tab").forEach(b=>b.onclick=()=>goPage("tables:"+b.dataset.m));
  const rz=el.querySelector(".roomwrap .zw");
  if(rz){ rz._slides=()=>[{ title:`${m.place} 分桌圖`, render:()=>svgRoom(st,room) }]; zoomify(rz);
    window.LB_WIRE=root=>root.querySelectorAll(".sseat[data-p]").forEach(x=>x.addEventListener("click",ev=>{ ev.stopPropagation(); const p=seatPerson(x.dataset.p); if(p&&!p.guest) openPaxModal(p); })); }
  el.querySelector("#tblAdd").onclick=()=>{ const cur=ensureSeating(m); cur.tables.push({name:`第 ${cur.tables.length+1} 桌`,seats:Array(8).fill(null)}); save(); render(); };
  el.querySelector("#tblReset").onclick=()=>confirmBox("還原成預設分桌？這家餐廳自訂的位子會清掉。",()=>{ delete S.seating[m.id]; save(); render(); toast("已還原"); });
  el.querySelectorAll("[data-tedit]").forEach(b=>b.onclick=()=>{
    const ti=+b.dataset.tedit, cur=ensureSeating(m), t=cur.tables[ti];
    editForm("桌子設定",[{k:"name",label:"桌名",required:true},{k:"cap",label:"位數",type:"number",required:true}],{name:t.name,cap:t.seats.length},{
      onSave:o=>{ t.name=o.name; const cap=Math.max(t.seats.filter(Boolean).length,Math.round(+o.cap||1));
        while(t.seats.length<cap) t.seats.push(null); while(t.seats.length>cap && t.seats[t.seats.length-1]==null) t.seats.pop(); dataChanged("已儲存"); },
      onDelete:()=>{ if(t.seats.some(Boolean)){ toast("桌上還有人，先把人拖走"); return; } cur.tables.splice(ti,1); dataChanged("已刪除"); },
    });
  });

  installSeatDrag(el,{ seatSel:".tseat[data-p],.sseat[data-p]",
    targetAt:n=>n.closest(".tseat,.sseat")||n.closest(".tzone"),
    applyDrop:(src,tgt)=>{
      const isSeat=x=>x.classList.contains("tseat")||x.classList.contains("sseat");
      const cur=ensureSeating(m), pid=src.dataset.p;
      const from = src.dataset.t==="pool" ? null : {t:+src.dataset.t,i:+src.dataset.i};
      const take=()=>{ if(from) cur.tables[from.t].seats[from.i]=null; };
      if(isSeat(tgt)){
        if(tgt.dataset.t==="pool"){ if(!from) return false; take(); return true; }
        const to={t:+tgt.dataset.t,i:+tgt.dataset.i}; if(from && from.t===to.t && from.i===to.i) return false;
        const other=cur.tables[to.t].seats[to.i]||null;
        cur.tables[to.t].seats[to.i]=pid;
        if(from) cur.tables[from.t].seats[from.i]=other;   /* 互換；對方是空位就等於搬過去 */
        return true;
      }
      if(tgt.dataset.t==="pool"){ if(!from) return false; take(); return true; }
      const tt=+tgt.dataset.t, seats=cur.tables[tt].seats; if(from && from.t===tt) return false;
      take(); const hole=seats.indexOf(null); if(hole>=0) seats[hole]=pid; else seats.push(pid); return true;
    } });
};

/* ---------- 同意書（離隊切結） ---------- */
/* ---------- 自選活動名單（勾誰要去，存在 S.optin[key]） ---------- */
const OPTINS={
  sunrise:{ title:"祝山日出 自選名單", day:2, cap:38,
    desc:"9/21 04:20 晨喚 → 04:40 遊園車出發 → 05:40 日出 → 06:20 返回飯店。加成遊園車包車 2 台，每台最多 19 人。",
    hint:"前一晚問清楚誰要去，勾起來；晨喚只叫有勾的人。日出點心領隊現場買，50/人。" },
};
PAGES.optin=(hdr,scr)=>{
  const key=S.optKey||"sunrise", O=OPTINS[key]||OPTINS.sunrise;
  hbar(hdr,O.title,{back:true});
  const rec=S.optin[key]||(S.optin[key]={});
  const GO={"貴賓":0,"雄獅主管":1,"工作人員":2};
  const people=PAX.filter(p=>p.days.includes(O.day)).sort((a,b)=>(GO[a.group]??9)-(GO[b.group]??9));
  const on=people.filter(p=>rec[p.id]);
  const el=document.createElement("div");
  el.className="pagepad";
  el.innerHTML=`
  <div class="card optsum">
    <div class="optbig"><b>${on.length}</b><span>人要去</span>${O.cap?`<span class="pill ${on.length>O.cap?"amber":"gray"}">上限 ${O.cap} 人</span>`:""}</div>
    <div class="optdesc">${esc(O.desc)}</div>
    ${on.length?`<div class="optnames">${on.map(p=>`<span class="chip on">${esc(p.name)}</span>`).join("")}</div>`:""}
  </div>
  <p class="vs">${esc(O.hint)}　點名字切換，改完立刻存。</p>
  <div class="optlist"></div>
  <div style="display:flex;gap:9px;margin-top:6px">
    <button class="btn sec" id="optAll">全部勾選</button><button class="btn sec" id="optNone">全部清除</button>
  </div>`;
  const list=el.querySelector(".optlist");
  let lastGroup="";
  people.forEach(p=>{
    if(p.group!==lastGroup){ const h=document.createElement("h3"); h.className="sect"; h.textContent=p.group; list.appendChild(h); lastGroup=p.group; }
    const ck=!!rec[p.id];
    const r=document.createElement("div");
    r.className="optrow2"+(ck?" on":"");
    r.innerHTML=`<span class="ckbox">${ck?"✓":""}</span><span class="nm">${esc(p.name)}</span><span class="pill gray">${esc(p.rel)}</span>${p.meal?`<span class="pill amber">${esc(p.meal)}</span>`:""}`;
    r.onclick=()=>{ if(rec[p.id]) delete rec[p.id]; else rec[p.id]=Date.now(); save(); render(); };
    list.appendChild(r);
  });
  el.querySelector("#optAll").onclick=()=>{ people.forEach(p=>rec[p.id]=rec[p.id]||Date.now()); save(); render(); };
  el.querySelector("#optNone").onclick=()=>confirmBox("清除全部勾選？",()=>{ S.optin[key]={}; save(); render(); });
  scr.appendChild(el);
};

PAGES.consent=(hdr,scr)=>{
  hbar(hdr,"同意書 · 離隊切結",{back:true});
  const el=document.createElement("div");
  el.className="pagepad";
  el.innerHTML=`<p class="vs">貴賓提前離團時，於平板完成切結簽名，全程無紙化、紀錄留存於裝置。（本團：魏董伉儷 9/21 茶席後離團）</p>
  <div class="card">
    <div class="field"><label>離團貴賓</label>
      <select id="sgWho">${GUESTS().map(p=>`<option value="${p.id}"${p.id==="p03"?" selected":""}>${esc(p.name)}（${esc(p.rel)}）</option>`).join("")}</select></div>
    <div class="field"><label>離團事由</label><input type="text" id="sgWhy" value="9/21 茶席後提前返北（672車次 嘉義18:32→台北19:59）"></div>
    <div class="field"><label>本人已知悉離團後行程與保險相關事項，並確認後續交通由公司專車銜接高鐵。</label>
      <canvas class="sigpad" id="sig"></canvas>
      <div style="margin-top:9px;display:flex;gap:8px">
        <button class="btn sec" id="sigClear">清除重簽</button>
        <button class="btn pri" id="sigSave">完成切結</button>
      </div></div>
  </div>
  <h3 class="sect">已完成切結（${S.sigs.length}）</h3>
  <div>${S.sigs.map(s=>{
    const p=pax(s.pax);
    /* 舊存檔的 png 是 dataURL，新的存 IndexedDB、開啟後才填 src */
    const img = s.png ? `<img src="${s.png}" alt="簽名">` : `<img data-sigid="${esc(s.sig||"")}" alt="簽名">`;
    return `<div class="sigrec"><div style="flex:1"><b style="font-size:14px">${p?esc(p.name):"—"}</b>
      <div style="font-size:11.5px;color:#8E8E93">${esc(s.why||"")} · ${new Date(s.ts).toLocaleString("zh-TW")}</div></div>
      ${img}</div>`;
  }).join("")||`<p class="vs">尚無紀錄</p>`}</div>`;
  scr.appendChild(el);
  paintSigs(el);
  const cv=el.querySelector("#sig");
  requestAnimationFrame(()=>{ const r=cv.getBoundingClientRect(); cv.width=r.width*2; cv.height=r.height*2; });
  const ctx=cv.getContext("2d");
  let drawing=false, has=false;
  const pos=e=>{ const r=cv.getBoundingClientRect(); return [(e.clientX-r.left)*2,(e.clientY-r.top)*2]; };
  cv.addEventListener("pointerdown",e=>{ e.preventDefault(); cv.setPointerCapture(e.pointerId);
    drawing=true; has=true; ctx.strokeStyle="#333336"; ctx.lineWidth=4; ctx.lineCap="round";
    const [x,y]=pos(e); ctx.beginPath(); ctx.moveTo(x,y); });
  cv.addEventListener("pointermove",e=>{ if(!drawing) return; const [x,y]=pos(e); ctx.lineTo(x,y); ctx.stroke(); });
  cv.addEventListener("pointerup",()=>drawing=false);
  el.querySelector("#sigClear").onclick=()=>{ ctx.clearRect(0,0,cv.width,cv.height); has=false; };
  el.querySelector("#sigSave").onclick=async()=>{
    if(!has){ toast("請先簽名"); return; }
    const btn=el.querySelector("#sigSave");
    btn.disabled=true;
    const ts=Date.now();
    const rec={ pax:el.querySelector("#sgWho").value, why:el.querySelector("#sgWhy").value, ts };
    try{
      /* 簽名圖存 IndexedDB，不塞進 localStorage——切結是要留存舉證的，不能被配額擠掉 */
      const blob = await new Promise(r=>cv.toBlob(r,"image/png"));
      if(!blob) throw new Error("無法產生簽名圖檔");
      const id = "sg"+ts+Math.random().toString(36).slice(2,5);
      await idbPut("sigs",{ id, blob, ts });
      rec.sig = id;
    }catch(e){
      /* IndexedDB 不能用時退回 dataURL，至少人還在現場，資料先留下來 */
      console.warn("簽名改存 dataURL", e);
      rec.png = cv.toDataURL("image/png");
    }
    S.sigs.unshift(rec);
    save();
    await writeBackup("sign");   /* 切結是高價值紀錄，當下立刻備份一份 */
    render();
    toast(durable()?"切結已完成留存":"⚠️ 切結已記錄，但儲存空間有問題，請立刻匯出備份");
  };
};

/* 把 IndexedDB 裡的簽名圖填回畫面 */
const SIG_URLS = new Map();
async function paintSigs(root){
  for(const img of root.querySelectorAll("img[data-sigid]")){
    const id = img.dataset.sigid;
    if(!id) continue;
    if(SIG_URLS.has(id)){ img.src = SIG_URLS.get(id); continue; }
    try{
      const rec = await idbGet("sigs", id);
      if(rec && rec.blob){
        const url = URL.createObjectURL(rec.blob);
        SIG_URLS.set(id, url);
        img.src = url;
      }else{
        img.replaceWith(Object.assign(document.createElement("span"),
          { textContent:"（簽名圖遺失）", style:"font-size:11.5px;color:#B03A2E" }));
      }
    }catch(e){ console.warn("讀取簽名失敗", e); }
  }
}

/* ---------- 資料保全 ---------- */
const KB = n => n<1024 ? n+" B" : n<1048576 ? (n/1024).toFixed(0)+" KB" : (n/1048576).toFixed(1)+" MB";
const when = ts => ts ? new Date(ts).toLocaleString("zh-TW",{month:"numeric",day:"numeric",hour:"2-digit",minute:"2-digit"}) : "—";

function blobToDataURL(b){
  return new Promise((res,rej)=>{
    const fr=new FileReader();
    fr.onload=()=>res(fr.result); fr.onerror=()=>rej(fr.error||new Error("讀取失敗"));
    fr.readAsDataURL(b);
  });
}

/* 完整匯出：狀態 ＋ 簽名 ＋（可選）行李照片與上傳檔案，一個檔案存進 iPad「檔案」App */
async function exportAll(withMedia){
  const pack = { app:"TLE920", ver:2, exportedAt:new Date().toISOString(), tour:TOUR.code, state:S,
                 sigs:[], photos:[], files:[] };
  for(const rec of await idbAll("sigs")) pack.sigs.push({ id:rec.id, ts:rec.ts, data:await blobToDataURL(rec.blob) });
  if(withMedia){
    for(const rec of await idbAll("photos"))
      pack.photos.push({ id:rec.id, pax:rec.pax, ts:rec.ts, data:await blobToDataURL(rec.blob) });
    for(const rec of await idbAll("files"))
      pack.files.push({ id:rec.id, name:rec.name, cat:rec.cat, ts:rec.ts, data:await blobToDataURL(rec.blob) });
  }
  const blob = new Blob([JSON.stringify(pack)], {type:"application/json"});
  const d=new Date(), p2=n=>String(n).padStart(2,"0");
  /* 檔名必須是純 ASCII：含中文時瀏覽器會整個丟掉，變成 download.json，分不出哪天哪份 */
  const name = `TLE920-D${S.day}-${d.getFullYear()}${p2(d.getMonth()+1)}${p2(d.getDate())}-${p2(d.getHours())}${p2(d.getMinutes())}${withMedia?"-full":"-lite"}.json`;
  const a=document.createElement("a");
  a.href=URL.createObjectURL(blob); a.download=name;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(()=>URL.revokeObjectURL(a.href), 30000);
  return { name, size:blob.size };
}

async function importAll(file){
  const pack = JSON.parse(await file.text());
  if(!pack || pack.app!=="TLE920" || !pack.state) throw new Error("不是本程式的備份檔");
  const toBlob = async d => await (await fetch(d)).blob();
  for(const r of pack.sigs||[])   await idbPut("sigs",  { id:r.id, ts:r.ts, blob:await toBlob(r.data) });
  for(const r of pack.photos||[]) await idbPut("photos",{ id:r.id, pax:r.pax, ts:r.ts, blob:await toBlob(r.data) });
  for(const r of pack.files||[])  await idbPut("files", { id:r.id, name:r.name, cat:r.cat, ts:r.ts, blob:await toBlob(r.data) });
  S = pack.state;
  if(!S.sigs) S.sigs=[];
  S.rev = (S.rev||0)+1;
  save();
  return pack;
}

PAGES.storage=(hdr,scr)=>{
  hbar(hdr,"資料保全",{back:true});
  const el=document.createElement("div");
  el.className="pagepad";
  const okAll = durable() && !memMode;

  el.innerHTML=`
  <div class="card stcard ${okAll?"good":(durable()?"warn":"bad")}">
    <div class="sthead">${okAll?"✅ 資料儲存正常":(durable()?"⚠️ 部分功能受限":"🚨 資料沒有存進去")}</div>
    <div class="strow"><span class="k">上次成功存檔</span><span class="v" id="stLast">${when(HEALTH.lastOk)}</span></div>
    <div class="strow"><span class="k">localStorage</span><span class="v">${HEALTH.ls===null?"尚未寫入":(HEALTH.ls?"正常":"❌ "+esc(HEALTH.err||"寫入失敗"))}</span></div>
    <div class="strow"><span class="k">IndexedDB</span><span class="v">${memMode?"❌ 被封鎖，改用記憶體":(HEALTH.idb===false?"❌ 寫入失敗":"正常")}</span></div>
    <div class="strow"><span class="k">常駐儲存</span><span class="v" id="stPersist">檢查中…</span></div>
    <div class="strow"><span class="k">已用空間</span><span class="v" id="stQuota">檢查中…</span></div>
    <div class="strow"><span class="k">自動備份</span><span class="v" id="stBk">${HEALTH.backups} 份・最近 ${when(HEALTH.lastBackup)}</span></div>
  </div>

  ${memMode?`<div class="demo-note"><b>這台裝置封鎖了 IndexedDB。</b>最常見的原因是直接用 <code>file://</code> 開啟單檔版，或 Safari 開了無痕模式。
    此模式下<b>行李照片與上傳檔案關掉程式就會消失</b>，點名／備註／預算等文字紀錄仍會存進 localStorage。
    正式帶團請改用「加入主畫面」的網頁版。</div>`:""}

  <h3 class="sect">每天收工做一次</h3>
  <div class="card">
    <p class="vs" style="margin:0 0 11px">匯出的檔案會進 iPad 的「檔案」App，換機、重灌、資料被清掉都救得回來。<b>建議每晚睡前按一次。</b></p>
    <div style="display:flex;gap:9px;flex-wrap:wrap">
      <button class="btn pri" id="expFull">完整備份（含照片）</button>
      <button class="btn sec" id="expLite">只匯出紀錄</button>
    </div>
    <p class="vs" style="margin:11px 0 0">完整備份包含行李照片與手寫備註，檔案較大；只匯出紀錄則是點名、備註、訂單、預算、簽名，通常不到 1 MB。</p>
  </div>

  <h3 class="sect">還原</h3>
  <div class="card">
    <label class="camlbl">📥 選擇備份檔還原<input type="file" id="impFile" accept=".json,application/json"></label>
    <p class="vs" style="margin:11px 0 0">還原會<b>覆蓋</b>目前裝置上的所有紀錄，請先確認要還原的是哪一份。</p>
  </div>

  <h3 class="sect">程式內自動快照</h3>
  <div class="card">
    <p class="vs" style="margin:0 0 11px">每次操作後最多 60 秒自動存一份快照，保留最近 40 份。誤刪或誤改時可以倒回去。</p>
    <div id="bkList"><p class="vs" style="margin:0">讀取中…</p></div>
  </div>`;

  scr.appendChild(el);

  /* 非同步補上儲存環境資訊 */
  (async()=>{
    const per = await requestPersist();
    HEALTH.persisted = per;
    const pe = el.querySelector("#stPersist");
    if(pe) pe.innerHTML = per===true ? "已取得（系統不會自動清除）"
      : per===false ? "⚠️ 未取得，空間不足時系統可能清除資料"
      : "此裝置不支援查詢";
    const q = await readQuota();
    HEALTH.quota = q;
    const qe = el.querySelector("#stQuota");
    if(qe) qe.textContent = q ? `${KB(q.usage)} / ${KB(q.quota)}` : "此裝置不支援查詢";
  })();

  async function refreshBackups(){
    const all = await idbAll("backups");
    all.sort((a,b)=>b.ts-a.ts);
    HEALTH.backups = all.length;
    const box = el.querySelector("#bkList");
    if(!box) return;
    box.innerHTML = all.length ? all.slice(0,12).map(b=>`
      <div class="bkrow">
        <div class="bkm"><b>${when(b.ts)}</b>
          <span>第 ${b.day} 天 · ${b.kind==="auto"?"自動":b.kind==="sign"?"切結後":"手動"} · ${KB(b.json.length)}</span></div>
        <button class="btn sec" data-bk="${esc(b.id)}">還原</button>
      </div>`).join("") : `<p class="vs" style="margin:0">尚無快照。</p>`;
    box.querySelectorAll("[data-bk]").forEach(btn=>btn.onclick=()=>{
      const rec = all.find(x=>x.id===btn.dataset.bk);
      if(!rec) return;
      confirmBox(`還原到 ${when(rec.ts)} 的快照？目前的紀錄會被覆蓋。`, ()=>{
        try{
          const o = parseState(rec.json);
          S = o; S.rev=(S.rev||0)+1; save(); closeModal(); render();
          toast("已還原快照");
        }catch(e){ closeModal(); toast("快照毀損，無法還原"); }
      });
    });
  }
  refreshBackups();


  async function doExport(withMedia, btn){
    const label=btn.textContent;
    btn.disabled=true; btn.textContent="匯出中…";
    try{
      const r = await exportAll(withMedia);
      toast(`已匯出 ${KB(r.size)}`);
    }catch(e){ console.error(e); toast("匯出失敗："+(e.message||e)); }
    btn.disabled=false; btn.textContent=label;
  }
  el.querySelector("#expFull").onclick=e=>doExport(true, e.currentTarget);
  el.querySelector("#expLite").onclick=e=>doExport(false, e.currentTarget);

  el.querySelector("#impFile").onchange=e=>{
    const f=e.target.files[0];
    e.target.value="";
    if(!f) return;
    confirmBox(`以「${f.name}」覆蓋目前所有紀錄？`, async()=>{
      try{
        await writeBackup("manual");      /* 還原前先把現況存一份，免得按錯就回不去 */
        const pack = await importAll(f);
        closeModal(); render();
        toast(`已還原（${pack.exportedAt.slice(0,16).replace("T"," ")} 的備份）`);
      }catch(err){ closeModal(); toast("還原失敗："+(err.message||err)); }
    });
  };
};

/* ---------- 佔位頁 ---------- */
function stubPage(title,desc){
  return (hdr,scr)=>{
    hbar(hdr,title,{back:true});
    scr.innerHTML=`<div class="placeholder-page"><div class="big">🧩</div>
      <div class="tt">${esc(title)}（示意）</div><div class="dd">${esc(desc)}</div></div>`;
  };
}
PAGES.daily=stubPage("日報表","沿用現行系統之日報表功能。");
PAGES.sms  =stubPage("發送簡訊","沿用現行系統之簡訊功能。");
PAGES.qmail=stubPage("Q 信箱","MVP 階段顯示於帶團中頁，點擊開啟 Q 信箱。");

/* ---------- 設定 ---------- */
PAGES.settings=(hdr,scr)=>{
  hbar(hdr,"設定",{back:true});
  const el=document.createElement("div");
  el.className="pagepad";
  el.innerHTML=`<div class="demo-note">此為 <b>920 董事會 Demo 版</b>：名單／行程／分房來自作業手冊（0827 版），高鐵座位對應為示意（以現場發票為準）。首次以網路開啟後，程式與檔案皆存於 iPad，離線可正常操作。</div>
  <div class="card"><div style="font-weight:800;margin-bottom:9px">資料管理</div>
    <div style="display:flex;gap:9px;flex-wrap:wrap">
      <button class="btn pri" id="stg">資料保全・備份還原</button>
      <button class="btn sec" id="rstData">還原全部預設資料</button>
      <button class="btn sec" id="rst" style="color:#C8102E">重置示範資料</button>
    </div></div>`;
  el.querySelector("#stg").onclick=()=>goPage("storage");
  el.querySelector("#rstData").onclick=()=>confirmBox("把名單、行程、餐食、店家、分房、菜單、預算全部換回出廠預設？\n點名、訂單、行李、簽名紀錄會保留。",async()=>{
    await writeBackup("manual"); S.data=buildSeed(); dataChanged("已還原全部預設資料");
  });
  el.querySelector("#rst").onclick=()=>confirmBox("重置所有點名、訂單、行李、簽名與上傳檔案？\n（快照與備份也會一併清除）",async()=>{
    await writeBackup("manual");          /* 按錯還有得救 */
    localStorage.removeItem(SKEY); localStorage.removeItem(SKEY_B);
    for(const st of ["files","photos","sigs","state"]) await idbClear(st);
    SIG_URLS.clear();
    S=DEFAULTS(); save(); closeModal(); render(); toast("已重置");
  });
  scr.appendChild(el);
};

/* ============================================================ MODAL */
function openModal(title,body,btns){
  const mb=$("#mbox");
  mb.className="mbox";
  mb.innerHTML=`<div class="mh"><span class="t">${esc(title)}</span><button class="x">✕</button></div>
    <div class="mb">${body}</div>
    ${btns&&btns.length?`<div class="mf"></div>`:""}`;
  mb.querySelector(".x").onclick=closeModal;
  if(btns) btns.forEach(([lb,cls,fn])=>{
    const b=document.createElement("button");
    b.className="btn "+cls; b.textContent=lb; b.onclick=fn;
    mb.querySelector(".mf").appendChild(b);
  });
  $("#modal").classList.add("on");
}
function closeModal(){ $("#modal").classList.remove("on"); }
$("#modal").addEventListener("click",e=>{ if(e.target.id==="modal") closeModal(); });

/* ============================================================ BOOT */
(async function(){
  try{ await idbOpen(); }catch(e){ console.warn("儲存初始化失敗，以記憶體模式繼續",e); }

  /* IndexedDB 那份版號比較新就採用它（localStorage 可能被系統清掉或寫入失敗） */
  try{
    const rec = await idbGet("state","S");
    if(rec && rec.json && (rec.rev||0) > (S.rev||0)){
      const o = parseState(rec.json);
      if(o){ S = o; console.info("採用 IndexedDB 的較新存檔 rev", rec.rev); }
    }
  }catch(e){ console.warn("讀取 IndexedDB 存檔失敗", e); }

  /* localStorage 與 IndexedDB 都掛了才走到這裡：至少讓最後一份快照把人救回來 */
  if(!S.roll){
    try{
      const all = await idbAll("backups");
      all.sort((a,b)=>b.ts-a.ts);
      for(const b of all){
        try{ const o=parseState(b.json); if(o){ S=o; console.warn("已從快照復原", b.ts); break; } }catch(e){}
      }
    }catch(e){}
    if(!S.roll) S = DEFAULTS();
  }

  if(!S.budgetFinal) S.budgetFinal={};
  if(!S.vconf) S.vconf={};
  if(!S.optin) S.optin={};
  if(!S.seating) S.seating={};
  if(!S.sigs) S.sigs=[];
  if((S.fieldsVer||0)<2){ S.fields={}; S.fieldsVer=2; }   /* 團體大表欄位改版：套用新的預設勾選 */

  /* 跟 iOS 要常駐儲存，避免空間不足時被清掉 */
  HEALTH.persisted = await requestPersist();
  HEALTH.quota = await readQuota();
  try{ const bk=await idbAll("backups"); HEALTH.backups=bk.length;
       HEALTH.lastBackup = bk.reduce((m,b)=>Math.max(m,b.ts),0); }catch(e){}

  /* 第一次開啟把 seed 拷進 S.data；之後每次 render 都會重新綁定 */
  bindData();
  autoDay();   /* 帶團當天打開就是當天，不用再點日期 */
  /* （保留）舊的 ✎ 按鈕委派；現在按鈕隱藏，實際靠長按 */
  $("#screen").addEventListener("click",e=>{
    const b=e.target.closest(".ebtn"); if(!b||!EDIT_HANDLER) return;
    e.preventDefault(); e.stopPropagation(); EDIT_HANDLER(b.dataset.e,b);
  },true);

  /* 先落地一次驗證儲存能不能寫，畫面上的狀態才是真的 */
  save();

  try{ render(); }
  catch(e){
    console.error(e);
    document.getElementById("screen").innerHTML=
      '<div class="placeholder-page"><div class="big">⚠️</div><div class="tt">載入發生問題</div>'+
      '<div class="dd">'+String(e&&e.message||e)+'</div></div>';
  }

  /* 舊存檔裡的簽名 dataURL 搬進 IndexedDB，把 localStorage 空間讓出來 */
  try{
    let moved=0;
    for(const sg of S.sigs){
      if(sg.png && !sg.sig){
        const blob = await (await fetch(sg.png)).blob();
        const id = "sg"+(sg.ts||Date.now())+Math.random().toString(36).slice(2,5);
        await idbPut("sigs",{ id, blob, ts:sg.ts||Date.now() });
        sg.sig=id; delete sg.png; moved++;
      }
    }
    if(moved){ save(); render(); console.info("已搬移",moved,"份簽名到 IndexedDB"); }
  }catch(e){ console.warn("簽名搬移失敗，維持原狀", e); }

  updateSaveBar();

  /* 離開前補一刀，把還沒寫進去的存起來 */
  const flush = ()=>{ try{ localStorage.setItem(SKEY, JSON.stringify(S)); }catch(e){} };
  window.addEventListener("pagehide", flush);
  document.addEventListener("visibilitychange", ()=>{
    if(document.visibilityState==="hidden") flush();
    else if(autoDay()){ save(); render(); }   /* 跨日後回到 App，自動跳到新的一天 */
  });

  if(location.protocol!=="file:" && "serviceWorker" in navigator){
    try{ await navigator.serviceWorker.register("sw.js"); }catch(e){ console.warn("SW 註冊失敗",e); }
  }
})();
