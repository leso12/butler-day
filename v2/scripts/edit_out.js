/* ═════════ 바깥 꾸미기 (대공성·마을): 칸 브러시로 길·잔디·나무·꽃·덤불·가로등·벤치·울타리 칠하기 ═════════ */
const EO={on:false,a:null,tool:':',size:1,mode:'paint',undo:[],stroke:null};
const EOT=[[':','돌길','#b8ad9c',1],['x','흙길','#b48a5c',1],[',','잔디','#7fae5a',1],['t','나무','#2f6a3a',0],['I','침엽수','#1f4f34',0],['f','꽃','#d77a9a',0],['z','산울타리','#3f8a4a',0],['l','가로등','#3a3030',0],['Y','벤치','#8a5a3a',0],['=','울타리','#6e4a30',0],['ERASE','지우개','#e8e0d0',1]];
const EOSOLID=new Set(['t','I','z','l','Y','=']);
function eoOK(a,x,y,ch){if(x<1||y<1||x>=a.MW-1||y>=a.MH-1)return false;const c=a.map[y][x];if('%GdDFLJWr#'.includes(c))return false;
  if(a.BLD&&a.BLD.some(b=>x>=b[2]&&x<b[2]+b[4]&&y>=b[3]&&y<b[3]+b[5]))return false;
  if(EOSOLID.has(ch)&&(a.doors||[]).some(d=>Math.abs(d.x-x)<=0&&(y===d.y||y===d.y+1||y===d.y-1)))return false;   /* 문·성문 앞은 막지 않음 */
  return true;}
function eoSet(a,x,y,ch,log){if(!eoOK(a,x,y,ch))return;const om=a.map[y][x],of=a.floor?a.floor[y][x]:null;let m=ch,f=of;
  if(ch==='ERASE'){m=',';f=',';}else if(ch===':'||ch==='x'||ch===','){m=ch;f=ch;}else{f=(of&&!'tIfzlY='.includes(of))?of:',';}
  if(om===m&&of===f)return;log.push([x,y,om,of]);a.map[y][x]=m;if(a.floor)a.floor[y][x]=f;
  S.tileEdits=S.tileEdits||{};const E=S.tileEdits[a.id]=S.tileEdits[a.id]||{t:{}};E.t[x+','+y]=[m,f];}
