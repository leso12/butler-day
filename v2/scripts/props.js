
/* ═════════ 소품 도트 (외곽선 · 명암) : 물뿌리개 · 책 · 바구니 · 도시락 · 찻잔 · 돗자리 · 낚싯대 ═════════ */
const PROPC={};
function pxs(key,rows,pal){if(PROPC[key])return PROPC[key];const H=rows.length,W=Math.max(...rows.map(r=>r.length)),c=document.createElement('canvas');c.width=W;c.height=H;const g=c.getContext('2d');
  for(let y=0;y<H;y++)for(let x=0;x<rows[y].length;x++){const col=pal[rows[y][x]];if(!col)continue;g.fillStyle=col;g.fillRect(x,y,1,1);}return PROPC[key]=c;}
function propFlip(key,cv){const k=key+'_f';if(PROPC[k])return PROPC[k];return PROPC[k]=flipCv(cv);}
const CANPAL={tin:{M:'#8e9eae',H:'#d4e0ea',R:'#b4c4d0',D:'#5a6a7a',B:'#6a7a8c',S:'#465262',L:'#f4f8fb'},copper:{M:'#c8743a',H:'#f4b070',R:'#e8945a',D:'#8a4a24',B:'#9a5428',S:'#6e3a1c',L:'#ffd8a8'}};
function canCv(kind,pour){const key='can_'+kind+(pour?'_p':'');if(PROPC[key])return PROPC[key];const W=17,H=14,Gd=Array.from({length:H},()=>Array(W).fill(null)),p=CANPAL[kind];
  const put=(x,y,c)=>{if(x>=0&&x<W&&y>=0&&y<H)Gd[y][x]=c;};
  for(let y=5;y<=11;y++)for(let x=2;x<=10;x++){let c=p.M;if(y===5)c=p.R;else if(x===2||x===3&&y<9)c=p.H;else if(x>=9||y===11)c=p.D;else if(y===8)c=p.B;put(x,y,c);}
  put(2,5,null);put(10,5,null);put(2,11,null);put(10,11,null);put(4,8,p.L);put(8,8,p.L);put(5,6,p.L);
  for(const [x,y] of [[3,4],[3,3],[4,2],[5,2],[6,2],[7,2],[8,3],[8,4]])put(x,y,y===2?p.H:p.M);   // 손잡이
  for(const [x,y,c] of [[11,9,p.M],[11,8,p.M],[12,8,p.D],[12,7,p.M],[13,7,p.D],[13,6,p.M],[14,6,p.D],[14,5,p.M]])put(x,y,c);   // 주둥이
  for(const [x,y] of [[15,3],[15,4],[15,5],[16,4],[14,4]])put(x,y,p.S);put(15,4,p.L);   // 물뿌리개 꼭지
  let G2=Gd;if(pour){G2=Array.from({length:H+5},()=>Array(W).fill(null));for(let y=0;y<H;y++)for(let x=0;x<W;x++)if(Gd[y][x]){const ny=y+Math.round((x-6)*.32)+2;if(ny>=0&&ny<H+5)G2[ny][x]=Gd[y][x];}}
  return PROPC[key]=rasterOL(G2,W,G2.length,'#241c22');}
const BOOKC=['#8a2a34','#2c4a6a','#3a6a3a','#6a3a7a'];
function bookOpenCv(ci){return pxs('bko'+ci,[
  '.oooo...oooo.',
  'oPPPPoooPPPPo',
  'oPllPPkPPllPo',
  'oPPPPPkPPPPPo',
  'oPlllPkPlllPo',
  'oPPPPPkPPPPPo',
  'oCCCCCCCCCCCo',
  '.ooooooooooRo',
  '...........R.'],{o:'#2a1a1a',P:'#f6f0e0',l:'#b0a490',k:'#d4c8b0',C:BOOKC[ci],R:'#e0a830'});}
function bookSideCv(ci){return pxs('bks'+ci,[
  '.oooo.',
  'oCCCPo',
  'oCgCPo',
  'oCCCPo',
  'oCgCPo',
  'oCCCPo',
  'oDDDPo',
  '.oooo.'],{o:'#2a1a1a',C:BOOKC[ci],g:'#e0c070',P:'#f0e8d4',D:'#3a1e24'});}
