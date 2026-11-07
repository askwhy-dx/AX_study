"""script.json 의 ① 서브 · ② 팀 장면을 칸 화면(tmux 처럼: 왼쪽 메인 · 오른쪽 담당마다 한 칸)으로 바꾼 script_panes.json 을 만든다.
칸에 찍히는 줄 = 실측 기록(logs/events_sub.json = 11-07 서브 · logs/events_team.json = 11-06 팀)에서 옮긴 것(긴 말은 줄임).
실행: py -3.12 make_script_panes.py → py -3.12 build_video.py script_panes.json
"""
import json
from pathlib import Path
HERE = Path(__file__).resolve().parent
d = json.loads((HERE / "script.json").read_text(encoding="utf-8"))
d["id"] = "adv2_sub_vs_team_panes"
d["source"] += " · 칸 화면판(11-07) = logs/events_sub.json(세션 5cc8c7e6) · events_team.json(세션 2e4abc40)"

SUB = {"id": "s1", "visual": {"type": "panes", "mode": "sub", "title": "① 서브 에이전트 — 메인이 옮긴다", "note": "11-07 실측 · 오른쪽 두 칸은 서로 말할 수 없다",
    "panes": [{"id": "메인", "label": "main", "role": "나와 대화하는 Claude", "color": "gray"},
              {"id": "cs-reply", "label": "cs-reply", "role": "응대 담당", "color": "blue"},
              {"id": "검산", "label": "checker", "role": "검산 담당", "color": "magenta"}]},
  "steps": [
    {"say": "서브 에이전트입니다. 왼쪽이 메인, 오른쪽 두 칸이 응대 담당과 검산 담당입니다."},
    {"say": "메인이 응대 담당에게, 옛 규정으로 답변을 쓰라고 일을 줍니다.", "focus": ["메인", "cs-reply"],
     "ev": [["메인", "[전달] 메인 → cs-reply : 응대규정_옛판.md 로 문의 15건 답변을 써 줘"], ["cs-reply", "✉ ← 메인  응대규정_옛판.md 기준으로 문의 15건 답변 초안을 써 주세요"]]},
    {"say": "응대 담당이 문의와 옛 규정을 읽고 답변 파일을 씁니다.", "focus": ["cs-reply"],
     "ev": [["cs-reply", "● Read(문의.txt)"], ["cs-reply", "● Read(응대규정_옛판.md)"], ["cs-reply", "● Write(답변_서브.md)"]]},
    {"say": "다 쓰면 결과는 메인에게 돌아갑니다. 검산 담당에게 직접 말할 수는 없습니다.", "focus": ["메인", "cs-reply"],
     "ev": [["cs-reply", "↩ 메인에게 보고: 답변_서브.md 저장"], ["메인", "[전달] cs-reply → 메인 : 답변_서브.md 저장 · 옛판 규정으로 15건 작성 완료"]]},
    {"say": "메인이 그 파일을 검산 담당에게 넘깁니다.", "focus": ["메인", "검산"],
     "ev": [["메인", "[전달] 메인 → 검산 : 답변_서브.md 를 응대규정.md 와 문의마다 대조해 줘"], ["검산", "✉ ← 메인  답변_서브.md 를 현행 규정과 문의마다 대조하세요"]]},
    {"say": "검산 담당이 문의, 현행 규정, 답변 파일을 읽고 대조합니다.", "focus": ["검산"],
     "ev": [["검산", "● Read(문의.txt)"], ["검산", "● Read(응대규정.md)"], ["검산", "● Read(답변_서브.md)"]]},
    {"say": "문의 4번, 9번, 13번이 다르다는 결과도, 응대 담당이 아니라 메인에게 갑니다.", "focus": ["메인", "검산"],
     "ev": [["검산", "↩ 메인에게 보고: 문의 4 · 9 · 13 다름"], ["메인", "[전달] 검산 → 메인 : 문의 4 · 9 · 13 다름 — 보강 월 2회 · 7일 안 미개봉 교재 환불 · 반 변경 마감 25일"]]},
    {"say": "그래서 메인이 그 말을 응대 담당에게 다시 옮깁니다.", "focus": ["메인", "cs-reply"],
     "ev": [["메인", "[전달] 메인 → cs-reply : 문의 4 · 9 · 13 을 현행 규정으로 고쳐 줘"], ["cs-reply", "✉ ← 메인  검산 결과 문의 4 · 9 · 13 이 현행 규정과 다릅니다. 고쳐 주세요"]]},
    {"say": "응대 담당이 고친 파일을 새로 저장하고, 다시 메인에게 알립니다.", "focus": ["메인", "cs-reply"],
     "ev": [["cs-reply", "● Read(답변_서브.md)"], ["cs-reply", "● Read(응대규정.md)"], ["cs-reply", "● Write(답변_서브_v2.md)"],
            ["메인", "[전달] cs-reply → 메인 : 답변_서브_v2.md 저장"]]},
    {"say": "오른쪽 두 칸은 서로 한 번도 말하지 않았습니다. 모든 말이 왼쪽 메인을 거쳤고, 메인이 세 번 옮겼습니다.", "focus": ["메인"]},
  ]}

