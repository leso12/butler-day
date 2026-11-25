/* ═════════ 사계절 울타리 · 스듀식 호감도 보석(찰랑이는 하트 병) · 초상화 액자 ═════════ */
const SDVIMG={};function sdvImg(k,src){const im=new Image();SDVIMG[k]={im,ok:false};im.onload=()=>{SDVIMG[k].ok=true;if(k.startsWith('f_'))sdvFenceReady();};im.src=src;}
for(const s in SDVD.fence)sdvImg('f_'+s,SDVD.fence[s]);sdvImg('jewel',SDVD.jewel);sdvImg('jmax',SDVD.jmax);
/* 울타리: 이웃 연결 합(왼100·오10·위500·아래1000) → 시트 칸 */
const FGUIDE={0:5,10:9,100:10,1000:3,500:5,1010:8,1100:6,1500:3,600:10,510:9,110:7,1600:0,1610:4,1510:2,1110:7,610:4};
{const _dt=drawTile;drawTile=function(g,x,y){const m=A&&A.map;if(!m||m[y][x]!=='='){return _dt(g,x,y);}
  const F=SDVIMG['f_'+(SEASK[SZ()]||'summer')];if(!F||!F.ok)return _dt(g,x,y);
  const fl=A.floor&&A.floor[y][x]&&A.floor[y][x]!=='='?A.floor[y][x]:',';m[y][x]=fl;_dt(g,x,y);m[y][x]='=';
  const q=(xx,yy)=>m[yy]&&m[yy][xx]==='=';const sum=(q(x-1,y)?100:0)+(q(x+1,y)?10:0)+(q(x,y-1)?500:0)+(q(x,y+1)?1000:0);const k=FGUIDE[sum]??5;
  g.drawImage(F.im,(k%3)*16,Math.floor(k/3)*32,16,32,x*T,y*T-16,16,32);};}
let SDVF=0;function sdvFenceReady(){if(++SDVF<4)return;for(const k in SEAS_CACHE)delete SEAS_CACHE[k];for(const a of Object.values(AREAS))if(a.outdoor&&a.map.some(r=>r.includes('='))){buildArea(a);SEAS_CACHE[a.id]={[SEAS]:{cv:a.cv,dyn:a.dyn,full:a.full}};}if(S&&AREAS[S.area])A=AREAS[S.area];}
/* 호감도 보석: 하트 0~1 파랑 · 2~3 초록 · 4~5 노랑 · 6~7 빨강 · 8~9 보라 · 10 반짝 */
function jewelLv(id){const h=typeof hearts==='function'?hearts(id):0;return h>=10?5:Math.min(4,Math.floor(h/2));}
let JWF=0;function drawJewels(){const J=SDVIMG.jewel,X=SDVIMG.jmax;if(!J||!J.ok)return;
  for(const c of document.querySelectorAll('canvas.jwl')){const id=c.dataset.jw;if(!id||!CH[id]){c.style.visibility='hidden';continue;}c.style.visibility='';const g=c.getContext('2d');g.clearRect(0,0,11,11);const lv=jewelLv(id);
    if(lv===5){if(X&&X.ok)g.drawImage(X.im,0,0);}else g.drawImage(J.im,(JWF%4)*11,lv*11,11,11,0,0,11,11);c.title=`호감도 ♥${hearts(id)}`;}}
