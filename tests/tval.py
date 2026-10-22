import asyncio,os,json
from playwright.async_api import async_playwright
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch();pg=await b.new_page()
    errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    await pg.goto('file://'+os.path.abspath('index.html'));await pg.wait_for_timeout(1200)
    r=await pg.evaluate("""()=>{const out=new Set();
      const chk=(tag,loc,act)=>{const ar=LOC_AREA[loc];if(!ar){out.add(tag+' noloc '+loc);return;}const a=AREAS[ar];if(!ACTS[act]){out.add(tag+' noact '+act);return;}
        for(const s of ACTS[act]){if(solidIn(a,s[0],s[1]))out.add(tag+' '+act+' solid '+s.slice(0,2));else if(loc!==ar&&roomIn(a,s[0],s[1])!==loc)out.add(tag+' '+act+' in '+roomIn(a,s[0],s[1])+' not '+loc+' '+s.slice(0,2));}};
      const save=S.day,w=S.weather;
      for(let d=1;d<=14;d++){S.day=d;for(const wx of ['clear','rain'])  {S.weather=wx;for(const id of ALL_IDS){for(const v of schedFor(id))chk(id,v[1],v[2]);}}}
      S.day=save;S.weather=w;
      for(const t of [NPC_SUN,NPC_FRI,BLIZ])for(const k in t){}
      for(const [k,v] of Object.entries(STORY_SCHED))for(const [id,[f,loc,act]] of Object.entries(v))chk(k+'/'+id,loc,act);
      for(const [id,ds] of Object.entries(DATES))for(const d of ds){const ar=LOC_AREA[d.loc],a=AREAS[ar];if(!a){out.add('date noloc '+d.loc);continue;}if(solidIn(a,d.spot[0],d.spot[1]))out.add('date solid '+id+d.k);else if(roomIn(a,d.spot[0],d.spot[1])!==d.loc)out.add('date room '+id+d.k+' '+roomIn(a,d.spot[0],d.spot[1]));}
      for(const e of STORY)if(e.loc)for(const l of e.loc)if(!LOC_AREA[l])out.add('story loc '+e.id+' '+l);
      // 문: 도착 칸이 걸을 수 있고, 같은 지역의 모든 문에서 서로 닿는지
      for(const a of Object.values(AREAS)){for(const d of a.doors){const t=AREAS[d.to];if(!t){out.add('door to? '+a.id+'>'+d.to);continue;}if(solidIn(t,d.ax,d.ay))out.add('arrive solid '+a.id+'>'+d.to+' '+[d.ax,d.ay]);}
        const ds=a.doors;for(let i=1;i<ds.length;i++){const s=[...a.doors.filter(x=>!x.gate)];}
        const arr=Object.values(AREAS).flatMap(x=>x.doors.filter(d=>d.to===a.id)).map(d=>[d.ax,d.ay]);
        for(let i=0;i<arr.length;i++)for(const d of a.doors){if(pathIn(a,arr[i],[d.x,d.y])===null)out.add('unreach '+a.id+' '+arr[i]+' -> '+[d.x,d.y]);}}
      // 업무 위치: 인접한 걸을 수 있는 칸
      for(const [k,t] of Object.entries(TASKS)){const [ar,x,y]=t.at,a=AREAS[ar];const o=objAt(a,x,y);if(!o){out.add('task noobj '+k);continue;}let ok=0;for(let j=o.y-1;j<=o.y+o.h;j++)for(let i=o.x-1;i<=o.x+o.w;i++)if(!solidIn(a,i,j))ok=1;if(!ok)out.add('task blocked '+k);}
      return [...out];}""")
    print(len(r));print('\n'.join(r[:80]))
    print(errs);await b.close()
asyncio.run(main())
