/* ═════════ 앤티크 침실 가구 (Orangeblossom's Antique Bedroom · 5색): 대공 침실=남색 · 손님방=장미 · 집무실=흑단 ═════════ */
const OAD={canopy:[0,3,6],bed2:[10,3,4],rug1:[74,5,4],rug2:[138,5,4],rug3:[217,7,4],rug4:[210,7,4],fire:[272,4,5],ottoman:[134,3,2],stool:[137,1,2],vanity:[112,3,3],armoire:[115,2,3],end1:[176,1,2],end2:[208,1,2],paint1:[166,3,3],paint2:[169,1,3],vase:[178,1,2],marble:[179,1,2],frames:[133,1,2]};
const OA_ROOM={kbed:'OA',guest:'OA3',office:'OA4',parlor:'OA1',dining:'OA1',grand:'OA1',library:'OA2',kstudy:'OA2',council:'OA4',ballroom:'OA3',hall2:'OA',landing:'OA'};
{const imgs={};let n=0;const keys=Object.keys(OASRC);
  for(const k of keys){const im=new Image();im.onload=()=>{imgs[k]=im;if(++n===keys.length){const go=()=>{if(!FSH_OK){setTimeout(go,120);return;}for(const q of keys)FSHEET[q]={cols:16,src:'',img:imgs[q]};for(const a of Object.values(AREAS))if(!a.outdoor&&a.objs.some(o=>o.oa))buildArea(a);};go();}};im.src=OASRC[k];}}
{const _f0=furnSprite0;furnSprite0=function(o,a){if(o.oa&&OAD[o.oa]){const rm=(a.ROOMS.find(r=>o.x>=r[2]&&o.x<r[2]+r[4]&&o.y>=r[3]&&o.y<r[3]+r[5])||[''])[0],pk=o.oac||OA_ROOM[rm]||'OA';
    if(FSHEET[pk]&&FSHEET[pk].img){const d=OAD[o.oa];return {pk,i:d[0],w:d[1],h:d[2],flip:false};}}return _f0(o,a);};}
/* 기사 갑옷 모형(코드 그림) → 원본 청동 말 조각상: 방 가운데를 바라보게 좌우 대칭 */
{const _f1=furnSprite0;furnSprite0=function(o,a){if((o.k==='armorstand')&&FSHEET.OW&&FSHEET.OW.img&&!a.outdoor){const r=a.ROOMS.find(r=>o.x>=r[2]&&o.x<r[2]+r[4]&&o.y>=r[3]&&o.y<r[3]+r[5]);
    const right=r&&o.x+.5>r[2]+r[4]/2;return {raw:{pk:'OW',x:97,y:2,w:31,h:46},w:1,h:3,rflip:right};}return _f1(o,a);};}
{const _fc=furnCanvas;furnCanvas=function(sp){const c=_fc(sp);if(sp&&sp.rflip){const f=document.createElement('canvas');f.width=c.width;f.height=c.height;const g=f.getContext('2d');g.translate(c.width,0);g.scale(-1,1);g.drawImage(c,0,0);return f;}return c;};}
/* ═════════ 가구 다양화: 보낸 가구 시트(우아한 빅토리안 · 엘레강트)에서 방마다 다른 것을 고른다 ═════════ */
const VAR={
 SV:{plant:[[226,35,11,29],[195,36,10,28],[210,38,12,26],[67,68,10,28],[432,649,14,23],[144,692,15,28]],
     stand:[[113,690,13,30],[129,690,13,30]],
     rtable:[[1,608,30,32],[33,608,30,32],[65,608,30,32],[97,608,30,32],[129,608,30,32],[161,609,30,31]],
     ctable:[[257,213,46,27],[385,213,46,27],[465,213,46,27]],
     sofaL:[[465,256,46,32]],sofaD:[[128,256,48,32]]},
 EV:{plant:[[0,1590,16,25],[35,1592,10,23],[51,1595,10,20],[66,1596,10,20],[99,1596,10,20]],
     sofaL:[[0,625,48,31]],sofaD:[[80,628,48,28],[81,675,46,29]],sofaR:[[0,672,48,32]],cab:[[128,820,32,28]]}};