setInterval(()=>{JWF++;const pb=document.getElementById('pbox');if(pb&&!pb.hidden){const nm=(document.getElementById('pname')||{}).textContent||'';const id=FULL2ID[nm]||Object.keys(CH).find(k=>CH[k].name===nm&&k!=='eren');const j=document.getElementById('pjw');if(j){const ok=id&&S.pts&&(id in S.pts);j.dataset.jw=ok?id:'';j.style.display=ok?'':'none';}}drawJewels();},250);
/* 대화 초상화: 이름 옆에 하트 병 */
(function(){const pb=document.getElementById('pbox'),pn=document.getElementById('pname');if(pb&&pn&&!document.getElementById('pjw')){const row=document.createElement('div');row.className='pnrow';pn.parentNode.insertBefore(row,pn);const c=document.createElement('canvas');c.id='pjw';c.className='jwl';c.width=11;c.height=11;row.appendChild(c);row.appendChild(pn);}
  const st=document.createElement('style');st.textContent=`#pbox{--pw:150px;width:var(--pw)!important;padding:4px!important;box-sizing:border-box}
#pbox #pcv{width:100%!important;height:auto!important;aspect-ratio:1/1;display:block}
#pbox .pnrow{align-self:stretch;display:flex;align-items:center;justify-content:center;gap:4px;margin-top:4px;padding:2px 6px 2px 3px;min-height:36px;box-sizing:border-box;background:#5b4339;border:1px solid #c9a77a}
#pbox .pnrow #pname{margin:0!important;padding:0!important;background:none!important;border:0!important;font-size:15px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#pjw{width:30px;height:30px;flex:none}
@media (max-width:440px){#pbox .pnrow{min-height:34px}#pbox{--pw:124px}#pbox .pnrow #pname{font-size:13.5px}#pjw{width:28px;height:28px}}
canvas.jwl{image-rendering:pixelated}.rel .nm canvas.jwl,.soc .nm canvas.jwl{width:22px;height:22px;vertical-align:middle;margin-right:3px;border:0!important;background:none!important;box-shadow:none!important;padding:0!important;border-radius:0!important;outline:0!important}`;document.head.appendChild(st);})();
/* 관계 카드 이름 옆에도 보석 */
if(typeof socCard==='function'){const _sc=socCard;socCard=function(id){return _sc(id).replace('<div class="nm">',`<div class="nm"><canvas class="jwl" data-jw="${id}" width="11" height="11"></canvas>`);};}
{const _tp=togglePanel;togglePanel=function(){const r=_tp.apply(this,arguments);const p=document.getElementById('panel');if(p)for(const c of p.querySelectorAll('.rel canvas[data-id]')){const nm=c.parentNode.querySelector('.nm');if(nm&&!nm.querySelector('canvas.jwl'))nm.insertAdjacentHTML('afterbegin',`<canvas class="jwl" data-jw="${c.dataset.id}" width="11" height="11"></canvas>`);}drawJewels();return r;};}
/* 작업(서류·요리·빨래) 중 말 걸면: 작업 방향을 기억 → 대화 중엔 손 효과 숨김, 끝나면 다시 작업 방향으로 */
const WORKP=['write','cook','wash'];
{const _fc=face;face=function(n){if(n&&WORKP.includes(n.pose)&&n.wdir==null){n.wdir=n.dir;n.wpose=n.pose;}_fc(n);};}
setInterval(()=>{if(typeof npcs==='undefined')return;for(const n of npcs){if(n.wdir==null)continue;if(n.pose!==n.wpose){n.wdir=null;continue;}if(!D&&!(document.getElementById('panel')&&!document.getElementById('panel').hidden)){n.dir=n.wdir;n.wdir=null;}}},300);
/* 업무 안내 표시(노란 팻말)를 실제 업무 가구 위에: 본관 2층 추가로 좌표가 밀려 엉뚱한 칸(통로·문 앞)에 뜨던 것 */
const TASK_IT={tea:'stove',wood:'woodpile',silver:'prep',laundry:'washtub',ledger:'ledgers',deco:'pillar',papers:'mydesk'};
function taskObj(id,ar,x,y){const a=AREAS[ar],want=TASK_IT[id];if(!a||!want)return null;let best=null,bd=1e9;for(const o of a.objs){if(o.it!==want)continue;const d=Math.hypot(o.x+o.w/2-x,o.y-y);if(d<bd){bd=d;best=o;}}return best;}
{const _tg=targets;targets=function(){const out=_tg();for(const m of out){
  if(m.id==='wood'&&S.carry==='wood'){const o=taskObj('tea','keep',47,21);if(o){m.area='keep';m.px=(o.x+o.w/2)*T;m.py=o.y*T-10;}continue;}
  if(!TASKS[m.id]||m.label!==TASKS[m.id].name)continue;const [ar,x,y]=TASKS[m.id].at,o=taskObj(m.id,ar,x,y);if(o){m.area=ar;m.px=(o.x+o.w/2)*T;m.py=o.y*T-10;}}
  return out;};}
