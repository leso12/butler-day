/* ── 먹기·마시기: 손에 든 찻잔·맥주잔·와인잔·빵 등을 실제 팔 동작(손을 가슴께 ↔ 입가)과 함께 ──
   앉아서: pose 'tea' / 서서: pose 'drink'. 무엇을 드는지는 n.item · P.item · SCENE.item, 없으면 자리 이름으로 고른다. */
const EAT_CYC=4200,EAT_SIP=850;
function eatPh(t,seed){return ((t+seed*1311)%EAT_CYC)<EAT_SIP?'am':'ah';}
const DRINKS=new Set(['tea','beer','wine','milk','cocoa']);
function spotItem(cur){if(!cur)return null;if(/tavern|tav_?t/.test(cur))return 'beer';if(/party/.test(cur))return 'wine';if(/_dine/.test(cur))return 'stew';if(/_eat/.test(cur))return 'bread';if(/c_tea/.test(cur))return 'tea';if(/bakery/.test(cur))return 'bread';return null;}
function roomItem(rm){if(!rm)return null;if(/tavern|tav_t/.test(rm))return 'beer';if(/bakery/.test(rm))return 'bread';if(/tea_in|library|butler|parlor|flower_in|servants|myroom|kbed/.test(rm))return 'tea';if(/kitchen/.test(rm))return 'stew';if(/ballroom/.test(rm))return 'wine';return null;}
function itemOf(e){if(e.pl)return P.eatIt||P.item||(SCENE&&SCENE.item)||'tea';const n=e.n;return (n&&n.item)||(SCENE&&n&&n.scene&&SCENE.item)||spotItem(n&&n.cur)||'tea';}
const ITEM_OF_FOOD=it=>{const n=(ITEMS[it]&&ITEMS[it].n)||'';return /파이|타르트/.test(n)?'pie':/쿠키|과자/.test(n)?'cookie':/딸기|베리|산딸기/.test(n)?'berry':/부추|뿌리/.test(n)?'herb':/우유/.test(n)?'milk':/차/.test(n)?'tea':'bread';};
/* 손에 든 물건 (스듀풍 작은 도트). hx,hy = 손 칸의 화면 좌표, sip = 입가 프레임, f = 1 오른쪽 / -1 왼쪽을 향함, fr = 정면 */
function drawHeld(g,x,y,k,sip,f,fr,t){const R=(c,a,b,w,h)=>{g.fillStyle=c;g.fillRect(a,b,w,h);};const by=y;   /* by = 물건 바닥 (손 윗줄) */
  if(k==='tea'){if(!sip)R('#d8d2c6',x-2,by,5,1);R('#fbf8f2',x-1,by-2,3,2);R('#b88a5a',x-1,by-2,3,1);R('#d8d2c6',x+1+(f<0?-3:0),by-2,1,1);if(!sip&&Math.random()<.02)STEAM.push({x:x,y:by-4,t:0,s:1});return;}
  if(k==='milk'||k==='cocoa'){R('#e8e2d6',x-1,by-3,3,3);R(k==='milk'?'#fbfaf6':'#8a5a3a',x-1,by-3,3,1);R('#7a98b8',x-1,by-1,3,1);return;}
  if(k==='beer'){R('#b07a30',x-1,by-4,3,4);R('#e0a848',x-1,by-3,2,3);R('#fbf4e0',x-1,by-5,3,1);R('#8a5a2a',x+(f<0?-2:2),by-3,1,2);return;}
  if(k==='wine'){R('#dfe6ee',x,by-1,1,1);R('#dfe6ee',x-1,by,3,1);R('#8a2a3a',x-1,by-3,3,2);R('#eef2f6',x-1,by-4,3,1);return;}
  if(k==='stew'){if(sip){R('#c8ccd4',x,by-1,1,2);R('#e8ecf0',x-1,by-2,2,1);}else{R('#6a4430',x-2,by-1,5,2);R('#c8703a',x-1,by-2,3,1);R('#8a5a3a',x-2,by-2,1,1);R('#8a5a3a',x+2,by-2,1,1);if(Math.random()<.02)STEAM.push({x:x,y:by-4,t:0,s:1});}return;}
  if(k==='pie'){R('#a04a3a',x-1,by-2,3,2);R('#e0b070',x-2,by-1,4,1);R('#f0c88a',x-1,by-3,2,1);return;}
  if(k==='cookie'){R('#b8783a',x-1,by-2,3,2);R('#d8a060',x-1,by-2,2,1);R('#6a3a2a',x,by-1,1,1);return;}
  if(k==='cake'){R('#f6ece0',x-1,by-2,3,2);R('#e8a0b4',x-1,by-3,3,1);R('#c84a5a',x,by-4,1,1);return;}
  if(k==='berry'){R('#b0304a',x-1,by-2,2,2);R('#e86a7a',x-1,by-2,1,1);R('#4a8a3a',x,by-3,1,1);return;}
  if(k==='herb'){R('#5a9a4a',x-1,by-3,1,3);R('#7aba5a',x,by-4,1,4);return;}
  if(k==='skewer'){R('#a8845a',x,by-5,1,5);R('#a85a3a',x-1,by-4,3,1);R('#c87a4a',x-1,by-2,3,1);return;}
  /* 빵 */R('#b8783a',x-2,by-2,4,2);R('#e0a860',x-2,by-3,4,1);R('#f0c88a',x-1,by-3,2,1);}
