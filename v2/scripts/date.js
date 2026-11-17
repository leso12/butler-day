
/* ═════════ 데이트 확장: 새 코스 · 계절/날씨 조건 · 새 행동(텃밭·낚시·소풍·독서·하늘) ═════════ */
for(const [id,list] of Object.entries(EXT.dates2||{})){if(!DATES[id])continue;
  for(const nd of list){if(DATES[id].some(d=>d.k===nd.k))continue;const sp=roomSpot(nd.loc);if(!sp||!LOC_AREA[nd.loc])continue;
    DATES[id].push({k:nd.k,name:nd.name,rom:nd.rom||0,min:nd.min,area:LOC_AREA[nd.loc],loc:nd.loc,spot:sp,hour:nd.hour||15,pose:nd.pose,cond:nd.cond,variants:nd.variants,lines:[]});}}
function xdOK(d){const c=d.cond;if(!c)return true;const ss=dateOf(S.day).season;if(c.season&&c.season!==ss)return false;if(c.noSeason&&c.noSeason===ss)return false;
  if(c.farm&&!(S.farm&&S.farm.intro))return false;if(c.hens&&!(S.farm&&S.farm.hens))return false;return true;}
function clearSpot(a,px,py){const bad=(x,y)=>solidIn(a,x,y)||!!objAt(a,x,y)||!!doorAt(a,x,y);
  const strict=(x,y)=>{for(let j=-1;j<=3;j++)for(let i=-2;i<=3;i++)if(bad(x+i,y+j))return false;return true;},loose=(x,y)=>{for(let j=-1;j<=1;j++)for(let i=0;i<=1;i++)if(bad(x+i,y+j))return false;return true;};
  for(const f of [strict,loose])for(let r=0;r<=7;r++)for(let dy=-r;dy<=r;dy++)for(let dx=-r;dx<=r;dx++){if(Math.max(Math.abs(dx),Math.abs(dy))!==r)continue;if(f(px+dx,py+dy))return [px+dx,py+dy];}return null;}
const DPOSE=new Set(['farm','fish','picnic','read','sky']);
{const _ad=applyDatePose;applyDatePose=function(){const dp=PEND_POSE;if(!dp||!SCENE||!DPOSE.has(dp.pose))return _ad();PEND_POSE=null;
  const n=npcs.find(n=>n.id===dp.id);if(!n)return;const a=AREAS[S.area],[px,py]=tileOf(P);
  const free=(x,y)=>{const tx=Math.floor(x/T),ty=Math.floor(y/T);return !solidIn(a,tx,ty)&&!doorAt(a,tx,ty);};
  const side=g=>{if(free(P.x+g,P.y)){n.x=P.x+g;n.y=P.y;}else if(free(P.x-g,P.y)){n.x=P.x-g;n.y=P.y;}else{n.x=P.x;n.y=P.y+12;}n.area=S.area;};
  if(dp.pose==='picnic'){const bad=(x,y)=>solidIn(a,x,y)||!!objAt(a,x,y)||!!doorAt(a,x,y)||'lIt'.includes((a.map[y]||[])[x]||'#');let best=null;
    for(let r=0;r<=10&&!best;r++)for(let dy=-r;dy<=r&&!best;dy++)for(let dx=-r;dx<=r&&!best;dx++){if(Math.max(Math.abs(dx),Math.abs(dy))!==r)continue;const x=px+dx,y=py+dy;let ok=true;
      for(let j=-2;j<=1&&ok;j++)for(let i=-2;i<=5&&ok;i++)if(bad(x+i,y+j))ok=false;if(ok)best=[x,y];}
    if(best){P.x=best[0]*T+8;P.y=best[1]*T+14;}}
  if(dp.pose==='sky'){const cs=clearSpot(a,px,py);if(cs){P.x=cs[0]*T+8;P.y=cs[1]*T+14;}}
  const dirTo=test=>{for(let r=1;r<=4;r++)for(let d=0;d<4;d++){const [dx,dy]=DIRV[d];if(test(px+dx*r,py+dy*r))return d;}return 1;};
  if(dp.pose==='picnic'){side(60);P.dir=n.x>P.x?3:2;n.dir=n.x>P.x?2:3;P.pose='dsit';n.pose='dsit';SCENE.picnic={x:(P.x+n.x)/2,y:P.y};}
  else if(dp.pose==='read'){const sp=seatPair(a,roomIn(a,px,py));if(sp){P.seat={x:P.x,y:P.y};seatAt(P,sp[0]);seatAt(n,sp[1]);n.area=S.area;SCENE.act={k:'read',id:n.id,seated:1};}else{const cs=clearSpot(a,px,py);if(cs){P.x=cs[0]*T+8;P.y=cs[1]*T+14;}side(16);P.dir=0;n.dir=0;n.pose='stand';SCENE.act={k:'read',id:n.id};}}
  else if(dp.pose==='farm'){if(typeof plotsOf==='function'){let best=null,bd=1e9;const bad=(x,y)=>solidIn(a,x,y)||!!objAt(a,x,y)||isPlot(S.area,x,y);
      for(const [x,y] of plotsOf(S.area)){if(bad(x,y+1)||bad(x+1,y+1)||!isPlot(S.area,x+1,y))continue;const d=Math.abs(x-px)+Math.abs(y+1-py);if(d<bd){bd=d;best=[x,y+1];}}
      if(best){P.x=best[0]*T+8;P.y=best[1]*T+14;}}
    side(14);P.dir=1;n.dir=1;SCENE.act={k:'farm',id:n.id,t0:performance.now()};}
  else if(dp.pose==='fish'){const d=dirTo((x,y)=>inMap(a,x,y)&&a.map[y][x]==='L');const [dx,dy]=DIRV[d];
    if(dx){if(free(P.x,P.y+14)){n.x=P.x;n.y=P.y+14;}else if(free(P.x,P.y-14)){n.x=P.x;n.y=P.y-14;}else side(14);n.area=S.area;}else side(14);P.dir=d;n.dir=d;SCENE.act={k:'fish',id:n.id,t0:performance.now()};}
  else if(dp.pose==='sky'){side(14);P.dir=1;n.dir=1;SCENE.act={k:'sky',id:n.id};}};}
