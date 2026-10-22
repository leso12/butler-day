
/* ───────── 사람들 ─────────
   일정 항목: [시각, 장소id, 활동 지점id, 'hide'(잠듦·안 보임)]  ·  장소id가 지역id면 그 지역 어디든 */
for(const a of Object.values(AREAS)){if(!LOC_AREA[a.id])LOC_AREA[a.id]=a.id;if(!RNAME[a.id]||a.ROOMS.length>1)RNAME[a.id]=a.name;}
const ROSTER={
  // 성 사람들 (배경)
  elsa:{spr:'v_maid1',name:'엘사',role:'하녀',kind:'staff'},nina:{spr:'v_maid2',name:'니나',role:'하녀',kind:'staff'},
  karl:{spr:'v_knight1',name:'칼',role:'기사',kind:'staff'},otto:{spr:'v_knight2',name:'오토',role:'기사',kind:'staff'},gren:{spr:'v_gren',name:'그렌',role:'마구간지기',kind:'staff'},
  // 마을 사람들
  morris:{spr:'v_morris',name:'모리스',role:'잡화점 주인',kind:'town',shop:'gen'},anna:{spr:'v_anna',name:'안나',role:'꽃집 주인',kind:'town',shop:'flower'},
  noah:{spr:'v_noah',name:'노아',role:'서점 주인',kind:'town',shop:'book'},isobel:{spr:'v_isobel',name:'이소벨',role:'찻집 주인',kind:'town',shop:'tea'},
  helga:{spr:'v_baker',name:'헬가',role:'빵집 안주인',kind:'town',shop:'bakery'},hagen:{spr:'v_hagen',name:'하겐',role:'하겐 상회장',kind:'town',shop:'hagen'},
  bern:{spr:'v_bern',name:'베른',role:'«검은 곰» 주인',kind:'town',shop:'tavern'},rose:{spr:'v_rose',name:'로즈 부인',role:'양장점 주인',kind:'town',shop:'tailor'},
  lily:{spr:'v_girl',name:'릴리',role:'양장점 견습생',kind:'town'},hans:{spr:'v_old',name:'한스 할아버지',role:'방앗간 영감',kind:'town'},
  wolf:{spr:'v_guard',name:'볼프',role:'마을 경비병',kind:'town'},peter:{spr:'v_kid',name:'페터',role:'헬가네 아들',kind:'town'},
  oskar:{spr:'v_merch',name:'오스카',role:'행상',kind:'town'},jonas:{spr:'v_jonas',name:'요나스',role:'어부',kind:'town'},
};
for(const [id,r] of Object.entries(ROSTER))CH[id]={name:r.name,role:r.role,small:id==='peter',kind:r.kind};
const NPC_DEF={
  kairan:[[6,'office','k_desk'],[12,'dining','k_dine'],[13,'office','k_desk'],[16,'library','k_lib'],[18,'plaza','k_garden'],[22,'kbed','k_bed','hide']],
  edmund:[[6,'entrance','e_door'],[8,'hallN','e_hall'],[10,'butler','e_desk'],[12,'dining','e_dine'],[13,'butler','e_desk'],[16,'grounds','e_round'],[17,'grand','e_grand'],[18,'dining','e_dine'],[20,'butler','e_desk'],[23,'butler','e_bed','hide']],
  brant:[[5,'kitchen','b_cook'],[12.5,'servants','b_eat'],[13.5,'kitchen','b_cook'],[21,'servants','b_rest'],[22.5,'b_room','b_bed','hide']],
  roewen:[[6,'training','r_train'],[12,'kitchen','r_snack'],[12.7,'kq','r_mess'],[13.5,'training','r_train'],[16,'armory','r_armory'],[18,'kq','r_mess'],[20,'stable','r_stable'],[22,'r_room','r_bed','hide']],
  marta:[[6,'laundry','m_wash'],[9,'keep','m_clean'],[11,'parlor','m_parlor'],[12.5,'servants','m_eat'],[13.5,'laundry','m_wash'],[16,'yard_w','m_line'],[17,'laundry','m_wash'],[19,'servants','m_rest'],[22,'m_room','m_bed','hide']],
  tim:[[6,'stable','t_stable'],[9,'plaza','t_play'],[12,'servants','t_eat2'],[13,'plaza','t_play'],[16,'grounds','t_wood'],[17,'kitchen','t_eat'],[18,'myroom','t_myroom'],[21,'myroom','t_mybed','hide']],
  demian:[[6,'training','d_train'],[10,'armory','d_armory'],[12,'kq','d_mess'],[13,'gate','d_guard'],[17,'training','d_train'],[19,'kq','d_mess'],[22,'bunks','d_bed','hide']],
  cecilia:[[7,'guest','c_room'],[10,'greenhouse','c_green'],[11,'parlor','c_parlor'],[15,'plaza','c_garden'],[19,'guest','c_room'],[23,'guest','c_room','hide']],
};
const NPC_SUN={
  brant:[[5,'kitchen','b_cook'],[8,'market','b_market'],[11,'kitchen','b_cook'],[21,'servants','b_rest'],[22.5,'b_room','b_bed','hide']],
  marta:[[6,'laundry','m_wash'],[9,'market','m_market'],[12,'servants','m_eat'],[14,'parlor','m_parlor'],[19,'servants','m_rest'],[22,'m_room','m_bed','hide']],
  roewen:[[6,'training','r_train'],[12,'kitchen','r_snack'],[13,'training','r_train'],[18,'tav_t','r_tav_t'],[20,'tavern_in','r_tavern'],[23,'r_room','r_bed','hide']],
  tim:[[6,'stable','t_stable'],[9,'plaza','t_play'],[12,'servants','t_eat2'],[13,'market','t_market'],[16,'plaza','t_play'],[18,'myroom','t_myroom'],[21,'myroom','t_mybed','hide']],
};
const NPC_FRI={roewen:[[6,'training','r_train'],[12,'kitchen','r_snack'],[13,'training','r_train'],[18,'tav_t','r_tav_t'],[20,'tavern_in','r_tavern'],[23,'r_room','r_bed','hide']]};
const BLIZ={k_garden:['library','k_lib'],r_train:['kq','r_mess'],t_play:['servants','t_rest'],b_market:['kitchen','b_cook'],m_market:['laundry','m_wash'],t_market:['servants','t_rest'],m_line:['laundry','m_wash'],t_wood:['kitchen','t_eat'],c_garden:['parlor','c_parlor'],e_round:['grand','e_grand'],d_guard:['entrance','k_hall'],kn_gate:['kq','kn_mess'],kn_train:['kq','kn_mess'],g_paddock:['stable','g_stable']};
const RAIN={k_garden:['library','k_lib'],t_play:['servants','t_rest'],m_line:['laundry','m_wash'],c_garden:['greenhouse','c_green'],kn_train:['kq','kn_mess'],e_round:['grand','e_grand']};
/* 하루마다 달라지는 일정 (배경·마을 사람) */
const rnd=(id,k)=>hash(S.day*7+k,id.length*13+id.charCodeAt(0),id.charCodeAt(1)||3);
const pick=(id,k,arr)=>arr[Math.floor(rnd(id,k)*arr.length)];
const OUTING=[['tea_in','c_tea'],['bakery_in','c_bakery'],['market','v_market'],['park','v_park'],['lake','v_lake'],['street','v_street'],['tea_t','v_teat'],['flower_in','c_flower'],['book_in','c_book'],['gen_in','c_gen'],['tailor_in','c_tailor']];
const EVENING=[['tavern_in','c_tavern'],['tavern_in','c_tavern'],['tav_t','v_tavt'],['lake','v_lake'],['street','v_street'],['tea_in','c_tea']];
function dailySched(id){
  const sun=isSunday(),o=(k,list)=>pick(id,k,list),rest=sun||rnd(id,9)<.15;
  switch(id){
    case 'elsa':return [[6,'laundry','n_wash'],[9,'keep','n_clean'],[12,'servants','n_eat'],[13,'keep','n_rooms'],[16,'laundry','n_wash'],[19,'servants','n_rest'],[22,'maids','n_bed','hide']];
    case 'nina':return sun?[[7,'servants','n_rest'],[10,...o(1,OUTING)],[15,...o(2,OUTING)],[18,'servants','n_rest'],[22,'maids','n_bed','hide']]
      :[[6,'kitchen','n_kitchen'],[9,'keep','n_rooms'],[12,'servants','n_eat'],[13,'keep','n_clean'],[17,'kitchen','n_kitchen'],[20,'servants','n_rest'],[22,'maids','n_bed','hide']];
    case 'karl':return [[6,'training','kn_train'],[12,'kq','kn_mess'],[13,'gate','kn_gate'],[18,'kq','kn_mess'],...(isFriday()||sun?[[19.5,'tavern_in','c_tavern']]:[]),[22.5,'bunks','kn_bed','hide']];
    case 'otto':return [[6,'gate','kn_gate'],[12,'kq','kn_mess'],[13,'training','kn_train'],[18,'kq','kn_mess'],...(rnd(id,4)<.4?[[19.5,'tavern_in','c_tavern']]:[]),[22.5,'bunks','kn_bed','hide']];
    case 'gren':return [[5,'stable','g_stable'],[9,'paddock','g_paddock'],[12,'servants','n_eat'],[13,'stable','g_stable'],[16,'paddock','g_paddock'],[19,'stable','g_stable'],[21,'stable','g_bed','hide']];
    case 'morris':return [[7,'gen_in','o_gen'],...(rnd(id,1)<.5?[[19,'tavern_in','c_tavern'],[21.5,'gen_in','o_gen_off','hide']]:[[19,'gen_in','o_gen_off','hide']])];
    case 'anna':return [[8,'flower_in','o_flower'],[18,...o(2,[['tea_in','c_tea'],['park','v_park'],['lake','v_lake']])],[20,'flower_in','o_flower','hide']];
    case 'noah':return [[9,'book_in','o_book'],[19,...o(3,[['tavern_in','c_tavern'],['tea_in','c_tea'],['book_in','c_book']])],[21,'book_in','o_book','hide']];
    case 'isobel':return [[8,'tea_in','o_tea'],[20.5,'tea_in','o_tea','hide']];
    case 'helga':return [[5,'bakery_in','o_bake'],[7,'bakery_in','o_bakery'],[17,'house2_in','h2_sit'],[21,'house2_in','h2_bed','hide']];
    case 'hagen':return [[9,'hagen_in','o_hagen'],[18,...o(1,[['tavern_in','c_tavern'],['tea_in','c_tea'],['hagen_in','o_hagen']])],[22,'hagen_in','o_hagen','hide']];
    case 'bern':return [[9,'tavern_in','o_tavern'],[24,'tavern_in','o_tavern','hide']];
    case 'rose':return [[9,'tailor_in','o_tailor'],[18,...o(1,[['tea_in','c_tea'],['tea_t','v_teat'],['tailor_in','o_sew']])],[21,'tailor_in','o_tailor','hide']];
    case 'lily':return [[8,'tailor_in','o_sew'],[12,...o(1,[['bakery_in','c_bakery'],['market','v_market'],['tea_t','v_teat']])],[13,'tailor_in','o_sew'],[17.5,...o(2,OUTING)],[20,'tailor_in','o_sew','hide']];
    case 'hans':return [[7,'house1_in','h1_sit'],[9,...o(1,[['park','v_park'],['lake','v_lake']])],[12,...o(2,[['tea_in','c_tea'],['bakery_in','c_bakery'],['house1_in','h1_sit']])],[14,...o(3,[['park','v_park'],['lake','v_lake'],['street','v_street']])],[17,'house1_in','h1_sit'],[20.5,'house1_in','h1_bed','hide']];
    case 'wolf':return [[7,'tgate','v_gate'],[12,'bakery_in','c_bakery'],[13,'tgate','v_gate'],[19,...o(1,[['tavern_in','c_tavern'],['tav_t','v_tavt']])],[22,'house1_in','h1_bed','hide']];
    case 'peter':return [[8,'house2_in','h2_sit'],[9,...o(1,[['market','v_market'],['lake','v_lake'],['park','v_park']])],[12,'bakery_in','c_bakery'],[13,...o(2,[['lake','v_lake'],['park','v_park'],['street','v_street'],['homes','v_homes']])],[18,'house2_in','h2_sit'],[20,'house2_in','h2_bed','hide']];
    case 'oskar':return [[8,'market','v_market'],[14,...o(1,[['tav_t','v_tavt'],['street','v_street']])],[17,'tavern_in','c_tavern'],[23,'tavern_in','c_tavern','hide']];
    case 'jonas':return [[5,'lake','v_lake'],[12,'house3_in','h3_sit'],[14,'lake','v_lake'],[18,...o(1,EVENING)],[21,'house3_in','h3_bed','hide']];
  }
  return null;
}
function schedFor(id){
  let sc=dailySched(id)||(isSunday()&&NPC_SUN[id])||(isFriday()&&NPC_FRI[id])||NPC_DEF[id];
  {const last=sc[sc.length-1];if(sc[0][0]>0&&last[3]==='hide')sc=[[0,...last.slice(1)],...sc];}
  if(id==='kairan'&&S.f.dinner)sc=[...sc.filter(v=>v[0]<18||v[0]>=22),[18,'plaza','k_garden'],[19,'dining','k_dine'],[20.5,'plaza','k_garden'],...(sc.some(v=>v[0]>=22)?[]:[[22,'kbed','k_bed','hide']])].sort((a,b)=>a[0]-b[0]);
  const swap=S.weather==='blizzard'?BLIZ:S.weather==='rain'?RAIN:null;if(swap)sc=sc.map(v=>swap[v[2]]?[v[0],...swap[v[2]]]:v);
  const ins=(from,loc,act,to)=>{const keep=sc.filter(v=>v[0]<from||v[0]>to);const prev=[...sc].filter(v=>v[0]<=to).pop()||sc[0];sc=[...keep,[from,loc,act],[to,...prev.slice(1)]].sort((a,b)=>a[0]-b[0]);};
  for(const e of STORY)if(e.day===S.day&&STORY_SCHED[e.id]&&STORY_SCHED[e.id][id]&&S.story[e.id]==='pending'){const [f,l,a,t]=STORY_SCHED[e.id][id];ins(f,l,a,t);}
  const ap=S.appt;if(ap&&ap.id===id&&ap.day===S.day){ACTS['_d_'+id]=[[ap.spot[0],ap.spot[1],ap.spot[2],'stand',9999]];ins(ap.hour-.5,ap.loc,'_d_'+id,ap.hour+2);}
  return sc;
}
/* 배경·마을 사람 대사 */
function folkLines(n){
  const id=n.id,r=S.rep,h=S.f.hagen==='win',day=S.day,rain=S.weather==='rain',hr=S.min/60,where=n.loc,nm=CH[id].name;
  const tip=()=>{const ids=['kairan','roewen','marta','brant','edmund','tim'],who={kairan:'전하',roewen:'기사단장님',marta:'마르타',brant:'브란트 아저씨',edmund:'집사님',tim:'팀'};const k=ids[Math.floor(Math.random()*6)],love=PREF[k].love,it=love[Math.floor(Math.random()*love.length)];(S.known[k]=S.known[k]||{})[it]='love';return `${who[k]} 말이에요? ${jo(ITEMS[it].n,'을','를')} 그렇게 좋아한다던데요.`;};
  const at={
    tea_in:['이 집 홍차는 북부에서 제일이에요.','창가 자리가 제일 좋아요. 햇빛이 들거든요.'],tavern_in:['캬, 오늘 맥주 진하네!','부집사님도 한잔하시려고?'],bakery_in:['갓 구운 호밀빵 냄새… 못 참겠어요.'],
    lake:['오리들이 올해 새끼를 다섯이나 쳤대요.','물수제비 뜨기 좋은 날이에요.'],park:['벤치에 앉아 있으면 시간 가는 줄 몰라요.'],market:['일요일엔 남부 상인도 와요.','군밤 장수 어디 갔지?']}[where]||[];
  const P_={
    elsa:['부집사님, 복도 촛대는 제가 다 닦았어요!','마르타님 몰래 낮잠 자다 들킬 뻔했어요.',S.f.knows?'요즘 전하 표정이 부드러워지셨어요. 무슨 일 있으신가?':'전하께선 오늘도 말씀이 없으시네요.',()=>tip()],
    nina:['식당 은식기 반짝이는 거 보셨어요? 부집사님 솜씨죠?','브란트 아저씨가 또 파이 태웠어요.','밤에 서쪽 별관 창문 틈으로 바람이 숭숭 들어와요.'],
    karl:['이상 없습니다, 부집사님!','단장님이 또 외상 장부를 늘렸습니다.','훈련비 조정안, 기사들이 다 고마워합니다.'],
    otto:['데미안 녀석, 말수가 적어도 검은 제일이에요.','성문 앞은 오늘도 조용합니다.','부집사님, 저녁에 «검은 곰» 같이 가실래요? 농담입니다.'],
    gren:['전하 말은 성질이 고약해요. 근데 부집사님 앞에선 얌전하네?','건초값이 올랐어요. 장부에 적어 주세요.','말은 사람을 알아봐요.'],
    morris:['어서 오시오. 성에서 오셨구먼.','양초가 다 떨어져 간다고 마르타가 그러더구먼.',h?'하겐 그 양반이 요즘 고분고분해졌어. 부집사님 덕이지.':'하겐 상회 값은 여전히 고약하지.'],
    anna:['북부에도 꽃은 피어요. 짧고, 진하게.','라벤더는 마음을 가라앉혀 줘요.',()=>tip()],
    noah:['…조용히 둘러보세요.','남부 시집이 새로 들어왔습니다.','전하께서 직접 책을 고르러 오신 적도 있어요. 놀랐죠.'],
    isobel:['따뜻한 차 한 잔 하고 가세요.','에드먼드 선생님이 차 내리는 법을 가르쳐 주셨어요.','오늘의 케이크는 살구 타르트예요.'],
    helga:['어머, 부집사님! 꿀빵 갓 나왔어요.','부집사님, 너무 말랐어. 빵 하나 더 드세요.',h?'하겐 상회가 밀가루 값을 내렸지 뭐예요!':'밀가루 값이 또 올랐어요.',()=>tip()],
    hagen:h?['…부집사님. 단가표는 약속대로 지키고 있소.','흠흠. 차라도 한잔 하시겠소?']:['꼬마 양반, 또 무슨 일이오?','거래는 예약제요.'],
    bern:['어이, 성 사람! 한잔하고 가!','로웬 그 녀석 외상이 산더미야.','뒤쪽 자리는 기사단 거야. 앉아도 돼, 부집사님은.'],
    rose:['어머, 귀여운 부집사님. 단추 하나라도 보고 가요.','북부 겨울 코트는 미리 맞춰야 해요.',S.f.cecilia&&!S.f.ceciliaGone?'세실리아 영애가 드레스를 열 벌이나 맞췄어요!':'요즘 비단값이 금값이에요.'],
    lily:['부집사님 손 참 곱네요. 바느질하셔도 되겠어.',()=>tip(),'로즈 부인은 무섭지만 솜씨는 최고예요.'],
    hans:['젊은이, 북부 여름은 짧다네. 즐겨 두게.','내가 젊었을 땐 선대 대공께서 이 공원을 만드셨지.',day>=84?'요즘 낯선 남부 사람이 기웃거리더군. 조심하게.':'방앗간 물레가 요즘 삐걱대.'],
    wolf:['이상 없음! …아, 부집사님이시군요.','성문은 밤 10시에 닫힙니다.',()=>tip()],
    peter:['부집사 형! 전하 진짜 무서워요?','호수에 큰 물고기 있다! 진짜야!',S.f.tim?'팀이랑 친구예요! 팀이 형 자랑 맨날 해요.':'성에 사는 애는 좋겠다…','고양이 이름은 «치즈»예요. 제가 지었어요.'],
    oskar:['싸요 싸! 부집사님한테는 특별히… 반값은 아니고.',()=>tip(),rain?'비 오는 날은 장사가 영 안 돼요.':'남부산 홍차가 들어왔어요.'],
    jonas:['오늘은 송어가 잘 물어.','호수는 거짓말을 안 해. 사람이랑 달라.','부두 끝에 앉아 있으면 생각이 정리돼.'],
  };
  const pool=[...(P_[id]||['…안녕하세요.']),...at];if(r<35&&CH[id].kind==='town')pool.push('성에서 일이 잘 안 풀린다는 소문이… 아, 아니에요.');
  const k=(S.vtalk=S.vtalk||{}),first=k[id]!==day;k[id]=day;let line=pool[first?(day+id.length)%pool.length:Math.floor(Math.random()*pool.length)];if(typeof line==='function')line=line();
  return [G(nm,line)];
}
