
/* ═════════ 낚시 2.0: 찌 연출 · 어종 · 크기 기록 · 낚시 솜씨 · 미끼 · 보물 · 호숫가 이야기 ═════════ */
const FT={
  carp:{s:'all',w:3,sz:[25,60],c:['#c8a060','#8a6a3a']},
  crucian:{n:'붕어',p:3,s:'all',w:3,sz:[10,30],dif:.6,c:['#b8a070','#7a6a40'],d:'어디에나 사는 붕어. 손바닥만 한 게 귀엽다.'},
  minnow:{n:'피라미',p:2,s:['봄','여름'],w:3,sz:[6,14],dif:.5,c:['#c0d0d8','#6a7a90'],d:'반짝이는 작은 물고기. 아이들이 좋아한다.'},
  sweetfish:{s:['봄'],w:2,sz:[12,25],c:['#b8c8a0','#6a8a5a']},
  rainbow:{n:'무지개송어',p:9,s:['봄'],w:1.4,sz:[25,55],dif:1.1,c:['#d8a0b0','#5a7a6a'],d:'옆구리에 분홍빛 띠가 흐르는 송어.'},
  trout:{s:['봄','여름'],w:2,sz:[20,50],c:['#a8b088','#5a6a4a']},
  perch:{s:['여름'],w:2,sz:[20,45],c:['#c8c890','#5a7a3a']},
  snakehead:{n:'가물치',p:12,s:['여름'],t:'day',w:1,sz:[40,90],dif:1.3,c:['#5a6a4a','#2e3a26'],d:'얼룩무늬의 힘센 가물치. 몸에 좋다고들 한다.'},
  mandarin:{n:'쏘가리',p:16,s:['여름','가을'],t:'day',w:.6,sz:[20,45],dif:1.35,lv:2,c:['#d0b060','#5a4a2a'],d:'표범 무늬가 있는 귀한 민물고기.'},
  eel:{n:'뱀장어',p:14,s:['여름','가을'],t:'night',w:1.5,sz:[40,90],dif:1.2,c:['#4a4a3a','#2a2a22'],d:'밤에만 나오는 미끈한 장어.'},
  salmon:{s:['가을'],w:2,sz:[50,90],c:['#d89070','#7a5a5a']},
  catfish:{s:'all',wx:1,w:2.2,sz:[30,80],c:['#6a5a4a','#3a2e26']},
  pike:{n:'강꼬치고기',p:15,s:['가을','겨울'],w:1,sz:[50,110],dif:1.4,lv:2,c:['#8a9a6a','#4a5a3a'],d:'이빨이 날카로운 호수의 사냥꾼.'},
  smelt:{s:['겨울'],w:3,sz:[8,15],c:['#d0dce8','#8a9ab0']},
  char:{s:['겨울'],w:1,sz:[25,55],c:['#c8a8a0','#5a6a7a']},
  sturgeon:{n:'철갑상어',p:35,s:['여름','겨울'],w:.3,sz:[90,180],dif:1.6,lv:3,c:['#7a8a9a','#3a4a5a'],d:'등에 갑옷 같은 비늘이 늘어선 고대의 물고기.'},
  goldcarp:{s:'all',w:.18,sz:[40,80],lv:2,c:['#f0c040','#b07a10']},
  moontrout:{n:'달빛 송어',p:60,s:['여름','가을'],t:'night',clear:1,w:.22,sz:[60,90],dif:1.75,lv:3,legend:1,c:['#e0eaf8','#8a9ac8'],d:'맑은 밤에만 수면 위로 오른다는 전설의 송어. 비늘에 달빛이 고였다.'},
  lakeking:{n:'호수의 주인',p:90,s:['가을','겨울'],wx:1,w:.2,sz:[150,210],dif:1.9,lv:4,legend:1,c:['#9aa8a0','#3a4a42'],d:'요나스가 삼십 년을 쫓았다는 거대한 강꼬치고기.'},
};
const FLV2=[0,8,25,55,100];
Object.assign(ITEMS,{
  boot:{n:'낡은 장화',p:1,sell:1,junk:1,d:'누가 버린 장화. 물이 줄줄 샌다.'},
  weed:{n:'호수 수초',p:1,sell:1,junk:1,d:'미끌미끌한 수초. 어디 쓸 데가 있을까.'},
  bait:{n:'지렁이 미끼',p:1,d:'낚시할 때 하나씩 쓴다. 입질이 빨라지고 귀한 물고기가 잘 문다.'},
  rod2:{n:'강철 낚싯대',p:60,tool:1,d:'손잡이가 튼튼한 낚싯대. 찌 칸이 넓어져 낚기 쉽다.'},
  lucky_float:{n:'요나스의 낡은 찌',p:0,key:1,d:'요나스가 삼십 년 쓴 행운의 찌. 귀한 물고기가 더 잘 문다.'},
  judge_ribbon:{n:'품평회 금상 리본',p:0,key:1,d:'수확제 작물 품평회 금상. 한스 할아버지가 직접 달아 주었다.'},
});
for(const [k,f] of Object.entries(FT)){if(!ITEMS[k])ITEMS[k]={n:f.n,p:f.p,fish:1,sell:1,d:f.d};if(f.dif)FDIF[k]=f.dif;else if(!FDIF[k])FDIF[k]=1;}
SHOPS.gen.items.push('bait','rod2');
Object.assign(DISH,{
  smeltfry:{n:'빙어 튀김',ing:{smelt:3,wheat:1},food:30,p:14,jo:1,d:'바삭바삭한 겨울 빙어 튀김.'},
  fishstew:{n:'어부의 생선 스튜',ing:{carp:1,potato:1,tomato:1},food:45,p:20,jo:1,d:'요나스네 집안 비법 스튜.'},
  salmonsteak:{n:'연어 스테이크',ing:{salmon:1,herb:1},food:48,p:24,jo:2,d:'두툼한 가을 연어에 로즈마리를 얹었다.'},
  eelgrill:{n:'장어 구이',ing:{eel:1},food:55,p:26,jo:2,d:'기름이 자르르 흐르는 장어 구이. 기운이 펄펄.'},
});
for(const k of ['smeltfry','fishstew','salmonsteak','eelgrill']){const d=DISH[k];ITEMS['d_'+k]={n:d.n,p:d.p,food:d.food,dish:1,sell:1,d:`${d.d} 체력 +${d.food}.`};}
for(const [id,o] of Object.entries({
  roewen:{love:['d_eelgrill','d_salmonsteak'],like:['d_fishstew','snakehead','pike']},
  kairan:{like:['moontrout','d_salmonsteak','mandarin'],dis:['boot','weed']},
  edmund:{like:['d_smeltfry','rainbow'],dis:['boot','weed','eel']},
  marta:{like:['d_fishstew'],dis:['boot','weed','eel','snakehead']},
  brant:{love:['sturgeon','mandarin'],like:['eel','pike','crucian','rainbow'],dis:['boot','weed']},
  tim:{love:['minnow','d_smeltfry'],like:['crucian','rainbow'],dis:['eel','snakehead','boot']},
}))if(PREF[id])for(const k of ['love','like','dis'])if(o[k])PREF[id][k].push(...o[k]);

