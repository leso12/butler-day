/* ═════════ 확장: 100일 이후 이야기 · 오늘의 작은 일 · 질투 · 하트 · 편지 · 축제 · 연속 부탁 · 도감 ═════════ */
const EXT=/*EXTDATA*/{};
function xcond(c,noTime){if(!c)return true;const d=dateOf(S.day),hr=S.min/60,tm=hr<11?'morning':hr<17?'afternoon':'evening';
  if(c.season&&c.season!==d.season)return false;
  if(c.weather&&c.weather!==(S.weather==='cloudy'?'clear':S.weather))return false;
  if(!noTime&&c.time&&c.time!==tm)return false;
  if(c.sunday&&!isSunday())return false;
  if(c.minDay&&S.day<c.minDay)return false;if(c.maxDay&&S.day>c.maxDay)return false;
  if(c.hearts)for(const [k,v] of Object.entries(c.hearts))if(hearts(k)<v)return false;
  if(c.lover){if(c.lover==='none'){if(S.partner)return false;}else if(c.lover==='any'){if(!S.partner)return false;}else if(S.partner!==c.lover)return false;}
  if(c.public!=null&&!!S.f.public!==!!c.public)return false;
  if(c.tim&&!S.f.tim)return false;
  if(c.farm&&!(S.farm&&S.farm.intro))return false;if(c.fish&&!(S.fishS&&S.fishS.n))return false;if(c.hens&&!(S.farm&&S.farm.hens))return false;
  return true;}
const xl=(arr,id)=>(arr||[]).map(x=>dl(x,id));
const xpts=e=>once(()=>{for(const [k,v] of Object.entries(e.pts||{}))addPtsQ(k,v);if(e.item&&ITEMS[e.item]){S.inv[e.item]=(S.inv[e.item]||0)+1;toast(`${ITEMS[e.item].n} <i>+1</i>`);}if(e.coin){S.coins+=e.coin;}hud();});
const okLoc=l=>Array.isArray(l)&&l.length&&l.every(x=>LOC_AREA[x]);

/* 100일 이후 이야기 */
for(const e of EXT.story||[]){if(!okLoc(e.loc))continue;
  STORY.push({day:e.day,id:e.id,t:'s',title:e.title,orig:1,loc:e.loc,from:e.from,to:e.to,hint:e.hint,
    need:()=>S.ending!=='home'&&xcond(e.cond,true),pre:()=>xl(e.pre),
    run:()=>{const alt=(e.alt||[]).find(a=>xcond(a.cond,true));return [...xl(alt?alt.lines:e.lines),xpts(e)];},
    miss:()=>xl(e.miss)});}

/* 하트 이벤트 추가 */
for(const [id,list] of Object.entries(EXT.heart||{})){if(!CH[id])continue;const H=HEART[id]||(HEART[id]=[]);
  for(const e of list){if(!okLoc(e.loc)||H.some(x=>x.id===e.id))continue;
    H.push({h:e.h,id:e.id,title:e.title,hint:e.hint,ext:1,when:n=>e.loc.includes(n.loc)&&S.min>=e.from*60&&S.min<e.to*60&&xcond(e.cond),skip:()=>!xcond(e.cond,true),lines:()=>[...xl(e.lines,id),xpts(e)]});}
  H.sort((a,b)=>a.h-b.h);}

/* 오늘의 작은 일 · 질투 소동: 아침마다 2~3개 */
const XD=[...(EXT.daily||[]),...(EXT.jealous||[]).map(e=>Object.assign({jl:1},e)),...(EXT.evenings||[]).map(e=>Object.assign({jl:1},e))].filter(e=>okLoc(e.loc));
const XD_BY={};for(const e of XD)XD_BY[e.k]=e;
function pickDaily(){S.dseen=S.dseen||{};S.daily={day:S.day,ks:[]};if(S.ending==='home')return;
  const pool=XD.filter(e=>!e.date&&!S.dseen[e.k]&&xcond(e.cond,true)),r=k=>hash(S.day,k,313);
  const dd_=dateOf(S.day),forced=XD.filter(e=>e.date&&e.date[0]===dd_.month&&e.date[1]===dd_.date&&!S.dseen[e.k]&&xcond(e.cond,true));
  const sh=a=>a.map((e,i)=>[r(i+1),e]).sort((x,y)=>x[0]-y[0]).map(x=>x[1]);
  const jl=sh(pool.filter(e=>e.jl)),dd=sh(pool.filter(e=>!e.jl)),out=[];
  out.push(...forced.slice(0,2));
  if(jl.length&&r(99)<.4)out.push(jl[0]);
  for(const e of dd){if(out.length>=(isSunday()?3:2))break;if(out.some(o=>o.loc[0]===e.loc[0]))continue;out.push(e);}
  S.daily.ks=out.map(e=>e.k);}
