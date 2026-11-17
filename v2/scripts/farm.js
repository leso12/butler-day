
/* ═════════ 텃밭 · 온실 농사 · 요리 · 닭장 · 출하 상자 ═════════ */
const CROPS={
  potato:{n:'감자',s:['봄'],d:6,sp:2,p:5,y:[1,2],t:'root',c:['#d8ac70','#9a6a3a']},
  strawb:{n:'딸기',s:['봄'],d:8,re:3,sp:5,p:4,y:[1,2],t:'berry',c:['#e8384a','#9a1a2e'],sn:'딸기 모종'},
  cabbage:{n:'양배추',s:['봄'],d:9,sp:4,p:12,y:[1,1],t:'leafy',c:['#b8e07a','#6aa850']},
  pea:{n:'완두콩',s:['봄'],d:5,re:3,sp:3,p:3,y:[2,3],t:'pea',c:['#9ad85a','#4a8a30']},
  tulip:{n:'튤립',s:['봄'],d:6,sp:2,out:'tulip',y:[1,1],t:'flower',c:['#f0607a','#a82446'],sn:'튤립 구근'},
  tomato:{n:'토마토',s:['여름'],d:7,re:3,sp:3,p:4,y:[1,2],t:'stake',c:['#ea4630','#a42416']},
  blueb:{n:'블루베리',s:['여름'],d:9,re:3,sp:5,p:2,y:[3,4],t:'bush',c:['#6a7ae0','#323a92'],sn:'블루베리 묘목'},
  corn:{n:'옥수수',s:['여름','가을'],d:10,re:4,sp:4,p:5,y:[1,1],t:'corn',c:['#f6d24a','#c8961e']},
  sunflower:{n:'해바라기',s:['여름','가을'],d:7,sp:2,out:'sunflower',y:[1,1],t:'sunf',c:['#f8c832','#6a3e1a']},
  melon:{n:'멜론',s:['여름'],d:11,sp:7,p:20,y:[1,1],t:'gourd',c:['#b8d870','#4a7a2a']},
  wheat:{n:'밀',s:['여름','가을'],d:4,sp:1,p:2,y:[1,2],t:'wheat',c:['#ecc664','#b08a2e']},
  pumpkin:{n:'호박',s:['가을'],d:11,sp:6,p:18,y:[1,1],t:'gourd',c:['#f08a2a','#b0521a']},
  carrot:{n:'당근',s:['가을'],d:5,sp:1,p:3,y:[1,2],t:'root',c:['#f08a2a','#c05a14']},
  grape:{n:'포도',s:['가을'],d:8,re:3,sp:4,p:4,y:[1,2],t:'trellis',c:['#8a46aa','#4a1e62'],sn:'포도 묘목'},
  beet:{n:'비트',s:['가을'],d:6,sp:2,p:5,y:[1,1],t:'root',c:['#b8284e','#6a1430']},
  kale:{n:'케일',s:['겨울'],d:7,sp:3,p:7,y:[1,1],t:'kale',c:['#6aa88a','#2e5a4a']},
  herb:{n:'로즈마리',s:['봄','여름','가을'],d:5,re:2,sp:2,p:3,y:[1,2],t:'herb',c:['#8ab8a0','#a07ad8']},
  tea:{n:'남부 찻잎',s:['여름'],d:10,re:4,sp:6,out:'tea_leaf',y:[1,2],t:'tea',c:['#4a8a3e','#b8e078'],sn:'남부 차나무 묘목'},
};
const DISH={
  soup:{n:'감자 수프',ing:{potato:2},food:30,p:10,d:'뭉근하게 끓인 감자 수프. 속까지 따뜻해진다.'},
  herbtea:{n:'로즈마리 차',ing:{herb:2},food:12,p:7,d:'머리가 맑아지는 허브차.'},
  omelet:{n:'텃밭 오믈렛',ing:{egg:2,herb:1},food:35,p:12,d:'달걀 두 알에 로즈마리를 다져 넣었다.',hen:1},
  stew:{n:'토마토 스튜',ing:{tomato:2,potato:1},food:40,p:14,lv:2,d:'새콤한 토마토와 감자를 오래 끓였다.'},
  cornbread:{n:'옥수수빵',ing:{corn:1,wheat:1},food:28,p:12,lv:2,d:'노란 옥수수 알이 콕콕 박힌 빵.'},
  salad:{n:'봄 샐러드',ing:{cabbage:1,pea:2},food:30,p:22,lv:2,d:'아삭한 양배추와 완두콩.'},
  grapejuice:{n:'포도 주스',ing:{grape:3},food:15,p:16,lv:2,d:'보랏빛 포도를 꾹꾹 눌러 짰다.'},
  pumpsoup:{n:'호박 수프',ing:{pumpkin:1,herb:1},food:45,p:26,lv:3,d:'샛노랗고 부드러운 가을 수프.'},
  carrotcake:{n:'당근 케이크',ing:{carrot:2,wheat:1,egg:1},food:38,p:18,lv:3,d:'촉촉한 당근 케이크.',hen:1},
  jam:{n:'블루베리 잼',ing:{blueb:4},food:15,p:14,lv:3,d:'작은 병에 담은 새콤달콤한 잼.'},
  fishherb:{n:'허브 송어구이',ing:{trout:1,herb:1},food:40,p:16,lv:3,d:'호수 송어에 로즈마리를 얹어 구웠다.'},
  vegpie:{n:'채소 고기파이',ing:{potato:1,carrot:1,wheat:1},food:45,p:20,br:4,d:'브란트에게 배운 기사단 야식. 로웬님 몫은 크게.'},
  kalesoup:{n:'케일 감자국',ing:{kale:1,potato:1},food:38,p:16,lv:4,d:'눈 오는 날 몸을 녹이는 국.'},
  strawcake:{n:'딸기 케이크',ing:{strawb:3,wheat:1,egg:1},food:40,p:30,lv:4,d:'딸기를 듬뿍 올린 케이크.',hen:1},
  melonice:{n:'멜론 셔벗',ing:{melon:1},food:25,p:28,lv:4,d:'얼음 창고에서 식힌 멜론 셔벗.'},
  southtea:{n:'남부식 꽃차',ing:{tea_leaf:2,herb:1},food:20,p:24,lv:5,d:'고향의 찻잎으로 우린 차. 한 모금이면 남부의 햇살이 떠오른다.'},
};
const FLV=[0,12,35,70,120];
Object.assign(ITEMS,{
  can:{n:'물뿌리개',p:0,tool:1,d:'브란트가 맡긴 낡은 물뿌리개. 텃밭과 온실에 물을 준다.'},
  can2:{n:'구리 물뿌리개',p:40,tool:1,d:'한 번에 앞쪽 세 칸에 물을 준다.'},
  egg:{n:'달걀',p:2,sell:1,d:'성 닭장의 따끈한 달걀.'},
  egg_big:{n:'큰 달걀',p:5,sell:1,d:'잘 보살핀 암탉이 낳은 커다란 달걀. 요리에 쓰면 달걀 두 알 몫.'},
});
for(const [k,c] of Object.entries(CROPS)){
  const sn=c.sn||`${c.n} 씨앗`;
  ITEMS['s_'+k]={n:sn,p:c.sp,seed:k,d:`${c.k==='kale'?'':''}${c.s.join('·')}에 심는다 · ${c.d}일${c.re?` · 그 뒤 ${c.re}일마다 다시 열림`:''}${c.s.includes('겨울')?' · 온실 전용':''} (온실에선 언제든)`};
  if(!c.out)ITEMS[k]={n:c.n,p:c.p,sell:1,crop:1,d:`텃밭에서 기른 ${c.n}.`};
  else{ITEMS[c.out].sell=1;}
}
for(const [k,d] of Object.entries(DISH))ITEMS['d_'+k]={n:d.n,p:d.p,food:d.food,dish:1,sell:1,d:`${d.d} 체력 +${d.food}.`};
{const sea={봄:['s_potato','s_cabbage','s_pea'],여름:['s_tomato','s_corn','s_wheat'],가을:['s_carrot','s_beet','s_pumpkin','s_wheat','s_corn'],겨울:['s_kale','s_potato']};
  SHOPS.gen.seas=SHOPS.gen.seas||{};for(const [k,v] of Object.entries(sea))(SHOPS.gen.seas[k]=SHOPS.gen.seas[k]||[]).push(...v);
  SHOPS.gen.items.push('can2');
  SHOPS.flower.items.push('s_herb');for(const [k,v] of Object.entries({봄:['s_tulip'],여름:['s_sunflower'],가을:['s_sunflower']}))(SHOPS.flower.seas[k]=SHOPS.flower.seas[k]||[]).push(...v);
  SHOPS.market.seas=SHOPS.market.seas||{};for(const [k,v] of Object.entries({봄:['s_strawb'],여름:['s_blueb','s_melon','s_tea'],가을:['s_grape'],겨울:['s_tea','s_strawb']}))(SHOPS.market.seas[k]=SHOPS.market.seas[k]||[]).push(...v);}
for(const [id,o] of Object.entries({
  kairan:{love:['d_southtea'],like:['d_herbtea','d_soup','d_pumpsoup','herb'],dis:['d_strawcake','d_grapejuice']},
  roewen:{love:['d_vegpie','d_stew','d_fishherb'],like:['corn','d_cornbread','potato','d_soup','d_omelet'],dis:['herb','d_herbtea','d_salad']},
  edmund:{love:['d_herbtea','d_southtea'],like:['d_jam','d_soup','herb','d_carrotcake'],dis:['corn','d_grapejuice']},
  marta:{love:['d_strawcake'],like:['d_salad','d_jam','strawb','d_carrotcake','d_omelet'],dis:['beet']},
  brant:{love:['pumpkin','melon','egg_big'],like:['potato','tomato','herb','corn','kale','cabbage','beet','egg'],dis:['d_cornbread']},
  tim:{love:['strawb','d_strawcake','d_grapejuice','d_melonice'],like:['corn','blueb','d_jam','carrot','d_omelet'],dis:['kale','beet','herb','d_herbtea']},
}))if(PREF[id])for(const k of ['love','like','dis'])PREF[id][k].push(...o[k]);

/* 상태 */
function F(){if(S.farm)return S.farm;const f=S.farm={pl:{},intro:0,lv:0,xp:0,sel:null,got:{},cooked:{},rec:{},hens:0,fed:0,eggs:[],hl:{},ev:{},ship:{},day:S.day,mail:0};
  const ss=dateOf(S.day).season,c0={봄:'potato',여름:'tomato',가을:'carrot',겨울:'kale'}[ss];f.day=S.day-1;
  const out=plotsOf('castle');out.slice(0,6).forEach(([x,y],i)=>{if(ss!=='겨울')f.pl['castle:'+x+':'+y]={c:c0,g:2+(i%3),wd:S.day};});
  plotsOf('green').forEach(([x,y],i)=>{if(i%9<3)f.pl['green:'+x+':'+y]={c:'herb',g:5,wd:S.day};});
  return f;}
