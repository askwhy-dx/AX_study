// 부분 C — 화면: 평균 · 등급이 붙은 학생 목록으로 report.html 문자열을 만든다.

// 필드 이름이 영문/한글 어느 쪽이어도 읽을 수 있게 후보 키를 둔다.
const FIELDS = [
  { label: '이름', keys: ['name', '이름'] },
  { label: '국어', keys: ['korean', 'kor', '국어'] },
  { label: '수학', keys: ['math', '수학'] },
  { label: '영어', keys: ['english', 'eng', '영어'] },
  { label: '평균', keys: ['average', 'avg', '평균'] },
  { label: '등급', keys: ['grade', '등급'] },
];

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function pick(student, keys) {
  for (const key of keys) {
    if (student[key] !== undefined && student[key] !== null) return student[key];
  }
  return '';
}

function formatCell(label, value) {
  if (label === '평균' && typeof value === 'number' && Number.isFinite(value)) {
    return value.toFixed(1);
  }
  return value;
}

function renderReport(students) {
  const head = FIELDS.map((f) => `<th>${f.label}</th>`).join('');
  const rows = students
    .map((s) => {
      const cells = FIELDS.map(
        (f) => `<td>${escapeHtml(formatCell(f.label, pick(s, f.keys)))}</td>`
      ).join('');
      return `      <tr>${cells}</tr>`;
    })
    .join('\n');

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>성적 보고서</title>
  <style>
    body { font-family: sans-serif; margin: 2rem; }
    table { border-collapse: collapse; }
    th, td { border: 1px solid #999; padding: 0.4rem 0.8rem; text-align: center; }
    th { background: #eee; }
  </style>
</head>
<body>
  <h1>성적 보고서</h1>
  <table>
    <thead>
      <tr>${head}</tr>
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
