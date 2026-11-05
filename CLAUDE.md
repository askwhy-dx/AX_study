# AX_study 작업 규칙

Claude Code 1step 자료를 관리하는 폴더다. README.md 는 팀 공유용이므로 개인 작업 메모를 넣지 않는다.

과정명과 단계명은 아래 「명칭과 폴더 기준」을 따른다. `tools/` · `archive/` · `docs/` 는 과정 공용이다.

## 명칭과 폴더 기준 (2026-10-30)

- 과정명은 `starter` · `basic` · `advance` · `master` 소문자로 쓴다.
- 각 과정은 `1step` · `2step` 으로 구분한다. 문서 제목과 본문, 파일명과 경로에 같은 이름을 쓴다.
- `starter/1step/` : 첫 설정 12단계. 정본 `web/guide.src.html`, 배포본 `handout/CLAUDE_starter_1step_가이드.html`.
- `starter/2step/` : 사내 웹 앱을 말로 만들고 구글 시트 · Apps Script 로 배포한다. 정본 `web/guide.src.html`, 배포본 `handout/CLAUDE_starter_2step_가이드.html`. `commute_app/` 은 완성본이며 그 안 `CLAUDE.md` 를 따른다.
- starter 2step 진행자 문서: https://docs.google.com/document/d/16VqrcWI4fmoNcRZdRaxqP6b2aoniH_0oJREXNFhU3g0/edit (비공개 · 공유를 추가하지 않는다). 사람이 편집한 내용이 있으므로 문서 전체를 로컬 원고로 덮어쓰지 않고, 최신 revisionId 를 확인해 해당 구간만 수정한다.
- 공유 드라이브의 starter 2step 폴더 이름은 `2step`, basic 준비물 폴더 이름은 `basic` 이며 하위 단계는 `1step` · `2step` 이다. 기존 파일 ID 와 공유 권한을 유지한다.
- starter 2step 은 한 과정이다. 별도 선택 과정이나 중간 하위 폴더를 만들지 않는다.
- `master/research/` : 준비 중인 master 참고 자료. 아직 master 가이드는 없다.
- **(11-05 사용자 확정) advance 2step · master 구성의 정본 = 기획서** `advance/2step/advance_2step_기획.html` · `master/1step/master_1step_기획.html` · `master/2step/master_2step_기획.html` (HTML 만 · 직접 고친다). advance 2step = 팀 꾸리기(에이전트 정의 · 서브 · 에이전트 팀 · 판단표) · master 1step = 스스로 지키기(Auto Memory · 훅 · 하네스 · 루프) · master 2step = 팀에 퍼뜨리기(플러그인 · 모드 · 유삐 같은 슬랙 봇). **확정 구성에 없는 스택과 권한 · 보안은 교육과정에서 제외한다** — `claude -p` 무인 실행 · 스케줄러 출근표 · 결근 대비 · 룰 · 허용 목록 · Supabase · Playwright 테스트 · 카카오 PlayMCP · 그래프 엔지니어링을 다시 넣지 않는다. advance 2step 가이드 = **v3.2(11-05 · 팀 꾸리기 5단계 · 진행 체크 키 `cc-adv-trial-steps-v2`) · 실습 소재 = 가상 학부모 문의 15건 답변(11-05 사용자 D안 · 직영 리포트 소재 폐지)** · 실습 폴더 `cs_practice`(워크스페이스 바로 아래 · `문의.txt` · `응대규정.md` · `응대규정_옛판.md`) · 에이전트 `cs-reply` · 3 · 4단계 오류 = 옛 판 규정 → 문의 4 · 9 · 13 만 틀림(세 조항만 다르게 짰다 · 문의를 고치면 정답표 대조부터) · handout 정답 = `정답_응대담당.md` · `정답표_문의답변.txt`(**실습 폴더 밖** = 에이전트가 못 읽게) · `팀켜기.txt` · 옛 직영 소재 파일 = `archive/advance_2step_data소재.261105/` · ⚠️ 2~4단계 카드 실측 전 · 강사 시연 폴더(`basic_demo`)는 아직 직영 소재 · handout 새 파일 드라이브 업로드 전.
- 가이드 안 PART · 단계 번호 · 앵커 · 진행 체크 저장 키는 명칭 변경만으로 바꾸지 않는다.
- (11-01 사용자) basic 1step · advance 2step 의 스킬 · 에이전트 위치 = **워크스페이스 폴더(basic_data 바로 위)의 `.claude`**. 워크스페이스 이름은 교육생마다 달라 가이드에 `claude_work` 같은 폴더 이름 · 예시를 쓰지 않는다 — 「basic_data 바로 위 폴더」 · 「워크스페이스의 `.claude\…`」로 적는다. 팀 플래그 `settings.local.json` 은 실습 폴더에 둔다(basic = basic_data · advance 2step = cs_practice, 11-05).
- 빌드·발행 경로의 기준은 `tools/courses.json` 이다. 표준 인자는 `starter-1step`, `starter-2step`, `basic-1step`, `basic-2step`, `advance-1step`, `advance-2step` 이다. 이전 도구 인자는 호환용 별칭으로만 지원한다.

## 폴더 역할