function basketCv(){if(PROPC.basket)return PROPC.basket;const W=16,H=14,Gd=Array.from({length:H},()=>Array(W).fill(null)),put=(x,y,c)=>{if(x>=0&&x<W&&y>=0&&y<H)Gd[y][x]=c;};
  for(let a=0;a<=12;a++){const t=Math.PI*a/12,x=Math.round(7.5-Math.cos(t)*5),y=Math.round(7-Math.sin(t)*6);put(x,y,a>3&&a<9?'#e0b070':'#b88448');}   // 손잡이
  for(let y=4;y<=6;y++)for(let x=9;x<=12;x++)if(x-9<=y-3)put(x,y,(x+y)%3?'#d8a050':'#f0c878');   // 바게트
  for(let y=5;y<=6;y++)for(let x=3;x<=7;x++)put(x,y,(x+y)%2?'#e04a4a':'#fbf3e6');put(12,6,'#d83a3a');   // 냅킨 · 사과
  for(let x=1;x<=14;x++)put(x,7,x%2?'#a87038':'#c08848');   // 테두리
  for(let y=8;y<=11;y++)for(let x=2;x<=13;x++){if(y===11&&(x===2||x===13))continue;put(x,y,y===11?'#7a4e28':(x%3===0?'#8a5a30':((x+y)%2?'#c89858':'#a87a40')));}
  return PROPC.basket=rasterOL(Gd,W,H,'#2a1a12');}
function bentoCv(){return pxs('bento',[
  'oooooooooooooo',
  'oRRRRRRRRRRRRo',
  'oRwwnRsyyRffRo',
  'oRwwnRsssRfgRo',
  'oRwwwRyysRLLRo',
  'oRnwwRsssRLfRo',
  'oRRRRRRRRRRRRo',
  'oDDDDDDDDDDDDo',
  '.oooooooooooo.'],{o:'#2a1a12',R:'#c08a50',D:'#8a5a30',w:'#fbf8f0',n:'#2a3a2a',s:'#ecd09a',y:'#f0d040',f:'#e03040',g:'#5aa040',L:'#7ac050'});}
function cupCv(){return pxs('cup',['.oooo.','oTTTTo','oWWWWoo','oWWWWoW','.oWWo.o','oooooo'],{o:'#3a2a2a',T:'#b07a4a',W:'#fbf8f2'});}
function blanketCv(){if(PROPC.blanket)return PROPC.blanket;const W=90,H=22,c=document.createElement('canvas');c.width=W;c.height=H+2;const g=c.getContext('2d');
  g.fillStyle='rgba(30,15,20,.22)';g.fillRect(2,3,W-2,H-1);
  for(let y=0;y<H-2;y++)for(let x=0;x<W-2;x++){const a=(x%6<3),b=(y%6<3),v=a&&b?'#b83a40':a||b?'#e07a7c':'#fbf2e6';g.fillStyle=v;g.fillRect(x+1,y+1,1,1);}
  g.fillStyle='rgba(60,20,20,.18)';g.fillRect(1,H-5,W-2,3);g.fillStyle='rgba(255,255,255,.18)';g.fillRect(1,1,W-2,1);
  g.fillStyle='#8a2a30';g.fillRect(1,H-2,W-2,1);for(let x=1;x<W-1;x+=2){g.fillStyle='#fbf2e6';g.fillRect(x,H-1,1,1);g.fillRect(x,0,1,1);}return PROPC.blanket=c;}
function drawRod(hx,hy,tipx,tipy){const n=18;for(let k=0;k<=n;k++){const u=k/n,x=Math.round(hx+(tipx-hx)*u),y=Math.round(hy+(tipy-hy)*u);
    ctx.fillStyle=u<.28?(k%2?'#c89a5a':'#a87a40'):u>.9?'#7a5a3a':'#3a2416';ctx.fillRect(x,y,u<.28?2:1,u<.28?2:1);}
  const rx=Math.round(hx+(tipx-hx)*.2),ry=Math.round(hy+(tipy-hy)*.2);ctx.fillStyle='#2a2228';ctx.fillRect(rx-1,ry+1,4,4);ctx.fillStyle='#9a9aa8';ctx.fillRect(rx,ry+2,2,2);ctx.fillStyle='#e0e0e8';ctx.fillRect(rx,ry+2,1,1);}
