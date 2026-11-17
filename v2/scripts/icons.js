/* ═════════ 아이템 아이콘 (스듀풍 14px · 외곽선 · 명암): 상점 · 가방 · 선물 목록 ═════════ */
const ITPL={
 bowl:['....dddd....','...d....d...','..cccccccc..','.caaaaaaaac.','.aaaaaaaaab.','..waaaaaab..','..wwwwwwbb..','...wwwwbb...','....bbbb....'],
 cup:['..d..d.....','...d..d....','.wwwwwww...','.waaaaaw.ww','.wbaaabw..w','.wwwwwww.w.','.wwwwwwwww.','..wwwwww...','..bbbbbb...'],
 bottle:['...dd...','...dd...','...cc...','..cbbc..','.caaaab.','.caaaab.','.cwwwwb.','.caaaab.','.caaaab.','.caaaab.','..bbbb..'],
 pie:['...cccccc...','.ccaaaaaacc.','caadaadaadac','caaaaaaaaaab','bbbbbbbbbbbb','.wwwwwwwwww.','..wwwwwwww..'],
 cake:['....dd.....','...dd.....','.wwwwwwww.','.wcwcwcww.','waaaaaaaab','wwwwwwwwwb','aaaaaaaaab','abaabaabab','.bbbbbbbb.'],
 tart:['..d.d.d..','.ddddddd.','caaaaaaab','.cbbbbbb.','..bbbbb..'],
 bread:['..cccccc..','.caaaaaacb','caacaacaab','caaaaaaaab','.bbbbbbbb.'],
 cookie:['..cccc..','.caaaab.','caadaaab','cadaadab','caaaadab','.caaaab.','..bbbb..'],
 book:['ccccccccb.','caaaaaaab.','cadddddab.','caaaaaaab.','caaaaaaab.','caaaaaaab.','caaaaaaab.','cwwwwwwwb.','bbbbbbbbb.'],
 jar:['.dddddd.','.dddddd.','..cccc..','.caaaab.','caaaaaab','cawwaaab','caaaaaab','caaaaaab','.bbbbbb.'],
 pouch:['...dd...','..d..d..','.caaaab.','caaaaaab','caacaaab','caaaaaab','caaaaaab','.bbbbbb.'],
 flower:['..d.d..','.ddeddd.','..ddd..','...a...','..aa...','...a.a.','...aa..','...a...'],
 bouquet:['.d.e.d.','ddeddedd','.dedded.','..aaaa..','...aa...','..cwwc..','..cwwc..','...bb...'],
 box:['...dd...','.dddddd.','caaadaab','caaadaab','dddddddd','caaadaab','caaadaab','bbbbdbbb'],
 seed:['cccccccb','cwwwwwwb','cwaaaawb','cwaddawb','cwaaaawb','cwwwwwwb','cccccccb','bbbbbbbb'],
 veg:['...ee...','..e.e...','.caaaa..','caaaaab.','caacaab.','caaaaab.','.bbbbb..'],
 leaf:['....c...','...cab..','..caaab.','.caadab.','caadaab.','.cdaab..','.d.bb...','d.......'],
 egg:['..cc..','.caab.','caaaab','caaaab','caaaab','.bbbb.'],
 gem:['..cc..','.cwab.','cwaaab','caaaab','.caab.','..bb..'],
 candle:['...d...','..ded..','...d...','..cab..','..cab..','..cab..','..cab..','.wwwww.','.bbbbb.'],
 pen:['.......cc','......cab','.....cab.','....cab..','...cab...','..cab....','.dd......','ddd......'],
 yarn:['..ccaa..','.caaabb.','caabaabb','cabaabab','caaabaab','.caabab.','..bbbb.d','.......d'],
 glove:['.c.c.c..','cacacac.','cacacac.','caaaaab.','caaaaabc','caaaaabb','.cwwwwb.','.wwwwww.'],
 chess:['..cc..','.caab.','.caab.','..ab..','.caab.','.caab.','caaaab','bbbbbb'],
 roll:['..cccc..','.cwwwwb.','cwwwwwwb','cwwddwwb','cwwwwwwb','.cwwwwb.','..bbbb..'],
 scroll:['ccccccc.','cwwwwwb.','cwdddwb.','cwwwwwb.','cwddwwb.','cwwwwwb.','bbbbbbb.'],
 ribbon:['cc....cc','caa..aab','.caddab.','..cddb..','.cadab..','ca.ab...','c..b....'],
 button:['.cccc.','caaaab','cawwab','caaaab','.bbbb.'],
 scarf:['caaaaaaab.','cadadadab.','caaaaaaab.','.....cab..','.....cab..','.....cdb..','.....d.d..'],
 ring:['..dd..','.d..d.','c....b','c....b','.c..b.','..bb..'],
 rod:['........c','.......c.','......c..','.....c...','....a....','...a....d','..b.....d','.bb.....d','bb.......'],
 can:['..ccc....','.c...c...','.caaaab..','caaaaaabc','caaaaaab.','caaaaaab.','.bbbbbb..'],
 boot:['.caab...','.caab...','.caab...','.caab...','.caaaab.','caaaaaab','bbbbbbbb'],
 weed:['.a..a...','.a.a..a.','a..a.a..','.a.aa.a.','..aaa...','..ab....','.bb.....'],
 tin:['.cccccc.','cwwwwwwb','caaaaaab','cadddaab','caaaaaab','caaaaaab','.bbbbbb.'],
 candy:['d.cccc.d','ddcaabdd','d.caab.d','..bbbb..'],
 mush:['.cccccc.','caawaaab','cawaaawb','.bbbbbb.','...ww...','...wb...','..bwbb..'],
 berry:['...e....','..eee...','.cab.cab','caab.aab','.bb..bb.','..cab...','.caab...','..bb....'],
 badge:['..cccc..','.caaaab.','caawwaab','caawwaab','.caaaab.','..dbbd..','.dd..dd.','.d....d.'],
 watch:['...dd...','..cccc..','.cwwwwb.','cwwdwwwb','cwwdddwb','cwwwwwwb','.cwwwwb.','..bbbb..'],
 letter:['cccccccb','cwbwwbwb','cwwbbwwb','cwwwwwwb','cwwwwwwb','bbbbbbbb'],
};
const IPAL={wheat:['#e8c070','#b88a40','#f8e0a0'],brown:['#a86a3a','#6a3a1a','#d09a5a'],red:['#d04050','#8a2030','#f08a90'],pink:['#f0a0b8','#c06a80','#ffd0dc'],
 green:['#6aa84a','#3a6a2a','#a8d878'],blue:['#5a8ac8','#2a4a8a','#9ac0f0'],purple:['#9a6ac0','#5a3a80','#c8a8e8'],yellow:['#f0d050','#b89020','#fff0a0'],
 orange:['#f09040','#b05a20','#ffc080'],white:['#f4f0e6','#c8c0b0','#ffffff'],silver:['#c8ccd8','#7a8090','#f4f6fb'],gold:['#e8c050','#a07a20','#fff0a0'],
 dark:['#4a4058','#2a2034','#7a6a8a'],cream:['#f0e0c0','#c8a878','#fff6e0'],teal:['#5ab0a8','#2a6a68','#9ae0d8'],tomato:['#e04a3a','#9a2a20','#f8907a'],beige:['#e8d4b0','#b89a70','#fff2d8']};
