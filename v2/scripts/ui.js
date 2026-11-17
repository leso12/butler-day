/* ═════════ 메뉴 UI (스타듀풍): 나무 테 + 양피지 · 아이콘 탭 · 모서리 ✕ · 사람 카드(초상화·하트·생일·선물 호불호) ═════════ */
(function uiCss(){const st=document.createElement('style');st.textContent=`
#panel{display:flex;flex-direction:column;overflow:visible;padding:0!important;background:#efe2cc;color:#3e2c28;border:0;border-radius:0;
  box-shadow:inset 0 0 0 3px #f7efe2,inset 0 0 0 6px #c9a77a,0 0 0 3px #a8846a,0 0 0 6px #5b4339,0 10px 0 6px rgba(20,8,4,.35);}
#panel .pin{overflow:auto;min-height:0;flex:1;padding:16px 16px 18px;scrollbar-width:thin;scrollbar-color:#a8846a #eadcc6}
#panel h2{padding-right:44px;color:#5b4339;font-size:20px;margin:0 0 12px;text-shadow:1px 1px 0 #f7efe2;border-bottom:3px solid #c9a77a;padding-bottom:8px}
#panel .pbtn.px{position:absolute;top:4px;right:4px;width:38px;height:38px;min-height:0;padding:0;z-index:3;font:700 20px/1 var(--f-ui);color:#fffaf1;
  background:#b9707e;border:3px solid #5b4339;border-radius:0;box-shadow:inset 3px 3px 0 #d99ca7,inset -3px -3px 0 #8a4c5a;text-shadow:1px 1px 0 #6a3c48;cursor:pointer}
#panel .pbtn.px:active{transform:translateY(1px)}
#panel .pbtn{background:#ead9c2;color:#3e2c28;border:3px solid #5b4339;border-radius:0;box-shadow:inset 2px 2px 0 #f8eedf,inset -2px -2px 0 #9c7f62;font-size:14px}
#panel .pbtn:active{box-shadow:inset -2px -2px 0 #f8eedf,inset 2px 2px 0 #9c7f62}
#panel .pbtn:disabled{filter:grayscale(.6);opacity:.55}
#panel .tabs{display:flex;gap:6px;flex-wrap:wrap}
#panel .tab{display:flex;flex-direction:column;align-items:center;gap:2px;min-width:52px;padding:5px 4px 4px;border-radius:0;font-size:12px;color:#5b4339;
  background:#e6d3ba;border:3px solid #5b4339;box-shadow:inset 2px 2px 0 #f6ead7,inset -2px -2px 0 #9c7f62;position:relative}
#panel .tab svg{width:24px;height:24px;image-rendering:pixelated}
#panel .tab.on{background:#f7efe2;box-shadow:inset 2px 2px 0 #fffaf1,inset -2px -2px 0 #d9c3a3;transform:translateY(-3px)}
#panel .tab .dot{position:absolute;top:-6px;right:-6px;width:12px;height:12px;background:#b9707e;border:2px solid #5b4339}
#panel .sub{color:#7a5a4e;font-size:14px;letter-spacing:.04em;margin:14px 0 6px;padding-bottom:3px;border-bottom:2px dashed #c9a77a}
#panel .tw,#panel .story{color:#7a6458}
#panel .row,#panel .letter{background:#f5ebdc;border:2px solid #c9b08e;box-shadow:inset 0 0 0 2px #fffaf1;padding:8px 10px;margin:6px 0;border-top:2px solid #c9b08e}
#panel .bk{display:inline-block;width:120px;height:12px;background:#e6d8c4;border:2px solid #a8846a;box-shadow:inset 0 1px 0 #cdbba2;vertical-align:middle}
#panel .colg .bk{display:block;box-sizing:border-box;width:100%!important;margin-top:3px}
#panel .row{display:flex;flex-wrap:wrap;gap:6px;align-items:center;justify-content:space-between;box-sizing:border-box;max-width:100%}
#panel .row>div{min-width:0;flex:1 1 150px}
#panel .row>span,#panel .row>button{flex:0 1 auto;max-width:100%}
#panel .row>.bs{flex-wrap:wrap;justify-content:flex-end;flex:0 1 auto}
#panel .row>.bs .pbtn{padding:6px 9px}
#panel .row>.bs span.tn{min-width:3.5em!important}
#panel .pin *{box-sizing:border-box;max-width:100%}
#panel .pin canvas{max-width:100%}
.soc>div{min-width:0}
#panel .bk i{display:block;height:100%;background:linear-gradient(#c3d4ae 0 50%,#8fa88a 50%)}
.soc{display:grid;grid-template-columns:56px 1fr auto;gap:10px;align-items:start;background:#f5ebdc;border:3px solid #a8846a;box-shadow:inset 0 0 0 2px #fffaf1;padding:8px;margin:8px 0}
.soc.me{border-color:#b36b7c;background:#f8e8ea}
.soc .pf{width:56px;height:56px;background:#e2cfb2;border:3px solid #5b4339;box-shadow:inset 0 0 0 2px #efe2cc;image-rendering:pixelated}
.soc .pf canvas{width:100%;height:100%;image-rendering:pixelated;display:block}
.soc .nm{font-size:17px;color:#3e2c28;display:flex;gap:6px;align-items:center;flex-wrap:wrap}
.soc .st{font-size:12px;color:#fffaf1;background:#8a6e5c;padding:1px 6px;border:2px solid #5b4339}
.soc .st.r{background:#b36b7c}
.soc .hr{display:flex;gap:2px;margin:4px 0 2px}
.soc .hr svg{width:16px;height:14px;image-rendering:pixelated}
.soc .smeta{font-size:12px;color:#7a6458;display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-top:2px}
.soc .smeta svg{width:14px;height:14px;vertical-align:-2px;image-rendering:pixelated}
.gt{margin-top:6px;display:grid;grid-template-columns:auto 1fr;gap:3px 8px;font-size:12px;align-items:start}
.gt .gl{color:#fffaf1;padding:1px 5px;border:2px solid #5b4339;white-space:nowrap;text-align:center}
.gt .gl.love{background:#c27a8a}.gt .gl.like{background:#7f9a78}.gt .gl.dis{background:#8a8796}
.gt .ch{display:flex;flex-wrap:wrap;gap:3px}
.gt .ch span{background:#fffaf1;border:2px solid #c9b08e;padding:0 5px;color:#3e2c28}
.gt .ch span.q{color:#b09a84;border-style:dashed;background:transparent}
.hev{display:flex;flex-wrap:wrap;gap:3px;margin-top:6px}
.hev span{font-size:11px;padding:0 4px;border:2px solid #c9b08e;color:#b09a84;background:transparent}
.hev span.on{background:#ecc6ce;color:#7a4552;border-color:#b36b7c}
.soc .mem{font-size:12px;color:#7a6050;margin-top:5px}
.soc .rk{align-self:center}
.rom{background:linear-gradient(#f8e8ea,#f1d6da);border:3px solid #b36b7c;box-shadow:inset 0 0 0 2px #fdf3f4;padding:10px;margin:4px 0 10px}
.rom .sched{font-size:13px;color:#6e4650;margin-top:3px}
.colg{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:6px}
.colg .cc{background:#f5ebdc;border:3px solid #a8846a;box-shadow:inset 0 0 0 2px #fffaf1;padding:6px 8px;font-size:13px}
.colg .cc b{display:block;font-weight:400;color:#3e2c28;font-size:15px}
.tiles{display:flex;flex-wrap:wrap;gap:4px}
.tiles span{font-size:12px;border:2px solid #c9b08e;background:#fffaf1;padding:2px 6px;color:#3e2c28}
.tiles span.q{border-style:dashed;background:transparent;color:#b09a84}
`;document.head.appendChild(st);})();
/* 도트 아이콘: 문자열 비트맵 → SVG */
const PXC={K:'#3e2c28',R:'#c27a8a',r:'#e8b9c0',W:'#fffaf1',Y:'#d4b06a',y:'#efdcac',B:'#6f84a8',b:'#b8c6de',G:'#7f9a78',g:'#b9cba9',N:'#8a6e5c',n:'#c8ad94',P:'#e8d6be',S:'#9a96a6',s:'#d6d2de'};
function pxSvg(rows){const h=rows.length,w=rows[0].length;let r='';rows.forEach((l,y)=>{for(let x=0;x<w;x++){const c=PXC[l[x]];if(c)r+=`<rect x="${x}" y="${y}" width="1.02" height="1.02" fill="${c}"/>`;}});return `<svg viewBox="0 0 ${w} ${h}" shape-rendering="crispEdges">${r}</svg>`;}
const PXI={
 save:['KKKKKKKKKK','KBBWWWWBBK','KBBWWWWBBK','KBBWWWWBBK','KBBBBBBBBK','KBBBBBBBBK','KBsssssBBK','KBsKKssBBK','KBsKKssBBK','KKKKKKKKKK'],
 love:['.KK...KK..','KrRK.KRRK.','KrRRKRRRRK','KRRRRRRRRK','KRRRRRRRRK','.KRRRRRRK.','..KRRRRK..','...KRRK...','....KK....','..........'],
 cal:['.K.K..K.K.','KKKKKKKKKK','KRRRRRRRRK','KKKKKKKKKK','KWWWWWWWWK','KWKWKWKWWK','KWWWWWWWWK','KWKWKWRWWK','KWWWWWWWWK','KKKKKKKKKK'],
 log:['KKKKKKKKK.','KNnnnnnnNK','KNnWWWWnNK','KNnnnnnnNK','KNnnnnnnNK','KNnnYYnnNK','KNnnYYnnNK','KNnnnnnnNK','KNNNNNNNNK','KKKKKKKKK.'],
 memo:['....KK....','...KyyK...','KKKKyyKKKK','KyyyyyyyyK','.KyyyyyyK.','..KyyyyK..','.KyyKKyyK.','.KyK..KyK.','KKK....KKK','..........'],
 mail:['KKKKKKKKKK','KWKWWWWKWK','KWWKWWKWWK','KWWWKKWWWK','KWWWRRWWWK','KWWWRRWWWK','KWWWWWWWWK','KWWWWWWWWK','KKKKKKKKKK','..........'],
 book:['KKKKKKKKKK','KNNNYYNNNK','KnnnYYnnnK','KKKKKKKKKK','KNNNNNNNNK','KNnnYYnnNK','KNnnKKnnNK','KNnnnnnnNK','KNNNNNNNNK','KKKKKKKKKK'],
 stat:['...KKKK...','..KPPPPK..','..KPKPKK..','..KPPPPK..','...KKKK...','..KBBBBK..','.KBBBBBBK.','.KBBBBBBK.','.KBBKKBBK.','.KKK..KKK.'],
 set:['...KKKK...','.K.KSSK.K.','KSKSSSSKSK','.KSSKKSSK.','KSSK..KSSK','KSSK..KSSK','.KSSKKSSK.','KSKSSSSKSK','.K.KSSK.K.','...KKKK...'],
 cake:['...Y..Y...','...K..K...','..KWKKWK..','.KrrrrrrK.','.KWWWWWWK.','.KrrrrrrK.','KKKKKKKKKK','..........'],
 gift:['..KK.KK...','.KYKKYK...','KKKKKKKKK.','KRRRYRRRK.','KKKKKKKKK.','.KRRYRRK..','.KRRYRRK..','.KRRYRRK..','.KKKKKKK..'],
};
const HFULL=pxSvg(['.KK.KK.','KrRKRRK','KRRRRRK','KRRRRRK','.KRRRK.','..KRK..','...K...']),HEMP=pxSvg(['.KK.KK.','KPPKPPK','KPPPPPK','KPPPPPK','.KPPPK.','..KPK..','...K...']);
function heartRow(n){let h='';for(let i=0;i<10;i++)h+=i<n?HFULL:HEMP;return `<div class="hr" aria-label="하트 ${n}/10">${h}</div>`;}
/* 선물 호불호: 직접 줘 보거나 소문으로 알게 된 것만, 나머지는 ? */
function tasteHTML(id){const pr=PREF[id];if(!pr)return '';const kn=(S.known||{})[id]||{};
  const line=(cat,lab)=>{const all=pr[cat]||[];const got=all.filter(k=>kn[k]===cat&&ITEMS[k]);const q=all.length-got.length;
    return `<span class="gl ${cat}">${lab}</span><span class="ch">${got.map(k=>`<span>${ITEMS[k].n}</span>`).join('')}${q?`<span class="q">? ${got.length?'외 ':''}${q}개</span>`:''}</span>`;};
  return `<div class="gt">${line('love','아주 좋아함')}${line('like','좋아함')}${line('dis','싫어함')}</div>`;}
