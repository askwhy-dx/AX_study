import sys, json; sys.path.insert(0, r'C:\Users\User\Desktop\test\_gdrive')
from gdrive_shared import get_credentials
from googleapiclient.discovery import build
DOC=sys.argv[1]; out=sys.argv[2]
docs=build('docs','v1',credentials=get_credentials())
doc=docs.documents().get(documentId=DOC, includeTabsContent=True).execute()
json.dump(doc, open(out,'w',encoding='utf-8'), ensure_ascii=False)
def walk(content, depth, lines, tabname):
    for el in content:
        if 'paragraph' in el:
            t=''.join(r.get('textRun',{}).get('content','') for r in el['paragraph']['elements'])
            imgs=sum(1 for r in el['paragraph']['elements'] if 'inlineObjectElement' in r)
            lines.append(f"{tabname}|{'  '*depth}P[{el['startIndex']}-{el['endIndex']}]{' IMG'*imgs} {t.rstrip()!r}")
        elif 'table' in el:
            lines.append(f"{tabname}|{'  '*depth}TABLE[{el['startIndex']}] rows={el['table']['rows']}")
            for ri,row in enumerate(el['table']['tableRows']):
                for ci,cell in enumerate(row['tableCells']):
                    lines.append(f"{tabname}|{'  '*depth} cell r{ri}c{ci}")
                    walk(cell['content'], depth+2, lines, tabname)
def tabs(ts, lines):
    for t in ts:
        name=t['tabProperties']['title']
        lines.append(f"=== TAB {name} id={t['tabProperties']['tabId']}")
        walk(t.get('documentTab',{}).get('body',{}).get('content',[]),0,lines,name)
        tabs(t.get('childTabs',[]), lines)
lines=[]; tabs(doc['tabs'], lines)
open(out.replace('.json','.txt'),'w',encoding='utf-8').write('\n'.join(lines))
print(len(lines))