/* 업무 가구를 바라보고 있고 할 업무가 있으면, 그 앞에 선 NPC(브란트·마르타 등)보다 업무를 먼저 */
function workFacing(){const {qx,qy}=facing(),a=AREAS[S.area];if(!a||a.outdoor&&S.area!=='castle')return false;const ob=objAt(a,Math.floor(qx/T),Math.floor(qy/T)),it=ob&&ob.it;return !!(it&&WORK_OF[it]&&WORK_OF[it]());}
function withNpcsAside(f){if(!workFacing())return f();const hid=[];for(const n of npcs)if(n.area===S.area&&!n.hidden){n.hidden=true;hid.push(n);}try{return f();}finally{for(const n of hid)n.hidden=false;}}
{const _ac=action;action=function(){return withNpcsAside(()=>_ac.apply(this,arguments));};}
{const _pk=peekLabel;peekLabel=function(){return withNpcsAside(()=>_pk.apply(this,arguments));};}
/* 풀네임: 이름표·사람들 창·관계 카드 (대사 속 호칭은 그대로) */
const FULLNAME={kairan:'카이런 아르젠트',roewen:'로웬 블릭',edmund:'에드먼드 헤일',marta:'마르타 그렌',brant:'브란트 코르',erena:'에레나 베르티에'};
const FULL2ID=Object.fromEntries(Object.entries(FULLNAME).map(([k,v])=>[v,k]));
/* 화자가 바뀌는 순간 초상화·이름·하트를 한 번에 (예전엔 하트가 0.25초 뒤에 따로 바뀌어 이름표가 늦게 맞춰졌음) */
function syncPjw(){const pb=document.getElementById('pbox');if(!pb||pb.hidden)return;const nm=(document.getElementById('pname')||{}).textContent||'';const id=FULL2ID[nm]||Object.keys(CH).find(k=>CH[k].name===nm&&k!=='eren');const j=document.getElementById('pjw');
  if(j){const ok=id&&S.pts&&(id in S.pts);j.dataset.jw=ok?id:'';j.style.display=ok?'':'none';}drawJewels();}
{const _sl=showLine;showLine=function(){const r=_sl.apply(this,arguments);try{syncPjw();}catch(e){}return r;};}
/* 사람들 창·관계 카드 이름에 성 붙이기 */
{const _tpF=togglePanel;togglePanel=function(){const r=_tpF.apply(this,arguments);const p=document.getElementById('panel');if(p&&!p.hidden){for(const nm of p.querySelectorAll('.rel .nm,.soc .nm')){for(const t of nm.childNodes){if(t.nodeType!==3)continue;const v=t.textContent.trim();const id=Object.keys(FULLNAME).find(k=>CH[k]&&CH[k].name===v);if(id&&id!=='erena')t.textContent=FULLNAME[id];}}}return r;};}
/* 메뉴 개선: 탭 10개를 한 줄로(옆으로 밀기), 위에 고정 · 지금 탭 이름 표시 · 내용 칸 넓게 · 메뉴 열면 조이스틱 줄 숨겨 화면을 크게 */
(function(){const st=document.createElement('style');st.textContent=`
#panel.menuv2{padding-top:0!important}
#panel.menuv2 h2{position:sticky;top:0;z-index:5;background:#f4ead8;margin:0 -14px 10px!important;padding:8px 52px 6px 10px!important;display:block!important}
#panel.menuv2 h2 .tabs{display:flex!important;flex-wrap:nowrap!important;gap:4px!important;overflow-x:auto;scrollbar-width:none;padding:4px 2px 2px}
#panel.menuv2 h2 .tabs::-webkit-scrollbar{display:none}
#panel.menuv2 .tab{flex:none!important;min-width:50px!important;width:50px!important;height:50px!important;padding:3px 0!important;display:flex!important;flex-direction:column;align-items:center;justify-content:center;gap:1px;font-size:11px!important;line-height:1.1}
#panel.menuv2 .tab svg{width:22px!important;height:22px!important}
#panel.menuv2 .tab.on{background:#5b4339!important;color:#f7efe2!important;transform:none!important;box-shadow:inset 0 0 0 2px #c9a77a!important}
#panel.menuv2 .tab.on svg{filter:brightness(1.6)}
#panel.menuv2 .mtitle{font-size:15px;font-weight:bold;color:#5b4339;margin:6px 2px 0;display:flex;align-items:center;gap:6px}
#panel.menuv2 .mtitle:before{content:'';width:4px;height:16px;background:#c9a77a}
#panel.menuv2 h2 > button,#panel.menuv2 h2 .x{position:absolute!important;right:8px;top:12px}
body.menuopen #pad{visibility:hidden}
body.menuopen #panel{position:fixed!important;top:var(--ptop,90px)!important;bottom:calc(8px + env(safe-area-inset-bottom))!important;transform:translateX(-50%)!important;max-height:none!important;z-index:50}
#panel.menuv2 h2 .tabs{-webkit-mask-image:linear-gradient(90deg,#000 88%,transparent);mask-image:linear-gradient(90deg,#000 88%,transparent)}
@media (max-width:440px){#panel.menuv2{width:calc(100% - 12px)!important}}`;document.head.appendChild(st);})();
{const _tpM=togglePanel;togglePanel=function(kind,arg,keep){const r=_tpM.apply(this,arguments);const p=document.getElementById('panel');if(!p)return r;
  const isMenu=!p.hidden&&kind==='menu';{const sg=document.getElementById('stage');if(sg)document.body.style.setProperty('--ptop',(sg.getBoundingClientRect().top+6)+'px');}p.classList.toggle('menuv2',isMenu);document.body.classList.toggle('menuopen',!p.hidden);
  if(isMenu){const h=p.querySelector('h2');const on=h&&h.querySelector('.tab.on');if(h&&!h.querySelector('.mtitle')){const t=document.createElement('div');t.className='mtitle';t.textContent=on?on.textContent.replace('•','').trim():'';h.appendChild(t);}
    if(on)try{on.scrollIntoView({inline:'center',block:'nearest'});}catch(e){}}
  return r;};}
