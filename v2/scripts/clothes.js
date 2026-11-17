/* ═════════ 옷: 에레나 옷장(갈아입기) · 양장점 «로즈» 의상 · 잠옷 · 연인별 약혼/결혼 예복 · NPC 계절/축제 옷차림 ═════════ */
const BASEWEAR={},BASEC={};for(const id in SP2)if(SP2[id].wear){BASEWEAR[id]=JSON.parse(JSON.stringify(SP2[id].wear));BASEC[id]=JSON.parse(JSON.stringify(SP2[id].c||{}));}
const OUTFITS={
 butler:{n:'부집사 제복',d:'검은 연미복과 흰 셔츠. 정체를 숨기는 동안의 일상복.',base:1,male:1,w:BASEWEAR.erena},
 daily:{n:'일상복',d:'하늘색 셔츠와 갈색 바지. 쉬는 날의 편한 차림.',base:1,male:1,w:{shirt:'lp:216',pants:'p1:3',pc:'#6a5040',long:1,layer:null,bow:null}},
 pajama:{n:'잠옷',d:'부드러운 면 잠옷. 밤에 내 방에서 자동으로 갈아입는다.',base:1,male:1,night:1,w:{shirt:'lp:0',pants:'p1:3',pc:'#e8e0f0',long:1,layer:null,bow:null}},
 navysuit:{n:'남색 정장',d:'단정한 남색 재킷과 바지.',p:180,male:1,w:{shirt:'lp:106',pants:'p1:3',pc:'#2c3248',long:1,layer:null,bow:null}},
 greenjacket:{n:'초록 사냥 재킷',d:'승마나 산책에 어울리는 짙은 초록 재킷.',p:150,male:1,w:{shirt:'dl:161',pants:'p1:2',pc:'#5a4a3a',long:0,layer:null,bow:null}},
 rose:{n:'장미빛 원피스',d:'리본 달린 연분홍 원피스.',p:160,w:{shirt:'lp:8',pants:'p2:1',pc:'#e8b0bc',long:0,layer:null,bow:null}},
 lilac:{n:'라일락 원피스',d:'은은한 연보라 드레스.',p:160,w:{shirt:'lp:28',pants:'p2:1',pc:'#b8a8d8',long:0,layer:null,bow:null}},
 sky:{n:'하늘빛 원피스',d:'여름 하늘 같은 하늘색 드레스.',p:160,w:{shirt:'lp:50',pants:'p2:1',pc:'#a8c8e0',long:0,layer:null,bow:null}},
 lace:{n:'레이스 블라우스와 크림 치마',d:'찻집 나들이에 어울리는 차림.',p:200,w:{shirt:'lp:149',pants:'p2:1',pc:'#e8e0d0',long:0,layer:null,bow:null}},
 forest:{n:'숲빛 드레스',d:'짙은 초록 벨벳 드레스.',p:220,w:{shirt:'lp:104',pants:'p2:1',pc:'#3e5a40',long:0,layer:null,bow:null}},
 wine:{n:'와인빛 드레스',d:'가을 연회에 어울리는 와인색 드레스.',p:240,w:{shirt:'lp:57',pants:'p2:1',pc:'#7a2a38',long:0,layer:null,bow:null}},
 crimson:{n:'진홍 이브닝 드레스',d:'무도회용 진홍빛 드레스.',p:300,w:{shirt:'lp:200',pants:'p2:1',pc:'#6a2030',long:0,layer:null,bow:null}},
 violet:{n:'제비꽃 드레스',d:'제비꽃 자수가 놓인 보라 드레스.',p:260,w:{shirt:'dl:30',pants:'p2:1',pc:'#c8b8e0',long:0,layer:null,bow:null}},
 // 예복 (상점에 없음 · 그날 자동)
 eng_k:{n:'약혼식 드레스 (남색)',ev:1,w:{shirt:'lp:106',pants:'p2:1',pc:'#2c3248',long:0,layer:null,bow:null}},
 eng_r:{n:'약혼식 드레스 (와인)',ev:1,w:{shirt:'lp:57',pants:'p2:1',pc:'#7a2a38',long:0,layer:null,bow:null}},
 wed:{n:'웨딩드레스',ev:1,w:{shirt:'lp:0',pants:'p2:1',pc:'#fbf8f2',long:0,layer:null,bow:null}}};
const NPCFORMAL={   // 연인별 약혼·결혼 예복
 kairan:{eng:{_c:{top:'#1e1e26'},btn:'#d0aa5a'},wed:{shirt:'lp:0',layer:'coat',_c:{top:'#eceef4',acc:'#d0aa5a'},pc:'#eceef4',btn:'#d0aa5a'}},
 roewen:{eng:{tint:'#5a2a38',btn:'#d0aa5a'},wed:{tint:'#2c3a5a',pc:'#2c3a5a',btn:'#e8c870'}}};