function FS(){return S.fishS||(S.fishS={xp:0,rec:{},jo:0,ev:{},legend:{},n:0,evDay:0});}
const fishLv=()=>{const x=FS().xp;let l=0;for(let i=0;i<FLV2.length;i++)if(x>=FLV2[i])l=i+1;return l;};
function pickFish2(bait){const ss=FSEA(),hr=S.min/60,night=hr>=19||hr<5,wet=S.weather==='rain'||S.weather==='snow'||S.weather==='blizzard',lv=fishLv(),fs=FS();
  const r=Math.random();if(r<(bait?.03:.07))return Math.random()<.5?'boot':'weed';if(r<(bait?.07:.1))return 'chest';
  const pool=[];for(const [k,f] of Object.entries(FT)){if(f.s!=='all'&&!f.s.includes(ss))continue;if(f.t==='night'&&!night)continue;if(f.t==='day'&&night)continue;
    if(f.wx&&!wet&&k!=='catfish')continue;if(f.clear&&S.weather!=='clear')continue;if((f.lv||1)>lv)continue;if(f.legend&&fs.legend[k])continue;
    let w=f.w;if(k==='catfish'&&!wet)w=.6;if(w<1)w*=(bait?1.8:1)*(S.inv.lucky_float?1.5:1);pool.push([k,w]);}
  let t=pool.reduce((a,b)=>a+b[1],0)*Math.random();for(const [k,w] of pool){t-=w;if(t<=0)return k;}return 'carp';}
