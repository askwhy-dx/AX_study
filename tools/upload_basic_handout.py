"""basic 준비물을 공유 드라이브 폴더에 올린다.
python upload_basic_handout.py 1step|2step|master/1step|master/2step dry|apply
(11-06) master/<편> = master/<편>/handout → 드라이브 AI-AX-Study › master › <편> (폴더 없으면 만든다).
basic/<편>/handout 의 파일(가이드 HTML 제외)을 드라이브 「basic 준비물」/<편> 폴더에 올린다. 하위 폴더도 같은 이름으로 만든다.
같은 이름이 있으면 내용만 교체(파일 ID·링크 유지), 없으면 새로 만든다. 같은 이름이 2개 이상이면 중단. 지우지는 않는다."""
import sys, os, hashlib, mimetypes
sys.path.insert(0, r'C:\Users\User\Desktop\test\_gdrive'); sys.stdout.reconfigure(encoding='utf-8')
from gdrive_shared import get_credentials
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload
PART, MODE = sys.argv[1], sys.argv[2]
FOLDERS = {'1step': '1_0a_3rQuD0yoqAoIC86uu6qRs3mIYHQ3', '2step': '1V-yySFJ26WKeJuyjlbZ1qwntdBPH8zng'}  # 상위 1JOGuo57D-ZtolZSu_FaJiaizTN48mi_g (도메인 편집 권한)
MASTER = '1G75cKA55do3K9pXd3pLEr3J4HcPmrT9Y'  # AI-AX-Study › master
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', *(PART.split('/') if '/' in PART else ['basic', PART]), 'handout')
TOP, REF = {'열사전.txt', '직영_실습데이터.csv'}, '참고자료'  # 1step 드라이브 배치 (로컬 handout 은 평평한 그대로)
MIME = {'.csv': 'text/csv', '.txt': 'text/plain', '.md': 'text/markdown', '': 'text/plain'}
d = build('drive', 'v3', credentials=get_credentials())


def find(parent, name, folder=False):
    q = f"'{parent}' in parents and name='{name}' and trashed=false"
    q += " and mimeType='application/vnd.google-apps.folder'" if folder else " and mimeType!='application/vnd.google-apps.folder'"
    hits = d.files().list(q=q, fields='files(id,md5Checksum)', supportsAllDrives=True, includeItemsFromAllDrives=True).execute()['files']
    if len(hits) > 1:
        raise SystemExit(f'같은 이름 {len(hits)}개: {name}')
    return hits[0] if hits else None


def folder_id(parent, name):
    hit = find(parent, name, True)
    if hit:
        return hit['id']
    print('MKDIR ', name)
    if MODE != 'apply':
        return None
    return d.files().create(body={'name': name, 'parents': [parent], 'mimeType': 'application/vnd.google-apps.folder'}, fields='id', supportsAllDrives=True).execute()['id']


if PART.startswith('master/'):
    FOLDERS[PART] = folder_id(MASTER, PART.split('/')[1])

for base, dirs, files in os.walk(ROOT):
    rel = os.path.relpath(base, ROOT)
    for name in sorted(files):
        if name.startswith('CLAUDE_') and name.endswith('.html'):
            continue  # 가이드는 공개 링크로 본다
        parts = [] if rel == '.' else rel.split(os.sep)
        if PART == '1step' and (parts or name not in TOP):
            parts = [REF] + parts  # 10-06 사용자: 교육 폴더 바로 아래는 열사전 · 실습 데이터만, 나머지는 참고자료
        parent = FOLDERS[PART]
        for part in parts:
            parent = folder_id(parent, part) if parent else None
        path = os.path.join(base, name)
        md5 = hashlib.md5(open(path, 'rb').read()).hexdigest()
        hit = find(parent, name) if parent else None
        show = '/'.join(parts + [name])
        if hit and hit.get('md5Checksum') == md5:
            print('SAME  ', show); continue
        print('UPDATE' if hit else 'CREATE', show)
        if MODE != 'apply':
            continue
        mime = MIME.get(os.path.splitext(name)[1], mimetypes.guess_type(name)[0] or 'application/octet-stream')
        media = MediaFileUpload(path, mimetype=mime, resumable=True)
        if hit:
            r = d.files().update(fileId=hit['id'], media_body=media, fields='id,md5Checksum,webViewLink', supportsAllDrives=True).execute()
        else:
            r = d.files().create(body={'name': name, 'parents': [parent]}, media_body=media, fields='id,md5Checksum,webViewLink', supportsAllDrives=True).execute()
        print('   ', 'md5 ok' if r['md5Checksum'] == md5 else 'MD5 MISMATCH', r['webViewLink'])
