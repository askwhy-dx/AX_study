/**
 * 가이드 HTML 을 기존 GitHub Pages 주소로 발행한다.
 * node tools/upload_guide_github.js starter-1step [dry]
 * 과정별 로컬 파일과 공개 주소는 courses.json 에서 읽는다.
 * 기존 공개 URL 은 유지하며 파일 내용만 교체한다.
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env') });
const fs = require('fs');
const https = require('https');
const crypto = require('crypto');

const TOKEN = process.env.GITHUB_TOKEN;
const OWNER = process.env.GITHUB_OWNER || 'jichang999-dotcom';
const REPO = 'tes2'; // 공개 리포 고정 (2026-09-17: tes1 은 사내 자료 이력 때문에 비공개, .env GITHUB_REPO 를 따르지 않는다)
const BRANCH = 'main';
const { courses: COURSES, aliases: ALIASES } = require('./courses.json');
const args = process.argv.slice(2);
const supplied = (args.find(a => a !== 'dry') || 'starter-1step').toLowerCase();
const COURSE = ALIASES[supplied] || supplied;
if (!(COURSE in COURSES) || args.length > 2 || args.filter(a => a !== 'dry').length > 1) {
  console.error('과정은 ' + Object.keys(COURSES).join(' · '));
  process.exit(1);
}
const C = COURSES[COURSE];
const LOCAL = path.join(__dirname, '..', C.dir, 'handout', C.file);
const REMOTE = C.remote;
const DRY = args.includes('dry');
const commitMsg = `AX_study: ${C.label} 가이드 갱신 (${C.file})`;

if (!TOKEN) { console.error('GITHUB_TOKEN 미설정'); process.exit(1); }
if (!fs.existsSync(LOCAL)) { console.error('로컬 파일 없음:', LOCAL); process.exit(1); }

// git blob SHA = GitHub contents API 가 주는 sha. 같으면 PUT 을 건너뛴다.
function gitBlobSha(buf) {
  const header = Buffer.from(`blob ${buf.length}\0`, 'utf-8');
  return crypto.createHash('sha1').update(Buffer.concat([header, buf])).digest('hex');
}

function req(method, urlPath, body) {
  return new Promise((resolve, reject) => {
    const bodyStr = body ? JSON.stringify(body) : null;
    const r = https.request({
      hostname: 'api.github.com', path: urlPath, method,
      headers: {
        Authorization: `token ${TOKEN}`,
        'User-Agent': 'ax-study-uploader',
        Accept: 'application/vnd.github.v3+json',
        ...(bodyStr ? { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(bodyStr) } : {}),
      },
    }, res => {
      let d = '';
      res.on('data', c => (d += c));
      res.on('end', () => resolve({ status: res.statusCode, json: d ? JSON.parse(d) : null }));
    });
    r.on('error', reject);
    if (bodyStr) r.write(bodyStr);
    r.end();
  });
}

(async () => {
  const buf = fs.readFileSync(LOCAL);
  const sha = gitBlobSha(buf);
  const api = `/repos/${OWNER}/${REPO}/contents/${REMOTE.split('/').map(encodeURIComponent).join('/')}`;

  const cur = await req('GET', `${api}?ref=${BRANCH}`);
  if (cur.status === 200 && cur.json.sha === sha) {
    console.log('SAME   내용 변경 없음, 올리지 않는다');
  } else {
    console.log(cur.status === 200 ? 'UPDATE' : 'CREATE', REMOTE, `(${Math.round(buf.length / 1024)}KB)`);
    if (DRY) { console.log('(dry) 여기서 멈춘다'); return; }
    const put = await req('PUT', api, {
      message: commitMsg, branch: BRANCH, content: buf.toString('base64'),
      ...(cur.status === 200 ? { sha: cur.json.sha } : {}),
    });
    if (put.status !== 200 && put.status !== 201) {
      console.error('FAIL', put.status, put.json && put.json.message);
      process.exit(1);
    }
    console.log('   ', put.json.content.sha === sha ? 'sha ok' : 'SHA MISMATCH');
  }
  console.log('공개 URL:', `https://${OWNER}.github.io/${REPO}/${REMOTE}`);
  console.log('(Pages 전파에 40~60초 걸린다)');
})();