const XE_CACHE={};
function xEntry(e){return XE_CACHE[e.k]||(XE_CACHE[e.k]={day:-1,id:'x_'+e.k,t:'s',minor:1,title:e.title,loc:e.loc,from:e.from,to:e.to,hint:e.hint,
  pre:()=>[R_(`✧ ${e.jl?'오늘의 소동':'오늘의 작은 일'} — «${e.title}» (${e.hint})`)],
  run:()=>{S.dseen=S.dseen||{};S.dseen[e.k]=S.day;return [...xl(e.lines),xpts(e)];}});}
function dailyEntries(){if(!S.daily||S.daily.day!==S.day)return [];return S.daily.ks.map(k=>XD_BY[k]).filter(Boolean).map(xEntry);}

/* 편지 */
const XLET=EXT.letters||[],XLET_BY={};for(const l of XLET)XLET_BY[l.k]=l;
const xname=id=>CH[id]?(id==='kairan'?'카이런 아르젠트':id==='roewen'?'로웬':CH[id].name):id;
function sendLetter(){S.lsent=S.lsent||{};if(S.ending==='home'||hash(S.day,5,71)<.3)return;
  const el=XLET.filter(l=>!S.lsent[l.k]&&xcond(l.cond,true));if(!el.length)return;
  const pri=el.filter(l=>l.cond&&(l.cond.maxDay||l.cond.season)),pool=pri.length?pri:el,l=pool[Math.floor(hash(S.day,6,71)*pool.length)];
  S.lsent[l.k]=S.day;S.mail.unshift({from:xname(l.from),title:l.title,body:l.body,day:S.day,read:false,k:l.k});
  if(l.item&&ITEMS[l.item])S.inv[l.item]=(S.inv[l.item]||0)+1;}
function letterExtra(m,i){const l=m.k&&XLET_BY[m.k];if(!l)return '';let h='';
  if(l.item&&ITEMS[l.item])h+=`<div class="tw">동봉: ${ITEMS[l.item].n}</div>`;
  if(l.reply&&l.reply.length){if(m.rep==null)h+=`<div class="rp">${l.reply.map((o,j)=>`<button class="pbtn sm" data-lrep="${i}:${j}">✎ ${o.t}</button>`).join('')}</div>`;
    else{const o=l.reply[m.rep];h+=`<div class="tw">✎ 답장: ${o.t}</div>${o.r?`<div class="tw">↳ ${o.r}</div>`:''}`;}}
  return h;}
function letterReply(i,j){const m=S.mail[i],l=m&&XLET_BY[m.k];if(!l||m.rep!=null)return;const o=l.reply[j];m.rep=j;if(CH[l.from]&&o.p)addPtsQ(l.from,o.p);save();toast('답장을 보냈다 <i>✉</i>');togglePanel('menu','mail',true);}

/* 새 축제 */
for(const f of EXT.fests||[]){if(!AREAS[f.area]||!okLoc(f.loc)||FESTS.some(x=>(x.m===f.m&&x.d===f.d)||x.id===f.id))continue;FESTS.push(Object.assign({ext:1},f));}
function xFestLines(f){const out=[];for(const x of f.lines||[]){
    if(x[0]==='pairs'){const raw=String(x[1]||'함께 즐긴다').replace(/^[○◯]+/,''),lb=nm=>/^[와과]\s/.test(raw)?jo(nm,'과','와')+raw.slice(1):/^\s/.test(raw)||/^함께/.test(raw)?jo(nm,'과','와')+' '+raw.trim():nm+raw;
      out.push(C(...festPartners(f.pairMin||2).filter(id=>f.pair&&f.pair[id]).map(id=>({t:lb(NAMEOF(id)),to:id,p:80,r:xl(f.pair[id],id)})),{t:'혼자 둘러본다',r:[R_('축제의 소리와 냄새를 천천히 즐겼다.')]}));}
    else out.push(dl(x));}
  return out;}

