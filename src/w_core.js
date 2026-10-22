/* ───────── 세계: 지역 · 타일 · 가구 ─────────
   지역(AREA)마다 타일맵 + 가구 오브젝트 + 출입구(doors).
   실내 타일: '#' 벽 윗면  'w' 벽면  'n' 창문  'v' 벽면 통로  'd' 문턱  'E' 출입 매트  '>' '<' 계단
   바닥: '.' 마루  'c' 붉은 카펫  'C' 푸른 카펫  'k' 주방 타일  'm' 대리석  's' 돌바닥  'q' 널판(헛간)  'h' 헤링본
   실외: ',' 풀  ':' 자갈길  'x' 흙  'L' 물  'J' 부두  'Z' 갈대  't' 'I' 나무  'f' 꽃  'z' 덤불  '=' 울타리  'e' 텃밭
         'l' 가로등  'Y' 벤치  'F' 분수  'G' 성문  'K' 노점  'V' 술통  'X' 상자  'u' 우물  'g' 게시판  'j' 수레  'o' 건초
         'p' 화분  'T' 테라스 탁자  '%' 성벽  'r' 'W' 'O' 건물 외관 */
const T=16,AREAS={},ACTS={};let A=null;
function newArea(id,name,w,h,ch,o={}){A={id,name,MW:w,MH:h,map:Array.from({length:h},()=>new Array(w).fill(ch)),ROOMS:[],OUT:[],BLD:[],objs:[],doors:[],floor:null,def:o.def||'',outdoor:!!o.outdoor,group:o.group||id,wall:o.wall||'cream',light:o.light||0};AREAS[id]=A;return A;}
const fill=(x,y,w,h,c)=>{for(let j=y;j<y+h;j++)for(let i=x;i<x+w;i++)if(A.map[j]&&i>=0&&i<A.MW)A.map[j][i]=c;};
const put=(list,c)=>list.forEach(([x,y])=>{if(A.map[y])A.map[y][x]=c;});
/* 실내 방: 위 2줄은 벽면 */
function room(id,name,x,y,w,h,fl,wall){fill(x,y,w,h,fl);fill(x,y,w,2,'w');A.ROOMS.push([id,name,x,y,w,h,fl,wall||A.wall]);}
function door(x,y){A.map[y][x]='d';for(let k=1;k<=2;k++)if(A.map[y+k]&&A.map[y+k][x]==='w')A.map[y+k][x]='v';}
function sdoor(x,y){A.map[y][x]='d';}
function win(x,y){A.map[y+1][x]='n';}
function exitTo(x,y,to,ax,ay,dir,ch){A.map[y][x]=ch||'E';A.doors.push({x,y,to,ax,ay,dir:dir||0});}
function ob(k,x,y,w=1,h=1,o={}){const r=Object.assign({k,x,y,w,h},o);A.objs.push(r);return r;}
function spots(id,list){ACTS[id]=list;}
/* 실외 건물: [id,이름,x,y,w,h,지붕,벽,문x,간판,{wr:벽줄수,style,to,door2}] */
function bld(id,name,x,y,w,h,roof,wall,dx,sign,o={}){const b=[id,name,x,y,w,h,roof,wall,dx,sign,Object.assign({wr:1,style:'plaster'},o)];A.BLD.push(b);
  const wr=b[10].wr;fill(x,y,w,h-wr,'r');fill(x,y+h-wr,w,wr,'W');
  const ds=[dx].concat(b[10].door2!=null?[b[10].door2]:[]);for(const d of ds)A.map[y+h-1][d]='O';
  if(b[10].back!=null)A.map[y+h-1][b[10].back]='O';return b;}
function link(bid,dx,to,ax,ay){const b=A.BLD.find(b=>b[0]===bid),y=b[3]+b[5]-1;A.doors.push({x:dx,y,to,ax,ay,dir:1,bld:bid});}

