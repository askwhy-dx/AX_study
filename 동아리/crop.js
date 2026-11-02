const { chromium } = require('C:/Users/User/Desktop/test/node_modules/playwright');
const { pathToFileURL } = require('url');
const path = require('path');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport:{width:1367,height:765}, deviceScaleFactor: 2 });
  await p.goto(pathToFileURL(path.resolve('_crop.html')).href);
  await p.waitForFunction(()=>{const i=document.getElementById('m');return i&&i.complete&&i.naturalWidth>0});
  await p.screenshot({ path:'dash_crop.png', clip:{x:571,y:121,width:736,height:336} });
  await b.close(); console.log('OK');
})();
