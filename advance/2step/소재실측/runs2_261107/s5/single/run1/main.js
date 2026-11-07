// A → B → C 를 차례로 불러 report.html 을 저장한다.
const fs = require('fs');
const path = require('path');
const { parseScores } = require('./parse');
const { gradeStudents } = require('./grade');
const { renderReport } = require('./render');

const students = parseScores(path.join(__dirname, 'scores.csv'));
const graded = gradeStudents(students);
const html = renderReport(graded);
const out = path.join(__dirname, 'report.html');
fs.writeFileSync(out, html, 'utf8');
console.log(`report.html 생성 완료 (${graded.length}명)`);
