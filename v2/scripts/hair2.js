/* ═════════ 새 헤어 시트 (보낸 이미지, 128×672 · 같은 규격 16×96): 번호 80~ 로 이어 붙임. 색이 있는 시트라 스타일마다 밝기 순위로 명암 7단계 ═════════ */
{const im=new Image();im.onload=()=>{const go=()=>{if(!HAIRPX){setTimeout(go,150);return;}const W=128,H=im.height,c=mk(W,H),g=c.getContext('2d');g.drawImage(im,0,0);const d=g.getImageData(0,0,W,H).data;
  const A=new Uint8Array(W*(960+H)).fill(255);A.set(HAIRPX.subarray(0,128*960));
  for(let sy=0;sy<H;sy+=96)for(let sx=0;sx<W;sx+=16){const L=[];for(let y=sy;y<Math.min(H,sy+96);y++)for(let x=sx;x<sx+16;x++){const i=(y*W+x)*4;if(d[i+3]>=128)L.push(d[i]*.3+d[i+1]*.59+d[i+2]*.11);}
    if(!L.length)continue;const so=L.slice().sort((p,q)=>p-q),q=k=>so[Math.min(so.length-1,Math.floor(so.length*k))],cut=[q(.08),q(.2),q(.38),q(.58),q(.78),q(.93)];
    for(let y=sy;y<Math.min(H,sy+96);y++)for(let x=sx;x<sx+16;x++){const i=(y*W+x)*4;if(d[i+3]<128)continue;const l=d[i]*.3+d[i+1]*.59+d[i+2]*.11;let v=0;while(v<6&&l>cut[v])v++;A[(960+y)*W+x]=v;}}
  HAIRPX=A;for(const k in SP2C)delete SP2C[k];if(typeof miniC!=='undefined')for(const k in miniC)delete miniC[k];if(typeof bustCache!=='undefined')for(const k in bustCache)delete bustCache[k];};go();};im.src=HAIR2SRC;}
