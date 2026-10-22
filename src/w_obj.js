
/* ── 가구 그리기 (발판 기준 좌상단 X,Y · 키 큰 가구는 위로 솟음) ── */
function drawObj(g,o){
  const X=o.x*T,Y=o.y*T,W=o.w*T,Hh=o.h*T,H=k=>hash(o.x,o.y,k);
  const R=(a,b,w,h,c)=>{g.fillStyle=c;g.fillRect(X+a,Y+b,w,h);};
  const px=(a,b,c)=>R(a,b,1,1,c);
  const box=(a,b,w,h,f,hi,lo)=>{R(a,b,w,h,OL);R(a+1,b+1,w-2,h-2,f);if(hi)R(a+1,b+1,w-2,1,hi);if(lo)R(a+1,b+h-2,w-2,1,lo);};
  const sh=(a,b,w,h)=>R(a,b,w,h,'rgba(40,20,20,.22)');
  const wood=(a,b,w,h,c)=>{c=c||WOOD;box(a,b,w,h,c.b,c.l,c.d);};
  const ell=(cx,cy,rx,ry,c)=>{g.fillStyle=c;g.beginPath();g.ellipse(X+cx,Y+cy,rx,ry,0,0,7);g.fill();};
  const books=(a,b,w,h)=>{const pal=['#b04a52','#4f6e96','#6e8a4a','#c08a4e','#7a5a8a','#d9b766','#3e7a7a','#e0d6c0'];let i=a;while(i<a+w-1){const bw=1+(H(i)<.5?1:0),bh=h-(H(i*3+b)<.4?1:0),col=pal[Math.floor(H(i*7+b)*pal.length)];R(i,b+h-bh,bw,bh,col);R(i,b+h-bh,bw,1,shade(col,.3));i+=bw;}};
  switch(o.k){
    case 'rug':{const c=o.c||'#a8505e';R(0,0,W,Hh,shade(c,-.35));R(2,2,W-4,Hh-4,c);R(4,4,W-8,Hh-8,shade(c,.12));
      for(let i=6;i<W-6;i+=6)px(i,Hh/2,shade(c,.4));R(0,0,W,1,shade(c,-.5));for(let i=1;i<W;i+=3){px(i,-1,'#e8dcc0');px(i,Hh,'#e8dcc0');}break;}
    case 'bed':{const c=o.c||'#5878a8',dbl=o.w>1;sh(0,Hh-3,W,3);box(0,-6,W,Hh+4,'#7a4a2c','#9a6a44');R(1,-5,W-2,5,'#6a3e24');
      for(let i=0;i<o.w;i++){R(3+i*16,0,10,6,OL);R(4+i*16,1,8,4,'#fbf6ec');R(4+i*16,1,8,1,'#ffffff');}
      R(1,8,W-2,Hh-10,OL);R(2,8,W-4,Hh-11,c);R(2,8,W-4,2,shade(c,.3));for(let i=4;i<W-4;i+=6)R(i,12,2,Hh-16,shade(c,.12));R(2,Hh-4,W-4,1,shade(c,-.3));break;}
    case 'bunk':{sh(0,Hh-3,W,3);R(0,-14,2,Hh+12,OL);R(W-2,-14,2,Hh+12,OL);R(1,-13,1,Hh+10,'#9a6a44');R(W-1,-13,1,Hh+10,'#9a6a44');
      R(2,-12,W-4,10,OL);R(3,-11,W-6,8,'#8a7a5a');R(3,-11,4,3,'#fbf6ec');R(2,6,W-4,Hh-8,OL);R(3,7,W-6,Hh-10,'#7a8a5a');R(3,7,W-6,1,'#9aaa7a');R(4,8,8,3,'#fbf6ec');break;}
    case 'wardrobe':{sh(0,Hh-2,W,2);box(0,-18,W,Hh+17,'#8a5632','#a8704a','#6a3e22');R(W/2-1,-16,2,Hh+13,'#5a3420');px(W/2-3,-6,'#e8c870');px(W/2+2,-6,'#e8c870');R(2,-18,W-4,3,'#6a3e22');break;}
    case 'dresser':{sh(0,Hh-2,W,2);box(0,-4,W,Hh+3,'#8a5632','#a8704a','#6a3e22');for(let j=0;j<3;j++){R(2,-1+j*5,W-4,1,'#6a3e22');px(W/2,1+j*5,'#e8c870');}if(o.mirror){R(W/2-5,-18,10,14,OL);R(W/2-4,-17,8,12,'#cfe6ee');R(W/2-3,-16,2,6,'#ffffff');}
      R(3,-7,4,3,'#f0a0b8');break;}
    case 'shelf':{sh(0,Hh-2,W,2);R(0,-18,W,Hh+18,OL);R(1,-17,W-2,Hh+16,'#6e4630');R(2,-16,W-4,Hh+14,'#3e2618');
      for(const y0 of [-16,-9,-2,5]){if(y0+6>Hh)break;books(2,y0,W-4,6);R(1,y0+6,W-2,1,'#8a5a3a');}break;}
    case 'cabinet':{sh(0,Hh-2,W,2);box(0,-16,W,Hh+15,'#7a4a2c','#9a6a44','#5a3420');R(2,-14,W-4,12,'#cfe6ee');R(2,-14,W-4,1,'#ffffff');for(let i=3;i<W-3;i+=4){R(i,-11,3,3,'#f4f0e8');R(i,-6,3,2,'#e8d8b0');}R(W/2,-14,1,12,'#5a3420');R(2,0,W-4,1,'#5a3420');break;}
    case 'desk':{sh(0,Hh-3,W,3);R(1,Hh-4,2,4,'#4a2c1a');R(W-3,Hh-4,2,4,'#4a2c1a');box(0,-2,W,Hh-1,'#8a5632','#a8704a','#6a3e22');R(1,6,W-2,1,'#6a3e22');
      R(3,0,7,5,'#f6f0e0');R(4,1,5,1,'#a89e8a');R(4,3,4,1,'#a89e8a');R(W-6,0,2,3,'#22223a');R(W-4,-4,1,5,'#f0eadc');px(W-4,-4,'#c9a35e');if(o.w>2){R(14,0,8,4,'#efe4cc');R(15,1,6,1,'#b04a52');}break;}
    case 'table':{const cl=o.c;sh(0,Hh-2,W,3);R(1,Hh-5,2,5,'#4a2c1a');R(W-3,Hh-5,2,5,'#4a2c1a');
      if(cl){R(0,-1,W,Hh-2,OL);R(1,0,W-2,Hh-4,cl);R(1,0,W-2,1,shade(cl,.3));R(1,Hh-5,W-2,2,shade(cl,-.15));for(let i=2;i<W-2;i+=4)px(i,Hh-3,shade(cl,-.3));}
      else{box(0,-1,W,Hh-2,'#9a6438','#b8804e','#6e4428');for(let i=4;i<W-2;i+=8)R(i,1,1,Hh-7,'#8a5630');}
      if(o.set){for(let i=4;i<W-4;i+=14){R(i,2,6,4,'#f4f0e8');R(i+1,3,4,2,'#d8d0c0');}}
      if(o.vase){R(W/2-2,-3,4,5,'#6a8ac0');px(W/2-1,-5,'#f0a0b8');px(W/2+1,-6,'#f6dc78');px(W/2,-6,'#5a9a3e');}
      if(o.cups){R(3,2,4,3,'#fbf6ec');R(W-7,2,4,3,'#fbf6ec');R(W/2-3,0,6,5,'#e8e0d0');R(W/2-2,1,4,1,'#c8a878');}
      if(o.chess){R(3,1,W-6,Hh-8,OL);for(let j=0;j<4;j++)for(let i=0;i<6;i++)R(4+i*((W-8)/6),2+j*2,(W-8)/6,2,(i+j)%2?'#f4ead6':'#5a4030');}
      if(o.mugs){R(3,1,3,4,'#d8b070');R(W-6,2,3,4,'#d8b070');R(3,1,3,1,'#fbf6ec');}
      break;}
    case 'chair':{const d=o.d||0;sh(2,12,12,3);
      if(d===1){R(3,4,10,8,OL);R(4,5,8,6,'#9a6438');R(4,5,8,1,'#b8804e');R(4,11,2,4,OL);R(10,11,2,4,OL);}
      else if(d===0){R(3,6,10,7,OL);R(4,7,8,5,'#9a6438');R(4,7,8,1,'#b8804e');R(3,-2,10,9,OL);R(4,-1,8,7,'#8a5632');R(4,-1,8,1,'#b8804e');R(4,12,2,3,OL);R(10,12,2,3,OL);}
      else{const l=d===2;R(3,6,10,7,OL);R(4,7,8,5,'#9a6438');R(l?10:3,-1,3,13,OL);R(l?11:4,0,1,11,'#8a5632');R(4,12,2,3,OL);R(10,12,2,3,OL);}
      if(o.c){R(4,7,8,3,o.c);}break;}
    case 'stool':{sh(3,12,10,3);ell(8,8,5,3,OL);ell(8,7.5,4,2.2,'#b8804e');R(5,9,1,5,OL);R(10,9,1,5,OL);break;}
    case 'bench':{sh(0,12,W,3);R(1,10,2,5,OL);R(W-3,10,2,5,OL);box(0,3,W,8,'#9a6438','#b8804e','#6e4428');break;}
    case 'sofa':{const c=o.c||'#8e3848',d=o.d||0;sh(0,Hh-2,W,3);
      if(d===1){box(0,2,W,Hh-2,shade(c,-.1),shade(c,.2));R(2,Hh-7,W-4,4,shade(c,-.25));R(0,2,3,Hh-4,OL);R(W-3,2,3,Hh-4,OL);R(1,3,1,Hh-6,c);R(W-2,3,1,Hh-6,c);}
      else{box(0,-6,W,10,shade(c,-.15),shade(c,.2));box(0,3,W,Hh-4,c,shade(c,.25),shade(c,-.25));for(let i=16;i<W;i+=16)R(i,4,1,Hh-7,shade(c,-.3));R(0,-4,3,Hh+2,OL);R(W-3,-4,3,Hh+2,OL);R(1,-3,1,Hh,c);R(W-2,-3,1,Hh,c);}
      break;}
    case 'armchair':{const c=o.c||'#5a6e9a',d=o.d||0;sh(1,12,14,3);
      if(d===0){box(1,-6,14,10,shade(c,-.15),shade(c,.2));box(1,3,14,10,c,shade(c,.25));R(0,-2,3,14,OL);R(13,-2,3,14,OL);R(1,-1,1,12,c);R(14,-1,1,12,c);}
      else if(d===1){box(1,2,14,11,c,shade(c,.25));R(2,8,12,3,shade(c,-.25));R(0,2,3,11,OL);R(13,2,3,11,OL);}
      else{const l=d===2;box(1,2,14,11,c,shade(c,.25));R(l?11:1,-4,4,16,OL);R(l?12:2,-3,2,14,shade(c,-.15));}
      break;}
    case 'fireplace':{sh(0,Hh-1,W,2);R(0,-16,W,Hh+16,OL);R(1,-15,W-2,Hh+14,'#a8a196');for(let j=-15;j<Hh;j+=4)for(let i=1+((j/4)%2?0:4);i<W-1;i+=8)R(i,j,1,4,'#8a857c');
      R(0,-17,W,3,'#6e4428');R(0,-17,W,1,'#a8744a');R(4,-6,W-8,Hh+4,OL);R(5,-5,W-10,Hh+2,'#2a1a18');
      ell(W/2,Hh-3,W/2-8,4,'#e8783a');ell(W/2,Hh-4,W/2-11,3,'#f6c84a');ell(W/2,Hh-5,2,2,'#fff4c8');R(6,Hh-3,W-12,2,'#5a3420');
      if(o.deco){R(4,-22,4,5,'#e8e0d0');R(W-8,-22,4,5,'#e8e0d0');px(5,-23,'#f6d68a');px(W-7,-23,'#f6d68a');}break;}
    case 'plant':{sh(3,12,10,3);R(4,8,8,7,OL);R(5,9,6,5,o.pot||'#b0603e');R(5,9,6,1,shade(o.pot||'#b0603e',.25));
      ell(8,4,7,6,OL);ell(8,4,6,5,'#4a8a3a');ell(7,2,4,3,'#66a648');px(5,1,'#8cc460');if(o.flower){px(4,4,o.flower);px(11,2,o.flower);px(9,6,o.flower);}if(o.tall){R(7,-8,2,9,'#6a4a2a');ell(8,-9,7,6,OL);ell(8,-9,6,5,'#3e7a34');ell(7,-11,3,2,'#78b454');}break;}
    case 'stove':{sh(0,Hh-2,W,2);box(0,-6,W,Hh+5,'#3e3a40','#5a5660','#2a262c');R(3,-3,W-6,3,'#2a262c');R(4,3,W/2-6,8,OL);R(5,4,W/2-8,6,'#e8783a');R(6,5,W/2-10,3,'#f6c84a');
      R(W/2+2,-10,10,7,OL);R(W/2+3,-9,8,5,'#7a7a82');R(W/2+3,-9,8,1,'#a0a0a8');R(6,-24,4,18,'#3e3a40');R(5,-24,6,2,'#5a5660');
      if(Math.floor(H(1)*2))px(W/2+6,-12,'#ffffff');break;}
    case 'counter':{sh(0,Hh-2,W,2);box(0,-4,W,Hh+3,'#9a6438','#b8804e','#6e4428');R(1,-4,W-2,4,'#d8ccb4');R(1,-4,W-2,1,'#efe6d4');for(let i=0;i<W;i+=16){R(i+3,2,10,8,'#7a4a2c');px(i+8,6,'#e8c870');}
      if(o.items){for(let i=2;i<W-4;i+=7){const c=['#e8b860','#f0a0b8','#9ccc62','#c8a878','#f4f0e8'][Math.floor(H(i)*5)];R(i,-8,5,4,OL);R(i+1,-7,3,3,c);}}break;}
    case 'sink':{sh(0,Hh-2,W,2);box(0,-4,W,Hh+3,'#9a6438','#b8804e','#6e4428');R(2,-4,W-4,6,'#a8b0b8');R(3,-3,W-6,4,'#6a8aa0');R(W/2-1,-9,2,6,'#8a8a92');R(W/2-3,-9,6,2,'#8a8a92');break;}
    case 'barrel':{sh(2,12,12,3);R(2,0,12,15,OL);R(3,1,10,13,'#a8743e');R(3,1,10,1,'#c8945a');R(3,3,10,1,'#5a5662');R(3,11,10,1,'#5a5662');R(5,1,1,13,'#bc8a50');ell(8,1,5,2,'#7a5030');break;}
    case 'keg':{sh(0,12,W,3);R(1,2,W-2,12,OL);R(2,3,W-4,10,'#9a6438');R(2,3,W-4,1,'#b8804e');R(5,2,1,12,'#5a5662');R(W-6,2,1,12,'#5a5662');ell(W-3,8,3,5,'#7a4a2c');R(W-3,7,3,2,'#c8a050');break;}
    case 'crate':{sh(1,13,14,3);box(1,2,14,13,'#c89a5e','#e0b878','#9a7040');R(2,8,12,1,'#9a7040');R(7,3,2,11,'#a87c46');if(o.fill)R(3,0,10,4,o.fill);break;}
    case 'sack':{sh(2,12,12,3);ell(8,9,6,6,OL);ell(8,9,5,5,'#d8c49a');ell(7,7,3,2,'#ecdcb8');R(6,2,4,3,OL);R(7,2,2,2,'#c8b48a');break;}
    case 'stairs':{const n=o.h+2;R(0,-32,W,Hh+32,OL);for(let i=0;i<n;i++){const yy=-32+i*Math.floor((Hh+32)/n),c=i%2?'#d8cfc0':'#ebe4d8';R(1,yy,W-2,Math.floor((Hh+32)/n),c);R(1,yy,W-2,1,'#ffffff');}
      R(4,-30,W-8,Hh+28,'rgba(142,56,72,.85)');for(let i=0;i<n;i++)R(4,-32+i*Math.floor((Hh+32)/n),W-8,1,'#c9a35e');R(0,-32,3,Hh+32,'#8a5632');R(W-3,-32,3,Hh+32,'#8a5632');R(0,-34,3,3,'#c9a35e');R(W-3,-34,3,3,'#c9a35e');break;}
    case 'pillar':{sh(1,13,14,3);R(2,-20,12,35,OL);R(3,-19,10,33,'#ebe4d8');R(3,-19,2,33,'#ffffff');R(10,-19,3,33,'#cfc4b2');R(1,-22,14,4,OL);R(2,-21,12,2,'#f4efe6');R(1,12,14,3,OL);R(2,12,12,2,'#ddd4c4');
      if(o.deco){R(1,-14,14,4,'#6a9a4a');px(4,-13,'#f0a0b8');px(9,-12,'#f6dc78');px(12,-13,'#fbf6ec');}break;}
    case 'armor':{sh(2,13,12,3);R(4,13,8,3,OL);R(5,13,6,2,'#6a6a72');R(5,-16,6,7,OL);R(6,-15,4,5,'#b8bcc8');R(6,-13,4,1,'#3a3a42');R(3,-9,10,12,OL);R(4,-8,8,10,'#a8acb8');R(4,-8,8,2,'#d0d4dc');R(6,2,4,11,OL);R(7,3,1,9,'#a8acb8');R(13,-14,1,26,'#7a7a82');R(12,-16,3,3,'#c8ccd4');break;}
    case 'painting':{const c=o.c||'#6a8ac0';R(1,2,W-2,Hh-4,'#b08a3a');R(2,3,W-4,Hh-6,'#d9b766');R(3,4,W-6,Hh-8,c);R(3,Hh-8,W-6,3,shade(c,-.3));ell(W/2,Hh/2-1,3,2,shade(c,.4));if(o.portrait){R(W/2-3,5,6,6,'#2a2c44');R(W/2-2,7,4,4,'#f3dccd');}break;}
    case 'clock':{sh(2,13,12,3);box(2,-18,12,33,'#7a4a2c','#9a6a44','#5a3420');ell(8,-12,5,5,OL);ell(8,-12,4,4,'#f4ecd8');R(8,-15,1,3,OL);R(8,-12,3,1,OL);R(5,-4,6,14,'#4a2c1a');R(7,-2+Math.floor(H(1)*4),2,6,'#d9b766');break;}
    case 'piano':{sh(0,Hh-2,W,3);R(0,-12,W,Hh+10,OL);R(1,-11,W-2,Hh+8,'#2a2228');R(1,-11,W-2,2,'#4a4248');R(2,4,W-4,6,'#f6f2ea');for(let i=3;i<W-3;i+=3)R(i,4,1,6,OL);for(let i=4;i<W-3;i+=6)R(i,4,2,3,OL);R(2,Hh-4,2,4,OL);R(W-4,Hh-4,2,4,OL);R(W/2-3,-8,6,4,'#e8e0d0');break;}
    case 'tub':{sh(0,Hh-2,W,3);ell(W/2,Hh/2+2,W/2-1,Hh/2-2,OL);ell(W/2,Hh/2+2,W/2-2,Hh/2-3,'#9a6438');ell(W/2,Hh/2,W/2-4,Hh/2-5,'#8ab8d0');ell(W/2-2,Hh/2-1,3,1,'#e8f6fa');if(o.board){R(W-7,-4,5,12,OL);R(W-6,-3,3,10,'#c8a070');for(let j=-2;j<6;j+=2)R(W-6,j,3,1,'#9a7448');}break;}
    case 'rack':{R(0,-14,2,Hh+14,OL);R(W-2,-14,2,Hh+14,OL);R(0,-14,W,2,OL);R(0,-6,W,1,OL);for(let i=3;i<W-3;i+=6){R(i,-12,5,10,['#fbf6ec','#e8d8c0','#d8e4ee'][Math.floor(H(i)*3)]);R(i,-12,5,1,'#ffffff');}break;}
    case 'line':{R(0,-14,2,Hh+14,'#6a4a2c');R(W-2,-14,2,Hh+14,'#6a4a2c');R(0,-13,W,1,'#d8d0c0');for(let i=6;i<W-6;i+=10){const c=['#fbf6ec','#e8a0b4','#a8c0e0','#f6e0a8'][Math.floor(H(i)*4)];R(i,-12,7,9,c);R(i,-12,7,1,shade(c,-.2));}break;}
    case 'basket':{sh(1,12,14,3);R(2,4,12,10,OL);R(3,5,10,8,'#c8a070');for(let i=4;i<13;i+=2)R(i,5,1,8,'#a8844e');R(3,2,10,4,'#fbf6ec');R(4,1,4,2,'#e8e0f0');break;}
    case 'winerack':{sh(0,Hh-2,W,2);R(0,-16,W,Hh+16,OL);R(1,-15,W-2,Hh+14,'#5a3a24');for(let j=-14;j<Hh-2;j+=5)for(let i=2;i<W-3;i+=5){ell(i+2,j+2,2,2,'#2a1a1e');ell(i+2,j+2,1,1,['#7a2a3a','#3a5a2a','#2a2a3a'][Math.floor(H(i+j)*3)]);}break;}
    case 'weaponrack':{sh(0,Hh-2,W,2);R(0,-14,W,3,OL);R(1,-13,W-2,1,'#9a6438');R(0,6,W,3,OL);R(1,7,W-2,1,'#9a6438');for(let i=3;i<W-2;i+=5){R(i,-18,2,24,'#c8ccd4');R(i,-18,2,2,'#ffffff');R(i-1,0,4,2,'#6a4a2c');}break;}
    case 'armorstand':{sh(2,13,12,3);R(7,-4,2,18,'#6a4a2c');R(3,13,10,2,'#6a4a2c');R(4,-14,8,6,OL);R(5,-13,6,4,'#8a8a92');R(3,-8,10,10,OL);R(4,-7,8,8,'#9a9ea8');R(4,-7,8,2,'#c8ccd4');break;}
    case 'dummy':{sh(3,13,10,3);R(7,0,2,15,'#6a4a2c');R(3,-2,10,10,OL);R(4,-1,8,8,'#d8b878');R(4,2,8,1,'#a88448');ell(8,-6,4,4,OL);ell(8,-6,3,3,'#e0c488');R(2,1,12,2,'#a88448');break;}
    case 'target':{sh(3,13,10,3);R(7,6,2,9,'#6a4a2c');ell(8,4,6,6,OL);ell(8,4,5,5,'#f4ecd8');ell(8,4,3.5,3.5,'#c84a4a');ell(8,4,2,2,'#f4ecd8');ell(8,4,1,1,'#c84a4a');break;}
    case 'horse':{const c=o.c||'#6a4430';sh(0,Hh-2,W,3);R(4,4,W-10,8,OL);R(5,5,W-12,6,c);R(5,5,W-12,1,shade(c,.25));R(W-9,-6,6,12,OL);R(W-8,-5,4,10,c);R(W-10,-9,8,6,OL);R(W-9,-8,6,4,c);px(W-5,-7,OL);
      R(W-8,-6,2,8,shade(c,-.4));R(5,11,2,5,OL);R(W-10,11,2,5,OL);R(9,11,2,5,OL);R(1,5,4,6,shade(c,-.4));break;}
    case 'stall':{R(0,-10,2,Hh+10,'#6a4a2c');R(0,-10,W,2,'#8a6a44');R(W-2,-10,2,Hh+10,'#6a4a2c');R(0,2,W,2,'#8a6a44');R(2,-6,W-4,1,'#6a4a2c');break;}
    case 'hay':{sh(0,12,W,3);box(0,1,W,13,'#dcb460','#f0d080','#b08a40');for(let i=3;i<W-1;i+=3)R(i,3,1,9,'#c09a48');R(0,7,W,1,'#a07a38');break;}
    case 'oven':{sh(0,Hh-2,W,2);R(0,-20,W,Hh+20,OL);R(1,-19,W-2,Hh+18,'#b86a52');for(let j=-19;j<Hh;j+=4)for(let i=1+((j/4)%2?0:4);i<W-1;i+=8)R(i,j,1,4,'#9a5240');ell(W/2,2,W/2-4,8,OL);ell(W/2,3,W/2-5,6,'#2a1a18');ell(W/2,6,W/2-7,3,'#e8783a');R(4,-22,W-8,3,'#8a5240');break;}
    case 'breadshelf':{sh(0,Hh-2,W,2);R(0,-16,W,Hh+16,OL);R(1,-15,W-2,Hh+14,'#8a5a32');for(const y0 of [-13,-6,1]){R(1,y0+5,W-2,1,'#5a3a22');for(let i=2;i<W-5;i+=6){ell(i+3,y0+3,3,2,'#c8843a');ell(i+3,y0+2,2,1,'#e8b060');}}break;}
    case 'display':{sh(0,Hh-2,W,2);box(0,-6,W,Hh+5,'#8a5632','#a8704a','#6a3e22');R(2,-6,W-4,7,'#d8eef2');R(2,-6,W-4,1,'#ffffff');for(let i=4;i<W-4;i+=7){ell(i+2,-1,3,2,['#f0a0b8','#e8b860','#f4f0e8','#c88a5a'][Math.floor(H(i)*4)]);}break;}
    case 'mannequin':{sh(3,13,10,3);R(7,6,2,9,'#6a4a2c');R(4,13,8,2,'#6a4a2c');R(4,-12,8,4,OL);R(5,-11,6,2,'#e8d8c0');const c=o.c||'#c87a92';R(2,-8,12,16,OL);R(3,-7,10,14,c);R(3,-7,10,2,shade(c,.3));R(6,-7,4,3,'#fbf6ec');R(1,4,14,5,OL);R(2,4,12,4,shade(c,-.1));break;}
    case 'fabric':{sh(0,Hh-2,W,2);R(0,-16,W,Hh+16,OL);R(1,-15,W-2,Hh+14,'#7a4a2c');for(const y0 of [-14,-6]){for(let i=2;i<W-4;i+=4){const c=['#e8a0b4','#8ab0d8','#f6e0a8','#a8c88a','#c87a92','#fbf6ec'][Math.floor(H(i+y0)*6)];R(i,y0,4,7,c);R(i,y0,4,1,shade(c,.3));R(i+3,y0,1,7,shade(c,-.25));}}R(2,3,W-4,6,'#5a3420');break;}
    case 'mirror':{sh(2,13,12,3);R(3,-16,10,30,OL);R(4,-15,8,28,'#d9b766');R(5,-14,6,26,'#cfe6ee');R(6,-13,2,10,'#ffffff');break;}
    case 'bar':{sh(0,Hh-2,W,3);box(0,-4,W,Hh+3,'#6e4428','#8a5a32','#4a2c1a');R(1,-4,W-2,3,'#9a6438');R(1,-4,W-2,1,'#c8945a');for(let i=6;i<W-4;i+=14){R(i,-9,4,5,OL);R(i+1,-8,2,4,'#e8b860');R(i+1,-8,2,1,'#fbf6ec');}break;}
    case 'bucket':{sh(2,12,12,3);R(3,7,10,8,OL);R(4,8,8,6,'#8a8e98');R(4,8,8,1,'#b0b4bc');const c=o.c||['#f0a0b8','#f6dc78','#b8a0e0','#fbf6ec'][Math.floor(H(1)*4)];for(let i=0;i<5;i++){const a=3+Math.floor(H(i+3)*9),b=Math.floor(H(i+8)*5);R(a,b+2,1,6,'#4f8a34');R(a-1,b,3,3,c);px(a,b,shade(c,-.25));}break;}
    case 'bed_planter':{sh(0,Hh-2,W,2);box(0,2,W,Hh-2,'#8a6448','#a8805e','#6e4c34');for(let j=4;j<Hh-2;j+=6)for(let i=3;i<W-3;i+=5){ell(i+1,j+1,3,3,'#4a8a3a');ell(i,j,2,2,'#78b454');if(H(i*j)<.4)px(i+1,j-1,['#f0a0b8','#f6dc78','#fbf6ec','#e86a6a'][Math.floor(H(i+j)*4)]);}break;}
    case 'tree_pot':{sh(1,13,14,3);R(3,8,10,7,OL);R(4,9,8,5,'#b0603e');R(7,-6,2,15,'#6a4a2a');ell(8,-10,8,8,OL);ell(8,-10,7,7,'#3e7a34');ell(6,-13,4,3,'#78b454');if(o.fruit){px(4,-8,'#f6c84a');px(11,-11,'#f6c84a');px(9,-6,'#f6c84a');}break;}
    case 'chest':{sh(1,13,14,3);box(1,3,14,12,'#8a5632','#a8704a','#6a3e22');R(1,7,14,2,'#d9b766');R(7,8,2,3,'#5a3a22');break;}
    case 'safe':{sh(1,13,14,3);box(1,0,14,15,'#4a4e5a','#6a6e7a','#2e3038');ell(8,7,3,3,'#c8a050');ell(8,7,1.5,1.5,'#4a4e5a');break;}
    case 'globe':{sh(3,13,10,3);R(7,8,2,6,'#6a4a2c');R(4,13,8,2,'#6a4a2c');ell(8,4,6,6,OL);ell(8,4,5,5,'#6a9ac8');R(5,2,4,3,'#7ab27a');R(9,5,3,2,'#7ab27a');break;}
    case 'lamp':{sh(4,13,8,3);R(7,0,2,14,'#4a3a2a');R(5,13,6,2,'#4a3a2a');R(3,-8,10,9,OL);R(4,-7,8,7,'#f6e0a8');R(4,-7,8,1,'#fff4c8');break;}
    case 'screen':{sh(0,Hh-2,W,2);for(let i=0;i<W;i+=8){R(i,-14,8,Hh+13,OL);R(i+1,-13,6,Hh+11,i%16?'#e8dcc4':'#dccfb4');}R(4,-8,6,4,'#c8b090');break;}
    case 'medcab':{sh(0,Hh-2,W,2);box(0,-16,W,Hh+15,'#eef0ea','#ffffff','#c8c8c0');R(2,-14,W-4,1,'#c8c8c0');for(let i=3;i<W-3;i+=4){R(i,-12,2,4,['#a8d0e0','#e8a0a0','#d8c890'][Math.floor(H(i)*3)]);}R(W/2-2,-4,4,1,'#c84a4a');R(W/2-1,-5,2,3,'#c84a4a');break;}
    case 'woodpile':{sh(0,Hh-2,W,3);R(0,-12,W,Hh+10,OL);R(1,-11,W-2,3,'#6a4a2c');R(1,-12,W-2,1,'#8a6a44');for(let j=-7;j<Hh-2;j+=5)for(let i=1+((j/5)%2?2:0);i<W-3;i+=5){ell(i+2,j+2,2.5,2.5,'#a8743e');ell(i+2,j+2,1.2,1.2,'#d8b07a');}break;}
    case 'statue':{sh(1,13,14,3);R(2,8,12,7,OL);R(3,9,10,5,'#c8c2b6');R(5,-14,6,23,OL);R(6,-13,4,21,'#e0dad0');ell(8,-16,4,4,OL);ell(8,-16,3,3,'#e0dad0');R(3,-6,10,3,'#e0dad0');break;}
    case 'gazebo':{sh(0,Hh-2,W,3);for(const xx of [0,W-3])R(xx,-14,3,Hh+12,'#f4efe6');R(-2,-22,W+4,10,OL);R(-1,-21,W+2,8,'#c8606a');for(let i=0;i<W+2;i+=6)R(i-1,-21,3,8,'#e88a90');R(W/2-2,-28,4,7,'#c8606a');break;}
    case 'boxes':{for(let i=0;i<o.w;i++){sh(i*16+1,13,14,3);box(i*16+1,2,14,13,'#c89a5e','#e0b878','#9a7040');R(i*16+2,8,12,1,'#9a7040');}if(o.h>1)for(let i=0;i<o.w;i++){box(i*16+2,18,13,13,'#b88a50','#d0a868','#8a6038');}break;}
    case 'teaset':{sh(1,12,14,3);box(0,2,16,11,'#8a5632','#a8704a','#6a3e22');R(3,0,6,5,OL);R(4,1,4,3,'#f4f0e8');R(10,2,3,3,'#f4f0e8');break;}
    case 'cake':{sh(0,Hh-2,W,2);box(0,-6,W,Hh+5,'#f4ecd8','#ffffff','#d8c8a8');R(2,-6,W-4,6,'#e0f0f2');for(let i=4;i<W-4;i+=8){ell(i+2,-2,3,2.5,'#f6e0e8');R(i,-3,5,1,'#e8a0b4');px(i+2,-5,'#c84a5a');}break;}
    case 'books_pile':{sh(1,12,14,3);for(let j=0;j<3;j++){const c=['#b04a52','#4f6e96','#6e8a4a'][j];R(2+j,8-j*4,12-j*2,4,OL);R(3+j,9-j*4,10-j*2,2,c);}break;}
    case 'register':{sh(1,12,14,3);box(2,4,12,10,'#c8a050','#e8c870','#9a7a3a');R(4,1,8,4,OL);R(5,2,6,2,'#3a5a3a');break;}
    case 'cart_in':{sh(0,Hh-2,W,3);box(0,0,W,Hh-2,'#9a6438','#b8804e');for(let i=2;i<W-4;i+=6)R(i,-2,5,5,['#e8b860','#9ccc62','#d86a5a'][Math.floor(H(i)*3)]);break;}
    default:{box(0,0,W,Hh,'#9a6438','#b8804e');}
  }
}
