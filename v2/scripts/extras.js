/* ═════════ 부집사의 방 꾸미기 (모리스 잡화점) · 도감 보상 ═════════ */
const DECOR={
 rug:{n:'러그',opts:{cream:{n:'크림 레이스 러그',p:60,sp:{nine:{pk:'OBR',i:3}}},rose:{n:'장미빛 앤티크 러그',p:90,sp:{nine:{pk:'OA3',i:74,sw:5,sh:4}}},green:{n:'숲빛 앤티크 러그',p:90,sp:{nine:{pk:'OA2',i:74,sw:5,sh:4}}},navy:{n:'남색 앤티크 러그',p:120,sp:{nine:{pk:'OA',i:74,sw:5,sh:4}}},wine:{n:'와인빛 테두리 러그',p:120,sp:{nine:{pk:'OA1',i:138,sw:5,sh:4}}}}},
 plant:{n:'화분',opts:{rose:{n:'분홍 장미 스탠드',p:40,sp:['SV',[67,68,10,28]]},yellow:{n:'노란 장미 스탠드',p:40,sp:['SV',[210,38,12,26]]},hydra:{n:'수국 화분',p:50,sp:['SV',[432,649,14,23]]},forget:{n:'물망초 꽃병',p:30,sp:['EV',[35,1592,10,23]]},fern:{n:'관엽 화분',p:30,sp:['EV',[0,1590,16,25]]}}},
 art:{n:'벽 그림',opts:{land:{n:'풍경화',p:120,ow:'land1'},cat:{n:'고양이 초상화',p:150,ow:'cat'},still:{n:'정물화',p:130,ow:'still'},map:{n:'북부 지도',p:160,ow:'map1'}}},
 lamp:{n:'스탠드',opts:{brass:{n:'놋쇠 스탠드',p:80,add:{k:'lamp',x:8,y:27,w:1,h:1}}}}};
function decorOf(slot){S.decor=S.decor||{};return S.decor[slot];}
function decorOwned(){S.decorOwn=S.decorOwn||[];return S.decorOwn;}
function applyDecor(){const a=AREAS.keep;if(!a)return;S.decor=S.decor||{};
  a.objs=a.objs.filter(o=>!o.decor);a._art=null;
  const art=decorOf('art');if(art){const o={k:'painting',x:3,y:18,w:2,h:2,walk:1,decor:1,dart:DECOR.art.opts[art].ow};a.objs.push(o);}
  const lp=decorOf('lamp');if(lp){const q=Object.assign({decor:1},DECOR.lamp.opts[lp].add);a.objs.push(q);for(let j=0;j<q.h;j++)for(let i=0;i<q.w;i++){const k=(q.y+j)*a.MW+q.x+i;a.blk[k]=1;a.otile[k]=q;}}
  if(typeof buildArea==='function'&&FSH_OK)buildArea(a);}
{const _f6=furnSprite0;furnSprite0=function(o,a){if(a&&a.id==='keep'&&!a.outdoor){const r=a.ROOMS.find(r=>r[0]==='myroom');if(r&&o.x>=r[2]&&o.x<r[2]+r[4]&&o.y>=r[3]&&o.y<r[3]+r[5]){
    if(o.k==='rug'&&decorOf('rug')){const sp=DECOR.rug.opts[decorOf('rug')].sp;return Object.assign({w:o.w,h:o.h},sp);}
    if(o.k==='plant'&&decorOf('plant')){const s=DECOR.plant.opts[decorOf('plant')].sp;return {raw:{pk:s[0],x:s[1][0],y:s[1][1],w:s[1][2],h:s[1][3]},w:1,h:2};}}}
  return _f6(o,a);};}
{const _wp=wallArtPlan;wallArtPlan=function(a){if(a.id==='keep'&&!a._art){const d=a.objs.find(o=>o.dart);if(d){const sv=OWFR[d.dart];const plan=_wp(a);const r=a.ROOMS.find(r=>r[0]==='myroom');
      if(sv&&r){const b=artBox('OW',sv[0],sv[1],sv[2],sv[3]);if(b){for(let i=plan.length-1;i>=0;i--){const p=plan[i];if(p.x>=r[2]*T&&p.x<(r[2]+r[4])*T&&p.y<(r[3]+3)*T)plan.splice(i,1);}plan.push({b,x:(r[2]+2)*T,y:r[3]*T+Math.round((40-b.h)/2)});}}return a._art=plan;}}return _wp(a);};}
