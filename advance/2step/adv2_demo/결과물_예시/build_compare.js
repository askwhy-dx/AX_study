// 싱글 vs 서브 비교 PPT — 2026-11-07 서브 실측(답변_서브.md = 검산 전 · 답변_서브_v2.md = 검산 후) 기준
// 실행: NODE_PATH=<pptxgenjs 설치 폴더>/node_modules node build_compare.js <출력.pptx>
const pptxgen = require("pptxgenjs");
const { applyTheme } = require("C:/Users/User/.claude/skills/synced/0e2803d4-9827-4f04-8092-8221a8162d8a_d39a0b43-67bc-4fd9-919b-f5345da8fad1/pptx/scripts/apply_theme.js");
const OUT = process.argv[2];
const FONT = "Malgun Gothic";
const THEME = { name: "Single vs Sub", headFontFace: FONT, bodyFontFace: FONT,
  colors: { dk1: "1F2937", lt1: "FFFFFF", dk2: "1E2761", lt2: "F1F5F9", accent1: "028090", accent2: "D9434A",
            accent3: "2E9E5B", accent4: "F59E0B", accent5: "64748B", accent6: "CADCFC", hlink: "028090", folHlink: "1E2761" } };
const pres = new pptxgen(); pres.layout = "LAYOUT_WIDE"; pres.title = "싱글 vs 서브 — 학부모 문의 15건";
pres.theme = { headFontFace: FONT, bodyFontFace: FONT };
const C = pres.SchemeColor;
const NAVY = C.text2, TEAL = C.accent1, RED = C.accent2, GREEN = C.accent3, GRAY = C.accent5, ICE = C.accent6, BG2 = C.background2, WHITE = C.background1, INK = C.text1;
const REDBG = "FBE9EA", GRNBG = "E7F5EC";

pres.defineSlideMaster({ title: "DARK", background: { color: NAVY },
  objects: [{ placeholder: { options: { name: "title", type: "title", x: 0.8, y: 1.3, w: 11.7, h: 1.5, fontSize: 44, bold: true, color: WHITE, valign: "bottom" }, text: "" } },
            { placeholder: { options: { name: "body", type: "body", x: 0.8, y: 2.9, w: 11.7, h: 0.9, fontSize: 20, color: ICE, valign: "top" }, text: "" } }] });
pres.defineSlideMaster({ title: "CONTENT", background: { color: WHITE },
  objects: [{ placeholder: { options: { name: "title", type: "title", x: 0.6, y: 0.35, w: 12.1, h: 0.8, fontSize: 32, bold: true, color: NAVY, valign: "middle", margin: 0 }, text: "" } }],
  slideNumber: { x: 12.3, y: 7.0, w: 0.6, h: 0.3, fontSize: 10, color: GRAY } });

const box = (s, name, x, y, w, h, fill, line) => s.addShape(pres.shapes.ROUNDED_RECTANGLE, { objectName: name, x, y, w, h, rectRadius: 0.12, fill: { color: fill }, line: { color: line || fill, width: 1.5 } });
const txt = (s, name, t, x, y, w, h, o) => s.addText(t, Object.assign({ objectName: name, x, y, w, h, isTextBox: true, margin: 0 }, o));
const arrow = (s, name, x, y, color, down) => s.addShape(down ? pres.shapes.DOWN_ARROW : pres.shapes.RIGHT_ARROW, { objectName: name, x, y, w: down ? 0.4 : 0.45, h: down ? 0.4 : 0.35, fill: { color }, line: { color } });
const node = (s, name, x, y, w, h, a, b, fill, sub) => { box(s, name, x, y, w, h, fill); txt(s, name + "t", [{ text: a, options: { bold: true, fontSize: 17, color: NAVY, breakLine: true } }, { text: b, options: { fontSize: 13, color: sub || GRAY } }], x, y, w, h, { align: "center", valign: "middle" }); };

