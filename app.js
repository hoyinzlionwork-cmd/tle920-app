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
  rc:"莊學憲", tp:"林詠凱（鐵道）", op:"陳璟茹（國內OP・訂房）／周冠廷（產品）／洪采吟（嘉義）",
  taxTitle:"雄獅旅行社股份有限公司", taxId:"04655091", budgetPrinted:"2026/09/10",
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
    trainSeat:"4車 8號", table:2, meal:"" },
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
        p24:"5車 3A", p17:"5車 4A", p29:"5車 3B", p18:"5車 4B", p30:"5車 3C", p31:"5車 4C" },
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
          "03575971":["p24","p29","p30","p17","p18","p31"], "04203413":["p21"], "待確認":["p16"] },
  pnrBk:{ "04421386":["p10","p09","p14","p15","p06","p05","p19","p28","p07","p08"], "04414571":["p01","p02","p11","p12"],
          "04420933":["p23"], "05130881":["p21"], "04414767":["p30","p29","p24","p17","p18","p20","p25"],
          "04199621":["p03","p04"], "待確認":["p16","p31","p26","p13"] },
  board:{ p13:"台中", p23:"台中" },
  days:{ p13:[1,2] },
  remove:["p22"],   /* 陸嘉琪 9/1 取消 */
  add:[
    { id:"p28", name:"陳萱",   rel:"陳董女兒",     en:"Lorraine", group:"貴賓",     days:[1,2,3], idNo:"—", birth:"—", tkt:"商務・成人", pnrGo:"—", pnrBk:"—", table:1, meal:"" },
    { id:"p29", name:"李沛祐", rel:"工作人員",     en:"Tony",     group:"工作人員", days:[1,2,3], idNo:"—", birth:"—", tkt:"經濟・成人", pnrGo:"—", pnrBk:"—", table:0, meal:"" },
    { id:"p30", name:"賴怡娟", rel:"副總（工作人員）", en:"Debbie", group:"工作人員", days:[1,2,3], idNo:"—", birth:"—", tkt:"經濟・成人", pnrGo:"—", pnrBk:"—", table:0, meal:"" },
    { id:"p31", name:"薛永南", rel:"領隊",         en:"",         group:"工作人員", days:[1,2,3], idNo:"—", birth:"—", tkt:"經濟・成人", pnrGo:"—", pnrBk:"—", table:0, meal:"" },
  ],
};
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

const TRAIN_TL = { name:"薛永南 領隊", seat:"" };
(function assignTrain(){
  const vip = PAX.filter(p=>p.group==="貴賓");
  const mgr = PAX.filter(p=>p.group==="雄獅主管");
  vip.forEach((p,i)=>{ p.trainSeat = `5車 ${i+1}號`; });
  TRAIN_TL.seat = `5車 ${vip.length+1}號`;
  mgr.forEach((p,i)=>{ p.trainSeat = `4車 ${i+1}號`; });
  const paris = PAX.find(p=>p.id==="p24");
  if(paris) paris.trainSeat = `4車 ${mgr.length+1}號`;
  ["p25","p26","p27"].forEach(id=>{ const p=PAX.find(x=>x.id===id); if(p) p.trainSeat="—"; });
})();