var GSIT=0;
function dateGround(cx,cy){if(!SCENE||!SCENE.picnic)return;const x=Math.round(SCENE.picnic.x-cx),y=Math.round(SCENE.picnic.y-cy),bl=blanketCv(),t=performance.now();
  ctx.drawImage(bl,x-bl.width/2,y-13);
  ctx.drawImage(pot2(),x-17,y-17);ctx.drawImage(basket2(),x-5,y-21);
  ctx.drawImage(fruit2(),x-16,y-6);ctx.drawImage(plate2(),x,y-7);ctx.drawImage(cup2(),x-27,y+2);ctx.drawImage(propFlip('cup2',cup2()),x+16,y+2);
  for(const [sx,sy,ph] of [[x-23,y+2,0],[x+22,y+2,1.7],[x-12,y-16,3.1]]){for(let k=0;k<3;k++){const u=((t/1400+ph+k/3)%1),a=(1-u)*.55;ctx.fillStyle=`rgba(255,255,255,${a.toFixed(2)})`;ctx.fillRect(Math.round(sx+Math.sin(u*6+ph+k)*1.5),Math.round(sy-u*9),1,2);}}}   // 커피 김
function dateFx(cx,cy){if(!SCENE||!SCENE.act)return;const A=SCENE.act,n=npcs.find(m=>m.id===A.id),now=performance.now();if(!n||n.area!==S.area)return;
  const who=[[P.x,P.y,P.dir,0],[n.x,n.y,n.dir,1]];
  for(const [ox,oy,d,i] of who){const sx=Q(ox)-cx,sy=Q(oy)-cy,[dx,dy]=DIRV[d],ci=i?(A.id==='kairan'?1:A.id==='edmund'?2:A.id==='roewen'?0:3):0;
    if(A.k==='read'){const turn=Math.floor(now/3200+i*1.7)%6===0,lap=A.seated?4:0;
      if(d===0){const bk=bookOpenCv(ci);ctx.drawImage(bk,sx-6,sy-16+lap);if(turn){ctx.fillStyle='#fbf6ea';ctx.fillRect(sx+1,sy-18+lap,4,4);ctx.fillStyle='#2a1a1a';ctx.fillRect(sx+1,sy-19+lap,4,1);}}
      else if(d===2||d===3){let bk=bookSideCv(ci);if(d===2)bk=propFlip('bks'+ci,bk);ctx.drawImage(bk,sx+(d===3?3:-9),sy-21+lap);}}
    else if(A.k==='farm'){const cyc=((now-A.t0)/1000+i*.9)%2.4,pour=cyc<1;drawCan(sx+(d===2?-6:6),sy-12,d===2?2:3,i?'copper':'tin',pour);}
    else if(A.k==='fish'){const hx=sx+(dx?dx*5:5),hy=sy-14,tipx=hx+(dx?dx*13:4),tipy=hy+(dy>0?10:dy<0?-17:-9),bx=Math.round(sx+dx*36+(dy?(i?3:-3):0)),by=Math.round(sy-4+dy*40+Math.sin(now/260+i*2));
      drawRod(hx,hy,tipx,tipy);
      ctx.fillStyle='rgba(240,240,230,.7)';const m=Math.max(8,Math.round(Math.hypot(bx-tipx,by-tipy)));for(let k=0;k<=m;k++){const u=k/m;ctx.fillRect(Math.round(tipx+(bx-tipx)*u),Math.round(tipy+(by-tipy)*u+Math.sin(u*Math.PI)*4),1,1);}
      const rr=(now/700+i*.4)%1;ctx.fillStyle=`rgba(220,240,250,${.6*(1-rr)})`;const rw=Math.round(3+rr*6);ctx.fillRect(bx-rw,by+4,rw*2+1,1);drawBobber(bx,by);}}}