- `basic/` : **basic 과정**(스킬·싱글 에이전트·서브 에이전트·에이전트 팀). **09-29 사용자 지시로 starter 처럼 `basic/1step/` · `basic/2step/` 두 갈래**(각각 `web/` · `handout/`). **⚠️ 10-06 사용자 지시: 지금까지 만든 2step(서브 · 에이전트 팀)은 master 2step에 쓴다 → `master/2step/` 으로 옮겼다** → **10-12 advance 2step으로 확정, `advance/2step/` 으로 다시 옮김**(도구 키 `basicTrial` · 원격 `claude-code-agent-team.html` 은 그대로 · `advance/2step/` 을 가리킴). 새 basic 2step = 외부 데이터 연결(**컨셉 = 수집과 공유**, 10-12 · 가이드 제목 · 주소는 그대로 · 프롬프트로 MCP 구글 시트 · 국가법령정보 API · 교육청 학원 공고 크롤링 → 단계마다 CSV 저장 → 내 구글 시트에 탭으로 적재(10-07 · 옛 엑셀 모으기 폐지) · 수집 결과 페이지 배포(세 갈래 · 10-08) · **슬랙은 넣지 않는다**(10-06 사용자 · 수집 컨셉에선 알림이 필요 없음 → advance 자동화와 함께))이고 **`basic/2step/` 가이드 v1.30(11-02 · `#playwright` 주의 · 막히면 상자 삭제 → 접힌 카드 Playwright 스크립트 설치) · v1.29(11-02 · `#playwright` 프롬프트 = PowerShell · `-s user` · Node 18 · 강사 PC 실측 통과) · v1.28(11-01 · `#chrome` · `#playwright` = 설치만 하는 프롬프트로 축소 · GCP · 로컬 인증 프롬프트 삭제 = 구글API 매뉴얼과 더는 맞추지 않음) · v1.26(10-29 · `#chrome` 아래 번호 없는 선택 단계 `#playwright` = Claude in Chrome 확장이 다른 Claude 계정으로 잡힐 때 Playwright MCP 로 같은 GCP 설정 · 등록 `cmd /c npx` · 교육생 PC 실측 전) · v1.25(10-26 · 법령 API 키 신청을 PART 3 맨 앞으로 = 단계 번호 재매김 준비 1 · MCP 2~3(시트 = 3단계) · API 4~5 · 6~9 그대로 · 진행 체크 키 `cc-basic-data-steps-v3` · 시작 전 세 가지 표 = 영어 이름 표) · v1.24(10-26 · PART 2 끝 번호 없는 선택 단계 `#chrome` = Claude in Chrome 으로 구글 API 연결, 구글API 회사판 매뉴얼 프롬프트 1 · 2 사본 — 매뉴얼을 고치면 여기도 · 프롬프트 3 스킬 설치는 넣지 않음) · v1.23(10-26 · 시작 전 「오늘 배울 것」 초심자용 재작성 = 세 가지 비유 표 · 처음 보는 말 표 · 카드 그대로) · v1.22(10-20 · 크롤링 「쓰는 범위」 상자 4곳 = 5단계 심화 판례 · 6단계 한 줄 · 9단계 공개 전 확인(저작권법 제24조의2) · 흐름 그림 + 네이버 카페 시연 주의 · 카드 그대로 · 시연 유지 여부 결정 대기) · v1.21(10-19 · 4단계 공용 시트에 내 이름 탭 · 5 · 8단계 내 이름 탭 업데이트) · v1.20(10-16 · 6단계 robots.txt 읽는 법 상자 = 실제 줄 · 허용/불가 한글 표, 2026-10-16 기준 — 수업 직전 sen.go.kr/robots.txt 와 대조 · `(1079|…)` 괄호식은 표준 문법이 아니지만 운영자 뜻을 따른다고 가르친다) · v1.19(10-16 · 1단계 Python 캡처 2장 = 다운로드 페이지 `py_download`(playwright 직접 촬영) · 설치 첫 화면 `py_installer`(사용자 제공) · ⚠️ 이 설치 프로그램은 **Python 3.15 가 마지막** — 3.16 이 안정판이 되면 1단계를 Python install manager 기준으로 다시 쓰고 캡처도 다시 찍는다) · v1.17(10-14 · 마무리 = 흐름 그림(수집 3 판단 질문 → 모으기 → 페이지 → 배포 3 · 설명은 화살표 위) + 네이버 카페 시연(Playwright 설명 · 설치 한 줄) · 판단표 · 주의 · 수업 끝 상자 삭제) · v1.11(10-14 · 「Claude 웹사이트」 → 「Claude 아티팩트」 용어 통일 · 마무리 흐름 그림) · v1.10(10-14 발행 · 마무리 끝 강사 시연 = 네이버 카페 크롤링 `test/crawling-naver` · 로그인 세션은 강사 것이라 보기만 · 단계 번호 그대로) = 도구 키 `basicData` → 원격 `ax_study/claude-code-external-data.html`**(10-06 발행 · 9단계 · 진행 체크 키 `cc-basic-data-steps-v2` · 범위 정본 = `AX_과정별_기술스택.xlsx` basic 2step 칸 · 소재추천 5tr 칩이 이 URL 을 건다). **10-07 v1.3 구성: 4 내 시트 탭(카드 없음) · 5 .env 칸 → 개인정보 보호법 수집 판단 → `law\법령.csv` → 시트 탭 · 6~8 크롤링 = 서울시교육청 고시 · 공고 「학원」 검색(q_bbsSn=1100) 허락 확인 → 1~4 카드 한 장(`crawling\학원공고.csv` · 관련 판단 · 본문 3줄 요약) → 시트 「학원공고」 탭 적재 · 9 수집 결과 페이지 배포(10-08 v1.4 · 두 CSV → `publish\index.html` 카드 3회 3/3 → 구글 웹앱 · Claude 웹사이트 · 사내 로컬 서버 셋 다 교육생 실습(v1.5) · 비교표 · 로컬 서버는 `--directory publish` 고정 + `/.env` 404 확인 = `.env` 노출 방지). 엑셀(오늘_수집.xlsx · openpyxl)은 폐지.** ⚠️ 카드 실측은 5 · 6 · 7단계 1회씩 · 8단계 2회 — 3회 검증 남음. **.env 는 배포하지 않는다**(10-07 사용자 · 드라이브 배포안 폐기 → 5단계 카드가 빈 `LAW_OC=` 칸을 만들고 교육생이 강사가 알려 준 OC 를 파일에 직접 쓴다). 교육용 OC = 강사 `test\.env` 의 `LAW_OC`(호출 실측 OK). 법령 API 는 신청 즉시 자동 승인 · 공개된 하루 한도 없음(부하 시 제한만). 4 · 5 · 8단계 시트 = **10-19 v1.21 부터 공용 시트 한 파일(`1zqM4Tr-64HqRBahiewFnfravx6XFsWXnYpTguPPaTyA`)에 교육생이 각자 이름 탭을 만들고 5 · 8단계는 그 탭을 지우고 다시 넣어 업데이트**(새 탭 금지 = 남의 탭 덮어쓰기 방지) · 링크는 가이드에 넣지 않고 강사가 쪽지로 보낸다 · 본인 계정 교육생은 새 스프레드시트를 직접 만든다 — 커넥터는 Claude 계정 단위라 강사 Claude 계정이면 구글도 강사 계정으로 움직인다 · 칸 쓰기는 Google Sheets 커넥터만 된다(Drive 수정 도구는 제목 · 폴더만). 도구 인자 `basic` = 1step(`CLAUDE_basic_1step_가이드.html` → `claude-code-skills-agents.html`) · `basicTrial` = 2step(`CLAUDE_basic_2step_가이드.html` → 제안 `claude-code-agent-team.html`). 가이드 v1.0 초안(**09-30 7차판 = 직영 데이터 분석** · 1step 15단계(PART 1~8) · 2step 10단계 + 선택 1(10-01 v1.1 · 10단계 Python 설치를 맨 뒤에 붙여 키는 그대로), 캡처 0장, **10-02 사용자 지시로 v1.2 발행**(1step `ax_study/claude-code-skills-agents.html` · 2step `ax_study/claude-code-agent-team.html` · 소재추천 4tr · 5tr 회차 칩이 이 두 URL 을 건다 — **원격 파일명 바꾸지 않는다**). 이제 고치면 「발행까지 한 세트」 규칙대로 발행한다) · **10-04 2step v1.3**(7단계 팀 = 이름 붙인 팀원 + SendMessage + [참관] 사본 · 3 · 4B 카드 Node 문장 · 기준 2.1.289), 틀은 2step 가이드의 CSS · JS 를 그대로 가져왔다. 진행 체크 키 `cc-basic-steps-v3` · `cc-basic-trial-steps-v3`(09-30 단계 수 변경으로 올림). **결정 대기 = `basic/결정필요.txt`**(메모장, 사용자가 읽는 목록 · 정하면 줄을 지우고 기획서 §0 으로). **기획서는 10-07 사용자 지시로 둘로 나눴다 — 1step = `basic/1step/basic_1step_기획.html` · 2step = `basic/2step/basic_2step_기획.html`· **둘 다 HTML 만**(10-07 md · pdf 삭제, 사용자 지시 · 고칠 땐 HTML 을 직접 고친다 · 마지막 md 는 `archive/초급_교육_기획.md.261007.bak`)**. `basic/1step/` · `basic/2step/` 바로 아래 둔다
  (2026-09-18 `docs/` 에서 옮겼다). **`web/`·`handout/` 안에 넣지 않는다** — handout 은 배포 폴더고, 기획서는 배포하지 않는다.
