const fs = require('fs');
const html = `<!doctype html><html lang="ko"><head><meta charset="utf-8"><style>
@page{margin:0}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1920px;font-family:"Malgun Gothic","맑은 고딕",sans-serif;color:#1f2937;word-break:keep-all}
.sheet{width:1920px;height:1080px;position:relative;overflow:hidden;background:#f3f6f4}
.topo{position:absolute;inset:0;z-index:0}
.page{position:relative;z-index:2;height:100%;padding:52px 64px 40px;display:flex;flex-direction:column}

.dhead{display:flex;align-items:center;gap:22px}
.dnum{width:104px;height:104px;flex:none;border-radius:22px;display:flex;flex-direction:column;
  align-items:center;justify-content:center;color:#12303f;background:linear-gradient(180deg,#bfe0f7,#8fc6ee)}
.dnum b{font-size:34px;line-height:1;letter-spacing:-1px}.dnum i{font-size:16px;font-style:normal;font-weight:800;margin-top:5px}
.dtit{flex:1}
.dtit h2{font-size:46px;font-weight:800;color:#14304a;letter-spacing:-1.2px}
.dtit p{font-size:23px;color:#54687a;margin-top:9px;line-height:1.5}
.dstep{font-size:18px;font-weight:800;color:#7d8d99;text-align:right;width:230px;line-height:1.5}

.dbody{flex:1;display:flex;align-items:stretch;gap:30px;margin-top:34px;min-height:0}

/* 좌측: 현황 카드 */
.left{width:600px;flex:none;display:flex;flex-direction:column;justify-content:center;gap:20px}
.card{display:flex;flex-direction:column;background:#fdfefd;border:1.5px solid #bcdcf2;
  border-radius:18px;padding:30px 32px}
.card .badge{align-self:flex-start;font-size:16px;font-weight:800;color:#fff;background:#2f7fb8;
  border-radius:20px;padding:6px 16px}
.card h4{font-size:32px;font-weight:800;color:#12303f;margin-top:16px;line-height:1.25}
.card p{font-size:20px;color:#4b5c68;margin-top:16px;line-height:1.65}
.stage{display:flex;align-items:center;gap:14px;background:#eef6fc;border:1.5px solid #cfe4f4;
  border-radius:14px;padding:18px 24px}
.stage .k{font-size:16px;font-weight:800;color:#2f7fb8}
.stage .v{font-size:21px;font-weight:800;color:#14304a}

/* 우측: 최근 활용 업무 리스트 */
.right{flex:1;min-width:0;display:flex;flex-direction:column}
.rtit{font-size:22px;font-weight:800;color:#14304a;margin-bottom:16px;display:flex;align-items:center;gap:10px}
.rtit .n{font-size:15px;font-weight:800;color:#fff;background:#8296a6;border-radius:20px;padding:3px 12px}
.tasks{flex:1;display:flex;flex-direction:column;gap:14px}
.task{flex:1;display:flex;align-items:center;gap:18px;background:#fdfefd;border:1.5px solid #dbe6ef;
  border-radius:14px;padding:16px 24px}
.cat{flex:none;font-size:15px;font-weight:800;color:#fff;background:var(--c);border-radius:10px;
  padding:9px 0;width:104px;text-align:center;line-height:1.2}
.tx b{font-size:22px;font-weight:800;color:#12303f;display:block;line-height:1.3}
.tx span{font-size:17px;color:#5a6b78;display:block;margin-top:5px;line-height:1.4}

.human{margin-top:24px;background:#fbfcfb;border:1.5px solid #d6e0e8;border-radius:14px;
  padding:16px 28px;display:flex;align-items:center;gap:20px}
.human .k{font-size:18px;font-weight:800;color:#fff;background:#2f7fb8;border-radius:20px;padding:7px 18px;flex:none}
.human .v{font-size:21px;font-weight:700;color:#2b4256;line-height:1.45}
.foot{margin-top:18px;display:flex;align-items:flex-end;justify-content:space-between}
.cred{font-size:17px;color:#7d8d99;font-weight:700}
</style></head><body>
<div class="sheet">
<svg class="topo" viewBox="0 0 1920 1080" preserveAspectRatio="none">
 <defs><path id="bl" d="M0,-100 C55,-100 100,-55 100,0 C100,62 38,106 -16,100 C-72,94 -106,48 -100,-6 C-94,-62 -56,-100 0,-100 Z"/></defs>
 <g fill="none" stroke="#dae4ea" stroke-width="2"><g transform="translate(1660,930)">
  <use href="#bl" transform="scale(.6)"/><use href="#bl" transform="scale(1) rotate(6)"/>
  <use href="#bl" transform="scale(1.5) rotate(-5)"/><use href="#bl" transform="scale(2.05) rotate(4)"/></g></g>
 <g fill="none" stroke="#e2ebe4" stroke-width="2"><g transform="translate(120,140)">
  <use href="#bl" transform="scale(.5) rotate(10)"/><use href="#bl" transform="scale(.9) rotate(-6)"/></g></g>
</svg>
<div class="page">
  <div class="dhead">
    <div class="dnum"><b>인사</b><i>팀</i></div>
    <div class="dtit"><h2>프롬프트 엔지니어링 — 필요할 때 묻고 답 받기</h2>
      <p>제도·규정·양식을 놓고 <b>AI에게 묻고 답을 받아</b> 실무에 바로 쓰는 단계. 반복 문의 응대와 문서 초안 작성의 시간을 줄인다.</p></div>
    <div class="dstep">묻는 사람은 담당자<br>정리는 AI가</div>
  </div>

  <div class="dbody">
    <div class="left">
      <div class="card">
        <span class="badge">인사팀 · AI 활용 현황</span>
        <h4>단순 질문과 답변</h4>
        <p>정해진 제도·규정을 놓고 <b>물어보고 답을 받는</b> 방식으로 활용한다. AI가 요건·절차·초안을 정리해 주면, 담당자는 <b>검토·확정</b>에 집중한다.</p></div>
    </div>

    <div class="right">
      <div class="rtit">최근 활용 업무 <span class="n">5</span></div>
      <div class="tasks">
        <div class="task"><span class="cat" style="--c:#2f7fb8">제도 안내</span>
          <div class="tx"><b>실업급여 수급 자격 및 고용보험 안내</b><span>수급 요건·신청 절차를 정리해 직원 문의에 안내</span></div></div>
        <div class="task"><span class="cat" style="--c:#2b9a7e">행정 해결</span>
          <div class="tx"><b>건강보험 피부양자 신청 반려 해결</b><span>반려 사유를 해석해 보완 서류·재신청 방법을 도출</span></div></div>
        <div class="task"><span class="cat" style="--c:#7c5cd0">문서 작성</span>
          <div class="tx"><b>창립기념식 컨셉 기안서 작성</b><span>행사 컨셉·구성안을 기안서 초안으로 작성</span></div></div>
        <div class="task"><span class="cat" style="--c:#d98a2b">실무 가이드</span>
          <div class="tx"><b>워크샵 간식 준비 가이드</b><span>인원·예산에 맞춘 품목·수량 준비 가이드</span></div></div>
        <div class="task"><span class="cat" style="--c:#b3577f">채용 리서치</span>
          <div class="tx"><b>학원강사 채용 — 대학 취업지원실 활용</b><span>채용 채널로 대학 취업지원실 접점·활용법 조사</span></div></div>
      </div>
    </div>
  </div>

  <div class="foot"><div class="cred">1단계 · 프롬프트 엔지니어링</div><div class="cred">인사팀</div></div>
</div>
</div>
</body></html>`;
fs.writeFileSync('인사팀_프롬프트엔지니어링.html', html, 'utf8');
console.log('OK hr html', html.length);