// 1 표지
pres.addSection({ title: "표지" });
let s = pres.addSlide({ masterName: "DARK", sectionTitle: "표지" });
s.addText("같은 문의 15건, 싱글 vs 서브", { placeholder: "title" });
s.addText("혼자 쓰고 끝낼 때와, 다른 담당이 검산할 때 무엇이 달라지나", { placeholder: "body" });
[["싱글", "응대 담당 혼자 쓰고 그대로 발송"], ["서브", "응대 담당이 쓰고 → 검산 담당이 규정 대조 → 고쳐서 발송"]].forEach(([a, b], i) => {
  const x = 0.8 + i * 5.95;
  box(s, `c${i}`, x, 4.5, 5.6, 1.6, WHITE);
  txt(s, `ct${i}`, [{ text: a, options: { bold: true, fontSize: 24, color: i ? TEAL : GRAY, breakLine: true } }, { text: b, options: { fontSize: 15, color: INK } }], x + 0.35, 4.5, 4.9, 1.6, { valign: "middle" });
});
txt(s, "src", "가상 수학교실 학부모 문의 15건 · 응대 담당은 시험 삼아 옛 규정을 보고 씀 · 2026-11-07 강사 PC 실측", 0.8, 6.55, 11.7, 0.4, { fontSize: 12, color: ICE });

// 2 일하는 방식
pres.addSection({ title: "비교" });
s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "비교" });
s.addText("일하는 방식 — 검산 담당이 있느냐 없느냐", { placeholder: "title" });
txt(s, "l0", "싱글", 0.6, 1.5, 3, 0.5, { fontSize: 22, bold: true, color: GRAY });
node(s, "s0", 0.6, 2.15, 2.6, 1.15, "응대 담당", "옛 규정으로 15건 작성", BG2);
arrow(s, "sa0", 3.35, 2.55, GRAY);
node(s, "s1", 3.95, 2.15, 2.6, 1.15, "학부모에게", "그대로 발송", REDBG, RED);
txt(s, "l0d", "쓴 사람이 자기 답을 다시 봐도 같은 옛 규정으로 보므로, 틀린 줄 모른다", 0.6, 3.5, 5.95, 0.8, { fontSize: 14, color: INK, valign: "top" });
txt(s, "l1", "서브", 6.95, 1.5, 3, 0.5, { fontSize: 22, bold: true, color: TEAL });
node(s, "b0", 6.95, 2.15, 2.6, 1.15, "응대 담당", "옛 규정으로 15건 작성", BG2);
arrow(s, "ba0", 9.7, 2.55, TEAL);
node(s, "b1", 10.3, 2.15, 2.4, 1.15, "검산 담당", "현행 규정과 대조", "E0F2F1");
arrow(s, "ba1", 11.3, 3.42, TEAL, true);
node(s, "b2", 10.3, 3.95, 2.4, 1.15, "응대 담당", "틀린 3건 고침", BG2);
s.addShape(pres.shapes.LEFT_ARROW, { objectName: "ba2", x: 9.7, y: 4.35, w: 0.45, h: 0.35, fill: { color: TEAL }, line: { color: TEAL } });
node(s, "b3", 6.95, 3.95, 2.6, 1.15, "학부모에게", "고친 답 발송", GRNBG, GREEN);
box(s, "note", 0.6, 5.55, 12.1, 1.15, BG2);
txt(s, "notet", [{ text: "다른 점은 하나 ", options: { bold: true, color: NAVY } }, { text: "— 서브는 쓴 담당과 다른 담당이, 다른 자료(현행 규정)로 한 번 더 본다. 서브끼리는 직접 말할 수 없어 메인이 결과를 옮긴다(3번).", options: { color: INK } }], 0.95, 5.55, 11.4, 1.15, { fontSize: 15, valign: "middle" });

// 3 성적표
s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "비교" });
s.addText("결과 — 싱글은 3건 틀림, 서브는 15건 모두 맞음", { placeholder: "title" });
[["싱글", "12", RED, REDBG, "3건이 틀린 채 학부모에게", "문의 4 · 9 · 13", GRAY],
 ["서브", "15", GREEN, GRNBG, "검산이 3건을 잡아 고침", "문의 4 · 9 · 13", TEAL]].forEach(([n, score, c, bg, msg, q, hc], i) => {
  const x = 0.6 + i * 6.2;
  box(s, `sc${i}`, x, 1.55, 5.9, 4.6, BG2);
  txt(s, `sch${i}`, n, x + 0.45, 1.8, 3, 0.55, { fontSize: 24, bold: true, color: hc });
  txt(s, `scn${i}`, [{ text: score, options: { fontSize: 96, bold: true, color: c } }, { text: " / 15", options: { fontSize: 36, color: GRAY } }], x + 0.45, 2.4, 5.0, 1.7, { valign: "middle" });
  txt(s, `scl${i}`, "규정대로 나간 답변", x + 0.45, 4.1, 5, 0.45, { fontSize: 16, color: GRAY });
  box(s, `scb${i}`, x + 0.45, 4.75, 5.0, 1.1, bg);
  txt(s, `scbt${i}`, [{ text: msg, options: { bold: true, fontSize: 17, color: c, breakLine: true } }, { text: q, options: { fontSize: 14, color: INK } }], x + 0.75, 4.75, 4.5, 1.1, { valign: "middle" });
});
txt(s, "cap", "싱글 = 이번 시연에서 응대 담당이 처음 쓴 답(검산 전) · 서브 = 검산을 거쳐 고친 답", 0.6, 6.4, 12.1, 0.4, { fontSize: 12, color: GRAY });

