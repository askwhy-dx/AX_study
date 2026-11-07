"""advance 2step 시연 영상 — 서브 vs 팀 「말이 어디로 가나」 (무료: edge-tts + Playwright + ffmpeg).

실행: py -3.12 build_video.py script.json
입력: script.json (장면 → step 마다 내레이션 say · 화살표 arrow · 기록 줄 line)
출력: out/<id>.mp4 · out/<id>.srt (같은 폴더)
화면 종류: title(제목) · flow(담당 상자 + 화살표 + 아래 기록 줄) · table(비교 표)
"""
import asyncio, hashlib, html, json, subprocess, sys
from pathlib import Path
import edge_tts

VOICE, RATE, GAP = "ko-KR-SunHiNeural", "+0%", 0.4
W, H, FPS = 1920, 1080, 30
HERE = Path(__file__).resolve().parent
FONT = "'Noto Sans KR','Malgun Gothic',sans-serif"
# 상자 위치 (flow 화면 위쪽 560px 안)
POS = {
    "sub": {"메인": (810, 60), "cs-reply": (180, 330), "검산": (1440, 330)},
    "team": {"메인": (810, 40), "replier": (160, 330), "policy": (1460, 330), "parent": (810, 400)},
}
CSS = f"""*{{margin:0;box-sizing:border-box}}body{{width:{W}px;height:{H}px;font-family:{FONT};background:#F4F7FB;color:#14213D;overflow:hidden}}
.top{{height:96px;background:#1D4ED8;color:#fff;display:flex;align-items:center;justify-content:space-between;padding:0 60px;font-size:38px;font-weight:700}}
.top.team{{background:#047857}} .top small{{font-size:28px;font-weight:400;opacity:.9}}
.stage{{position:relative;height:560px}}
.box{{position:absolute;width:300px;height:110px;border-radius:20px;background:#fff;border:4px solid #CBD5E1;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:38px;font-weight:700}}
.box small{{font-size:24px;font-weight:400;color:#64748B}}
.box.main{{border-color:#1D4ED8;background:#EFF6FF}} .box.on{{border-color:#F59E0B;box-shadow:0 0 0 8px #FDE68A}}
svg{{position:absolute;inset:0;z-index:2}}
.log{{margin:0 60px;background:#0F172A;border-radius:18px;padding:22px 30px;height:404px;overflow:hidden;display:flex;flex-direction:column;justify-content:flex-end;gap:10px}}
.log div{{font-family:Consolas,'D2Coding',{FONT};font-size:27px;color:#CBD5E1;white-space:normal;line-height:1.35}}
.log div.new{{color:#FDE047;font-weight:700}} .log .h{{color:#94A3B8;font-size:24px}}
.title{{display:flex;flex-direction:column;justify-content:center;align-items:center;height:{H}px;gap:36px;text-align:center}}
.title h1{{font-size:96px;color:#1D4ED8}} .title div{{font-size:46px;max-width:1500px;line-height:1.45}} .title .sub{{font-size:34px;color:#64748B}}
table{{margin:60px auto 0;border-collapse:collapse;font-size:40px;width:1600px}} th,td{{border:3px solid #CBD5E1;padding:26px 30px;text-align:center}}
th{{background:#E2E8F0}} td.sub{{background:#EFF6FF}} td.team{{background:#ECFDF5}} .foot{{text-align:center;font-size:44px;font-weight:700;margin-top:60px;color:#1D4ED8}}
"""


def run(cmd):
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode:
        sys.exit(f"실패: {' '.join(map(str, cmd))[:300]}\n{r.stderr[-1500:]}")
    return r.stdout


def dur(p):
    return float(run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(p)]))


def arrow_svg(pos, a, b, color):
    (ax, ay), (bx, by) = pos[a], pos[b]
    x1, y1, x2, y2 = ax + 150, ay + 55, bx + 150, by + 55
    # 상자 가장자리에서 끊는다
    import math
    L = math.hypot(x2 - x1, y2 - y1) or 1
    ux, uy = (x2 - x1) / L, (y2 - y1) / L
    x1, y1, x2, y2 = x1 + ux * 165, y1 + uy * 70, x2 - ux * 175, y2 - uy * 95
    return (f'<line x1="{x1:.0f}" y1="{y1:.0f}" x2="{x2:.0f}" y2="{y2:.0f}" stroke="{color}" stroke-width="10" '
            f'stroke-linecap="round" marker-end="url(#h)"/>')


