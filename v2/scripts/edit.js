/* ═════════ 방 꾸미기 모드: 가구 선택·이동·삭제·추가 + 벽지/바닥 고르기 + 저장/내보내기 ═════════ */
const ED={on:false,a:null,sel:null,undo:[],cat:null,tab:null};
const EDN={deco:'장식',bed:'침대',table:'탁자',chair:'의자',armchair:'안락의자',sofa:'소파',shelf:'책장',wardrobe:'옷장',cabinet:'장식장',dresser:'서랍장',desk:'책상',lamp:'스탠드',plant:'화분',rug:'러그',clock:'시계',fireplace:'벽난로',painting:'그림',piano:'피아노',globe:'지구본',screen:'칸막이',mirror:'거울',stool:'스툴',bench:'벤치',books_pile:'책더미',pillar:'기둥',counter:'카운터',stove:'화덕',oven:'오븐',barrel:'통',keg:'술통',winerack:'와인 선반',mannequin:'마네킹',medcab:'약장',sink:'개수대',chest:'궤짝',armor:'갑옷',sack:'자루',boxes:'상자 더미',crate:'나무 상자',basket:'바구니',tub:'빨래통',rack:'걸이',tree_pot:'큰 화분',bucket:'양동이',weaponrack:'무기 걸이',breadshelf:'빵 진열대',display:'진열장',safe:'금고',bar:'바',fabric:'옷감',register:'계산대',cake:'케이크'};
const EDSKIP=new Set(['stairs','line','bed_planter','horse','hay','stall']);
const edRoom=(a,x,y)=>a.ROOMS&&a.ROOMS.find(r=>x>=r[2]&&x<r[2]+r[4]&&y>=r[3]&&y<r[3]+r[5]);
function edBlk(a){a.blk=new Uint8Array(a.MW*a.MH);a.otile={};for(const o of a.objs){if(o.k==='rug')o.walk=1;for(let j=0;j<o.h;j++)for(let i=0;i<o.w;i++){const k=(o.y+j)*a.MW+o.x+i;if(!o.walk)a.blk[k]=1;if(o.it||!a.otile[k]||!a.otile[k].it)a.otile[k]=o;}}}
const edClone=o=>{const q={};for(const k in o)if(typeof o[k]!=='function'&&typeof o[k]!=='object')q[k]=o[k];return q;};
/* 저장된 배치 적용 (불러오기·새로 그리기 때) */
function edApply(a){if(!S||!S.edits||!S.edits[a.id]||a._edv===S.edits[a.id].v)return;if(!a._orig0)a._orig0=a.objs.map(edClone);a.objs=S.edits[a.id].objs.map(o=>({...o}));a._edv=S.edits[a.id].v;edBlk(a);}
{const _ba=buildArea;buildArea=function(a){if(a&&!a.outdoor&&typeof S!=='undefined'&&S)try{edApply(a);}catch(e){}_ba(a);};}
/* 벽지·바닥: 방마다 시트 선택 (wf2 = 기존 시트, rustic = 시골풍) */
function edWF(rm){const o=S&&S.roomWF&&S.roomWF[rm];return o||null;}
{const _dt=drawTile;drawTile=function(g,x,y){_dt(g,x,y);const a=A;if(!a||a.outdoor||!S||!S.roomWF)return;const rm=edRoom(a,x,y);if(!rm)return;const o=S.roomWF[rm[0]];if(!o)return;
  const c=a.map[y][x],isW=ch=>ch==='w'||ch==='n',X=x*T,Y=y*T;const im=s=>s==='wf2'?(WF2OK?WF2IMG:null):s==='rustic'?(W6.wf.ok?W6.wf.im:null):(WFOK?WFIMG:null);
  if(o.w!=null&&isW(c)&&a.map[y][x]!=='n'){const I=im(o.ws);if(I){const up=a.map[y-1]&&a.map[y-1][x],dn=a.map[y+1]&&a.map[y+1][x],row=!isW(up)?0:isW(dn)?1:2;g.drawImage(I,(o.w%16)*16,Math.floor(o.w/16)*48+row*16,16,16,X,Y,16,16);}}
  else if(o.f!=null&&c===rm[6]){const I=im(o.fs);if(I)g.drawImage(I,(o.f%8)*32+(x%2)*16,336+Math.floor(o.f/8)*32+(y%2)*16,16,16,X,Y,16,16);}};}
