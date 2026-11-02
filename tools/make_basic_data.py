"""basic 실습 데이터 · 정답표를 만든다.
python make_basic_data.py <직영통합_export_YYYYMMDDhhmm.csv> [뽑은날 YYYYMMDD]
  -> basic/1step/handout/직영_실습데이터.csv  (뽑은 날 직전 3개월 + 1년 전 같은 3개월만 거른다 · 열 · 값은 원본 그대로)
  -> basic/1step/handout/정답표.txt · 열사전.txt 첫 줄(기간 · 뽑은 날)
연도를 박아 두지 않는다(10-03 사용자: 내년에도 쓰게). 기준은 **뽑은 날** — 파일 이름의 날짜, 없으면 두 번째 인자.
  · 달 = 뽑은 날이 속한 달의 직전 3개월 · 그 1년 전 같은 3개월 (2026-10-02 → 202607~09 · 202507~09)
  · 학년치환 = 학년 열은 뽑은 날의 학년이다. 학년은 매년 1월 1일에 바뀐다(10-03 사용자).
    편성년월 연도가 뽑은 날 연도보다 N 해 앞이면 N 학년 내린다
  · 센터 = 올해 쪽 3개월에 있는 센터만 (대시보드 「전년」 과 같은 기준)
10-05 사용자: 개인정보를 가린다고 삭제 · 변환하지 않는다 — 학생명 · 교사명 · 학생코드를 원본 그대로 둔다.
정의는 basic/1step/basic_1step_기획.html §5-1 (과목수 = 사용자 제공 CASE 식, 09-30).
첫 열은 행번호(no)다 — BOM 이 붙는 첫 열을 아무도 쓰지 않게 하려는 것(BOM 때문에 첫 열 이름이 깨지는 사고 이력)."""
import csv, collections, os, re, sys
sys.stdout.reconfigure(encoding='utf-8')
SRC = sys.argv[1]
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, '..', 'basic', '1step', 'handout')
m_ = re.search(r'(20\d{6})', os.path.basename(SRC))
SNAP = sys.argv[2] if len(sys.argv) > 2 else (m_.group(1) if m_ else None)
if not SNAP:
    raise SystemExit('뽑은 날을 알 수 없다 — 파일 이름에 YYYYMMDD 가 없으면 두 번째 인자로 준다')
SY, SM = int(SNAP[:4]), int(SNAP[4:6])


def ym_add(y, m, k):
    n = y * 12 + (m - 1) + k
    return n // 12, n % 12 + 1


NOW3 = [f'{y}{m:02d}' for y, m in (ym_add(SY, SM, -k) for k in (3, 2, 1))]
PREV3 = [f'{int(x[:4]) - 1}{x[4:]}' for x in NOW3]
MONTHS = PREV3 + NOW3
LAST = NOW3[-1]


def ay(y, m):
    return y  # 학년은 1월 1일에 바뀐다 (10-03 사용자 · 옛 「3월에 바뀜」 폐기)


CUR_AY = int(NOW3[-1][:4])  # 10-03: 기준 연도 = 데이터의 가장 최근 편성년월 연도 (카드 13 과 같은 규칙)
EXCL = ['셔틀', '차량', '주도', '클리', '유형별', '실험복', '가방', '클린업', '무료']  # 10-03: 클리닉 → 클리(클리커 연구소도 빠짐 · 직영 대시보드와 같은 기준)
DAYS = {'월', '화', '수', '목', '금', '토', '일'}
ORDER = [f'유치{i}' for i in range(1, 8)] + [f'초등{i}' for i in range(1, 7)] + [f'중등{i}' for i in range(1, 4)] + [f'고등{i}' for i in range(1, 4)]


