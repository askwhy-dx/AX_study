const { chromium } = require('C:/Users/User/Desktop/test/node_modules/playwright');
const path = require('path');
(async () => {
  const b = await chromium.launch();
  // 16:9 가로형 (참고 이미지 규격). deviceScaleFactor 2 → 실제 3840x2160
  const p = await b.newPage({ viewportSize: { width: 1920, height: 1080 }, deviceScaleFactor: 2 });
  const jobs = [
    ['p1_preprocess.html', 'AI에이전트_1_데이터전처리.png'],
    ['p2_verify.html', 'AI에이전트_2_데이터검증.png'],
  ];
  for (const [src, out] of jobs) {
    await p.goto('file:///' + path.resolve(__dirname, src).replace(/\\/g, '/'));
    await p.waitForTimeout(400);
    await p.screenshot({ path: path.join(__dirname, out) });
    console.log('OK', out);
  }
  await b.close();
})();