/* 창 칸('n')도 벽지를 먼저 깔고 창을 그리도록: 창 그리기 직전에 벽지 */
{const _dt2=drawTile;drawTile=function(g,x,y){const a=A;if(a&&!a.outdoor&&S&&S.roomWF&&a.map[y][x]==='n'){const rm=edRoom(a,x,y),o=rm&&S.roomWF[rm[0]];if(o&&o.w!=null){a.map[y][x]='w';_dt2(g,x,y);a.map[y][x]='n';/* 창 그림 */const up=a.map[y-1]&&a.map[y-1][x],dn=a.map[y+1]&&a.map[y+1][x];if(dn!=='n'){const spec=W6WIN[rm[0]];if(spec!==null){const S_=W6['w_'+(SEASK[SZ()]||'summer')+w6var()]||W6['w_'+(SEASK[SZ()]||'summer')];if(S_&&S_.ok){let k=spec?spec[0]:3;if(spec&&spec[1])k+=(x%2);const top=up==='n'?(y-1)*T:y*T-16;g.drawImage(S_.im,k*16,0,16,48,x*T,top-13,16,48);}}}return;}}_dt2(g,x,y);};}
{const _wh=workHold;workHold=function(){return ED.on||_wh();};}
/* ── 화면 ── */
(function(){const st=document.createElement('style');st.textContent=`
#edov{position:fixed;pointer-events:none;z-index:40;image-rendering:pixelated}
#edbar{position:fixed;left:0;right:0;bottom:0;z-index:60;background:#f4ead8;border-top:3px solid #a8846a;padding:6px 8px calc(6px + env(safe-area-inset-bottom));display:none;font-family:inherit;color:#4a3426}
#edbar .r{display:flex;gap:4px;flex-wrap:nowrap;align-items:center;justify-content:center;margin:3px 0}
#edbar button{font:inherit;font-size:13px;min-height:40px;min-width:34px;padding:4px 6px;background:#fffaf1;border:2px solid #a8846a;color:#4a3426;border-radius:0}
#edbar button.k{background:#5b4339;color:#f7efe2;border-color:#3a2a20}#edbar button:disabled{opacity:.4}
#edbar .info{font-size:13px;text-align:center;min-height:18px}
#edcat{position:fixed;left:6px;right:6px;top:60px;bottom:170px;z-index:61;background:#fffaf1;border:3px solid #a8846a;display:none;flex-direction:column;color:#4a3426}
#edcat .tabs{display:flex;gap:4px;flex-wrap:nowrap;padding:5px 6px;border-bottom:1px solid #e2d2b8;overflow-x:auto;flex:none}#edcat .tabs button{flex:none}
#edcat .tabs button{font:inherit;font-size:13px;color:#4a3426;padding:3px 8px;background:#f4ead8;border:1px solid #c9a77a}#edcat .tabs button.on{background:#5b4339;color:#fff}
#edcat .grid{flex:1;overflow:auto;display:grid;align-content:start;grid-auto-rows:min-content;grid-template-columns:repeat(auto-fill,minmax(76px,1fr));gap:6px;padding:8px}
#edcat .it{border:2px solid #e2d2b8;background:#f8f1e4;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;padding:3px;cursor:pointer;min-height:84px}
#edcat .it canvas{image-rendering:pixelated;max-width:68px;max-height:64px}#edcat .it span{font-size:10.5px;line-height:1.1;text-align:center;word-break:break-all;margin-top:2px}
#edcat .hd{display:flex;justify-content:space-between;align-items:center;padding:6px 8px;font-weight:bold}#edcat .hd button{font:inherit;font-size:14px;color:#4a3426;min-width:64px;white-space:nowrap;min-height:34px;padding:2px 10px;border:2px solid #a8846a;background:#fffaf1}
#edcat textarea{flex:1;margin:8px;font-size:11px;font-family:monospace}`;document.head.appendChild(st);
  const ov=document.createElement('canvas');ov.id='edov';document.body.appendChild(ov);
  const bar=document.createElement('div');bar.id='edbar';bar.innerHTML=`<div class="info" id="edinfo">가구를 눌러 고르고, 빈 바닥을 누르면 그 자리로 옮겨요 · 화면을 끌면 둘러보기</div>
<div class="r"><button data-e="L">◀</button><button data-e="U">▲</button><button data-e="D">▼</button><button data-e="R">▶</button><button data-e="dup">복제</button><button data-e="flip">반전</button><button data-e="rot">돌리기</button><button data-e="del">지우기</button></div>
<div class="r"><button data-e="add" class="k">＋ 가구</button><button data-e="wall">벽지</button><button data-e="floor">바닥</button><button data-e="undo">되돌리기</button><button data-e="more">더보기</button><button data-e="done" class="k">저장·나가기</button></div>`;document.body.appendChild(bar);
  const cat=document.createElement('div');cat.id='edcat';document.body.appendChild(cat);
  bar.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;edCmd(b.dataset.e);});
  const cv=document.getElementById('game');let dn=null;
  cv.addEventListener('pointerdown',e=>{if(!ED.on)return;const [wx,wy]=tapWorld(e),tx=Math.floor(wx/T),ty=Math.floor(wy/T),o=ED.sel&&edPick(ED.a,tx,ty)===ED.sel?ED.sel:null;dn={x:e.clientX,y:e.clientY,px:P.x,py:P.y,t:performance.now(),mv:false,drag:o,ox:o&&o.x,oy:o&&o.y,tx,ty};if(o)edSnap();},true);
  cv.addEventListener('pointermove',e=>{if(!ED.on||!dn)return;const dx=e.clientX-dn.x,dy=e.clientY-dn.y;if(Math.hypot(dx,dy)>10)dn.mv=true;if(dn.mv&&dn.drag){const [wx,wy]=tapWorld(e),nx=dn.ox+Math.floor(wx/T)-dn.tx,ny=dn.oy+Math.floor(wy/T)-dn.ty,s=dn.drag;if(nx!==s.x||ny!==s.y){const px=s.x,py=s.y;s.x=nx;s.y=ny;if(!edValid(ED.a,s)){s.x=px;s.y=py;}else edCommit();}return;}if(dn.mv){const r=cv.getBoundingClientRect(),a=ED.a;P.x=Math.max(8,Math.min(a.MW*T-8,dn.px-dx/r.width*VW));P.y=Math.max(8,Math.min(a.MH*T-8,dn.py-dy/r.height*VH));}},true);
  cv.addEventListener('pointerup',e=>{if(!ED.on||!dn)return;e.stopImmediatePropagation();const d=dn;dn=null;if(d.drag&&!d.mv)ED.undo.pop();if(d.drag&&d.mv){if(d.drag.x===d.ox&&d.drag.y===d.oy)ED.undo.pop();else edInfo('옮김: '+edName(d.drag));return;}if(d.mv)return;const [wx,wy]=tapWorld(e);edTap(Math.floor(wx/T),Math.floor(wy/T));},true);
  function loop(){requestAnimationFrame(loop);if(!ED.on){let eo=false;try{eo=EO.on;}catch(_){}if(!eo)ov.style.display='none';return;}const r=cv.getBoundingClientRect();ov.style.display='block';ov.style.left=r.left+'px';ov.style.top=r.top+'px';ov.style.width=r.width+'px';ov.style.height=r.height+'px';if(ov.width!==VW*2){ov.width=VW*2;ov.height=VH*2;}
    const g=ov.getContext('2d');g.setTransform(2,0,0,2,0,0);g.clearRect(0,0,VW,VH);const a=ED.a;if(!a)return;g.translate(-CAM.cx,-CAM.cy);
    if(!ED.nogrid){g.strokeStyle='rgba(255,240,200,.28)';g.lineWidth=.5;}else g.strokeStyle='rgba(0,0,0,0)';const x0=Math.floor(CAM.cx/T),y0=Math.floor(CAM.cy/T);for(let x=x0;x<=x0+VW/T+1;x++){g.beginPath();g.moveTo(x*T,CAM.cy);g.lineTo(x*T,CAM.cy+VH);g.stroke();}for(let y=y0;y<=y0+VH/T+1;y++){g.beginPath();g.moveTo(CAM.cx,y*T);g.lineTo(CAM.cx+VW,y*T);g.stroke();}
    const o=ED.sel;if(o){const ok=edValid(a,o);g.lineWidth=1.5;g.strokeStyle=ok?'#e0a030':'#d03030';g.setLineDash([3,2]);g.strokeRect(o.x*T+.75,o.y*T+.75,o.w*T-1.5,o.h*T-1.5);g.setLineDash([]);g.fillStyle=ok?'rgba(224,160,48,.15)':'rgba(208,48,48,.2)';g.fillRect(o.x*T,o.y*T,o.w*T,o.h*T);}}
  loop();})();
