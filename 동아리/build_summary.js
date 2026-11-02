const fs = require('fs');
const html = `<!doctype html><html lang="ko"><head><meta charset="utf-8"><style>
@page{margin:0}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1920px;font-family:"Malgun Gothic","맑은 고딕",sans-serif;color:#1f2937;word-break:keep-all}
.sheet{width:1920px;height:1080px;position:relative;overflow:hidden;background:#f3f6f4}
.topo{position:absolute;inset:0;z-index:0}
.page{position:relative;z-index:2;height:100%;padding:28px 46px 20px;display:flex;flex-direction:column}
h1{font-size:42px;font-weight:800;text-align:center;letter-spacing:-1.2px;color:#14304a}
.en{font-size:21px;font-weight:700;text-align:center;color:#41607a;margin-top:4px}
.lead{font-size:18px;text-align:center;color:#54687a;margin-top:7px;line-height:1.45}
.matrix{flex:1;display:flex;flex-direction:column;min-height:0;background:#f9fbfa;
  border:1px solid #e9eff1;border-radius:20px;padding:13px 18px 13px;margin-top:14px}
.chevrons{display:flex;gap:12px;padding-left:118px}
.col{flex:1;min-width:0}
.chip{text-align:center;font-size:16px;font-weight:800;color:#3c4b5a;background:#fdfefd;
  border:1.5px solid #cdd8e2;border-radius:8px;padding:3px 0;margin-bottom:5px}
.chev{height:56px;display:flex;align-items:center;justify-content:center;text-align:center;
  font-size:24px;font-weight:800;line-height:1.14;color:#12303f;padding:0 30px 0 14px;margin-right:-12px;
  clip-path:polygon(0 0,calc(100% - 26px) 0,100% 50%,calc(100% - 26px) 100%,0 100%);
  background:linear-gradient(180deg,var(--c1),var(--c2))}
.band{display:flex;gap:12px;padding-left:118px;position:relative;margin-top:11px}
.band.b1{flex:1.5;min-height:0}
.band.b2{flex:1;min-height:0}
.band.b3{flex:.52;min-height:0}
.lab{position:absolute;left:0;top:0;bottom:0;width:112px;display:flex;
  align-items:center;justify-content:center;font-size:20px;font-weight:800;color:#4a5c6b;text-align:center;line-height:1.25}
.sep{height:0;border-top:2.5px dotted #b9c8d4;margin-top:10px;margin-left:118px}
.cell{flex:1;min-width:0;display:flex;flex-direction:column;align-items:center;justify-content:center;
  border-radius:14px;padding:13px 16px;background:var(--soft);border:1.5px solid var(--line)}
.cell.now{border:2.5px dashed #d97b1e;background:#fff3e2}
.ttl{font-size:21px;font-weight:800;color:#12303f;text-align:center;line-height:1.22}
.txt{font-size:16.5px;color:#4b5c68;margin-top:7px;text-align:center;line-height:1.4}
.ex{margin-top:10px;width:100%;font-size:15px;color:#3d5566;background:#ffffff;border:1px solid #e2ebf0;
  border-radius:10px;padding:8px 12px;line-height:1.4;text-align:left}
.ex b{color:#2f7fb8;margin-right:4px}
.b2 .ttl{color:#8a3b28;font-size:20px}
.badge{display:inline-block;font-size:14px;font-weight:800;color:#fff;background:#d97b1e;
  border-radius:20px;padding:3px 12px;margin-top:8px}
.b3 .cell{flex-direction:row;gap:9px;align-items:center;padding:8px 16px;background:#fff7ec;border-color:#f0d9b8}
.b3 .cell.cur{background:#eef8f0;border-color:#bfe0c6}
.b3 .lim{font-size:16.5px;color:#7a5a2a;line-height:1.35;font-weight:700;text-align:left}
.b3 .cell.cur .lim{color:#2f6a44}
.b3 .nx{flex:none;font-size:15px;font-weight:800;color:#fff;background:#c98a3a;border-radius:8px;padding:4px 10px;white-space:nowrap}
.foot{margin-top:11px;display:flex;align-items:flex-end;justify-content:space-between}
.sum{font-size:22px;font-weight:800;color:#1d3b52;text-align:center;flex:1}
.cred{font-size:15.5px;color:#7d8d99;font-weight:700;width:250px}
.cred.r{text-align:right}
</style></head><body>
<div class="sheet">
<svg class="topo" viewBox="0 0 1920 1080" preserveAspectRatio="none">
 <defs><path id="bl" d="M0,-100 C55,-100 100,-55 100,0 C100,62 38,106 -16,100 C-72,94 -106,48 -100,-6 C-94,-62 -56,-100 0,-100 Z"/></defs>
 <g fill="none" stroke="#d5e3d9" stroke-width="2"><g transform="translate(1600,250)">
  <use href="#bl" transform="scale(.5)"/><use href="#bl" transform="scale(.85) rotate(8)"/><use href="#bl" transform="scale(1.25) rotate(-6)"/>
  <use href="#bl" transform="scale(1.7) rotate(4)"/><use href="#bl" transform="scale(2.2) rotate(-9)"/></g></g>
 <g fill="none" stroke="#d7e3e8" stroke-width="2"><g transform="translate(160,900)">
  <use href="#bl" transform="scale(.5) rotate(12)"/><use href="#bl" transform="scale(.9) rotate(-5)"/><use href="#bl" transform="scale(1.35) rotate(7)"/></g></g>
</svg>
<div class="page">
  <h1>네 단계 한눈에 : AI가 하는 일과 사람의 역할</h1>
  <div class="en">(What AI Does · What Humans Do)</div>
  <div class="lead">1~4단계를 한 장으로 — <b>AI가 하는 일</b>, <b>사람의 역할</b>, 단계별 <b>예시</b>와 <b>다음 단계로 넘어가는 이유</b>까지 담았다</div>

  <div class="matrix">
    <div class="chevrons">
      <div class="col"><div class="chip">1단계</div><div class="chev" style="--c1:#bfe0f7;--c2:#8fc6ee">프롬프트 엔지니어링</div></div>
      <div class="col"><div class="chip">2단계</div><div class="chev" style="--c1:#bdeaf0;--c2:#8bd6e2">컨텍스트 엔지니어링</div></div>
      <div class="col"><div class="chip">3단계</div><div class="chev" style="--c1:#cdeccd;--c2:#9dd8a4">에이전틱 AI</div></div>
      <div class="col"><div class="chip">4단계 · 현재</div><div class="chev" style="--c1:#fdd3ac;--c2:#f7ac6a">하네스 엔지니어링</div></div>
    </div>

    <div class="band b1">
      <div class="lab">AI가<br>하는 일</div>
      <div class="cell" style="--soft:#eef7fd;--line:#bcdcf2">
        <div class="ttl">지시문대로 정확히</div>
        <div class="txt">기준·금지·보고형식을 문서로 못박아, 매 실행이 그 문서를 읽는다 — 매번 같은 답</div>
        <div class="ex"><b>예</b>화면 점검 14개 항목과 합격 기준(오차 허용 범위까지)을 문서로 고정 — 담당자·회차가 달라져도 같은 잣대로 검사</div></div>
      <div class="cell" style="--soft:#edfafc;--line:#b3e2ea">
        <div class="ttl">정해진 근거만 보고</div>
        <div class="txt">정답이 하나로 고정된 자료만 참조 — 여러 곳에서 따로 계산해 어긋나는 일이 없다</div>
        <div class="ex"><b>예</b>화면·검사기·봇이 '집계 결과 파일 하나'만 공유하고, 기준값은 설정 파일 한 곳에서 관리</div></div>
      <div class="cell" style="--soft:#f0faf1;--line:#bde5c1">
        <div class="ttl">스스로 계획·실행·복구</div>
        <div class="txt">화면을 직접 눌러보고 DB를 조회해 재구성, 문제를 진단해 자가복구까지 스스로 돈다</div>
        <div class="ex"><b>예</b>검사 실패 시 진단 → 조치 → 복구 → 재검증을 최대 3회 스스로 반복</div></div>
      <div class="cell now">
        <div class="ttl">울타리 안에서만 자율</div>
        <div class="txt">허용된 파일·횟수만 손대고, 재검사를 통과해야 발행 · 실패하면 되돌린다</div>
        <div class="ex"><b>예</b>편집 허용은 설정·화면 파일 1~2개뿐, 조치는 정해진 메뉴에서만 선택</div></div>
    </div>

    <div class="sep"></div>

    <div class="band b2">
      <div class="lab">사람의<br>역할</div>
      <div class="cell" style="--soft:#fbfcfb;--line:#d8e3ec">
        <div class="ttl">기준을 문장으로 확정</div>
        <div class="txt">판단 기준과 하지 말아야 할 것을 문서로 못박는다 — 이 문장이 곧 품질의 상한선</div></div>
      <div class="cell" style="--soft:#fbfcfb;--line:#d8e3ec">
        <div class="ttl">정답 자료를 한 곳에서</div>
        <div class="txt">어느 숫자가 정답인지 한 곳(SSOT)에서만 관리 — 기준이 둘이면 답이 갈린다</div></div>
      <div class="cell" style="--soft:#fbfcfb;--line:#d8e3ec">
        <div class="ttl">결과와 근거만 확인</div>
        <div class="txt">직접 하지 않고 AI의 결과와 근거를 검토·승인한다</div></div>
      <div class="cell" style="--soft:#fbfcfb;--line:#eccfa0">
        <div class="ttl">선을 정하고 예외 승인</div>
        <div class="txt">범위·횟수·되돌림을 설계하고, 핵심 기준 변경은 100% 사람이 최종 승인</div></div>
    </div>

    <div class="band b3">
      <div class="lab">한계·<br>다음으로</div>
      <div class="cell"><div class="lim">자료가 흩어지면 답이 흔들린다</div><span class="nx">2단계로</span></div>
      <div class="cell"><div class="lim">사람이 매번 실행 버튼을 눌러야 한다</div><span class="nx">3단계로</span></div>
      <div class="cell"><div class="lim">자율이 커질수록 잘못 고칠 위험</div><span class="nx">4단계로</span></div>
      <div class="cell cur"><div class="lim">이 설계가 있어야 안전하게 맡길 수 있다</div></div>
    </div>
  </div>

  <div class="foot">
    <div class="cred">4단계 요약 · AI가 하는 일과 사람의 역할</div>
    <div class="sum">단계가 오를수록 AI 자율은 커지고, 사람은 지시 → 설계 → 감독 → 승인으로</div>
    <div class="cred r">회의록 예시 다음</div>
  </div>
</div>
</div>
</body></html>`;
fs.writeFileSync('summary_page.html', html, 'utf8');
console.log('OK summary html', html.length);