/* 패널이 닫히면 조이스틱 줄 다시 보이게 */
setInterval(()=>{const p=document.getElementById('panel');if(p&&p.hidden&&document.body.classList.contains('menuopen'))document.body.classList.remove('menuopen');},300);

/* 요리 동작: 화덕·오븐을 바라볼 때만 냄비 젓기 + 김(화덕 위에서). 개수대 앞이면 씻기, 조리대 앞이면 칼질 (허공에서 김이 나던 것) */
function cookTarget(e){const n=e&&e.n;const a=AREAS[(n&&n.area)||S.area];if(!a)return null;const x=n?n.x:P.x,y=n?n.y:P.y,sp=n&&n.act&&n.act[n.spot],d=n?(sp&&sp[3]==='cook'?sp[2]:n.dir):P.dir;const [dx,dy]=DIRV[d]||[0,0];
  const tx=Math.floor((x+dx*12)/T),ty=Math.floor((y-4+dy*12)/T);for(const [ox,oy] of [[0,0],[0,-1],[dx,dy]]){const o=objAt(a,tx+ox,ty+oy);if(o&&['stove','oven','fireplace','sink','counter','table','prep'].includes(o.k))return o;}return null;}
{const _ck=POSEFX.cook;POSEFX.cook=function(g,sx,sy,d,sd,t,e){const o=cookTarget(e),k=o&&o.k;
  if(k==='stove'||k==='oven'||k==='fireplace'){const a=t/170+sd,lx=sx+6+Math.round(Math.sin(a)*1.5),ly=sy-21+Math.round(Math.cos(a));
    g.fillStyle='#d8d0c4';g.fillRect(sx+4,ly+2,3,4);g.fillStyle='#f2e6da';g.fillRect(lx-1,ly+1,2,2);g.fillStyle='#6a4a30';g.fillRect(lx,ly-4,1,5);
    if(Math.random()<.06){const cx=(o.x+o.w/2)*T-(CAM.cx||0),cy=o.y*T-(CAM.cy||0);STEAM.push({x:cx-3+Math.random()*6,y:cy-6,t:0});}return;}
  if(k==='sink'){return POSEFX.wash(g,sx,sy,d,sd,t,e);}
  /* 조리대·탁자: 칼질 (김 없음) */
  const ph=Math.floor(t/140+sd*3)%4,ky=ph<2?0:2;g.fillStyle='#e8e2d8';g.fillRect(sx+3,sy-14+ky,4,1);g.fillStyle='#6a4a30';g.fillRect(sx+7,sy-14+ky,2,1);g.fillStyle='#f2e6da';g.fillRect(sx+2,sy-13+ky,2,2);};}

