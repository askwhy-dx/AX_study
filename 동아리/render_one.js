const { chromium } = require('C:/Users/User/Desktop/test/node_modules/playwright');
const { pathToFileURL } = require('url');
const path = require('path');
const SRC='가맹사업부_프롬프트엔지니어링.html';
const OUT='가맹사업부_프롬프트엔지니어링.pdf';
const CSS_W=1920, PX=96, w=13.3333, h=7.5, scale=(w*PX)/CSS_W;
(async()=>{
  const b=await chromium.launch();
  const p=await b.newPage({viewport:{width:1920,height:1080},deviceScaleFactor:2});
  await p.goto(pathToFileURL(path.resolve(SRC)).href);
  await p.waitForTimeout(500);
  await p.screenshot({path:'preview.png'});
  await p.pdf({path:OUT,width:w+'in',height:h+'in',scale,printBackground:true,
    margin:{top:'0',bottom:'0',left:'0',right:'0'}});
  await b.close();
  const fs=require('fs');
  console.log('PDF KB', (fs.statSync(OUT).size/1024).toFixed(0));
})();
