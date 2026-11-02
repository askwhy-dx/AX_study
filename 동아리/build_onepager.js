const fs = require('fs');
const b64 = fs.readFileSync('dash_b64.txt','utf8').trim();
const img = 'data:image/png;base64,' + b64;
const html = `<!doctype html><html lang="ko"><head><meta charset="utf-8"><style>
@page{margin:0}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1920px;font-family:"Malgun Gothic","맑은 고딕",sans-serif;color:#1f2937;word-break:keep-all}
.sheet{width:1920px;height:1080px;position:relative;overflow:hidden;background:#f3f6f4}
.topo{position:absolute;inset:0;z-index:0}
.page{position:relative;z-index:2;height:100%;padding:52px 64px 40px;display:flex;flex-direction:column}

.dhead{display:flex;align-items:center;gap:22px}
.dnum{width:118px;height:104px;flex:none;border-radius:22px;display:flex;flex-direction:column;
  align-items:center;justify-content:center;color:#12303f;background:linear-gradient(180deg,#bfe0f7,#8fc6ee)}
.dnum b{font-size:27px;line-height:1;letter-spacing:-1px;white-space:nowrap}.dnum i{font-size:16px;font-style:normal;font-weight:800;margin-top:5px}
.dtit{flex:1}
.dtit h2{font-size:46px;font-weight:800;color:#14304a;letter-spacing:-1.2px}
.dtit p{font-size:23px;color:#54687a;margin-top:9px;line-height:1.5}
.dstep{font-size:18px;font-weight:800;color:#7d8d99;text-align:right;width:210px;line-height:1.5}

.dbody{flex:1;display:flex;align-items:center;gap:22px;margin-top:30px;min-height:0}

/* 좌측: 지시 카드 → 산출물 카드 (세로 흐름) */
.left{width:560px;flex:none;display:flex;flex-direction:column;align-items:stretch;gap:10px}
.card{display:flex;flex-direction:column;background:#fdfefd;border:1.5px solid var(--bd,#bcdcf2);
  border-radius:18px;padding:24px 28px}
.card .badge{align-self:flex-start;font-size:16px;font-weight:800;color:#fff;background:var(--bg,#2f7fb8);
  border-radius:20px;padding:5px 16px}
.card h4{font-size:26px;font-weight:800;color:#12303f;margin-top:14px;line-height:1.3}
.card p{font-size:19px;color:#4b5c68;margin-top:12px;line-height:1.6}
.card code{font-size:17px;background:#eef3f7;border:1px solid #d6e0e8;border-radius:7px;
  padding:2px 9px;color:#2b4256;font-family:Consolas,monospace}
.vdown{display:flex;justify-content:center;align-items:center;height:8px}

/* 가운데 연결 화살표 */
.conn{flex:none;display:flex;flex-direction:column;align-items:center;justify-content:center;width:66px}
.conn .lb{font-size:15px;font-weight:800;color:#8aa0b2;margin-bottom:6px;letter-spacing:.5px}

/* 우측: 대시보드(크게) */
.right{flex:1;min-width:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px}
.frame{width:100%;border:1px solid #d3dde5;border-radius:16px;overflow:hidden;background:#fff}
.frame img{width:100%;display:block}
.cap{font-size:18px;color:#54687a;font-weight:700;text-align:center}
.cap b{color:#2f7fb8}

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
    <div class="dnum"><b>와이즈만</b><i>FC</i></div>
    <div class="dtit"><h2>프롬프트 엔지니어링 — 한 번에 정확히 시키기</h2>
      <p>AI에게 무엇을, 어떤 기준으로 할지 지시하는 단계. 말로 하지 않고 <b>문서로 못박아</b> 매번 같은 답이 나오게 만든다.</p></div>
    <div class="dstep">지시는 사람이<br>판단은 AI가</div>
  </div>

  <div class="dbody">
    <div class="left">
      <div class="card">
        <span class="badge">업학테스트 / 과목,출고 분석 자료</span>
        <h4>한 문장으로 하루치 업무를 위임</h4>
        <p>필요한 정보를 추출한 <b>원본 데이터</b>를 제공한 후, 원하는 항목에 대해 <b>자료를 제작</b>한다 — <code>PPT 또는 대시보드</code>.</p></div>
      <div class="vdown">
        <svg width="42" height="30" viewBox="0 0 24 20"><path d="M12 2v13M6 11l6 6 6-6" fill="none" stroke="#7fa8c8" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      <div class="card" style="--bd:#bcdfd6;--bg:#2b9a7e">
        <span class="badge">산출물 / 대시보드</span>
        <h4>요청한 항목이 대시보드로 완성</h4>
        <p>제공한 원본 데이터를 바탕으로 지표·필터·추이를 갖춘 <b>대시보드가 자동 제작</b>된다 — 오른쪽이 실제 결과물.</p></div>
    </div>

    <div class="conn">
      <div class="lb">제작</div>
      <svg width="60" height="40" viewBox="0 0 30 20"><path d="M2 10h22M17 3l8 7-8 7" fill="none" stroke="#2b9a7e" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </div>

    <div class="right">
      <div class="frame"><img src="${img}"></div>
      <div class="cap">Gemini로 제작한 <b>와이즈만 FC 센터 스마트 관리 대시보드</b></div>
    </div>
  </div>

  <div class="foot"><div class="cred">1단계 · 프롬프트 엔지니어링</div><div class="cred">2 / 5</div></div>
</div>
</div>
</body></html>`;
fs.writeFileSync('가맹사업부_프롬프트엔지니어링.html', html, 'utf8');
console.log('OK html', html.length);
