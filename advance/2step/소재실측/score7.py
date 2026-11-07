"""소재 7 채점: 심은 오류 100개 중 찾은 수 · 유형별 놓침 · 오류 아닌 줄 · 시간 · 비용 · 쪽지.
사용: py -3.12 score7.py <작업폴더(s7 을 담은)>
"""
import collections, json, re, sys
from pathlib import Path
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
W = Path(sys.argv[1]) / "s7"; HERE = Path(__file__).resolve().parent
key = json.load(open(HERE / "소재7" / "정답.json", encoding="utf-8"))
total = sum(len(v) for v in key.values())
for m in ["single", "sub", "team"]:
    for rd in sorted((W / m).glob("run*")):
        f = rd / "결과" / "오류목록.md"; t = f.read_text(encoding="utf-8") if f.exists() else ""
        rep = {(f"반{int(a):02d}.md", int(b)) for a, b in re.findall(r"반\s*(\d+)(?:\.md)?\D{0,12}?L(\d+)", t)}
        hit, miss = 0, collections.Counter()
        good = set()
        for doc, errs in key.items():
            for s, v in errs.items():
                good |= {(doc, l) for l in v["줄"]}
                if any((doc, l) in rep for l in v["줄"]): hit += 1
                else: miss[v["유형"]] += 1
        extra = len(rep - good)
        docs = len({d for d, _ in rep})
        sends = 0; cost = 0.0
        sp = rd / "stream.jsonl"
        if sp.exists():
            for l in sp.open(encoding="utf-8"):
                try: d = json.loads(l)
                except Exception: continue
                if d.get("type") == "assistant":
                    for c in d["message"].get("content", []):
                        if c.get("type") == "tool_use" and c["name"] == "SendMessage" and c["input"].get("to") not in ("main", None): sends += 1
                if d.get("type") == "result": cost = max(cost, d.get("total_cost_usd") or 0)
        wall = (rd / "wall.txt").read_text().strip() if (rd / "wall.txt").exists() else "?"
        print(f"{m} | {rd.name} | 찾음 {hit}/{total} | 놓침 {dict(miss)} | 오류아닌줄 {extra} | 다룬 편 {docs}/20 | {wall}초 | {cost:.2f} USD | 쪽지 {sends}")