/* 分房（作業手冊「分房表」）：兩晚不同飯店 */
let NIGHTS = [
  { key:1, date:"9/20(日)", hotel:"阿里山賓館【現代館】", vendor:"v_alishan", rooms:[
    { no:"董1", type:"歐式套房（兩大床）",        who:["王文傑","凌瓏"] },
    { no:"董2", type:"和洋式套房（一大床＋日式軟墊）", who:["魏寶生","趙秋芬"], note:"9/20–9/21" },
    { no:"董3", type:"歐式套房（兩大床）",        who:["游張松","王　雍"] },
    { no:"董4", type:"和洋式套房（一大床＋日式軟墊）", who:["陳聖德","張振明","陳萱"], note:"女兒睡軟墊" },
    { no:"董5", type:"歐式套房（兩大床）",        who:["盧希鵬","游慧茹"] },
    { no:"董6", type:"歐式套房（一大床）",        who:["利明献","張郁芬"] },
    { no:"董7", type:"和洋式套房（一大床＋日式軟墊）", who:["柳婉郁"] },
    { no:"董8", type:"歐式套房（兩大床/愛心）",   who:["鄭兆剛","螘金花"] },
    { no:"主1", type:"豪華家庭房",  who:["黃信川"] },
    { no:"主2", type:"豪華家庭房",  who:["王岳聰"] },
    { no:"主3", type:"豪華家庭房",  who:["陳曉穎"] },
    { no:"主4", type:"豪華家庭房",  who:["邱浩軒"] },
    { no:"主6", type:"豪華家庭房",  who:["王村煌"] },
    { no:"外宿", type:"工作人員",   who:["陳婉如 Paris","林詠凱","周冠廷","洪采吟"], note:"外宿" },
  ]},
  { key:2, date:"9/21(一)", hotel:"阿里山英迪格酒店", vendor:"v_indigo", rooms:[
    { no:"董1", type:"映豪華房",          who:["王文傑","凌瓏"], note:"位置需確認" },
    { no:"董3", type:"精品客房（雙床）",  who:["游張松","王　雍"] },
    { no:"董4", type:"精品客房（大床）",  who:["陳聖德","張振明","陳萱"], note:"女兒加床" },
    { no:"董5", type:"精品客房（雙床）",  who:["盧希鵬","游慧茹"] },
    { no:"董6", type:"精品客房（大床）",  who:["利明献","張郁芬"] },
    { no:"董7", type:"精品客房（大床）",  who:["柳婉郁"] },
    { no:"董8", type:"精品客房（大床）",  who:["鄭兆剛","螘金花"] },
    { no:"主1", type:"精品客房（大床）",  who:["黃信川"] },
    { no:"主2", type:"精品客房（大床）",  who:["王岳聰"] },
    { no:"主3", type:"精品客房（大床）",  who:["陳曉穎"] },
    { no:"主4", type:"精品客房（大床）",  who:["劉惟珺"], note:"9/21 入住" },
    { no:"主5", type:"精品客房（大床）",  who:["邱浩軒"] },
    { no:"主6", type:"精品客房（大床）",  who:["戴啟珩"], note:"9/21 加入" },
    { no:"主8", type:"精品客房（大床）",  who:["王村煌"] },
    { no:"外宿", type:"工作人員",         who:["陳婉如 Paris","林詠凱","周冠廷","洪采吟"], note:"外宿" },
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
     ["晚餐","阿里山賓館・神木廳（大包廂）","合菜・餐廳已安排分菜｜最多 22 位・2,280/人（房費內含 1,000/人）｜巴黎與岳聰總坐外面","OK",["v_alishan"]]],
  2:[["早餐","阿里山賓館・麗景廳（現代館1F）","07:00–10:00（最後進場 09:30）","OK",["v_alishan"]],
     ["點心","祝山站小舖","日出行程・現場點","待確認",["v_zhushan"]],
     ["小點","奮起湖老街","甜甜圈＋愛玉・裝袋拿著吃","OK",["v_donut","v_aiyu"]],
     ["午餐","山芙蓉 無菜單料理","8 菜 1 湯：肉類×2、豆腐×1、蛋料理×1、湯品×1，其餘由主廚依當日食材搭配 2–3 道","OK",["v_fkuo"]],
     ["茶席","小山霂茗（林園製茶）","老闆親自接待・每桌 7 人分 3–4 桌、每桌一位茶師","OK",["v_xiaoshan","v_linyuan"]],
     ["晚餐","阿里山英迪格・HUFU氛饗亭（宴會廳C）","HUFU 套餐（菜單調整中）","OK",["v_indigo"]]],
  3:[["早餐","阿里山英迪格・粟餐廳（1F）","07:00–10:30","OK",["v_indigo"]],
     ["午餐","優遊吧斯 鄒族文化部落","合菜（需分菜）・800/人｜是否品茗待確認（與小山霂茗類似，菜色須避免重複）","OK",["v_yuyupas"]],
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

  { id:"v_alishan", name:"阿里山賓館", sub:"D1 晚餐 神木廳／D2 早餐 麗景廳／住宿兩晚", days:[1,2], slots:["晚餐","早餐","住宿"],
    tel:["05-267-9811"], email:"service@alishanhotel.com.tw", addr:"嘉義縣阿里山鄉香林村16號",
    hours:"麗景廳早餐 07:00–10:00（最後進場 09:30）",
    note:"神木廳大包廂最多 22 位・2,280/人（房費內含 1,000/人）。合菜，餐廳已安排分菜。" },

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

/* 預算表（公司系統 BOOK01 Budget 表，26TS920A3A，2026/09/10 印表，製表 李姵瑩）
 * 每筆：day 第幾天／t 時間／cat 元件（餐廳・活動・團房・其它）／slot 餐次／vendor 店家／name 訂購明細
 *      price 項次單價／qty 數量／unit 單位／pay 付款方式（現金＝領隊帶的錢）／grp 同一張單的合併小計
 * 領隊現金 TOTAL＝所有「現金」項小計，表上為 NTD 89,550。
 * 「實際」欄由領隊回團後逐張填入決算金額，存於 S.budgetFinal（以卡片 key 為索引）。 */
let BUDGET_HEADCOUNT = 24;
let BUDGET_ITEMS = [
  { id:"k01", day:1, t:"07:00", cat:"餐廳", slot:"早餐",   vendor:"阜杭豆漿",           name:"早餐",                       price:150,  qty:24, unit:"人", pay:"現金" },
  { id:"k02", day:1, t:"13:20", cat:"餐廳", slot:"下午茶", vendor:"十字鳴心咖啡",       name:"點心",                       price:200,  qty:24, unit:"人", pay:"現金" },
  { id:"k03", day:1, t:"14:00", cat:"活動", slot:"",       vendor:"宿瓦納咖啡屋",       name:"不插電咖啡＋解說（雨備）",   price:400,  qty:24, unit:"人", pay:"現金", note:"水山巨木雨備方案，需三天前取消；沒下雨就不會用到" },
  { id:"k04", day:1, t:"16:30", cat:"團房", slot:"",       vendor:"阿里山賓館",         name:"房型(標準雙人房)／床型(1大床)", price:0, qty:0, unit:"", pay:"信用卡", note:"公司刷卡，不走領隊現金" },
  { id:"k05", day:2, t:"05:00", cat:"活動", slot:"",       vendor:"阿里山加成遊園車",   name:"日出包車",                   price:4500, qty:2,  unit:"台", pay:"現金" },
  { id:"k06", day:2, t:"06:00", cat:"其它", slot:"",       vendor:"領隊",               name:"日出點心（領隊現場購買）",   price:50,   qty:24, unit:"人", pay:"現金" },
  { id:"k07", day:2, t:"13:00", cat:"餐廳", slot:"午餐",   vendor:"FKUO山芙蓉茶業",     name:"餐標 600/人",                price:600,  qty:24, unit:"人", pay:"現金" },
  { id:"k08", day:2, t:"14:30", cat:"活動", slot:"",       vendor:"林園製茶",           name:"茶席體驗＋導覽（需求老闆講解）", price:500, qty:24, unit:"人", pay:"現金" },
  { id:"k09", day:2, t:"15:00", cat:"餐廳", slot:"下午茶", vendor:"愛山屋野生愛玉專賣店", name:"愛玉",                     price:0,    qty:24, unit:"人", pay:"現金", note:"Budget 表單價空白，現場實報實銷" },
  { id:"k10", day:2, t:"15:00", cat:"餐廳", slot:"下午茶", vendor:"百年檜木甜甜圈",     name:"甜甜圈",                     price:0,    qty:24, unit:"人", pay:"現金", note:"Budget 表單價空白，現場實報實銷" },
  { id:"k11", day:2, t:"16:20", cat:"團房", slot:"",       vendor:"阿里山英迪格酒店",   name:"房型(標準雙人房)／床型(1大床)", price:0, qty:0, unit:"", pay:"信用卡", note:"公司刷卡，不走領隊現金" },
  { id:"k12", day:2, t:"20:00", cat:"團房", slot:"",       vendor:"梅園樓觀景飯店",     name:"雙床（含早）",               price:3780, qty:1,  unit:"間", pay:"銀存轉帳", grp:"g_meiyuan" },
  { id:"k13", day:2, t:"20:00", cat:"團房", slot:"",       vendor:"梅園樓觀景飯店",     name:"雙床（含早）",               price:3780, qty:3,  unit:"間", pay:"銀存轉帳", grp:"g_meiyuan" },
  { id:"k14", day:3, t:"11:00", cat:"活動", slot:"",       vendor:"優遊吧斯阿里山鄒族文化部落", name:"門票（雄獅專案價）",  price:100,  qty:24, unit:"人", pay:"現金", grp:"g_yuyu_tkt" },
  { id:"k15", day:3, t:"11:00", cat:"活動", slot:"",       vendor:"優遊吧斯阿里山鄒族文化部落", name:"品茗",                price:100,  qty:24, unit:"人", pay:"現金", grp:"g_yuyu_tkt" },
  { id:"k16", day:3, t:"12:30", cat:"活動", slot:"午餐",   vendor:"優遊吧斯阿里山鄒族文化部落", name:"合菜（需求 20 人坐包廂）", price:6000, qty:2, unit:"桌", pay:"現金", grp:"g_yuyu_meal" },
  { id:"k17", day:3, t:"12:30", cat:"活動", slot:"午餐",   vendor:"優遊吧斯阿里山鄒族文化部落", name:"飲料（一茶一果）",    price:60,   qty:4,  unit:"瓶", pay:"現金", grp:"g_yuyu_meal" },
  { id:"k18", day:3, t:"12:30", cat:"活動", slot:"午餐",   vendor:"優遊吧斯阿里山鄒族文化部落", name:"另外 4 位餐費",       price:600,  qty:4,  unit:"人", pay:"現金", grp:"g_yuyu_meal" },
  { id:"k19", day:3, t:"",      cat:"其它", slot:"",       vendor:"領隊",               name:"【司機差旅費】$2,500/天",    price:2500, qty:2,  unit:"天", pay:"現金", grp:"g_misc" },
  { id:"k20", day:3, t:"",      cat:"其它", slot:"",       vendor:"領隊",               name:"【停車費】實報實銷",         price:500,  qty:2,  unit:"天", pay:"現金", grp:"g_misc" },
  { id:"k21", day:3, t:"",      cat:"其它", slot:"",       vendor:"領隊",               name:"【司機誤餐費】D1 午",        price:150,  qty:1,  unit:"人", pay:"現金", grp:"g_misc" },
  { id:"k22", day:3, t:"",      cat:"其它", slot:"",       vendor:"領隊",               name:"【礦泉水】$120/箱（雄獅車不用給）", price:120, qty:3, unit:"箱", pay:"現金", grp:"g_misc" },
  { id:"k23", day:3, t:"",      cat:"其它", slot:"",       vendor:"領隊",               name:"【零用金】$3,000×3 天",      price:9000, qty:1,  unit:"團", pay:"現金", grp:"g_misc" },
];
BUDGET_ITEMS.forEach(b=>{ b.budget = b.price*b.qty; });
const BUDGET_CATS = ["餐廳","活動","團房","其它"];
const BUDGET_PAYS = ["現金","信用卡","銀存轉帳"];

/* 行程（作業手冊「行程細流」＋「Rundown」工作分派） */
let ITIN = {
  1: [
    { t:"05:30", title:"領取早餐（阜杭豆漿）", desc:"招牌厚餅夾蛋＋豆漿（品項待確認）。",
      staff:["領隊前往阜杭豆漿領取早餐","董辦準備早餐提袋，需 20 個雄獅小紅袋"], links:[["vendors:v_fuhang","阜杭豆漿 資訊"]] },
    { t:"06:10", title:"台北車站 集合出發", desc:"集合報到、發送早餐及高鐵車票。",
      staff:["領隊：集合報到、發送早餐及車票","冠廷：聯絡行李車司機（西1門上行李）","采欣＋Eunice：收取貴賓行李放上行李車","冠廷隨行李車一同前往嘉義"],
      links:[["roster","點名報到"],["seats:hsr","高鐵座位表"],["luggage","行李點收"]] },
    { t:"06:30", title:"高鐵 0203 台北 → 嘉義", desc:"06:30 台北發車，07:20 台中（柳教授、村煌董上車），07:43 抵嘉義。商務 6 車、經濟 5 車。",
      links:[["seats:hsr","高鐵座位表"]] },
    { t:"08:00", title:"專車前往北門車站", desc:"嘉義高鐵站出站上巴士（43 客座大巴、四排椅），08:40 抵達。車上備福森保溫瓶溫水＋每日一箱紙盒水。",
      staff:["村煌董安排導覽（待確認）"], links:[["seats:bus","遊覽車座位表"]] },
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
      staff:["冠廷：行李、入房禮請飯店放入房","冠廷：前往神木廳放置桌牌"], links:[["luggage","行李點收"]] },
    { t:"16:30", title:"阿里山賓館 Check-in", desc:"16:30–16:45 辦理入住【現代館】。行李服務每件 $50／單趟。",
      links:[["rooms","分房表"],["luggage","行李點收"]] },
    { t:"18:00", title:"晚餐 · 神木廳（大包廂）", desc:"最多 22 位、2,280/人。合菜，餐廳已安排分菜。開席時間待確認。",
      staff:["巴黎（陳婉如）與岳聰總坐外面"], links:[["meals","餐食・分桌"]] },
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
      staff:["冠廷：前往小山霂茗擺桌牌"], links:[["meals","餐食・分桌"]] },
    { t:"14:30", title:"小山霂茗 · 導覽＋茶席體驗", desc:"14:30–16:00。老闆親自接待，每桌 7 人分 3–4 桌、每桌安排一位茶師。",
      staff:["冠廷：前往阿里山英迪格確認行李入房"], links:[["roster","點名報到"]] },
    { t:"16:00", title:"魏董伉儷 離團返北", desc:"茶席後專車送嘉義高鐵站，672車次 嘉義18:32→台北19:59。",
      staff:["元榮：送魏董及夫人上九人座（行李需自大巴取下）"], links:[["consent","離隊切結"]] },
    { t:"16:20", title:"阿里山英迪格酒店 Check-in", desc:"16:20–16:30 辦理入住，全體人員住館內。",
      links:[["rooms","分房表"],["luggage","行李點收"]] },
    { t:"18:30", title:"晚餐 · HUFU氛饗亭（宴會廳C）", desc:"HUFU 套餐（菜單調整中）。",
      staff:["冠廷：前往餐廳擺桌牌"], links:[["meals","餐食・分桌"]] },
  ],
  3: [
    { t:"07:00", title:"早餐 · 粟餐廳（1F）", desc:"07:00–10:30。", links:[] },
    { t:"09:00", title:"飯店設施 或 龍銀山步道", desc:"自選活動。", links:[] },
    { t:"10:30", title:"行李上行李車", desc:"行李車路線：英迪格 → 台北車站（台中、桃園點無法停靠）。",
      staff:["冠廷：村煌董、柳教授行李上大巴（台中下車）"], links:[["luggage","行李點收"]] },
    { t:"11:00", title:"優遊吧斯 鄒族文化部落", desc:"11:00–14:30 用餐＋品茗＋表演（800/人）。是否品茗待確認（與小山霂茗類似）。伴手禮：優遊吧斯周邊商品，客製包裝。",
      links:[["meals","餐食・分桌"]] },
    { t:"14:30", title:"梅園樓觀景飯店（公司場域）", desc:"14:30–15:00 貴賓茶敘。行程與岳聰總確認中。", links:[["vendors:v_meiyuan","梅園樓 資訊"]] },
    { t:"16:30", title:"嘉義高鐵站", desc:"發放回程點心：piepiya 麵包＋飲品（裝袋，數量／口味待確認）。",
      staff:["采欣＋Eunice：台北車站接送行李車"],
      links:[["roster","點名報到"],["seats:hsr","高鐵座位表"],["luggage","行李點收"]] },
    { t:"17:08", title:"高鐵 0664 嘉義 → 台北", desc:"17:08 嘉義發車，17:30 台中（柳教授、村煌董下車），18:33 抵台北，溫馨賦歸。",
      links:[["seats:hsr","高鐵座位表"]] },
  ],
};

/* 行李車路線（作業手冊「代辦事項」） */
let LUGGAGE_ROUTE = {
  1:"台北車站（西1門上行李）→ 阿里山賓館　｜　冠廷隨車、采欣＋Eunice 台北車站收行李",
  2:"阿里山賓館 → 阿里山英迪格　｜　魏董伉儷行李改放遊覽車（當日離團）、戴董行李由九人座送英迪格",
  3:"阿里山英迪格 → 台北車站（台中、桃園點無法停靠）　｜　村煌董、柳教授行李上大巴",
};

const DOC_ROWS = [
  { id:"overview", name:"交班總覽" },
  { id:"receipt",  name:"收件一覽表" },
  { id:"ticket",   name:"開票名單" },
  { id:"pnr",      name:"PNR" },
  { id:"insurance",name:"保單" },
  { id:"contract", name:"合約書" },
  { id:"seatimgs", name:"座位／分桌圖檔", hint:"圖片可直接開啟手寫註記" },
  { id:"advance",  name:"預支表", hint:"圖片可註記填寫" },
  { id:"other",    name:"其他交班文件" },
];

const FUNCS = [
  ["itin",   "route",  "行程表"],
  ["roster", "team",   "團體大表"],
  ["seats",  "seat",   "高鐵座位圖"],
  ["fusen",  "train",  "福森號座位"],
  ["rooms",  "bed",    "分房表"],
  ["meals",  "meal",   "餐食・分桌"],
  ["vendors","phone",  "店家聯絡"],
  ["coffee", "cup",    "咖啡點餐"],
  ["luggage","lug",    "行李點收"],
  ["docs",   "folder", "交班文件"],
  ["budget", "coin",   "預算表"],
  ["optin:sunrise","sunrise","日出名單"],
  ["ink",    "pen",    "手寫備註"],
];

const ROSTER_FIELDS = [
  ["orderNo","訂單編號"],["idNo","身分證號"],["en","英文名"],["birth","生日"],
  ["tkt","高鐵票種"],["pnr","訂位代號"],["meal","特殊餐食"],["note","備註"],
];


/* 高鐵車次（原本在座位圖區，因可編輯資料層載入時要讀，移到這裡） */
let HSR_TRAINS = {
  1:[{ no:"0203", route:"台北 06:30 → 台中 07:20 → 嘉義 07:43", dir:"南下", key:"hsrGo", cars:[6,5] }],
  2:[{ no:"0609", route:"台北 07:46 → 嘉義 09:13", dir:"南下", cars:[6], tag:"戴董南下加入", key:"hsr609" },
     { no:"0672", route:"嘉義 18:32 → 台中 18:58 → 台北 19:59", dir:"北上", cars:[6], tag:"魏董伉儷、柳董提前返北",
       fixed:{ "6車 3D":"p03", "6車 3E":"p04", "6車 4A":"p13" }, tbc:["6車 4A"] }],
  3:[{ no:"0664", route:"嘉義 17:08 → 台中 17:30 → 台北 18:33", dir:"北上", key:"hsrBack", cars:[6,5],
       unused:{ "6車 8C":"04420933 已訂・柳董改搭 672" } }],
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
    itin:ITIN_SEED, luggageRoute:LUGGAGE_ROUTE_SEED, hsrTrains:HSR_TRAINS_SEED, _seatVer:3, _menuVer:1, _budgetVer:1, _tourVer:2,
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
  if((S.data._tourVer||0)<2){
    const st=(ITIN[2]||[]).find(x=>x.title==="自選 · 祝山日出");
    if(st){ st.links=(st.links||[]).filter(l=>l[0]!=="roster"); if(!st.links.some(l=>l[0]==="optin:sunrise")) st.links.unshift(["optin:sunrise","日出名單"]); }
    S.data._tourVer=2;
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
    fields:{orderNo:true,idNo:true,en:true,birth:true,tkt:true,pnr:true,meal:true,note:true},
    roll:{1:{},2:{},3:{}}, notes:{}, orders:{}, lug:{}, sigs:[], budgetFinal:{}, budgetDeposit:{}, budgetNote:{}, vconf:{}, optin:{},
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
/* Safari 以 file:// 開啟時會封鎖 IndexedDB，改用記憶體備援（當次開啟有效） */
let idb=null;
const MEM={files:new Map(),photos:new Map(),state:new Map(),backups:new Map(),sigs:new Map()};
let memMode=false;
function idbOpen(){
  return new Promise(res=>{
    let done=false;
    const finish=(useMem)=>{ if(done) return; done=true; memMode=useMem; res(); };
    let rq;
    try{ rq = indexedDB.open("tle920", 2); }
    catch(e){ console.warn("IndexedDB 不可用，改用記憶體模式",e); return finish(true); }
    rq.onupgradeneeded = e=>{
      const db=e.target.result;
      if(!db.objectStoreNames.contains("files"))   db.createObjectStore("files",{keyPath:"id"});
      if(!db.objectStoreNames.contains("photos"))  db.createObjectStore("photos",{keyPath:"id"});
      /* v2 新增：狀態主檔、滾動備份、電子簽名 */
      if(!db.objectStoreNames.contains("state"))   db.createObjectStore("state",{keyPath:"id"});
      if(!db.objectStoreNames.contains("backups")) db.createObjectStore("backups",{keyPath:"id"});
      if(!db.objectStoreNames.contains("sigs"))    db.createObjectStore("sigs",{keyPath:"id"});
    };
    rq.onsuccess=()=>{ idb=rq.result; finish(false); };
    rq.onerror=()=>{ console.warn("IndexedDB 開啟失敗，改用記憶體模式"); finish(true); };
    rq.onblocked=()=>finish(true);
    setTimeout(()=>finish(true),2500);   /* 逾時保護：確保畫面一定會出來 */
  });
}
const idbPut=(st,v)=>new Promise((res,rej)=>{
  if(memMode||!idb){ MEM[st].set(v.id,v); return res(); }
  try{ const t=idb.transaction(st,"readwrite"); t.objectStore(st).put(v); t.oncomplete=res; t.onerror=()=>rej(t.error); }
  catch(e){ memMode=true; MEM[st].set(v.id,v); res(); }
});
const idbGet=(st,id)=>new Promise((res,rej)=>{
  if(memMode||!idb) return res(MEM[st].get(id)||null);
  try{ const rq=idb.transaction(st).objectStore(st).get(id); rq.onsuccess=()=>res(rq.result||null); rq.onerror=()=>rej(rq.error); }
  catch(e){ memMode=true; res(MEM[st].get(id)||null); }
});
const idbAll=st=>new Promise((res,rej)=>{
  if(memMode||!idb) return res([...MEM[st].values()]);
  try{ const rq=idb.transaction(st).objectStore(st).getAll(); rq.onsuccess=()=>res(rq.result||[]); rq.onerror=()=>rej(rq.error); }
  catch(e){ memMode=true; res([...MEM[st].values()]); }
});
const idbDel=(st,id)=>new Promise((res,rej)=>{
  if(memMode||!idb){ MEM[st].delete(id); return res(); }
  try{ const t=idb.transaction(st,"readwrite"); t.objectStore(st).delete(id); t.oncomplete=res; t.onerror=()=>rej(t.error); }
  catch(e){ memMode=true; MEM[st].delete(id); res(); }
});
const idbClear=st=>new Promise((res,rej)=>{
  if(memMode||!idb){ MEM[st].clear(); return res(); }
  try{ const t=idb.transaction(st,"readwrite"); t.objectStore(st).clear(); t.oncomplete=res; t.onerror=()=>rej(t.error); }
  catch(e){ memMode=true; MEM[st].clear(); res(); }
});

/* ============================================================ SHELL */
const $=s=>document.querySelector(s);
function toast(msg){
  const t=$("#toast"); t.textContent=msg; t.classList.add("on");
  clearTimeout(t._h); t._h=setTimeout(()=>t.classList.remove("on"),1900);
}
const NAVS=[["home","home","首頁"],["lead","flag","帶團中"]];
function goTab(t){ S.tab=t; S.page=null; save(); render(); }
function goPage(p){
  if(p&&p.startsWith("vendors:")){ openVendorModal(p.slice(8)); return; }
  if(p&&p.includes(":")){ const [a,b]=p.split(":"); S.page=a; if(a==="seats") S.seatTab=b; if(a==="optin") S.optKey=b; }
  else S.page=p;
  S.tab="lead"; save(); render();
}
function render(){
  bindData();
  document.body.classList.toggle("emode", !!S.editMode);
  document.body.classList.toggle("wide-page", S.tab==="lead"&&((S.page==="seats"&&S.seatTab==="hsr")||S.page==="budget"));
  EDIT_HANDLER=null;
  if(!NAVS.some(n=>n[0]===S.tab)) S.tab="lead";
  if(S.page==="tables") S.page="meals";
  const nav=$("#nav");
  nav.innerHTML=NAVS.map(([id,icn,lb])=>`<button class="nitem${S.tab===id?" on":""}" data-t="${id}">
    <span class="nic">${ic(icn,19)}</span>${lb}</button>`).join("");
  nav.querySelectorAll(".nitem").forEach(b=>b.onclick=()=>goTab(b.dataset.t));
  const hdr=$("#hdr"), scr=$("#screen");
  scr.innerHTML=""; hdr.innerHTML="";
  if(S.tab==="lead"&&S.page){ PAGES[S.page](hdr,scr); }
  else if(S.tab==="lead"){ renderLead(hdr,scr); }
  else if(S.tab==="home"){ renderHome(hdr,scr); }
  else{ renderStub(hdr,scr); }
  updateSaveBar();
  scr.scrollTop=0;
}
function hbar(hdr,title,{back=false,dark=false}={}){
  hdr.innerHTML=`<div class="hbar${dark?" dark":""}">
    <div class="hleft">${back?`<button class="backbtn">${ic("back",16)}</button>`:""}</div>
    <div class="htitle">${esc(title)}</div>
    <div class="hright">
      <button class="iconbtn editToggle${S.editMode?" on":""}" title="編輯模式">${ic("pen",19)}</button>
      <button class="iconbtn" style="color:var(--red)">${ic("live",19)}</button></div>
  </div>`;
  const bk=hdr.querySelector(".backbtn");
  if(bk) bk.onclick=()=>goPage(null);
  hdr.querySelector(".editToggle").onclick=()=>{
    S.editMode=!S.editMode; save(); render();
    toast(S.editMode?"編輯模式：點卡片上的 ✎ 修改，＋ 新增":"已離開編輯模式");
  };
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

/* 編輯模式工具列：＋新增、還原預設。只在編輯模式顯示（CSS 控制） */
function editBar(parent, {add, addLabel="新增", reset, resetLabel="還原此頁預設"}={}){
  const bar=document.createElement("div");
  bar.className="editbar editonly";
  bar.innerHTML=`<span class="ebl">${ic("pen",13)} 編輯模式</span>
    ${add?`<button class="btn pri" data-a="add">＋ ${esc(addLabel)}</button>`:""}
    ${reset?`<button class="btn sec" data-a="reset">${esc(resetLabel)}</button>`:""}`;
  const a=bar.querySelector('[data-a="add"]');   if(a) a.onclick=add;
  const r=bar.querySelector('[data-a="reset"]'); if(r) r.onclick=()=>confirmBox(`${resetLabel}？這一頁改過的內容會被覆蓋。`,()=>{ reset(); dataChanged("已還原預設"); });
  parent.prepend(bar);
}
let EDIT_HANDLER=null;   /* 每頁 render 時設定；#screen 上的委派會呼叫它 */
const ebtn = (key,inline)=>`<button class="ebtn${inline?" inl":""}" data-e="${esc(key)}" title="編輯">${ic("pen",13)}</button>`;
/* 上下移動：行程節點這種有順序的清單用 */
function moveItem(arr,i,dir){ const j=i+dir; if(j<0||j>=arr.length) return false; [arr[i],arr[j]]=[arr[j],arr[i]]; return true; }

/* ---- 各頁面共用的欄位描述 ---- */
const GROUP_OPTS=["貴賓","雄獅主管","工作人員"];
const PAX_FIELDS=[
  {k:"name",label:"姓名",required:true},{k:"rel",label:"稱謂／職稱",ph:"董事、董事長夫人…"},
  {k:"en",label:"英文名"},{k:"group",label:"分組",type:"select",opts:GROUP_OPTS},
  {k:"days",label:"在團日",type:"days"},{k:"table",label:"分桌",type:"select",opts:[[0,"不分桌"],[1,"第 1 桌"],[2,"第 2 桌"]]},
  {k:"idNo",label:"身分證號"},{k:"birth",label:"生日",ph:"1953/02/26"},{k:"tkt",label:"高鐵票種",ph:"商務・敬老"},
  {k:"hsrGo",label:"高鐵去程座位",ph:"6車 17A"},{k:"hsrBack",label:"高鐵回程座位",ph:"6車 6A"},
  {k:"pnrGo",label:"去程訂位代號"},{k:"pnrBk",label:"回程訂位代號"},
  {k:"trainSeat",label:"福森號座位",ph:"5車 1號"},
  {k:"board",label:"台中上／下車",type:"select",opts:[["","否"],["台中","台中"]]},
  {k:"meal",label:"特殊餐食",ph:"忌生食／海鮮…"},{k:"note",label:"備註",type:"textarea",rows:2},
];
const linkOpts=()=>FUNCS.map(([id,,lb])=>[id,lb])
  .concat([["seats:hsr","高鐵座位表"],["seats:bus","遊覽車座位表"],["consent","離隊切結"],["storage","資料保全"]])
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
  {k:"pay",label:"付款方式",type:"select",opts:BUDGET_PAYS},{k:"grp",label:"合併小計代碼",ph:"同一張單的項目填相同代碼，例 g_yuyu_meal"},
  {k:"note",label:"備註",type:"textarea",rows:2},
];
const TOUR_FIELDS=[
  {k:"code",label:"團號"},{k:"name",label:"標準團名"},{k:"sub",label:"副標（行程名）",type:"textarea",rows:2},{k:"ctrl",label:"團控說明"},{k:"seats",label:"團位／HL／可賣"},{k:"dateTxt",label:"出團日"},
  {k:"leader",label:"領隊"},{k:"rc",label:"RC"},{k:"tp",label:"TP"},{k:"op",label:"OP"},
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
    body.innerHTML=`<span class="mchip">9月 <span style="color:#E60012">2026</span></span>
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
    <div class="ttop"><span class="pill redln">共 ${TOUR.days} 天</span><span style="display:flex;gap:8px;align-items:center">${ebtn("tour",true)}<span id="dlSlot"></span></span></div>
    <div class="trow"><span class="k">出團日</span><span class="v">${TOUR.dateTxt}</span></div>
    <div class="trow"><span class="k">團號</span><span class="v">${TOUR.code}</span></div>
    <div class="trow"><span class="k">團名</span><span class="v">${esc(TOUR.name)}${TOUR.sub?`<span style="display:block;font-size:11.5px;font-weight:500;color:var(--ink2);line-height:1.5">${esc(TOUR.sub)}</span>`:""}</span></div>
    ${TOUR.ctrl?`<div class="trow"><span class="k">團控</span><span class="v">${esc(TOUR.ctrl)}${TOUR.seats?`<span style="display:block;font-size:11.5px;font-weight:500;color:var(--ink2)">${esc(TOUR.seats)}</span>`:""}</span></div>`:""}
    <div class="trow"><span class="k">領　隊</span><span class="v">${esc(TOUR.leader)}</span></div>
    <div class="trow"><span class="k">旅客名單</span><span class="v">${GUESTS().length}人 / ${done}人 <span style="color:var(--ink3);font-size:11px;font-weight:400">(KK/已報到)</span>　<span class="pill gray">工作人員 ${PAX.length-GUESTS().length}</span></span></div>
  </div>
  <div class="fgrid">${FUNCS.map(([id,icn,lb])=>`
    <button class="fbtn" data-p="${id}"><span class="fic">${ic(icn,28)}</span><span class="flb">${lb}</span></button>`).join("")}
  </div>
  <div class="collapse"><span id="rcToggle" style="cursor:pointer">RC/TP/OP ⌄</span><span class="qlink" id="qlink">Q 信箱</span></div>
  <div class="rcbox" id="rcbox" style="display:none">
    RC　${esc(TOUR.rc)}<br>TP　${esc(TOUR.tp)}<br>OP　${esc(TOUR.op)}
  </div>
  <div class="endmark">— 已經到底了 —</div>
  <div class="blacktoast" id="dlHint">${ic("dl",15)} 建議下載離線資料，帶團更安心</div>
  <div class="setlink" id="setLink">設定 · 資料保全（備份／還原）</div>`;
  scr.appendChild(el);
  EDIT_HANDLER=()=>editForm("團資料",TOUR_FIELDS,TOUR,{onSave:o=>{ Object.assign(TOUR,o); dataChanged("已儲存"); }});
  el.querySelectorAll(".fbtn").forEach(b=>b.onclick=()=>goPage(b.dataset.p));
  el.querySelector("#qlink").onclick=()=>goPage("qmail");
  el.querySelector("#setLink").onclick=()=>goPage("settings");
  el.querySelector("#rcToggle").onclick=()=>{
    const bx=el.querySelector("#rcbox");
    bx.style.display = bx.style.display==="none"?"block":"none";
  };
  renderDlBtn(el.querySelector("#dlSlot"), el.querySelector("#dlHint"));
}

/* --- 下載離線資料 --- */
function renderDlBtn(slot,hint){
  const st=S.dl.status;
  if(st==="busy"){
    slot.innerHTML=`<button class="dlbtn busy" disabled><span class="mini"></span> 下載中</button>`;
    if(hint) hint.style.display="none";
    return;
  }
  if(st==="done"){
    slot.innerHTML=`<button class="dlbtn">${ic("cloudok",14)} 下載離線資料</button>`;
    if(hint) hint.style.display="none";
    slot.querySelector("button").onclick=()=>{
      confirmBox("已有下載資料，是否要重新下載？",()=>startDl(slot,hint));
    };
    return;
  }
  slot.innerHTML=`<button class="dlbtn">${ic("dl",14)} 下載離線資料</button>`;
  slot.querySelector("button").onclick=()=>startDl(slot,hint);
}
function startDl(slot,hint){
  S.dl.status="busy"; save(); renderDlBtn(slot,hint);
  setTimeout(async ()=>{
    try{
      if("caches" in window){ const c=await caches.open("tle920-v3");
        await c.addAll(["./","./index.html","./app.js","./manifest.json","./icon.png"]).catch(()=>{}); }
    }catch(e){}
    S.dl.status="done"; S.dl.ts=Date.now(); save();
    renderDlBtn(slot,hint); toast("下載完成");
  },1600);
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
    d.innerHTML=`<div class="card">${ebtn(String(i))}
      <div class="head"><span class="time">${esc(st.t)}</span><span class="title">${esc(st.title)}</span></div>
      ${st.desc?`<div class="desc">${esc(st.desc)}</div>`:""}
      ${st.staff&&st.staff.length?`<div class="staffbox"><div class="sh">工作事項</div>${st.staff.map(x=>`<div class="si">${esc(x)}</div>`).join("")}</div>`:""}
      ${links?`<div class="links">${links}</div>`:""}</div>`;
    d.querySelectorAll(".chip").forEach(ch=>ch.onclick=()=>goPage(ch.dataset.v));
    tl.appendChild(d);
  });
  editBar(el,{add:()=>editStop(null),addLabel:"新增節點",reset:()=>{ ITIN[S.day]=buildSeed().itin[S.day]||[]; },resetLabel:"還原本日行程"});
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
  cks.innerHTML=ROSTER_FIELDS.map(([k,lb])=>`<span class="fck${S.fields[k]?" on":""}" data-k="${k}">
    <span class="ckbox">${S.fields[k]?"✓":""}</span>${lb}</span>`).join("");
  cks.querySelectorAll(".fck").forEach(f=>f.onclick=()=>{ S.fields[f.dataset.k]=!S.fields[f.dataset.k]; save(); render(); });
  scr.appendChild(cks);
  const el=document.createElement("div");
  el.className="pagepad";
  let lastGroup="";
  const ORDER={"貴賓":0,"雄獅主管":1,"工作人員":2};
  const sorted=[...PAX].sort((a,b)=>ORDER[a.group]-ORDER[b.group]);
  el.innerHTML=sorted.map(p=>{
    const rows=[];
    if(S.fields.orderNo) rows.push(["訂單編號",p.orderNo]);
    rows.push(["中文姓名",`<b>${esc(p.name)}</b>　<span class="pill gray">${esc(p.rel)}</span>`]);
    if(S.fields.en&&p.en)   rows.push(["英文名",p.en]);
    if(S.fields.idNo) rows.push(["身分證號",p.idNo]);
    if(S.fields.birth)rows.push(["生日",p.birth]);
    if(S.fields.tkt)  rows.push(["高鐵票種",p.tkt]);
    if(S.fields.pnr)  rows.push(["訂位代號",`去 ${p.pnrGo}　回 ${p.pnrBk}`]);
    if(S.fields.meal) rows.push(["特殊餐食",p.meal?`<span class="pill amber">${esc(p.meal)}</span>`:"—"]);
    if(S.fields.note) rows.push(["備註",p.note?esc(p.note):"—"]);
    const gh = p.group!==lastGroup ? `<h3 class="sect">${p.group}</h3>` : "";
    lastGroup=p.group;
    return gh+`<div class="reccard">${ebtn(p.id)}${rows.map(([k,v])=>`<div class="rr"><span class="k">${k}</span><span class="v">${v}</span></div>`).join("")}</div>`;
  }).join("");
  editBar(el,{add:()=>editPax(null),addLabel:"新增旅客",reset:()=>resetSection("pax"),resetLabel:"還原預設名單"});
  EDIT_HANDLER=id=>editPax(pax(id));
  scr.appendChild(el);
}

function rosterRoll(scr){
  dayPills(scr);
  const bar=document.createElement("div");
  bar.className="rollbar";
  bar.innerHTML=`<span style="font-size:12.5px;color:var(--ink2);font-weight:600">點名對象：貴賓＋雄獅主管（工作人員不計）</span>
    <button class="redo">${ic("refresh",14)} 重新點名</button>`;
  bar.querySelector(".redo").onclick=()=>confirmBox(`重新點名將清空第 ${S.day} 天所有已到紀錄，確定？`,()=>{
    S.roll[S.day]={}; save(); render(); toast(`第 ${S.day} 天已重新點名`);
  });
  scr.appendChild(bar);
  const rec=S.roll[S.day];
  const el=document.createElement("div");
  el.className="pagepad";
  const seatOfDay=p=> S.day===3?p.hsrBack:(S.day===1?p.hsrGo:p.trainSeat);
  GUESTS().forEach(p=>{
    const inDay=p.days.includes(S.day);
    const ck=!!rec[p.id];
    const card=document.createElement("div");
    card.className="rollcard";
    if(!inDay) card.style.opacity=".5";
    card.innerHTML=`<div class="top">
      <div class="fields">
        <div class="rr"><span class="k">姓名</span><span class="v">${esc(p.name)} <span class="pill gray">${esc(p.rel)}</span>
          ${p.meal?` <span class="pill amber">${esc(p.meal)}</span>`:""}</span></div>
        <div class="rr"><span class="k">本日座位</span><span class="v"><span class="pill gray">${esc(seatOfDay(p))}</span> <span class="pill gray">${esc(p.tkt)}</span></span></div>
        ${p.note?`<div class="rr"><span class="k">備註</span><span class="v" style="font-weight:500;color:var(--ink2)">${esc(p.note)}</span></div>`:""}
      </div>
      ${ebtn(p.id,true)}
      ${inDay?`<span class="arrived${ck?" on":" no"}"><span class="ckbox">${ck?"✓":""}</span>${ck?"已到":"未到"}</span>`
        :`<span class="pill gray">本日未在團</span>`}
    </div>
    ${inDay?`<input class="noteinp" placeholder="筆記：例：需輪椅、靠窗座位…" value="${esc(S.notes[p.id]||"")}">`:""}`;
    if(inDay){
      card.querySelector(".arrived").onclick=()=>{
        if(rec[p.id]) delete rec[p.id]; else rec[p.id]=Date.now();
        save(); render();
      };
      const inp=card.querySelector(".noteinp");
      inp.onclick=e=>e.stopPropagation();
      inp.onchange=()=>{ S.notes[p.id]=inp.value; save(); toast("筆記已存"); };
    }
    el.appendChild(card);
  });
  editBar(el,{add:()=>editPax(null),addLabel:"新增旅客",reset:()=>resetSection("pax"),resetLabel:"還原預設名單"});
  EDIT_HANDLER=id=>editPax(pax(id));
  scr.appendChild(el);
  const act=GUESTS().filter(p=>p.days.includes(S.day));
  const done=act.filter(p=>rec[p.id]).length;
  const sb=document.createElement("div");
  sb.className="statbar";
  sb.innerHTML=`<div class="st">全部<b>${act.length}</b></div>
    <div class="st hot">已到<b>${done}</b></div>
    <div class="st">未到<b>${act.length-done}</b></div>`;
  scr.appendChild(sb);
}

/* ---------- 座位表 ---------- */
PAGES.seats=(hdr,scr)=>{
  hbar(hdr,S.seatTab==="bus"?"遊覽車座位圖":"高鐵座位圖",{back:true});
  const tb=document.createElement("div");
  tb.className="tabbar";
  tb.innerHTML=`<button class="tab" data-t="hsr">🚄 高鐵</button>
    <button class="tab" data-t="bus">🚌 遊覽車</button>`;
  tb.querySelectorAll(".tab").forEach(t=>{
    t.classList.toggle("on",t.dataset.t===S.seatTab);
    t.onclick=()=>{ S.seatTab=t.dataset.t; save(); render(); };
  });
  scr.appendChild(tb);
  if(S.seatTab==="train"){ S.seatTab="hsr"; }
  if(S.seatTab==="hsr") dayPills(scr);
  const el=document.createElement("div");
  el.className="pagepad";
  if(S.seatTab==="hsr"){
    el.classList.add("wide");   /* 座位圖在 iPad 橫放要吃滿寬度才排得下橫式 */
    el.innerHTML=`<div id="seatArea"></div>
      <p class="vs">座位依開票紀錄對位。實際入座以現場票面為準。</p>`;
    scr.appendChild(el);
    const w=el.clientWidth-28;   /* pagepad 兩側各 14 */
    el.querySelector("#seatArea").innerHTML=svgHsr(w);
    el.querySelectorAll(".zw").forEach(zoomify);
    const tc=document.createElement("div"); tc.className="card editonly";
    tc.innerHTML=`<div style="font-weight:800;margin-bottom:8px;font-size:14px">本日車次</div>
      ${(HSR_TRAINS[S.day]||[]).map((t,i)=>`<div class="ordrow"><span class="who">${esc(t.no)}</span><span class="what">${esc(t.route)}${t.tag?"・"+esc(t.tag):""}</span>${ebtn(String(i),true)}</div>`).join("")}`;
    el.prepend(tc);
    editBar(el,{reset:()=>resetSection("hsrTrains"),resetLabel:"還原預設車次"});
    EDIT_HANDLER=i=>{ const t=(HSR_TRAINS[S.day]||[])[+i]; if(!t) return;
      editForm("編輯車次",[{k:"no",label:"車次",required:true},{k:"route",label:"路線／時間"},{k:"dir",label:"方向",type:"select",opts:["南下","北上"]},{k:"tag",label:"標籤"}],
        t,{onSave:o=>{ Object.assign(t,o); dataChanged("已儲存"); }});
    };
  }else{
    el.innerHTML=`<div class="card"><div class="seatwrap" id="seatArea"></div>
      <div class="legend"><span><span class="sw" style="background:#FDECEE;border-color:#E60012"></span>本團座位</span>
      <span><span class="sw"></span>其他座位</span><span>點座位查看貴賓</span></div>
      <p class="vs" style="margin:8px 0 0">座位對應為示意，實際以林鐵配位／現場安排為準。</p></div>`;
    el.querySelector("#seatArea").innerHTML = `<div class="zw">${S.seatTab==="train"?svgTrain():svgBus()}</div>`;
    el.querySelectorAll(".zw").forEach(zoomify);
  }
  el.querySelectorAll(".cartabs .tab").forEach(b=>b.onclick=()=>{ S.hsrCar[b.dataset.tk]=+b.dataset.car; save(); render(); });
  el.querySelectorAll(".seat.mine,.seatg.mine").forEach(s=>s.addEventListener("click",()=>{
    const p=pax(s.dataset.p); if(p) openPaxModal(p);
  }));
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
    : VIP2.includes(p.id)   ? {f:"#E60012",s:"#B8000F",lb:"rgba(255,255,255,.8)",t:"#FFFFFF"}
    : p.group==="貴賓"      ? {f:"#FDECEE",s:"#E60012",lb:"#C00010",t:"#7A000B"}
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
    g+=`<text x="${bodyRect.x+bodyRect.w/2}" y="${H-6}" text-anchor="middle" font-size="10" font-weight="800" fill="#E60012">${south?"◀ ":""}行進方向 · 往${esc(dest)}${south?"":" ▶"}</text>`;
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
  const paint=p=> VIP2.includes(p.id) ? {f:"#E60012",s:"#B8000F",lb:"rgba(255,255,255,.75)",t:"#FFFFFF"}
    : p.group==="貴賓"     ? {f:"#FDECEE",s:"#E60012",lb:"#C00010",t:"#7A000B"}
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
  const icoFire=(x,y)=>`<rect x="${x-4}" y="${y-2}" width="8" height="18" rx="3" fill="#D6001C"/><rect x="${x-2}" y="${y-6}" width="4" height="5" fill="#333"/><path d="M${x+4} ${y+1} q5 0 5 5" stroke="#333" fill="none" stroke-width="1.5"/>`;
  const icoTrash=(x,y)=>`<path d="M${x-6} ${y-3} h12 l-1.5 16 h-9 z" fill="#8E8E93"/><rect x="${x-7}" y="${y-6}" width="14" height="3" rx="1" fill="#8E8E93"/>`;
  const icoAED=(x,y)=>`<path d="M${x} ${y+12} C${x-12} ${y+2} ${x-8} ${y-8} ${x} ${y-2} C${x+8} ${y-8} ${x+12} ${y+2} ${x} ${y+12}z" fill="none" stroke="#D6001C" stroke-width="2"/>
    <path d="M${x+1} ${y-1} l-4 6 h4 l-1 5 l4 -6 h-4z" fill="#D6001C"/><text x="${x}" y="${y-10}" text-anchor="middle" font-size="7" font-weight="800" fill="#333">AED</text>`;
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
    if(arrow) g+=`<text x="${x}" y="${cy+84}" text-anchor="middle" font-size="10.5" font-weight="800" fill="#E60012">${arrow}</text>`;
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
function zoomify(wrap){
  const inner=wrap.firstElementChild; if(!inner||wrap.dataset.zoom) return;
  wrap.dataset.zoom="1"; inner.classList.add("zin");
  let s=1,tx=0,ty=0; const ptrs=new Map(); let pinch=null, drag=null, lastTap=0;
  const apply=()=>{ const W=wrap.clientWidth,H=wrap.clientHeight, cw=inner.clientWidth*s, ch=inner.clientHeight*s;
    tx=cw<=W?0:Math.min(0,Math.max(W-cw,tx)); ty=ch<=H?0:Math.min(0,Math.max(H-ch,ty));
    inner.style.transform=`translate(${tx}px,${ty}px) scale(${s})`; wrap.classList.toggle("zoomed",s>1.01); wrap.style.height=s>1.01?`${inner.clientHeight}px`:""; };
  const zoomAt=(f,cx,cy)=>{ const ns=Math.min(4,Math.max(1,s*f)); f=ns/s; tx=cx-(cx-tx)*f; ty=cy-(cy-ty)*f; s=ns; apply(); };
  const rel=e=>{ const r=wrap.getBoundingClientRect(); return [e.clientX-r.left,e.clientY-r.top]; };
  wrap.addEventListener("pointerdown",e=>{ if(e.target.closest(".zoombar")) return; ptrs.set(e.pointerId,{x:e.clientX,y:e.clientY});
    if(ptrs.size===2){ const [a,b]=[...ptrs.values()]; const r=wrap.getBoundingClientRect();
      pinch={d:Math.hypot(a.x-b.x,a.y-b.y),s0:s,cx:(a.x+b.x)/2-r.left,cy:(a.y+b.y)/2-r.top,tx0:tx,ty0:ty}; drag=null; }
    else if(ptrs.size===1&&s>1){ drag={x:e.clientX,y:e.clientY,tx0:tx,ty0:ty,moved:false}; } });
  const move=e=>{ if(!ptrs.has(e.pointerId)) return; ptrs.set(e.pointerId,{x:e.clientX,y:e.clientY});
    if(pinch&&ptrs.size===2){ const [a,b]=[...ptrs.values()]; const d=Math.hypot(a.x-b.x,a.y-b.y); const r=wrap.getBoundingClientRect();
      const cx=(a.x+b.x)/2-r.left, cy=(a.y+b.y)/2-r.top, ns=Math.min(4,Math.max(1,pinch.s0*d/pinch.d)), f=ns/pinch.s0;
      tx=cx-(pinch.cx-pinch.tx0)*f; ty=cy-(pinch.cy-pinch.ty0)*f; s=ns; apply(); e.preventDefault(); }
    else if(drag&&ptrs.size===1){ const dx=e.clientX-drag.x, dy=e.clientY-drag.y; if(Math.abs(dx)+Math.abs(dy)>4) drag.moved=true; tx=drag.tx0+dx; ty=drag.ty0+dy; apply(); } };
  const up=e=>{ if(!ptrs.has(e.pointerId)) return; ptrs.delete(e.pointerId);
    if(ptrs.size===0){ const now=Date.now(); if(!pinch&&!(drag&&drag.moved)){ if(now-lastTap<320){ const [cx,cy]=rel(e); if(s>1.01){s=1;tx=0;ty=0;apply();} else zoomAt(2,cx,cy); lastTap=0; } else lastTap=now; }
      pinch=null; drag=null; }
    else if(ptrs.size<2) pinch=null; };
  window.addEventListener("pointermove",move,{passive:false}); window.addEventListener("pointerup",up); window.addEventListener("pointercancel",up);
  wrap.addEventListener("wheel",e=>{ if(!e.ctrlKey&&!e.metaKey) return; e.preventDefault(); const [cx,cy]=rel(e); zoomAt(e.deltaY<0?1.15:1/1.15,cx,cy); },{passive:false});
  const bar=document.createElement("div"); bar.className="zoombar";
  bar.innerHTML=`<button data-z="in" title="放大">＋</button><button data-z="out" title="縮小">－</button><button data-z="reset" title="還原">1:1</button>`;
  bar.querySelectorAll("button").forEach(b=>b.onclick=ev=>{ ev.stopPropagation(); if(b.dataset.z==="reset"){s=1;tx=0;ty=0;apply();} else zoomAt(b.dataset.z==="in"?1.4:1/1.4,wrap.clientWidth/2,wrap.clientHeight/2); });
  wrap.appendChild(bar);
}
/* 站名時刻拆成 chip：「台北 06:30 → 台中 07:20 → 嘉義 07:43」 */
function routeChips(route){
  return String(route||"").split("→").map(seg=>{
    const m=seg.trim().match(/^(\S+?)\s*(\d{1,2}:\d{2})?$/);
    return m ? `<span class="st"><b>${esc(m[1])}</b>${m[2]?`<i>${m[2]}</i>`:""}</span>` : `<span class="st"><b>${esc(seg.trim())}</b></span>`;
  }).join(`<span class="arr">→</span>`);
}

function svgHsr(containerW){
  const trains=HSR_TRAINS[S.day]||[];
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
          <div class="zw">${svgCarThsrc(c,map,t)}</div>
          <div class="zoomhint">兩指縮放・放大後可拖曳・雙擊切換</div>
        </div>`).join("")}</div>
    </div>`;
  });
  out+=`<div class="hsrlegend">
    <span><i style="background:#E60012;border-color:#B8000F"></i>董事長伉儷</span>
    <span><i style="background:#FDECEE;border-color:#E60012"></i>貴賓</span>
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
const FUSEN_CARS = {
  /* 依林鐵原廠配置圖：4車 客座車廂（洗手間＋吧檯側桌）、5車 守車車廂（守車室）。
   * 每個 bay 是兩張面對面的座椅夾一張小桌；topBays 上排、botBays 下排。 */
  4:{ name:"客座車廂", seats:16, topBays:4, botBays:4, left:"toilet" },
  5:{ name:"守車車廂", seats:18, topBays:4, botBays:5, left:"guard" },
};
const FUSEN_TRAIN=[["觀景車廂",18],["客座車廂",16],["吧檯車廂",10],["客座車廂",16],["守車車廂",18]];   /* 車頭之後 1→5 車 */

function fusenSeatIndex(){
  const map={};
  PAX.forEach(p=>{
    const m=(p.trainSeat||"").match(/^([45])車\s*(\d+)號$/);
    if(m) map[`${m[1]}-${m[2]}`]=p;
  });
  const t=TRAIN_TL.seat.match(/^([45])車\s*(\d+)號$/);
  if(t) map[`${t[1]}-${t[2]}`]={id:"__tl",name:"薛永南",rel:"領隊",__tl:true};
  return map;
}

/* 整列福森號：車頭＋五節，本團用的兩節標紅 */
function svgFusenTrain(){
  const W=900,H=96, x0=14, locoW=118, carW=136, gap=10;
  let g=`<svg viewBox="0 0 ${W} ${H}" class="fusentrain">`;
  g+=`<g transform="translate(${x0},14)"><rect x="0" y="8" width="${locoW}" height="40" rx="8" fill="#C8102E"/><rect x="6" y="0" width="52" height="16" rx="4" fill="#C8102E"/>
      <rect x="14" y="4" width="14" height="9" rx="2" fill="#F5E4B8"/><rect x="34" y="4" width="14" height="9" rx="2" fill="#F5E4B8"/>
      <rect x="0" y="46" width="${locoW}" height="5" fill="#333"/>${[16,34,84,102].map(cx=>`<circle cx="${cx}" cy="56" r="6" fill="#333"/>`).join("")}
      <text x="${locoW/2}" y="78" text-anchor="middle" font-size="11" font-weight="700" fill="#8A5A20">車頭</text></g>`;
  FUSEN_TRAIN.forEach(([nm,seats],i)=>{
    const x=x0+locoW+gap+i*(carW+gap), mine=(i===3||i===4);
    g+=`<g transform="translate(${x},14)">
      <rect x="0" y="8" width="${carW}" height="40" rx="7" fill="#F5E4B8" stroke="${mine?"#D6001C":"#C9B48C"}" stroke-width="${mine?2.5:1.2}"/>
      <rect x="0" y="8" width="${carW}" height="9" rx="7" fill="#C8102E"/>
      ${[0,1,2,3,4,5].map(k=>`<rect x="${12+k*20}" y="22" width="12" height="12" rx="2" fill="#fff" stroke="#C9B48C"/>`).join("")}
      <rect x="0" y="46" width="${carW}" height="4" fill="#333"/><circle cx="22" cy="55" r="5" fill="#333"/><circle cx="${carW-22}" cy="55" r="5" fill="#333"/>
      <text x="${carW/2}" y="78" text-anchor="middle" font-size="11.5" font-weight="${mine?900:700}" fill="${mine?"#B8001A":"#6B5A3E"}">${i+1}車 ${nm}</text>
      <text x="${carW/2}" y="92" text-anchor="middle" font-size="10" fill="#8A7A62">${seats} 座${mine?"・本團":""}</text>
    </g>`;
  });
  return g+`</svg>`;
}

function svgFusenCar(carNo, map){
  const C=FUSEN_CARS[carNo];
  const W=900, H=262;
  const bodyX=10, bodyR=W-10, wallT=22, wallB=H-22;          /* 車體 */
  const inX=bodyX+12, inR=bodyR-12;
  const leftW = C.left==="guard" ? 96 : 92;                    /* 左側設施寬 */
  const rightW = 104;                                          /* 右側：空調／行李架／觀景陽台 */
  const zoneX=inX+leftW+10, zoneR=inR-rightW;
  const SW=43, SH=52, TBL=16, BAY=SW*2+TBL+6;                  /* 一個 bay：椅＋桌＋椅 */
  const topY=wallT+16, botY=wallB-16-SH;
  const bayXs=(n,x0,x1)=>{ const gap=n>1?(x1-x0-n*BAY)/(n-1):0; return Array.from({length:n},(_,i)=>x0+i*(BAY+gap)); };

  let g=`<svg viewBox="0 0 ${W} ${H}" style="width:100%;max-width:${W}px;height:auto;display:block">
  <defs>
    <pattern id="fsRack${carNo}" width="6" height="6" patternTransform="rotate(45)" patternUnits="userSpaceOnUse"><line x1="0" y1="0" x2="0" y2="6" stroke="#B89B6E" stroke-width="1.6"/></pattern>
  </defs>`;
  /* 車體、地板、窗戶、車門 */
  g+=`<rect x="${bodyX}" y="${wallT-8}" width="${bodyR-bodyX}" height="${wallB-wallT+16}" rx="10" fill="#F5E4B8" stroke="#B89B6E" stroke-width="1.6"/>
      <rect x="${inX}" y="${wallT}" width="${inR-inX}" height="${wallB-wallT}" fill="#F8ECC8"/>`;
  const winXs=[]; for(let x=zoneX-40;x<zoneR+20;x+=70) winXs.push(x);
  winXs.forEach(x=>{ g+=`<rect x="${x}" y="${wallT-8}" width="44" height="6" rx="1.5" fill="#3A3A3E"/><rect x="${x}" y="${wallB+2}" width="44" height="6" rx="1.5" fill="#3A3A3E"/>`; });
  [inX+14, inR-40].forEach(x=>{ g+=`<rect x="${x}" y="${wallT-8}" width="26" height="6" fill="#111"/><rect x="${x}" y="${wallB+2}" width="26" height="6" fill="#111"/>`; });

  /* 左側設施 */
  if(C.left==="toilet"){
    g+=`<rect x="${inX+6}" y="${wallT+8}" width="${leftW-12}" height="64" rx="5" fill="#fff" stroke="#B89B6E"/>
        <ellipse cx="${inX+6+22}" cy="${wallT+36}" rx="9" ry="12" fill="none" stroke="#8A7A62" stroke-width="1.5"/><rect x="${inX+6+18}" y="${wallT+18}" width="8" height="8" rx="2" fill="#8A7A62"/>
        <text x="${inX+6+(leftW-12)/2+8}" y="${wallT+40}" text-anchor="middle" font-size="11" font-weight="700" fill="#6B5A3E">洗手間</text>
        <circle cx="${inX+leftW-18}" cy="${wallT+96}" r="10" fill="#fff" stroke="#8A7A62"/><text x="${inX+leftW-18}" y="${wallT+118}" text-anchor="middle" font-size="9" fill="#8A7A62">洗手台</text>
        <path d="M${inX+6} ${wallB-22} h${leftW+110} v-16 h-30 v-30 h-20 v30 h-${leftW+60} z" fill="#E4CFA0" stroke="#B89B6E" stroke-width="1.2"/>
        <text x="${inX+leftW-6}" y="${wallB-9}" text-anchor="middle" font-size="9" fill="#6B5A3E">吧檯側桌</text>`;
  }else{
    g+=`<rect x="${inX+6}" y="${wallT+8}" width="${leftW-12}" height="${wallB-wallT-16}" rx="5" fill="#fff" stroke="#B89B6E"/>
        <text x="${inX+leftW/2}" y="${(wallT+wallB)/2+4}" text-anchor="middle" font-size="12" font-weight="800" fill="#6B5A3E">守車室</text>
        <rect x="${inX+leftW-16}" y="${(wallT+wallB)/2-14}" width="6" height="28" fill="#B89B6E"/>`;
  }
  /* 右側設施：空調（上）、行李架（下）、觀景陽台（最右） */
  g+=`<rect x="${zoneR+12}" y="${wallT+10}" width="60" height="30" rx="4" fill="#fff" stroke="#B89B6E"/><text x="${zoneR+42}" y="${wallT+29}" text-anchor="middle" font-size="10.5" font-weight="700" fill="#6B5A3E">空調</text>
      <rect x="${zoneR+12}" y="${wallB-52}" width="60" height="42" rx="4" fill="url(#fsRack${carNo})" stroke="#B89B6E"/><rect x="${zoneR+18}" y="${wallB-38}" width="48" height="15" rx="3" fill="#fff" fill-opacity=".9"/><text x="${zoneR+42}" y="${wallB-27}" text-anchor="middle" font-size="9.5" font-weight="700" fill="#6B5A3E">行李架</text>
      <rect x="${inR-22}" y="${wallT+6}" width="14" height="${wallB-wallT-12}" rx="3" fill="#EAD9A8" stroke="#B89B6E"/>
      <text x="${inR-15}" y="${(wallT+wallB)/2}" font-size="10" font-weight="700" fill="#6B5A3E" transform="rotate(90 ${inR-15} ${(wallT+wallB)/2})" text-anchor="middle">觀景陽台</text>`;

  /* 座椅：面對面一組，桌子在中間 */
  const seat=(x,y,no,p,faceRight)=>{
    const tl=p&&p.__tl, vip=p&&VIP2.includes(p.id);
    const fill = vip?"#D6001C" : tl?"#FFE1B0" : p?"#FFFFFF" : "#C8935A";
    const edge = vip?"#B8001A" : tl?"#E8A33C" : p?"#D6001C" : "#A8743E";
    const back = vip?"rgba(255,255,255,.4)" : tl?"#E8A33C" : p?"#D6001C" : "#8F5F2E";
    const nameCol = vip?"#fff":"#3A3226";
    const bx = faceRight ? x : x+SW-7;             /* 椅背在背對桌子那一側 */
    return `<g${p?` style="cursor:pointer"`:""}>
      <rect class="seat${p?" mine":""}" ${p&&!tl?`data-p="${p.id}"`:""} x="${x}" y="${y}" width="${SW}" height="${SH}" rx="7" style="fill:${fill};stroke:${edge};stroke-width:${p?1.6:1}"></rect>
      <rect x="${bx}" y="${y+4}" width="7" height="${SH-8}" rx="3" fill="${back}" pointer-events="none"/>
      <text x="${x+SW/2+(faceRight?3:-3)}" y="${y+13}" text-anchor="middle" font-size="8" font-weight="800" pointer-events="none" fill="${vip?"rgba(255,255,255,.85)":p?"#C0392B":"#F8ECC8"}">${no}</text>
      ${p?`<text x="${x+SW/2+(faceRight?3:-3)}" y="${y+SH/2+8}" text-anchor="middle" font-size="${shortName(p.name).length>=4?9.5:11}" font-weight="800" pointer-events="none" fill="${nameCol}">${esc(shortName(p.name))}</text>`:""}
      ${tl?`<text x="${x+SW/2+3}" y="${y+SH-6}" text-anchor="middle" font-size="7.5" font-weight="800" pointer-events="none" fill="#C77700">領隊</text>`:""}
    </g>`;
  };
  let no=1;
  const botStart = C.left==="toilet" ? zoneX+40 : zoneX;
  [[C.topBays,topY,zoneX,zoneR],[C.botBays,botY,botStart,zoneR]].forEach(([bays,y,x0,x1])=>{
    bayXs(bays,x0,x1).forEach(bx=>{
      const n1=no++, n2=no++;
      g+=seat(bx,y,n1,map[`${carNo}-${n1}`],true);
      g+=`<rect x="${bx+SW+3}" y="${y+10}" width="${TBL}" height="${SH-20}" rx="3" fill="#B07A44" stroke="#8F5F2E"/>`;
      g+=seat(bx+SW+3+TBL+3,y,n2,map[`${carNo}-${n2}`],false);
    });
  });
  /* 走道虛線 */
  g+=`<line x1="${zoneX}" y1="${(topY+SH+botY)/2}" x2="${zoneR}" y2="${(topY+SH+botY)/2}" stroke="#D8C9AC" stroke-width="1.2" stroke-dasharray="5 6"/>`;
  return g+`</svg>`;
}

PAGES.fusen=(hdr,scr)=>{
  hbar(hdr,"福森號座位",{back:true});
  const map=fusenSeatIndex();
  const el=document.createElement("div");
  el.className="pagepad";
  el.innerHTML=`
  <div class="card fusenhero">
    <div style="display:flex;align-items:baseline;gap:8px;flex-wrap:wrap">
      <b style="font-size:16px;color:#8A5A20">阿里山林鐵 · 福森號</b>
      <span class="pill redln">配位 ${Object.keys(map).length} 席</span>
    </div>
    <div style="font-size:12.5px;color:#7A6A52;margin-top:7px;line-height:1.75">
      <b>9/20 A段</b>　北門 → 鹿滿 → 樟腦寮 → 第三景觀台 → 奮起湖 → 多林 → 十字路<br>
      <b>9/21 C段</b>　阿里山 → 二萬坪 → 十字路 → 奮起湖
    </div>
  </div>
  <div class="fusenlegend">
    <span><i style="background:#D6001C;border-color:#B8001A"></i>董事長伉儷</span>
    <span><i style="background:#fff;border-color:#D6001C"></i>本團貴賓</span>
    <span><i style="background:#FFF3E0;border-color:#E8A33C"></i>領隊</span>
    <span><i style="background:#C8935A;border-color:#A8743E"></i>未使用</span>
    <span style="color:var(--ink3)">點座位查看貴賓</span>
  </div>
  <div class="card fusentrainwrap">${svgFusenTrain()}</div>
  <div id="fusenCars"></div>
  <p class="vs">車廂配置依林鐵原廠圖繪製（車頭後 1→5 車：觀景・客座・吧檯・客座・守車）。本團配位 4 車 1–8 號、5 車 1–17 號，實際對號以現場安排為準。</p>`;
  const box=el.querySelector("#fusenCars");
  [4,5].forEach(c=>{
    const C=FUSEN_CARS[c], used=Object.keys(map).filter(k=>k.startsWith(c+"-")).length;
    const d=document.createElement("div");
    d.className="fusencar";
    d.innerHTML=`<div class="fchead">
        <svg viewBox="0 0 28 32" class="fchev"><path d="M20 2 L4 16 L20 30 L26 25 L15 16 L26 7 Z" fill="#D6001C"/></svg>
        <b>${esc(C.name)}</b>
        <span class="fcsub">（${C.seats} 座）· ${c} 車</span>
        <span class="pill ${used?"redln":"gray"}">本團 ${used} 席</span>
      </div><div class="zw">${svgFusenCar(c,map)}</div>`;
    box.appendChild(d);
  });
  el.querySelectorAll(".seat.mine").forEach(s=>s.addEventListener("click",()=>{
    const p=pax(s.dataset.p); if(p) openPaxModal(p);
  }));
  el.querySelectorAll(".zw").forEach(zoomify);
  scr.appendChild(el);
};

function svgTrain(){
  const byCar={4:{},5:{}};
  PAX.forEach(p=>{ const m=(p.trainSeat||"").match(/^([45])車 (\d+)號$/); if(m) byCar[m[1]][+m[2]]=p; });
  const tlm=TRAIN_TL.seat.match(/^([45])車 (\d+)號$/);
  let out=`<div style="font-weight:800;margin-bottom:4px;font-size:13.5px">阿里山林鐵 · 福森號（配位 25 席：24 位＋領隊 1）</div>
  <p class="vs" style="margin:0 0 8px">9/20 A段：北門→鹿滿→樟腦寮→第三景觀台→奮起湖→多林→十字路｜9/21 C段：阿里山→二萬坪→十字路→奮起湖</p>`;
  const CARS=[{car:5,seats:17,label:"第 5 車廂（貴賓 · 1–17號）"},{car:4,seats:8,label:"第 4 車廂（主管 · 1–8號）"}];
  for(const {car,seats,label} of CARS){
    const perRow=Math.min(9,seats);
    const rows=Math.ceil(seats/perRow);
    const w=40+perRow*68, h=26+rows*54;
    out+=`<div style="font-size:12.5px;font-weight:700;color:#8E8E93;margin:10px 0 4px">${label}</div>
    <svg viewBox="0 0 ${w} ${h}" width="${w}" style="max-width:100%">
    <rect x="4" y="4" width="${w-8}" height="${h-8}" rx="20" fill="#FAF7F2" stroke="#C9C9CF" stroke-width="2"/>`;
    for(let no=1;no<=seats;no++){
      const r=Math.floor((no-1)/perRow), c=(no-1)%perRow;
      const isTL = tlm && +tlm[1]===car && +tlm[2]===no;
      const p=byCar[car][no];
      if(isTL){
        const x=26+c*68, y=16+r*54;
        out+=`<rect class="seat mine" x="${x}" y="${y}" width="58" height="42" rx="6" style="fill:#FFF3E0;stroke:#FF9500"></rect>
        <text class="seatlb" x="${x+29}" y="${y+12}">${no}號</text>
        <text class="seatnm" x="${x+29}" y="${y+35}" style="fill:#C77700">領隊</text>`;
      }else{
        out+=seatRect(26+c*68,16+r*54,58,42,`${no}號`,p?p.name:"",p?p.id:null);
      }
    }
    out+=`</svg>`;
  }
  return out;
}
function svgBus(){
  /* 巴士座位（示意，實際依現場安排） */
  const seatOrder=GUESTS().filter(p=>p.days.includes(1));
  const cols=["A","B","C","D"], seatOf={};
  seatOrder.forEach((p,i)=>{ seatOf[`${Math.floor(i/4)+2}${cols[i%4]}`]=p; });
  let svg=`<div style="font-weight:800;margin-bottom:8px;font-size:13.5px">遊覽車（嘉義高鐵站↔北門↔阿里山 接駁）</div>
  <svg viewBox="0 0 720 260" width="720" style="max-width:100%">
  <rect x="4" y="4" width="712" height="252" rx="24" fill="none" stroke="#C9C9CF" stroke-width="2"/>
  <rect x="16" y="14" width="60" height="44" rx="8" fill="#F0F0F2"/><text x="46" y="40" text-anchor="middle" font-size="10" fill="#8E8E93">司機</text>`;
  for(let r=0;r<10;r++) for(let c=0;c<4;c++){
    const label=`${r+1}${cols[c]}`, p=seatOf[label];
    svg+=seatRect(90+r*62,14+c*48+(c>=2?46:0),54,42,label,p?p.name:"",p?p.id:null);
  }
  svg+=`<text x="400" y="130" text-anchor="middle" font-size="10" fill="#B9B9BF">走 道</text></svg>`;
  return svg;
}
function openPaxModal(p){
  const ord=S.orders[p.id];
  openModal(`${p.name} · ${p.rel}`,`
    <div class="field"><label>座位資訊</label>
      <div style="display:flex;gap:6px;flex-wrap:wrap">
        <span class="pill gray">🚄 去程 ${esc(p.hsrGo)}</span>
        <span class="pill gray">🚄 回程 ${esc(p.hsrBack)}</span>
        <span class="pill gray">🚂 福森號 ${esc(p.trainSeat)}</span>
        ${p.table?`<span class="pill gray">🪑 第 ${p.table} 桌</span>`:""}
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
      ${b.notes.length?`<div class="oin">${b.notes.map(t=>`✍️ ${esc(t)}`).join("<br>")}</div>`:""}</div>`; }).join("")
    ||`<span style="color:#8E8E93;font-size:13px">尚無訂單</span>`;
  const total=orders.reduce((s,[,o])=>{ const m=mItem(o.item); return s+(m?+m.price||0:0); },0);
  const el=document.createElement("div");
  el.className="pagepad";
  el.innerHTML=`<div class="coffeehero">${mImg("c_cold")?`<img src="${mImg("c_cold")}" alt="">`:""}
    <div class="t"><span>阿里山林鐵 · 十字路站</span><b>鳴心咖啡 車上預點</b><span>福森號抵站前點好，領隊一通電話下單，到站即取</span></div></div>
  <div class="card"><div class="cardh">📊 下單統計 <span class="pill redln">共 ${orders.length} 杯${total?` · $${total}`:""}</span></div>
    <div class="ordsum">${sum}</div></div>
  <div class="card"><div class="cardh">貴賓點餐 <span class="pill gray">${PAX.filter(p=>p.days.includes(S.day===2?2:1)&&p.group!=="工作人員").length} 位</span></div><div id="ordRows"></div></div>
  <button class="btn sec" id="clearOrd">清空全部訂單</button>
  ${typeof MENU_IMG_CREDIT!=="undefined"?`<p class="imgcredit">品項照片為示意（Flickr CC BY 2.0：${Object.values(MENU_IMG_CREDIT).map(c=>esc(c.by)).join("、")}），非鳴心咖啡實拍。</p>`:""}`;
  const rows=el.querySelector("#ordRows");
  PAX.filter(p=>p.days.includes(S.day===2?2:1)&&p.group!=="工作人員").forEach(p=>{
    const o=S.orders[p.id];
    const r=document.createElement("div");
    r.className="ordrow";
    r.innerHTML=`<span class="who">${esc(p.name)}</span>
      ${o&&mImg(o.item)?`<img class="oith sm" src="${mImg(o.item)}" alt="">`:""}
      <span class="what">${o?`<b>${esc(ordText(o))}</b>${o.note?`<div class="onote">✍️ ${esc(o.note)}</div>`:""}`:"尚未點餐"}</span>
      <button class="btn ${o?"sec":"pri"}" style="padding:6px 13px;font-size:12.5px">${o?"修改":"點餐"}</button>`;
    r.querySelector("button").onclick=()=>openOrderModal(p);
    rows.appendChild(r);
  });
  el.querySelector("#clearOrd").onclick=()=>confirmBox("清空全部咖啡訂單？",()=>{ S.orders={}; save(); render(); toast("訂單已清空"); });
  const mcard=document.createElement("div");
  mcard.className="card editonly";
  mcard.innerHTML=`<div style="font-weight:800;margin-bottom:8px;font-size:14px">菜單品項</div>
    ${MENU.map((m,i)=>`<div class="ordrow"><span class="who">${esc(m.em||"")} ${esc(m.name)}</span><span class="what"><span class="pill gray">${esc(m.temp||"熱")}</span> ${+m.price?`$${+m.price}`:"價格未定"}${m.note?` · ${esc(m.note)}`:""}</span>${ebtn(String(i),true)}</div>`).join("")}`;
  el.insertBefore(mcard, el.querySelector(".card"));
  editBar(el,{add:()=>editMenuItem(null),addLabel:"新增品項",reset:()=>resetSection("menu"),resetLabel:"還原預設菜單"});
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
  hbar(hdr,"餐食・分桌",{back:true});
  dayPills(scr);
  const el=document.createElement("div");
  el.className="pagepad";
  const specials=GUESTS().filter(p=>p.meal);
  const byT={1:0,2:0};
  PAX.forEach(p=>{ if(byT[p.table]!==undefined) byT[p.table]++; });

  el.innerHTML=`
  <h3 class="sect">分桌（全程三天相同）</h3>
  <div class="card">
    <div style="display:flex;gap:7px;flex-wrap:wrap;margin-bottom:10px">
      <span class="pill redln">第 1 桌 · 貴賓 ${byT[1]} 位</span>
      <span class="pill gray">第 2 桌 · 主管 ${byT[2]} 位</span>
    </div>
    <div class="seatwrap">${svgTables()}</div>
    <p class="vs" style="margin:9px 0 0">分桌方案討論中（大桌加位／分兩桌／主管另桌），此為「分兩桌」示意。現場由工作人員擺放桌牌，以最終確認為準。</p>
  </div>

  <h3 class="sect">特殊餐食（每餐皆需向餐廳確認）</h3>
  <div class="card" style="border-color:#F5DFA0;background:#FFF8E6">
    ${specials.map(p=>`<div style="font-size:13px;padding:3px 0;display:flex;gap:8px;align-items:baseline">
      <b style="min-width:64px">${esc(p.name)}</b><span class="pill amber">${esc(p.meal)}</span></div>`).join("")}
    <div style="font-size:12.5px;line-height:1.7;color:#8A6400;margin-top:9px;padding-top:9px;border-top:1px dashed #E8D08A">
      <b>分菜提醒</b>　D1 神木廳、D3 優遊吧斯為合菜，餐廳已安排分菜；午間桌菜從簡避免浪費。<br>
      <b>座位提醒</b>　D1 晚宴：巴黎（陳婉如）與岳聰總坐外面。
    </div>
  </div>

  <h3 class="sect">第 ${S.day} 天餐食 · ${TOUR.dates[S.day-1]}</h3>
  ${(MEALS[S.day]||[]).map((m,i)=>{
    const {slot,place,menu,st,vids}=m;
    const vs=(vids||[]).map(vendor).filter(Boolean);
    const calls=vs.map(v=>(v.tel||[]).length
      ? `<a class="chip" href="${telHref(v.tel[0])}">${ic("phone",13)}${esc(v.name)}</a>`
      : "").join("");
    const info=vs.length?`<button class="chip" data-vm="${esc(vs.map(v=>v.id).join(","))}">${ic("pin",13)}店家資訊</button>`:"";
    return `<div class="card">
      <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
        <span class="pill redln">${esc(slot)}</span><b style="font-size:14.5px;flex:1">${esc(place)}</b>
        ${ebtn(String(i),true)}<span class="pill ${st==="OK"?"green":"amber"}">${esc(st)}</span>
      </div>
      <div style="font-size:13px;color:var(--ink2);margin-top:6px;line-height:1.65">${esc(menu)}</div>
      ${info?`<div class="links">${calls}${info}</div>`:""}
    </div>`;
  }).join("")}
  <p class="vs">山芙蓉與優遊吧斯皆為原住民風味，菜單已協調避免重複。電話為網路查得資訊，撥號前請先確認窗口。</p>`;
  el.querySelectorAll("[data-vm]").forEach(b=>b.onclick=()=>openVendorModal(b.dataset.vm));
  editBar(el,{add:()=>editMeal(null),addLabel:"新增餐次",reset:()=>{ MEALS[S.day]=buildSeed().meals[S.day]||[]; },resetLabel:"還原本日餐食"});
  EDIT_HANDLER=i=>editMeal(+i);
  scr.appendChild(el);
};
function editMeal(i){
  const list=MEALS[S.day]||(MEALS[S.day]=[]);
  const m=i==null?null:list[i];
  editForm(m?"編輯餐次":"新增餐次", MEAL_FIELDS(), m||{slot:"午餐",st:"待確認",vids:[]}, {
    onSave:o=>{ if(m) Object.assign(m,o); else list.push(o); dataChanged("已儲存"); },
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
      <a class="vmini" href="${mapHref(v.addr)}" target="_blank" rel="noopener">地圖</a>
      <button class="vmini" data-cp="${esc(v.addr)}">複製</button></div>`:""}
    ${v.hours?`<div class="vrow"><span class="vk">🕘</span><span class="vv">${esc(v.hours)}</span></div>`:""}
    ${v.email?`<div class="vrow"><span class="vk">${ic("mail",14)}</span>
      <a class="vv vlink" href="mailto:${esc(v.email)}">${esc(v.email)}</a>
      <button class="vmini" data-cp="${esc(v.email)}">複製</button></div>`:""}
    ${v.line?`<div class="vrow"><span class="vk">LINE</span><span class="vv">${esc(v.line)}</span>
      <button class="vmini" data-cp="${esc(v.line)}">複製</button></div>`:""}
    ${v.url?`<div class="vrow"><span class="vk">🔗</span>
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
  mb.querySelectorAll(".ebtn").forEach(b=>b.onclick=e=>{ e.stopPropagation(); closeModal(); editVendor(vendor(b.dataset.e)); });
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
  ${list.map(vendorCard).join("")}

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
  editBar(el,{add:()=>editVendor(null),addLabel:"新增店家",reset:()=>{ resetSection("vendors"); resetSection("vendorTodo"); },resetLabel:"還原預設店家"});
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
    if(!c){ c=byKey[key]={ key, day:+b.day||1, t:b.t||"", cat:b.cat, slot:b.slot||"", vendor:b.vendor||"", pay:b.pay||"現金", lines:[], budget:0, notes:[] }; cards.push(c); }
    c.lines.push(b); c.budget+=(+b.price||0)*(+b.qty||0); if(b.note) c.notes.push(b.note);
  });
  cards.sort((a,b)=>a.day-b.day||(a.t?String(a.t):"99").localeCompare(b.t?String(b.t):"99"));   /* 沒時間的雜支排在當天最後 */
  return cards;
}
function budgetTotals(){
  let cash=0, cashFinal=0, recorded=0, cashCards=0, transfer=0, card=0;
  budgetCards().forEach(c=>{
    if(c.pay==="現金"){ cash+=c.budget; cashCards++; const f=S.budgetFinal[c.key]; if(f!=null){ cashFinal+=f; recorded++; } else cashFinal+=c.budget; }
    else if(c.pay==="信用卡") card++;
    else transfer+=c.budget;
  });
  return { cash, cashFinal, recorded, cashCards, transfer, card, variance:cashFinal-cash };
}
function refreshBudgetSummary(){
  const t=budgetTotals();
  const box=document.getElementById("bgSummary");
  if(!box) return;
  box.querySelector("#bgFinal").textContent=fmtNT(t.cashFinal);
  const vEl=box.querySelector("#bgVariance");
  vEl.textContent=(t.variance>0?"＋":t.variance<0?"－":"")+fmtNT(Math.abs(t.variance));
  vEl.className="v "+(t.variance>0?"over":t.variance<0?"under":"even");
  box.querySelector("#bgRecorded").textContent=`${t.recorded} / ${t.cashCards} 張已決算`;
}
const payPill=p=>`<span class="pill ${p==="現金"?"red":p==="信用卡"?"gray":"blue"}">${esc(p)}</span>`;
PAGES.budget=(hdr,scr)=>{
  hbar(hdr,"預算表",{back:true});
  const el=document.createElement("div");
  el.className="pagepad";
  const t=budgetTotals();
  if(!S.budgetDeposit) S.budgetDeposit={};
  if(!S.budgetNote) S.budgetNote={};
  const cards=budgetCards();
  const dateOf=d=>{ const m=String(TOUR.dateTxt||"").match(/(\d{4})\/(\d{1,2})\/(\d{1,2})/); if(!m) return `第 ${d} 天`;
    const dt=new Date(+m[1],+m[2]-1,+m[3]+d-1); return `${dt.getFullYear()}${String(dt.getMonth()+1).padStart(2,"0")}${String(dt.getDate()).padStart(2,"0")}`; };
  const nt=n=>Math.round(n).toLocaleString("en-US");
  /* 表格：照公司 Budget 表的欄位（不含 FOC／稅率／稅金） */
  let rows="";
  [1,2,3].forEach(d=>{
    const cs=cards.filter(c=>c.day===d); if(!cs.length) return;
    const dayRows=cs.reduce((n,c)=>n+c.lines.length,0);
    let first=true;
    cs.forEach(c=>{
      const n=c.lines.length, cash=c.pay==="現金", dep=+S.budgetDeposit[c.key]||0, fin=S.budgetFinal[c.key];
      const hasAmt=c.lines.some(b=>+b.qty);
      c.lines.forEach((b,i)=>{
        rows+=`<tr class="${cash?"":"nocash"}${i===0?" cardtop":""}">`;
        if(first){ rows+=`<td class="date" rowspan="${dayRows}">${dateOf(d)}</td>`; first=false; }
        if(i===0) rows+=`<td class="comp" rowspan="${n}"><b>${esc(c.cat)}</b><span>${esc([c.slot,c.t].filter(Boolean).join(" "))}</span><span class="vend">${esc(c.vendor)}</span></td>`;
        rows+=`<td class="det">${ebtn(b.id,true)}${esc(b.name)}${b.note?`<div class="dnote">${esc(b.note)}</div>`:""}</td>
          <td class="num">${+b.qty||""}</td><td>${esc(b.unit||"")}</td>
          <td class="num">${+b.qty?nt(+b.price||0):""}</td><td class="num">${+b.qty?nt((+b.price||0)*(+b.qty||0)):""}</td>`;
        if(i===0){
          rows+=`<td class="tot" rowspan="${n}"><span class="paylbl">${esc(c.pay)}</span><b>${hasAmt?"NTD "+nt(c.budget):"NTD 0"}</b></td>
            <td class="num edit" rowspan="${n}">${cash?`<input class="bgcell" data-k="${esc(c.key)}" data-f="dep" inputmode="numeric" value="${dep||""}" placeholder="0">`:"—"}</td>
            <td class="num" rowspan="${n}" id="rem_${esc(c.key)}">${cash?nt(c.budget-dep):"—"}</td>
            <td class="num edit" rowspan="${n}">${cash?`<input class="bgcell fin" data-k="${esc(c.key)}" data-f="fin" inputmode="numeric" value="${fin!=null?fin:""}" placeholder="${nt(c.budget)}">`:`<span class="pill gray">${c.pay==="信用卡"?"公司刷卡":"公司轉帳"}</span>`}</td>
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
      <div class="st hot"><span class="k">領隊現金 TOTAL</span><b>${fmtNT(t.cash)}</b></div>
      <div class="st"><span class="k">實付合計</span><b id="bgFinal">${fmtNT(t.cashFinal)}</b></div>
      <div class="st"><span class="k">差額</span><b id="bgVariance" class="v ${t.variance>0?"over":t.variance<0?"under":"even"}">${(t.variance>0?"＋":t.variance<0?"－":"")+fmtNT(Math.abs(t.variance))}</b></div>
    </div>
    <div class="bgfoot">
      <span>另有 <b>銀存轉帳 ${fmtNT(t.transfer)}</b>、<b>公司刷卡 ${t.card} 筆</b>（飯店），不在領隊現金內</span>
      <span class="pill gray" id="bgRecorded">${t.recorded} / ${t.cashCards} 張已填實付</span>
    </div>
  </div>
  <div class="card bgtablewrap">
    <table class="bgtable">
      <thead><tr><th>日期</th><th>元件</th><th>訂購明細</th><th>數量</th><th>單位</th><th>項次單價</th><th>小計</th><th>TOTAL</th><th>已付訂金</th><th>剩餘金額</th><th>實付金額</th><th>備註</th></tr></thead>
      <tbody>${rows}</tbody>
      <tfoot><tr><td colspan="7" class="rep"><b>領隊報告：</b><textarea class="bgreport" id="bgReport" rows="3" placeholder="超支原因、店家未收款、發票缺漏…">${esc(S.budgetReport||"")}</textarea></td>
        <td colspan="5" class="grand"><span>TOTAL：</span><b>現金 ${nt(t.cash)} NTD</b><span class="sub">實付 ${nt(t.cashFinal)} NTD</span></td></tr>
      <tr class="sign"><td colspan="4">主管：______________</td><td colspan="4">審帳：______________</td><td colspan="4">領隊：______________</td></tr></tfoot>
    </table>
  </div>
  <p class="vs">「已付訂金」與「實付金額」直接在格子裡填，填完自動存；剩餘金額＝TOTAL－已付訂金。愛玉、甜甜圈單價空白，實付填現場金額。</p>
  <button class="btn sec" id="bgReset" style="margin-top:4px">清空已填的訂金、實付與備註</button>`;
  scr.appendChild(el);

  el.querySelectorAll(".bgcell").forEach(inp=>{
    inp.addEventListener("input",()=>{
      const k=inp.dataset.k, raw=inp.value.replace(/[^\d]/g,""), v=raw===""?null:parseInt(raw,10);
      if(inp.dataset.f==="dep"){ if(v==null) delete S.budgetDeposit[k]; else S.budgetDeposit[k]=v;
        const c=cards.find(x=>x.key===k); const rem=el.querySelector(`#rem_${CSS.escape(k)}`); if(rem&&c) rem.textContent=nt(c.budget-(v||0)); }
      else { if(v==null) delete S.budgetFinal[k]; else S.budgetFinal[k]=v; refreshBudgetSummary(); }
      save();
    });
  });
  el.querySelectorAll(".bgnote2").forEach(ta=>ta.addEventListener("input",()=>{ const v=ta.value.trim(); if(v) S.budgetNote[ta.dataset.k]=v; else delete S.budgetNote[ta.dataset.k]; save(); }));
  el.querySelector("#bgReport").onchange=e=>{ S.budgetReport=e.target.value; save(); toast("領隊報告已存"); };
  el.querySelector("#bgReset").onclick=()=>confirmBox("清空所有已填的訂金與實付金額？此動作無法復原。",()=>{
    S.budgetFinal={}; S.budgetDeposit={}; S.budgetNote={}; save(); render(); toast("已清空");
  });
  editBar(el,{add:()=>editBudget(null),addLabel:"新增項目",reset:()=>resetSection("budget"),resetLabel:"還原 Budget 表"});
  EDIT_HANDLER=k=>{
    if(k==="__head") editForm("Budget 表抬頭",[{k:"code",label:"團號"},{k:"taxTitle",label:"發票抬頭"},{k:"taxId",label:"統一編號"},{k:"budgetPrinted",label:"印表日期"},{k:"headcount",label:"分攤人數",type:"number",required:true}],
      Object.assign({},TOUR,{headcount:BUDGET_HEADCOUNT}),
      {onSave:o=>{ S.data.headcount=Math.max(1,Math.round(+o.headcount||1)); delete o.headcount; Object.assign(TOUR,o); dataChanged("已儲存"); }});
    else editBudget(BUDGET_ITEMS.find(b=>b.id===k));
  };
};
function editBudget(b){
  editForm(b?"編輯預算項目":"新增預算項目", BUDGET_FIELDS(), b||{day:S.day,cat:"餐廳",price:0,qty:24,unit:"人",pay:"現金"}, {
    onSave:o=>{ o.day=+o.day||1; if(b) Object.assign(b,o); else { o.id=newId("k"); BUDGET_ITEMS.push(o); } dataChanged("已儲存"); },
    onDelete:b?()=>{ S.data.budget=BUDGET_ITEMS.filter(x=>x!==b); delete S.budgetFinal[b.grp||b.id]; dataChanged("已刪除"); }:null,
  });
}

