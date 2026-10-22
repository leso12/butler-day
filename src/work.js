/* ───────── 업무 ───────── */
const TASKS={
  tea:{name:'전하께 차 올리기',where:'본관 주방 화덕 → 전하께 전달',pay:9,hp:8,min:30,at:['keep',47,18],desc:'화덕에서 물을 끓여 차를 우리고, 찻쟁반을 전하께 직접 가져다 드려요.'},
  silver:{name:'은식기 닦기',where:'본관 주방 조리대',pay:7,hp:12,min:60,at:['keep',51,21],desc:'연회용 은식기를 얼룩 없이 닦아요.'},
  laundry:{name:'시트 빨래',where:'세탁장 빨래통',pay:7,hp:18,min:90,at:['wash',2,3],desc:'찬물에 시트를 빨아요. 체력이 많이 들어요.'},
  ledger:{name:'장부 정리',where:'본관 집무실 장부 책장',pay:11,hp:8,min:60,at:['keep',12,3],desc:'창고 재고를 장부와 맞춰요. 틀리면 전하께 들켜요.'},
  papers:{name:'서류 검토',where:'부집사의 방 책상',pay:8,hp:6,min:90,at:['keep',3,18],desc:'영수증·근무표·비품 목록을 검토해요. 미니게임 없이 진행되고, 끝나면 시간이 훌쩍 지나요.'},
  deco:{name:'연회장 장식',where:'동쪽 별관 연회장 기둥',pay:8,hp:12,min:90,at:['annex',9,3],desc:'연회를 위해 대리석 기둥마다 꽃 화환을 달아요.'},
  wood:{name:'장작 나르기',where:'마당 장작더미 → 본관 주방 화덕',pay:8,hp:14,min:40,at:['castle',39,18],desc:'마당 장작더미에서 장작을 안고 주방 화덕까지 옮겨요. 드는 동안 걸음이 느려져요.'},
};
function targets(){
  const out=[];
  for(const t of S.tasks){if(t.done)continue;
    if(t.id==='tea'&&S.carry==='tea'){const k=npcs.find(n=>n.id==='kairan');out.push({area:k.area,px:k.x,py:k.y-30,id:t.id,label:'전하께 차 전달'});continue;}
    if(t.id==='wood'&&S.carry==='wood'){out.push({area:'keep',px:47*T+16,py:18*T-10,id:t.id,label:'화덕에 장작'});continue;}
    if(S.carry&&t.id!==({tea:'tea',wood:'wood'})[S.carry])continue;
    const [ar,x,y]=TASKS[t.id].at;out.push({area:ar,px:x*T+8,py:y*T-10,id:t.id,label:TASKS[t.id].name});}
  return out;
}
function rollTasks(){
  S.earned=0;if(isSunday()){S.tasks=[];return;}
  const ids=Object.keys(TASKS).filter(k=>k!=='deco');const pick=['tea'];if(S.day>=38&&S.day<=41)pick.push('deco');
  while(pick.length<3){const k=ids[Math.floor(Math.random()*ids.length)];if(!pick.includes(k))pick.push(k);}
  S.tasks=pick.map(id=>({id,done:false,grade:''}));S.earned=0;
}
const task=id=>S.tasks.find(t=>t.id===id&&!t.done);
const GRADE=s=>s>=.85?['완벽',1.5,3]:s>=.5?['좋음',1,1]:['아쉬움',.5,-1];
function finishTask(id,score,extra){
  const t=S.tasks.find(t=>t.id===id);if(!t||t.done)return;
  const [g,mul,rep]=GRADE(score),def=TASKS[id],pay=rep;
  void pay;
  t.done=true;t.grade=g;diaryAdd('task',[def.name,g]);S.week+=1;S.earned+=1;S.rep=Math.max(0,Math.min(100,S.rep+rep));S.doneTotal++;
  hud();timeSkip();toast(`${def.name} · ${g} · ⏱ ${def.min}분 <i>평판 ${rep>0?'+':''}${rep}</i>`);
  const left=S.tasks.filter(t=>!t.done).length;
  if(!left)setTimeout(()=>toast('오늘 업무 끝! <i>남은 시간은 자유</i>'),1900);
  save();
}
function spend(id){
  const def=TASKS[id];
  if(S.hp<def.hp){startDialog(null,[R_('몸이 천근만근이다. 이 상태로는 무리다. 오늘은 쉬어야겠다.')]);return false;}
  S.hp-=def.hp;S.min=Math.min(1439,S.min+def.min);hud();return true;
}
const WAGE=()=>S.rep<25?S.wage-1:S.wage;
const REPT=()=>S.rep>=70?2:S.rep>=40?1:0, REPN=['미덥잖음','보통','신뢰'];
/* 미니게임 */
let MG=null;
function mgOpen(o){MG=o;MG.t=0;$('#mg').hidden=false;o.init();}
function mgClose(score){const o=MG;MG=null;$('#mg').hidden=true;o.done(score);}
function mgTiming(title,desc,cb){
  mgOpen({init(){this.pos=0;this.v=1.15;this.z=[.58,.80];this.pz=[.66,.72];
      $('#mg').innerHTML=`<h3>${title}<small>타이밍</small></h3><p>${desc}</p><div class="mbar"><div class="zone" style="left:${this.z[0]*100}%;width:${(this.z[1]-this.z[0])*100}%"></div><div class="zone p" style="left:${this.pz[0]*100}%;width:${(this.pz[1]-this.pz[0])*100}%"></div><div class="mk" id="mgk"></div></div><div class="mhint">진한 칸에서 [확인]</div>`;},
    tick(dt){this.pos+=this.v*dt;if(this.pos>1){this.pos=2-this.pos;this.v*=-1;}if(this.pos<0){this.pos=-this.pos;this.v*=-1;}$('#mgk').style.left=(this.pos*100)+'%';},
    press(){const c=.69,d=Math.abs(this.pos-c);mgClose(Math.max(0,1-d/.2));},done:cb});
}
function mgMash(title,desc,cb){
  mgOpen({init(){this.v=0;this.lim=6;
      $('#mg').innerHTML=`<h3>${title}<small>연타</small></h3><p>${desc}</p><div class="mbar"><div class="fillb" id="mgf"></div></div><div class="mtime"><i id="mgt"></i></div><div class="mhint">[확인]을 빠르게 연타</div>`;},
    tick(dt){this.t+=dt;this.v=Math.max(0,this.v-dt*.16);$('#mgf').style.width=(this.v*100)+'%';$('#mgt').style.width=Math.max(0,100-this.t/this.lim*100)+'%';
      if(this.v>=1)mgClose(Math.max(.5,1-this.t/this.lim*.6));else if(this.t>=this.lim)mgClose(this.v*.6);},
    press(){this.v=Math.min(1,this.v+.075);},done:cb});
}
function mgRub(title,desc,cb){
  mgOpen({init(){this.n=0;this.last='';this.need=22;this.lim=7;
      $('#mg').innerHTML=`<h3>${title}<small>문지르기</small></h3><p>${desc}</p><div class="mbar"><div class="fillb" id="mgf" style="background:#c9ccd4"></div></div><div class="mtime"><i id="mgt"></i></div><div class="mhint">◀ ▶ 를 번갈아 누르기</div>`;},
    tick(dt){this.t+=dt;$('#mgf').style.width=(this.n/this.need*100)+'%';$('#mgt').style.width=Math.max(0,100-this.t/this.lim*100)+'%';
      if(this.n>=this.need)mgClose(Math.max(.5,1-this.t/this.lim*.55));else if(this.t>=this.lim)mgClose(this.n/this.need*.6);},
    dir(d){if((d==='l'||d==='r')&&d!==this.last){this.last=d;this.n++;}},press(){},done:cb});
}
function mgMath(title,desc,cb){
  const items=['밀가루 포대','장작 묶음','양초 상자','와인 병','감자 자루'];
  mgOpen({init(){this.q=0;this.ok=0;this.next();},
    next(){if(this.q>=3){mgClose(this.ok/3);return;}
      const a=3+Math.floor(Math.random()*17),b=2+Math.floor(Math.random()*14),sub=Math.random()<.4&&a>b,ans=sub?a-b:a+b,it=items[Math.floor(Math.random()*items.length)];
      const opts=[ans,ans+(Math.random()<.5?1:-1)*(1+Math.floor(Math.random()*3)),ans+(Math.random()<.5?10:-2)].filter((v,i,a)=>v>0&&a.indexOf(v)===i);while(opts.length<3)opts.push(ans+opts.length+3);
      opts.sort(()=>Math.random()-.5);this.ans=ans;this.opts=opts;this.sel=0;this.t=0;this.q++;
      $('#mg').innerHTML=`<h3>${title}<small>${this.q} / 3</small></h3><p>${desc}</p><div class="mbig">${it} ${a} ${sub?'−':'+'} ${b} = ?</div><div class="mopts">${opts.map((v,i)=>`<button data-i="${i}" class="${i?'':'sel'}">${v}</button>`).join('')}</div><div class="mtime"><i id="mgt"></i></div>`;
      $('#mg').querySelectorAll('.mopts button').forEach(b=>b.onclick=e=>{e.stopPropagation();this.pick(+b.dataset.i);});},
    pick(i){if(this.opts[i]===this.ans)this.ok++;this.next();},
    tick(dt){this.t+=dt;const el=$('#mgt');if(el)el.style.width=Math.max(0,100-this.t/9*100)+'%';if(this.t>=9)this.next();},
    dir(d){if(d==='l'||d==='r'){this.sel=(this.sel+(d==='r'?1:2))%3;$('#mg').querySelectorAll('.mopts button').forEach((b,i)=>b.classList.toggle('sel',i===this.sel));}},
    press(){this.pick(this.sel);},done:cb});
}
/* 업무 상호작용: true면 처리됨 */
function workAt(tx,ty,o){
  const it=o&&o.it;
  if(it==='mydesk'){deskWork();return true;}
  if(it==='pillar'&&task('deco')){if(!spend('deco'))return true;
    mgRub('연회장 장식','기둥마다 꽃 화환을 단다. 연회 손님들이 보실 자리다.',sc=>{finishTask('deco',sc);startDialog(null,[R_(sc>=.85?'연회장이 꽃 정원처럼 바뀌었다.':'화환이 조금 삐뚤다. 그래도 화사하다.')]);});return true;}
  if(it==='stove'){
    if(S.carry==='wood'&&task('wood')){S.carry=null;finishTask('wood',1);startDialog(null,[R_('화덕 옆에 장작을 차곡차곡 쌓았다. 팔이 저릿하다.')]);return true;}
    if(task('tea')&&!S.carry){if(!spend('tea'))return true;
      mgTiming('차 내기','물이 끓기 직전에 주전자를 내려야 한다. 전하께서는 너무 뜨거운 차를 싫어하신다.',sc=>{S.carry='tea';S.teaQ=sc;
        startDialog(null,[R_(sc>=.85?'완벽한 온도다. 찻잎이 고르게 풀렸다.':sc>=.5?'나쁘지 않다. 이 정도면 괜찮겠지.':'…조금 애매하다. 그래도 식기 전에 가져가자.'),R_('찻쟁반을 들었다. 전하께 가져가자.')]);hud();});return true;}
  }
  if(it==='prep'&&task('silver')){if(!spend('silver'))return true;
    mgRub('은식기 닦기','연회용 은식기다. 얼룩 하나 없이 반짝여야 한다.'+(S.f.silverTip?' (에드먼드의 비법: 조금 쉬워졌다)':''),sc=>{if(S.f.silverTip)sc=Math.min(1,sc+.15);finishTask('silver',sc);startDialog(null,[R_(sc>=.85?'은식기에 얼굴이 비칠 정도다.':'그럭저럭 반짝인다.')]);});return true;}
  if(it==='washtub'&&task('laundry')){if(!spend('laundry'))return true;
    mgMash('시트 빨래','찬물에 시트를 담갔다. 빨래판에 힘껏 비벼야 한다.',sc=>{finishTask('laundry',sc);startDialog(null,[R_(sc>=.85?'새하얗게 빨렸다. 마르타님이 보면 칭찬하실지도.':'손이 빨갛게 얼었다. 그래도 끝났다.')]);});return true;}
  if(it==='ledgers'&&task('ledger')){if(!spend('ledger'))return true;
    mgMath('장부 정리','창고 재고를 장부와 맞춰야 한다. 틀리면 전하께 바로 들킨다.',sc=>{finishTask('ledger',sc);startDialog(null,[R_(sc>=.85?'숫자가 한 줄도 어긋나지 않았다.':sc>=.5?'한두 군데 고쳐 적었다.':'…지운 자국이 많다. 전하께서 보시면 미간을 찌푸리시겠지.')]);});return true;}
  if(it==='woodpile'&&task('wood')&&!S.carry){if(!spend('wood'))return true;
    S.carry='wood';startDialog(null,[R_('장작 한 아름을 안아 들었다. 무겁다. 본관 주방 화덕까지 옮기자. (뒷문이 가깝다)')]);hud();return true;}
  return false;
}
function deliverTea(n){
  const q=S.teaQ||0;S.carry=null;finishTask('tea',q);
  const lines=q>=.85?[N('n','…'),R_('카이런이 찻잔을 들어 한 모금 마시고, 잠시 멈췄다.'),N('h','온도가 딱 좋군.')]
    :q>=.5?[N('n','두고 가.'),R_('펜을 놓지 않은 채였지만, 찻잔은 금세 반쯤 비었다.')]
    :[N('a','…식었군. 아니, 뜨겁군. 둘 다인가.'),M('s','죄, 죄송합니다, 전하!')];
  addPts('kairan',(q>=.85?20:q>=.5?10:3)+(REPT()===2?5:0));startDialog('kairan',lines);
}

