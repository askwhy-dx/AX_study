# CHANGELOG — 구글API

## 2026-10-26
- `_gdrive` · `_gdrive_8590` 의 `gdrive_shared.py` · `gmail_shared.py` 에 `if sys.stdout:` 가드 추가. 무조건 `sys.stdout.reconfigure()` 가 pythonw 에서 import 크래시를 내 직영통합데이터 주간 업로드(스케줄러)가 로그 없이 실패하던 원인. 스킬 `google-api` 본문의 같은 줄은 대화형 실행 전제라 손대지 않음.

## 2026-10-23
- jichang8590@gmail.com 구글 API 연결: GCP `jichang8590-api` 생성, Drive·Gmail·Sheets·Docs API 사용, OAuth(외부·테스트 사용자) → 브랜딩 URL(GitHub Pages `tes2/local-tool/`) 입력 후 프로덕션 게시, `test\_gdrive_8590` 에 토큰 재발급(Drive·Gmail 계정 확인).
- 매뉴얼 2종(개인 gmail판 · 회사 워크스페이스판) 작성. 초판은 단계별 GIF(Claude in Chrome 녹화) → 같은 날 **GIF 전부 삭제, 프롬프트 방식으로 개편**. 회사판 녹화용 `api-manual-demo` 프로젝트는 종료.
- 4단계 GIF 에 OAuth 보안 비밀번호가 찍혀 흐림 처리 → 이후 GIF 자체를 폐지.
- 하루 사용 한도 표 추가(구글 공식 문서 확인).
- 경로 고정 제거 → `.env` 키(`GOOGLE_AUTH_DIR` · `GOOGLE_AUTH_DIR_PERSONAL`) 방식. `test\.env` 에 두 줄 추가(printf 로 `\t` 가 탭으로 깨졌다가 Python 으로 재기록).
- 준비물 정리: Claude in Chrome 은 프롬프트 1이 안내, Python 없으면 DX팀 김지창 과장 문의. 「직접 쓴 파이썬 스크립트」 코드 블록 삭제.
- 사용 스킬 `google-api` 작성(사용자 폴더). check_skill S등급, 트리거 실측: 커넥터가 먼저 불리던 문제 → description 보강 후 4/4. 매뉴얼에 스킬 설치 프롬프트(회사판 3 · 개인판 4) 추가.
- jichang999 계정 2단계 인증(휴대폰 알림 + 전화번호) 설정 확인.