const PLOTS={};
function plotsOf(aid){if(PLOTS[aid])return PLOTS[aid];const a=AREAS[aid],o=[];if(a)for(let y=0;y<a.MH;y++)for(let x=0;x<a.MW;x++)if(a.map[y][x]==='e')o.push([x,y]);return PLOTS[aid]=o;}
const isPlot=(aid,x,y)=>plotsOf(aid).some(p=>p[0]===x&&p[1]===y);
const PK=(aid,x,y)=>aid+':'+x+':'+y;
const FSEA=()=>dateOf(S.day).season;
const inSeason=(c,aid)=>aid==='green'||CROPS[c].s.includes(FSEA());
function stageOf(p){const c=CROPS[p.c];if(p.dead)return -1;if(p.g>=c.d)return 4;const k=p.g/c.d;return p.g===0?0:k<.34?1:k<.67?2:3;}
const farmLvOf=xp=>{let l=0;for(let i=0;i<FLV.length;i++)if(xp>=FLV[i])l=i+1;return l;};
function farmXp(n){const f=F(),l0=farmLvOf(f.xp);f.xp+=n;const l1=farmLvOf(f.xp);if(l1>l0){f.lv=l1;const nr=Object.entries(DISH).filter(([k,d])=>d.lv===l1).map(([k,d])=>d.n);
  setTimeout(()=>toast(`텃밭 솜씨 Lv.${l1}!${nr.length?` <i>새 요리법: ${nr.join(', ')}</i>`:''}`),900);}}
let recKnown=k=>{const d=DISH[k],f=F();if(f.rec[k])return true;if(d.hen&&!f.hens)return false;if(d.br)return hearts('brant')>=d.br;return farmLvOf(f.xp)>=(d.lv||1);};

/* 매일 아침 */
function farmDay(){if(!S.farm){if(S.day>=3)F();else return;}const f=F();if(f.day===S.day)return;const prev=f.day;f.day=S.day;
  const ss=FSEA(),rain=S.weather==='rain'||S.weather==='blizzard'||S.weather==='snow';
  for(const [k,p] of Object.entries(f.pl)){const [aid]=k.split(':');
    if(p.dead)continue;
    if(p.wd>=prev&&p.wd<S.day)p.g++;   // 어제 물을 줬으면 하루 자란다
    if(aid==='castle'&&!CROPS[p.c].s.includes(ss)){p.dead=1;continue;}
    if(aid==='castle'&&rain&&ss!=='겨울')p.wd=S.day;}
  // 출하 대금
  const tot=Object.entries(f.ship).reduce((a,[k,n])=>a+(ITEMS[k]?ITEMS[k].p*n:0),0);
  if(tot>0){S.coins+=tot;const ls=Object.entries(f.ship).map(([k,n])=>`${ITEMS[k].n} ${n}`).join(', ');f.ship={};
    setTimeout(()=>toast(`출하 대금 <i>+${money(tot)}</i>`),1600);diaryAdd('note',`출하 상자 대금으로 ${money(tot)}을 받았다. (${ls})`);}
  // 달걀
  f.eggs=[];if(f.hens){const fedY=f.fed===prev||f.fed===S.day-1;if(fedY){const spots=[[47,47],[48,47],[49,47],[47,48],[48,48]];
    for(let i=0;i<f.hens;i++){const big=(f.hl[i]||0)>=5&&Math.random()<.35;f.eggs.push([spots[i][0],spots[i][1],big?1:0,i]);}}}
  f.pet={};
  if(S.day>=3&&!f.intro&&!f.mail){f.mail=1;addMail('브란트','텃밭 좀 맡아라','부집사. 주방 일손이 모자라서 마당 텃밭이 엉망이다. 시간 날 때 텃밭에 와 봐. 물뿌리개 줄 테니. — 브란트 (글씨가 왜 이러냐고 묻지 마라)');}
}

/* 행동 */
function farmTile(tx,ty){const ft=tileOf(P);for(const [x,y] of [[tx,ty],ft])if(isPlot(S.area,x,y))return [x,y];return null;}
const BIN={area:'castle',x:43,y:24},COOP={area:'castle',x:47,y:45},TROUGH={x:49,y:46};
function henNear(){const {qx,qy}=facing();return S.area==='castle'&&F().hens?HENS.find(h=>Math.hypot(h.x-qx,h.y-4-qy)<11):null;}
function eggAt(tx,ty){const f=F();if(S.area!=='castle'||!f.eggs)return -1;const ft=tileOf(P);return f.eggs.findIndex(e=>(e[0]===tx&&e[1]===ty)||(e[0]===ft[0]&&e[1]===ft[1]));}
function farmLabel(tx,ty,ob){
  if(ob&&ob.it==='stove'&&S.farm&&S.farm.intro&&!task('tea')&&!(S.carry==='wood'&&task('wood')))return '요리';
  if(!S.farm)return null;const f=F();
  if(S.area==='castle'){if(tx===BIN.x&&ty===BIN.y)return '출하 상자';if(f.hens&&((tx===TROUGH.x&&ty===TROUGH.y)||(tx>=COOP.x&&tx<COOP.x+2&&ty>=COOP.y&&ty<COOP.y+2)))return f.fed===S.day?'닭장':'모이 주기';
    if(eggAt(tx,ty)>=0)return '달걀 줍기';if(henNear())return '쓰다듬기';}
  const pt=farmTile(tx,ty);if(!pt)return null;const p=f.pl[PK(S.area,...pt)];
  if(!p)return S.area==='castle'&&FSEA()==='겨울'?'살펴보기':f.sel&&S.inv['s_'+f.sel]&&inSeason(f.sel,S.area)?`${CROPS[f.sel].n} 심기`:'심기';
  if(p.dead)return '치우기';const st=stageOf(p);if(st===4)return '수확';if(p.wd!==S.day)return '물 주기';return '살펴보기';}
function farmAct(tx,ty,ob){
  if(ob&&ob.it==='stove'&&S.farm&&S.farm.intro){togglePanel('farm','cook');return true;}
  if(!S.farm)return false;const f=F();
  if(S.area==='castle'){
    if(tx===BIN.x&&ty===BIN.y){togglePanel('farm','ship');return true;}
    if(f.hens&&((tx===TROUGH.x&&ty===TROUGH.y)||(tx>=COOP.x&&tx<COOP.x+2&&ty>=COOP.y&&ty<COOP.y+2))){
      if(f.fed===S.day){startDialog(null,[R_(`암탉 ${f.hens}마리가 배부르게 꾸벅꾸벅 졸고 있다. (내일 아침 달걀이 나온다)`)]);return true;}
      f.fed=S.day;S.min+=5;FFX.push({k:'feed',x:TROUGH.x*T+8,y:TROUGH.y*T+8,t:performance.now()});
      for(const h of HENS){h.tx=TROUGH.x*T+8+(Math.random()*16-8);h.ty=TROUGH.y*T+16+Math.random()*6;h.mode='walk';}
      toast('모이를 줬다 <i>내일 아침 달걀</i>');save();return true;}
    {const i=eggAt(tx,ty);if(i>=0){const e=f.eggs[i];f.eggs.splice(i,1);const it=e[2]?'egg_big':'egg';S.inv[it]=(S.inv[it]||0)+1;f.got[it]=(f.got[it]||0)+1;
      toast(`${ITEMS[it].n} <i>+1</i>`);FFX.push({k:'pop',it,x:e[0]*T+8,y:e[1]*T+10,t:performance.now()});save();return true;}}
    {const h=henNear();if(h){const i=HENS.indexOf(h);f.pet=f.pet||{};if(!f.pet[i]){f.pet[i]=1;f.hl[i]=Math.min(10,(f.hl[i]||0)+1);}h.mode='hop';h.t0=performance.now();
      toast(`${HEN_N[i]} <i>꼬꼬댁!</i>`);return true;}}
  }
  const pt=farmTile(tx,ty);if(!pt)return false;const [x,y]=pt,k=PK(S.area,x,y);
  if(!f.intro){startDialog(null,[R_('브란트가 가꾸는 텃밭이다. 함부로 손대지 말자.')]);return true;}
  const p=f.pl[k];
  if(!p){if(S.area==='castle'&&FSEA()==='겨울'){startDialog(null,[R_('땅이 꽁꽁 얼었다. 겨울에는 온실에서 길러야 한다.')]);return true;}
    if(f.sel&&S.inv['s_'+f.sel]&&inSeason(f.sel,S.area)){plant(k,f.sel);return true;}
    f.pend=k;togglePanel('farm','seed');return true;}
  if(p.dead){delete f.pl[k];S.min+=2;toast('시든 줄기를 걷어 냈다');save();return true;}
  const st=stageOf(p);
  if(st===4){harvest(k,p,x,y);return true;}
  if(p.wd!==S.day){water(x,y);return true;}
  const c=CROPS[p.c],left=c.d-p.g;startDialog(null,[R_(`${c.n}${st===0?' 씨앗':''}. 촉촉하게 물을 머금었다. ${left<=1?'내일이면 거둘 수 있겠다!':`앞으로 ${left}일쯤.`}`)]);return true;}
function plant(k,c){const f=F();if(S.hp<2){toast('너무 지쳤다');return;}
  S.inv['s_'+c]--;S.hp-=1;S.min+=3;f.pl[k]={c,g:0,wd:-1};f.sel=c;const [aid,x,y]=k.split(':');
  FFX.push({k:'seed',x:+x*T+8,y:+y*T+10,t:performance.now()});
  toast(`${CROPS[c].n} 심음 <i>남은 ${S.inv['s_'+c]||0}</i>`);if(!S.inv['s_'+c])f.sel=null;hud();save();}
function water(x,y){const f=F();if(!S.inv.can&&!S.inv.can2){startDialog(null,[R_('물뿌리개가 없다.')]);return;}if(S.hp<1){toast('너무 지쳤다');return;}
  const [dx,dy]=DIRV[P.dir],cells=[[x,y]];if(S.inv.can2)for(let i=1;i<3;i++)cells.push([x+dx*i,y+dy*i]);let n=0;
  for(const [cx_,cy_] of cells){const p=f.pl[PK(S.area,cx_,cy_)];if(p&&!p.dead&&p.wd!==S.day){p.wd=S.day;n++;FFX.push({k:'water',x:cx_*T+8,y:cy_*T+10,t:performance.now()+(cx_-x+cy_-y)*60*(dx+dy||1)});}}
  if(!n)return;S.hp-=S.inv.can2?.6:1;S.min+=2;P.waterT=performance.now();hud();
  if(!S.seen.farmW){S.seen.farmW=1;toast('물을 준 날 밤에 한 칸씩 자라요');}}
