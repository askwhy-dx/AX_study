# -*- coding: utf-8 -*-
r"""_slides\spec.json -> 편집 가능한 PPTX. ppt.js 가 호출한다.

CSS px -> PPT 변환: 원고 1920x1080px 를 13.333x7.5in 슬라이드에 그대로 얹는다.
  좌표 1px = 6350 EMU   /   글자 1px = 0.5pt
"""
import io, json, os, sys
from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.oxml.ns import qn

HERE = os.path.dirname(os.path.abspath(__file__))
TMP = os.path.join(HERE, '_slides')
OUT = os.path.join(HERE, 'AI에이전트_업무_4단계.pptx')

EMU_PX = 6350            # 1 CSS px
PT_PX = 0.5              # 1 CSS px -> pt
FONT = '맑은 고딕'
MONO = 'Consolas'
ALIGN = {'center': PP_ALIGN.CENTER, 'right': PP_ALIGN.RIGHT,
         'left': PP_ALIGN.LEFT, 'start': PP_ALIGN.LEFT, 'justify': PP_ALIGN.JUSTIFY}

E = lambda px: Emu(int(round(px * EMU_PX)))
C = lambda h: RGBColor.from_string(h)


def set_ea(run, name):
    """한글은 latin 이 아니라 ea 타이포페이스를 봐야 서체가 먹는다."""
    rPr = run._r.get_or_add_rPr()
    for tag in ('a:ea', 'a:cs'):
        el = rPr.find(qn(tag))
        if el is None:
            el = rPr.makeelement(qn(tag), {})
            rPr.append(el)
        el.set('typeface', name)


def add_box(slide, b):
    shp = MSO_SHAPE.PENTAGON if b['shape'] == 'chevron' else (
        MSO_SHAPE.ROUNDED_RECTANGLE if b['radius'] > 0.5 else MSO_SHAPE.RECTANGLE)
    s = slide.shapes.add_shape(shp, E(b['x']), E(b['y']), E(b['w']), E(b['h']))
    s.shadow.inherit = False

    if b['shape'] != 'chevron' and b['radius'] > 0.5:          # 모서리 둥글기 = 반지름/짧은변
        s.adjustments[0] = min(0.5, b['radius'] / max(1.0, min(b['w'], b['h'])))
    if b['shape'] == 'chevron':
        s.adjustments[0] = min(0.5, 26.0 / max(1.0, b['w']))   # 화살촉 길이 26px

    if b.get('grad') and len(b['grad']) >= 2:
        s.fill.gradient()
        s.fill.gradient_angle = 90.0                            # 위 -> 아래
        st = s.fill.gradient_stops
        st[0].color.rgb, st[0].position = C(b['grad'][0]), 0.0
        st[1].color.rgb, st[1].position = C(b['grad'][-1]), 1.0
    elif b['fill']:
        s.fill.solid(); s.fill.fore_color.rgb = C(b['fill'])
    else:
        s.fill.background()

    if b['stroke'] and b['sw'] > 0 and b['dash'] != 'none':
        s.line.color.rgb = C(b['stroke'])
        s.line.width = Pt(max(0.5, b['sw'] * PT_PX))
        if b['dash'] in ('dashed', 'dotted'):
            from pptx.enum.dml import MSO_LINE_DASH_STYLE
            s.line.dash_style = (MSO_LINE_DASH_STYLE.DASH if b['dash'] == 'dashed'
                                 else MSO_LINE_DASH_STYLE.ROUND_DOT)
    else:
        s.line.fill.background()
    return s


def add_text(slide, t):
    # 브라우저와 PPT 의 줄바꿈 계산이 미세하게 달라 상자를 좌우 2px, 아래 6px 넉넉히 준다
    tb = slide.shapes.add_textbox(E(t['x'] - 2), E(t['y'] - 1), E(t['w'] + 4), E(t['h'] + 6))
    tf = tb.text_frame
    tf.word_wrap = True
    tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0
    tf.vertical_anchor = MSO_ANCHOR.TOP

    # \n 으로 문단 분리 (원본의 <br>)
    paras, cur = [], []
    for r in t['runs']:
        for j, piece in enumerate(r['t'].split('\n')):
            if j:
                paras.append(cur); cur = []
            if piece:
                cur.append({'t': piece, 'b': r['b'], 'm': r['m']})
    paras.append(cur)

    for i, runs in enumerate(paras):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.alignment = ALIGN.get(t['align'], PP_ALIGN.LEFT)
        p.line_spacing = t['lh']
        for r in runs:
            run = p.add_run()
            run.text = r['t']
            f = run.font
            f.size = Pt(round(t['size'] * PT_PX, 1))
            f.bold = bool(r['b'])
            f.name = MONO if r['m'] else FONT
            set_ea(run, MONO if r['m'] else FONT)
            if t['color']:
                f.color.rgb = C(t['color'])
    return tb


MODE = (sys.argv[1] if len(sys.argv) > 1 else 'edit')
if MODE == 'image':
    OUT = OUT.replace('.pptx', '_이미지판.pptx')

prs = Presentation()
prs.slide_width, prs.slide_height = Inches(13.3333), Inches(7.5)
blank = prs.slide_layouts[6]

# ── 이미지판: 쪽 전체를 그림 한 장으로, 텍스트는 발표자 노트에
if MODE == 'image':
    import glob
    notes = json.load(io.open(os.path.join(TMP, 'notes.json'), encoding='utf-8'))
    pngs = sorted(glob.glob(os.path.join(TMP, 's*.png')))
    for i, png in enumerate(pngs):
        s = prs.slides.add_slide(blank)
        s.shapes.add_picture(png, 0, 0, width=prs.slide_width, height=prs.slide_height)
        if i < len(notes):
            s.notes_slide.notes_text_frame.text = notes[i]
    prs.save(OUT)
    print('OK  %s  (%d슬라이드, 편집 불가 / %.1f MB)'
          % (os.path.basename(OUT), len(pngs), os.path.getsize(OUT) / 1048576))
    raise SystemExit

spec = json.load(io.open(os.path.join(TMP, 'spec.json'), encoding='utf-8'))
nb = nt = ni = 0

for sh in spec:
    s = prs.slides.add_slide(blank)
    s.shapes.add_picture(os.path.join(TMP, sh['bg']), 0, 0,
                         width=prs.slide_width, height=prs.slide_height)
    for b in sh['boxes']:
        add_box(s, b); nb += 1
    for ic in sh['icons']:
        s.shapes.add_picture(os.path.join(TMP, ic['file']),
                             E(ic['x']), E(ic['y']), E(ic['w']), E(ic['h'])); ni += 1
    for t in sh['texts']:
        add_text(s, t); nt += 1

prs.save(OUT)
print('OK  %s  (%d슬라이드 / 도형 %d · 텍스트상자 %d · 아이콘 %d / %.1f MB)'
      % (os.path.basename(OUT), len(spec), nb, nt, ni, os.path.getsize(OUT) / 1048576))
