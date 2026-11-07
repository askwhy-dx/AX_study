"""소재 7 — 반별 가정통신문 20편(편마다 오류 5개 · 모두 100개) 검토. 양이 많을 때 결과물 질이 갈리나.
실행: py -3.12 make_data7.py → 소재7/통신문/반01.md~반20.md · 응대규정.md · 과제.md · 정답.json
"""
import json, random, shutil
from datetime import date
from pathlib import Path
HERE = Path(__file__).resolve().parent
WD = "월화수목금토일"
def dt(y, m, dd, wrong=False):
    w = date(y, m, dd).weekday() + (1 if wrong else 0)
    return f"{m}월 {dd}일({WD[w % 7]})"
def won(x): return f"{x:,}원"
CLASSES = ["사랑", "믿음", "소망", "하늘", "바다", "숲", "별", "달", "해", "구름", "봄", "여름", "가을", "겨울", "새싹", "열매", "나무", "꽃", "강", "산"]
SLOTS = ["D1", "D2", "D3", "C1", "C2", "C3", "C4", "C5", "M1", "M2", "M3", "M4", "M5", "P1", "P2", "R1", "R2", "R3", "R4", "S1", "S2"]
KIND = {"D": "날짜·요일", "C": "앞뒤 모순", "M": "계산", "P": "개인정보", "R": "규정 위반", "S": "맞춤법"}

def doc(k, rnd):
    on = set(rnd.sample(SLOTS, 5)); e = lambda s: s in on
    cls = CLASSES[k - 1]
    a, b, c = rnd.choice([110000, 120000, 130000]), rnd.choice([70000, 80000, 90000]), rnd.choice([140000, 150000, 160000])
    book, bus = 20000, rnd.choice([25000, 30000, 35000])
    tel = f"02-{rnd.randint(200, 899)}-{rnd.randint(1000, 9999)}"; tel_bad = tel[:-2] + tel[-1] + tel[-2]
    if tel_bad == tel: tel_bad = tel[:-1] + str((int(tel[-1]) + 1) % 10)
    eday = rnd.choice([5, 12]); room = rnd.choice(["본관 3층 세미나실", "본관 2층 강의실", "별관 1층 강당"]); room_bad = "별관 2층 강의실" if "본관" in room else "본관 3층 세미나실"
    hour = rnd.choice(["오전 10시", "오전 11시"]); hour_bad = "오후 2시"
    test_d, start_d, end_d = rnd.choice([3, 9, 10, 16]), rnd.choice([28, 29]), rnd.choice([22, 21])
    sc = [rnd.randint(70, 99) for _ in range(5)]; avg = round(sum(sc) / 5, 1)
    sc2 = [rnd.randint(80, 99) for _ in range(4)]; avg2 = round(sum(sc2) / 4, 1)
    sib = int(a * 0.9)
    L = []  # (text, slot)
    def add(t, s=None): L.append((t, s if s and e(s) else None))
    add(f"# 가상 수학교실 {cls}반 12월 가정통신문")
    add(f"발행: 2026년 11월 25일 · {cls}반 담임 · 문의 {tel}")
    add("")
    add(f"{cls}반 학부모님, 안녕하세요. 12월 일정과 겨울방학 특강을 안내드립니다.")
    add("")
    add("## 1. 12월 일정")
    add(f"- {dt(2026,12,1)} 12월 정규 수업 시작")
    add(f"- {dt(2026,12,eday)} 학부모 설명회 · {hour} · {room}")
    add(f"- {dt(2026,12,test_d, e('D1'))} 단원평가", "D1")
    add(f"- {dt(2026,12,25)} 성탄절 휴강")
    add(f"- {dt(2026,12,start_d, e('D2'))} 겨울방학 특강 시작", "D2")
    add(f"- {dt(2027,1,1)} 신정 휴강")
    add("")
    add("## 2. 학부모 설명회")
    add("- 내용: 겨울방학 학습 계획 · 3월 반 편성 · 경시대회 준비")
    add(f"- 장소: {room_bad if e('C1') else room}", "C1")
    add(f"- 시간: 12월 {eday}일 {hour_bad if e('C2') else hour}부터 약 1시간", "C2")
    add("- 참석 신청은 문자로 「설명회 참석 · 학생 이름」을 보내 주세요.")
    add("")
    add("## 3. 겨울방학 특강")
    add(f"- 기간: {dt(2026,12,start_d)} ~ {dt(2027,1,end_d)} · 4주 과정")
    add("- 시간: 오전 10시 ~ 12시 (주 5일)")
    add(f"- 수강료(4주): 사고력 {won(a)} · 연산 {won(b)} · 경시 {won(c)}")
    add(f"- 세 과목 모두 들으면 {won(a + b + c - (10000 if e('M1') else 0))}", "M1")
    add(f"- 교재비: 과목마다 {won(book)}")
    add(f"- 예시: 연산 + 경시 + 교재 두 권 = {won(b + c + 2 * book - (30000 if e('M2') else 0))}", "M2")
    add(f"- 형제 할인 10%: 동생 사고력 {won(a)} → {won(sib + (2000 if e('M3') else 0))}", "M3")
    add(f"- {'특강은 오후 1시 ~ 3시에 진행됩니다.' if e('C3') else '특강은 오전에 진행되니 늦지 않게 등원해 주세요.'}", "C3")
    add(f"- 수료식: {dt(2027,1,end_d, e('D3'))} 특강 마지막 날", "D3")
    add(f"- {'3주' if e('C4') else '4주'} 과정을 모두 마친 학생에게 수료증을 드립니다.", "C4")
    add("")
    add("## 4. 차량")
    add(f"- 차량비: 월 {won(bus)} · 12월 · 1월 두 달 합계 {won(bus * 2 - (10000 if e('M4') else 0))}", "M4")
    add("- 정류장 · 시간 변경은 담당 선생님이 운행표를 확인한 뒤 따로 연락드립니다.")
    add("")
    add("## 5. 11월 단원평가 결과")
    add(f"- 기본반 평균 {avg}점 (5명 · {' · '.join(map(str, sc))}점)")
    add(f"- 심화반 평균 {round(avg2 + (3 if e('M5') else 0), 1)}점 (4명 · {' · '.join(map(str, sc2))}점)", "M5")
    add(f"- {'이번 평가 최고점은 김하늘 학생(' + str(max(sc + sc2)) + '점)입니다.' if e('P1') else '이번 평가 최고점은 ' + str(max(sc + sc2)) + '점입니다.'}", "P1")
    add(f"- {'많이 오른 이서연 학생(76점)에게도 박수를 보냅니다.' if e('P2') else '지난번보다 오른 학생들에게도 박수를 보냅니다.'}", "P2")
    add("- 학생별 점수는 담당 선생님 상담 때 따로 안내드립니다.")
    add("")
    add("## 6. 자주 묻는 질문")
    add("- Q. 특강 중간에 그만두면?")
    add(f"  A. {'1/2 이 지나기 전이면 2/3 를 돌려드립니다.' if e('R1') else '1/3 이 지나기 전이면 2/3, 1/2 이 지나기 전이면 1/2 을 돌려드립니다.'}", "R1")
    add("- Q. 결석하면 보강이 되나요?")
    add(f"  A. 결석 하루 전까지 연락하시면 한 달에 {'1회' if e('R2') else '2회'}까지 보강해 드립니다.", "R2")
    add("- Q. 반을 바꾸고 싶어요.")
    add(f"  A. 매월 {'20일' if e('R3') else '25일'}까지 신청하시면 다음 달 1일부터 바뀝니다.", "R3")
    add("- Q. 방학 동안 쉬고 싶어요.")
    add(f"  A. 휴원은 한 번에 최대 {'3개월' if e('R4') else '2개월'}까지 할 수 있습니다.", "R4")
    add(f"- Q. 특강 신청은 {'몇일' if e('S1') else '며칠'}까지 하나요?", "S1")
    add(f"  A. 12월 17일까지 신청하시면 {'되요' if e('S2') else '돼요'}.", "S2")
    add("")
    add(f"궁금한 점은 {tel_bad if e('C5') else tel} 으로 연락 주세요.", "C5")
    errs = {}
    for i, (t, s) in enumerate(L, 1):
        if s: errs[s] = [i]
    pairs = {"C1": f"{hour} · {room}", "C2": f"{hour} · {room}", "C5": f"문의 {tel}", "C4": "4주 과정", "C3": "오전 10시 ~ 12시"}
    for s, needle in pairs.items():
        if s in errs:
            errs[s] += [i for i, (t, _) in enumerate(L, 1) if needle in t and i not in errs[s]]
    assert len(errs) == 5, (k, on, errs)
    return "\n".join(f"[L{i}] {t}" for i, (t, _) in enumerate(L, 1)) + "\n", {s: {"유형": KIND[s[0]], "줄": v} for s, v in errs.items()}

