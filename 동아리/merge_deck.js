const { PDFDocument } = require('C:/Users/User/Desktop/test/node_modules/pdf-lib');
const fs = require('fs');
(async () => {
  const base = await PDFDocument.load(fs.readFileSync('AI에이전트_업무_4단계_07.22.pdf'));
  const min  = await PDFDocument.load(fs.readFileSync('minutes_page.pdf'));
  const sum  = await PDFDocument.load(fs.readFileSync('summary_page.pdf'));
  const [m] = await base.copyPages(min, [0]);
  const [s] = await base.copyPages(sum, [0]);
  base.removePage(1); base.insertPage(1, m); base.insertPage(2, s);
  const teamPdfs = JSON.parse(fs.readFileSync('teams_pdfs.json','utf8'));
  const appends = [
    '직영사업팀_AI업무현황_현재방식.pdf',
    '와이즈만FC_프롬프트엔지니어링.pdf',
    '인사팀_프롬프트엔지니어링.pdf',
    ...teamPdfs,
  ];
  for (const f of appends) {
    const d = await PDFDocument.load(fs.readFileSync(f));
    const pgs = await base.copyPages(d, d.getPageIndices());
    pgs.forEach(p => base.addPage(p));
  }
  fs.writeFileSync('AI에이전트_업무_4단계_07.22_요약추가.pdf', await base.save());
  console.log('total pages', base.getPageCount());
})();