function drawBobber(bx,by){ctx.fillStyle='#1e1618';ctx.fillRect(bx-2,by-4,5,8);ctx.fillRect(bx,by-6,1,2);ctx.fillStyle='#e8403a';ctx.fillRect(bx-1,by-3,3,3);ctx.fillStyle='#ff8a7a';ctx.fillRect(bx-1,by-3,1,1);ctx.fillStyle='#fbf6ec';ctx.fillRect(bx-1,by,3,3);ctx.fillStyle='#c8c0b0';ctx.fillRect(bx+1,by+2,1,1);}
function drawCan(x,y,dir,kind,pour){let cv=canCv(kind,pour);const left=dir===2;if(left)cv=propFlip('can_'+kind+(pour?'_p':''),cv);ctx.drawImage(cv,Math.round(x-(left?cv.width-6:6)),Math.round(y-9));
  if(pour){const sx=Math.round(x+(left?-11:11)),sy=Math.round(y+(dir===1?-1:2));const t=performance.now();ctx.fillStyle='rgba(160,210,245,.95)';for(let j=0;j<6;j++){const k=((t/60+j*2.3)%7);ctx.fillRect(sx+(left?-1:1)*((j%3)-1),sy+k,1,2);}}}
/* 바닥에 다리 쭉 뻗고 앉기: 앉은 상반신 + 서 있는 모습의 다리(키대로)를 90° 눕혀 앞으로 뻗는다 */
function groundSit(sp,dir,st){const key='_gs'+dir;if(sp[key])return sp[key];const flip=dir===2;
  const rd=c=>{const W=c.width,H=c.height,d=c.getContext('2d').getImageData(0,0,W,H).data;return {W,H,px:(x,y)=>{if(x<0||x>=W||y<0||y>=H)return null;const i=(y*W+(flip?W-1-x:x))*4;return d[i+3]>0?[d[i],d[i+1],d[i+2],d[i+3]]:null;}};};
  const A=rd(sp),Bs=st?rd(st):null,any=(R,y,a,b)=>{for(let x=a;x<=b;x++)if(R.px(x,y))return true;return false;};
  let seat=0;for(let y=A.H-1;y>A.H/2;y--)if(any(A,y,3,6)&&any(A,y,11,15)){seat=y;break;}if(!seat)seat=A.H-8;
  let hS=0;while(hS<A.H&&!any(A,hS,0,15))hS++;
  const TH=3,PAD=18,OW=A.W+PAD,OH=A.H,out=document.createElement('canvas');out.width=OW;out.height=OH;const g=out.getContext('2d'),img=g.createImageData(OW,OH),od=img.data;
  const put=(x,y,c)=>{if(!c||x<0||x>=OW||y<0||y>=OH)return;const i=(y*OW+x)*4;od[i]=c[0];od[i+1]=c[1];od[i+2]=c[2];od[i+3]=c[3];};
  // 다리 (서 있는 모습에서 엉덩이 아래 전부)
  let bx=4;for(let x=0;x<8;x++)if(A.px(x,seat)){bx=x;break;}
  if(Bs){let hT=0;while(hT<Bs.H&&!any(Bs,hT,0,15))hT++;let yB=Bs.H-1;while(yB>0&&!any(Bs,yB,0,15))yB--;const hip=Math.min(yB-6,hT+(seat-hS)-TH+1);
    const cnt=(R,y0,y1,x0_,x1_)=>{const m={};for(let y=y0;y<=y1;y++)for(let x=x0_;x<=x1_;x++){const c=R.px(x,y);if(c){const k=c.slice(0,3).join(',');m[k]=(m[k]||0)+1;}}return Object.entries(m).sort((a,b)=>b[1]-a[1]).map(e=>e[0].split(',').map(Number));};
    const lum=c=>c[0]*.3+c[1]*.59+c[2]*.11,mix=(c,k)=>c.map(v=>Math.max(0,Math.min(255,Math.round(k>0?v+(255-v)*k:v*(1+k))))).concat(255);
    const notOL=L=>{const mn=Math.min(...L.map(lum));return L.filter(c=>lum(c)>mn+14);},pm=(notOL(cnt(Bs,yB-4,yB-2,0,15))[0])||[50,50,60],sh=(notOL(cnt(Bs,yB-1,yB,0,15))[0])||(cnt(Bs,yB-1,yB,0,15)[0])||[50,40,40];
    const dk=lum(pm)<70,OL=[18,13,18,255],PL=mix(pm,dk?.14:.12),PM=mix(pm,0),PD=mix(pm,-.28),FL=mix(pm,dk?.06:-.04),FD=mix(pm,-.38),SH=mix(sh,lum(sh)<50?.15:0),SL=mix(sh,.45),SD=mix(sh,-.35);
    const L=Math.max(8,Math.round((yB-hT+1)*.36)),G=OH-1,x0=bx+1;
    // 쿼터뷰: 바닥에 놓인 다리는 윗면(밝음)이 넓게 보이고, 먼 다리는 화면 위쪽에 있다
    const TOP=mix(pm,dk?.26:.2),TOP2=mix(pm,dk?.14:.1),SIDE=mix(pm,-.22),FT=mix(pm,dk?.1:.02),FT2=mix(pm,dk?.02:-.06),FS=mix(pm,-.35);
    const leg=(yb,len,t1,t2,sd,far)=>{for(let k=0;k<len;k++){const x=x0+k,taper=k>len-3?1:0;put(x,yb-4+taper,OL);put(x,yb-3+taper,t1);put(x,yb-2,t2);put(x,yb-1,sd);put(x,yb,OL);}};
    const boot=(e,yb,S,Sl,Sd)=>{   // 발: 앞코가 위로 선 신발을 위에서 비스듬히 본 모양 (밑창이 앞을 향함)
      put(e,yb-6,OL);put(e+1,yb-6,OL);put(e-1,yb-5,OL);put(e,yb-5,Sl);put(e+1,yb-5,Sl);put(e+2,yb-5,OL);
      put(e-1,yb-4,OL);put(e,yb-4,S);put(e+1,yb-4,Sl);put(e+2,yb-4,Sd);put(e+3,yb-4,OL);
      put(e,yb-3,S);put(e+1,yb-3,S);put(e+2,yb-3,Sd);put(e+3,yb-3,OL);
      put(e,yb-2,S);put(e+1,yb-2,Sd);put(e+2,yb-2,Sd);put(e+3,yb-2,OL);
      put(e,yb-1,Sd);put(e+1,yb-1,Sd);put(e+2,yb-1,OL);put(e,yb,OL);put(e+1,yb,OL);};
    for(let k=0;k<L;k++){const x=x0+k,yb=k<L*.45?G-1:G-2;put(x,yb-4,OL);put(x,yb-3,FT);put(x,yb-2,FT2);put(x,yb-1,FS);}boot(x0+L,G-2,SD,SH,mix(sh,-.55));
    leg(G,L,TOP,TOP2,SIDE,0);boot(x0+L,G,SH,SL,SD);
  }
  // 상반신 (허벅지·정강이는 버리고 엉덩이까지)
  const D=OH-1-seat;for(let y=0;y<=seat;y++)for(let x=0;x<A.W;x++){if(y>seat-TH&&x>bx+5)continue;const c=A.px(x,y);if(c)put(x,y+D,c);}
  g.putImageData(img,0,0);let res=out;if(flip)res=flipCv(out);return sp[key]={cv:res,ox:flip?PAD:0};}

