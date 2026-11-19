/* ── 도구 동작 도트(41프레임): 팔과 도구를 함께 그린 그림으로 바꿔 그린다 ──
   그림은 니나·에드먼드·로웬·팀(정면)·마르타(뒷모습) 기준. 같은 체형의 다른 인물은 팔 색만 그 사람 옷 색으로 바꿔 쓴다.
   체형이 다르면 예전 방식(도구만)으로 둔다. 말을 걸어 고개를 돌리면 평소 모습으로 돌아온다. */
const ACTA={ready:false,px:null,memo:new WeakMap()};
(function(){const im=new Image();im.onload=()=>{const c=document.createElement('canvas');c.width=im.width;c.height=im.height;const g=c.getContext('2d');g.drawImage(im,0,0);ACTA.px=g.getImageData(0,0,c.width,c.height);ACTA.ready=true;};im.src=ACTIMG;})();
function actFrames(id,ps){const def=ACTDEF[ps];let tsp;try{tsp=spr(sprOf(id),def.dir,'s');}catch(_){return null;}if(!tsp||!tsp.getContext)return null;
  let m=ACTA.memo.get(tsp);if(!m){m={};ACTA.memo.set(tsp,m);}if(ps in m)return m[ps];m[ps]=null;
  const bi=ACTBASE[def.src+'_'+def.dir];if(!bi||tsp.height!==bi[1]||tsp.width!==16)return null;const h=bi[1],S_=ACTA.px,W=S_.width;
  const tc=document.createElement('canvas');tc.width=32;tc.height=48;const tg=tc.getContext('2d');tg.drawImage(tsp,8,8);const T_=tg.getImageData(0,0,32,48);
  const bo=(x,y)=>((48+y)*W+bi[0]*32+x)*4,key=(d,o)=>d[o]<<16|d[o+1]<<8|d[o+2];
  /* 체형 확인 + 팔 색 대응표 (팔 자리: 양옆 4칸) */
  let tot=0,bad=0;const cm={};
  const tcnt={};for(let y=8+15;y<8+26&&y<8+h;y++)for(let x=8;x<24;x++){if(x>=12&&x<20)continue;const o=bo(x,y),p=(y*32+x)*4,ba=S_.data[o+3]>127,ta=T_.data[p+3]>127;if(ba||ta)tot++;if(ba!==ta){bad++;continue;}if(!ba)continue;
    const k=key(S_.data,o),v=key(T_.data,p);(cm[k]=cm[k]||{})[v]=(cm[k][v]||0)+1;tcnt[v]=(tcnt[v]||0)+1;}
  /* 팔을 몸통 색으로 칠한 그림도 있으므로 몸통 색도 대응표에 넣는다 */
  for(let y=8+15;y<8+26&&y<8+h;y++)for(let x=12;x<20;x++){const o=bo(x,y),p=(y*32+x)*4;if(S_.data[o+3]<128||T_.data[p+3]<128)continue;const k=key(S_.data,o),v=key(T_.data,p);if((k>>16)+(k>>8&255)+(k&255)>200||cm[k])continue;(cm[k]=cm[k]||{})[v]=(cm[k][v]||0)+1;}
  const lumk=v=>(v>>16)+(v>>8&255)+(v&255);let to=null,tf=null;for(const v in tcnt)if(tcnt[v]>=3&&(to==null||lumk(+v)<lumk(to)))to=+v;{let bn=0;for(const v in tcnt)if(+v!==to&&tcnt[v]>bn){bn=tcnt[v];tf=+v;}}if(tf==null)tf=to;
  if(tot&&bad/tot>.3)return null;
  const map={};for(const k in cm){let b=null,bn=0;for(const v in cm[k])if(cm[k][v]>bn){bn=cm[k][v];b=+v;}map[k]=b;}
  let same=true;for(const k in map)if(map[k]!==+k)same=false;   /* 같은 옷이면 색을 건드리지 않는다 */
  const out=[];
  for(let i=0;i<def.n;i++){const c=document.createElement('canvas');c.width=32;c.height=48;const g=c.getContext('2d'),O=new ImageData(new Uint8ClampedArray(T_.data),32,48);
    for(let y=0;y<48;y++)for(let x=0;x<32;x++){const f=(y*W+(def.off+i)*32+x)*4,b=bo(x,y),p=(y*32+x)*4,d=S_.data;
      if(d[f]===d[b]&&d[f+1]===d[b+1]&&d[f+2]===d[b+2]&&d[f+3]===d[b+3])continue;
      if(d[f+3]<128){O.data[p+3]=0;continue;}
      const k=key(d,f);let v=map[k];if(v==null&&!same&&to!=null&&d[f]+d[f+1]+d[f+2]<200){let bd=46;for(const q in map){if(lumk(+q)>200)continue;const dd=Math.abs((q>>16)-d[f])+Math.abs((q>>8&255)-d[f+1])+Math.abs((q&255)-d[f+2]);if(dd<bd)bd=dd;}if(bd<46){let edge=false;for(const [ax,ay] of [[1,0],[-1,0],[0,1],[0,-1]]){const xx=x+ax,yy=y+ay;if(xx<0||yy<0||xx>31||yy>47||d[(yy*W+(def.off+i)*32+xx)*4+3]<128)edge=true;}v=edge?to:tf;}}if(v!=null){O.data[p]=v>>16;O.data[p+1]=v>>8&255;O.data[p+2]=v&255;}else{O.data[p]=d[f];O.data[p+1]=d[f+1];O.data[p+2]=d[f+2];}O.data[p+3]=255;}
    g.putImageData(O,0,0);out.push(c);}
  out.h=h;m[ps]=out;return out;}
function actDraw(g,e,sx,sy,t){e.actArt=0;const n=e.n;if(!n||!ACTA.ready||SCENE)return false;const ps=n.pose,def=ACTDEF[ps];if(!def)return false;
  if((n.path&&n.path.length)||n.cueMv)return false;
  const sd=n.act&&n.act[n.spot]&&n.pose===n.act[n.spot][3]?n.act[n.spot][2]:null;if((n.wdir!=null&&n.dir!==n.wdir)||(sd!=null&&n.dir!==sd))return false;
  const fr=actFrames(n.id,ps);if(!fr)return false;const c=fr[Math.floor(t/def.dur+(ALL_IDS.indexOf(n.id)+1)*1.7)%def.n],y=sy-fr.h+1-8;
  if(n.dir===2){g.save();g.translate(sx,0);g.scale(-1,1);g.drawImage(c,-16,y);g.restore();}else g.drawImage(c,sx-16,y);
  e.actArt=1;return true;}
