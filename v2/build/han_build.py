# Haneul 건물 → 로판풍 색 리텍 아틀라스 (4계절) → scripts/han_data.js
import colorsys, json, base64, io
from PIL import Image
H="/home/user/eren_work/mods2/37f8f3d3/[CP] Haneul's Farm Buildings/assets/"
W="/home/user/eren_work/mods2/f953b3c1/assets/"
SEAS=['spring','summer','fall','winter']
# key: (root, relpath with {c},{s}, crop(x,y,w,h) or None, door col)
SPR={
 'bigshedB':(H,'{c}/Big Shed/B/Big Shed_{s}.png',None,3),
 'shedA':(H,'{c}/Shed/A/Shed_{s}.png',None,3),
 'shedB':(H,'{c}/Shed/B/Shed_{s}.png',None,3),
 'shedC':(H,'{c}/Shed/C/Shed_{s}.png',None,3),
 'shedD':(H,'{c}/Shed/D/Shed_{s}.png',None,3),
 'farm1':(H,'{c}/houses/houses_{s}.png',(16,0,144,144),5),
 'winery':(W,'{c}/Winery/Winery_{s}.png',(0,16,192,128),9),
 'stone':(H,'{c}/Cabin/Stone Cabin_{s}.png',(80,0,80,112),2),
 'plank':(H,'{c}/Cabin/Plank Cabin_{s}.png',(160,0,80,112),2),
 'log':(H,'{c}/Cabin/Log Cabin_{s}.png',(0,0,80,112),2),
 'hutch':(H,'{c}/Slime Hutch/Slime Hutch_{s}.png',None,3),
 'ghouse':("/home/user/eren_work/mods4/CP_Italian_Cou/[CP] Italian Countryside Buildings/assets/",'Greenhouse/Greenhouse_{s}.png',(0,160,112,160),3),
}
# 건물: 스프라이트, 지붕색, 장식색 (None이면 원본 Green 그대로)
BLD={
 'gen':('bigshedB','#4a5878','#2f3a52'),
 'flower':('shedB','#ac6e78','#5f7f60'),
 'book':('shedA','#3a4670','#7a3040'),
 'tea':('farm1','#5e8a7e','#5a4636'),
 'bakery':('shedC','#b4643c','#6e4a30'),
 'hagen':('winery','#54485e','#8a6c34'),
 'tavern':('shedD','#4a3226','#2e3e32'),
 'house1':('stone',None,None),
 'house2':('plank','#8c3a36','#5a4a3a'),
 'house3':('log','#4f7290','#4a4038'),
 'wash':('shedB','#66788c','#46566a'),
 'tailor':('hutch','#c07a96','#8a5a6a'),
 'green':('ghouse',None,None),
}
def load(root,rel,c,s,crop):
  im=Image.open(root+rel.format(c=c,s=s)).convert('RGBA')
  if crop: im=im.crop((crop[0],crop[1],crop[0]+crop[2],crop[1]+crop[3]))
  return im
def hexrgb(h): return tuple(int(h[i:i+2],16)/255 for i in (1,3,5))
GLOW={}
def glowmask(key,s):
  root,rel,crop,_=SPR[key]
  g=load(root,rel,'Green',s,crop);b=load(root,rel,'Blue',s,crop);gp=g.load();bp=b.load();w,h=g.size
  m=Image.new('RGBA',(w,h),(0,0,0,0));mp=m.load()
  for y in range(h):
    for x in range(w):
      G=gp[x,y];B=bp[x,y]
      if G[3]>200 and G[:3] in ((128,120,149),(104,98,119),(104,99,120)): mp[x,y]=(255,255,255,255)
  return m
def recolor(key,s,roof,trim):
  root,rel,crop,_=SPR[key]
  g=load(root,rel,'Green',s,crop)
  if roof is None: return g
  b=load(root,rel,'Blue',s,crop)
  gp=g.load(); bp=b.load(); w,h=g.size
  # 영역 분리: Green 버전의 색상(갈색=지붕, 초록=장식)
  reg={}
  for y in range(h):
    for x in range(w):
      G=gp[x,y]; B=bp[x,y]
      if G[3]<10: continue
      if abs(G[0]-B[0])+abs(G[1]-B[1])+abs(G[2]-B[2])<18: continue
      hh,ll,ss=colorsys.rgb_to_hls(*(v/255 for v in G[:3]))
      hb,lb,sb=colorsys.rgb_to_hls(*(v/255 for v in B[:3]))
      if ll>0.68 and lb>0.68 and ss<0.45: continue   # 크림색 벽·흰 장식은 그대로
      k='trim' if 0.17<hh<0.5 and ss>0.12 else 'roof'
      L=colorsys.rgb_to_hls(*(v/255 for v in B[:3]))[1]
      reg.setdefault(k,[]).append((x,y,L))
  out=g.copy(); op=out.load()
  for k,pts in reg.items():
    base=hexrgb(roof if k=='roof' else trim); bh,bl,bs=colorsys.rgb_to_hls(*base)
    Ls=sorted(p[2] for p in pts); lo=Ls[int(len(Ls)*.02)]; hi=Ls[int(len(Ls)*.98)]
    lmin=max(.07,bl-.24); lmax=min(.88,bl+.26)
    for x,y,L in pts:
      t=0 if hi<=lo else min(1,max(0,(L-lo)/(hi-lo)))
      nl=lmin+t*(lmax-lmin); ns=bs*(0.75+0.35*t)
      r,gg,bb=colorsys.hls_to_rgb(bh,nl,min(1,ns))
      op[x,y]=(round(r*255),round(gg*255),round(bb*255),gp[x,y][3])
  return out
# 아틀라스 배치
frames=[]
for bid,(key,roof,trim) in BLD.items():
  for s in SEAS: frames.append((bid,key,s,recolor(key,s,roof,trim)))
AW=1024; x=y=rowh=0; rects={}
for bid,key,s,im in frames:
  if x+im.width>AW: x=0; y+=rowh+1; rowh=0
  rects[bid+'_'+s]=[x,y,im.width,im.height]; x+=im.width+1; rowh=max(rowh,im.height)
A=Image.new('RGBA',(AW,y+rowh),(0,0,0,0))
for bid,key,s,im in frames:
  r=rects[bid+'_'+s]; A.paste(im,(r[0],r[1]))
A.save('/home/user/eren_work/build/han_atlas.png',optimize=True)
GA=Image.new('RGBA',A.size,(0,0,0,0))
for bid,key,s,im in frames:
  r=rects[bid+'_'+s]; GA.paste(glowmask(key,s),(r[0],r[1]))
gb=io.BytesIO(); GA.convert('LA').save(gb,'PNG',optimize=True)
buf=io.BytesIO(); A.save(buf,'PNG',optimize=True)
meta={bid:{'door':SPR[key][3],'w':(SPR[key][2] or (0,0,112,128))[2] if SPR[key][2] else 112} for bid,(key,_,_) in BLD.items()}
js='const HAN={"rects":'+json.dumps(rects)+',"meta":'+json.dumps(meta)+',"src":"data:image/png;base64,'+base64.b64encode(buf.getvalue()).decode()+'","glow":"data:image/png;base64,'+base64.b64encode(gb.getvalue()).decode()+'"};\n'
open('/home/user/eren_work/scripts/han_data.js','w').write(js)
print(A.size,len(buf.getvalue()))
