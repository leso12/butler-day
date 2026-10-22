
/* ═════════ 공통 ═════════ */
const SOLID='#wnBDbSTFt=PGrWKLlVXugjozIZp% ';
const inMap=(a,x,y)=>x>=0&&y>=0&&x<a.MW&&y<a.MH;
for(const a of Object.values(AREAS)){a.blk=new Uint8Array(a.MW*a.MH);a.otile={};
  for(const o of a.objs){for(let j=0;j<o.h;j++)for(let i=0;i<o.w;i++){const k=(o.y+j)*a.MW+o.x+i;if(!o.walk)a.blk[k]=1;if(o.it||!a.otile[k]||!a.otile[k].it)a.otile[k]=o;}}
  if(!a.floor)a.floor=a.map.map((r,y)=>r.map((c,x)=>{const rm=a.ROOMS.find(r=>x>=r[2]&&x<r[2]+r[4]&&y>=r[3]&&y<r[3]+r[5]);return rm?rm[6]:c;}));}
const solidIn=(a,tx,ty)=>!inMap(a,tx,ty)||SOLID.includes(a.map[ty][tx])||a.blk[ty*a.MW+tx]===1;
const solidAt=(tx,ty)=>solidIn(AREAS[S.area],tx,ty);
const objAt=(a,tx,ty)=>inMap(a,tx,ty)?a.otile[ty*a.MW+tx]||null:null;
const inRect=(r,tx,ty)=>tx>=r[2]&&tx<r[2]+r[4]&&ty>=r[3]&&ty<r[3]+r[5];
function roomIn(a,tx,ty){const r=a.ROOMS.find(r=>inRect(r,tx,ty));if(r)return r[0];const o=a.OUT.find(o=>inRect(o,tx,ty));return o?o[0]:a.def;}
const roomAt=(tx,ty)=>roomIn(AREAS[S.area],tx,ty);
const RNAME={grounds:'대공성 마당',street:'마을 거리'},LOC_AREA={grounds:'castle',street:'town'};
for(const a of Object.values(AREAS)){for(const r of [...a.ROOMS,...a.OUT]){RNAME[r[0]]=r[1];LOC_AREA[r[0]]=a.id;}for(const b of a.BLD)if(!RNAME[b[0]])RNAME[b[0]]=b[1];}
function placeName(tx,ty){const a=AREAS[S.area],r=roomIn(a,tx,ty);if(r)return RNAME[r];return a.name;}
const bldAt=(a,x,y)=>a.BLD.find(b=>inRect(b,x,y));
const doorAt=(a,x,y)=>a.doors.find(d=>d.x===x&&d.y===y);
/* 지역 간 길찾기: 문 그래프 BFS → 다음에 향할 문 */
function nextDoor(from,to){if(from===to)return null;const prev={[from]:null},q=[from];
  while(q.length){const c=q.shift();if(c===to)break;for(const d of AREAS[c].doors){if(prev[d.to]!==undefined)continue;prev[d.to]={a:c,d};q.push(d.to);}}
  if(prev[to]===undefined)return null;let k=to;while(prev[k]&&prev[k].a!==from)k=prev[k].a;return prev[k]?prev[k].d:null;}
/* 미리 그리기: 바닥 → 가구(위쪽부터) → 그림자 → 색 보정 */
function grade(cv,k){const g=cv.getContext('2d'),id=g.getImageData(0,0,cv.width,cv.height),d=id.data;
  for(let i=0;i<d.length;i+=4){if(!d[i+3])continue;const l=d[i]*.3+d[i+1]*.59+d[i+2]*.11;for(let c=0;c<3;c++)d[i+c]=Math.round((d[i+c]+(l-d[i+c])*k)*.86+[250,238,232][c]*.14);}
  g.putImageData(id,0,0);}
function shadowPass(g,a){g.fillStyle='rgba(40,20,20,.22)';
  for(let y=1;y<a.MH;y++)for(let x=0;x<a.MW;x++){const up=a.map[y-1][x],c=a.map[y][x];
    if('wnv'.includes(up)&&!'wnv#'.includes(c))g.fillRect(x*T,y*T,T,4);
    if('rWO%'.includes(up)&&!SOLID.includes(c)&&c!=='O')g.fillRect(x*T,y*T,T,3);}}
const FLAT=new Set(['rug','painting','chair','bench','stool','armchair','sofa','stall','line','bed_planter']);
for(const a of Object.values(AREAS)){A=a;a.cv=mk(a.MW*T,a.MH*T);const g=a.cv.getContext('2d');a.dyn=[];
  for(let y=0;y<a.MH;y++)for(let x=0;x<a.MW;x++)drawTile(g,x,y);shadowPass(g,a);
  const os=a.objs.slice().sort((p,q)=>(p.k==='rug'?-1:0)-(q.k==='rug'?-1:0)||(p.y+p.h)-(q.y+q.h));
  for(const o of os){if(FLAT.has(o.k)){drawObj(g,o);continue;}
    const up=40,c=mk(o.w*T+8,o.h*T+up+4),cg=c.getContext('2d');cg.translate(-o.x*T+4,-(o.y*T-up));drawObj(cg,o);grade(c,.12);
    a.dyn.push({c,px:o.x*T-4,py:o.y*T-up,sy:(o.y+o.h)*T-1,x0:o.x*T-4,x1:(o.x+o.w)*T+4,y0:o.y*T-up,y1:(o.y+o.h)*T+4});}
  grade(a.cv,.12);a.full=mk(a.cv.width,a.cv.height);const fg=a.full.getContext('2d');fg.drawImage(a.cv,0,0);for(const d of a.dyn.slice().sort((p,q)=>p.sy-q.sy))fg.drawImage(d.c,d.px,d.py);}
const LAMPS={};for(const a of Object.values(AREAS)){LAMPS[a.id]=[];for(let y=0;y<a.MH;y++)for(let x=0;x<a.MW;x++){const c=a.map[y][x];if(c==='l')LAMPS[a.id].push([x*T+8,y*T+4]);if(c==='n'&&!a.outdoor)LAMPS[a.id].push([x*T+8,y*T+20,1]);}
  for(const o of a.objs){if(o.k==='lamp')LAMPS[a.id].push([o.x*T+8,o.y*T-4]);if(o.k==='fireplace')LAMPS[a.id].push([o.x*T+o.w*8,o.y*T+8]);}}
