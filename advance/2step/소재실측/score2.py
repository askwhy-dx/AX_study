"""소재 4 · 5 채점. 사용: py -3.12 score2.py <작업폴더>
4 = 검증코드가 analyze.js 실제 출력과 맞는 기사 수 · 시간 / 5 = 첫 실행 결과 · check.js 통과 수 · 메인이 직접 고친 횟수
"""
import json, re, subprocess, sys
from pathlib import Path
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
W = Path(sys.argv[1]); HERE = Path(__file__).resolve().parent
# 소재4 정답 = analyze.js 의 계산을 기다림 없이 그대로
TRUE4 = json.loads(subprocess.run(["node", "-e", r"""
const fs=require('fs'),p=require('path');const d=process.argv[1];const o={};
for(let i=1;i<=9;i++){const t=fs.readFileSync(p.join(d,'기사'+i+'.txt'),'utf8');o[i]=[...t].reduce((s,c)=>(s*31+c.charCodeAt(0))%9973,7);}
console.log(JSON.stringify(o));""", str(HERE / "소재4" / "기사")], capture_output=True, text=True, encoding="utf-8").stdout)

def stream_stats(sp):
    agents = sends = main_edits = 0; cost = 0.0
    if not sp.exists(): return agents, sends, main_edits, cost
    for l in sp.open(encoding="utf-8"):
        try: d = json.loads(l)
        except Exception: continue
        if d.get("type") == "assistant":
            top = d.get("parent_tool_use_id") is None
            for c in d["message"].get("content", []):
                if c.get("type") != "tool_use": continue
                if c["name"] in ("Agent", "Task"): agents += 1
                if c["name"] == "SendMessage" and c["input"].get("to") not in ("main", None): sends += 1
                if top and c["name"] in ("Write", "Edit") and str(c["input"].get("file_path", "")).endswith(".js"): main_edits += 1
        if d.get("type") == "result": cost = max(cost, d.get("total_cost_usd") or 0)
    return agents, sends, main_edits, cost

for s in sorted(p.name for p in W.iterdir() if p.is_dir()):
    for m in ["single", "sub", "team"]:
        for rd in sorted((W / s / m).glob("run*")):
            agents, sends, main_edits, cost = stream_stats(rd / "stream.jsonl")
            wall = (rd / "wall.txt").read_text().strip() if (rd / "wall.txt").exists() else "?"
            if s == "s4":
                f = rd / "결과" / "최종.md"; t = f.read_text(encoding="utf-8") if f.exists() else ""
                ok = 0
                for m2 in re.finditer(r"##\s*기사\s*(\d+)(.*?)(?=##\s*기사|\Z)", t, re.S):
                    c = re.search(r"검증코드\s*[:：]\s*\**\s*(\d+)", m2.group(2))
                    ok += bool(c and int(c.group(1)) == TRUE4.get(m2.group(1)))
                print(f"s4 | {m} | {rd.name} | 검증코드 {ok}/9 | {wall}초 | {cost:.2f} USD | 에이전트 {agents} | 쪽지 {sends}")
            else:
                first = (rd / "결과" / "첫실행.txt").read_text(encoding="utf-8").strip().splitlines()[:1] if (rd / "결과" / "첫실행.txt").exists() else ["(없음)"]
                chk = subprocess.run(["node", str(HERE / "소재5" / "check.js"), str(rd / "report.html"), str(HERE / "소재5" / "정답.json")], capture_output=True, text=True, encoding="utf-8").stdout.strip()
                print(f"s5 | {m} | {rd.name} | 첫실행: {first[0][:70]} | 최종 {chk} | {wall}초 | {cost:.2f} USD | 에이전트 {agents} | 쪽지 {sends} | 메인이 js 고침 {main_edits}")