PANE_COL = {"gray": "#475569", "blue": "#1D4ED8", "magenta": "#A21CAF", "green": "#15803D", "yellow": "#B45309", "cyan": "#0E7490"}
PANE_CSS = """.pbody{position:relative;height:984px}
.pane{position:absolute;background:#0B0F19;border:3px solid #1E293B;border-radius:10px;overflow:hidden;display:flex;flex-direction:column}
.pane.on{border-color:#FDE047;box-shadow:0 0 0 4px rgba(253,224,71,.35)}
.ph{height:48px;flex:none;display:flex;align-items:center;padding:0 18px;color:#fff;font-size:26px;font-weight:700}
.ph small{font-weight:400;opacity:.85;margin-left:12px;font-size:22px}
.pl{flex:1;display:flex;flex-direction:column;justify-content:flex-end;padding:10px 16px;gap:6px;overflow:hidden}
.pl div{font-family:Consolas,'D2Coding','Malgun Gothic',monospace;font-size:23px;line-height:1.3;color:#94A3B8}
.pl div.new{color:#FDE047;font-weight:700} .pl div.msg{color:#E2E8F0} .pl div.msg.new{color:#FDE047}
.pl .idle{color:#475569;font-style:italic}"""


def panes_page(sc, upto):
    v = sc["visual"]; ps = v["panes"]
    steps = sc["steps"][: upto + 1]
    lines = {p["id"]: [] for p in ps}
    for i, st in enumerate(steps):
        for who, text in st.get("ev", []):
            lines[who].append((text, i == upto))
    focus = set(steps[-1].get("focus", []))
    right = [p for p in ps if p["id"] != "메인"]; main = next(p for p in ps if p["id"] == "메인")
    def box(p, x, y, w, h):
        body = "".join(f"<div class='{'msg ' if t.startswith(('✉', '[')) else ''}{'new' if n else ''}'>{html.escape(t)}</div>" for t, n in lines[p["id"]][-14:])
        if not lines[p["id"]]: body = "<div class='idle'>일을 받으면 여기에 보입니다…</div>"
        return (f"<div class='pane{' on' if p['id'] in focus else ''}' style='left:{x}px;top:{y}px;width:{w}px;height:{h}px'>"
                f"<div class='ph' style='background:{PANE_COL[p['color']]}'>@{html.escape(p['label'])}<small>{html.escape(p.get('role', ''))}</small></div>"
                f"<div class='pl'>{body}</div></div>")
    n = len(right); gap = 14; top = 14; avail = 984 - top * 2
    h = (avail - gap * (n - 1)) // n
    out = box(main, 24, top, 1000, avail)
    for i, p in enumerate(right):
        out += box(p, 1040, top + i * (h + gap), 856, h)
    mode = v.get("mode", "sub")
    return (f"<html><head><style>{CSS}{PANE_CSS}</style></head><body style='background:#020617'><div class='top {mode}'><span>{html.escape(v['title'])}</span>"
            f"<small>{html.escape(v.get('note', ''))}</small></div><div class='pbody'>{out}</div></body></html>")


def page(sc, upto):
    v = sc["visual"]
    if v["type"] == "panes":
        return panes_page(sc, upto)
    if v["type"] == "title":
        return (f"<html><head><style>{CSS}</style></head><body><div class='title'><h1>{html.escape(v['title'])}</h1>"
                f"<div>{html.escape(v.get('sub', ''))}</div><div class='sub'>{html.escape(v.get('foot', ''))}</div></div></body></html>")
    if v["type"] == "table":
        rows = "".join(f"<tr><th>{html.escape(r[0])}</th><td class='sub'>{html.escape(r[1])}</td><td class='team'>{html.escape(r[2])}</td></tr>"
                       for r in v["rows"][: v.get("reveal_by_step") and upto + 1 or None])
        return (f"<html><head><style>{CSS}</style></head><body><div class='top'><span>{html.escape(v['title'])}</span></div>"
                f"<table><tr><th></th><th>서브</th><th>팀</th></tr>{rows}</table>"
                f"<div class='foot'>{html.escape(v.get('foot', '') if upto == len(sc['steps']) - 1 else '')}</div></body></html>")
    mode = v["mode"]; pos = POS[mode]
    steps = sc["steps"][: upto + 1]
    cur = steps[-1].get("arrow")
    on = set(cur or [])
    boxes = "".join(f"<div class='box{' main' if n == '메인' else ''}{' on' if n in on else ''}' style='left:{x}px;top:{y}px'>"
                    f"{html.escape(n)}<small>{html.escape(v['roles'].get(n, ''))}</small></div>" for n, (x, y) in pos.items())
    color = "#2563EB" if mode == "sub" else "#059669"
    svg = (f"<svg width='{W}' height='560'><defs><marker id='h' markerWidth='6' markerHeight='6' refX='3' refY='3' orient='auto'>"
           f"<path d='M0,0 L6,3 L0,6 z' fill='{color}'/></marker></defs>{arrow_svg(pos, cur[0], cur[1], color) if cur else ''}</svg>")
    lines = [s["line"] for s in steps if s.get("line")]
    newest = steps[-1].get("line")
    log = "".join(f"<div class='{'new' if (l == newest and i == len(lines) - 1) else ''}'>{html.escape(l)}</div>" for i, l in enumerate(lines[-9:]))
    head = f"<div class='h'>{html.escape(v['log_title'])}</div>"
    return (f"<html><head><style>{CSS}</style></head><body><div class='top {mode}'><span>{html.escape(v['title'])}</span>"
            f"<small>{html.escape(v.get('note', ''))}</small></div><div class='stage'>{svg}{boxes}</div>"
            f"<div class='log'>{head}{log}</div></body></html>")