/* 연속 부탁 */
const XCH=(EXT.chains||[]).filter(c=>CH[c.from]&&c.steps&&c.steps.length&&c.steps.every(s=>(s.type==='visit'?LOC_AREA[s.loc]:CH[s.to])&&(s.type!=='fetch'||ITEMS[s.item]))),XCH_BY={};for(const c of XCH)XCH_BY[c.k]=c;
function chainDay(){S.chainsDone=S.chainsDone||{};const c=S.chain;
  if(c&&c.until<S.day){const d=XCH_BY[c.k];if(d)addMail(xname(d.from),'부탁은 괜찮아요','바빴던 모양이네요. 신경 쓰지 마세요, 다음에 또 부탁할게요.');S.chainsDone[c.k]=-S.day;S.chain=null;}
  if(S.chainOffer&&S.chainOffer.day<S.day-2)S.chainOffer=null;
  if(S.chain||S.chainOffer||S.ending==='home'||hash(S.day,9,41)<.45)return;
  const el=XCH.filter(c=>!S.chainsDone[c.k]&&xcond(c.cond,true));if(!el.length)return;
  S.chainOffer={k:el[Math.floor(hash(S.day,10,41)*el.length)].k,day:S.day};}
function chainAdvance(){S.chainsDone=S.chainsDone||{};const c=S.chain,d=XCH_BY[c.k];c.step++;
  if(c.step>=d.steps.length){const w=d.reward||{};if(w.coin)S.coins+=w.coin;for(const [k,v] of Object.entries(w.pts||{}))addPtsQ(k,v);if(w.rep)S.rep=Math.min(100,S.rep+w.rep);
    if(w.item&&ITEMS[w.item])S.inv[w.item]=(S.inv[w.item]||0)+1;S.chainsDone[c.k]=S.day;S.chain=null;logEv(`연속 부탁 · ${d.title}`,null);diaryAdd('note',`${xname(d.from)}의 부탁 «${d.title}»을 끝까지 해냈다.`);
    toast(`연속 부탁 완료 <i>${d.title}</i>${w.coin?` · +${w.coin}골드`:''}`);}
  else toast(`부탁 진행 <i>${d.steps[c.step].text||''}</i>`);hud();save();}
function chainTalk(n){const id=n.id;S.chainsDone=S.chainsDone||{};
  if(S.chainOffer&&!S.chain){const d=XCH_BY[S.chainOffer.k];if(d&&d.from===id){const k=d.k;
    startDialog(null,[...xl(d.intro,id),C({t:'맡겠습니다',act:()=>{S.chain={k,step:0,until:S.day+(d.days||3)};S.chainOffer=null;toast(`연속 부탁 <i>${d.title}</i> · 업무 창(Q)`);save();}},{t:'지금은 어렵겠어요',act:()=>{S.chainOffer=null;S.chainsDone[k]=-S.day;save();}})]);return true;}}
  const c=S.chain;if(!c)return false;const d=XCH_BY[c.k];if(!d)return (S.chain=null,false);const st=d.steps[c.step];if(!st||st.to!==id)return false;
  if(st.type==='talk'){startDialog(null,[...xl(st.lines,id)],chainAdvance);return true;}
  if(st.type==='fetch'){if(!(S.inv[st.item]>0))return false;S.inv[st.item]--;startDialog(null,[R_(`(${ITEMS[st.item].n}을(를) 건넸다.)`),...xl(st.lines,id)],chainAdvance);return true;}
  return false;}
function chainVisit(){const c=S.chain;if(!c)return false;const d=XCH_BY[c.k],st=d&&d.steps[c.step];if(!st||st.type!=='visit')return false;const h=S.min/60;
  if(h>=(st.from||6)&&h<(st.to||23.5)&&S.area===LOC_AREA[st.loc]&&roomAt(...tileOf(P))===st.loc){playScene({title:d.title,sub:'연속 부탁'},null,xl(st.lines),chainAdvance);return true;}return false;}