/* NPC 일거리 더하기: 서 있기만 하던 자리에 맞는 동작 (청소·검술 훈련·무기 손질·말 빗질·빨래 널기·바느질·장작 패기) */
const WORKPOSE={n_clean:'sweep',m_clean:'sweep',n_rooms:'sweep',n_rooms2:'sweep',n_ball:'sweep',e_hall:'dust',r_train:'train',d_train:'train',kn_train:'train',r_armory:'polish',d_armory:'polish',g_stable:'groom',g_paddock:'groom',t_stable:'groom',r_stable:'groom',m_line:'hang',o_sew:'sew',t_wood:'chop',c_flower:'water',o_flower:'water'};
for(const [k,ps] of Object.entries(WORKPOSE)){const v=ACTS[k];if(!Array.isArray(v))continue;for(const s of v)if(s[3]==='stand')s[3]=ps;}

const WP=(g,c,x,y,w,h)=>{g.fillStyle=c;g.fillRect(x,y,w,h);};
Object.assign(POSEFX,{
  sweep(g,sx,sy,d,sd,t){const k=Math.sin(t/180+sd)*3,s=d===2?-1:1,x=Math.round(sx+s*5+k*s);WP(g,'#7a5a3a',x,sy-17,1,14);WP(g,'#c9a050',x-2,sy-3,5,2);WP(g,'#9a7a40',x-2,sy-1,5,1);if(Math.random()<.03)STEAM.push({x:x+Math.random()*4-2,y:sy-2,t:0,b:1});},
  dust(g,sx,sy,d,sd,t){const k=Math.round(Math.sin(t/120+sd)*2),s=d===2?-1:1;WP(g,'#6a4a30',sx+s*6,sy-22+k,1,6);WP(g,'#e8e0d0',sx+s*6-1,sy-26+k,3,3);WP(g,'#c8b8a0',sx+s*6-1,sy-25+k,3,1);},
  train(g,sx,sy,d,sd,t){const ph=(t/260+sd)%1,s=d===2?-1:1,a=ph<.35?-1.2+ph*5:ph<.5?.6:.6-(ph-.5)*3.6;g.save();g.translate(sx+s*4,sy-14);g.rotate(a*s);WP(g,'#d8d8e0',0,-11,1,11);WP(g,'#8a6a40',-1,0,3,1);WP(g,'#5a4030',0,1,1,2);g.restore();},
  polish(g,sx,sy,d,sd,t){const k=Math.round(Math.sin(t/150+sd)*2);WP(g,'#d8d8e0',sx-5,sy-12,10,1);WP(g,'#8a6a40',sx+5,sy-13,2,3);WP(g,'#f4efe4',sx-2+k,sy-13,3,3);},
  groom(g,sx,sy,d,sd,t){const k=Math.round(Math.sin(t/160+sd)*3),s=d===2?-1:1;WP(g,'#7a5030',sx+s*7,sy-15+k,3,2);WP(g,'#c8a070',sx+s*7,sy-16+k,3,1);},
  hang(g,sx,sy,d,sd,t){const up=Math.floor(t/600+sd)%2,y=sy-(up?24:18);WP(g,'#f4f0e8',sx-3,y,7,5);WP(g,'#d8d0c0',sx-3,y+4,7,1);},
  sew(g,sx,sy,d,sd,t){const k=Math.floor(t/200+sd)%4;WP(g,'#c88a9a',sx-4,sy-11,8,4);WP(g,'#a8607a',sx-4,sy-8,8,1);WP(g,'#e8e8f0',sx-2+k*2,sy-13+(k%2),1,3);},
  chop(g,sx,sy,d,sd,t){const ph=(t/450+sd)%1,s=d===2?-1:1,a=ph<.6?-1.4+ph:(-.8+ (ph-.6)*5);g.save();g.translate(sx+s*4,sy-15);g.rotate(Math.min(.9,a)*s);WP(g,'#7a5a3a',0,-9,1,10);WP(g,'#b8b8c0',-2,-10,4,3);g.restore();if(ph>.75&&ph<.78&&Math.random()<.5)STEAM.push({x:sx+s*9,y:sy-2,t:0,b:1});},
  water(g,sx,sy,d,sd,t){const s=d===2?-1:1,x=sx+s*7;WP(g,'#7a8a9a',x-2,sy-14,5,4);WP(g,'#5a6a7a',x+s*3,sy-13,2,1);if(Math.random()<.2){WP(g,'#a8d0e8',x+s*5,sy-11+Math.floor(Math.random()*6),1,1);}}
});

