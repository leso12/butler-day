/* ═════════ 준비 화면: 그림 시트·지도 다시 그리기가 모두 끝난 뒤에 화면을 보여 줌 (이어하기 렉 방지) ═════════ */
(function(){const st=document.createElement('style');st.textContent=`#bootov{position:fixed;inset:0;z-index:9999;background:#2a1c19;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;color:#f4ead8;font-family:inherit;transition:opacity .35s}
#bootov.hide{opacity:0;pointer-events:none}#bootov h1{font-size:22px;margin:0;color:#e8c98a;letter-spacing:.05em}#bootov .bar{width:min(260px,70vw);height:10px;border:2px solid #c9a45a;background:#3a2a24}#bootov .bar i{display:block;height:100%;width:0;background:#e8c98a;transition:width .25s}#bootov small{font-size:13px;opacity:.85}`;document.head.appendChild(st);
  const ov=document.createElement('div');ov.id='bootov';ov.innerHTML='<h1>부집사 에렌의 하루</h1><div class="bar"><i id="bootbar"></i></div><small id="boottx">그림을 불러오는 중…</small>';document.body.appendChild(ov);
  let lastBuild=performance.now();{const _b=buildArea;buildArea=function(a){lastBuild=performance.now();return _b.apply(this,arguments);};}
  const ok=f=>{try{return !!f();}catch(e){return true;}};
  const checks=[()=>FSH_OK,()=>WFOK,()=>WF2OK,()=>TWOK,()=>W6N>=13,()=>FSHEET.OA&&FSHEET.OA.img,()=>Object.values(RP).every(r=>r.ok),()=>Object.values(HOE).every(r=>r.ok),()=>Object.values(SDVIMG).every(r=>r.ok),()=>Object.values(M4IMG).every(r=>r.ok!==false)];
  let t0=performance.now(),until=0,shown=true;
  function show(tx,minMs){ov.classList.remove('hide');shown=true;t0=performance.now();until=t0+(minMs||0);document.getElementById('boottx').textContent=tx;}
  function tick(){const now=performance.now();if(shown){const n=checks.filter(ok).length,quiet=now-lastBuild>600,all=n===checks.length;document.getElementById('bootbar').style.width=Math.round((n+(quiet?1:0))/(checks.length+1)*100)+'%';
      if((all&&quiet&&now>until)||now-t0>25000){ov.classList.add('hide');shown=false;}}requestAnimationFrame(tick);}
  requestAnimationFrame(tick);
  /* 이어하기·불러오기·새 게임 직후에도 다시 그리기가 끝날 때까지 가림 */
  document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('#tcont,#tnew');if(b)setTimeout(()=>{lastBuild=performance.now();show('불러오는 중…',500);},0);});
  document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-load],[data-slot],.slot button');if(b&&/불러|이어/.test(b.textContent))setTimeout(()=>{lastBuild=performance.now();show('불러오는 중…',500);},0);});
})();
