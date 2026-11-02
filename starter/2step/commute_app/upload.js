/**
 * index.html 을 GitHub Pages(tes2 공개 리포)로 발행한다.
 * test/ 에서 git init 하지 말 것. GitHub Contents API 직접 호출이 정답이다.
 *
 *   node upload.js
 *
 * 발행 URL: https://jichang999-dotcom.github.io/tes2/commute/index.html
 */
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '..', '..', '..', '.env') });

const OWNER = 'jichang999-dotcom';
const REPO = 'tes2';        // 공개 리포 고정. .env GITHUB_REPO=tes1 은 일부러 안 쓴다
const BRANCH = 'main';
const LOCAL = path.join(__dirname, 'index.html');
const REMOTE = 'commute/index.html';
const commitMsg = '차단 사유 표시 + 조직도 밖 계정 자동 로그인 반복 차단';

const token = process.env.GITHUB_TOKEN;
if (!token) { console.error('GITHUB_TOKEN 없음 (test/.env 확인)'); process.exit(1); }

const api = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${REMOTE}`;
const headers = {
  Authorization: `Bearer ${token}`,
  Accept: 'application/vnd.github+json',
  'User-Agent': 'commute-app-uploader'
};

(async () => {
  const html = fs.readFileSync(LOCAL, 'utf8');

  if (html.includes('PASTE_EXEC_URL') || html.includes('PASTE_CLIENT_ID')) {
    console.error('index.html 상단 API_URL / CLIENT_ID 가 아직 자리표시자입니다. 채우고 다시 실행하세요.');
    process.exit(1);
  }

  const cur = await fetch(`${api}?ref=${BRANCH}`, { headers });
  const sha = cur.status === 200 ? (await cur.json()).sha : undefined;

  const res = await fetch(api, {
    method: 'PUT',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: commitMsg,
      content: Buffer.from(html, 'utf8').toString('base64'),
      branch: BRANCH,
      ...(sha ? { sha } : {})
    })
  });

  if (!res.ok) { console.error(`발행 실패 ${res.status}: ${await res.text()}`); process.exit(1); }
  console.log(`발행 완료 (${sha ? '갱신' : '신규'})`);
  console.log(`https://${OWNER}.github.io/${REPO}/commute/index.html`);
  console.log('Pages 전파에 40~60초 걸립니다.');
})();
