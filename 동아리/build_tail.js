// 통합 덱 꼬리 재조립: base18(원본 18쪽) + 마컴팀 + 스터디 1회차 정리
// - 재실행해도 중복되지 않음(항상 base18에서 다시 쌓음)
// - _deck_base18.pdf 가 없으면 현재 덱 앞 18쪽에서 1회 추출(마컴은 19쪽이므로 안전)
const { chromium } = require('C:/Users/User/Desktop/test/node_modules/playwright');
const { PDFDocument } = require('C:/Users/User/Desktop/test/node_modules/pdf-lib');
const { pathToFileURL } = require('url');
const path = require('path');
const fs = require('fs');

const DECK = 'AI에이전트_업무_4단계_07.22_요약추가.pdf';
const BASE = '_deck_base18.pdf';
const CSS_W = 1920, PX = 96, w = 13.3333, h = 7.5, scale = (w * PX) / CSS_W;

const FIT = () => { const f = document.querySelector('.fit'); if (!f) return 1;
  const top = f.getBoundingClientRect().top; const avail = 1080 - top - 30; const nat = f.scrollHeight;
  const sc = nat > avail ? avail / nat : 1; f.style.height = (avail / sc) + 'px';
  if (sc < 1) f.style.transform = `scale(${sc})`; return sc; };

async function render(b, src, out, useFit) {
  const p = await b.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 2 });
  await p.goto(pathToFileURL(path.resolve(src)).href);
  await p.waitForTimeout(280);
  if (useFit) await p.evaluate(FIT);
  await p.waitForTimeout(120);
  await p.pdf({ path: out, width: w + 'in', height: h + 'in', scale, printBackground: true,
    margin: { top: '0', bottom: '0', left: '0', right: '0' } });
  await p.close();
  console.log(`  렌더: ${out}`);
}

(async () => {
  // base18 확보 (1회)
  if (!fs.existsSync(BASE)) {
    const cur = await PDFDocument.load(fs.readFileSync(DECK));
    const n = Math.min(18, cur.getPageCount());
    const base = await PDFDocument.create();
    const pgs = await base.copyPages(cur, [...Array(n).keys()]);
    pgs.forEach(p => base.addPage(p));
    fs.writeFileSync(BASE, await base.save());
    console.log(`base 추출(1회): 현재 덱 앞 ${n}쪽 → ${BASE}`);
  }

  // 꼬리 페이지 렌더
  const b = await chromium.launch();
  await render(b, 'team_마컴팀_full.html', 'team_마컴팀.pdf', true);
  await render(b, 'study_summary.html', 'study_summary.pdf', false);
  await b.close();

  // 조립
  const deck = await PDFDocument.load(fs.readFileSync(BASE));
  for (const f of ['team_마컴팀.pdf', 'study_summary.pdf']) {
    const d = await PDFDocument.load(fs.readFileSync(f));
    const pgs = await deck.copyPages(d, d.getPageIndices());
    pgs.forEach(p => deck.addPage(p));
  }
  fs.writeFileSync(DECK, await deck.save());
  console.log(`덱 조립 완료: ${deck.getPageCount()}쪽 (base18 + 마컴 + 스터디)`);
})();
