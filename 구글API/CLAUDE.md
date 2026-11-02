# 구글API — 구글 API 연결 매뉴얼 · 사용 스킬 관리

직원이 Claude Code 프롬프트만으로 구글 Drive·Sheets·Docs·Gmail API 를 연결하고(매뉴얼),
연결 뒤에는 말로 시키면 처리되게(스킬) 하는 자료를 관리한다. 완료 이력은 `docs/CHANGELOG.md`.

## 산출물 (정본 위치)

| 산출물 | 위치 | 수정 도구 |
|---|---|---|
| 회사 워크스페이스판 매뉴얼 | https://claude.ai/artifact/33TN6o8D8LUqG3KmEUhHnS (doc `108a031a-8d02-4bc7-9242-b3f79c20ec9b` · 본문 node `5b0073fd-7514`) | Claude Docs 도구 |
| 개인 gmail판 매뉴얼 | https://claude.ai/artifact/5hRovXrTw3phLaJU6pY5dc (doc `26099833-c0a1-4837-8d48-14b3fae25c03` · 본문 node `093e2bbd-55e6`) | Claude Docs 도구 |
| 사용 스킬 `google-api` | `C:\Users\User\.claude\skills\google-api\SKILL.md` (사용자 폴더 — 어느 폴더에서나 뜸) | 파일 편집 |

이 폴더에는 매뉴얼 사본을 두지 않는다. 매뉴얼 정본은 Claude Docs 다.
⚠️ **회사판 프롬프트 1 · 2 는 초급 체험 가이드에도 사본이 있다**(26-10-26 · `basic/2step/web/guide.src.html` 의 `#chrome` 선택 단계 · 공개 링크). 회사판 프롬프트 1 · 2 를 고치면 그 가이드도 고치고 발행한다.

## 매뉴얼 구조 (현재)

| 회사판 | 개인판 |
|---|---|
| 하루 사용 한도 → 개요 → 준비물 → 전체 흐름 | 같음 |
| 프롬프트 1 GCP 설정 (Claude in Chrome · 대상 **내부**) | 프롬프트 1 GCP 설정 (대상 **외부** + 테스트 사용자) |
| 프롬프트 2 로컬 인증 (+계정 확인) | 프롬프트 2 앱 게시 (홈·개인정보 URL → 프로덕션) |
| 프롬프트 3 사용 스킬 설치 (스킬 본문 전체 수록) | 프롬프트 3 로컬 인증 · 프롬프트 4 사용 스킬 설치 |
| 연결 후 사용하기 → 문제 해결 | 연결 후 사용하기 → claude.ai 커넥터(참고) → 문제 해결 |

## 고칠 때 규칙