/* ── 소풍 소품 v2 (세밀) ── */
function gridCv(W,H,fn,ol){const Gd=Array.from({length:H},()=>Array(W).fill(null)),p=(x,y,c)=>{x=Math.round(x);y=Math.round(y);if(x>=0&&x<W&&y>=0&&y<H)Gd[y][x]=c;};fn(p,Gd);return rasterOL(Gd,W,H,ol||'#2a1a14');}
function basket2(){if(PROPC.basket2)return PROPC.basket2;return PROPC.basket2=gridCv(20,17,(p)=>{
  for(let a=0;a<=16;a++){const t=Math.PI*a/16,x=9.5-Math.cos(t)*6.5,y=8-Math.sin(t)*7;p(x,y,a>4&&a<12?'#e8b878':'#b8844c');p(x,y+1,'#8a5a2e');}   // 손잡이 (빛 받는 위쪽)
  for(let y=4;y<=7;y++)for(let x=4;x<=8;x++)if(x-4<=y-3)p(x+(y-4),y,(x+y)%3===0?'#a86a2a':(x+y)%3===1?'#e0a858':'#f0c878');   // 바게트
  p(6,4,'#8a5428');p(8,5,'#8a5428');p(10,6,'#8a5428');                                       // 칼집
  for(const [x,y,c] of [[13,5,'#c82a2a'],[14,5,'#e04040'],[13,6,'#d83434'],[14,6,'#b82424'],[12,6,'#c02a2a'],[13,4,'#5a3a1a'],[14,3,'#4a9a3a'],[15,3,'#6ab84a']])p(x,y,c);p(14,5,'#ff9a8a');   // 사과
  for(let y=6;y<=8;y++)for(let x=2;x<=8;x++){if(y===8&&x>6)continue;p(x,y,((x>>1)+(y>>0))%2?'#fbf3e6':'#d84a4a');}   // 체크 냅킨
  for(let x=1;x<=18;x++){p(x,8,(x%2)?'#c8904c':'#8a5a2a');p(x,9,(x%2)?'#8a5a2a':'#b07a3c');}   // 땋은 테두리
  for(let y=10;y<=15;y++)for(let x=2;x<=17;x++){if(y===15&&(x===2||x===17))continue;const band=((y-10)>>1)%2,c=x%3===0?'#7a4a22':((x+band)%2?'#d8a060':'#b07a3c');p(x,y,y===15?'#6a4020':c);}
  for(let y=10;y<=14;y++)p(2,y,'#e8b878');p(3,10,'#f0c888');   // 왼쪽 빛
  p(7,8,'#d84a4a');p(7,9,'#fbf3e6');p(6,10,'#d84a4a');p(5,10,'#fbf3e6');   // 냅킨이 테두리 밖으로 늘어짐
},'#2a1a10');}
function plate2(){if(PROPC.plate2)return PROPC.plate2;return PROPC.plate2=gridCv(18,11,(p)=>{
  for(let y=3;y<11;y++)for(let x=0;x<18;x++){const ex=(x-8.5)/8.6,ey=(y-7)/3.8,r=ex*ex+ey*ey;if(r<=1)p(x,y,r>.7?'#b8c8d8':r>.5?'#e8eef4':'#fbfcfe');}   // 흰 접시 · 파란 테
  const sand=(ox,oy)=>{const rows=['..CC..','.CWWC.','CGGGGC','CRRRRC','CYYYYC','CWWWWC','CCCCCC'],pal={C:'#c8904c',W:'#fbf3e0',G:'#6ab84a',R:'#e0503a',Y:'#f2d24a'};   // 세모 샌드위치 단면: 빵 · 상추 · 토마토 · 달걀
    rows.forEach((r,y)=>[...r].forEach((ch,x)=>{if(pal[ch])p(ox+x,oy+y,pal[ch]);}));};
  sand(2,1);sand(7,2);
  for(const [x,y] of [[13,5],[14,7]]){p(x,y,'#e03040');p(x+1,y,'#c82030');p(x,y+1,'#b81828');p(x+1,y+1,'#d82838');p(x,y-1,'#4a9a3a');p(x+1,y-1,'#6ab84a');p(x,y,'#ff8a80');}   // 딸기
},'#4a5868');}
function cup2(){if(PROPC.cup2)return PROPC.cup2;return PROPC.cup2=gridCv(11,8,(p)=>{
  for(let x=1;x<10;x++)p(x,7,'#c8d0da');for(let x=0;x<11;x++)p(x,6,x===0||x===10?'#c8d0da':'#eef2f6');   // 받침
  for(let y=1;y<6;y++){const w=y<4?3:2;for(let x=5-w;x<=4+w;x++)p(x,y,x===5-w?'#ffffff':x===4+w?'#c8d0da':'#f4f6f8');}for(let x=2;x<=7;x++)p(x,3,'#5a7ab0');   // 잔 · 파란 띠
  for(let x=2;x<=7;x++)p(x,1,'#4a2818');p(3,1,'#7a4a2a');p(4,1,'#b8885a');p(5,1,'#d8a878');   // 커피 · 크레마
  p(8,2,'#e8ecf0');p(9,3,'#e8ecf0');p(8,4,'#e8ecf0');                       // 손잡이
},'#3a3a44');}
function pot2(){if(PROPC.pot2)return PROPC.pot2;return PROPC.pot2=gridCv(12,13,(p)=>{
  for(let y=4;y<=12;y++){const w=y<6?3:y<11?4:3;for(let x=6-w;x<=5+w;x++)p(x,y,x<=6-w+1?'#7aa8d8':x>=5+w-1?'#2e5a8a':'#4a7ab8');}   // 법랑 몸통
  for(let x=3;x<=8;x++)p(x,3,'#3a6aa0');p(5,1,'#e8eef4');p(6,1,'#e8eef4');p(5,2,'#c8d0da');p(6,2,'#c8d0da');   // 뚜껑 · 꼭지
  p(1,6,'#4a7ab8');p(0,5,'#4a7ab8');p(0,4,'#7aa8d8');                       // 주둥이
  p(10,5,'#2e5a8a');p(11,6,'#2e5a8a');p(11,7,'#2e5a8a');p(10,8,'#2e5a8a');   // 손잡이
  p(4,7,'#ffffff');p(4,8,'#cfe0f4');for(let x=4;x<=7;x++)p(x,10,'#fbf8f0');   // 반짝임 · 흰 띠
},'#1e2a3a');}
function fruit2(){if(PROPC.fruit2)return PROPC.fruit2;return PROPC.fruit2=gridCv(14,10,(p)=>{
  for(let y=5;y<10;y++)for(let x=0;x<14;x++){const ex=(x-6.5)/6.6,ey=(y-6)/3.6;if(ex*ex+ey*ey<=1&&y>=6)p(x,y,y===6?'#d8a060':y>=8?'#8a5a2e':'#b07a3c');}   // 나무 그릇
  for(const [x,y] of [[3,4],[4,3],[5,4],[4,5],[3,5],[5,5],[4,4]])p(x,y,(x+y)%2?'#7a3a9a':'#5a2a7a');p(4,3,'#a870c8');p(4,2,'#4a7a3a');   // 포도
  for(let y=2;y<=5;y++)for(let x=7;x<=10;x++){const ex=(x-8.5)/2,ey=(y-3.6)/2;if(ex*ex+ey*ey<=1.1)p(x,y,ex+ey<-.6?'#ffb860':'#f08a2a');}p(8,1,'#4a7a3a');   // 오렌지
  p(11,4,'#e03040');p(12,4,'#c82030');p(11,5,'#b81828');p(12,3,'#4a9a3a');   // 딸기
},'#2a1a14');}
/* 업무 운반: 은쟁반(찻주전자·찻잔·각설탕) · 장작 한 아름 — 가슴 앞에 두 손으로 */
function trayCv(){return pxs('tray',[
 '......KKK.........',
 '.....KWWWK........',
 '....KKWBWKK..KKK..',
 '...KWWWWWWWK.KWWK.',
 '..KWKBBBBBBWKKWWK.',
 '..KWWWWWWWWWK.KK..',
 '..KWWWWWWWWWKKWWWK',
 '...KSSWWWWSK.KWWK.',
 'KKKKKKKKKKKKKKKKKK',
 'KhHHHHHHHHHHHHHHhK',
 '.KsssssssssssssK..',
 '..KKKKKKKKKKKKKK..'],{K:'#3a2a24',W:'#f6f2ea',B:'#4a6aa8',S:'#d8d0c4',H:'#e4e8ee',h:'#b8c0cc',s:'#8a92a0'});}