function edInfo(t){const el=document.getElementById('edinfo');if(el)el.textContent=t;}
function edName(o){return (o.nm?o.nm.replace(/([a-z])([A-Z])/g,'$1 $2'):(EDN[o.k]||o.k))+(o.oa?' · '+o.oa:'')+` (${o.w}×${o.h})`;}
/* 놓을 수 있는가: 방 안 바닥, 다른 가구와 겹치지 않음(러그 제외), 문 앞 막지 않음 */
function edValid(a,o){const rm=edRoom(a,o.x,o.y+o.h-1);if(!rm)return false;const wallOK=o.k==='painting';
  for(let j=0;j<o.h;j++)for(let i=0;i<o.w;i++){const x=o.x+i,y=o.y+j;if(!edRoom(a,x,y)||edRoom(a,x,y)!==rm)return false;const c=a.map[y]&&a.map[y][x];if(c==null)return false;
    if(wallOK){if(!(c==='w'||c==='n'))return false;continue;}if('#wnvdD'.includes(c)||c==='%')return false;
    if(!o.walk)for(const [dx,dy] of [[0,1],[0,-1],[1,0],[-1,0]]){const cc=a.map[y+dy]&&a.map[y+dy][x+dx];if(cc==='d'||cc==='D')return false;}
    for(const q of a.objs){if(q===o||q.k==='painting')continue;if(x>=q.x&&x<q.x+q.w&&y>=q.y&&y<q.y+q.h){if(o.k==='rug'||q.k==='rug')continue;if(o.walk&&q.walk&&o.k!=='rug'&&q.k!=='rug')return false;return false;}}}
  return true;}