/* ---------- 交班文件 ---------- */
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
    if(!items.length){ box.innerHTML=`<div class="docrow placeholder"><div class="fic2 other">✍️</div><div class="meta"><div class="fn">還沒有手寫備註</div><div class="fs">按上面的按鈕開始寫</div></div></div>`; return; }
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
      <div class="pen" data-c="#E60012" style="background:#E60012"></div>
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
      await idbPut("files",{ id, name, type:"image/png", size:blob.size, cat:"ink", blob, ts:Date.now(), day:S.day });
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

PAGES.docs=(hdr,scr)=>{
  hbar(hdr,"交班文件",{back:true});
  const el=document.createElement("div");
  el.className="pagepad";
  el.innerHTML=`<div id="docRows">讀取中…</div>
    <span class="grayinfo">離線狀態，使用下載資料顯示</span>
    <span class="grayinfo">連線狀態，使用線上資料顯示</span>`;
  scr.appendChild(el);
  idbAll("files").then(files=>{
    const box=el.querySelector("#docRows");
    box.innerHTML="";
    DOC_ROWS.forEach(row=>{
      const n=files.filter(f=>f.cat===row.id).length;
      const r=document.createElement("div");
      r.className="listrow";
      r.innerHTML=`${esc(row.name)}<span class="cnt">${n?`${n} 檔`:""}</span><span class="chev">${ic("chev",14)}</span>`;
      r.onclick=()=>{ S.docCat=row.id; save(); goPage("doccat"); };
      box.appendChild(r);
    });
  });
};

