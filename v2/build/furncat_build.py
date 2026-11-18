import json,re,io,base64
from PIL import Image
import numpy as np
R='/home/user/eren_work/'
DEF={'chair':(1,2,1,1),'bench':(2,2,2,1),'couch':(3,2,3,1),'armchair':(2,2,2,1),'dresser':(2,2,2,1),'long table':(5,3,5,2),'painting':(2,2,2,2),'lamp':(1,3,1,1),'decor':(1,2,1,1),'bookcase':(2,3,2,1),'table':(2,3,2,2),'rug':(3,2,3,2),'window':(1,2,1,2),'fireplace':(2,5,2,1),'sconce':(1,2,1,1),'torch':(1,2,1,1),'other':(1,2,1,1)}
items=[]
def add(pk,name,typ,sz,bb,rot,idx):
    typ=typ.strip().lower();d=DEF.get(typ.replace('bed double','bed').split(' ')[0] if typ.startswith('bed') else typ,(1,2,1,1))
    if sz in ('-1',''): sw,sh=d[0],d[1]
    else: sw,sh=map(int,sz.split())
    if bb in ('-1',''): bw,bh=(d[2],d[3]) if sz in ('-1','') else (sw,1)
    else: bw,bh=map(int,bb.split())
    items.append([pk,name,typ,sw,sh,bw,bh,int(rot) if str(rot).lstrip('-').isdigit() else 1,int(idx)])
# 1) VI, OW (이미 정리된 목록)
for x in json.load(open(R+'ref_mods/items.json')): add(x[0],x[1].split('_',1)[-1].split('.',1)[-1],x[2],x[3],x[4],x[5],x[6])
# 2) OB 기본 침실
P=R+"ref_mods/7c87c438-CP_Basic_Bedroom_Furniture-23194-1-0-5-1718770057/[CP] Orangeblossom's Basic Bedroom Furniture/content.json"
t=open(P,encoding='utf-8-sig').read()
for k,v in re.findall(r'"([^"]+)": "([^"]*/[^"]*/[^"]*/[^"]*/[^"]*/[^"]*/[^"]*/[^"]*/\d+/[^"]*)"',t):
    f=v.split('/');tex=f[9];pk='OBR' if 'Rugs' in tex else 'OB'
    add(pk,k.split('.',1)[-1],f[1],f[2],f[3],f[4],f[8])
# 3) OA 앤티크
P=R+"mods2/ca5cb487/Orangeblossom's Antique Bedroom Furniture/[CP] Antique Bedroom Set/Data/Furniture.json"
t=open(P,encoding='utf-8-sig').read()
for k,v in re.findall(r'"([^"]+)": "([^"]*)"',t):
    f=v.split('/')
    if len(f)>9 and f[8].isdigit(): add('OA',f[7] if not f[7].startswith('{{') else k.split('.')[-1],f[1],f[2],f[3],f[4],f[8])
# 4) EV 빅토리아 (CF)
P=R+"ref_mods/main3575/[CF] Mioudew's Elegant Victorian Furniture/content.json"
t=open(P,encoding='utf-8-sig').read();t=re.sub(r',\s*([}\]])',r'\1',t)
for o in json.loads(t)['furniture']: add('EV',o['name'],o['type'],f"{o['width']} {o['height']}",f"{o['boxWidth']} {o['boxHeight']}",o.get('rotations',1),o['index'])
# 5) RX 로맨틱 (새 시트)
P=R+"mods4/CP_HXW_Romanti/[CP] H&W Romantic Furniture/Data/furniture.json"
t=open(P,encoding='utf-8-sig').read()
for k,v in re.findall(r'"([^"]+)": "([^"]*)"',t):
    f=v.split('/')
    if len(f)>9 and f[8].isdigit() and 'RomanticFurniture' in f[9]: add('RX',k.split('_',1)[-1],f[1],f[2],f[3],f[4],f[8])
