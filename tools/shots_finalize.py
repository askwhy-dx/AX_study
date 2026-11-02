"""촬영 원본(raw) → 자르기·가림 → <과정>/web/images/shots/ + 검토용 index.html
python shots_finalize.py <raw 폴더> [starter|basic]   (기본 starter)
원본에는 계정·경로·DB 주소가 있어 원본은 배포 폴더에 두지 않는다."""
import sys, os, html
from PIL import Image, ImageFilter, ImageDraw
RAW = sys.argv[1]
COURSE = (sys.argv[2] if len(sys.argv) > 2 else 'starter').lower()
DIR = {'starter': 'starter/1step', 'basic': 'basic/1step'}[COURSE]
OUT = os.path.join(os.path.dirname(__file__), '..', DIR, 'web', 'images', 'shots')
os.makedirs(OUT, exist_ok=True)

PANEL = (450, 50, 1930, 990)       # VS Code 터미널 패널 최대화 상태
PANEL_LOW = (450, 340, 1930, 990)  # 패널 기본 높이
CMD = (0, 85, 1480, 145)           # PANEL_LOW 기준 CLAUDE_CONFIG_DIR 명령 줄
# (출력 파일, 원본, 자르기, 가릴 영역[자른 뒤 좌표], 강조 테두리, 설명)
S = [
 ('s03_open_folder', 'a02.png', None, [(15, 710, 65, 755)], [], '3단계: 폴더 열기 후 왼쪽 탐색기에 claude_work'),
 ('s06_terminal', 's06_terminal.png', (0, 0, 1938, 990), [(15, 880, 65, 930)], [], '6단계: 터미널 열림, 경로가 작업 폴더'),
 ('s07_version', 's07_version.png', (450, 340, 1930, 520), [], [], '7단계: claude -v 버전 표시'),
 ('s07_path_env', 's07_path_env.png', None, [(44, 128, 522, 202), (44, 226, 522, 247)], [(44, 203, 522, 225)], '7단계(안 나올 때): 사용자 변수의 Path 선택 (다른 변수는 가림)'),
 ('s07_path_edit', 's07_path_edit.png', None, [(33, 64, 536, 208), (33, 234, 536, 402)], [(33, 209, 536, 233)], '7단계(안 나올 때): Path 편집, .local\\bin 줄 (다른 경로는 가림)'),
 ('s08_first_theme', 's08_first_theme.png', PANEL_LOW, [CMD], [], '8단계: 처음 실행 시 테마 선택 (Enter)'),
 ('s08_login_method', 's08_login_method.png', PANEL_LOW, [CMD], [], '8단계: 로그인 방법 1번 (구독 계정)'),
 ('s08_login_url', 'b03.png', PANEL_LOW, [CMD, (50, 200, 1470, 270)], [], '8단계: 브라우저가 안 열리면 주소로 로그인 (주소는 가림)'),
 ('s08_login_ok', 's08_login_ok.png', PANEL_LOW, [CMD, (180, 158, 380, 182)], [], '8단계: 로그인 성공 (이메일 가림)'),
 ('s08_security_notes', 's08_security_notes.png', PANEL_LOW, [CMD], [], '8단계: 보안 안내 (Enter)'),
 ('s08_terminal_setup', 's08_terminal_setup.png', PANEL_LOW, [CMD], [], '8단계: 터미널 설정 제안'),
 ('s08_trust_folder', 's08_trust_folder.png', PANEL_LOW, [CMD], [(60, 420, 330, 445)], '8단계: 폴더 신뢰 확인, 기본 선택이 No 라 아래로 옮겨 Yes'),
 ('s08_fullscreen_prompt', 's08_fullscreen_prompt.png', (450, 50, 1930, 600), [], [], '8단계: 새 화면 방식 제안'),
 ('s08_main', 's08_main.png', (450, 50, 1930, 450), [], [], '8단계: 첫 화면 (계정 대신 요금제 표시)'),
 ('s09_config_list', 's09_config_list.png', PANEL, [], [], '9단계: /config 설정 목록'),
 ('s09_config_language', 's09_config_language.png', (450, 50, 1930, 520), [], [], '9단계: lang 검색 → Language 항목'),
 ('s09_language_input', 's09_language_input.png', (450, 50, 1930, 450), [], [], '9단계: korean 입력'),
 ('s09_language_set', 's09_language_set.png', (450, 50, 1930, 520), [], [], '9단계: Language = korean'),
 ('f_plan_mode', 'f_plan_mode.png', (450, 50, 1930, 520), [], [(75, 375, 560, 400)], '기능: Shift+Tab 으로 plan mode on'),
 ('s10_pasted', 's10_pasted.png', (450, 50, 1930, 450), [], [], '10단계: 프롬프트 붙여넣기 (Pasted text 로 표시)'),
 ('s10_result', 's10_result.png', PANEL, [], [], '10단계: 결과 (auto 모드는 묻지 않고 만든다)'),
 ('s12_skills_folder', 's12_skills_folder.png', None, [(40, 455, 190, 565)], [], '12단계: .claude > skills > token-efficient 안에 SKILL'),
 ('s13_skills_list', 's13_skills_list.png', (450, 50, 1930, 560), [], [], '13단계: /skills 에 token-efficient'),
 ('f_resume', 'f_resume.png', (450, 50, 1930, 700), [], [], '기능: /resume 이전 대화 목록'),
 ('f_panel_position', 'f_panel_position.png', (450, 40, 1300, 640), [], [], '기능: 터미널 탭 우클릭 → 패널 위치'),]


def box_fix(b, im):
    return tuple(max(0, min(v, lim)) for v, lim in zip(b, (im.width, im.height, im.width, im.height)))


rows = []
for name, src, crop, masks, marks, desc in S:
    im = Image.open(os.path.join(RAW, src)).convert('RGB')
    if crop:
        im = im.crop(crop)
    for m in masks:
        m = box_fix(m, im)
        im.paste(im.crop(m).filter(ImageFilter.GaussianBlur(12)), m[:2])
    d = ImageDraw.Draw(im)
    for m in marks:
        d.rectangle(box_fix(m, im), outline=(230, 60, 60), width=3)
    im.save(os.path.join(OUT, name + '.png'))
    rows.append((name, desc))

# Shift+Tab 순환 4단 합성
parts = [Image.open(os.path.join(RAW, f)).crop((450, 370, 1930, 480)) for f in
         ('f_mode_auto.png', 'f_mode_manual.png', 'f_mode_acceptedits.png', 'f_plan_mode.png')]
c = Image.new('RGB', (1480, 110 * 4))
for i, p in enumerate(parts):
    c.paste(p, (0, i * 110))
c.save(os.path.join(OUT, 'f_mode_cycle.png'))
rows.insert(19, ('f_mode_cycle', '기능: Shift+Tab 순서 auto → manual → accept edits → plan'))

cards = ''.join(f'<figure><img src="{n}.png"><figcaption><b>{n}</b><br>{html.escape(t)}</figcaption></figure>' for n, t in rows)
open(os.path.join(OUT, 'index.html'), 'w', encoding='utf-8').write(
    '<meta charset="utf-8"><title>촬영 검토</title><style>body{font-family:sans-serif;background:#eee;margin:16px}'
    'figure{background:#fff;margin:0 0 24px;padding:12px;border-radius:8px}img{max-width:100%;border:1px solid #ccc}'
    '</style><h1>1step 이미지 검토 (' + str(len(rows)) + '장)</h1>' + cards)
print(len(rows), 'images ->', os.path.abspath(OUT))
