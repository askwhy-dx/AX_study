import sys; sys.path.insert(0, r'C:\Users\User\Desktop\test\_gdrive')
sys.stdout.reconfigure(encoding='utf-8')
from gdrive_shared import get_credentials
from googleapiclient.discovery import build
DOC = sys.argv[1]; MODE = sys.argv[2]  # dry | apply
TAB = '교육 기획서'  # 비어 있는 탭에만 쓴다
docs = build('docs', 'v1', credentials=get_credentials())

T, H1, H2, P = 'TITLE', 'HEADING_1', 'HEADING_2', 'NORMAL_TEXT'
B = [
 (T, '교육용 HTML 기획서: Claude Code 첫 설정'),
 (P, '작성일 2026-09-15 / 상태: 초안 (8번 결정 사항 확정 후 제작 시작)'),
 (P, '원천: 이 문서의 앞 3개 탭 (진행순, 요약, 초기세팅_상세)'),

 (H1, '1. 개요'),
 [['항목', '내용'],
  ['목적', '앞 3개 탭에 흩어진 설치·설정·개념·문제해결 내용을 한 페이지 교육용 HTML로 묶어, 교육생이 강사 없이도 순서대로 따라 할 수 있게 한다.'],
  ['대상', 'Claude Code를 처음 쓰는 팀원 (비개발자 포함, basic)'],
  ['범위', '설치부터 규칙·스킬 설정, 자주 쓰는 기능, 메모리 원리까지. 중급·고급은 「다음 단계」 목록만 보여 준다.'],
  ['산출물', 'HTML 파일 1개 (교육 중 강사 화면 + 교육 후 교육생 복습용)'],
  ['성공 기준', '처음 쓰는 팀원 1명이 HTML만 보고 13단계를 끝내고, 확인 질문 2개의 답변 길이가 다르게 나온다.']],

 (H1, '2. 원천 자료 분석'),
 [['탭', '성격', '담긴 내용', 'HTML에서 쓰는 방식'],
  ['진행순', '강사 진행 메모', '설치 흐름, 단축키, 스크린샷 이미지, 이후 학습 목록', '강의 순서의 기준, 스크린샷 출처'],
  ['요약', '표 5개로 정리한 요약본', '§1 처음 설정 13단계, §2 자주 쓰는 기능, §3 프로젝트 만들 때마다, §4 파일 위치, §5 이후 학습', 'HTML 본문 뼈대 (단계 번호의 기준)'],
  ['초기세팅_상세', '10~13단계 상세 + 개념 설명', '§1 준비물, §2 설정 순서, §3 CLAUDE.md와 스킬 차이, §4 스킬 불려오는 경우, §5 폴더 구조, §6 자주 틀리는 것, §7 되돌리기, §8 README와 CLAUDE.md, §9 메모리 원리', '단계별 상세 펼침, 개념 파트, 문제 해결 파트']],

 (H1, '3. 탭 사이 차이와 HTML 처리 방침'),
 [['차이', '진행순', '요약', '초기세팅_상세', 'HTML 처리'],
  ['단계 번호', '번호 없음', '1~13', '0~4', '요약 번호(1~13)로 통일. 상세 0번은 1단계, 1~4번은 10~13단계 안에 넣는다.'],
  ['예시 폴더명', '없음', 'claude_work', 'work, ai_work', '하나로 통일 (8번 결정)'],
  ['확인 질문', '없음', '의견 질문 1개', '짧은 질문 + 의견 질문 2개', '상세 기준 2개로 통일 (README와 같음)'],
  ['/ide (작업 파일 보여주기)', '삭제됨', '§2 표에 남아 있음', '없음', '결정 대기 (8번). 정해질 때까지 HTML에 넣지 않는다.'],
  ['스크린샷', '있음', '없음', '없음', '진행순 이미지를 해당 단계에 붙인다.'],
  ['중복 항목', '패널 위치, /resume, 플랜 모드, 권한, 상태 표시줄', '§2와 같음', '-', '요약 §2 문구 하나만 쓴다.']],

 (H1, '4. HTML 목차 구성'),
 (P, '교육생이 실제로 하는 순서(설치 → 설정 → 이해 → 활용 → 문제 해결)로 배치한다.'),
 [['파트', '섹션', '원천', '교육생이 하는 일', '완료 확인'],
  ['0. 시작 전', '교육 목표, 준비물, 완성된 모습', '상세 §1, 요약 §4', '공유 폴더에서 txt 2개와 skills 폴더 받기', '파일 3종이 PC에 있다'],
  ['1. 설치', '1~8단계 (폴더, Node.js, 편집기, 테마, 확장, 터미널, Claude Code, 로그인)', '요약 §1, 진행순', '따라 설치', 'claude -v 버전 표시, 첫 화면에 계정 표시'],
  ['2. 답변 언어', '9단계 /config 언어 설정', '요약 §1, 진행순', '/config에서 korean 설정', '영어 질문에도 한국어 답변'],
  ['3. 규칙과 스킬', '10~13단계 (작업 폴더 규칙, 전역 규칙, 스킬, 재시작 확인)', '요약 §1, 상세 §2', 'txt 붙여넣기, skills 폴더 복사', 'CLAUDE.md 2개 생성, 확인 질문 2개 통과'],
  ['4. 원리 이해', 'CLAUDE.md와 스킬, 스킬이 불려오는 경우, 파일 위치, README와 CLAUDE.md, 메모리', '상세 §3·§4·§8·§9, 요약 §4', '읽기', '파트 끝 확인 퀴즈 3문항'],
  ['5. 일할 때', '자주 쓰는 기능, 프로젝트 만들 때마다, 폴더 구조', '요약 §2·§3, 상세 §5', '플랜 모드·/resume 한 번씩 써 보기', '화면 아래 plan mode on 확인'],
  ['6. 막혔을 때', '자주 틀리는 것, 되돌리기', '상세 §6·§7', '증상으로 찾아보기', '-'],
  ['7. 다음 단계', '중급1, 중급2, 고급', '진행순, 요약 §5', '읽기', '-']],

 (H1, '5. 화면 설계'),
 [['요소', '내용', '이유'],
  ['목차', '왼쪽 고정 목차, 현재 위치 강조. 좁은 화면에서는 위쪽 접이식', '긴 한 페이지에서 길을 잃지 않게'],
  ['단계 카드', '번호 / 할 일 / 방법 / 확인 / 막히면 (자주 틀리는 것으로 연결)', '요약 §1 표의 열을 그대로 살리면서 문제 해결로 바로 이동'],
  ['명령어 블록', '고정폭 글꼴 + 복사 버튼 (irm 설치 명령, claude -v, /config, /resume 등)', '손으로 옮겨 적다 틀리는 것을 막는다'],
  ['진행 체크', '단계마다 체크박스, 상단에 진행률 표시 (브라우저에만 저장)', '교육 도중 끊겨도 어디까지 했는지 안다'],
  ['주의 상자', '한글 폴더명, Shift + Tab 순환, --dangerously-skip-permissions 금지, .claude 폴더 전체 삭제 금지', '자주 틀리거나 되돌리기 어려운 것만 강조'],
  ['개념 파트', '원천 표를 표 그대로 유지, 메모리 원리 5단계는 흐름 그림 1개', '비교 내용은 표가 가장 빨리 읽힌다'],
  ['인쇄', '인쇄 시 목차·버튼 숨김, 단계 카드가 쪽 사이에서 잘리지 않게', '종이로 나눠 줄 수도 있게']],

 (H1, '6. 기술 방침'),
 [['항목', '방침'],
  ['파일 구성', 'HTML 1개에 CSS·JS 내장. 이미지는 HTML 안에 넣어(data URI) 파일 하나만 옮기면 열린다.'],
  ['외부 연결', 'CDN·외부 글꼴 없음. 사내망·오프라인에서도 똑같이 보인다.'],
  ['작업 위치', 'AX_study 아래 영어 이름 폴더에서 만들고, 완성본만 handout 으로 옮긴다. (handout 은 배포 파일만 두는 규칙)'],
  ['텍스트 원칙', '원천 탭 문구를 그대로 쓴다. 명령어·경로는 한 글자도 바꾸지 않는다.']],

 (H1, '7. 내용 동기화 규칙'),
 (P, '지금도 같은 내용이 구글 문서·교육순서.txt·프롬프트 txt 세 곳에 있다. HTML이 생기면 네 곳이 된다.'),
 [['항목', '방침'],
  ['정본', '구글 문서 (이 문서)를 정본으로 두고 HTML은 파생본으로 만든다.'],
  ['수정 순서', '구글 문서 수정 → HTML·txt 반영 → README 변경 이력 한 줄'],
  ['어긋남 점검', 'HTML 제작 후 원천 3개 탭의 표 행이 HTML에 모두 있는지 대조표로 확인 (누락 0건)']],

 (H1, '8. 결정이 필요한 사항'),
 [['항목', '선택지', '제안'],
  ['/ide 항목', '유지 / 삭제', '삭제 (진행순에서 이미 삭제됨, 요약 §2만 남음)'],
  ['예시 폴더명', 'claude_work / work / ai_work', 'claude_work (용도가 드러남)'],
  ['배포 방식', '공유 드라이브에 파일 / GitHub Pages 공개 주소 / 사내 전용 링크', '공유 드라이브 파일 (드라이브는 HTML 미리보기가 안 되므로 받아서 열기 안내 필요)'],
  ['진행 체크 기능', '넣기 / 빼기', '넣기 (교육 중 끊김 대비)'],
  ['스크린샷', '진행순 이미지 재사용 / 새로 찍기', '새로 찍기 (아래 미확인 문구 확인을 겸함)'],
  ['미확인 화면 문구', '/config 언어 항목 이름, Shift + Tab 시 plan mode on 표시', '스크린샷 찍을 때 실측해 다르면 구글 문서부터 고친다']],

 (H1, '9. 작업 순서'),
 [['순서', '작업', '결과물'],
  ['1', '이 기획서 검토 후 8번 결정', '확정된 기획서'],
  ['2', '스크린샷 촬영 (미확인 문구 실측 포함)', '단계별 이미지'],
  ['3', 'HTML 초안 제작', 'HTML 1개'],
  ['4', '원천 대조 (표 행 누락, 명령어 원문 일치)', '대조 결과 0건'],
  ['5', '처음 쓰는 팀원 1명 시범 (도움 없이 13단계)', '막힌 지점 목록'],
  ['6', '수정 후 배포, README 변경 이력 반영', '배포본']],
]


