/* ───────── 공개 신분 에레나 ───────── */
CH.erena_d={...CH.erena,name:'에레나',role:'에레나',kind:'vest',col:{skin:'#f7d9c3',hair:'#8e5d34',top:'#f1e6d2',sleeve:'#f1e6d2',shirt:'#fbf6ec',tie:'#d9a0ae',acc:'#d9b766',glove:'#f7d9c3',skirt:'#ece0c8',shoe:'#8a6a5a'}};
CH.demian={...CH.roewen,name:'데미안',role:'기사'};CH.cecilia={...CH.marta,name:'세실리아',role:'손님 · 영애'};
CH.erena_d.R={};for(const [k,v] of Object.entries(CH.erena_d.col))CH.erena_d.R[k]=(k==='skin'||k==='glove')?skinRamp(v):ramp(v);
SPR.erena_d=SPR.erena;
const SIDS=SPRSHEET.ids,SHEET=new Image(),miniC={};let sheetOK=false;
SHEET.onload=()=>{sheetOK=true;for(const k in miniC)delete miniC[k];};SHEET.src=SPRSHEET.src;
/* 스타듀밸리 규격 PNG 교체: 걷기 시트 16×32 칸, 4열(프레임) × 4행(아래·오른쪽·위·왼쪽) / 초상화 64×64 칸, 2열(기본·기쁨·슬픔·특수·사랑·화남) */
const SDV={spr:{},por:{}};
for(const [k,src] of Object.entries((typeof CUSTOM_ART!=='undefined'&&CUSTOM_ART.spr)||{})){const im=new Image();im.onload=()=>{SDV.spr[k]=im;for(const c in miniC)delete miniC[c];};im.src=src;}
for(const [k,src] of Object.entries((typeof CUSTOM_ART!=='undefined'&&CUSTOM_ART.por)||{})){const im=new Image();im.onload=()=>{SDV.por[k]=im;};im.src=src;}
const SDV_ROW={0:0,1:2,2:3,3:1},SDV_FR=[0,1,3],SDV_EMO={n:0,h:1,s:3,b:4,a:5,q:2,d:2};
function sdvPortrait(id,ex){const im=SDV.por[id];if(!im)return null;const i=SDV_EMO[ex]||0,cols=Math.max(1,Math.floor(im.width/64)),c=mk(64,64),g=c.getContext('2d');
  const n=Math.floor(im.width/64)*Math.floor(im.height/64),j=i<n?i:0;g.drawImage(im,(j%cols)*64,Math.floor(j/cols)*64,64,64,0,0,64,64);return c;}
function spr(id,dir,frame){const k=id+dir+frame;if(miniC[k])return miniC[k];const cv=mk(16,32);
  if(SDV.spr[id]){const g=cv.getContext('2d');g.drawImage(SDV.spr[id],SDV_FR[frame]*16,SDV_ROW[dir]*32,16,32,0,0,16,32);return miniC[k]=cv;}
  if(!sheetOK)return cv;const g=cv.getContext('2d'),row=Math.max(0,SIDS.indexOf(id)),col=(dir===0?0:dir===1?3:6)+frame;
  if(dir===3){g.scale(-1,1);g.drawImage(SHEET,col*16,row*32,16,32,-16,0,16,32);}else g.drawImage(SHEET,col*16,row*32,16,32,0,0,16,32);
  return miniC[k]=cv;}
const jo=(w,a,b)=>{const c=w.charCodeAt(w.length-1);return w+(c>=0xAC00&&c<=0xD7A3&&(c-0xAC00)%28?a:b);};
const hasArt=id=>!!(ARTC.p[id]||HAIR[id]||SDV.por[id]);
{const _b=bust;bust=(id,ex='n')=>sdvPortrait(id,ex)||_b(id,ex);}
const pid=()=>S.f&&S.f.public?'erena_d':'erena';
const myName=()=>S.f&&S.f.public?'에레나':'에렌';

/* ───────── 상태 ───────── */
const NPC_IDS=['kairan','edmund','brant','roewen','marta','tim','demian','cecilia'];
const FRIENDS=['kairan','edmund','brant','roewen','marta','tim'];
const FOLK_IDS=Object.keys(ROSTER),ALL_IDS=[...NPC_IDS,...FOLK_IDS];
const sprOf=id=>ROSTER[id]?ROSTER[id].spr:id;
const visible=n=>!n.hidden&&(n.id==='tim'?!!S.f.tim:n.id==='demian'?!!S.f.demian:n.id==='cecilia'?!!(S.f.cecilia&&!S.f.ceciliaGone):true);
const npcs=ALL_IDS.map(id=>({id,area:'castle',x:0,y:0,dir:0,cur:'',path:[],dwell:0,frame:0,anim:0,pose:'stand',spot:0,hidden:false}));
const SAVE='erena-butler-v6';
const START={area:'servq',x:15,y:17};
const fresh=()=>({area:START.area,day:1,min:360,pts:Object.fromEntries(NPC_IDS.map(i=>[i,0])),talked:{},gifted:{},giftWk:{},known:{},seen:{},f:{},story:{},mode:'portrait',px:START.x*T+8,py:START.y*T+14,dir:0,intro:0,
  hp:100,hpDebt:0,rep:50,wage:4,tasks:[],carry:null,earned:0,doneTotal:0,week:0,sus:0,susFlags:{},inv:{bread:2},coins:12,injury:0,appt:null,weather:'clear',mail:[],log:[],diary:{},ending:null,role:'부집사',bandDay:0,deskDay:0,drinks:0,drinkDay:0,jeal:0,stood:{},snap:null,queue:[]});
let S=fresh();
try{const s=JSON.parse(localStorage.getItem(SAVE)||'null');if(s&&s.day)S=Object.assign(fresh(),s);}catch(e){}
if(!AREAS[S.area])S.area=START.area;
const P={x:S.px,y:S.py,dir:S.dir,anim:0,frame:0};
function save(){S.px=P.x;S.py=P.y;S.dir=P.dir;try{localStorage.setItem(SAVE,JSON.stringify(S));}catch(e){}}
const hearts=id=>Math.min(10,Math.floor(Math.max(0,S.pts[id]||0)/100));
const doy=d=>((d-1)%112)+1;
const isBday=id=>BDAY[id]===doy(S.day);

/* ───────── 사람들 이동 (지역 사이는 문을 따라) ───────── */
const tileOf=n=>[Math.floor(n.x/T),Math.floor((n.y-2)/T)];
function pathIn(a,[sx,sy],[tx,ty]){
  if(sx===tx&&sy===ty)return [];
  const W=a.MW,prev=new Map(),key=(x,y)=>y*W+x,q=[[sx,sy]];prev.set(key(sx,sy),-1);let hd=0;
  while(hd<q.length){const [x,y]=q[hd++];if(x===tx&&y===ty)break;
    for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){const nx=x+dx,ny=y+dy,k=key(nx,ny);if(prev.has(k)||!inMap(a,nx,ny))continue;if(solidIn(a,nx,ny)&&!(nx===tx&&ny===ty))continue;
      const dd=doorAt(a,nx,ny);if(dd&&!(nx===tx&&ny===ty))continue;prev.set(k,key(x,y));q.push([nx,ny]);}}
  if(!prev.has(key(tx,ty)))return null;
  const out=[];let k=key(tx,ty);while(k!==key(sx,sy)){out.unshift([k%W,Math.floor(k/W)]);k=prev.get(k);}return out;
}
function curEntry(id){const h=S.min/60,sc=schedFor(id);let k=sc[0];for(const v of sc)if(h>=v[0])k=v;return k;}
function arrive(n){const sp=n.act[n.spot]||n.act[0];n.dir=sp[2];n.pose=sp[3];n.dwell=sp[4]*(.7+Math.random()*.6);if(n.hideOn||sp[3]==='sleep')n.hidden=true;}
function warp(n){const sp=n.act[n.spot]||n.act[0];n.area=LOC_AREA[n.loc]||'castle';n.x=sp[0]*T+8;n.y=sp[1]*T+14;n.path=[];n.door=null;arrive(n);}
function retarget(n){
  const ta=LOC_AREA[n.loc]||'castle',sp=n.act[n.spot]||n.act[0];
  if(n.area!==ta){const d=nextDoor(n.area,ta);if(!d)return warp(n);n.door=d;const p=pathIn(AREAS[n.area],tileOf(n),[d.x,d.y]);if(p===null)return warp(n);n.path=p;if(!n.path.length)crossArea(n);}
  else{n.door=null;const p=pathIn(AREAS[n.area],tileOf(n),[sp[0],sp[1]]);if(p===null)return warp(n);n.path=p;if(!n.path.length)arrive(n);}
}
function crossArea(n){const d=n.door;n.door=null;if(!d)return warp(n);n.area=d.to;n.x=d.ax*T+8;n.y=d.ay*T+14;retarget(n);}
function placeNpcs(force){
  for(const n of npcs){if(n.scene)continue;const e=curEntry(n.id),key=e.join('|');
    if(key!==n.cur||force){n.cur=key;n.loc=e[1];n.act=ACTS[e[2]]||[[1,1,0,'stand',99]];n.spot=0;n.pose='stand';n.hideOn=e[3]==='hide';n.hidden=false;
      if(force)warp(n);else{n.dwell=0;retarget(n);}}}
}
function updateNpcs(dt){
  placeNpcs(false);
  for(const n of npcs){if(n.scene)continue;
    if(n.path.length){
      n.pose='stand';
      const [tx,ty]=n.path[0],gx=tx*T+8,gy=ty*T+14,dx=gx-n.x,dy=gy-n.y,d=Math.hypot(dx,dy);
      if(n.area===S.area&&Math.abs(P.x-gx)<11&&Math.abs(P.y-gy)<9){n.frame=0;n.blockT=(n.blockT||0)+dt;if(n.blockT<3)continue;}
      n.blockT=0;const st=(n.area===S.area?40:120)*dt;
      if(d<=st){n.x=gx;n.y=gy;n.path.shift();if(!n.path.length){if(n.door)crossArea(n);else arrive(n);}}
      else{n.x+=dx/d*st;n.y+=dy/d*st;n.dir=Math.abs(dx)>Math.abs(dy)?(dx<0?2:3):(dy<0?1:0);}
      n.anim+=dt;n.frame=n.path.length?[1,0,2,0][Math.floor(n.anim*7)%4]:0;
    }else{
      n.frame=0;n.dwell-=dt;
      if(n.dwell<=0&&n.act.length>1&&!n.hidden){let k;do k=Math.floor(Math.random()*n.act.length);while(k===n.spot);
        n.spot=k;const sp=n.act[k];n.path=pathIn(AREAS[n.area],tileOf(n),[sp[0],sp[1]])||[];if(!n.path.length)arrive(n);}
    }
  }
  for(const d of DUCKS){d.a+=dt*d.s;}
  if(CAT.t>0)CAT.t-=dt;else{CAT.t=6+Math.random()*10;const c=CAT.spots[Math.floor(Math.random()*CAT.spots.length)];CAT.tx=c[0]*T+8;CAT.ty=c[1]*T+12;}
  {const dx=CAT.tx-CAT.x,dy=CAT.ty-CAT.y,d=Math.hypot(dx,dy);if(d>1){CAT.x+=dx/d*Math.min(d,22*dt);CAT.y+=dy/d*Math.min(d,22*dt);CAT.dir=dx<0?-1:1;CAT.walk=1;}else CAT.walk=0;}
}
/* 동물 */
const DUCKS=[{cx:37,cy:29,r:22,a:0,s:.25},{cx:43,cy:31,r:16,a:2,s:-.32},{cx:41,cy:27,r:12,a:4,s:.4}];
const CAT={x:6*T+8,y:20*T+12,tx:6*T+8,ty:20*T+12,t:3,dir:1,walk:0,spots:[[6,20],[9,19],[3,20],[27,21],[13,20],[30,19]]};
function drawDucks(ctx,cx,cy,t){
  for(const d of DUCKS){const x=Math.round(d.cx*T+8+Math.cos(d.a)*d.r-cx),y=Math.round(d.cy*T+8+Math.sin(d.a)*d.r*.5-cy),f=Math.sin(d.a)*d.s>0?1:-1;
    ctx.fillStyle='rgba(255,255,255,.35)';ctx.fillRect(x-5,y+3,10,1);
    ctx.fillStyle='#3a2232';ctx.fillRect(x-4,y-2,9,5);ctx.fillRect(x+(f>0?2:-4),y-5,3,4);
    ctx.fillStyle='#f6f0e2';ctx.fillRect(x-3,y-1,7,3);ctx.fillStyle='#6a9a6a';ctx.fillRect(x+(f>0?2:-3),y-4,2,3);ctx.fillStyle='#f0b040';ctx.fillRect(x+(f>0?4:-5),y-3,2,1);}
}
function drawCat(ctx,sx,sy,t){const f=CAT.dir,w=CAT.walk&&Math.floor(t/150)%2;
  ctx.fillStyle='rgba(30,15,20,.25)';ctx.fillRect(sx-5,sy,10,2);
  ctx.fillStyle='#3a2232';ctx.fillRect(sx-5,sy-6,10,6);ctx.fillRect(sx+(f>0?2:-6),sy-9,4,4);ctx.fillRect(sx+(f>0?-7:5),sy-8,2,5);
  ctx.fillStyle='#e8a060';ctx.fillRect(sx-4,sy-5,8,4);ctx.fillRect(sx+(f>0?3:-5),sy-8,2,3);ctx.fillStyle='#fbf2e4';ctx.fillRect(sx-2,sy-2,4,1);
  ctx.fillStyle='#e8a060';ctx.fillRect(sx+(f>0?-6:5),sy-7,1,3);ctx.fillStyle='#3a2232';ctx.fillRect(sx+(f>0?2:-6),sy-10,1,1);ctx.fillRect(sx+(f>0?5:-3),sy-10,1,1);
  ctx.fillStyle='#3a2232';if(!w){ctx.fillRect(sx-4,sy,2,1);ctx.fillRect(sx+2,sy,2,1);}else{ctx.fillRect(sx-3,sy,2,1);ctx.fillRect(sx+1,sy,2,1);}}