def course_key(r):
    """사용자 제공 CASE 식 그대로. 해당 없으면 None."""
    ok = r['학급수강상태'] == '수강' or (r['학급수강상태'] == '이수' and r['이동'] != '이동-')
    if not ok:
        return None
    if r['요일'] == '요일':  # 10-02: 날짜 특강은 시작 · 종료시간까지 (직영 대시보드와 같은 기준)
        return r['COLC'] + r['요일'] + r['시작시간'] + r['종료시간']
    if r['요일'] in DAYS:
        return r['COLC'] + r['요일'] + r['시작시간']
    return None


def student_ok(r):
    """과목수와 같은 행(수강 + 반이동 아닌 이수). 10-02 직영 대시보드에 맞춤."""
    return r['학급수강상태'] == '수강' or (r['학급수강상태'] == '이수' and r['이동'] != '이동-')


def excluded(r):
    return any(k in r['프로그램명'] for k in EXCL)


def grade(raw, ym):
    g = raw.strip()
    if not g:
        return '없음'
    if g.startswith('유치유치'):
        g = '유치' + g[4:]
    if g == '초등유아7':
        g = '유치7'
    shift = CUR_AY - ay(int(ym[:4]), int(ym[4:]))
    i = ORDER.index(g) - shift
    return ORDER[i] if i >= 0 else '없음'


rows = [r for r in csv.DictReader(open(SRC, encoding='utf-8-sig')) if r['편성년월'] in MONTHS]
# 올해 쪽 달에 있는 센터만 둔다 (직영 대시보드처럼 전년도 올해 센터 기준 · 2026-10 판에서는 방배본원이 빠졌다)
LIVE = {r['센터명'] for r in rows if r['편성년월'] in NOW3}
rows = [r for r in rows if r['센터명'] in LIVE]
cols = ['no'] + list(rows[0].keys())
with open(os.path.join(OUT, '직영_실습데이터.csv'), 'w', encoding='utf-8-sig', newline='') as f:
    w = csv.writer(f)
    w.writerow(cols)
    for n, r in enumerate(rows, 1):
        r = dict(r, no=n)
        w.writerow([r[c] for c in cols])

L = []
P = L.append
P(f'basic 실습 정답표 (직영_실습데이터.csv 기준 · 뽑은 날 {SNAP[:4]}-{SNAP[4:6]}-{SNAP[6:]})')
P('교재의 「확인」 칸은 이 숫자와 비교합니다. 지금 쓰는 직영 대시보드와 같은 기준입니다(10-03 대조: 202507 · 202508 · 202607 · 202608 · 202609 과목수 · 학생수 일치).')
P('대시보드 「전년」 값은 올해 그 달에 있는 센터만 더합니다. 올해 그 달에 없는 센터가 있으면 전년 값이 이 표보다 작게 보입니다.')
P('')
P('[세는 법]')
P('- 공통: 프로그램명에 ' + ' · '.join(EXCL) + ' 가 들어간 행은 뺀다 (컨설팅은 빼지 않는다)')
P('- 과목수: 수강 행 + 이수 행 중 반이동(이동 열이 「이동-」)이 아닌 행만. 요일 열이 「요일」이면 COLC+요일+시작시간+종료시간, 월~일이면 COLC+요일+시작시간 의 중복 제거')
P('- 학생수: 과목수와 같은 행(수강 + 반이동 아닌 이수)을 센터별로 학생코드 중복 제거한 뒤 센터 값을 더한다 (전체에서 한 번에 세지 않는다 · 신규생 · 재입회생 · 학년별도 같다)')
P(f'- 센터: {NOW3[0]}~{NOW3[-1]} 에 있는 센터만 (직영 대시보드의 전년 값과 같은 기준)')
P('')
P('[1] 월별 과목수 · 학생수')
P('월       | 행 수  | 과목수 | 학생수 | 신규생 | 재입회생')
by = collections.defaultdict(list)
for r in rows:
    by[r['편성년월']].append(r)