function eoLamps(a){if(typeof LAMPS==='undefined')return;const keep=(LAMPS[a.id]||[]).filter(q=>q.obj);LAMPS[a.id]=keep;for(let y=0;y<a.MH;y++)for(let x=0;x<a.MW;x++)if(a.map[y][x]==='l'){const q=[x*T+8,y*T-42];q.tw=1;LAMPS[a.id].push(q);}for(const o of a.objs)if(o.k==='lamp'){const q=[o.x*T+8,o.y*T-4];q.obj=1;LAMPS[a.id].push(q);}}
function eoRebuild(a){if(typeof SEAS_CACHE!=='undefined')SEAS_CACHE[a.id]={};buildArea(a);if(typeof SEAS_CACHE!=='undefined'&&typeof SEAS!=='undefined')SEAS_CACHE[a.id][SEAS]={cv:a.cv,dyn:a.dyn,full:a.full};eoLamps(a);}
/* 저장된 칸 적용 */
function eoApply(a){const E=S&&S.tileEdits&&S.tileEdits[a.id];if(!E||a._eov===E.v)return false;for(const [k,v] of Object.entries(E.t)){const [x,y]=k.split(',').map(Number);if(!a.map[y])continue;a.map[y][x]=v[0];if(a.floor&&v[1]!=null)a.floor[y][x]=v[1];}a._eov=E.v;return true;}
setInterval(()=>{try{if(EO.on||typeof S==='undefined'||!S||!S.tileEdits||!S.area)return;const a=AREAS[S.area];if(a&&a.outdoor&&eoApply(a))eoRebuild(a);}catch(e){}},800);
(function(){const st=document.createElement('style');st.textContent=`#eobar{position:fixed;left:0;right:0;bottom:0;z-index:60;background:#f4ead8;border-top:3px solid #a8846a;padding:5px 6px calc(6px + env(safe-area-inset-bottom));display:none;color:#4a3426}
#eobar .r{display:flex;gap:4px;align-items:center;justify-content:center;margin:3px 0;flex-wrap:nowrap}#eobar .tools{justify-content:flex-start;overflow-x:auto;padding-bottom:2px}
#eobar button{font:inherit;font-size:13px;min-height:40px;padding:3px 7px;background:#fffaf1;border:2px solid #a8846a;color:#4a3426;border-radius:0;flex:none;display:flex;align-items:center;gap:4px}
#eobar button.on{background:#5b4339;color:#fff;border-color:#3a2a20}#eobar button.k{background:#5b4339;color:#f7efe2}#eobar i{display:inline-block;width:12px;height:12px;border:1px solid rgba(0,0,0,.35)}
#eobar .info{font-size:12.5px;text-align:center;min-height:16px}`;document.head.appendChild(st);
  const bar=document.createElement('div');bar.id='eobar';document.body.appendChild(bar);
  const cv=document.getElementById('game'),ov=document.getElementById('edov');let dn=null;
  const tileOfE=e=>{const [wx,wy]=tapWorld(e);return [Math.floor(wx/T),Math.floor(wy/T)];};
  const paint=(x,y)=>{const a=EO.a,r=EO.size===3?1:0;for(let dy=-r;dy<=r;dy++)for(let dx=-r;dx<=r;dx++)eoSet(a,x+dx,y+dy,EO.tool,EO.stroke);};
  cv.addEventListener('pointerdown',e=>{if(!EO.on)return;e.stopImmediatePropagation();const [tx,ty]=tileOfE(e);dn={x:e.clientX,y:e.clientY,px:P.x,py:P.y,lt:[tx,ty]};if(EO.mode==='paint'){EO.stroke=[];paint(tx,ty);}},true);
  cv.addEventListener('pointermove',e=>{if(!EO.on||!dn)return;if(EO.mode==='pan'){const r=cv.getBoundingClientRect(),a=EO.a;P.x=Math.max(8,Math.min(a.MW*T-8,dn.px-(e.clientX-dn.x)/r.width*VW));P.y=Math.max(8,Math.min(a.MH*T-8,dn.py-(e.clientY-dn.y)/r.height*VH));return;}
    const [tx,ty]=tileOfE(e),[lx,ly]=dn.lt;if(tx===lx&&ty===ly)return;const n=Math.max(Math.abs(tx-lx),Math.abs(ty-ly));for(let i=1;i<=n;i++)paint(Math.round(lx+(tx-lx)*i/n),Math.round(ly+(ty-ly)*i/n));dn.lt=[tx,ty];},true);
  cv.addEventListener('pointerup',e=>{if(!EO.on||!dn)return;e.stopImmediatePropagation();dn=null;if(EO.mode==='paint'&&EO.stroke){if(EO.stroke.length){EO.undo.push(EO.stroke);if(EO.undo.length>60)EO.undo.shift();const E=S.tileEdits[EO.a.id];E.v=Date.now();EO.a._eov=E.v;eoRebuild(EO.a);eoInfo(EO.stroke.length+'칸 칠함');}else eoInfo('여기는 칠할 수 없어요 (건물·문 앞·물·가장자리)');EO.stroke=null;}},true);
  /* 칠하는 중 미리보기 */
  function loop(){requestAnimationFrame(loop);if(!EO.on)return;const r=cv.getBoundingClientRect();ov.style.display='block';ov.style.left=r.left+'px';ov.style.top=r.top+'px';ov.style.width=r.width+'px';ov.style.height=r.height+'px';if(ov.width!==VW*2){ov.width=VW*2;ov.height=VH*2;}
    const g=ov.getContext('2d');g.setTransform(2,0,0,2,0,0);g.clearRect(0,0,VW,VH);g.translate(-CAM.cx,-CAM.cy);const col=(EOT.find(t=>t[0]===EO.tool)||[])[2]||'#fff';
    if(EO.stroke){g.fillStyle=col;g.globalAlpha=.6;for(const [x,y] of EO.stroke)g.fillRect(x*T+1,y*T+1,T-2,T-2);g.globalAlpha=1;}
    if(!EO.nogrid){g.strokeStyle='rgba(255,255,255,.18)';g.lineWidth=.5;const x0=Math.floor(CAM.cx/T),y0=Math.floor(CAM.cy/T);for(let x=x0;x<=x0+VW/T+1;x++){g.beginPath();g.moveTo(x*T,CAM.cy);g.lineTo(x*T,CAM.cy+VH);g.stroke();}for(let y=y0;y<=y0+VH/T+1;y++){g.beginPath();g.moveTo(CAM.cx,y*T);g.lineTo(CAM.cx+VW,y*T);g.stroke();}}}
  loop();})();