function fishIcon(id){const k='fi_'+id;if(ICV[k])return ICV[k];const f=FT[id]||{c:['#8a9aa8','#4a5a6a']},big=['sturgeon','lakeking','pike','eel','snakehead'].includes(id);
  const W=big?16:13,H=7,Gd=Array.from({length:H},()=>Array(W).fill(null)),[c1,c2]=f.c,eel=id==='eel';
  for(let y=0;y<H;y++)for(let x=0;x<W-3;x++){const ex=(x-(W-3)/2)/((W-3)/2),ey=(y-3)/(eel?1.6:3);if(ex*ex+ey*ey<=1)Gd[y][x]=y>=4?c1:y<=1?c2:c1;}
  for(let y=1;y<6;y++){const d=Math.abs(y-3);Gd[y][W-3+d]=c2;if(d<2)Gd[y][W-2]=c2;if(d===2)Gd[y][W-1]=c2;}
  Gd[2][2]='#ffffff';Gd[3][2]='#1a1414';if(id==='rainbow'){for(let x=3;x<W-4;x++)Gd[3][x]='#e88a9a';}if(id==='mandarin'||id==='snakehead')for(let x=4;x<W-4;x+=3)Gd[2][x]=c2;
  if(id==='goldcarp'||id==='moontrout')for(let x=4;x<W-5;x+=3)Gd[4][x]='#ffffff';
  return ICV[k]=rasterOL(Gd,W,H,'#1e1618');}