// 4 같았던 12건
s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "비교" });
s.addText("12건은 싱글과 서브의 답이 같았습니다", { placeholder: "title" });
const same = [["1", "준비물", "확인 후 연락"], ["2", "시작 전 그만두기", "수강료 전액 환불"], ["3", "숙제 양", "선생님 확인 후 연락"], ["5", "친구 연락처", "알려 드릴 수 없음"],
              ["6", "단원평가 점수", "선생님 상담 연결"], ["7", "형제 할인", "확인 후 연락"], ["8", "두 달 휴원", "12월 1일부터 휴원"], ["10", "감사 인사", "선생님께 전달"],
              ["11", "정류장 변경", "운행표 확인 후 연락"], ["12", "3분의 2 지난 달 환불", "환불 불가"], ["14", "당일 결석 보강", "당일 연락은 불가"], ["15", "겨울 특강", "확인 후 연락"]];
same.forEach(([n, a, b], i) => {
  const x = 0.6 + (i % 4) * 3.07, y = 1.5 + Math.floor(i / 4) * 1.5;
  box(s, `m${i}`, x, y, 2.85, 1.25, BG2);
  txt(s, `mt${i}`, [{ text: `문의 ${n} · ${a}`, options: { bold: true, fontSize: 14, color: NAVY, breakLine: true } }, { text: b, options: { fontSize: 14, color: INK } }], x + 0.2, y, 2.5, 1.25, { valign: "middle" });
});
txt(s, "m_note", "규정이 바뀌지 않은 조항이거나 규정에 없는 문의 → 누가 써도 같은 답. 검산이 할 일이 없다.", 0.6, 6.15, 12.1, 0.5, { fontSize: 15, color: GRAY });

// 5 달랐던 3건
s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "비교" });
s.addText("달랐던 3건 — 서브가 잡아낸 것", { placeholder: "title" });
txt(s, "hd0", "싱글이 보낸 답", 3.0, 1.35, 4.6, 0.4, { fontSize: 15, bold: true, color: RED });
txt(s, "hd1", "서브가 고친 답", 7.8, 1.35, 4.9, 0.4, { fontSize: 15, bold: true, color: GREEN });
const diffs = [["문의 4", "보강 한 번 더", "월 1회까지라 이번 달 추가 보강은 어렵다", "월 2회까지라 한 번 더 잡아 드린다", "받을 수 있는 보강을 거절당함"],
               ["문의 9", "미개봉 교재 환불", "교재비는 어떤 경우에도 돌려드리지 않는다", "7일 안 · 미개봉이라 교재비를 환불한다", "돌려받을 교재비를 못 받음"],
               ["문의 13", "다음 달 반 변경", "20일 마감이라 1월부터 바뀐다", "25일 마감이라 12월 1일부터 바뀐다", "한 달 더 맞지 않는 반에 다님"]];
diffs.forEach(([n, a, bad, good, loss], i) => {
  const y = 1.85 + i * 1.65;
  txt(s, `dn${i}`, [{ text: n, options: { bold: true, fontSize: 18, color: NAVY, breakLine: true } }, { text: a, options: { fontSize: 13, color: GRAY } }], 0.6, y, 2.2, 1.35, { valign: "middle" });
  box(s, `db${i}`, 3.0, y, 4.6, 1.35, REDBG);
  txt(s, `dbt${i}`, [{ text: bad, options: { fontSize: 15, color: INK, breakLine: true } }, { text: "→ " + loss, options: { fontSize: 13, bold: true, color: RED } }], 3.25, y, 4.15, 1.35, { valign: "middle" });
  arrow(s, `da${i}`, 7.65, y + 0.5, GRAY);
  box(s, `dg${i}`, 8.2, y, 4.5, 1.35, GRNBG);
  txt(s, `dgt${i}`, good, 8.45, y, 4.05, 1.35, { fontSize: 15, color: INK, valign: "middle" });
});
txt(s, "d_note", "세 건 모두 결론이 「거절 · 늦게」에서 「수락 · 빨리」로 뒤집혔다 — 학부모에게 불리한 쪽으로 틀려 있었다.", 0.6, 6.85 - 0.3, 12.1, 0.45, { fontSize: 14, color: GRAY });

