import sys;sys.path.insert(0,'.')
from sv import H,B
from PIL import Image
def hx(c):c=c.lstrip('#');return tuple(int(c[i:i+2],16) for i in (0,2,4))
def mix(a,b,t):return tuple(round(a[i]+(b[i]-a[i])*t) for i in range(3))
BASE={'E':'#3a2630','m':'#c87a7e','b':'#f4b4b0','w':'#ffffff'}
PAL={
 'erena':dict(s='#fbe2cf',S='#eebfa8',h='#a8724a',H='#7e5034',L='#d29e6c',c='#3a3c4c',C='#2c2d3a',l='#565a6e',v='#4a4d5e',V='#3a3c4a',a='#e0c888',t='#fbf8f2',T='#e2dcd0',n='#ffffff',g='#fbe2cf',p='#3a3b4a',P='#2c2c38',f='#4a3c40'),
 'kairan':dict(s='#f8e6da',S='#e6c6b4',h='#36406a',H='#262c4e',L='#5c6c9e',E='#2a2a44',c='#30364e',C='#232838',l='#4a5274',a='#9aa0b6',A='#7a8098',t='#f6f6f8',n='#f6f6f8',g='#fafafc',p='#30364e',P='#232838',f='#2a2a34'),
 'roewen':dict(s='#f8dcc6',S='#e8bea2',h='#a09676',H='#7a7056',L='#c6be9e',E='#4a4a2a',c='#34363e',C='#26272e',l='#4e505c',a='#d6dae2',A='#a8acb8',t='#f6f6f8',g='#3a3a42',p='#34363e',P='#26272e',f='#2a2a32'),
 'edmund':dict(s='#f5dece',S='#e2c0aa',h='#d8dbe2',H='#aeb2bc',L='#f6f8fb',E='#5a6070',c='#33343e',C='#25262e',l='#50526a',v='#3e404c',V='#30313c',a='#b4b6c2',t='#fbf9f4',n='#ffffff',g='#fbfbfb',p='#33343e',P='#25262e',f='#2a2a32'),
 'marta':dict(s='#f8dcc6',S='#e8b89c',h='#d4664a',H='#a8442e',L='#f09a78',E='#8a5014',c='#3a3940',C='#2a2a30',l='#55555e',v='#9a4a64',V='#78364c',a='#ecc868',t='#fbf8f4',n='#3a3940',g='#fbfbfb',k='#3e3a48',Q='#2e2b36',f='#3a3242'),
 'brant':dict(s='#f2d0b2',S='#deae8e',h='#6a4430',H='#4a2e20',L='#94684c',E='#4a2a16',c='#fafaf6',C='#dcd8d0',l='#ffffff',a='#d6d2ca',A='#3a3840',t='#fafaf6',n='#3a3840',r='#a8744a',R='#86583a',p='#3a3940',P='#2a2a30',f='#8a5a3c',F='#a8744e'),
 'tim':dict(s='#fbe4d0',S='#eec0a6',h='#eac67a',H='#c49c54',L='#f8e0a8',E='#3a5a80',c='#86a868',C='#668650',l='#a2c282',a='#8a6a48',t='#f6efe0',g='#fbe4d0',p='#86684c',P='#664c36',f='#5a4232'),
}
PAL['erena_d']=dict(PAL['erena'],c='#f4e8d6',C='#e2d0b6',l='#fffaf0',v='#f6e2de',V='#e6c8c2',a='#e6c87a',t='#fffcf6',n='#e8a2b4',g='#fbe2cf',k='#f2e4ce',Q='#dccaa8',f='#b08070')
H['erena_d_f']=H['erena_f'];H['erena_d_s']=H['erena_s']
OUT={'erena':'tail','erena_d':'vest','kairan':'coat','roewen':'uni','edmund':'tail','marta':'vest','brant':'chef','tim':'tunic'}
def fix(rows,n=16):
    return [(r+'.'*n)[:n] for r in rows]
def backify_head(rows):
    out=[]
    for i,r in enumerate(rows):
        o=''
        for j,ch in enumerate(r):
            if ch=='.':o+='.';continue
            if i>=14 and ch in 'sSEbm':o+='S';continue
            if ch=='L':o+='L';continue
            o+='H' if (i>=12 and (j<=4 or j>=11)) else 'h'
        out.append(o)
    return out