- `advance/1step/` : **advance 1step = 자동화**(10-29 착수). 정본 = 기획서 `advance/1step/advance_1step_기획.html`(HTML 만 · 직접 고친다) · **기획서 2차 개편(10-29 사용자 6개 지시) = 10 PART · 19단계 · 약 160분 → 가이드 v2.0 발행(10-29 · 한 장 · 2회로 나누지 않음 = 과정 단계당 웹사이트 1개).** v2.0 구성: Git ① 내 워크스페이스를 Git 으로(1) · Git ② 교육생이 고른 연습 폴더에서 저장 · 되돌리기 · 브랜치(2~5) · GitHub 가입 · 비공개 리포 · 올리기(6~8) · GitHub 에서 스킬 · 에이전트 · 룰 찾기(별 · 포크 · 최근 업데이트 · 라이선스, 9~11) · 유튜브 API(YouTube Data API v3 키 · 조회수 순 검색 스크립트 `yt_skills.py`, 12~13) · 작업 스케줄러(14~15 · 실습 작업 삭제 포함) · 슬랙 웹훅 가입부터(16~18) · 클라우드 루틴 기술 · 제약 소개(19) · 끝 정리 상자(판단표 · 「마무리」 단계는 폐지). 흐름 = 유튜브 검색 스크립트 → 스케줄러 → 슬랙(옛 교육청 스크립트 폐지). **Playwright MCP 는 넣지 않는다**(basic 2step 몫). 옛 「Git 은 실습 폴더 auto 에서만」은 폐기. **GitHub 에는 코드만(개인정보 · 데이터 파일 금지)** 은 유지. 공개 `ax_study/claude-code-automation.html`(바꾸지 않는다) · 도구 키 `advEdu` · 진행 체크 키 2판 `cc-adv-edu-steps-v3`. **가이드 v2.2(10-30)** = 카드 실측 1 · 2~5 · 10 · 11 · 14 · 15 통과분 반영(허락 창 팁 · 11단계 스킬 이름 + 그 파일만). 남은 실측 = 8 · 12~13 · 16~18 · 19(강사 계정 · `README.md` 「다음에 할 일」) · ⚠️ `.claude` 쓰기는 `claude -p` 로 못 잰다(`acceptEdits` 도 막힘) · 게이트 G1 · G2 · G4 · G5 · G6 · G7 은 기획서 §5. AX_source 회차 = `out/20261102`(6tr · v2.0 에 맞춰 재발행 커밋 807c337). **가이드 v2.3(10-30 · 사용자 5개 지시 · 3차 개편 · 18단계 · 진행 체크 키 `cc-adv-edu-steps-v4`)** = 준비물 아래 Git · GitHub 비교표 · 관계 그림 · 7단계 비공개 리포 = 프롬프트(`gh repo create --private` · 로그인만 사람) · **유튜브 삭제(되살리지 않는다)** → 12단계 `gh_skills.py`(GitHub 검색 API · 키 없음 · 9단계 검색을 프로그램으로) · 스케줄러 13~14(`AX_gh_daily`) · 슬랙 15~17 = **교육생이 회사 메일로 직접 가입 · 내 워크스페이스**(강사 초대 폐기) · 16단계 웹훅 = Claude 가 매니페스트 · `.env` 칸 → 사람이 붙여넣기 · 허용 · 주소 · 루틴 18. 위의 v2.0 단계 번호 설명은 옛 구성이다. **가이드 v2.4(같은 날 · 사용자 3개 지시 · 17단계 · 키 `cc-adv-edu-steps-v5`)** = 9단계 「내 업무에 맞는 것 찾기」(업무 내용 칸 → gh 검색 · 기준표 비교 · 가장 적합한 1개 · 옛 「검색하기」 삭제) · 10 받아서 써 보기 · 11 `gh_skills.py`(9단계 검색어 · **결과 CSV 는 구글 드라이브 데스크톱 앱 「내 드라이브\<작업 폴더 이름>」 에 복사 = 사용자 「데이터는 드라이브에 작업폴더명으로」**) · 스케줄러 12~13 · 슬랙 14~16 · 루틴 17 = 그 드라이브 CSV 요약. 코드 = GitHub · 데이터 = 드라이브. ⚠️ AX_source `out/20261102/회차유형.json` 은 아직 v2.0(유튜브 · 19단계) 그대로. **가이드 v2.23(11-02 · 사용자)** = 8단계 끝 접힌 카드 「작업 마무리를 스킬로 — /wrap-up」(문서 반영 → 점검 → 커밋 → push · 내가 부를 때만 · 실측 2건 통과). **가이드 v2.22(11-01 · 사용자)** = 15단계 바꿀 칸 설명 표(앱 이름 / 보낸 사람 이름). **가이드 v2.21(11-01 · 사용자)** = 15단계 매니페스트 = display_information.name · features.bot_user.display_name(<영문 이름>-alert) · oauth_config.scopes.bot [incoming-webhook] · settings.incoming_webhooks_enabled — 실측 알림 테스트 통과. **가이드 v2.20(11-01 · 사용자)** = 15단계 매니페스트 JSON 을 프롬프트에 그대로(incoming_webhooks_enabled: true). **가이드 v2.19(11-01 · 사용자)** = 8단계 끝 두 상자 접힌 카드(details.q.fix). **가이드 v2.18(11-01 · 사용자)** = 8단계 끝 「새 프로젝트를 시작할 때 — GitHub 에 올리려면」(순서 표 · 프롬프트) · 1단계 팁에서 안내. **가이드 v2.17(11-01 · 사용자)** = 8단계 끝 「커밋 · push · 게시」 상자(커밋만으론 GitHub 에 안 올라감 · 동기화 ↑ · 웹 Code 탭/N Commits/History) · 11 · 16단계 프롬프트엔 push 없음. **가이드 v2.16(11-01 · 사용자)** = 9단계 프롬프트 검색 방법 줄(옛 2번 · 공식 저장소 먼저 · gh 전체 경로) 삭제, 1~4번. **가이드 v2.15(11-01)** = 9단계 예시 상자 = 실측 추천 `finance/skills/variance-analysis`(analyze 는 실측 후보에 안 나와 교체) · 10단계 확인 /variance-analysis. **가이드 v2.14(11-01)** = 7단계 확인에 gh 설치 뒤 VS Code 재시작 · 9단계 gh 전체 경로(실측 Exit 127). **가이드 v2.13(11-01)** = 9단계 공식 저장소(org:anthropics) 먼저 · SKILL.md 한 파일 · 스크립트 없는 것 우선 · 데이터 분석 예시 = `anthropics/knowledge-work-plugins` `data/skills/analyze`(단일 파일 · Apache-2.0) · 10단계 「멈췄다」 상자. **가이드 v2.12(11-01)** = 7단계 끝 「GitHub 메뉴 둘러보기」(캡처 `adv_gh_dashboard` · `adv_gh_repo_tabs`). **가이드 v2.11(11-01)** = 8단계 2번 remote -v 먼저 · 다른 주소면 멈춤 · 4번 아이디 gh 직접 조회 · 7 · 8단계 실측 통과(jck-220/work). **가이드 v2.10(11-01)** = 7단계 4번 리포 = 워크스페이스 저장소(지금 연 폴더) · 7단계 끝 비공개 확인 상자(자물쇠 캡처 `adv_private_lock`). **가이드 v2.9(11-01)** = 6단계 2단계 인증은 필수에서 빼고 6단계 끝 접힌 카드(선택 · 캡처 `adv_2fa`)로. **가이드 v2.8(11-01)** = 6단계 Git 메일(`git config --global user.email`)로 가입 · 기존 계정은 Emails 추가 · 8단계 4번 push 뒤 커밋 ↔ 계정 연결 확인(`gh api …/commits/main --jq .author.login`) · GH007 표. **가이드 v2.7(11-01 · 사용자 · 실측 PC 소스 제어처럼)** = 워크스페이스를 연 채 1단계 한 프롬프트로 **워크스페이스 저장소(공용 .claude · 스크립트, 제외 목록에 프로젝트 폴더) + 프로젝트마다 저장소 + 연습 저장소 git_practice** · 이름 · 메일 --global · 2단계 = 소스 제어에서 저장소 보기(캡처 adv_multi_repo) · 3~5 = git_practice 의 메모.txt · 7 · 8 · 11~16 = 워크스페이스 저장소 · 10단계 스킬 = 워크스페이스 .claude(커밋해 두고 아니면 되돌림). 아래 v2.6 설명은 옛 구성. **가이드 v2.6(11-01 · 사용자 「프로젝트별로 봐야 되돌리기가 쉽다」)** = **Git 저장소는 프로젝트마다 따로**: 1단계 = 프로젝트 폴더를 열고 Git 시작(상위가 이미 저장소면 멈춤) · 2단계 = 그 안 연습 파일 하나 정하기(옛 「연습 폴더 고르기」 폐기) · 3~5 그 파일만 · 10단계 스킬 = 프로젝트 `.claude` · 워크스페이스 공용 `.claude` 는 어느 저장소에도 안 들어감(팁). 단계 번호 · 진행 체크 키 v5 그대로. 같은 날 v2.5 = 1단계 Git 자동 설치(winget → GitHub 릴리스 /VERYSILENT · 허락 창만 사람 · 설치 뒤 전체 경로) + 1~5단계 캡처 · 번호 표(`web/images/shots/adv_*.png`) · PART 3 용어 표 · Git/드라이브 백업 팁. ⚠️ 2~5 카드 문장이 바뀌어 재실측 필요.
- `구글API/` : 구글 API 연결 매뉴얼 2종(Claude Docs) + 사용 스킬 `google-api` 관리. 규칙·문서 ID 는 그 안 `CLAUDE.md`.
- `archive/` : 수정 전 원본 백업. 되돌릴 때만 쓴다. 전체 과정 공용이라 파일명으로 구분한다.
- `docs/` : 작업 문서. 배포하지 않는다. **`작업기록.md` = 이 CLAUDE.md 에서 분리한 「끝난 일」 원문**(2026-09-29 · 경위를 찾을 때 본다) · 그 밖에는 starter 시절 문서만 남아 있다
  (`구글문서_수정안_260915.md`·`이미지_수집목록.md`). basic 기획서는 2026-09-18 에 `basic/` 으로 옮겼다.