PAGES.doccat=(hdr,scr)=>{
  const row=DOC_ROWS.find(r=>r.id===S.docCat)||DOC_ROWS[0];
  hdr.innerHTML=`<div class="hbar">
    <div class="hleft"><button class="backbtn">${ic("back",16)}</button></div>
    <div class="htitle">${esc(row.name)}</div>
    <div class="hright"><button class="iconbtn">${ic("bell",19)}</button><button class="iconbtn" style="color:var(--red)">${ic("live",19)}</button></div></div>`;
  hdr.querySelector(".backbtn").onclick=()=>goPage("docs");
  const el=document.createElement("div");
  el.className="pagepad";
  el.innerHTML=`<p class="vs">${esc(row.hint||"OP 自 SERP 上傳的文件集中於此；檔案存於裝置，離線可開。圖片檔可直接開啟手寫註記。")}</p>
    <div id="catFiles">讀取中…</div>
    <label class="camlbl">＋ 加入檔案（PDF／圖片）<input type="file" accept="application/pdf,image/*" multiple></label>`;
  scr.appendChild(el);
  el.querySelector("input").onchange=async e=>{
    for(const file of e.target.files){
      await idbPut("files",{ id:"f"+Date.now()+Math.random().toString(36).slice(2,6),
        name:file.name, type:file.type||"application/octet-stream", size:file.size, cat:row.id, blob:file, ts:Date.now() });
    }
    render(); toast("檔案已加入（離線可用）");
  };
  idbAll("files").then(files=>{
    const box=el.querySelector("#catFiles");
    const items=files.filter(f=>f.cat===row.id).sort((a,b)=>b.ts-a.ts);
    box.innerHTML="";
    if(!items.length){
      box.innerHTML=`<div class="docrow placeholder"><div class="fic2 other">📥</div>
        <div class="meta"><div class="fn">尚無檔案</div><div class="fs">由 SERP 上傳後同步，或以下方按鈕加入</div></div></div>`;
      return;
    }
    items.forEach(f=>{
      const isImg=f.type.startsWith("image/"), isPdf=f.type==="application/pdf";
      const r=document.createElement("div");
      r.className="docrow";
      r.innerHTML=`<div class="fic2 ${isPdf?"pdf":isImg?"img":"other"}">${isPdf?"📕":isImg?"🖼️":"📄"}</div>
        <div class="meta"><div class="fn">${esc(f.name)}</div>
        <div class="fs">${(f.size/1024).toFixed(0)} KB · ${new Date(f.ts).toLocaleString("zh-TW")}${isImg?" · 可註記":""}</div></div>
        <button class="del">🗑️</button>`;
      r.onclick=e=>{ if(e.target.classList.contains("del")) return; openDoc(f); };
      r.querySelector(".del").onclick=e=>{
        e.stopPropagation();
        confirmBox(`刪除「${f.name}」？`,async()=>{ await idbDel("files",f.id); render(); });
      };
      box.appendChild(r);
    });
  });
};

