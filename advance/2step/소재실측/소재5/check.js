// report.html 이 정답과 맞는지 본다(채점용 · 작업자에게 보여 주지 않는다)
const fs = require('fs'); const key = JSON.parse(fs.readFileSync(process.argv[3], 'utf8'));
let h = ''; try { h = fs.readFileSync(process.argv[2], 'utf8'); } catch { console.log(JSON.stringify({ ok: 0, n: Object.keys(key).length, why: 'report.html 없음' })); process.exit(); }
let ok = 0; const bad = [];
for (const [n, v] of Object.entries(key)) {
  const row = (h.split(/<tr/i).find(r => r.includes(n)) || '').replace(/<[^>]+>/g, ' ');
  const nums = row.match(/\d+(\.\d+)?/g) || [];
  const hasAvg = nums.some(x => Math.abs(parseFloat(x) - v.평균) < 0.051); const hasG = new RegExp('\\b' + v.등급 + '\\b').test(row);
  if (hasAvg && hasG) ok++; else bad.push(n);
}
console.log(JSON.stringify({ ok, n: Object.keys(key).length, bad }));