- `tools/` : 실행 python 은 Python312. **스크립트는 한 벌이고 과정을 인자로 받는다**(`과정-단계`, 기본 `starter-1step`). 과정이 늘어도 복제하지 않는다.
  - 구글 문서: `gdoc_dump.py <문서ID> <출력.json>` = 탭 포함 구조 덤프(.txt 동시 생성). `gdoc_apply_260915*.py`·`gdoc_apply_260916.py <문서ID> dry|apply` = 회차별 적용본(재실행하면 매칭 0건으로 중단되므로 새 수정은 복사해서 목록만 바꿔 쓴다. b 는 행 추가·같은 문단 여러 개, c 는 행 삭제, 260916 은 문단 뒤 줄 추가 + **행 삭제를 한 건씩** 지원). **행을 여러 개 지울 때 한 배치로 보내면 뒤쪽 표의 시작 인덱스가 밀려 `Invalid table start location` 으로 실패한다** — 한 건 보내고 다시 읽는다. `gdoc_images.py` = 문서 속 이미지 추출.
  - 촬영: `shot.py`(창 조작·캡처), `shots_finalize.py <raw 폴더> [starter|basic]`(자르기·가림, 원본 raw 필요 = starter raw 는 이미 삭제됨).
  - 드라이브: `upload_handout.py dry|apply` = `starter/1step/handout` 만 올린다. **basic은 `upload_basic_handout.py 1step|2step dry|apply`**(09-30) → 드라이브 「basic 준비물」 폴더 `1JOGuo57D-ZtolZSu_FaJiaizTN48mi_g` 의 1step · 2step 하위 폴더(도메인 편집 권한). **1step 폴더 바로 아래는 열사전 · 실습 데이터만, 나머지는 하위 `참고자료`**(10-06 사용자 · 스크립트 `TOP` 이 정한다 · 로컬 handout 은 평평). 가이드 HTML 은 올리지 않는다. 실습 데이터 · 정답표는 `make_basic_data.py <직영통합_export_YYYYMMDDhhmm.csv>` 로 다시 만든다(**10-05 사용자: 학생명 · 교사명 · 학생코드 원본 그대로** — 기간 · 센터만 거른다 · 첫 열 no = BOM 대비). **연도를 박아 두지 않는다(10-03)** — 파일 이름 날짜로 기간(직전 3개월 + 1년 전 같은 3개월) · 기준 연도 · 센터 · 열사전 첫 줄을 계산한다. 다시 만든 뒤엔 직영 대시보드와 대조하고 드라이브(`upload_basic_handout.py`)까지 올린다.
    starter 2step 배포 파일 5개(프롬프트 txt · 정답_출퇴근 · 정답_폰미리보기 · 정답_서버_웹앱.gs · 정답_index.html — v1.11 에서 정답_서버.gs 는 내림·휴지통)는 09-27 **`AI-AX-Setup/2step`** 폴더(`1cvehjggzeg0WDNa3nBlQbAQCoUEIyPFp`, 상위 권한 상속 = 도메인 전체 편집)에 손으로 올렸다(md5 일치). 스크립트 대상이 아니므로 **handout 을 고치면 여기도 같은 이름으로 교체**한다.
  - 인쇄용 PDF: `md2pdf.py <문서.md>` = 마크다운을 A4 PDF 로. 판(폰트·CSS·playwright 렌더)은
    `AX_source/tools/pdfdoc.py` 를 빌려 쓴다 — 같은 회사 문서로 보이게 하려는 것이라 **CSS 를 따로 들지 않는다.**
    표가 페이지 경계에서 쪼개지지 않게 하는 한 줄만 md2pdf 쪽에서 덮는다. PDF 옆에 HTML 도 남는다.
- 루트 : README.md, CLAUDE.md 만 둔다. **예외: `AX_과정별_기술스택.xlsx`**(09-29 사용자가 AX_study 에 두라고 지시).
  **과정 키워드(10-13 사용자 확정 · 11-05 advance 2step · master 교체 · 기술스택표 8행)**: starter 설치와 규칙 / 만들기와 배포 · basic 기준과 담당 / 수집과 공유 · advance 자동화 / 팀 꾸리기 · master 스스로 지키기 / 팀에 퍼뜨리기 (1step / 2step). 키워드 · 구성 확정(11-05) — 세부는 각 기획서가 정본. 엑셀 · 진행표 `COURSES` 도 11-05 새 구성으로 맞췄다(진행표 a-x 옛 키 0·5·6·7 → 새 1·2·3·4, 1~4 = 제외 항목이라 삭제). 생성 스크립트는 남기지 않았다 — 엑셀에서 직접 고친다. basic 칸은 `basic/1step/basic_1step_기획.html` · `basic/2step/basic_2step_기획.html` 과 맞춰 둔다(기획서가 정본).
  ⚠️ 논의에서 뺀 것을 되살리지 않는다: 검산기 · Python 데이터 처리 · 기획 문서화 · MCP 서버 만들기 · Agent SDK · n8n(사용 안 함) · 사내 강사. (11-05 사용자: 플러그인 · 마켓플레이스로 하네스를 팀에 배포하는 것은 master 2step 확정 범위라 이 목록에서 뺐다)
  예외(09-29 사용자 지시): basic 1step 마지막에 **superpowers 의 brainstorming 스킬 하나만** 수정본으로 준다. basic 에는 플러그인 전체 · 플러그인 일반을 넣지 않는다(플러그인은 master 2step).