/* ── 앉기: 진짜 의자에서만 · 한 의자에 한 명 ── */
const SEATK2=new Set(['chair','bench','stool','armchair','sofa']);
function seatTile(a,x,y){if(!a.map[y])return null;if(a.map[y][x]==='Y')return {k:'Y'};const o=objAt(a,x,y);return o&&SEATK2.has(o.k)?o:null;}
function seatDir(a,o,x,y){if(o&&o.d!=null)return o.d;let best=null,bd=9;for(const t of a.objs){if(!['table','desk','fireplace','piano'].includes(t.k))continue;const cx=t.x+t.w/2-.5,cy=t.y+t.h/2-.5,dd=Math.hypot(cx-x,cy-y);if(dd<bd){bd=dd;best=Math.abs(cx-x)>Math.abs(cy-y)?(cx<x?2:3):(cy<y?1:0);}}return best;}
function findSeat(a,x,y,taken){const rm=roomAt?roomAt(x,y):null;let best=null,bd=99;
  for(let dy=-4;dy<=4;dy++)for(let dx=-4;dx<=4;dx++){const xx=x+dx,yy=y+dy,o=seatTile(a,xx,yy);if(!o)continue;if(taken&&taken(xx,yy))continue;const d=Math.abs(dx)+Math.abs(dy);if(d<bd){bd=d;best=[xx,yy,o];}}return best;}
/* 불러올 때: 의자 없는 앉기 자리 → 가까운 의자로 옮기거나 서 있기로 */
(function(){let moved=0,stood=0;for(const [k,v] of Object.entries(ACTS)){if(!Array.isArray(v))continue;const a=AREAS[ACTS_AREA[k]];if(!a||!a.map)continue;const sv=A;A=a;
  for(const s of v){if(s[3]!=='sit'&&s[3]!=='tea')continue;if(seatTile(a,s[0],s[1]))continue;const f=findSeat(a,s[0],s[1]);
    if(f&&Math.abs(f[0]-s[0])+Math.abs(f[1]-s[1])<=3){s[0]=f[0];s[1]=f[1];const d=seatDir(a,f[2].k==='Y'?null:f[2],f[0],f[1]);if(d!=null)s[2]=d;moved++;}else{s[3]='stand';stood++;}}A=sv;}
  window.SEATFIX=[moved,stood];})();
