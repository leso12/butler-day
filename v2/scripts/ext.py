#!/usr/bin/env python3
"""확장 콘텐츠 주입: talk/*.json → EXT 데이터 + scripts/ext.js 엔진 → game/eren.html
사용: python3 ext.py  (원본은 eren.pre_ext.html 에서 매번 새로 만든다)"""
import json, os, re, sys
import os
B=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))   # v2 폴더
SRC=B+'/game/eren.pre_ext.html'; DST=B+'/game/eren.html'
s=open(SRC).read()
NPCS={'kairan','roewen','edmund','marta','brant','tim','demian','cecilia'}
NAMES={'kairan':'카이런','roewen':'로웬','edmund':'에드먼드','marta':'마르타','brant':'브란트','tim':'팀','demian':'데미안','cecilia':'세실리아'}
locs=set(re.findall(r'(\w+)=',open(B+'/talk/locs.txt').read()))
items=set(l.split('\t')[0] for l in open(B+'/talk/items.txt').read().split('\n') if l)
warn=[]
def fx(L,ctx):
  out=[]
  for x in L or []:
    if not isinstance(x,list) or not x: warn.append((ctx,'bad',x)); continue
    t=x[0]
    if t=='r': out.append(['r',str(x[1])])
    elif t=='m': out.append(['m',x[1] if x[1] in 'nhabs' else 'n',x[2]])
    elif t=='x':
      if x[1] in NPCS: out.append(['x',x[1],x[2] if x[2] in 'nhabs' else 'n',x[3]])
      else: warn.append((ctx,'x->g',x[1])); out.append(['g',str(x[1]),x[3]])
    elif t=='g': out.append(['g',x[1],x[2]])
    elif t=='c': out.append(['c',[dict(t=o['t'],p=o.get('p',0),**({'to':o['to']} if o.get('to') in NPCS else {}),r=fx(o.get('r'),ctx)) for o in x[1]]])
    elif t=='pairs': out.append(x)
    elif t=='cue': out.append(x)
    elif t=='n' and len(x)>=3: out.append(['r',x[2]])
    else: warn.append((ctx,'type',t))
  return out
def ld(f):
  p=B+'/talk/'+f
  if not os.path.exists(p): print('없음',f); return None
  return json.load(open(p))
def chkloc(e,ctx):
  bad=[l for l in e.get('loc',[]) if l not in locs]
  if bad: warn.append((ctx,'loc',bad))
EXT={}
st=ld('story_post.json')
if st:
  for e in st:
    chkloc(e,e['id'])
    for k in ('pre','lines','miss'): e[k]=fx(e.get(k),e['id'])
    for a in e.get('alt',[]): a['lines']=fx(a['lines'],e['id'])
  EXT['story']=st
H={}
for f in ('heart_rom.json','heart_fr.json'):
  d=ld(f)
  if d:
    for id,L in d.items():
      for e in L: chkloc(e,e['id']); e['lines']=fx(e['lines'],e['id'])
      H.setdefault(id,[]).extend(L)
if H: EXT['heart']=H
for f,k in (('daily_ev.json','daily'),('jealous.json','jealous')):
  d=ld(f)
  if k=='daily' and os.path.exists(B+'/talk/daily_ev2.json'): d=(d or [])+ld('daily_ev2.json')
  if d:
    for e in d:
      chkloc(e,e['k']); e['lines']=fx(e['lines'],e['k'])
      if e.get('item') and e['item'] not in items: warn.append((e['k'],'item',e['item'])); e.pop('item')
    EXT[k]=d
d=ld('ceremony.json')
if d:
  for k in ('engage','wedding'):
    for id in list((d.get(k) or {}).keys()): d[k][id]=fx(d[k][id],k+id)
  EXT['ceremony']=d
d=ld('rom_var.json')
if d:
  for id,K in d.items():
    for key,L in K.items():
      for v in L:
        chkloc(v,v['k']); v['lines']=fx(v['lines'],v['k'])
        for yn in ('yes','no'):
          if v.get(yn): v[yn]['r']=fx(v[yn].get('r'),v['k'])
  EXT['romvar']=d