function heldFX(g,sx,sy,d,sd,t,e){const sp=e&&e.sp;if(!sp||!sp.hand)return false;const k=itemOf(e),sip=sp.armp==='am';
  const x=sx-8+sp.hand[0],y=sy-sp.height+1+sp.hand[1],f=d===2?-1:1;drawHeld(g,x,y,k,sip,f,d===0,t);
  if(sip&&!DRINKS.has(k)&&k!=='stew'&&Math.random()<.04&&typeof DUST!=='undefined'&&DUST.length<40)DUST.push({x:x+(Math.random()-.5)*3,y:y+1,t:0,vx:(Math.random()-.5)*6});
  return true;}
{const _tea=POSEFX.tea;POSEFX.tea=function(g,sx,sy,d,sd,t,e){if(heldFX(g,sx,sy,d,sd,t,e))return;if(d===1)return;return _tea(g,sx,sy,d,sd,t,e);};}
POSEFX.drink=function(g,sx,sy,d,sd,t,e){heldFX(g,sx,sy,d,sd,t,e);};
/* 프레임 고르기: 앉아서 먹기 'sit~ah|am', 서서 'ah|am'. 뒷모습은 팔이 안 보이니 평소대로 */
{const _ak=animKey;animKey=function(o,t,seed){const ps=o.pose;
  if((ps==='tea'||ps==='drink')&&!o.moving){const seated=ps==='tea';if(o.dir===1)return seated?'sit':_ak(Object.assign({},o,{pose:null}),t,seed);
    const ph=(!o.npc&&P.eatT)?eatSeq(t):eatPh(t,seed||0);return (seated?'sit~':'')+ph;}
  if(ps==='drink'&&o.moving)return _ak(Object.assign({},o,{pose:null}),t,seed);
  return _ak(o,t,seed);};}
/* 플레이어가 가방에서 먹을 때 (스듀처럼): 들어 올렸다가 입으로 몇 번 */
function eatSeq(t){const k=performance.now()-P.eatT;return (k>350&&((k-350)%520)<300)?'am':'ah';}
{const _use=useItem;useItem=function(it){const I=ITEMS[it];if(!I||!I.food||!S.inv[it]||busy||D||SCENE)return _use(it);
  const k=ITEM_OF_FOOD(it),pv=P.pose;_use(it);const pn=$('#panel');if(pn)pn.hidden=true;if(typeof panelKind!=='undefined')panelKind=null;
  busy=true;P.pose='drink';P.eatIt=k;P.eatT=performance.now();if(P.dir===1)P.dir=0;
  setTimeout(()=>{P.pose=pv==='drink'?null:pv;P.eatIt=null;P.eatT=0;busy=false;},1700);};}
/* 앉아 있는 NPC: 식당·하인 식당 식사 시간, 선술집, 찻집, 빵집, 연회 자리에서는 실제로 먹고 마신다 */
setInterval(()=>{try{if(!S||!npcs)return;for(const n of npcs){if(n.scene||n.hidden)continue;const it=spotItem(n.cur);
  if(n.pose==='sit'&&it){n.pose='tea';n.item=it;n._amb=1;}
  else if(n.pose==='stand'&&it&&/_eat/.test(n.cur||'')){n.pose='drink';n.item=it;n._amb=1;}
  else if(n._amb&&(!it||(n.pose!=='tea'&&n.pose!=='drink'))){if(n.pose==='tea')n.pose='sit';else if(n.pose==='drink')n.pose='stand';n._amb=0;n.item=null;}}}catch(e){}},500);
/* 데이트(마주 앉아 차 마시기)는 장소에 맞는 것, 선술집 장면에서는 다 같이 맥주잔 */
{const _adp=applyDatePose;applyDatePose=function(){_adp();if(!SCENE)return;let rm=null;try{rm=roomAt(...tileOf(P));}catch(e){}
  if(P.pose==='tea'){SCENE.item=roomItem(rm)||'tea';return;}
  if(rm&&/tavern|tav_t/.test(rm)&&!P.pose){SCENE.item='beer';SCENE.drinkers=[];P.pose='drink';for(const id of SCENE.cast||[]){const n=npcs.find(m=>m.id===id);if(n&&n.pose==='stand'){n.pose='drink';SCENE.drinkers.push(n);}}}};}
{const _es=endScene;endScene=function(){const sc=SCENE;if(sc&&sc.drinkers){for(const n of sc.drinkers)if(n.pose==='drink')n.pose='stand';if(P.pose==='drink')P.pose=null;}return _es.apply(this,arguments);};}
/* 서 있는 자리가 가구·노점 밑이 되어 버렸으면(꾸미기·지도 수정 뒤에도) 가장 가까운 빈칸에 선다 */
{const _ar=arrive;arrive=function(n){_ar(n);try{if(['sit','tea','write','sleep','bed'].includes(n.pose)||n.hidden)return;const a=AREAS[n.area];if(!a)return;const [x,y]=tileOf(n);if(!solidIn(a,x,y))return;
  for(let r=1;r<=3;r++)for(const [dx,dy] of [[0,1],[1,0],[-1,0],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]]){const X=x+dx*r,Y=y+dy*r;if(!solidIn(a,X,Y)&&!doorAt(a,X,Y)){n.x=X*T+8;n.y=Y*T+14;return;}}}catch(e){}};}
