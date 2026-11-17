import base64,io,json
from PIL import Image
M='/home/user/eren_work/mods6/'
B=M+"win/[CP] Orangeblossom's Basic Windows/[CP] Orangeblossom's Basic Windows - "
F=M+'french/[CP] Seasonal French Doors Windows/assets/'
COL=[('basic',''),('beige','_bg'),('black','_bl'),('brown','_br'),('choco brown','_cb'),('grey','_g')]
def u(im):
    b=io.BytesIO();im.save(b,'PNG',optimize=True);return 'data:image/png;base64,'+base64.b64encode(b.getvalue()).decode()
d={'win':{}}
for s in ('spring','summer','fall','winter'):
  for v in ('','night','rain'):
    o=Image.new('RGBA',(16*12,48),(0,0,0,0));i=0
    for c,suf in COL:
        im=Image.open(f'{B}{c}/assets/BF_{s}{"_"+v if v else ""}{suf}.png').convert('RGBA');o.alpha_composite(im.crop((144,0,160,48)),(i*16,0));i+=1
    fv={'':'SFb','night':'SFbNight','rain':'SFbRain'}[v]
    fr=Image.open(F+f'{fv}_{s}_2.png').convert('RGBA')
    for k in (0,1,2,3,8,9):o.alpha_composite(fr.crop((k*16,0,k*16+16,48)),(i*16,0));i+=1
    d['win'][s+('_'+v if v else '')]=u(o)
d['wf']=u(Image.open(M+'rustic/[CP] Rustic Country Walls and Floors/assets/walls_and_floors.png').convert('RGBA'))
open('/home/user/eren_work/scripts/win6_data.js','w').write('const W6D='+json.dumps(d)+';\n')
print(sum(len(v) for v in d['win'].values())+len(d['wf']))