- **팀별 진행표 = Claude 아티팩트** https://claude.ai/artifact/WaJxr9BKNQHLMauhyvu9jJ (10-22 · 로컬 원본 없음 — 고칠 땐 `Artifact read` 로 라이브 판을 받아 그 위에서 고친다). 팀원 체크는 **사용자가 직접**(에이전트는 화면 · 기능만 고친다).
  - 데이터 = 페이지 안 `<script id="state">` JSON(`teams[].sessions[] = {date, done, items[]}`). 체크하면 페이지가 스스로 새 버전을 게시한다(capability `artifact`) → **고쳐 올리기 직전에 반드시 라이브 판을 다시 읽고 state 를 옮겨 붙인다**(10-22 병합 실패한 채 게시돼 사용자 편집이 한 번 덮였다 · 바로 복구).
  - ⚠️ 항목 키 = `과정키.번호`(예 `a-x.2`) — **번호 기반**이라 기술스택 항목의 순서 · 개수를 바꾸면 기존 체크가 엉뚱한 항목으로 간다. 바꿀 땐 옛 키 → 새 키 대응표로 state 를 옮긴다(10-22 advance 재편 때 그렇게 함). 이름만 바꾸는 건 안전.
  - 팀 = 부서장 · 인사팀 · 직영팀 · 마컴팀 · 재무팀 · 출판팀 · FC팀(11-02 출판 · FC 추가). 화면 = 팀별 요약 · 과정 × 팀 · 차수별 진행 셋뿐 — 「팀별로 지금 할 수 있는 것」 · AI 분석은 11-02 사용자 지시로 삭제(capability = `artifact` · `user` 만).
  - 기술스택표(엑셀)의 항목 문구를 바꾸면 진행표 `COURSES` 도 같이 맞춘다 — 둘은 자동으로 이어지지 않는다.

## 정본은 HTML 가이드다 (2026-09-16 변경)
**각 과정의 `<과정>/web/guide.src.html` 이 유일한 정본이다.** 고친 뒤 `tools/build_html.py <과정>` 으로 빌드해 같은 과정의 handout 으로 복사한다. 결과 HTML 을 직접 고치지 않는다.

### 가이드를 고치면 발행까지가 한 세트다
교육생은 파일을 받지 않고 **공개 링크로 본다.** 그래서 고치고 빌드만 하면 화면에는 아무것도 안 바뀐 것과 같다. 아래 4단계를 끝까지 한다.
1. `<과정>/web/guide.src.html` 수정
2. `python tools/build_html.py <과정>`
3. `<과정>/handout/` 으로 복사
4. **`node tools/upload_guide_github.js <과정>`** → 공개 링크 반영 (같은 내용이면 SAME 으로 알아서 건너뛴다)

`<과정>` 은 `tools/courses.json` 의 표준 인자다. 인자를 빼면 `starter-1step` 이다.

- 「문서 업데이트해줘」, 「수정사항 반영해줘」, 「여기까지 반영」 같은 요청에는 **4번까지 포함**한다. 발행 여부를 따로 묻지 않는다. (사용자가 09-16 에 공개를 승인했다)
- 가이드 내용을 바꿨으면 **Update Notes 팝업 표에도 줄을 추가**한다. 목차가 아니라 `<dialog id="rel">` 안의 표다.
- 올린 뒤 1분 안팎은 옛 내용이 보인다(Pages 전파). 바로 확인하려면 `curl -s -o /dev/null -w "%{http_code}"` 로 200 이 뜰 때까지 기다린다.
- 발행하지 않기로 한 경우에만 그 사실을 보고에 적는다.
- **구글 문서는 더 이상 관리하지 않는다.** 사용자 지시(09-16)로 정본에서 내렸다. 문서를 다시 맞출 일이 생기면 09-16 시점 기준으로 **HTML 이 더 최신**이라는 것부터 확인한다. (문서에는 옛 「10단계 주의」 문구, 「중급1·중급2」 학습 단계가 그대로 남아 있다)
- 아직 같이 맞춰야 하는 곳은 두 군데뿐이다.
| 내용 | starter/1step/web/guide.src.html (정본) | starter/1step/handout/CLAUDE_starter_1step_순서.txt | starter/1step/handout/CLAUDE_초기설정.txt |
|---|---|---|---|
| 설정 순서·번호 | PART 1~3 단계 카드(1~12) | 0~3번 | 1·2단계 |
| 준비물(설치 ZIP 포함) | PART 0 준비물 표 + 팁 박스 | 「준비물」 | - |
| 각 CLAUDE.md 담당 내용 | PART 4 | 「두 CLAUDE.md 의 차이」 표 | 프롬프트 본문 |
| 자주 틀리는 것·되돌리기 | PART 6 | 「자주 틀리는 것」「되돌리기」 | - |
- **표기 규칙(26-09-16 통일)**: 영문 단어 뒤 조사는 **띄어 쓴다.** (`Claude Code 를`, `CLAUDE.md 에`, `Node.js 가`) 맞춤법상 표준은 붙여쓰기지만 이 문서는 띄어쓰기가 다수라 그쪽으로 맞췄다. 새 문장을 쓸 때도 띄운다. 단 `<code>`·`<kbd>` 안은 원문 그대로 둔다.
  - 띄우면 어색해지는 자리는 문장을 바꾼다. 예: 「Slack 이 이 방식」 → 「VS Code·Slack 이 그 예」.
- README.md 「자주 헷갈리는 기능」 표도 플랜 모드·권한·언어 설명을 담고 있어 함께 맞춘다.
- 한 곳을 고치면 나머지도 확인하고, README.md 변경 이력에 한 줄 추가한다.
- ⚠️ **가이드 바깥에도 이 가이드를 인용하는 자리가 하나 있다** (26-09-18 확인) — `AX_source/out/20260916/회차유형.json`
  (9월 3주차 2step 회차 기획서의 정본)이 **PART 번호·단계 번호(1~12)·가이드 버전**을 그대로 적어 두고 있다.
  PART 를 늘리거나 단계 번호가 밀리면 **기획서가 조용히 낡는다**(에러 없음). 고친 뒤 그 json 을 같이 보고,
  바꿨으면 `AX_source` 에서 `python tools/build_brief.py` → `python tools/publish.py --round 20260916 --plan` 까지 한다.
  (26-09-18 실제로 한 번 겪었다 — 폴더를 `starter/` 로 옮기자 그 json 의 자료 경로 4건이 낡아 고치고 재발행했다.
  **파일 경로도 PART 번호와 똑같이 이 json 에 박혀 있다**는 뜻이므로, 폴더 이름을 바꿀 때도 여기를 본다)
- Claude Code 화면이 바뀌면 HTML 캡처가 옛 화면이 된다. HTML 끝에 기준 버전(2.1.272)을 적어 두었다.
- `tools/gdoc_*.py` 와 `check_html.py` 는 구글 문서용이라 이제 쓰지 않는다. 지우지는 않았다(과거 반영 이력 재현용).

## starter 공개 링크는 게시판 자료전송 메일이 쓴다 (2026-09-22)

