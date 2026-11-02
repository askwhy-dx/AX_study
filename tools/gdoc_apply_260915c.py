import sys; sys.path.insert(0, r'C:\Users\User\Desktop\test\_gdrive')
sys.stdout.reconfigure(encoding='utf-8')
from gdrive_shared import get_credentials
from googleapiclient.discovery import build
DOC = sys.argv[1]; MODE = sys.argv[2]  # dry | apply
docs = build('docs', 'v1', credentials=get_credentials())

# 2026-09-15 기획서 §8 결정 확정 반영 + HTML 제작 완료 표시
T_SUM = '요약'; T_DET = '초기세팅_상세'; T_PLAN = '교육 기획서'
REPL = [  # (tab, exact paragraph text, new text, 같은 문단 개수)
 (T_DET, '바탕화면 또는 업무 폴더에 영어 이름, 공백 없는 작업 폴더를 만든다. (예: work, ai_work)',
         '바탕화면 또는 업무 폴더에 영어 이름, 공백 없는 작업 폴더를 만든다. (예: claude_work)', 1),
 (T_DET, 'work 에서 켜면 work 메모리, work\\업무A 에서 켜면 업무A 메모리가 쌓인다.',
         'claude_work 에서 켜면 claude_work 메모리, claude_work\\업무A 에서 켜면 업무A 메모리가 쌓인다.', 1),
 (T_PLAN, '작성일 2026-09-15 / 상태: 초안 (8번 결정 사항 확정 후 제작 시작)',
          '작성일 2026-09-15 / 상태: 제작 완료 (8번 결정 모두 제안대로 확정, 결과물 AX_study\\handout\\CLAUDE_starter_1step_가이드.html)', 1),
 (T_PLAN, '8. 결정이 필요한 사항', '8. 결정 사항 (2026-09-15 모두 제안대로 확정)', 1),
 (T_PLAN, '새로 찍기 (아래 미확인 문구 확인을 겸함)', '새로 찍음 (26장 확정)', 1),
 (T_PLAN, '스크린샷 찍을 때 실측해 다르면 구글 문서부터 고친다', '실측 완료: 둘 다 문서와 일치. 그 밖에 다른 점 5건은 구글 문서에 반영', 1),
]
DEL_ROWS = [(T_SUM, '작업 파일 보여주기', 0)]  # (tab, 지울 행의 셀 문단, 열 번호)


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
    for t in doc['tabs']:
        ps = []
        walk(t.get('documentTab', {}).get('body', {}).get('content', []), ps)
        tabs[t['tabProperties']['title']] = (t['tabProperties']['tabId'], ps)
    return tabs


def find(tabs, tab, text, n=1):
    m = [p for p in tabs[tab][1] if p['text'] == text]
    if len(m) != n:
        raise SystemExit(f'COUNT {len(m)} != {n}: [{tab}] {text!r}')
    return m


def run(reqs, label):
    print(f'-- {label}: {len(reqs)} requests')
    if MODE == 'apply' and reqs:
        docs.documents().batchUpdate(documentId=DOC, body={'requests': reqs}).execute()


tabs = load(); ops = []
for tab, old, new, n in REPL:
    tid = tabs[tab][0]
    for p in find(tabs, tab, old, n):
        ops.append((tab, p['s'], [{'deleteContentRange': {'range': {'startIndex': p['s'], 'endIndex': p['e'] - 1, 'tabId': tid}}},
                                  {'insertText': {'location': {'index': p['s'], 'tabId': tid}, 'text': new}}]))
    print('REPL', tab, repr(old[:30]), '->', repr(new[:40]))
reqs = []
for tab in tabs:
    for _, s, rs in sorted([o for o in ops if o[0] == tab], key=lambda o: -o[1]):
        reqs += rs
run(reqs, 'phase1 text')

if MODE == 'apply':
    tabs = load()
reqs = []
for tab, anchor, col in DEL_ROWS:
    a = find(tabs, tab, anchor)[0]; tid = tabs[tab][0]
    if a['ci'] != col or a['table'] is None:
        raise SystemExit(f'COL MISMATCH {anchor}')
    reqs.append({'deleteTableRow': {'tableCellLocation': {'tableStartLocation': {'index': a['table']['start'], 'tabId': tid}, 'rowIndex': a['ri'], 'columnIndex': 0}}})
    print('DELROW', tab, repr(anchor), 'row', a['ri'])
run(reqs, 'phase2 delete rows')
print('DONE', MODE)