TEAM = {"id": "s2", "visual": {"type": "panes", "mode": "team", "title": "② 에이전트 팀 — 담당끼리 직접", "note": "11-06 실측 · 메인은 [참관] 사본만 받는다",
    "panes": [{"id": "메인", "label": "main", "role": "보기만 한다", "color": "gray"},
              {"id": "replier", "label": "replier", "role": "응대 담당", "color": "blue"},
              {"id": "policy", "label": "policy", "role": "규정 담당", "color": "green"},
              {"id": "parent", "label": "parent", "role": "학부모 관점", "color": "yellow"}]},
  "steps": [
    {"say": "이번에는 에이전트 팀입니다. 오른쪽 세 칸이 응대, 규정, 학부모 관점 담당이고, 왼쪽 메인은 사본만 받습니다."},
    {"say": "세 명이 동시에 일을 받고, 각자 필요한 파일을 읽습니다.", "focus": ["replier", "policy", "parent"],
     "ev": [["replier", "✉ ← team-lead  너는 replier(응대 담당)다. 옛 규정으로 15건을 써라"], ["replier", "● Read(문의.txt)"], ["replier", "● Read(응대규정_옛판.md)"],
            ["policy", "✉ ← team-lead  너는 policy(규정 담당)다"], ["policy", "● Read(응대규정.md)"], ["policy", "● Read(문의.txt)"],
            ["parent", "✉ ← team-lead  너는 parent(학부모 관점 담당)다"], ["parent", "● Read(문의.txt)"]]},
    {"say": "응대 담당이 답변을 저장하고, 규정 담당과 학부모 담당에게 직접 쪽지를 보냅니다. 메인에게는 사본이 갑니다.", "focus": ["replier", "policy", "parent"],
     "ev": [["replier", "● Write(팀.md)"], ["replier", "✉ → policy  답변\\팀.md 저장했습니다. 현행 규정과 대조해 주세요"],
            ["replier", "✉ → parent  학부모 입장에서 말투를 봐 주세요(최대 3개)"],
            ["policy", "✉ ← replier  답변\\팀.md 저장했습니다. 대조해 주세요"], ["parent", "✉ ← replier  말투를 봐 주세요"],
            ["메인", "[참관] replier → policy : 답변\\팀.md 저장했다, 현행 규정과 대조해 달라"], ["메인", "[참관] replier → parent : 학부모 입장에서 말투를 봐 달라"]]},
    {"say": "규정 담당이 4번, 9번, 13번을 찾아, 메인을 거치지 않고 응대 담당에게 바로 돌려보냅니다.", "focus": ["policy", "replier"],
     "ev": [["policy", "● Read(팀.md)"], ["policy", "✉ → replier  다른 문의는 4 · 9 · 13 세 건입니다. 나머지 12건은 맞습니다"],
            ["replier", "✉ ← policy  다른 문의는 4 · 9 · 13 세 건입니다"],
            ["메인", "[참관] policy → replier : 다른 문의는 4(보강 월 2회) · 9(7일 안 미개봉 환불) · 13(마감 25일)"]]},
    {"say": "학부모 담당은 말투를 부드럽게 바꿀 문장 세 개를 응대 담당에게 직접 제안합니다.", "focus": ["parent", "replier"],
     "ev": [["parent", "● Read(팀.md)"], ["parent", "✉ → replier  고칠 문장 3개 제안(규정 내용은 그대로, 말투만)"],
            ["replier", "✉ ← parent  고칠 문장 3개 제안"],
            ["메인", "[참관] parent → replier : 말투 수정 3건 제안(문의 9 · 14 · 4), 규정 내용은 그대로"]]},
    {"say": "응대 담당이 고쳐서 다시 저장하고, 규정 담당에게 재확인을 부탁합니다.", "focus": ["replier", "policy"],
     "ev": [["replier", "● Write(팀.md)"], ["replier", "✉ → policy  4 · 9 · 13 고쳐 다시 저장했습니다. 재확인 부탁"],
            ["policy", "✉ ← replier  4 · 9 · 13 고쳐 다시 저장했습니다"],
            ["메인", "[참관] replier → policy : 문의 4·9·13 현행 규정대로 고쳐 다시 저장했다, 재확인 요청"]]},
    {"say": "규정 담당이 열다섯 건 모두 맞다고 답하고, 메인에게 최종 보고를 보냅니다.", "focus": ["policy", "replier", "메인"],
     "ev": [["policy", "● Read(팀.md)"], ["policy", "✉ → replier  15건 모두 현행 규정과 맞습니다. 더 고칠 것 없습니다"],
            ["policy", "✉ → main  [최종 보고] 처음 4 · 9 · 13 다름 → 고친 뒤 15건 모두 일치"],
            ["replier", "✉ ← policy  15건 모두 맞습니다"],
            ["메인", "[참관] policy → replier : 재대조 결과 15건 모두 현행 규정과 일치"]]},
    {"say": "이번에는 메인이 옮긴 말이 한 번도 없습니다. 담당끼리 직접 주고받았고, 메인은 사본만 받았습니다.", "focus": ["메인"]},
  ]}

d["scenes"] = [SUB if s["id"] == "s1" else TEAM if s["id"] == "s2" else s for s in d["scenes"]]
(HERE / "script_panes.json").write_text(json.dumps(d, ensure_ascii=False, indent=1), encoding="utf-8")
print("ok")