function chainText(){const out=[];if(S.chainOffer){const d=XCH_BY[S.chainOffer.k];if(d)out.push({t:`✦ ${xname(d.from)}: «${d.title}»`,w:`${xname(d.from)}에게 말을 걸면 부탁 이야기를 들을 수 있다`});}
  if(S.chain){const d=XCH_BY[S.chain.k],st=d&&d.steps[S.chain.step];if(st)out.push({t:`✦ ${d.title} (${S.chain.step+1}/${d.steps.length})`,w:`${st.text||''}${st.type==='fetch'&&ITEMS[st.item]?` · ${ITEMS[st.item].n} ${S.inv[st.item]?'있음':'필요'}`:''} · 기한 ${dateOf(S.chain.until).label}`});}
  return out;}
function xTargets(out){engTargets(out);const np=id=>npcs.find(n=>n.id===id);
  if(S.chainOffer&&!S.chain){const d=XCH_BY[S.chainOffer.k],n=d&&np(d.from);if(n&&visible(n))out.push({area:n.area,px:n.x,py:n.y-30,label:d.title});}
  if(S.chain){const d=XCH_BY[S.chain.k],st=d&&d.steps[S.chain.step];if(st){if(st.type==='visit'){const ar=LOC_AREA[st.loc],a=AREAS[ar],r=[...a.ROOMS,...a.OUT].find(r=>r[0]===st.loc);if(r)out.push({area:ar,px:(r[2]+r[4]/2)*T,py:(r[3]+1)*T,label:d.title});}
    else{const n=np(st.to);if(n&&visible(n))out.push({area:n.area,px:n.x,py:n.y-30,label:d.title});}}}}

/* 도감 */
function bookHtml(){const H=Object.values(HEART).flat(),hs=H.filter(e=>S.seen[e.id]).length,st=STORY.filter(e=>e.t==='s'&&!e.minor),ss=st.filter(e=>S.story[e.id]==='done').length;
  const fs=Object.keys(S.festSeen||{}).length,dn=Object.keys(S.dateN||{}).length,dt=Object.values(DATES).flat().length;
  const ch=Object.values(S.chainsDone||{}).filter(v=>v>0).length,fk=S.fishK||{};
  const bar=(nm,a,b)=>`<div class="kv"><span>${nm} <b>${a} / ${b}</b></span><span class="bk"><i style="width:${b?Math.round(a/b*100):0}%"></i></span></div>`;
  let h=`<div class="sub">수집</div>`+bar('이야기',ss,st.length)+bar('♥ 이벤트',hs,H.length)+bar('작은 일 · 소동',Object.keys(S.dseen||{}).length,XD.length)+bar('편지',Object.keys(S.lsent||{}).length,XLET.length)
    +bar('데이트 코스',dn,dt)+bar('축제',fs,FESTS.length)+bar('연속 부탁',ch,XCH.length)+bar('물고기',Object.keys(fk).length,Object.keys(FDIF).length);
  h+=`<div class="sub">사람들</div>`;
  for(const id of [...FRIENDS,'demian']){if(id==='tim'&&!S.f.tim)continue;if(id==='demian'&&!S.f.demian)continue;
    const kn=(S.known||{})[id]||{},tag={love:'♥♥',like:'♥',neu:'·',dis:'✕'},pr=Object.entries(kn).filter(([k])=>ITEMS[k]).map(([k,v])=>`${ITEMS[k].n}${tag[v]||''}`).join(', ');
    const ev=(HEART[id]||[]).map(e=>S.seen[e.id]?`♥${e.h} ${e.title}`:`♥${e.h} ???`).join(' · '),bd=BDAY[id]?dateOf(BDAY[id]).label:'?';
    h+=`<div class="letter"><div class="tn">${CH[id].name} <small>${'♥'.repeat(hearts(id))}${'♡'.repeat(10-hearts(id))} · ${STAGE_N[relStage(id)]}</small></div><div class="tw">생일 ${bd}</div><div class="tw">선물: ${pr||'아직 모른다'}</div><div class="tw">${ev}</div></div>`;}
  h+=`<div class="sub">축제</div>`+FESTS.map(f=>`<div class="tw">${Object.keys(S.festSeen||{}).some(k=>k.startsWith(f.id+':'))?'✓':'·'} ${f.m}월 ${f.d}일 «${f.name}» — ${f.where}</div>`).join('');
  h+=`<div class="sub">물고기</div><div class="tw">${Object.keys(FDIF).map(k=>fk[k]?`${ITEMS[k]?ITEMS[k].n:k} ×${fk[k]}`:'???').join(' · ')}</div>`;
  return h;}

