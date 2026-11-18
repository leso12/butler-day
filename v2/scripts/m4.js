/* ═════════ 새로 보낸 모드: 복슬 고양이 · 음식 아이콘 · 들꽃 풀 · 보태닉 꽃덤불 · 대리석 정원 장식 ═════════ */
for(const [k,u] of Object.entries(M4.cats)){if(CATIMG[k])CATIMG[k].src=u;}
const M4IMG={};function m4img(key,src){if(!M4IMG[key]){const im=new Image();im.onload=()=>{M4IMG[key].ok=1;m4Rebuild();};im.src=src;M4IMG[key]={im};}return M4IMG[key];}
let m4T=0;function m4Rebuild(){clearTimeout(m4T);m4T=setTimeout(()=>{for(const k in SEAS_CACHE)delete SEAS_CACHE[k];for(const a of Object.values(AREAS))if(a.outdoor){buildArea(a);SEAS_CACHE[a.id]={[SEAS]:{cv:a.cv,dyn:a.dyn,full:a.full}};}for(const k in ICOC)delete ICOC[k];},200);}
m4img('food',M4.food.src);m4img('bot',M4.bot.src);m4img('bots',M4.bots.src);for(const s of ['spring','summer','fall','winter']){m4img('t_'+s,M4.tufts[s]);m4img('m_'+s,M4.marble[s].src);}
{const _ic=itemIcon;itemIcon=function(k){const x=M4.food.map[k];if(x!=null&&M4IMG.food.ok){if(ICOC[k])return ICOC[k];const o=document.createElement('canvas');o.width=o.height=20;o.getContext('2d').drawImage(M4IMG.food.im,x,0,16,16,2,2,16,16);return ICOC[k]=o;}return _ic(k);};}
const DECO4=[{a:'castle',x:24,y:24,k:'col'},{a:'castle',x:39,y:24,k:'col'},{a:'castle',x:24,y:32,k:'col'},{a:'castle',x:39,y:32,k:'col'},
 {a:'castle',x:30,y:18,k:'lampcol'},{a:'castle',x:33,y:18,k:'lampcol'},
 {a:'town',x:3,y:24,b:2},{a:'town',x:6,y:33,b:6},{a:'town',x:46,y:33,b:4},{a:'town',x:33,y:33,b:7}];
