"""소재 8~11 채점. 사용: py -3.12 score_ad.py <작업폴더> → 표 + 결과_ad.json
8 = 주원인 · 가격 미끼 · 건수 2개 / 9 = 쟁점 8개 정규식 / 10 = 15건 · 얽힘 5건 / 11 = 15건 · 함정 3건(4 · 9 · 13)
"""
import json, re, sys
from pathlib import Path
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
W = Path(sys.argv[1]); HERE = Path(__file__).resolve().parent
norm = lambda s: re.sub(r"[\s*`「」<>.]", "", s)

def concl(md):
    out = {}
    for m in re.finditer(r"##\s*문의\s*(\d+)(.*?)(?=##\s*문의\s*\d+|\Z)", md, re.S):
        c = re.search(r"결론\s*[:：]\s*([^\n]+)", m.group(2)); out[int(m.group(1))] = norm(c.group(1)) if c else ""
    return out

def grade(s, key, md):
    if s == "8":
        g = lambda lab: (re.search(lab + r"\s*[:：]\s*([^\n]+)", md) or [None, ""])[1]
        cause = g("주원인"); num = lambda t: (re.findall(r"\d+", t) or ["-1"])[0]
        ok = all(re.search(p, cause) for p in key["주원인"])
        price = norm(g("가격 인상이 주원인인가")).startswith(key["가격"])
        n11, n10 = num(g("11월 환불 문의")) == str(key["11월"]), num(g("10월 환불 문의")) == str(key["10월"])
        return dict(점수=f"{ok + price + n11 + n10}/4", 핵심="주원인 O" if ok else "주원인 X", 메모=cause[:60])
    if s == "9":
        hit, miss = 0, []
        for lab, p in key.items():
            good = not re.search(p[4:], md) if p.startswith("NOT:") else bool(re.search(p, md, re.M))
            hit += good
            if not good: miss.append(lab)
        return dict(점수=f"{hit}/{len(key)}", 핵심=f"쟁점 {hit}/{len(key)}", 메모=" · ".join(miss))
    a = concl(md); ok = 0; core = core_n = 0; wrong = []
    for n, v in key.items():
        want = v["정답"]; flag = v.get("얽힘") or v.get("함정"); got = a.get(int(n), "")
        hit = got.startswith(norm(want)); ok += hit
        if flag: core_n += 1; core += hit
        if not hit: wrong.append(f"{n}:{got or '-'}≠{want}")
    return dict(점수=f"{ok}/{len(key)}", 핵심=f"{'얽힘' if s == '10' else '함정'} {core}/{core_n}", 메모=" ".join(wrong)[:120])

rows = []
for sd in sorted((p for p in W.iterdir() if p.is_dir()), key=lambda p: int(p.name[1:])):
    s = sd.name[1:]; key = json.load(open(HERE / f"소재{s}" / "정답.json", encoding="utf-8"))
    for m in ["single", "sub", "team"]:
        for rd in sorted((sd / m).glob("run*")):
            fin = rd / "답변" / "최종.md"
            g = grade(s, key, fin.read_text(encoding="utf-8")) if fin.exists() else dict(점수="-", 핵심="최종.md 없음", 메모="")
            agents = sends = 0; cost = 0.0
            sp = rd / "stream.jsonl"
            if sp.exists():
                for l in sp.open(encoding="utf-8"):
                    try: d = json.loads(l)
                    except Exception: continue
                    if d.get("type") == "assistant":
                        for c in d["message"].get("content", []):
                            if c.get("type") == "tool_use":
                                if c["name"] in ("Agent", "Task"): agents += 1
                                if c["name"] == "SendMessage" and c["input"].get("to") not in ("main", None): sends += 1
                    if d.get("type") == "result": cost = max(cost, d.get("total_cost_usd") or 0)
            wall = int((rd / "wall.txt").read_text()) if (rd / "wall.txt").exists() else -1
            rows.append(dict(소재=s, 방식=m, run=rd.name, **g, 초=wall, 비용=round(cost, 2), 에이전트=agents, 쪽지=sends))
for r in rows: print(" | ".join(str(v) for v in r.values()))
(W / "결과_ad.json").write_text(json.dumps(rows, ensure_ascii=False, indent=1), encoding="utf-8")
