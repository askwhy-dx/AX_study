# -*- coding: utf-8 -*-
"""테스트 사본에서 phase3(행 삭제)만 다시 돌린다. phase1·2 는 이미 적용됨."""
import sys
sys.path.insert(0, r'C:\Users\User\Desktop\test\_gdrive')
sys.stdout.reconfigure(encoding='utf-8')
from gdrive_shared import get_credentials
from googleapiclient.discovery import build
DOC = sys.argv[1]
docs = build('docs', 'v1', credentials=get_credentials())
DEL_ROWS = [('요약', '같은 창에 CLAUDE_전역규칙.txt 내용을 붙여넣는다.', 2),
            ('초기세팅_상세', 'CLAUDE_전역규칙.txt', 0),
            ('초기세팅_상세', '전역 규칙 만들기', 1)]


def load():
    doc = docs.documents().get(documentId=DOC, includeTabsContent=True).execute()
    tabs = {}

    def walk(content, out, table=None, ri=None, ci=None):
        for el in content:
            if 'paragraph' in el:
                t = ''.join(r.get('textRun', {}).get('content', '') for r in el['paragraph']['elements'])
                out.append(dict(text=t.rstrip(), s=el['startIndex'], table=table, ri=ri, ci=ci))
            elif 'table' in el:
                tb = dict(start=el['startIndex'])
                for r_i, row in enumerate(el['table']['tableRows']):
                    for c_i, cell in enumerate(row['tableCells']):
                        walk(cell['content'], out, tb, r_i, c_i)
    for t in doc['tabs']:
        ps = []
        walk(t.get('documentTab', {}).get('body', {}).get('content', []), ps)
        tabs[t['tabProperties']['title']] = (t['tabProperties']['tabId'], ps)
    return tabs


for tab, anchor, col in DEL_ROWS:
    tabs = load()
    m = [p for p in tabs[tab][1] if p['text'] == anchor]
    if len(m) != 1:
        raise SystemExit(f'COUNT {len(m)}: {anchor!r}')
    a = m[0]
    assert a['ci'] == col and a['table'], (a['ci'], a['table'])
    docs.documents().batchUpdate(documentId=DOC, body={'requests': [
        {'deleteTableRow': {'tableCellLocation': {
            'tableStartLocation': {'index': a['table']['start'], 'tabId': tabs[tab][0]},
            'rowIndex': a['ri'], 'columnIndex': 0}}}]}).execute()
    print('DELROW', tab, repr(anchor), 'row', a['ri'])
print('DONE')
