'use strict';

function roundOne(n) {
  return Math.round((n + Number.EPSILON) * 10) / 10;
}

function toGrade(avg) {
  if (avg >= 90) return 'A';
  if (avg >= 80) return 'B';
  if (avg >= 70) return 'C';
  return 'D';
}

function gradeStudents(students) {
  return students.map((s) => {
    const average = roundOne((s.korean + s.math + s.english) / 3);
    return { ...s, average, grade: toGrade(average) };
  });
}

module.exports = { gradeStudents };
