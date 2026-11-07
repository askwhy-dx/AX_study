'use strict';

const fs = require('fs');
const path = require('path');
const { parseScores } = require('./parse');
const { gradeStudents } = require('./grade');
const { renderReport } = require('./render');

function main() {
  const inputPath = path.join(__dirname, 'scores.csv');
  const outputPath = path.join(__dirname, 'report.html');

  const students = parseScores(inputPath);
  const graded = gradeStudents(students);
  const html = renderReport(graded);

  fs.writeFileSync(outputPath, html, 'utf8');
  console.log(`report.html 저장 완료: ${outputPath} (학생 ${graded.length}명)`);
}

try {
  main();
} catch (err) {
  console.error('성적표 생성 실패:', err.message);
  process.exitCode = 1;
}