for(const d of DECO4){const a=AREAS[d.a];if(!a||!a.map[d.y])continue;const c=a.map[d.y][d.x];if(!',f'.includes(c)){d.off=1;continue;}a.map[d.y][d.x]=',';if(a.blk)a.blk[d.y*a.MW+d.x]=1;}
/* 꽃덤불이 길·빨래줄·정자·조각상 같은 소품을 가리면 놓지 않음 */
function bushOK(a,px0,py0,w,h){const X0=Math.floor((px0+4)/T),X1=Math.floor((px0+w-5)/T),Y0=Math.floor((py0+12)/T),Y1=Math.floor((py0+h-4)/T);
  for(let y=Y0;y<=Y1;y++)for(let x=X0;x<=X1;x++){if(!a.map[y]||a.map[y][x]==null)return false;const c=a.map[y][x],f=a.floor&&a.floor[y]&&a.floor[y][x];if(!',fztIg'.includes(c)||(f&&!',fztIg'.includes(f)))return false;}
  for(const o of a.objs||[])if(X0<o.x+o.w&&X1>=o.x&&Y0<o.y+o.h&&Y1>=o.y-1)return false;return true;}
{const _ba=buildArea;buildArea=function(a){_ba(a);if(!a.outdoor)return;A=a;const s=SEASK[SZ()]||'summer',g=a.cv.getContext('2d');
  const T_=M4IMG['t_'+s];if(T_&&T_.ok){const n=Math.floor(T_.im.width/16);for(let y=1;y<a.MH-1;y++)for(let x=1;x<a.MW-1;x++){if(a.map[y][x]!==','||a.blk[y*a.MW+x])continue;const h=hash(x,y,977);if(h>.07)continue;const k=Math.floor(hash(x,y,978)*n);g.drawImage(T_.im,k*16,0,16,20,x*T+Math.round(hash(x,y,979)*4)-2,y*T-6,16,20);}}
  const MB=M4IMG['m_'+s],BT=M4IMG.bot;
  const BS=M4IMG.bots;if(BS&&BS.ok&&s!=='winter'&&a.id==='castle'){const fl=(x,y)=>a.floor&&a.floor[y][x]&&!'tIfz'.includes(a.floor[y][x])?a.floor[y][x]:',';   // 대공가 산울타리 → 작은 꽃덤불 울타리
    for(let y=1;y<a.MH-1;y++)for(let x=1;x<a.MW-1;x++){if(a.map[y][x]!=='z')continue;overGround(a,x,y,fl(x,y));}
    for(let y=1;y<a.MH-1;y++)for(let x=1;x<a.MW-1;x++){if(a.map[y][x]!=='z')continue;const hz=a.map[y][x-1]==='z'||a.map[y][x+1]==='z';if(hz?(x%2):(y%2))continue;
      const r=M4.bots.r[Math.floor(hash(Math.floor(x/6),Math.floor(y/6),441)*M4.bots.r.length)],c=mk(r[2],r[3]);c.getContext('2d').drawImage(BS.im,r[0],r[1],r[2],r[3],0,0,r[2],r[3]);
      const px0=x*T+(hz?16:8)-Math.round(r[2]/2),py0=(y+1)*T-r[3]+3;if(!bushOK(a,px0,py0,r[2],r[3]))continue;(a._bz=a._bz||new Set()).add(x+','+y);a.dyn.push({c,px:px0,py:py0,sy:(y+1)*T-4,x0:px0,x1:px0+r[2],y0:py0,y1:py0+r[3]});}}
  if(a.id==='castle'&&BS&&BS.ok&&s!=='winter'){const D_=a._bz||new Set(),h=(x,y)=>D_.has(x+','+y);   /* 그림 없는 산울타리 칸은 풀밭·길로 (보이지 않는 벽 없애기) */
    for(let y=1;y<a.MH-1;y++)for(let x=1;x<a.MW-1;x++){if(a.map[y][x]!=='z')continue;const hz=a.map[y][x-1]==='z'||a.map[y][x+1]==='z';
      if(h(x,y)||(hz?h(x-1,y):h(x,y+1)))continue;const f=a.floor&&a.floor[y][x]&&!'tIfz'.includes(a.floor[y][x])?a.floor[y][x]:(a.map[y][x-1]===':'&&a.map[y][x+1]===':')||(a.map[y-1][x]===':'&&a.map[y+1][x]===':')?':':',';a.map[y][x]=f;overGround(a,x,y,f);if(a.blk)a.blk[y*a.MW+x]=0;}
    a._bz=null;}
  if(BT.ok&&s!=='winter')for(let y=1;y<a.MH-1;y++)for(let x=1;x<a.MW-1;x++){if(a.map[y][x]!=='f')continue;   // 꽃 칸 → 보태닉 꽃덤불
    const pick=[9,10,3,0,1,5,8][Math.floor(hash(x,y,331)*7)],r=M4.bot.r[pick];a.map[y][x]=a.floor&&a.floor[y][x]&&a.floor[y][x]!=='f'?a.floor[y][x]:',';const keep='f';overGround(a,x,y,a.map[y][x]);a.map[y][x]=keep;
    const c=mk(r[2],r[3]);c.getContext('2d').drawImage(BT.im,r[0],r[1],r[2],r[3],0,0,r[2],r[3]);const px0=x*T+8-Math.round(r[2]/2),py0=(y+1)*T-r[3]+2;if(!bushOK(a,px0,py0,r[2],r[3])){if((a.map[y][x-1]===':'&&a.map[y][x+1]===':')||(a.map[y-1][x]===':'&&a.map[y+1][x]===':')){a.map[y][x]=':';overGround(a,x,y,':');}continue;}a.dyn.push({c,px:px0,py:py0,sy:(y+1)*T-3,x0:px0,x1:px0+r[2],y0:py0,y1:py0+r[3]});}
  for(const d of DECO4){if(d.a!==a.id||d.off)continue;let im,r;if(d.k){if(!MB||!MB.ok)continue;im=MB.im;r=M4.marble[s].r[d.k];}else{if(s==='winter'||!BT.ok)continue;im=BT.im;r=M4.bot.r[d.b];}
    const c=mk(r[2],r[3]),cg=c.getContext('2d');if(d.flip){cg.translate(r[2],0);cg.scale(-1,1);}cg.drawImage(im,r[0],r[1],r[2],r[3],0,0,r[2],r[3]);
    const px0=d.x*T+8-Math.round(r[2]/2),py0=(d.y+1)*T-r[3]+1;a.dyn.push({c,px:px0,py:py0,sy:(d.y+1)*T-2,x0:px0,x1:px0+r[2],y0:py0,y1:py0+r[3]});}};}

