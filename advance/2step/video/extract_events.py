"""실측 세션 기록 → 담당별 동작을 시간순으로 뽑는다(영상 칸 화면 대본 재료).
사용: py -3.12 extract_events.py <세션 id> <출력.json>
메인 = [전달] · [참관] 줄 · 서브/팀원 = 받은 말 · 도구 · 보낸 쪽지 · 마지막 보고
"""
import json, re, sys
from pathlib import Path
sys.stdout.reconfigure(encoding="utf-8")
PROJ = Path.home() / ".claude" / "projects" / "C--Users-User-Desktop-test-AX-study-advance-2step-adv2-demo-cs-practice"
sid, out = sys.argv[1], sys.argv[2]
ev = []
def cut(s, n=90):
    s = re.sub(r"\s+", " ", str(s)).strip(); return s if len(s) <= n else s[: n - 1] + "…"
for l in (PROJ / f"{sid}.jsonl").open(encoding="utf-8"):
    d = json.loads(l)
    if d.get("type") == "assistant" and not d.get("isSidechain"):
        for c in d["message"].get("content", []):
            if c.get("type") == "text":
                for ln in c["text"].splitlines():
                    ln = ln.strip().strip("`")
                    if ln.startswith("[전달]") or ln.startswith("[참관]"): ev.append((d["timestamp"], "메인", "line", ln))
seen = set()
for meta in sorted((PROJ / sid / "subagents").glob("*.meta.json")):
    m = json.loads(meta.read_text(encoding="utf-8"))
    who = m.get("name") or ("검산" if m["agentType"] == "general-purpose" else m["agentType"])
    for l in meta.with_name(meta.name.replace(".meta.json", ".jsonl")).open(encoding="utf-8"):
        d = json.loads(l); c = d.get("message", {}).get("content"); ts = d.get("timestamp", "")
        if d.get("type") == "user" and isinstance(c, str):
            mm = re.search(r'teammate_id="([^"]+)"[^>]*>([\s\S]*?)</teammate-message>', c)
            if mm: ev.append((ts, who, "recv", f"✉ ← {mm.group(1)} {cut(mm.group(2))}"))
            elif d.get("parentUuid") is None: ev.append((ts, who, "recv", f"✉ ← 메인 {cut(c)}"))
        if d.get("type") == "assistant" and isinstance(c, list):
            for x in c:
                if x.get("type") == "tool_use":
                    i = x["input"]
                    if x["name"] == "SendMessage":
                        ev.append((ts, who, "send", f"✉ → {i.get('to')} {cut(i.get('message') or i.get('content') or '')}"))
                    elif x["name"] in ("Read", "Write", "Edit"):
                        ev.append((ts, who, "tool", f"● {x['name']}({Path(i.get('file_path', '')).name})"))
for e in sorted(ev):
    print(e[0][11:19], e[1], e[3][:110])
json.dump([dict(t=e[0], who=e[1], kind=e[2], text=e[3]) for e in sorted(ev)], open(out, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
