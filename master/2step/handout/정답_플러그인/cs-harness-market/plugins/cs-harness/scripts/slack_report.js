// 유삐식 5줄 보고 (master 2step 1 · 2단계 정답)
// node slack_report.js --title "문의 답변" --status ok --check "15건 중 15건 규정 일치" --error "없음" --action "답변_20261122.md 저장" --elapsed "3분 10초"
// 열쇠는 실행한 폴더의 .env 에서 읽는다: SLACK_BOT_TOKEN=xoxb-…  SLACK_USER_ID=U…
const fs = require('fs');
const path = require('path');

function loadEnv(file) {
  const env = {};
  try {
    for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
      if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
  } catch (e) {}
  return env;
}
function arg(name, def) {
  const i = process.argv.indexOf('--' + name);
  return i > 0 && process.argv[i + 1] !== undefined ? process.argv[i + 1] : def;
}
// 슬랙은 < > & 를 특수문자로 읽는다. 바꾸지 않으면 제목의 <내 이름> 같은 글자가 사라진다
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

async function slack(method, token, body) {
  const r = await fetch('https://slack.com/api/' + method, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8', Authorization: 'Bearer ' + token },
    body: JSON.stringify(body),
  });
  const j = await r.json();
  // HTTP 200 이어도 실패일 수 있다 — ok 를 본다
  if (!j.ok) throw new Error(method + ' 실패: ' + j.error);
  return j;
}

(async () => {
  const env = loadEnv(path.join(process.cwd(), '.env'));
  const token = env.SLACK_BOT_TOKEN, user = env.SLACK_USER_ID;
  if (!token || !user) { console.error('.env 에 SLACK_BOT_TOKEN · SLACK_USER_ID 가 없습니다'); process.exit(1); }
  const ok = arg('status', 'ok') === 'ok';
  const text = [
    '*' + esc(arg('title', '작업 보고')) + '* ' + (ok ? '✅' : '🔴'),
    '검증: ' + esc(arg('check', '-')),
    '오류: ' + esc(arg('error', '없음')),
    '처리: ' + esc(arg('action', '-')),
    '소요: ' + esc(arg('elapsed', '-')),
  ].join('\n');
  const dm = await slack('conversations.open', token, { users: user });
  await slack('chat.postMessage', token, { channel: dm.channel.id, text });
  console.log('ok:true · 보냄\n' + text);
})().catch(e => { console.error(e.message); process.exit(1); });
