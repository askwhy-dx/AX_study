// 담당 한 명의 작업을 실시간으로 보여 주는 칸 (Windows Terminal 칸 화면 · tmux 대신)
// Claude Code 가 서브 · 팀원마다 남기는 기록(~/.claude/projects/<폴더>/<세션>/subagents/*.jsonl)을 따라 읽는다.
// ⚠️ 이 기록 파일은 공개 기능이 아니다 — Claude Code 가 바뀌면 칸이 빌 수 있다(2.1.319 에서 확인).
// 보통은 agent_panes.js 훅이 알아서 부른다. 직접: node pane.js <칸 이름> <찾기> <색> (작업 폴더에서)
//   찾기 = id:toolu_… (부른 순간의 도구 id) · name:replier (팀원 이름) · type:cs-reply (에이전트 종류) · desc:대조 (설명에 든 말)
//   색   = blue · green · yellow · magenta · cyan · red
const fs = require('fs'), path = require('path'), os = require('os');
const [label = '담당', match = '', color = 'cyan'] = process.argv.slice(2);
const COL = { red: 41, green: 42, yellow: 43, blue: 44, magenta: 45, cyan: 46 }[color] || 46;
const FG = COL - 10;
const proj = path.join(os.homedir(), '.claude', 'projects', process.cwd().replace(/[^A-Za-z0-9]/g, '-'));
const START = process.env.PANE_SINCE ? Number(process.env.PANE_SINCE) : Date.now() - 5000; // 시험용: PANE_SINCE=0 이면 지난 기록도
const [k, v] = match.split(':');
const tracked = new Map(); // jsonl 경로 -> 읽은 위치
const w = () => Math.max(30, (process.stdout.columns || 60) - 2);
const cut = (s, n) => { s = String(s).replace(/\s+/g, ' ').trim(); return s.length > n ? s.slice(0, n - 1) + '…' : s; };
const say = s => process.stdout.write(s + '\n');
const dw = s => [...s].reduce((n, ch) => n + (ch.codePointAt(0) > 0x1100 ? 2 : 1), 0); // 한글은 두 칸
function bar(text) { const t = ` ${cut(text, w() / 2 | 0)} `; say(`\x1b[${COL};97;1m${t}${' '.repeat(Math.max(0, w() - 1 - dw(t)))}\x1b[0m`); }
function hit(meta) {
  if (k === 'id') return meta.toolUseId === v;
  if (k === 'name') return meta.name === v;
  if (k === 'type') return meta.agentType === v && !meta.name;
  if (k === 'desc') return (meta.description || '').includes(v) && !meta.name;
  return false;
}
function arg(name, i) {
  if (!i) return '';
  if (i.file_path) return path.basename(i.file_path);
  if (i.command) return cut(i.command, 50);
  if (i.pattern) return i.pattern;
  return '';
}
// 칸이 길어져 머리줄이 위로 밀려도 누구 칸인지 보이게, 줄마다 왼쪽에 칸 색 막대를 붙인다
const put = s => say(`[${FG}m▌[0m` + s);
function render(line) {
  let d; try { d = JSON.parse(line); } catch { return; }
  const c = d.message && d.message.content;
  if (d.type === 'assistant' && Array.isArray(c)) {
    for (const x of c) {
      if (x.type === 'text' && x.text.trim()) put(`  ${cut(x.text, w() + 20)}`);
      if (x.type === 'tool_use') {
        if (x.name === 'SendMessage') {
          const to = x.input.to || x.input.recipient, msg = x.input.message || x.input.content || x.input.summary || '';
          put(`\x1b[${FG};1m  ✉ → ${to}\x1b[0m ${cut(msg, w() + 20)}`);
        } else if (x.name !== 'ToolSearch') put(`\x1b[${FG}m●\x1b[0m ${x.name}(${arg(x.name, x.input)})`);
      }
    }
  }
  if (d.type === 'user') {
    if (typeof c === 'string' && !d.isMeta) {
      const m = c.match(/teammate_id="([^"]+)"[^>]*>([\s\S]*?)<\/teammate-message>/);
      if (m) put(`\x1b[${FG};1m  ✉ ← ${m[1]}\x1b[0m ${cut(m[2], w() + 20)}`);
      else if (d.parentUuid === null) put(`\x1b[${FG};1m  ✉ ← 메인\x1b[0m ${cut(c, w() + 20)}`); // 서브가 받은 일 = 메인이 옮겨 준 말
    } else if (Array.isArray(c)) {
      for (const x of c) if (x.type === 'tool_result') put(`\x1b[2m  ⎿ ${x.is_error ? '오류' : '완료'}\x1b[0m`);
    }
  }
}
function scan() {
  let sess = [];
  try { sess = fs.readdirSync(proj).map(s => path.join(proj, s, 'subagents')).filter(p => fs.existsSync(p) && fs.statSync(p).mtimeMs >= START); } catch { }
  for (const dir of sess) for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.meta.json'))) {
    const j = path.join(dir, f.replace('.meta.json', '.jsonl'));
    if (tracked.has(j) || !fs.existsSync(j)) continue;
    let meta; try { meta = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')); } catch { continue; }
    if (fs.statSync(j).mtimeMs < START || !hit(meta)) continue;
    tracked.set(j, 0); say(''); bar(`${label} · ${meta.description || meta.name || ''}`);
  }
  for (const [j, pos] of tracked) {
    const size = fs.statSync(j).size; if (size <= pos) continue;
    const fd = fs.openSync(j, 'r'); const buf = Buffer.alloc(size - pos); fs.readSync(fd, buf, 0, buf.length, pos); fs.closeSync(fd);
    const text = buf.toString('utf8'); const last = text.lastIndexOf('\n'); if (last < 0) continue;
    tracked.set(j, pos + Buffer.byteLength(text.slice(0, last + 1)));
    text.slice(0, last).split('\n').forEach(render);
  }
}
process.stdout.write('\x1b]0;' + label + '\x07');
// 칸 크기가 정해진 뒤에 머리줄을 찍는다(바로 찍으면 분할 중에 지워질 때가 있다)
setTimeout(() => { process.stdout.write('\x1bc'); bar(`@${label}`); say(`\x1b[2m  일을 받으면 여기에 보입니다…\x1b[0m`); setInterval(scan, 700); }, 1500);
