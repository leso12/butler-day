// ===== 기존 일상 대사 LINES =====
const LINES={
 kairan:{
  t:[
   [[M('n','좋은 아침입니다, 전하. 오늘 일정 보고 드리겠습니다.'),N('n','됐다. 책상 위에 두고 가.'),R_('펜 끝이 종이를 긁는 소리만 들렸다. 고개 한 번 들지 않았다.')],
    [N('n','…차가 식었다.'),M('s','저, 전하! 바로 새로 내오겠습니다!'),N('n','뛰지 마라. 복도에서 넘어지면 그게 더 귀찮다.')],
    [N('n','창밖은 왜 그렇게 보고 있지.'),C({t:'비가 올 것 같아서요.',p:15,r:[N('n','북부 비는 금방 그치지 않는다. 저장고 습기부터 확인해 둬라.'),M('h','네, 전하. 바로 확인하겠습니다.')]},
      {t:'전하를 보고 있었는데요.',p:5,r:[N('a','…헛소리할 시간에 서류나 넘겨.'),R_('그런데 왜인지, 그의 귀 끝이 조금 붉었다.')]},
      {t:'죄송합니다! 일하겠습니다!',p:0,r:[N('n','그래.')]})]],
   [[N('n','에렌.'),M('s','네, 네엣! 부르셨습니까, 전하?'),N('n','…군용 연고다. 손 튼 거 보기 싫다. 가져가.'),M('b','저, 저한테 주시는 겁니까?'),N('a','두 번 말하게 하지 마라.')],
    [M('n','전하, 오늘은 좀 쉬시는 게 어떻겠습니까? 사흘째 서재 불이 꺼지질 않았습니다.'),N('n','세고 있었나.'),M('b','그, 그게… 부집사로서 당연한 업무 파악이었습니다!'),N('h','…그렇군. 업무 파악.')],
    [N('n','저녁엔 정원에 나가 있겠다. 급한 일 아니면 찾지 마라.'),R_('…급한 일이 아니어도 찾아오라는 말처럼 들린 건 기분 탓일까.')],
    [N('n','하겐 상회 건, 네가 처리했다고 들었다.'),C({t:'전하 이름에 먹칠할 순 없으니까요.',p:20,r:[N('h','…잘했다.'),R_('짧은 한마디였는데, 이상하게 하루 종일 그 말이 귓가에 남았다.')]},
      {t:'수당 올려 주시는 겁니까?',p:10,r:[N('n','뻔뻔해졌군.'),N('h','…생각해 보지.')]})]],
   [[N('n','둘만 있을 땐 전하라고 부르지 않기로 하지 않았나.'),M('b','아, 아직 입에 안 붙어서요… 카, 카이런….'),N('h','그래, 에레나.'),R_('낮고 건조한 목소리인데, 이름을 부를 때만은 이상하게 부드러웠다.')],
    [N('n','손.'),M('s','네?'),N('n','또 찬물로 빨래 거들었지. 손이 다 텄다.'),R_('그가 장갑 한 짝을 벗어 그녀의 손에 툭 끼워 주었다. 장갑 안이 아직 따뜻했다.'),M('b','…감사합니다.')],
    [N('n','다음 영지 시찰에 동행해라.'),M('s','저, 저는 부집사인데요?'),N('n','그러니까. 부집사로서 내 옆에서 장부를 보라는 거다. 다른 뜻은….'),R_('그는 말을 잇지 않았다.'),
     C({t:'다른 뜻은 뭔데요?',p:20,r:[N('a','…묻지 마라.'),R_('카이런이 고개를 돌렸다. 창에 비친 얼굴이 웃고 있었다.')]},{t:'따르겠습니다, 전하.',p:10,r:[N('n','그래.')]})]]
  ],
  rep:[[N('n','아직 할 말이 남았나.')],[N('n','…또 왔군. 차라도 내와.')],[N('h','또 왔군.'),R_('그는 쓰던 펜을 내려놓았다.')]]
 },
 roewen:{
  t:[
   [[N('h','어이, 꼬마! 오늘도 전하한테 혼나러 가냐?'),M('a','혼나러 가는 게 아니라 보고하러 가는 겁니다, 단장님.'),N('h','그게 그거지.')],
    [N('n','팔뚝이 그게 뭐냐. 검 한 번 들어 볼래?'),M('s','사, 사양하겠습니다!'),N('h','하하! 겁먹은 얼굴은 확실히 꼬마네.')],
    [N('n','부집사님~ 혹시 주방에 남는 고기파이 없나?'),C({t:'브란트님께 여쭤볼게요.',p:15,r:[N('h','역시 우리 에렌! 의리 있네.')]},{t:'단장님 몫은 아침에 다 드셨잖아요.',p:5,r:[N('a','…야, 그걸 세고 있었냐?')]})]],
   [[N('n','전하가 요새 이상하게 표정이 풀렸어. 너 뭐 했냐?'),M('b','아, 아무것도 안 했습니다!'),N('h','흐음~ 아무것도?')],
    [N('n','에렌. 무슨 일 있으면 나한테 먼저 말해.'),N('h','…전하한텐 비밀로 해 줄 테니까.'),M('h','단장님이 비밀을 지킨다고요? 그게 더 무섭네요.')],
    [N('a','브란트한테 또 쫓겨났다. 국자로 맞았어, 국자로.'),M('h','몰래 드시다 걸리셨죠?'),N('n','…몰래는 아니었다. 아마도.')]],
   [[N('n','꼬마. 너 요즘 웃는 얼굴이 많아졌다.'),N('h','보기 좋네. 누구 덕인지는 안 물어볼게.')]]
  ],
  rep:[[N('h','또 왔냐? 나 보고 싶었구나?'),M('a','…지나가던 길입니다.')]]
 },
 brant:{
  t:[
   [[N('h','부집사님, 오셨어요? 마침 수프 간 좀 봐 주시겠어요?'),M('h','…맛있어요, 브란트님. 조금 짠 것만 빼면요.'),N('a','역시. 단장님이 소금통을 또 엎으셨거든요.')],
    [N('n','오늘 저녁은 전하께서 좋아하시는 양고기 스튜예요.'),M('s','전하께서 좋아하시는 게 있었어요?'),N('h','남기지 않으시는 게 좋아하신다는 뜻이랍니다.')],
    [N('n','부집사님, 점심은 드셨어요?'),C({t:'아직이요….',p:15,r:[N('a','그럴 줄 알았어요. 앉으세요, 당장.'),R_('김이 오르는 빵이 눈앞에 놓였다.')]},{t:'먹었어요!',p:5,r:[N('n','…배에서 소리 나는데요.')]})]],
   [[N('h','에렌, 이거 맛 좀 봐. 새로 만든 꿀과자야.'),M('h','와… 브란트님, 이거 정말 맛있어요!'),N('h','그치? 전하 몫은 빼놓을 거니까 너도 하나만 더 먹어.')],
    [N('n','너 요새 너무 말랐어. 그러다 쓰러진다.'),M('n','괜찮아요. 일이 좀 많아서 그래요.'),N('a','괜찮긴. 오늘은 내가 남겨 둔 거 다 먹고 가.')]],
   [[N('h','에렌, 전하가 오늘 디저트를 두 개 달라셨어. 하나는 누구 거게?'),M('b','…모, 모르겠는데요.')]]
  ],
  rep:[[N('n','불 앞에선 조심해요. 소매 걷고 다니세요.')],[N('h','또 배고파? 빵 하나 들고 가.')]]
 },
 marta:{
  t:[
   [[N('a','애송이! 셔츠 깃이 또 삐뚤어졌잖아.'),M('s','아, 하녀장님! 지금 바로 고치겠습니다.'),N('h','이리 와. 해 줄 테니까. 쯧, 손이 이렇게 서툴러서야.')],
    [N('h','꼬맹이, 오늘은 시트 빨래 날이야. 소매 걷어!'),M('n','네, 마르타 님.')],
    [N('n','너 말이야, 잠은 제대로 자는 거냐?'),C({t:'네, 푹 잡니다!',p:5,r:[N('a','눈 밑이 거뭇한데 거짓말은.')]},{t:'사실 요즘 좀 못 잤어요.',p:15,r:[N('h','솔직해서 좋네. 오늘 밤엔 베개 밑에 라벤더 주머니 넣어 줄게.')]})]],
   [[N('n','꼬맹이. 너 어디 귀한 집 출신이지?'),M('s','네, 네?! 아, 아닌데요!'),N('h','하하! 찻잔 드는 손이 너무 곱더라. 걱정 마, 아무한테도 말 안 해.')],
    [N('h','전하가 너한테 연고 줬다며? 그거 원래 기사단 보급품이야. 별일이네.'),M('b','…잘 바르고 있어요.')]]
  ],
  rep:[[N('n','바쁘다, 바빠! 할 말 있으면 손이라도 움직이면서 해.')]]
 },
 edmund:{
  t:[
   [[N('n','좋은 아침입니다, 부집사님. 오늘 은식기 닦기는 오전 중에 부탁드립니다.'),M('n','네, 집사님. 맡겨 주세요.')],
    [N('h','부집사님 덕분에 전하의 식사 시간이 조금 규칙적이 되셨습니다.'),M('s','제, 제가요?'),N('h','예. 이 늙은이가 삼십 년 동안 못 한 일이지요.')],
    [N('n','부집사님, 차를 내실 때 물 온도는 어떻게 하십니까?'),C({t:'끓기 직전에 불을 끕니다.',p:15,r:[N('h','훌륭합니다. 전하께서는 너무 뜨거운 걸 싫어하시지요.')]},{t:'팔팔 끓여야죠!',p:5,r:[N('n','…다음번엔 제가 옆에서 보겠습니다.')]})]],
   [[N('n','에렌님. 전하께서는 어릴 적에 잘 웃는 분이셨습니다.'),N('h','요즘 그 얼굴이 가끔 보이는군요.')]]
  ],
  rep:[[N('n','복도에서는 뛰지 마십시오, 부집사님.')]]
 },
 tim:{
  t:[
   [[N('h','에렌 형! 분수에 동전 던지면 소원 이뤄진대요!'),M('h','그래? 팀은 무슨 소원 빌 거야?'),N('h','비밀이에요! …형이 계속 여기 있게 해 달라고 할 거예요.')],
    [N('n','형, 대공 전하는 왜 맨날 무서운 얼굴이에요?'),M('h','음… 사실 안 무서운 분이야. 표정이 좀 서툰 거지.'),N('s','표정도 서툴 수 있어요?')],
    [N('n','형, 나 글자 배우고 싶어요.'),C({t:'좋아, 저녁마다 같이 하자.',p:20,r:[N('h','진짜요?! 약속이에요, 형!')]},{t:'이번 주는 바빠서… 다음에.',p:0,r:[N('n','…네.')]})]],
   [[N('h','형! 나 오늘 처음으로 내 이름 썼어요!'),M('h','우와, 팀 대단하다!')]]
  ],
  rep:[[N('h','형, 이따 또 놀아 줘요!')]]
 }
};
const EVENTS={
 k3:[R_('— 서재의 촛불 —'),R_('장대비가 내리는 오후. 하늘이 어두워 서재엔 촛불이 켜져 있었다. 카이런은 서류 더미에 이마를 짚고 있었다.'),
  M('n','전하, 따뜻한 우유 가져왔습니다. 브란트님이 꿀도 넣어 주셨어요.'),N('n','…애도 아니고.'),M('h','애들만 마시라는 법은 없습니다.'),
  R_('그가 잔을 받아 들었다. 한 모금. 그리고 또 한 모금.'),N('n','…달다.'),
  C({t:'맛있다는 뜻으로 듣겠습니다.',p:30,r:[N('h','마음대로 해석해라.'),R_('잔은 끝까지 비워져 있었다.')]},{t:'입에 안 맞으시면 치우겠습니다.',p:10,r:[N('n','놔둬.')]})],
 k6:[R_('— 여름밤의 정원 —'),R_('늦은 밤, 정원. 반딧불이 몇 마리가 분수 위를 떠다녔다. 에레나는 저도 모르게 손을 뻗었다.'),N('n','안 잡힌다.'),
  M('s','전하! 언제부터 계셨습니까?'),N('n','네가 바보처럼 웃기 시작했을 때부터.'),M('a','바, 바보라뇨!'),
  R_('밤바람이 서늘했다. 카이런이 제 겉옷을 벗어 그녀의 어깨에 둘렀다.'),N('h','…이렇게 보니 정말 작군.'),
  C({t:'전하가 크신 거예요.',p:30,r:[N('h','그런가.'),R_('반딧불이 다 흩어질 때까지 둘은 그렇게 서 있었다.')]},{t:'(겉옷을 꼭 여민다)',p:40,r:[R_('옷깃에서 서재의 잉크 냄새가 났다.'),N('b','…들어가자, 에렌.')]})],
};

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
  S.earned=0;if(isSunday()||festToday()||(S.wed&&S.wed.day===S.day&&!S.wed.done)){S.tasks=[];return;}
  if(S.injury>0){S.tasks=[{id:'papers',done:false,grade:''}];return;}
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
/* ───────── 콘텐츠: 아이템 · 선물 · 이벤트 · 약속 · 스토리 · 엔딩 ───────── */
const X=(w,e,t)=>({s:'npc',w,e,t}), G=(nm,t)=>({s:'gst',nm,t});
const SEASON=['겨울','봄','여름','가을'];
const MONTHS=[7,8,9,10,11,12,1,2,3,4,5,6];
const dateOf=d=>{const mi=Math.floor((d-1)/28)%12,m=MONTHS[mi];return {month:m,season:m>=3&&m<=5?'봄':m>=6&&m<=8?'여름':m>=9&&m<=11?'가을':'겨울',date:((d-1)%28)+1,year:Math.floor((d-1)/336)+1,wd:(d-1)%7,label:`${m}월 ${((d-1)%28)+1}일`};};
const isSunday=()=>dateOf(S.day).wd===6, isFriday=()=>dateOf(S.day).wd===4;
const money=v=>{const g=Math.floor(v/10),s=v%10;return g&&s?`${g}골드 ${s}은화`:g?`${g}골드`:`${s}은화`;};

