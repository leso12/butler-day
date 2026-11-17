/* ═════════ 마을 광장 분수 · 벤치 · 가로등: 리텍 모드 마을 시트 원본 (계절별) ═════════ */
const TWIMG=new Image();let TWOK=false;
function twCv(k){const s=SEASK[SZ()]||'summer',r=TWR[k+'_'+s],c=mk(r[2],r[3]);c.getContext('2d').drawImage(TWIMG,r[0],r[1],r[2],r[3],0,0,r[2],r[3]);return c;}
/* 광장 분수 자리: 5×4칸 (원래 3×3 물웅덩이) */
{const a=AREAS.town;if(a){for(let y=24;y<=26;y++)for(let x=15;x<=17;x++)if(a.map[y][x]==='F')a.map[y][x]=':';for(let y=24;y<=27;y++)for(let x=14;x<=18;x++)a.map[y][x]='F';a.bigFnt={x0:14,x1:18,y1:27};}}
function overGround(a,x,y,ch){const o=a.map[y][x];a.map[y][x]=ch;drawTile(a.cv.getContext('2d'),x,y);a.map[y][x]=o;}
{const _ba=buildArea;buildArea=function(a){_ba(a);if(!a.outdoor||!TWOK)return;A=a;
  if(a.bigFnt){const f=a.bigFnt;for(let y=24;y<=f.y1;y++)for(let x=f.x0;x<=f.x1;x++)overGround(a,x,y,':');const c=twCv('fnt'),px0=((f.x0+f.x1+1)/2)*T-Math.round(c.width/2),py0=(f.y1+1)*T-c.height+2;a.dyn.push({c,px:px0,py:py0,sy:(f.y1+1)*T-1,x0:px0,x1:px0+c.width,y0:py0,y1:py0+c.height});}
  for(let y=0;y<a.MH;y++)for(let x=0;x<a.MW;x++){if(a.map[y][x]!=='Y')continue;const fl=a.floor&&a.floor[y][x]&&a.floor[y][x]!=='Y'?a.floor[y][x]:(a.map[y][x-1]===':'||a.map[y][x+1]===':'?':':',');overGround(a,x,y,fl);
    const c=twCv('bench'),px0=x*T+8-Math.round(c.width/2),py0=(y+1)*T-c.height+1;a.dyn.push({c,px:px0,py:py0,sy:(y+1)*T-2,x0:px0,x1:px0+c.width,y0:py0,y1:py0+c.height});}};}
{const _lc=lampCanvas;lampCanvas=function(){if(!TWOK)return _lc();return twCv('lamp');};}
TWIMG.onload=()=>{TWOK=true;for(const a of Object.values(AREAS)){if(!a.outdoor)continue;for(const L of [LAMPS[a.id]||[]])for(const q of L)if(!q[2]&&!q.tw){q[1]-=20;q.tw=1;}if(a.id in XLIGHT)delete XLIGHT[a.id];}
  for(const k in SEAS_CACHE)delete SEAS_CACHE[k];for(const a of Object.values(AREAS))if(a.outdoor){buildArea(a);SEAS_CACHE[a.id]={[SEAS]:{cv:a.cv,dyn:a.dyn,full:a.full}};}};
TWIMG.src=TWSRC;
/* 건물 칸 안에 잘못 들어간 덤불·나무·꽃 → 지붕/벽 (지붕 모서리에 덤불이 얹혀 보이던 것) */
for(const a of Object.values(AREAS)){if(!a.outdoor)continue;for(const b of a.BLD||[]){const wr=b[10].wr;for(let y=b[3];y<b[3]+b[5];y++)for(let x=b[2];x<b[2]+b[4];x++){const c=a.map[y]&&a.map[y][x];if(c&&'ztIf,:'.includes(c))a.map[y][x]=y<b[3]+b[5]-wr?'r':'W';}}}
