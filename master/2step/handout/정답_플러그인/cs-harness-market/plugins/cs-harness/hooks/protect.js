// 원본 보호 훅 (master 1step 4단계 정답)
// 실습 원본 3개를 고치거나 지우려 하면 막고 이유를 Claude 에게 돌려준다.
// 읽기(cat · Get-Content · 복사해 오기)는 막지 않는다.
const PROTECTED = ['문의.txt', '응대규정.md', '응대규정_옛판.md'];
const WRITE_VERB = /(Set-Content|Add-Content|Out-File|Clear-Content|Remove-Item|Move-Item|Rename-Item|\brm\b|\bdel\b|\bmv\b|\bsed\s+-i|\btruncate\b)/i;

let raw = '';
process.stdin.on('data', d => (raw += d)).on('end', () => {
  let input = {};
  try { input = JSON.parse(raw || '{}'); } catch (e) { process.exit(0); }
  const tool = input.tool_name || '';
  const ti = input.tool_input || {};
  const base = f => String(f || '').replace(/\\/g, '/').split('/').pop();
  let hit;
  if (/^(Edit|Write|MultiEdit|NotebookEdit)$/.test(tool)) {
    hit = PROTECTED.find(p => base(ti.file_path) === p);
  } else if (/^(Bash|PowerShell)$/.test(tool)) {
    const c = String(ti.command || '');
    hit = PROTECTED.find(p => c.includes(p) &&
      (WRITE_VERB.test(c) || new RegExp('>\\s*["\']?[^\\s"\'|;&]*' + p.replace('.', '\\.')).test(c)));
  }
  if (hit) {
    console.error('원본 보호: ' + hit + ' 은(는) 실습 원본이라 고칠 수 없습니다. 바꾼 내용은 답변 폴더에 새 파일로 쓰세요.');
    process.exit(2);
  }
  process.exit(0);
});
