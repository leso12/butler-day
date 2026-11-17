import base64,io
from PIL import Image
M='/home/user/eren_work/mods5/'
F=M+'fence/[CP] Seasonal Fences/assets/'
def u(im):
    b=io.BytesIO();im.save(b,'PNG',optimize=True);return 'data:image/png;base64,'+base64.b64encode(b.getvalue()).decode()
cur=Image.open(M+'cursors.png').convert('RGBA')
d={'fence':{s:u(Image.open(F+f'Fence1_{s}.png').convert('RGBA').crop((0,0,48,128))) for s in ('spring','summer','fall','winter')},
   'jewel':u(Image.open(M+'jewel_h.png')),'jmax':u(Image.open(M+'jmax_h.png'))}
import json
open('/home/user/eren_work/scripts/sdv_data.js','w').write('const SDVD='+json.dumps(d)+';\n')
print(sum(len(v) if isinstance(v,str) else sum(map(len,v.values())) for v in d.values()))
