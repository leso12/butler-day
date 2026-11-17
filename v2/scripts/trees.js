/* ═════════ 나무: 보낸 리텍 모드의 원본 나무 (참나무 · 단풍나무 · 소나무, 계절별) ═════════ */
const TRIMG=new Image();let TROK=false;TRIMG.onload=()=>{TROK=true;for(const k in SEAS_CACHE)delete SEAS_CACHE[k];for(const a of Object.values(AREAS))if(a.outdoor){buildArea(a);SEAS_CACHE[a.id]={[SEAS]:{cv:a.cv,dyn:a.dyn,full:a.full}};}};TRIMG.src=TRSRC;
const TRC={};
function trCv(kind,season){const s={봄:'spring',여름:'summer',가을:'fall',겨울:'winter'}[season]||'summer',k=kind==='cherry'?'cherry':kind+'_'+s,r=TRR[k],c=mk(r[2],r[3]);c.getContext('2d').drawImage(TRIMG,r[0],r[1],r[2],r[3],0,0,r[2],r[3]);return c;}   // 나무마다 새 캔버스 (명암 보정이 겹쳐 쌓이지 않게)
{const _tc=treeCanvas;treeCanvas=function(season,seed){if(!TROK)return _tc(season,seed);const m=seed%7,castle=A&&A.id==='castle';   // 대공저: 벚꽃·마호가니 위주 / 마을: 참나무·단풍·마호가니
  if(castle){if(m<2&&season!=='겨울')return trCv('cherry',season);return trCv(m<5?'tree8':'tree1',season);}
  return trCv(m<3?'tree1':m<5?'tree2':m<6?'tree8':(season==='봄'?'cherry':'tree1'),season);};}
{const _pc=pineCanvas;pineCanvas=function(season,seed){if(!TROK)return _pc(season,seed);return trCv('tree3',season);};}
/* 맨 아래 가장자리 줄은 키 큰 나무 대신 덤불 (집을 가리지 않게) */
for(const a of Object.values(AREAS)){if(!a.outdoor)continue;for(const y of [a.MH-1,a.MH-2])for(let x=0;x<a.MW;x++)if(a.map[y]&&a.map[y][x]==='t')a.map[y][x]='z';}
/* ═════════ 채집: 산딸기·블랙베리·호랑가시는 덤불 덩굴에 열리고, 꽃·버섯 등은 원본 아이템 그림으로 나무·덤불 곁에 ═════════ */
const BUSHY=new Set(['rasp','blackberry','holly']);
rollForage=function(){const s=dateOf(S.day).season,out={};
  for(const [aid,n] of [['castle',6],['town',7]]){const a=AREAS[aid],list=[],bush=[],grass=[];
    for(let y=1;y<a.MH-1;y++)for(let x=1;x<a.MW-1;x++){const c=a.map[y][x],rm=roomIn(a,x,y);if(rm==='training'||rm==='paddock')continue;
      if(c==='z'&&y<a.MH-2)bush.push([x,y]);
      else if(c===','&&!a.blk[y*a.MW+x]&&([[1,0],[-1,0],[0,1],[0,-1]].some(([dx,dy])=>(a.map[y+dy]||[])[x+dx]==='z')||'tI'.includes((a.map[y-1]||[])[x])))grass.push([x,y]);}
    let tries=0;while(list.length<n&&tries++<400){const it=FORAGE[s][Math.floor(Math.random()*3)],pool=BUSHY.has(it)&&bush.length?bush:grass;if(!pool.length)break;const [x,y]=pool[Math.floor(Math.random()*pool.length)];
      if(list.some(f=>Math.abs(f[0]-x)+Math.abs(f[1]-y)<5))continue;list.push([x,y,it]);}
    out[aid]=list;}
  S.forage=out;S.forageDay=S.day;};
{const _df=drawForage;drawForage=function(cx,cy,t){const fr=S.forage&&S.forage[S.area];if(!fr)return _df(cx,cy,t);const keep=S.forage[S.area];S.forage[S.area]=[];_df(cx,cy,t);S.forage[S.area]=keep;
  for(const [x,y,it] of fr){const sx=x*T+8-cx,sy=y*T+8-cy;if(sx<-12||sy<-16||sx>VW+12||sy>VH+12)continue;
    if(BUSHY.has(it)){const [c1]=FCOL[it]||['#d8405a'];   // 덤불 잎 사이 열매 송이
      for(const [bx,by] of [[-5,-3],[-1,-5],[3,-2],[-3,1],[2,2],[5,-5]]){ctx.fillStyle='#2a1418';ctx.fillRect(sx+bx-1,sy+by-1,3,3);ctx.fillStyle=c1;ctx.fillRect(sx+bx,sy+by,2,2);ctx.fillStyle='#ffffff';ctx.fillRect(sx+bx,sy+by,1,1);}}
    else{const ic=itemIcon(it);ctx.fillStyle='rgba(30,15,20,.22)';ctx.fillRect(sx-5,sy+6,10,2);ctx.drawImage(ic,sx-10,sy-12+Math.round(Math.sin(t/700+x)*0.6));}
    if(Math.floor(t/400+x)%6===0){ctx.fillStyle='#fffbe8';ctx.fillRect(sx+6,sy-8,1,1);}}};}
/* 통·술통: 리텍 모드 실내 시트의 원본 나무통 */
const TIIMG=new Image();let TIOK=false;TIIMG.onload=()=>{TIOK=true;for(const a of Object.values(AREAS))if(!a.outdoor&&a.objs.some(o=>o.k==='barrel'||o.k==='keg'))buildArea(a);};TIIMG.src=TISRC;
{const _f4=furnSprite;furnSprite=function(o,a){if(TIOK&&!a.outdoor){if(o.k==='barrel'&&o.w===1)return {cv:null,tiw:[32,0,16,32],w:1,h:2};if(o.k==='keg')return {tiw:[0,0,32,32],w:o.w,h:2};}return _f4(o,a);};}
{const _fc2=furnCanvas;furnCanvas=function(sp){if(sp&&sp.tiw){const r=sp.tiw,c=mk(r[2],r[3]);c.getContext('2d').drawImage(TIIMG,r[0],r[1],r[2],r[3],0,0,r[2],r[3]);return c;}return _fc2(sp);};}