function socCard(id){const r=(S.rel||{})[id]||{},st=relStage(id),me=isLover(id),hs=hearts(id),bd=BDAY[id]?dateOf(BDAY[id]).label:'?',
  wk=(S.giftWk||{})[id]||0,today=(S.gifted||{})[id]===S.day,ev=(HEART[id]||[]);
  const ms=(typeof MS!=='undefined'?MS:[]).filter(k=>r[k]),mem=[...ms.map(k=>({d:r[k],t:k==='confess'?(r.confBy==='them'?'고백받음':'고백함'):k==='engage'?(r.propBy==='them'?'청혼받음':'청혼함'):MSN[k]})),...(r.hist||[]).map(x=>({d:x.d,t:'💔'+HISTN[x.k]}))].sort((a,b)=>a.d-b.d);
  const rk=MS&&MS.some(k=>r[k]&&k!=='meet'&&k!=='firstDate')?`<button class="pbtn sm rk" data-rk="r:${id}:${['wed','engage','kiss','confess'].find(k=>r[k])}">회상</button>`:'<span></span>';
  return `<div class="soc${me?' me':''}"><div class="pf"><canvas data-bust="${id}" width="64" height="64"></canvas></div><div>
    <div class="nm">${CH[id].name}<span class="st${me||st==='crush'?' r':''}">${STAGE_N[st]}</span></div>${heartRow(hs)}
    <div class="smeta"><span>${pxSvg(PXI.cake)} ${bd}${isBday(id)?' <b style="color:#b36b7c">오늘!</b>':''}</span><span>${pxSvg(PXI.gift)} ${today?'오늘 선물 줌':'오늘 선물 가능'}</span></div>
    ${tasteHTML(id)}
    ${ev.length?`<div class="hev">${ev.map(e=>`<span class="${S.seen[e.id]?'on':''}" title="${S.seen[e.id]?e.title:'아직 못 본 이야기'}">♥${e.h}</span>`).join('')}</div>`:''}
    ${mem.length?`<div class="mem">${mem.map(x=>`${x.t} ${ymd(x.d)}`).join(' · ')}</div>`:''}
    ${ROMANCE.includes(id)&&!S.partner?`<div class="mem">${hs>=8?'♥ 설레는 사이 — 꽃집의 꽃다발로 고백할 수 있다':'♥8이 되면 꽃다발로 고백할 수 있다'}${hs>=9?' · 상대가 먼저 고백해 올지도':''}</div>`:''}
  </div>${rk}</div>`;}
{const _lh=loveHTML;loveHTML=function(){let h='';
  if(S.partner){const full=_lh(),i=full.indexOf('<div class="rel">'),j=full.indexOf('<div class="sub">',i);if(i>=0)h+=`<div class="rom">${full.slice(i,j>0?j:undefined).replace(/<canvas[^>]*><\/canvas>/,'').replace(/<div class="hearts">[\s\S]*?<\/span><\/div>/,'')}</div>`;}
  h+=`<div class="sub">사람들</div>`;
  const ids=[...FRIENDS.filter(id=>typeof okFriend!=='function'||okFriend(id)),...(S.f.demian?['demian']:[])];
  for(const id of ids)h+=socCard(id);
  h+=`<p class="story">선물을 주면 반응이 카드에 기록돼요. 사람들에게 들은 소문으로도 취향을 알 수 있어요. 한 사람에게 하루 1개.</p>`;
  return h;};}
