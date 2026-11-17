/* ═════════ 마을 건물 원본 도트 (Haneul's Farm Buildings · 로판풍 색 리텍): 건물마다 다른 외형 · 4계절 ═════════ */
const HIMG=new Image();let HOK=false;
function hanRebuild(){if(!BOK)return;for(const k in WINR)delete WINR[k];for(const a of Object.values(AREAS)){if(!a.outdoor||!a.BLD.some(b=>HAN.meta[b[0]]))continue;buildArea(a);if(SEAS_CACHE[a.id])SEAS_CACHE[a.id]={[SEAS]:{cv:a.cv,dyn:a.dyn,full:a.full}};}}
HIMG.onload=()=>{HOK=true;hanRebuild();};HIMG.src=HAN.src;
{const _bo=BIMG.onload;BIMG.onload=function(){_bo&&_bo.apply(this,arguments);};}
function hanCv(id){const r=HAN.rects[id+'_'+(SEASK[SZ()]||'summer')];if(!r)return null;const c=mk(r[2],r[3]);c.getContext('2d').drawImage(HIMG,r[0],r[1],r[2],r[3],0,0,r[2],r[3]);return c;}
{const _bd=bldDecor;bldDecor=function(g,b){const m=HAN.meta[b[0]];if(!(HOK&&BOK&&m))return _bd(g,b);const c=hanCv(b[0]);if(!c)return _bd(g,b);
  for(let y=b[3];y<b[3]+b[5];y++)for(let x=b[2];x<b[2]+b[4];x++){const ch=A.map[y][x];A.map[y][x]=',';drawTile(g,x,y);A.map[y][x]=ch;}   // 건물 칸 밑은 풀밭 (투명한 지붕 모서리)
  const px0=(b[8]-m.door)*T,py0=(b[3]+b[5])*T-c.height,bot=(b[3]+b[5])*T;
  g.fillStyle='rgba(25,20,35,.22)';g.fillRect(px0+c.width,bot-c.height+24,6,c.height-24);g.fillRect(px0+6,bot,c.width,4);   // 땅 그림자
  A.dyn.push({c,px:px0,py:py0,sy:bot-1,x0:px0,x1:px0+c.width,y0:py0,y1:py0+c.height,han:1});
  if(b[9]){const sc=b[9],s=mk(12,14),q=s.getContext('2d'),R=(x,y,w,h,col)=>{q.fillStyle=col;q.fillRect(x,y,w,h);};   // 걸이 간판
    R(0,0,9,1,'#26222a');R(7,0,1,3,'#26222a');R(1,3,11,9,OL);R(2,4,9,7,sc);R(2,4,9,1,shade(sc,.35));R(4,6,5,3,'#fbf3e4');R(2,11,9,1,shade(sc,-.3));
    const sx=(b[8]+1)*T+2,sy=bot-34;A.dyn.push({c:s,px:sx,py:sy,sy:bot,x0:sx,x1:sx+12,y0:sy,y1:sy+14});}};}
/* 밤: 원본 건물 창유리(마스크)에만 불빛 */
const HGLOW=new Image();HGLOW.src=HAN.glow;
function hanGlow(id){const r=HAN.rects[id+'_'+(SEASK[SZ()]||'summer')];if(!r||!HGLOW.complete)return null;const c=mk(r[2],r[3]);c.getContext('2d').drawImage(HGLOW,r[0],r[1],r[2],r[3],0,0,r[2],r[3]);return c;}
{const _bd2=bldDecor;bldDecor=function(g,b){const n0=A.dyn?A.dyn.length:0;_bd2(g,b);if(A.dyn&&HAN.meta[b[0]])for(let i=n0;i<A.dyn.length;i++)if(A.dyn[i].han)A.dyn[i].hid=b[0];};}
{const _wl=winLayer;winLayer=function(a){const cv=a.cv;if(cv._wl)return cv._wl;
  const hb=(a.BLD||[]).filter(b=>HAN.meta[b[0]]&&HOK),B0=a.BLD,W0=WINR[a.id];   // 원본 건물 밑에 깔린 예전 창은 빼고
  if(hb.length){a.BLD=B0.filter(b=>!hb.includes(b));if(W0)WINR[a.id]=W0.filter(([x,y])=>!hb.some(b=>x>=b[2]*T-8&&x<(b[2]+b[4])*T+8&&y>=b[3]*T-40&&y<(b[3]+b[5])*T));}
  let r;try{r=_wl(a);}finally{a.BLD=B0;if(W0)WINR[a.id]=W0;}
  try{const og=r.cv.getContext('2d');for(const d of a.dyn||[]){if(!d.han||!d.hid)continue;const m=hanGlow(d.hid);if(!m)continue;const w=m.width,h=m.height,M=m.getContext('2d').getImageData(0,0,w,h).data,S_=d.c.getContext('2d').getImageData(0,0,w,h).data,od=og.getImageData(d.px,d.py,w,h),o=od.data,cnt={};
      for(let i=0;i<w*h;i++){if(M[i*4+3]<128)continue;const l=(S_[i*4]+S_[i*4+1]+S_[i*4+2])/765;o[i*4]=255;o[i*4+1]=Math.round(175+60*l);o[i*4+2]=Math.round(85+60*l);o[i*4+3]=255;const ck=Math.floor((i%w)/16)+','+Math.floor(i/w/16);cnt[ck]=(cnt[ck]||0)+1;}
      og.putImageData(od,d.px,d.py);for(const [ck,n] of Object.entries(cnt))if(n>=6){const [cx_,cy_]=ck.split(',').map(Number),p=[d.px+cx_*16+8,d.py+cy_*16+8];if(!r.pts.some(q=>Math.hypot(q[0]-p[0],q[1]-p[1])<26))r.pts.push(p);}}}catch(e){}
  return r;};}