function openDoc(f){
  const url=URL.createObjectURL(f.blob);
  if(f.type.startsWith("image/")){
    openModal(f.name,`<img src="${url}" style="max-width:100%;border-radius:12px;display:block">`,
      [["✏️ 註記此圖","pri",()=>{ closeModal(); openAnnotate(f); }],["關閉","sec",()=>{ URL.revokeObjectURL(url); closeModal(); }]]);
  }else if(f.type==="application/pdf"){
    openModal(f.name,`<iframe src="${url}" style="width:100%;height:62dvh;border:none;border-radius:12px;background:#F0F0F2"></iframe>`,
      [["關閉","sec",()=>{ URL.revokeObjectURL(url); closeModal(); }]]);
  }else{
    openModal(f.name,`<p style="font-size:13.5px;color:#8E8E93">此檔案格式無法預覽。</p>`,
      [["關閉","sec",()=>{ URL.revokeObjectURL(url); closeModal(); }]]);
  }
}
function openAnnotate(f){
  const url=URL.createObjectURL(f.blob);
  openModal(`✏️ 註記 · ${f.name}`,`
    <div class="canwrap"><canvas id="anno"></canvas></div>
    <div class="pens">
      <div class="pen on" data-c="#E60012" style="background:#E60012"></div>
      <div class="pen" data-c="#333336" style="background:#333336"></div>
      <div class="pen" data-c="#2563eb" style="background:#2563eb"></div>
      <button class="btn sec" id="undo">↩︎ 復原</button>
      <span style="font-size:12px;color:#8E8E93">手指或 Apple Pencil 直接畫</span>
    </div>
  `,[["儲存為新檔","pri",async ()=>{
      const cv=$("#anno");
      const blob=await new Promise(r=>cv.toBlob(r,"image/png"));
      await idbPut("files",{ id:"f"+Date.now(), name:f.name.replace(/\.\w+$/,"")+"（註記）.png",
        type:"image/png", size:blob.size, cat:f.cat, blob, ts:Date.now() });
      URL.revokeObjectURL(url); closeModal(); render(); toast("已儲存註記版本");
    }],["取消","sec",()=>{ URL.revokeObjectURL(url); closeModal(); }]]);
  const cv=$("#anno"), ctx=cv.getContext("2d");
  const img=new Image();
  const strokes=[]; let cur=null, color="#E60012";
  img.onload=()=>{ const sc=Math.min(1,900/img.width); cv.width=img.width*sc; cv.height=img.height*sc; redraw(); };
  img.src=url;
  function redraw(){
    ctx.clearRect(0,0,cv.width,cv.height);
    ctx.drawImage(img,0,0,cv.width,cv.height);
    ctx.lineCap="round"; ctx.lineJoin="round";
    for(const s of strokes){
      ctx.strokeStyle=s.c; ctx.lineWidth=s.w;
      ctx.beginPath();
      s.pts.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));
      ctx.stroke();
    }
  }
  const pos=e=>{ const r=cv.getBoundingClientRect(); return [(e.clientX-r.left)*cv.width/r.width,(e.clientY-r.top)*cv.height/r.height]; };
  cv.addEventListener("pointerdown",e=>{ e.preventDefault(); cv.setPointerCapture(e.pointerId);
    cur={c:color,w:e.pointerType==="pen"?3:4,pts:[pos(e)]}; strokes.push(cur); });
  cv.addEventListener("pointermove",e=>{ if(!cur) return; cur.pts.push(pos(e)); redraw(); });
  cv.addEventListener("pointerup",()=>cur=null);
  $("#mbox").querySelectorAll(".pen").forEach(p=>p.onclick=()=>{
    color=p.dataset.c;
    $("#mbox").querySelectorAll(".pen").forEach(x=>x.classList.toggle("on",x===p));
  });
  $("#undo").onclick=()=>{ strokes.pop(); redraw(); };
}

