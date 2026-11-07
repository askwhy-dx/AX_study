'use strict';

const fs = require('fs');

/**
 * CSV 파일(UTF-8, 헤더 `이름,국어,수학,영어`)을 동기로 읽어 학생 배열을 돌려준다.
 * @param {string} filePath
 * @returns {{ name: string, korean: number, math: number, english: number }[]}
 */
function parseScores(filePath) {
  let text = fs.readFileSync(filePath, 'utf8');
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1); // BOM 제거

  const lines = text
    .split(/\r?\n|\r/)
    .map((line) => line.trim())
    .filter((line) => line !== '');

  if (lines.length === 0) return [];

  const header = lines[0].split(',').map((h) => h.trim());
  const idx = {
    name: header.indexOf('이름'),
    korean: header.indexOf('국어'),
    math: header.indexOf('수학'),
    english: header.indexOf('영어'),
  };
  for (const [key, i] of Object.entries(idx)) {
    if (i === -1) throw new Error(`CSV 헤더에 필요한 열이 없습니다: ${key}`);
  }

  const toNumber = (value, field, lineNo) => {
    const n = Number(value);
    if (value === '' || !Number.isFinite(n)) {
      throw new Error(`${lineNo}번째 줄의 ${field} 값이 숫자가 아닙니다: "${value}"`);
    }
    return n;
  };

  return lines.slice(1).map((line, i) => {
    const cols = line.split(',').map((c) => c.trim());
    const lineNo = i + 2;
    return {
      name: cols[idx.name] ?? '',
      korean: toNumber(cols[idx.korean] ?? '', '국어', lineNo),
      math: toNumber(cols[idx.math] ?? '', '수학', lineNo),
      english: toNumber(cols[idx.english] ?? '', '영어', lineNo),
    };
  });
}

module.exports = { parseScores };
