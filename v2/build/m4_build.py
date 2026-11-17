import base64,io,json,os
from PIL import Image
from collections import deque
M4='/home/user/eren_work/mods4/'
out={}
def b64(im):
  b=io.BytesIO();im.save(b,'PNG',optimize=True);return 'data:image/png;base64,'+base64.b64encode(b.getvalue()).decode()
# 1) food icons
F=M4+'DSHi_Food_Rete/[CP] DSHi Food Retexture/assets/'
FOOD={'bread':'Bread','cookie':'Cookie','meat_pie':'Rhubarb Pie','pumpkin_pie':'Pumpkin Pie','ginger':'Star Cookie','strawberry':'Pink Cake','berry_tart':'Blueberry Tart',
 'd_soup':'Parsnip Soup','d_herbtea':'Jasmine Tea','d_omelet':'Omelet','d_stew':'Mountain Chili','d_cornbread':'Bread','d_salad':'Salad','d_grapejuice':'Ginger Ale','d_pumpsoup':'Pumpkin Soup',
 'd_carrotcake':'Cappuccino Mousse Cake','d_jam':'Fruit Salad','d_fishherb':'Baked Fish','d_vegpie':'Rhubarb Pie','d_kalesoup':'Pale Broth','d_strawcake':'Pink Cake','d_melonice':'Ice Cream',
 'd_southtea':'Jasmine Tea','d_smeltfry':'Crispy Bass','d_fishstew':'Fish Stew','d_salmonsteak':'Salmon Dinner','d_eelgrill':'Fried Eel','cider':'Ginger Ale','dried_fruit':'Apple Slices','candy':'Rock Candy'}
names=sorted(set(FOOD.values()));A=Image.new('RGBA',(16*len(names),16),(0,0,0,0));pos={}
for i,n in enumerate(names):A.paste(Image.open(F+n+'.png').convert('RGBA'),(i*16,0));pos[n]=i*16
out['food']={'src':b64(A),'map':{k:pos[v] for k,v in FOOD.items()}}
# 2) cats
C=M4+'Fluffy_Cats-22/[CP] Fluffy Cats/assets/'
out['cats']={k:b64(Image.open(C+f).convert('RGBA')) for k,f in {'Orange':'FlameBicolour.png','Tabby':'CreamBicolour.png','Black':'SealBicolour.png','White':'BlueBicolour.png'}.items()}
# 3) wildflower tufts
W=M4+"MG_DustBeautys/(MG) Dustbeauty's Wildflower Grass Field/"
tf={}
for s in ['spring','summer','fall','winter']:
  ims=[Image.open(W+f'{s}/{i}.png').convert('RGBA') for i in range(1,14) if os.path.exists(W+f'{s}/{i}.png')]
  S=Image.new('RGBA',(16*len(ims),20),(0,0,0,0))
  for i,im in enumerate(ims):S.alpha_composite(im.crop((0,0,16,20)) if im.width>=16 else im,(i*16,0))
  tf[s]=b64(S)
out['tufts']=tf
# 4) botanic flower bushes (auto components, medium)
bot=Image.open(M4+"Envias_botanic/[CP] Envia's botanic garden/assets/botanic garden.png").convert('RGBA')
def comps(im,minn=60):
  W,H=im.size;a=im.split()[3].load();seen=[[0]*W for _ in range(H)];bx=[]
  for y in range(H):
    for x in range(W):
      if a[x,y]>20 and not seen[y][x]:
        q=deque([(x,y)]);seen[y][x]=1;x0=x1=x;y0=y1=y;n=0
        while q:
          cx,cy=q.popleft();n+=1;x0=min(x0,cx);x1=max(x1,cx);y0=min(y0,cy);y1=max(y1,cy)
          for dx in(-1,0,1):
            for dy in(-1,0,1):
              nx,ny=cx+dx,cy+dy
              if 0<=nx<W and 0<=ny<H and not seen[ny][nx] and a[nx,ny]>20:seen[ny][nx]=1;q.append((nx,ny))
        if n>=minn:bx.append((x0,y0,x1-x0+1,y1-y0+1))
  return bx
bb=[(244,6,42,39),(288,6,42,39),(96,70,45,39),(143,64,47,45),(192,68,47,41),(241,70,46,39),(288,68,47,41),(336,70,46,39),(49,68,46,41),(0,2,33,30),(31,2,32,30)]
B2=Image.new('RGBA',(sum(b[2]+1 for b in bb),64),(0,0,0,0));x=0;rects=[]
for b in bb:c=bot.crop((b[0],b[1],b[0]+b[2],b[1]+b[3]));bx2=c.getbbox();c=c.crop(bx2);b=(0,0,c.width,c.height);B2.alpha_composite(c,(x,64-b[3]));rects.append([x,64-b[3],b[2],b[3]]);x+=b[2]+1
out['bot']={'src':b64(B2),'r':rects}
S2=Image.new('RGBA',B2.size,(0,0,0,0));r2=[];x=0
for r in rects[:9]:
  c=B2.crop((r[0],r[1],r[0]+r[2],r[1]+r[3]));w,h=round(c.width*.66),round(c.height*.66);t=c.resize((w,h),Image.LANCZOS);t.putalpha(t.split()[3].point(lambda v:255 if v>110 else 0));S2.alpha_composite(t,(x,64-h));r2.append([x,64-h,w,h]);x+=w+1
out['bots']={'src':b64(S2),'r':r2}
# 5) marble garden (4 seasons)
R=M4+'CP_HXW_Romanti/[CP] H&W Romantic Furniture/Assets/RomanticFurniture_Marble_{}.png'
PIECES={'spiral':(0,2,16,62),'ball':(16,8,16,56),'cone':(32,2,16,62),'roseurn':(68,17,23,47),'lion':(147,130,27,62),'w1':(3,266,24,54),'w2':(84,266,24,54),'w3':(118,330,16,54),'w4':(200,330,16,54),'col':(224,4,16,60),'lampcol':(32,68,16,60),'arch':(0,128,48,64),'archb':(48,128,48,64)}
mb={}
for s in ['Spring','Summer','Fall','Winter']:
  im=Image.open(R.format(s)).convert('RGBA');S=Image.new('RGBA',(sum(p[2]+1 for p in PIECES.values()),80),(0,0,0,0));x=0;r={}
  for k,(px,py,w,h) in PIECES.items():
    c=im.crop((px,py,px+w,py+h));bbx=c.getbbox() or (0,0,w,h);c=c.crop(bbx);S.alpha_composite(c,(x,80-c.height));r[k]=[x,80-c.height,c.width,c.height];x+=w+1
  mb[s.lower()]={'src':b64(S),'r':r}
out['marble']=mb
open('/home/user/eren_work/scripts/m4_data.js','w').write('const M4='+json.dumps(out)+';\n')
B2.resize((B2.width*2,80),Image.NEAREST).save('/tmp/claude-0/-home-user/544a44ab-db30-5b59-866b-c200ad6b16cc/scratchpad/botb.png')
Image.open(io.BytesIO(base64.b64decode(mb['summer']['src'].split(',')[1]))).save('/tmp/claude-0/-home-user/544a44ab-db30-5b59-866b-c200ad6b16cc/scratchpad/mbs.png')
print(len(bb),os.path.getsize('/home/user/eren_work/scripts/m4_data.js'))