function harvest(k,p,x,y){const f=F(),c=CROPS[p.c],out=c.out||p.c,lv=farmLvOf(f.xp);
  let n=c.y[0]+Math.floor(Math.random()*(c.y[1]-c.y[0]+1));if(Math.random()<(lv-1)*.12)n++;
  S.inv[out]=(S.inv[out]||0)+n;f.got[p.c]=(f.got[p.c]||0)+n;S.min+=2;
  FFX.push({k:'pop',it:out,crop:p.c,x:x*T+8,y:y*T+10,t:performance.now()});
  if(c.re){p.g=c.d-c.re;p.wd=-1;}else delete f.pl[k];
  if(lv>=5&&!c.re&&Math.random()<.15){S.inv['s_'+p.c]=(S.inv['s_'+p.c]||0)+1;toast('씨앗도 한 줌 받았다');}
  farmXp(Math.ceil((ITEMS[out].p||2)*n/3)+1);
  toast(`${ITEMS[out].n} <i>+${n}</i>`);
  f.dn=f.dn&&f.dn.d===S.day?f.dn:{d:S.day,k:{}};if(!f.dn.k[p.c]){f.dn.k[p.c]=1;diaryAdd('note',`${S.area==='green'?'온실':'텃밭'}에서 ${jo(c.n,'을','를')} 거뒀다.`);}
  hud();save();}

/* 패널 */
function farmPanel(arg,X_){const f=F();
  if(arg==='seed'){const pk=f.pend||'',aid=pk.split(':')[0],ss=Object.keys(S.inv).filter(k=>S.inv[k]>0&&ITEMS[k]&&ITEMS[k].seed);
    return `<h2>무엇을 심을까 ${X_}</h2><p class="story">${aid==='green'?'온실은 사계절 따뜻하다. 무엇이든 자란다.':`지금은 ${FSEA()}. 제철 씨앗만 밖에서 자란다.`}</p>`
      +(ss.length?ss.map(k=>{const c=CROPS[ITEMS[k].seed],ok=inSeason(ITEMS[k].seed,aid);return `<div class="row"><div><div class="tn">${ITEMS[k].n} <small>×${S.inv[k]}</small>${ok?'':' <span class="pref dis">제철 아님</span>'}</div><div class="tw">${ITEMS[k].d}</div></div><button class="pbtn" data-fplant="${ITEMS[k].seed}" ${ok?'':'disabled'}>심는다</button></div>`;}).join('')
        :'<p class="story">씨앗이 없다. 모리스 잡화점(채소), 꽃집(꽃·허브), 일요 시장(과일·찻잎)에서 살 수 있다.</p>')
      +`<div class="pfoot"><span>고른 씨앗은 다 쓸 때까지 빈 밭에 이어서 심어요.</span></div>`;}
  if(arg==='ship'){const ks=Object.keys(S.inv).filter(k=>S.inv[k]>0&&ITEMS[k]&&(ITEMS[k].sell||ITEMS[k].crop||ITEMS[k].dish)&&ITEMS[k].p>0),tot=Object.entries(f.ship).reduce((a,[k,n])=>a+ITEMS[k].p*n,0);
    return `<h2>출하 상자 ${X_}</h2><p class="story">넣어 둔 물건은 내일 아침 브란트가 주방 장부로 계산해 준다.${tot?` <b>오늘 넣은 것: ${money(tot)}</b>`:''}</p>`
      +(ks.length?ks.map(k=>`<div class="row"><div><div class="tn">${ITEMS[k].n} <small>×${S.inv[k]}</small></div><div class="tw">개당 ${money(ITEMS[k].p)}</div></div><span class="bs"><button class="pbtn" data-fship="${k}:1">1개</button><button class="pbtn" data-fship="${k}:all">모두</button></span></div>`).join(''):'<p class="story">넣을 게 없다. 작물·요리·물고기·채집물을 넣을 수 있다.</p>');}
  if(arg==='cook'){const ks=Object.keys(DISH);
    const have=(k,n)=>k==='egg'?(S.inv.egg||0)+(S.inv.egg_big||0)*2>=n:(S.inv[k]||0)>=n;
    return `<h2>주방 화덕 · 요리 ${X_}</h2><p class="story">브란트가 화덕 한쪽을 내줬다. «재료 아끼지 말고, 불 조심.»</p>`
      +ks.map(k=>{const d=DISH[k],kn=recKnown(k);if(!kn)return `<div class="row"><div><div class="tn">??? </div><div class="tw">${d.hen&&!f.hens?'닭이 생기면 배울 수 있다':d.br?'브란트와 더 친해지면 (♥'+d.br+')':d.jo?'호숫가의 어부에게 배울 수 있다':`텃밭 솜씨 Lv.${d.lv}`}</div></div><span></span></div>`;
        const ok=Object.entries(d.ing).every(([i,n])=>have(i,n));
        return `<div class="row"><div><div class="tn">${d.n} <small>체력 +${d.food} · ${money(d.p)}</small>${f.cooked[k]?` <small>(만든 횟수 ${f.cooked[k]})</small>`:''}</div><div class="tw">${Object.entries(d.ing).map(([i,n])=>`<span style="color:${have(i,n)?'inherit':'#b0484a'}">${ITEMS[i].n} ${n}</span>`).join(' · ')}</div></div><button class="pbtn" data-fcook="${k}" ${ok?'':'disabled'}>만든다</button></div>`;}).join('');}
  return '';}
function farmBagExtra(){if(!S.farm||!S.farm.intro)return '';const f=F(),ss=Object.keys(S.inv).filter(k=>S.inv[k]>0&&ITEMS[k]&&ITEMS[k].seed);if(!ss.length)return '';
  return `<div class="sub">심을 씨앗 고르기</div>`+ss.map(k=>`<div class="row"><div><div class="tn">${ITEMS[k].n} <small>×${S.inv[k]}</small>${f.sel===ITEMS[k].seed?' <span class="pref like">고름</span>':''}</div></div><button class="pbtn" data-fsel="${ITEMS[k].seed}">${f.sel===ITEMS[k].seed?'고름':'고른다'}</button></div>`).join('');}
function farmBind(p,kind,arg){const f=S.farm;if(!f)return;
  p.querySelectorAll('[data-fsel]').forEach(b=>b.onclick=()=>{f.sel=b.dataset.fsel;toast(`${CROPS[f.sel].n} 씨앗을 손에 쥐었다`);togglePanel('bag',null,true);});
  p.querySelectorAll('[data-fplant]').forEach(b=>b.onclick=()=>{const c=b.dataset.fplant;p.hidden=true;if(f.pend&&!f.pl[f.pend])plant(f.pend,c);});
  p.querySelectorAll('[data-fship]').forEach(b=>b.onclick=()=>{const [k,m]=b.dataset.fship.split(':'),n=m==='all'?S.inv[k]:1;if(!S.inv[k])return;S.inv[k]-=n;f.ship[k]=(f.ship[k]||0)+n;
    toast(`${ITEMS[k].n} ${n}개 <i>상자에 넣음</i>`);save();togglePanel('farm','ship',true);});
  p.querySelectorAll('[data-fcook]').forEach(b=>b.onclick=()=>cook(b.dataset.fcook));}
function cook(k){const d=DISH[k],f=F();
  for(const [i,n] of Object.entries(d.ing)){if(i==='egg'){let need=n;const a=Math.min(S.inv.egg||0,need);S.inv.egg=(S.inv.egg||0)-a;need-=a;while(need>0&&S.inv.egg_big>0){S.inv.egg_big--;need-=2;}}else S.inv[i]-=n;}
  closePanel();S.min+=25;S.hp=Math.max(0,S.hp-2);hud();
  mgTiming('요리 · '+d.n,['냄비가 보글보글 끓는다. 불을 줄일 때를 잘 봐야 한다.','반죽이 부풀어 오른다. 화덕에서 꺼낼 때를 잘 봐야 한다.','팬이 달궈졌다. 지금이다 싶을 때 뒤집자.'][Object.keys(DISH).indexOf(k)%3],sc=>{
    const n=sc>=.85?2:1;S.inv['d_'+k]=(S.inv['d_'+k]||0)+n;f.cooked[k]=(f.cooked[k]||0)+n;f.rec[k]=1;farmXp(2);
    diaryAdd('note',`주방 화덕에서 ${jo(d.n,'을','를')} 만들었다.`);
    startDialog(null,[R_(sc>=.85?`완벽하다! ${d.n}${jo(d.n,'이','가').slice(-1)} 넉넉하게 나왔다. (${n}개)`:sc>=.5?`${d.n} 완성. 모양은 조금 삐뚤지만 맛있다.`:`살짝 탔다…… 그래도 먹을 만한 ${d.n}.`),
      ...(f.cooked[k]===n&&!f.brSeen?[G('브란트','……흠. 냄새는 합격. 다음엔 불 좀 일찍 줄여.')]:[])],()=>{f.brSeen=1;save();hud();});});}

/* 닭 */
const HEN_N=['보리','콩떡','참깨','누룽지'],HENS=[];
function hensSync(){const f=S.farm;const n=f?f.hens:0;while(HENS.length<n){const i=HENS.length;HENS.push({x:(48+i)*T+4,y:48*T+8,tx:0,ty:0,dir:i%2?2:3,mode:'idle',t0:0,nt:Math.random()*2,anim:0,i});}HENS.length=n;}
function hensTick(dt){if(S.area!=='castle')return;hensSync();const now=performance.now();
  for(const h of HENS){h.nt-=dt;h.anim+=dt;
    if(h.mode==='hop'&&now-h.t0>500)h.mode='idle';
    if(h.mode==='walk'){const dx=h.tx-h.x,dy=h.ty-h.y,d=Math.hypot(dx,dy);if(d<1){h.mode=Math.random()<.6?'peck':'idle';h.nt=1+Math.random()*2.5;}else{const st=Math.min(d,14*dt);h.x+=dx/d*st;h.y+=dy/d*st;if(Math.abs(dx)>.3)h.dir=dx<0?2:3;}}
    else if(h.nt<=0){h.mode='walk';let tries=0;do{h.tx=(47+Math.random()*6)*T;h.ty=(47.3+Math.random()*5.5)*T;tries++;}while(tries<8&&Math.hypot(h.tx-(51*T),h.ty-(48.5*T))<22);}}}
