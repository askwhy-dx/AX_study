// 출근 스크립트: 업무지시서를 claude -p 에 넣어 한 번 일을 시키고, 슬랙으로 보고하고,
// 성공하면 리포트 폴더를 Git 에 커밋(근무일지)한 뒤 출근기록을 남긴다.
// 실패(끝 코드 0 아님 · 답이 「확인 필요」로 시작 · 20분 시간 초과)면 커밋하지 않고 실패 한 줄만 보고한다.
// Node 기본 모듈만 사용한다. 실행: node ai_staff/run.js
'use strict';

const fs = require('fs');
const path = require('path');
const https = require('https');
const { spawn, spawnSync } = require('child_process');

const STAFF_DIR = __dirname;                       // ai_staff
const WORK_DIR = path.resolve(STAFF_DIR, '..');    // basic_data (claude 작업 위치)
const ORDER_FILE = path.join(STAFF_DIR, '업무지시서.md');
const PASS_FILE = path.join(STAFF_DIR, '출입증.txt');
const MCP_FILE = path.join(STAFF_DIR, 'empty_mcp.json');
const LOG_DIR = path.join(STAFF_DIR, '출근기록');
const TIMEOUT_MS = 20 * 60 * 1000;               // 한 번 출근에 최대 20분. 넘기면 프로세스 트리를 강제 종료
const KILL_TIMEOUT_MS = 30 * 1000;                 // taskkill 을 기다리는 최대 시간
const ENV_FILE = path.join(WORK_DIR, '.env');      // SLACK_WEBHOOK_URL 이 들어 있는 곳
const REPORT_TITLE = '[AI직원] 직영 리포트 완료';
const FAIL_TITLE = '[AI직원] 직영 리포트 실패';
const REPORT_TIMEOUT_MS = 15 * 1000;               // 슬랙 응답을 기다리는 최대 시간
const REPORT_DIR_NAME = '리포트';                   // 근무일지로 커밋하는 폴더 (WORK_DIR 기준)
const GIT_TIMEOUT_MS = 60 * 1000;                  // git 명령 하나에 최대 1분

