// adv2-demo 초기화: cs_practice/답변/ 파일을 _지난시연/<시각>/ 으로 옮긴다(지우지 않음).
// 사용: node ../reset.js sub|team   (cs_practice 에서)
// team 이면 주고받기_서브.md 는 사본만 보관하고 제자리에 남긴다 → 끝에 나란히 비교표를 그릴 수 있다.
const fs = require('fs'), path = require('path');
const mode = process.argv[2] || 'sub';
const ans = path.join(__dirname, 'cs_practice', '답변');
const d = new Date(), p = n => String(n).padStart(2, '0');
const dst = path.join(__dirname, '_지난시연', `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}_${p(d.getHours())}${p(d.getMinutes())}${p(d.getSeconds())}`);
fs.mkdirSync(ans, { recursive: true });
const files = fs.readdirSync(ans);
if (files.length) fs.mkdirSync(dst, { recursive: true });
for (const f of files) {
  const keep = mode === 'team' && ['주고받기_서브.md', '처리결과_서브.md'].includes(f);
  (keep ? fs.copyFileSync : fs.renameSync)(path.join(ans, f), path.join(dst, f));
}
console.log(`초기화 완료 (${mode}) · 옮긴 파일 ${files.length}개${files.length ? ' → ' + path.relative(__dirname, dst) : ''}` +
  (mode === 'team' && files.includes('주고받기_서브.md') ? ' · 서브 기록(주고받기 · 처리결과)은 비교용으로 남김' : ''));