/* 도착할 때: 그 의자에 이미 누가 앉아 있으면 빈 의자로, 없으면 옆에 서기 */
{const _ar=arrive;arrive=function(n){_ar(n);if(n.pose!=='sit'&&n.pose!=='tea')return;const a=AREAS[n.area];if(!a)return;const [tx,ty]=tileOf(n);
  const taken=(x,y)=>npcs.some(m=>m!==n&&m.area===n.area&&!m.hidden&&['sit','tea','write'].includes(m.pose)&&tileOf(m)[0]===x&&tileOf(m)[1]===y);
  if(seatTile(a,tx,ty)&&!taken(tx,ty))return;const f=findSeat(a,tx,ty,taken);
  if(f&&Math.abs(f[0]-tx)+Math.abs(f[1]-ty)<=4){n.x=f[0]*T+8;n.y=f[1]*T+14;const d=seatDir(a,f[2].k==='Y'?null:f[2],f[0],f[1]);if(d!=null)n.dir=d;}else n.pose='stand';};}
/* 플레이어도 의자 없는 곳에서 «앉기» 금지 (P.pose sit 은 의자에서만 시작되므로 그대로) */

/* ── 도구 동작: 원래 손 자리(스프라이트의 손 픽셀)에 도구 손잡이를 붙여, 손이 도구를 쥐도록 ── */
function handPt(e,sx,sy,d,side){const sp=e&&e.sp,h=sp?sp.height:32,top=sy-h+1;const row=top+Math.min(h-8,24);
  if(d===2)return [sx-8+5,row];if(d===3)return [sx-8+10,row];return [sx-8+(side<0?3:12),row];}