/* 아이템 (가격: 은화, 10은화 = 1골드) */
const ITEMS={
  tea_leaf:{n:'홍차 잎',p:8,d:'북부에서 귀한 남부산 찻잎.'},
  ink_pen:{n:'잉크와 깃펜',p:12,d:'은촉 깃펜과 검은 잉크 한 병.'},
  candle:{n:'향초',p:6,d:'백단향이 은은한 초.'},
  yarn:{n:'뜨개실',p:5,d:'부드러운 양모 실 한 타래.'},
  candy:{n:'사탕 봉지',p:2,d:'알록달록한 과일 사탕.'},
  gloves:{n:'털장갑',p:15,d:'안감에 토끼털을 댄 장갑.'},
  chess:{n:'체스 말 세트',p:25,d:'흑단과 상아로 깎은 체스 말.'},
  bandage:{n:'붕대',p:3,tool:1,d:'남장용 붕대. 하루 1번 고쳐 맬 수 있어요.'},
  wildflower:{n:'들꽃 다발',p:4,d:'눈 속에서 핀 작은 들꽃.'},
  rose:{n:'붉은 장미',p:9,d:'온실에서 키운 붉은 장미.'},
  lavender:{n:'라벤더 주머니',p:5,d:'베개 밑에 두면 잠이 잘 온다.'},
  poem:{n:'시집 «북녘의 별»',p:12,d:'북부 시인의 서정 시집.'},
  picture_book:{n:'그림책',p:7,d:'용과 기사가 나오는 그림책.'},
  sword_book:{n:'검술 교본',p:14,d:'제국 기사단식 검술 해설서.'},
  novel:{n:'연애소설 «달빛 무도회»',p:10,d:'요즘 하녀들 사이에서 유행하는 소설.'},
  bread:{n:'갓 구운 빵',p:2,food:30,d:'먹으면 체력 +30.'},
  cookie:{n:'꿀과자',p:3,food:10,d:'먹으면 체력 +10. 선물로도 좋다.'},
  meat_pie:{n:'고기파이',p:5,food:40,d:'먹으면 체력 +40. 로웬님이 사랑하는 맛.'},
  cider:{n:'사과주',p:4,d:'달콤한 북부 사과주.'},
  silver_button:{n:'은 단추',p:10,d:'잘 세공된 은 단추 한 쌍.'},
  ribbon:{n:'비단 리본',p:6,d:'연분홍 비단 리본.'},
  spice:{n:'향신료 상자',p:9,d:'남부 상인이 가져온 향신료.'},
  dried_fruit:{n:'말린 과일',p:4,d:'무화과와 살구를 말린 것.'},
  scarf:{n:'손뜨개 목도리',p:0,d:'마르타님께 배워 직접 뜬 목도리. 서툴지만 따뜻하다.'},
  watch:{n:'에드먼드의 회중시계',p:0,key:1,d:'삼십 년 동안 대공가의 시간을 지켜 온 시계.'},
  tim_letter:{n:'팀의 편지',p:0,key:1,d:'삐뚤빼뚤한 글씨로 "에렌 형에게".'},
};
const SHOPS={
  gen:{name:'모리스 잡화점',open:[9,19],items:['tea_leaf','ink_pen','candle','yarn','candy','gloves','chess','bandage'],hi:'어서 오시오. 성에서 오셨구먼. 천천히 보시게.'},
  flower:{name:'꽃집 «북녘정원»',open:[9,18],items:['wildflower','rose','lavender'],hi:'북부에도 꽃은 피어요. 누구에게 주실 건가요?'},
  book:{name:'서점 «잉크와 양피지»',open:[10,19],items:['poem','picture_book','sword_book','novel'],hi:'…조용히 둘러보세요.'},
  bakery:{name:'빵집 «황금 밀»',open:[7,17],items:['bread','cookie','meat_pie'],hi:'방금 나온 빵이 있어요! 따끈따끈해요.'},
  tailor:{name:'양장점 «로즈»',open:[10,18],items:['silver_button','ribbon'],hi:'어머, 귀여운 부집사님이네. 단추 하나라도 보고 가요.'},
  tavern:{name:'선술집 «검은 곰»',open:[17,24],items:['cider'],service:'drink',hi:'어이, 성 사람이로군! 한잔하고 가!'},
  tea:{name:'찻집 «은빛 주전자»',open:[10,20],items:[],service:'rest',hi:'따뜻한 차 한 잔 하고 가세요.'},
  market:{name:'일요 시장',open:[8,14],sun:1,items:['spice','dried_fruit','wildflower','candy'],hi:'일요일에만 서는 시장이요! 남부 물건도 있소!'},
  hagen:{name:'하겐 상회',open:[9,18],closed:'두꺼운 문이 굳게 닫혀 있다. «거래는 예약제»라는 팻말이 걸려 있다.'},
};