function petCat(){const first=S.catDay!==S.day;diaryAdd('note','고양이 «치즈»를 쓰다듬었다.');S.catDay=S.day;if(first)S.hp=Math.min(100,S.hp+3);startDialog(null,[R_(first?'«치즈»가 손바닥에 머리를 비볐다. 그르릉. (체력 +3)':'«치즈»는 하품을 하고 돌아누웠다.')]);}


/* ───────── 이벤트 씬 연출 ───────── */
let SCENE=null;
const EMO={s:'!',b:'♥',a:'#',h:'♪',q:'?'};
function castOf(who,lines){const nm={};for(const id of ALL_IDS)nm[CH[id].name]=id;const s=new Set();if(who)s.add(who);
  const scan=arr=>{for(const L of arr||[]){if(!L)continue;if(L.s==='npc'&&L.w)s.add(L.w);if(L.s==='gst'&&nm[L.nm])s.add(nm[L.nm]);if(L.c)for(const o of L.c)scan(o.r);}};scan(lines);
  return [...s].filter(id=>npcs.some(n=>n.id===id)).slice(0,4);}
function stageCast(cast){
  const a=AREAS[S.area],[px,py]=tileOf(P),fr=[[0,1],[0,-1],[-1,0],[1,0]][P.dir],used=new Set([px+','+py]);
  const ring=[];for(let r=1;r<=3;r++)for(let dy=-r;dy<=r;dy++)for(let dx=-r;dx<=r;dx++)if(Math.max(Math.abs(dx),Math.abs(dy))===r)ring.push([dx,dy]);
  ring.sort((p,q)=>Math.hypot(p[0]-fr[0]*1.5,p[1]-fr[1]*1.5)-Math.hypot(q[0]-fr[0]*1.5,q[1]-fr[1]*1.5));
  let first=null;
  for(const id of cast){const n=npcs.find(n=>n.id===id);n.scene=true;n.path=[];n.door=null;n.hidden=false;n.pose='stand';n.frame=0;
    const [nx,ny]=tileOf(n);if(n.area===S.area&&Math.hypot(nx-px,ny-py)<=4){used.add(nx+','+ny);}
    else{const sp=ring.find(([dx,dy])=>{const x=px+dx,y=py+dy;return !used.has(x+','+y)&&!solidIn(a,x,y)&&!doorAt(a,x,y);});if(sp){n.area=S.area;n.x=(px+sp[0])*T+8;n.y=(py+sp[1])*T+14;used.add((px+sp[0])+','+(py+sp[1]));}}
    face(n);if(!first)first=n;}
  if(first){const dx=first.x-P.x,dy=first.y-P.y;P.dir=Math.abs(dx)>Math.abs(dy)?(dx<0?2:3):(dy<0?1:0);}
}
function playScene(m,who,lines,after,opt){
  lines=(lines||[]).filter(Boolean);if(lines[0]&&lines[0].s==='nar'&&/^—.*—$/.test(lines[0].t.trim()))lines=lines.slice(1);
  const cast=castOf(who,lines),card=$('#card');busy=true;$('#panel').hidden=true;
  card.innerHTML=`${m.sub?`<div class="cs">${m.sub}</div><div class="ln"></div>`:''}<div class="ct">${m.title}</div>`;card.classList.add('on');
  let go=false;const start=()=>{if(go)return;go=true;card.onclick=null;stageCast(cast);SCENE={cast,emo:null,cx:null,cy:null};$('#app').classList.add('scene');card.classList.remove('on');
    setTimeout(()=>{busy=false;startDialog(who,lines,after,Object.assign({scene:1},opt||{}));},420);};
  card.onclick=start;setTimeout(start,1700);
}
function endScene(){if(!SCENE)return;for(const id of SCENE.cast){const n=npcs.find(n=>n.id===id);if(n){n.scene=false;n.cur='';}}SCENE=null;$('#app').classList.remove('scene');}
function drawEmote(sx,sy,ch,t){const by=sy-46+Math.round(Math.sin(t/120)*1.5);ctx.fillStyle='#1d1416';ctx.fillRect(sx-6,by-1,13,11);ctx.fillStyle='#fbf6ec';ctx.fillRect(sx-5,by,11,9);ctx.fillRect(sx-1,by+9,3,2);
  ctx.fillStyle=ch==='♥'?'#d0506a':ch==='#'?'#c8402a':'#3a2a2a';
  if(ch==='!'){ctx.fillRect(sx,by+1,2,5);ctx.fillRect(sx,by+7,2,1);}
  else if(ch==='?'){ctx.fillRect(sx-1,by+1,4,1);ctx.fillRect(sx+2,by+2,1,2);ctx.fillRect(sx,by+4,2,1);ctx.fillRect(sx,by+7,2,1);}
  else if(ch==='♥'){ctx.fillRect(sx-3,by+2,2,2);ctx.fillRect(sx+2,by+2,2,2);ctx.fillRect(sx-3,by+3,7,2);ctx.fillRect(sx-2,by+5,5,1);ctx.fillRect(sx-1,by+6,3,1);ctx.fillRect(sx,by+7,1,1);}
  else if(ch==='#'){ctx.fillRect(sx-3,by+2,2,2);ctx.fillRect(sx+2,by+2,2,2);ctx.fillRect(sx-3,by+5,2,2);ctx.fillRect(sx+2,by+5,2,2);}
  else if(ch==='♪'){ctx.fillRect(sx+1,by+1,1,6);ctx.fillRect(sx+2,by+1,2,1);ctx.fillRect(sx-1,by+5,3,2);}}

/* ───────── 렌더 ───────── */
const cv=$('#game'),ctx=cv.getContext('2d'),stage=$('#stage');
let VW=200,VH=150,SC=2;
function resize(){
  const r=stage.getBoundingClientRect();
  SC=Math.max(2,Math.min(5,Math.round(r.width/128),Math.floor(r.height/(16*7))));
  VW=Math.ceil(r.width/SC);VH=Math.ceil(r.height/SC);
  cv.width=VW;cv.height=VH;cv.style.width=VW*SC+'px';cv.style.height=VH*SC+'px';
  ctx.imageSmoothingEnabled=false;sizeStand();
}
new ResizeObserver(resize).observe(stage);
const FLAKES=Array.from({length:90},()=>({x:Math.random(),y:Math.random(),s:.3+Math.random()*.7}));
const outdoor=()=>!!AREAS[S.area].outdoor;
function marker(x,y,t,col){y=Math.round(y+Math.sin(t/250)*2);ctx.fillStyle='#3a2a1e';ctx.fillRect(x-3,y-4,7,7);ctx.fillStyle=col;ctx.fillRect(x-2,y-3,5,5);ctx.fillStyle='#fff8e0';ctx.fillRect(x-1,y-2,2,2);ctx.fillStyle='#3a2a1e';ctx.fillRect(x,y+3,1,2);}
function draw(t){
  const a=AREAS[S.area],mw=a.MW*T,mh=a.MH*T;
  let fx=P.x,fy=P.y-10;if(SCENE){let k=1;for(const id of SCENE.cast){const n=npcs.find(n=>n.id===id);if(n&&n.area===S.area){fx+=n.x;fy+=n.y-10;k++;}}fx/=k;fy/=k;fy+=VH*.06;
    SCENE.cx=SCENE.cx==null?fx:SCENE.cx+(fx-SCENE.cx)*.08;SCENE.cy=SCENE.cy==null?fy:SCENE.cy+(fy-SCENE.cy)*.08;fx=SCENE.cx;fy=SCENE.cy;}
  const cx=mw<=VW?Math.round((mw-VW)/2):Math.round(Math.max(0,Math.min(mw-VW,fx-VW/2)));
  const cy=mh<=VH?Math.round((mh-VH)/2):Math.round(Math.max(0,Math.min(mh-VH,fy-VH/2)));
  ctx.fillStyle='#120c0d';ctx.fillRect(0,0,VW,VH);
  ctx.drawImage(a.cv,-cx,-cy);
  const here=npcs.filter(n=>n.area===S.area&&visible(n));
  if(S.area==='town')drawDucks(ctx,cx,cy,t);
  const ents=[...here.map(n=>({x:n.x,y:n.y,sp:spr(sprOf(n.id),n.dir,n.frame||0),n})),{x:P.x,y:P.y,sp:spr(pid(),P.dir,P.frame)}];
  if(S.area==='town'&&S.weather!=='rain')ents.push({x:CAT.x,y:CAT.y,cat:1});
  for(const d of a.dyn)if(d.x1>cx&&d.x0<cx+VW&&d.y1>cy&&d.y0<cy+VH)ents.push({y:d.sy,obj:d});
  ents.sort((a,b)=>a.y-b.y);
  for(const e of ents){
    if(e.obj){ctx.drawImage(e.obj.c,e.obj.px-cx,e.obj.py-cy);continue;}
    const sx=Math.round(e.x-cx),sy=Math.round(e.y-cy);
    if(e.cat){drawCat(ctx,sx,sy,t);continue;}
    ctx.fillStyle='rgba(30,15,20,.28)';ctx.fillRect(sx-5,sy-1,10,2);ctx.fillRect(sx-4,sy+1,8,1);
    if(e.n&&e.n.pose==='sit'){const st=tileOf(e.n),so=objAt(a,st[0],st[1]),seat=(so&&FLAT.has(so.k))||a.map[st[1]][st[0]]==='Y';
      if(e.n.dir===0&&!seat){ctx.fillStyle='#2e2024';ctx.fillRect(sx-7,sy-22,14,13);ctx.fillStyle='#7a4a2c';ctx.fillRect(sx-6,sy-21,12,11);ctx.fillStyle='#9a6038';ctx.fillRect(sx-6,sy-21,12,2);}
      ctx.drawImage(e.sp,0,0,16,26,sx-8,sy-27,16,26);
      if(e.n.dir!==0&&!seat){ctx.fillStyle='#2e2024';ctx.fillRect(sx-7,sy-3,14,4);ctx.fillStyle='#7a4a2c';ctx.fillRect(sx-6,sy-3,12,2);}
    }else ctx.drawImage(e.sp,sx-8,sy-31);
    if(e.n&&e.n.pose==='read'&&e.n.dir!==1){const bx=sx+(e.n.dir===2?-7:e.n.dir===3?3:-2),by=sy-11;ctx.fillStyle='#7a2c3a';ctx.fillRect(bx,by,5,4);ctx.fillStyle='#f4efe4';ctx.fillRect(bx+1,by+1,3,2);}
    if(e.n&&e.n.pose==='read'&&e.n.dir===1&&Math.floor(t/900)%2){ctx.fillStyle='#f4efe4';ctx.fillRect(sx-1,sy-34,3,2);}
    if(!e.n&&S.carry){const ix=sx-5,iy=sy-38;
      if(S.carry==='tea'){ctx.fillStyle='#4a3a30';ctx.fillRect(ix,iy+4,11,2);ctx.fillStyle='#ece6da';ctx.fillRect(ix+3,iy,5,4);ctx.fillStyle='#b8a47a';ctx.fillRect(ix+3,iy,5,1);ctx.fillRect(ix+8,iy+1,1,2);}
      else{for(let k=0;k<3;k++){ctx.fillStyle='#6b5640';ctx.fillRect(ix,iy+k*2,11,2);ctx.fillStyle='#a48a68';ctx.fillRect(ix,iy+k*2,2,2);ctx.fillRect(ix+9,iy+k*2,2,2);}}}
    if(SCENE&&SCENE.emo&&performance.now()-SCENE.emo.t<1600&&((e.n&&SCENE.emo.id===e.n.id)||(!e.n&&SCENE.emo.id==='me'))){drawEmote(sx,sy+(e.n&&CH[e.n.id].small?6:0),SCENE.emo.ch,t);continue;}
    if(e.n&&SCENE)continue;
    if(e.n){const by=sy-(CH[e.n.id].small?33:39)+Math.round(Math.sin(t/300)*1),id=e.n.id;
      const ap=S.appt&&S.appt.id===id&&S.appt.day===S.day&&e.n.loc===S.appt.loc;
      const ev=!ap&&nextHeart(id)&&nextHeart(id).when(e.n);
      if(ap||ev){ctx.fillStyle='#1d1416';ctx.fillRect(sx-5,by-1,11,8);ctx.fillStyle=ap?'#f2c75c':'#f4c0cc';ctx.fillRect(sx-4,by,9,6);ctx.fillRect(sx-2,by+6,2,2);
        ctx.fillStyle='#c4566c';ctx.fillRect(sx-2,by+1,2,1);ctx.fillRect(sx+1,by+1,2,1);ctx.fillRect(sx-3,by+2,7,1);ctx.fillRect(sx-2,by+3,5,1);ctx.fillRect(sx-1,by+4,3,1);}
      else if(!S.talked[id]&&!CH[id].kind){
        ctx.fillStyle='#1d1416';ctx.fillRect(sx-5,by-1,11,8);ctx.fillStyle='#f4e9d3';ctx.fillRect(sx-4,by,9,6);ctx.fillRect(sx-2,by+6,2,2);
        ctx.fillStyle='#c4566c';ctx.fillRect(sx-3,by+3,1,1);ctx.fillRect(sx,by+3,1,1);ctx.fillRect(sx+3,by+3,1,1);}}
  }
  const via=(m,col)=>{if(m.area===S.area)return marker(Math.round(m.px-cx),m.py-cy,t,col);const d=nextDoor(S.area,m.area);if(d)marker(d.x*T+8-cx,d.y*T-(a.outdoor?6:2)-cy,t,col);};
  for(const m of targets())via(m,'#f2c75c');for(const m of storyMarks())via(m,'#ee9ab0');
  // 하늘
  const h=S.min/60;let al=0;if(h>=16.5)al=Math.min(.5,(h-16.5)/5*.5);else if(h<7)al=.15;
  if(S.weather==='cloudy'||S.weather==='blizzard'||S.weather==='rain')al+=.06;
  if(al){ctx.fillStyle=`rgba(18,22,58,${al})`;ctx.fillRect(0,0,VW,VH);
    if(al>.18){ctx.globalCompositeOperation='lighter';for(const [lx,ly] of LAMPS[S.area]){const x=lx-cx,y=ly-cy;if(x<-30||y<-30||x>VW+30||y>VH+30)continue;const g=ctx.createRadialGradient(x,y,1,x,y,26);g.addColorStop(0,`rgba(255,200,120,${al*.7})`);g.addColorStop(1,'rgba(255,200,120,0)');ctx.fillStyle=g;ctx.fillRect(x-26,y-26,52,52);}ctx.globalCompositeOperation='source-over';}}
  if(S.weather==='rain'&&outdoor()){ctx.fillStyle='rgba(60,70,110,.12)';ctx.fillRect(0,0,VW,VH);ctx.fillStyle='rgba(200,220,245,.7)';
    for(const f of FLAKES){const x=((f.x*VW-t*.03*f.s)%VW+VW)%VW,y=((f.y*VH+t*.18*f.s)%VH);ctx.fillRect(Math.round(x),Math.round(y),1,f.s>.6?4:3);}}
  if((S.weather==='snow'||S.weather==='blizzard')&&outdoor()){const bz=S.weather==='blizzard';ctx.fillStyle='rgba(255,255,255,.85)';
    for(const f of FLAKES){const x=((f.x*VW+t*.012*(bz?3:1)*f.s)%VW+VW)%VW,y=((f.y*VH+t*.02*f.s*(bz?2:1))%VH);ctx.fillRect(Math.round(x),Math.round(y),f.s>.7?2:1,f.s>.7?2:1);}
    if(bz){ctx.fillStyle='rgba(230,240,250,.18)';ctx.fillRect(0,0,VW,VH);}}
}