function closet(){S.closet=S.closet||['butler','daily','pajama'];return S.closet;}
function canWear(k){const o=OUTFITS[k];if(!o)return false;if(o.male)return true;return !!(S.f&&S.f.public);}
function eventDress(){const w=S.wed;if(w&&!w.done&&w.day===S.day)return {k:'wed',id:w.id};const e=S.engCer;if(e&&!e.done&&e.day===S.day)return {k:'eng',id:e.id};return null;}
function inMyRoom(){const a=AREAS[S.area];if(!a)return false;const r=roomIn(a,...tileOf(P));const sp=typeof spouseId==='function'&&spouseId();return r==='myroom'||(sp&&((sp==='kairan'&&r==='kbed')||(sp==='roewen'&&r==='r_room')));}
function erenaOutfit(){const ev=eventDress();if(ev)return ev.k==='wed'?'wed':(ev.id==='roewen'?'eng_r':'eng_k');
  const h=S.min/60;if(P.pose==='bed'||(inMyRoom()&&(h>=22||h<6)))return 'pajama';
  const k=S.outfit||'butler';return canWear(k)?k:'butler';}
/* NPC: 계절 · 축제 */
const NPC_SEASON={
 겨울:{tim:{layer:'coat',_c:{top:'#7a5a40'},btn:'#d8c8a8'},roewen:{layer:'coat',_c:{top:'#3a3a44'}},demian:{layer:'coat',_c:{top:'#44546c'}},marta:{layer:'coat',_c:{top:'#5a3a48'}},cecilia:{layer:'coat',_c:{top:'#e8e0d8'}}},
 여름:{tim:{sleeve:'SS'},brant:{sleeve:'S'}},
 가을:{tim:{layer:'coat',_c:{top:'#8a6a3a'},btn:'#e8d8b8'}}};
const NPC_FEST={roewen:{tint:'#2c3a5a',btn:'#e8c870'},demian:{tint:'#2c3a5a',btn:'#e8c870'},tim:{shirt:'lp:106',sleeve:null},brant:{apron:0}};
function npcWear(id){const base=BASEWEAR[id];if(!base)return null;let w=Object.assign({},base);
  const ss=SEASON_NOW(),sea=(NPC_SEASON[ss]||{})[id];if(sea)Object.assign(w,sea);
  if(typeof festOn==='function'&&festOn(S.day)&&NPC_FEST[id])Object.assign(w,NPC_FEST[id]);
  const ev=eventDress();if(ev&&ev.id===id&&NPCFORMAL[id])Object.assign(w,NPCFORMAL[id][ev.k]);
  return w;}
function SEASON_NOW(){try{return dateOf(S.day).season;}catch(e){return '여름';}}
const WEARK={};
function applyWear(id,w){const k=JSON.stringify(w);if(WEARK[id]===k)return false;WEARK[id]=k;SP2[id].c=Object.assign({},BASEC[id],w._c||{});const w2=Object.assign({},w);delete w2._c;SP2[id].wear=w2;for(const c in SP2C)if(c.startsWith(id+'|'))delete SP2C[c];if(typeof miniC!=='undefined')for(const c in miniC)delete miniC[c];return true;}
function wearTick(){if(!S||!S.intro&&S.day==null)return;
  const ek=erenaOutfit(),ew=Object.assign({},BASEWEAR.erena,OUTFITS[ek].w);applyWear(pid(),ew);
  const other=pid()==='erena'?'erena_d':'erena';if(BASEWEAR[other])applyWear(other,BASEWEAR[other]);
  for(const id in BASEWEAR){if(id==='erena'||id==='erena_d')continue;const w=npcWear(id);if(w)applyWear(id,w);}}
setInterval(()=>{try{wearTick();}catch(e){}},700);
/* 옷장 패널 */
function wardrobeHTML(){const C=closet(),cur=S.outfit||'butler';
  let h=`<h2>옷장 <button class="pbtn" id="pclose">닫기</button></h2><p class="story">${S.f&&S.f.public?'정체가 알려진 지금은 무엇이든 입을 수 있다.':'정체를 숨기는 동안엔 남장 차림만 입을 수 있다. 드레스는 옷장 안쪽에 고이 걸어 둔다.'}</p><div class="wgrid">`;
  for(const k of Object.keys(OUTFITS)){const o=OUTFITS[k];if(o.ev||!C.includes(k))continue;const ok=canWear(k),on=cur===k;
    h+=`<div class="wcard${on?' on':''}"><canvas data-ow="${k}" width="34" height="38"></canvas><div class="wn">${o.n}</div><div class="tw">${o.d}</div>${o.night?'<span class="tw">밤에 자동</span>':on?'<span class="wbad">입는 중</span>':ok?`<button class="pbtn sm" data-wear="${k}">입기</button>`:'<span class="tw">숨기는 동안 못 입음</span>'}</div>`;}
  return h+'</div><div class="pfoot"><span>양장점 «로즈»에서 새 옷을 살 수 있어요.</span></div>';}