/* 선물 취향 */
const PREF={
  kairan:{love:['tea_leaf','ink_pen','chess','scarf'],like:['poem','candle','gloves','rose'],dis:['candy','cookie','cider','picture_book']},
  roewen:{love:['meat_pie','cider','sword_book'],like:['bread','gloves','dried_fruit'],dis:['poem','candle','lavender','novel']},
  edmund:{love:['tea_leaf','silver_button'],like:['poem','ink_pen','candle','chess'],dis:['candy','cider','sword_book']},
  marta:{love:['yarn','rose','novel'],like:['lavender','tea_leaf','ribbon','cookie','wildflower'],dis:['sword_book','chess']},
  brant:{love:['spice','dried_fruit'],like:['novel','lavender','ribbon','rose','wildflower'],dis:['bread','meat_pie','cookie']},
  tim:{love:['candy','picture_book','cookie'],like:['meat_pie','gloves','bread','wildflower'],dis:['cider','poem','ink_pen']},
};
// ===== GIFT_LINES =====
const GIFT_LINES={
  kairan:{love:[N('b','…이걸 어떻게 알았지.'),R_('카이런은 선물을 한참 내려다보다가, 아주 작게 고개를 끄덕였다.')],like:[N('n','쓸 데가 있겠군. 두고 가라.')],neu:[N('n','…그래.')],dis:[N('a','이런 건 필요 없다.'),M('s','죄, 죄송합니다, 전하!')],bday:[N('b','…에드먼드가 말했나. 생일 같은 건 챙기지 않는다고 했을 텐데.'),R_('하지만 그는 선물을 서랍이 아니라 책상 위, 손 닿는 곳에 두었다.')]},
  roewen:{love:[N('h','오오! 꼬마, 너 진짜 뭘 좀 아는구나!'),R_('로웬이 에렌의 머리를 마구 헝클었다.')],like:[N('h','고맙다, 꼬마. 잘 쓸게.')],neu:[N('n','음? 나한테? 그래, 고맙다.')],dis:[N('a','…이걸 나보고 어쩌라고. 마음만 받을게, 꼬마.')],bday:[N('h','내 생일을 기억했어? 이거 감동인데. 오늘 술은 내가 산다!')]},
  edmund:{love:[N('h','이런, 이 늙은이 취향을 어찌 아셨습니까. 귀하게 쓰겠습니다, 부집사님.')],like:[N('h','감사합니다, 부집사님.')],neu:[N('n','마음 써 주셔서 감사합니다.')],dis:[N('n','…마음만 감사히 받겠습니다.')],bday:[N('h','생일을 챙겨 받는 건 몇 해 만인지요. 고맙습니다, 에렌님.')]},
  marta:{love:[N('h','어머나! 애송이가 이런 걸 다! 너 진짜 센스 있구나?'),R_('마르타가 호탕하게 웃으며 에렌의 등을 팡팡 두드렸다.')],like:[N('h','고맙다, 꼬맹아.')],neu:[N('n','응? 나 주는 거야? 그래, 받아 두지.')],dis:[N('a','…꼬맹아, 이걸 나한테 왜 주니?')],bday:[N('h','세상에, 내 생일을 다 기억해? 이리 와, 한 번 안아 보자!')]},
  brant:{love:[N('h','이거 남부 거잖아! 에렌, 이걸로 뭘 만들어 줄까?')],like:[N('h','고마워요. 잘 쓸게요.')],neu:[N('n','고마워요, 부집사님.')],dis:[N('a','…부집사님, 제 빵이 이것보다 맛없다는 뜻은 아니죠?')],bday:[N('h','생일 선물이라니! 오늘 저녁은 에렌이 좋아하는 걸로 만들어 줄게.')]},
  tim:{love:[N('h','우와아! 에렌 형 최고예요! 진짜 최고!'),R_('팀이 선물을 꼭 끌어안고 빙글빙글 돌았다.')],like:[N('h','고마워요, 형!')],neu:[N('n','고마워요, 형.')],dis:[N('s','형… 이거 어른들 거잖아요.')],bday:[N('h','형이 제 생일 기억했어요? 저 생일 선물 처음 받아 봐요…!')]},
};
// ===== SEASON_TALK =====
const SEASON_TALK={
  kairan:{봄:[N('n','성 정원 문을 열 때가 됐군. 에드먼드가 또 꽃 축제 얘기를 하겠지.')],여름:[N('n','북부 여름은 짧다. 장부는 미뤄도 해는 기다려 주지 않지.')],가을:[N('n','수확기다. 영지 세수 보고가 몰려올 거다. ……각오해라.')],겨울:[N('n','손이 또 텄군. 장갑은 어쨌지.'),R_('그는 아무렇지 않게 제 장갑을 벗어 내밀었다.')]},
  roewen:{봄:[N('h','꼬마! 봄이다, 봄! 말들이 신나서 날뛴다!')],여름:[N('a','이 더위에 갑옷이라니. 기사단 규정 누가 만들었냐.')],가을:[N('h','수확제 파이 대회, 올해는 내가 심사위원이면 좋겠는데.')],겨울:[N('h','눈싸움 하자! 기사단 대 사용인! 넌 사용인 편이다.')]},
  marta:{봄:[N('h','봄맞이 대청소다! 커튼이란 커튼은 다 떼어 빨 거야.')],여름:[N('n','빨래가 잘 마르는 계절이야. 이럴 때 몰아서 해 둬야지.')],가을:[N('n','겨울 이불 꺼낼 때가 됐네. 좀 거들어, 꼬맹아.')],겨울:[N('a','찬물에 손 담그지 마. 세탁장 솥에 물 데워 놨어.')]},
  brant:{봄:[N('h','봄나물 들어왔어요! 오늘 수프는 향이 끝내줄 거예요.')],여름:[N('n','더울 땐 차가운 수프가 최고죠. 전하는 질색하시지만.')],가을:[N('h','가을엔 버섯이죠! 성 마당에서 주워 오면 요리해 줄게요.')],겨울:[N('h','추운 날엔 스튜! 오늘은 두 그릇 드세요.')]},
  edmund:{봄:[N('n','봄에는 은식기를 한 번씩 다 꺼내 닦습니다. 오래된 관습이지요.')],여름:[N('n','여름엔 서재 창을 오후에만 여십시오. 서류가 날립니다.')],가을:[N('n','가을 연회 명단이 길어지는군요. 찻잎을 넉넉히 들여 두시지요.')],겨울:[N('h','겨울밤엔 전하께 따뜻한 우유를. 오래된 비법입니다.')]},
  tim:{봄:[N('h','형! 공원에 알 숨겨 놓는대요! 같이 찾아요!')],여름:[N('h','형, 호수에서 개구리 잡았어요! 보여 줄까요?')],가을:[N('h','형, 낙엽 밟으면 바스락바스락 소리 나요!')],겨울:[N('h','형! 호수 얼었어요! 미끄럼 타요!')]},
};
// ===== EXTRA_TALK =====
const EXTRA_TALK={
  demian:()=>[[G('데미안','……부집사님. 무기고 정리, 오늘도 하십니까.')],[G('데미안','……전하께서 부집사님 곁을 지키라 하셨습니다. 부려 주십시오.')],[G('데미안','……로웬 단장님 말씀은 반만 믿으십시오.')]],
  cecilia:()=>[[G('세실리아','어머, 꼬맹이 부집사. 또 장부 끼고 다니니?')],[G('세실리아','카이런 곁에 너무 붙어 있지 마. 보기 흉하니까.')],[G('세실리아','……차 온도, 오늘은 괜찮더라. 칭찬은 아니야.')]],
};
