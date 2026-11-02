import sys; sys.path.insert(0, r'C:\Users\User\Desktop\test\_gdrive')
sys.stdout.reconfigure(encoding='utf-8')
from gdrive_shared import get_credentials
from googleapiclient.discovery import build
DOC = sys.argv[1]; MODE = sys.argv[2]  # dry | apply
docs = build('docs', 'v1', credentials=get_credentials())

# 2026-09-16 규칙 txt 2개 -> CLAUDE_초기설정.txt 1개로 합침 (붙여넣기 1회, 단계 13 -> 12)
T_SUM = '요약'; T_DET = '초기세팅_상세'
REPL = [  # (tab, 정확한 문단 텍스트, 새 텍스트, 같은 문단 개수)
 # --- 요약 §1 표: 10번 행을 합친 내용으로
 (T_SUM, '작업 폴더 공통 규칙', '규칙 만들기', 1),
 (T_SUM, '(CLAUDE.md)', '(CLAUDE.md 2개)', 2),  # 10번·11번 행 둘 다(11번 행은 아래에서 삭제)
 (T_SUM, '공유 폴더의 CLAUDE_프로젝트초기화.txt 내용을 전부 복사해, 작업 폴더에서 실행 중인 Claude Code에 붙여넣는다.',
         '공유 폴더의 CLAUDE_초기설정.txt 내용을 전부 복사해, 작업 폴더에서 실행 중인 Claude Code에 붙여넣는다. 한 번 붙여넣으면 전역 규칙(1단계)과 작업 폴더 규칙(2단계)을 차례로 만든다.', 1),
 (T_SUM, '작업폴더\\.claude\\CLAUDE.md 가 생긴다.',
         'C:\\Users\\<계정>\\.claude\\CLAUDE.md 와 작업폴더\\.claude\\CLAUDE.md 가 둘 다 생긴다. (이름은 같고 위치가 다르다)', 1),
 # --- 요약 §1 표: 12·13 -> 11·12
 (T_SUM, '12', '11', 1),
 (T_SUM, '13', '12', 1),
 # --- 요약 §4 파일 위치 표
 (T_SUM, 'CLAUDE_전역규칙.txt', 'CLAUDE_초기설정.txt (1단계)', 1),
 (T_SUM, 'CLAUDE_프로젝트초기화.txt', 'CLAUDE_초기설정.txt (2단계)', 1),
 # --- 상세 머리말
 (T_DET, '요약 탭 10~13번(작업 폴더 규칙, 전역 규칙, 스킬, 확인)을 자세히 풀어 쓴 절차다. Claude Code 설치·로그인·답변 언어 설정(요약 탭 1~9번)은 끝난 상태에서 시작한다.',
         '요약 탭 10~12번(규칙 만들기, 스킬, 확인)을 자세히 풀어 쓴 절차다. Claude Code 설치·로그인·답변 언어 설정(요약 탭 1~9번)은 끝난 상태에서 시작한다.', 1),
 # --- 상세 §1 준비물 표 (r1 을 합친 파일로, r2 는 아래에서 행 삭제)
 (T_DET, 'CLAUDE_프로젝트초기화.txt', 'CLAUDE_초기설정.txt', 1),
 (T_DET, '작업 폴더 규칙(CLAUDE.md)을 만든다', '전역 규칙과 작업 폴더 규칙(CLAUDE.md 2개)을 한 번에 만든다', 1),
 # --- 상세 §2 설정 순서 표: 1번 행을 합친 내용으로
 (T_DET, '작업 폴더 규칙 만들기', '규칙 만들기', 1),
 (T_DET, '(CLAUDE_프로젝트초기화.txt)', '(CLAUDE_초기설정.txt)', 1),
 (T_DET, '<작업 폴더>\\.claude\\CLAUDE.md 가 생긴다.',
         '1단계: C:\\Users\\<계정>\\.claude\\CLAUDE.md (모든 폴더에 적용)', 1),
 # --- 상세 §2: 3·4번 -> 2·3번
 (T_DET, '3', '2', 1),
 (T_DET, '4', '3', 1),
 # --- 상세 본문의 번호 참조
 (T_DET, '한글, 공백이 있으면 1번이 멈춘다.', '한글, 공백이 있으면 1번의 2단계(작업 폴더 규칙)가 멈춘다.', 1),
 (T_DET, '/skills 입력 (3번을 한 경우)', '/skills 입력 (2번을 한 경우)', 1),
 (T_DET, '3번(스킬)을 건너뛰어도 1, 2번 규칙은 그대로 동작한다.', '2번(스킬)을 건너뛰어도 1번 규칙은 그대로 동작한다.', 1),
 (T_DET, '1번에서 아무것도 안 만들고 멈춤', '1번의 2단계(작업 폴더 규칙)가 멈춤', 1),
 (T_DET, '2번(전역 규칙)을 건너뜀', '1번의 1단계(전역 규칙)가 안 만들어짐', 1),
 (T_DET, 'CLAUDE_전역규칙.txt 붙여넣기 후 다시 실행', 'CLAUDE_초기설정.txt 다시 붙여넣기 후 다시 실행', 1),
]
# 합친 1번 행의 성공 확인 칸에 2단계 줄을 덧붙인다 (문단 뒤에 새 줄 추가)
APPEND = [(T_DET, '1단계: C:\\Users\\<계정>\\.claude\\CLAUDE.md (모든 폴더에 적용)',
           '2단계: <작업 폴더>\\.claude\\CLAUDE.md (이 작업 폴더에만 적용)')]