function logsCv(){return pxs('logs',[
 '..KKKKKKKKKKKK..',
 '.KyYKbbbbbbbKyYK',
 '.KYoKBbBBbBbKYoK',
 '.KyYKbbbbbbbKyYK',
 'KKKKKKKKKKKKKKKK',
 'KyYKbbbBbbbbbKyY',
 'KYoKBbbbBbBbbKYo',
 'KyYKbbbbbbbbbKyY',
 'KKKKKKKKKKKKKKKK',
 '.KyYKbbBbbbbKyYK',
 '.KYoKbBbbbBbKYoK',
 '..KKKKKKKKKKKK..'],{K:'#3a2418',b:'#7a5236',B:'#5a3a24',y:'#e8c890',Y:'#d4a868',o:'#a87a48'});}
function handPx(x,y){ctx.fillStyle='#3a2a24';ctx.fillRect(x-1,y-1,4,4);ctx.fillStyle='#f6d2b4';ctx.fillRect(x,y,2,2);}
function drawCarry(sx,sy,dir,what){const cv=what==='tea'?trayCv():logsCv(),w=cv.width,h=cv.height;
  if(dir===1)return;   // 뒷모습: 몸 앞에 들고 있어 보이지 않음
  const ox=dir===2?-3:dir===3?3:0,x=Math.round(sx-w/2)+ox,y=sy-13+(what==='tea'?-2:0);
  ctx.drawImage(cv,x,y);handPx(x-1,y+h-5);handPx(x+w-1,y+h-5);}
