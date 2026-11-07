// 부분 B — 계산
// gradeStudents(students): 학생마다 평균(average)과 등급(grade)을 붙인 새 배열을 돌려준다.
// 입력: [{ name, scores: { 국어, 수학, 영어 } }] (팀 합의안). 숫자 배열 scores, 평평한 { korean, math, english } 도 처리.
// 출력: [{ ...입력 필드 그대로, average: Number(소수 첫째 자리 반올림), grade: 'A'|'B'|'C'|'D' }]  (90/80/70 이상, 나머지 D)

// 학생 하나에서 점수 목록을 뽑는다.
// 지원 모양: { scores: [..] } / { scores: { 국어, 수학, 영어 } } / { korean, math, english }
function scoreList(student) {
  let values;
  if (student && student.scores != null) {
    values = Array.isArray(student.scores) ? student.scores : Object.values(student.scores);
  } else {
    values = ['korean', 'math', 'english']
      .filter((k) => student && student[k] != null)
      .map((k) => student[k]);
  }
  return values.map(Number);
}

function getAverage(student) {
  const values = scoreList(student);
  if (values.length === 0) return 0;
  const sum = values.reduce((a, b) => a + b, 0);
  return Math.round((sum / values.length) * 10) / 10;
}

function getGrade(average) {
  if (average >= 90) return 'A';
  if (average >= 80) return 'B';
  if (average >= 70) return 'C';
  return 'D';
}

function gradeStudents(students) {
  return students.map((s) => {
    const average = getAverage(s);
    return { ...s, average, grade: getGrade(average) };
  });
}

module.exports = { gradeStudents, getAverage, getGrade };