/* ───────── 입력 ───────── */
const keys={},pad={x:0,y:0};
const ACT=[' ','enter','z','e'];
addEventListener('keydown',e=>{
  const k=e.key.toLowerCase();
  if(['arrowup','arrowdown','arrowleft','arrowright',' '].includes(k))e.preventDefault();
  if(!$('#title').hidden)return;
  if(D&&D.choosing&&['arrowup','arrowdown','w','s'].includes(k)){const n=curLine().c.length;D.sel=(D.sel+(k==='arrowup'||k==='w'?n-1:1))%n;renderChoices();return;}
  if(MG&&MG.dir){const m={arrowleft:'l',a:'l',arrowright:'r',d:'r',arrowup:'u',w:'u',arrowdown:'d',s:'d'}[k];if(m&&!e.repeat){MG.dir(m);return;}}
  if(ACT.includes(k)){if(!e.repeat)action();return;}
  if(!e.repeat){const pk={h:'rel',q:'work',m:'map',b:'bag',i:'bag',x:'menu',escape:'close'}[k];if(pk){pk==='close'?closePanel():togglePanel(pk);return;}}
  keys[k]=1;
});
addEventListener('keyup',e=>{keys[e.key.toLowerCase()]=0;});
addEventListener('blur',()=>{for(const k in keys)keys[k]=0;pad.x=pad.y=0;});
document.querySelectorAll('.dpad button').forEach(b=>{
  const d=b.dataset.d,set=v=>{if(d==='l')pad.x=-v;if(d==='r')pad.x=v;if(d==='u')pad.y=-v;if(d==='d')pad.y=v;b.classList.toggle('on',!!v);};
  b.addEventListener('pointerdown',e=>{e.preventDefault();if(MG&&MG.dir){MG.dir(d);return;}b.setPointerCapture(e.pointerId);set(1);});
  ['pointerup','pointercancel','lostpointercapture'].forEach(ev=>b.addEventListener(ev,()=>set(0)));
});
$('#abtn').addEventListener('pointerdown',e=>{e.preventDefault();action();});
$('#dlg').addEventListener('click',e=>{if(!e.target.closest('.cbtn'))action();});
$('#mg').addEventListener('pointerdown',e=>{if(!e.target.closest('button')&&MG){e.preventDefault();MG.press();}});
cv.addEventListener('click',()=>{if(D)action();});

/* ───────── 대화 엔진 ───────── */
let D=null,busy=false;
const curLine=()=>D&&D.lines[D.i];
function startDialog(who,lines,after,opt){D={who,lines:(lines||[]).filter(Boolean),i:0,shown:0,full:'',choosing:false,sel:0,after,eL:'n',eR:'n',right:who,replay:opt&&opt.replay,scene:opt&&opt.scene};$('#panel').hidden=true;showLine();}
function showLine(){
  let L=curLine();if(!L)return endDialog();
  if(L.fn){const r=D.replay?[]:(L.fn()||[]);D.lines.splice(D.i+1,0,...r.filter(Boolean));D.i++;return showLine();}
  $('#dlg').hidden=false;
  if(L.c){const vis=L.c.filter(o=>!o.need||o.need());L.cv=vis;D.choosing=true;D.sel=0;renderChoices();$('#next').hidden=true;return;}
  D.choosing=false;$('#choices').innerHTML='';
  D.full=L.t;D.shown=0;$('#dtext').textContent='';
  const nar=L.s==='nar',who=L.s==='me'?pid():L.s==='npc'?(L.w||D.who):null,gst=L.s==='gst';
  if(L.s==='npc')D.right=L.w||D.who;
  $('#dlg').classList.toggle('nar',nar);
  const nm=gst?L.nm:who?(who===pid()?myName():CH[who].name):'';
  $('#dname').hidden=!nm;$('#dname').textContent=nm;
  if(L.s==='me')D.eL=L.e||'n';if(L.s==='npc')D.eR=L.e||'n';
  const portrait=S.mode==='portrait'&&!D.scene;
  if(SCENE&&L.e&&EMO[L.e]){const nm2={};for(const id of ALL_IDS)nm2[CH[id].name]=id;const sid=L.s==='me'?'me':L.s==='npc'?(L.w||D.who):L.s==='gst'?nm2[L.nm]:null;if(sid)SCENE.emo={id:sid,ch:EMO[L.e],t:performance.now()};}
  $('#pbox').hidden=!(portrait&&who);
  if(portrait&&who&&hasArt(who)){blit($('#pcv'),bust(who,L.e||'n'));$('#pname').textContent=nm;}else if(portrait)$('#pbox').hidden=true;
  $('#dlg').classList.toggle('pm',portrait&&!!who);
  const showSt=!portrait&&!!(D.right||L.s==='me');
  $('#stand').hidden=!showSt;
  if(showSt){
    const sl=$('#standL'),sr=$('#standR');
    blit(sl,standing(pid(),D.eL));sl.classList.toggle('dim',L.s!=='me');sl.classList.toggle('talk',L.s==='me');
    sr.hidden=!D.right;
    if(D.right&&hasArt(D.right)){blit(sr,standing(D.right,D.eR));sr.classList.toggle('dim',L.s!=='npc');sr.classList.toggle('talk',L.s==='npc');}
    sizeStand();
  }
}
function sizeStand(){
  const r=stage.getBoundingClientRect(),dh=$('#dlg').hidden?0:$('#dlg').offsetHeight;
  $('#stand').style.bottom=Math.max(0,dh-24)+'px';
  for(const [el,id] of [[$('#standL'),pid()],[$('#standR'),D&&D.right]]){
    const art=id&&ARTC.s[id],ratio=art?96/160:64/166,avail=r.height-Math.max(0,dh-24)-12;
    let h=Math.min(avail*(art?.92:1.1),(r.width*.46)/ratio);
    if(id&&CH[id]&&CH[id].small&&!art)h*=.75;
    el.classList.toggle('card',!!art);el.style.height=Math.round(h)+'px';el.style.width=Math.round(h*ratio)+'px';
  }
}
function renderChoices(){
  const L=curLine(),box=$('#choices');box.innerHTML='';
  L.cv.forEach((o,i)=>{const b=document.createElement('button');b.className='cbtn'+(i===D.sel?' sel':'');b.textContent=o.t;
    b.addEventListener('click',e=>{e.stopPropagation();choose(i);});box.appendChild(b);});
}
function choose(i){
  const o=curLine().cv[i];
  if(!D.replay){
    if(o.p){const to=o.to||D.right||D.who;if(to&&CH[to])addPts(to,o.p);}
    if(o.rep)S.rep=Math.max(0,Math.min(100,S.rep+o.rep));
    if(o.sus)addSus(o.sus);
    if(o.f)Object.assign(S.f,o.f);
    if(o.go)o.go();
    if(o.act)D.after=o.act;
  }else if(o.act&&o.act==='sleep')D.after=o.act;
  D.lines.splice(D.i+1,0,...(o.r||[]));
  D.i++;$('#choices').innerHTML='';showLine();
}
function advance(){
  if(D.choosing){choose(D.sel);return;}
  if(D.shown<D.full.length){D.shown=D.full.length;$('#dtext').textContent=D.full;return;}
  D.i++;showLine();
}
function endDialog(){
  const after=D.after;D=null;endScene();
  $('#dlg').hidden=true;$('#stand').hidden=true;$('#choices').innerHTML='';
  save();hud();
  if(typeof after==='function')after();else if(after==='sleep')newDay(false);
}

/* ───────── 점수 · 의심도 ───────── */
function addPts(id,p){
  const before=hearts(id);S.pts[id]=Math.max(0,Math.min(1000,(S.pts[id]||0)+p));const after=hearts(id);
  toast(p<0?`${CH[id].name} <i>♥ ${p}</i>`:after>before?`${jo(CH[id].name,'과','와')} 가까워졌다 <i>♥ ${after}</i>`:`${CH[id].name} <i>♥ +${p}</i>`);
}
let toastT;function toast(html){const t=$('#toast');t.innerHTML=html;t.classList.add('on');clearTimeout(toastT);toastT=setTimeout(()=>t.classList.remove('on'),1800);}
function addPtsQ(id,p){S.pts[id]=Math.max(0,Math.min(1000,(S.pts[id]||0)+p));}
function addSus(v){
  if(S.f.public||S.ending==='home')return;
  if(v>0&&S.f.marta_ally)v=Math.ceil(v/2);
  if(v>0&&S.f.knows)v=Math.ceil(v*.6);
  const b=S.sus;S.sus=Math.max(0,Math.min(100,S.sus+v));
  if(v)toast(v>0?`의심도 <i>+${S.sus-b}</i>`:`의심도 <i>${S.sus-b}</i>`);
  for(const [th,k] of [[40,'rumor'],[70,'near'],[100,'exposed']])if(S.sus>=th&&!S.susFlags[k]){S.susFlags[k]=1;S.queue.push(k);}
}
function susScene(k){
  if(k==='rumor')return [R_('— 수군거림 —'),R_('복도 모퉁이에서 하인들 목소리가 들렸다.'),G('하인','부집사님 말이야, 좀 이상하지 않아? 목소리도 가늘고, 씻는 것도 혼자만 따로 씻고…'),G('하인','에이, 설마.'),M('s','(…조심해야 해.)'),{fn:()=>{S.rep=Math.max(0,S.rep-3);return null;}}];
  if(k==='near')return [R_('— 들킬 뻔한 밤 —'),R_('방에서 붕대를 고쳐 매던 참이었다. 노크도 없이 문이 열렸다.'),
    ...(S.f.roewen_ally?[X('roewen','s','꼬마, 들어간다— 어, 어이쿠! 미안!'),R_('로웬은 천장만 쳐다보며 문을 닫았다. 문 너머에서 목소리가 들렸다.'),X('roewen','n','…아무것도 못 봤다. 진짜로.'),{fn:()=>{addSus(-15);return null;}}]
      :S.f.marta_ally?[X('marta','a','꼬맹아, 빨래— 어머! 문 잠그고 하라고 했지!'),R_('마르타는 재빨리 들어와 문을 닫고 등으로 막아섰다.'),X('marta','n','밖에 팀 있어. 얼른 입어.'),{fn:()=>{addSus(-15);return null;}}]
      :[X('tim','s','형? …형?'),R_('팀이 문간에 서서 눈을 동그랗게 떴다.'),C({t:'"부, 부상을 입어서 붕대를 감는 중이야!"',sus:4,r:[X('tim','s','형, 다쳤어요? 아파요?'),M('s','괜찮아, 괜찮아! 문 닫아 줄래?')]},{t:'"팀, 이건 우리 둘만의 비밀이야."',p:40,to:'tim',r:[X('tim','n','…비밀이요? 네. 저 비밀 진짜 잘 지켜요.'),R_('팀은 새끼손가락을 내밀었다.')]})])];
  if(k==='exposed'){
    const k8=!!S.f.knows,kh=hearts('kairan');
    const lines=[R_('— 정체 발각 —'),R_('계단에서 발을 헛디뎠다. 셔츠 단추가 뜯겨 나가고, 붕대가 풀렸다.'),R_('복도에 있던 하인들이 숨을 삼켰다. 소문은 반나절 만에 성 전체에 퍼졌다.')];
    if(kh>=6||k8)return [...lines,X('kairan','n','소란 떨지 마라.'),X('kairan','n','나는 이미 알고 있었다. 이 사람의 이름은 에레나다. 그리고 내 성의 부집사다.'),X('kairan','a','불만 있는 자는 나에게 직접 말해라.'),R_('아무도 입을 열지 못했다.'),X('kairan','b','…이제 숨길 필요 없다. 네 이름으로 일해라.'),{fn:()=>{S.f.public=1;S.sus=0;S.role='부집사 에레나';S.rep=Math.max(0,S.rep-5);logEv('정체 공개 — 전하의 보호',null);return null;}}];
    if(S.rep>=60)return [...lines,X('edmund','n','전하. 이 사람은 지난 계절 동안 누구보다 성실했습니다.'),X('edmund','n','부집사직은 거두시더라도, 성에 남게 해 주십시오.'),X('kairan','n','…그렇게 해라. 마르타 밑에서 일하게.'),{fn:()=>{S.f.public=1;S.sus=0;S.role='하녀 에레나';S.wage=3;S.rep=Math.max(0,S.rep-15);logEv('정체 공개 — 하녀로 남다',null);return null;}}];
    return [...lines,X('kairan','n','…속였군.'),X('kairan','n','내일 아침까지 성을 떠나라.'),{fn:()=>{S.ending='home';S.role='—';logEv('엔딩: 귀향 (정체 발각)',null);setTimeout(showHomeEnd,300);return null;}}];
  }
  return [];
}

