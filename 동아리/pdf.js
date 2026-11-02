// harness_deck.html → PDF (16:9 가로 5쪽)
//
// 사용법
//   node pdf.js            슬라이드 규격 13.333 x 7.5in (PPT 16:9) — 기본
//   node pdf.js a4         A4 가로. 16:9가 A4보다 납작해 위아래 여백이 생기며, 그만큼을 마진으로 줘 세로 중앙에 온다
//   node pdf.js raw        1920 x 1080px 원본 크기 (20인치짜리 큰 페이지)
//   node pdf.js slide --noview   페이지맞춤 열기 설정을 넣지 않는다
//
// 레이아웃은 항상 1920x1080 CSS px로 그린 뒤 scale 로 축소한다.
// (harness_deck.html 의 @page 에는 size 를 두지 않는다 — 두면 아래 프리셋을 덮어쓴다)
const { chromium } = require('C:/Users/User/Desktop/test/node_modules/playwright');
const path = require('path');
const fs = require('fs');

const SRC = 'harness_deck.html';
const OUT = 'AI에이전트_업무_4단계.pdf';

const CSS_W = 1920, CSS_H = 1080;   // 원고 크기
const PX_PER_IN = 96;               // CSS px → inch

// 프리셋: 물리 페이지 크기(in). scale = 페이지폭 / 원고폭
function preset(name) {
  if (name === 'raw') {
    return { label: '원본 1920x1080px', width: CSS_W + 'px', height: CSS_H + 'px', scale: 1, mv: 0 };
  }
  if (name === 'a4') {
    const w = 11.6929, h = 8.2677;                 // A4 가로
    const scale = (w * PX_PER_IN) / CSS_W;
    const used = CSS_H * scale / PX_PER_IN;        // 실제로 쓰는 세로(in)
    return { label: 'A4 가로', width: w + 'in', height: h + 'in', scale, mv: (h - used) / 2 };
  }
  const w = 13.3333, h = 7.5;                      // PPT 16:9 슬라이드
  return { label: '슬라이드 13.333x7.5in', width: w + 'in', height: h + 'in', scale: (w * PX_PER_IN) / CSS_W, mv: 0 };
}

/**
 * PDF 를 열 때 "페이지 맞춤"으로 보이게 한다.
 * 증분 업데이트(incremental update)로 Catalog 만 다시 쓴다 — 원본 바이트는 손대지 않는다.
 *   /OpenAction [1쪽 /Fit]   첫 화면부터 한 쪽이 창에 꽉 차게
 *   /PageLayout /SinglePage  한 번에 한 쪽씩 (연속 스크롤 아님)
 *   /ViewerPreferences /FitWindow  창을 문서 크기에 맞춤
 * ⚠ 뷰어의 "마지막 보기 상태 복원" 설정이 켜져 있으면 그쪽이 우선한다(Acrobat 기본값).
 */
function addFitToPage(file) {
  const buf = fs.readFileSync(file);
  const s = buf.toString('latin1');

  const tIdx = s.lastIndexOf('trailer');
  const sIdx = s.lastIndexOf('startxref');
  if (tIdx < 0 || sIdx < 0) throw new Error('xref 테이블을 못 찾았다 (xref stream 형식일 수 있음)');
  const trailer = s.slice(tIdx, sIdx);
  const prev = parseInt(s.slice(sIdx).match(/startxref\s+(\d+)/)[1], 10);
  const size = parseInt(trailer.match(/\/Size\s+(\d+)/)[1], 10);
  const root = parseInt(trailer.match(/\/Root\s+(\d+)\s+0\s+R/)[1], 10);
  const info = (trailer.match(/\/Info\s+(\d+)\s+0\s+R/) || [])[1];

  // Catalog → /Pages → /Kids 첫 항목 = 1쪽
  const cat = s.match(new RegExp('(?:^|\\n)' + root + ' 0 obj\\s*<<([\\s\\S]*?)>>\\s*endobj'));
  if (!cat) throw new Error('Catalog 객체를 못 찾았다');
  let body = cat[1].trim();
  if (/\/OpenAction/.test(body)) return { skipped: true };

  const pagesNum = body.match(/\/Pages\s+(\d+)\s+0\s+R/)[1];
  const pages = s.match(new RegExp('(?:^|\\n)' + pagesNum + ' 0 obj\\s*<<([\\s\\S]*?)>>\\s*endobj'));
  const first = pages[1].match(/\/Kids\s*\[\s*(\d+)\s+0\s+R/)[1];

  body += `\n/PageLayout /SinglePage\n/PageMode /UseNone`
        + `\n/ViewerPreferences <</FitWindow true>>`
        + `\n/OpenAction [${first} 0 R /Fit]`;

  const objOffset = buf.length;
  const newObj = Buffer.from(`\n${root} 0 obj\n<<${body}>>\nendobj\n`, 'latin1');
  const xrefOffset = objOffset + newObj.length;

  // xref 항목은 정확히 20바이트여야 한다
  const entry = (off) => String(off).padStart(10, '0') + ' 00000 n \n';
  const tail = Buffer.from(
    `xref\n0 1\n0000000000 65535 f \n${root} 1\n${entry(objOffset + 1)}` +
    `trailer\n<</Size ${size}\n/Root ${root} 0 R\n` +
    (info ? `/Info ${info} 0 R\n` : '') +
    `/Prev ${prev}>>\nstartxref\n${xrefOffset}\n%%EOF\n`, 'latin1');

  fs.writeFileSync(file, Buffer.concat([buf, newObj, tail]));
  return { firstPage: first, bytes: newObj.length + tail.length };
}

(async () => {
  const args = process.argv.slice(2);
  const P = preset(args.find(a => !a.startsWith('-')) || 'slide');
  const noView = args.includes('--noview');
  const out = path.join(__dirname, OUT);

  const b = await chromium.launch();
  const p = await b.newPage();
  await p.goto('file:///' + path.resolve(__dirname, SRC).replace(/\\/g, '/'));
  await p.waitForTimeout(600);
  await p.pdf({
    path: out,
    width: P.width, height: P.height, scale: P.scale,
    printBackground: true,
    margin: { top: P.mv + 'in', bottom: P.mv + 'in', left: '0', right: '0' },
  });
  await b.close();

  let view = '없음';
  if (!noView) {
    const r = addFitToPage(out);
    view = r.skipped ? '이미 있음' : `페이지맞춤 + 한 쪽씩 (1쪽=${r.firstPage} 0 R)`;
  }
  console.log(`OK  ${OUT}`);
  console.log(`    페이지 : ${P.label}  (scale ${P.scale.toFixed(4)}${P.mv ? `, 상하 여백 ${P.mv.toFixed(3)}in` : ''})`);
  console.log(`    열기설정: ${view}`);
  console.log(`    용량   : ${(fs.statSync(out).size / 1024).toFixed(0)} KB`);
})();
