// 부분 C — 조립: A(parse) -> B(grade) -> C(render) 순으로 불러 report.html 을 저장한다.
const fs = require('fs');
const path = require('path');
const { parseScores } = require('./parse');
const { calculateGrades } = require('./grade.js');
const { renderReport } = require('./render');

function main() {
  // A: [{ name, scores: [국어, 수학, 영어], korean, math, english }]
  const students = parseScores(path.join(__dirname, 'scores.csv'));

  // B: 평균 · 등급 붙이기 (A 의 출력을 그대로 넘긴다)
  const graded = calculateGrades(students);

  // C: HTML 만들고 저장
  const html = renderReport(graded);
  const outPath = path.join(__dirname, 'report.html');
  fs.writeFileSync(outPath, html, 'utf8');
  console.log(`report.html 저장 완료: ${outPath} (${graded.length}명)`);
}

main();
