"""소재 12 비교: 포스터.html 을 캡처하고 화면 글자로 체크리스트 채점 → 비교.png · 비교.html
사용: py -3.12 compare_poster.py <runs 폴더(s12 를 담은)>
"""
import base64, json, re, sys
from pathlib import Path
from playwright.sync_api import sync_playwright
from PIL import Image, ImageDraw, ImageFont
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
W = Path(sys.argv[1]); HERE = Path(__file__).resolve().parent
key = json.load(open(HERE / "소재12" / "정답.json", encoding="utf-8"))
NAME = {"single": "싱글", "sub": "서브", "team": "팀"}
cards = []
with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page(viewport={"width": 640, "height": 900})
    for m in NAME:
        for rd in sorted((W / "s12" / m).glob("run*")):
            f = rd / "답변" / "포스터.html"
            if not f.exists(): cards.append(dict(m=m, run=rd.name, img=None, hit="-", miss="포스터 없음")); continue
            pg.goto(f.resolve().as_uri()); pg.wait_for_timeout(300)
            txt = pg.inner_text("body"); png = rd / "포스터.png"
            pg.screenshot(path=str(png), full_page=True)
            miss = [lab for lab, pat in key.items() if (bool(re.search(pat[4:], txt)) if pat.startswith("NOT:") else not re.search(pat, txt))]
            cost = 0.0; sends = 0
            for l in (rd / "stream.jsonl").open(encoding="utf-8"):
                try: d = json.loads(l)
                except Exception: continue
                if d.get("type") == "result": cost = max(cost, d.get("total_cost_usd") or 0)
                if d.get("type") == "assistant":
                    sends += sum(1 for c in d["message"].get("content", []) if c.get("type") == "tool_use" and c["name"] == "SendMessage" and c["input"].get("to") not in ("main", None))
            fix = (rd / "답변" / "고친점.md").read_text(encoding="utf-8") if (rd / "답변" / "고친점.md").exists() else ""
            cards.append(dict(m=m, run=rd.name, img=png, hit=f"{len(key) - len(miss)}/{len(key)}", miss=" · ".join(miss) or "없음",
                              sec=int((rd / "wall.txt").read_text()), cost=round(cost, 2), sends=sends, h=Image.open(png).height, fix=fix))
    b.close()
for c in cards: print(NAME[c["m"]], c["run"], c["hit"], "놓침:", c["miss"], c.get("sec"), "초", c.get("cost"), "USD", "쪽지", c.get("sends"))
# 합친 그림: 열 = 방식, 행 = 회차
font = ImageFont.truetype("C:/Windows/Fonts/malgunbd.ttf", 22); small = ImageFont.truetype("C:/Windows/Fonts/malgun.ttf", 16)
runs = sorted({c["run"] for c in cards}); TW, TH = 420, 620
canvas = Image.new("RGB", (TW * 3 + 40, (TH + 90) * len(runs) + 20), "white"); dr = ImageDraw.Draw(canvas)
for c in cards:
    x = 10 + list(NAME).index(c["m"]) * (TW + 10); y = 10 + runs.index(c["run"]) * (TH + 90)
    dr.text((x, y), f"{NAME[c['m']]} · {c['run']} · 체크 {c['hit']}", font=font, fill="black")
    dr.text((x, y + 30), f"{c.get('sec', '-')}초 · {c.get('cost', '-')} USD · 쪽지 {c.get('sends', '-')}", font=small, fill="#555")
    dr.text((x, y + 52), ("놓침: " + c["miss"])[:40], font=small, fill="#c00" if c["miss"] != "없음" else "#080")
    if c["img"]:
        im = Image.open(c["img"]); im.thumbnail((TW, TH)); canvas.paste(im, (x, y + 78))
out = W / "비교.png"; canvas.save(out); print(out)
# 비교.html (그림 내장)
emb = lambda p: "data:image/png;base64," + base64.b64encode(p.read_bytes()).decode()
rows = "".join(f"<div class=c><h3>{NAME[c['m']]} · {c['run']}</h3><p>체크 {c['hit']} · {c.get('sec','-')}초 · {c.get('cost','-')} USD · 쪽지 {c.get('sends','-')}</p><p class=m>놓침: {c['miss']}</p>"
               + (f"<img src='{emb(c['img'])}'>" if c["img"] else "") + f"<details><summary>고친 점</summary><pre>{c.get('fix','')}</pre></details></div>" for c in sorted(cards, key=lambda c: (c["run"], list(NAME).index(c["m"]))))
(W / "비교.html").write_text(f"<!doctype html><meta charset=utf-8><title>포스터 비교</title><style>body{{font-family:'Malgun Gothic';background:#f5f5f5;margin:16px}}.g{{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}}.c{{background:#fff;padding:10px;border-radius:8px}}img{{width:100%;border:1px solid #ddd}}.m{{color:#c00}}pre{{white-space:pre-wrap;font-size:12px}}</style><div class=g>{rows}</div>", encoding="utf-8")
