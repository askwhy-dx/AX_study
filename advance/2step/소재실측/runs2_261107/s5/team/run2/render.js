// 부분 C — 화면: 평균 · 등급이 붙은 학생 목록으로 report.html 내용을 만든다.

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// 학생 한 명에서 [국어, 수학, 영어] 점수를 꺼낸다.
// 지원 모양: {korean, math, english} / scores: [국어, 수학, 영어] / scores: {국어, 수학, 영어}
function getScores(s) {
  if (s.korean !== undefined) return [s.korean, s.math, s.english];
  if (Array.isArray(s.scores)) return s.scores.slice(0, 3);
  if (s.scores && typeof s.scores === 'object') {
    return [s.scores['국어'], s.scores['수학'], s.scores['영어']];
  }
  return ['', '', ''];
}

function formatAverage(avg) {
  return typeof avg === 'number' ? avg.toFixed(1) : escapeHtml(avg ?? '');
}

// students: [{ name, korean, math, english, average, grade }] -> HTML 문자열
function renderReport(students) {
  const rows = students
    .map((s) => {
      const [kor, math, eng] = getScores(s);
      return [
        '      <tr>',
        `        <td>${escapeHtml(s.name)}</td>`,
        `        <td>${escapeHtml(kor ?? '')}</td>`,
        `        <td>${escapeHtml(math ?? '')}</td>`,
        `        <td>${escapeHtml(eng ?? '')}</td>`,
        `        <td>${formatAverage(s.average)}</td>`,
        `        <td>${escapeHtml(s.grade ?? '')}</td>`,
        '      </tr>',
      ].join('\n');
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