setTimeout(()=>{try{if(S&&S.decor)applyDecor();}catch(e){}},2500);
/* 잡화점: 방 꾸미기 줄 */
{const _tp4=togglePanel;togglePanel=function(kind,arg,keep){_tp4(kind,arg,keep);if(kind!=='shop'||arg!=='gen')return;const p=$('#panel'),pin=p.querySelector('.pin')||p;if(pin.querySelector('.dgrid'))return;
  const own=decorOwned();let h=`<div class="sub">방 꾸미기 · 부집사의 방에 바로 놓아 드려요</div><div class="dgrid">`;
  for(const [slot,S_] of Object.entries(DECOR))for(const [k,o] of Object.entries(S_.opts)){const id=slot+':'+k,has=own.includes(id),on=decorOf(slot)===k;
    h+=`<div class="row"><div><div class="tn">${o.n} <small>${money(o.p)} · ${S_.n}</small></div></div>${on?'<span class="tw">놓여 있음</span>':has?`<button class="pbtn sm" data-dset="${id}">놓기</button>`:`<button class="pbtn sm" data-dbuy="${id}" ${S.coins<o.p?'disabled':''}>산다</button>`}</div>`;}
  pin.insertAdjacentHTML('beforeend',h+'</div>');
  pin.querySelectorAll('[data-dbuy]').forEach(b=>b.onclick=()=>{const [s,k]=b.dataset.dbuy.split(':'),o=DECOR[s].opts[k];if(S.coins<o.p)return toast('돈이 모자라다');S.coins-=o.p;decorOwned().push(b.dataset.dbuy);S.decor=S.decor||{};S.decor[s]=k;applyDecor();save();hud();toast(`«${o.n}»을 방에 놓았다`);togglePanel('shop','gen',true);});
  pin.querySelectorAll('[data-dset]').forEach(b=>b.onclick=()=>{const [s,k]=b.dataset.dset.split(':');S.decor=S.decor||{};S.decor[s]=k;applyDecor();save();togglePanel('shop','gen',true);});};}
/* 도감 보상: 수집 칸마다 절반 · 전부 모으면 보상 */
const BOOKRW={half:[60,'은화'],full:[300,'은화']};
{const _bh2=bookHtml;bookHtml=function(){let h=_bh2();S.bookRw=S.bookRw||{};
  h=h.replace(/<div class="cc">([^<]*)<b>(\d+) \/ (\d+)<\/b>/g,(m,nm,a,b)=>{a=+a;b=+b;const key=nm.trim();let btn='';
    if(b&&a>=b&&!S.bookRw[key+':full'])btn=`<button class="pbtn sm bkrw" data-bk="${key}:full">보상 ${money(BOOKRW.full[0])}</button>`;
    else if(b&&a*2>=b&&!S.bookRw[key+':half'])btn=`<button class="pbtn sm bkrw" data-bk="${key}:half">보상 ${money(BOOKRW.half[0])}</button>`;
    else if(S.bookRw[key+':full'])btn='<span class="tw">✓ 완성</span>';
    return `<div class="cc">${nm}<b>${a} / ${b}</b>${btn}`;});
  return h+'<p class="story">각 수집을 절반 모으면 60은화, 모두 모으면 30골드를 받아요.</p>';};}
{const _tp5=togglePanel;togglePanel=function(kind,arg,keep){_tp5(kind,arg,keep);const p=$('#panel');if(!p||p.hidden)return;p.querySelectorAll('[data-bk]').forEach(b=>b.onclick=()=>{const k=b.dataset.bk,amt=BOOKRW[k.split(':')[1]][0];S.bookRw[k]=S.day;S.coins+=amt;save();hud();toast(`도감 보상 <i>+${money(amt)}</i>`);togglePanel('menu','book',true);});};}
(function(){const st=document.createElement('style');st.textContent='#panel .bkrw{margin-top:4px;font-size:12px!important;min-height:26px!important;padding:3px 8px!important}';document.head.appendChild(st);})();