let FISHV=null;
goFish=function(){
  if(S.carry)return startDialog(null,[R_('들고 있는 것부터 처리하자.')]);
  if(S.hp<4)return startDialog(null,[R_('팔에 힘이 없다. 오늘 낚시는 무리다.')]);
  if(FISHV)return;
  const [dx,dy]=DIRV[P.dir],a=AREAS[S.area],[px,py]=tileOf(P);let bx=px+dx,by=py+dy;
  for(const k of [2,3]){const x=px+dx*k,y=py+dy*k;if(inMap(a,x,y)&&a.map[y][x]==='L'){bx=x;by=y;break;}}
  const bait=(S.inv.bait||0)>0;if(bait)S.inv.bait--;
  S.hp-=4;S.min+=20;hud();busy=true;
  if(!S.seen.fishTip){S.seen.fishTip=1;toast('[확인]을 톡톡 눌러 칸을 밀어 올려요');}
  const now=performance.now(),wait=(bait?500:900)+Math.random()*(bait?700:1500);
  FISHV={x:bx*T+8+(Math.random()*6-3),y:by*T+9,t0:now,bite:now+wait,ph:'cast',bait};
  setTimeout(()=>{if(!FISHV)return;FISHV.ph='bite';FISHV.tb=performance.now();
    setTimeout(()=>{busy=false;fishResolve();},520);},wait);
};
function fishResolve(){const V=FISHV,fs=FS(),ice=SEAS==='겨울',fish=pickFish2(V.bait);
  if(fish==='boot'||fish==='weed'||fish==='chest'){FISHV=null;
    if(fish==='chest'){const pr=[['coin',5+Math.floor(Math.random()*25)],['silver_button'],['ribbon'],['candle'],['crystal'],['bait',3]][Math.floor(Math.random()*6)];
      if(pr[0]==='coin')S.coins+=pr[1];else S.inv[pr[0]]=(S.inv[pr[0]]||0)+(pr[1]||1);
      startDialog(null,[R_('찌에 묵직한 게 걸렸다…… 이끼 낀 작은 나무 상자다!'),R_(pr[0]==='coin'?`상자 안에서 녹슨 동전이 쏟아졌다. (${money(pr[1])})`:`상자 안에 ${ITEMS[pr[0]].n}${pr[1]?' '+pr[1]+'개':''}${jo(ITEMS[pr[0]].n,'이','가').slice(-1)} 들어 있었다!`)],()=>{hud();save();});return;}
    S.inv[fish]=(S.inv[fish]||0)+1;startDialog(null,[R_(fish==='boot'?'묵직하다! 대물이다! ……낡은 장화였다.':'미끌미끌한 수초 한 뭉치가 걸려 올라왔다.')],()=>save());return;}
  const f=FT[fish]||{},lv=fishLv(),dif=Math.max(.4,(FDIF[fish]||1)-lv*.05-(S.inv.rod2?.15:0));
  mgFish(f.legend?'— 전설의 손맛 —':ice?'얼음 낚시':'낚시',f.legend?'낚싯대가 활처럼 휘었다! 이건…… 보통 물고기가 아니다!':ice?'얼음 구멍 아래로 찌를 내렸다. 손끝이 시리다.':'찌가 물결 위에서 흔들린다…… 톡, 톡. 입질이다!',dif,sc=>{
    if(sc>=1){const sz0=f.sz||[20,40],q=Math.pow(Math.random(),1.6-lv*.1),cm=Math.round(sz0[0]+(sz0[1]-sz0[0])*(1-q)),best=fs.rec[fish]||0,rec=cm>best;
      if(rec)fs.rec[fish]=cm;S.inv[fish]=(S.inv[fish]||0)+1;S.fishN=1+(S.fishN||0);(S.fishK=S.fishK||{})[fish]=(S.fishK[fish]||0)+1;fs.n++;
      const l0=fishLv();fs.xp+=Math.ceil((ITEMS[fish].p||3)/3)+1;const l1=fishLv();if(l1>l0)setTimeout(()=>toast(`낚시 솜씨 Lv.${l1}! <i>${l1===2?'쏘가리·강꼬치고기·황금 잉어가 문다':l1===3?'철갑상어와 전설의 소문이…':l1===4?'호수의 주인이 깨어났다':'찌 칸이 넓어졌다'}</i>`),1200);
      FFX.push({k:'fpop',fish,x0:V.x,y0:V.y,t:performance.now()});FISHV=null;
      diaryAdd('note',`호수에서 ${jo(ITEMS[fish].n,'을','를')} 낚았다.`);
      if(f.legend){fs.legend[fish]=S.day;setTimeout(()=>legendScene(fish,cm),700);hud();save();return;}
      startDialog(null,[R_(fish==='goldcarp'?'물 위로 금빛이 번쩍였다! ……전설의 황금 잉어다!':`${ITEMS[fish].n}${jo(ITEMS[fish].n,'이','가').slice(-1)} 걸려 올라왔다! 펄떡펄떡.`),
        R_(`(${ITEMS[fish].n} ${cm}cm${rec&&best?' · 최고 기록 갱신!':rec?' · 첫 기록':''})`)],()=>{hud();save();});}
    else{FISHV=null;startDialog(null,[R_(['찌가 툭 끊겼다. 놓쳤다……','물고기가 바늘만 쏙 빼먹고 달아났다.','첨벙! 꼬리만 보고 놓쳤다.'][Math.floor(Math.random()*3)])]);}
    hud();save();});}