/* ---------- 行李點收 ---------- */
/* 行李備註欄的展開狀態（僅本次開啟有效，不寫入儲存） */
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
    <div style="font-weight:800;font-size:13px;margin-bottom:5px">🚛 第 ${S.day} 天 行李車路線</div>
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
        await idbPut("photos",{id:"ph"+Date.now(),pax:p.id,blob:file,ts:Date.now()});
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
PAGES.rooms=(hdr,scr)=>{
  hbar(hdr,"分房表",{back:true});
  const night=S.night||1;
  const tb=document.createElement("div");
  tb.className="tabbar";
  tb.innerHTML=NIGHTS.map(n=>`<button class="tab${night===n.key?" on":""}" data-n="${n.key}">${esc(n.date)} ${esc(n.hotel.slice(0,6))}…</button>`).join("");
  tb.querySelectorAll(".tab").forEach(t=>t.onclick=()=>{ S.night=+t.dataset.n; save(); render(); });
  scr.appendChild(tb);
  const N=NIGHTS.find(n=>n.key===night)||NIGHTS[0];
  const el=document.createElement("div");
  el.className="pagepad";
  el.innerHTML=`<div class="vs" style="display:flex;gap:8px;align-items:center;flex-wrap:wrap"><b style="flex:1">${esc(N.date)}｜${esc(N.hotel)}</b>
    ${N.vendor&&vendor(N.vendor)?`<button class="chip" data-vm="${esc(N.vendor)}">${ic("phone",13)}飯店聯絡</button>`:""}${ebtn("__night",true)}</div>
  <p class="vs">發放房卡時照表引導；異動可至「交班文件」開圖註記。</p>
  <div class="roomgrid">${N.rooms.map((r,i)=>`
    <div class="roomcard">${ebtn(String(i))}<div class="no">${esc(r.no)}</div>
      <div class="tp"><span class="pill ${(r.type||"").includes("套")||(r.type||"").includes("豪華")?"redln":"gray"}">${esc(r.type)}</span>
      ${r.note?`<span class="pill amber">${esc(r.note)}</span>`:""}</div>
      <div class="gs">${(r.who||[]).map(esc).join("、")}</div></div>`).join("")}</div>`;
  el.querySelectorAll("[data-vm]").forEach(b=>b.onclick=()=>openVendorModal(b.dataset.vm));
  editBar(el,{add:()=>editRoom(N,null),addLabel:"新增房間",reset:()=>resetSection("nights"),resetLabel:"還原預設分房"});
  EDIT_HANDLER=k=>{
    if(k==="__night") editForm("飯店資料",[{k:"date",label:"日期",ph:"9/20(日)"},{k:"hotel",label:"飯店",required:true},
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
function svgTables(){
  const byT={1:[],2:[]};
  PAX.forEach(p=>{ if(p.table===1||p.table===2) byT[p.table].push(p); });
  const names={1:"第 1 桌（貴賓桌）",2:"第 2 桌（主管桌）"};
  let svg=`<svg viewBox="0 0 940 380" width="940" style="max-width:100%">`;
  [1,2].forEach((t,ti)=>{
    const cx=235+ti*470, cy=195, R=64, r=128;
    svg+=`<circle cx="${cx}" cy="${cy}" r="${R}" fill="#FDECEE" stroke="#E60012" stroke-width="2"/>
    <text x="${cx}" y="${cy-4}" text-anchor="middle" font-size="14" font-weight="800" fill="#E60012">${names[t]}</text>
    <text x="${cx}" y="${cy+16}" text-anchor="middle" font-size="11" fill="#C00010">${byT[t].length} 位</text>`;
    byT[t].forEach((p,i)=>{
      const a=-Math.PI/2 + i*2*Math.PI/byT[t].length;
      const x=cx+r*Math.cos(a), y=cy+r*Math.sin(a);
      svg+=`<circle cx="${x}" cy="${y}" r="9" fill="#fff" stroke="#C9C9CF" stroke-width="1.5"/>
      <text x="${x}" y="${y+(Math.sin(a)>=0?24:-16)}" text-anchor="middle" font-size="11.5" font-weight="700" fill="#333336">${esc(p.name)}</text>`;
    });
  });
  return svg+"</svg>";
}

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
    <p class="vs" style="margin:11px 0 0">完整備份包含行李照片與交班文件，檔案較大；只匯出紀錄則是點名、備註、訂單、預算、簽名，通常不到 1 MB。</p>
  </div>

  <h3 class="sect">還原</h3>
  <div class="card">
    <label class="camlbl">📥 選擇備份檔還原<input type="file" id="impFile" accept=".json,application/json"></label>
    <p class="vs" style="margin:11px 0 0">還原會<b>覆蓋</b>目前裝置上的所有紀錄，請先確認要還原的是哪一份。</p>
  </div>

  <h3 class="sect">程式內自動快照</h3>
  <div class="card">
    <p class="vs" style="margin:0 0 11px">每次操作後最多 60 秒自動存一份快照，保留最近 40 份。誤刪或誤改時可以倒回去。</p>
    <div style="display:flex;gap:9px;flex-wrap:wrap;margin-bottom:11px">
      <button class="btn sec" id="bkNow">立即快照</button>
    </div>
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

  el.querySelector("#bkNow").onclick=async()=>{
    const ok = await writeBackup("manual");
    toast(ok?"已建立快照":"快照建立失敗");
    refreshBackups();
  };

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
      <button class="btn sec" id="exp">匯出操作紀錄</button>
      <button class="btn sec" id="rst" style="color:#E60012">重置示範資料</button>
    </div></div>`;
  el.querySelector("#stg").onclick=()=>goPage("storage");
  el.querySelector("#rstData").onclick=()=>confirmBox("把名單、行程、餐食、店家、分房、菜單、預算全部換回出廠預設？\n點名、訂單、行李、簽名紀錄會保留。",async()=>{
    await writeBackup("manual"); S.data=buildSeed(); dataChanged("已還原全部預設資料");
  });
  el.querySelector("#exp").onclick=()=>{
    const a=document.createElement("a");
    a.href=URL.createObjectURL(new Blob([JSON.stringify(S,null,2)],{type:"application/json"}));
    a.download=`${TOUR.code}-log.json`; a.click();
  };
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
  if(!S.sigs) S.sigs=[];

  /* 跟 iOS 要常駐儲存，避免空間不足時被清掉 */
  HEALTH.persisted = await requestPersist();
  HEALTH.quota = await readQuota();
  try{ const bk=await idbAll("backups"); HEALTH.backups=bk.length;
       HEALTH.lastBackup = bk.reduce((m,b)=>Math.max(m,b.ts),0); }catch(e){}

  /* 第一次開啟把 seed 拷進 S.data；之後每次 render 都會重新綁定 */
  bindData();
  autoDay();   /* 帶團當天打開就是當天，不用再點日期 */
  /* ✎ 用事件委派（capture），卡片本身的 onclick 不會搶到 */
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