/* ───────── 상호작용 ───────── */
const DIRV=[[0,1],[0,-1],[-1,0],[1,0]];
function facing(){const [dx,dy]=DIRV[P.dir];return {qx:P.x+dx*12,qy:P.y-4+dy*12,dx,dy};}
function action(){
  if(busy)return;
  if(MG){MG.press();return;}
  if(!$('#panel').hidden){closePanel();return;}
  if(D){advance();return;}
  const {qx,qy,dx,dy}=facing(),here=npcs.filter(n=>n.area===S.area&&visible(n));
  let n=here.find(n=>Math.hypot(n.x-qx,n.y-4-qy)<13);
  if(!n&&solidAt(Math.floor(qx/T),Math.floor(qy/T))){const q2x=P.x+dx*28,q2y=P.y-4+dy*28;n=here.find(m=>Math.hypot(m.x-q2x,m.y-4-q2y)<13);}
  if(n){if(n.id==='kairan'&&S.carry==='tea'){n.dir=P.y<n.y?1:0;deliverTea(n);return;}interactNpc(n);return;}
  if(S.area==='town'&&S.weather!=='rain'&&Math.hypot(CAT.x-qx,CAT.y-2-qy)<12)return petCat();
  const tx=Math.floor(qx/T),ty=Math.floor(qy/T),a=AREAS[S.area];
  if(!inMap(a,tx,ty))return;
  const c=a.map[ty][tx],ob=objAt(a,tx,ty);
  if(c==='G')return gateAct();
  if(workAt(tx,ty,ob))return;
  if(ob&&ob.it==='mybed')return bedAct();
  if(ob&&(ob.it==='counter'||ob.it==='bar'||ob.it==='hdesk')){const sid=SHOP_OF[S.area];if(sid){const own=npcs.find(n=>ROSTER[n.id]&&ROSTER[n.id].shop===sid&&n.area===S.area&&visible(n));if(own)return interactNpc(own);return startDialog(null,[R_('주인이 자리를 비웠다.')]);}}
  const ot=objText(ob);if(ot)return startDialog(null,ot);
  if(c==='K')return openShop('market');
  if(c==='Y')return restBench();
  if(c==='L')return startDialog(null,[R_(dateOf(S.day).season==='겨울'?'호수가 통째로 얼어 반짝인다.':S.weather==='rain'?'빗방울이 호수 위에 동그라미를 그린다.':'잔잔한 물에 하늘이 비친다.')]);
  if(c==='F')return startDialog(null,[R_('분수. 맑은 물소리. 바닥에 동전 몇 닢이 반짝인다.')]);
  if(c==='T')return startDialog(null,[R_('테라스 탁자. 날이 좋으면 여기서 차를 마시는 사람이 많다.')]);
  if(c==='u')return startDialog(null,[R_('우물. 두레박 물이 차갑고 달다.')],()=>{if(S.wellDay!==S.day){S.wellDay=S.day;S.hp=Math.min(100,S.hp+4);toast('시원하다 <i>체력 +4</i>');}});
  if(c==='g')return startDialog(null,S.area==='town'?[R_('마을 게시판.'),R_(S.day<41?'«대공성 연회 — 8월 13일. 마을 꽃집 납품 모집»':S.day<60?'«하겐 상회, 가격 인하 행사!»':'«잃어버린 고양이 찾음. 이름: 치즈»'),R_('«이번 주 일요일 장터 — 분수 광장»')]:[R_('성 안내판. «본관 · 서쪽 별관(사용인 숙소) · 동쪽 별관(연회장) · 기사단 숙소 · 마구간»')]);
  if(c==='V'||c==='X')return startDialog(null,[R_(c==='V'?'술통이다. 시큼한 냄새가 난다.':'상자 틈으로 사과가 보인다.')]);
  if(c==='j')return startDialog(null,[R_('채소를 가득 실은 수레. 오스카네 물건이다.')]);
  if(c==='Z')return startDialog(null,[R_('갈대 사이로 개구리가 퐁당 뛰어들었다.')]);
  if(c==='e')return startDialog(null,[R_('정성껏 가꾼 텃밭. 당근 잎이 파릇하다.')]);
  if(c==='n')return startDialog(null,[R_(S.weather==='rain'?'창밖으로 빗줄기가 흐른다.':S.min>=19*60?'창밖이 어둑하다. 별이 몇 개 떴다.':'창밖으로 북부의 하늘이 맑다.')]);
}
function bedAct(){
  if(S.story.final==='pending')return startDialog(null,[R_('오늘은 잠들 수 없다. 저녁 8시, 전하께서 집무실에서 기다리신다.')]);
  if(mustWork()){const need=Math.min(...S.tasks.filter(t=>!t.done).map(t=>TASKS[t.id].hp));if(S.hp>=need)return startDialog(null,[R_(`아직 오늘 업무가 ${workLeft()}개 남았다. 일과를 끝내야 잘 수 있다.`)]);
    return startDialog(null,[R_('업무가 남았지만 몸이 한계다…… (못 끝낸 업무만큼 평판이 내려간다)'),C({t:'잔다',act:'sleep'},{t:'조금 더 버틴다'})]);}
  startDialog(null,[R_('침대다. 오늘은 이만 잘까?'),C({t:'잔다',act:'sleep'},{t:'아직 할 일이 남았다'})]);
}
const SHOP_OF={gen:'gen',flower:'flower',book:'book',tea:'tea',bakery:'bakery',hagen:'hagen',tavern:'tavern',tailor:'tailor'};
function face(n){const dx=P.x-n.x,dy=P.y-n.y;n.dir=Math.abs(dx)>Math.abs(dy)?(dx<0?2:3):(dy<0?1:0);}
function nextHeart(id){return (HEART[id]||[]).find(e=>!S.seen[e.id]&&hearts(id)>=e.h)||null;}
function heartLines(id,ev){if(ev.id==='k4')return EVENTS.k3;if(ev.id==='k6')return EVENTS.k6;return typeof ev.lines==='function'?ev.lines():ev.lines;}
function runHeart(id,ev,replay){
  if(!replay){S.seen[ev.id]=1;S.talked[id]=1;logEv(`${CH[id].name} ♥${ev.h} · ${ev.title}`,`h:${id}:${ev.id}`);
    if(ev.fx)ev.fx();if(ev.give){S.inv[ev.give]=(S.inv[ev.give]||0)+1;}}
  playScene({title:ev.title,sub:`${CH[id].name} ♥${ev.h}`},id,heartLines(id,ev),null,{replay});
}
function greet(id){
  const out=[];
  if(S.ending&&END_GREET[S.ending]&&END_GREET[S.ending][id])out.push(...END_GREET[S.ending][id]);
  else if(S.f.public&&id==='tim')out.push(N('h','누나! 아직도 누나라고 부르는 거 어색해요. 헤헤.'));
  else out.push(...GREET[id][REPT()]);
  if(isBday(id))out.push(R_(`(오늘은 ${CH[id].name}의 생일이다.)`));
  if(id==='kairan'&&S.jeal&&hearts('kairan')>=5){S.jeal=0;out.push(N('n','로웬과 꽤 가깝게 지낸다고 들었다.'),M('s','네? 아, 단장님이 잘 챙겨 주셔서…'),N('a','…그래. 즐거운가 보군.'),R_('그의 펜 끝이 종이에 꾹 박혔다.'));}
  if(S.stood[id]&&S.day-S.stood[id]<=1)out.push(N('a',id==='kairan'?'어제는 기다리게 하더군.':id==='tim'?'형… 어제 왜 안 왔어요…':'지난번 약속, 잊은 거야?'));
  return out;
}
const EXTRA_TALK={
  demian:()=>[[G('데미안','……부집사님. 무기고 정리, 오늘도 하십니까.')],[G('데미안','……전하께서 부집사님 곁을 지키라 하셨습니다. 부려 주십시오.')],[G('데미안','……로웬 단장님 말씀은 반만 믿으십시오.')]],
  cecilia:()=>[[G('세실리아','어머, 꼬맹이 부집사. 또 장부 끼고 다니니?')],[G('세실리아','카이런 곁에 너무 붙어 있지 마. 보기 흉하니까.')],[G('세실리아','……차 온도, 오늘은 괜찮더라. 칭찬은 아니야.')]],
};
function interactNpc(n){
  face(n);const id=n.id;
  if(EXTRA_TALK[id]){const p=EXTRA_TALK[id]();return startDialog(null,p[S.day%p.length]);}
  if(CH[id].kind){const r=ROSTER[id];const sid=r.shop&&SHOPS[r.shop]&&!SHOPS[r.shop].closed&&n.loc===r.shop+'_in'&&!n.hideOn?r.shop:null;
    if(sid&&shopOpen(sid)){const s=SHOPS[sid];return startDialog(null,[G(r.name,s.hi),C({t:s.service==='rest'?'차를 주문한다 / 둘러본다':s.service==='drink'?'한잔 / 둘러본다':'물건을 본다',act:()=>togglePanel('shop',sid)},{t:'이야기한다',act:()=>startDialog(null,folkLines(n))},{t:'그만둔다'})]);}
    diaryAdd('talk',id);return startDialog(null,folkLines(n));}
  if(S.appt&&S.appt.id===id&&S.appt.day===S.day&&n.loc===S.appt.loc&&S.min>=(S.appt.hour-.5)*60)return runDate(id);
  const ev=nextHeart(id);if(ev&&ev.when(n))return runHeart(id,ev);
  const opts=[{t:S.talked[id]?'이야기한다 (오늘은 이미 했다)':'이야기한다',act:()=>talkDaily(n)}];
  if(giftables().length)opts.push(canGift(id)?{t:'선물한다',act:()=>togglePanel('gift',id)}:{t:'선물한다 (이번엔 이미 줬다)',act:()=>startDialog(id,[R_(S.gifted[id]===S.day?'오늘은 이미 선물을 줬다.':'이번 주에는 이미 두 번 선물했다.')])});
  if(apptOK(id))opts.push({t:'약속을 잡는다',act:()=>apptMenu(id)});
  if(S.appt&&S.appt.id===id)opts.push({t:'약속 확인',act:()=>startDialog(id,[N('n',apptTalk()),R_(apptText())])});
  opts.push({t:'그만둔다'});
  startDialog(id,[...greet(id),C(...opts)]);
}
function talkDaily(n){
  const id=n.id,h=hearts(id),L=LINES[id],tier=h>=6?2:h>=3?1:0;
  if(S.talked[id]){const r=L.rep[Math.min(tier,L.rep.length-1)];startDialog(id,r);return;}
  S.talked[id]=1;diaryAdd('talk',id);addPts(id,[18,30,38][REPT()]);
  const pool=L.t[Math.min(tier,L.t.length-1)];
  let lines=pool[(S.day+id.length)%pool.length];
  const rl=REPLINE[id]&&REPLINE[id][REPT()];if(rl&&S.day%2===0)lines=[...rl,...lines];
  if(id==='edmund'){const left=S.tasks.filter(t=>!t.done).map(t=>TASKS[t.id].name);
    lines=[...lines,isSunday()?N('h','오늘은 휴무입니다. 마을에 다녀오셔도 좋습니다.'):left.length?N('n',`오늘 남은 업무는 ${left.join(', ')}입니다. 부탁드립니다, 부집사님.`):N('h','오늘 업무는 모두 끝내셨군요. 남은 시간은 편히 쓰십시오.')];}
  if(S.weather==='snow'&&id==='tim')lines=[N('h','형! 눈 와요! 이따 눈사람 만들어요!'),...lines];
  if(S.weather==='rain'&&id==='kairan')lines=[N('n','비 오는 날엔 저장고 습기부터 확인해라.'),...lines];
  if(id==='kairan'&&S.f.dinner&&n.loc==='dining'&&!S.talked._dinner){S.talked._dinner=1;addPts('kairan',30);lines=[R_('식기는 오늘도 두 벌, 한쪽 모서리에 나란히.'),N('n',S.f.knows?'앉아라, 에레나.':'앉아라.'),R_('브란트의 요리를 먹으며 하루 일을 보고했다. 그는 가끔 고개를 끄덕였다.')];}
  if(S.weather==='blizzard'&&id==='kairan')lines=[N('n','눈보라다. 오늘은 성 밖에 나가지 마라.'),...lines];
  startDialog(id,lines);
}

/* 선물 */
const giftables=()=>Object.keys(S.inv).filter(k=>S.inv[k]>0&&!ITEMS[k].key&&!ITEMS[k].tool);
const canGift=id=>S.gifted[id]!==S.day&&((S.giftWk[id]||0)<2||isBday(id));
function giveGift(id,it){
  closePanel();S.inv[it]--;const pr=PREF[id];
  const cat=pr.love.includes(it)?'love':pr.like.includes(it)?'like':pr.dis.includes(it)?'dis':'neu',bd=isBday(id);
  let p={love:80,like:45,neu:20,dis:-25}[cat];if(bd&&p>0)p*=3;
  S.gifted[id]=S.day;S.giftWk[id]=(S.giftWk[id]||0)+1;(S.known[id]=S.known[id]||{})[it]=cat;diaryAdd('gift',[id,it,cat]);
  if(id==='roewen'&&cat!=='dis')S.jeal=1;
  if(it==='scarf'&&id==='kairan')S.f.scarf=1;
  const ln=bd&&cat!=='dis'?GIFT_LINES[id].bday:GIFT_LINES[id][cat];
  startDialog(id,[R_(`${jo(ITEMS[it].n,'을','를')} 건넸다.`),...ln]);addPts(id,p);
}

