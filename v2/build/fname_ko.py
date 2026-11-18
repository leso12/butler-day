"""가구 영어 이름 → 한글 (꾸미기 목록용). 단어 사전 + 통째 번역(그림 제목 등)."""
import re,json
W={'accoustic':'어쿠스틱','aircon':'에어컨','amiable':'다정한','amp':'앰프','antique':'앤티크','arch':'아치','armchair':'안락의자','armoire':'옷장','bag':'가방','balls':'공','banjo':'밴조','basket':'바구니','bass':'베이스','bear':'곰','bed':'침대','bedroom':'침실','bench':'벤치','berries':'열매','billiard':'당구','birdbath':'새 물그릇','blooming':'꽃 핀','blue':'파란','bold':'굵은','book':'책','bookcase':'책장','books':'책','bookshelf':'책장','boots':'부츠','border':'테두리','brown':'갈색','buffet':'찬장','built':'붙박이','bureau':'서랍장','by':'','cabinet':'장식장','calendar':'달력','candelabra':'촛대','candlabra':'촛대','candlestick':'촛대','canopy':'닫집','carved':'조각','cat':'고양이','ceiling':'천장','cello':'첼로','chair':'의자','chaise':'긴 의자','charming':'고운','cherry':'벚나무','chesterfield':'체스터필드','chests':'궤짝','china':'도자기','christmas':'크리스마스','cigar':'시가','climbing':'덩굴','clock':'시계','closet':'옷장','clutter':'소품 더미','coat':'코트','coffee':'커피','coquettish':'앙증맞은','covered':'덮인','cue':'큐대','cup':'잔','curio':'진열','curtain':'커튼','curtains':'커튼','cushion':'쿠션','cusioned':'쿠션','dance':'춤','dancer':'무희','dark':'짙은','deco':'장식','decor':'장식','decorative':'장식용','desk':'책상','diamond':'마름모','dining':'식탁','dinner':'만찬','display':'진열대','divider':'칸막이','double':'2인용','down':'','drawers':'서랍','dresser':'서랍장','drums':'드럼','dusk':'노을','electric':'전기','elegant':'우아한','empty':'빈','end':'협탁','engraved':'새김','fake':'모조','fan':'선풍기','fireplace':'벽난로','fish':'물고기','floor':'바닥','floral':'꽃무늬','flourishing':'만발한','flower':'꽃','flowerpot':'꽃화분','flowers':'꽃','fountain':'분수','four':'네 기둥','frame':'액자','framed':'액자','frames':'액자','fridge':'냉장고','gazebo':'정자','gentleman':'신사','gilded':'금장','gingham':'깅엄','glass':'유리','globe':'지구본','golden':'황금','gramophone':'축음기','grandfather':'괘종','gray':'회색','green':'초록','ground':'땅','guitar':'기타','half':'반','hamper':'빨래 바구니','hanging':'매다는','hanglamp':'펜던트 등','hardwood':'원목','hedge':'산울타리','holder':'꽂이','hooded':'후드','horizontal':'가로','horse':'말','house':'실내','hunters':'사냥꾼','hunting':'사냥','hyacinth':'히아신스','in':'','instrument':'악기','island':'섬','ivory':'상아','ivy':'담쟁이','jewel':'보석','jolly':'명랑한','juniper':'노간주','keyboard':'건반','l':'왼쪽','ladder':'사다리','lamp':'램프','lantern':'랜턴','large':'큰','laying':'누운','lion':'사자','long':'긴','lord':'영주','lovers':'연인','low':'낮은','magnificent':'웅장한','mahogany':'마호가니','majesty':'마제스티','makeup':'화장품','map':'지도','marble':'대리석','marbletop':'대리석 상판','mead':'미드주','medium':'중간','meep':'밉','mesh':'망사','mini':'작은','mirror':'거울','mounted':'벽걸이','mr':'','music':'음악','of':'','old':'낡은','on':'','orangeblossom':'오렌지꽃','ornamental':'장식','ornate':'화려한','ottoman':'오토만','overgrown':'우거진','painting':'그림','palm':'야자','partition':'칸막이','path':'길','peaceful':'평화로운','phone':'전화기','photo':'사진','piano':'피아노','picture':'그림','pile':'더미','pillar':'기둥','pine':'소나무','plant':'화분','planter':'화분','player':'플레이어','portrait':'초상화','posh':'고급','poster':'포스터','pot':'화분','potted':'화분','r':'오른쪽','rabbit':'토끼','rack':'걸이','record':'레코드','red':'빨간','retro':'레트로','romantic':'로맨틱','rose':'장미','roses':'장미','rotary':'다이얼','round':'둥근','rug':'러그','ruin':'폐허','sconce':'벽 촛대','sconces':'벽 촛대','seat':'좌석','set':'세트','shelves':'선반','side':'사이드','simple':'단순한','single':'1인용','skull':'해골','small':'작은','sofa':'소파','spiral':'나선','square':'네모','stairs':'계단','stand':'스탠드','standing':'스탠드','statue':'조각상','stool':'스툴','straight':'곧은','striped':'줄무늬','study':'공부','stuffed':'봉제','sturdy':'튼튼한','suitcase':'여행 가방','suitcases':'여행 가방','table':'탁자','tabletop':'탁상','tea':'찻','teddy':'테디','the':'','thinking':'생각하는','topiary':'토피어리','tray':'쟁반','tree':'나무','trellis':'격자 울타리','trophy':'트로피','trunks':'트렁크','tufted':'단추 장식','tv':'텔레비전','v':'','vanity':'화장대','vase':'꽃병','vertical':'세로','vigorous':'싱그러운','viola':'비올라','violin':'바이올린','virtuoso':'거장','wall':'벽','walland':'벽','walnut':'호두나무','wardrobe':'옷장','white':'흰','wide':'넓은','window':'창','wine':'와인','with':'','wood':'나무','wooden':'나무','workdesk':'작업 책상','world':'세계','yellow':'노란','zealous':'열정적인','zebra':'얼룩말','a':'','an':'','and':''}
BI={('cherry','wood'):'벚나무',('end','table'):'협탁',('side','table'):'보조 탁자',('coffee','table'):'커피 탁자',('tea','table'):'찻상',('dining','table'):'식탁',('wall','lamp'):'벽등',('floor','lamp'):'스탠드 램프',('side','lamp'):'탁상 램프',('four','poster'):'네 기둥',('grandfather','clock'):'괘종시계',('record','player'):'축음기',('wall','clock'):'벽시계',('ceiling','fan'):'천장 선풍기',('study','table'):'공부 책상',('built','in'):'붙박이',('world','map'):'세계 지도',('china','cabinet'):'찬장',('hedge','balls'):'공 모양 산울타리',('fake','bear'):'모조 곰'}
WHOLE={'TheVirtuoso':"그림 «거장»",'GoldenDusk':"그림 «황금빛 노을»",'TheGildedLord':"초상 «금빛 영주»",'TheHunters':"그림 «사냥꾼들»",'MeadWithJuniperBerries':"그림 «노간주 열매와 미드주»",'MrMeep':"장식 인형 «미스터 밉»",'TeaTable':'찻상','EndTable':'협탁','WoodPath':'나무 길','CatRug':'고양이 러그'}
def ko(n):
    m=re.match(r'^(.*?)(\d+)?([A-Z])?$',n);base,num,let=m.group(1),m.group(2),m.group(3)
    if not base:base=n;num=let=None
    if base in WHOLE: t=WHOLE[base]
    else:
        ws=re.findall(r"[A-Z]?[a-z']+|[A-Z]+(?![a-z])|\d+",base.replace("'",' '))
        lw=[w.lower() for w in ws];i=0;ws2=[]
        while i<len(lw):
            if i+1<len(lw) and (lw[i],lw[i+1]) in BI: ws2.append('§'+BI[(lw[i],lw[i+1])]);i+=2
            else: ws2.append(ws[i]);i+=1
        ws=ws2
        out=[]
        for w in ws:
            if w.startswith('§'):out.append(w[1:]);continue
            k=w.lower()
            if k.isdigit():out.append(k);continue
            v=W.get(k);
            if v is None:out.append(w)
            elif v:out.append(v)
        # 중복 단어 제거 (예: 쿠션 쿠션)
        r=[];[r.append(x) for x in out if not r or r[-1]!=x];t=' '.join(r) or n
    suf=''
    if num:suf+=' '+num
    if let=='L':suf+=' (왼쪽)'
    elif let=='R':suf+=' (오른쪽)'
    elif let:suf+=('' if num else ' ')+let
    return (t+suf).strip()
if __name__=='__main__':
    import sys
    names=open(sys.argv[1]).read().split('\n')
    m={n:ko(n) for n in names if n}
    json.dump(m,open(sys.argv[2],'w'),ensure_ascii=False)
    for n in names[::25]:print(n,'→',m.get(n))
