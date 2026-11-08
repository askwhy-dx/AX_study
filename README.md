# AX_study: Claude Code 교육 자료

과정명은 `starter` · `basic` · `advance` · `master`, 각 과정의 단계명은 `1step` · `2step` 으로 통일합니다. 가이드 제목 · 문서 · 폴더 · 파일명에 같은 기준을 씁니다.

| 과정 | 1step | 2step | 상태 |
|---|---|---|---|
| **starter** | 첫 설정 · 설치와 규칙 | 사내 웹 앱 만들기와 배포 | 가이드 v1.25 · v1.15 |
| **basic** | 스킬과 에이전트 · 기준과 담당 | 외부 데이터 연결 · 수집과 공유 | 가이드 v1.10 · v1.30 |
| **advance** | 자동화 | 팀 꾸리기 | 가이드 v2.23 · v3.2 |
| **master** | 스스로 지키기 | 팀에 퍼뜨리기 | 가이드 v1.0 · v1.0 |

starter 2step 은 웹 앱 과정 하나로 운영합니다. 교육생에게는 해당 단계의 `handout/` 파일과 공개 가이드 링크를 나눠 줍니다.

## 1. 자료 위치

각 가이드의 정본은 `<과정>/<단계>/web/guide.src.html` 이고, 빌드한 배포본은 같은 단계의 `handout/` 에 있습니다.

| 자료 | 위치 |
|---|---|
| starter 1step 가이드 | `starter/1step/handout/CLAUDE_starter_1step_가이드.html` |
| starter 2step 가이드 | `starter/2step/handout/CLAUDE_starter_2step_가이드.html` |
| basic 1step 가이드 | `basic/1step/handout/CLAUDE_basic_1step_가이드.html` |
| basic 2step 가이드 | `basic/2step/handout/CLAUDE_basic_2step_가이드.html` |
| advance 1step 가이드 | `advance/1step/handout/CLAUDE_advance_1step_가이드.html` |
| advance 2step 가이드 | `advance/2step/handout/CLAUDE_advance_2step_가이드.html` |
| master 1step 가이드 | `master/1step/handout/CLAUDE_master_1step_가이드.html` (공개 `ax_study/claude-code-self-guard.html`) |
| master 2step 가이드 | `master/2step/handout/CLAUDE_master_2step_가이드.html` (공개 `ax_study/claude-code-team-share.html`) |
| starter 1step 순서 안내 | `starter/1step/handout/CLAUDE_starter_1step_순서.txt` |
| starter 2step 기획서 | `starter/2step/starter_2step_기획.md` · `.html` · `.pdf` |
| basic 기획서 | `basic/1step/basic_1step_기획.html` · `basic/2step/basic_2step_기획.html` |
| advance 1step 기획서 | `advance/1step/advance_1step_기획.html` |
| 과정별 기술스택 | `AX_과정별_기술스택.xlsx` — 4개 과정 × 1step · 2step |
| 빌드·발행 설정 | `tools/courses.json` — 표준 인자 · 경로 · 파일명 · 공개 URL |
| 작업 기록 | `docs/작업기록.md` |

공개 URL 은 기존 주소를 유지합니다.