function edPick(a,tx,ty){let best=null,bs=99;for(const o of a.objs){if(EDSKIP.has(o.k))continue;const inX=tx>=o.x&&tx<o.x+o.w;if(!inX)continue;const top=o.y-(o.k==='rug'||o.k==='painting'?0:2);if(ty<top||ty>=o.y+o.h)continue;const s=(o.k==='rug'?10:0)+(ty>=o.y?0:2)+Math.abs(ty-(o.y+o.h-1))*.1;if(s<bs){bs=s;best=o;}}return best;}
function edSnap(){ED.undo.push(ED.a.objs.map(edClone));if(ED.undo.length>40)ED.undo.shift();}
function edCommit(){const a=ED.a;edBlk(a);buildArea(a);}
function edTap(tx,ty){const a=ED.a;const o=edPick(a,tx,ty);
  if(o&&o!==ED.sel){ED.sel=o;edInfo('고름: '+edName(o)+(o.it?' · 업무·이벤트용 (지우기 불가)':''));return;}
  if(ED.sel&&!o||(o===ED.sel)){if(o===ED.sel){ED.sel=null;edInfo('선택 해제');return;}const s=ED.sel,ox=s.x,oy=s.y;edSnap();s.x=tx;s.y=ty-s.h+1;if(!edValid(a,s)){s.x=ox;s.y=oy;ED.undo.pop();toast('거기엔 놓을 수 없어요 (벽·문 앞·다른 가구)');return;}edCommit();edInfo('옮김: '+edName(s));}}
