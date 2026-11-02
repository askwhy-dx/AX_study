// harness_deck.html → PPTX (16:9 5슬라이드)
//
// 사용법
//   node ppt.js          편집 가능판 — 도형·글자를 네이티브로 다시 쌓는다 (기본)
//   node ppt.js image    이미지판   — 쪽 전체를 그림 한 장으로. 모양은 원본과 100% 같지만 편집 불가
//
// 이미지 한 장으로 굽지 않고, HTML에서 도형·글자의 좌표/색/서체를 뽑아
// PPT 네이티브 도형 + 텍스트 상자로 다시 쌓는다. → PPT에서 글자 편집 가능.
//   · 박스/셰브론/배지 = 네이티브 도형
//   · 글자           = 네이티브 텍스트 상자 (b 태그는 굵게, code 태그는 고정폭으로 유지)
//   · 아이콘(SVG)    = 작은 PNG (도형화가 불가능해 이미지로 남긴다)
//   · 배경(등고선)   = 슬라이드 배경 PNG
// 실제 조립은 ppt_build.py (python-pptx).
const { chromium } = require('C:/Users/User/Desktop/test/node_modules/playwright');
const { execFileSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const SRC = 'harness_deck.html';
const TMP = path.join(__dirname, '_slides');

const BOX_SEL = '.matrix,.side,.side .hd,.chip,.chev,.cell,.case,.def,.human,.proof,.dnum,.badge,.src,.chain .st';
const TXT_SEL = 'h1,.en,.lead,.chip,.chev,.lab,.ttl,.txt,.badge,.dtit h2,.dtit p,.dstep,'
              + '.def h3,.def p,.case h4,.case p,.src,.human .k,.human .v,.proof,.side .hd,'
              + '.pc .cap,.arrow,.chain .st,.chain .dn,.dnum b,.dnum i,.sum,.cred,.side .note';

const MODE = process.argv[2] === 'image' ? 'image' : 'edit';

(async () => {
  fs.mkdirSync(TMP, { recursive: true });
  for (const f of fs.readdirSync(TMP)) fs.unlinkSync(path.join(TMP, f));

  const b = await chromium.launch();
  const p = await b.newPage({ viewportSize: { width: 1920, height: 1080 }, deviceScaleFactor: 2 });
  await p.goto('file:///' + path.resolve(__dirname, SRC).replace(/\\/g, '/'));
  await p.waitForTimeout(600);

  await p.addStyleTag({ content: '.hidepage .page{visibility:hidden}' });

  const sheets = await p.$$('.sheet');
  const spec = [];

  if (MODE === 'image') {                       // ── 이미지판: 쪽 전체를 한 장으로 + 노트에 텍스트
    const notes = [];
    for (let i = 0; i < sheets.length; i++) {
      const n = String(i + 1).padStart(2, '0');
      await sheets[i].screenshot({ path: path.join(TMP, `s${n}.png`) });
      notes.push(await sheets[i].evaluate(el =>
        el.innerText.split('\n').map(s => s.trim()).filter(Boolean).join('\n')));
      console.log('  캡처 s' + n);
    }
    await b.close();
    fs.writeFileSync(path.join(TMP, 'notes.json'), JSON.stringify(notes, null, 1), 'utf8');
    console.log(execFileSync('python', [path.join(__dirname, 'ppt_build.py'), 'image'], { encoding: 'utf8' }).trim());
    return;
  }

  for (let i = 0; i < sheets.length; i++) {
    const n = String(i + 1).padStart(2, '0');
    const sh = sheets[i];

    // 1) 배경(단색 + 등고선)만 캡처
    await p.evaluate(() => document.body.classList.add('hidepage'));
    await sh.screenshot({ path: path.join(TMP, `bg${n}.png`) });
    await p.evaluate(() => document.body.classList.remove('hidepage'));

    // 2) 도형·글자 좌표/스타일 수집
    const data = await sh.evaluate((el, sels) => {
      const [BOX, TXT] = sels;
      const base = el.getBoundingClientRect();
      const R = e => { const r = e.getBoundingClientRect();
        return { x: r.left - base.left, y: r.top - base.top, w: r.width, h: r.height }; };
      const hex = c => {
        const m = (c || '').match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\)/);
        if (!m) return null;
        if (m[4] !== undefined && parseFloat(m[4]) === 0) return null;
        return [m[1], m[2], m[3]].map(v => (+v).toString(16).padStart(2, '0')).join('').toUpperCase();
      };

      const boxes = [...el.querySelectorAll(BOX)].map(e => {
        const s = getComputedStyle(e), r = R(e);
        const grad = /gradient/.test(s.backgroundImage) ? s.backgroundImage : null;
        let g = null;
        if (grad) { const cs = grad.match(/rgba?\([^)]+\)/g) || []; g = cs.map(hex).filter(Boolean); }
        return { ...r, fill: hex(s.backgroundColor), grad: g,
          stroke: hex(s.borderTopColor), sw: parseFloat(s.borderTopWidth) || 0,
          dash: s.borderTopStyle, radius: parseFloat(s.borderTopLeftRadius) || 0,
          shape: e.classList.contains('chev') ? 'chevron' : 'rect' };
      });

      // 인라인 서식(b=굵게, code=고정폭)을 run 으로 보존
      const runs = (node, bold) => {
        let out = [];
        node.childNodes.forEach(c => {
          if (c.nodeType === 3) { if (c.textContent) out.push({ t: c.textContent, b: bold, m: false }); }
          else if (c.nodeName === 'BR') out.push({ t: '\n', b: bold, m: false });
          else if (c.nodeName === 'CODE') out.push({ t: c.textContent, b: bold, m: true });
          else out = out.concat(runs(c, bold || c.nodeName === 'B' || c.nodeName === 'STRONG'));
        });
        return out;
      };

      const texts = [...el.querySelectorAll(TXT)].filter(e => e.innerText.trim()).map(e => {
        const s = getComputedStyle(e), r = R(e);
        const fs = parseFloat(s.fontSize);
        return { ...r, size: fs, color: hex(s.color), align: s.textAlign,
          bold: +s.fontWeight >= 600, lh: (parseFloat(s.lineHeight) || fs * 1.2) / fs,
          runs: runs(e, +s.fontWeight >= 600) };
      });

      const icons = [...el.querySelectorAll('svg:not(.topo)')].map(e => R(e));
      return { boxes, texts, icons };
    }, [BOX_SEL, TXT_SEL]);

    // 3) 아이콘은 개별 PNG (투명 배경)
    const svgs = await sh.$$('svg:not(.topo)');
    for (let k = 0; k < svgs.length; k++) {
      const f = `ic${n}_${String(k).padStart(2, '0')}.png`;
      await svgs[k].screenshot({ path: path.join(TMP, f), omitBackground: true });
      data.icons[k].file = f;
    }

    data.bg = `bg${n}.png`;
    spec.push(data);
    console.log(`  ${n}쪽  도형 ${data.boxes.length} · 글자 ${data.texts.length} · 아이콘 ${data.icons.length}`);
  }
  await b.close();

  fs.writeFileSync(path.join(TMP, 'spec.json'), JSON.stringify(spec), 'utf8');
  console.log(execFileSync('python', [path.join(__dirname, 'ppt_build.py'), 'edit'], { encoding: 'utf8' }).trim());
})();
