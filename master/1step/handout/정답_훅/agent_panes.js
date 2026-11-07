// 칸 화면 훅 — Claude 가 서브 · 팀원을 부를 때마다(PreToolUse · Agent) 터미널 창에 그 담당의 칸을 하나 더한다.
// 세션마다 창 하나(이름 agents-<세션 앞 8자>) · 첫 담당은 창을 새로 열고, 다음 담당부터는 같은 창을 나눈다.
// 칸 내용은 같은 폴더의 pane.js 가 보여 준다. Windows Terminal(wt)이 없으면 아무것도 하지 않는다.
// 이 훅은 절대 막지 않는다 — 무슨 일이 있어도 exit 0.
const fs = require('fs'), path = require('path'), os = require('os'), { spawn, execSync } = require('child_process');
let raw = '';
process.stdin.on('data', c => (raw += c));
process.stdin.on('end', () => {
  try {
    const h = JSON.parse(raw || '{}'), i = h.tool_input || {};
    if (!['Agent', 'Task'].includes(h.tool_name)) return;
    try { execSync('where wt', { stdio: 'ignore' }); } catch { return; } // Windows Terminal 없음
    const sid = String(h.session_id || 'x').slice(0, 8), cwd = h.cwd || process.cwd();
    const state = path.join(os.tmpdir(), `agent-panes-${sid}.json`);
    let n = 0; try { n = JSON.parse(fs.readFileSync(state, 'utf8')).n; } catch { }
    fs.writeFileSync(state, JSON.stringify({ n: n + 1 }));
    const colors = ['blue', 'green', 'yellow', 'magenta', 'cyan', 'red'];
    const label = (i.name || i.description || `담당${n + 1}`).replace(/[\s;"]+/g, '_').slice(0, 24);
    const match = i.name ? `name:${i.name}` : `id:${h.tool_use_id}`;
    const pane = ['node', path.join(__dirname, 'pane.js'), label, match, colors[n % colors.length]];
    const args = ['-w', `agents-${sid}`].concat(n === 0 ? ['-d', cwd, '--title', 'agents'] : ['split-pane', '-H', '-d', cwd], pane);
    // 한 번에 여러 명을 부르면 훅이 거의 동시에 돈다 → 첫 창이 뜰 때까지 순서대로 조금씩 늦춰 연다(훅 자체는 바로 끝낸다)
    const later = `setTimeout(()=>require('child_process').spawn('wt',${JSON.stringify(args)},{detached:true,stdio:'ignore'}).unref(),${n * 1500})`;
    spawn(process.execPath, ['-e', later], { detached: true, stdio: 'ignore', windowsHide: true }).unref();
  } catch { /* 칸 화면은 보기용이라 실패해도 일을 막지 않는다 */ }
});
