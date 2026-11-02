"""구글 문서 앞 3개 탭의 표 셀·문단이 HTML 에 들어갔는지 대조한다 (누락 후보만 출력).
python check_html.py <문서ID> <html>
화살표(->, >)·공백·따옴표 차이는 무시한다. 결과는 사람이 보고 판단한다(단계 번호 통일 등 의도한 변경이 섞여 나옴)."""
import sys, re, html; sys.path.insert(0, r'C:\Users\User\Desktop\test\_gdrive')
sys.stdout.reconfigure(encoding='utf-8')
from gdrive_shared import get_credentials
from googleapiclient.discovery import build
DOC, PATH = sys.argv[1], sys.argv[2]
TABS = ['진행순', '요약', '초기세팅_상세']


def norm(s):
    s = html.unescape(s)
    s = re.sub(r'-+>|→|›|&gt;|>', '→', s)
    s = re.sub(r'[\s"“”\'‘’`]+', '', s)
    return s.replace('\\', '').lower()


page = open(PATH, encoding='utf-8').read()
page = re.sub(r'src="data:[^"]+"', '', page)
text = norm(re.sub(r'<[^>]+>', ' ', re.sub(r'<(script|style)[\s\S]*?</\1>', ' ', page)))
doc = build('docs', 'v1', credentials=get_credentials()).documents().get(documentId=DOC, includeTabsContent=True).execute()

miss = total = 0
for t in doc['tabs']:
    name = t['tabProperties']['title']
    if name not in TABS:
        continue

    def walk(content, where):
        global miss, total
        for el in content:
            if 'paragraph' in el:
                s = ''.join(r.get('textRun', {}).get('content', '') for r in el['paragraph']['elements']).strip()
                if len(norm(s)) < 3 or re.fullmatch(r'\d+', s):
                    continue
                total += 1
                if norm(s) not in text:
                    miss += 1; print(f'[{name}{where}] {s}')
            elif 'table' in el:
                for ri, row in enumerate(el['table']['tableRows']):
                    for ci, c in enumerate(row['tableCells']):
                        walk(c['content'], f' r{ri}c{ci}')
    walk(t['documentTab']['body']['content'], '')
print(f'-- {total} 문단 중 누락 후보 {miss}')