const ICONMAP={
 tea_leaf:['tin','green','#c8a050'],ink_pen:['pen','silver','#1e1a2a'],candle:['candle','cream','#ffb040','#ffffff'],yarn:['yarn','pink','#a06070'],candy:['candy','pink','#f0d050'],gloves:['glove','brown','#ffffff','#ffffff'],
 chess:['chess','dark'],bandage:['roll','white','#d04050'],wildflower:['flower','green','#f0d050','#ffffff'],rose:['flower','green','#d03040','#f08a90'],lavender:['pouch','purple','#e8d4b0'],
 poem:['book','blue','#e8c050'],picture_book:['book','orange','#ffffff'],sword_book:['book','dark','#c8ccd8'],novel:['book','pink','#ffffff'],bread:['bread','wheat'],cookie:['cookie','wheat','#8a5a2a'],
 meat_pie:['pie','brown','#6a2a1a'],cider:['bottle','orange','#6a8a3a','#ffffff'],silver_button:['button','silver'],ribbon:['ribbon','red','#f08a90'],spice:['box','brown','#e8c050'],dried_fruit:['jar','orange','#8a6a4a','#ffffff'],
 scarf:['scarf','red','#ffffff'],watch:['watch','gold','#2a2030','#ffffff'],tim_letter:['letter','white'],rod:['rod','brown','#e8e0d0'],rod2:['rod','silver','#e8e0d0'],
 dandelion:['flower','green','#f0d050','#fff0a0'],leek:['veg','green','#ffffff'],primrose:['flower','green','#f0e070','#ffffff'],rasp:['berry','red','#4a8a3a'],sweetpea:['flower','green','#d070b0','#f8b0e0'],
 mushroom:['mush','brown'],blackberry:['berry','dark','#4a8a3a'],maple:['leaf','orange','#a03020'],winterroot:['veg','brown','#8a9a6a'],holly:['berry','red','#3a7a3a'],crystal:['gem','teal'],
 tulip:['flower','green','#e04a6a','#f8a0b0'],sunflower:['flower','green','#f0c030','#6a3a1a'],chrysan:['flower','green','#f0e080','#ffffff'],camellia:['flower','green','#e03a4a','#f0d050'],
 pumpkin_pie:['pie','orange','#a05a20'],ginger:['cookie','brown','#ffffff'],strawberry:['tart','cream','#e04050','#ffffff'],berry_tart:['tart','wheat','#c03050','#f08a90'],
 star_gift:['box','blue','#f0d050'],egg_badge:['badge','pink','#5a8ac8'],bouquet:['bouquet','green','#e04a6a','#f8e0a0'],ring:['ring','silver','#c8ccd8'],can:['can','silver'],can2:['can','orange'],
 egg:['egg','white'],egg_big:['egg','cream'],boot:['boot','brown'],weed:['weed','green'],bait:['jar','brown','#e8a0a0','#ffffff'],lucky_float:['button','red'],judge_ribbon:['badge','gold','#d04050'],
 potato:['veg','beige','#6a8a3a'],strawb:['berry','red','#4a8a3a'],cabbage:['veg','green','#3a6a2a'],pea:['veg','green','#a8d878'],tomato:['veg','tomato','#3a8a3a'],blueb:['berry','blue','#4a8a3a'],
 corn:['veg','yellow','#6aa84a'],melon:['veg','green','#d8e8a0'],wheat:['weed','wheat'],pumpkin:['veg','orange','#4a7a3a'],carrot:['veg','orange','#4a9a3a'],grape:['berry','purple','#4a8a3a'],
 beet:['veg','red','#4a8a3a'],kale:['leaf','green','#2a5a2a'],herb:['leaf','teal','#2a6a4a'],
 d_soup:['bowl','beige','#ffffff'],d_herbtea:['cup','green'],d_omelet:['bowl','yellow','#ffffff'],d_stew:['bowl','tomato','#ffffff'],d_cornbread:['bread','yellow'],d_salad:['bowl','green','#ffffff'],
 d_grapejuice:['cup','purple'],d_pumpsoup:['bowl','orange','#ffffff'],d_carrotcake:['cake','orange','#4a9a3a'],d_jam:['jar','blue','#e8d4b0','#ffffff'],d_fishherb:['bowl','silver','#6aa84a'],
 d_vegpie:['pie','wheat','#4a8a3a'],d_kalesoup:['bowl','green','#ffffff'],d_strawcake:['cake','pink','#e04050'],d_melonice:['cup','green'],d_southtea:['cup','pink'],
 d_smeltfry:['bowl','wheat','#ffffff'],d_fishstew:['bowl','tomato','#ffffff'],d_salmonsteak:['bowl','orange','#6aa84a'],d_eelgrill:['bowl','brown','#ffffff']};
