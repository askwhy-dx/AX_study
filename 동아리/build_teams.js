const XLSX = require('C:/Users/User/Desktop/test/node_modules/xlsx');
const fs = require('fs');
const SRC = 'C:/Users/User/Downloads/AI에이전트 업무 4단계_연구소 현황.xlsx';
const wb = XLSX.readFile(SRC);

const STAGES = [
  { n:'1단계', name:'프롬프트 엔지니어링', c1:'#bfe0f7', c2:'#8fc6ee', ac:'#2f7fb8', soft:'#f2f8fd' },
  { n:'2단계', name:'컨텍스트 엔지니어링', c1:'#bdeaf0', c2:'#8bd6e2', ac:'#2b8fa3', soft:'#f0fbfc' },
  { n:'3단계', name:'에이전틱 AI',        c1:'#cdeccd', c2:'#9dd8a4', ac:'#2f8a48', soft:'#f3fbf4' },
  { n:'4단계', name:'하네스 엔지니어링',  c1:'#fdd3ac', c2:'#f7ac6a', ac:'#c4702a', soft:'#fff7ef' },
];
const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const CAP = 220;   // 완화된 상한(초대형 문단만 살짝 줄임)
const summ = d => { d=d.replace(/\s+/g,' ').trim(); return d.length<=CAP ? d : d.slice(0,CAP).trim()+'…'; };
function toItems(cell){
  cell=(cell==null?'':String(cell)).trim();
  if(!cell||cell==='없음') return [];
  const parts = cell.includes('[') ? cell.split(/(?=\[[^\]]+\])/).map(s=>s.trim()).filter(Boolean) : [cell];
  return parts.map(p=>{
    const m=p.match(/^\[([^\]]+)\]\s*([\s\S]*)$/);
    return m ? {title:m[1].trim(), desc:summ(m[2])} : {title:'', desc:summ(p)};
  }).filter(it=>it.title||it.desc);
}
const HEAD = (base,extra)=>`<!doctype html><html lang="ko"><head><meta charset="utf-8"><style>
@page{margin:0}*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1920px;font-family:"Malgun Gothic","맑은 고딕",sans-serif;color:#1f2937;word-break:keep-all}
.sheet{width:1920px;height:1080px;position:relative;overflow:hidden;background:#f3f6f4}
.topo{position:absolute;inset:0;z-index:0}
.page{position:relative;z-index:2;height:100%;padding:34px 46px 30px;display:flex;flex-direction:column}
.head{display:flex;align-items:center;gap:22px;flex:none}
.badge{width:112px;height:100px;flex:none;border-radius:22px;display:flex;flex-direction:column;
  align-items:center;justify-content:center;color:#12303f;background:linear-gradient(180deg,#bfe0f7,#8fc6ee)}
.badge b{font-size:31px;line-height:1;letter-spacing:-1px}.badge i{font-size:15px;font-style:normal;font-weight:800;margin-top:5px}
.htit h2{font-size:38px;font-weight:800;color:#14304a;letter-spacing:-1px}
.htit p{font-size:19px;color:#54687a;margin-top:6px}
.fitwrap{flex:1;min-height:0;margin-top:22px;overflow:hidden}
.fit{transform-origin:top center;display:flex;gap:18px;width:100%}
.scol{flex:1;min-width:0;display:flex;flex-direction:column;background:var(--soft);
  border:1.5px solid var(--c1);border-radius:16px;overflow:hidden}
.sh{padding:12px 14px;text-align:center;font-size:23px;font-weight:800;color:#12303f;
  background:linear-gradient(180deg,var(--c1),var(--c2))}
.sh em{display:block;font-style:normal;font-size:15px;color:#33536b;margin-bottom:2px}
.items{flex:1;padding:20px 17px;display:flex;flex-direction:column;justify-content:space-evenly;gap:14px}
.item{display:flex;gap:9px;align-items:flex-start}
.item .bu{flex:none;width:8px;height:8px;border-radius:50%;background:var(--ac);margin-top:8px}
.item .ix{font-size:16px;color:#3c4b5a;line-height:1.46}
.item .ix b{color:var(--ac);font-weight:800}
.none{font-size:15px;color:#a7b3bd;padding:6px 2px}
.foot{flex:none;margin-top:16px;display:flex;align-items:flex-end;justify-content:space-between}
.cred{font-size:15px;color:#7d8d99;font-weight:700}
</style></head><body><div class="sheet">
<svg class="topo" viewBox="0 0 1920 1080" preserveAspectRatio="none">
 <defs><path id="bl" d="M0,-100 C55,-100 100,-55 100,0 C100,62 38,106 -16,100 C-72,94 -106,48 -100,-6 C-94,-62 -56,-100 0,-100 Z"/></defs>
 <g fill="none" stroke="#dae4ea" stroke-width="2"><g transform="translate(1690,980)">
  <use href="#bl" transform="scale(.6)"/><use href="#bl" transform="scale(1.05) rotate(6)"/><use href="#bl" transform="scale(1.6) rotate(-5)"/></g></g>
</svg><div class="page">`;