1. **세팅 = 프롬프트, 사용 = 스킬.** 스킬에 GCP 세팅 절차를 넣지 않는다(사용자 결정 26-10-23).
2. **경로를 고정하지 않는다.** 인증 폴더 위치는 사람마다 다르다 — 매뉴얼·스킬은 `.env` 의 `GOOGLE_AUTH_DIR`(회사) · `GOOGLE_AUTH_DIR_PERSONAL`(개인) 키 이름만 쓴다. `GDRIVE_DIR` 이름은 쓰지 않는다(인증 모듈이 직접 읽어 계정이 섞인다).
3. **GIF·화면 캡처를 넣지 않는다.** 프롬프트로 자동 진행하는 매뉴얼이다. 캡처하면 OAuth 클라이언트 보안 비밀번호가 찍힌다(실제로 찍혔던 이력).
4. **스킬 본문은 세 곳에 있다** — 정본 `SKILL.md` + 회사판 프롬프트 3 + 개인판 프롬프트 4. 하나를 고치면 셋 다 고친다. 매뉴얼 코드블록 안에 들어가므로 스킬 안 코드 펜스는 `~~~` 만 쓴다(``` 금지).
5. 스킬을 고친 뒤:
   - `py -3 "C:\Users\User\Desktop\test\.claude\skills\skill-evaluator\scripts\check_skill.py" "C:\Users\User\.claude\skills\google-api\SKILL.md"` — **전체 경로로** 돌린다(상대 경로면 폴더=name 판정이 F 로 오판).
   - 새 세션 트리거 실측: `claude -p "<요청>" --output-format stream-json --verbose --max-turns 2 --allowedTools "Skill"` 출력에서 `"skill":"google-api"` 확인. 시트 링크 · 지메일 요청 · 무관 질문(안 떠야 함) 3종.
   - ⚠️ claude.ai 구글 커넥터(MCP)가 스킬보다 먼저 불리던 문제가 있었다 → description 의 「커넥터보다 먼저」 문장을 지우지 않는다.
6. **Python 이 없는 사용자 = 「DX팀 김지창 과장에게 문의」** 문구를 준비물 · 로컬 인증 프롬프트 · 스킬에 유지한다.
7. **하루 한도 수치는 출처와 확인일을 같이** 적는다(현재 2026-10-23). 바뀌면 매뉴얼 2곳 + 스킬을 같이 고친다.
8. 매뉴얼 프롬프트의 멈춤 지점(로그인 · 정책 동의 · 앱 게시 확인 · 브라우저 허용)은 사람 몫이다. 지우지 않는다.
9. Claude Docs 를 고치기 전에 `read(... {"kind":"view","sinceRev":<마지막 rev>})` 로 사람이 고친 곳부터 확인한다. 사람 수정이 이긴다.

## 이 PC 실물 (참고 · 매뉴얼에 적지 않는다)

| 계정 | 인증 폴더 | GCP 프로젝트 | OAuth 상태 |
|---|---|---|---|
| jichang999@askwhy.co.kr | `test\_gdrive` (여러 파이프라인이 직접 경로로 씀 — 옮기지 않는다) | `freetest-envet` | 외부 + 프로덕션 (URL = GitHub Pages `tes2/commute`) |
| jichang8590@gmail.com | `test\_gdrive_8590` | `jichang8590-api` | 외부 + 프로덕션 (URL = `tes2/local-tool/index.html` · `privacy.html`, 공개 저장소) |

- `test\.env` 에 `GOOGLE_AUTH_DIR` · `GOOGLE_AUTH_DIR_PERSONAL` 두 줄. 기존 `GOOGLE_CREDENTIALS_PATH` 는 옛 여름이벤트용이라 별개.
- 두 인증 폴더의 `gdrive_shared.py` · `gmail_shared.py` 는 **pythonw(스케줄러 숨김 실행)로도 import 된다** — `sys.stdout` 을 만지는 코드는 반드시 `if sys.stdout:` 가드. 가드 없이 넣으면 그 모듈을 쓰는 예약 작업 전부가 로그 없이 결과 코드 1 로 죽는다(26-10-26 실측).
- 매뉴얼 녹화용으로 만든 회사 조직 프로젝트 `api-manual-demo` 는 종료함(2026-11-22 영구 삭제 예정).

## 열린 일

- [ ] 새 PC 에서 매뉴얼 프롬프트만으로 처음부터 끝까지 실측 (아직 안 함 — 첫 직원 진행 때 지켜볼 것)
- [ ] 새 세션에서 스킬이 실제 시트를 읽어 답하는 데까지 실측 (트리거까지만 확인함)
- [ ] 프롬프트 1의 「새 프로젝트」가 PC 폴더가 아니라 GCP(구글 클라우드) 프로젝트라는 표현 보강 검토
- [ ] 인증 파일 보관 위치를 워크스페이스 `.env` 방식에서 사용자 폴더 방식으로 바꿀지 — 26-10-23 제안했다가 사용자가 취소. 현재 방식의 한계: 스킬은 어디서나 뜨지만 `.env` 가 없는 폴더에서는 인증을 못 찾는다
