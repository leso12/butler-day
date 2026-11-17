# 연출(큐) 줄 형식 — 장면 안에서 사람을 움직이고 효과를 낸다

일반 줄(`["r",…]`, `["m",…]`, `["x",…]`, `["g",…]`, `["c",…]`)은 EXT_BRIEF.md와 같다. 여기에 **연출 줄**을 섞는다:

`["cue",{...}]` — 대사 사이에 넣으면 그 순간 실행된다. `"wait":true`면 동작이 끝날 때까지 다음 대사를 기다린다.

| do | 설명 | 예 |
|---|---|---|
| place | 즉시 그 자리에 세움 | `["cue",{"do":"place","who":"kairan","at":"groom","dir":"down"}]` |
| walk | 걸어서 이동 (길찾기) | `["cue",{"do":"walk","who":"me","to":"aisle2","wait":true}]` |
| face | 방향 | `["cue",{"do":"face","who":"kairan","dir":"left"}]` (up/down/left/right) |
| pose | 자세 | `["cue",{"do":"pose","who":"roewen","pose":"kneel"}]` (kneel 한쪽 무릎 · stand) |
| jump | 제자리 콩 뛰기(기쁨) | `["cue",{"do":"jump","who":"tim"}]` |
| fx | 화면 효과 | `["cue",{"do":"fx","k":"petals","ms":4000}]` |
| wait | 잠깐 멈춤 | `["cue",{"do":"wait","ms":800}]` |
| guests | 하객을 하객 자리에 세움 | `["cue",{"do":"guests","ids":["marta","brant","edmund","tim","demian","elsa","nina","anna","helga"]}]` |
| fade | 화면 암전 후 밝아짐(시간 경과) | `["cue",{"do":"fade"}]` |

- who: `me`(에레나) 또는 인물 id(kairan roewen edmund marta brant tim demian, 마을 사람 id: elsa nina karl otto gren anna helga bern isobel rose lily hans peter noah morris hagen jonas wolf oskar).
- fx 종류: `petals`(꽃잎 비) · `hearts`(하트) · `sparkle`(반짝임, 반지) · `confetti`(색종이) · `fireworks`(불꽃놀이, 밤) · `snow`(눈발) · `notes`(음표, 음악) · `leaves`(낙엽) · `lanterns`(떠오르는 등불) · `bubbles`.
- 자리 이름(at/to)은 장소마다 아래 목록에서만.

## 장소별 자리 이름
**결혼식 — 대연회장 (`ballroom`)**: 위쪽에 상아색 아치 제단, 아래쪽 문. `door`(문 안쪽) · `aisle1` `aisle2` `aisle3`(문→제단 통로, 숫자가 클수록 제단에 가까움) · `bride`(제단 앞 왼쪽) · `groom`(제단 앞 오른쪽) · `officiant`(아치 아래 주례 자리) · `front`(제단 앞 한가운데, 둘이 돌아서서 하객을 볼 때) · `piano`(피아노 앞) · `cake`(오른쪽 원탁) · `dance`(연회장 한가운데 춤 자리)
**약혼식 — 성 분수 정원 (`plaza`)**: 큰 분수와 꽃덩굴 아치·정자. `gate`(정원 남쪽 입구) · `arch`(꽃 아치 아래 왼쪽) · `archR`(꽃 아치 아래 오른쪽) · `fountain`(분수 앞 왼쪽) · `fountainR`(분수 앞 오른쪽) · `gazebo`(정자 앞) · `gazeboR`(정자 앞 오른쪽) · `bench`(벤치 옆)
**명절 — 마을 시장 (`market`)**: `square`(광장 한가운데) · `squareR` · `stall`(노점 앞) · `fountain`(시장 분수 앞) · `tree`(큰 트리/허수아비 등 장식 앞)
**명절 — 본관 중앙 계단홀 (`grand`)**: `stairs`(계단 앞) · `tree`(트리 앞) · `tree2` · `hall`(홀 한가운데) · `hallR`
**명절 — 성문 앞 (`gate`)**: `wall`(성벽 위 해돋이 보는 자리) · `wallR` · `road`(성문 앞 길)

## 추가 연출 (어느 장소에서나)
| do | 설명 | 예 |
|---|---|---|
| step | 지금 자리에서 칸 수만큼 걸어감 (dx 오른쪽+, dy 아래+) | `["cue",{"do":"step","who":"kairan","dx":1,"dy":0,"wait":true}]` |
| near | 상대 바로 옆(1칸)으로 다가감 | `["cue",{"do":"near","who":"roewen","to":"me","wait":true}]` |
| emote | 머리 위 감정 말풍선 (♥ ! ? … 땀) | `["cue",{"do":"emote","who":"kairan","e":"♥"}]` |
- 하객(guests)과 자리 이름(at/to)은 plaza · ballroom · market · grand · gate 에서만. 다른 방에선 step/near/face/pose/jump/fx/emote만 쓴다.