d=ld('holidays.json')
if d:
  for f in d.get('fests',[]):
    chkloc(f,f['id']); f['lines']=fx(f['lines'],f['id']); f['pair']={k:fx(v,f['id']) for k,v in (f.get('pair') or {}).items() if k in NPCS}
  for e in d.get('evenings',[]): chkloc(e,e['k']); e['lines']=fx(e['lines'],e['k'])
  HOL=d
else: HOL={}
d=ld('letters.json')
if d:
  for l in d:
    if l.get('item') and l['item'] not in items: warn.append((l['k'],'item',l['item'])); l.pop('item')
  EXT['letters']=d
d=ld('fest_req.json')
if d:
  for f in d.get('fests',[]):
    chkloc(f,f['id']); f['lines']=fx(f['lines'],f['id'])
    f['pair']={k:fx(v,f['id']) for k,v in (f.get('pair') or {}).items() if k in NPCS}
  for c in d.get('chains',[]):
    c['intro']=fx(c.get('intro'),c['k'])
    for st_ in c['steps']:
      st_['lines']=fx(st_.get('lines'),c['k'])
      if st_['type']=='visit' and st_.get('loc') not in locs: warn.append((c['k'],'visit loc',st_.get('loc')))
      if st_['type']=='fetch' and st_.get('item') not in items: warn.append((c['k'],'fetch item',st_.get('item')))
    if c.get('reward',{}).get('item') and c['reward']['item'] not in items: c['reward'].pop('item')
  EXT['fests']=d.get('fests',[])+HOL.get('fests',[]); EXT['chains']=d.get('chains',[])
if HOL.get('evenings'): EXT['evenings']=HOL['evenings']
DT={}
for f in ('dates_x_rom.json','dates_x_fr.json'):
  if os.path.exists(B+'/talk/'+f):
    for id,L in ld(f).items():
      if id not in NPCS: continue
      for c in L:
        if c['loc'] not in locs: warn.append((c['k'],'loc',c['loc']))
        for v in c['variants']: v['lines']=fx(v['lines'],id+':'+c['k'])
      DT.setdefault(id,[]).extend(L)
if DT: EXT['dates2']=DT

eng=(open(B+'/scripts/ext.js').read()+'\n'+open(B+'/scripts/farm.js').read()+'\n'+open(B+'/scripts/fish.js').read()+'\n'+open(B+'/scripts/props.js').read()+'\n'+open(B+'/scripts/date.js').read()+'\n'+open(B+'/scripts/han_data.js').read()+'\n'+open(B+'/scripts/han.js').read()+'\n'+open(B+'/scripts/oa_data.js').read()+'\n'+open(B+'/scripts/oa.js').read()+'\n'+open(B+'/scripts/bed2.js').read()+'\n'+open(B+'/scripts/ui.js').read()+'\n'+open(B+'/scripts/so_data.js').read()+'\n'+open(B+'/scripts/icons.js').read()+'\n'+open(B+'/scripts/tree_data.js').read()+'\n'+open(B+'/scripts/ti_data.js').read()+'\n'+open(B+'/scripts/trees.js').read()+'\n'+open(B+'/scripts/clothes.js').read()+'\n'+open(B+'/scripts/extras.js').read()+'\n'+open(B+'/scripts/town_data.js').read()+'\n'+open(B+'/scripts/town.js').read()+'\n'+open(B+'/scripts/hair2_data.js').read()+'\n'+open(B+'/scripts/hair2.js').read()+'\n'+open(B+'/scripts/m4_data.js').read()+'\n'+open(B+'/scripts/m4.js').read()+'\n'+open(B+'/scripts/sdv_data.js').read()+'\n'+open(B+'/scripts/sdv.js').read()+'\n'+open(B+'/scripts/win6_data.js').read()+'\n'+open(B+'/scripts/win6.js').read()+'\n'+open(B+'/scripts/furncat_data.js').read()+'\n'+open(B+'/scripts/edit.js').read()+'\n'+open(B+'/scripts/edit_out.js').read()+'\n'+open(B+'/scripts/farm2.js').read()+'\n'+open(B+'/scripts/story2.js').read()+'\n'+open(B+'/scripts/acts_data.js').read()+'\n'+open(B+'/scripts/acts.js').read()+'\n'+open(B+'/scripts/boot.js').read()).replace('/*EXTDATA*/{}',json.dumps(EXT,ensure_ascii=False).replace('</','<\\/'))
def rep(a,b,cnt=1):
  global s
  assert s.count(a)==cnt,(a[:60],s.count(a)); s=s.replace(a,b)
