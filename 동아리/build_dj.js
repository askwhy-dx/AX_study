const fs = require('fs');
const rows = [
  { no:'01', name:'실적·이벤트 성과 집계', sub:'무료진단 등',
    work:'일일/주간 실적 및 무료진단 이벤트 성과 데이터 요약 및 보고서 작성',
    stage:'1~2단계',
    as:[ {s:'1단계', t:'정해진 프롬프트로 담당자가 직접 AI에 수치·텍스트 정리를 지시'},
         {s:'2단계', t:'시트/템플릿을 고정 자료로 활용해 기준을 맞춤'} ] },
  { no:'02', name:'휴회 현황 분석', sub:'센터별 / 사유별',
    work:'센터/학부모 요청 휴회 사유 분류, 센터별·과목별 휴회율 추이 및 이탈 원인 분석',
    stage:'1~2단계',
    as:[ {s:'1단계', t:'담당자가 사유를 분류해 AI에 개별 분석을 지시'},
         {s:'2단계', t:'휴회 관리 시트를 근거 자료로 사용'} ] },
  { no:'03', name:'센터 / 블로그 모니터링', sub:'',
    work:'센터별 월 포스팅 건수 확인(목표달성률 체크) 및 블로그 운영 상태 점검',
    stage:'2단계',
    as:[ {s:'2단계', t:'기준 문서·DB 데이터를 근거로 담당자가 주기적으로 직접 점검을 지시'} ] },
  { no:'04', name:'마케팅 / 블로그 포스팅 지원', sub:'',
    work:'센터 홍보용 마케팅 문구, 블로그 포스팅 초안 작성 및 기획',
    stage:'1단계',
    as:[ {s:'1단계', t:'담당자가 필요시 개별 프롬프트로 문구·원고 초안 생성'} ] },
];
function stageColor(st){ if(st.startsWith('1~2')) return '#2b8fa3'; if(st.startsWith('2')) return '#2b9a7e'; return '#2f7fb8'; }
function stepColor(s){ return s.startsWith('2') ? '#2b8fa3' : '#2f7fb8'; }
const rowHtml = rows.map(r => `
  <div class="row">
    <div class="c1">
      <div class="no">${r.no}</div>
      <div class="nm"><b>${r.name}</b>${r.sub?`<span>${r.sub}</span>`:''}
        <em class="st" style="--c:${stageColor(r.stage)}">${r.stage}</em></div>
    </div>
    <div class="c2"><div class="lb">업무 내용</div><p>${r.work}</p></div>
    <div class="c3"><div class="lb">현재 방식 <i>(As-Is)</i></div>
      ${r.as.map(a=>`<div class="asline"><span class="tag" style="--c:${stepColor(a.s)}">${a.s}</span><p>${a.t}</p></div>`).join('')}
    </div>
  </div>`).join('');

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
.dnum b{font-size:33px;line-height:1}.dnum i{font-size:14px;font-style:normal;font-weight:800;margin-top:4px}
.dtit{flex:1}
.dtit h2{font-size:46px;font-weight:800;color:#14304a;letter-spacing:-1.2px}
.dtit p{font-size:23px;color:#54687a;margin-top:9px;line-height:1.5}
.dstep{font-size:18px;font-weight:800;color:#7d8d99;text-align:right;width:230px;line-height:1.5}

.thead{display:flex;gap:20px;margin-top:30px;padding:0 26px}
.thead .h{font-size:17px;font-weight:800;color:#8296a6;letter-spacing:.3px}
.thead .h1{width:430px;flex:none}.thead .h2{flex:1}.thead .h3{flex:1.15}

.rows{flex:1;display:flex;flex-direction:column;gap:15px;margin-top:12px}
.row{flex:1;display:flex;gap:20px;align-items:stretch;background:#fdfefd;border:1.5px solid #e0e8ee;
  border-radius:16px;padding:20px 26px}
.c1{width:430px;flex:none;display:flex;align-items:center;gap:18px;border-right:1.5px solid #eef2f5;padding-right:20px}
.no{width:52px;height:52px;flex:none;border-radius:12px;background:#eef6fc;border:1.5px solid #cfe4f4;
  display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:800;color:#2f7fb8}
.nm{display:flex;flex-direction:column;gap:3px}
.nm b{font-size:24px;font-weight:800;color:#12303f;line-height:1.25}
.nm span{font-size:16px;color:#7d8d99;font-weight:700}
.nm .st{align-self:flex-start;margin-top:6px;font-size:15px;font-weight:800;color:#fff;background:var(--c);
  border-radius:20px;padding:4px 14px;font-style:normal}
.c2,.c3{flex:1;display:flex;flex-direction:column;justify-content:center}
.c3{flex:1.15;border-left:1.5px solid #eef2f5;padding-left:20px}
.lb{font-size:14.5px;font-weight:800;color:#9aabb8;margin-bottom:9px}
.lb i{font-style:normal;color:#b7c4ce;font-weight:700}
.c2 p{font-size:19px;color:#3c4b5a;line-height:1.55;font-weight:600}
.c3 .asline{display:flex;gap:12px;align-items:flex-start;margin-top:9px}
.c3 .asline:first-of-type{margin-top:0}
.c3 .tag{flex:none;font-size:14px;font-weight:800;color:#fff;background:var(--c);border-radius:8px;padding:3px 11px;margin-top:2px}
.c3 .asline p{font-size:18px;color:#4b5c68;line-height:1.5}

.foot{margin-top:22px;display:flex;align-items:flex-end;justify-content:space-between}
.cred{font-size:17px;color:#7d8d99;font-weight:700}
</style></head><body>
<div class="sheet">
<svg class="topo" viewBox="0 0 1920 1080" preserveAspectRatio="none">
 <defs><path id="bl" d="M0,-100 C55,-100 100,-55 100,0 C100,62 38,106 -16,100 C-72,94 -106,48 -100,-6 C-94,-62 -56,-100 0,-100 Z"/></defs>
 <g fill="none" stroke="#dae4ea" stroke-width="2"><g transform="translate(1660,940)">
  <use href="#bl" transform="scale(.6)"/><use href="#bl" transform="scale(1) rotate(6)"/>
  <use href="#bl" transform="scale(1.5) rotate(-5)"/><use href="#bl" transform="scale(2.05) rotate(4)"/></g></g>
 <g fill="none" stroke="#e2ebe4" stroke-width="2"><g transform="translate(120,140)">
  <use href="#bl" transform="scale(.5) rotate(10)"/><use href="#bl" transform="scale(.9) rotate(-6)"/></g></g>
</svg>
<div class="page">
  <div class="dhead">
    <div class="dnum"><b>직영</b><i>사업팀</i></div>
    <div class="dtit"><h2>AI 활용 업무 현황 — 현재 방식</h2>
      <p>직영사업팀 주요 AI 업무의 <b>현재 단계와 진행 방식(As-Is)</b>을 정리했다. 1~2단계 업무는 <b>단계별로 구분</b>해 표기했다.</p></div>
    <div class="dstep">현재 운영 기준<br>4개 업무</div>
  </div>

  <div class="thead"><div class="h h1">구분 (업무명) · 현재 단계</div><div class="h h2">업무 내용</div><div class="h h3">현재 방식 (As-Is) · 단계 구분</div></div>
  <div class="rows">${rowHtml}
  </div>

  <div class="foot"><div class="cred">직영사업팀 · AI 업무 현황</div><div class="cred">현재 방식 (As-Is) 기준 · 1단계 프롬프트 / 2단계 컨텍스트</div></div>
</div>
</div>
</body></html>`;
fs.writeFileSync('직영사업팀_AI업무현황_현재방식.html', html, 'utf8');
console.log('OK dj html', html.length);
