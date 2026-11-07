'use strict';

function toGrade(avg) {
  if (avg >= 90) return 'A';
  if (avg >= 80) return 'B';
  if (avg >= 70) return 'C';
  return 'D';
}

// 학생 목록을 받아 평균(소수 첫째 자리 반올림)과 등급을 붙여 돌려준다.
function gradeStudents(students) {
  return students.map((s) => {
    const sum = s.korean + s.math + s.english;
    const average = Math.round((sum * 10) / 3) / 10;
    return { ...s, average, grade: toGrade(average) };
  });
}

module.exports = { gradeStudents, toGrade };
