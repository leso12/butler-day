# GPT가 그린 도구 동작 41프레임 → scripts/acts_data.js (한 장 시트 + 원본 기준 도트)
import base64,io,glob,json,os
from PIL import Image
B=os.path.dirname(os.path.dirname(os.path.abspath(__file__)));SRC=os.path.join(B,'mods','acts')
DEF=[('sweep','nina',0,4,170),('dust','edmund',0,4,150),('train','roewen',0,6,130),('chop','tim',0,6,130),('polish','roewen',0,4,170),('groom','tim',0,4,150),('hang','marta',1,5,260),('sew','nina',0,4,200),('water','nina',0,4,220)]
fr=[];meta={}
for n,src,d,k,dur in DEF:
    fs=sorted(glob.glob(os.path.join(SRC,n+'_*',n+'_0*_32x48.png')));assert len(fs)==k,(n,len(fs))
    meta[n]={'src':src,'dir':d,'off':len(fr),'n':k,'dur':dur};fr+=[Image.open(f).convert('RGBA') for f in fs]
bases=sorted(set((s,d) for _,s,d,_,_ in DEF))
sheet=Image.new('RGBA',(32*len(fr),48+48),(0,0,0,0))
for i,f in enumerate(fr):sheet.paste(f,(i*32,0))
bm={}
for i,(s,d) in enumerate(bases):
    im=Image.open(os.path.join(SRC,'base',f'{s}_{d}.png')).convert('RGBA');sheet.paste(im,(i*32+8,48+8));bm[f'{s}_{d}']=[i,im.height]
bio=io.BytesIO();sheet.save(bio,'PNG',optimize=True)
open(os.path.join(B,'scripts','acts_data.js'),'w').write('const ACTIMG="data:image/png;base64,'+base64.b64encode(bio.getvalue()).decode()+'";const ACTDEF='+json.dumps(meta)+';const ACTBASE='+json.dumps(bm)+';\n')
print(len(fr),'frames',len(bio.getvalue()),'bytes')