def tab_body():
    doc = docs.documents().get(documentId=DOC, includeTabsContent=True).execute()
    t = [t for t in doc['tabs'] if t['tabProperties']['title'] == TAB][0]
    return t['tabProperties']['tabId'], t['documentTab']['body']['content']


tid, body = tab_body()
text = ''.join(r.get('textRun', {}).get('content', '') for el in body if 'paragraph' in el for r in el['paragraph']['elements'])
if text.strip() or any('table' in el for el in body):
    raise SystemExit('TAB NOT EMPTY, 중단')
print('tab', tid, 'blocks', len(B))
if MODE != 'apply':
    raise SystemExit('dry ok')

loc = lambda i: {'index': i, 'tabId': tid}
for blk in B:
    tid, body = tab_body(); end = body[-1]['endIndex'] - 1
    if isinstance(blk, tuple):
        style, s = blk
        docs.documents().batchUpdate(documentId=DOC, body={'requests': [
            {'insertText': {'location': loc(end), 'text': s + '\n'}},
            {'updateParagraphStyle': {'range': {'startIndex': end, 'endIndex': end + len(s) + 1, 'tabId': tid},
                                      'paragraphStyle': {'namedStyleType': style}, 'fields': 'namedStyleType'}}]}).execute()
        continue
    rows = blk
    docs.documents().batchUpdate(documentId=DOC, body={'requests': [
        {'updateParagraphStyle': {'range': {'startIndex': end, 'endIndex': end + 1, 'tabId': tid},
                                  'paragraphStyle': {'namedStyleType': P}, 'fields': 'namedStyleType'}},
        {'insertTable': {'location': loc(end), 'rows': len(rows), 'columns': len(rows[0])}}]}).execute()
    tid, body = tab_body()
    tbl = [el for el in body if 'table' in el][-1]
    reqs = []
    for ri, row in enumerate(tbl['table']['tableRows']):
        for ci, cell in enumerate(row['tableCells']):
            i = cell['content'][0]['startIndex']; s = rows[ri][ci]
            reqs.append((i, {'insertText': {'location': loc(i), 'text': s}}))
            if ri == 0:
                reqs.append((i, {'updateTextStyle': {'range': {'startIndex': i, 'endIndex': i + len(s), 'tabId': tid},
                                                     'textStyle': {'bold': True}, 'fields': 'bold'}}))
    reqs.sort(key=lambda x: -x[0])  # 뒤에서부터 채워 인덱스가 밀리지 않게
    docs.documents().batchUpdate(documentId=DOC, body={'requests': [r for _, r in reqs]}).execute()
print('DONE')