`https://jichang999-dotcom.github.io/tes2/ax_study/claude-code-setup-guide.html` 는 교육생 열람용일
뿐 아니라 **「AI자동화 공유」 게시판 댓글 요청에 자동 발송되는 자료 링크**다
(`AX_source/게시판자료전송/config.json` 의 `주차매핑` `"9-2"`). 20260916 은 2step 회차라 T1 덱이
없어서 이 URL 을 값으로 넣었다.

- **원격 파일명(`claude-code-setup-guide.html`)을 바꾸면 이미 발송된 메일의 링크가 죽는다.**
  `sent.json` 때문에 받은 사람에게 재발송도 안 된다 — 바꿀 일이 생기면 그쪽 config 를 같이 고치고
  이미 나간 사람은 사람이 직접 전달한다.
- 내용을 고치고 발행하는 것(같은 URL 덮어쓰기)은 문제없다. 오히려 **발행을 안 하면 메일 받은 사람이
  옛 내용을 본다.**

## basic 과정 (basic) — 제작 중 (2026-09-18 착수)

- ⚠️ **09-29 4차 개정 — 아래 옛 문구보다 기획서가 우선한다.** starter처럼 **1step → 2step 두 편**이다.
  1step = **PART 3 스킬 만들기**(09-29 중급에서 올라옴, 소재 미정) + 싱글 에이전트 + 다듬기 + **PART 9 GitHub 가입(회사 메일) · 스킬 찾아 받아 쓰기**(`meeting-minutes`). **1step PART 는 1 부터**(0 없음) · PART 1 = 숙제 체크(starter 2step 숙제 HTML) · PART 2 = 시작 전.
  2step = **1step 프로젝트 · 에이전트를 그대로 이어서** 1단계 강사 시연(완성된 서브 · 팀) → 서브 A/B 비교 → 다시 시키기 → **에이전트 팀**(팀원끼리 소통, 실험 기능 `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` · 프로젝트 `settings.local.json` 에만 켜고 끝에 끈다 · `claude -p` 로는 팀이 안 생겨 카드 3회 검증 불가).
  **09-29 5차 반영(외부 강의 대조, 기획서 §2-5)**: 1step PART 2 `.claude` 폴더 지도 · PART 3 스킬 = 대화로 먼저 · description(무엇+언제+할 말) · 트리거 테스트 3종 · 안 되면 여기부터 · PART 5 `/agents` 마법사 · PART 7 판단 3질문 · **PART 9 마무리 = 추천 스킬 brainstorming 하나만**(superpowers 플러그인 전체 아님 · 수정본 정본 `test/.claude/skills/brainstorming`). **룰(rules)은 같은 날 사용자 지시로 master 로 이관**(결정 H) — basic 판단표는 두 칸 · 2step 네 칸 그대로. 기술스택 xlsx 도 맞췄다(advance 커스텀 커맨드 → 스킬+훅, master 에 룰 · 스킬 설계). 도구 읽기만 · 모델 기본값은 제안.
  공통 소재 = 가상 회의록. 「스킬 1 PART · 에이전트 4 PART」 · 「PART 4 가 핵심」 · 2step 트랙 3개 안은 폐기. 백업 `archive/초급_기획.md.260929.bak`·`260929b.bak`.
  ⚠️ **실측 2건(`meeting-minutes` 한국어 자동 호출 · 에이전트 팀) 보류** — 사용자 「아직 확정된 게 없음」. **사용자가 컨펌하지 않은 것은 작업하지 않는다**(09-29 지시).
- ~~범위는 starter PART 7 표가 정한다~~ → **10-16 v1.19 부터 starter PART 7 표가 기술스택표를 따른다**(basic = 스킬 · 에이전트 · 외부 데이터 수집 · 결과 페이지 배포). 범위의 기준은 기술스택표 · 기획서다.
- ~~스킬은 만들지 않고 받아서 쓴다(09-18)~~ → **09-29 뒤집음: 만들기는 basic 1step PART 3, 받아 쓰기는 PART 9 GitHub 와 묶음.** starter PART 7 「만들어 장착한다」 문구는 다시 맞게 됐다. (10-16 v1.19 에서 PART 7 표를 새로 써서 해소)
- **무게중심은 에이전트다**(09-18): 스킬 1개 PART · 에이전트 4개 PART (PART 1 vs PART 2~5).
- **PART 4 「같은 일, 두 가지 방법」이 핵심 자리다.** 싱글과 서브는 **같은 파일 형식**이라(실측)
  파일을 보여 줘서는 차이가 안 드러난다. 같은 일을 A) 하나에게 B) 둘로 갈라 시키고
  **교육생이 비교표를 자기 손으로 채운다.** 이 비교가 PART 6 판단표의 근거다.
- **PART 5 는 「보고 다시 시키기」까지 간다**(09-18, 기획서 결정 F). 서브를 부르는 쪽(부모)도
  **과정을 못 봤다**는 것이 함정이라, 무엇을 근거로 판정하느냐를 **일꾼의 말 / 산출물 / 검산기** 3단으로 가른다.
  **basic은 산출물까지, 검산기는 중급이다.** 이 선을 넘으면 범위가 샌다. PART 는 늘리지 않는다.
- **실습 소재는 교육생이 자기 업무를 가져온다**(사용자 결정 09-18). 그래서 자료에는 완성된 예제가 아니라
  **틀 + 고를 업무의 조건 + 완성 기준**을 싣는다. 캡처는 우리가 가상 소재로 찍는다.
- 1step 형태는 starter과 같은 **자기주도 링크**다. 옆에서 봐 줄 사람이 없으므로 주제마다
  「이게 되면 통과」 한 줄과 「안 되면 여기부터」 3줄이 반드시 있어야 한다.
- 진행 체크 저장 키는 `cc-basic-steps-v1` 로 starter(`cc-guide-steps-v12`)과 분리한다. 같이 쓰면 체크가 어긋난다.
- **starter 본문의 PART 번호·단계 번호는 건드리지 않는다.** starter에 더하는 것은 PART 7 표의 내용 · 링크뿐이다(10-16 v1.19 = 표 전체 교체, 번호는 그대로).
  (`AX_source/out/20260916/회차유형.json` 이 starter PART·단계 번호를 그대로 적어 두고 있어, 번호가 밀리면 그 기획서가 조용히 낡는다)
- (26-10-12) 이 과정을 따라 맞추던 `test/AX_Adoption/AI1step/` 은 폴더째 삭제됐다 — 따라오는 폴더는 이제 없다.
- 기획서는 `basic/1step/basic_1step_기획.html` · `basic/2step/basic_2step_기획.html` (HTML 만 · md · pdf 없음, 10-07)
  (`md2pdf.py` 는 **입력 파일 옆에** `.pdf`·`.html` 을 떨어뜨린다).

## 지켜야 할 것 (끝난 일 기록에서 추림)

경위 · 검증 내역은 **`docs/작업기록.md`** 에 원문 그대로 있다(2026-09-29 분리). 아래는 지금도 유효한 규칙만이다.

