const fs = require('fs');
const cols = [
  { chip:'1단계', name:'프롬프트 엔지니어링', c1:'#bfe0f7', c2:'#8fc6ee', ac:'#2f7fb8',
    soft:'#eef7fd', line:'#bcdcf2', ic:'📝', title:'정한 양식대로 쓴다',
    desc:'회의록 양식과 규칙을 문서로 정해두고, 녹취록을 주면 그대로 작성하게 한다. 지어내기 금지.',
    exs:['애매한 발언은 꾸미지 않고 <b>[확인 필요]</b>로 표시',
         '"검토하자"는 논의, "다음주까지 하자"는 <b>결정</b>으로 구분',
         '숫자는 반올림·요약 없이 <b>발언 그대로</b> 기재'] },
  { chip:'2단계', name:'컨텍스트 엔지니어링', c1:'#bdeaf0', c2:'#8bd6e2', ac:'#2b8fa3',
    soft:'#edfafc', line:'#b3e2ea', ic:'📁', title:'정한 자료만 보고 쓴다',
    desc:'참석자 명단·용어 사전·지난 회의록 딱 3개만 보여준다. 볼 것이 적을수록 답이 안 흔들린다.',
    exs:['"에프씨"라고 말해도 사전을 보고 <b>FC 대시보드</b>로 표기',
         '명단을 보고 "김대리"가 <b>어느 김대리</b>인지 정확히 표기',
         '"지난번 그 건"을 지난 회의록에서 찾아 <b>안건명으로 연결</b>'] },
  { chip:'3단계', name:'에이전틱 AI', c1:'#cdeccd', c2:'#9dd8a4', ac:'#2f8a48',
    soft:'#f0faf1', line:'#bde5c1', ic:'🤖', title:'회의 끝나면 알아서 쓴다',
    desc:'녹음이 올라오면 스스로 초안을 쓰고 스스로 검사한다 — 참석자 누락, 기한 빠진 할 일, 근거 없는 문장까지.',
    exs:['담당자·기한이 빠진 할 일을 <b>스스로 찾아 표시</b>',
         '결정 문장마다 <b>실제 발언 위치(녹취 시각)</b>를 근거로 첨부',
         '지난 회의의 할 일이 <b>처리됐는지 자동 점검</b>해 표에 반영'] },
  { chip:'4단계', name:'하네스 엔지니어링', c1:'#fdd3ac', c2:'#f7ac6a', ac:'#c4702a',
    soft:'#fff3e2', line:'#f6cfa8', ic:'🔒', title:'넘지 못할 선을 정한다', now:true,
    badge:'이 선이 있어야 맡길 수 있다',
    desc:'AI는 초안과 근거까지만. 결정사항 확정과 배포는 회의 주재자만. 수정 시도 1회, 안 되면 사람을 부른다.',
    exs:['인사·개인 관련 발언 기재 여부는 <b>100% 사람이 판단</b>',
         '<b>최종본 발송 버튼은 AI에게 없다</b> — 주재자만 누른다',
         '원본 녹취는 <b>읽기 전용</b> — AI가 고치거나 지울 수 없다'] },
];
const easy = [
  ['매뉴얼 받은 신입','시키는 대로 정확히 받아쓴다'],
  ['자료철 받은 신입','정해진 서류만 보고 쓴다'],
  ['믿고 맡기는 담당자','알아서 쓰고 스스로 검토한다'],
  ['결재선 안의 담당자','확정 도장은 항상 사람이 찍는다'],
];
const bigHtml = cols.map(c => `
  <div class="bcard${c.now?' now':''}" style="--soft:${c.soft};--line:${c.line};--ac:${c.ac}">
    ${c.badge?`<span class="cbadge">${c.badge}</span>`:''}
    <div class="ic">${c.ic}</div>
    <div class="bt">${c.title}</div>
    <div class="bd">${c.desc}</div>
    <div class="exs">
      ${c.exs.map(e=>`<div class="bex"><span class="k">예</span><span class="t">${e}</span></div>`).join('')}
    </div>
  </div>`).join('');
const easyHtml = easy.map(e => `<div class="ecard"><b>${e[0]}</b><span>${e[1]}</span></div>`).join('');
const chevHtml = cols.map(c => `<div class="col"><div class="chip">${c.chip}</div><div class="chev" style="--c1:${c.c1};--c2:${c.c2}">${c.name}</div></div>`).join('');

