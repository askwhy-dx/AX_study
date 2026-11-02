const { PDFDocument } = require('C:/Users/User/Desktop/test/node_modules/pdf-lib');
const fs = require('fs');
(async () => {
  const orig = await PDFDocument.load(fs.readFileSync('AI에이전트_업무_4단계_07.22.pdf'));
  const sum  = await PDFDocument.load(fs.readFileSync('summary_page.pdf'));
  const [pg] = await orig.copyPages(sum, [0]);
  orig.insertPage(2, pg); // index2 → 회의록(2쪽) 뒤, 3번째 페이지로
  const out = await orig.save();
  fs.writeFileSync('AI에이전트_업무_4단계_07.22_요약추가.pdf', out);
  console.log('pages now', orig.getPageCount());
})();