function edMove(dx,dy){const s=ED.sel;if(!s)return toast('먼저 가구를 골라 주세요');edSnap();s.x+=dx;s.y+=dy;if(!edValid(ED.a,s)){s.x-=dx;s.y-=dy;ED.undo.pop();toast('더 갈 수 없어요');return;}edCommit();}
function edCmd(c){const a=ED.a;
  if(c==='L')return edMove(-1,0);if(c==='R')return edMove(1,0);if(c==='U')return edMove(0,-1);if(c==='D')return edMove(0,1);
  if(c==='del'){const s=ED.sel;if(!s)return toast('먼저 가구를 골라 주세요');if(s.it)return toast('업무·이벤트에 쓰는 가구라 지울 수 없어요 (옮기기는 돼요)');edSnap();a.objs.splice(a.objs.indexOf(s),1);ED.sel=null;edCommit();edInfo('지웠어요');return;}
  if(c==='undo'){const u=ED.undo.pop();if(!u)return toast('되돌릴 것이 없어요');a.objs=u.map(o=>({...o}));ED.sel=null;edCommit();return;}
  if(c==='dup'){const s0=ED.sel;if(!s0)return toast('먼저 가구를 골라 주세요');const q=edClone(s0);delete q.it;delete q.set;edPlace(q,s0.x+s0.w,s0.y);return;}
  if(c==='flip'){const s0=ED.sel;if(!s0)return toast('먼저 가구를 골라 주세요');if(s0.pk==null)return toast('«＋ 가구»로 놓은 가구만 반전할 수 있어요');edSnap();s0.fl=s0.fl?0:1;edCommit();return;}
  if(c==='rot'){const s0=ED.sel;if(!s0)return toast('먼저 가구를 골라 주세요');if(s0.pk==null||!(s0.rot>1))return toast('돌릴 수 있는 가구가 아니에요');edSnap();s0.r=((s0.r||0)+1)%s0.rot;s0.i=s0.i0+s0.r*s0.sw;edCommit();return;}
  if(c==='more'){const el=document.getElementById('edcat');el.innerHTML=`<div class="hd"><span>더보기</span><button id="edcx">닫기</button></div><div class="tabs" style="max-height:none"><button data-m="reset">이 방 원래대로</button><button data-m="exp">내보내기 (원본 반영용)</button><button data-m="grid">격자 ${ED.nogrid?'켜기':'끄기'}</button></div><p style="padding:8px;font-size:13px;line-height:1.5">· 가구를 고른 뒤 손가락으로 끌면 옮겨져요<br>· 빈 곳을 끌면 화면이 움직여요<br>· 빨간 점선은 놓을 수 없는 자리예요 (벽·문 앞·겹침)<br>· 업무·이벤트용 가구는 옮길 수만 있어요</p>`;el.style.display='flex';el.querySelector('#edcx').onclick=()=>el.style.display='none';el.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>{el.style.display='none';const m=b.dataset.m;if(m==='grid'){ED.nogrid=!ED.nogrid;return;}edCmd(m);});return;}
  if(c==='add')return edCatalog();if(c==='wall')return edSheet('w');if(c==='floor')return edSheet('f');if(c==='exp')return edExport();
  if(c==='reset'){const rm=edRoom(a,Math.floor(P.x/T),Math.floor((P.y-4)/T));if(!rm)return toast('방 안에서 눌러 주세요');if(!confirm(`«${rm[1]}»을 처음 배치로 되돌릴까요?`))return;edSnap();const orig=(a._orig0||a.objs).map(o=>({...o})),inR=o=>edRoom(a,o.x,o.y+o.h-1)===rm;a.objs=a.objs.filter(o=>!inR(o)).concat(orig.filter(inR));if(S.roomWF)delete S.roomWF[rm[0]];ED.sel=null;edCommit();toast('원래대로 되돌렸어요');return;}
  if(c==='done')return edExit();}
