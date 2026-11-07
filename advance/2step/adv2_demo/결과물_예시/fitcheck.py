import sys
from pptx import Presentation
from pptx.util import Emu
from PIL import ImageFont
R, B = r"C:\Windows\Fonts\malgun.ttf", r"C:\Windows\Fonts\malgunbd.ttf"
def lines(text, pt, bold, width_in):
    f = ImageFont.truetype(B if bold else R, int(pt * 10))  # 10 px per pt -> 720 px per inch
    maxw = width_in * 720; n = 0
    for para in text.split("\n"):
        cur = ""; n += 1
        for ch in para:
            if f.getlength(cur + ch) > maxw:
                n += 1; cur = ch
            else:
                cur += ch
    return n
prs = Presentation(sys.argv[1])
for si, sl in enumerate(prs.slides, 1):
    for sh in sl.shapes:
        if sh.has_text_frame and sh.text_frame.text.strip():
            w, h = Emu(sh.width).inches, Emu(sh.height).inches
            need = 0
            for p in sh.text_frame.paragraphs:
                for r in p.runs[:1]:
                    pt = (r.font.size.pt if r.font.size else 18); b = bool(r.font.bold)
                    need += lines("".join(x.text for x in p.runs), pt, b, w - 0.02) * pt * 1.2 / 72
            if need > h + 0.02:
                print(f"s{si} {sh.name}: need {need:.2f}in > box {h:.2f}in | {sh.text_frame.text[:40]!r}")
        if sh.has_table:
            t = sh.table
            for ri, row in enumerate(t.rows):
                for ci, cell in enumerate(row.cells):
                    txt = cell.text; cw = Emu(t.columns[ci].width).inches - 0.26
                    r0 = cell.text_frame.paragraphs[0].runs
                    pt = r0[0].font.size.pt if r0 and r0[0].font.size else 15
                    n = lines(txt, pt, bool(r0 and r0[0].font.bold), cw)
                    if n > 1: print(f"s{si} table r{ri} c{ci}: {n} lines | {txt}")
print("checked")