const HENCV={};
function henCv(col,fr){const key=col+fr;if(HENCV[key])return HENCV[key];const W=14,H=14,Gd=Array.from({length:H},()=>Array(W).fill(null));
  const p=(x,y,c)=>{if(x>=0&&x<W&&y>=0&&y<H)Gd[y][x]=c;};const [b1,b2,b3]=col==='w'?['#f6f2e8','#d8d0c0','#fffdf6']:['#d0904c','#9a5e2e','#e8b070'];
  const pk=fr==='peck',hy=pk?3:0;
  for(let y=0;y<H;y++)for(let x=0;x<W;x++){const ex=(x-6)/4.2,ey=(y-8.5)/3.2;if(ex*ex+ey*ey<=1)p(x,y,ey>.45||ex<-.7?b2:ey<-.4&&ex>-.2?b3:b1);}
  p(2,5,b2);p(2,6,b1);p(3,5,b1);p(3,6,b1);p(2,7,b2);p(1,6,b2);  // 꼬리
  for(const [x,y] of [[9,4],[10,4],[9,5],[10,5],[11,5],[9,6],[10,6],[11,6],[10,7]])p(x,y+hy,b1);p(11,4+hy,b3);
  p(10,3+hy,'#e03a3a');p(11,3+hy,'#e03a3a');p(10,2+hy,'#e03a3a');p(11,7+hy,'#e03a3a');   // 볏 · 육수
  p(12,5+hy,'#f0a030');p(12,6+hy,'#d07a20');p(10,5+hy,'#2a1e1e');
  p(5,11,b2);p(6,11,b2);p(7,11,b2);
  const lg='#e8902a';if(fr==='w1'){p(5,12,lg);p(5,13,lg);p(8,12,lg);p(9,13,lg);}else if(fr==='w2'){p(5,12,lg);p(4,13,lg);p(8,12,lg);p(8,13,lg);}else{p(5,12,lg);p(5,13,lg);p(8,12,lg);p(8,13,lg);}
  return HENCV[key]=rasterOL(Gd,W,H);}
function rasterOL(Gd,W,H,ol){const c=document.createElement('canvas');c.width=W+2;c.height=H+2;const g=c.getContext('2d');
  for(let y=0;y<H;y++)for(let x=0;x<W;x++){if(Gd[y][x])continue;let nb=null;for(const [a,b] of [[0,1],[1,0],[0,-1],[-1,0]]){const r=Gd[y+b];if(r&&r[x+a]&&!r[x+a].endsWith('!')){nb=r[x+a];break;}}if(nb){g.fillStyle=ol||darkC(nb);g.fillRect(x+1,y+1,1,1);}}
  for(let y=0;y<H;y++)for(let x=0;x<W;x++)if(Gd[y][x]){g.fillStyle=Gd[y][x].replace('!','');g.fillRect(x+1,y+1,1,1);}
  // 바깥 테두리 칸
  return c;}
function darkC(h){h=h.replace('!','');const n=parseInt(h.slice(1),16),r=n>>16,gg=n>>8&255,b=n&255;const k=.38;return `rgb(${Math.round(r*k+18)},${Math.round(gg*k+10)},${Math.round(b*k+14)})`;}

/* ── 작물 도트 (스듀풍 · 외곽선 자동) ── */
const CROPCV={};
function cropCv(id,st,v){const key=id+st+v;if(CROPCV[key])return CROPCV[key];
  const W=16,H=30,Gd=Array.from({length:H},()=>Array(W).fill(null)),c=CROPS[id]||{c:['#888','#444'],t:'root'},B=26;
  const p=(x,y,col)=>{x=Math.round(x);y=Math.round(y);if(x>=0&&x<W&&y>=0&&y<H)Gd[y][x]=col;};
  const r=(x,y,w,h,col)=>{for(let j=0;j<h;j++)for(let i=0;i<w;i++)p(x+i,y+j,col);};
  const el=(cx,cy,rx,ry,c1,c2,c3)=>{for(let y=Math.floor(cy-ry);y<=Math.ceil(cy+ry);y++)for(let x=Math.floor(cx-rx);x<=Math.ceil(cx+rx);x++){const ex=(x-cx)/rx,ey=(y-cy)/ry;if(ex*ex+ey*ey<=1.05)p(x,y,(ex+ey)<-.7&&c3?c3:(ex*.4+ey)>.45&&c2?c2:c1);}};
  const L1='#3e7a2e',L2='#5e9e3a',L3='#8cc85a',L4='#b6e07a',ST='#4a7a2a',WD='#8a5a32',WD2='#5e3a20';
  const leaf=(x,y,dx,dy,len,col,hi)=>{for(let i=0;i<len;i++){p(x+dx*i,y+dy*i,col);if(i>0&&i<len-1&&hi)p(x+dx*i+(dy?1:0),y+dy*i+(dx?-1:0),hi);}};
  const R=(Math.sin(v*12.9898)*43758.5453)%1,rv=k=>Math.abs((Math.sin((v+1)*(k+3)*78.233)*43758.5453)%1);
  if(st===-1){const D1='#8a6a3a',D2='#6a4a28',D3='#b08a52';for(let k=0;k<6;k++)p(8,B-k,D2);for(let k=0;k<4;k++)p(9+k,B-6+k*.7,k<2?D1:D3);for(let k=0;k<3;k++)p(7-k,B-4+k,D1);p(5,B-1,D3);p(13,B-3,D3);p(10,B-1,D1);}
  else if(st===0){r(6,B,5,1,'#6a4428');p(6,B-1,'#e0caa0');p(8,B-1,'#d0b888');p(10,B-1,'#e0caa0');}
  else if(st===1){p(8,B,ST);p(8,B-1,ST);p(8,B-2,L2);leaf(7,B-3,-1,0,2,L3);leaf(9,B-3,1,-1,2,L2);p(6,B-2,L2);}
  else{const t=c.t,big=st>=3,ripe=st===4;
    if(t==='root'){const n=big?5:3;for(let i=0;i<n;i++){const a=-1.25+i*(2.5/(n-1)),len=big?8:5;for(let k=0;k<len;k++){const x=8+Math.sin(a)*k*.9,y=B-1-Math.cos(a)*k;p(x,y,k>len-3?(id==='beet'?'#6a8a3a':L3):id==='beet'&&k<2?'#a02a4a':L2);
          if(id==='carrot'&&k>1&&k%2==0){p(x-1,y,L3);p(x+1,y,L3);}if(id!=='carrot'&&k>2&&k<len-1){p(x+(i<n/2?-1:1),y,L1);}}}
      if(id==='potato'&&big){el(8,B-6,4.5,3.5,L2,L1,L3);if(ripe){p(6,B-9,'#fffaf0');p(10,B-8,'#fffaf0');p(8,B-10,'#fffaf0');p(6,B-9+1,'#f0d050');}}
      if(ripe){el(8,B+.5,id==='beet'?3:2.6,1.6,c.c[0],c.c[1],id==='carrot'?'#ffb060':id==='beet'?'#e0507a':'#ecc890');}}
    else if(t==='leafy'||t==='kale'){if(t==='leafy'){el(8,B-2,big?6:4,big?3.2:2.4,L2,L1,L3);if(big){el(8,B-3,4,3,ripe?c.c[0]:L3,ripe?c.c[1]:L2,ripe?'#e0f4b0':L4);if(ripe){p(8,B-4,'#8ab860');p(7,B-3,'#8ab860');p(9,B-3,'#8ab860');}}}
      else{const n=big?5:3;for(let i=0;i<n;i++){const a=-1.2+i*(2.4/(n-1)),len=big?7.5:4.5,cx_=8+Math.sin(a)*len*.55,cy_=B-1-Math.cos(a)*len*.6;
          el(cx_,cy_,big?2.2:1.6,len*.45,'#4a8a6a','#2e5a48','#7ab898');for(let k=1;k<len;k++)p(8+Math.sin(a)*k*.55,B-1-Math.cos(a)*k*.6,'#2e5a48');
          if(big){p(cx_+(i<n/2?-2:2),cy_-1,'#9ad0b4');p(cx_+(i<n/2?-2:2),cy_+2,'#9ad0b4');}}
        if(ripe){p(8,B-6,'#8a5aa0');p(6,B-4,'#8a5aa0');p(10,B-4,'#8a5aa0');}
        if(ripe&&FSEA()==='겨울'){p(5,B-7,'#ffffff');p(11,B-6,'#ffffff');p(8,B-9,'#e8f4ff');}}}
    else if(t==='berry'){el(8,B-2,big?5.5:3.5,big?3.2:2.2,L2,L1,L3);if(big){for(const [x,y] of [[5,B-3],[11,B-2],[8,B-5]])p(x,y,'#fffaf0');}
      if(ripe)for(const [x,y] of [[5,B-1],[10,B-3],[7,B-3],[12,B-1]]){r(x,y,2,2,c.c[0]);p(x,y+1,c.c[1]);p(x+1,y,'#fff0a0');p(x,y-1,L3);}}
    else if(t==='stake'||t==='pea'){const top=big?B-17:B-10;
      if(t==='stake'){r(8,top,1,B-top+1,WD);p(8,top,WD2);}else{for(let k=0;k<=B-top;k++){p(5+k*.18,B-k,WD);p(11-k*.18,B-k,WD);}}
      for(let y=B-1;y>top+1;y-=3){const s=(y%2)?1:-1;el(8+s*2.5,y,2.6,1.6,L2,L1,L3);if(big)el(8-s*2,y-1.5,2,1.3,L2,L1,L3);}
      if(t==='stake'&&big)for(const [x,y] of [[5,B-6],[10,B-10],[6,B-14],[11,B-4]]){el(x+.5,y+.5,1.6,1.6,ripe?c.c[0]:'#8ac850',ripe?c.c[1]:'#5a9a3a',ripe?'#ff9a80':'#c0e890');}
      if(t==='pea'&&big){for(const [x,y] of [[5,B-5],[11,B-9],[6,B-12],[10,B-3]]){if(ripe){r(x,y,1,4,c.c[0]);p(x,y,c.c[1]);p(x,y+3,c.c[1]);}else p(x,y,'#fffaf0');}}}
    else if(t==='bush'||t==='herb'||t==='tea'){const rx=big?6:4,ry=big?(t==='herb'?5:5.5):3.5,cy=B-ry+.5;
      const g1=t==='herb'?'#6a9a80':t==='tea'?'#3a7a32':L2,g0=t==='herb'?'#3e6a56':t==='tea'?'#24521e':L1,g2=t==='herb'?'#9acab0':t==='tea'?'#5ea248':L3;
      if(t==='herb'){const h1='#6a9a62',h0='#3e6a40',h2='#a8d49a';el(8,cy+.5,rx-.5,ry-.5,h1,h0,h2);
          for(let i=0;i<(big?14:6);i++){const x=Math.round(8+(rv(i)-.5)*(rx-1)*1.7),y=Math.round(cy+(rv(i+11)-.5)*(ry-1)*1.6);p(x,y,h2);p(x+1,y-1,h1);p(x-1,y+1,h0);}
          p(6,Math.round(cy-ry),h2);p(10,Math.round(cy-ry)+1,h2);
          if(ripe)for(let i=0;i<6;i++){const x=Math.round(8+(rv(i+3)-.5)*rx*1.5),y=Math.round(cy-ry*.5+(rv(i+8)-.5)*ry);p(x,y,c.c[1]);}}
      else el(8,cy,rx,ry,g1,g0,g2);
      if(t==='tea'&&ripe)for(let i=0;i<7;i++){const x=8+(rv(i)-.5)*rx*1.6,y=cy-ry*.3+(rv(i+5)-.5)*ry*1.2;p(x,y,c.c[1]);p(x,y-1,'#d8f0a0');}
            if(t==='bush'&&ripe)for(let i=0;i<5;i++){const x=Math.round(8+(rv(i)-.5)*rx*1.4),y=Math.round(cy+(rv(i+4)-.5)*ry*1.2);p(x,y,c.c[0]);p(x+1,y,c.c[1]);p(x,y+1,c.c[1]);p(x+1,y+1,c.c[0]);p(x,y,'#a8b8ff');}}
    else if(t==='corn'||t==='sunf'||t==='wheat'){
      if(t==='wheat'){const xs=big?[3,6,8,10,13]:[6,8,10],hh=big?14:7;xs.forEach((x0,i)=>{const h=hh-[0,3,1,2,4][i%5],lean=(x0-8)*.12;
          for(let k=0;k<h;k++){const x=x0+lean*k;p(x,B-k,ripe?(k<h-4?'#c09a48':c.c[0]):(k<h-4?L2:L3));}
          if(big){for(let k=h-4;k<h;k+=1){const x=x0+lean*k;p(x+(k%2?1:-1),B-k,ripe?c.c[1]:L1);}p(x0+lean*h,B-h,ripe?'#fff0b0':L4);}
          if(!ripe||!big){p(x0+1,B-3,L1);}});}
      else{const h=big?21:11;r(7,B-h,2,h+1,ST);p(8,B-h,L3);for(let y=B-3;y>B-h+2;y-=4){const s=(y>>2)%2?1:-1;leaf(8+s,y,s,-1,big?5:3,L2,L3);leaf(8+s,y+1,s,0,big?3:2,L1);}
        if(t==='corn'&&big){if(ripe){r(9,B-14,3,6,c.c[0]);p(9,B-14,'#fff0a0');p(11,B-9,c.c[1]);r(9,B-9,3,1,L2);p(12,B-12,L2);p(12,B-8,L2);}for(let i=0;i<3;i++)p(7+i,B-h-1-(i%2),ripe?'#d8b060':L4);}
        if(t==='sunf'&&big){if(ripe){el(8,B-h-1,4.5,4,c.c[0],'#e0a020','#fff080');el(8,B-h-1,2,2,c.c[1],'#4a2a10','#8a5a2a');}else{el(8,B-h,2,2,L2,L1,L3);}}}}
    else if(t==='flower'){leaf(6,B,-1,-1,4,L2,L3);leaf(10,B,1,-1,4,L2,L3);const h=big?9:5;r(8,B-h,1,h,ST);
      if(big){if(ripe){r(6,B-h-4,5,4,c.c[0]);p(6,B-h-5,c.c[0]);p(8,B-h-5,c.c[0]);p(10,B-h-5,c.c[0]);p(7,B-h-3,c.c[1]);p(9,B-h-3,c.c[1]);p(7,B-h-4,'#ffb0c0');}else el(8,B-h-1,1.5,2,L3,L2,L4);}}
    else if(t==='gourd'){for(const [x,y,s] of [[3,B-1,-1],[13,B-2,1],[8,B-3,0]])el(x,y,big?3:2.4,big?2:1.6,L2,L1,L3);
      if(big){const fr=ripe?c.c:['#9ac860','#5a8a3a'],sz=ripe?1:.6;el(8,B-1.5-2*sz,5*sz+1,3.5*sz+.6,fr[0],fr[1],id==='pumpkin'?'#ffb060':'#e0f0a0');
        if(id==='pumpkin'&&ripe){for(const x of [6,10]){for(let y=B-6;y<=B;y++)if(Gd[y][x])p(x,y,fr[1]);}r(8,B-8,1,2,'#6a4a20');}
        if(id==='melon'&&ripe){for(const x of [5,8,11])for(let y=B-6;y<=B;y++)if(Gd[y][x]&&y%2)p(x,y,'#5a8a3a');r(8,B-8,1,1,'#6a4a20');}}}
    else if(t==='trellis'){r(3,B-17,1,18,WD);r(12,B-17,1,18,WD);r(3,B-16,10,1,WD);r(3,B-10,10,1,WD2);p(3,B-17,WD2);p(12,B-17,WD2);
      for(const [x,y] of big?[[5,B-15],[9,B-14],[6,B-9],[10,B-8],[7,B-3]]:[[7,B-3],[8,B-7]])el(x,y,2.4,1.6,L2,L1,L3);
      if(ripe)for(const [x,y] of [[5,B-13],[10,B-12],[7,B-7]]){r(x,y,3,1,c.c[0]);r(x,y+1,3,1,c.c[1]);p(x+1,y+2,c.c[0]);p(x+1,y,'#c08ae0');}}
  }
  if(v%2&&st>0){for(let y=0;y<H;y++)Gd[y].reverse();}
  return CROPCV[key]=rasterOL(Gd,W,H);}