# 6) SV 기본 가구(리텍) — 정의가 없어 그림 덩어리로 자르기
im=np.array(Image.open(R+'mods3/kr_retex/assets/TileSheets/furniture.png').convert('RGBA'))[:,:,3]>0
H,W=im.shape;occ=np.zeros((H//16,W//16),bool)
for ty in range(H//16):
    for tx in range(W//16): occ[ty,tx]=im[ty*16:ty*16+16,tx*16:tx*16+16].any()
seen=np.zeros_like(occ);n=0
for ty in range(occ.shape[0]):
    for tx in range(occ.shape[1]):
        if occ[ty,tx] and not seen[ty,tx]:
            st=[(ty,tx)];seen[ty,tx]=1;cells=[]
            while st:
                y,x=st.pop();cells.append((y,x))
                for dy,dx in ((1,0),(-1,0),(0,1),(0,-1)):
                    yy,xx=y+dy,x+dx
                    if 0<=yy<occ.shape[0] and 0<=xx<occ.shape[1] and occ[yy,xx] and not seen[yy,xx]:
                        # 픽셀이 칸 경계를 넘어 이어질 때만 같은 덩어리
                        a=im[y*16:y*16+16,x*16:x*16+16];b=im[yy*16:yy*16+16,xx*16:xx*16+16]
                        if dy==1: ok=(a[-1]&b[0]).any()
                        elif dy==-1: ok=(a[0]&b[-1]).any()
                        elif dx==1: ok=(a[:,-1]&b[:,0]).any()
                        else: ok=(a[:,0]&b[:,-1]).any()
                        if ok: seen[yy,xx]=1;st.append((yy,xx))
            ys=[c[0] for c in cells];xs=[c[1] for c in cells];y0,y1,x0,x1=min(ys),max(ys),min(xs),max(xs)
            sw,sh=x1-x0+1,y1-y0+1
            if sw*sh>=1 and sw<=8 and sh<=8:
                blk=im[y0*16:(y1+1)*16,x0*16:(x1+1)*16];fill=blk.mean()
                isrug=sw>=2 and sh<=3 and fill>0.93
                typ='rug' if isrug else ('painting' if False else 'decor');bh=sh if isrug else 1
                items.append(['SV','furniture '+str(n),typ,sw,sh,sw,max(1,bh),1,y0*32+x0]);n+=1

# 7) VJ/VJR 빅토리아 보석 세트 (흑금·루비)
J=R+"mods7/jewel/Victorian Furniture - Jewel Set/assets/"
for fn,pk in [('Jewel.json','VJ'),('JewelRuby.json','VJR'),('Windows.json','VJ'),('WindowsRuby.json','VJR')]:
    t=open(J+'Data/'+fn,encoding='utf-8-sig').read();seen=set()
    for k,v in re.findall(r'"(VF[^"]+)": "([^"]+)"',t):
        f=v.split('/')
        if f[8] in seen or k in ('VF.JewelCurtains','VF.JewelWideCurtains') and f[8] not in ('384','386') and pk=='VJ':continue
        if 'Windows' in fn and f[8] not in ('384','386'):continue
        seen.add(f[8]);nm=k.split('.',1)[1].replace('Ruby','');add(pk,nm,f[1],f[2],f[3],f[4],f[8])
# 한글 이름 붙이기 (item 끝에 ko)
import sys;sys.path.insert(0,R+'build');from fname_ko import ko as _ko
_svn={'decor':'기본 장식','rug':'기본 러그'};_svc={}
for it in items:
    if it[0]=='SV':_svc[it[2]]=_svc.get(it[2],0)+1;it.append(f"{_svn.get(it[2],'기본 가구')} {_svc[it[2]]}")
    else:it.append(_ko(it[1]))
def u(p):
    b=io.BytesIO();Image.open(p).convert('RGBA').save(b,'PNG',optimize=True);return 'data:image/png;base64,'+base64.b64encode(b.getvalue()).decode()
sheets={'RX':u(R+"mods4/CP_HXW_Romanti/[CP] H&W Romantic Furniture/Assets/RomanticFurniture.png"),'VJ':u(J+'VFJewel.png'),'VJF':u(J+'VFJewelFront.png'),'VJR':u(J+'VFJewelRuby.png'),'VJRF':u(J+'VFJewelRubyFront.png')}
open(R+'scripts/furncat_data.js','w').write('const FCAT='+json.dumps({'sheets':sheets,'items':items},ensure_ascii=False)+';\n')
import collections;print(len(items),collections.Counter(i[0] for i in items))
print(collections.Counter(i[2] for i in items).most_common(30))
