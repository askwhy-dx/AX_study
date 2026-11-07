// 부분 A — 읽기: scores.csv 를 읽어 학생 목록을 돌려준다.
// 반환 모양: [{ name: string, scores: number[], korean: number, math: number, english: number }]
//   scores 는 CSV 헤더의 과목 순서 [국어, 수학, 영어]; korean/math/english 는 같은 값을 이름으로 둔 것
const fs = require('fs');
const path = require('path');

const DEFAULT_PATH = path.join(__dirname, 'scores.csv');

function readRows(filePath) {
  const text = fs.readFileSync(filePath, 'utf8').replace(/^﻿/, '');
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => line.split(',').map((cell) => cell.trim()));
}

// 과목 이름 목록 (헤더에서 '이름' 다음 칸들), 예: ['국어', '수학', '영어']
function getSubjects(filePath = DEFAULT_PATH) {
  const rows = readRows(filePath);
  return rows.length ? rows[0].slice(1) : [];
}

function parseScores(filePath = DEFAULT_PATH) {
  const rows = readRows(filePath);
  if (rows.length === 0) return [];
  const subjectCount = rows[0].length - 1;
  return rows.slice(1).map((cells, i) => {
    const name = cells[0];
    const scores = cells.slice(1, 1 + subjectCount).map(Number);
    if (!name || scores.length !== subjectCount || scores.some((n) => !Number.isFinite(n))) {
      throw new Error(`scores.csv ${i + 2}번째 줄 형식이 잘못됨: ${cells.join(',')}`);
    }
    const [korean, math, english] = scores;
    return { name, scores, korean, math, english };
  });
}

module.exports = { parseScores, getSubjects };
