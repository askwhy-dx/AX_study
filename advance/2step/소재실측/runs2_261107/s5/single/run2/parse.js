'use strict';
const fs = require('fs');

// scores.csv 를 읽어 [{ name, korean, math, english }] 를 돌려준다.
function parseScores(filePath) {
  const text = fs.readFileSync(filePath, 'utf8').replace(/^﻿/, '');
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter((l) => l !== '');
  if (lines.length === 0) return [];
  return lines.slice(1).map((line, i) => {
    const cols = line.split(',').map((c) => c.trim());
    if (cols.length < 4) throw new Error(`${i + 2}번째 줄 형식 오류: ${line}`);
    const [name, ko, ma, en] = cols;
    const nums = [ko, ma, en].map(Number);
    if (nums.some((n) => !Number.isFinite(n))) throw new Error(`${i + 2}번째 줄 점수 오류: ${line}`);
    return { name, korean: nums[0], math: nums[1], english: nums[2] };
  });
}

module.exports = { parseScores };