/* 흙 · 출하 상자 · 닭장 그리기 */
const SOILCV={};
function soilCv(kind){if(SOILCV[kind])return SOILCV[kind];const c=document.createElement('canvas');c.width=16;c.height=16;const g=c.getContext('2d');
  const [b0,b1,b2,b3]=kind==='wet'?['#4a3020','#5e3c28','#3a2418','#6a4630']:kind==='ice'?['#a49488','#b8aca0','#8a7a6e','#d8d4d0']:['#7a4e30','#93613c','#5e3a22','#a8744a'];
  g.fillStyle=b1;g.fillRect(0,0,16,16);g.fillStyle=b3;g.fillRect(1,1,14,1);g.fillRect(1,1,1,13);g.fillStyle=b2;g.fillRect(1,14,14,1);g.fillRect(14,2,1,13);
  for(const [x,y] of [[4,4],[10,3],[7,8],[12,10],[3,11],[9,12],[6,5],[11,7]]){g.fillStyle=b2;g.fillRect(x,y,2,1);g.fillStyle=b3;g.fillRect(x,y-1,1,1);}
  if(kind==='ice'){g.fillStyle='#f4f6fa';for(const [x,y] of [[3,3],[11,5],[6,10],[12,12],[8,2]])g.fillRect(x,y,2,1);}
  g.fillStyle=b0;g.fillRect(0,15,16,1);g.fillRect(15,0,1,16);return SOILCV[kind]=c;}
let BINCV=null,COOPCV=null;
function binCv(){if(BINCV)return BINCV;const c=document.createElement('canvas');c.width=18;c.height=22;const g=c.getContext('2d'),R=(x,y,w,h,col)=>{g.fillStyle=col;g.fillRect(x,y,w,h);};
  R(1,7,16,14,'#2a1a10');R(2,8,14,12,'#9a6438');for(let y=10;y<20;y+=3)R(2,y,14,1,'#7a4a28');R(2,8,14,1,'#c08a52');R(2,12,1,8,'#b07a46');
  R(0,3,18,6,'#2a1a10');R(1,4,16,4,'#b07240');R(1,4,16,1,'#d89a5e');R(1,7,16,1,'#7a4a28');R(3,9,2,11,'#4a4a52');R(13,9,2,11,'#4a4a52');R(3,9,1,11,'#7a7a86');R(13,9,1,11,'#7a7a86');
  R(7,1,4,3,'#2a1a10');R(8,2,2,2,'#e0c070');R(1,21,16,1,'rgba(20,10,10,.3)');return BINCV=c;}
function coopCv(){if(COOPCV)return COOPCV;const c=document.createElement('canvas');c.width=34;c.height=44;const g=c.getContext('2d'),R=(x,y,w,h,col)=>{g.fillStyle=col;g.fillRect(x,y,w,h);};
  R(2,41,30,3,'rgba(20,10,10,.25)');
  R(3,18,28,24,'#2a1a10');R(4,19,26,22,'#b07a46');for(let x=6;x<30;x+=4)R(x,19,1,22,'#8a5a32');R(4,19,26,1,'#d09a5e');
  for(let i=0;i<14;i++){R(16-i,4+i,2+i*2,1,'#2a1a10');}for(let i=1;i<14;i++){R(17-i,4+i,i*2,1,i%3===0?'#7a2a22':'#a83a2e');}R(1,17,32,2,'#2a1a10');R(2,17,30,1,'#c85040');R(16,3,2,2,'#2a1a10');
  R(13,30,8,11,'#2a1a10');R(14,31,6,10,'#3a2418');R(14,31,6,1,'#5a3a24');R(12,40,10,3,'#6a4428');R(12,40,10,1,'#9a6a40');
  R(22,23,6,5,'#2a1a10');R(23,24,4,3,'#f0d890');R(25,24,1,3,'#2a1a10');R(6,24,5,4,'#2a1a10');R(7,25,3,2,'#f0d890');
  for(const [x,y] of [[5,41],[9,42],[24,41],[28,42],[20,42]]){R(x,y,3,1,'#e8d070');R(x+1,y-1,1,1,'#f4e090');}
  return COOPCV=c;}
let TROCV=null;function troughCv(fed){const c=document.createElement('canvas');c.width=16;c.height=12;const g=c.getContext('2d'),R=(x,y,w,h,col)=>{g.fillStyle=col;g.fillRect(x,y,w,h);};
  R(0,3,16,8,'#2a1a10');R(1,4,14,6,'#9a6438');R(2,4,12,3,fed?'#e0c060':'#5a3a22');if(fed){R(3,4,2,1,'#f4e090');R(9,5,2,1,'#c8a040');}R(1,9,14,1,'#7a4a28');R(1,11,14,1,'rgba(20,10,10,.3)');return c;}
const EGGCV={};function eggCv(big,br){const k=big+'_'+br;if(EGGCV[k])return EGGCV[k];const W=big?7:6,H=big?8:7,Gd=Array.from({length:H},()=>Array(W).fill(null)),c1=br?'#e8c49a':'#fbf6ea',c2=br?'#c89a6a':'#ddd4c4';
  for(let y=0;y<H;y++)for(let x=0;x<W;x++){const ex=(x-(W-1)/2)/((W-1)/2+.3),ey=(y-H*.56)/(H*.5);if(ex*ex*(y<H*.5?1.35:1)+ey*ey<=1)Gd[y][x]=(ex+ey)>.5?c2:c1;}Gd[2][Math.floor(W/2)-1]='#ffffff';
  const c=rasterOL(Gd,W,H,'#3a2a24'),g=c.getContext('2d');g.fillStyle='rgba(30,15,20,.25)';g.fillRect(1,H+1,W,1);return EGGCV[k]=c;}
