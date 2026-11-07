"""실측 채점: 결론 낱말 정답률 · 얽힌 문의 정답 · 시간 · 비용 · 에이전트 호출 · 팀원끼리 쪽지 수.
사용: py -3.12 score.py <작업폴더>   → 표 출력 + 결과.json
"""
import json, re, sys
from pathlib import Path
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
W = Path(sys.argv[1]); HERE = Path(__file__).resolve().parent
def norm(s): return re.sub(r"[\s*`「」<>.]", "", s)
def parse(md):
    out = {}
    for m in re.finditer(r"##\s*문의\s*(\d+)(.*?)(?=##\s*문의\s*\d+|\Z)", md, re.S):
        c = re.search(r"결론\s*[:：]\s*([^\n]+)", m.group(2))
        out[int(m.group(1))] = (norm(c.group(1)) if c else "", m.group(2))
    return out
rows = []
for s in sorted(p.name for p in W.iterdir() if p.is_dir()):
    key = {int(k): v for k, v in json.load(open(HERE / f"소재{s[1:]}" / "정답.json", encoding="utf-8")).items()}
    for m in ["single", "sub", "team"]:
        for rd in sorted((W / s / m).glob("run*")):
            fin = rd / "답변" / "최종.md"
            ans = parse(fin.read_text(encoding="utf-8")) if fin.exists() else {}
            ok = linked_ok = linked_n = 0; wrong = []
            for n, v in key.items():
                want = v["정답"] if isinstance(v, dict) else v
                got = ans.get(n, ("", ""))[0]
                hit = got.startswith(norm(want)) or norm(want) == got
                ok += hit
                if not hit: wrong.append(f"{n}:{got or '-'}≠{want}")
                if isinstance(v, dict) and v.get("얽힘"):
                    linked_n += 1; linked_ok += hit
            agents = sends = 0; cost = 0.0; dur = 0
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
                    if d.get("type") == "result":
                        cost = max(cost, d.get("total_cost_usd") or 0)  # ponytail: 결과가 여러 번 오면 누적값이라 가정 — 최댓값
            wall = int((rd / "wall.txt").read_text()) if (rd / "wall.txt").exists() else -1
            rows.append(dict(소재=s, 방식=m, run=rd.name, 정답=f"{ok}/{len(key)}", 얽힘=f"{linked_ok}/{linked_n}" if linked_n else "",
                             초=wall, 비용=round(cost, 2), 에이전트=agents, 팀원쪽지=sends, 틀림=" ".join(wrong)[:200], 최종=fin.exists()))
for r in rows: print(" | ".join(str(v) for v in r.values()))
(W / "결과.json").write_text(json.dumps(rows, ensure_ascii=False, indent=1), encoding="utf-8")
