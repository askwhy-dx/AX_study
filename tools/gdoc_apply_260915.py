import sys, json; sys.path.insert(0, r'C:\Users\User\Desktop\test\_gdrive')
sys.stdout.reconfigure(encoding='utf-8')
from gdrive_shared import get_credentials
from googleapiclient.discovery import build
DOC = sys.argv[1]; MODE = sys.argv[2]  # dry | apply
docs = build('docs', 'v1', credentials=get_credentials())

T_JIN = '진행순'; T_SUM = '요약'; T_DET = '초기세팅_상세'

REPL = [  # (tab, exact paragraph text, new text)
 (T_JIN, '버전이 안뜨면:  윈도우키 → 시스템 환경변수 검색 → 환경변수 클릭 → 시스템변수 path 클릭 → 편집  → 새로 만들기 → 확인',
         '버전이 안뜨면: 윈도우키 → 시스템 환경 변수 검색 → 환경 변수 클릭 → 사용자 변수의 Path 클릭 → 편집 → 새로 만들기 → C:\\Users\\<계정>\\.local\\bin 입력 → 확인 → 터미널 새로 열기'),
 (T_JIN, '한글화 : /config → korean 입력 → exit → claude',
         '답변 언어 설정 : /config → Language → korean 입력 → /exit → claude (화면 메뉴는 영어 그대로, 답변만 한국어)'),
 (T_JIN, '작업 전에 플랜모드에서 설계하고 작업하기: Shift + tab',
         '작업 전에 플랜모드에서 설계하고 작업하기: Shift + Tab 을 화면 아래에 "plan mode on" 이 보일 때까지 누른다 (또는 요청 앞에 /plan 을 붙인다)'),
 (T_JIN, '권한요청 없이 작업: claude --dangerously-skip-permissions',
         '권한요청 줄이기: 요금제에 따라 기본이 auto 모드라 대부분 묻지 않는다. claude --dangerously-skip-permissions 는 안전 검사까지 모두 끄므로 쓰지 않는다'),
 (T_SUM, '안 나오면: 윈도우키 -> "시스템 환경 변수" 검색 -> 환경 변수 -> Path -> 편집 -> 새로 만들기 -> C:\\Users\\<계정>\\.local\\bin 입력 -> 확인 -> 터미널 새로 열기',
         '안 나오면: 윈도우키 -> "시스템 환경 변수" 검색 -> 환경 변수 -> 사용자 변수의 Path -> 편집 -> 새로 만들기 -> C:\\Users\\<계정>\\.local\\bin 입력 -> 확인 -> 터미널 새로 열기'),
 (T_SUM, '12', '13'), (T_SUM, '11', '12'), (T_SUM, '10', '11'), (T_SUM, '9', '10'),
 (T_SUM, '윈도우 스케줄러, 깃허브, MCP, API,', '윈도우 스케줄러, 깃허브, MCP, API(AI연결, 외부데이터)'),
 (T_SUM, 'Shift + Tab', 'Shift + Tab 을 화면 아래에 "plan mode on" 이 보일 때까지 누른다. (또는 요청 앞에 /plan)'),
 (T_SUM, '바로 고치지 않고 먼저 설계안을 보여준다. 확인 후 작업을 진행한다.',
         '바로 고치지 않고 먼저 설계안을 보여준다. 확인 후 작업을 진행한다. Shift + Tab 은 모드를 차례로 바꾸는 키라, 한 번 누르면 플랜 모드가 아닐 수 있다.'),
 (T_SUM, '권한 요청 없이 작업', '권한 요청 줄이기'),
 (T_SUM, 'claude --dangerously-skip-permissions', '기본 모드(auto) 그대로 쓴다'),
 (T_SUM, '파일 수정·명령 실행을 묻지 않고 진행한다. 삭제도 묻지 않으므로 익숙해진 뒤, 중요한 파일이 없는 폴더에서만 쓴다.',
         '요금제에 따라 기본이 auto 모드라, 위험한 작업은 자동 검사로 걸러내고 나머지는 묻지 않고 진행한다. claude --dangerously-skip-permissions 는 이 안전 검사까지 모두 끄므로 쓰지 않는다.'),
 (T_SUM, '원하는 것을 한국어로 요청한다. 설계가 필요하면 Shift + Tab (플랜 모드)',
         '원하는 것을 한국어로 요청한다. 설계가 필요하면 플랜 모드 (Shift + Tab 으로 "plan mode on" 표시될 때까지, 또는 /plan)'),
 (T_SUM, '한국어·폴더 규칙, 프로젝트 목록', '폴더 규칙, 프로젝트 목록'),
 (T_DET, '요약 탭 9~12번(작업 폴더 규칙, 전역 규칙, 스킬, 확인)을 자세히 풀어 쓴 절차다. Claude Code 설치와 로그인(요약 탭 1~8번)은 끝난 상태에서 시작한다.',
         '요약 탭 10~13번(작업 폴더 규칙, 전역 규칙, 스킬, 확인)을 자세히 풀어 쓴 절차다. Claude Code 설치·로그인·답변 언어 설정(요약 탭 1~9번)은 끝난 상태에서 시작한다.'),
 (T_DET, '바탕화면에 영어 이름, 공백 없는 작업 폴더를 만든다. (예: work, ai_work)',
         '바탕화면 또는 업무 폴더에 영어 이름, 공백 없는 작업 폴더를 만든다. (예: work, ai_work)'),
 (T_DET, '"엑셀과 파이썬 중 뭐가 좋을까?" 질문',
         '아래 두 질문을 해 보고 답변 길이가 다른지 본다. "파이썬에서 리스트 길이 구하는 함수는?" / "엑셀과 파이썬 중 뭐가 좋을까?"'),
 (T_DET, '장단점 + 고려사항 3가지로 답한다.', '첫 질문은 짧게, 두 번째 질문은 장단점 + 고려사항 3가지로 답한다.'),
 (T_DET, '한국어 규칙, 폴더 구조, 프로젝트 목록', '폴더 구조, 프로젝트 목록 (답변 언어는 /config)'),
 (T_DET, '폴더 이름에 한글/공백, 또는 바탕화면에서 실행', '폴더 이름에 한글/공백, 또는 바탕화면·사용자 폴더(C:\\Users\\<계정>)에서 실행'),
 (T_DET, 'MEMORY.md 는 매 대화마다 읽혀 길어질수록 토큰이 늘어난다.',
         'MEMORY.md 는 매 대화마다 읽혀 길어질수록 토큰이 늘어난다. 앞쪽 200줄(또는 25KB)까지만 읽히고 그 뒤는 무시된다.'),
]
DEL_PARA = [(T_JIN, '작업 CLI 선택 : /ide -> 1번 선택')]
# 셀 안에서 anchor 뒤 문단들을 제거: (tab, 남길 문단, 제거할 문단들)
DEL_TRAIL = [(T_SUM, '(CLAUDE.md)', ['', '수정 필요', 'config로 대체가능']),
             (T_DET, '비교, 추천, 장단점 질문, "자세히" 요청', ['3번을 건너뛰어도 1, 2번 규칙은 그대로 동작한다.'])]