const FFX=[];
function farmGround(cx,cy,t){if(!S.farm&&S.day<3)return;const pls=plotsOf(S.area);if(!pls.length&&S.area!=='castle')return;const f=S.farm,ss=FSEA();
  for(const [x,y] of pls){const sx=x*T-cx,sy=y*T-cy;if(sx<-16||sy<-16||sx>VW||sy>VH)continue;const p=f&&f.pl[PK(S.area,x,y)];
    if(typeof hoeDraw==='function')hoeDraw(x,y,sx,sy,p,ss);else ctx.drawImage(soilCv(p&&p.wd===S.day&&!p.dead?'wet':S.area==='castle'&&ss==='겨울'?'ice':'dry'),sx,sy);
    if(S.area==='green'){ctx.fillStyle='#6a4428';const n=(a,b)=>isPlot('green',x+a,y+b);if(!n(0,-1))ctx.fillRect(sx,sy,16,2);if(!n(0,1)){ctx.fillRect(sx,sy+14,16,2);ctx.fillStyle='#3a2418';ctx.fillRect(sx,sy+15,16,1);ctx.fillStyle='#6a4428';}if(!n(-1,0))ctx.fillRect(sx,sy,2,16);if(!n(1,0))ctx.fillRect(sx+14,sy,2,16);
      ctx.fillStyle='#9a6a40';if(!n(0,-1))ctx.fillRect(sx,sy,16,1);}}
  if(S.area==='castle'&&f&&f.eggs)for(const [x,y,big,i] of f.eggs){const sx=x*T+5+(i*5)%7-cx,sy=y*T+8+(i*3)%5-cy;ctx.drawImage(eggCv(big,i%2),sx-2,sy-2);}
}
function farmEnts(ents,cx,cy,t){const now=performance.now(),f=S.farm;
  if(f){for(const [x,y] of plotsOf(S.area)){const p=f.pl[PK(S.area,x,y)];if(!p)continue;const sx=x*T-1,sy=y*T-15;if(sx-cx<-18||sy-cy<-32||sx-cx>VW||sy-cy>VH)continue;
      const st=stageOf(p),cv=cropCv(p.c,st,(x*7+y*3)%4);ents.push({y:y*T+11,obj:{c:cv,px:sx,py:sy}});
      if(st===4&&Math.floor(t/500+x*1.7+y)%7===0)ents.push({y:y*T+12,obj:{c:SPARK,px:x*T+11+(x%2)*3,py:y*T-2}});}}
  if(S.area==='castle'&&(f||S.day>=3)){ents.push({y:BIN.y*T+15,obj:{c:binCv(),px:BIN.x*T-1,py:BIN.y*T-6}});
    if(f&&f.hens){ents.push({y:(COOP.y+2)*T-1,obj:{c:coopCv(),px:COOP.x*T-1,py:COOP.y*T-12}});ents.push({y:TROUGH.y*T+14,obj:{c:troughCv(f.fed===S.day),px:TROUGH.x*T,py:TROUGH.y*T+4}});
      for(const h of HENS){const fr=h.mode==='walk'?(Math.floor(h.anim*8)%2?'w1':'w2'):h.mode==='peck'&&Math.floor(h.anim*2.2)%3===0?'peck':'s';let cv=henCv(h.i%2?'b':'w',fr);
        if(h.dir===2){const k='f'+h.i%2+fr;cv=HENCV[k]||(HENCV[k]=flipCv(cv));}
        ents.push({y:h.y,obj:{c:cv,px:Math.round(h.x-8),py:Math.round(h.y-15-(h.mode==='hop'?Math.round(Math.sin(Math.min(1,(now-h.t0)/500)*Math.PI)*4):0))}});}}}}
const SPARK=(()=>{const c=document.createElement('canvas');c.width=5;c.height=5;const g=c.getContext('2d');g.fillStyle='#fffbe0';g.fillRect(2,0,1,5);g.fillRect(0,2,5,1);g.fillStyle='#ffffff';g.fillRect(2,2,1,1);return c;})();
function flipCv(cv){const c=document.createElement('canvas');c.width=cv.width;c.height=cv.height;const g=c.getContext('2d');g.translate(cv.width,0);g.scale(-1,1);g.drawImage(cv,0,0);return c;}
function farmFx(cx,cy){const now=performance.now();
  for(let i=FFX.length-1;i>=0;i--){const e=FFX[i],k=(now-e.t)/(e.k==='pop'?750:500);if(k<0)continue;if(k>1){FFX.splice(i,1);continue;}const x=Math.round(e.x-cx),y=Math.round(e.y-cy);
    if(e.k==='water'){for(let j=0;j<6;j++){const a=j*1.05,rr=2+k*6;ctx.fillStyle=`rgba(150,200,240,${1-k})`;ctx.fillRect(Math.round(x+Math.cos(a)*rr),Math.round(y-2+Math.sin(a)*rr*.5-(1-k)*4),1,2);}
      ctx.fillStyle=`rgba(90,140,200,${.5*(1-k)})`;ctx.fillRect(x-5,y+1,10,2);}
    else if(e.k==='seed'||e.k==='feed'){for(let j=0;j<5;j++){ctx.fillStyle=e.k==='feed'?'#e8c860':'#e0caa0';ctx.fillRect(Math.round(x-4+j*2),Math.round(y-8+k*8+((j*7)%3)),1,1);}}
    else if(e.k==='pop'){const yy=y-10-Math.sin(k*Math.PI)*14,cv=e.crop?cropIcon(e.crop):null;
      if(cv)ctx.drawImage(cv,x-6,Math.round(yy)-6);else{ctx.drawImage(eggCv(e.it==='egg_big',0),x-4,Math.round(yy)-4);}}}
  // 물뿌리개 들기
  if(P.waterT&&now-P.waterT<600){const d=P.dir;drawCan(Q(P.x)-cx+(d===2?-6:6),Q(P.y)-cy-12+(d===0?3:0),d===2?2:3,S.inv.can2?'copper':'tin',now-P.waterT>120);}}
const ICV={};function cropIcon(id){if(ICV[id])return ICV[id];const c=CROPS[id],cv=document.createElement('canvas');cv.width=12;cv.height=12;const g=cv.getContext('2d');
  const col=c.t==='flower'?c.c[0]:c.t==='sunf'?c.c[0]:c.t==='herb'||c.t==='tea'?c.c[0]:c.c[0],dk=c.c[1];g.fillStyle='#2a1e1e';g.beginPath();g.arc(6,6.5,5,0,7);g.fill();g.fillStyle=col;g.beginPath();g.arc(6,6.5,4,0,7);g.fill();g.fillStyle=dk;g.fillRect(4,8,5,2);g.fillStyle='rgba(255,255,255,.7)';g.fillRect(4,4,2,2);g.fillStyle='#5e9e3a';g.fillRect(5,1,3,2);return ICV[id]=cv;}
function farmTargets(out){const f=S.farm;if(!f)return;if(!f.intro&&S.day>=3)out.push({area:'castle',px:46*T+8,py:24*T,label:'텃밭 (브란트의 부탁)'});
  if(f.intro){const ready=Object.entries(f.pl).some(([k,p])=>!p.dead&&stageOf(p)===4);if(ready)out.push({area:'castle',px:47*T+8,py:24*T,label:'수확할 작물'});}}
{const _xt=xTargets;xTargets=function(out){_xt(out);farmTargets(out);};}

/* ── 텃밭 장면 ── */
const fnm=(who)=>{const pub=!!S.f.public;return ({brant:pub?'에레나':'부집사',tim:pub?'누나':'형',edmund:pub?'에레나 님':'부집사님',demian:'부집사님',kairan:pub?'에레나':'에렌',roewen:'꼬마',marta:'꼬맹아',gren:pub?'아가씨':'부집사님'})[who]||'';};
function farmIntro(){const f=F(),ss=FSEA(),sd=ss==='봄'?'s_potato':ss==='여름'?'s_tomato':ss==='가을'?'s_carrot':'s_kale';
  const L=[['r','— 브란트의 텃밭 —'],['r','텃밭 울타리 앞에 브란트가 팔짱을 끼고 서 있었다. 발치에 찌그러진 물뿌리개가 굴러다녔다.'],
    ['x','brant','n',`왔냐, ${fnm('brant')}. 봐라, 이 꼴을.`],['r','밭 절반이 잡초였다. 나머지 절반은 물을 못 먹어 누렇게 늘어져 있었다.'],
    ['x','brant','a','주방 하나 굴리기도 바쁜데 밭까지 볼 손이 없어. 기사 놈들은 먹을 줄만 알지.'],['m','s','저, 저한테 맡기시려고요?'],
    ['x','brant','n','남부 출신이라며. 남부 애들은 흙 만지는 거 좋아하더라.'],['m','b','……어릴 때 정원사 할아버지 옆에서 흙장난한 게 전부인데요.'],
    ['x','brant','h','그럼 됐네. 흙장난이 농사야.'],['r','브란트가 물뿌리개를 툭 던졌다. 얼떨결에 받아 드니, 손잡이가 손에 꼭 맞았다.'],
    ['x','brant','n','씨는 모리스 영감네서 사. 물은 하루 한 번. 비 오는 날은 하늘이 대신 준다.'],
    ['x','brant','n',ss==='겨울'?'겨울엔 바깥 땅이 얼어. 동관 온실 화단을 써. 거긴 한겨울에도 따뜻하다.':'동관 온실 화단도 비었으니 써도 된다. 거긴 계절 안 탄다.'],
    ['x','brant','n','거둔 건 울타리 옆 출하 상자에 넣어 둬. 다음 날 아침에 주방 장부로 값 쳐 준다.'],
    ['x','brant','b','……그리고 주방 화덕 한쪽, 비워 놨다. 요리하고 싶으면 써.'],['m','h','브란트 아저씨……!'],['x','brant','a','아저씨 아니라고.'],
    ['r',`(물뿌리개와 ${ITEMS[sd].n} 5개를 받았다. 요리법: 감자 수프, 로즈마리 차)`]];
  playScene({title:'브란트의 텃밭',sub:'새로운 일상'},'brant',xl(L,'brant'),()=>{f.intro=S.day;S.inv.can=1;S.inv[sd]=(S.inv[sd]||0)+5;f.sel=sd.slice(2);addPtsQ('brant',20);
    diaryAdd('note','브란트에게서 텃밭을 맡았다. 물뿌리개가 생각보다 무겁다.');logEv('브란트의 텃밭',null);toast('텃밭 · 온실 농사 시작! <i>[확인]으로 심기·물 주기·수확</i>');hud();save();});}