/* 가구·사물 설명 */
const OBJTXT={
  kbed:'전하의 침대. 시트가 한 치 흐트러짐 없이 정돈되어 있다. …여기서 주무시는구나.',kdresser:'은빛 빗과 커프스 단추 몇 개. 놀랄 만큼 소박하다.',kwardrobe:'옷장이다. 함부로 열면 안 된다.',
  kdesk:'전하의 책상. 결재 서류가 산더미다. 함부로 보면 안 된다.',ledgers:'두꺼운 장부가 빼곡하다. 아르젠트 대공가의 영지 회계 기록이다.',books:'북부 영지의 역사서와 마법 이론서가 천장까지 꽂혀 있다.',
  teatable:'손님 접대용 찻상. 찻잔이 반짝인다.',piano:'건반 하나를 눌러 보았다. 조율이 조금 어긋나 있다.',gbed:'손님용 침대. 리넨에서 라벤더 향이 난다.',
  mywardrobe:'여벌 셔츠와 조끼. 그리고 맨 안쪽엔… 집에서 들고 나온 드레스 한 벌.',chess:'체스판. 말 하나가 반쯤 기울어져 있다. 누군가 두다 만 판이다.',mychest:'남부에서 가져온 작은 상자. 어머니의 손수건이 들어 있다.',
  diaries:'에드먼드님의 업무 일지. 삼십 년 치가 빼곡하다.',edesk:'정갈하게 정리된 집사의 책상. 다음 주 일정표가 펼쳐져 있다.',ibed:'의무실 침대. 소독약 냄새가 난다.',medcab:'붕대, 연고, 해열제. 붕대는… 조금 빌려 가도 될까.',
  stairs:'2층은 전하의 사적인 공간이다. 부집사라도 함부로 오르지 않는다.',dishes:'은식기와 도자기 그릇이 가지런하다.',dtable:'스무 명은 앉을 수 있는 긴 식탁. 전하는 늘 혼자 상석에 앉으신다.',
  stove:'화덕 불이 활활 타오른다. 냄비에서 스튜가 끓고 있다.',sink:'설거지물이 아직 따뜻하다.',prep:'갓 구운 빵이 식고 있다. 하나쯤은… 아니, 브란트님께 혼난다.',storage:'겨울을 날 식료품과 장작 재고가 쌓여 있다.',
  jars:'절인 채소와 잼 병이 줄지어 있다.',potato:'멀쩡한 감자, 싹이 돋은 감자, 그리고 감자였던 시절을 포기한 무언가.',pledger:'창고 재고 장부. 첫날 그 장부다.',wine:'먼지 쌓인 와인병들. 라벨이 거의 지워졌다.',
  mbed:'마르타의 침대. 뜨개 담요가 덮여 있다.',tbed:'팀의 작은 간이침대. 나무 칼이 베개 옆에 있다.',bunk:'이층 침대. 이불이 아무렇게나 개켜져 있다.',yarn:'털실 바구니. 짙은 남색 실이 가장 많다.',
  washtub:'빨래통에 찬물이 가득하다.',fold:'갠 시트가 차곡차곡 쌓여 있다.',pillar:'대리석 기둥. 연회 날엔 여기에 꽃 화환을 단다.',buffet:'연회용 긴 탁자. 지금은 비어 있다.',
  herbs:'온실 화단. 허브 향이 진하다.',gtable:'햇살이 드는 작은 탁자. 두 사람이 앉기 딱 좋다.',rbed:'로웬의 침대. 의외로 잘 정돈되어 있다.',weapons:'날이 잘 선 검들이 가지런하다.',whet:'숫돌과 기름 천. 기사들의 작업대다.',
  warhorse:'전하의 군마. 검은 털이 윤기 난다. 콧김을 훅 뿜었다.',horse:'순한 눈의 말이 고개를 갸웃했다.',woodpile:'장작 더미. 겨울을 대비해 차곡차곡 쌓여 있다.',basket:'빨래 바구니.',
  gazebo:'정원 정자. 덩굴장미가 지붕을 타고 오른다.',statue:'선대 대공의 석상. 눈매가 전하와 닮았다.',goods:'양초, 비누, 실, 단추… 없는 게 없다.',hdesk:'하겐의 책상. 금장 펜과 두꺼운 계약서.',safe:'굳게 잠긴 금고.',hledger:'상회 장부. …숫자가 수상하다.',
  oven:'벽돌 화덕에서 빵 굽는 냄새가 난다.',mirror:'거울 속 에렌이 어색하게 웃는다.',teaset:'찻잔 세트가 반짝인다.',bar:'반들반들한 원목 바. 맥주잔 자국이 가득하다.',counter:null,
};
function objText(o){if(!o||!o.it)return null;const t=OBJTXT[o.it];return t?[R_(t)]:null;}
