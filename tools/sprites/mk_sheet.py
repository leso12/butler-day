import sys,io,base64,json;sys.path.insert(0,'.')
import svr
from svr import PAL,OUT,H,render
H['demian_f']=H['kairan_f'];H['demian_s']=H['kairan_s']
H['cecilia_f']=H['marta_f'];H['cecilia_s']=H['marta_s']
PAL['demian']=dict(PAL['roewen'],s='#f6dcc8',S='#e4bca4',h='#7a5440',H='#5a3c2e',L='#a47a5c',E='#3a2a22',c='#4a5a72',C='#38465c',l='#62748e',a='#c8ccd6',A='#9aa0ae')
PAL['cecilia']=dict(PAL['marta'],s='#fae6d8',S='#ecc8b4',h='#f0d27e',H='#cfa856',L='#fbecb4',E='#4a6a9a',c='#7e9ccc',C='#627ead',l='#a6bee2',v='#8eaad6',V='#6a86b8',a='#f4e4b0',t='#fbf8f4',n='#f4e4b0',k='#86a2d0',Q='#6a84b4',f='#5a6c94')
OUT['demian']='uni';OUT['cecilia']='vest'
V={'v_baker':('marta','vest',dict(PAL['marta'],h='#8a5a3a',H='#6a4028',L='#b07a50',E='#5a3a2a',c='#f2e8d6',C='#ddd0b8',l='#fffaf0',v='#86a868',V='#668650',a='#e8d8b0',n='#86a868',k='#86a868',Q='#668650',f='#6a4a3a')),
 'v_old':('edmund','tunic',dict(PAL['tim'],s='#f2d8c4',S='#ddb8a0',h='#c8c8c0',H='#a0a098',L='#e8e8e0',E='#5a5a4a',c='#9a7a5a',C='#7a5e44',l='#b8987a',a='#6a4a30',t='#e8dcc4',p='#5a4a3a',P='#40342a',f='#3a2e26')),
 'v_kid':('tim','tunic',dict(PAL['tim'],h='#d0704a',H='#a85034',L='#f0986a',E='#4a3a2a',c='#d86a6a',C='#b44e50',l='#f08a86',a='#6a4a30')),
 'v_merch':('brant','tunic',dict(PAL['tim'],s='#f0cfb0',S='#d8ac8c',h='#3a3238',H='#262028',L='#5a4e58',E='#3a2a20',c='#5a78a8',C='#465e88',l='#7a98c4',a='#e0c070',t='#f4ecdc',p='#5a4a40',P='#40342c',f='#3a2e28')),
 'v_girl':('erena','vest',dict(PAL['marta'],s='#fbe4d4',S='#eec4ae',h='#e0a0a8',H='#c07a86',L='#f6c8cc',E='#6a4a5a',c='#f4e8f0',C='#e0cede',l='#ffffff',v='#e8a0b4',V='#c87a92',a='#f6dc90',n='#e8a0b4',k='#e8a0b4',Q='#c87a92',f='#9a6a70')),
 'v_guard':('roewen','uni',dict(PAL['roewen'],h='#4a3a30',H='#32261e',L='#6a5646',c='#6a5a4a',C='#52463a',l='#86745e',a='#c8b070',A='#a08a50')),
}
for k,(hd,body,pal) in V.items():
    H[k+'_f']=H[hd+'_f'];H[k+'_s']=H[hd+'_s'];PAL[k]=pal;OUT[k]=body