def backify_body(rows):
    return [''.join({'t':'c','n':'c','v':'c','V':'C','a':'c','A':'C','l':'c','r':'c','R':'C','T':'c','s':'s','g':'g'}.get(ch,ch) for ch in r) for r in rows]
def walk(rows,dirn,frame,small):
    rows=[list(r) for r in rows]
    L0=11  # 다리 시작(몸 기준)
    if dirn in 'fb' and frame:
        cols=range(0,8) if frame==1 else range(8,16)
        for x in cols:
            col=[rows[y][x] for y in range(L0,16)]
            col=col[1:]+['.']
            for k,y in enumerate(range(L0,16)):rows[y][x]=col[k]
    if dirn=='s' and frame and any('k' in ''.join(r) for r in rows[8:]):
        r=rows[15];rows[15]=list('...ffff.........' if frame==1 else '.....ffff.......')[:16]
        return [''.join(x) for x in rows]
    if dirn=='s' and frame:
        # 보폭: 앞다리 왼쪽, 뒷다리 오른쪽
        base=[''.join(r) for r in rows]
        leg=[ "....pp..pp......" , "...pp....pp.....","...pP....Pp.....","..ff......ff....","..fff.....fff..." ] if frame==1 else ["......pppp......","......pppp......","......pPpp......","......ffff......",".....fffff......"]
        for k in range(5):rows[11+k]=list(leg[k].replace('p','p'))
    return [''.join(r) for r in rows]
def grid(cid,dirn,frame):
    small=cid in ('tim','v_kid')
    hd=fix(H[cid+('_s' if dirn=='s' else '_f')]);bd=fix(B[OUT[cid]+('_s' if dirn=='s' else '_f')])
    if dirn=='b':hd=backify_head(hd);bd=backify_body(bd)
    bd=walk(bd,dirn,frame,small)
    if cid=='marta' and dirn!='s':
        # 낮게 묶은 머리를 어깨 앞으로
        bd=[list(r) for r in bd]
        for y,x in [(0,3),(1,3),(1,2),(2,2),(3,2),(4,2),(5,2)]:bd[y][x]='h' if y<4 else 'H'
        bd=[''.join(r) for r in bd]
    rows=hd+bd
    if dirn=='b' and cid=='marta':pass
    return rows
def render(cid,dirn,frame,scale=1):
    rows=grid(cid,dirn,frame);pal={**BASE,**PAL[cid]}
    W,Hh=16,32;px=[[None]*W for _ in range(Hh)]
    for y,row in enumerate(rows):
        for x,ch in enumerate(row):
            if ch=='.':continue
            col=pal.get(ch) or pal.get(ch.lower()) or '#ff00ff'
            px[y][x]=hx(col)
    out=[[p for p in r] for r in px]
    ink=hx('#3a2232')
    for y in range(Hh):
        for x in range(W):
            if px[y][x] is not None:continue
            for dx,dy in ((0,1),(-1,0),(1,0),(0,-1)):
                xx,yy=x+dx,y+dy
                if 0<=xx<W and 0<=yy<Hh and px[yy][xx] is not None:
                    out[y][x]=mix(px[yy][xx],ink,.62);break
    im=Image.new('RGBA',(W,Hh),(0,0,0,0))
    for y in range(Hh):
        for x in range(W):
            if out[y][x]:im.putpixel((x,y),out[y][x]+(255,))
    if dirn=='r':im=im.transpose(Image.FLIP_LEFT_RIGHT)
    return im.resize((W*scale,Hh*scale),Image.NEAREST)
if __name__=='__main__':
    ids=['erena','kairan','roewen','edmund','marta','brant','tim','erena_d'];sc=8
    sh=Image.new('RGBA',(len(ids)*3*16*sc,32*sc*2),(240,230,212,255))
    for i,c in enumerate(ids):
        for j,d in enumerate('fbs'):
            sh.alpha_composite(render(c,d,0,sc),((i*3+j)*16*sc,0))
            sh.alpha_composite(render(c,d,1,sc),((i*3+j)*16*sc,32*sc))
    sh.save('../sv_sheet.png')