/* 가구 목록: 보낸 가구 시트 전부(정의 파일 기준) + 게임 속 가구 */
const FSETS=[['all','전체'],['recent','최근'],['game','게임 속'],['OW','고풍 저택'],['EV','빅토리아'],['OA','앤티크 침실'],['OB','기본 침실'],['VI','빈티지'],['VJ','보석 흑금'],['VJR','보석 루비'],['RX','로맨틱 정원'],['SV','기본 가구']];
const FKIND=[['all','전체'],['bed','침대'],['seat','의자·소파'],['table','탁자'],['store','수납'],['light','조명'],['rug','러그'],['wall','벽 장식'],['fire','벽난로'],['deco','장식']];
const fkind=t=>t.startsWith('bed')?'bed':['chair','bench','couch','armchair'].includes(t)?'seat':['table','long table'].includes(t)?'table':['dresser','bookcase'].includes(t)?'store':['lamp','sconce','torch'].includes(t)?'light':t==='rug'?'rug':['painting','window'].includes(t)?'wall':t==='fireplace'?'fire':'deco';
const fk2k=t=>({bed:'bed',seat:t==='couch'?'sofa':t==='armchair'?'armchair':t==='bench'?'bench':'chair',table:'table',store:t==='bookcase'?'shelf':'dresser',light:t==='sconce'?'painting':'lamp',rug:'rug',wall:'painting',fire:'fireplace',deco:'deco'})[fkind(t)];
/* 새 시트(로맨틱 정원)는 FSHEET 로딩 카운트가 끝난 뒤에 붙임 (먼저 붙이면 FSH_OK가 영영 안 켜짐) */
if(typeof FCAT!=='undefined'){const go=()=>{if(!FSH_OK){setTimeout(go,150);return;}for(const [k,src] of Object.entries(FCAT.sheets)){if(FSHEET[k])continue;const im=new Image();im.onload=()=>{FSHEET[k]={cols:16,src:'',img:im};};im.src=src;}};go();}
const FS_=(pk,i,w,h,flip)=>({pk,i,w,h,flip:!!flip});
{const _fs0=furnSprite0;furnSprite0=function(o,a){if(o&&o.pk!=null&&o.i!=null&&FSHEET[o.pk])return FS_(o.pk,o.i,o.sw,o.sh,o.fl);return _fs0(o,a);};}
function fcObj(it,col){const [pk,nm,t,sw,sh,bw,bh,rot,i]=it,k=fk2k(t),onWall=['wall'].includes(fkind(t))||t==='sconce';return {k,pk:col||pk,i,i0:i,sw,sh,w:bw,h:bh,rot:(rot===4&&sw===1)?4:1,walk:(k==='rug'||onWall)?1:0,nm:nm};}
function edCatalog(){const a=ED.a,el=document.getElementById('edcat');ED.fs=ED.fs||'all';ED.fk=ED.fk||'all';ED.q=ED.q||'';ED.col=ED.col||'';
  const game=[];{const sig=new Map();for(const ar of Object.values(AREAS)){if(ar.outdoor)continue;for(const o of (ar._orig0||ar.objs)){if(EDSKIP.has(o.k)||o.pk!=null)continue;const q=edClone(o);delete q.x;delete q.y;delete q.it;delete q.set;const k=JSON.stringify(q);if(!sig.has(k))sig.set(k,q);}}game.push(...sig.values());}
  const all=(FCAT.items||[]).map((it,n)=>({n,it,kind:fkind(it[2]),set:it[0]==='OBR'?'OB':it[0],name:it[1]}));
  const recent=()=>(S.edRecent||[]);
  const draw=()=>{const sets=FSETS.map(([k,l])=>`<button data-s="${k}" class="${ED.fs===k?'on':''}">${l}</button>`).join(''),kinds=ED.fs==='game'?'':FKIND.map(([k,l])=>`<button data-k="${k}" class="${ED.fk===k?'on':''}">${l}</button>`).join('');
    const cols=ED.fs==='OA'?`<div class="tabs"><span style="font-size:12px;align-self:center">색</span>${['','OA1','OA2','OA3','OA4'].map((c,j)=>`<button data-c="${c}" class="${ED.col===c?'on':''}">${['기본','와인','숲','장미','남색'][j]}</button>`).join('')}</div>`:'';
    el.innerHTML=`<div class="hd"><input id="edq" placeholder="검색 (영문 이름)" value="${ED.q.replace(/"/g,'')}" style="flex:1;margin-right:6px;font:inherit;font-size:14px;padding:4px 6px;border:2px solid #c9a77a;min-width:0"><button id="edcx">닫기</button></div><div class="tabs">${sets}</div>${kinds?`<div class="tabs">${kinds}</div>`:''}${cols}<div class="grid"></div><div id="edcnt" style="font-size:12px;padding:2px 8px 6px;text-align:right"></div>`;
    const grid=el.querySelector('.grid');let list;
    if(ED.fs==='game')list=game.map(q=>({game:q}));
    else{const R=recent();list=ED.fs==='recent'?R.map(n=>all[n]).filter(Boolean):all.filter(x=>ED.fs==='all'||x.set===ED.fs);if(ED.fk!=='all')list=list.filter(x=>x.kind===ED.fk);const q=ED.q.trim().toLowerCase();if(q)list=list.filter(x=>x.name.toLowerCase().includes(q));}
    el.querySelector('#edcnt').textContent=list.length+'개';
    const io=new IntersectionObserver(es=>{for(const e of es){if(!e.isIntersecting)continue;const d=e.target;io.unobserve(d);const x=d._x;let cvs=null;try{if(x.game){const o={...x.game,x:Math.floor(P.x/T),y:Math.floor(P.y/T)};const sp=furnSprite(o,a);if(sp)cvs=furnCanvas(sp);}else{const it=x.it;cvs=furnCanvas(FS_(ED.fs==='OA'&&ED.col?ED.col:it[0],it[8],it[3],it[4]));}}catch(err){}
      if(cvs){const c=document.createElement('canvas');c.width=cvs.width;c.height=cvs.height;c.getContext('2d').drawImage(cvs,0,0);const sc=Math.min(3,68/cvs.width,64/cvs.height);c.style.width=Math.round(cvs.width*sc)+'px';c.style.height=Math.round(cvs.height*sc)+'px';d.insertBefore(c,d.firstChild);}}},{root:grid});
    for(const x of list){const d=document.createElement('div');d.className='it';d._x=x;const sp=document.createElement('span');sp.textContent=x.game?`${EDN[x.game.k]||x.game.k} ${x.game.w}×${x.game.h}`:`${x.name.replace(/([a-z])([A-Z])/g,'$1 $2').slice(0,18)}`;sp.title=x.game?'':x.name;d.appendChild(sp);
      d.onclick=()=>{el.style.display='none';if(x.game)return edPlace({...x.game});S.edRecent=[x.n,...recent().filter(n=>n!==x.n)].slice(0,24);edPlace(fcObj(x.it,ED.fs==='OA'&&ED.col?ED.col:null));};grid.appendChild(d);io.observe(d);}
    el.querySelectorAll('[data-s]').forEach(b=>b.onclick=()=>{ED.fs=b.dataset.s;if(ED.fs!=='OA')ED.col='';draw();});el.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>{ED.fk=b.dataset.k;draw();});el.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>{ED.col=b.dataset.c;draw();});
    const qi=el.querySelector('#edq');qi.oninput=()=>{ED.q=qi.value;clearTimeout(ED._qt);ED._qt=setTimeout(()=>{const pos=qi.selectionStart;draw();const n=el.querySelector('#edq');n.focus();try{n.setSelectionRange(pos,pos);}catch(e){}},350);};el.querySelector('#edcx').onclick=()=>el.style.display='none';};
  draw();el.style.display='flex';}