/* 약속 */
function apptOK(id){return !S.appt&&S.ending!=='home'&&hearts(id)>=(id==='kairan'?4:3)&&DATES[id];}
function apptText(){const a=S.appt,d=DATES[a.id].find(x=>x.k===a.k),dd=dateOf(a.day);return `약속: ${d.name} · ${dd.label} (${WD[dd.wd]}) ${a.hour>12?'오후':'오전'} ${a.hour>12?a.hour-12:a.hour}시 · ${RNAME[a.loc]}`;}
function apptTalk(){return S.appt.id==='kairan'?'잊지 마라.':S.appt.id==='tim'?'형, 꼭 와야 돼요!':'잊지 말고 와!';}
function apptMenu(id){
  if(id==='kairan'&&S.rep<40)return startDialog(id,[M('n','저, 전하. 혹시 시간이 되시면…'),N('a','일이나 제대로 해라.'),R_('평판이 «보통» 이상이어야 전하께서 약속을 받아 주실 것 같다.')]);
  if(S.stood[id]&&S.day-S.stood[id]<7)return startDialog(id,[N('a','지난번에 바람맞혔잖아. 이번 주는 됐어.')]);
  const opts=[],nextSun=S.day+((6-dateOf(S.day).wd+7)%7||7);
  for(const d of DATES[id]){if(d.min&&hearts(id)<d.min)continue;
    const days=[];if(S.min<(d.hour-1)*60&&(!d.sun||isSunday()))days.push([S.day,'오늘']);
    if(!d.sun||dateOf(S.day+1).wd===6)days.push([S.day+1,'내일']);
    if(!days.some(v=>v[0]===nextSun))days.push([nextSun,'이번 일요일']);
    for(const [day,lab] of days.slice(0,2))opts.push({t:`${d.name} — ${lab} ${d.hour>12?'오후 '+(d.hour-12):'오전 '+d.hour}시`,act:()=>{
      S.appt={id,k:d.k,day,hour:d.hour,loc:d.loc,spot:d.spot};placeNpcs(false);save();
      startDialog(id,[N('h',{kairan:'…그래. 늦지 마라.',roewen:'좋지! 기대한다, 꼬마.',marta:'그래, 그날 보자.',brant:'좋아요! 약속이에요?',edmund:'영광입니다, 부집사님.',tim:'진짜요?! 형 최고!'}[id]),R_(apptText())]);}});}
  opts.push({t:'다음에 하자'});
  startDialog(id,[N('n',{kairan:'…무슨 일이지.',roewen:'오, 놀자고?',marta:'왜, 꼬맹아?',brant:'응? 같이 뭐 하자고요?',edmund:'네, 부집사님.',tim:'형, 같이 놀아요?'}[id]),C(...opts)]);
}
function runDate(id){
  const a=S.appt,d=DATES[id].find(x=>x.k===a.k);S.appt=null;S.talked[id]=1;
  logEv(`약속 · ${jo(CH[id].name,'과','와')} ${d.name}`,`d:${id}:${d.k}`);
  if(id==='roewen')S.jeal=1;
  playScene({title:d.name,sub:`${jo(CH[id].name,'과','와')}의 약속`},id,d.lines,()=>{S.min=Math.min(1430,S.min+60);placeNpcs(false);});addPts(id,60);
}
function checkAppt(){const a=S.appt;if(!a)return;
  if(S.day>a.day||(S.day===a.day&&S.min>=(a.hour+2)*60)){S.appt=null;addPtsQ(a.id,-50);S.stood[a.id]=S.day;toast(`${jo(CH[a.id].name,'과','와')}의 약속을 어겼다 <i>♥ −50</i>`);placeNpcs(false);}}

/* 스토리 */
function storyToday(){return STORY.filter(e=>e.day===S.day);}
function storyMarks(){const out=[];for(const e of storyToday())if(e.t==='s'&&S.story[e.id]==='pending'&&!(e.after&&S.story[e.after]!=='done')){const id=e.loc[0],a=LOC_AREA[id],r=[...AREAS[a].ROOMS,...AREAS[a].OUT].find(r=>r[0]===id);if(r)out.push({area:a,px:(r[2]+r[4]/2)*T,py:(r[3]+1)*T,label:e.title});}
  if(S.appt&&S.appt.day===S.day){const n=npcs.find(n=>n.id===S.appt.id);out.push({area:LOC_AREA[S.appt.loc],px:S.appt.spot[0]*T+8,py:S.appt.spot[1]*T-20,label:'약속'});}
  return out;}
function checkStory(){
  if(D||busy||MG)return;
  if(S.queue.length){const k=S.queue.shift();startDialog(null,susScene(k));return;}
  for(const e of storyToday()){if(e.t!=='s'||S.story[e.id]!=='pending')continue;
    if(e.after&&S.story[e.after]!=='done')continue;
    const h=S.min/60;
    if(h>e.to){S.story[e.id]='missed';if(e.minor)continue;const m=e.miss&&e.miss();logEv(`${e.title} (놓침)`,null);if(m&&m.length)startDialog(null,m);return;}
    if(h>=e.from&&S.area===LOC_AREA[e.loc[0]]&&e.loc.includes(roomAt(...tileOf({x:P.x,y:P.y})))){S.story[e.id]='done';logEv(e.title,'s:'+e.id);if(e.fx)e.fx();
      if(e.id==='final')return endingScene();playScene({title:e.title.replace(/ \(오리지널\)/,''),sub:e.ch?`원작 ${e.ch}`:e.minor?'작은 이벤트':e.orig?'오리지널':''},null,e.run());return;}
  }
}

/* 마을 · 성문 · 상점 */
function gateAct(){
  if(S.area==='town')return startDialog(null,[R_('성으로 돌아갈까?'),C({t:'돌아간다',act:()=>changeArea('castle',31,55,1,10)},{t:'조금 더 둘러본다'})]);
  if(S.carry)return startDialog(null,[R_('들고 있는 것부터 처리하자.')]);
  if(S.injury>0&&!storyToday().some(e=>S.story[e.id]==='pending'&&e.loc&&LOC_AREA[e.loc[0]]==='town'))return startDialog(null,[R_(`다친 몸으로는 외출할 수 없다. (회복까지 ${S.injury}일)`)]);
  if(S.weather==='blizzard')return startDialog(null,[R_('눈보라가 몰아쳐 성문이 닫혔다. 오늘은 나갈 수 없다.')]);
  if(S.min>=22*60||S.min<7*60)return startDialog(null,[R_('성문이 닫혀 있다. (외출 가능: 오전 7시 ~ 오후 10시)')]);
  const left=S.tasks.filter(t=>!t.done).length;
  if(left&&!isSunday())return startDialog(null,[R_(`아직 업무가 ${left}개 남았다. 못 끝내면 평판이 내려간다.`),C({t:'그래도 마을에 나간다',act:()=>changeArea('town',24,2,0,10)},{t:'업무부터 하자'})]);
  startDialog(null,[R_('성문 밖은 로젠하임 마을이다.'),C({t:'마을로 나간다',act:()=>changeArea('town',24,2,0,10)},{t:'그만둔다'})]);
}
function changeArea(to,ax,ay,dir,mins){
  busy=true;$('#fade').classList.add('on');const prevG=AREAS[S.area].group;
  if(!(AREAS[to].group==='castle'))diaryAdd('place',AREAS[to].name);
  setTimeout(()=>{S.area=to;P.x=ax*T+8;P.y=ay*T+14;P.dir=dir||0;S.min+=mins||0;lastWhere='';
    for(const n of npcs)if(n.area===to&&Math.hypot(n.x-P.x,n.y-P.y)<14)n.y+=T;save();hud();
    $('#fade').classList.remove('on');setTimeout(()=>{busy=false;if(AREAS[to].group!==prevG)toast(AREAS[to].name);},250);},350);
}
/* 문: 밟으면 이동 */
const HOUSE_OPEN=[7,21];
function doorLock(d){
  if(d.bld&&SHOPS[d.bld]){const s=SHOPS[d.bld];if(s.closed&&!s.open)return s.closed;const h=S.min/60,o=s.open||[9,18];if(h<o[0]-1||h>=o[1]+(d.bld==='tavern'?0:.5))return `${s.name} 문이 잠겨 있다. (영업 ${o[0]}시 ~ ${o[1]}시)`;}
  if(d.bld&&d.bld.startsWith('house')){const h=S.min/60;if(h<HOUSE_OPEN[0]||h>=HOUSE_OPEN[1])return '불이 꺼져 있다. 늦은 시간에 남의 집 문을 두드릴 순 없다.';}
  if(S.carry&&d.to!=='keep'&&S.area!=='keep'&&!(S.carry==='wood'&&d.to==='keep'))return null;
  return null;}
function useDoor(d){
  const lk=doorLock(d);if(lk){P.y+=d.dir===1?7:-7;toast(lk);return;}
  if(d.bld&&d.bld.startsWith('house'))toast('실례합니다~');
  changeArea(d.to,d.ax,d.ay,d.dir,1);
}
function shopOpen(sid){const s=SHOPS[sid];if(s.closed)return false;if(s.sun&&!isSunday())return false;const h=S.min/60;return h>=s.open[0]&&h<s.open[1];}
function openShop(sid){
  const s=SHOPS[sid];
  if(s.closed)return startDialog(null,[R_(s.closed)]);
  if(!shopOpen(sid))return startDialog(null,[R_(s.sun&&!isSunday()?'시장 좌판이 비어 있다. 일요일에만 장이 선다.':`${jo(s.name,'은','는')} 문을 닫았다. (영업 ${s.open[0]}시 ~ ${s.open[1]}시)`)]);
  togglePanel('shop',sid);
}
function buy(sid,it){const p=ITEMS[it].p;if(S.coins<p){toast('돈이 모자라다');return;}S.coins-=p;diaryAdd('buy',it);S.inv[it]=(S.inv[it]||0)+1;toast(`${ITEMS[it].n} <i>−${money(p)}</i>`);hud();save();togglePanel('shop',sid,true);}
function service(sid){
  if(sid==='tea'){if(S.coins<3)return toast('돈이 모자라다');S.coins-=3;closePanel();S.hp=Math.min(100,S.hp+30);S.min+=30;hud();startDialog(null,[R_('창가 자리에서 따뜻한 차를 마셨다. 손끝까지 녹는 기분이다. (체력 +30)')]);return;}
  if(sid==='tavern'){if(S.coins<4)return toast('돈이 모자라다');S.coins-=4;closePanel();if(S.drinkDay!==S.day){S.drinkDay=S.day;S.drinks=0;}S.drinks++;S.hp=Math.min(100,S.hp+10);S.min+=40;hud();
    const rumor=['요새 하겐 상회가 장작을 사재기한대.','성에 새로 온 부집사가 그렇게 곱상하다며?','남부에서 누굴 찾는 사내들이 올라왔대. 웬 아가씨를 찾는다나.','대공 전하가 요새 웃는 걸 봤다는 사람이 있어. 말이 돼?','세실리아 영애가 대공비 자리를 노린다는 소문이야.'][Math.floor(Math.random()*5)];
    startDialog(null,[R_('맥주 한 잔을 비웠다. 옆자리 사람들 이야기가 들린다.'),G('술꾼',rumor),...(S.drinks>=2?[R_('…조금 취했다. 목소리 조심해야 하는데.'),{fn:()=>{addSus(5);return null;}}]:[])]);}
}
function restBench(){startDialog(null,[R_('벤치에 앉아 잠시 쉬었다. (체력 +8, 20분)')],()=>{S.hp=Math.min(100,S.hp+8);S.min+=20;hud();});}
function addMail(from,title,body){S.mail.unshift({from,title,body,day:S.day,read:false});toast('편지가 왔다 <i>✉</i>');}
function logEv(t,k){S.log.unshift({d:S.day,t,k});if(k)diaryAdd('ev',{t,k});}
/* ───────── 일기: 하루 기록 ───────── */
function replayKey(key){const [t,id,k]=key.split(':');closePanel();
  if(t==='h'){const ev=HEART[id].find(e=>e.id===k);if(ev)runHeart(id,ev,true);}
  else if(t==='d'){const d=DATES[id].find(x=>x.k===k);if(d)playScene({title:d.name,sub:'회상'},id,d.lines,null,{replay:true});}
  else if(t==='s'){const ev=STORY.find(x=>x.id===id);if(ev&&ev.run)playScene({title:ev.title.replace(/ \(오리지널\)/,''),sub:'회상'+(ev.ch?' · 원작 '+ev.ch:'')},null,ev.run(),null,{replay:true});}}
