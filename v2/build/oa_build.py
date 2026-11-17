# Orangeblossom Antique Bedroom → 5색 시트(+앞 레이어) → scripts/oa_data.js
import base64,io,json
from PIL import Image
R="/home/user/eren_work/mods2/ca5cb487/Orangeblossom's Antique Bedroom Furniture/"
base=Image.open(R+"[CP] Antique Bedroom Set/assets/Furniture.png").convert('RGBA')
AT=R+"[AT] Antique Bedroom Set Add-ons/Textures/"
def ix(i): return ((i%16)*16,(i//16)*16)
# (폴더, 시트 index, 변형 하나의 크기 w,h, 붙일 크기 w,h)
PARTS=[('bed1',0,96,96,96,96),('bed2',10,96,64,96,64),('rug1',74,80,64,80,64),('rug2',138,80,64,80,64),('rug3',217,112,64,112,64),('rug4',210,112,64,112,64),
 ('fireplace',272,64,80,64,80),('large ottoman',134,48,64,48,32),('ottoman',137,16,64,16,32),('vanity',112,48,48,48,48),('large painting',166,48,48,48,48),
 ('medium painting',169,16,48,16,48),('flower vase',178,16,32,16,32),('picture frames',133,16,32,16,32)]
sheets=[base]
for v in range(4):
  s=base.copy()
  for f,i,vw,vh,pw,ph in PARTS:
    t=Image.open(AT+f+'/texture.png').convert('RGBA')
    piece=t.crop((0,v*vh,pw,v*vh+ph)); x,y=ix(i)
    s.paste(Image.new('RGBA',(pw,ph),(0,0,0,0)),(x,y)); s.alpha_composite(piece,(x,y))
  sheets.append(s)
def front(s):
  f=Image.new('RGBA',s.size,(0,0,0,0))
  f.alpha_composite(s.crop((48,0,96,96)),(0,0))       # 닫집 침대 앞(기둥·커튼·이불)
  f.alpha_composite(s.crop((208,0,256,64)),(160,0))   # 앤티크 침대 앞(이불)
  return f
names=['OA','OA1','OA2','OA3','OA4']
out={}
for n,s in zip(names,sheets):
  for k,im in ((n,s),(n+'F',front(s))):
    b=io.BytesIO(); im.save(b,'PNG',optimize=True); out[k]='data:image/png;base64,'+base64.b64encode(b.getvalue()).decode()
open('/home/user/eren_work/scripts/oa_data.js','w').write('const OASRC='+json.dumps(out)+';\n')
M=Image.new('RGBA',(256*5+40,368),(170,180,190,255))
for k,s in enumerate(sheets): M.alpha_composite(s,(k*264,0))
M.save('/tmp/claude-0/-home-user/544a44ab-db30-5b59-866b-c200ad6b16cc/scratchpad/oa_sheets.png')
print(sum(len(v) for v in out.values()))
