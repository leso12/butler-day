"""빌드: src/ 의 조각들을 이어 붙여 index.html 한 파일로 만든다.  python3 build.py"""
import os,glob,base64,json,sys
if "--legacy" not in sys.argv:sys.exit("예전 버전 빌드입니다. 현재 게임은 python3 v2/scripts/ext.py 로 만드세요 (CLAUDE.md 참고). 정말 옛 버전을 만들려면 --legacy")
ROOT=os.path.dirname(os.path.abspath(__file__));S=os.path.join(ROOT,'src')
r=lambda f:open(os.path.join(S,f),encoding='utf-8').read()
def custom():
    d={'spr':{},'por':{}}
    for f in sorted(glob.glob(os.path.join(ROOT,'custom','*.png'))):
        n=os.path.basename(f)[:-4]
        if '_' not in n:continue
        kind,id=n.split('_',1)
        if kind in d:d[kind][id]='data:image/png;base64,'+base64.b64encode(open(f,'rb').read()).decode()
    return 'const CUSTOM_ART='+json.dumps(d)+';\n'
ORDER=['w_core.js','w_obj.js','w_castle.js','w_town.js','w_end.js']
body=r('head.html')+''.join(r(f) for f in ORDER)+'\n'+r('lines.js')+r('work.js')+r('story.js')+'\n'+r('people.js')+'\n'+r('repline.js')+'\n'+'const SPRSHEET='+r('sprsheet.b64')+';\n'+custom()+r('engine.js')+'\n</script>\n'
open(os.path.join(ROOT,'index.html'),'w',encoding='utf-8').write(body)
print('index.html',len(body),'bytes')