function dday(){S.diary=S.diary||{};return S.diary[S.day]||(S.diary[S.day]={ev:[],talk:[],gift:[],task:[],buy:[],place:[],note:[],rep0:S.rep,wx:S.weather});}
function diaryAdd(kind,v){const d=dday(),arr=d[kind]||(d[kind]=[]);if((kind==='talk'||kind==='place'||kind==='note')&&arr.includes(v))return;arr.push(v);}
const NAMEOF=id=>id==='kairan'?'전하':CH[id]?CH[id].name:id;
function diaryText(day,d){
  const out=[],dd=dateOf(+day),wx={clear:'맑음',cloudy:'흐림',rain:'비',snow:'눈',blizzard:'눈보라'}[d.wx]||'',h=(k,a)=>hash(+day,k,a||1);
  const evs=d.ev.filter(x=>!/^약속|♥/.test(x.t));if(evs.length)out.push(evs.map(x=>`«${x.t.replace(/ \(오리지널\)/,'')}»`).join(', ')+[' — 잊지 못할 하루.',' 일이 있었다.',' — 오늘의 큰일.'][Math.floor(h(1)*3)]);
  for(const x of d.ev.filter(x=>/^약속/.test(x.t)))out.push(x.t.replace('약속 · ','')+'. 약속을 지켰다.');
  for(const x of d.ev.filter(x=>/♥/.test(x.t)))out.push(x.t.replace(/ ♥\d+ · /,' — «')+'».');
  if(d.task.length){const g=d.task.map(([n,gr])=>`${n}(${gr})`).join(', ');out.push(`업무: ${g}.`+(d.task.every(t=>t[1]==='완벽')?' 오늘은 완벽했다.':d.task.some(t=>t[1]==='아쉬움')?' …내일은 더 잘하자.':''));}
  else if(dateOf(+day).wd===6)out.push('일요일. 휴무였다.');
  const talk=d.talk.filter(id=>!CH[id]||!CH[id].kind),folk=d.talk.filter(id=>CH[id]&&CH[id].kind);
  if(talk.length){const ns=talk.map(NAMEOF);out.push(`${ns.slice(0,-1).join(', ')}${ns.length>1?', ':''}${jo(ns[ns.length-1],'과','와')} 이야기를 나눴다.`+(talk.includes('kairan')?[' 전하는 오늘도 말이 적었다.',' 전하의 목소리가 조금 부드러웠던 것 같다.',''][Math.floor(h(2)*3)]:''));}
  if(folk.length)out.push(`${folk.slice(0,3).map(NAMEOF).join(', ')}${folk.length>3?' 들':''}도 만났다.`);
  for(const [id,it,cat] of d.gift)out.push(`${NAMEOF(id)}에게 ${jo(ITEMS[it].n,'을','를')} 줬다. ${{love:'아주 좋아했다!',like:'좋아했다.',neu:'그냥 그런 눈치.',dis:'…싫어하는 것 같았다.'}[cat]}`);
  if(d.buy.length){const c={};for(const it of d.buy)c[it]=(c[it]||0)+1;out.push('산 것: '+Object.entries(c).map(([it,n])=>ITEMS[it].n+(n>1?` ${n}개`:'')).join(', ')+'.');}
  if(d.place.length)out.push('다녀온 곳: '+d.place.join(', ')+'.');
  for(const n of d.note)out.push(n);
  if(d.rep1!=null){const dr=d.rep1-d.rep0;if(dr)out.push(`평판 ${dr>0?'+':''}${dr}.`);}
  if(!out.length)out.push('별일 없는 하루였다.');
  return {head:`${dd.label} (${WD[dd.wd]})${wx?' · '+wx:''}`,body:out};
}
function useItem(it){
  const I=ITEMS[it];
  if(I.food){S.inv[it]--;S.hp=Math.min(100,S.hp+I.food);toast(`${I.n} <i>체력 +${I.food}</i>`);hud();save();togglePanel('bag',null,true);return;}
  if(it==='bandage'){if(S.bandDay===S.day)return toast('오늘은 이미 썼다');S.inv[it]--;S.bandDay=S.day;addSus(-6);save();togglePanel('bag',null,true);}
}
function showHomeEnd(){
  const p=$('#panel');panelKind='home';p.classList.remove('wide');
  p.innerHTML=`<h2>엔딩 · 귀향</h2><p class="story">남부로 가는 마차 창밖으로 북부의 마지막 눈이 흩날렸다. 성의 굴뚝 연기가 점점 작아졌다.</p><p class="story">언젠가 다시 그 차가운 성으로 돌아갈 수 있을까.</p>
    <div class="pfoot">${S.snap?'<button class="pbtn" id="hsnap">마지막 주로 돌아가기</button>':''}<button class="pbtn" id="hnew">처음부터</button></div>`;p.hidden=false;
  const hs=$('#hsnap');if(hs)hs.onclick=()=>{const sn=S.snap;S=Object.assign(fresh(),JSON.parse(sn));S.snap=sn;P.x=S.px;P.y=S.py;placeNpcs(true);hud();save();p.hidden=true;};
  $('#hnew').onclick=()=>{S=fresh();rollTasks();P.x=S.px;P.y=S.py;placeNpcs(true);save();hud();p.hidden=true;intro();};
}

/* ───────── 시간 ───────── */
const WD=['월','화','수','목','금','토','일'],WX={clear:'☀ 맑음',cloudy:'☁ 흐림',rain:'☂ 비',snow:'❄ 눈',blizzard:'❄ 눈보라'};
function hud(){
  const dd=dateOf(S.day);$('#ctime').classList.toggle('hold',holdNow());
  $('#cday').textContent=`${dd.label} (${WD[dd.wd]})`;
  const m=Math.floor(S.min/10)*10,hh=Math.floor(m/60)%24,mm=m%60,am=hh<12;
  $('#ctime').textContent=`${am?'오전':'오후'} ${((hh+11)%12)+1}:${String(mm).padStart(2,'0')}`;
  $('#cwx').textContent=WX[S.weather]||'';
  const hb=$('#hpbar');hb.style.width=S.hp+'%';hb.classList.toggle('low',S.hp<30);
  $('#coins').textContent=money(S.coins);
  $('#wcount').textContent=S.tasks.length?`${S.tasks.filter(t=>t.done).length}/${S.tasks.length}`:'휴무';
  $('#bmenu').classList.toggle('dot',S.mail.some(m=>!m.read));
}
function rollWeather(){const r=Math.random(),s=dateOf(S.day).season;S.weather=s==='겨울'?(r<.35?'clear':r<.55?'cloudy':r<.92?'snow':'blizzard'):s==='가을'?(r<.45?'clear':r<.72?'cloudy':'rain'):(r<.55?'clear':r<.78?'cloudy':'rain');if(S.day<100&&S.weather==='snow')S.weather='cloudy';}
function newDay(passOut){
  busy=true;$('#fade').classList.add('on');
  const done=S.tasks.filter(t=>t.done).length,miss=S.tasks.length-done;
  const pen=S.ending==='duchess'?0:miss*3;if(pen)S.rep=Math.max(0,S.rep-pen);
  for(const e of storyToday())if(e.t==='s'&&S.story[e.id]==='pending'){S.story[e.id]='missed';const m=!e.minor&&e.miss&&e.miss();if(m)S.carryLines=(S.carryLines||[]).concat(m);}
  const sum=R_(`— 하루 정리 — 업무 ${done}/${S.tasks.length} · 평판 ${S.rep} (${REPN[REPT()]})${pen?` · 못 끝낸 업무 −${pen}`:''}${!S.f.public&&S.ending!=='home'?` · 의심도 ${S.sus}`:''}`);
  let pay=null;
  if(dateOf(S.day).wd===6&&S.ending!=='home'){const wage=WAGE(),t=REPT();S.coins+=wage*10;
    pay=[R_('— 주급날 —'),X('edmund','n',`부집사님, 이번 주 급여입니다. 금화 ${wage}골드입니다.`)];
    if(S.rep<25)pay.push(X('edmund','a','평판이 좋지 않아 이번 주는 1골드를 감했습니다. 전하의 지시입니다.'),M('s','…네. 다음 주엔 분발하겠습니다.'));
    else pay.push(X('edmund',t===2?'h':'n',t===2?'한 주 동안 수고 많으셨습니다. 전하께서도 흡족해하십니다.':t===1?'다음 주도 잘 부탁드립니다.':'…다음 주에는 조금 더 분발해 주셔야겠습니다.'));
    if(!S.seen.raise&&S.wage<5&&((S.f.hagen==='win'&&S.day>=7)||(S.day>=14&&S.rep>=60)||(S.day>=21&&S.rep>=45))){S.seen.raise=1;S.wage=5;S.rep=Math.min(100,S.rep+5);logEv('주급 인상 (5골드)',null);
      pay.push(X('edmund','h','그리고 한 가지 더. 전하께서 다음 주부터 부집사님 주급을 5골드로 올리라 하셨습니다.'),M('s','네?! 저, 정말요?'),X('edmund','h','일을 잘하는 사람에게 값을 치르는 건 당연하다고 하시더군요. 전하다운 말씀이지요.'));}
    S.week=0;}
  if(passOut)addSus(6);
  {const d=dday();d.rep1=S.rep;if(pay)diaryAdd('note',`주급 금화 ${WAGE()}골드를 받았다.`);if(miss)diaryAdd('note',`업무 ${miss}개를 못 끝냈다.`);if(passOut)diaryAdd('note','자정을 넘겨 쓰러지듯 잠들었다.');}
  setTimeout(()=>{
    if(S.appt&&S.appt.day<=S.day)checkApptDay();
    S.day++;S.min=360;S.talked={};S.carry=null;S.hp=Math.max(30,(passOut?70:100)-(S.hpDebt||0));S.hpDebt=0;
    if(dateOf(S.day).wd===0)S.giftWk={};
    if(S.sus>0&&!S.f.public)S.sus=Math.max(0,S.sus-2);
    rollWeather();rollTasks();
    const morning=[];
    for(const e of storyToday()){if(e.fx&&e.t==='m')e.fx();
      if(e.t==='m'){morning.push(R_(`— ${e.title} —`),...e.lines());logEv(e.title,null);}
      else if(!e.need||e.need()){S.story[e.id]='pending';if(e.pre)morning.push(...e.pre());}}
    for(const [id,d] of Object.entries(BDAY))if(d===doy(S.day))morning.push(R_(`오늘은 ${CH[id].name}의 생일이다.`));
    if(S.appt&&S.appt.day===S.day)morning.push(R_('오늘 '+apptText()));
    if(S.injury>0)S.injury--;
    if(S.day===105)S.snap=JSON.stringify(Object.assign({},S,{snap:null}));
    let wakeL=null;if(S.wake){S.area='keep';P.x=5*T+8;P.y=6*T+14;wakeL=S.wake.t;S.wake=null;}else if(S.f.desk){S.area='keep';P.x=2*T+8;P.y=20*T+14;}else{S.area=START.area;P.x=START.x*T+8;P.y=START.y*T+14;}P.dir=0;placeNpcs(true);hud();save();
    $('#fade').classList.remove('on');
    const dd=dateOf(S.day),names=S.tasks.map(t=>TASKS[t.id].name).join(', ');
    const wake=wakeL?R_(wakeL):R_(passOut?`${dd.label}. 눈을 떠 보니 누군가 이불을 덮어 주고 간 뒤였다. (체력 ${S.hp})`:`${dd.label} 아침. ${({clear:'창밖이 맑다.',cloudy:'하늘이 잿빛이다.',rain:'빗소리가 창을 두드린다.',snow:'창밖에 눈이 내린다.',blizzard:'눈보라가 창문을 두드린다. 오늘은 성 밖에 나갈 수 없다.'})[S.weather]}`);
    const todo=R_(S.injury>0&&!S.tasks.length?`몸을 회복하는 중이다. (${S.injury}일 남음)`:isSunday()?'오늘은 일요일, 휴무다. 마을에 나가 볼까?':`오늘의 업무: ${names}`);
    const extra=S.carryLines||[];S.carryLines=null;
    setTimeout(()=>{busy=false;startDialog(pay?'edmund':null,[sum,...(pay||[]),...extra,wake,...morning,todo]);},500);
  },700);
}
function checkApptDay(){const a=S.appt;if(a&&a.day<=S.day){S.appt=null;addPtsQ(a.id,-50);S.stood[a.id]=S.day+1;}}

