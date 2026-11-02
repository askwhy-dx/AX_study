import sys, json; sys.path.insert(0, r'C:\Users\User\Desktop\test\_gdrive')
sys.stdout.reconfigure(encoding='utf-8')
from gdrive_shared import get_credentials
from googleapiclient.discovery import build
DOC = sys.argv[1]; MODE = sys.argv[2]  # dry | apply
docs = build('docs', 'v1', credentials=get_credentials())

# 2026-09-15 실측 촬영(docs/이미지_수집목록.md §4)으로 확인된 차이 5건
T_JIN = '진행순'; T_SUM = '요약'; T_DET = '초기세팅_상세'; T_PLAN = '교육 기획서'

REPL = [  # (tab, exact paragraph text, new text, 같은 문단 개수)
 # 5. 패널 위치 메뉴는 「터미널」 탭 제목 우클릭
 (T_JIN, '작업패널 위치 변경: 터미널 우클릭 -> 패널위치',
         '작업패널 위치 변경: 패널의 "터미널" 탭 제목 우클릭 -> 패널 위치', 1),
 (T_SUM, '터미널 우클릭 -> 패널 위치', '패널의 "터미널" 탭 제목 우클릭 -> 패널 위치', 1),
 # 3·4. 첫 실행 안내 창 순서 + 폴더 신뢰 창 기본 선택 No
 (T_SUM, '터미널에서 claude 실행 -> 안내대로 본인 계정으로 로그인한다.',
         '터미널에서 claude 실행 -> 처음 한 번 안내 창이 차례로 뜬다: 테마 선택(Enter) -> 로그인 방법 1번(구독 계정) -> 브라우저에서 승인 -> 보안 안내(Enter) -> 터미널 설정(선택) -> 폴더 신뢰 창\n'
         '폴더 신뢰 창은 기본 선택이 "No, exit" 라 Enter 만 누르면 종료된다. 아래 화살표로 "Yes, I trust this folder" 를 고른 뒤 Enter.', 1),
 # 1. 첫 화면에는 계정(이메일)이 아니라 요금제가 나온다
 (T_SUM, '첫 화면에 계정이 표시된다.',
         '첫 화면에 모델·요금제(예: Claude Max)와 작업 폴더가 표시된다. (이메일은 로그인 직후 "Logged in as" 에만 나온다)', 1),
 (T_PLAN, 'claude -v 버전 표시, 첫 화면에 계정 표시', 'claude -v 버전 표시, 첫 화면에 요금제 표시', 1),
 # 2. auto 모드는 파일 생성 허용을 묻지 않는다
 (T_DET, '파일을 만들어도 되는지 물으면 허용',
         '파일을 만들어도 되는지 물으면 허용 (기본 auto 모드에서는 묻지 않고 바로 만든다)', 2),
]
# 행 추가: (tab, 기준 행의 셀 문단, 그 셀의 열 번호, 새 행 셀들)
ROWS = [
 (T_DET, '파일이 CLAUDE.md.txt 로 생김', 0,
  ['claude 실행 직후 바로 꺼짐', '처음 뜨는 폴더 신뢰 창에서 기본 선택(No, exit) 그대로 Enter', '다시 claude 실행 -> 아래 화살표로 "Yes, I trust this folder" 선택 후 Enter']),
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


def find(tabs, tab, text, n=1):
    m = [p for p in tabs[tab][1] if p['text'] == text]
    if len(m) != n:
        raise SystemExit(f'COUNT {len(m)} != {n}: [{tab}] {text!r}')
    return m


def run(reqs, label):
    print(f'-- {label}: {len(reqs)} requests')
    if MODE == 'apply' and reqs:
        docs.documents().batchUpdate(documentId=DOC, body={'requests': [r for _, r in reqs]}).execute()


# phase 1: 문단 교체 (탭별 인덱스 내림차순)
tabs = load(); ops = []
for tab, old, new, n in REPL:
    tid = tabs[tab][0]
    for p in find(tabs, tab, old, n):
        ops.append((tab, p['s'], [{'deleteContentRange': {'range': {'startIndex': p['s'], 'endIndex': p['e'] - 1, 'tabId': tid}}},
                                  {'insertText': {'location': {'index': p['s'], 'tabId': tid}, 'text': new}}]))
    print('REPL', tab, f'x{n}', repr(old[:30]), '->', repr(new[:40]))
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
    a = find(tabs, tab, anchor)[0]; tid = tabs[tab][0]
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
        tstart = find(tabs, tab, anchor)[0]['table']['start']
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
