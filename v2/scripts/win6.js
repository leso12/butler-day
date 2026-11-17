/* ═════════ 새 리텍: 계절 창문(기본창 6색·프렌치창) + 시골풍 벽지·바닥 ═════════ */
const W6={};function w6img(k,src){const im=new Image();W6[k]={im,ok:false};im.onload=()=>{W6[k].ok=true;w6ready();};im.src=src;}
for(const s in W6D.win)w6img('w_'+s,W6D.win[s]);w6img('wf',W6D.wf);
let W6N=0;function w6ready(){if(++W6N<13)return;for(const a of Object.values(AREAS))if(!a.outdoor)buildArea(a);if(typeof SEAS_CACHE!=='undefined')for(const k in SEAS_CACHE){const a=AREAS[k];if(a&&!a.outdoor)delete SEAS_CACHE[k];}}
/* 창 종류: 0 기본(흰) 1 베이지 2 검정 3 갈색 4 초코 5 회색 · 6/7 프렌치 닫힌창 L/R · 8/9 프렌치 열린창 L/R · 10/11 프렌치 커튼창 L/R */
const W6WIN={ /* 방 → [종류, 'pair'면 x 짝수/홀수로 L·R 번갈아] */
 parlor:[10,1],guest:[10,1],library:[10,1],hallN:[10,1],grand:[10,1],dining:[10,1],entrance:[10,1],kbed:[10,1],vip1:[10,1],vip2:[10,1],hall2:[10,1],landing:[10,1],ballroom:[10,1],
 office:[6,1],kstudy:[6,1],council:[6,1],butler:[3],myroom:[1],infirmary:[0],kitchen:[0],storage:[5],pantry:[5],cellar:[5],
 m_room:[4],b_room:[3],maids:[1],servants:[3],laundry:[0],r_room:[4],bunks:[3],kq:[4],armory:[5],stable:[3],
 gen_in:[1],flower_in:[8,1],book_in:[4],tea_in:[10,1],bakery_in:[1],hagen_in:[2],h_ware:[5],tavern_in:[4],tailor_in:[10,1],house1_in:[0],house2_in:[3],house3_in:[4],greenhouse:null};
/* 시골풍 벽지·바닥 [벽 번호, 바닥 번호(null=그대로)] */
const W6WF={kbed:[57,41],council:[84,55],butler:[40,13],kitchen:[89,21],storage:[88,4],pantry:[88,4],cellar:[101,16],kstudy:[110,41],vip1:[81,30],vip2:[108,28],
 laundry:[21,21],bunks:[25,44],kq:[85,45],armory:[91,19],gen_in:[19,12],h_ware:[92,11],tavern_in:[102,42],
 m_room:[70,44],maids:[82,45],b_room:[85,13],servants:[72,15],house1_in:[64,0],house2_in:[81,44],house3_in:[105,45]};
{const _dt=drawTile;drawTile=function(g,x,y){const a=A;if(!a||a.outdoor||!W6.wf.ok){return _dt(g,x,y);}
  const m=a.map,c=m[y][x];const rm=a.ROOMS&&a.ROOMS.find(r=>x>=r[2]&&x<r[2]+r[4]&&y>=r[3]&&y<r[3]+r[5]);
  if(c==='n'){m[y][x]='w';_dt(g,x,y);m[y][x]='n';}else _dt(g,x,y);
  if(!rm)return;const wf=W6WF[rm[0]],X=x*T,Y=y*T,isW=ch=>ch==='w'||ch==='n';
  if(wf&&wf[0]!=null&&isW(c)){const up=m[y-1]&&m[y-1][x],dn=m[y+1]&&m[y+1][x],row=!isW(up)?0:isW(dn)?1:2,w=wf[0];g.drawImage(W6.wf.im,(w%16)*16,Math.floor(w/16)*48+row*16,16,16,X,Y,16,16);}
  else if(wf&&wf[1]!=null&&c===rm[6]){const f=wf[1];g.drawImage(W6.wf.im,(f%8)*32+(x%2)*16,336+Math.floor(f/8)*32+(y%2)*16,16,16,X,Y,16,16);}
  if(c==='n'){const up=m[y-1]&&m[y-1][x],dn=m[y+1]&&m[y+1][x];if(dn==='n')return;   /* 창 그림은 아래 칸을 그릴 때 한 번에 (아래 칸이 덮지 않게) */
    const spec=W6WIN[rm[0]];if(spec===null)return;const S_=W6['w_'+(SEASK[SZ()]||'summer')+w6var()]||W6['w_'+(SEASK[SZ()]||'summer')];if(!S_||!S_.ok)return;
    let k=spec?spec[0]:3;if(spec&&spec[1])k+=(x%2);
    const top=up==='n'?(y-1)*T:y*T-16;g.drawImage(S_.im,k*16,0,16,48,X,top-13,16,48);}};}
/* 창밖은 날씨·밤낮을 따라 바뀜: 밤(19~6시) → 밤 창, 비 → 빗줄기 창 (눈·눈보라는 겨울 창 그대로) */
function w6var(){const h=Math.floor((S.min||0)/60)%24;if(h>=19||h<6)return '_night';if(S.weather==='rain')return '_rain';return '';}
setInterval(()=>{if(typeof S==='undefined'||!S.area||W6N<13)return;const a=AREAS[S.area];if(!a||a.outdoor)return;const k=SZ()+w6var();if(a._w6k!==k)buildArea(a);},1000);
{const _ba6=buildArea;buildArea=function(a){_ba6(a);if(a&&!a.outdoor&&typeof S!=='undefined'&&S)a._w6k=SZ()+w6var();};}
/* 대공 침실 윗벽: 붙어 있던 벽 촛대 둘 제거 (창은 침대 양옆 대칭) */
{const _wap=wallArtPlan;wallArtPlan=function(a){const p=_wap(a);if(a&&a.id==='keep2'){for(let i=p.length-1;i>=0;i--){const q=p[i];if(q.x<19*T&&q.y<4*T)p.splice(i,1);}}return p;};}