/* ───────── 창 ───────── */
let panelKind='',panelArg=null,mapView=null,menuTab='save';
function closePanel(){$('#panel').hidden=true;}
function togglePanel(kind,arg,keep){
  const p=$('#panel');if(D||busy||MG)return;
  if(!keep&&!p.hidden&&panelKind===kind&&kind!=='shop'&&kind!=='gift'){p.hidden=true;return;}
  panelKind=kind;panelArg=arg;if(kind==='menu'&&arg)menuTab=arg;
  const X_=`<button class="pbtn" id="pclose">닫기</button>`;let html='';
  if(kind==='map'){const v=mapView||S.area,a=AREAS[v];
    const tabs=[['castle','성 마당'],['keep','본관'],['town','마을']];if(!tabs.some(t=>t[0]===S.area))tabs.push([S.area,AREAS[S.area].name]);
    html=`<h2>${a.name} <span class="tabs">${tabs.map(([k,l])=>`<button class="tab${v===k?' on':''}" data-mv="${k}">${l}</button>`).join('')}${X_}</span></h2><div class="mapwrap" id="mapw"><canvas id="mapc"></canvas></div>
      <div class="mlegend"><span><i style="background:var(--rose)"></i>${myName()} (${S.area===v?placeName(Math.floor(P.x/T),Math.floor((P.y-2)/T)):'다른 지역'})</span><span><i style="background:#3a4a6a"></i>사람들</span><span><i class="sq" style="background:#f2c75c"></i>업무</span><span><i class="sq" style="background:#ee9ab0"></i>일정 · 약속</span></div>`;
  }else if(kind==='work'){
    const today=storyToday().filter(e=>e.t==='s'&&S.story[e.id]==='pending'&&!(e.after&&S.story[e.after]!=='done'));
    html=`<h2>오늘의 일 ${X_}</h2>
      <div class="kv"><span>체력 <b>${Math.round(S.hp)}</b></span><span>지갑 <b>${money(S.coins)}</b></span><span>평판 <b>${S.rep} · ${REPN[REPT()]}</b></span><span>주급 <b>${WAGE()}골드</b> (일요일 밤)</span>${S.carry?`<span>들고 있음 <b>${S.carry==='tea'?'찻쟁반':'장작'}</b></span>`:''}</div>`;
    if(today.length||S.appt)html+=`<div class="sub">일정</div>`+today.map(e=>`<div class="task"><span class="ck pk">${e.minor?'·':'!'}</span><div><div class="tn">${e.title}${e.ch?` <small>원작 ${e.ch}</small>`:e.minor?' <small>작은 이벤트</small>':''}</div><div class="tw">📍 ${e.loc.map(l=>RNAME[l]).join(' · ')} · ${hm(e.from)} ~ ${hm(e.to)}</div></div><span></span></div>`).join('')
      +(S.appt?`<div class="task"><span class="ck pk">♥</span><div><div class="tn">${jo(CH[S.appt.id].name,'과','와')}의 약속</div><div class="tw">${apptText()}</div></div><span></span></div>`:'');
    html+=`<div class="sub">업무</div>`+(S.tasks.length?S.tasks.map(t=>{const d=TASKS[t.id];return `<div class="task${t.done?' done':''}"><span class="ck">${t.done?'✓':''}</span><div><div class="tn">${d.name}</div><div class="tw">📍 ${d.where} · 체력 ${d.hp}</div>${t.done?'':`<div class="tw">${d.desc}</div>`}</div><span class="gr">${t.done?t.grade:''}</span></div>`;}).join(''):`<p class="story">오늘은 휴무다. 마을에 나가거나, 사람들과 약속을 잡아 보자.</p>`);
    html+=`<div class="sub">규칙</div><p class="story">${isSunday()?'일요일은 휴무.':eventDay()?'오늘은 일정이 있는 날이라 업무를 다 못 해도 시간이 흐른다(못 끝낸 업무는 평판 감소).':'저녁 6시까지 업무를 끝내야 한다. 못 끝내면 6시에서 시간이 멈춘다.'} 업무를 하면 그만큼 시간이 지나간다. 업무가 없을 때도 부집사실 책상에서 서류를 볼 수 있다.</p>`;
    html+=`<div class="pfoot"><span>노란 표시 = 업무, 분홍 표시 = 일정. 업무 결과는 평판에, 평판은 태도·대사·분기에 영향을 줘요.</span></div>`;
  }else if(kind==='bag'){
    const ks=Object.keys(S.inv).filter(k=>S.inv[k]>0);
    html=`<h2>가방 · ${money(S.coins)} ${X_}</h2>`+(ks.length?ks.map(k=>{const I=ITEMS[k];return `<div class="row"><div><div class="tn">${I.n} <small>×${S.inv[k]}</small></div><div class="tw">${I.d}</div></div>${I.food?`<button class="pbtn" data-use="${k}">먹는다</button>`:k==='bandage'?`<button class="pbtn" data-use="${k}">쓴다</button>`:I.key?'<span class="tw">소중한 물건</span>':'<span class="tw">선물용</span>'}</div>`;}).join(''):'<p class="story">가방이 비어 있다.</p>')
      +`<div class="pfoot"><span>마을 상점에서 물건을 사서 사람들에게 선물할 수 있어요. 한 사람에게 하루 1번, 일주일 2번.</span></div>`;
  }else if(kind==='shop'){const s=SHOPS[arg];
    html=`<h2>${s.name} ${X_}</h2><p class="story">${s.hi}</p><div class="kv"><span>지갑 <b>${money(S.coins)}</b></span></div>`
      +s.items.map(k=>{const I=ITEMS[k];return `<div class="row"><div><div class="tn">${I.n} <small>${money(I.p)}</small>${S.inv[k]?` <small>(가진 것 ${S.inv[k]})</small>`:''}</div><div class="tw">${I.d}</div></div><button class="pbtn" data-buy="${k}" ${S.coins<I.p?'disabled':''}>산다</button></div>`;}).join('')
      +(s.service==='rest'?`<div class="row"><div><div class="tn">차 한 잔 하며 쉬기 <small>3은화</small></div><div class="tw">체력 +30 · 30분</div></div><button class="pbtn" data-svc="tea">쉰다</button></div>`:'')
      +(s.service==='drink'?`<div class="row"><div><div class="tn">맥주 한 잔 <small>4은화</small></div><div class="tw">체력 +10 · 소문을 들을 수 있다 · 많이 마시면 의심도 위험</div></div><button class="pbtn" data-svc="tavern">마신다</button></div>`:'');
  }else if(kind==='gift'){const id=arg,g=giftables();
    html=`<h2>${CH[id].name}에게 선물 ${X_}</h2>`+g.map(k=>{const kn=S.known[id]&&S.known[id][k];return `<div class="row"><div><div class="tn">${ITEMS[k].n} <small>×${S.inv[k]}</small>${kn?` <span class="pref ${kn}">${{love:'아주 좋아함',like:'좋아함',neu:'보통',dis:'싫어함'}[kn]}</span>`:''}</div><div class="tw">${ITEMS[k].d}</div></div><button class="pbtn" data-gift="${k}">준다</button></div>`;}).join('')
      +`<div class="pfoot"><span>${isBday(id)?'오늘은 생일! 좋아하는 선물이면 효과가 세 배예요.':'준 선물의 반응은 사람들 창에 기록돼요.'}</span></div>`;
  }else if(kind==='menu'){
    const tabs=[['save','저장'],['log','일기'],['memo','회상'],['mail','편지'],['stat','상태'],['set','설정']];
    html=`<h2><span class="tabs">${tabs.map(([k,l])=>`<button class="tab${menuTab===k?' on':''}" data-tab="${k}">${l}${k==='mail'&&S.mail.some(m=>!m.read)?' •':''}</button>`).join('')}</span>${X_}</h2>`;
    if(menuTab==='save')html+=`<p class="story">자동 저장은 계속 돼요. 슬롯에는 원하는 순간을 따로 남길 수 있어요.</p>${slotRows()}<div class="slot"><div class="tn">타이틀 화면</div><div class="bs"><button class="pbtn" id="ptitle">타이틀로</button></div></div>`;
    if(menuTab==='log'){const days=Object.keys(S.diary||{}).map(Number).sort((a,b)=>b-a);
      html+=days.length?days.map(dn=>{const d=S.diary[dn],{head,body}=diaryText(dn,d),rp=d.ev.filter(x=>x.k);return `<div class="diary"><div class="dh">${head}${dn===S.day?' <small>오늘 · 쓰는 중</small>':''}</div><p class="story">${body.join(' ')}</p>${rp.length?`<div class="rp">${rp.map(x=>`<button class="pbtn sm" data-rk="${x.k}">▶ ${x.t.replace(/ \(오리지널\)/,'').replace(/^약속 · /,'')}</button>`).join('')}</div>`:''}</div>`;}).join(''):'<p class="story">아직 적힌 일이 없다.</p>';}
    if(menuTab==='memo'){const L=S.log.filter(l=>l.k),grp={s:'이야기',h:'♥ 이벤트',d:'약속'};
      html+=L.length?Object.entries(grp).map(([g,nm])=>{const it=L.filter(l=>l.k.startsWith(g+':'));return it.length?`<div class="sub">${nm}</div>`+it.map(l=>{const dd=dateOf(l.d);return `<div class="row"><div><div class="tw">${dd.label}</div><div class="tn">${l.t}</div></div><button class="pbtn" data-rk="${l.k}">다시 보기</button></div>`;}).join(''):'';}).join(''):'<p class="story">아직 다시 볼 장면이 없다. 이벤트를 보면 여기에 쌓여요.</p>';}
    if(menuTab==='mail')html+=S.mail.length?S.mail.map((m,i)=>{m.read=true;const dd=dateOf(m.day);return `<div class="letter"><div class="tw">${dd.label} · ${m.from}</div><div class="tn">${m.title}</div><p class="story">${m.body}</p></div>`;}).join(''):'<p class="story">편지가 없다.</p>';
    if(menuTab==='stat'){const e=S.ending&&ENDINGS[S.ending];
      html+=`<div class="kv col"><span>이름 <b>${S.f.public?'에레나':'에렌 (본명 에레나)'}</b></span><span>직책 <b>${S.role}</b></span><span>평판 <b>${S.rep} · ${REPN[REPT()]}</b></span><span>주급 <b>금화 ${WAGE()}골드</b></span><span>지갑 <b>${money(S.coins)}</b></span>
        ${S.f.public?'<span>정체 <b>공개됨</b></span>':`<span>의심도 <b>${S.sus} / 100</b></span><span class="meter"><i style="width:${S.sus}%"></i></span>`}
        <span>협력자 <b>${[S.f.marta_ally&&'마르타',S.f.roewen_ally&&'로웬',S.f.knows&&'카이런'].filter(Boolean).join(', ')||'없음'}</b></span>
        <span>엔딩 <b>${e?`«${e.t}» 이후`:'아직 (봄 28일 결말의 날)'}</b></span></div>
        <p class="story">의심도는 기절, 과음, 실수, 위기 상황에서 오르고, 방 책상에서 점검하거나 붕대를 쓰면 내려가요. 100이 되면 정체가 드러나요.</p>`;}
    if(menuTab==='set')html+=`<div class="row"><div class="tn">대화 연출</div><button class="pbtn" id="bmode">${S.mode==='portrait'?'초상화':'전신'}</button></div><div class="row"><div class="tn">처음부터 다시</div><button class="pbtn" id="preset">처음부터</button></div><p class="story">키보드: 이동 방향키·WASD · 확인 Space · 업무 Q · 가방 B · 지도 M · 사람들 H · 메뉴 X</p><p class="story">스토리 달력은 원작 이펍을 받기 전 임시 배치예요.</p>`;
  }else{
    html=`<h2>사람들 ${X_}</h2>`;
    for(const n of npcs){if(!FRIENDS.includes(n.id)||!visible(n))continue;const id=n.id,h=hearts(id),ev=nextHeart(id),kn=S.known[id]||{},dd=dateOf(BDAY[id]);
      const likes=Object.keys(kn).filter(k=>kn[k]==='love'||kn[k]==='like').map(k=>ITEMS[k].n),dis=Object.keys(kn).filter(k=>kn[k]==='dis').map(k=>ITEMS[k].n);
      html+=`<div class="rel"><canvas data-id="${id}" width="64" height="64"></canvas><div><div class="nm">${CH[id].name}<small>${CH[id].role}</small>${S.talked[id]?'<span class="chip">· 오늘 대화함</span>':''}</div>
        <div class="hearts">${'♥'.repeat(h)}<span class="e">${'♡'.repeat(10-h)}</span></div>
        <div class="sched">지금 <b>${n.area!==S.area?AREAS[n.area].name+' · ':''}${RNAME[n.loc]}${n.path.length?' 쪽으로 이동 중':n.pose==='sit'?'에 앉아 있음':n.pose==='read'?'에서 책을 보는 중':''}</b> · 생일 ${dd.label}</div>
        ${ev?`<div class="sched">다음 이벤트 <b>♥${ev.h} «${ev.title}»</b> · ${ev.hint}${h<ev.h?` (♥${ev.h} 필요)`:''}</div>`:''}
        ${likes.length||dis.length?`<div class="sched">${likes.length?'좋아함: <b>'+likes.join(', ')+'</b>':''}${dis.length?' · 싫어함: '+dis.join(', '):''}</div>`:''}
        <div class="sched">${schedFor(id).map(v=>`${Math.floor(v[0])}시 ${RNAME[v[1]]}`).join(' → ')}</div></div></div>`;}
  }
  p.classList.toggle('wide',kind==='map');p.innerHTML=html;p.hidden=false;
  p.querySelectorAll('canvas[data-id]').forEach(c=>blit(c,bust(c.dataset.id,'n')));
  if(kind==='map'){const v=mapView||S.area,a=AREAS[v],c=$('#mapc'),w=$('#mapw');blit(c,a.full);const W=a.MW*T,H=a.MH*T,pc=(x,y)=>`left:${x/W*100}%;top:${y/H*100}%`;let o='';
    for(const r of [...a.ROOMS,...a.OUT,...a.BLD]){if(a.ROOMS.length===1&&a.ROOMS[0]===r)continue;o+=`<span class="ml" style="${pc((r[2]+r[4]/2)*T,(r[3]+r[5]/2)*T)}">${r[1]}</span>`;}
    for(const m of targets())if(m.area===v)o+=`<span class="mt" style="${pc(m.px,m.py+8)}"></span>`;
    for(const m of storyMarks())if(m.area===v)o+=`<span class="mt pk" style="${pc(m.px,m.py+8)}"></span>`;
    for(const n of npcs)if(n.area===v&&visible(n))o+=`<span class="md np${CH[n.id].kind?' fk':''}" style="${pc(n.x,n.y-8)}"></span>${CH[n.id].kind?'':`<span class="ml nl" style="${pc(n.x,n.y+8)}">${CH[n.id].name}</span>`}`;
    for(const vv of Object.values(AREAS))if(vv.group===a.group&&vv!==a&&!vv.outdoor){const ins=npcs.filter(n=>n.area===vv.id&&visible(n)&&!CH[n.id].kind);const b=a.BLD.find(b=>b[10]&&a.doors.some(d=>d.bld===b[0]&&d.to===vv.id));if(b&&ins.length)o+=`<span class="ml nl" style="${pc((b[2]+b[4]/2)*T,(b[3]+1)*T)}">${ins.map(n=>CH[n.id].name).join('·')}</span>`;}
    if(S.area===v)o+=`<span class="md me" style="${pc(P.x,P.y-8)}"></span>`;w.insertAdjacentHTML('beforeend',o);
    p.querySelectorAll('[data-mv]').forEach(b=>b.onclick=()=>{mapView=b.dataset.mv;togglePanel('map',null,true);});}
  $('#pclose').onclick=()=>{p.hidden=true;mapView=null;};
  p.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>{menuTab=b.dataset.tab;togglePanel('menu',null,true);hud();});
  p.querySelectorAll('[data-buy]').forEach(b=>b.onclick=()=>buy(arg,b.dataset.buy));
  p.querySelectorAll('[data-svc]').forEach(b=>b.onclick=()=>service(b.dataset.svc));
  p.querySelectorAll('[data-gift]').forEach(b=>b.onclick=()=>giveGift(arg,b.dataset.gift));
  p.querySelectorAll('[data-use]').forEach(b=>b.onclick=()=>useItem(b.dataset.use));
  p.querySelectorAll('[data-rk]').forEach(b=>b.onclick=()=>replayKey(b.dataset.rk));
  const bm=$('#bmode');if(bm)bm.onclick=()=>{S.mode=S.mode==='portrait'?'stand':'portrait';bm.textContent=S.mode==='portrait'?'초상화':'전신';save();};
  if(kind==='menu'&&menuTab==='save'){bindSlots(p,()=>togglePanel('menu',null,true));const tb=$('#ptitle');if(tb)tb.onclick=()=>{save();closePanel();bootTitle();};}
  const rb=$('#preset');if(rb)rb.onclick=()=>{
    if(rb.dataset.arm){S=fresh();rollTasks();P.x=S.px;P.y=S.py;P.dir=0;placeNpcs(true);save();hud();p.hidden=true;intro();}
    else{rb.dataset.arm=1;rb.textContent='정말 처음부터?';}};
  if(kind==='menu'&&menuTab==='mail')save();
}
$('#brel').onclick=()=>togglePanel('rel');
$('#bwork').onclick=()=>togglePanel('work');
$('#bmap').onclick=()=>togglePanel('map');
$('#bbag').onclick=()=>togglePanel('bag');
$('#bmenu').onclick=()=>togglePanel('menu');

/* ───────── 루프 ───────── */
let last=performance.now(),saveT=0,lastWhere='';
function whereNow(){let w=placeName(Math.floor(P.x/T),Math.floor((P.y-2)/T));const a=AREAS[S.area];if(!a.outdoor&&a.ROOMS.length>1)w=`${a.name} · ${w}`;
  if(a.outdoor){const {qx,qy}=facing(),tx=Math.floor(qx/T),ty=Math.floor(qy/T);if(inMap(a,tx,ty)&&a.map[ty][tx]==='O'){const b=bldAt(a,tx,ty),s=SHOPS[b[0]];w=b[1]+(s&&!s.closed?(shopOpen(b[0])?' · 영업 중':' · 닫힘'):'');}}
  if(w!==lastWhere){lastWhere=w;$('#where').textContent=w;}}