function eoInfo(t){const el=document.getElementById('eoinfo');if(el)el.textContent=t;}
function eoBar(){const bar=document.getElementById('eobar');bar.innerHTML=`<div class="info" id="eoinfo">${EO.mode==='paint'?'손가락으로 끌어 칠해요':'화면을 끌어 둘러봐요'}</div>
<div class="r tools">${EOT.map(t=>`<button data-t="${t[0]}" class="${EO.tool===t[0]?'on':''}"><i style="background:${t[2]}"></i>${t[1]}</button>`).join('')}</div>
<div class="r"><button data-c="mode" class="${EO.mode==='paint'?'on':''}">${EO.mode==='paint'?'칠하기':'둘러보기'}</button><button data-c="size">${EO.size===3?'굵게 3칸':'1칸'}</button><button data-c="undo">되돌리기</button><button data-c="more">더보기</button></div>
<div class="r"><span style="font-size:12px;background:#5b4339;color:#f7efe2;padding:2px 6px">⏸ 시간 멈춤</span><button data-c="cancel">저장 안 하고 나가기</button><button data-c="done" class="k">저장하고 나가기</button></div>`;
  bar.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>{EO.tool=b.dataset.t;EO.mode='paint';eoBar();});
  bar.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>eoCmd(b.dataset.c));}
