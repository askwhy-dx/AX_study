// 부분 B — 학생마다 평균(소수 첫째 자리 반올림)과 등급을 붙인다.
function toGrade(avg) {
  if (avg >= 90) return 'A';
  if (avg >= 80) return 'B';
  if (avg >= 70) return 'C';
  return 'D';
}

function gradeStudents(students) {
  return students.map((s) => {
    const sum = s.korean + s.math + s.english;
    const average = Math.round((sum / 3) * 10) / 10;
    return { ...s, average, grade: toGrade(average) };
  });
}

module.exports = { gradeStudents, toGrade };