/* 도감: 수집 현황은 카드 격자로, 축제·물고기는 칸으로 (사람별 정보는 관계 탭으로) */
{const _bh=bookHtml;bookHtml=function(){const full=_bh();const cards=[...full.matchAll(/<div class="kv"><span>([^<]*)<b>(\d+) \/ (\d+)<\/b><\/span><span class="bk"><i style="width:(\d+)%"><\/i><\/span><\/div>/g)];
  let h=`<div class="sub">수집</div><div class="colg">${cards.map(m=>`<div class="cc">${m[1].trim()}<b>${m[2]} / ${m[3]}</b><span class="bk" style="width:100%"><i style="width:${m[4]}%"></i></span></div>`).join('')}</div>`;
  h+=`<div class="sub">축제</div><div class="tiles">${FESTS.map(f=>{const on=Object.keys(S.festSeen||{}).some(k=>k.startsWith(f.id+':'));return `<span class="${on?'':'q'}" title="${f.where}">${on?'✓ ':''}${f.m}/${f.d} ${f.name}</span>`;}).join('')}</div>`;
  const fk=S.fishK||{};h+=`<div class="sub">물고기</div><div class="tiles">${Object.keys(FDIF).map(k=>fk[k]?`<span>${ITEMS[k]?ITEMS[k].n:k} ×${fk[k]}</span>`:'<span class="q">???</span>').join('')}</div>`;
  h+=`<p class="story">사람들의 하트·생일·선물 취향은 «관계» 탭에서 볼 수 있어요.</p>`;return h;};}