DEL_ROWS = [  # (tab, 지울 행을 찾을 셀 문단, 그 셀의 열 번호)
 (T_SUM, '같은 창에 CLAUDE_전역규칙.txt 내용을 붙여넣는다.', 2),  # 요약 §1 표의 11번 행
 (T_DET, 'CLAUDE_전역규칙.txt', 0),  # 상세 §1 준비물 표
 (T_DET, '전역 규칙 만들기', 1),      # 상세 §2 설정 순서 표의 2번 행
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
    for t in doc['tabs']:
        ps = []
        walk(t.get('documentTab', {}).get('body', {}).get('content', []), ps)
        tabs[t['tabProperties']['title']] = (t['tabProperties']['tabId'], ps)
    return tabs


def find(tabs, tab, text, n=1, soft=False):
    m = [p for p in tabs[tab][1] if p['text'] == text]
    if soft and MODE != 'apply' and not m:
        print('  (dry: 앞 단계 적용 후 생기는 문단이라 건너뜀)', repr(text[:30]))
        return []
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
    print('REPL', tab, repr(old[:34]), '->', repr(new[:44]))
reqs = []
for tab in tabs:
    for _, s, rs in sorted([o for o in ops if o[0] == tab], key=lambda o: -o[1]):
        reqs += rs
run(reqs, 'phase1 text')

if MODE == 'apply':
    tabs = load()
reqs = []
for tab, anchor, extra in APPEND:
    hit = find(tabs, tab, anchor, soft=True)
    if not hit:
        continue
    a = hit[0]; tid = tabs[tab][0]
    reqs.append({'insertText': {'location': {'index': a['e'] - 1, 'tabId': tid}, 'text': '\n' + extra}})
    print('APPEND', tab, repr(extra[:40]))
run(reqs, 'phase2 append')

if MODE == 'apply':
    tabs = load()
# 행을 지우면 뒤쪽 표의 시작 인덱스가 밀리므로 한 건씩 적용하고 다시 읽는다
for i, (tab, anchor, col) in enumerate(DEL_ROWS):
    if MODE == 'apply' and i:
        tabs = load()
    a = find(tabs, tab, anchor)[0]; tid = tabs[tab][0]
    if a['ci'] != col or a['table'] is None:
        raise SystemExit(f'COL MISMATCH {anchor}: ci={a["ci"]} table={a["table"]}')
    print('DELROW', tab, repr(anchor), 'row', a['ri'])
    run([{'deleteTableRow': {'tableCellLocation': {'tableStartLocation': {'index': a['table']['start'], 'tabId': tid}, 'rowIndex': a['ri'], 'columnIndex': 0}}}], f'phase3 delete row {i+1}')
print('DONE', MODE)