function colOf(s, byStage){
  const st=STAGES[s]; const items=byStage[s];
  const list = items.length
    ? items.map(it=>`<div class="item"><span class="bu"></span><div class="ix">${it.title?`<b>${esc(it.title)}</b> `:''}${esc(it.desc)}</div></div>`).join('')
    : `<div class="none">해당 단계 활용 없음</div>`;
  return `<div class="scol" style="--c1:${st.c1};--c2:${st.c2};--ac:${st.ac};--soft:${st.soft}">
    <div class="sh"><em>${st.n}</em>${st.name}</div><div class="items">${list}</div></div>`;
}
function pageHtml(team, base, byStage, idxs, subtitle, footR){
  const cols = idxs.map(s=>colOf(s,byStage)).join('');
  return HEAD(base)+`
  <div class="head">
    <div class="badge"><b>${esc(base)}</b><i>팀</i></div>
    <div class="htit"><h2>AI 에이전트 업무 4단계 — 단계별 활용 현황</h2>
      <p>담당자 구분 없이 <b>각 단계별로 실제 활용 내용을 합쳐</b> 정리 · <b>${subtitle}</b></p></div>
  </div>
  <div class="fitwrap"><div class="fit">${cols}</div></div>
  <div class="foot"><div class="cred">연구소 · ${esc(team)}</div><div class="cred">${footR}</div></div>
  </div></div></body></html>`;
}

const manifest=[];
wb.SheetNames.forEach(team=>{
  const rows=XLSX.utils.sheet_to_json(wb.Sheets[team],{header:1,blankrows:false,defval:''});
  const data=rows.slice(5);
  const byStage=[[],[],[],[]]; const seen=[new Set(),new Set(),new Set(),new Set()];
  data.forEach(r=>{ for(let s=0;s<4;s++){ toItems(r[2+s]).forEach(it=>{
    const key=(it.title+'|'+it.desc).slice(0,60); if(seen[s].has(key))return; seen[s].add(key); byStage[s].push(it);
  }); }});
  const base=team.replace(/팀$/,'');
  const full=`team_${team}_full.html`, p12=`team_${team}_12.html`, p34=`team_${team}_34.html`;
  fs.writeFileSync(full, pageHtml(team,base,byStage,[0,1,2,3],'1~4단계','AI 에이전트 업무 4단계 현황'),'utf8');
  fs.writeFileSync(p12,  pageHtml(team,base,byStage,[0,1],'1~2단계','1~2단계 (1/2)'),'utf8');
  fs.writeFileSync(p34,  pageHtml(team,base,byStage,[2,3],'3~4단계','3~4단계 (2/2)'),'utf8');
  manifest.push({ team, base,
    full, p12, p34,
    outFull:`team_${team}.pdf`, out12:`team_${team}_a.pdf`, out34:`team_${team}_b.pdf`,
    counts:byStage.map(a=>a.length) });
});
fs.writeFileSync('teams_manifest.json', JSON.stringify(manifest,null,0),'utf8');
console.log('OK teams:', manifest.map(m=>`${m.team}[${m.counts.join('/')}]`).join(', '));