function edPlace(q,sx,sy){const a=ED.a,px=sx!=null?sx:Math.floor(P.x/T),py=sy!=null?sy:Math.floor(P.y/T);const o={...q};edSnap();a.objs.push(o);
  for(let r=0;r<12;r++)for(let dy=-r;dy<=r;dy++)for(let dx=-r;dx<=r;dx++){if(Math.max(Math.abs(dx),Math.abs(dy))!==r)continue;o.x=px+dx;o.y=py+dy;if(edValid(a,o)){ED.sel=o;edCommit();edInfo('놓음: '+edName(o)+' · 화살표나 바닥을 눌러 옮기세요');return;}}
  a.objs.pop();ED.undo.pop();toast('이 근처엔 놓을 자리가 없어요');}
function edSheet(kind){const a=ED.a,el=document.getElementById('edcat');const rm=edRoom(a,Math.floor(P.x/T),Math.floor((P.y-4)/T));if(!rm)return toast('방 안에서 눌러 주세요');
  const sheets=[['rustic','시골풍',()=>W6.wf.ok&&W6.wf.im],['wf2','기본 1',()=>WF2OK&&WF2IMG],['wf','기본 2',()=>WFOK&&WFIMG]];let cur=ED.sh||'rustic';
  const draw=()=>{el.innerHTML=`<div class="hd"><span>«${rm[1]}» ${kind==='w'?'벽지':'바닥'}</span><button id="edcx">닫기</button></div><div class="tabs">${sheets.map(s=>`<button data-s="${s[0]}" class="${s[0]===cur?'on':''}">${s[1]}</button>`).join('')}<button data-s="none">원래대로</button></div><div class="grid"></div>`;
    const grid=el.querySelector('.grid'),im=sheets.find(s=>s[0]===cur)[2]();const n=kind==='w'?112:56;
    for(let i=0;im&&i<n;i++){const c=document.createElement('canvas');if(kind==='w'){c.width=16;c.height=48;c.getContext('2d').drawImage(im,(i%16)*16,Math.floor(i/16)*48,16,48,0,0,16,48);c.style.width='24px';c.style.height='72px';}else{c.width=32;c.height=32;c.getContext('2d').drawImage(im,(i%8)*32,336+Math.floor(i/8)*32,32,32,0,0,32,32);c.style.width='56px';c.style.height='56px';}
      const d=document.createElement('div');d.className='it';d.appendChild(c);const s=document.createElement('span');s.textContent=(kind==='w'?'벽 ':'바닥 ')+i;d.appendChild(s);
      d.onclick=()=>{S.roomWF=S.roomWF||{};const o=S.roomWF[rm[0]]=S.roomWF[rm[0]]||{};if(kind==='w'){o.ws=cur;o.w=i;}else{o.fs=cur;o.f=i;}buildArea(a);edInfo(`«${rm[1]}» ${kind==='w'?'벽지':'바닥'} 바꿈`);};grid.appendChild(d);}
    el.querySelectorAll('[data-s]').forEach(b=>b.onclick=()=>{if(b.dataset.s==='none'){if(S.roomWF&&S.roomWF[rm[0]]){if(kind==='w'){delete S.roomWF[rm[0]].w;}else delete S.roomWF[rm[0]].f;}buildArea(a);return;}cur=ED.sh=b.dataset.s;draw();});el.querySelector('#edcx').onclick=()=>el.style.display='none';};
  draw();el.style.display='flex';}