/* 창 틀: 내용은 안쪽에서 스크롤, ✕는 모서리에, 탭엔 아이콘 */
{const _tp=togglePanel;togglePanel=function(kind,arg,keep){_tp(kind,arg,keep);const p=$('#panel');if(!p||p.hidden||p.querySelector(':scope > .pin'))return;
  const x=p.querySelector('#pclose');const pin=document.createElement('div');pin.className='pin';while(p.firstChild)pin.appendChild(p.firstChild);p.appendChild(pin);
  p.querySelectorAll('canvas[data-bust]').forEach(c=>{try{blit(c,bust(c.dataset.bust,'n'));}catch(e){const g=c.getContext('2d');g.fillStyle='#c8a070';g.fillRect(0,0,64,64);g.fillStyle='#5b4339';g.font='bold 30px sans-serif';g.textAlign='center';g.fillText((CH[c.dataset.bust]||{name:'?'}).name[0],32,43);}});
  if(x){x.classList.add('px');x.textContent='✕';x.setAttribute('aria-label','닫기');p.appendChild(x);}
  p.querySelectorAll('.tab[data-tab]').forEach(b=>{const k=b.dataset.tab,ic=PXI[k];if(!ic||b.querySelector('svg'))return;const dot=/•/.test(b.textContent);const lab=b.textContent.replace('•','').trim();b.innerHTML=pxSvg(ic)+`<span>${lab}</span>`+(dot?'<i class="dot"></i>':'');});};}