function legendScene(fish,cm){const L=fish==='lakeking'?[['r','— 호수의 주인 —'],['r',`줄을 감고 또 감았다. 마침내 물 위로 올라온 것은, 팔 길이를 훌쩍 넘는 거대한 강꼬치고기였다. (${cm}cm)`],
    ['r','부두 끝에서 요나스가 벌떡 일어났다. 들고 있던 파이프가 물에 퐁당 빠졌다.'],['g','요나스','……그놈이다. 삼십 년. 삼십 년을 쫓았다.'],['m','s','요, 요나스 아저씨 거예요! 받으세요!'],
    ['r','요나스는 한참 그 물고기를 내려다보다가, 천천히 고개를 저었다.'],['g','요나스','아니. 호수가 너를 고른 거다. 난 그걸 보려고 삼십 년을 앉아 있었나 보군.'],['g','요나스','……근데 말이다. 놓아주는 것도 어부의 일이다.'],
    ['c',[{t:'호수로 돌려보낸다',r:[['r','에레나가 두 팔로 물고기를 안아 물에 내려놓았다. 거대한 꼬리가 한 번, 천천히 물을 쳤다.'],['g','요나스','허허…… 좋은 어부다. 삼십 년 만에 처음으로, 호수가 웃는 걸 봤다.'],['r','(호수의 주인을 놓아주었다. 기록은 영원히 남는다.)']]},
       {t:'성에 가져간다',r:[['r','에레나는 물고기를 끌어안고 비틀거리며 일어났다. 요나스가 웃으며 손수레를 밀어 주었다.'],['g','요나스','브란트한테 가져가라. 그 여자 얼굴 한번 볼 만할 거다.'],['r','(호수의 주인을 얻었다.)']]}]]]
   :[['r','— 달빛 송어 —'],['r',`물 밖으로 나온 송어의 비늘에 달빛이 그대로 고여 있었다. 은빛도 금빛도 아닌, 꼭 달 같은 색이었다. (${cm}cm)`],['r','호숫가가 쥐 죽은 듯 조용했다. 물결 소리마저 멎은 것 같았다.'],
    ...(S.partner==='kairan'||hearts('kairan')>=6?[['x','kairan','s','……그게, 달빛 송어인가.'],['r','언제부터였는지, 카이런이 호숫가 나무 아래 서 있었다.'],['x','kairan','n','어릴 때 들은 이야기다. 맑은 밤, 이 물고기를 본 사람은 한 해 동안 소원이 하나 이루어진다고.'],
      ['m','b','……그럼 전하가 보셨으니, 전하 소원도 이뤄지겠네요.'],['x','kairan','b','내 소원은 이미 낚싯대 들고 서 있다.'],['r','에레나의 손에서 하마터면 송어가 미끄러질 뻔했다.']]
     :[['g','요나스','허…… 내 평생 딱 한 번 봤다. 맑은 밤, 달 밝은 날에만 올라오는 놈이지.'],['g','요나스','소원 하나 빌어라. 그게 이 녀석을 만난 사람의 몫이다.'],['m','b','(……이 성에서, 계속 지낼 수 있기를.)']])];
  playScene({title:FT[fish].n,sub:'전설의 물고기'},null,xl(L,null),()=>{const ch=fish==='lakeking'&&S.f.lkRelease;logEv(`전설의 물고기 · ${FT[fish].n}`,null);save();hud();});}
/* 찌 · 낚싯줄 · 튀어 오르는 물고기 */
function fishFx(cx,cy,t){const now=performance.now();
  if(FISHV&&S.area==='town'){const V=FISHV,[dx,dy]=DIRV[P.dir],hx=Q(P.x)-cx+(dx?dx*5:5),hy=Q(P.y)-cy-14,tipx=hx+(dx?dx*13:4),tipy=hy+(dy>0?10:dy<0?-17:-9);
    const k=Math.min(1,(now-V.t0)/350),bob=V.ph==='bite'?(Math.floor((now-V.tb)/90)%2?2:0):Math.round(Math.sin(now/260)),bx=Math.round(tipx+(V.x-cx-tipx)*k),by=Math.round(tipy+(V.y-cy-tipy)*k-(1-k)*k*30)+(k>=1?bob:0);
    drawRod(hx,hy,tipx,tipy);
    ctx.fillStyle='rgba(240,240,230,.75)';const n=Math.max(8,Math.round(Math.hypot(bx-tipx,by-tipy)));for(let i=0;i<=n;i++){const u=i/n;ctx.fillRect(Math.round(tipx+(bx-tipx)*u),Math.round(tipy+(by-tipy)*u+Math.sin(u*Math.PI)*4*(V.ph==='bite'?0:1)),1,1);}
    if(k>=1){const rr=(now/700)%1;ctx.fillStyle=`rgba(220,240,250,${.6*(1-rr)})`;const rw=Math.round(3+rr*6);ctx.fillRect(bx-rw,by+3,rw*2+1,1);
      if(V.ph==='bite'){ctx.fillStyle='rgba(230,250,255,.9)';for(let j=0;j<5;j++)ctx.fillRect(bx-4+j*2,by-1-((j*7+Math.floor(now/60))%4),1,1);}}
    drawBobber(bx,by);
    if(V.ph==='bite')drawEmote(Q(P.x)-cx,Q(P.y)-cy,'!',t);}
  for(let i=FFX.length-1;i>=0;i--){const e=FFX[i];if(e.k!=='fpop')continue;const k=(now-e.t)/800;if(k>1){FFX.splice(i,1);continue;}
    const x=e.x0+(P.x-e.x0)*k-cx,y=e.y0+(P.y-30-e.y0)*k-Math.sin(k*Math.PI)*22-cy,ic=fishIcon(e.fish);ctx.save();ctx.translate(Math.round(x),Math.round(y));if(Math.floor(k*6)%2)ctx.scale(-1,1);ctx.drawImage(ic,-ic.width/2,-ic.height/2);ctx.restore();}}