function henIntro(){const f=F();const L=[['r','— 닭장에 온 손님 —'],['r','방목장 한쪽에 못 보던 작은 닭장이 서 있었다. 빨간 지붕 아래에서 «꼬꼬» 소리가 났다.'],
    ['g','그렌',`아, ${fnm('gren')}! 마침 잘 오셨어요. 마을 한스 할아버지가 암탉 세 마리를 보내 주셨거든요.`],['m','s','닭이요? 왜 저한테……'],
    ['g','그렌','브란트 아주머니가 그러시던데요. 텃밭 맡은 사람이 닭도 맡는 거라고.'],['r','하얀 암탉 한 마리가 에레나의 구두 끝을 콕콕 쪼았다.'],
    ['g','그렌','이름도 지어 주세요. 브란트 아주머니는 «국거리 1, 2, 3»이라고 부르시던데.'],['m','a','그건 절대 안 돼요!'],
    ['r','한참 고민한 끝에, 세 마리에게 이름을 붙여 주었다. «보리», «콩떡», «참깨».'],
    ['g','그렌','모이는 닭장 옆 여물통에 주시면 돼요. 잘 먹은 다음 날 아침엔 알을 낳아요. 쓰다듬어 주면 더 크고 좋은 알을 낳고요.'],
    ['r','(닭 세 마리가 생겼다. 요리법: 텃밭 오믈렛)']];
  playScene({title:'닭장에 온 손님',sub:'방목장'},null,xl(L,null),()=>{f.hens=3;f.henDay=S.day;f.fed=S.day;hensSync();diaryAdd('note','닭장에 암탉 세 마리가 왔다. 보리, 콩떡, 참깨.');toast('닭장이 생겼다 <i>모이 주기 · 달걀 줍기</i>');save();});}
const FEV=[
 {k:'f_brant_taste',loc:['kitchen'],cond:{},need:f=>Object.keys(f.got).length>=2,t:'첫 수확의 맛',L:()=>[['r','바구니를 들고 주방에 들어서자, 브란트가 칼질을 멈췄다.'],['x','brant','n','뭐야, 그거. 네가 키운 거?'],['m','b','네. 모양은 좀 못났는데……'],
   ['r','브란트가 하나를 집어 앞치마에 쓱 닦더니, 그대로 한 입 베어 물었다.'],['x','brant','n','…………'],['m','s','어, 어때요?'],['x','brant','h','물 줬네. 매일.'],['r','그게 브란트식 최고의 칭찬이라는 걸, 에레나는 나중에야 알았다.'],
   ['x','brant','n','남은 건 놓고 가. 오늘 저녁 수프에 넣는다. 기사 놈들한텐 네가 키웠단 말 안 할 거다. 고마운 줄 모르니까.']],pts:{brant:30}},
 {k:'f_tim_water',loc:['kgarden'],cond:{tim:true},t:'꼬마 정원사',L:()=>[['r','물뿌리개를 들고 텃밭에 나오니, 울타리 너머로 작은 머리 하나가 쏙 올라왔다.'],['x','tim','h',`${fnm('tim')}! 그거 저도 해 볼래요!`],['m','h','그럼 이쪽 줄은 팀이 맡아 줄래?'],
   ['r','팀은 물뿌리개를 두 손으로 끌어안고 비틀비틀 걸었다. 물은 밭보다 팀의 신발에 더 많이 쏟아졌다.'],['x','tim','s','으앗, 차가워!'],['m','h','하하, 괜찮아. 신발도 쑥쑥 자라겠다.'],
   ['x','tim','a','신발이 자라면 안 돼요! 그럼 발이 헐렁해지잖아요.'],['r','팀은 진지하게 신발을 털더니, 다시 물뿌리개를 들었다.'],['x','tim','h',`${fnm('tim')}, 내일도 와도 돼요? 이거 다 자라면 제가 제일 먼저 볼래요!`]],pts:{tim:30}},
 {k:'f_roewen_sack',loc:['kgarden'],cond:{},need:f=>(f.got.potato||0)+(f.got.corn||0)+(f.got.pumpkin||0)>=3,t:'자루를 든 기사단장',L:()=>[['r','수확한 작물을 자루에 담고 있는데, 등 뒤에서 자루가 쑥 들렸다.'],['x','roewen','h','이야, 이게 다 네가 키운 거야? 꼬마가 제법인데!'],['m','s','로웬 경! 그거 무거워요, 제가—'],
   ['x','roewen','h','무거우니까 내가 들지. 어디로? 주방?'],['r','로웬은 자루를 한쪽 어깨에 휙 걸치고 앞장섰다. 콧노래까지 흥얼거렸다.'],['x','roewen','n','근데 꼬마. 이걸로 파이 만들면, 첫 조각은 누구 거야?'],
   ['m','a','……그러려고 들어 주신 거죠?'],['x','roewen','h','들켰네! 하하! 그래도 반은 진심이야. 네가 키운 거 먹어 보고 싶거든.']],pts:{roewen:30}},
 {k:'f_kairan_evening',loc:['kgarden'],cond:{time:'evening',hearts:{kairan:3}},t:'해 질 녘 텃밭',L:()=>[['r','노을이 텃밭을 붉게 물들일 무렵, 울타리 너머에 낯익은 그림자가 섰다.'],['x','kairan','n','……이 시간까지 밭에 있었나.'],['m','s','전하! 그, 물만 주고 들어가려고 했는데요.'],
   ['r','카이런은 대답 없이 밭을 내려다보았다. 고랑이 반듯했다. 잡초 하나 없었다.'],['x','kairan','n','이 텃밭, 어머니가 처음 일구신 거다.'],['m','s','……선대 대공비 마마께서요?'],
   ['x','kairan','n','북부 땅은 아무것도 안 자란다고들 했지. 어머니는 그 말을 제일 싫어하셨다.'],['r','그의 목소리가 아주 조금 낮아졌다.'],['x','kairan','n',`……다시 푸르군. ${fnm('kairan')}, 손은 씻고 들어가라. 흙이 묻었다.`],
   ['r','돌아서는 그의 귀 끝이 노을 탓인지 붉었다. 에레나는 흙 묻은 손을 내려다보다가, 괜히 웃었다.']],pts:{kairan:40}},
 {k:'f_edmund_ledger',loc:['kgarden'],cond:{},need:f=>Object.values(f.got).reduce((a,b)=>a+b,0)>=15,t:'텃밭 장부',L:()=>[['r','에드먼드가 장부를 펼쳐 들고 텃밭으로 걸어왔다. 안경 너머 눈이 웃고 있었다.'],['x','edmund','h',`${fnm('edmund')}, 주방 식재료 지출이 지난달보다 줄었습니다. 이유를 짐작하시겠습니까?`],
   ['m','b','설마…… 텃밭 덕분이에요?'],['x','edmund','h','정확히는, 매일 아침 이곳에 오신 분 덕분이지요.'],['r','에드먼드는 장부 한 귀퉁이에 무언가를 적었다. «텃밭 — 담당: 부집사. 성실함.»'],
   ['x','edmund','n','이 늙은이가 젊었을 땐 이 밭에서 선대 대공비 마마의 장미를 키웠답니다. 그 시절이 떠오르는군요.'],['x','edmund','h','장부는 제가 맞추겠습니다. 부집사님은 흙만 맞추시지요.']],pts:{edmund:30}},
 {k:'f_scarecrow',loc:['kgarden'],cond:{},t:'기사단표 허수아비',L:()=>[['r','물을 주러 나와 보니, 텃밭 한가운데에 갑옷을 입은 허수아비가 서 있었다.'],['r','투구 아래로 지푸라기가 삐죽 나와 있었다. 손에는 목검까지 쥐고 있었다.'],
   ['g','칼','부집사님! 저희가 만들었어요. 까마귀 놈들이 씨를 파먹는다길래.'],['g','오토','단장님 낡은 갑옷이에요. 허락은…… 아마 받았을 거예요.'],['m','a','«아마»요……?'],
   ['r','그때 훈련장 쪽에서 로웬의 고함이 들려왔다. «내 갑옷 누가 가져갔어!!»'],['g','칼','……저희는 아무것도 못 봤습니다.'],['r','칼과 오토는 바람처럼 사라졌다. 허수아비만 의젓하게 남았다.'],
   ['m','h','(……그래도 까마귀는 확실히 안 오겠다.)']],pts:{roewen:10}},
 {k:'f_demian_rain',loc:['kgarden'],cond:{weather:'rain'},t:'빗속의 우산',L:()=>[['r','빗줄기가 굵어졌다. 막 싹이 튼 고랑이 흙탕물에 쓸려 갈까 봐, 에레나는 맨손으로 흙을 북돋웠다.'],['r','그때 머리 위로 빗소리가 뚝 그쳤다.'],
   ['x','demian','n','……부집사님. 감기 듭니다.'],['r','데미안이 커다란 기사단 우산을 받쳐 들고 서 있었다. 정작 자기 어깨는 다 젖고 있었다.'],['m','s','데미안 경, 어깨가……'],
   ['x','demian','n','……괜찮습니다. 싹이 먼저입니다.'],['r','데미안은 우산을 고랑 위로 기울였다. 둘은 한동안 말없이 비 오는 밭을 지켰다.'],['x','demian','n','……다 자라면, 하나만 주십시오. 부모님께 보내고 싶습니다.']],pts:{demian:40}},
 {k:'f_marta_flower',loc:['greenhouse'],cond:{},need:f=>(f.got.tulip||0)+(f.got.sunflower||0)>=1,t:'하녀 숙소의 꽃',L:()=>[['r','온실에서 꽃을 다듬고 있는데, 마르타가 빨래 바구니를 끼고 들어왔다.'],['x','marta','s','어머, 꼬맹아. 이거 네가 키웠어?'],['m','h','네. 하나 가져가실래요?'],
   ['x','marta','b','……하녀 숙소엔 꽃 한 송이 없거든. 애들이 좋아하겠다.'],['r','마르타는 꽃을 바구니 맨 위에 조심스럽게 올렸다. 빨래보다 훨씬 소중한 것처럼.'],['x','marta','h',`고맙다, ${fnm('marta')}. 대신 오늘 네 셔츠는 내가 다려 줄게. 풀 빳빳하게!`]],pts:{marta:30}},
 {k:'f_tea_bloom',loc:['greenhouse'],cond:{},need:f=>Object.values(f.pl).some(p=>p.c==='tea'&&stageOf(p)>=3),t:'남부의 찻잎',L:()=>[['r','온실 구석의 차나무에 연둣빛 새순이 돋았다. 손끝으로 비비자 익숙한 향이 났다.'],['m','b','(……고향 냄새다.)'],
   ['r','남부의 저택, 햇살 드는 테라스, 어머니가 따라 주던 찻잔. 잊은 줄 알았던 것들이 한꺼번에 밀려왔다.'],['r','눈가가 뜨거워져 고개를 숙였을 때, 온실 문이 열렸다.'],
   ...(S.partner==='kairan'||hearts('kairan')>=5?[['x','kairan','n','……무슨 일이지.'],['m','s','아, 아니에요! 그냥, 찻잎 냄새가 좋아서요.'],['r','카이런은 차나무와 그녀를 번갈아 보더니, 새순 하나를 조심스레 땄다.'],
     ['x','kairan','n','처음 딴 잎은 네가 우려라. 내 집무실에서.'],['x','kairan','b','……네 고향 차가 어떤 맛인지, 궁금하다.']]
    :[['x','edmund','h','남부 차나무로군요. 북부에서 새순을 보다니, 기적입니다.'],['x','edmund','n','고향이 그리우실 때는, 차를 우리십시오. 향은 기억을 데려오니까요.'],['m','b','……네. 그럴게요.']])],pts:{kairan:30,edmund:20}},
 {k:'f_lover_kairan',loc:['greenhouse'],cond:{lover:'kairan'},t:'둘만의 화단',L:()=>[['r','온실 화단에 모종을 옮겨 심고 있는데, 카이런이 소매를 걷어붙이고 옆에 쭈그려 앉았다.'],['m','s','전하? 옷 버리세요!'],['x','kairan','n','버리면 갈아입으면 된다. 이리 줘.'],
   ['r','대공의 손이 서툴게 흙을 눌렀다. 너무 세게 눌러서, 모종이 납작해졌다.'],['m','h','살살요, 살살. 아기 다루듯이요.'],['x','kairan','a','……아기를 다뤄 본 적이 없다.'],
   ['r','에레나가 그의 손등 위에 손을 겹쳐 흙을 다독였다. 카이런이 그대로 굳었다.'],['x','kairan','b','……이렇게, 말이지.'],['r','온실 유리창 너머로 오후 햇살이 쏟아졌다. 둘 다 흙투성이였고, 둘 다 한참 손을 떼지 않았다.']],pts:{kairan:50}},
 {k:'f_lover_roewen',loc:['kgarden'],cond:{lover:'roewen'},t:'흙투성이 기사단장',L:()=>[['r','로웬이 갑옷 대신 셔츠 바람으로 삽을 들고 나타났다.'],['x','roewen','h','오늘은 내가 일꾼이다! 어디 팔까, 꼬마?'],['m','h','저쪽 고랑이요. 돌이 많아서요.'],
   ['r','로웬은 신이 나서 땅을 팠다. 너무 신이 나서, 고랑이 아니라 연못을 만들 기세였다.'],['m','a','로웬 경! 그 정도면 우물이에요!'],['x','roewen','h','하하! 미안, 미안. 너랑 있으니까 힘 조절이 안 되네.'],
   ['r','그가 이마의 땀을 훔치자, 볼에 흙이 길게 묻었다. 에레나가 손수건을 꺼내 닦아 주었다.'],['x','roewen','b','……어, 어. 고마워.'],['r','방금까지 시끄럽던 기사단장이 갑자기 조용해졌다. 귀까지 새빨갰다.']],pts:{roewen:50}},
 {k:'f_tim_sunflower',loc:['kgarden'],cond:{tim:true,season:'여름'},need:f=>Object.values(f.pl).some(p=>p.c==='sunflower'&&stageOf(p)>=3),t:'팀보다 큰 해바라기',L:()=>[['r','해바라기가 쑥쑥 자라 팀의 키를 넘어섰다. 팀은 그 옆에 바짝 붙어 서서 발뒤꿈치를 들었다.'],
   ['x','tim','a','치사해요! 해바라기는 물만 먹는데 왜 저보다 커요?'],['m','h','팀도 밥 잘 먹으면 금방 클 거야.'],['x','tim','n',`……${fnm('tim')}. 저 내년에 이 해바라기보다 커질 거예요. 두고 보세요.`],
   ['r','팀은 해바라기 줄기에 손톱으로 작게 금을 그었다. 내년의 키를 재기 위한 표시였다.']],pts:{tim:30}},
 {k:'f_frost',loc:['kgarden'],cond:{season:'가을',minDay:120},t:'첫서리 대비',L:()=>[['r','공기가 유난히 찼다. 밭고랑 끝에 하얀 서리가 앉아 있었다.'],['x','brant','n','서리 왔네. 남은 건 짚 덮어 놔. 안 그럼 하룻밤에 다 얼어.'],
   ['r','브란트와 나란히 쭈그려 앉아, 남은 작물 위에 짚을 덮었다. 입김이 하얗게 피어올랐다.'],['x','brant','n','북부 겨울은 길다. 밭도 쉬어야지. 온실은 네 몫이다.'],['m','n','네. 겨울에도 뭐든 키워 볼게요.'],
   ['x','brant','h','그래. 너 오고 나서 주방 냄비가 안 비더라. ……고맙다는 소리다. 두 번은 안 해.']],pts:{brant:30}},
 {k:'f_harvest_table',loc:['dining'],cond:{time:'evening'},need:f=>farmLvOf(f.xp)>=3&&Object.keys(f.cooked).length>=3,t:'텃밭 만찬',L:()=>[['r','그날 저녁, 식당의 긴 식탁에 텃밭에서 난 것들로 만든 요리가 줄지어 올라왔다.'],['x','brant','n','오늘 저녁은 전부 저기 저 부집사 밭에서 나온 거다. 남기면 죽는다.'],
   ['x','roewen','h','이야, 남길 리가! 꼬마, 이 파이 하나 더 있어?'],['x','marta','h','우리 꼬맹이가 이제 성 식구들 밥까지 먹이네.'],['x','edmund','h','대공가의 식탁이 이렇게 풍성했던 게 언제였는지 모르겠군요.'],
   ['r','상석의 카이런은 말없이 수프를 떴다. 그리고 아주 작게, 한 그릇을 더 청했다.'],['r','식당 안이 일순 조용해졌다가, 와르르 웃음이 터졌다.'],['m','b','(……북부에서도 이렇게 따뜻한 식탁을 만들 수 있구나.)']],pts:{kairan:30,roewen:20,brant:30,marta:20,edmund:20}},
 {k:'f_hen_chase',loc:['paddock'],cond:{},need:f=>f.hens&&S.day-f.henDay>=3,t:'탈출한 참깨',L:()=>[['r','방목장에 들어서자마자 «꼬꼬댁!» 하는 비명과 함께 참깨가 울타리 틈으로 빠져나갔다.'],['m','s','참깨야! 거기 서!'],
   ['r','에레나가 치맛자락 대신 바짓가랑이를 붙잡고 뛰었다. 참깨는 훈련장 쪽으로 날개를 퍼덕이며 도망쳤다.'],['x','demian','n','……부집사님. 이 닭 말입니까.'],['r','데미안이 참깨를 한 손으로 얌전히 안고 서 있었다. 참깨는 그의 품에서 놀랍도록 순했다.'],
   ['m','a','……어떻게 그렇게 순하게 잡으셨어요?'],['x','demian','n','……어릴 때 집에서 닭을 쳤습니다. 닭은, 겁먹은 겁니다. 천천히 다가가면 됩니다.'],['r','참깨가 데미안의 손가락을 쪼았다. 데미안은 아주 조금, 웃었다.']],pts:{demian:30}},
];
function farmEvCheck(){const f=S.farm;if(D||busy||SCENE||MG||!$('#panel').hidden||AFF||S.walk)return;const rm=roomAt(...tileOf(P));
  if(!f){return;}
  if(!f.intro){if(S.day>=3&&((S.area==='castle'&&rm==='kgarden')||S.area==='green')&&S.min<21*60)farmIntro();return;}
  if(!f.hens&&S.day-f.intro>=4&&S.area==='castle'&&(rm==='paddock'||rm==='kgarden')&&S.min<20*60){henIntro();return;}
  if(f.evDay===S.day)return;
  for(const e of FEV){if(f.ev[e.k])continue;const loc=S.area==='green'?'greenhouse':rm;if(!e.loc.includes(loc))continue;if(e.cond.tim&&!S.f.tim)continue;
    if(!xcond(Object.assign({},e.cond,{tim:undefined})))continue;if(e.need&&!e.need(f))continue;if(S.day-f.intro<2)continue;
    f.ev[e.k]=S.day;f.evDay=S.day;const L=e.L();
    playScene({title:e.t,sub:'텃밭 이야기'},null,[...xl(L,null),xpts(e)],()=>{diaryAdd('ev',{t:'텃밭 · '+e.t,k:null});save();});return;}}
