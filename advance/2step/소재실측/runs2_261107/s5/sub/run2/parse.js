// 부분 A — 읽기: scores.csv 를 읽어 학생 목록을 돌려준다.
const fs = require('fs');
const path = require('path');

const DEFAULT_PATH = path.join(__dirname, 'scores.csv');

// CSV 텍스트를 학생 객체 배열로 바꾼다.
// 첫 줄은 헤더, 숫자로 읽히는 값은 숫자로 변환한다.
function parseScores(text) {
  const lines = text
    .replace(/^﻿/, '')
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
  if (lines.length === 0) return [];

  const headers = lines[0].split(',').map((h) => h.trim());
  return lines.slice(1).map((line) => {
    const cells = line.split(',').map((c) => c.trim());
    const student = {};
    headers.forEach((h, i) => {
      const raw = cells[i] === undefined ? '' : cells[i];
      const num = Number(raw);
      student[h] = raw !== '' && !Number.isNaN(num) ? num : raw;
    });
    return student;
  });
}

// 파일을 읽어 학생 목록을 돌려준다.
function readStudents(filePath = DEFAULT_PATH) {
  const text = fs.readFileSync(filePath, 'utf8');
  return parseScores(text);
}

module.exports = { readStudents, parseScores };
