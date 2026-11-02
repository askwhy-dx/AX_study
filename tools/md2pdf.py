# -*- coding: utf-8 -*-
"""마크다운 문서를 A4 PDF 로 뽑는다 (인쇄용).

  python tools/md2pdf.py docs/문서.md
  python tools/md2pdf.py docs/문서.md --title "문서 제목"

판(A4 스타일·폰트 내장·playwright 렌더)은 AX_source/tools/pdfdoc.py 를 그대로 빌려 쓴다.
같은 회사 문서로 보여야 하는데 CSS 를 따로 들면 두 판이 조용히 갈린다.
PDF 옆에 HTML 도 남는다 — 판이 깨졌을 때 브라우저로 열어 봐야 어디서 넘쳤는지 보인다.
"""
import os, sys, io, re

sys.stdout.reconfigure(encoding='utf-8')
sys.path.insert(0, r'C:\Users\User\Desktop\test\AX_source\tools')
import pdfdoc
import markdown

src = sys.argv[1]
title = None
if '--title' in sys.argv:
    title = sys.argv[sys.argv.index('--title') + 1]

md = io.open(src, encoding='utf-8').read()
# 첫 h1 을 제목으로 쓰고 본문에서는 뺀다 (표지를 따로 세우지 않고 첫 장부터 바로 읽게)
m = re.match(r'#\s+(.+?)\n', md)
if m and not title:
    title = m.group(1).strip()
body = markdown.markdown(md, extensions=['tables', 'fenced_code', 'sane_lists'])
# 표가 페이지 경계에서 쪼개지면 인쇄본이 읽히지 않는다. pdfdoc 의 공용 CSS 는 AX_source
# 문서와 같이 쓰므로 건드리지 않고 여기서만 덮는다.
body = '<style>table{page-break-inside:avoid;break-inside:avoid}</style>' + body

html = pdfdoc.page(title or os.path.basename(src), body)
out = os.path.splitext(src)[0]
pdfdoc.render(html, out + '.html', out + '.pdf', footer_left=title or '')
print('->', os.path.abspath(out + '.pdf'))