function edExport(){const el=document.getElementById('edcat');const out={edits:{},roomWF:S.roomWF||{}};for(const [id,v] of Object.entries(S.edits||{}))out.edits[id]=v.objs;if(ED.a)out.edits[ED.a.id]=ED.a.objs.map(edClone);
  el.innerHTML=`<div class="hd"><span>내보내기 · 아래 글을 복사해서 보내 주세요</span><button id="edcx">닫기</button></div><textarea readonly></textarea><div class="hd"><button id="edcp">복사</button></div>`;
  const ta=el.querySelector('textarea');ta.value=JSON.stringify(out);el.style.display='flex';el.querySelector('#edcx').onclick=()=>el.style.display='none';
  el.querySelector('#edcp').onclick=()=>{ta.select();try{navigator.clipboard.writeText(ta.value).then(()=>toast('복사했어요'),()=>{document.execCommand('copy');toast('복사했어요');});}catch(e){document.execCommand('copy');toast('복사했어요');}};}
function edEnter(){const a=AREAS[S.area];if(!a||a.outdoor)return toast('실내에서만 꾸밀 수 있어요');if(D||SCENE)return;if(!a._orig0)a._orig0=a.objs.map(edClone);
  ED.on=true;ED.a=a;ED.sel=null;ED.undo=[];ED.pp=[P.x,P.y];busy=true;ED.z=ZOOM;{const rm=edRoom(a,Math.floor(P.x/T),Math.floor((P.y-4)/T));ZOOM=0;resize();const sc0=SC,r=cv.getBoundingClientRect(),rw=rm?rm[4]+1:20,rh=rm?rm[5]+1:14;const want=Math.max(1,Math.min(sc0,Math.floor(Math.min(r.width/(rw*16),r.height/(rh*16+40)))));ZOOM=want-sc0;resize();if(rm){P.x=(rm[2]+rm[4]/2)*T;P.y=(rm[3]+rm[5]/2)*T+8;}}$('#panel').hidden=true;document.getElementById('edbar').style.display='block';edInfo('가구를 눌러 고른 뒤 끌거나 빈 바닥을 눌러 옮겨요 · 빈 곳을 끌면 둘러보기');}
function edExit(){const a=ED.a;S.edits=S.edits||{};S.edits[a.id]={v:Date.now(),objs:a.objs.map(edClone)};a._edv=S.edits[a.id].v;ED.on=false;ED.sel=null;busy=false;P.x=ED.pp[0];P.y=ED.pp[1];ZOOM=ED.z||0;resize();
  document.getElementById('edbar').style.display='none';document.getElementById('edcat').style.display='none';edBlk(a);buildArea(a);try{save();}catch(e){}toast('배치를 저장했어요');}
/* 설정 창에 «방 꾸미기» 줄 */
{const _tpE=togglePanel;togglePanel=function(kind,arg,keep){_tpE(kind,arg,keep);const p=$('#panel');if(!p||p.hidden||p.querySelector('#edgo'))return;const rows=[...p.querySelectorAll('.row')];const anchor=rows.find(r=>/글자 속도/.test(r.textContent));if(!anchor)return;
  anchor.insertAdjacentHTML('beforebegin',`<div class="row"><div><div class="tn">방 꾸미기</div><div class="tw">지금 있는 실내의 가구를 옮기고 벽지·바닥을 바꿔요</div></div><button class="pbtn" id="edgo">시작</button></div>`);p.querySelector('#edgo').onclick=()=>edEnter();};}
setInterval(()=>{try{if(ED.on||typeof S==='undefined'||!S||!S.edits||!S.area)return;const a=AREAS[S.area];if(a&&!a.outdoor&&S.edits[a.id]&&a._edv!==S.edits[a.id].v)buildArea(a);}catch(e){}},1000);