/* 독서: 같은 방의 소파·벤치(두 칸) 또는 가까운 의자 두 개에 나란히 앉는다 */
function seatPair(a,room){const seats=[];for(const o of a.objs){if(!['sofa','armchair','chair','bench'].includes(o.k)||roomIn(a,o.x,o.y)!==room)continue;for(let i=0;i<o.w;i++)seats.push({o,x:o.x+i,y:o.y});}
  for(const k of ['sofa','bench'])for(const s1 of seats.filter(s=>s.o.k===k)){if(s1.o.w>=4&&s1.x===s1.o.x)continue;const s2=seats.find(q=>q.o===s1.o&&q.x===s1.x+1);if(s2)return [s1,s2];}
  let best=null,bd=99;for(const s1 of seats)for(const s2 of seats){if(s1===s2)continue;const d=Math.abs(s1.x-s2.x)+Math.abs(s1.y-s2.y);if(d<bd){bd=d;best=[s1,s2];}}return bd<=4?best:null;}
function seatAt(w,s){w.x=s.x*T+8;w.y=s.y*T+15;w.dir=s.o.k==='bench'?(s.o.d!=null?s.o.d:0):[0,1,2,3][s.o.d||0];w.pose='sit';}
{const _es=endScene;endScene=function(){const A=SCENE&&SCENE.act,id=A&&A.k==='read'&&A.seated?A.id:null;_es();if(id){const n=npcs.find(m=>m.id===id);if(n)n.pose='stand';}};}
{const _g=farmGround;farmGround=function(cx,cy,t){_g(cx,cy,t);dateGround(cx,cy);};}
{const _fx=farmFx;farmFx=function(cx,cy){_fx(cx,cy);dateFx(cx,cy);};}
/* 그렌(마구간 건초 침상) · 모리스(가게 뒤 작은 침대): 침대가 없어 밤에 사라지던 것 → 침대에서 잔다 */
function addObj(a,o){a.objs.push(o);for(let j=0;j<o.h;j++)for(let i=0;i<o.w;i++){const k=(o.y+j)*a.MW+o.x+i;if(!o.walk)a.blk[k]=1;a.otile[k]=o;}}
if(AREAS.stable)addObj(AREAS.stable,{k:'bed',x:19,y:10,w:2,h:2,wide:1,plain:1,c:'#c8a868',hay:1});
if(AREAS.gen)addObj(AREAS.gen,{k:'bed',x:1,y:5,w:2,h:2,wide:1,plain:1,c:'#8a9a5a'});
/* 취침: 잠자는 지점마다 같은 방의 빈 침대를 하나씩 배정하고(둘이 한 침대 X), 지점은 침대 발치 바로 아래로 */
(function bedSpots(){const used=new Set();
  for(const [id,L] of Object.entries(ACTS)){const a=AREAS[ACTS_AREA[id]];if(!a||a.outdoor)continue;
    for(const q of L){if(q[3]!=='sleep')continue;const rm=roomIn(a,q[0],q[1]);let best=null,bd=99;
      for(const o of a.objs){if(o.k!=='bed'||used.has(o)||roomIn(a,o.x,o.y)!==rm)continue;const d=Math.max(o.x-q[0],0,q[0]-(o.x+o.w-1))+Math.max(o.y-q[1],0,q[1]-(o.y+o.h-1));if(d<bd){bd=d;best=o;}}
      if(!best)continue;used.add(best);q.bedO=best;const fy=best.y+best.h,ok=(x,y)=>!solidIn(a,x,y)&&!doorAt(a,x,y)&&roomIn(a,x,y)===rm;
      for(const [x,y] of [[best.x,fy],[best.x+best.w-1,fy],[best.x-1,fy-1],[best.x+best.w,fy-1],[best.x-1,fy],[best.x+best.w,fy]])if(ok(x,y)){q[0]=x;q[1]=y;break;}}}})();
{const _sb=sleepBed;sleepBed=function(n,a){if(!n.act)return _sb(n,a);
  const taken=o=>npcs.filter(m=>m!==n&&m.area===a.id&&m.pose==='sleep'&&m.hidden&&m._bed===o&&m._bedDay===S.day).length>=bedCap(o);
  let k=-1;const cur=n.act[n.spot]||n.act[0];if(cur&&cur.bedO&&n._bed===cur.bedO&&n._bedDay===S.day)k=n.act.indexOf(cur);
  if(k<0)k=n.act.findIndex(q=>q.bedO&&a.objs.includes(q.bedO)&&!taken(q.bedO));
  if(k<0){const rm=roomIn(a,...tileOf(n));const o=a.objs.find(o=>o.k==='bed'&&roomIn(a,o.x,o.y)===rm&&!taken(o)&&furnSprite(o,a));if(!o)return null;const s2=furnSprite(o,a);n._bed=o;n._bedDay=S.day;return {x:o.x*T,y:o.y*T,w:o.w*T,h:o.h*T,sp:s2,o};}
  const q=n.act[k],o=q.bedO,s2=furnSprite(o,a);if(!s2)return _sb(n,a);if(n.spot!==k){n.spot=k;n.x=q[0]*T+8;n.y=q[1]*T+14;}n._bed=o;n._bedDay=S.day;return {x:o.x*T,y:o.y*T,w:o.w*T,h:o.h*T,sp:s2,o};};}
