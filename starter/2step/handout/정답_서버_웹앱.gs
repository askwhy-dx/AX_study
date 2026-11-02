// 12단계 정답. app_trial 에 넣고 이름을 서버.gs 로 바꾼다. 화면(index.html)도 이 웹앱이 띄운다.
// 배포: 실행 계정 = 나, 액세스 권한 = askwhy.co.kr 내 모든 사용자 → 회사 계정으로 로그인해야 열린다.
// 한 줄 형식: 날짜 · 출근 · 퇴근 · 출근거리(m) · 퇴근거리(m) · 이메일. 같은 날짜 + 같은 이메일이면 그 줄을 고친다.
const HEAD = ['날짜', '출근', '퇴근', '출근거리(m)', '퇴근거리(m)', '이메일'];
const KEYS = ['date', 'in', 'out', 'inDist', 'outDist', 'email'];

function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('출퇴근')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function me_() {
  const email = Session.getActiveUser().getEmail();
  if (!email) throw new Error('로그인한 이메일을 알 수 없습니다. 회사 계정으로 다시 열어 주세요');
  return email;
}

function sheet_() {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  const head = sh.getRange(1, 1, 1, HEAD.length).getValues()[0];
  if (head.some((v, i) => v !== HEAD[i])) sh.getRange(1, 1, 1, HEAD.length).setValues([HEAD]); // 14단계 머리글에 이메일 칸을 더한다
  sh.getRange('A:C').setNumberFormat('@'); // 날짜·시각을 날짜 값으로 바꾸지 않고 글자 그대로 둔다
  return sh;
}

function rows_(sh) {
  const last = sh.getLastRow();
  return last > 1 ? sh.getRange(2, 1, last - 1, KEYS.length).getValues() : [];
}

// 화면이 열릴 때: 내 이메일과 내 기록
function myRecords() {
  const email = me_();
  const recs = rows_(sheet_()).map(v => Object.fromEntries(KEYS.map((k, j) => [k, String(v[j])])))
    .filter(r => r.email === email);
  return { email, recs };
}

// [출근]/[퇴근]: { date, kind: 'in'|'out', time, dist }. 출근은 첫 기록 유지, 퇴근은 덮어쓴다.
function punch(p) {
  if (!p || !/^\d{4}-\d{2}-\d{2}$/.test(p.date) || !['in', 'out'].includes(p.kind)) throw new Error('요청 형식이 틀렸습니다');
  const email = me_();
  const lock = LockService.getScriptLock(); // 동시에 두 번 오면 같은 줄이 두 개 생기는 것을 막는다
  lock.waitLock(10000);
  try {
    const sh = sheet_();
    const rows = rows_(sh);
    const i = rows.findIndex(v => String(v[0]) === p.date && String(v[5]) === email);
    const row = i >= 0 ? rows[i] : [p.date, '', '', '', '', email];
    if (p.kind === 'in' && row[1] !== '') return { ok: false, error: `오늘은 이미 ${row[1]}에 출근 기록이 있습니다.` };
    if (p.kind === 'in') { row[1] = p.time; row[3] = p.dist; } else { row[2] = p.time; row[4] = p.dist; }
    sh.getRange(i >= 0 ? i + 2 : sh.getLastRow() + 1, 1, 1, KEYS.length).setValues([row]);
    return { ok: true };
  } finally {
    lock.releaseLock();
  }
}
