'use strict';

const fs = require('fs');
const path = require('path');
const { parseScores } = require('./parse');      // 부분 A
const { gradeStudents } = require('./grade');    // 부분 B
const { renderReport } = require('./render');    // 부분 C

function main() {
  const students = parseScores(path.join(__dirname, 'scores.csv'));
  const graded = gradeStudents(students);
  const html = renderReport(graded);
  const outPath = path.join(__dirname, 'report.html');
  fs.writeFileSync(outPath, html, 'utf8');
  console.log(`report.html 저장 완료: ${outPath} (${graded.length}명)`);
}

main();