async def tts(text, mp3):
    if not mp3.exists():
        await edge_tts.Communicate(text, VOICE, rate=RATE).save(str(mp3))


def main():
    d = json.loads(Path(sys.argv[1]).read_text(encoding="utf-8"))
    ID = d["id"]; work = HERE / "build" / ID; work.mkdir(parents=True, exist_ok=True); (HERE / "out").mkdir(exist_ok=True)
    sil = work / "sil.wav"
    if not sil.exists():
        run(["ffmpeg", "-y", "-v", "error", "-f", "lavfi", "-i", "anullsrc=r=24000:cl=mono", "-t", str(GAP), str(sil)])
    def mp3_of(sc, i, st):
        return work / f"{sc['id']}_{i}_{hashlib.md5((VOICE + st['say']).encode()).hexdigest()[:8]}.mp3"

    async def all_tts():  # Playwright sync API 가 이벤트 루프를 잡으므로 음성을 먼저 다 만든다
        for sc in d["scenes"]:
            for i, st in enumerate(sc["steps"]):
                await tts(st["say"], mp3_of(sc, i, st))
    asyncio.run(all_tts())
    from playwright.sync_api import sync_playwright
    parts, timeline, t0 = [], [], 0.0
    with sync_playwright() as p:
        br = p.chromium.launch(); pg = br.new_page(viewport={"width": W, "height": H})
        for sc in d["scenes"]:
            vl, al, secs = [], [], []
            for i, st in enumerate(sc["steps"]):
                mp3 = mp3_of(sc, i, st)
                s = dur(mp3) + GAP; secs.append(s)
                png = work / f"{sc['id']}_{i}.png"
                pg.set_content(page(sc, i)); pg.wait_for_timeout(120); pg.screenshot(path=str(png))
                vl.append(f"file '{png.as_posix()}'\nduration {s:.3f}\n")
                al.append(f"file '{mp3.as_posix()}'\nfile '{sil.as_posix()}'\n")
                timeline.append({"start": round(t0 + sum(secs[:-1]), 3), "end": round(t0 + sum(secs) - GAP, 3), "say": st["say"]})
            vl.append(f"file '{png.as_posix()}'\n")
            (work / f"{sc['id']}_v.txt").write_text("".join(vl), encoding="utf-8")
            (work / f"{sc['id']}_a.txt").write_text("".join(al), encoding="utf-8")
            total = sum(secs); out = work / f"{sc['id']}.mp4"
            run(["ffmpeg", "-y", "-v", "error", "-f", "concat", "-safe", "0", "-i", str(work / f"{sc['id']}_v.txt"),
                 "-f", "concat", "-safe", "0", "-i", str(work / f"{sc['id']}_a.txt"), "-map", "0:v", "-map", "1:a",
                 "-vf", f"fps={FPS},scale={W}:{H},format=yuv420p", "-af", f"apad=whole_dur={total:.3f}", "-t", f"{total:.3f}",
                 "-c:v", "libx264", "-preset", "veryfast", "-crf", "20", "-c:a", "aac", "-ar", "48000", "-ac", "2", str(out)])
            parts.append(out); t0 += total
            print(sc["id"], f"{total:.1f}s")
        br.close()
    lst = work / "parts.txt"; lst.write_text("".join(f"file '{x.as_posix()}'\n" for x in parts), encoding="utf-8")
    mp4 = HERE / "out" / f"{ID}.mp4"
    run(["ffmpeg", "-y", "-v", "error", "-f", "concat", "-safe", "0", "-i", str(lst), "-c", "copy", "-movflags", "+faststart", str(mp4)])

    def ts(x):
        return f"{int(x // 3600):02d}:{int(x % 3600 // 60):02d}:{int(x % 60):02d},{int(round((x % 1) * 1000)) % 1000:03d}"
    (HERE / "out" / f"{ID}.srt").write_text("".join(f"{n + 1}\n{ts(c['start'])} --> {ts(c['end'])}\n{c['say']}\n\n"
                                                   for n, c in enumerate(timeline)), encoding="utf-8")
    L = dur(mp4); print(f"완료 {mp4} {int(L // 60)}:{L % 60:04.1f}")


if __name__ == "__main__":
    main()