/* 조작 먹통 방지: 대화·카드·미니게임·화면 전환 같은 정당한 이유 없이 '바쁨' 상태가 6초 넘게 남으면 풀어 준다
   (중간에 오류가 나서 busy가 안 풀리던 경우) */
{let since=0;setInterval(()=>{try{
  const card=document.querySelector('#card.on'),fade=document.querySelector('#fade.on'),title=$('#title')&&!$('#title').hidden;
  const legit=D||AFF||MG||card||fade||title||(typeof SCENE!=='undefined'&&SCENE)||P.pose==='bed'||P.pose==='write'||(typeof FISHING!=='undefined'&&FISHING);
  if(busy&&!legit){if(!since)since=performance.now();else if(performance.now()-since>6000){busy=false;since=0;for(const k in keys)keys[k]=0;}}else since=0;
  if(!busy&&!D&&$('#dlg')&&!$('#dlg').hidden&&!card){$('#dlg').hidden=true;}
}catch(e){}},1000);}
addEventListener('error',e=>{try{console.warn('오류:',e.message);}catch(_){}});

/* 상단 HUD 버튼: 도트 아이콘 + 차분한 색 */
(function(){const st=document.createElement('style');st.textContent=`
.hbtn{background:linear-gradient(#5e463c,#4a362f)!important;color:#f3e6d2!important;border:1px solid #b89a72!important;box-shadow:inset 0 1px 0 rgba(255,240,215,.18);display:inline-flex;align-items:center;justify-content:center;gap:5px}
.hbtn svg{width:16px;height:16px;image-rendering:pixelated;flex:none}
.hbtn.on,.hbtn:active{background:linear-gradient(#7a5a50,#5e463c)!important}
`;document.head.appendChild(st);
 PXI.work=['..KKKKKK..','.KnKWWKnK.','.KnnnnnnK.','.KWWWWWWK.','.KWKKKKWK.','.KWWWWWWK.','.KWKKKWWK.','.KWWWWWWK.','.KWKKKKWK.','.KKKKKKKK.'];
 PXI.bag=['...KKKK...','..K....K..','.KKKKKKKK.','KnNNNNNNnK','KNNNYYNNNK','KNNNYYNNNK','KNNNNNNNNK','KNNNNNNNNK','KnNNNNNNnK','.KKKKKKKK.'];
 PXI.map=['KKKKKKKKKK','KPPgPPPbbK','KPgPPPbbPK','KPPPKPbPPK','KPPKRKPPgK','KPPPKPPPgK','KbPPPPPgPK','KbbPPPgPPK','KPbbPPPPPK','KKKKKKKKKK'];
 PXI.menu=['..........','KKKKKKKKKK','KWWWWWWWWK','KKKKKKKKKK','..........','KKKKKKKKKK','KWWWWWWWWK','KKKKKKKKKK','..........','..........'];
 const set=()=>{for(const [id,ic] of [['bwork','work'],['bbag','bag'],['bmap','map'],['brel','love'],['bmenu','menu']]){const b=document.getElementById(id);if(!b||b.querySelector('svg'))continue;
   if(id==='brel'||id==='bmenu')b.innerHTML=pxSvg(PXI[ic])+'<span>'+(id==='brel'?'사람들':'메뉴')+'</span>';else b.insertAdjacentHTML('afterbegin',pxSvg(PXI[ic]));}};
 set();setInterval(set,1500);})();

