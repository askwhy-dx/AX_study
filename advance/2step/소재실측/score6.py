"""소재 6 채점: 심은 오류 21개 중 찾은 수 · 놓친 오류 · 오류가 아닌데 적은 줄 · 시간 · 비용 · 쪽지.
사용: py -3.12 score6.py <작업폴더(s6 를 담은)>
"""
import json, re, sys
from pathlib import Path
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
W = Path(sys.argv[1]) / "s6"; HERE = Path(__file__).resolve().parent
key = json.load(open(HERE / "소재6" / "정답.json", encoding="utf-8"))
good = {l for v in key.values() for l in v["줄"]}
rows = []
for m in ["single", "sub", "team"]:
    for rd in sorted((W / m).glob("run*")):
        f = rd / "결과" / "오류목록.md"; t = f.read_text(encoding="utf-8") if f.exists() else ""
        lines = {int(x) for x in re.findall(r"^\s*[-*]?\s*\**L(\d+)", t, re.M)}
        hit = [k for k, v in key.items() if lines & set(v["줄"])]
        miss = [k for k in key if k not in hit]
        extra = sorted(lines - good)
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
        r = dict(방식=m, run=rd.name, 찾음=f"{len(hit)}/{len(key)}", 놓침=" ".join(miss), 오류아닌줄=len(extra), 초=wall, 비용=round(cost, 2), 쪽지=sends)
        rows.append(r); print(" | ".join(str(v) for v in r.values()))
(W.parent / "결과6.json").write_text(json.dumps(rows, ensure_ascii=False, indent=1), encoding="utf-8")
