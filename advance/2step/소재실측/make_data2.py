"""소재 4 (오래 걸리는 작업 9개 · 병렬) · 소재 5 (셋이 나눠 만드는 프로그램 · 맞물림) 데이터.
실행: py -3.12 make_data2.py
"""
import json, random
from pathlib import Path
HERE = Path(__file__).resolve().parent

# ---------- 소재 4 ----------
ANALYZE = r"""// 기사 하나를 분석한다(일부러 40초 걸린다 — 실제로는 무거운 계산 · 외부 조회라고 생각한다)
// 사용: node analyze.js 기사/기사1.txt
const fs = require('fs');
const f = process.argv[2]; const t = fs.readFileSync(f, 'utf8');
const words = t.split(/\s+/).filter(Boolean);
const freq = {}; for (const w of words) if (w.length >= 2) freq[w] = (freq[w] || 0) + 1;
const top = Object.entries(freq).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, 3).map(x => x[0]);
const code = [...t].reduce((s, c) => (s * 31 + c.charCodeAt(0)) % 9973, 7);
setTimeout(() => console.log(JSON.stringify({ file: f, 낱말수: words.length, 많이나온말: top, 검증코드: code })), 40000);
"""
TOPICS = ["학원 차량 안전", "겨울방학 특강", "수학 경시대회", "교재 개편", "학부모 설명회", "온라인 숙제 앱", "강사 연수", "새 교실 개관", "장학금 제도"]
def s4():
    out = HERE / "소재4"; (out / "기사").mkdir(parents=True, exist_ok=True); rnd = random.Random(4)
    (out / "analyze.js").write_text(ANALYZE, encoding="utf-8")
    fill = "학생 학부모 수업 선생님 안내 일정 신청 이번 다음 운영 준비 확인 결과 계획 참여".split()
    key = {}
    for i, tp in enumerate(TOPICS, 1):
        body = " ".join([tp] * (3 + i % 3) + rnd.choices(fill, k=60 + 7 * i))
        (out / "기사" / f"기사{i}.txt").write_text(f"{tp} 소식\n{body}\n", encoding="utf-8")
    (out / "과제.md").write_text(
        "# 과제\n`기사\\` 폴더의 기사 9개를 하나씩 분석한다.\n"
        "- 기사마다 `node analyze.js 기사\\기사N.txt` 를 실행한다(한 번에 약 40초).\n"
        "- 그 출력(낱말수 · 많이나온말 · 검증코드)을 그대로 옮기고, 기사 내용을 한 줄로 요약한다.\n"
        "- 결과는 `결과\\최종.md` 에 「## 기사N」 → 「낱말수: …」 「많이나온말: …」 「검증코드: …」 「요약: …」 순서로 쓴다.\n", encoding="utf-8")

# ---------- 소재 5 ----------
def s5():
    out = HERE / "소재5"; out.mkdir(exist_ok=True); rnd = random.Random(5)
    names = ["김하늘", "이서연", "박지민", "최유나", "정미래", "한소라", "오세진", "윤가람", "장하린", "서지후", "강도윤", "조은우"]
    rows, key = [], {}
    for n in names:
        s = [rnd.randint(55, 100) for _ in range(3)]; rows.append(f"{n},{s[0]},{s[1]},{s[2]}")
        avg = round(sum(s) / 3, 1); g = "A" if avg >= 90 else "B" if avg >= 80 else "C" if avg >= 70 else "D"
        key[n] = {"평균": avg, "등급": g}
    (out / "scores.csv").write_text("이름,국어,수학,영어\n" + "\n".join(rows) + "\n", encoding="utf-8")
    (out / "정답.json").write_text(json.dumps(key, ensure_ascii=False, indent=1), encoding="utf-8")
    (out / "과제.md").write_text(
        "# 과제 — 성적표 프로그램\n`scores.csv`(이름 · 국어 · 수학 · 영어)를 읽어 학생별 평균(소수 첫째 자리 반올림)과 등급"
        "(90 이상 A · 80 이상 B · 70 이상 C · 나머지 D)을 매기고 `report.html` 표로 만든다. `node main.js` 한 번으로 report.html 이 생겨야 한다.\n"
        "세 부분으로 나뉜다(Node.js · 외부 패키지 없이):\n", encoding="utf-8")
    parts = {
        "A": "## 부분 A — 읽기 (`parse.js`)\n`scores.csv` 를 읽어 학생 목록을 돌려주는 함수를 만든다.\n",
        "B": "## 부분 B — 계산 (`grade.js`)\n학생 목록을 받아 학생마다 평균과 등급을 붙여 돌려주는 함수를 만든다.\n",
        "C": "## 부분 C — 화면 · 조립 (`render.js` · `main.js`)\n평균 · 등급이 붙은 학생 목록으로 `report.html`(표: 이름 · 국어 · 수학 · 영어 · 평균 · 등급)을 만드는 함수와, A → B → C 를 차례로 불러 report.html 을 저장하는 `main.js` 를 만든다.\n",
    }
    for k, v in parts.items(): (out / f"부분_{k}.md").write_text(v, encoding="utf-8")
    with open(out / "과제.md", "a", encoding="utf-8") as f:
        f.write("\n".join(parts.values()))
    (out / "check.js").write_text(r"""// report.html 이 정답과 맞는지 본다(채점용 · 작업자에게 보여 주지 않는다)
const fs = require('fs'); const key = JSON.parse(fs.readFileSync(process.argv[3], 'utf8'));
let h = ''; try { h = fs.readFileSync(process.argv[2], 'utf8'); } catch { console.log(JSON.stringify({ ok: 0, n: Object.keys(key).length, why: 'report.html 없음' })); process.exit(); }
let ok = 0; const bad = [];
for (const [n, v] of Object.entries(key)) {
  const row = (h.split(/<tr/i).find(r => r.includes(n)) || '').replace(/<[^>]+>/g, ' ');
  const nums = row.match(/\d+(\.\d+)?/g) || [];
  const hasAvg = nums.some(x => Math.abs(parseFloat(x) - v.평균) < 0.051); const hasG = new RegExp('\\b' + v.등급 + '\\b').test(row);
  if (hasAvg && hasG) ok++; else bad.push(n);
}
console.log(JSON.stringify({ ok, n: Object.keys(key).length, bad }));
""", encoding="utf-8")

s4(); s5(); print("ok")