**starter 가이드 구조 (`starter/1step`)**
- 단계 번호(1~12) · PART 번호 · 앵커 id · 진행 체크 키 `cc-guide-steps-v12` 를 늘리거나 다시 매기지 않는다 — 배포한 링크 · `AX_source/out/20260916/회차유형.json` · PART 6 표의 `#s6`~`#s8` 이 **에러 없이** 낡는다. 구조를 바꿀 땐 단계를 합쳐 총수를 유지한다(v1.17 선례).
- 이미지 키 이름은 단계 번호와 어긋난 채 둔다(`s03_dl_*` = 2단계, `s03_open_folder` = 5단계).
- 접기: 첫 방문 · 새로고침 · 뒤로가기에 `details` 전부 닫힘(v1.16). ⚠️ `load` 가 늦게 와서 **`touched` 가드**가 사람이 연 것을 지킨다 — 빼지 않는다. ⚠️ 헤더 **[막혔을 때] 버튼**과 같은 해시 재클릭 핸들러를 없애지 않는다(v1.13). ⚠️ **인쇄 시 `details` 전체 펼침** 한 줄을 되돌리지 않는다(v1.15). `#p6` 외부 링크가 접힌 채 뜨는 것은 알려진 대가(해제 = 사용자 판단 대기).
- 화면 구조를 바꾸면 눈 대신 playwright 헤드리스로 확인한다(`scratchpad/check_guide.py` · `check_collapse.py` · `check_fold.py` 패턴). 같은 문서에 해시만 바꿔 `goto` 하면 리로드가 아니다.
- PART 6 을 고치면 `CLAUDE_starter_1step_순서.txt` 「자주 틀리는 것」도 **같이** 본다(세 번 연속 빠뜨린 이력).
- 알림 훅(v1.18 · PART 5 `#notify`): 교육생판 `handout/hooks/notify.ps1` 은 강사 PC `~/.claude/hooks/notify.ps1` 에서 **아이콘을 선택으로** 바꾼 사본이다(UTF-8 BOM 유지). 강사판을 고치면 이것도 맞추고 `upload_handout.py apply` 로 드라이브 starter › 1step › hooks 에 올린다. 붙여넣기 문장은 `claude -p` 검증 전(실제 settings.json 을 고쳐서) — 교육용 노트북 실측이 남았다.
- 경고 상자는 `<div class="box warn"><b>주의</b>` 로 쓴다. 이모지를 넣지 않는다.
- 사용자가 「빼 달라」고 한 내용은 Update Notes 에서도 흔적을 남기지 않는다(PART 8 = 세션 자료 절 · 09-17 삭제, 되살리지 않는다). AX_source 기획서 · 덱 공개 URL 은 가이드에 링크하지 않는다.

**설치 (7단계 · 설치 ZIP)**
- 설치 오류 2종: PowerShell **실행 정책**(`Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`) · `irm` **인증서 신뢰 실패**(npm 경로가 대안). 이 PC 는 `LocalMachine = Unrestricted` 라 재현되지 않는다.
- ZIP 작업 원본은 `C:\Users\User\Downloads\입문과정설치파일\` (Desktop 원본은 없다). 다시 말 때 **파일을 ZIP 루트에 · `.bak` 빼고**(python `zipfile`). 드라이브에 새로 올리면 파일 ID 가 바뀌므로 가이드는 폴더 링크만 쓴다. 드라이브 권한이 도메인 전체 writer 다.
- `install.ps1` = UTF-8 **BOM** + LF, `.bat` = ASCII + CRLF(한글 금지). VS Code User Setup 은 **승격하지 않는다**. ZIP 안에서 바로 실행하면 실패한다. 실제 설치 구간은 아직 미검증.

**편집 · 촬영 도구**
- 파이썬으로 문서를 고칠 때 CRLF 를 지킨다(`newline=''` 읽기 · 쓰기). heredoc · `python -c` 로 넘기면 **역슬래시 · 백틱이 조용히 깨진다** — 스크립트 파일로 쓴 뒤 실행한다.
- 영어 화면 재촬영: 격리 프로필 `Code.exe -n --locale=en --user-data-dir <임시> --extensions-dir <임시>` + `PrintWindow(hwnd, hdc, 2)`. `shot.py` 는 포커스를 못 뺏으면 다른 창이 찍힌다. 남은 한글 캡처 = `t0_04` · `t0_05~07`.
- `upload_handout.py` 대상 = 드라이브 공유 폴더 › **starter › 1step**(`1AUVbDp12e3_ljvX-WuvbCjuP08NmNzsA` · 09-30 재정리 · 10-16 고침). 목록 `CLAUDE_초기설정.txt` + `hooks/notify.ps1`(앞에 폴더가 붙으면 하위 폴더에 올린다). 09-16 에 `CLAUDE_초기설정.txt` + skills 만으로 줄였었다. 다시 올릴 파일이 생기면 목록부터 되돌린다.


## 수정 절차
- handout 파일(`<과정>/handout/`)을 고치기 전에 `archive/` 에 `.bak` 으로 백업한다. 기존 .bak 이 있으면 덮어쓰지 말고 날짜를 붙인다. (예: `CLAUDE_프로젝트초기화.txt.260915.bak`)
- txt 는 교육생이 메모장으로 열어 붙여넣는 파일이다. UTF-8 로 저장하고 마크다운 문법에 기대지 않는다.
- starter token-efficient 스킬은 26-10-28 삭제했다(전역 규칙과 중복 · 사본 `archive/starter_handout_skills_token-efficient.261028`). 같은 날 전역 규칙도 삭제했다(사용자). 되살리지 않는다.

## 남은 일 (2026-09-16 기준)
- **결정 대기 목록은 메모장 파일로 폴더마다 둔다**(09-29 사용자 지시): `starter/2step/결정필요.txt`(진행자 문서의 시작 페이지 흔적 · 2step 「펳치기」 오타). 정해지면 그 줄을 지운다.
- **기존 교육생 공지.** 두 가지가 바뀌었다. ① 받는 파일이 `CLAUDE_전역규칙.txt`·`CLAUDE_프로젝트초기화.txt` 2개 → `CLAUDE_초기설정.txt` 1개 (옛 링크는 휴지통이라 열리지 않는다). ② 가이드는 이제 파일이 아니라 **공개 링크**로 본다. 문안은 `docs/구글문서_수정안_260915.md` 「기존 교육생 공지」를 손봐서 쓴다.
- **드라이브 사본 2개**(`AX_클로드코드&CLI 1step_09.15_백업_260916`·`_테스트_260916`)가 남아 있다. 구글 문서를 더는 안 쓰기로 했으니 확인 뒤 휴지통으로 옮긴다.
- **10단계 캡처 2장은 옛 프롬프트로 찍은 화면이다.** 재촬영하지 않고 캡션에 「2단계·작업 폴더 규칙 부분」이라고 적어 두었다. 다시 찍으려면 `CLAUDE_CONFIG_DIR` 로 별도 설정 폴더를 잡는다(실제 사용자 폴더의 전역 CLAUDE.md 를 덮어쓰면 안 된다).
- 빈 `Desktop\claude_work` 폴더가 남아 있다(지우려 했으나 잠겨 있었다). 다음 촬영에 그대로 쓰면 된다.
- starter PART 7 「다음 단계」 표 = 기술스택표 기준(basic = basic · 중급 = advance · 고급 = master · 10-16 v1.19). 열린 가이드만 링크한다 — **advance 1step · master 를 발행하면 「(준비 중)」 을 링크로 바꾼다.** 과정 구성이 바뀌면 이 표도 같이 고친다.

## 다시 할 때 볼 것
- **1step 시연 화면은 `바탕화면\교육용.bat` 더블클릭**이면 뜬다(사본: `tools/교육용.bat`). `Code.exe -n` 으로 `Desktop\claude_work` 를 **새 창**에 연다.
- **basic 2step 1단계 강사 시연 = `바탕화면\초급시연_서브.bat` · `basic_2step_시연_팀.bat`**(사본 `tools/`) — `basic\1step\basic_demo\.vscode\tasks_sub|team.json` 을 `tasks.json` 으로 복사하고 VS Code 새 창으로 연다 → 폴더 열림 자동 작업(`runOn: folderOpen`)이 터미널에 `claude "/basic-trial-demo sub|team"` 을 띄운다(인자 ASCII = bat 한글 금지). 처음 한 번은 VS Code 의 신뢰 · 자동 작업 허용 창이 뜰 수 있다. basic_demo 창이 이미 열려 있으면 새로 안 열려 작업도 안 돈다 — 먼저 닫는다. 대화로는 「베이직2step 시연 시작해」(서브 → 「다음」 → 팀). ⚠️ 2.1.289 는 `TeamCreate` 가 없다 — 팀원 = `Agent` 에 `name` 을 붙여 띄우고 `SendMessage` 로 서로 말한다. `name` 파라미터는 팀 플래그가 켜진 폴더에서만 생긴다(10-04 실측). 팀 플래그 · 권한은 그 폴더 `settings.local.json` 에만. 데이터 · 에이전트 · 스킬은 `basic/1step/handout` 사본 — **실습 데이터를 다시 만들면 여기도 다시 복사**.
  - 화면 모양(시작 탭 없음·탐색기 열림·문제 뷰 없음·터미널 전체 폭)은 스크립트가 만드는 게 아니라 **VS Code 가 그 폴더의 마지막 상태를 기억**하는 것이다. 모양이 틀어지면 손으로 정리한 뒤 창을 닫으면 그 모양이 다시 저장된다.
  - `claude_work\.vscode\settings.json` 이 시작 탭을 끄고(`workbench.startupEditor: none`) `.vscode` 를 탐색기에서 숨긴다(`files.exclude`). 이 파일을 지우면 시작 탭이 다시 뜬다.
  - `.bat` 은 ASCII 전용·CRLF 로 유지한다. 한글을 넣으면 949 콘솔에서 깨진다([[reference-bat-crlf-requirement]] 와 같은 함정).
- **HTML 진행 체크 저장 키**는 `cc-guide-steps-v12` 다. 단계 번호가 또 밀리면 키도 함께 올린다. 안 올리면 예전에 체크해 둔 사람의 표시가 한 칸씩 어긋난다.
- **수정 내역은 본문 섹션이 아니라 `<dialog id="rel">` 팝업**이다. 새 버전은 목차가 아니라 그 팝업 안 표에 행을 넣는다.
- **12단계 답변 캡처 찍는 법**: VS Code 새 창으로 `Desktop\claude_work` 를 열고(환경변수 `CLAUDE_CODE_*` 를 지운 셸에서 `code -n`), 터미널에서 claude 실행 → `shot.py type/key` 로 질문 입력 → `grab` 후 PIL 로 터미널 영역만 크롭.
  - **함정 1**: Git Bash 가 `/clear` 를 `C:/Program Files/Git/clear` 로 바꿔 보낸다. `//clear` 로 쓴다.
  - **함정 2**: 답변에 사용자의 실제 업무(센터별 KPI 등)가 섞여 나올 수 있다. 크롭 전에 눈으로 확인하고 그 문단은 잘라낸다.

