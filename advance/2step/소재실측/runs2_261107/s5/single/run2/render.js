'use strict';

function esc(v) {
  return String(v)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// 평균 · 등급이 붙은 학생 목록으로 report.html 문자열을 만든다.
function renderReport(students) {
  const rows = students
    .map(
      (s) =>
        `      <tr><td>${esc(s.name)}</td><td>${s.korean}</td><td>${s.math}</td><td>${s.english}</td>` +
        `<td>${s.average.toFixed(1)}</td><td>${esc(s.grade)}</td></tr>`
    )
    .join('\n');
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>성적표</title>
  <style>
    body { font-family: sans-serif; margin: 2em; }
    table { border-collapse: collapse; }
    th, td { border: 1px solid #999; padding: 6px 12px; text-align: center; }
    th { background: #eee; }
  </style>
</head>
<body>
  <h1>성적표</h1>
  <table>
    <thead>
      <tr><th>이름</th><th>국어</th><th>수학</th><th>영어</th><th>평균</th><th>등급</th></tr>
    </thead>
    <tbody>
${rows}
    </tbody>
  </table>
</body>
</html>
`;
}

module.exports = { renderReport };