let FBLK=0;function farmBlk(){const a=AREAS.castle,n=S.farm?S.farm.hens:0;if(FBLK===n+1)return;FBLK=n+1;a.blk[BIN.y*a.MW+BIN.x]=1;
  for(const [x,y] of [[47,45],[48,45],[47,46],[48,46],[49,46]])a.blk[y*a.MW+x]=n?1:0;}
let FT0=0;function farmTick(){farmBlk();const now=performance.now(),dt=Math.min(.1,(now-(FT0||now))/1000);FT0=now;hensTick(dt);
  if(Math.floor(now/700)!==Math.floor((now-dt*1000)/700))farmEvCheck();}
function farmBook(){const f=S.farm;if(!f||!f.intro)return `<div class="sub">텃밭</div><p class="story">아직 텃밭을 맡지 않았다. (3일째부터 브란트가 부탁해요)</p>`;
  const lv=farmLvOf(f.xp),nx=FLV[lv]||null,bar=(nm,a,b)=>`<div class="kv"><span>${nm} <b>${a} / ${b}</b></span><span class="bk"><i style="width:${b?Math.round(a/b*100):0}%"></i></span></div>`;
  let h=`<div class="sub">텃밭 · 요리</div><div class="kv"><span>텃밭 솜씨 <b>Lv.${lv}</b>${nx?` <small>(다음까지 ${nx-f.xp})</small>`:' <small>(최고)</small>'}</span></div>`
    +bar('기른 작물',Object.keys(CROPS).filter(k=>f.got[k]).length,Object.keys(CROPS).length)+bar('만든 요리',Object.keys(f.cooked).length,Object.keys(DISH).length);
  h+=`<div class="tw">${Object.entries(CROPS).map(([k,c])=>f.got[k]?`${c.n} ×${f.got[k]}`:'???').join(' · ')}</div>`;
  h+=`<div class="tw">요리: ${Object.entries(DISH).map(([k,d])=>f.cooked[k]?d.n:recKnown(k)?d.n+'(아직)':'???').join(' · ')}</div>`;
  h+=`<div class="tw">솜씨 효과: Lv.2부터 수확량이 늘고, Lv.5엔 씨앗이 돌아오기도 해요. 레벨마다 새 요리법.</div>`;
  if(f.hens)h+=`<div class="tw">닭장: ${HEN_N.slice(0,f.hens).map((n,i)=>`${n} ${'♥'.repeat(Math.ceil((f.hl[i]||0)/2))}`).join(' · ')} · 달걀 ${(f.got.egg||0)+(f.got.egg_big||0)}개</div>`;
  return h;}
{const _b=bookHtml;bookHtml=function(){return _b()+farmBook();};}