function skinAt(e){try{const sp=e.sp,q=sp.getContext('2d').getImageData(12,Math.min(sp.height-8,24),1,1).data;if(q[3]>100)return `rgb(${q[0]},${q[1]},${q[2]})`;}catch(_){}return '#f2d6c0';}
Object.assign(POSEFX,{
  sweep(g,sx,sy,d,sd,t,e){if(d===1)return;const s=d===2?-1:1,[hx,hy]=handPt(e,sx,sy,d,s),k=Math.round(Math.sin(t/180+sd)*3);
    /* 손잡이: 손을 지나 위로 5px, 아래로 빗자루 머리까지 (머리는 바닥에서 좌우로) */
    const bx=hx+k*s,by=sy-1;g.strokeStyle='#7a5a3a';g.lineWidth=1;g.beginPath();g.moveTo(hx+.5-k*s*.4,hy-6);g.lineTo(bx+.5,by-2);g.stroke();
    WP(g,'#c9a050',bx-2,by-2,5,2);WP(g,'#9a7a40',bx-2,by,5,1);WP(g,skinAt(e),hx-1,hy-1,2,2);if(Math.random()<.03)STEAM.push({x:bx+Math.random()*4-2,y:by,t:0,b:1});},
  dust(g,sx,sy,d,sd,t,e){if(d===1)return;const s=d===2?-1:1,[hx,hy]=handPt(e,sx,sy,d,s),k=Math.round(Math.sin(t/120+sd)*2);
    WP(g,'#6a4a30',hx,hy-6+k,1,6);WP(g,'#e8e0d0',hx-1,hy-9+k,3,3);WP(g,'#c8b8a0',hx-1,hy-8+k,3,1);WP(g,skinAt(e),hx-1,hy-1+k,2,2);},
  train(g,sx,sy,d,sd,t,e){if(d===1)return;const s=d===2?-1:1,[hx,hy]=handPt(e,sx,sy,d,s),ph=(t/260+sd)%1,a=ph<.35?-1.1+ph*4.6:ph<.5?.5:.5-(ph-.5)*3.2;
    g.save();g.translate(hx+.5,hy);g.rotate(a*s);WP(g,'#d8d8e0',0,-11,1,10);WP(g,'#f4f4f8',0,-11,1,2);WP(g,'#8a6a40',-1,-1,3,1);WP(g,'#5a4030',0,0,1,2);g.restore();WP(g,skinAt(e),hx-1,hy-1,2,2);},
  chop(g,sx,sy,d,sd,t,e){if(d===1)return;const s=d===2?-1:1,[hx,hy]=handPt(e,sx,sy,d,s),ph=(t/450+sd)%1,a=ph<.6?-1.3+ph:(-.7+(ph-.6)*4.5);
    g.save();g.translate(hx+.5,hy);g.rotate(Math.min(.9,a)*s);WP(g,'#7a5a3a',0,-9,1,10);WP(g,'#b8b8c0',-2,-10,4,3);g.restore();WP(g,skinAt(e),hx-1,hy-1,2,2);if(ph>.75&&ph<.78&&Math.random()<.5)STEAM.push({x:hx+s*5,y:sy-2,t:0,b:1});},
  polish(g,sx,sy,d,sd,t,e){if(d===1)return;const [rx,ry]=handPt(e,sx,sy,0,1),[lx,ly]=handPt(e,sx,sy,0,-1),k=Math.round(Math.sin(t/150+sd)*2);
    WP(g,'#d8d8e0',lx,ly,rx-lx,1);WP(g,'#8a6a40',rx,ly-1,2,3);WP(g,'#f4efe4',lx+3+k,ly-1,3,2);WP(g,skinAt(e),rx-1,ry-1,2,2);WP(g,skinAt(e),lx+3+k,ly,2,2);},
  groom(g,sx,sy,d,sd,t,e){if(d===1)return;const s=d===2?-1:1,[hx,hy]=handPt(e,sx,sy,d,s),k=Math.round(Math.sin(t/160+sd)*2);WP(g,'#7a5030',hx-1+k*s,hy-2,4,2);WP(g,'#c8a070',hx-1+k*s,hy-3,4,1);WP(g,skinAt(e),hx-1+k*s,hy-1,2,2);},
  hang(g,sx,sy,d,sd,t,e){if(d===1)return;const [rx,ry]=handPt(e,sx,sy,0,1),[lx]=handPt(e,sx,sy,0,-1),up=Math.floor(t/600+sd)%2?3:0;WP(g,'#f4f0e8',lx,ry-5-up,rx-lx+1,5);WP(g,'#d8d0c0',lx,ry-1-up,rx-lx+1,1);WP(g,skinAt(e),lx-1,ry-5-up,2,2);WP(g,skinAt(e),rx,ry-5-up,2,2);},
  sew(g,sx,sy,d,sd,t,e){if(d===1)return;const [rx,ry]=handPt(e,sx,sy,0,1),[lx]=handPt(e,sx,sy,0,-1),k=Math.floor(t/200+sd)%4;WP(g,'#c88a9a',lx+1,ry-2,rx-lx-1,3);WP(g,'#a8607a',lx+1,ry,rx-lx-1,1);WP(g,'#e8e8f0',lx+2+k*2,ry-4+(k%2),1,3);},
  water(g,sx,sy,d,sd,t,e){if(d===1)return;const s=d===2?-1:1,[hx,hy]=handPt(e,sx,sy,d,s);WP(g,'#7a8a9a',hx-2,hy,5,4);WP(g,'#5a6a7a',hx-1,hy-1,3,1);WP(g,'#5a6a7a',hx+s*3,hy+1,2,1);WP(g,skinAt(e),hx-1,hy-1,2,2);if(Math.random()<.2)WP(g,'#a8d0e8',hx+s*5,hy+2+Math.floor(Math.random()*5),1,1);}
});