const ICOC={};
const SOIMG=new Image();SOIMG.src=SOSRC;
function itemIcon(k){if(ICOC[k])return ICOC[k];let cv=null;
  {const BK={picture_book:150,sword_book:230,novel:320};   // 책: 원본 책 그림(시집)을 색만 바꿔서
   if(BK[k]!=null&&SOICO.poem&&SOIMG.complete&&SOIMG.naturalWidth){const o=document.createElement('canvas');o.width=o.height=20;const g=o.getContext('2d');g.drawImage(SOIMG,SOICO.poem[0],SOICO.poem[1],16,16,2,2,16,16);
     const d=g.getImageData(0,0,20,20),q=d.data,rot=BK[k]/360;for(let i=0;i<q.length;i+=4){if(q[i+3]<10)continue;const r=q[i]/255,gg=q[i+1]/255,b=q[i+2]/255,mx=Math.max(r,gg,b),mn=Math.min(r,gg,b),l=(mx+mn)/2,sat=mx-mn;if(sat<.12)continue;
       let h=mx===r?((gg-b)/sat)%6:mx===gg?(b-r)/sat+2:(r-gg)/sat+4;h=(h/6+rot)%1;if(h<0)h+=1;const C=sat,X=C*(1-Math.abs((h*6)%2-1)),m=l-C/2,seg=Math.floor(h*6),rgb=[[C,X,0],[X,C,0],[0,C,X],[0,X,C],[X,0,C],[C,0,X]][seg];q[i]=Math.round((rgb[0]+m)*255);q[i+1]=Math.round((rgb[1]+m)*255);q[i+2]=Math.round((rgb[2]+m)*255);}
     if(k==='sword_book')for(let i=0;i<q.length;i+=4){q[i]*=.55;q[i+1]*=.55;q[i+2]*=.6;}
     g.putImageData(d,0,0);return ICOC[k]=o;}}
  if(SOICO[k]&&SOIMG.complete&&SOIMG.naturalWidth){const o=document.createElement('canvas');o.width=o.height=20;o.getContext('2d').drawImage(SOIMG,SOICO[k][0],SOICO[k][1],16,16,2,2,16,16);return ICOC[k]=o;}   // 보낸 리텍 모드의 원본 아이템 그림
  try{if(typeof FT!=='undefined'&&(FT[k]||(typeof FDIF!=='undefined'&&FDIF[k]))&&typeof fishIcon==='function')cv=fishIcon(k);}catch(e){}
  if(!cv){let m=ICONMAP[k];if(!m&&k.startsWith('s_')){const base=k.slice(2),bm=ICONMAP[base]||ICONMAP[{strawb:'strawb',blueb:'blueb'}[base]];m=['seed',bm?bm[1]:'wheat',bm?(IPAL[bm[1]]||[])[0]:'#6a8a3a'];}
    if(!m)m=['box','beige','#c8a050'];const tp=ITPL[m[0]],[a,b,c]=IPAL[m[1]]||IPAL.beige,d=m[2]||b,e=m[3]||c;
    const H=tp.length,W=Math.max(...tp.map(r=>r.length)),Gd=Array.from({length:H},(_,y)=>Array.from({length:W},(_,x)=>({a,b,c,d,e,w:'#fbf8f0'})[tp[y][x]]||null));
    cv=rasterOL(Gd,W,H,'#2a1a14');}
  const o=document.createElement('canvas');o.width=o.height=20;const g=o.getContext('2d');g.imageSmoothingEnabled=false;g.drawImage(cv,Math.floor((20-cv.width)/2),Math.floor((20-cv.height)/2));return ICOC[k]=o;}
