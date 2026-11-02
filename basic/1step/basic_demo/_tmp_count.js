const fs = require('fs');
const path = require('path');
const EX = process.argv[2] === 'ex';
const MONTH = '202609';
const txt = fs.readFileSync(path.join(__dirname, '직영_실습데이터.csv'), 'utf8').replace(/^﻿/, '');
function parseLine(l) {
  const out = []; let cur = ''; let q = false;
  for (let i = 0; i < l.length; i++) {
    const c = l[i];
    if (q) { if (c === '"') { if (l[i + 1] === '"') { cur += '"'; i++; } else q = false; } else cur += c; }
    else if (c === '"') q = true; else if (c === ',') { out.push(cur); cur = ''; } else cur += c;
  }
  out.push(cur); return out;
}
const lines = txt.split(/\r?\n/).filter(Boolean);
const h = parseLine(lines[0]); const ix = {}; h.forEach((n, i) => ix[n] = i);
const words = ['셔틀', '차량', '주도', '클리', '유형별', '실험복', '가방', '클린업', '무료'];
const subj = new Set(); const byCenter = {}; let rows = 0;
for (let k = 1; k < lines.length; k++) {
  const r = parseLine(lines[k]);
  if (r[ix['편성년월']] !== MONTH) continue;
  const st = r[ix['학급수강상태']], mv = r[ix['이동']];
  if (!(st === '수강' || (st === '이수' && mv !== '이동-'))) continue;
  if (EX && words.some(w => r[ix['프로그램명']].includes(w))) continue;
  rows++;
  const day = r[ix['요일']];
  subj.add(day === '요일'
    ? [r[ix['COLC']], day, r[ix['시작시간']], r[ix['종료시간']]].join('|')
    : [r[ix['COLC']], day, r[ix['시작시간']]].join('|'));
  const c = r[ix['센터명']];
  (byCenter[c] = byCenter[c] || new Set()).add(r[ix['학생코드']]);
}
let stu = 0; for (const c in byCenter) stu += byCenter[c].size;
console.log(JSON.stringify({ month: MONTH, excludePrograms: EX, rows, subjects: subj.size, students: stu, centers: Object.fromEntries(Object.entries(byCenter).map(([c, s]) => [c, s.size])) }));
