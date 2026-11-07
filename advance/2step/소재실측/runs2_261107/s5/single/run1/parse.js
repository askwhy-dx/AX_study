// 부분 A — scores.csv 를 읽어 학생 목록을 돌려준다.
const fs = require('fs');

function parseScores(filePath) {
  const text = fs.readFileSync(filePath, 'utf8').replace(/^﻿/, '');
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter((l) => l.length > 0);
  const rows = lines.slice(1); // 헤더(이름,국어,수학,영어) 제외
  return rows.map((line) => {
    const [name, korean, math, english] = line.split(',').map((s) => s.trim());
    return {
      name,
      korean: Number(korean),
      math: Number(math),
      english: Number(english),
    };
  });
}

module.exports = { parseScores };
