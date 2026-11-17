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
setInterval(()=>{JWF++;const pb=document.getElementById('pbox');if(pb&&!pb.hidden){const nm=(document.getElementById('pname')||{}).textContent||'';const id=Object.keys(CH).find(k=>CH[k].name===nm&&k!=='eren');const j=document.getElementById('pjw');if(j){const ok=id&&S.pts&&(id in S.pts);j.dataset.jw=ok?id:'';j.style.display=ok?'':'none';}}drawJewels();},250);
/* 대화 초상화: 이름 옆에 하트 병 */
(function(){const pb=document.getElementById('pbox'),pn=document.getElementById('pname');if(pb&&pn&&!document.getElementById('pjw')){const row=document.createElement('div');row.className='pnrow';pn.parentNode.insertBefore(row,pn);const c=document.createElement('canvas');c.id='pjw';c.className='jwl';c.width=11;c.height=11;row.appendChild(c);row.appendChild(pn);}
  const st=document.createElement('style');st.textContent=`#pbox{--pw:150px;width:var(--pw)!important;padding:4px!important;box-sizing:border-box}
#pbox #pcv{width:100%!important;height:auto!important;aspect-ratio:1/1;display:block}
#pbox .pnrow{align-self:stretch;display:flex;align-items:center;justify-content:center;gap:4px;margin-top:4px;padding:2px 6px 2px 3px;background:#5b4339;border:1px solid #c9a77a}
#pbox .pnrow #pname{margin:0!important;padding:0!important;background:none!important;border:0!important;font-size:15px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#pjw{width:30px;height:30px;flex:none}
@media (max-width:440px){#pbox{--pw:124px}#pbox .pnrow #pname{font-size:13.5px}#pjw{width:28px;height:28px}}
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