/* 호숫가 이야기 */
const fnm2=()=>S.f.public?'아가씨':'부집사 양반';
const FSEV=[
 {k:'j_intro',need:fs=>fs.n>=1,t:'어부 요나스',L:()=>[['r','부두 끝에 앉아 있던 요나스가 파이프를 입에서 떼고 이쪽을 보았다.'],['g','요나스',`……${fnm2()}, 찌를 그렇게 던지면 고기가 웃는다.`],['m','a','네? 제가 뭘……'],
   ['g','요나스','손목. 손목으로 툭. 어깨로 던지면 물이 놀란다.'],['r','요나스가 낡은 낚싯대로 시범을 보였다. 찌가 소리도 없이 물 위에 내려앉았다.'],['g','요나스','고기는 계절 따라, 시간 따라 다르다. 장어는 밤에, 메기는 비 올 때. 귀한 놈일수록 미끼를 가린다.'],
   ['g','요나스','이거 받아라. 지렁이다. 그리고…… 우리 집 생선 요리 두 가지. 브란트한테 보여 주면 알 거다.'],['m','h','감사합니다, 요나스 아저씨!'],['g','요나스','……호수는 거짓말을 안 해. 매일 오면, 매일 뭔가를 준다.'],
   ['r','(지렁이 미끼 5개 · 요리법: 빙어 튀김, 어부의 생선 스튜)']],done:fs=>{fs.jo=Math.max(fs.jo,1);S.inv.bait=(S.inv.bait||0)+5;}},
 {k:'j_float',need:fs=>Object.keys(fs.rec).length>=8,t:'삼십 년 쓴 찌',L:()=>[['g','요나스','……벌써 여덟 종이냐. 나는 첫해에 세 종 잡았다.'],['r','요나스가 품에서 손때 묻은 찌 하나를 꺼냈다. 빨간 칠이 거의 벗겨져 있었다.'],
   ['g','요나스','이거 삼십 년 썼다. 이걸로 쏘가리도, 철갑상어도 봤지. 단 하나, 그놈만 못 봤다.'],['m','s','그놈이요?'],['g','요나스','호수의 주인. 가을이나 겨울, 궂은 날에 가끔 수면이 크게 일렁인다. 그때 그놈이 지나가는 거다.'],
   ['g','요나스','네가 가져라. 늙은 어부의 소원도 같이 줄게. 연어 스테이크랑 장어 구이 요리법도.'],['r','(요나스의 낡은 찌 · 요리법: 연어 스테이크, 장어 구이)']],done:fs=>{fs.jo=2;S.inv.lucky_float=1;}},
 {k:'j_tim',need:fs=>S.f.tim&&fs.n>=3,t:'팀의 첫 물고기',L:()=>[['r','호숫가에 쭈그려 앉은 작은 등이 보였다. 팀이 나뭇가지에 실을 묶어 물에 드리우고 있었다.'],['x','tim','h',`${fnm('tim')}! 저도 낚시해요! 그렌 아저씨가 만들어 줬어요!`],
   ['r','그때 나뭇가지 끝이 파르르 떨렸다. 팀이 비명을 지르며 가지를 들어 올리자, 손가락만 한 피라미가 대롱대롱 매달려 올라왔다.'],['x','tim','s','자, 잡았다! 잡았어요! 형, 봤어요?!'],['m','h','봤어! 대단하다, 팀!'],
   ['r','팀은 피라미를 두 손에 조심스럽게 담고 한참을 들여다보았다.'],['x','tim','n','……근데 얘 너무 작아요. 엄마 찾을 것 같아요.'],['r','팀은 피라미를 물에 살며시 놓아주었다. 그리고 세상에서 제일 뿌듯한 얼굴로 웃었다.'],
   ['x','tim','h','오늘 일기에 쓸 거예요. «처음으로 물고기를 잡았다. 그리고 놓아줬다. 에렌 형이 봤다.»']],pts:{tim:40}},
 {k:'j_roewen',need:fs=>fs.n>=6,cond:{},t:'누가 더 큰가 내기',L:()=>[['x','roewen','h','어이, 꼬마! 낚시? 좋지. 내기 하나 할까? 큰 놈 낚는 쪽이 오늘 저녁 사기!'],['m','a','로웬 경, 저번에도 외상으로 사셨잖아요.'],['x','roewen','h','그러니까 이번엔 이겨서 갚으려는 거지!'],
   ['r','둘은 나란히 부두에 앉아 찌를 던졌다. 로웬의 찌는 오 분에 한 번씩 «입질이다!» 하는 바람에 물 밖으로 들려 나왔다.'],['m','h','로웬 경, 그거 바람이에요.'],['x','roewen','a','바람도 고기다! 마음가짐의 문제야!'],
   ['r','해가 기울 무렵, 로웬이 마침내 손바닥만 한 붕어를 낚아 올렸다. 세상을 다 가진 표정이었다.'],['x','roewen','h','봤지?! 이 크기! 이 위용!'],['m','h','……네, 네. 오늘 저녁은 제가 살게요.'],['x','roewen','b','……어? 진짜? 아니, 그럼 내가 너무 좋잖아.']],pts:{roewen:35}},
 {k:'j_demian',need:fs=>fs.n>=10,t:'말없는 낚시',L:()=>[['r','부두 반대편 끝에 데미안이 앉아 있었다. 비번인지 갑옷 대신 낡은 외투 차림이었다.'],['x','demian','n','……부집사님.'],['m','n','데미안 경도 낚시하세요?'],['x','demian','n','……가끔. 생각할 게 많을 때.'],
   ['r','둘은 한참 아무 말 없이 찌만 바라보았다. 이상하게 그 침묵이 편했다.'],['x','demian','n','……고향에 동생이 있습니다. 어릴 때 같이 개울에서 고기를 잡았지요. 늘 동생이 더 많이 잡았습니다.'],
   ['m','s','동생분이 낚시를 잘하셨나 봐요.'],['x','demian','n','……아니요. 제가 몰래 제 걸 동생 바구니에 넣었습니다.'],['r','데미안은 그 말을 하고 아주 조금, 입꼬리를 올렸다. 처음 보는 표정이었다.']],pts:{demian:40}},
 {k:'j_kairan_ice',need:fs=>fs.n>=4,cond:{season:'겨울',hearts:{kairan:4}},t:'얼음 위의 두 사람',L:()=>[['r','얼어붙은 호수 위, 얼음 구멍 옆에 검은 외투가 쭈그려 앉아 있었다. 카이런이었다.'],['m','s','전하? 여기서 뭐 하세요?'],['x','kairan','n','……낚시다. 보면 모르나.'],
   ['r','그의 옆에는 빈 양동이 하나가 놓여 있었다. 정말로 비어 있었다.'],['m','h','한 마리도 못 잡으셨어요?'],['x','kairan','a','오늘은 물고기들이 예의가 없군.'],
   ['r','에레나가 옆 구멍에 찌를 내리자마자, 빙어 한 마리가 퐁 하고 올라왔다. 이어서 또 한 마리. 또 한 마리.'],['x','kairan','a','…………'],['m','b','저, 저기, 반 나눠 드릴까요?'],
   ['x','kairan','n','필요 없다.'],['r','하지만 돌아가는 길, 카이런은 빙어가 든 양동이를 말없이 들어 주었다. 그리고 그날 저녁 식탁엔 빙어 튀김이 올라왔다.'],['x','kairan','b','……네가 잡은 거라 맛있는 거다. 착각하지 마라.']],pts:{kairan:45}},
];
function fishEvCheck(){if(D||busy||SCENE||MG||FISHV||!$('#panel').hidden||AFF||S.walk)return;if(S.area!=='town'||roomAt(...tileOf(P))!=='lake')return;const fs=FS();if(fs.evDay===S.day)return;
  for(const e of FSEV){if(fs.ev[e.k])continue;if(!e.need(fs))continue;if(e.cond&&!xcond(e.cond))continue;fs.ev[e.k]=S.day;fs.evDay=S.day;
    playScene({title:e.t,sub:'호숫가 이야기'},null,[...xl(e.L(),null),xpts(e)],()=>{if(e.done)e.done(fs);diaryAdd('ev',{t:'호숫가 · '+e.t,k:null});save();hud();});return;}}
{const _ft=farmTick;farmTick=function(){_ft();if(Math.random()<.02)fishEvCheck();};}
{const _rk=recKnown;recKnown=function(k){const d=DISH[k];if(d&&d.jo)return (S.fishS&&S.fishS.jo||0)>=d.jo||!!(S.farm&&S.farm.rec[k]);return _rk(k);};}
{const _fx=farmFx;farmFx=function(cx,cy){_fx(cx,cy);fishFx(cx,cy,performance.now());};}
/* 수확제 작물 품평회 */
{const _fl=festLines;festLines=function(f){const L=_fl(f);if(f&&f.id==='harvest'&&S.farm&&S.farm.intro&&S.farm.judge!==S.day)
  L.push(R_('광장 한쪽 천막에 «작물 품평회» 깃발이 펄럭였다. 커다란 호박과 반들반들한 사과가 줄지어 있었다.'),C({t:'내 작물을 출품한다',r:[{fn:()=>{judgeCrop();return null;}}]},{t:'구경만 한다',r:[R_('한스 할아버지가 돋보기를 들고 호박마다 진지하게 들여다보았다.')]}));return L;};}