V2={
 'v_morris':('edmund','tail',dict(PAL['edmund'],h='#8a7a6a',H='#6a5a4a',L='#aa9a8a',c='#6a5a48',C='#54463a',l='#8a7a64',v='#a8844e',V='#86683a',a='#d9b766',t='#efe6d4',n='#a8844e')),
 'v_anna':('erena','vest',dict(PAL['marta'],s='#fbe6d6',S='#eec6b0',h='#e8c070',H='#c49c50',L='#f6dca0',E='#5a7a4a',c='#f6f0e2',C='#e2d8c4',l='#ffffff',v='#7aa86a',V='#5e8a50',a='#f0a0b8',n='#7aa86a',k='#7aa86a',Q='#5e8a50',f='#6a5a3a')),
 'v_noah':('roewen','uni',dict(PAL['roewen'],h='#2e2a30',H='#1e1a20',L='#4a4450',E='#3a3a50',c='#4a6a5a',C='#3a5448',l='#6a8a7a',a='#d0c8a8',A='#a8a080')),
 'v_isobel':('marta','vest',dict(PAL['marta'],h='#c8d0dc',H='#a0aabc',L='#e8eef4',E='#5a6a8a',c='#f4f0f6',C='#e0d8e4',l='#ffffff',v='#a890c0',V='#8a74a4',a='#e8d0f0',n='#a890c0',k='#a890c0',Q='#8a74a4',f='#5a4a6a')),
 'v_hagen':('brant','tunic',dict(PAL['tim'],s='#f0cfb0',S='#d8ac8c',h='#6a6060',H='#4a4242',L='#8a8080',E='#3a2a20',c='#6a4a7a',C='#54386a',l='#8a6a9a',a='#d9b766',t='#f4ecdc',p='#3a3040',P='#2a2230',f='#2a2228')),
 'v_bern':('brant','chef',dict(PAL['brant'],h='#b8603a',H='#904628',L='#d8885a',c='#f0e4cc',C='#d8ccb0',l='#fffaf0',a='#8a5a3a',r='#6a4a32',R='#523826',f='#5a3a2a')),
 'v_rose':('marta','vest',dict(PAL['marta'],h='#7a2a3a',H='#5a1a2a',L='#a04a5a',E='#4a2a2a',c='#f6eef0',C='#e4d6da',v='#a84a6a',V='#86344e',a='#e8c0d0',n='#a84a6a',k='#a84a6a',Q='#86344e')),
 'v_jonas':('roewen','tunic',dict(PAL['tim'],s='#e8c4a4',S='#d0a484',h='#6a4a30',H='#4a3220',L='#8a6a4a',E='#3a2a20',c='#4a8a8a',C='#386a6a',l='#6aa8a8',a='#6a4a30',t='#e8dcc4',p='#5a4a3a',P='#40342a',f='#3a2e26')),
 'v_maid1':('marta','vest',dict(PAL['marta'],h='#6a4a3a',H='#4a3028',L='#8a6a5a',c='#3a3a48',C='#2a2a36',l='#4e4e5e',v='#fbf8f2',V='#e0dcd2',a='#fbf8f2',n='#fbf8f2',k='#3a3a48',Q='#2a2a36',t='#fbf8f2')),
 'v_maid2':('marta','vest',dict(PAL['marta'],h='#e0c080',H='#bc9a58',L='#f4dca8',c='#3a3a48',C='#2a2a36',l='#4e4e5e',v='#fbf8f2',V='#e0dcd2',a='#fbf8f2',n='#fbf8f2',k='#3a3a48',Q='#2a2a36',t='#fbf8f2')),
 'v_knight1':('roewen','uni',dict(PAL['roewen'],h='#3a3028',H='#26201a',L='#5a4a3e',c='#5a6478',C='#465062',l='#7a8498',a='#c8ccd4',A='#a0a4ac')),
 'v_knight2':('roewen','uni',dict(PAL['roewen'],h='#c0a070',H='#9a7c50',L='#dcc090',c='#5a6478',C='#465062',l='#7a8498',a='#c8ccd4',A='#a0a4ac')),
 'v_gren':('brant','tunic',dict(PAL['tim'],s='#e8c4a4',S='#d0a484',h='#4a3a2a',H='#32261a',L='#6a5a44',E='#3a2a20',c='#8a6a44',C='#6e5434',l='#a8885e',a='#4a3a2a',t='#e8dcc4',p='#4a3a2a',P='#32281e',f='#2e241c')),
}
for k,(hd,body,pal) in V2.items():
    H[k+'_f']=H[hd+'_f'];H[k+'_s']=H[hd+'_s'];PAL[k]=pal;OUT[k]=body
og=svr.grid
def grid(cid,d,fr):
    if cid=='cecilia':
        rows=og('marta',d,fr)
        if d!='s':
            r=[list(x) for x in rows]
            for y,x in [(16,12),(17,12),(17,13),(18,13),(19,13),(20,13),(21,13)]:r[y][x]='h' if y<20 else 'H'
            rows=[''.join(x) for x in r]
        return rows
    if cid=='demian':return og('kairan',d,fr)[:16]+og('roewen',d,fr)[16:]
    if cid=='v_kid':return og('tim',d,fr)
    return og(cid,d,fr)
svr.grid=grid
from PIL import Image
ids=["erena","erena_d","kairan","roewen","edmund","marta","brant","tim","demian","cecilia","v_baker","v_old","v_kid","v_merch","v_girl","v_guard","v_morris","v_anna","v_noah","v_isobel","v_hagen","v_bern","v_rose","v_jonas","v_maid1","v_maid2","v_knight1","v_knight2","v_gren"]
sh=Image.new('RGBA',(144,32*len(ids)),(0,0,0,0))
for i,c in enumerate(ids):
    for j,d in enumerate('fbs'):
        for f in range(3):sh.alpha_composite(render(c,d,f),((j*3+f)*16,i*32))
b=io.BytesIO();sh.save(b,'PNG')
open('../../src/sprsheet.b64','w').write(json.dumps({"ids":ids,"src":"data:image/png;base64,"+base64.b64encode(b.getvalue()).decode()}))
sh.resize((144*4,32*len(ids)*4),Image.NEAREST).save('sheet_check.png')
