import base64,io,json
from PIL import Image
R='/home/user/eren_work/mods3/kr_retex/assets/Maps/'
parts={'fnt':(256,512,80,80),'bench':(32,150,32,24),'lamp':(176,448,16,64)}
A=Image.new('RGBA',(4*130,80),(0,0,0,0));rects={}
for si,s in enumerate(['spring','summer','fall','winter']):
  im=Image.open(R+f'{s}_town.png').convert('RGBA');x=si*130
  for k,(sx,sy,w,h) in parts.items():
    A.alpha_composite(im.crop((sx,sy,sx+w,sy+h)),(x,0));rects[f'{k}_{s}']=[x,0,w,h];x+=w+1
b=io.BytesIO();A.save(b,'PNG',optimize=True)
open('/home/user/eren_work/scripts/town_data.js','w').write('const TWR='+json.dumps(rects)+',TWSRC="data:image/png;base64,'+base64.b64encode(b.getvalue()).decode()+'";\n')
A.resize((A.width*2,A.height*2),Image.NEAREST).save('/tmp/claude-0/-home-user/544a44ab-db30-5b59-866b-c200ad6b16cc/scratchpad/tw_atlas.png')