/* 상점·가방·선물 목록 줄 앞에 아이콘 */
(function(){const st=document.createElement('style');st.textContent=`#panel .row .ico{width:40px;height:40px;flex:0 0 40px;image-rendering:pixelated;background:#f6dcae;border:2px solid #c98446;box-shadow:inset 0 0 0 2px #fff4dc}
#panel .row.hasico>div:first-of-type{flex:1 1 120px}`;document.head.appendChild(st);})();
{const _tp2=togglePanel;togglePanel=function(kind,arg,keep){_tp2(kind,arg,keep);const p=$('#panel');if(!p||p.hidden)return;
  p.querySelectorAll('.row [data-buy],.row [data-sell],.row [data-gift],.row [data-use],.row [data-fcook]').forEach(b=>{const row=b.closest('.row');if(!row||row.querySelector('.ico'))return;
    const k=b.dataset.buy||b.dataset.sell||b.dataset.gift||b.dataset.use||(b.dataset.fcook&&'d_'+b.dataset.fcook);if(!ITEMS[k])return;const c=document.createElement('canvas');c.width=c.height=20;c.className='ico';c.getContext('2d').drawImage(itemIcon(k),0,0);row.insertBefore(c,row.firstChild);row.classList.add('hasico');});
  if(kind==='bag')p.querySelectorAll('.row').forEach(row=>{if(row.querySelector('.ico'))return;const nm=(row.querySelector('.tn')||{}).firstChild;const t=nm&&nm.textContent&&nm.textContent.trim();const k=t&&Object.keys(ITEMS).find(x=>ITEMS[x].n===t);if(!k)return;const c=document.createElement('canvas');c.width=c.height=20;c.className='ico';c.getContext('2d').drawImage(itemIcon(k),0,0);row.insertBefore(c,row.firstChild);row.classList.add('hasico');});};}
