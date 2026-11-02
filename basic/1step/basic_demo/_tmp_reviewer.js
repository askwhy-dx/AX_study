const fs=require('fs');
const path=require('path');
const txt=fs.readFileSync(path.join(__dirname,'직영_실습데이터.csv'),'utf8').replace(/^﻿/,'');
function parse(t){const rows=[];let r=[],f='',q=false;for(let i=0;i<t.length;i++){const c=t[i];if(q){if(c=='"'){if(t[i+1]=='"'){f+='"';i++}else q=false}else f+=c}else if(c=='"')q=true;else if(c==','){r.push(f);f=''}else if(c=='\n'){r.push(f.replace(/\r$/,''));rows.push(r);r=[];f=''}else f+=c}if(f||r.length){r.push(f);rows.push(r)}return rows}
const rows=parse(txt);const h=rows.shift();const ix=n=>h.indexOf(n);
const EX=['셔틀','차량','주도','클리','유형별','실험복','가방','클린업','무료'];
const ym=process.argv[2]||'202609';
const subj=new Set(),stu={};
const v={noEx:{s:new Set(),t:{}},noMove:{s:new Set(),t:{}},noDayRule:{s:new Set(),t:{}}};
const add=(o,k,c,s)=>{o.s.add(k);(o.t[c]=o.t[c]||new Set()).add(s)};
const globalStu=new Set();let n=0;
for(const r of rows){if(r.length<h.length)continue;if(r[ix('편성년월')]!==ym)continue;
const st=r[ix('학급수강상태')],mv=r[ix('이동')],day=r[ix('요일')];
const ok=st==='수강'||(st==='이수'&&mv!=='이동-');
const key=day==='요일'?[r[ix('COLC')],day,r[ix('시작시간')],r[ix('종료시간')]].join('|'):[r[ix('COLC')],day,r[ix('시작시간')]].join('|');
const key2=[r[ix('COLC')],day,r[ix('시작시간')]].join('|');
const c=r[ix('센터명')],s=r[ix('학생코드')];const ex=EX.some(w=>r[ix('프로그램명')].includes(w));
if(ok)add(v.noEx,key,c,s);
if(!ex&&(st==='수강'||st==='이수'))add(v.noMove,key,c,s);
if(!ex&&ok)add(v.noDayRule,key2,c,s);
if(ex||!ok)continue;n++;subj.add(key);(stu[c]=stu[c]||new Set()).add(s);globalStu.add(s)}
const sum=o=>Object.values(o).reduce((a,b)=>a+b.size,0);
console.log('rows',n,'과목수',subj.size,'학생수(센터별합)',sum(stu),'전체한번에',globalStu.size);
for(const k in v)console.log(k,'과목',v[k].s.size,'학생',sum(v[k].t));
for(const c in stu)console.log(c,stu[c].size);