function judgeCrop(){const f=F();const ks=Object.keys(S.inv).filter(k=>S.inv[k]>0&&(ITEMS[k].crop||Object.values(CROPS).some(c=>c.out===k))).sort((a,b)=>ITEMS[b].p-ITEMS[a].p);
  if(!ks.length)return startDialog(null,[R_('……가방에 출품할 작물이 없다. 내년에는 꼭.'),G('한스 할아버지','허허, 내년엔 제일 큰 호박 들고 오시게.')]);
  const it=ks[0];S.inv[it]--;f.judge=S.day;const sc=ITEMS[it].p*(1+farmLvOf(f.xp)*.12)+Math.random()*6,rank=sc>=20?1:sc>=10?2:3,prize=[0,50,20,8][rank];S.coins+=prize;
  if(rank===1){S.inv.judge_ribbon=1;S.rep=Math.min(100,S.rep+4);}
  diaryAdd('note',`수확제 작물 품평회에 ${jo(ITEMS[it].n,'을','를')} 내서 ${['','금상','은상','동상'][rank]}을 받았다.`);
  startDialog(null,[R_(`${ITEMS[it].n}${jo(ITEMS[it].n,'을','를').slice(-1)} 품평회 탁자에 조심스레 올렸다.`),G('한스 할아버지',rank===1?'……허, 이건 성 텃밭 거라고? 흙이 좋아. 손이 좋고. 금상이네!':rank===2?'반듯하고 실하구먼. 은상이야.':'정성은 보이네. 동상! 내년엔 더 크게.'),
    ...(rank===1&&hearts('brant')>=2?[BR('h','하! 봤냐! 내 밭에서 나온 거다! ……아, 네 밭이지. 아무튼!')]:[]),R_(`(상금 ${money(prize)}${rank===1?' · 품평회 금상 리본':''})`)],()=>hud());}
function fishBook(){const fs=S.fishS;if(!fs)return '';const lv=fishLv(),nx=FLV2[lv];
  const hint=f=>`${f.s==='all'?'사계절':f.s.join('·')}${f.clear?' · 맑은 밤':f.t==='night'?' · 밤':f.t==='day'?' · 낮':''}${f.wx?' · 궂은 날':''}${f.lv>1?` · 솜씨 Lv.${f.lv}`:''}`;
  return `<div class="sub">낚시 수첩</div><div class="kv"><span>낚시 솜씨 <b>Lv.${lv}</b>${nx?` <small>(다음까지 ${nx-fs.xp})</small>`:' <small>(최고)</small>'} · 낚은 물고기 <b>${fs.n}</b></span></div>`
    +Object.entries(FT).map(([k,f])=>{const n=(S.fishK||{})[k];return `<div class="tw">${n?`${f.legend?'★ ':''}${ITEMS[k].n} ×${n}${fs.rec[k]?` · 최대 ${fs.rec[k]}cm`:''}`:`??? <small>(${hint(f)})</small>`}</div>`;}).join('');}
{const _b=bookHtml;bookHtml=function(){return _b()+fishBook();};}