/* 실내: 대연회장 기둥 = 대리석 기둥 · 현관 홀 양옆 = 대리석 여인상 · 결혼식 날엔 꽃 아치 */
function mbCv(k){const MB=M4IMG.m_summer;if(!MB||!MB.ok)return null;const r=M4.marble.summer.r[k],c=mk(r[2],r[3]);c.getContext('2d').drawImage(MB.im,r[0],r[1],r[2],r[3],0,0,r[2],r[3]);return c;}
{const _f7=furnSprite;furnSprite=function(o,a){if(!a.outdoor&&M4IMG.m_summer&&M4IMG.m_summer.ok){const rm=roomIn(a,o.x,o.y);
   if(o.k==='pillar'&&rm==='ballroom')return {mbk:'col',w:1,h:3};
   if(o.k==='armor'&&rm==='entrance')return {mbk:o.x<29?'w1':'w2',w:1,h:3};}return _f7(o,a);};}
{const _fc4=furnCanvas;furnCanvas=function(sp){if(sp&&sp.mbk){return mbCv(sp.mbk)||mk(16,16);}return _fc4(sp);};}
{const _m=M4IMG.m_summer.im.onload;M4IMG.m_summer.im.onload=function(){_m&&_m.apply(this,arguments);for(const id of ['annex','keep'])if(AREAS[id])buildArea(AREAS[id]);};}
function weddingToday(){return (S.wed&&S.wed.day===S.day)||(SCENE&&S.area==='annex'&&S.wed);}
{const _fg=farmGround;farmGround=function(cx,cy,t){_fg(cx,cy,t);if(S.area!=='annex'||!weddingToday())return;for(const [x,k] of [[6.5,'arch'],[22.5,'arch']]){const c=mbCv(k);if(!c)continue;ctx.drawImage(c,Math.round(x*T-c.width/2-cx),Math.round(6.5*T-c.height-cy));}};}
/* 대공성 중앙 정원·건물 사이 나무 정리: 바깥 테두리 숲만 남김 */
(function(){const a=AREAS.castle;if(!a)return;for(let y=13;y<=43;y++)for(let x=13;x<=56;x++){if('tI'.includes(a.map[y][x])){const P_=c=>c===':';a.map[y][x]=(P_(a.map[y][x-1])&&P_(a.map[y][x+1]))||(P_(a.map[y-1][x])&&P_(a.map[y+1][x]))?':':',';if(a.blk)a.blk[y*a.MW+x]=0;}}for(const [x,y] of [[24,47],[39,46],[42,48],[40,53]])if('tI'.includes(a.map[y][x])){a.map[y][x]=',';if(a.blk)a.blk[y*a.MW+x]=0;}})();
/* 겹침 정리: 나무·꽃·덤불·장식 그림이 건물(지붕·벽) 위에 걸치면 그 칸은 풀밭으로 (문 앞 등불만 예외) */
(function(){const FP={t:[-1,1,-5,0],I:[-1,1,-5,0],f:[-1,1,-2,0],z:[0,0,-1,0]};let n=0;
  for(const a of Object.values(AREAS)){if(!a.outdoor)continue;
    const boxes=(a.BLD||[]).map(b=>{const m=typeof HAN!=='undefined'&&HAN.meta[b[0]],r=m&&HAN.rects[b[0]+'_summer'];
      if(r){const x0=(b[8]-m.door)*T,y1=(b[3]+b[5])*T;return [x0,y1-r[3],x0+r[2],y1];}return [b[2]*T,b[3]*T-8,(b[2]+b[4])*T,(b[3]+b[5])*T];});
    const hit=(x0,y0,x1,y1)=>boxes.some(B=>x0<B[2]-2&&x1>B[0]+2&&y0<B[3]-2&&y1>B[1]+2);
    for(let y=0;y<a.MH;y++)for(let x=0;x<a.MW;x++){const c=a.map[y][x],f=FP[c];if(!f)continue;
      if(a.BLD.some(b=>x>=b[2]&&x<b[2]+b[4]&&y>=b[3]&&y<b[3]+b[5]))continue;   // 건물 칸 안은 이미 정리됨
      if(hit((x+f[0])*T+3,(y+f[2])*T+4,(x+f[1]+1)*T-3,(y+f[3]+1)*T)){a.map[y][x]=a.floor&&a.floor[y][x]&&!'tIfz'.includes(a.floor[y][x])?a.floor[y][x]:',';if(a.blk)a.blk[y*a.MW+x]=0;n++;}}
    for(const d of DECO4){if(d.a!==a.id||d.off)continue;const w=d.k?1:1;if(hit((d.x-w)*T,(d.y-3)*T,(d.x+w+1)*T,(d.y+1)*T)){d.off=1;if(a.blk)a.blk[d.y*a.MW+d.x]=0;n++;}}}
  window.OVL_FIX=n;})();
