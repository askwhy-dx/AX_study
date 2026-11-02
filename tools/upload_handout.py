"""starter/1step/handout 의 HTML + txt 3종을 공유 드라이브 폴더(AI-AX-Setup)에 올린다.
python upload_handout.py dry|apply
같은 이름 파일이 있으면 내용만 교체(파일 ID·링크 유지), 없으면 새로 만든다. 같은 이름이 2개 이상이면 중단.
skills 폴더는 건드리지 않는다."""
import sys, os, hashlib; sys.path.insert(0, r'C:\Users\User\Desktop\test\_gdrive'); sys.stdout.reconfigure(encoding='utf-8')
from gdrive_shared import get_credentials
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload
MODE = sys.argv[1]
FOLDER = '1AUVbDp12e3_ljvX-WuvbCjuP08NmNzsA'  # 공유 폴더(192wXqw…) › starter › 교육. 26-09-30 하위 폴더로 재정리됨
HANDOUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'starter', '1step', 'handout')
FILES = [('CLAUDE_초기설정.txt', 'text/plain'), ('hooks/notify.ps1', 'text/plain')]
# 26-10-16: v1.18 PART 5 알림 훅. 'hooks/' 처럼 앞에 폴더가 붙으면 공유 폴더 안 그 하위 폴더에 올린다(없으면 만든다).
# 26-09-16: 교육가이드.html·교육순서.txt 는 사용자 지시로 공유 폴더에서 내렸다(휴지통).
# 로컬 handout 에는 그대로 둔다. 다시 올릴 일이 생기면 이 목록에 되돌려 넣는다.
# 26-09-16: 전역규칙·프로젝트초기화 txt 2개는 초기설정 1개로 합쳤다. 드라이브의 옛 파일 2개는
# 게시 뒤 사람이 직접 지운다(사본은 archive/drive_260916/). 이 스크립트는 삭제하지 않는다.
d = build('drive', 'v3', credentials=get_credentials())
def subfolder(parent, name):
    q = f"'{parent}' in parents and name='{name}' and mimeType='application/vnd.google-apps.folder' and trashed=false"
    hits = d.files().list(q=q, fields='files(id)', supportsAllDrives=True, includeItemsFromAllDrives=True).execute()['files']
    if len(hits) > 1:
        raise SystemExit(f'같은 이름 폴더 {len(hits)}개: {name}')
    if hits:
        return hits[0]['id']
    print('CREATE', name + '/')
    if MODE != 'apply':
        return None
    return d.files().create(body={'name': name, 'parents': [parent], 'mimeType': 'application/vnd.google-apps.folder'}, fields='id', supportsAllDrives=True).execute()['id']
for rel, mime in FILES:
    path = os.path.join(HANDOUT, *rel.split('/'))
    md5 = hashlib.md5(open(path, 'rb').read()).hexdigest()
    parent, name = FOLDER, rel.split('/')[-1]
    if '/' in rel:
        parent = subfolder(FOLDER, rel.split('/')[0])
        if parent is None:
            print('CREATE', rel); continue
    q = f"'{parent}' in parents and name='{name}' and trashed=false"
    hits = d.files().list(q=q, fields='files(id,md5Checksum)', supportsAllDrives=True, includeItemsFromAllDrives=True).execute()['files']
    if len(hits) > 1:
        raise SystemExit(f'같은 이름 {len(hits)}개: {name}')
    if hits and hits[0].get('md5Checksum') == md5:
        print('SAME  ', name); continue
    print('UPDATE' if hits else 'CREATE', name)
    if MODE != 'apply':
        continue
    media = MediaFileUpload(path, mimetype=mime, resumable=False)
    if hits:
        r = d.files().update(fileId=hits[0]['id'], media_body=media, fields='id,md5Checksum,webViewLink', supportsAllDrives=True).execute()
    else:
        r = d.files().create(body={'name': name, 'parents': [parent], 'mimeType': mime}, media_body=media, fields='id,md5Checksum,webViewLink', supportsAllDrives=True).execute()
    print('   ', 'md5 ok' if r['md5Checksum'] == md5 else 'MD5 MISMATCH', r['webViewLink'])