/* ── 색 ── */
const OL='#2e2024';
const WOOD={b:'#9a6438',l:'#b8804e',d:'#6e4428',o:OL};
const WALLS={
  cream:{a:'#eadcc4',b:'#e0cfb2',m:'#8a5a3a',t:'#d9c7a6'},navy:{a:'#3e4c6e',b:'#36425f',m:'#5a3a2c',t:'#4a5878'},green:{a:'#5a7a5a',b:'#4f6e50',m:'#5a3a2c',t:'#668866'},
  rose:{a:'#c48a8e',b:'#b97e83',m:'#6a3a34',t:'#d09ca0'},white:{a:'#eef0ea',b:'#e2e4dc',m:'#8a8478',t:'#f6f6f2'},stone:{a:'#a8a196',b:'#9a9388',m:'#6e675e',t:'#b6afa4'},
  wood:{a:'#a8784a',b:'#9a6c40',m:'#5a3a22',t:'#b88a5a'},glass:{a:'#cfe8e4',b:'#bcdcd6',m:'#7a8a7a',t:'#e6f4f0'},brick:{a:'#b86a52',b:'#a85e48',m:'#5a3a2a',t:'#c87a62'},
  gold:{a:'#e6d4a8',b:'#dcc89a',m:'#9a7a3a',t:'#f0e2bc'},sage:{a:'#b8c8a8',b:'#acbc9c',m:'#6a5a3a',t:'#c8d6b8'},plum:{a:'#7a5a7a',b:'#6e506e',m:'#3a2a3a',t:'#8a6a8a'},
};