# anchor 가 든 표 바로 뒤에 문단 삽입
INS_AFTER_TABLE = [(T_DET, '비교, 추천, 장단점 질문, "자세히" 요청', '3번(스킬)을 건너뛰어도 1, 2번 규칙은 그대로 동작한다.')]
# 행 추가: (tab, 기준 행의 셀 문단, 그 셀의 열 번호, 새 행 셀들)
ROWS = [
 (T_SUM, '로그인', 1, ['9', '답변 언어 한국어로 설정', 'Claude Code 에서 /config 입력 -> Language 항목 선택 -> korean 입력 -> /exit -> claude 다시 실행. 메뉴·화면은 영어 그대로이고 Claude 의 답변만 한국어로 바뀐다. 모든 폴더에 적용된다.', '영어로 질문해도 한국어로 답한다.']),
 (T_DET, '규칙이 적용 안 된 것 같음', 0, ['짧은 질문에도 길게 답함', '2번(전역 규칙)을 건너뜀', 'CLAUDE_전역규칙.txt 붙여넣기 후 다시 실행']),
 (T_DET, '작업 폴더 규칙', 0, ['답변 언어', '/config -> Language 항목에서 korean 을 english 로 바꾼다.']),
]


def load():
    doc = docs.documents().get(documentId=DOC, includeTabsContent=True).execute()
    tabs = {}

    def walk(content, out, table=None, ri=None, ci=None):
        for el in content:
            if 'paragraph' in el:
                t = ''.join(r.get('textRun', {}).get('content', '') for r in el['paragraph']['elements'])
                out.append(dict(text=t.rstrip(), s=el['startIndex'], e=el['endIndex'], table=table, ri=ri, ci=ci))
            elif 'table' in el:
                tb = dict(start=el['startIndex'], end=el['endIndex'])
                for r_i, row in enumerate(el['table']['tableRows']):
                    for c_i, cell in enumerate(row['tableCells']):
                        walk(cell['content'], out, tb, r_i, c_i)

    def rec(ts):
        for t in ts:
            ps = []
            walk(t.get('documentTab', {}).get('body', {}).get('content', []), ps)
            tabs[t['tabProperties']['title']] = (t['tabProperties']['tabId'], ps)
            rec(t.get('childTabs', []))
    rec(doc['tabs'])
    return tabs