(function(){const st=document.createElement('style');st.textContent='#panel .colg .cc{overflow:hidden}#panel .colg .cc .bk{display:block!important;width:auto!important;margin:4px 0 0 0!important}';document.head.appendChild(st);})();
/* 대화창 · 선택지 · 카드 · 토스트 · 지도: 같은 색감(양피지·호두나무·앤티크 골드·장미색) */
(function(){const st=document.createElement('style');st.textContent=`
#dlg{background:#f7efe2!important;border:0!important;border-radius:0!important;box-shadow:inset 0 0 0 3px #fffaf1,inset 0 0 0 6px #c9a77a,0 0 0 3px #a8846a,0 0 0 6px #5b4339,0 8px 0 4px rgba(20,8,4,.3)!important}
#dname{background:#5b4339!important;color:#f7efe2!important;border:2px solid #c9a77a!important;border-radius:0!important;box-shadow:0 2px 0 rgba(0,0,0,.2)}
#dtext{color:#3e2c28}#dlg.nar #dtext{color:#7a6050}
#pbox{background:#efe2cc!important;border:3px solid #a8846a!important;border-radius:0!important;box-shadow:inset 0 0 0 2px #fffaf1}
#pname{background:#5b4339!important;color:#f7efe2!important;border-radius:0!important;border:1px solid #c9a77a}
.cbtn{background:#f5ebdc!important;color:#3e2c28!important;border:2px solid #c9b08e!important;border-radius:0!important;box-shadow:inset 0 0 0 2px #fffaf1;position:relative;padding-left:28px!important}
.cbtn::before{content:'';position:absolute;left:10px;top:50%;width:8px;height:8px;margin-top:-4px;background:#d9c3a3;transform:rotate(45deg)}
.cbtn.sel{background:#f8e8ea!important;border-color:#b36b7c!important;box-shadow:inset 0 0 0 2px #fffaf1!important}
.cbtn.sel::before{background:#b36b7c}
#next{color:#b36b7c!important}
#toast{background:rgba(62,44,40,.92)!important;border:2px solid #c9a77a!important;border-radius:0!important;color:#f7efe2!important}
#toast i{color:#e8b9c0!important}
#where{background:rgba(62,44,40,.82)!important;border:2px solid #a8846a!important;border-radius:0!important;color:#f7efe2!important}
.clock{background:#3e2c28!important;border:2px solid #a8846a!important;border-radius:0!important}
.clock span{color:#d9c3a3!important}
#panel.wide .ml{background:rgba(255,250,241,.9)!important;color:#3e2c28!important;border:1px solid #c9b08e;border-radius:0!important}
#panel.wide .ml.nl{background:rgba(111,132,168,.92)!important;color:#fff!important;border-color:#4a5878}
#panel.wide #mapw{border:3px solid #a8846a;box-shadow:inset 0 0 0 2px #fffaf1}
#panel .mlegend{color:#5b4339!important}
#panel.wide .tab,#panel.wide .pbtn{font-size:13px}
#card .cs{color:#d9c3a3!important}#card .ln{background:#c9a77a!important}
`;document.head.appendChild(st);})();
(function(){const st=document.createElement('style');st.textContent=`#dlg{width:min(760px,calc(100% - 32px))!important}#panel.wide h2{flex-wrap:wrap;gap:6px}`;document.head.appendChild(st);})();
(function(){const st=document.createElement('style');st.textContent=`
#panel details.diary{background:#f5ebdc;border:2px solid #c9b08e;box-shadow:inset 0 0 0 2px #fffaf1;margin:6px 0;padding:0 10px}
#panel details.diary summary{list-style:none;cursor:pointer;padding:9px 0;display:flex;align-items:center;gap:8px;color:#3e2c28}
#panel details.diary summary::-webkit-details-marker{display:none}
#panel details.diary summary::before{content:'';width:0;height:0;border-left:6px solid #a8846a;border-top:5px solid transparent;border-bottom:5px solid transparent;transition:transform .15s}
#panel details.diary[open] summary::before{transform:rotate(90deg)}
#panel details.diary[open]{padding-bottom:10px}
#panel details.diary .story{line-height:1.75;margin:2px 0 8px}
`;document.head.appendChild(st);})();
