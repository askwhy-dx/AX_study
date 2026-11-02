"""guide.src.html 의 img:이름 을 이미지(data URI)로 바꿔 한 파일 HTML 을 만든다.
python tools/build_html.py starter-1step
과정·파일명은 courses.json 에서 읽는다. 기본값은 starter-1step.
배포는 같은 단계의 handout 으로 복사한다. 터미널 캡처의 아래쪽 빈 여백은 잘라 넣는다."""
import base64, io, json, os, re, sys
from PIL import Image, ImageChops
sys.stdout.reconfigure(encoding='utf-8')
COURSE = (sys.argv[1] if len(sys.argv) > 1 else 'starter-1step').lower()
with open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'courses.json'), encoding='utf-8') as f:
    CONFIG = json.load(f)
COURSE = CONFIG['aliases'].get(COURSE, COURSE)
if COURSE not in CONFIG['courses']:
    raise SystemExit('과정은 ' + ' · '.join(CONFIG['courses']))
DIR, OUTNAME = (CONFIG['courses'][COURSE][k] for k in ('dir', 'file'))
WEB = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', DIR, 'web')
DIRS = [os.path.join(WEB, 'images', 'shots'), os.path.join(WEB, 'images', 'gdoc')]
src = open(os.path.join(WEB, 'guide.src.html'), encoding='utf-8').read()


def trim_bottom(im):
    # 좌우 가장자리(패널 테두리·스크롤바)는 빼고 가운데 영역에서 마지막 글자 줄을 찾는다
    mid = im.crop((60, 0, im.width - 60, im.height))
    bg = Image.new(mid.mode, mid.size, mid.getpixel((mid.width // 2, mid.height - 5)))
    box = ImageChops.difference(mid, bg).convert('L').point(lambda v: 255 if v > 24 else 0).getbbox()
    if box and im.height - box[3] > 60:
        return im.crop((0, 0, im.width, min(im.height, box[3] + 24)))
    return im


def uri(name):
    for d in DIRS:
        p = os.path.join(d, name + '.png')
        if os.path.exists(p):
            im = trim_bottom(Image.open(p).convert('RGB'))
            buf = io.BytesIO(); im.save(buf, 'PNG', optimize=True)
            return 'data:image/png;base64,' + base64.b64encode(buf.getvalue()).decode()
    raise SystemExit(f'이미지 없음: {name}')


names = re.findall(r'src="img:([\w]+)"', src)
out = re.sub(r'src="img:([\w]+)"', lambda m: f'src="{uri(m.group(1))}"', src)
dst = os.path.join(WEB, OUTNAME)
open(dst, 'w', encoding='utf-8').write(out)
print(len(names), 'images,', round(len(out.encode()) / 1024 / 1024, 2), 'MB ->', os.path.abspath(dst))