for m in MONTHS:
    rs = [r for r in by[m] if not excluded(r)]
    ks = {course_key(r) for r in rs} - {None}
    st = [r for r in rs if student_ok(r)]
    ss = {(r['센터명'], r['학생코드']) for r in st}
    new = {(r['센터명'], r['학생코드']) for r in st if r['신규재원'] == '신규생'}
    re_ = {(r['센터명'], r['학생코드']) for r in st if r['신규재원'] == '재입회생'}
    P(f'{m}   | {len(by[m]):>6,} | {len(ks):>6,} | {len(ss):>6,} | {len(new):>6,} | {len(re_):>6,}')
P('(행 수는 제외 전 원래 행 수)')
P('')
P(f'[2] 학년치환 후 학년별 학생수 (기준 연도 = 가장 최근 편성년월 {NOW3[-1]} 의 연도 {CUR_AY} · 학년은 매년 1월 1일에 바뀜 · {PREV3[0]}~{PREV3[-1]} 는 한 학년 내림 · {NOW3[0]}~{NOW3[-1]} 는 그대로)')
gm = {}
for m in MONTHS:
    c = collections.Counter()
    seen = set()
    for r in by[m]:
        key = (r['센터명'], r['학생코드'])
        if excluded(r) or not student_ok(r) or key in seen:
            continue
        seen.add(key)
        c[grade(r['학년'], m)] += 1
    gm[m] = c
names = [g for g in ORDER + ['없음'] if any(gm[m][g] for m in MONTHS)]
P('학년   | ' + ' | '.join(MONTHS))
for g in names:
    P(f'{g:<6} | ' + ' | '.join(f'{gm[m][g]:>6,}' for m in MONTHS))
P('')
P(f'[3] {LAST} 센터별 (행 수가 많은 순)')
P('센터 | 행 수 | 과목수 | 학생수')
cen = collections.defaultdict(list)
for r in by[LAST]:
    cen[r['센터명']].append(r)
tot = 0
for name, rs in sorted(cen.items(), key=lambda x: -len(x[1])):
    x = [r for r in rs if not excluded(r)]
    k = {course_key(r) for r in x} - {None}
    s = {r['학생코드'] for r in x if student_ok(r)}
    tot += len(s)
    P(f'{name} | {len(rs):,} | {len(k):,} | {len(s):,}')
allst = {r['학생코드'] for r in by[LAST] if not excluded(r) and student_ok(r)}
P('')
P(f'[4] {LAST} 학생수: 센터별로 세어 더한 값 {tot:,} (정답) / 전체에서 한 번에 센 값 {len(allst):,} (오답 · 차이 {tot - len(allst)} = 두 센터를 다니는 학생을 한 번만 셈)')
P('')
P(f'[5] 체험 5 · 7단계 일부러 남긴 오류값 ({LAST} · 제외 프로그램 목록만 빼먹고 셈 · 세는 단위와 휴회 · 반이동 조건은 그대로)')
bad = by[LAST]
P(f'과목수 {len({course_key(r) for r in bad} - {None}):,} · 학생수 {len({(r["센터명"], r["학생코드"]) for r in bad if student_ok(r)}):,}  (정답은 [1] 의 {LAST} 줄 · 과목수는 크게, 학생수는 조금 다르다)')
open(os.path.join(OUT, '정답표.txt'), 'w', encoding='utf-8').write('\n'.join(L) + '\n')
print('\n'.join(L))
DIC = os.path.join(OUT, '열사전.txt')
d = open(DIC, encoding='utf-8').read()
line = f'이 파일은 직영 센터의 수업 편성 기록을 6개월({PREV3[0]}~{PREV3[-1]} · {NOW3[0]}~{NOW3[-1]})만 {SNAP[:4]}-{SNAP[4:6]}-{SNAP[6:]} 에 뽑은 사본입니다.'
d2 = re.sub(r'^이 파일은 직영 센터의 수업 편성 기록을 .*$', line, d, count=1, flags=re.M)
assert d2 != d or line in d, '열사전 기간 줄을 못 찾았다'
open(DIC, 'w', encoding='utf-8', newline='').write(d2)
print('rows', len(rows), 'students', len({r['학생코드'] for r in rows}))
