const { chromium } = require('C:/Users/User/Desktop/test/node_modules/playwright');
const { pathToFileURL } = require('url'); const path=require('path'); const fs=require('fs');
const man = JSON.parse(fs.readFileSync('teams_manifest.json','utf8'));
const CSS_W=1920,PX=96,w=13.3333,h=7.5,scale=(w*PX)/CSS_W;
const THRESH=0.80;
const FIT = () => { const f=document.querySelector('.fit'); const top=f.getBoundingClientRect().top;
  const avail=1080-top-30; const nat=f.scrollHeight; const sc = nat>avail?avail/nat:1;
  f.style.height=(avail/sc)+'px'; if(sc<1) f.style.transform=`scale(${sc})`; return sc; };
async function load(p,file){ await p.goto(pathToFileURL(path.resolve(file)).href); await p.waitForTimeout(250); }
async function pdfIt(p,out){ await p.waitForTimeout(120);
  await p.pdf({path:out,width:w+'in',height:h+'in',scale,printBackground:true,margin:{top:'0',bottom:'0',left:'0',right:'0'}}); }
(async()=>{
  const b=await chromium.launch(); const ordered=[];
  for(const m of man){
    const p=await b.newPage({viewport:{width:1920,height:1080},deviceScaleFactor:2});
    await load(p,m.full); const sFull=await p.evaluate(()=>{const f=document.querySelector('.fit');const top=f.getBoundingClientRect().top;const avail=1080-top-30;const nat=f.scrollHeight;return nat>avail?avail/nat:1;});
    const force2P = ['수학팀','과학팀','유아팀'].includes(m.team);
    if(!force2P && sFull>=THRESH){
      await load(p,m.full); await p.evaluate(FIT); await pdfIt(p,m.outFull);
      ordered.push(m.outFull); console.log(`${m.team}: 1P (${sFull.toFixed(3)})`);
    } else {
      await load(p,m.p12); const sa=await p.evaluate(FIT); await pdfIt(p,m.out12);
      await load(p,m.p34); const sb=await p.evaluate(FIT); await pdfIt(p,m.out34);
      ordered.push(m.out12,m.out34); console.log(`${m.team}: 2P (full ${sFull.toFixed(3)} → ${sa.toFixed(3)}/${sb.toFixed(3)})`);
    }
    await p.close();
  }
  fs.writeFileSync('teams_pdfs.json', JSON.stringify(ordered,null,0),'utf8');
  await b.close(); console.log('order:', ordered.join(', '));
})();
