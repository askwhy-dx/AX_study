// 마컴팀 페이지 렌더 → 통합 덱(요약추가.pdf) 끝(마지막 팀 뒤)에 이어붙임
const { chromium } = require('C:/Users/User/Desktop/test/node_modules/playwright');
const { PDFDocument } = require('C:/Users/User/Desktop/test/node_modules/pdf-lib');
const { pathToFileURL } = require('url');
const path = require('path');
const fs = require('fs');

const SRC = 'team_마컴팀_full.html';
const TEAM_PDF = 'team_마컴팀.pdf';
const DECK = 'AI에이전트_업무_4단계_07.22_요약추가.pdf';

const CSS_W = 1920, PX = 96, w = 13.3333, h = 7.5, scale = (w * PX) / CSS_W;
const FIT = () => { const f = document.querySelector('.fit'); const top = f.getBoundingClientRect().top;
  const avail = 1080 - top - 30; const nat = f.scrollHeight; const sc = nat > avail ? avail / nat : 1;
  f.style.height = (avail / sc) + 'px'; if (sc < 1) f.style.transform = `scale(${sc})`; return sc; };

(async () => {
  // 1) 렌더 (기존 render_teams.js와 동일 설정 + FIT)
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 2 });
  await p.goto(pathToFileURL(path.resolve(SRC)).href);
  await p.waitForTimeout(250);
  const sc = await p.evaluate(FIT);
  await p.waitForTimeout(120);
  await p.pdf({ path: TEAM_PDF, width: w + 'in', height: h + 'in', scale, printBackground: true,
    margin: { top: '0', bottom: '0', left: '0', right: '0' } });
  await b.close();
  console.log(`렌더 완료: ${TEAM_PDF} (fit scale ${sc.toFixed(3)})`);

  // 2) 통합 덱 갱신 — 이전에 붙인 마컴 페이지(맨 끝 1쪽)를 제거한 뒤 새로 append (중복 방지)
  //    ⚠️ 전제: 덱의 마지막 1쪽이 마컴팀 페이지다. 최초 18쪽(마컴 없음) 상태에서 돌리면 교육팀이 지워지니 주의.
  const REPLACE_LAST = true;
  const deck = await PDFDocument.load(fs.readFileSync(DECK));
  const before = deck.getPageCount();
  if (REPLACE_LAST) deck.removePage(deck.getPageCount() - 1);
  const team = await PDFDocument.load(fs.readFileSync(TEAM_PDF));
  const pgs = await deck.copyPages(team, team.getPageIndices());
  pgs.forEach(pg => deck.addPage(pg));
  fs.writeFileSync(DECK, await deck.save());
  console.log(`갱신 완료: ${before}쪽 → ${deck.getPageCount()}쪽 (마지막 마컴 쪽 교체)`);
})();