function loop(t){
  const dt=Math.min(.05,(t-last)/1000);last=t;
  if(MG){MG.tick(dt);}
  else if(!D&&$('#panel').hidden&&!busy){
    if(!workHold())S.min+=dt*1.5;
    if(S.min>=1440){S.min=1440;startDialog(null,[R_('자정이 넘었다. 에레나는 꾸벅꾸벅 졸다가 겨우 방으로 돌아갔다.')],()=>newDay(true));}
    let vx=(keys.arrowright||keys.d?1:0)-(keys.arrowleft||keys.a?1:0)+pad.x,vy=(keys.arrowdown||keys.s?1:0)-(keys.arrowup||keys.w?1:0)+pad.y;
    vx=Math.max(-1,Math.min(1,vx));vy=Math.max(-1,Math.min(1,vy));
    if(vx||vy){
      P.dir=Math.abs(vx)>Math.abs(vy)?(vx<0?2:3):(vy<0?1:0);
      const l=Math.hypot(vx,vy),sp=(S.carry==='wood'?48:S.injury>0?40:66)*dt,nx=P.x+vx/l*sp,ny=P.y+vy/l*sp;
      if(!blocked(nx,P.y))P.x=nx;else if(!vy){for(const o of [1,-1,2,-2,3,-3,4,-4,5,-5,6,-6]){if(!blocked(nx,P.y+o)){P.y+=Math.sign(o)*Math.min(Math.abs(o),sp);break;}}}
      if(!blocked(P.x,ny))P.y=ny;else if(!vx){for(const o of [1,-1,2,-2,3,-3,4,-4,5,-5,6,-6,7,-7]){if(!blocked(P.x+o,ny)){P.x+=Math.sign(o)*Math.min(Math.abs(o),sp);break;}}}
      {const ft=tileOf(P),dd=doorAt(AREAS[S.area],ft[0],ft[1]);if(dd&&!dd.gate)useDoor(dd);}
      P.anim+=dt;P.frame=[1,0,2,0][Math.floor(P.anim*8)%4];
    }else{P.anim=0;P.frame=0;}
    updateNpcs(dt);checkAppt();hud();whereNow();checkStory();
    saveT+=dt;if(saveT>8){saveT=0;save();}
  }
  if(D&&!D.choosing&&D.shown<D.full.length){D.shown=Math.min(D.full.length,D.shown+dt*42);$('#dtext').textContent=D.full.slice(0,Math.floor(D.shown));}
  if(D)$('#next').hidden=D.choosing||D.shown<D.full.length;
  draw(t);requestAnimationFrame(loop);
}
function blocked(x,y){
  const l=x-5,r=x+5,t=y-5,b=y-1;
  for(const [px,py] of [[l,t],[r,t],[l,b],[r,b]])if(solidAt(Math.floor(px/T),Math.floor(py/T)))return true;
  return npcs.some(n=>n.area===S.area&&visible(n)&&Math.abs(n.x-x)<10&&Math.abs(n.y-y)<6);
}

/* ───────── 저장 슬롯 · 타이틀 ───────── */
const SLOTN=12,slotKey=i=>`${SAVE}_slot${i}`;
function readSave(k){try{const s=JSON.parse(localStorage.getItem(k)||'null');return s&&s.day?s:null;}catch(e){return null;}}
function saveMeta(s){const dd=dateOf(s.day),m=Math.floor(s.min),hh=Math.floor(m/60);return `${s.year>1?'':''}${dd.label} (${WD[dd.wd]}) ${hh<12?'오전':'오후'} ${((hh+11)%12)+1}:${String(m%60).padStart(2,'0')} · 평판 ${s.rep} · ${s.area==='town'?'마을':'대공성'}${s.ending?' · 엔딩 후':''}`;}
function saveSlot(i){save();try{localStorage.setItem(slotKey(i),JSON.stringify(Object.assign({},S,{savedAt:Date.now()})));toast(`슬롯 ${i}에 저장했다`);}catch(e){toast('저장 실패');}}
function loadState(obj){if(!obj)return;S=Object.assign(fresh(),obj);P.x=S.px;P.y=S.py;P.dir=S.dir||0;P.anim=0;P.frame=0;D=null;$('#dlg').hidden=true;$('#stand').hidden=true;$('#black').classList.remove('on');
  if(!S.tasks||(!S.tasks.length&&!isSunday()))rollTasks();placeNpcs(true);closePanel();save();hud();lastWhere='';}
function slotRows(mode){let h='';for(let i=1;i<=SLOTN;i++){const s=readSave(slotKey(i));
  h+=`<div class="slot"><div><div class="tn">슬롯 ${i}</div><div class="tw">${s?saveMeta(s):'비어 있음'}</div></div><div class="bs">${mode!=='load'?`<button class="pbtn" data-ss="${i}">저장</button>`:''}<button class="pbtn" data-sl="${i}" ${s?'':'disabled'}>불러오기</button></div></div>`;}return h;}
function bindSlots(root,after){root.querySelectorAll('[data-ss]').forEach(b=>b.onclick=()=>{saveSlot(+b.dataset.ss);if(after)after();});
  root.querySelectorAll('[data-sl]').forEach(b=>b.onclick=()=>{const s=readSave(slotKey(+b.dataset.sl));if(!s)return;loadState(s);hideTitle();toast(`슬롯 ${b.dataset.sl}을 불러왔다`);});}
function hideTitle(){$('#title').hidden=true;busy=false;}
function bootTitle(view){
  const el=$('#title'),auto=readSave(SAVE);busy=true;el.hidden=false;
  if(view==='load'){el.innerHTML=`<h1>불러오기</h1><div style="width:min(420px,100%);background:var(--parch);border:3px solid var(--wood2);border-radius:6px;padding:4px 12px">${slotRows('load')}</div><button class="tb" id="tback">← 돌아가기</button>`;
    bindSlots(el);$('#tback').onclick=()=>bootTitle();return;}
  el.innerHTML=`<h1>부집사 에렌의 하루</h1><div class="sub2">《남장까지 했는데 부집사라고요?!》</div>
    <button class="tb" id="tcont" ${auto&&auto.intro?'':'disabled'}>이어하기<small>${auto&&auto.intro?saveMeta(auto):'자동 저장 없음'}</small></button>
    <button class="tb" id="tload">불러오기<small>저장 슬롯 ${SLOTN}개</small></button>
    <button class="tb" id="tnew">새 게임<small>${auto&&auto.intro?'자동 저장을 덮어써요 (슬롯은 그대로)':'7월 1일부터 시작'}</small></button>`;
  $('#tcont').onclick=()=>{loadState(auto);hideTitle();};
  $('#tload').onclick=()=>bootTitle('load');
  const nb=$('#tnew');nb.onclick=()=>{if(auto&&auto.intro&&!nb.dataset.arm){nb.dataset.arm=1;nb.innerHTML='정말 새로 시작할까요?<small>한 번 더 누르면 시작</small>';return;}
    S=fresh();rollTasks();P.x=S.px;P.y=S.py;P.dir=0;placeNpcs(true);hideTitle();save();hud();intro();};
}
function intro(){
  S.intro=1;for(const ev of storyToday())if(ev.t==='s'&&!S.story[ev.id])S.story[ev.id]='pending';
  P.x=START.x*T+8;P.y=START.y*T+14;P.dir=0;S.area=START.area;
  placeNpcs(true);
  startDialog(null,[R_('7월 1일, 월요일 아침. 북부 아르젠트 대공성, 서쪽 별관 사용인 숙소.'),R_('대공가 하인으로 일한 지 일주일째. 에레나 베르티에는 오늘도 가슴에 붕대를 단단히 감고 «에렌»이 되었다.'),
    MA('h','꼬맹아, 일어났으면 본관 식료품 창고부터 가 봐. 장부가 엉망이라 브란트가 울상이야.'),M('n','네, 마르타님. (본관 주방 옆 창고…… 뒷문이 가깝겠지.)'),
    R_('건물 문이나 바닥 매트를 밟으면 안팎을 드나들어요. 다른 건물에 있는 일정·업무는 그 건물로 가는 문에 표시가 떠요.'),
    R_('사람이나 물건 앞에서 [확인]. 분홍 표시는 오늘의 일정(이벤트)이에요. 그 시간에 그 장소로 가면 장면이 시작되고, 선택과 평판에 따라 갈려요.'),
    R_('노란 표시는 업무예요. 업무를 하면 시간이 훌쩍 지나요. 저녁 6시까지 끝내야 해요. 못 끝내면 6시에서 시간이 멈춰요 (일정이 있는 날은 예외).'),
    R_('[업무]에서 오늘 할 일과 일정, [지도]에서 위치, [♥]에서 사람들 일정, [≡]에서 저장·불러오기를 할 수 있어요.'),
    R_(`오늘의 업무: ${S.tasks.map(t=>TASKS[t.id].name).join(', ')}`)]);
}
const hm=h=>{const H=Math.floor(h),m=Math.round((h-H)*60);return `${H<12?'오전':'오후'} ${((H+11)%12)+1}${m?':'+String(m).padStart(2,'0'):'시'}`;};
function eventDay(){return storyToday().some(e=>e.t==='s'&&!e.minor&&(S.story[e.id]==='pending'||S.story[e.id]==='done'));}
const workLeft=()=>S.tasks.filter(t=>!t.done).length;
const mustWork=()=>S.ending!=='home'&&!isSunday()&&workLeft()>0&&!eventDay();
const holdNow=()=>mustWork()&&S.min>=18*60;
let holdToast=0;
function workHold(){if(!holdNow())return false;if(holdToast!==S.day){holdToast=S.day;toast('저녁 6시. 업무를 끝내야 시간이 흐른다');}return true;}
function timeSkip(){const f=$('#fade');f.classList.add('on');setTimeout(()=>f.classList.remove('on'),380);placeNpcs(false);}
function blackScene(lines,after){const b=$('#black');b.classList.add('on');startDialog(null,lines,()=>{b.classList.remove('on');if(after)after();});}
const PAPER_LINES=[
  ()=>'납품 영수증 마흔두 장. 날짜와 금액을 하나하나 맞춰 나갔다.',
  ()=>'하인들 근무표를 고쳐 썼다. 마르타님의 휴무가 사흘째 빠져 있었다.',
  ()=>'북부 밀 시세가 또 올랐다. 여백에 작게 표시해 두었다.',
  ()=>'각 방 비품 목록. 손님방 촛대 하나가 장부에서 사라져 있었다.',
  ()=>'펜촉이 닳았다. 가운뎃손가락에 잉크 자국이 남았다.',
  ()=>'기사단 보급 청구서. 로웬 단장님 글씨는 정말 알아보기 힘들다.',
  ()=>S.f.hagen==='win'?'하겐 상회의 새 단가표. 숫자가 한결 정직해졌다.':'하겐 상회 청구서. 여전히 숫자가 수상하다.',
  ()=>S.weather==='rain'?'빗소리를 들으며 서류를 넘겼다. 이상하게 집중이 잘 된다.':'창밖으로 기사들 구령 소리가 들렸다.',
  ()=>S.rep>=70?'«부집사님 확인 부탁드립니다» 쪽지가 붙은 서류가 늘었다. 다들 나를 믿기 시작한 걸까.':S.rep<35?'서류 귀퉁이에 «또 틀렸음»이라는 낙서가 있었다. ……분발하자.':'에드먼드님의 단정한 글씨를 흉내 내 보았다.',
];
function paperLines(n){const pool=PAPER_LINES.slice().sort(()=>Math.random()-.5).slice(0,n).map(f=>R_(f()));return pool;}
function deskWork(){
  if(S.carry)return startDialog(null,[R_('들고 있는 것부터 처리하자.')]);
  if(task('papers')){if(!spend('papers'))return;
    return blackScene([R_('— 서류 검토 —'),...paperLines(3),R_(['오늘도 열심히 했다.','마지막 장을 덮자 어깨가 뻐근했다.','깔끔하게 정리했다. 내일의 나에게 칭찬을.'][Math.floor(Math.random()*3)])],()=>finishTask('papers',.55+Math.random()*.45));}
  const done=(S.paperDay===S.day),unread=S.mail.filter(m=>!m.read).length,opts=[];
  opts.push({t:done?'추가 서류 보기 (오늘은 했다)':'추가 서류 보기 (1시간 · 체력 −5 · 평판 +1)',act:()=>{if(done)return;if(S.hp<5)return startDialog(null,[R_('눈이 감긴다. 오늘은 무리다.')]);
      S.paperDay=S.day;S.hp-=5;S.min=Math.min(holdNow()?S.min:1430,S.min+60);S.rep=Math.min(100,S.rep+1);diaryAdd('note','밤에 추가 서류를 봤다.');
      blackScene([R_('— 서류 —'),...paperLines(2),R_('오늘도 열심히 했다. (1시간이 흘렀다)')],()=>{timeSkip();hud();});}});
  if(S.mail.length)opts.push({t:`편지함 (${unread?'안 읽은 편지 '+unread+'통':'모두 읽음'})`,act:()=>togglePanel('menu','mail')});
  if(!S.f.public)opts.push({t:S.deskDay===S.day?'붕대와 옷매무새 점검 (오늘은 했다)':'붕대와 옷매무새 점검 (20분 · 의심도 −4)',act:()=>{if(S.deskDay===S.day)return;S.deskDay=S.day;S.min+=20;addSus(-4);startDialog(null,[R_('거울 앞에서 붕대를 단단히 고쳐 매고, 목소리를 낮게 가다듬었다. 「…에렌입니다.」 좋아.')]);}});
  opts.push({t:'그만둔다'});
  startDialog(null,[R_(S.f.desk?'부집사의 책상. 서류가 가지런히 쌓여 있다. 서랍엔 편지와 남장 도구.':'책상. 서류가 쌓여 있다.'),C(...opts)]);
}
if(!S.tasks||(!S.tasks.length&&!isSunday()))rollTasks();
placeNpcs(true);resize();hud();requestAnimationFrame(loop);
bootTitle();