| 과정 · 단계 | 공개 가이드 |
|---|---|
| starter 1step | [첫 설정](https://jichang999-dotcom.github.io/tes2/ax_study/claude-code-setup-guide.html) |
| starter 2step | [사내 웹 앱 만들기](https://jichang999-dotcom.github.io/tes2/ax_study/claude-code-build-app.html) |
| basic 1step | [스킬과 에이전트](https://jichang999-dotcom.github.io/tes2/ax_study/claude-code-skills-agents.html) |
| basic 2step | [외부 데이터 연결](https://jichang999-dotcom.github.io/tes2/ax_study/claude-code-external-data.html) |
| advance 1step | [자동화](https://jichang999-dotcom.github.io/tes2/ax_study/claude-code-automation.html) |
| advance 2step | [팀 꾸리기](https://jichang999-dotcom.github.io/tes2/ax_study/claude-code-agent-team.html) |

### 과정 키워드

| 과정 | 1step | 2step |
|---|---|---|
| starter | 설치와 규칙 | 만들기와 배포 |
| basic | 기준과 담당 | 수집과 공유 |
| advance | 자동화 | 직원 만들기 |
| master | 규칙 · 규정 | 권한과 협업 |

### 공유 자료

- [공유 폴더](https://drive.google.com/drive/folders/192wXqwNxdIP44v7ZKGDK92KD148cDt3w) — 설치 파일 · 초기설정 · 알림 훅.
- [starter 2step 준비물](https://drive.google.com/drive/folders/1cvehjggzeg0WDNa3nBlQbAQCoUEIyPFp) — 프롬프트 · 정답 파일.
- [basic 준비물](https://drive.google.com/drive/folders/1JOGuo57D-ZtolZSu_FaJiaizTN48mi_g) — 실습 데이터 · 열사전 · 정답표 · 참고자료. 업로드: `python tools/upload_basic_handout.py 1step|2step dry|apply`.
- [팀별 진행표](https://claude.ai/artifact/WaJxr9BKNQHLMauhyvu9jJ) — 비공개 아티팩트. 차수와 과정 단계를 구분해서 기록합니다.

### 가이드 수정 · 빌드 · 발행

```powershell
python tools/build_html.py starter-1step
Copy-Item starter/1step/web/CLAUDE_starter_1step_가이드.html starter/1step/handout/
node tools/upload_guide_github.js starter-1step dry
node tools/upload_guide_github.js starter-1step
```

인자는 `starter-1step` · `starter-2step` · `basic-1step` · `basic-2step` · `advance-1step` · `advance-2step` 입니다. 생략하면 `starter-1step` 입니다. 이전 인자는 호환용 별칭으로만 지원합니다. 원본을 고치면 Update Notes 를 추가하고 빌드 · handout 복사 · 발행까지 반영합니다.

## 2. 폴더 구성

```text
AX_study/
├─ starter/
│  ├─ 1step/          web/ · handout/
│  └─ 2step/          web/ · handout/ · commute_app/ · 기획서
├─ basic/
│  ├─ 1step/          web/ · handout/ · 기획서
│  └─ 2step/          web/ · handout/ · 기획서
├─ advance/
│  ├─ 1step/          web/ · handout/ · 기획서
│  └─ 2step/          web/ · handout/
├─ master/
│  └─ research/      준비 중인 과정 참고 자료
├─ tools/            빌드 · 발행 · 촬영 도구
├─ docs/             작업 문서
└─ archive/          과거 자료
```

## 3. starter 과정 설정 순서 (요약)

| 순서 | 할 일 | 결과 |
|---|---|---|
| 1 | 영어 이름 작업 폴더 만들기, Node.js·Cursor(또는 VS Code) 설치 | |
| 2 | Claude Code 설치 후 로그인 | `claude -v` 입력 시 버전이 나온다 |
| 3 | `/config` → Language → `korean` → `/exit` → `claude` 다시 실행 | 모든 폴더에서 한국어로 답한다 (화면 메뉴는 영어 그대로) |
| 4 | `CLAUDE_초기설정.txt` 내용 붙여넣기 (1회) | `C:\Users\<계정>\.claude\CLAUDE.md` 와 `<작업 폴더>\.claude\CLAUDE.md` 가 둘 다 생성 |
| 5 | Claude Code 재시작 후 확인 | 짧은 질문("파이썬 리스트 길이 함수는?")은 짧게, 의견 질문("엑셀과 파이썬 중 뭐가 좋을까?")은 장단점 + 고려사항 3가지로 답한다 |

자세한 절차와 자주 틀리는 것은 구글 문서의 「초기세팅_상세」를 참고하세요.

### 자주 헷갈리는 기능

| 기능 | 올바른 사용법 | 주의 |
|---|---|---|
| 플랜 모드 | Shift + Tab 을 화면 아래에 `plan mode on` 이 보일 때까지 누른다. 또는 요청 앞에 `/plan` | Shift + Tab 은 모드를 차례로 바꾸는 키라, 한 번 누르면 플랜 모드가 아닐 수 있다 |
| 권한 요청 | 기본 모드(auto) 그대로 쓴다 | `claude --dangerously-skip-permissions` 는 안전 검사까지 모두 꺼서 교육에서는 쓰지 않는다 |
| 답변 언어 | `/config` 언어 설정 | 화면 메뉴는 영어 그대로다 |

## 4. 어떤 설정이 무엇을 담당하나

| 설정 | 적용 범위 | 담당 내용 |
|---|---|---|
| `/config` 언어 설정 | 모든 폴더 | 답변 언어 (한국어) |
| 작업 폴더 CLAUDE.md | 그 작업 폴더와 하위 폴더 | 폴더 구조 규칙, 커밋·문서 한국어, 프로젝트 목록 |

## 다음에 할 일 — advance 1step 카드 실측 (남은 5항목 · 강사 계정 필요)

2026-10-30 에이전트가 할 수 있는 1 · 2 · 4 · 6번을 실측했고, 고칠 곳은 **가이드 v2.2** 로 반영 · 발행했다. 10-30 **v2.3** 에서 7단계 · 12단계 · 15~17단계 카드가 새로 바뀌어 5 · 7번 내용을 바꾸고 9번을 더했다(번호는 v2.3 단계 — v2.4 에서 9단계 이후가 한 칸씩 당겨졌다: 검색 스크립트 11 · 스케줄러 12~13 · 슬랙 14~16 · 루틴 17). 남은 3 · 5 · 7 · 8 · 9번은 강사 계정 · 로그인이 필요하다. 끝나면 기획서 §5 상태 칸과 이 표를 고친다. 결과가 카드와 다르면 카드 문장을 고치고 다시 발행한다.

| # | 단계 | 확인할 것 | 방법 | 상태 |
|---|---|---|---|---|
| 1 | 1 워크스페이스 Git | 제외 목록 후보 · 「좋아」 전에 멈춤 · 이미 Git 이면 status 만 | 가짜 워크스페이스 3곳 + 이미 Git 인 곳 1곳 | **4/4 통과(10-30)** |
| 2 | 2~5 연습 폴더 | 고른 폴더 밖 파일이 안 바뀌는가 · 커밋 · revert · 브랜치 | 폴더 이름을 바꿔 3회 · 바깥 파일 해시 비교 | **3/3 통과(10-30)** |
| 3 | 8 push | Git Credential Manager 브라우저 로그인 · 데이터 없는 목록 | 강사 계정 · 테스트 Private 리포 1개 (끝나면 삭제) | 남음 · 막히면 토큰 방식 안내(게이트 G2) |
| 4 | 10 · 11 GitHub 찾기 | 비교표 6항목 · 위험한 줄 찾기 · `.claude/skills` 모양 | 공개 저장소 3개 실제 주소 | **통과(10-30 · v2.2 카드로 재확인)** |
| 5 | 9 · 11 업무 검색 · 스크립트 | 9단계 업무 칸 → gh 검색 · 비교표 · 검색어 줄 / 11단계 `gh_skills.py` 표 · CSV · `seen.txt` · 로그 · **드라이브 「작업 폴더 이름」 복사** | `claude -p` 3회 (키 필요 없음 · 에이전트가 할 수 있음) | 남음 · API 무인증 호출만 확인(10-30) |
| 6 | 13 · 14 스케줄러 | `run.bat` ASCII · CRLF · 등록 · 지금 실행 0x0 · 두 설정 True · 삭제 | 스크래치 이름으로 등록 → 판정 → 바로 삭제 | **통과(10-30 · 대역 스크립트)** |
| 7 | 15~17 슬랙 | 회사 메일로 새 워크스페이스 · 매니페스트(`incoming-webhook` 하나)로 앱 · 설치 때 채널 선택 · 웹훅 주소 · 메시지 2개 | 새 계정 1회 (게이트 G5 · G8) | 남음 · 막히면 개인 메일 가입 · From scratch 화면 방식 |
| 8 | 18 루틴 | 루틴 생성 · 저장소 선택 필요 여부 · 커넥터 읽기 · 예약 끄기 | 강사 계정 1회 (게이트 G6) | 남음 |
| 9 | 7 비공개 리포(gh) | gh 없는 PC 에서 winget 설치 · 로그인 안 됐을 때 멈춤 · `gh auth setup-git` · `PRIVATE` | 강사 계정 · gh 미설치 PC 1회 · 테스트 리포(끝나면 삭제) (게이트 G7) | 남음 · 막히면 웹 화면 New repository |

- 실측 방법(10-30): 교육생 PC 조건으로 Git 이름 · 메일을 비우고(`GIT_CONFIG_GLOBAL` = 빈 파일) `claude -p --resume` 로 「좋아」 를 차례로 보낸다 — 확인 대기가 있는 카드도 `-p` 로 잴 수 있다.
- ⚠️ `.claude` 폴더 쓰기는 `-p` 로는 `acceptEdits` 여도 막힌다 — 11단계 설치는 대화형 허락 창으로만 된다(교육생 화면에서는 창이 뜬다).
- ⚠️ 이 PC 에서는 `npx` 실행 · `claude -p --permission-mode bypassPermissions` 가 권한 확인에서 막힌다 — `--allowedTools` 로 필요한 명령만 연다. 공백이 든 규칙(`Bash(gh api:*)`)은 셸에서 따옴표가 풀리면 둘로 쪼개진다.
- 남은 4항목이 끝나면: 기획서 §5 · 이 표 · `AX_study/CLAUDE.md` advance 항목 · AX_source `out/20261102/회차유형.json` 비고를 고친다.

## 다음에 할 일 — 미결 · 미실측 (2026-11-02 기준)

가이드에는 반영하지 않은 결정 대기 · 실측 대기 항목이다. 사용자 답을 받거나 실측이 끝나면 이 표에서 지운다.

| # | 과정 | 할 일 | 상태 |
|---|---|---|---|
| 1 | basic 2step v1.30 | `#playwright` 「알아 두기」(`.playwright-mcp` 폴더) 상자를 지울지 | 사용자 답 대기 |
| 2 | basic 2step v1.30 | 「더 하기 — Playwright 스크립트 설치」 프롬프트를 Python · playwright 미설치 PC 에서 처음부터 실측 | 남음(이 PC 는 Python 3.12.10 · playwright 1.59.0 이 이미 있어 못 잼) |
| 3 | basic 2step v1.29 | Playwright MCP 설치 프롬프트 대화형 실측: 허락 창 · Git Bash 에서 `/c` 변환 · 첫 연결 지연 · Node · Chrome 없는 PC · 사내망 | 남음(이 PC 는 Connected · example.com 통과) |
| 4 | advance 1step v2.23 | `/wrap-up` 스킬 카드를 8단계 끝 접힌 카드로 둘지, 번호 단계로 바꿀지(바꾸면 9~17 번호 · 진행 체크 키 · 단계 참조 문장 수정) | 사용자 답 대기 |
| 5 | advance 1step v2.23 | `/wrap-up` 대화형 실측: ① 스킬 만들기 프롬프트로 `.claude/skills/wrap-up` 쓰기(허락 창) ② 대화가 있는 세션에서 문서 반영이 어떻게 되는지 | 남음(`-p` 로는 `.claude` 쓰기 막힘 · 스킬 파일 직접 넣고 커밋·push / `.env` 멈춤 2건만 통과) |
| 6 | advance 1step | 스테이징 설명 보강안 — A: `adv_scm_panel` 번호 표에 ⑥ `+`(스테이징 버튼) 추가 · B: 「스테이징된 변경 사항」 캡처 추가 · C: 용어 표에 연결 | 사용자 선택 대기 |
| 7 | AX_source | `out/20261102/회차유형.json` 이 옛 구성(v2.0) — 재발행 여부 | 사용자에게 물을 것 |

- 참고: 이 PC 에 playwright MCP 가 user 범위로 등록돼 있다(`C:\Users\User\.claude.json`). 지울 때는 `claude mcp remove playwright -s user`.
- 참고: v2.23 발행 때 advance 1step handout 은 백업 없이 덮어썼다. 옛 handout 은 `archive/advance_1step_guide.src.html.261102.bak` 를 빌드하면 다시 만들어진다.
- ⚠️ `claude -p` 시험 때 PowerShell 파이프(stdin)로 `/wrap-up` 을 넣으면 「스킬 없음」이 나올 수 있다 — 인자로 넣는다.

## 5. 변경 이력

| 날짜 | 내용 |
|---|---|
| 2026-11-08 | **advance 1step 가이드 v2.32 (사용자).** 단계마다 확인 아래 주의 · 팁 상자를 「주의사항 (개수)」 접힌 카드 하나로 묶음(1~10 · 12~15단계 · 기존 접힌 카드는 그대로). 백업 `archive/advance_1step_guide.src.html.261108b.bak` |
| 2026-11-08 | **advance 1step 가이드 v2.31 — 1 · 7~10단계 프롬프트 = 11단계처럼 [입력] 칸 (사용자).** 1단계 = 프로젝트 폴더(비우면 git_practice 만) · 더 뺄 것 · Git 이름 · 메일 칸, 후보 고르기 · 「좋아」 대기 삭제 / 7 · 8단계 = 리포 이름 칸 / 9단계 = 내 업무 칸 / 10단계 = 저장소 주소 · 스킬 이름 칸. 안전장치(이미 저장소면 멈춤 · 데이터 · 개인정보면 멈춤 · 로그인은 사람 · origin 다르면 멈춤 · 위험한 줄이면 멈춤)는 고정 문구로 유지. 단계 번호 · 진행 체크 키 그대로 · ⚠️ 바뀐 카드 실측 전. 백업 `archive/advance_1step_guide.src.html.261108.bak` · `archive/CLAUDE_advance_1step_가이드.html.261108.bak` |
| 2026-11-08 | **advance 2step 가이드 v4.1 — 1~4단계 = 사용법 체험 · 5단계 = 어떤 업무에 쓸지 (사용자).** 3단계 = 서브 띄우기 · 챙겨서 넘기기(싱글 카드 뺌) · 4단계에 팀원에게 직접 말 걸기 · 「팀은 대화형에서만」 경고 추가 · 확인을 조작 확인으로. 5단계 「어떤 업무에 써 볼까 — 기본은 싱글」 = 근거(공식 문서 팀 약 7배 · Anthropic 3~10배) · 판단 순서 3단 · 업무 추천 표(싱글 / 서브 맥락 보호 · 넓게 훑기 · 검산 / 팀) · 내 업무 카드. 실측 표 팀 행 = `-p` 조건 표기(이름 붙인 서브끼리 쪽지). 정답표 [3] · 기획서 결정 G 같은 날. 백업 `archive/*.261108.bak` |
| 2026-11-07 | **advance 2step 가이드 v4.0 — 3 · 4단계 소재를 담당별로 나뉜 문의로 (사용자).** 소재 실측 9가지(`advance/2step/소재실측/`) 중 결과가 갈린 것은 정보가 나뉜 일 하나뿐이라(서브 얽힌 문의 0/5 · 싱글 · 팀 대부분 맞음) 3단계 = ① 싱글 ② 서브 셋에게 자기 파일만 ③ 메인이 「같은 학부모 목록」을 넘겨 나누기 · 4단계 = 팀원 A · B · C 가 서로 직접 묻기로 바꿈. 옛 판 규정 검산은 3 · 4단계에서 뺌(싱글도 스스로 찾음). handout `cs_practice/담당별/` · `정답표_담당별문의.txt` 추가(기존 파일 그대로 = master 1 · 2step 이 계속 씀). 시작 전 비유 · 5단계 판단표 · 실측 표 · 맡길 업무 표 수정. 기획서 같은 날 반영. 백업 `archive/advance_2step_guide.src.html.261107.bak` |
| 2026-11-07 | **master 1step 가이드 v1.1 — 번외 「칸 화면 훅」 (사용자).** PART 2 끝 번호 없는 단계: 서브 · 팀원을 부를 때(PreToolUse · Agent) 훅 `agent_panes.js` 가 Windows Terminal 창을 열고 담당마다 칸을 더해 `pane.js` 로 실시간 표시(공식 tmux 분할 모드는 Windows Terminal · VS Code 미지원이라 대신). 받을 파일 `정답_훅` 에 agent_panes.js · pane.js · 칸화면_설정.json 추가 → 드라이브 업로드. 단계 번호 · 진행 체크 그대로. advance 2step 강사 시연 bat 도 같은 칸 화면으로 바꿈(서브 · 팀 실행 확인) · 시연 영상 칸 화면판 추가 |
| 2026-11-06 | **starter 1step 가이드 v1.26 — PART 7 「다음 단계」 삭제 (사용자).** 다음 과정 미리 보기 표를 통째로 지웠다(다른 PART 번호는 그대로). 표 안에 있던 「화면 기준」 각주는 PART 5 끝으로 옮겼다. 재발행. |
| 2026-11-06 | **master handout 드라이브 게시 · advance 2step 가이드 버그 수정 · AX_source 기획서 발행 (사용자).** `upload_basic_handout.py` 가 `master/1step` · `master/2step` 도 받게 해 드라이브 AI-AX-Study › master › 1step(3개) · 2step(10개)에 올림. advance 2step `guide.src.html` 의 정규식 찌꺼기 `\1` · `\2` 3곳 복구(4단계 「팀 회의」 항목 · 복사 상자 · PART 4 막혔을 때 섹션) → 재발행. AX_source 20261116 · 20261123 기획서 PDF 발행(`--plan`). |
| 2026-11-06 | **master 1step · 2step 가이드 v1.0 첫 발행 (사용자).** master 2step 순서를 **슬랙 봇 → 플러그인 → 모드**로 바꾸고(1 · 2 봇 · 3~5 플러그인 · 6 · 7 상태줄 · `/cs-report`) 1step(기억 · 훅 · 하네스 · 루프 8단계)과 함께 가이드로 만듦. 소재 = advance 2step 의 가상 학부모 문의(`cs_practice`). 받을 파일 = 1step `정답_훅`(가짜 입력 9건 통과) · 2step `정답_봇` · `정답_플러그인`(`claude plugin validate` 통과) · `정답_커맨드`. `courses.json` 에 `master-1step` · `master-2step` 추가. 기획서 2편 · AX_source 회차 20261116 · 20261123 `회차유형.json` 맞춤. ⚠️ 카드 실측 전 · handout 드라이브 업로드 전 |
| 2026-11-05 | **advance 2step 가이드 v3.2 — 실습 소재 교체 (사용자 · D안).** 직영 리포트 → 가상 학부모 문의 15건 답변. 2단계 응대 담당 `cs-reply` 만들기 · 3단계 옛 판 규정으로 쓴 답변을 검산 담당이 잡기(문의 4 · 9 · 13) · 4단계 replier · policy · parent 팀. handout = `cs_practice/`(문의 · 현행 규정 · 옛 판 규정) · `정답_응대담당.md` · `정답표_문의답변.txt` · `팀켜기.txt`. 기획서 같이 고침 · 단계 번호 · 진행 체크 키 그대로 · 옛 파일 `archive/advance_2step_data소재.261105/` · 카드 실측 · 시연 폴더 · 드라이브 업로드 남음 |
| 2026-11-05 | **advance 2step 가이드 v3.1 (사용자).** 시작 전 「일을 나누는 세 가지」 = 회사 비유 표 → 포스터 검토 비유 표(싱글 · 서브 · 팀) + 실습 연결 한 줄 · 사용량 상자 삭제 · 5단계 방법 · 확인 · 숙제 · 주의 삭제 → 「어떤 업무를 맡기면 좋을까」 표(싱글 · 서브 · 팀별 맞는 업무 · 예시 · 맞지 않는 업무). 발행 완료 · 단계 번호 · 진행 체크 키 그대로 · 백업 `archive/adv2_guide.src.html.261105.bak` |
| 2026-11-04 | **basic 2step 가이드 v1.31 (사용자).** 페이지 맨 위(`<main>` 첫 줄) 「먼저 보기」 상자 = API · MCP 설명 영상 링크(YouTube Data API 로 고름 · 소소한 AI 입문노트 「MCP vs API 뭐가 다른데?」 26-10-31 · `&t=93s` = 1:33 부터). 백업 `archive/CLAUDE_basic_2step_가이드.html.261104.bak` |
| 2026-11-02 | **팀별 진행표 — 출판팀 · FC팀 추가, 「팀별로 지금 할 수 있는 것」 삭제 (사용자).** 새 두 팀은 예정 · 차수 없음. 할 수 있는 것 판정(`CAPS`) · AI 분석 버튼 · `sample` capability 를 같이 뺐다. 기존 팀 차수 기록은 그대로 |
| 2026-11-02 | **advance 1step 가이드 v2.23 (사용자).** 8단계 끝 접힌 카드 「작업 마무리를 스킬로 — /wrap-up」 = 문서 업데이트 vs 커밋 · push 표 · SKILL.md 내용 그대로 붙인 만들기 프롬프트(워크스페이스 `.claude/skills/wrap-up` · `disable-model-invocation: true`) · 줄마다 이유. 강사 PC 실측 2건(코드만 = 커밋 · push / `.env` 섞임 = 점검에서 멈춤) 통과 — `claude -p` 에 stdin 파이프로 넣으면 스킬을 못 찾는 경우가 있어 인자로 넣어 잼. 백업 `archive/advance_1step_guide.src.html.261102.bak` |
| 2026-11-02 | **basic 2step 가이드 v1.30 (사용자).** `#playwright` 주의 상자(로그인 남음 · --isolated) · 막히면 상자 삭제 → 접힌 카드 「매일 반복할 일이면: Playwright 스크립트 설치」(MCP vs 스크립트 비교표 · pip 설치 프롬프트). 백업 `archive/basic_2step_guide.src.html.261102b.bak` |
| 2026-11-02 | **basic 2step 가이드 v1.29 (사용자).** `#playwright` 설치 프롬프트 = PowerShell 로 · `-s user` · Node 18 이상 · 실패 시 오류 그대로 멈춤 · Failed 면 재확인 · 재시작 뒤 `/mcp`. 준비에 크롬 · 허락 창 · `.playwright-mcp` 폴더 팁. 강사 PC 실측(2.1.316 · Node 24) 설치 Connected · example.com 시험 통과. 백업 `archive/basic_2step_guide.src.html.261102.bak` |
| 2026-11-01 | **basic 1step v1.10 · advance 2step v2.3 — 스킬 · 에이전트 위치를 워크스페이스로 (사용자).** `basic_data\.claude` → 워크스페이스 폴더(basic_data 바로 위)의 `.claude`. 5 · 9단계 카드 = 「basic_data 바로 위 폴더의 .claude/… 로 만든다 · 만든 뒤 전체 경로를 알려 준다」 · 확인은 윈도우 탐색기(VS Code 탐색기엔 안 보임) · 5분 규칙 · 막혔을 때 · 마무리 · advance 2step 2단계 확인 · 없으면 · 검산 담당 확인. 워크스페이스 이름은 사람마다 달라 `claude_work` 같은 폴더 이름 · 예시를 쓰지 않는다. 하위 폴더에서 켜도 위 폴더 `.claude` 의 스킬 · 에이전트가 불려오는 것 실측(`claude -p`). 팀 플래그 `settings.local.json` 은 basic_data 그대로. 백업 `archive/basic_1step_guide.src.html.261101.bak` · `archive/advance_2step_guide.src.html.261101.bak` |
| 2026-11-01 | **basic 2step 가이드 v1.28 (사용자).** 선택 단계 `#chrome` · `#playwright` 를 설치만 하는 프롬프트로 — GCP 설정 · 로컬 인증 프롬프트 삭제(구글API 매뉴얼과 더는 맞추지 않음). 각 단계 = 설치 프롬프트 1개 + example.com 시험. 카드 실측 전. 백업 `archive/basic_2step_guide.src.html.261101.bak` |
| 2026-11-01 | **advance 1step 가이드 v2.22 (사용자).** 15단계 프롬프트 위 바꿀 칸 설명 표 · 워크스페이스 · 채널 이름과 달라도 됨 |
| 2026-11-01 | **advance 1step 가이드 v2.21 (사용자).** 15단계 매니페스트에 bot_user.display_name · scopes.bot incoming-webhook 추가 — 실측 앱 생성 · 웹훅 · 알림 테스트 통과 |
| 2026-11-01 | **advance 1step 가이드 v2.20 (사용자).** 15단계 프롬프트 1번 = 매니페스트 JSON 그대로(display_information.name · settings.incoming_webhooks.incoming_webhooks_enabled) |
| 2026-11-01 | **advance 1step 가이드 v2.19 (사용자).** 8단계 끝 「커밋 · push · 게시」 · 「새 프로젝트를 시작할 때」 접힌 카드로 |
| 2026-11-01 | **advance 1step 가이드 v2.18 (사용자).** 8단계 끝 「새 프로젝트를 시작할 때 — GitHub 에 올리려면」 순서 표 · 한 번에 시키는 프롬프트 · 1단계 팁 연결 |
| 2026-11-01 | **advance 1step 가이드 v2.17 (사용자).** 8단계 끝(9단계 앞) 「커밋 · push · 게시」 상자 — 표 · 커밋만으론 안 올라감 · 웹에서 보는 곳 |
| 2026-11-01 | **advance 1step 가이드 v2.16 (사용자).** 9단계 프롬프트 2번(검색 방법) 삭제 → 4개 항목. 검색 방법은 Claude 가 정함(재실측 필요) |
| 2026-11-01 | **advance 1step 가이드 v2.15 (사용자).** 9단계 예시 = 실측 후보 중 추천 variance-analysis(anthropics/knowledge-work-plugins) · 10단계 확인 /variance-analysis. 9단계 실측 통과(공식 저장소 먼저 · 파일 구성 열 동작) |
| 2026-11-01 | **advance 1step 가이드 v2.14 (사용자).** 7단계 확인 = gh 새로 설치 시 VS Code 모두 닫고 다시 열기 · 9단계 2번 gh 전체 경로. 실측 9단계 gh: command not found(127) |
| 2026-11-01 | **advance 1step 가이드 v2.13 (사용자).** 9단계 공식 저장소 먼저 검색 · 파일 구성 열 · 한 파일 스킬 우선 · 데이터 분석 예시 analyze(anthropics/knowledge-work-plugins) · 10단계 확인 예시 /analyze · 멈춤 안내. 실측: 스크립트 딸린 스킬이 10단계 규칙에 멈춤 |
| 2026-11-01 | **advance 1step 가이드 v2.12 (사용자).** 7단계 끝(8단계 앞) 「GitHub 메뉴 둘러보기」 — Dashboard ①~⑦ · 리포 탭 ①~⑨ 캡처 · 번호 표 |
| 2026-11-01 | **advance 1step 가이드 v2.11 (사용자).** 8단계 안전장치 — 2번 git remote -v 먼저 · 다른 주소면 멈춤 · 4번 아이디 · 리포 gh 직접 조회. 8단계 실측 통과(파일 4개 · 데이터 없음 · 4번 = jck-220) |
| 2026-11-01 | **advance 1step 가이드 v2.10 (사용자).** 7단계 4번 = 워크스페이스 저장소로 리포 생성(여러 저장소라 되묻던 것 해소) · 7단계 끝 「비공개인지 눈으로 확인하기」 자물쇠 캡처 · 번호 표 · 7단계 실측 통과(jck-220/work PRIVATE) |
| 2026-11-01 | **advance 1step 가이드 v2.9 (사용자).** 6단계 4번 2단계 인증 켜기 · 확인 문구 삭제(아직 의무 아닌 계정 많음) → 6단계 끝 접힌 카드 「2단계 인증 (선택)」 = 설정 화면 캡처 · 번호 표 · 복구 코드 주의 |
| 2026-11-01 | **advance 1step 가이드 v2.8 (사용자).** 6단계 = Git 메일 먼저 보고 그 메일로 가입 · 기존 계정은 Emails 추가(권장) 또는 Git 메일 변경 · 8단계 4번 = push 뒤 `commits/main .author.login` 으로 계정 연결 확인 · 막혔을 때 GH007 · 빈 결과. 8단계 4번 실측 전 |
| 2026-11-01 | **advance 1step 가이드 v2.7 (사용자).** 1단계 = 워크스페이스 저장소 + 프로젝트마다 저장소 + git_practice 를 한 프롬프트로(워크스페이스 제외 목록에 프로젝트 폴더 · --global) · 2단계 = 소스 제어에서 저장소 보기(캡처 + 번호 표) · 3~5 = git_practice 메모.txt · 10단계 경고 수정 · 막혔을 때 2줄. 기획서 맞춤. 1~5 재실측 전 |
| 2026-11-01 | **advance 1step 가이드 v2.6 (사용자).** Git 저장소를 프로젝트마다 따로 — 1단계 = 프로젝트 폴더에서 Git 시작(상위 저장소면 멈춤) · 2단계 = 연습 파일 정하기 · 3~5 그 파일만 · 10단계 프로젝트 .claude · 공용 .claude 팁 · 막혔을 때 표 1줄. 기획서 결정 B · 표 맞춤. 2~5 재실측 전 |
| 2026-11-01 | **advance 1step 가이드 v2.5.** 1단계 = Git 이 없으면 Claude 가 설치까지(winget → 실패 시 GitHub 릴리스 설치 파일 /VERYSILENT · 허락 창만 사람 · 설치 뒤 전체 경로로 이어서). 준비물 · 막혔을 때 표 맞춤. **11-01 다른 PC(Git 없음) 실측 통과** = winget 설치 → 전체 경로로 이어서 → 커밋 1개(파일 4 · 데이터 제외) · 껐다 켜기 없음. 관찰: 「선택」 제외 후보(.code-workspace)를 묻기 전에 Claude 가 뺌 · 첫 커밋에 LF→CRLF 경고(정상) → 같은 날 1단계 카드에 반영(두 번째 「좋아」 · 메일 = GitHub 가입 메일 · 선택 후보 사람이 정함 · 「게시 Branch」 주의 · CRLF 팁 · 확인 = git --version · 2단계 VS Code 모두 닫았다 다시 열기). 프롬프트 4번 문장 추가분은 재실측 전 |
| 2026-10-30 | **advance 1step 가이드 v2.4 (사용자 3개 지시).** 9단계 = 업무 내용 칸을 넣고 gh 로 검색 · 기준표 비교 · 가장 적합한 1개(옛 「검색하기」 삭제) · 11단계 `gh_skills.py` = 9단계 검색어로 찾고 결과 CSV 를 구글 드라이브 데스크톱 앱의 「내 드라이브\<작업 폴더 이름>」 에 복사 · 17단계 루틴 = 그 CSV 요약 · 17단계 · 진행 체크 키 `cc-adv-edu-steps-v5` · 준비물에 드라이브 앱. 기획서 G9 추가. 9 · 11 · 17 카드 실측 전 |
| 2026-10-30 | **advance 1step 가이드 v2.3 (사용자 5개 지시 · 3차 개편).** 준비물 아래 Git · GitHub 비교표 · 관계 그림(인라인 SVG) · 7단계 비공개 리포 = 프롬프트(GitHub CLI `gh repo create --private` · 로그인만 사람) · 8단계 7단계 리포로 push · 유튜브 12 · 13단계 삭제 → 12단계 `gh_skills.py`(GitHub 검색 API · 키 없음 · 9단계 검색을 프로그램으로) · 14~19 → 13~18 · 진행 체크 키 `cc-adv-edu-steps-v4` · 작업 이름 `AX_gh_daily` · 슬랙 = 내 계정 가입 · 내 워크스페이스(강사 초대 폐기) · 16단계 웹훅 = 매니페스트를 Claude 가 만들고 사람이 붙여넣기 · 허용 · 주소 붙여넣기. 기획서 3차 개편 반영. 7 · 12 · 15~17 카드 실측 전. 백업 `archive/*261030b.bak` |
| 2026-10-30 | **advance 1step 카드 실측 · 가이드 v2.2 발행 (사용자 「반영하고 발행」).** 1 · 2 · 4 · 6번 통과(1단계 4/4 · 연습 폴더 3/3 · GitHub 찾기 · 스케줄러). 카드 수정 = PART 1 허락 창 팁 · 1단계 카드 4번 「내용은 화면에 옮기지 마」 · Co-Authored-By 팁 · 11단계 스킬 이름 · 「그 파일만」 · SKILL.md 한 파일짜리부터 · `.claude` 허락 창 팁 · 기준 버전 2.1.312. 남은 것 = 8 push · 12~13 유튜브 · 16~18 슬랙 · 19 루틴(강사 계정) |
| 2026-10-29 | **Advance 교육 실측 계획 기재 (사용자).** 「다음에 할 일 — Advance 교육 카드 실측 (2026-10-30 예정)」 절 신설(8항목 · 방법 · 막히면) · 맨 위 과정 표에 Advance 행 · 자료 위치에 Advance 열람 링크 행 · 기획서 §5 상태 = 10-30 실측 예정 |
| 2026-10-29 | **Advance 교육 가이드 v2.0 (사용자 6개 지시 · 2차 개편).** PART 1~10 · 19단계 · 한 장(2회로 나누지 않음) · 진행 체크 키 `cc-adv-edu-steps-v3`. Git = 내 워크스페이스를 Git 으로(1) + 내가 고른 연습 폴더에서 저장 · 되돌리기 · 브랜치(2~5) · GitHub 가입 · 비공개 리포 · 올리기(6~8) · GitHub 에서 스킬 · 에이전트 · 룰 찾기(9~11) · 유튜브 API 로 찾기(12~13 · `yt_skills.py`) · 작업 스케줄러(14~15) · 슬랙 웹훅 가입부터(16~18) · 클라우드 루틴 기술 · 제약(19) · 끝 정리. 교육청 수집 · 「마무리」 단계 폐지. 2판 카드 실측 전. 백업 `archive/*261029_v11.bak` |
| 2026-10-29 | **Advance 교육 가이드 v1.1 (사용자).** Playwright MCP 를 Advance 교육에서 뺐다 — 브라우저 조종은 초급 체험 가이드에서 다룬다. PART 4 = 「스크립트 — 반복할 일을 파일로」 한 단계(수집 스크립트 만들기) · 12 → 11단계 · 진행 체크 키 `cc-adv-edu-steps-v2` · 준비물 Node.js 행 · 막혔을 때 MCP 2줄 삭제. 기획서 결정 B 교체 · 결정 4(진행표 · 기술스택표에 MCP 추가) 취소 · G3 · M6 삭제. 백업 `archive/*261029_v10.bak` · `archive/Advance_교육_기획.html.261029b.bak` |
| 2026-10-29 | **Advance 교육 가이드 v1.0 발행 · 초급 체험 v1.26 · 입문 v1.24 (사용자).** Advance 교육 = 자동화 · PART 1~9 · 12단계(Git · GitHub · Playwright MCP · 작업 스케줄러 · 슬랙 웹훅 · 마무리 · 클라우드 루틴) · 공개 주소 `ax_study/claude-code-automation.html` · 도구 키 `advEdu` · 정본 기획서 `advance/1step/advance_1step_기획.html` · Git 은 실습 폴더 `auto` 에서만 · GitHub 에는 코드만(개인정보 · 데이터 금지) · Git 카드 1~3 실측 3/3(나머지 미실측). 브라우저 조종 도구 = Playwright MCP 로 확정(Claude in Chrome 대신) — 초급 체험 v1.26 에 「Playwright MCP 로 하기」 선택 단계. 입문 PART 7 표의 중급 교육 「(준비 중)」 → 링크. AX_source 6tr-Advance-교육 회차(`out/20261102`) 발행 |
| 2026-10-28 | **입문 가이드 v1.23 (사용자).** 2단계 = ZIP 을 풀고 안의 VS Code · Node.js 설치 파일을 하나씩 실행(설치하기.bat 안내 삭제 · 확장 3단계 · Claude Code 7단계는 직접). **전역 규칙 삭제** — `CLAUDE_초기설정.txt` 는 작업 폴더 규칙 하나만 만드는 30줄 프롬프트(직접 고치는 원본 · `make_merged_txt.py` 는 archive 로 은퇴). 11단계 확인 = 「이 작업 폴더의 규칙을 요약해줘」. 교육순서 txt · 드라이브 반영 |
| 2026-10-28 | **입문 가이드 v1.21 · 초급 교육 가이드 v1.7 · v1.8 (사용자).** 입문: token-efficient 스킬 삭제(전역 규칙과 6줄 중복) → 스킬에만 있던 「짧게 요청 · 프로그램이 읽는 출력」을 전역 규칙에 넣음 · 11단계 삭제 → 11단계 · 키 `cc-guide-steps-v13`. `make_merged_txt.py` 가 옛 조각을 `index` 로 잘라 1단계 절차가 두 번 · 작업 폴더 규칙 앞부분이 잘려 들어가던 버그 → 규칙 본문을 스크립트에 직접 둠 · 옛 조각 검사 assert. 교육순서 txt 정리. 초급: PART 1 비교표 행 정리 · 주의사항 행, 소개 · 1단계 삭제 → 13단계 · 키 `cc-basic-steps-v5`, 폴더 만들기는 경로 프롬프트 대신 탐색기로 |
| 2026-10-27 | **초급 교육 가이드 v1.5 · v1.6 (사용자 · 마케팅팀 교육 대비).** 스킬 · 에이전트 비교표의 비유 · 예시를 마케팅팀 관점으로 바꿈(`ad-metrics` · 캠페인 리포트 담당 · 실습은 직영 데이터 그대로). PART 1 숙제 체크를 지우고 비교표를 PART 1 로 옮김 → PART 1~7 · 14단계 · 진행 체크 키 `cc-basic-steps-v4`. handout 관찰표 · 에이전트_틀 단계 번호 수정 · 드라이브 반영. 기획서 §0 · 변경 이력 수정 |
| 2026-10-26 | **초급 체험 가이드 v1.23 ~ v1.25 (사용자).** 시작 전 「오늘 배울 것」을 초심자용으로 다시 씀 — 세 가지(MCP · API · 크롤링) 영어 이름 표 · 「처음 보는 말」 표 · 「MCP 와 API 는 무엇이 다른가요」 비교표. PART 2 끝 번호 없는 선택 단계 「Claude in Chrome 으로 구글 API 연결 (회사 계정)」 = 구글API 회사판 매뉴얼 프롬프트 1 · 2 사본(매뉴얼을 고치면 같이 고친다 · 스킬 설치 프롬프트 3 은 넣지 않음). 법령 API 키 신청을 준비에서 API 맨 앞으로 옮겨 단계 번호 재매김(준비 1 · MCP 2~3 · API 4~5 · 6~9 그대로) · 진행 체크 키 `cc-basic-data-steps-v3`. 기획서 §3 목차 · 본문 단계 참조 · 변경 이력 같이 수정. ⚠️ `AX_source/out/20261012/회차유형.json` 은 옛 구성(v1.3 · 엑셀 모으기) 그대로 — 미반영. 백업 `archive/CLAUDE_초급체험가이드.html.261026*.bak` · `archive/초급_체험_기획.html.261026.bak` |
| 2026-10-22 | **팀별 진행표 아티팩트 신설 (사용자).** 진행 = 직영팀 · 인사팀 · 재무팀 · 부서장, 예정 = 마컴팀. 과정별 체크 → **차수(1차 · 2차) 기록**으로 전환(새 차수의 항목 고르기는 이전 차수 항목을 숨김). 「팀별로 지금 할 수 있는 것」 = 기술스택 항목 조합 20개를 진행 완료 차수 기준으로 판정(없으면 「없음」) + **AI 분석** 버튼(진행 완료 차수만 근거 · 예정 정보는 화면 · 프롬프트 모두 제외). 주소는 위 자료 표 |
| 2026-10-22 | **Advance 재편 — 교육 = 자동화 · 체험 = 직원 만들기 (사용자).** 교육 = Git · GitHub · 윈도우 작업 스케줄러(체험에서 이동) · 클라우드 루틴 · 슬랙 웹훅. 비공개 발행 · 루틴 + 아티팩트는 뺐다. 체험 칸은 기술 이름으로 다시 적었다(에이전트 정의 · 허용 도구 · `claude -p` · 실행 로그 · Git 커밋 · 놓친 작업 재실행 · 서브 · 에이전트 팀 · 판단표). 판단표 정정 — 클라우드 루틴은 수집을 못 해서 「이미 구글에 있는 데이터의 집계」만 맡는다(옛 「구글 · 공개 데이터」는 10-12 실측과 어긋남). 기술스택표 · 입문 가이드 v1.20(PART 7 중급 줄) · Advance 체험 가이드 v2.1(제목 컨셉) 반영. 백업 `archive/*.261022.bak` |
| 2026-10-20 | **초급 체험 가이드 v1.22 — 크롤링 「쓰는 범위」(가져와도 된다 ≠ 다시 공개 · 판매해도 된다).** 5단계 심화 상자 = 잡코리아 – 사람인 · 야놀자 – 여기어때(처벌과 배상은 다르다) · 6단계 「하지 않는 것」 한 줄 · 9단계 「남의 글을 다시 공개해도 되나요?」(공공기관 글 = 저작권법 제24조의2 · 출처 · 수집 날짜 · 요약 + 링크) · 흐름 그림 크롤링 칸 둘째 줄 · 네이버 카페 시연 주의 상자. 카드 · 단계 번호 · 진행 체크 키 그대로. 기획서 결정 D 같이 수정 |
| 2026-10-19 | **초급 체험 가이드 v1.21 — 구글 시트 실습을 공용 시트 + 내 이름 탭으로(사용자).** 4단계 = 시트 파일 하나에 내 이름 시트(탭) 만들기 — 강사 계정 = 강사가 쪽지로 보낸 공용 구글 시트 링크(가이드에 링크 안 넣음) · 본인 계정 = 새 스프레드시트 직접 만들기. 5 · 8단계 = 「개인정보보호법」 · 「학원공고」 새 탭 대신 내 이름 시트를 지우고 다시 넣어 업데이트(링크 + 둘째 줄 「내 시트: 이름」 + 카드 · 공용 파일에서 남의 탭 덮어쓰기 방지). 교육생별 시트 미리 만들기는 폐지. 기획서 · 기술스택표 C7 같이 수정 · 카드 실측 아직 |
| 2026-10-16 | **초급 체험 가이드 v1.20 — 6단계 robots.txt 읽는 법(사용자).** 1번 = 주소창에 직접 열기 · 접힌 상자 = 실제 줄 묶음별 뜻 표 + 「한글로 풀면」 허용/불가 표(1100 공지사항 · 1092~1099 시험안내 등 = 된다 / 1079~1091 · /work/ · /view/ · 첨부 = 안 된다). 게시판 이름은 사이트 메뉴 링크에서 확인(막힌 번호는 열지 않음). ⚠️ 사이트가 robots.txt 를 바꾸면 상자가 조용히 낡는다 — 수업 직전 확인 |
| 2026-10-16 | **초급 체험 가이드 v1.19 — 1단계 설치 첫 화면 캡처(사용자 제공).** `py_installer.png` = ① Add python.exe to PATH ② Install Now 빨간 상자. ⚠️ 화면 문구대로 이 설치 프로그램은 Python 3.15 가 마지막 — 3.16 이 안정판이 되면 1단계를 Python install manager 기준으로 다시 써야 한다 |
| 2026-10-16 | **초급 체험 가이드 v1.18 — 1단계 Python 다운로드 페이지 캡처(사용자).** `basic/2step/web/images/shots/py_download.png`(playwright 직접 촬영 · 개인 북마크 없음) — Stable Releases → Python 3.x.x → Windows installer (64-bit) 빨간 상자. 맨 위 Python install manager 는 받지 않는다는 한 줄. 설치 첫 화면(PATH 체크) 캡처는 설치 파일 실행이 권한에서 막혀 미포함 |
| 2026-10-16 | **입문 가이드 v1.19 — PART 7 「다음 단계」 표를 지금 과정 구성으로 교체(사용자).** 초급(basic) = 스킬 · 에이전트 · 외부 데이터 수집 · 결과 페이지 배포 / 중급(Advance) = Git · GitHub · 클라우드 루틴 · 비공개 발행 · AI 직원 · 서브와 팀 / 고급(master) = 규칙 4단계 · 권한 · 보안 · 함께 쓰는 앱과 도구. 열린 가이드 3개(초급 교육 · 초급 체험 · 중급 체험) 링크, Advance 교육 · master 는 「준비 중」. 단계 번호 그대로 |
| 2026-10-16 | **입문 가이드 v1.18 — PART 5 「작업이 끝나면 알림 받기 (훅)」(선택, 사용자).** 답변 완료(Stop) · 권한/입력 대기(Notification) 때 윈도우 알림 + 소리. 교육생판 `starter/1step/handout/hooks/notify.ps1`(강사 PC 스크립트에서 아이콘을 선택으로 바꿈 · 아이콘 없이 실행 오류 0 실측) → 드라이브 Starter › 교육 › hooks. 등록은 붙여넣기 문장 한 줄(옮기기 + 전역 settings.json 훅 2개). 단계 번호 1~12 · 진행 체크 키 그대로. `tools/upload_handout.py` 대상 폴더를 09-30 재정리된 Starter › 교육으로 고치고 하위 폴더 업로드 지원. ⚠️ 붙여넣기 문장은 `claude -p` 검증 전(실제 사용자 settings.json 을 고치므로 미실시). 기술스택표 B6 · E6 · A2 = 입문은 알림 훅 받아 쓰기(선택) · 훅 만들기는 그대로 master |
| 2026-10-14 | **Advance 재편 — 체험 = AI 직원 (사용자).** Advance 교육 「기록과 공유」 = Git · GitHub · 비공개 발행(체험에서 이동) · 클라우드 루틴 + 아티팩트 · 슬랙 웹훅. Advance 체험 「출근과 보고」 = 내 PC 가 켜져 있는 동안 일하는 AI 직원(채용 · 첫 출근 `claude -p` · 스케줄러 출근표 · 웹훅 보고 · Git 근무일지 · 결근 대비 · 서브 검산 담당 · 에이전트 팀 마지막 · 마무리 판단표 + 숙제). 발행된 체험 가이드는 주소 그대로 내용 업데이트 예정. 무인 실행 보안 → master 교육. 기술스택표 A2 · D5 ~ D8 · E6 |
| 2026-10-14 | **Advance 체험 가이드 v2.0 발행 — 「출근과 보고」(AI 직원 두기, 내 PC 가 켜져 있는 동안).** 주소 `ax_study/claude-code-agent-team.html` 그대로 내용 교체 · 11단계(채용 → `claude -p` 첫 출근 → 작업 스케줄러 출근표 → 슬랙 보고 → Git 근무일지 → 결근 대비 → 검산 담당(서브) → 에이전트 팀 → 판단표 · 퇴근 처리) · 진행 체크 키 `cc-adv-trial-steps-v1`. 카드 3~9단계를 스크래치 사본에서 순서대로 1회 실측(202609 과목수 5,198 · 학생수 3,115 = 정답표 일치 · 스케줄러 시험 작업 결과 0 · Git 되돌리기 · 10초 시간 초과 실패 기록 · 검산: 일치). ⚠️ 실측으로 고친 것: 출입증 폴더 칸은 `Write(...)` 가 아니라 **`Edit(./리포트/**)`** 로 써야 한다(`Write(...)` 는 그 폴더 쓰기까지 거절). handout 에 `정답_업무지시서.md` · `정답_출입증.txt` · `정답_run.js` 추가(실측 결과물). 미실측: 실제 슬랙 전송 · 10단계 팀 · 카드 3회 반복 · 드라이브 배포 폴더 교체 |
| 2026-10-14 | **초급 체험 가이드 v1.12 ~ v1.17 (사용자).** 네이버 카페 시연: 「길이 막히면 다른 길」 상자 → 「Playwright 가 뭔가요?」 설명 + 설치 안내 한 줄(`pip install playwright` → `playwright install chromium` · 약 150MB · 교육생은 설치 안 함) · 마무리 끝 「주의」 · 「수업 끝」(.env 반출 금지) 상자 삭제 · 마무리 판단표 · 「오늘 만든 것 / 다음 과정」 표 삭제 → 흐름 그림이 대신함(수집 3가지 = 판단 질문 · 배포 3가지 = 누가 보나, 설명은 화살표 위 · 상자엔 이름만 · 넓은 화면에서 커지지 않게 최대 폭 제한) · 기획서 §3 · 변경 이력 |
| 2026-10-14 | **초급 체험 가이드 v1.11 (사용자).** 「Claude 웹사이트」 → 「Claude 아티팩트」(가이드 본문 · 기획서 · 기술스택표 C7 · 변경 이력은 옛 문구 그대로) · 마무리 맨 위에 흐름 그림(수집 3가지 → 모으기 → 페이지 한 장 → 배포 3가지, 인라인 SVG · 다크 모드 · 폰은 그림 안 가로 스크롤) |
| 2026-10-13 | **과정 키워드 8칸 확정 (사용자).** starter 교육 「설치와 규칙」 · 체험 「만들기와 배포」 · basic 교육 「기준과 담당」 · master 체험 「권한과 협업」(「권한과 공유」는 basic 체험과 「공유」가 겹쳐 협업으로). §1 과정 키워드 표 · 기술스택표 8행 · CLAUDE.md · 초급 교육 기획 §0 컨셉 행. |
| 2026-10-12 | **`test\AX_Adoption` 삭제에 따라 `CLAUDE.md` 안내 정리 (사용자 지시).** 이 과정 구조를 따라 맞추던 `AX_Adoption/AI교육/`(마스터 커리큘럼 M0~M9 매핑)이 폴더째 삭제돼 「따라오는 폴더」 안내를 「삭제됨 · 따라오는 폴더 없음」 한 줄로 바꿨다. 가이드 · 기획서 · 발행물 무변경 |
| 2026-10-12 | **Advance · master 재편 (사용자 확정).** 칸별 컨셉 = basic 체험 「수집과 공유」 · Advance 교육 「예약과 알림」 · Advance 체험 「분업과 백업」(비공개 발행 = 팀 결과 마무리 단계) · master 교육 「규칙 · 규정」. master 체험 = Supabase 앱 · 플러그인 · 슬랙 봇(항목만). 시트 「인프런 대조 추가안」 신설(추천 13행 · 미반영). Advance = 자동화: 교육 윈도우 스케줄러 · `claude -p` · 클라우드 루틴 · 루틴 + 아티팩트(PC 꺼진 상태 업데이트) · 슬랙 웹훅 / 체험 Git · GitHub · 비공개 발행(아티팩트 기본 + Apps Script 비교) · 서브 · 에이전트 팀. master = 규칙 · 규정: 교육 규칙 4단계(CLAUDE.md → 룰 → 훅 → 하네스) · 하네스 엔지니어링 · 실습 산출물 / 체험 Supabase 앱 · 플러그인(항목만). 제외: `/loop` · GitHub Actions · GitHub Pages(무료는 공개뿐) · Drive API. 서브 · 팀 가이드 `master/체험/` → `advance/2step/`(원격 경로 그대로). 실측: 클라우드 루틴 기본 환경은 슬랙 · law.go.kr · sen.go.kr 차단 · Drive 커넥터 엑셀 읽기는 줄바꿈 소실(CSV · 시트 사용) |
| 2026-10-08 | **초급 체험가이드 v1.4 → v1.8 — 9단계 「수집 결과 페이지 배포」 (사용자 지시).** 옛 9단계 「웹앱 배포 다시 보기」를 바꿨다. 9-1 카드로 `law\법령.csv` + `crawling\학원공고.csv` → `publish\수집결과.html` 한 장(링크 새 창 · 외부 파일 0 · 3회 검증 3/3, 첫 판은 새 창 1/3 이라 문장 추가 후 재검증) → 9-2 구글 웹앱(script.google.com 새 프로젝트 · Code.gs `doGet` + HTML 파일 · 설정 3가지) · 9-3 Claude 웹사이트(아티팩트 게시 · 교육생 계정 실측 OK) · 9-4 사내 로컬 서버를 **교육생 실습**으로(IP 카드 3/3 · 새 터미널 `python -m http.server 8000 --directory publish` · `/.env` 404 확인 · Ctrl+C · 사내 접속 실측 OK) + 「PC 만 켜져 있으면 열리나? — 아니다(서버 실행 중 · 같은 IP · 같은 사내망)」 상자 + 명령 없이 말로 켜고 끄는 접힌 카드(3회 검증 전) · 세 방식 비교표 · 막혔을 때 3줄 · 9단계 20분 · 전체 95분. 예시 IP 삭제(v1.8). 결과 파일을 `publish\index.html` 로 — 로컬 서버 주소만 열어도 목록 없이 바로 열림(v1.9 · 카드 3회 재검증 3/3). 기술스택표 Advance 교육에 「드라이브 HTML + Drive API 웹앱(사내 대시보드 방식)」 추가 — 초급은 Code.gs + HTML 파일 유지. 기획서 §0 · §1 · §3 · §4 · §5 · §7 · §8 반영 · 기술스택표 basic 체험 칸을 v1.9 기준으로 다시 씀(보도자료 · 엑셀 모으기 · .env 배포 · 웹앱 배포 다시 보기 → 현행) · README 과정 개요 줄 갱신 |
| 2026-10-07 | **드라이브 정리 (사용자 지시).** 「초급 준비물/체험/mcp」 폴더 삭제(휴지통) → 시험 시트 「김지창」을 「초급 준비물/체험」 으로. 교육생 이름 시트도 「체험」 폴더에 바로 만든다. 가이드에는 폴더 경로가 없어 재발행 없음 · 기획서 · CLAUDE.md 경로 수정 |
| 2026-10-07 | **초급 체험가이드 v1.3 이어서 — 크롤링 파트 재구성 (사용자 지시).** 소재 서울시교육청 보도자료 → **고시 · 공고 게시판 「학원」 검색**(www.sen.go.kr · q_bbsSn=1100 · robots 금지 번호 1079~1091 밖). 6단계 = 목록 + 상세 글 둘 다 허락 확인 / 7단계 = 1~4 번호 카드 한 장(`crawling\학원공고.csv` · 작성자 이름 제외 · 글 수 · 번호 검산 · 「관련」 판단(대학원 · 학교법인 함정) · O 글만 본문 3줄 요약 · 첨부 안 받음) / 8단계 = 엑셀 모으기 폐지 → **크롤링 결과를 내 구글 시트 「학원공고」 탭에 적재**(이미 있으면 업데이트) · PART 4 로 이동(6~8단계 · 30분), PART 5 = 마무리 9단계. 카드 각 1~2회 실측(10건 · O 6 · 요약 6 · 이름 0). 기획서 대조 반영. 백업 `archive/basic_data_guide.src.html.261007k~o.bak` · `archive/초급_체험_기획.html.261007b.bak` |
| 2026-10-07 | **초급 체험가이드 v1.3 발행 — 강사 실습 중 피드백 반영 (사용자 지시).** 2단계 법령 API 즉시 자동 승인(실측) · OC 입력 · 법령종류 전체선택 / 세 가지 길 표: 「쓰는 때」 삭제 · 길마다 연결 예시 3개 · MCP · API · 크롤링 원래 이름 / 1단계 주의 상자 → 「왜 Python 을 쓰나요」 / 3단계 Google Drive + **Google Sheets** 연결(칸 쓰기는 Sheets 만) / 4단계 = 내 이름 시트 링크 + 새 탭 만들기 + 데이터 넣기(카드 없음 · 폴더 밖 읽기 선택창 → 1번) / 5단계 = .env 빈 칸 카드 → OC 직접 쓰기(Ctrl+S) → 개인정보 보호법 조문으로 「사람인 같은 사이트 수집이 걸리나」 판단 → `law\법령.csv` → 내 시트 「개인정보보호법」 탭 / 8단계 경로 `law` 폴더. 카드 실측 각 1회(3회 검증 남음). 드라이브: 「초급 준비물/체험」 옛 재료 → `AI-AX-Setup/master/체험` · 새 `mcp` 폴더(시험 시트 「김지창」). 기획서 `basic/2step/basic_2step_기획.html` 대조 반영. 백업 `archive/basic_data_guide.src.html.261007*.bak` · `archive/초급_체험_기획.html.261007.bak` |
| 2026-10-07 | **초급 체험가이드 v1.2 발행 — 기획서 대조.** 4 · 6단계 카드에 「새 프로그램은 설치하지 마」 추가(막혔을 때 표 · 결정 F 와 맞춤) · 준비물에 입문 2step 웹앱. 백업 `archive/Basic_체험_guide.src.html.261007.bak` |
| 2026-10-07 | **초급 기획서 교육 · 체험 분리 (사용자 지시).** `Basic/초급_기획.*` → `basic/1step/basic_1step_기획.*` (내용 그대로 · 제목 · 머리 안내만). 새 `basic/2step/basic_2step_기획.html` = 외부 데이터 연결 체험 기획(가이드 v1.1 기준 · **HTML 만**, md 원본 없음). 백업 `archive/초급_기획.md.261007.bak`. 이어서 교육 md · pdf 도 삭제(사용자 지시 · 두 기획서 모두 HTML 만, 마지막 md 백업 `archive/초급_교육_기획.md.261007.bak`) |
| 2026-10-06 | **초급 체험가이드 v1.1 — 슬랙 제외 (사용자 지시).** 수집 컨셉에서는 알림이 필요 없어 슬랙 연결 단계를 지우고 단계 끝을 「CSV 저장」으로, 새 8단계 「세 결과를 엑셀 한 파일로」. 슬랙 웹훅은 Advance 체험(자동화)으로. 진행 체크 키 v2. 크롤링 · 엑셀 카드 1회 실측 통과. 기술스택표 · AX_source 5tr 회차(기획서 · 툰 원고 · 게시판 글)도 맞춤 |
| 2026-10-06 | **새 초급 체험가이드 v1.0 발행 (사용자 지시).** `basic/2step/web/guide.src.html` · 도구 키 `basicData` · 원격 `ax_study/claude-code-external-data.html` · 9단계(준비 3 · MCP 2 · API 1 · 크롤링 2 · 웹앱 1). 틀은 옛 체험가이드 CSS · JS. 카드 7 · 8 은 빈 폴더 `claude -p` 1회 통과, 나머지는 교육용 .env 준비 뒤 검증 |
| 2026-10-06 | **옛 초급 체험(서브 · 에이전트 팀)을 `master/체험/` 으로 이동 (사용자 지시 · 마스터 체험에 쓴다).** 초급 체험은 외부 데이터 연결로 재기획(기술스택표 basic 체험 칸 · 제작 전). `tools/build_html.py` · `upload_guide_github.js` 의 `basicTrial` 경로만 `master/체험` 으로(키 · 원격 파일명 그대로). `basic/1step/basic_1step_기획.md` 의 체험 절은 옛 내용 그대로다 — 재기획 반영 때 고친다. AX_source 5tr-ba체험 회차도 새 체험 내용으로 바꿨다 |
| 2026-10-03 | **초급 정답표를 직영 대시보드와 일치시킴 + 실측 보정 (v1.2 재발행).** 대시보드 값을 정답으로 두고 조건을 역산했다 — ① 과목수 「요일」(날짜 특강) 행 = COLC + 요일 + 시작시간 + 종료시간 ② 제외 9종 부분 일치 · 클리닉 → 「클리」(클리커 연구소 · 평촌 202608 차이의 원인) · 「주도」 = 자기주도 · 「자기」 · 「유형」 · 「실험」 은 빼지 않는다 → 202507 · 202508 · 202607 · 202608 · 202609 다섯 달 일치(202508 · 202608 은 14개 센터 각각). ③ 에이전트 tools 에 PowerShell 추가(Git Bash 없는 PC 에서 12단계가 못 세던 문제) ④ `/list-agents` 정정(돌고 있는 세션만 보여 줌 → 말로 「쓸 수 있는 에이전트 목록 보여 줘」). ⑤ 학년치환을 연도 없이 — 학년은 매년 1월 1일에 바뀜 · 기준 연도 = 데이터의 가장 최근 편성년월 연도(열사전 날짜에 기대지 않음) · `make_basic_data.py` 는 export 파일 이름 날짜로 기간 · 기준 연도 · 열사전 첫 줄까지 계산(내년엔 새 export 로 한 번 돌리면 됨) ⑥ 교육 15단계 확인 목록에서 관찰표 칸 삭제. 카드 3회 실측(5 · 11 · 12 · 13단계) · 드라이브 준비물 교체 · 세부는 `basic/1step/basic_1step_기획.md` 0장 ⑨~⑮ |
| 2026-10-02~03 | **초급 가이드 v1.2 발행 + 실측 반영.** 교육 3단계 = 프롬프트로 `basic_data` 생성 · 파일 이동 · 열사전에서 세는 법 · 학년치환 삭제(4 · 12단계에서 Claude 가 먼저 적용하던 문제) · 실습 데이터 2025 · 2026년 7~9월(방배본원 제외 · 정답표 재생성) · 제외 9종(컨설팅 해제) · 학생수 = 과목수와 같은 행을 센터별로 센 뒤 합산(직영 대시보드와 일치) · Node 전용 · 7단계 `exit` → `claude` 뒤 `/skills` · 11단계 「에이전트를 만들어 줘」 카드 + 「전문가다」 첫 줄 · `/agents` 마법사 삭제(2.1.287) → 목록은 말로 「쓸 수 있는 에이전트 목록 보여 줘」(10-03 정정: `/list-agents` 는 돌고 있는 세션만 보여 준다) · 체험 5단계 심화 방향 뒤집음 · 체험 PART 2 머리말에 서브 에이전트 공식 용어. 카드는 빈 폴더 3곳 `claude -p` 3/3. 드라이브 준비물 교체 · AX_source 4tr · 5tr 특별편 발행. 세부는 `basic/1step/basic_1step_기획.md` 0장 |
| 2026-10-01 | **초급 가이드 v1.1 — 실측 2건 반영 (미발행).** 실측(Claude Code 2.1.286 · `claude -p`): 서브가 `jig-metrics` 를 따르는가 = 통과(6회 · 서브 18명 · `SKILL.md` 를 파일로 읽어 셈) · 일부러 남기는 오류 = 옛 문장 「제외 조건 없이」는 과목수가 갈려 **「제외 프로그램 목록만 빼먹기」로 교체**(3/3 과목수 6,300 · 학생수 3,117 → 정답표 [5]) · Python 없음 + Node 있음 3/3 통과. 체험 **10단계 「다음 과정 준비 — Python 설치」** 추가(있으면 좋은 것 6가지 · python.org 설치 파일 PATH 체크 · `python --version` 확인 · `python3` 스토어 함정) · 교육 2단계 셀프체크에 `node --version` · 교육 PART 2 「`.claude` 폴더 지도」 삭제(폴더를 만들기 전에 지도부터 보는 순서). 에이전트 팀 실측(7단계)은 대화형이라 사용자가 직접. 기획서 · 정답표(+생성기) · 기술스택표 · `결정필요.txt` 같이 고침 |
| 2026-09-30 | **초급 7차 — 직영 데이터 분석으로 전환 (미발행).** 회의록 · GitHub 받아 쓰기를 빼고 직영 export 3개월 사본(학생명 · 교사명 삭제)으로 교육 15단계(스킬 = 세는 법 · 에이전트 = 리포트 HTML · 학년치환) · 체험 9단계(+선택 1 · 서브 3단 · 에이전트 팀 · 관찰표 · 서브 vs 팀 고르는 기준 · brainstorming). 과목수 정의 = 수강 + 이수(반이동 제외) CASE 식 + 제외 프로그램 10종. 준비물은 구글 드라이브 「초급 준비물」 교육 · 체험 폴더. 가이드는 최종본이 나온 뒤에 발행. 경위는 `docs/작업기록.md` |
| 2026-09-29 | **결정 대기 목록 메모장 2개.** `Basic/결정필요.txt`(PART 3 스킬 소재 · 체험 공개 주소 · 발행 시점 · 실측 2건 · 카드 3회 · 따라 해보기 · 캡처 17컷 · /agents 화면 · 트리거 ⓒ · 숙제 체크 · 분량 · 드라이브 배포) · `starter/2step/결정필요.txt`(진행자 문서의 시작 페이지 흔적 · 2step 오타). 초급 가이드는 결정 대기라 **발행하지 않았다** |
| 2026-09-29 | **초급 과정 교육 / 체험 두 편 제작 (사용자 지시, v1.0 초안 · 미발행).** `Basic/` 을 starter 처럼 `basic/1step/` · `basic/2step/` 으로 나눴다(각 `web/` · `handout/`). 교육 편 PART 1~9 · 18단계, 체험 편 9단계 가이드 원본과 실습 재료(가상 회의록 3개 · 에이전트 틀 · 정답 에이전트 · GitHub 스킬찾기 · 실습표 · 팀켜기 · meeting-minutes 커밋 고정 사본 · brainstorming 수정본). 도구 인자 `basicTrial` 추가. 렌더 · 앵커 · 400px 검사 통과, 카드 3회 · 팀 단계 · 따라 해보기와 캡처는 아직. PART 3 스킬 소재는 가안(주간 업무 보고) |
| 2026-09-29 | **초급 기획 6차 — 기술스택표 basic 열에 맞춤.** §0 에 「과정 경계」(Advance: 훅 · `/loop` · MCP · 알림 · Git · 헤드리스 · 예약 실행 / master: 룰 · 스킬 설계 · 검증 루프 · 품질 평가 · 모델 선택은 초급에서 이름만) · 「에이전트 도구 읽기만 · 모델 기본값」 제안 → 확정 · §4-3 스킬 열 「받아서 쓰는」 → 「만들어 쓰는」 · 결정 F 에 검증 담당 분리는 한 번 해 보기까지(검증 루프는 master). 백업 `archive/초급_기획.md.260929g.bak`, PDF 재생성 |
| 2026-09-29 | **체험 시작 페이지 `starter/2step/시작.html` 삭제(사용자 지시).** 09-27 발행 안 함 결정의 후속. `upload_guide_github.js` 의 `trialHome` 인자 제거. 백업 `archive/체험_시작.html.260929.bak` |
| 2026-09-29 | **`CLAUDE.md` 정리 (399줄 → 187줄).** 공식 권장(200줄 이하)에 맞춰 「끝난 일」 기록 237줄을 `docs/작업기록.md` 로 원문 그대로 옮겼다. 지금도 유효한 경고(입문 번호 · 접기 가드 · 설치 ZIP · 편집 도구 함정)는 CLAUDE.md 「지켜야 할 것」에 추려 남겼다. 빠진 줄 0 확인, 백업 `archive/CLAUDE.md.260929c.bak` |
| 2026-09-29 | **초급 기획 · 기술스택표 — 외부 자료 대조 반영.** 유튜브 「코딩알려주는누나」 룰 · 스킬 · 에이전트 강의와 블로그 `garden-ying.tistory.com/51`(Rules · Skills · Agents · Hooks · MCP 차이)을 기획서와 대조했다(기획서 §2-5). **초급 교육 편**: PART 2 `.claude` 폴더 지도 · PART 3 스킬 = 대화로 먼저 해 보고 「방금 한 걸 스킬로」 · description 쓰는 법(무엇 + 언제 + 내가 할 말) · 트리거 테스트 3종 · 안 되면 여기부터 · PART 5 `/agents` 마법사(도구 읽기만 · 모델 기본값은 제안) · PART 7 판단 3질문(끼어들어 고치나 / 대화창을 비워야 하나 / 동시에 여러 개인가). 영상의 「에이전트끼리 대화」는 에이전트 팀 기능이라 고쳐 실었다. **룰(`.claude/rules`)은 초급에 넣었다가 같은 날 master 로 옮겼다** — 입문 규칙은 CLAUDE.md 로 충분하고, 룰이 이득인 경우(200줄 넘는 CLAUDE.md · 특정 파일 전용 규칙)는 master 의 하네스 설계에서 생긴다. 입문 CLAUDE.md 는 그대로 둔다. **PART 9 마무리 = 추천 스킬 brainstorming** — superpowers 플러그인 **전체가 아니라 이 스킬 하나만** 고친 사본으로 준다(플러그인의 세션 시작 훅이 token-efficient 와 정반대 지시로 부딪히기 때문). 고친 곳 4가지: `/brainstorming` 으로 부를 때만 · git 커밋 제거 · 없는 `writing-plans` 대신 채팅 계획 · 브라우저 목업 절 제거. 정본은 `test/.claude/skills/brainstorming`(원본 커밋 `8ca22db` 고정, MIT). **기술스택표**: basic 칸을 기획서와 맞춤 · Advance 「커스텀 커맨드」→「스킬 + 훅 조합」(커맨드는 스킬로 통합됨) · 훅 이벤트 고르기 · 커밋 전 비밀정보 검사 훅 · master 에 룰 · 스킬 설계(폴더 구조 · 고급 옵션 · 5패턴) · 스킬 있을 때 / 없을 때 비교. 미결: PART 3 스킬 소재(회의록으로 하면 PART 9 `meeting-minutes` 와 겹침) · 트리거 테스트 ③ 필수 여부(실측 후). 백업 `archive/초급_기획.md.260929c`~`f.bak` · `AX_과정별_기술스택.xlsx.260929.bak`·`260929b.bak`, PDF 재생성 |
| 2026-09-29 | **과정별 기술스택표 `AX_과정별_기술스택.xlsx` 신설 (사용자 지시로 루트에 둔다).** 열 = starter · basic · Advance · master, 행 = 교육 · 체험. starter · basic 은 만든 과정 그대로(starter 는 「VS Code / Cursor + CLI」로 표기). **Advance = 자동화**: 교육 커스텀 커맨드 · 훅 · `/loop` · MCP 연결 · 알림 / 체험 헤드리스(`claude -p`) · 매주 보고서 자동화 · 훅 알림과 원본 보호 · Pages 자동 발행 · 예약 실행 두 가지(윈도우 작업 스케줄러 · GitHub Actions). **master = 산출 품질(하네스)**: 교육 하네스 엔지니어링(규칙 흡수) · 검증 루프 · 컨텍스트 관리 · 품질 평가 · 모델과 노력 수준 · Git / 체험 내 산출물에 하네스 입히기 · 부서 파이프라인. 논의 중 뺀 것: Python 데이터 처리 · 기획 문서화 · **검산기** · 팀 스킬 배포 · 플러그인과 사내 마켓플레이스 · MCP 서버 만들기 · Agent SDK · 보안 · 슬랙 봇 · n8n(사용 안 함) · 사내 강사. Advance · master 는 **제안이며 미확정**. ⚠️ Advance 체험의 GitHub Actions 는 리포(Git)가 필요한데 Git 은 master 교육에 있다(순서 미결) |
| 2026-09-29 | **초급 기획 4차 개정 — 입문처럼 교육 → 체험 두 편.** 교육 편(PART 1~9, 0 없음) = 1 숙제 체크(입문 체험 숙제로 만들어 온 HTML) · 2 시작 전 · 3 스킬 받기(GitHub `github/awesome-copilot` 의 `meeting-minutes`, MIT) · 4 스킬 vs 에이전트 비교표 · 5 에이전트 만들기 · 6 다듬기 · 7 판단표 · 8 막혔을 때 · 9 **GitHub 가입(회사 메일) · 스킬 찾기**. 체험 편 = **교육 편 프로젝트 · 에이전트를 이어서** 1 강사 시연(완성된 서브 · 팀) → 서브 A/B 비교 → 다시 시키기 → **에이전트 팀**(팀원끼리 소통, 실험 기능) → 판단표 네 칸 → 내 업무로. 공통 소재는 가상 회의록, 7개 팀 예시 표 추가. 폐기: 「스킬 1 PART · 에이전트 4 PART」 · 「PART 4 가 핵심」 · 체험 트랙 3개 안. 실측 2건(`meeting-minutes` 한국어 자동 호출 · 에이전트 팀)은 **보류**. 백업 `archive/초급_기획.md.260929.bak`·`260929b.bak`, PDF 재생성 |
| 2026-09-29 | **출퇴근 앱 알림 중지 재확인.** 09-28 트리거 삭제가 실제로 안 돼 09-29 09:35 메일이 테스트 계정 2명에게 발송됨. jichang999 계정 편집기에서 `checkLate_` 트리거 재삭제·0개 확인. 가이드·`체험_기획.md` 의 "2026-09-28 중지" 표기는 그대로 유효(수정 없음). `commute_app` README·CLAUDE.md 이력 추가 |
| 2026-09-28 | **2step 가이드 v1.14 발행 — 완성본 메일 알림 중지 반영.** 출퇴근 앱 09:35 지각 메일을 유저 요청으로 중지(`checkLate_` 트리거 삭제). 비교표 「알림」 칸 · PART 1 소개 문구 수정, 단계 번호 그대로라 진행 체크 키 유지. `체험_기획.md`(+html·pdf) · `commute_app` README·CLAUDE.md 같이 수정. 백업 `archive/*260928_v113.bak` |
| 2026-09-27 | **2step 배포 파일 드라이브 게시.** 공유 폴더 `AI-AX-Setup` 안에 `2step` 폴더를 새로 만들고 `프롬프트_미니출퇴근앱.txt` · `정답_출퇴근.html` · `정답_폰미리보기.html` 3개 업로드(md5 일치). 링크 https://drive.google.com/drive/folders/1cvehjggzeg0WDNa3nBlQbAQCoUEIyPFp |
| 2026-09-27 | **체험 시작 페이지(`starter/2step/시작.html`) 백엔드 반영(발행 전이라 로컬만).** 3번 흐름 「… · 서버에 기록 쌓기」, 카드 A 「마지막에 내 구글 시트 연결(회사 구글 계정)」 · 카드 B 「마지막에 Supabase 연결(가입 · GitHub 이면 빠름)」, 비교표에 「기록 저장소」 · 「준비」 두 줄, 아래 안내 「마지막 백엔드만 다르다」. 백업 `archive/trialHome_시작.260927.bak` |
| 2026-09-27 | **2step 가이드 v1.5 발행 — 만들기 카드가 `app_trial/CLAUDE.md`(앱 설명서)도 만든다(사용자 지시).** 카드 첫 줄 「다른 파일이나 설치는」 → 「다른 설치는」, 끝에 CLAUDE.md 한 줄(앱 설명 · 설정 · 저장 위치 · 「고치면 설정도 같이」 · 원래 CLAUDE.md 무변경). 5단계 확인 문구 + 「CLAUDE.md 는 왜 만드나요?」 팁 + 5분 규칙에 「CLAUDE.md 는 없어도 미션은 된다」. **V7 3/3**(작업 폴더 모양 3곳 `claude -p` · 만들기 · 미션 1 · 미션 2 · 헤드리스 판정 · 미션 1 뒤 설명서 반경도 300m · `.claude/CLAUDE.md` md5 무변경). 프롬프트 txt · 드라이브 txt(md5 `22c92933…`) · 기획서(카드 원문 · V7) · 회차유형.json v1.5 재발행(커밋 `2b5df99`). `정답_출퇴근.html` 은 카드의 앱 부분이 그대로라 다시 만들지 않았다. 백업 `archive/trial_*.260927_v14.bak` |
| 2026-09-27 | **2step 진행자용 구글 문서 v1.3 반영.** 준비물에 `정답_폰미리보기.html`, 30분 진행표에 0:24 「③ 마무리 — 11단계 폰 화면」(정리 0:25 → 0:26), 「자주 막히는 곳」에 틀 잘림(`Ctrl` + `-`), 통과 화면·검증 기록 09-27. 원고 `2step/web/진행자용.src.html` 수정 → 리비전 2개(사람 수정 없음) 확인 후 같은 링크로 교체. 공유는 소유자만 그대로. 백업 `archive/trial_진행자용*.260927*` |
| 2026-09-27 | **2step 가이드 v1.3 발행.** 11단계 폰 미리보기 카드를 작업 폴더 모양 3곳에서 `claude -p` 3/3 통과(틀 안 출근 · 새로고침 · 기록 유지 · JS 오류 0 · 출퇴근.html 무변경). 작은 노트북 화면용 `Ctrl` + `-` 팁 추가. 개인정보 검사 0건. `AX_source/out/20260930/회차유형.json` 을 v1.3 · 11단계 · 정답_폰미리보기 로 맞춰 기획서 재발행(커밋 `7f4fefc`) |
| 2026-09-27 | **2step 가이드 v1.11 — PART 4 를 3단계로(사용자 지시).** 12단계 웹앱 코드 카드 한 장이 서버.gs + index.html 을 만들고 13단계에서 [새 배포] 한 번(액세스 askwhy.co.kr). 옛 13단계 주소가 `[]` 만 보여 앱이 안 뜨는 것처럼 보이던 문제와 새 배포/새 버전 혼동을 없앴다. 카드 3회 검증 V11 3/3(11항목) · 정답 `정답_서버.gs` 내림(드라이브 휴지통) · 진행 체크 키 v4 · 목차 링크 정정 · 진행자 문서 리비전 10 · AX_source 09-30 기획서 재발행(`1477ca9`) |
| 2026-09-27 | **2step 가이드 v1.10 — 옛 14·15단계 합침(사용자 지시).** 14단계 = 로그인 웹앱, 13단계 배포 액세스를 처음부터 askwhy.co.kr(누구나 쓰는 주소가 남지 않음). 시트 연결 카드 삭제 · 막혔을 때 표 정리 · 진행 체크 키 v3 · 14단계 · 45분. 정답 파일 번호 주석만 변경(헤드리스 15/15 재통과). 발행 · 드라이브 3개 · AX_source 09-30 기획서 재발행(`e9501f2`) |
| 2026-09-27 | **2step 가이드 v1.9 — 15단계 「회사 계정 로그인 웹앱으로 띄우기」(사용자 지시).** 화면도 Apps Script 웹앱(HtmlService)이 띄우고 액세스를 askwhy.co.kr 로 좁혀 로그인·도메인 제한은 구글이 처리, 서버는 로그인 이메일을 시트에 적는다. GPS 는 사내 웹앱 시험 페이지로 크롬 실측 통과(옛 「HtmlService 는 GPS 불가」 기록을 뒤집음). 정답 `정답_index.html`·`정답_서버_웹앱.gs` 시트 흉내+헤드리스 16/16. 발행 · 드라이브 2step 폴더 반영 · AX_source 09-30 기획서 재발행(`ff05bf6`). ⚠️ 카드 `claude -p` 3회 검증 미실시(권한 분류기 차단) · 실계정 배포 미실측 |
| 2026-09-22 | **설치 ZIP 점검 + `install.ps1` 보강.** ZIP 안을 열어 확인한 결과 **`설치하기.bat` 은 이미 `-ExecutionPolicy Bypass` 를 붙이고 있어 실행 정책 함정에는 안 걸린다.** 대신 3건을 고쳤다 — ① `[4/4]` 가 `irm | iex` 하나뿐이고 실패 안내가 **같은 명령을 다시 하라는 것**이라, 실패 시 **npm 으로 한 번 더 시도**하게 했다(인증서 신뢰 오류 PC 대비). ② 설치 판정이 `.local\bin` 한 곳만 봐서 npm 경로로 깔리면 「설치 안 됨」으로 뜨던 것을 **두 곳을 보도록**(`Test-ClaudeInstalled`) 고쳤다. ③ 끝의 「다음에 할 일」을 **v1.17 기준**으로 — 재시작 안내 추가, `[File] > [Open Folder]` → **`[파일] > [폴더 열기]`**, 각 줄에 가이드 단계 번호. `읽어보세요.txt` 도 동기화하고 인증서 오류 대처를 넣었다. **검증**: 구문 오류 0 · BOM 유지 · `Test-ClaudeInstalled` True · `npm.cmd` 호출 패턴 exit 0 (실제 설치는 실행하지 않음). ⚠️ **작업 위치는 `Downloads\입문과정설치파일\`** (옛 `Desktop\입문과정설치파일\` 은 없음), **드라이브 반영 완료(15:45, 267,734,802 바이트 일치).** ⚠️ **다시 말 때는 파일을 ZIP 루트에** 넣는다 — 폴더째 압축하면 최상위 폴더가 한 겹 생겨 교육생이 두 번 들어가야 한다. `.bak` 은 뺀다. ⚠️ 이번에 **파일 ID 가 바뀌었다**(삭제 후 새 업로드). 가이드·README 는 **폴더 링크**만 쓰므로 영향 없다. 백업 `*.260922.bak` |
| 2026-09-22 | **가이드 v1.17 — 1~5단계 재배치(한글팩을 작업 폴더 열기 앞으로).** 09-21 교육에서 **VS Code 메뉴가 영어라 폴더 여는 자리에서 막힌** 실측 반영(사용자 지시). 새 순서 = **1 Node.js · 2 Cursor/VS Code 설치 · 3 확장 프로그램(한글팩) · 4 테마색(선택) · 5 작업 폴더 만들고 열기**. **옛 1단계(폴더 만들기)와 옛 3단계의 ②(폴더 열기)를 5단계 하나로 합쳐 총 12단계를 유지**했고, 그 덕에 **6~12단계 번호가 안 밀려** `회차유형.json`·PART 6 표 링크·이미 배포한 `#s7` 링크·진행 체크 키가 전부 살아 있다. 5단계 안내를 한국어 메뉴(`[파일] > [폴더 열기]`)로 바꾸고 캡처도 한글판으로 되돌렸다(v1.9 의 영어 재촬영을 뒤집은 것, 영어판은 `archive/s03_open_folder.png.260922_en.bak`). ⚠️ **이미지 키(`s03_*`)는 단계 번호와 어긋난 채 두었다.** `AX_source/out/20260916/회차유형.json` 도 같이 맞춰 재발행했다(진행 1행·자료 판번호·준비물, `AX_ROUND_DAY=20260916` 고정, 커밋 `960cb47`). `CLAUDE_starter_1step_순서.txt` 준비물도 동기화. 백업 `archive/guide.src.html.260922_v116.bak` |
| 2026-09-22 | **가이드 v1.16 — 새로고침해도 전부 접힌 채로 뜬다.** 사용자가 새로고침 시 ③ 팁 묶음이 펼쳐져 있다고 보고. 원인이 둘이었다 — ① **브라우저가 `details` 펼침 상태를 복원**(헤드리스에서는 재현 안 됨), ② **주소에 남은 해시**(목차를 누르면 `#p4` 가 붙고 그대로 새로고침하면 그 묶음이 열린다). 스크립트 진입·`DOMContentLoaded`·`load`·`pageshow(persisted)` 네 지점에서 전부 닫고 **초기 `openByHash()` 호출을 뺐다.** ⚠️ **`load` 가 늦게 와서(이미지 1.66MB) 사람이 펼친 것을 닫지 않도록 `touched` 가드**를 뒀다 — 빼면 안 된다. ⚠️ **대가: `#p6` 를 달고 오는 외부 링크가 접힌 채로 뜬다.** 페이지 안 클릭(맨 위 [막혔을 때]·목차·표의 (7단계))은 그대로 열린다. **검증**: playwright 헤드리스 8종 — 첫 방문 / 펼친 뒤 새로고침 / `#p6` 첫 진입 / [막혔을 때] / 목차 링크 / 누른 것 유지 / A 펼침·닫기 / 인쇄 시 전부 펼침. 백업 `archive/guide.src.html.260922_v115.bak` |
| 2026-09-22 | **가이드 v1.15 — 7단계 「막히면」을 A/B 두 블록으로 접었다.** 사용자 요청. v1.14 로 오류 안내가 길어져 7단계 카드가 그 내용으로 덮였다. **A. 설치 명령(`irm` 줄)이 실패한다**(cmd · 실행 정책 · 인증서 ①②③) / **B. 설치는 됐는데 `claude -v` 에 버전이 안 나온다**(편집기 재시작 · Path)로 갈라 `details.fix` 2개로 접고, 펼친 블록 맨 아래에 **[닫기]** 버튼을 넣었다(누르면 접히면서 제목 자리로 돌아간다). **`open` 속성을 달지 않아 첫 화면에서는 열린 블록이 0개**이고, 해시로 들어오면 묶음만 열린다. ⚠️ **인쇄 시 펼침 대상을 `details.grp` → `details` 전체로 바꿨다** — 접힌 A/B·Q&A 가 인쇄본에서 빠지지 않게 하려는 것이라 되돌리면 안 된다. 기존 Q&A 3개의 모양은 그대로다. **검증**: playwright 헤드리스 7종 — 첫 화면 `details[open]`=0 / A·B 2블록 / A 펼침 / [닫기] 로 접힘 / B 독립 / `#s7` 진입 시 묶음만 열림 / 인쇄 시 접힌 것 0개. 단계 번호 1~12 · PART 번호는 그대로. 백업 `archive/guide.src.html.260922_v114.bak` |
| 2026-09-22 | **가이드 v1.14 — 설치 오류 2종 대응.** 교육생 노트북에서 7단계가 막혔고, 한 문제처럼 보였지만 **원인이 둘**이었다. ① **PowerShell 실행 정책**이 기본값이라 `.ps1` 을 로드하지 않아 **`설치하기.bat` · `npm.ps1` · `claude.ps1` 세 군데**에서 같은 원인이 다른 얼굴로 막았다 → `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned` 한 줄(관리자 권한 불필요). ② `irm` 이 **인증서 신뢰 실패**로 끊겼다 → npm 으로 대신 깔는 경로를 넣었다. npm 은 Node 내장 CA 번들을 쓰므로 Windows 인증서 저장소 문제를 통과한다. 사용자 요청으로 **세 줄을 순서대로, 각 줄이 어떻게 나와야 하는지**까지 적었다(①②③). PART 6 「자주 틀리는 것」에 같은 2행, `CLAUDE_starter_1step_순서.txt` 도 동기화. **단계 번호 1~12 · PART 번호는 그대로** — `AX_source/out/20260916/회차유형.json` 영향 없음. ⚠️ **남은 일**: `설치하기.bat`/`install.ps1` 의 `-ExecutionPolicy Bypass` 여부 점검(안 붙었으면 그 ZIP 은 기본 설정 PC 에서 실행되지 않는다). 백업 `archive/guide.src.html.260922_v113.bak` |
| 2026-09-22 | **가이드 v1.13 — 「막혔을 때」도 접고, 새로고침하면 전부 접힌 채로 시작.** 사용자 요청. PART 6 을 네 번째 묶음(`g4`)으로 감쌌고, **진행률에 따라 한 묶음을 자동으로 열던 규칙을 뺐다** — 이제 해시로 들어온 경우에만 그 묶음이 열린다. 맨 위 [막혔을 때] 버튼은 **같은 해시에 이미 있으면 `hashchange` 가 안 뜨는** 문제가 있어 헤더 링크에 클릭 핸들러를 따로 달았다. ⚠️ **v1.11 의 「막혔을 때는 묶음 밖 상시 노출」 설계를 뒤집은 것**이다(사용자 판단). 단계 번호·PART 번호·앵커·진행률 키는 그대로. **검증**: playwright 헤드리스 9종 — 첫 방문 4묶음 접힘 / `#p6` 진입 / `#s10`(닫힌 묶음 안) 진입 / 목차 클릭 / **12단계 완료 후에도 전부 접힘** / 헤더 버튼 / 같은 해시 재클릭 / 모두 펼치기·접기 / g4 머리 노출 |
| 2026-09-22 | **원클릭 설치 ZIP 배포 + 가이드 v1.12.** 설치 구간이 교육의 가장 큰 병목이라(09-21 10명 교육에서 이 구간에만 1시간) `설치하기.bat` 하나로 **2 · 3 · 5 · 7단계**를 끝내는 설치기를 만들어 공유 폴더에 `입문과정설치파일.zip`(255MB)으로 올렸다. 구성은 `설치하기.bat`(ASCII 전용 래퍼) + `install.ps1`(한글 메시지·UTF-8 BOM) + Node.js msi + VS Code exe + `읽어보세요.txt`. 이미 깔린 것은 건너뛰고, 하나가 실패해도 나머지를 계속 진행한 뒤 끝에 결과표를 보여 준다. **한글을 .bat 에 넣지 않은 이유**는 cmd 의 UTF-8 오프셋 드리프트다(ASCII 전용 + CRLF). 가이드는 PART 0 준비물 표에 ZIP 행, 「설치 ZIP 을 쓰면 훨씬 빠릅니다」 안내와 **ZIP 안에서 바로 더블클릭하면 안 된다**는 주의 박스, PART 1 머리말 한 줄을 넣었다. **단계 번호 1~12 · PART 번호는 그대로** — `AX_source/out/20260916/회차유형.json` 영향 없음. `CLAUDE_starter_1step_순서.txt` 준비물도 같이 맞췄다 |
| 2026-09-21 | **`CLAUDE_starter_1step_순서.txt` 를 가이드 v1.11 과 맞췄다.** CLAUDE.md 의 동기화 표가 요구하는 「자주 틀리는 것」이 **v1.8~v1.10 에서 늘어난 설치 구간 증상 4건만큼 뒤처져 있었다** — 무료 계정 로그인 실패 / `claude -v` 버전 안 나옴(편집기 재시작) / `irm` 실패(터미널이 cmd) / 열 때마다 cmd 면 기본 프로필 변경. 머리말에는 **HTML 가이드가 설치·세팅·팁 3묶음**이고 이 txt 의 0~3번이 그중 「세팅」이라는 안내를 넣었다. 백업 `archive/CLAUDE_교육순서.txt.260921.bak` |
| 2026-09-21 | **가이드 v1.11 — 설치 / 세팅 / 팁 3묶음으로 접었다.** 「내용이 너무 많다」는 요청. ① 설치(PART 0~1 · 1~8단계) ② 세팅(PART 2~3 · 9~12단계) ③ 팁(PART 4·5·7)을 `<details>` 로 묶고, **「막혔을 때」(PART 6)는 묶음 밖**에 두어 항상 보이게 했다(헤더에 [막혔을 때] 버튼도 추가). 문서 순서는 PART 6 이 PART 7 뒤로 갔다. **단계 번호 1~12 · PART 번호 · 앵커 id 는 그대로** — 이미 배포한 `#p6` 류 링크가 살아 있고 `AX_source/out/20260916/회차유형.json`(PART 0~7 · 1~12단계를 인용)도 손댈 필요가 없다. 진행 체크 키도 `cc-guide-steps-v12` 유지. 펼침은 진행률을 따라간다(체크 8개 미만 = 설치 / 12개 미만 = 세팅 / 완료 = 팁), 해시로 들어오면 그 묶음을 자동으로 연다. 목차 아래 [모두 펼치기] 버튼(Ctrl+F 용), 인쇄 시 `beforeprint` 로 모두 펼침. **검증**: playwright 헤드리스 6종 — 첫 방문 설치만 열림 / 막혔을 때 상시 보임 / `#p6` 직접 진입 / `#s10`(닫힌 묶음) 진입 시 자동 열림 / 목차 클릭 시 자동 열림 / 12단계 완료 후 재방문 시 팁만 열림. 백업 `archive/guide.src.html.260921_v110.bak` |
| 2026-09-23 | **체험 가이드 v1.2** — 4단계를 「작업 폴더에서 Claude Code 켜기」로(입문 교육생은 작업 폴더가 이미 있다 · 사용자 지시). 만들기 카드가 작업 폴더 안에 `app_trial` 폴더를 만든다. 입문 작업 폴더 모양(.claude/CLAUDE.md + 기존 파일) 3곳에서 만들기·미션 1·2 재검증 3/3, 기존 파일 무손상. 카드 txt·진행자 문서(같은 링크로 내용 교체)·AX_source 09-30 기획서 같이 갱신 |
| 2026-09-23 | **체험 가이드 v1.1** — 1단계에 완성본 앱 주소 QR(`starter/2step/web/images/shots/qr_commute.png`, segno 로 생성). 흰 바탕이라 다크 모드에서도 찍힌다. 백업 `archive/체험_guide.src.html.260923_v10.bak` |
| 2026-09-23 | **체험 가이드 v1.0 발행** (`ax_study/claude-code-build-app.html`). 완성본(출퇴근 앱)은 휴대폰으로 보기만, 교육생은 만들기 카드로 `출퇴근.html` 한 파일을 만들고 미션 3개를 말로 고친다. 카드·미션은 빈 폴더 3곳 검증 3/3. 진행자용은 jichang999 전용 구글 문서(상단 메뉴). tools 에 과정 `trial` 추가. AX_source 9월 세번째 체험 특별편 자료로 연결 |
| 2026-09-23 | **starter 를 교육·체험 두 갈래로 재편.** 입문 자료(`web`·`handout`)를 `starter/1step/` 로, `test\commute_app` 을 `starter/2step/commute_app` 으로 옮겼다. tools 5종 경로 수정, 이동 후 빌드 md5 동일·발행 `dry` SAME. **공개 링크는 그대로다.** 출퇴근 앱은 AX_source 9월 세번째 특별편(체험) 회차의 소재 |
| 2026-09-21 | **가이드 v1.10 — 기본 터미널을 PowerShell 로 고정하는 법.** 교육생 노트북에서 `irm ... | iex` 가 또 실패했다(사용자 캡처 `바탕화면\터미널 오류.png`). 화면 증거 3가지 — 터미널 탭이 **cmd**, 프롬프트가 `C:\Users\User\Desktop\bee>` 로 **`PS` 없음**, `'irm'은(는) 내부 또는 외부 명령...이 아닙니다`. 작업 폴더(`bee`)는 영어·공백 없음이라 폴더 문제가 아니었다. v1.8 이 **그때그때 PowerShell 터미널을 새로 여는 법**까지였는데, 그 노트북은 **기본 터미널이 cmd** 라 새 터미널을 열 때마다 재발한다. 그래서 6단계에 「한 번만 해 두기」를 넣었다 — `Ctrl+Shift+P` → `Terminal: Select Default Profile` → **PowerShell** (한글팩 후에는 [터미널: 기본 프로필 선택]). PART 6 에도 같은 증상 행 추가. **단계 번호는 늘리지 않았다.** 백업 `archive/guide.src.html.260921_v19.bak` |
| 2026-09-21 | **가이드 v1.9 — 10명 부서장 교육 피드백 6건 반영.** ① **3단계에 VS Code 내려받는 순서 추가**(검색 → [Download] → Windows User Installer x64, 캡처 3장 `s03_dl_*`). 함께 **3·4·5단계 메뉴·버튼 이름을 영어로** 되돌렸다 — 한글팩은 5단계에서 깔고 재시작해야 적용되므로 그 전 화면은 영어인데 본문이 한글 이름으로 적혀 있었다. 3단계 확인 캡처 `s03_open_folder.png` 는 **영어 화면으로 재촬영**했다 (격리 프로필 `Code.exe -n --locale=en --user-data-dir <임시> --extensions-dir <임시>` 로 띄운 뒤 PrintWindow 로 캡처, 크기는 1400x860 그대로. 옛 한글판은 `archive/s03_open_folder.png.260921_ko.bak`). 나머지 캡처(t0_04·t0_05~07)는 한글팩 적용 후 화면이라 재촬영 대신 「캡처는 한글팩 적용 후 화면」이라는 안내를 붙였다. ② **Claude 유료 계정(Pro 이상)이 필요**하다는 안내를 PART 0 준비물 표와 8단계 로그인에 명기(무료 계정으로는 쓸 수 없음). ③ **작업 폴더 이름에 공백**이 있으면 오류 → 1단계를 「영어 · 공백 없이」로 고치고 좋은 예/나쁜 예 표 추가. ④ **10명 전원이 환경 변수(Path) 작업**을 함 → 원인은 설치 전부터 열려 있던 편집기가 바뀐 Path 를 모르는 것(터미널 탭만 새로 열어도 갱신 안 됨). 7단계에 **「설치 후 Cursor·VS Code 완전 종료 후 재실행」**을 본문으로 올리고, 「막히면」에 현재 터미널에만 경로를 붙여 원인을 가리는 한 줄(`$env:Path`)을 GUI 환경 변수보다 **앞에** 두었다. ⑤ **설치 구간만 1시간**(10명 같은 와이파이) → PART 0 에 「미리 해 두면 좋은 것」(2·3·5단계 사전 설치 → 당일 7단계부터). ⑥ 터미널에 `& 'C:\...\uc2a4크린샷 ....png'` 오류 → Claude Code 입력창이 아니라 PowerShell 에 파일을 끌어다 놓은 것(경로에 공백이 있으면 `&` 가 붙는다). PART 5 에 「화면 캡처·파일 보여주기」(Win+Shift+S → 입력창 Ctrl+V, 또는 `@파일명`), PART 6 에 같은 증상 행 추가. **단계 번호는 늘리지 않아** `AX_source/out/20260916/회차유형.json` 은 영향 없음. 백업 `archive/guide.src.html.260921_v18.bak` |
| 2026-09-21 | **가이드 v1.8 — 터미널이 cmd 일 때 설치 실패 대응.** 교육생 설치 중 7단계에서 `'irm'은(는) 내부 또는 외부 명령...이 아닙니다` 오류 발생. 원인은 VS Code 터미널이 **PowerShell 이 아니라 cmd** 로 열린 것(`irm`/`iex` 는 PowerShell 전용). 6단계 「확인」에 프롬프트 맨 앞 `PS` 로 가리는 법과 ＋ 옆 ∨ → PowerShell 로 바꾸는 법, 7단계 「막히면」에 같은 오류 대처를 넣었다. 단계 번호는 늘리지 않아 `AX_source/out/20260916/회차유형.json` 은 영향 없음 |
| 2026-09-18 | **초급 기획서를 `docs/` 에서 `Basic/` 으로 이동.** 초급 자료를 한 폴더에서 보게 했다(`초급_기획.md`·`.html`·`.pdf`). **`Basic/handout/` 이 아니라 `Basic/` 바로 아래** 둔다 — handout 은 교육생에게 나가는 폴더이고 기획서는 배포 대상이 아니다. 발행 스크립트가 보는 곳은 `Basic/handout/CLAUDE_초급가이드.html` 하나뿐이라 공개될 일은 없다(`upload_guide_github.js basic dry` 로 확인). 경로 참조 8곳 정정(CLAUDE.md 5·README 3·기획서 본문 1·`tools/md2pdf.py` 사용 예 1) |
| 2026-09-18 | **초급 기획 3차 개정 — 「받고 끝」이 아니라 「보고 다시 시킨다」(결정 F).** 서브를 부르는 쪽(부모)이 결과를 보고 부족하면 **같은 일꾼에게 다시** 보내는 것까지를 PART 5 에 넣었다. 함정은 **부모도 과정을 못 봤다**는 것이라, 무엇을 근거로 판정하느냐를 3단(일꾼의 **말** / **산출물** / **검산기**)으로 갈라 **초급은 산출물까지, 검산기는 중급**으로 선을 그었다. 작성과 검증을 **다른 일꾼**에게 나누는 법도 같이 보여 준다(PART 4 의 「갈래로 나누기」와 다른 종류). §2 에 **「서브」는 파일 종류가 아니라 호출 관계에서 생기는 역할**이라는 한 줄 추가. **PART 는 늘리지 않았다** — PART 5 안에서만 다룬다. 캡처 11b 추가(12→14컷), 실습표에 다시 시키기 전/후 2칸. 백업 `archive/초급_기획.md.260918.bak`, PDF 재생성 |
| 2026-09-18 | **초급 기획 확정 + 인쇄용 PDF 도구.** 목차를 PART 0~8 로 확정했다 — **스킬 1개 PART(받아서 쓴다) · 에이전트 4개 PART**. 사용자 지시로 ① 스킬은 만들지 않고 **받아서 쓰는 것**까지만(만들기는 중급), ② 무게중심을 **에이전트**로, ③ **PART 4 「같은 일, 두 가지 방법」** 신설 — 싱글과 서브는 같은 파일 형식이라 돌려 봐야 차이가 보이므로 같은 일을 A) 하나에게 B) 둘로 갈라 시키고 **교육생이 비교표를 직접 채운다**(이 비교가 PART 6 판단표의 근거). 인쇄본용으로 `tools/md2pdf.py` 신설 — 판은 `AX_source/tools/pdfdoc.py` 를 빌려 써 회차 기획서와 같은 문서로 보이게 했다(`markdown` 패키지 신규). ⚠️ **입문 PART 7 스킬 행의 「만들어 장착한다」 문구는 아직 옛 내용이다** — 초급 발행 때 같이 고친다 |
| 2026-09-18 | **외부 참조 1건 정정.** 폴더 재편으로 `AX_source/out/20260916/회차유형.json` 의 자료 경로 4건이 낡아 `AX_study/starter/handout/...` 로 고치고 재발행(`build_brief.py` → `publish.py --round 20260916 --plan`, 커밋 `4f25a9a`). `AX_source/README.md` 의 옛 경로 언급은 과거 이력 문장이라 두었다 |
| 2026-09-18 | **과정 2개로 폴더 재편 + 초급 과정 착수.** 기존 입문 자료를 `starter/`(web·handout)로 옮기고 초급용 `Basic/` 을 만들었다. `tools/` 스크립트는 복제하지 않고 **과정 인자**를 받게 고쳤다(`build_html.py`·`upload_guide_github.js`·`shots_finalize.py`, 경로 고정은 `upload_handout.py`·`make_merged_txt.py`). **입문의 공개 링크·원격 파일명은 그대로다** — 이동 후 빌드 재실행 결과가 기존 배포본과 바이트 동일(md5 일치), 발행 `dry` 에서 SAME 확인. 초급 범위는 입문 PART 7 표대로 스킬·싱글 에이전트·서브 에이전트 3주제, 실습 소재는 교육생이 자기 업무를 가져오는 방식, 형태는 자기주도 링크. 기획은 `docs/초급_기획.md` |
| 2026-09-17 | **가이드 v1.8 — PART 8 「9월 4주차 세션 자료」 삭제.** 사용자 지시로 회차 사례 절과 목차 항목을 지웠다(v1.5 의 반대). 이어서 사용자 지시로 **Update Notes 의 v1.5 줄(PART 8 추가 안내)도 삭제**(표가 v1.6 → v1.4 로 건너뛴다). 이어서 **v1.8 줄도 지우고 제목 버전을 v1.7 로 되돌렸다** — 공개 가이드에 PART 8 흔적이 남지 않게. 다음 수정은 v1.8 부터. 수정 전 원본은 `archive/*.260917_v17.bak`(PART 8 삭제 전)·`*.260917_v18.bak`(v1.5 줄 삭제 전)·`*.260917_v18b.bak`(v1.8 줄 삭제 전). GitHub Pages 반영 확인 |
| 2026-09-17 | **발행 리포 `tes1` → `tes2`.** `tes1` 이 사내 개인정보 이력 때문에 비공개로 전환돼, 공개 가이드는 이력 없이 `tes2` 로 옮겼다. 열람 링크 = `https://jichang999-dotcom.github.io/tes2/ax_study/claude-code-setup-guide.html` (200 확인). `tools/upload_guide_github.js` REPO 는 `tes2` 고정(`.env` 의 `GITHUB_REPO=tes1` 을 따르지 않음). ⚠️ **교육생에게 이미 준 옛 `tes1` 링크는 끊겼다** — 공유 폴더·구글문서의 링크 재안내 필요 |
| 2026-09-17 | **가이드 v1.7 — PART 0 비교에서 Cowork 삭제 + 화면 캡처 2장.** 제목을 「채팅과 Claude Code 는 무엇이 다른가요?」로, 표를 2칸으로. 표 위에 `m_chat`(Claude 앱 채팅)·`m_code`(VS Code 터미널 Claude Code) 캡처를 2칸 나란히(`.shots.two`, 모바일은 1칸). **공개 페이지라 가림:** 채팅 캡처의 왼쪽 예약·고정 대화 목록, Code 캡처의 탐색기 폴더 목록(사내 프로젝트명). 수정 전 handout 은 `archive/CLAUDE_starter_1step_가이드.html.260917_v16.bak` |
| 2026-09-17 | **가이드 v1.6 — PART 0 에 「채팅·Cowork·Claude Code 는 무엇이 다른가요?」 추가.** 같은 부탁(매달 엑셀 10개 합치기)을 맡겼을 때 이번 달·다음 달·비유·이럴 때 4줄 비교 표 + 한 줄 요약(물어보는 곳·맡기는 곳·만드는 곳) + 파일 수정 주의. 목차에 하위 항목 추가. 수정 전 원본은 `archive/*.260917_v15.bak`. GitHub Pages 반영 확인 |
| 2026-09-16 | **가이드 v1.5 — PART 8 「9월 4주차 세션 자료」 신설.** 부서장회의 T1 이달의 사례 2건(분석 = LLM Wiki 사용 전후 비교 / 생성 = 시험지 PDF → HWPX 자동 채우기)과 **세션에서 틀 구간**, 「우리 팀에 대면」 한 줄을 표로. 목차에도 항목 추가. 이 가이드 자체는 **9월 3주차 「체험」 회차의 자료**(설치·규칙 설정 30분 실습)라는 안내를 같은 절 끝에 넣었다. ⚠️ **세션 기획서 공개 URL 은 넣지 않는다** — 이 가이드는 검색되는 공개 페이지이고, `AX_source` 소재추천 쪽 가림막은 추측 불가 slug 하나뿐이라 여기서 링크가 나가면 그 가림막이 무너진다. ⚠️ **주차 절은 회차마다 낡는다** — 사례가 바뀌면 `AX_source/out/<회차>/llm/01_기획.json` 과 같이 고친다 |
| 2026-09-16 | **가이드 v1.4 — 전체 교정.** 영문 뒤 조사 띄어쓰기를 띄어 쓰는 쪽으로 통일(32곳), 2단계에 「Claude Code 설치 자체에는 Node.js 가 필요 없다」 안내 추가. 고친 오류: 진행률 초기 표시가 「0 / 13 단계」로 남아 있던 것(인쇄·첫 화면에만 보였다), `/statusline` 은 기본으로 켜져 있지 않다는 점, 기준 버전 2.1.272 → 2.1.272~273, 「인삿말」→「인사말」, 「어떤걸」→「어떤 걸」 |
| 2026-09-16 | **가이드 v1.3 확정 + 열람 링크 발행 경로 마련.** PART 4 에 「컨텍스트 원리」 추가 — 책상 비유로, CLAUDE.md 를 짧게 쓰는 이유·스킬이 필요할 때만 불려오는 이유·MEMORY.md 200줄 제한이 **모두 같은 이유**임을 한 곳에 묶었다. PART 7 주제별 한 문장을 후킹 문구로 확정(스킬 = 「역할·작업 절차·전문 지식을 한 묶음으로 만들어 장착한다」, API = 「Claude 밖의 AI 와 데이터까지 내 작업에 끌어온다」). 업로더 `tools/upload_guide_github.js` 신설. **GitHub Pages 로 발행 완료** — 교육생은 파일을 받지 않고 링크로 본다 |
| 2026-09-16 | **정본을 구글 문서 → HTML 가이드로 변경.** 앞으로 `web/guide.src.html` 만 고치고 빌드한다. 구글 문서는 관리하지 않는다(옛 「10단계 주의」 문구·「중급1/중급2」 학습 단계가 남아 있으므로 문서 쪽 값을 인용하지 않는다). PART 7 「다음 단계」도 초급·중급·고급으로 바꾸고 주제마다 한 문장 설명 추가 |
| 2026-09-16 | **공유 폴더를 CLAUDE_초기설정.txt + skills 만 남김.** 사용자 지시로 `CLAUDE_starter_1step_가이드.html`·`CLAUDE_starter_1step_순서.txt` 를 드라이브 휴지통으로 이동(로컬 `handout/` 에는 그대로 유지). `tools/upload_handout.py` 업로드 목록도 초기설정.txt 하나로 줄임 |
| 2026-09-16 | **HTML 가이드 v1.3 (수정사항.pptx 7건 반영).** 3단계에 Cursor·VS Code 설명, PART 4 맨 앞에 「작업 폴더(워크스페이스)란」(단일/다중 운영 시 CLAUDE.md·스킬·메모리 처리), 12단계에 두 확인 질문의 차이와 **실제 답변 화면 2장**(`s12_answer_short/long`) 추가. 10단계 주의 문구를 쉬운 말로. 수정 내역은 본문에서 빼고 헤더 [Release Notes] 버튼 팝업으로 이동(목차 7개 항목). PART 4 확인 퀴즈와 PART 5 「업무가 늘어날 때 폴더 구조」 표 삭제(PART 4 설명에 합침) |
| 2026-09-16 | **규칙 txt 2개를 1개로 합침 (HTML 가이드 v1.2).** `CLAUDE_프로젝트초기화.txt` + `CLAUDE_전역규칙.txt` → `CLAUDE_초기설정.txt` 1개. 프롬프트 안에서 1단계(전역)·2단계(작업 폴더)를 순서대로 실행하고, 규칙 본문 2개는 원본 그대로 옮김(`tools/make_merged_txt.py`). 교육 단계 13 → 12(옛 10·11단계 통합, 이후 번호 당김), 진행률 체크 저장 키를 바꿔 초기화. 옛 txt 2개는 `archive/`, 공유 폴더 게시본 4개는 `archive/drive_260916/` 에 보관. 구글 문서(요약 탭 1~12·초기세팅_상세 0~3) 반영과 공유 폴더 게시까지 완료, 옛 txt 2개는 드라이브 휴지통으로. **공유 폴더 링크가 바뀌었으니 기존 교육생에게 공지 필요** |
| 2026-09-16 | **HTML 가이드 v1.1.** 제목 옆 버전·작성일 표시, PART 8 「수정 내역」 신설(교육생이 받아 둔 파일과 비교하는 용도), 5단계에 확장 프로그램 3개 설명 상자 추가(공식 문서 기준 — 확장을 깔아도 7단계 터미널 설치는 따로 필요), 목차 현재 위치 표시가 마지막 항목에서 안 따라오던 문제 수정, 본문 폭 1180 → 1600px. **공유 폴더는 아직 v1.0 (게시 전)** |
| 2026-09-15 | **답변 언어를 `/config` 언어 설정으로 전환.** `CLAUDE_프로젝트초기화.txt` 에서 언어 규칙 5줄을 빼고 「커밋 메시지·문서는 한국어」 1줄만 남김. 흩어진 교육 자료를 `AX_study` 폴더로 정리 |
| 2026-09-15 | **공유 폴더 게시.** HTML 가이드·교육순서.txt 새로 올림, 전역규칙·프로젝트초기화 txt 는 최신본으로 교체 (링크 그대로) |
| 2026-09-15 | **교육용 HTML 가이드 제작** (`handout/CLAUDE_starter_1step_가이드.html`, 13단계 카드·진행 체크·명령어 복사·실제 화면 31장). 기획서 결정 확정: 요약 §2 `/ide` 행 삭제, 예시 폴더명 `claude_work` 통일(구글 문서·교육순서.txt), 배포는 공유 드라이브 파일. 드라이브 백업·테스트 사본은 완료 후 휴지통으로 이동 |
| 2026-09-15 | **실측 촬영으로 확인한 5건 반영.** 첫 실행 안내 창 순서와 폴더 신뢰 창 기본값(No, exit), 첫 화면은 계정이 아닌 요금제 표시, auto 모드는 파일 생성 허용을 묻지 않음, 패널 위치는 「터미널」 탭 제목 우클릭, 자주 틀리는 것에 「실행 직후 꺼짐」 추가. 구글 문서(진행순·요약·초기세팅_상세·기획서) + 교육순서.txt |
| 2026-09-15 | **교육용 HTML 기획서 작성.** 구글 문서 「교육 기획서」 탭에 초안 (앞 3개 탭을 한 페이지 HTML로 묶는 계획, 결정 필요 사항 6건) |
| 2026-09-15 | **공식 문서 기준 전체 점검 후 구글 문서·handout 수정.** 아래 표 참고. 구글 문서 수정 전 원본은 드라이브 백업 사본으로 보관, 상세 목록은 `docs/구글문서_수정안_260915.md` |

**2026-09-15 점검 수정 내역**

| 구분 | 내용 | 반영 위치 |
|---|---|---|
| 정정 | 플랜 모드: Shift + Tab 한 번이 아니라 `plan mode on` 이 보일 때까지 (또는 `/plan`) | 구글 문서 진행순·요약 §2·§3 |
| 정정 | 권한 옵션: `--dangerously-skip-permissions` 대신 기본 auto 모드 사용 | 구글 문서 진행순·요약 §2 |
| 삭제 | 진행순의 `/ide` 항목 | 구글 문서 진행순 |
| 추가 | 답변 언어 설정 단계 (요약 표 9번, 이후 번호 10~13) | 구글 문서 요약 §1·초기세팅_상세, 교육순서.txt 0번 |
| 통일 | 작업 폴더 위치 「바탕화면 또는 업무 폴더」, PATH 는 「사용자 변수」, 적용 범위 「하위 폴더 포함」, 담당 내용에서 「한국어 규칙」 제거 | 구글 문서 전 탭, 교육순서.txt, 전역규칙.txt |
| 추가 | 확인 질문 2개(짧은 질문·의견 질문), 자주 틀리는 것 「짧은 질문에도 길게 답함 = 전역 규칙 누락」, 멈춤 원인에 사용자 폴더, 되돌리기에 답변 언어, MEMORY.md 는 앞 200줄(25KB)까지만 읽힘 | 구글 문서 초기세팅_상세, 교육순서.txt |