/* 찻집: 앉아서 차 마시기 — 잔은 탁자에 두었다가 가끔 입으로 */
function sipFx(cx,cy){if(!P.sip||P.pose!=='sit'){if(P.pose!=='sit')P.sip=null;return;}const t=performance.now()-P.sip.t0,ph=t%4200,up=ph>2600&&ph<3700,d=P.dir,[dx,dy]=DIRV[d],cv=cup2();
  const sx=Math.round(P.x-cx),sy=Math.round(P.y-cy);
  if(up){const hx=sx+(d===2?-5:d===3?5:0)-Math.floor(cv.width/2),hy=sy-21;if(d!==1){ctx.drawImage(d===2?propFlip('cup2',cv):cv,hx,hy);ctx.fillStyle='#f6d2b4';ctx.fillRect(hx+(d===2?cv.width:-1),hy+3,2,2);}}
  else{const tx=sx+dx*(d>1?17:13)-Math.floor(cv.width/2),ty=d===0?sy-1:d===1?sy-27:sy-21;ctx.drawImage(cv,tx,ty);
    for(let k=0;k<3;k++){const u=((t/1400+k/3)%1);ctx.fillStyle=`rgba(255,255,255,${((1-u)*.55).toFixed(2)})`;ctx.fillRect(Math.round(tx+cv.width/2+Math.sin(u*6+k)*1.5),Math.round(ty-u*8),1,2);}}}
{const _fx3=farmFx;farmFx=function(cx,cy){_fx3(cx,cy);sipFx(cx,cy);};}