const html = `<!doctype html><html lang="ko"><head><meta charset="utf-8"><style>
@page{margin:0}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1920px;font-family:"Malgun Gothic","맑은 고딕",sans-serif;color:#1f2937;word-break:keep-all}
.sheet{width:1920px;height:1080px;position:relative;overflow:hidden;background:#f3f6f4}
.topo{position:absolute;inset:0;z-index:0}
.page{position:relative;z-index:2;height:100%;padding:30px 46px 22px;display:flex;flex-direction:column}
h1{font-size:44px;font-weight:800;text-align:center;letter-spacing:-1.2px;color:#14304a}
h1 em{font-style:normal;color:#c4702a}
.stage{flex:1;display:flex;gap:16px;margin-top:16px;min-height:0}
.matrix{flex:1;display:flex;flex-direction:column;min-width:0;background:#f9fbfa;
  border:1px solid #e9eff1;border-radius:20px;padding:14px 16px 12px}
.chevrons{display:flex;gap:12px;padding-left:118px}
.col{flex:1;min-width:0}
.chip{text-align:center;font-size:15px;font-weight:800;color:#3c4b5a;background:#fdfefd;
  border:1.5px solid #cdd8e2;border-radius:8px;padding:3px 0;margin-bottom:5px}
.chev{height:54px;display:flex;align-items:center;justify-content:center;text-align:center;
  font-size:22px;font-weight:800;line-height:1.12;color:#12303f;padding:0 28px 0 14px;margin-right:-12px;
  clip-path:polygon(0 0,calc(100% - 24px) 0,100% 50%,calc(100% - 24px) 100%,0 100%);
  background:linear-gradient(180deg,var(--c1),var(--c2))}
.band{display:flex;gap:12px;padding-left:118px;position:relative;margin-top:12px}
.band.big{flex:3.5;min-height:0}
.band.easy{flex:.82;min-height:0}
.lab{position:absolute;left:0;top:0;bottom:0;width:112px;display:flex;align-items:center;justify-content:center;
  font-size:19px;font-weight:800;color:#4a5c6b;text-align:center;line-height:1.3}
.bcard{flex:1;min-width:0;display:flex;flex-direction:column;position:relative;
  border-radius:16px;padding:16px 18px;background:var(--soft);border:1.5px solid var(--line)}
.bcard.now{border:2.5px dashed #d97b1e}
.cbadge{position:absolute;top:-13px;left:50%;transform:translateX(-50%);white-space:nowrap;
  font-size:14.5px;font-weight:800;color:#fff;background:#d97b1e;border-radius:20px;padding:4px 15px}
.ic{font-size:34px;line-height:1;text-align:center;margin-top:2px}
.bt{font-size:23px;font-weight:800;color:#12303f;text-align:center;margin-top:6px}
.bd{font-size:16px;color:#4b5c68;text-align:center;line-height:1.45;margin-top:8px}
.exs{flex:1;display:flex;flex-direction:column;justify-content:space-evenly;gap:9px;margin-top:12px}
.bex{display:flex;gap:10px;align-items:flex-start;background:#ffffff;border:1px solid #e4ecf1;
  border-radius:11px;padding:11px 13px}
.bex .k{flex:none;font-size:14px;font-weight:800;color:#fff;background:var(--ac);border-radius:7px;padding:3px 9px;margin-top:1px}
.bex .t{font-size:16px;color:#3f5361;line-height:1.42}
.bex .t b{color:#1f3a4d}
.ecard{flex:1;min-width:0;display:flex;flex-direction:column;align-items:center;justify-content:center;
  background:#fbfcfb;border:1.5px solid #dbe4ec;border-radius:13px;padding:10px 12px;text-align:center}
.ecard b{font-size:19px;font-weight:800;color:#2b4256}
.ecard span{font-size:15.5px;color:#6a7b88;margin-top:4px;line-height:1.35}
.side{width:330px;flex:none;display:flex;flex-direction:column;border-radius:20px;overflow:hidden;
  background:#fbfcfb;border:1px solid #e9eff1}
.side .hd{background:linear-gradient(180deg,#f6b352,#ef8f3c);padding:18px 16px;text-align:center;
  font-size:25px;font-weight:800;color:#3d2708;line-height:1.35}
.side .bd2{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px}
.flow{font-size:44px;letter-spacing:6px}
.side .big2{font-size:27px;font-weight:800;color:#2b4256;text-align:center;line-height:1.35;margin-top:14px}
.side .note{font-size:17.5px;color:#4b5c68;text-align:center;line-height:1.55;margin-top:16px}
.foot{margin-top:12px;display:flex;align-items:flex-end;justify-content:space-between}
.sum{font-size:21px;font-weight:800;color:#1d3b52;text-align:center;flex:1}
.cred{font-size:15.5px;color:#7d8d99;font-weight:700;width:230px}
.cred.r{text-align:right}
</style></head><body>
<div class="sheet">
<svg class="topo" viewBox="0 0 1920 1080" preserveAspectRatio="none">
 <defs><path id="bl" d="M0,-100 C55,-100 100,-55 100,0 C100,62 38,106 -16,100 C-72,94 -106,48 -100,-6 C-94,-62 -56,-100 0,-100 Z"/></defs>
 <g fill="none" stroke="#e6e2d6" stroke-width="2"><g transform="translate(1640,260)">
  <use href="#bl" transform="scale(.55)"/><use href="#bl" transform="scale(.95) rotate(7)"/><use href="#bl" transform="scale(1.4) rotate(-5)"/>
  <use href="#bl" transform="scale(1.9) rotate(4)"/></g></g>
</svg>
<div class="page">
  <h1>예시로 이해하는 4단계 : <em>회의록 자동화</em>라면</h1>

  <div class="stage">
    <div class="matrix">
      <div class="chevrons">${chevHtml}</div>
      <div class="band big"><div class="lab">회의록은<br>이렇게 된다</div>${bigHtml}</div>
      <div class="band easy"><div class="lab">쉽게<br>말하면</div>${easyHtml}</div>
    </div>

    <div class="side">
      <div class="hd">이 페이지에서<br>기억할 한 가지</div>
      <div class="bd2">
        <div class="flow">📄 ➜ ✅</div>
        <div class="big2">AI는 초안까지,<br>확정과 배포는 사람</div>
        <div class="note">단계가 올라갈수록 AI가 하는 일은 늘어나지만, <b>마지막 결정 권한은 끝까지 사람</b>에게 남는다</div>
      </div>
    </div>
  </div>

  <div class="foot">
    <div class="cred">사내 AI 에이전트 업무 소개</div>
    <div class="sum">받아쓰기 → 자료 고정 → 알아서 작성 → 울타리 안에서 — 회의록 하나로 보는 4단계</div>
    <div class="cred r">적용 예시 · 회의록 자동화</div>
  </div>
</div>
</div>
</body></html>`;
fs.writeFileSync('minutes_page.html', html, 'utf8');
console.log('OK minutes html', html.length);
