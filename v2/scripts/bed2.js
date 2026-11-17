/* ═════════ 2인용 침대: 둘이 누우면 베개 하나씩 (왼쪽=에레나, 오른쪽=상대) · 결혼 후엔 배우자 침대에서 함께 잔다 ═════════ */
function bedCap(o){return o&&o.k==='bed'&&o.w>=3?2:1;}
const SPOUSE_BED={kairan:'kbed',roewen:'rbed'};
function spouseId(){const p=S&&S.partner;return p&&relOf(p).wed&&SPOUSE_BED[p]?p:null;}
function spouseBedSync(){const p=spouseId();for(const a of Object.values(AREAS))for(const o of a.objs){if(o.k!=='bed')continue;
  if(o.it0!=null&&(!p||o.it0!==SPOUSE_BED[p])){o.it=o.it0;delete o.it0;}
  if(p&&(o.it===SPOUSE_BED[p])&&o.it0==null){o.it0=o.it;o.it='mybed';}}}
setInterval(()=>{try{spouseBedSync();}catch(e){}},1500);
function bedObjInfo(o,a){const sp=furnSprite(o,a);return sp?{x:o.x*T,y:o.y*T,w:o.w*T,h:o.h*T,sp,o}:null;}
{const _sb=sleepBed;sleepBed=function(n,a){if(n.forceBed&&a.objs.includes(n.forceBed)){const b=bedObjInfo(n.forceBed,a);if(b){n._bed=n.forceBed;n._bedDay=S.day;return b;}}return _sb(n,a);};}
/* 배우자 침대에 누우면 배우자도 옆 베개에 (일찍 자러 가도 함께) */
{const _lie=lieInBed;lieInBed=function(after){const a=AREAS[S.area],o=P._bedObj,p=spouseId();
  if(p&&o&&o.it0===SPOUSE_BED[p]&&a.objs.includes(o)){const n=npcs.find(m=>m.id===p);if(n&&!n.scene){bedTogether(p,o);return _lie(()=>{bedApart(p);after();});}}
  return _lie(after);};}
/* 이벤트용: 둘이 같은 침대에 눕히기 / 일으키기 */
function bedTogether(id,o){const n=npcs.find(m=>m.id===id);if(!n)return;const a=AREAS[S.area];o=o||a.objs.find(q=>q.k==='bed'&&(q.it===SPOUSE_BED[id]||q.it0===SPOUSE_BED[id]));if(!o)return;
  n.forceBed=o;n.area=a.id;n.pose='sleep';n.hidden=true;n.bedSlot=1;n.x=o.x*T+8;n.y=(o.y+o.h)*T+14;}
function bedApart(id){const n=npcs.find(m=>m.id===id);if(!n)return;delete n.forceBed;delete n.bedSlot;}
/* ═════════ 부부: 첫날밤(처음 함께 누운 밤) · 함께 깬 아침 — 노골적 묘사 없이 ═════════ */
const NIGHT1={
 kairan:[R_('— 첫날밤 —'),R_('촛불 하나만 남긴 대공 침실. 닫집 커튼이 반쯤 드리워져 있었다.'),X('kairan','n','……이리 와라.'),R_('에레나가 베개 하나를 차지하자, 카이런이 다른 쪽에 조용히 몸을 뉘었다.'),
   X('kairan','n','이 침대가 넓다고 생각한 적은 없었는데.'),X('kairan','s','오늘은 이상하게 좁게 느껴지는군.'),M('s','……제가 너무 가까이 왔나요?'),X('kairan','h','아니. 그 반대다.'),
   R_('그가 이불 끝을 그녀의 어깨까지 덮어 주었다. 투박하고, 조심스러운 손길이었다.'),X('kairan','n','에레나.'),M('n','네.'),X('kairan','h','……잘 자라. 내일도, 그다음 날도 여기서.'),R_('창밖의 눈이 소리 없이 쌓였다. 처음으로, 북부의 밤이 춥지 않았다.')],
 roewen:[R_('— 첫날밤 —'),R_('기사단 숙소의 작은 방. 로웬이 괜히 베개를 두 번이나 털었다.'),X('roewen','h','자, 여기가 네 자리. 창가 쪽. 아침 햇살 제일 먼저 받는 데.'),M('h','로웬 님은요?'),
   X('roewen','h','난 문 쪽. 기사는 원래 문 쪽에서 자는 거야. 너 지키려고.'),R_('나란히 눕자 침대가 삐걱, 하고 울었다. 둘이 동시에 웃음을 터뜨렸다.'),X('roewen','s','……야, 꼬마. 아니, 에레나.'),
   X('roewen','n','오늘 하루 종일 실실 웃었더니 볼이 아프다.'),M('h','저도요.'),X('roewen','h','그럼 내일도 아프자. 모레도.'),R_('그의 손이 이불 위로 그녀의 손을 찾아 가만히 덮었다. 숨소리가 천천히 하나로 맞춰졌다.')]};
const MORNING={
 kairan:['카이런은 이미 깨어 있었다. 서류 대신 그녀의 잠든 얼굴을 보고 있었다는 건, 비밀로 해 두기로 했다.','«……늦잠이군.» 그렇게 말하면서도 그는 일어나려는 그녀의 손목을 놓지 않았다.','눈을 뜨자 이불이 한쪽으로 쏠려 있었다. 전부 그녀 쪽이었다. 카이런은 아무 말도 하지 않았다.'],
 roewen:['«좋은 아침, 내 사랑!» 로웬의 목소리에 창밖 참새가 놀라 날아갔다.','로웬은 베개를 끌어안은 채 코를 골고 있었다. 기사단장의 위엄은 어디에도 없었다.','눈을 뜨니 머리맡에 들꽃 한 송이가 놓여 있었다. 문 쪽 자리는 이미 비어 있었다.']};
{const _lie2=lieInBed;lieInBed=function(after){const p=spouseId(),o=P._bedObj;
  if(p&&o&&o.it0===SPOUSE_BED[p]&&NIGHT1[p]&&!relOf(p).night1){relOf(p).night1=S.day;bedTogether(p,o);busy=false;return startDialog(p,NIGHT1[p],()=>_lie2(()=>{S.wakeSpouse=p;after();}));}
  if(p&&o&&o.it0===SPOUSE_BED[p])S.wakeSpouse=p;return _lie2(after);};}
{const _nd=newDay;newDay=function(passOut){const p=S.wakeSpouse;S.wakeSpouse=null;const r=_nd.apply(this,arguments);if(p&&MORNING[p]){const L=MORNING[p];setTimeout(()=>{try{if(!D&&!busy)toast(L[S.day%L.length]);}catch(e){}},2600);}return r;};}