function eoCmd(c){const a=EO.a;
  if(c==='mode'){EO.mode=EO.mode==='paint'?'pan':'paint';eoBar();return;}
  if(c==='size'){EO.size=EO.size===3?1:3;eoBar();return;}
  if(c==='undo'){const st=EO.undo.pop();if(!st)return toast('되돌릴 것이 없어요');const E=S.tileEdits[a.id];for(let i=st.length-1;i>=0;i--){const [x,y,om,of]=st[i];a.map[y][x]=om;if(a.floor)a.floor[y][x]=of;E.t[x+','+y]=[om,of];}E.v=Date.now();a._eov=E.v;eoRebuild(a);return;}
  if(c==='more'){const el=document.getElementById('edcat');el.innerHTML=`<div class="hd"><span>더보기</span><button id="edcx">닫기</button></div><div class="tabs" style="max-height:none;flex-wrap:wrap"><button data-m="grid">격자 ${EO.nogrid?'켜기':'끄기'}</button><button data-m="reset">이 지역 전부 원래대로</button><button data-m="exp">내보내기 (원본 반영용)</button></div><p style="padding:8px;font-size:13px;line-height:1.5">· 위 줄에서 칠할 것을 고르고 화면을 끌면 칠해져요<br>· «둘러보기»로 바꾸면 화면이 움직여요<br>· 건물·문 앞·물·지도 가장자리는 칠할 수 없어요<br>· 지우개는 잔디로 되돌려요<br>· 원래대로는 다시 불러올 때 완전히 적용돼요</p>`;el.style.display='flex';el.querySelector('#edcx').onclick=()=>el.style.display='none';
    el.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>{el.style.display='none';const m=b.dataset.m;if(m==='grid'){EO.nogrid=!EO.nogrid;return;}if(m==='exp')return edExport();if(m==='reset'){if(!confirm('이 지역에서 칠한 것을 모두 지울까요? (저장 후 다시 불러오면 처음 모습)'))return;const E=S.tileEdits&&S.tileEdits[a.id];if(E&&a._eo0){for(const k of Object.keys(E.t)){const [x,y]=k.split(',').map(Number);const o=a._eo0[k];if(o){a.map[y][x]=o[0];if(a.floor)a.floor[y][x]=o[1];}}}delete S.tileEdits[a.id];EO.undo=[];eoRebuild(a);toast('원래대로 되돌렸어요');}});return;}
  if(c==='cancel'){if(!confirm('이번에 칠한 것을 모두 버리고 나갈까요?'))return;while(EO.undo.length){const st=EO.undo.pop();for(let i=st.length-1;i>=0;i--){const [x,y,om,of]=st[i];a.map[y][x]=om;if(a.floor)a.floor[y][x]=of;}}S.tileEdits=JSON.parse(EO.tsnap||'{}');const E=S.tileEdits[a.id];a._eov=E?E.v:undefined;eoRebuild(a);EO.on=false;busy=false;P.x=EO.pp[0];P.y=EO.pp[1];ZOOM=EO.z||0;resize();document.getElementById('eobar').style.display='none';document.getElementById('edcat').style.display='none';document.getElementById('edov').style.display='none';toast('칠한 것을 버리고 나왔어요');return;}
  if(c==='done')return eoExit();}
function eoEnter(){const a=AREAS[S.area];if(!a||!a.outdoor)return;if(D||SCENE)return;
  if(!a._eo0){a._eo0={};for(let y=0;y<a.MH;y++)for(let x=0;x<a.MW;x++)a._eo0[x+','+y]=[a.map[y][x],a.floor?a.floor[y][x]:null];}
  EO.on=true;EO.a=a;EO.undo=[];EO.tsnap=JSON.stringify(S.tileEdits||{});EO.pp=[P.x,P.y];EO.z=ZOOM;busy=true;$('#panel').hidden=true;ZOOM=-9;resize();document.getElementById('eobar').style.display='block';eoBar();}
function eoExit(){EO.on=false;busy=false;P.x=EO.pp[0];P.y=EO.pp[1];ZOOM=EO.z||0;resize();document.getElementById('eobar').style.display='none';document.getElementById('edcat').style.display='none';document.getElementById('edov').style.display='none';try{save();}catch(e){}toast('바깥 꾸미기를 저장했어요');}
{const _wh2=workHold;workHold=function(){return EO.on||_wh2();};}
/* 설정의 «꾸미기» 시작 버튼: 실내면 방 꾸미기, 바깥이면 바깥 꾸미기 */
{const _ee=edEnter;edEnter=function(){const a=AREAS[S.area];if(a&&a.outdoor)return eoEnter();return _ee();};}
{const _tpO=togglePanel;togglePanel=function(kind,arg,keep){_tpO(kind,arg,keep);const p=$('#panel');const r=p&&p.querySelector('#edgo');if(r){const row=r.closest('.row');const tn=row&&row.querySelector('.tn'),tw=row&&row.querySelector('.tw');if(tn)tn.textContent='꾸미기';if(tw)tw.textContent='실내: 가구 옮기기·벽지 / 바깥(대공성·마을): 길·나무·꽃·가로등 칠하기';}};}
/* 내보내기에 바깥 칸도 포함 */
{const _ex=edExport;edExport=function(){_ex();const ta=document.querySelector('#edcat textarea');if(ta){try{const o=JSON.parse(ta.value);o.tileEdits=S.tileEdits||{};ta.value=JSON.stringify(o);}catch(e){}}};}