/* ── 바닥·벽 타일 ── */
function drawTile(g,x,y){
  const map=A.map,MW=A.MW,MH=A.MH,c=map[y][x],X=x*T,Y=y*T;
  const R=(a,b,w,h,col)=>{g.fillStyle=col;g.fillRect(X+a,Y+b,w,h);};
  const px=(a,b,col)=>R(a,b,1,1,col);
  const H=k=>hash(x,y,k);
  const nb=(dx,dy)=>{const yy=y+dy,xx=x+dx;return (yy<0||yy>=MH||xx<0||xx>=MW)?' ':map[yy][xx];};
  const box=(a,b,w,h,fill,hi,lo)=>{R(a,b,w,h,OL);R(a+1,b+1,w-2,h-2,fill);if(hi)R(a+1,b+1,w-2,1,hi);if(lo)R(a+1,b+h-2,w-2,1,lo);};
  const rm=A.ROOMS.find(r=>x>=r[2]&&x<r[2]+r[4]&&y>=r[3]&&y<r[3]+r[5]);
  const ground=t=>{
    if(t==='.'){for(let r=0;r<4;r++){const yy=r*4,row=y*4+r,off=Math.floor(hash(0,row,3)*16),tone=hash(x,row,1)<.5?'#b47c4c':'#aa7346';
        R(0,yy,16,4,tone);R(0,yy,16,1,'#c48c5a');R(0,yy+3,16,1,'#7e5232');const sx=(off+(x%2)*8)%16;R(sx,yy,1,3,'#7e5232');
        if(hash(x,row,5)<.5)R(Math.floor(hash(x,row,6)*13)+1,yy+1,3,1,'#9c683e');}}
    else if(t==='h'){R(0,0,16,16,'#a87048');for(let j=0;j<16;j+=4)for(let i=0;i<16;i+=8){const o=(j/4)%2?4:0;R(i+o,j,7,3,'#c08a5a');R(i+o,j,7,1,'#d09a68');}}
    else if(t==='q'){R(0,0,16,16,'#8a6a44');for(let j=0;j<16;j+=5){R(0,j,16,1,'#6a4e30');}R(Math.floor(H(1)*12),2,3,1,'#a08058');px(Math.floor(H(2)*14),8,'#5a4228');}
    else if(t==='c'||t==='C'){const base=t==='c'?['#8e3848','#a8505e','#c9a35e','#6a2634']:['#3e5680','#566e98','#c9a35e','#2a3a5a'];
      R(0,0,16,16,base[0]);for(let j=0;j<16;j++)for(let i=0;i<16;i++){const u=(i+x*16)%8,v=(j+y*16)%8;if(Math.abs(u-4)+Math.abs(v-4)===3)px(i,j,base[1]);if(u===4&&v===4)px(i,j,base[2]);}
      const e=k=>!'cCwvn#d'.includes(nb(...k))&&nb(...k)!==t;
      if(nb(0,-1)!==t&&!'wvn'.includes(nb(0,-1))){R(0,0,16,2,base[2]);R(0,2,16,1,base[3]);}
      if(nb(0,1)!==t){R(0,14,16,2,base[2]);R(0,13,16,1,base[3]);}
      if(nb(-1,0)!==t&&nb(-1,0)!=='d'){R(0,0,2,16,base[2]);R(2,0,1,16,base[3]);}
      if(nb(1,0)!==t&&nb(1,0)!=='d'){R(14,0,2,16,base[2]);R(13,0,1,16,base[3]);}}
    else if(t==='k'){for(let j=0;j<2;j++)for(let i=0;i<2;i++){const a=i*8,b=j*8,lt=(i+j+x+y)%2?'#efe2c6':'#dcc8a4';R(a,b,8,8,'#b8a280');R(a,b,7,7,lt);R(a,b,7,1,'#fbf2de');}}
    else if(t==='m'){for(let j=0;j<2;j++)for(let i=0;i<2;i++){const a=i*8,b=j*8;R(a,b,8,8,'#d8cfc0');R(a,b,7,7,(i+j)%2?'#f4efe6':'#ebe4d8');R(a,b,7,1,'#ffffff');}
      if(H(1)<.5){R(2,3,4,1,'#cfc4b2');R(5,4,3,1,'#cfc4b2');}if((x+y)%2===0){R(7,7,2,2,'#c9a35e');}}
    else if(t==='s'){R(0,0,16,16,'#8a857c');const st=[[0,0,8,8],[8,0,8,8],[0,8,8,8],[8,8,8,8]];for(const [a,b,w,h] of st){const o=((y%2)?4:0);const f=hash(x*2+a,y*2+b,4)<.5?'#a8a296':'#9e988c';R((a+o)%16,b,w-1,h-1,f);R((a+o)%16,b,w-1,1,'#bab4a8');}}
    else if(t===','){R(0,0,16,16,'#7cae4c');
      for(let k=0;k<10;k++){const a=Math.floor(H(k)*15),b=Math.floor(H(k+20)*14)+1,d=H(k+40);
        if(d<.4){px(a,b,'#5e9238');px(a+1,b-1,'#5e9238');}else if(d<.75){px(a,b,'#9ccc62');px(a,b-1,'#b4dc78');}else px(a,b,'#6a9e40');}
      if(H(60)<.25)R(Math.floor(H(61)*10)+2,Math.floor(H(62)*10)+2,3,2,'#8cbe58');
      if(H(77)<.08){const a=Math.floor(H(78)*12)+1,b=Math.floor(H(79)*12)+2;px(a,b,'#fbf6ec');px(a+1,b,'#fbf6ec');px(a,b-1,'#f6dc78');}}
    else if(t===':'){R(0,0,16,16,'#9a8e78');
      for(const [a,b,w,h] of [[0,0,7,5],[8,0,8,4],[0,6,5,5],[6,5,6,6],[12,5,4,5],[0,12,8,4],[9,11,7,5]]){const sh=hash(x*3+a,y*3+b,9);const f=sh<.33?'#cfc4ac':sh<.66?'#c4b89e':'#d8cfb8';
        R(a+1,b+1,w-1,h-1,'#867a64');R(a,b,w-1,h-1,f);R(a+1,b,w-3,1,'#e8e0cc');R(a,b+1,1,h-3,'#e8e0cc');}}
    else if(t==='x'){R(0,0,16,16,'#c49864');for(let k=0;k<8;k++)px(Math.floor(H(k)*15),Math.floor(H(k+9)*15),H(k+30)<.5?'#a87e4c':'#d8b07a');
      if(H(50)<.4)R(Math.floor(H(51)*12)+1,Math.floor(H(52)*12)+1,2,1,'#8e6a40');}
    else if(t==='L'){R(0,0,16,16,'#8cc4dc');if(H(3)<.4)R(Math.floor(H(4)*10),Math.floor(H(5)*12),4,1,'#b8e0ee');if(H(6)<.25)R(Math.floor(H(7)*10)+2,Math.floor(H(8)*12)+2,3,1,'#d8f0f6');}
    else R(0,0,16,16,'#120c0d');
  };
  const base=()=>ground(A.floor?A.floor[y][x]:'.');
  switch(c){
    case ' ':R(0,0,16,16,'#120c0d');break;
    case '#':{const below=nb(0,1);R(0,0,16,16,'#4a3430');if(H(1)<.3)R(Math.floor(H(2)*12),Math.floor(H(3)*12),3,1,'#56403a');
      if(!'#w nv'.includes(below)){R(0,12,16,4,'#3a2622');R(0,12,16,1,'#6a4c40');R(0,15,16,1,'#22161a');}
      if(nb(0,-1)===' '||y===0)R(0,0,16,1,'#22161a');break;}
    case 'w':case 'n':case 'v':{
      if(c==='v'){ground(rm?rm[6]:'.');R(0,0,2,16,'#5a3a2c');R(14,0,2,16,'#5a3a2c');R(0,0,16,2,'#3a2620');break;}
      const W=WALLS[rm?rm[7]:A.wall]||WALLS.cream,top=nb(0,-1)!=='w'&&nb(0,-1)!=='n';
      R(0,0,16,16,W.a);for(let i=0;i<16;i+=4)R(i+((x%2)*2),0,2,16,W.b);
      if(rm&&(rm[7]==='stone'||rm[7]==='brick')){R(0,0,16,16,W.a);for(let j=0;j<16;j+=5){const o=((y*3+j/5)%2)?0:6;R(0,j,16,1,W.m);for(let i=o;i<16;i+=12)R(i,j,1,5,W.m);}}
      if(rm&&rm[7]==='wood'){R(0,0,16,16,W.a);for(let i=0;i<16;i+=5)R(i,0,1,16,W.m);}
      if(rm&&rm[7]==='glass'){R(0,0,16,16,'#cfe8e4');R(0,0,16,1,'#7a8a7a');R(0,0,1,16,'#7a8a7a');R(8,0,1,16,'#9aaa9a');R(2,2,3,6,'#eef8f6');}
      if(top){R(0,0,16,2,'#5a3a2c');R(0,2,16,1,'#3a2620');}
      if(nb(0,1)!=='w'&&nb(0,1)!=='n'){R(0,11,16,5,W.m);R(0,11,16,1,shade(W.m,.25));R(0,15,16,1,'#2e2024');}
      if(c==='n'){R(2,1,12,10,OL);R(3,2,10,8,'#bfe2ee');R(3,2,10,3,'#e6f6fa');R(7,2,2,8,OL);R(3,6,10,1,OL);R(1,10,14,2,'#6a4a3a');R(2,10,12,1,'#8a6a5a');}
      break;}
    case 'd':{ground(rm?rm[6]:(A.floor?A.floor[y][x]:'.'));R(0,0,16,16,'rgba(0,0,0,.08)');R(0,0,2,16,'#5a3a2c');R(14,0,2,16,'#5a3a2c');R(0,0,16,3,'#3a2620');R(2,13,12,3,'#7a5034');R(2,13,12,1,'#9a6a44');break;}
    case 'E':{const f=A.floor?A.floor[y][x]:'.';ground(f==='E'?'.':f);R(0,0,16,16,'#3a2a24');R(2,1,12,12,'#a85a48');R(3,2,10,10,'#c8765e');for(let i=4;i<12;i+=2)R(i,3,1,8,'#b0624e');R(0,13,16,3,'#22161a');break;}
    case '>':case '<':{R(0,0,16,16,'#3a2a24');for(let i=0;i<4;i++){R(1,i*4,14,3,c==='>'?['#9a8e80','#857a6c','#6e6458','#574e44'][i]:['#574e44','#6e6458','#857a6c','#9a8e80'][i]);R(1,i*4,14,1,'#b0a494');}R(0,0,1,16,OL);R(15,0,1,16,OL);break;}
    case '%':{R(0,0,16,16,'#8a857c');for(let j=0;j<16;j+=5){const o=((y*3+j/5)%2)?0:6;R(0,j,16,1,'#6e6a62');for(let i=o;i<16;i+=12)R(i,j,1,5,'#6e6a62');}R(0,0,16,2,'#b6b0a6');
      if(nb(0,1)!=='%'&&nb(0,1)!=='G'){R(0,13,16,3,'#5a564e');}if(nb(0,-1)!=='%'){for(let i=0;i<16;i+=8)R(i,0,4,3,'#c8c2b6');}break;}
    case 'J':{R(0,0,16,16,(nb(0,-1)==='L'||nb(0,1)==='L'||nb(-1,0)==='L')?'#8cc4dc':'#7cae4c');R(2,0,12,16,OL);for(let j=0;j<16;j+=4){R(3,j,10,3,'#c8945a');R(3,j,10,1,'#e0b07a');}if(nb(0,1)!=='J'){R(2,14,2,2,'#6a4428');R(12,14,2,2,'#6a4428');}break;}
    case 'Z':{R(0,0,16,16,'#8cc4dc');for(let i=0;i<6;i++){const a=2+Math.floor(H(i)*12),h=6+Math.floor(H(i+6)*6);R(a,16-h,1,h,'#5e8a3a');px(a,16-h,'#7aa64a');}R(Math.floor(H(13)*8)+3,4,2,4,'#8a5a38');break;}
    case 'L':{ground('L');if(nb(0,-1)!=='L'&&nb(0,-1)!=='Z'&&nb(0,-1)!=='J'){R(0,0,16,3,'#9a8e78');R(0,3,16,1,'#e8f6fa');}if(nb(0,1)!=='L'&&nb(0,1)!=='Z'){R(0,13,16,3,'#8fb8c8');}
      if(nb(-1,0)!=='L'&&nb(-1,0)!=='Z'&&nb(-1,0)!=='J')R(0,0,2,16,'#9a8e78');if(nb(1,0)!=='L'&&nb(1,0)!=='Z'&&nb(1,0)!=='J')R(14,0,2,16,'#9a8e78');
      if(H(9)<.1){R(5,7,4,3,'#7ab27a');px(6,7,'#f6c8d8');}break;}
    case 'F':{ground(':');R(0,0,16,16,'#b8ae9c');const l=nb(-1,0)==='F'?0:2,r=nb(1,0)==='F'?16:14,t=nb(0,-1)==='F'?0:2,b=nb(0,1)==='F'?16:14;
      R(l,t,r-l,b-t,'#8a8070');{const il=l?l+1:0,it=t?t+1:0,ir=r<16?r-1:16,ib=b<16?b-1:16;R(il,it,ir-il,ib-it,'#5ea8c8');if(t)R(il,it,ir-il,2,'#8ccbe2');}
      if(H(1)<.6)R(Math.floor(H(2)*8)+3,Math.floor(H(3)*8)+4,3,1,'#d6f0f8');
      if(l===2)R(0,0,2,16,'#d6cfc0');if(t===2)R(0,0,16,2,'#d6cfc0');if(r===14)R(14,0,2,16,'#a89e8c');if(b===14)R(0,14,16,2,'#a89e8c');
      if(nb(-1,0)==='F'&&nb(1,0)==='F'&&nb(0,-1)==='F'&&nb(0,1)==='F'){R(5,2,6,12,OL);R(6,3,4,10,'#d6cfc0');R(4,0,8,3,'#e8f6fa');R(6,0,4,1,'#ffffff');}break;}
    case 'f':{ground(',');const cols=[['#f0a0b8','#d0708a'],['#f6dc78','#d8b448'],['#fbf6ec','#d8d0c0'],['#b8a0e0','#8a70c0']];
      for(let k=0;k<4;k++){const a=2+Math.floor(H(k)*11),b=3+Math.floor(H(k+5)*10),cc=cols[Math.floor(H(k+9)*4)];R(a,b+2,1,3,'#4f8a34');px(a-1,b+3,'#5e9a3c');R(a-1,b,3,2,cc[0]);px(a,b,cc[1]);px(a,b-1,cc[0]);}break;}
    case 't':{ground(',');R(3,13,10,3,'rgba(30,50,20,.35)');R(6,10,4,6,OL);R(7,10,2,5,'#7a5034');
      g.fillStyle=OL;g.beginPath();g.ellipse(X+8,Y+6.5,7.5,6.5,0,0,7);g.fill();g.fillStyle='#3e7a34';g.beginPath();g.ellipse(X+8,Y+6.5,6.5,5.5,0,0,7);g.fill();
      g.fillStyle='#56983e';g.beginPath();g.ellipse(X+7,Y+5.5,5,4,0,0,7);g.fill();g.fillStyle='#78b454';g.beginPath();g.ellipse(X+6,Y+4,2.5,1.8,0,0,7);g.fill();R(4,9,2,1,'#2e6028');R(10,10,2,1,'#2e6028');
      if(H(5)<.3){px(5,7,'#e86a6a');px(10,5,'#e86a6a');px(8,9,'#e86a6a');}break;}
    case 'I':{ground(',');R(3,13,10,3,'rgba(30,50,20,.35)');R(7,12,2,4,OL);R(7,12,1,3,'#7a5034');
      for(const [w,yy] of [[4,0],[6,3],[8,6],[10,9]])R(8-w/2-1,yy,w+2,4,OL);for(const [w,yy,cl] of [[2,1,'#3e7a4a'],[4,4,'#3e7a4a'],[6,7,'#356a42'],[8,10,'#2e5e3a']]){R(8-w/2,yy,w,3,cl);R(8-w/2,yy,Math.max(1,w/2),1,'#5a9a5c');}break;}
    case 'z':{ground(A.floor&&A.floor[y][x]===':'?':':',');R(2,13,12,3,'rgba(30,50,20,.3)');g.fillStyle=OL;g.beginPath();g.ellipse(X+8,Y+9,7.5,6.5,0,0,7);g.fill();g.fillStyle='#4a8a3a';g.beginPath();g.ellipse(X+8,Y+9,6.5,5.5,0,0,7);g.fill();
      g.fillStyle='#66a648';g.beginPath();g.ellipse(X+7,Y+7.5,4.5,3.5,0,0,7);g.fill();px(5,6,'#8cc460');px(6,6,'#8cc460');
      if(H(3)<.45){const cc=['#f0a0b8','#fbf6ec','#f6dc78'][Math.floor(H(4)*3)];px(4,9,cc);px(10,7,cc);px(9,11,cc);px(12,10,cc);}break;}
    case '=':{ground(A.floor?A.floor[y][x]:',');const hz=nb(-1,0)==='='||nb(1,0)==='=',vt=nb(0,-1)==='='||nb(0,1)==='=';
      if(hz){R(0,5,16,3,OL);R(0,6,16,1,'#a8784a');R(0,10,16,3,OL);R(0,11,16,1,'#a8784a');}
      if(vt&&!hz){R(5,0,6,16,OL);R(6,0,4,16,'#9a6c42');R(6,0,1,16,'#b88a5a');}
      R(5,2,6,13,OL);R(6,3,4,11,'#8a5e38');R(6,3,4,1,'#b88a5a');break;}
    case 'e':{ground(',');R(1,1,14,14,'#8a6448');for(let j=2;j<14;j+=4)R(1,j,14,2,'#6e4c34');for(let j=2;j<14;j+=4)for(let i=2;i<14;i+=3){R(i,j-1,2,2,H(j+i)<.5?'#6aa648':'#86ba52');if(H(j*3+i)<.3)px(i,j-1,'#e0884a');}break;}
    case 'l':{base();R(5,14,6,2,'rgba(0,0,0,.25)');R(7,4,2,11,OL);R(5,14,6,2,OL);R(4,0,8,6,OL);R(5,1,6,4,'#f6d68a');R(6,1,4,2,'#fff4c8');R(6,5,4,1,'#3a3640');break;}
    case 'Y':{base();R(2,13,2,3,OL);R(12,13,2,3,OL);box(0,2,16,4,'#9a6038','#b8784a');box(0,7,16,6,'#9a6038','#b8784a','#7a4a2a');break;}
    case 'T':{base();R(3,13,10,3,'rgba(0,0,0,.2)');R(7,8,2,7,OL);R(2,2,12,7,OL);R(3,3,10,5,'#fbf6ec');R(3,3,10,1,'#ffffff');R(6,4,3,2,'#e8a0b4');break;}
    case 'G':{ground(':');R(0,1,16,2,OL);R(0,1,16,1,'#5a5662');for(let i=1;i<16;i+=3){R(i,1,2,15,OL);R(i,2,1,14,'#5a5662');px(i,0,'#d9b766');}R(0,8,16,2,OL);R(0,8,16,1,'#5a5662');R(6,5,4,3,'#d9b766');break;}
    case 'K':{ground(':');const cols=[['#c8607a','#fbf6ec'],['#5878a8','#fbf6ec'],['#6f9a4f','#f6dc78']][(x+y)%3];
      R(1,7,14,9,OL);R(2,8,12,7,'#9a6038');R(2,8,12,1,'#b8784a');R(0,0,16,7,OL);for(let i=1;i<15;i+=4){R(i,1,2,5,cols[0]);R(i+2,1,2,5,cols[1]);}
      R(3,9,3,2,'#e8b860');R(7,9,3,2,'#f0a0b8');R(11,9,2,2,'#9ccc62');break;}
    case 'V':{base();R(3,13,10,3,'rgba(40,25,20,.3)');R(3,2,10,13,OL);R(4,3,8,11,'#a8743e');R(4,3,8,1,'#c8945a');R(4,5,8,1,'#5a5662');R(4,11,8,1,'#5a5662');R(6,3,1,11,'#bc8a50');R(4,2,8,2,'#7a5030');break;}
    case 'X':{base();R(2,14,12,2,'rgba(40,25,20,.3)');box(2,4,12,11,'#c89a5e','#e0b878','#9a7040');R(3,9,10,1,'#9a7040');R(7,5,2,9,'#a87c46');break;}
    case 'u':{ground(',');R(1,13,14,3,'rgba(30,40,20,.3)');R(1,6,14,9,OL);R(2,7,12,7,'#b8ae9c');for(let i=2;i<14;i+=4){R(i,7,3,3,'#cfc4b0');R(i+1,11,3,3,'#a89e8c');}R(4,7,8,3,'#3a5a78');
      R(1,0,2,8,OL);R(13,0,2,8,OL);R(1,0,14,2,OL);R(2,0,12,1,'#a8744a');R(7,1,2,4,'#5a5662');R(6,4,4,3,'#8a5a3a');break;}
    case 'g':{base();R(4,14,8,2,'rgba(30,30,20,.3)');R(7,8,2,8,OL);R(1,1,14,9,OL);R(2,2,12,7,'#b8844e');R(2,2,12,1,'#d0a068');R(3,3,4,3,'#f6efe0');R(8,3,5,2,'#f4e4c0');R(8,6,4,2,'#f0d0d8');break;}
    case 'j':{base();R(1,13,14,3,'rgba(40,25,20,.3)');R(0,4,16,8,OL);R(1,5,14,6,'#a8743e');R(2,2,4,3,'#e8b860');R(6,1,4,4,'#9ccc62');R(10,2,4,3,'#d86a5a');R(2,10,5,5,OL);R(3,11,3,3,'#6a4a30');R(10,10,5,5,OL);R(11,11,3,3,'#6a4a30');break;}
    case 'o':{base();g.fillStyle=OL;g.beginPath();g.ellipse(X+8,Y+9,7.5,6.5,0,0,7);g.fill();g.fillStyle='#e0c060';g.beginPath();g.ellipse(X+8,Y+9,6.5,5.5,0,0,7);g.fill();g.fillStyle='#f0d880';g.beginPath();g.ellipse(X+7,Y+7,4,2.5,0,0,7);g.fill();break;}
    case 'p':{base();R(2,13,12,3,'rgba(40,25,20,.3)');R(2,8,12,7,OL);R(3,9,10,5,'#b0603e');R(3,9,10,1,'#c87a52');g.fillStyle=OL;g.beginPath();g.ellipse(X+8,Y+6,6.5,5,0,0,7);g.fill();g.fillStyle='#5a9a3e';g.beginPath();g.ellipse(X+8,Y+6,5.5,4,0,0,7);g.fill();
      const cc=['#f0a0b8','#f6dc78','#b8a0e0'][(x+y)%3];px(5,4,cc);px(6,5,cc);px(10,4,cc);px(9,6,cc);break;}
    case 'r':{const b=bldAt(A,x,y),rc=b[6],top=y===b[3],l=x===b[2],rr=x===b[2]+b[4]-1,bot=y===b[3]+b[5]-b[10].wr-1,st=b[10].style;
      R(0,0,16,16,shade(rc,-.25));
      if(st==='glass'){R(0,0,16,16,'#bfe0dc');R(0,0,16,1,'#7a9a8a');R(0,0,1,16,'#7a9a8a');R(2,2,4,4,'#eaf8f6');if(H(1)<.4)R(9,6,4,6,'#8ac08a');}
      else for(let j=0;j<16;j+=4){const off=((y*4+j)/4)%2?0:4;for(let i=-4;i<16;i+=8){R(i+off,j,8,4,rc);R(i+off,j,8,1,shade(rc,.18));R(i+off,j+3,8,1,shade(rc,-.3));R(i+off+7,j,1,4,shade(rc,-.3));}}
      if(top){R(0,0,16,3,shade(rc,-.45));R(0,0,16,1,shade(rc,.1));if(st==='stone'){for(let i=0;i<16;i+=8)R(i,0,5,3,shade(rc,.15));}}
      if(l)R(0,0,2,16,shade(rc,-.45));if(rr)R(14,0,2,16,shade(rc,-.45));
      if(bot){R(0,13,16,3,shade(rc,-.5));R(0,13,16,1,shade(rc,-.2));}
      if(top&&x===b[2]+b[4]-2&&st!=='glass'&&st!=='stone'){R(3,0,7,5,OL);R(4,0,5,4,'#8a6a5e');}
      if(st==='stone'&&top&&(x-b[2])%6===2){R(4,0,8,6,OL);R(5,1,6,4,shade(rc,.1));}
      break;}
    case 'W':case 'O':{const b=bldAt(A,x,y),wc=b[7],st=b[10].style,l=x===b[2],rr=x===b[2]+b[4]-1,bottom=y===b[3]+b[5]-1;
      R(0,0,16,16,wc);
      if(st==='stone'){for(let j=0;j<16;j+=5){const o=((y*3+j/5)%2)?0:7;R(0,j,16,1,shade(wc,-.2));for(let i=o;i<16;i+=14)R(i,j,1,5,shade(wc,-.2));}}
      else if(st==='timber'){R(0,0,2,16,'#5a3a24');R(14,0,2,16,'#5a3a24');R(0,7,16,2,'#5a3a24');}
      else if(st==='glass'){R(0,0,16,16,'#d6eeea');R(0,0,16,1,'#7a9a8a');R(7,0,2,16,'#7a9a8a');R(2,2,4,5,'#f4fbfa');}
      else {R(0,0,16,2,shade(wc,-.35));}
      if(bottom){R(0,13,16,3,'#8a7a6a');R(0,13,16,1,'#a8988a');}
      if(l)R(0,0,2,16,'#7a5440');if(rr)R(14,0,2,16,'#7a5440');
      if(c==='O'){R(2,1,12,15,OL);R(3,2,10,14,'#8a5a3a');R(3,2,10,1,'#a8744a');R(7,2,2,14,'#6a4228');R(4,4,2,4,'#6a4228');R(10,4,2,4,'#6a4228');px(10,10,'#e8c870');px(5,10,'#e8c870');R(2,0,12,2,shade(wc,-.4));}
      else if(b[9]&&(x===b[8]-1||x===b[8]+1)&&bottom){R(2,2,12,9,OL);R(3,3,10,7,b[9]);R(3,3,10,1,shade(b[9],.35));R(5,5,6,3,shade(b[9],-.25));}
      else if((x-b[2])%2===1&&!l&&!rr&&st!=='glass'){const wy=bottom?2:3;R(3,wy,10,10,OL);R(4,wy+1,8,8,'#c8e8f0');R(4,wy+1,8,2,'#eef8fb');R(7,wy+1,2,8,OL);R(4,wy+4,8,1,OL);
        if(bottom){R(2,wy+9,12,2,'#7a5440');R(3,wy+9,10,1,'#e890a8');px(5,wy+8,'#f6dc78');px(10,wy+8,'#f0a0b8');}}
      break;}
    default:ground(c);
  }
}
