import asyncio,os
from playwright.async_api import async_playwright
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch();pg=await b.new_page(viewport={'width':390,'height':780})
    errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    await pg.goto('file://'+os.path.abspath('index.html'));await pg.wait_for_timeout(900);await pg.click('#tnew');await pg.wait_for_timeout(200)
    await pg.evaluate("()=>{window.ff=()=>{let n=0;while(D&&n<400){n++;if(D.choosing){choose(0);continue;}D.shown=D.full.length;advance();}};window.L=[];S.rep=60;ff();}")
    for d in range(1,int(os.environ.get('DAYS','115'))):
      ids=await pg.evaluate("()=>storyToday().filter(e=>e.t==='s').map(e=>e.id)")
      for eid in ids:
        st=await pg.evaluate("""(id)=>{ff();const e=STORY.find(x=>x.id===id);if(S.story[e.id]!=='pending')return S.story[e.id];if(e.after&&S.story[e.after]!=='done')return 'wait';const a=AREAS[LOC_AREA[e.loc[0]]];
          const r=[...a.ROOMS,...a.OUT].find(r=>r[0]===e.loc[0]);S.area=a.id;let ok=0;for(let y=r[3];y<r[3]+r[5]&&!ok;y++)for(let x=r[2];x<r[2]+r[4];x++)if(!solidIn(a,x,y)&&!doorAt(a,x,y)&&roomIn(a,x,y)===e.loc[0]){P.x=x*16+8;P.y=y*16+14;ok=1;break;}
          S.min=Math.ceil(e.from*60)+1;placeNpcs(true);busy=false;MG=null;checkStory();return 'started';}""",eid)
        if st=='started':
          await pg.wait_for_timeout(2300);await pg.evaluate("()=>{ff();}")
          await pg.wait_for_timeout(100);await pg.evaluate("()=>{ff();}")
        s2=await pg.evaluate("(id)=>S.story[id]",eid)
        await pg.evaluate("([d,id,s])=>L.push(d+':'+id+'='+s)",[d,eid,s2])
      await pg.evaluate("()=>{ff();S.area='keep';S.min=23*60;busy=false;newDay(false);}")
      await pg.wait_for_timeout(1100);await pg.evaluate("()=>{ff();}")
      if errs:print('ERR',d,errs);break
    log=await pg.evaluate("()=>{L.push('end '+S.day+' ending '+S.ending+' diary days '+Object.keys(S.diary).length+' log '+S.log.filter(l=>l.k).length);return L;}")
    print('\n'.join(x for x in log if '=done' not in x))
    await pg.wait_for_timeout(1500);await pg.evaluate("()=>{ff();togglePanel('menu','log')}");await pg.wait_for_timeout(300);await pg.screenshot(path='d_log.png')
    await pg.evaluate("()=>{ff();menuTab='memo';togglePanel('menu','memo',true)}");await pg.wait_for_timeout(300);await pg.screenshot(path='d_memo.png')
    print(errs);await b.close()
asyncio.run(main())