const SERV_ROOMS=new Set(['servants','maids','m_room','b_room','kitchen','laundry','kq','bunks','storage','pantry','r_room','stable','armory','cellar']);
const LIGHT_ROOMS=new Set(['ballroom','tea_in','flower_in','tailor_in','guest','infirmary','grand','entrance','landing','hall2','hallN','myroom']);
const RED_ROOMS=new Set(['parlor','dining','kbed','tavern_in']);
function vpick(key,seed){const L=[];for(const pk of ['SV','EV'])for(const r of (VAR[pk][key]||[]))L.push([pk,r]);if(!L.length)return null;const [pk,r]=L[Math.abs(seed)%L.length];return {pk,r};}
function vSprite(pk,r,w,h,yoff){return {raw:{pk,x:r[0],y:r[1],w:r[2],h:r[3]},w,h,yoff:yoff||0};}
{const _f2=furnSprite0;furnSprite0=function(o,a){if(a.outdoor||!FSHEET.SV||!FSHEET.SV.img||!FSHEET.EV||!FSHEET.EV.img||o.oa)return _f2(o,a);
  const rmr=a.ROOMS.find(r=>o.x>=r[2]&&o.x<r[2]+r[4]&&o.y>=r[3]&&o.y<r[3]+r[5]),rm=rmr?rmr[0]:'',hs=[...rm].reduce((s,c)=>s*31+c.charCodeAt(0),7)&0xffff,seed=hs+o.x*7+o.y*13;
  if(SERV_ROOMS.has(rm)){   // 하인 방·작업 공간: 수수한 원목 · 소박한 화분만
    if(o.k==='plant'&&o.w===1)return {pk:'OB',i:(seed%2)?8:40,w:1,h:2,flip:false};
    if(o.k==='table'&&o.w===2&&o.h===1&&!o.chess&&!o.it&&rm!=='kitchen')return vSprite('SV',[33,608,30,32],2,2);
    return _f2(o,a);}
  if(o.k==='armor'){const p=vpick('stand',hs);return vSprite(p.pk,p.r,1,2);}   // 말 조각상 대신 꽃 받침대 (한 방 안에선 같은 것끼리 대칭)
  if(o.k==='plant'&&o.w===1&&!o.tall&&!o.flower&&seed%3!==0){const p=vpick('plant',seed);return vSprite(p.pk,p.r,1,2);}
  if(o.k==='table'&&o.w===2&&o.h===1&&!o.chess&&!o.it&&rm!=='tea_in'&&rm!=='kitchen'){const p=vpick('rtable',hs+o.x);return vSprite(p.pk,p.r,2,2);}
  if(o.k==='table'&&o.w===3&&o.h<=2&&!o.it&&rm!=='kitchen'&&!o.nat){const p=vpick('ctable',hs);return vSprite(p.pk,p.r,3,2);}
  if(o.k==='sofa'&&(o.d||0)===0&&o.w>=3){const key=LIGHT_ROOMS.has(rm)?'sofaL':RED_ROOMS.has(rm)?'sofaR':'sofaD';const p=vpick(key,hs)||vpick('sofaD',hs);return vSprite(p.pk,p.r,o.w,2);}
  if(o.k==='cabinet'&&o.w===2&&!o.it&&rm!=='tea_in'&&seed%2){const p=vpick('cab',0);return vSprite(p.pk,p.r,2,2);}
  return _f2(o,a);};}
/* 침대 옆 협탁: 벽에 바짝 붙여 침대를 가리지 않게 */
{const _f3=furnSprite;furnSprite=function(o,a){const sp=_f3(o,a);if(sp&&o.k==='table'&&o.w===1&&o.h===1&&a.objs.some(b=>b.k==='bed'&&b.y===o.y&&(b.x+b.w===o.x||o.x+1===b.x)))return Object.assign({},sp,{yoff:(sp.yoff||0)-6});return sp;};}
/* 탁자 양옆 안락의자: 그림이 탁자에 붙지 않게 바깥으로 6px 띄움 (앉은 자리도 같이) */
for(const a of Object.values(AREAS)){if(a.outdoor)continue;for(const o of a.objs){if(o.k!=='armchair')continue;const d=o.d||0;
  if(d===3&&a.objs.some(t=>t.k==='table'&&t.x===o.x+1&&t.y<=o.y&&t.y+t.h>o.y))o._xoff=-10;
  if(d===2&&a.objs.some(t=>t.k==='table'&&t.x+t.w===o.x&&t.y<=o.y&&t.y+t.h>o.y))o._xoff=10;}}

/* 문 통로: 벽 두께 전체(세 줄)를 통로로 — 한쪽 칸만 끊겨 ㄴ자 벽이 생기지 않게 */
for(const a of Object.values(AREAS)){if(a.outdoor)continue;const M=a.map;for(let y=0;y<a.MH;y++)for(let x=0;x<a.MW;x++){if(M[y][x]!=='d')continue;let k=1;while(M[y+k]&&'wnv'.includes(M[y+k][x])&&k<5){M[y+k][x]='v';k++;}
  if(M[y+1]&&M[y+1][x]==='v'){for(let j=1;j<5&&M[y+j]&&M[y+j][x]==='v';j++){}}}}
