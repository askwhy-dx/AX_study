'use strict';

const SUBJECTS = ['국어', '수학', '영어'];
const FLAT_KEYS = ['korean', 'math', 'english'];

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// 합의된 모양: scores 가 배열 [국어, 수학, 영어] — 객체 { 국어, 수학, 영어 } 나
// 평평한 { korean, math, english } 가 와도 같은 순서로 읽는다.
function getScores(student) {
  const s = student.scores;
  if (Array.isArray(s)) return SUBJECTS.map((_, i) => s[i]);
  if (s && typeof s === 'object') return SUBJECTS.map((k) => s[k]);
  return FLAT_KEYS.map((k) => student[k]);
}

function formatAverage(avg) {
  const n = Number(avg);
  return Number.isFinite(n) ? n.toFixed(1) : '';
}

// 평균·등급이 붙은 학생 배열 -> report.html 문자열
function renderReport(students) {
  const header = ['이름', ...SUBJECTS, '평균', '등급']
    .map((h) => `<th>${escapeHtml(h)}</th>`)
    .join('');

  const rows = students
    .map((st) => {
      const cells = [
        st.name,
        ...getScores(st).map((v) => (v === undefined || v === null ? '' : v)),
        formatAverage(st.average),
        st.grade === undefined ? '' : st.grade,
      ];
      return `    <tr>${cells.map((c) => `<td>${escapeHtml(c)}</td>`).join('')}</tr>`;
    })
    .join('\n');

  return `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<title>성적표</title>
<style>
  body { font-family: sans-serif; margin: 2em; }
  table { border-collapse: collapse; }
  th, td { border: 1px solid #999; padding: 6px 14px; text-align: center; }
  th { background: #eee; }
</style>
</head>
<body>
<h1>성적표</h1>
<table>
  <thead>
    <tr>${header}</tr>
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
