// 부분 C — 조립: A(읽기) → B(평균·등급) → C(화면) 순서로 불러 report.html 을 저장한다.
//
// A · B 의 파일 이름과 함수 이름은 부분 C 명세에 적혀 있지 않다.
// 아래 설정에 알맞은 값을 넣으면 그대로 쓰고, 비워 두면(null) 이 폴더의
// 다른 .js 파일에서 export 된 함수를 찾아 자동으로 고른다.
const fs = require('fs');
const path = require('path');
const { renderReport } = require('./render');

const CONFIG = {
  input: path.join(__dirname, 'scores.csv'),
  output: path.join(__dirname, 'report.html'),
  stepA: { file: './parse.js', fn: 'readStudents' },
  stepB: { file: './grade.js', fn: 'gradeStudents' },
};

function loadStep(spec) {
  const mod = require(path.resolve(__dirname, spec.file));
  const fn = spec.fn ? mod[spec.fn] : typeof mod === 'function' ? mod : null;
  if (typeof fn !== 'function') throw new Error(`함수를 찾을 수 없음: ${spec.file} ${spec.fn || ''}`);
  return fn;
}

// 이 폴더의 다른 모듈에서 export 된 함수를 모두 모은다.
function collectCandidates() {
  const skip = new Set(['main.js', 'render.js']);
  const list = [];
  for (const file of fs.readdirSync(__dirname)) {
    if (!file.endsWith('.js') || skip.has(file)) continue;
    const mod = require(path.join(__dirname, file));
    if (typeof mod === 'function') list.push({ file, name: mod.name, fn: mod });
    else if (mod && typeof mod === 'object') {
      for (const [name, fn] of Object.entries(mod)) {
        if (typeof fn === 'function') list.push({ file, name, fn });
      }
    }
  }
  return list;
}

const hasGrade = (s) => s && (s.grade !== undefined || s['등급'] !== undefined);

async function resolveSteps() {
  if (CONFIG.stepA && CONFIG.stepB) return [loadStep(CONFIG.stepA), loadStep(CONFIG.stepB)];

  const candidates = collectCandidates();
  // A: 입력 파일 경로를 받아 학생 배열을 돌려주는 함수
  let stepA = CONFIG.stepA ? loadStep(CONFIG.stepA) : null;
  let students = null;
  if (!stepA) {
    for (const c of candidates) {
      try {
        const out = await c.fn(CONFIG.input);
        if (Array.isArray(out) && out.length && typeof out[0] === 'object' && !hasGrade(out[0])) {
          stepA = c.fn;
          students = out;
          break;
        }
      } catch (_) { /* 다음 후보 */ }
    }
  }
  if (!stepA) throw new Error('A(읽기) 함수를 찾지 못했습니다. main.js 의 CONFIG.stepA 를 채워 주세요.');
  if (!students) students = await stepA(CONFIG.input);

  // B: 학생 배열을 받아 평균·등급이 붙은 배열을 돌려주는 함수
  let stepB = CONFIG.stepB ? loadStep(CONFIG.stepB) : null;
  if (!stepB) {
    for (const c of candidates) {
      if (c.fn === stepA) continue;
      try {
        const copy = JSON.parse(JSON.stringify(students));
        const out = await c.fn(copy);
        const arr = Array.isArray(out) ? out : copy;
        if (arr.length && hasGrade(arr[0])) {
          stepB = c.fn;
          break;
        }
      } catch (_) { /* 다음 후보 */ }
    }
  }
  if (!stepB) throw new Error('B(평균·등급) 함수를 찾지 못했습니다. main.js 의 CONFIG.stepB 를 채워 주세요.');
  return [stepA, stepB];
}

async function main() {
  const [stepA, stepB] = await resolveSteps();
  const students = await stepA(CONFIG.input); // A
  const result = await stepB(students); // B (제자리 수정형이면 students 를 그대로 씀)
  const graded = Array.isArray(result) ? result : students;
  const html = renderReport(graded); // C
  fs.writeFileSync(CONFIG.output, html, 'utf8');
  console.log(`저장 완료: ${CONFIG.output} (${graded.length}명)`);
}

if (require.main === module) {
  main().catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
}

module.exports = { main };
