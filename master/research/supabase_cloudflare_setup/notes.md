# Supabase · Cloudflare 첫 세팅 실측 기록 (master 2step 소재)

- 실측일: 2026-10-23 · 진행: Claude in Chrome(에이전트가 클릭, 사용자는 로그인만 + 관전)
- 실제 과제: `2026_witner_event/외부연동` 센터장별 대시보드 A단계(준비)
- 캡처: `img/` (키 값이 보이는 화면은 찍지 않았다)

## Supabase

| # | 화면 | 한 일 | 캡처 |
|---|---|---|---|
| 1 | Organizations | 첫 로그인 직후 조직이 0개 → **New organization** | 01 |
| 2 | Create a new organization | Name 기본값 · Type Personal · Plan Free → Create | 02 |
| 3 | Create a new project | 생성 직후 「You need additional permissions」 경고 → **새로고침하면 사라짐**(권한 반영 지연) | 03 |
| 4 | 프로젝트 양식 | Project name · Database password(**Generate a password**) · Region | 04 |
| 5 | Region | 기본 = Asia-Pacific(일반) → 목록 아래 「Specific regions」의 **Northeast Asia (Seoul) ap-northeast-2** | 05 |
| 6 | Security | Enable Data API ✔ · **Automatically expose new tables ✘(권장 해제)** · **Enable automatic RLS ✔** | 05 |
| 7 | 프로젝트 홈 | Status 「Coming up…」 · URL `https://<ref>.supabase.co` 표시 | 06 |
| 8 | Authentication → Sign In / Providers | **Allow new users to sign up** OFF → Save changes → 「Successfully updated settings」 | — |
| 9 | Settings → API Keys → **Legacy anon, service_role** 탭 | anon = Copy 버튼 바로 보임 / service_role = Reveal 후 Copy | — |

### 함정·메모
- 양식이 늦게 그려지면서 **입력한 Project name 이 지워진다**(GitHub 행이 뒤늦게 끼어듦). 리전·이름은 마지막에 다시 확인.
- 리전 목록을 접근성 ref 로 클릭하면 **엉뚱한 행(London)** 이 선택됐다 → 스크롤 후 좌표 클릭으로 해결.
- 「Automatically expose new tables」 를 끄면 테이블마다 `grant select ... to authenticated` 를 직접 써야 한다(RLS 와 별개).
- 새 키 형식(`sb_publishable_` · `sb_secret_`)은 JWT 가 아니다 → `Authorization: Bearer` 로 쓰는 기존 코드는 **Legacy 탭의 JWT 키**를 쓴다.
- DB 비밀번호는 Generate 로 만들고 저장하지 않았다. REST·SQL Editor 만 쓰면 필요 없고, 필요하면 Settings → Database 에서 재설정.
- 당일 Supabase 상단에 「We are investigating a technical issue」 + 서울 리전 「Incident in progress」 → 생성은 정상 진행됨.

### 에이전트가 못 하는 것 (실측)
- **service_role 키 Reveal = Claude Code 자동 모드가 차단**(Credential Materialization). anon 키는 Copy → `Get-Clipboard` 로 `.env` 에 넣었고 값은 대화에 안 찍혔다. service 키는 사람이 붙여 넣는다.
- 교육 포인트: 「비밀 키는 사람이 옮긴다」 — 에이전트 권한 경계의 실제 예.

## Cloudflare
- 로그인 안 된 상태 → **계정 생성 · 비밀번호 입력은 에이전트 금지 영역** → 사용자 몫.
- 남은 일: 회원가입(회사 메일) → My Profile → API Tokens → Custom Token(`Account / Cloudflare Pages / Edit`) → `.env` 에 `CLOUDFLARE_API_TOKEN` · `CLOUDFLARE_ACCOUNT_ID`.

### Cloudflare 실측 (26-10-23, 사용자 로그인 후)
| # | 화면 | 한 일 | 캡처 |
|---|---|---|---|
| 1 | 계정 홈 | Account ID = 주소창 `dash.cloudflare.com/<ID>/home` (비밀 아님 → 에이전트가 `.env` 기입) | — |
| 2 | 내 프로필 → API 토큰 | 목록 비어 있음 → **토큰 생성** | 07 |
| 3 | API 토큰 생성 | 템플릿 말고 **사용자 설정 토큰 → 시작** | — |
| 4 | 사용자 설정 토큰 | 이름 `winter-event-pages-deploy` · 권한 `계정 / Cloudflare Pages / 편집` · 계정 리소스 = 「모든 계정」 대신 **내 계정 하나** · IP 필터·TTL 비움 | 08 |
| 5 | 요약 | `…'s Account - Cloudflare Pages:편집` 한 줄 확인 | 09 |
| 6 | 토큰 생성 | 토큰 값이 **한 번만** 표시 → 사람이 복사해 `.env` (에이전트 금지 구간) | — |

- 화면 언어가 한국어로 나온다(메뉴명: 토큰 생성 · 사용자 설정 토큰 · 요약 계속).
- ⚠️ 정정: 「Verify your email address」 배너를 무시하면 **[토큰 생성] 마지막 클릭에서** 「알 수 없는 오류가 발생했습니다 · Please verify your email.」 로 막힌다(양식 작성·요약까지는 통과해서 늦게 발견). 가입 직후 메일 인증부터 할 것.

## Supabase 서버 쪽 (26-10-23, 에이전트가 Chrome 으로 실행)
| # | 화면 | 한 일 | 캡처 |
|---|---|---|---|
| 1 | SQL Editor | 편집기에 SQL 을 `monaco.editor.getModels()[0].setValue()` 로 주입 → Run. 키보드 타이핑은 자동 괄호·따옴표가 SQL 을 망가뜨려 안 씀 | — |
| 2 | 「Potential issue detected」 | `drop policy if exists`·함수 안 `delete` 만 있어도 파괴적 작업 경고 → 빈 프로젝트라 Run query | 10 |
| 3 | Edge Functions → Create new | 같은 방식으로 index.ts 주입 → Function name → Deploy function | 11 |
| 4 | 배포 후 Settings | 「Verify JWT with legacy secret」 기본 ON (레거시 JWT 키를 쓰므로 그대로) | 12 |

### 함정
- 「Automatically expose new tables」 OFF 면 **service_role 도 select 권한이 없다**(403 `permission denied for table facts`). security definer 함수로 쓰는 업로드는 되는데 재조회가 막혀서 늦게 발견. → `grant select … to service_role` 도 명시.
- `.env` 에 키를 붙여 넣을 때 **줄 앞 공백 한 칸** → 로더가 못 읽음(사용자 실측). 값을 보지 않고 행 구조(이름·길이)만 출력해 찾았다.
- VS Code 에서 편집만 하고 저장 안 하면 디스크엔 없다 — 「넣었어」 뒤엔 디스크 기준으로 확인.
- SQL 편집기 탭에 저장 안 된 쿼리가 있으면 다른 주소로 이동이 「Leave site?」 로 막힌다 → 다른 탭 사용.