const pad = (n) => String(n).padStart(2, '0');
const fmtTime = (d) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
const fmtStamp = (d) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}_${pad(d.getHours())}${pad(d.getMinutes())}`;

// 출근기록 파일 이름: 같은 분에 두 번 돌면 _2, _3 을 붙여 덮어쓰지 않는다.
function pickLogPath(stamp) {
  let p = path.join(LOG_DIR, `${stamp}.txt`);
  for (let i = 2; fs.existsSync(p); i++) p = path.join(LOG_DIR, `${stamp}_${i}.txt`);
  return p;
}

// claude 실행 파일 찾기. CLAUDE_BIN 환경변수가 있으면 그것을 쓴다.
// .cmd 는 shell 없이 띄울 수 없으므로, npm 설치본이면 cli.js 를 node 로 직접 띄운다.
function findClaude() {
  if (process.env.CLAUDE_BIN) return { cmd: process.env.CLAUDE_BIN, pre: [] };
  const dirs = (process.env.PATH || '').split(path.delimiter).filter(Boolean);
  const isWin = process.platform === 'win32';
  for (const dir of dirs) {
    const exe = path.join(dir, isWin ? 'claude.exe' : 'claude');
    if (fs.existsSync(exe)) return { cmd: exe, pre: [] };
  }
  if (isWin) {
    for (const dir of dirs) {
      if (!fs.existsSync(path.join(dir, 'claude.cmd'))) continue;
      const cli = path.join(dir, 'node_modules', '@anthropic-ai', 'claude-code', 'cli.js');
      if (fs.existsSync(cli)) return { cmd: process.execPath, pre: [cli] };
    }
  }
  return null;
}

function readTail(file, maxChars) {
  try {
    const s = fs.readFileSync(file, 'utf8').trim();
    return s.length > maxChars ? '…' + s.slice(-maxChars) : s;
  } catch {
    return '';
  }
}

// .env 에서 값 하나만 읽는다. process.env 에는 넣지 않는다 (claude 에게 넘어가지 않도록).
function readEnvValue(key) {
  let text;
  try {
    text = fs.readFileSync(ENV_FILE, 'utf8').replace(/^﻿/, '');
  } catch {
    return '';
  }
  let value = '';
  for (const line of text.split(/\r?\n/)) {
    const m = line.match(/^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
    if (!m || m[1] !== key) continue;
    let v = m[2].trim();
    if (/^(["']).*\1$/.test(v)) v = v.slice(1, -1);
    else v = v.replace(/\s+#.*$/, '');
    value = v.trim();
  }
  return value;
}

// 슬랙 웹훅으로 글 하나를 보낸다. 2xx 면 true. 주소는 어디에도 남기지 않는다.
function postSlack(url, text) {
  return new Promise((resolve) => {
    let u;
    try {
      u = new URL(url);
    } catch {
      return resolve(false);
    }
    if (u.protocol !== 'https:') return resolve(false);
    const body = Buffer.from(JSON.stringify({ text }), 'utf8');
    let settled = false;
    const end = (ok) => { if (!settled) { settled = true; resolve(ok); } };
    const req = https.request(u, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8', 'Content-Length': body.length },
      timeout: REPORT_TIMEOUT_MS,
    }, (res) => {
      res.resume();
      res.on('end', () => end(res.statusCode >= 200 && res.statusCode < 300));
      res.on('error', () => end(false));
    });
    req.on('timeout', () => req.destroy(new Error('timeout')));
    req.on('error', () => end(false));
    req.end(body);
  });
}

// 여러 줄을 한 줄로 줄인다 (실패 이유용).
const oneLine = (s, max = 300) => {
  const t = String(s || '').replace(/\s+/g, ' ').trim();
  return t.length > max ? t.slice(0, max) + '…' : t;
};
const firstLine = (s) => String(s || '').split(/\r?\n/).map((l) => l.trim()).find(Boolean) || '';
const lastLine = (s) => String(s || '').split(/\r?\n/).map((l) => l.trim()).filter(Boolean).pop() || '';
const fmtDuration = (ms) => (ms % 60000 === 0 ? `${ms / 60000}분` : `${Math.round(ms / 1000)}초`);

// 시간 초과 시 claude 와 그 자식 프로세스까지 통째로 끝낸다.
function killTree(child) {
  if (process.platform === 'win32' && child.pid) {
    const r = spawnSync('taskkill', ['/PID', String(child.pid), '/T', '/F'], {
      windowsHide: true,
      encoding: 'utf8',
      timeout: KILL_TIMEOUT_MS,
    });
    if (!r.error && r.status === 0) return;
  }
  try { child.kill('SIGKILL'); } catch {}
}

// 보고: 성공이면 첫 줄 제목, 그 아래 Claude 의 마지막 답. 실패면 실패 줄 하나만.
// 결과는 출근기록에 적을 말로 돌려준다.
async function report(answer, failLine) {
  const url = readEnvValue('SLACK_WEBHOOK_URL');
  if (!url) return '생략(주소 없음)';
  const escape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const text = failLine ? escape(failLine) : `${REPORT_TITLE}\n${escape(answer || '(답 없음)')}`;
  try {
    return (await postSlack(url, text)) ? '보냄' : '실패';
  } catch {
    return '실패';
  }
}

function git(args) {
  return spawnSync('git', args, {
    cwd: WORK_DIR,
    encoding: 'utf8',
    windowsHide: true,
    timeout: GIT_TIMEOUT_MS,
  });
}

// 근무일지: 리포트 폴더만 add 해서 커밋한다. push 는 하지 않는다. 결과는 출근기록에 적을 말로 돌려준다.
function commitReport(date) {
  const ver = git(['--version']);
  if (ver.error || ver.status !== 0) return 'Git 없음';
  if (git(['rev-parse', '--is-inside-work-tree']).status !== 0) return '생략(Git 저장소 아님)';
  if (!fs.existsSync(path.join(WORK_DIR, REPORT_DIR_NAME))) return '생략(리포트 폴더 없음)';

  const add = git(['add', '--', REPORT_DIR_NAME]);
  if (add.status !== 0) return `실패(git add: ${(add.stderr || '').trim() || add.status})`;
  // 끝 코드 0 = 바뀐 것 없음, 1 = 바뀐 것 있음
  const diff = git(['diff', '--cached', '--quiet', '--', REPORT_DIR_NAME]);
  if (diff.status === 0) return '바뀐 것 없음';
  if (diff.status !== 1) return `실패(git diff: ${(diff.stderr || '').trim() || diff.status})`;

  // pathspec 을 주어 리포트 폴더 말고 다른 곳에 올려 둔 변경은 커밋에 섞이지 않게 한다.
  const commit = git(['commit', '-m', `AI직원 리포트 ${date}`, '--', REPORT_DIR_NAME]);
  if (commit.status !== 0) return `실패(git commit: ${(commit.stderr || commit.stdout || '').trim() || commit.status})`;
  const head = git(['rev-parse', '--short', 'HEAD']);
  return `커밋함${head.status === 0 ? ` (${head.stdout.trim()})` : ''}`;
}

function main() {
  const start = new Date();
  fs.mkdirSync(LOG_DIR, { recursive: true });
  const logPath = pickLogPath(fmtStamp(start));
  const base = logPath.slice(0, -'.txt'.length);
  const outPath = `${base}.stdout.tmp`;
  const errPath = `${base}.stderr.tmp`;

  // failReason 이 있으면 실패: 커밋하지 않고, 슬랙과 출근기록에 「실패: 이유」 한 줄을 남긴다.
  const finish = async (code, answer, failReason) => {
    const end = new Date();
    const failLine = failReason ? `${FAIL_TITLE}: ${oneLine(failReason)}` : '';
    const reported = await report(answer, failLine);
    let journal;
    try {
      journal = failLine ? '생략(실패)' : commitReport(fmtTime(end).slice(0, 10));
    } catch (e) {
      journal = `실패(${e.message})`;
    }
    fs.writeFileSync(
      logPath,
      [
        `시작 시각: ${fmtTime(start)}`,
        `끝 시각: ${fmtTime(end)}`,
        `끝 코드: ${code}`,
        `결과: ${failLine || '성공'}`,
        `보고: ${reported}`,
        `근무일지: ${journal}`,
        '',
        '--- Claude 의 마지막 답 ---',
        answer || '(답 없음)',
        '',
      ].join('\n'),
      'utf8'
    );
    for (const f of [outPath, errPath]) fs.rmSync(f, { force: true });
    process.exitCode = failLine ? (typeof code === 'number' && code !== 0 ? code : 1) : 0;
  };
  const fail = (code, answer) => finish(code, answer, `${code} — ${firstLine(answer)}`);

  // 준비물 확인
  if (!fs.existsSync(ORDER_FILE)) return fail('준비 실패', `확인 필요: ${ORDER_FILE} 이 없음`);
  if (!fs.existsSync(PASS_FILE)) return fail('준비 실패', `확인 필요: ${PASS_FILE} 이 없음`);
  const allowed = fs.readFileSync(PASS_FILE, 'utf8').replace(/^﻿/, '')
    .split(/\r?\n/).map((s) => s.trim()).find(Boolean);
  if (!allowed) return fail('준비 실패', '확인 필요: 출입증.txt 가 비어 있음');
  if (!fs.existsSync(MCP_FILE)) {
    fs.writeFileSync(MCP_FILE, JSON.stringify({ mcpServers: {} }) + '\n', 'utf8');
  }
  const claude = findClaude();
  if (!claude) return fail('준비 실패', '확인 필요: claude 실행 파일을 PATH 에서 찾지 못함 (CLAUDE_BIN 으로 지정 가능)');

  const args = [
    ...claude.pre,
    '-p',
    '--allowedTools', allowed,
    '--strict-mcp-config',
    '--mcp-config', MCP_FILE,
  ];

  // 표준입력 = 업무지시서, 표준출력/오류 = 파일 (파이프 없음)
  const inFd = fs.openSync(ORDER_FILE, 'r');
  const outFd = fs.openSync(outPath, 'w');
  const errFd = fs.openSync(errPath, 'w');
  const closeFds = () => { for (const fd of [inFd, outFd, errFd]) try { fs.closeSync(fd); } catch {} };

  let child;
  try {
    child = spawn(claude.cmd, args, {
      cwd: WORK_DIR,
      stdio: [inFd, outFd, errFd],
      windowsHide: true,
    });
  } catch (e) {
    closeFds();
    return fail('실행 실패', `확인 필요: claude 를 띄우지 못함 (${e.message})`);
  }

  // spawn 의 timeout 은 claude 하나만 끝내므로, 직접 재서 프로세스 트리째 끝낸다.
  let timedOut = false;
  const timer = setTimeout(() => {
    timedOut = true;
    killTree(child);
  }, TIMEOUT_MS);

  let done = false;
  child.on('error', (e) => {
    if (done) return;
    done = true;
    clearTimeout(timer);
    closeFds();
    fail('실행 실패', `확인 필요: claude 를 띄우지 못함 (${e.message})`);
  });
  child.on('close', (code, signal) => {
    if (done) return;
    done = true;
    clearTimeout(timer);
    closeFds();
    let answer = readTail(outPath, 20000);
    // 앞부분이 잘렸을 수 있으므로 「확인 필요」 여부는 원문 첫머리로 본다 (굵게 · 제목 표시는 무시).
    const head = readTail(outPath, Infinity).replace(/^﻿/, '');
    const needsCheck = /^[\s*_#>`]*확인 필요/.test(head);
    const err = readTail(errPath, 4000);
    if (timedOut) answer += `${answer ? '\n' : ''}(시간 초과 — ${fmtDuration(TIMEOUT_MS)} 넘겨 강제 종료)`;
    else if (signal) answer += `${answer ? '\n' : ''}(신호 ${signal} 로 끝남)`;
    if (code !== 0 && err) answer += `${answer ? '\n' : ''}[stderr]\n${err}`;

    let failReason = '';
    if (timedOut) failReason = `시간 초과 (${fmtDuration(TIMEOUT_MS)} 넘겨 강제 종료)`;
    else if (code !== 0) failReason = `끝 코드 ${code === null ? `없음(신호 ${signal})` : code}${err ? ` — ${lastLine(err)}` : ''}`;
    else if (needsCheck) failReason = firstLine(head).replace(/^[*_#>`\s]+/, '');
    finish(timedOut ? '시간 초과' : code === null ? `신호 ${signal}` : code, answer, failReason);
  });
}

main();
