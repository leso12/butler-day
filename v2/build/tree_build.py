import base64,io,json
from PIL import Image
R='/home/user/eren_work/mods3/kr_retex/assets/TerrainFeatures/'
S=['spring','summer','fall','winter'];rects={};A=Image.new('RGBA',(48*17,96),(0,0,0,0));n=0
for t in ['tree1','tree2','tree3','tree8']:
  for s in S:
    f=R+f'{t}_{s}.png'
    try: im=Image.open(f).convert('RGBA')
    except: im=Image.open(R+f'{t}_spring.png').convert('RGBA')
    A.paste(im.crop((0,0,48,96)),(n*48,0));rects[f'{t}_{s}']=[n*48,0,48,96];n+=1
bot=Image.open("/home/user/eren_work/mods4/Envias_botanic/[CP] Envia's botanic garden/assets/botanic garden.png").convert('RGBA').crop((0,31,49,112));bb=bot.getbbox();bot=bot.crop(bb)
A.alpha_composite(bot,(n*48,96-bot.height));rects['cherry']=[n*48,96-bot.height,bot.width,bot.height];n+=1
b=io.BytesIO();A.save(b,'PNG',optimize=True)
open('/home/user/eren_work/scripts/tree_data.js','w').write('const TRR='+json.dumps(rects)+',TRSRC="data:image/png;base64,'+base64.b64encode(b.getvalue()).decode()+'";\n')
print(len(b.getvalue()))
