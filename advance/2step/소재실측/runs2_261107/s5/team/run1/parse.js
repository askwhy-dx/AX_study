'use strict';
// 부분 A — scores.csv 를 읽어 학생 목록을 돌려준다.
// 반환: [{ name: string, scores: { 국어: Number, 수학: Number, 영어: Number } }]
//   - scores 의 키는 CSV 헤더 그대로, 순서도 헤더 순서
const fs = require('fs');
const path = require('path');

function parseScores(filePath = 'scores.csv') {
  const resolved = path.isAbsolute(filePath) ? filePath : path.join(__dirname, filePath);
  const text = fs.readFileSync(resolved, 'utf8').replace(/^﻿/, '');
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter((l) => l !== '');
  if (lines.length === 0) return [];

  const header = lines[0].split(',').map((h) => h.trim());
  const subjects = header.slice(1);

  return lines.slice(1).map((line, i) => {
    const cells = line.split(',').map((c) => c.trim());
    const scores = {};
    subjects.forEach((subject, j) => {
      const value = Number(cells[j + 1]);
      if (cells[j + 1] === undefined || cells[j + 1] === '' || Number.isNaN(value)) {
        throw new Error(`scores.csv ${i + 2}번째 줄: '${subject}' 점수가 숫자가 아닙니다 (${cells[j + 1]})`);
      }
      scores[subject] = value;
    });
    return { name: cells[0], scores };
  });
}

module.exports = { parseScores };
