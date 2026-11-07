// 부분 B — 계산
// 입력: 학생 배열. 다음 모양을 모두 받는다.
//   [{ name, scores: number[] }]                    (C 의 main.js 가 넘기는 형태)
//   [{ name, scores: { 국어: 94, 수학: 71, ... } }]  (A 의 parseScores 형태)
//   [{ name, korean, math, english }]
// 출력: 새 배열 — 각 학생 객체에 average(숫자, 소수 1자리 반올림), grade('A'~'F') 를 붙임.
// 원본 배열/객체는 바꾸지 않는다.

const SUBJECTS = ['korean', 'math', 'english'];

function getScores(student) {
  if (Array.isArray(student.scores)) {
    return student.scores.map(Number);
  }
  if (student.scores && typeof student.scores === 'object') {
    // A 의 parseScores 형태: { 국어: 94, 수학: 71, 영어: 77 }
    return Object.values(student.scores).map(Number);
  }
  return SUBJECTS.filter((k) => student[k] !== undefined).map((k) => Number(student[k]));
}

function toGrade(average) {
  if (average >= 90) return 'A';
  if (average >= 80) return 'B';
  if (average >= 70) return 'C';
  return 'D';
}

function calculateGrades(students) {
  return (students || []).map((student) => {
    const scores = getScores(student);
    const sum = scores.reduce((a, b) => a + b, 0);
    const average = scores.length ? Math.round((sum / scores.length) * 10) / 10 : 0;
    return { ...student, average, grade: toGrade(average) };
  });
}

module.exports = { calculateGrades, toGrade };
