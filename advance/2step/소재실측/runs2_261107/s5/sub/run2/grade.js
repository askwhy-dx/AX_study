// 부분 B — 계산
// 학생 목록을 받아 학생마다 평균(average)과 등급(grade)을 붙여 돌려준다.
// 입력 예(parse.js 출력): [{ 이름: '김하늘', 국어: 94, 수학: 71, 영어: 77 }, ...]
// 출력 예: [{ 이름: '김하늘', 국어: 94, 수학: 71, 영어: 77, average: 80.7, grade: 'B' }, ...]

const SUBJECTS = ['국어', '수학', '영어'];

// 평균: 소수 첫째 자리 반올림
function average(scores) {
  if (!Array.isArray(scores) || scores.length === 0) return 0;
  const sum = scores.reduce((acc, s) => acc + Number(s), 0);
  return Math.round((sum / scores.length) * 10) / 10;
}

// 등급: 90 이상 A · 80 이상 B · 70 이상 C · 나머지 D
function toGrade(avg) {
  if (avg >= 90) return 'A';
  if (avg >= 80) return 'B';
  if (avg >= 70) return 'C';
  return 'D';
}

function scoresOf(student) {
  if (Array.isArray(student.scores)) return student.scores;
  return SUBJECTS.map((k) => Number(student[k]));
}

function gradeStudents(students) {
  return (students || []).map((student) => {
    const avg = average(scoresOf(student));
    return { ...student, average: avg, grade: toGrade(avg) };
  });
}

module.exports = { gradeStudents, average, toGrade };