/* 약혼식 · 결혼식: 연출 대본 (청혼 3일 뒤 분수 정원에서 약혼식, 결혼식은 대연회장) */
const CER=EXT.ceremony||{};
for(const id of ['kairan','roewen'])if(CER.wedding&&CER.wedding[id]&&typeof ROM!=='undefined'&&ROM[id])ROM[id].wed=()=>xl(CER.wedding[id],id);
{const _ms=milestone;milestone=function(id,key,replay){const r=_ms(id,key,replay);if(r&&key==='engage'&&!replay&&CER.engage&&CER.engage[id])S.engCer={id,day:S.day+3};return r;};}
function engCheck(){const e=S.engCer;if(!e||e.done)return false;if(S.day>e.day){e.day=S.day;}if(S.day!==e.day)return false;const h=S.min/60;
  if(h>=13&&h<19&&S.area==='castle'&&roomAt(...tileOf(P))==='plaza'){e.done=1;logEv(`${CH[e.id].name} · 약혼식`,null);diaryAdd('note',`${jo(CH[e.id].name,'과','와')} 분수 정원에서 약혼식을 올렸다.`);
    playScene({title:'약혼식',sub:`${CH[e.id].name} · ${dateOf(S.day).label}`},e.id,xl(CER.engage[e.id],e.id),()=>{S.min=Math.max(S.min,17*60);placeNpcs(false);hud();toast('약혼식을 마쳤다');save();},{noemo:1});return true;}
  return false;}
function engTargets(out){const e=S.engCer;if(e&&!e.done&&S.day===e.day&&S.min<19*60){const a=AREAS.castle,r=a.OUT.find(r=>r[0]==='plaza');if(r)out.push({area:'castle',px:31*T+8,py:31*T,label:'약혼식 (오후 1~7시)'});}}

/* 고백 · 첫 키스 · 청혼: 장소 · 계절 · 날씨에 따라 다른 장면 (처음 보는 것 먼저) */
const RV=EXT.romvar||{};
function romPick(id,key){const L=(RV[id]||{})[key];if(!L)return null;const n=npcs.find(n=>n.id===id),rm=roomAt(...tileOf(P));S.romSeen=S.romSeen||{};
  const ok=L.filter(v=>(!v.loc||!v.loc.length||v.loc.includes(rm)||(n&&v.loc.includes(n.loc)))&&xcond(v.cond));if(!ok.length)return null;
  const fr=ok.filter(v=>!S.romSeen[v.k]),pool=fr.length?fr:ok,v=pool[Math.floor(Math.random()*pool.length)];S.romSeen[v.k]=1;return v;}
if(typeof ROM!=='undefined')for(const id of ['kairan','roewen']){const R=ROM[id];if(!R)continue;const oc=R.confess,ok_=R.kiss,op=R.propose;
  R.confess=()=>{const known=S.f.public||(id==='kairan'&&S.f.knows)||(id==='roewen'&&S.f.roewen_knows);const v=known&&romPick(id,'confess');return v?xl(v.lines,id):oc();};
  R.kiss=()=>{const v=romPick(id,'kiss');if(!v||!v.yes)return ok_();return [...xl(v.lines,id),C({t:v.yes.t,p:80,r:[...xl(v.yes.r,id),{fn:()=>{milestone(id,'kiss',1);return [];}}]},{t:v.no.t,p:10,r:[...xl(v.no.r,id),{fn:()=>{relOf(id).kissWait=S.day;return [];}}]})];};
  R.propose=()=>{const v=romPick(id,'propose');return v?[...xl(v.lines,id),...weddingAsk(id)]:op();};}
