import sys, json, os, mimetypes; sys.path.insert(0, r'C:\Users\User\Desktop\test\_gdrive')
sys.stdout.reconfigure(encoding='utf-8')
from gdrive_shared import get_credentials
from googleapiclient.discovery import build
from google.auth.transport.requests import AuthorizedSession
DOC = sys.argv[1]; OUT = sys.argv[2]  # 문서 안 인라인 이미지를 문단 순서대로 저장 (contentUri 는 30분 유효라 매번 새로 읽는다)
cred = get_credentials()
doc = build('docs', 'v1', credentials=cred).documents().get(documentId=DOC, includeTabsContent=True).execute()
http = AuthorizedSession(cred); os.makedirs(OUT, exist_ok=True); manifest = []


def walk(content, hits):
    for el in content:
        if 'paragraph' in el:
            es = el['paragraph']['elements']
            text = ''.join(r.get('textRun', {}).get('content', '') for r in es).strip()
            hits += [(r['inlineObjectElement']['inlineObjectId'], text) for r in es if 'inlineObjectElement' in r]
        elif 'table' in el:
            for row in el['table']['tableRows']:
                for c in row['tableCells']:
                    walk(c['content'], hits)


for t in doc['tabs']:
    dt = t['documentTab']; hits = []
    walk(dt['body']['content'], hits)
    for n, (oid, text) in enumerate(hits, 1):
        e = dt['inlineObjects'][oid]['inlineObjectProperties']['embeddedObject']
        r = http.get(e['imageProperties']['contentUri']); r.raise_for_status()
        ext = mimetypes.guess_extension(r.headers.get('Content-Type', '').split(';')[0]) or '.png'
        name = f"{t['tabProperties']['tabId'].replace('.', '')}_{n:02d}{ext}"
        open(os.path.join(OUT, name), 'wb').write(r.content)
        manifest.append(dict(file=name, tab=t['tabProperties']['title'], order=n, paragraph=text, object_id=oid, bytes=len(r.content)))
        print(name, len(r.content), repr(text))
json.dump(manifest, open(os.path.join(OUT, 'manifest.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