rep("function storyToday(){return STORY.filter(e=>e.day===S.day);}",eng+"\nfunction storyToday(){return STORY.filter(e=>e.day===S.day).concat(dailyEntries());}")
rep("rollWeather();rollTasks();genReqs();","rollWeather();rollTasks();genReqs();pickDaily();sendLetter();chainDay();farmDay();")
rep("  {const rq=reqReady(id);if(rq)return reqTalk(n,rq);}\n  if(EXTRA_TALK[id]){","  {const rq=reqReady(id);if(rq)return reqTalk(n,rq);}\n  if(chainTalk(n))return;\n  if(EXTRA_TALK[id]){{const ev=nextHeart(id,n);if(ev&&ev.when(n))return runHeart(id,ev);}")
rep("  for(const e of storyToday()){if(e.t!=='s'||S.story[e.id]!=='pending')continue;\n    if(e.after","  if(chainVisit()||engCheck())return;\n  for(const e of storyToday()){if(e.t!=='s'||S.story[e.id]!=='pending')continue;\n    if(e.after")
rep("function festLines(f){\n","function festLines(f){\n  if(f.ext)return xFestLines(f);\n")
rep("  return out;\n}\nfunction rollTasks","  xTargets(out);\n  return out;\n}\nfunction rollTasks")
rep("    if((S.reqs||[]).length)html+=`<div class=\"sub\">부탁</div>`+S.reqs.map(","    {const xc=chainText();if(xc.length)html+=`<div class=\"sub\">연속 부탁</div>`+xc.map(q=>`<div class=\"task\"><span class=\"ck\">✦</span><div><div class=\"tn\">${q.t}</div><div class=\"tw\">${q.w}</div></div><span></span></div>`).join('');}\n    if((S.reqs||[]).length)html+=`<div class=\"sub\">부탁</div>`+S.reqs.map(")
rep("<div class=\"tn\">${m.title}</div><p class=\"story\">${m.body}</p></div>`;}","<div class=\"tn\">${m.title}</div><p class=\"story\">${m.body}</p>${letterExtra(m,i)}</div>`;}")
rep("  p.querySelectorAll('[data-rk]').forEach(b=>b.onclick=()=>replayKey(b.dataset.rk));","  p.querySelectorAll('[data-rk]').forEach(b=>b.onclick=()=>replayKey(b.dataset.rk));\n  p.querySelectorAll('[data-lrep]').forEach(b=>b.onclick=()=>{const [i,j]=b.dataset.lrep.split(':').map(Number);letterReply(i,j);});")
rep("[\\'mail\\',\\'편지\\'],","[\\'mail\\',\\'편지\\'],[\\'book\\',\\'도감\\'],") if "[\\'mail\\',\\'편지\\']," in s else rep("['mail','편지'],","['mail','편지'],['book','도감'],")
rep("    if(menuTab==='mail')html+=","    if(menuTab==='book')html+=bookHtml();\n    if(menuTab==='mail')html+=")
rep("S.fishN=(S.fishN||0)+1;","S.fishN=(S.fishN||0)+1;(S.fishK=S.fishK||{})[fish]=(S.fishK[fish]||0)+1;")
rep("else if(t==='s'){const ev=STORY.find(x=>x.id===id);","else if(t==='s'){const ev=STORY.find(x=>x.id===id)||(id.startsWith('x_')&&XD_BY[id.slice(2)]?xEntry(XD_BY[id.slice(2)]):null);")
rep("  drawForage(cx,cy,t);\n","  drawForage(cx,cy,t);farmGround(cx,cy,t);farmTick();\n")
rep("  for(const d of eventDecor(a))ents.push({y:d.sy,obj:d});","  for(const d of eventDecor(a))ents.push({y:d.sy,obj:d});\n  farmEnts(ents,cx,cy,t);")
rep("  hugArm(ents,cx,cy,tnow);","  farmFx(cx,cy);hugArm(ents,cx,cy,tnow);")
rep("  if(workAt(tx,ty,ob))return;","  if(workAt(tx,ty,ob))return;\n  if(farmAct(tx,ty,ob))return;")
rep("if(reqFindAt(tx,ty))return '줍기';const c=a.map[ty][tx],ob=objAt(a,tx,ty);","if(reqFindAt(tx,ty))return '줍기';const c=a.map[ty][tx],ob=objAt(a,tx,ty);{const fl=farmLabel(tx,ty,ob);if(fl)return fl;}")
rep("  }else if(kind==='bag'){","  }else if(kind==='farm'){html=farmPanel(arg,X_);\n  }else if(kind==='bag'){")
rep("+`<div class=\"pfoot\"><span>상점에서 산 물건","+farmBagExtra()+`<div class=\"pfoot\"><span>상점에서 산 물건")
rep("  p.querySelectorAll('[data-use]').forEach(b=>b.onclick=()=>useItem(b.dataset.use));","  p.querySelectorAll('[data-use]').forEach(b=>b.onclick=()=>useItem(b.dataset.use));\n  farmBind(p,kind,arg);")
rep("&&!ITEMS[k].tool&&!ITEMS[k].rom);","&&!ITEMS[k].tool&&!ITEMS[k].rom&&!ITEMS[k].seed);")
rep("'GKYLFugT'.includes(a.map[ty][tx]);","'GKYLFugT'.includes(a.map[ty][tx])||isPlot(S.area,tx,ty)||(S.area==='castle'&&tx===43&&ty===24);")
rep("const courses=DATES[id].filter(d=>!(d.min&&hearts(id)<d.min)&&!(d.rom&&!isLover(id)));","const courses=DATES[id].filter(d=>!(d.min&&hearts(id)<d.min)&&!(d.rom&&!isLover(id))&&xdOK(d));")
rep("const vs=(d.variants||[]).filter(v=>!v.known||knowsMe(id));","const vs=(d.variants||[]).filter(v=>(!v.known||knowsMe(id))&&(!v.cond||xcond(v.cond,true)));")
rep("if(o.pose==='sit'||o.pose==='write'||o.pose==='tea')return 'sit';","if(o.pose==='dsit')return 'gs';if(o.pose==='sit'||o.pose==='write'||o.pose==='tea')return 'sit';")
rep("if(['tea','cook'].includes(n.pose))n.pose='stand';","if(['tea','cook','dsit'].includes(n.pose))n.pose='stand';")
rep("    }else{ctx.drawImage(e.sp,sx-8,sy-e.sp.height+1);\n      if(e.n&&e.sp.chest&&","    }else{const gs=((e.n?e.n.pose:e.pl?P.pose:null)==='dsit')?GSIT:0;if(gs){const d=e.n?e.n.dir:P.dir;if(d===2||d===3){const G=groundSit(e.sp,d,spr(e.n?sprOf(e.n.id):pid(),d,'i0'));ctx.drawImage(G.cv,sx-8-G.ox,sy-G.cv.height+1);}else{const h=e.sp.height-gs;ctx.drawImage(e.sp,0,0,e.sp.width,h,sx-8,sy-h+1,e.sp.width,h);}}else{const cut=backSeatCut(e,a);if(cut)ctx.drawImage(e.sp,0,0,e.sp.width,e.sp.height-cut,sx-8-(e.sp.ox||0),sy-e.sp.height+1,e.sp.width,e.sp.height-cut);else ctx.drawImage(e.sp,sx-8-(e.sp.ox||0),sy-e.sp.height+1);}\n      if(!gs&&e.n&&e.sp.chest&&")
rep("animKey({pose:P.pose==='sit'||P.pose==='write'||P.pose==='tea'||P.kneel?'sit':null","animKey({pose:P.pose==='dsit'?'dsit':P.pose==='sit'||P.pose==='write'||P.pose==='tea'||P.kneel?'sit':null")
s=s.replace("</style>",".bk{flex:1;height:6px;background:rgba(0,0,0,.15);border-radius:3px;overflow:hidden;margin-left:10px;align-self:center;min-width:60px}.bk i{display:block;height:100%;background:var(--gold)}\n</style>",1)
open(DST,'w').write(s)
print({k:(len(v) if isinstance(v,list) else {a:len(b) for a,b in v.items()}) for k,v in EXT.items()})
print('경고',len(warn)); [print(' ',w) for w in warn[:40]]