function outfitPreview(cv,k){const id=(OUTFITS[k].male&&!(S.f&&S.f.public))?'erena':'erena_d',W0=SP2[id].wear,K0=WEARK[id];SP2[id].wear=Object.assign({},BASEWEAR[id],OUTFITS[k].w);const keep={};for(const c in SP2C)if(c.startsWith(id+'|')){keep[c]=SP2C[c];delete SP2C[c];}
  try{const g=cv.getContext('2d');g.imageSmoothingEnabled=false;g.clearRect(0,0,34,38);g.drawImage(spr2(id,0,'i0'),0,1);g.drawImage(spr2(id,3,'i0'),17,1);}catch(e){}
  for(const c in SP2C)if(c.startsWith(id+'|'))delete SP2C[c];Object.assign(SP2C,keep);SP2[id].wear=W0;WEARK[id]=K0;}
function openWardrobe(){const p=$('#panel');if(D||busy)return;p.classList.remove('wide');p.innerHTML=wardrobeHTML();p.hidden=false;
  const pin=document.createElement('div');pin.className='pin';const x=p.querySelector('#pclose');while(p.firstChild)pin.appendChild(p.firstChild);p.appendChild(pin);if(x){x.classList.add('px');x.textContent='✕';p.appendChild(x);x.onclick=()=>{p.hidden=true;};}
  p.querySelectorAll('canvas[data-ow]').forEach(c=>outfitPreview(c,c.dataset.ow));
  p.querySelectorAll('[data-wear]').forEach(b=>b.onclick=()=>{S.outfit=b.dataset.wear;save();toast(`${OUTFITS[S.outfit].n}(으)로 갈아입었다`);wearTick();openWardrobe();});}
(function(){const st=document.createElement('style');st.textContent=`
#panel .wgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:8px}
#panel .wcard{background:#f5ebdc;border:2px solid #c9b08e;box-shadow:inset 0 0 0 2px #fffaf1;padding:8px;display:flex;flex-direction:column;align-items:center;gap:4px;text-align:center}
#panel .wcard.on{border-color:#b36b7c;background:#f8e8ea}
#panel .wcard canvas{width:102px;height:114px;image-rendering:pixelated;background:#efe2cc;border:2px solid #c9b08e}
#panel .wcard .wn{font-size:14px;color:#3e2c28}#panel .wcard .tw{font-size:11.5px}
#panel .wbad{font-size:12px;color:#fff;background:#b36b7c;padding:1px 8px}
`;document.head.appendChild(st);})();
/* 양장점: 의상 판매 줄 추가 */
{const _tp3=togglePanel;togglePanel=function(kind,arg,keep){_tp3(kind,arg,keep);if(kind!=='shop'||arg!=='tailor')return;const p=$('#panel'),pin=p.querySelector('.pin')||p;if(pin.querySelector('.wgrid'))return;
  const C=closet();let h=`<div class="sub">의상 · 옷장으로 배달해 드려요</div><div class="wgrid">`;
  for(const k of Object.keys(OUTFITS)){const o=OUTFITS[k];if(!o.p)continue;const own=C.includes(k);h+=`<div class="wcard"><canvas data-ow="${k}" width="34" height="38"></canvas><div class="wn">${o.n} <small>${money(o.p)}</small></div><div class="tw">${o.d}${o.male?' · 남장 중에도 입을 수 있음':''}</div>${own?'<span class="tw">가지고 있음</span>':`<button class="pbtn sm" data-outfit="${k}" ${S.coins<o.p?'disabled':''}>산다</button>`}</div>`;}
  pin.insertAdjacentHTML('beforeend',h+'</div>');pin.querySelectorAll('canvas[data-ow]').forEach(c=>outfitPreview(c,c.dataset.ow));
  pin.querySelectorAll('[data-outfit]').forEach(b=>b.onclick=()=>{const k=b.dataset.outfit,o=OUTFITS[k];if(S.coins<o.p)return toast('돈이 모자라다');S.coins-=o.p;closet().push(k);save();hud();toast(`«${o.n}»을 샀다 <i>옷장에 걸어 두었다</i>`);togglePanel('shop','tailor',true);});};}