/* ═════════ 원본에 없는 소품: 원본 톤(외곽선·3단 명암)으로 직접 그린 상자 · 자루 · 바구니 · 궤짝 ═════════ */
const PROPPX={
 crate:{rows:[
 '..KKKKKKKKKKKK..','.KhHHHHHHHHHHhK.','.KHmmmmmmmmmmHK.','.KdddddddddddKK.','KKKKKKKKKKKKKKKK','KhHHHHHHHHHHHHhK','KHmmmKmmmmKmmmHK','KHmmmKmmmmKmmmdK',
 'KdddddddddddddddK'.slice(0,16),'KHmmKmmmmmmKmmHK','KHmmmKmmmmKmmmHK','KHmmmmKmmKmmmmdK','KdddddddddddddddK'.slice(0,16),'KHmmmmmKKmmmmmHK','KhddddddddddddhK','.KKKKKKKKKKKKKK.'],pal:{K:'#3a2418',h:'#e0b880',H:'#c8955c',m:'#a8743e',d:'#7a5028'},h:16},
 sack:{rows:[
 '.....KKKKK......','....KyYYyK......','.....KKKK.......','....KYYYYK......','...KYYyYYYK.....','..KYYyYYYYYK....','.KYYYYYyYYYdK...','.KYyYYYYYYYdK...','KYYYYYYYyYYddK..','KYYyYYYYYYYddK..','KYYYYYYYYYddddK.','KdYYYYYYYdddddK.','.KdddddddddddK..','..KKKKKKKKKKK...'],pal:{K:'#3e2c1c',y:'#f0dca8',Y:'#d8bc84',d:'#a88a58'},h:14},
 basket:{rows:[
 '...KKKKKKKKKK...','..KwwWwwWwwWwK..','.KWwwWbWwwbWwwK.','KKKKKKKKKKKKKKKK','KhHhHhHhHhHhHhHK','KHdHdHdHdHdHdHdK','.KhHhHhHhHhHhHK.','.KHdHdHdHdHdHdK.','..KhHhHhHhHhHK..','..KKKKKKKKKKKK..'],pal:{K:'#3e2c1c',h:'#e0bc84',H:'#c09858',d:'#8a6a3a',w:'#f6f2ea',W:'#d8d0c4',b:'#9ab0d0'},h:10},
 chest:{rows:[
 '..KKKKKKKKKKKK..','.KhHHHHHHHHHHhK.','KhHHHHHHHHHHHHhK','KHmmmmmmmmmmmmHK','KSSSSSSSSSSSSSSK','KKKKKKKyyKKKKKKK','KhHHHHHKYYKHHHhK','KHmmmmmKyyKmmmHK','KHmmmmmmKKmmmmHK','KSSSSSSSSSSSSSSK','KHmmmmmmmmmmmmdK','KddddddddddddddK','.KKKKKKKKKKKKKK.'],pal:{K:'#2e1e16',h:'#c8885a',H:'#a8683e',m:'#8a5030',d:'#5e3420',S:'#8a8a96',y:'#f0d070',Y:'#b89020'},h:13}};
function propPx(k){return pxs('pp_'+k,PROPPX[k].rows,PROPPX[k].pal);}
{const _f5=furnSprite;furnSprite=function(o,a){if(!a.outdoor&&PROPPX[o.k]&&o.w===1)return {ppx:o.k,w:1,h:1};return _f5(o,a);};}
{const _fc3=furnCanvas;furnCanvas=function(sp){if(sp&&sp.ppx){const s=propPx(sp.ppx),c=mk(16,s.height+2);const g=c.getContext('2d');g.fillStyle='rgba(30,15,20,.22)';g.fillRect(2,s.height,13,2);g.drawImage(s,0,0);return c;}return _fc3(sp);};}