def one(tabs, tab, text):
    m = [p for p in tabs[tab][1] if p['text'] == text]
    if len(m) != 1:
        raise SystemExit(f'NOT UNIQUE ({len(m)}): [{tab}] {text!r}')
    return m[0]


def run(reqs, label):
    print(f'-- {label}: {len(reqs)} requests')
    if MODE == 'apply' and reqs:
        docs.documents().batchUpdate(documentId=DOC, body={'requests': [r for _, r in reqs]}).execute()


# phase 1: 문단 교체·삭제 (탭별 인덱스 내림차순)
tabs = load(); ops = []
for tab, old, new in REPL:
    p = one(tabs, tab, old); tid = tabs[tab][0]
    ops.append((tab, p['s'], [{'deleteContentRange': {'range': {'startIndex': p['s'], 'endIndex': p['e'] - 1, 'tabId': tid}}},
                              {'insertText': {'location': {'index': p['s'], 'tabId': tid}, 'text': new}}]))
    print('REPL', tab, repr(old[:30]), '->', repr(new[:40]))
for tab, text in DEL_PARA:
    p = one(tabs, tab, text); tid = tabs[tab][0]
    ops.append((tab, p['s'], [{'deleteContentRange': {'range': {'startIndex': p['s'], 'endIndex': p['e'], 'tabId': tid}}}]))
    print('DEL ', tab, repr(text))
for tab, anchor, rest in DEL_TRAIL:
    tid = tabs[tab][0]; ps = tabs[tab][1]; hits = []
    for i, a in enumerate(ps):
        tail = ps[i + 1:i + 1 + len(rest)]
        if a['text'] == anchor and [p['text'] for p in tail] == rest and all(
                p['table'] is a['table'] and p['ri'] == a['ri'] and p['ci'] == a['ci'] for p in tail):
            hits.append((a, tail))
    if len(hits) != 1:
        raise SystemExit(f'TRAIL NOT UNIQUE ({len(hits)}) {anchor!r}')
    a, tail = hits[0]
    ops.append((tab, a['e'] - 1, [{'deleteContentRange': {'range': {'startIndex': a['e'] - 1, 'endIndex': tail[-1]['e'] - 1, 'tabId': tid}}}]))
    print('TRIM', tab, rest)
for tab, anchor, text in INS_AFTER_TABLE:
    a = one(tabs, tab, anchor); tid = tabs[tab][0]; end = a['table']['end']
    ops.append((tab, end, [{'insertText': {'location': {'index': end, 'tabId': tid}, 'text': text + '\n'}}]))
    print('INS ', tab, repr(text))
reqs = []
for tab in tabs:
    for _, s, rs in sorted([o for o in ops if o[0] == tab], key=lambda o: -o[1]):
        reqs += [(s, r) for r in rs]
run(reqs, 'phase1 text')

# phase 2: 행 추가
if MODE == 'apply':
    tabs = load()
reqs = []; targets = []
for tab, anchor, col, cells in ROWS:
    a = one(tabs, tab, anchor); tid = tabs[tab][0]
    if a['ci'] != col:
        raise SystemExit(f'COL MISMATCH {anchor}')
    targets.append((tab, anchor, a['ri'] + 1, cells))
    reqs.append((a['table']['start'], {'insertTableRow': {'tableCellLocation': {'tableStartLocation': {'index': a['table']['start'], 'tabId': tid}, 'rowIndex': a['ri'], 'columnIndex': 0}, 'insertBelow': True}}))
    print('ROW ', tab, 'after', repr(anchor), cells[:2])
reqs.sort(key=lambda x: -x[0]); run(reqs, 'phase2 rows')

# phase 3: 새 행 채우기
if MODE == 'apply':
    doc = docs.documents().get(documentId=DOC, includeTabsContent=True).execute()
    tabmap = {t['tabProperties']['title']: t for t in doc['tabs']}
    tabs = load()
    reqs = []
    for tab, anchor, ri, cells in targets:
        tstart = one(tabs, tab, anchor)['table']['start']
        t = tabmap[tab]; tid = t['tabProperties']['tabId']
        tbl = [el for el in t['documentTab']['body']['content'] if 'table' in el and el['startIndex'] == tstart][0]
        row = tbl['table']['tableRows'][ri]
        for c, txt in zip(row['tableCells'], cells):
            p = c['content'][0]
            cur = ''.join(r.get('textRun', {}).get('content', '') for r in p['paragraph']['elements'])
            if cur != '\n' or len(c['content']) != 1:
                raise SystemExit(f'NEW ROW NOT EMPTY {tab} {cur!r}')
            reqs.append((p['startIndex'], {'insertText': {'location': {'index': p['startIndex'], 'tabId': tid}, 'text': txt}}))
    reqs.sort(key=lambda x: -x[0]); run(reqs, 'phase3 fill')
print('DONE', MODE)