// 6 서브가 잡는 것 · 대가
s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "비교" });
s.addText("서브로 쓰면 잡히는 것, 그리고 드는 것", { placeholder: "title" });
const catches = [["1", "쓴 사람이 본 기준 자체가 틀린 것", "옛 규정으로 쓴 답은 쓴 사람이 다시 봐도 맞아 보인다. 다른 자료로 보는 담당이 있어야 보인다."],
                 ["2", "숫자 · 날짜 하나 차이", "월 1회 ↔ 2회 · 20일 ↔ 25일 · 7일 안. 문장은 자연스러워서 읽기만 해선 안 보인다."],
                 ["3", "결론이 뒤집히는 실수", "거절 → 수락. 한 글자 차이가 학부모에게는 돈 · 일정 손해가 된다."]];
catches.forEach(([n, h, d], i) => {
  const y = 1.5 + i * 1.6;
  s.addShape(pres.shapes.OVAL, { objectName: `cn${i}`, x: 0.6, y: y + 0.15, w: 0.75, h: 0.75, fill: { color: TEAL }, line: { color: TEAL } });
  txt(s, `cnt${i}`, n, 0.6, y + 0.15, 0.75, 0.75, { fontSize: 22, bold: true, color: WHITE, align: "center", valign: "middle" });
  txt(s, `ch${i}`, h, 1.6, y, 6.4, 0.5, { fontSize: 19, bold: true, color: NAVY });
  txt(s, `cd${i}`, d, 1.6, y + 0.5, 6.4, 0.95, { fontSize: 14, color: INK, valign: "top" });
});
box(s, "cost", 8.5, 1.5, 4.2, 4.6, BG2);
txt(s, "costt", [{ text: "대신 드는 것", options: { bold: true, fontSize: 19, color: NAVY, breakLine: true } },
  { text: "담당 1명 더 (검산)", options: { fontSize: 15, color: INK, bullet: true, breakLine: true, paraSpaceBefore: 10 } },
  { text: "메인이 결과를 3번 옮김", options: { fontSize: 15, color: INK, bullet: true, breakLine: true, paraSpaceBefore: 6 } },
  { text: "서브 실행 5분 3초", options: { fontSize: 15, color: INK, bullet: true, breakLine: true, paraSpaceBefore: 6 } },
  { text: "그만큼 사용량도 더 든다", options: { fontSize: 15, color: INK, bullet: true, paraSpaceBefore: 6 } }], 8.85, 1.75, 3.6, 4.1, { valign: "top" });

// 7 정리
pres.addSection({ title: "정리" });
s = pres.addSlide({ masterName: "DARK", sectionTitle: "정리" });
s.addText("틀리면 손해인 일에는 검산 담당을 따로 붙인다", { placeholder: "title" });
s.addText("쓴 사람은 자기 실수를 못 본다 — 다른 담당이 다른 자료로 볼 때 잡힌다", { placeholder: "body" });
[["싱글로 충분", "틀려도 다시 하면 되는 일\n정리 · 요약 · 초안", WHITE, GRAY], ["서브로 나눈다", "돈 · 날짜 · 약속이 걸린 답\n기준 문서와 맞춰야 하는 일", WHITE, TEAL]].forEach(([h, d, bg, hc], i) => {
  const x = 0.8 + i * 5.95;
  box(s, `k${i}`, x, 4.3, 5.6, 1.8, bg);
  txt(s, `kt${i}`, [{ text: h, options: { bold: true, fontSize: 22, color: hc, breakLine: true } }, { text: d, options: { fontSize: 15, color: INK } }], x + 0.35, 4.3, 4.9, 1.8, { valign: "middle" });
});

(async () => { await pres.writeFile({ fileName: OUT }); await applyTheme(OUT, THEME); console.log("ok", OUT); })();
