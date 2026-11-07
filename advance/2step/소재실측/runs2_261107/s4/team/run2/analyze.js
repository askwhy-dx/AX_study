// 기사 하나를 분석한다(일부러 40초 걸린다 — 실제로는 무거운 계산 · 외부 조회라고 생각한다)
// 사용: node analyze.js 기사/기사1.txt
const fs = require('fs');
const f = process.argv[2]; const t = fs.readFileSync(f, 'utf8');
const words = t.split(/\s+/).filter(Boolean);
const freq = {}; for (const w of words) if (w.length >= 2) freq[w] = (freq[w] || 0) + 1;
const top = Object.entries(freq).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, 3).map(x => x[0]);
const code = [...t].reduce((s, c) => (s * 31 + c.charCodeAt(0)) % 9973, 7);
setTimeout(() => console.log(JSON.stringify({ file: f, 낱말수: words.length, 많이나온말: top, 검증코드: code })), 40000);