## 확인된 사실 (2026-09-15, 공식 문서·실측)
- (10-03 사용자) **직영 학년은 매년 1월 1일에 바뀐다**(3월 아님). basic 학년치환 기준 연도 = 데이터에서 가장 최근 편성년월의 연도. 기준 날짜를 폴더 파일(열사전)에 두면 옛 파일을 가진 PC 에서 에이전트가 「못 찾으면 멈춘다」 규칙대로 멈춘다 — 기준은 데이터 안에서 정하게 한다.
- (10-03) **basic 정답표의 기준은 직영 대시보드다.** 숫자가 어긋나면 정답표가 아니라 조건을 고쳐 대시보드에 맞춘다(사용자 지시). 원인을 못 찾으면 대시보드 값을 제약으로 두고 「행 제외 조건」을 열 · 값 · 학급명 단어마다 대입해 역산한다 — 평촌 202608 「클리커 연구소」를 이렇게 찾았다.
- (2.1.287 실측 · 10-02) **`/agents` 마법사는 없어졌다** — 입력하면 (removed) 안내만 나온다. 에이전트는 Claude 에게 말로 만들게 하고(파일 위치를 카드에 적는다), 목록은 다시 켠 뒤 **말로 「이 프로젝트에서 쓸 수 있는 에이전트 목록 보여 줘」**(3/3). ⚠️ **`/list-agents` 는 만든 에이전트 목록이 아니다** — 지금 돌고 있는 서브 · 팀원 · 다른 세션(메시지 보낼 대상)만 보여 준다(10-03 사용자 실측으로 정정). basic 1step 11단계가 이 방식이다.
- (10-03 대시보드 역산 · 사용자 확인) **basic 제외 프로그램은 부분 일치 9종 `셔틀 · 차량 · 주도 · 클리 · 유형별 · 실험복 · 가방 · 클린업 · 무료`** — 직영 대시보드도 패턴 일부(클리 → 클리커 연구소, 주도 → 자기주도)로 뺀다. 「자기」 · 「유형」 · 「실험」 은 빼지 않는다(넣으면 대시보드와 어긋남). 202507~09 · 202607~09 중 대시보드 5개 달 전부 일치. 정답표는 대시보드가 기준이다.
- (10-03 사용자 실측) **에이전트 `tools` 줄엔 `Bash, PowerShell` 을 둘 다 적는다.** Git Bash 가 없는 PC 는 Claude Code 실행 도구가 PowerShell 이라 `Bash` 만 주면 에이전트가 명령을 하나도 못 돌린다. 둘 다 적어도 오류 없이 있는 쪽을 쓴다(이 PC 실측). 이 PC 는 Bash 가 있어 `claude -p` 검증으로는 못 잡는다.
- (10-02 실측) 대화 중에 새로 만든 스킬 · 에이전트 파일은 **켜 둔 창의 `/skills` · 목록에 안 나온다** — `exit` → `claude` 로 다시 켜야 보인다(`/clear` 로는 안 된다).
- (10-02 실측) 실습 폴더에 기준이 적힌 파일(열사전 등)이 있으면 Claude 가 **묻지 않아도 읽고 먼저 적용한다** — 「기준 없이 해 보기」 단계를 두려면 그 기준을 폴더 파일에 넣지 않는다.
- `claude -p` 로 카드를 검증할 때 `.claude/` 아래 쓰기는 승인 창이 없어 막힌다 — 스크래치 폴더에서만 `--permission-mode bypassPermissions` 로 돌린다(교육생에게는 권하지 않는다).
- Shift+Tab 은 모드 순환 키다. Pro·Max·Team 은 auto 로 시작해 auto → manual → accept edits → plan 순. 「한 번 = 플랜 모드」로 쓰지 않는다.
- `--dangerously-skip-permissions` 는 보호 경로 쓰기를 포함한 안전 검사까지 끈다. basic 1step에서 권하지 않는다.
- git 이 아닌 폴더의 하위 폴더에서 켜도 상위 `.claude\skills` 가 로드된다 (test\AX_study 에서 실측).
- git 관련 설명(메모리 공유 범위 등)은 중급 과정이라 basic 문서에 넣지 않는다.
- (2.1.272 실측) 첫 실행 창 순서: 테마 → 로그인 방법 → 브라우저 승인 → 보안 안내 → 터미널 설정 → 폴더 신뢰(기본 선택 No, exit) → 새 화면 방식 제안. 첫 화면엔 이메일이 아닌 요금제가 나온다. auto 모드는 파일 생성 허용을 묻지 않는다. `/config` 는 `lang` 검색 → Enter 두 번 → korean.
