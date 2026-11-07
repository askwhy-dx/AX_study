'use strict';

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderRow(s) {
  const cells = [
    escapeHtml(s.name),
    escapeHtml(s.korean),
    escapeHtml(s.math),
    escapeHtml(s.english),
    escapeHtml(Number(s.average).toFixed(1)),
    escapeHtml(s.grade),
  ];
  return '      <tr>' + cells.map((c) => `<td>${c}</td>`).join('') + '</tr>';
}

function renderReport(students) {
  const rows = (students || []).map(renderRow).join('\n');
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <title>성적표</title>
  <style>
    body { font-family: sans-serif; margin: 2em; }
    table { border-collapse: collapse; }
    th, td { border: 1px solid #999; padding: 0.4em 0.8em; text-align: center; }
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
