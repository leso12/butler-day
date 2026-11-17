# 새 데이트 코스 집필 브리프 (V94) — «부집사 에렌의 하루»

먼저 읽을 것: `BRIEF.md`(세계관·말투), `EXT_BRIEF.md`(100일 이후 상황·cond 키), `DATE_BRIEF.md`(기존 데이트 형식과 품질 기준 — **반드시 따를 것**), `CUE_BRIEF.md`(연출 줄), `ref_dates.js`(기존 데이트 예), `locs.txt`(장소 id).
새로 생긴 콘텐츠(대사에 자연스럽게 녹여도 됨): 성 텃밭(마당)·동관 온실 화단에서 에레나가 농사를 짓는다(브란트가 맡김). 방목장 닭장에 암탉 «보리»«콩떡»«참깨». 마을 호숫가에서 낚시(어부 요나스, 부두, 얼음 낚시, 빙어·송어·장어·«달빛 송어» 전설). 주방 화덕에서 요리.

## 형식
`DATE_BRIEF.md`와 같은 JSON. 추가 필드:
- 코스 단위 `"cond"`: 이 코스를 약속 메뉴에 띄우는 조건. `{"season":"겨울"}`(그 계절에만) · `{"noSeason":"겨울"}`(그 계절 빼고) · `{"farm":true}`(텃밭을 맡은 뒤) · `{"hens":true}`(닭장이 생긴 뒤). 없으면 생략.
- 변형 단위 `"cond"`: `{"season":"겨울"}`, `{"weather":"rain"}`, `{"weather":"snow"}` 등 → 조건이 맞을 때만 그 변형이 나온다. **조건 없는 변형이 최소 2개는 있어야 한다.** 조건 변형은 덤(예: 겨울 얼음 낚시 변형, 비 오는 날 변형).
- `"pose"` 새 연출(장소에 맞게 고를 것):
  - `"farm"` 밭 앞에 나란히 서서 물뿌리개로 물 주기 (kgarden, greenhouse)
  - `"fish"` 물가에 나란히 서서 둘 다 낚싯대·찌 (lake)
  - `"picnic"` 돗자리 위에 마주 앉기, 바구니 (plaza, park, yard_w, training, gate)
  - `"read"` 나란히 앉아 각자 책 (library, book_in, servants)
  - `"sky"` 나란히 서서 하늘 올려다보기 (밤, 별·해돋이·불꽃)
  - 기존: `"tea"` 마주 앉아 찻상, `"hold"` 나란히 서기, `"cook"` 나란히 조리대, `""` 없음(연출 줄로 직접 움직임)
- 연출 줄 `["cue",{...}]` 적극 사용(CUE_BRIEF.md). 어디서나 되는 것: `step`(dx,dy 칸 이동) · `near` · `face` · `emote`(♥ ! ? … 땀 — ♥는 연인 데이트에서만, 남발 금지) · `jump` · `fx`(petals·confetti·fireworks·snow·notes·leaves·lanterns·bubbles; hearts·sparkle은 쓰지 말 것) · `wait` · `fade`(시간 경과).
  예: `["cue",{"do":"step","who":"roewen","dx":2,"dy":0,"wait":true}]`, `["cue",{"do":"face","who":"kairan","dir":"left"}]`, `["cue",{"do":"fx","k":"snow","ms":4000}]`.
- `hour`: 6~22 정수. 시간대를 다양하게(새벽 6~7, 아침, 점심, 오후, 저녁, 밤 21~22).
- 변형 **20~30줄**, 선택지 2개 이상, 장면 전환 2~3번. 같은 코스 다시 가면 완전히 다른 전개. 오감·작은 행동·설렘(과하지 않게). 노골적 묘사 금지.
- 정체: 기본 변형은 남장 «에렌»으로도 자연스럽게. 정체를 아는 대사는 `"known":true` 변형으로만(카이런·로웬 rom:1 코스는 알아도 됨).
- 인물 말투 정확히(BRIEF.md): 카이런 짧은 명령조 반말·«에렌», 로웬 장난스러운 반말·«꼬마», 마르타 «꼬맹아», 브란트(여성, 거친 말투, «아저씨» 농담), 에드먼드 정중한 존댓말·«부집사님», 팀 해맑은 존댓말·«형».
- 한 줄 70자 이내. 맞춤법·띄어쓰기 정확히.

검증: `python3 -c "import json;d=json.load(open('파일'));print({k:[(x['k'],x['loc'],x['hour'],x['pose'],len(x['variants']),[len(v['lines']) for v in x['variants']]) for x in v] for k,v in d.items()})"`
k는 모두 `x`로 시작(기존과 겹치지 않게).