def main():
    out = HERE / "소재7"; (out / "통신문").mkdir(parents=True, exist_ok=True); rnd = random.Random(77)
    shutil.copy(HERE.parent / "adv2_demo" / "cs_practice" / "응대규정.md", out / "응대규정.md")
    key = {}
    for k in range(1, 21):
        t, errs = doc(k, rnd); name = f"반{k:02d}.md"
        (out / "통신문" / name).write_text(t, encoding="utf-8"); key[name] = errs
    (out / "정답.json").write_text(json.dumps(key, ensure_ascii=False, indent=1), encoding="utf-8")
    (out / "과제.md").write_text(
        "# 과제 — 반별 가정통신문 20편 발송 전 검토\n`통신문\\` 폴더의 반01.md ~ 반20.md 를 학부모에게 보내기 전에 **한 편도 빠짐없이** 오류를 모두 찾는다. 줄마다 `[L번호]` 가 붙어 있다. 편마다 내용(날짜 · 금액 · 장소 · 연락처)이 조금씩 다르다.\n"
        "점검할 것(6가지): ① 계산(합계 · 할인 · 평균) ② 날짜와 요일(2026~2027년 실제 달력) ③ 같은 편 안에서 앞뒤가 맞지 않는 내용(일정 · 장소 · 시간 · 연락처 · 기간) "
        "④ `응대규정.md` 와 다른 안내 ⑤ 다른 학생 이름 · 점수 같은 개인정보 ⑥ 맞춤법.\n"
        "결과는 `결과\\오류목록.md` 에 한 줄에 하나씩: `반NN.md L번호 | 유형 | 틀린 부분 → 고칠 말`. 오류가 아닌 것은 적지 않는다.\n", encoding="utf-8")
    print("ok", sum(len(v) for v in key.values()), "errors")
main()
