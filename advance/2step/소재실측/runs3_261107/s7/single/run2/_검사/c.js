const fs=require('fs');const dir=process.argv[2];
const W='일월화수목금토';
for(let i=1;i<=20;i++){const f=`반${String(i).padStart(2,'0')}.md`;
const L=fs.readFileSync(dir+'/'+f,'utf8').split(/\r?\n/).map(s=>s.replace(/^\[L\d+\] ?/,''));
const out=[];const n=s=>+s.replace(/,/g,'');
L.forEach((s,k)=>{for(const m of s.matchAll(/(\d+)월 (\d+)일\((.)\)/g)){const mo=+m[1],d=+m[2];const y=mo>=11?2026:2027;const w=W[new Date(y,mo-1,d).getDay()];if(w!==m[3])out.push(`L${k+1} ${m[0]} 실제 ${w}`);}});
const g=k=>L[k-1]||'';
try{
let a=g(23).match(/사고력 ([\d,]+)원 · 연산 ([\d,]+)원 · 경시 ([\d,]+)원/);
if(a){const [x,y,z]=[n(a[1]),n(a[2]),n(a[3])];const t=n(g(24).match(/([\d,]+)원/)[1]);if(t!==x+y+z)out.push(`L24 ${t} vs ${x+y+z}`);
const bk=n(g(25).match(/([\d,]+)원/)[1]);const e=n(g(26).match(/= ([\d,]+)원/)[1]);if(e!==y+z+2*bk)out.push(`L26 ${e} vs ${y+z+2*bk}`);
const s=g(27).match(/([\d,]+)원 → ([\d,]+)원/);if(n(s[1])!==x)out.push(`L27 base ${s[1]} vs ${x}`);if(n(s[2])!==n(s[1])*0.9)out.push(`L27 ${s[2]} vs ${n(s[1])*0.9}`);}
else out.push('L23 parse fail: '+g(23));
const c=g(33).match(/월 ([\d,]+)원.*합계 ([\d,]+)원/);if(c&&n(c[2])!==2*n(c[1]))out.push(`L33 ${c[2]} vs ${2*n(c[1])}`);
let mx=0;for(const k of [37,38]){const m=g(k).match(/평균 ([\d.]+)점 \((\d)명 · ([\d · ]+)점\)/);if(!m){out.push('parse '+k+g(k));continue;}const v=m[3].split(' · ').map(Number);mx=Math.max(mx,...v);const av=v.reduce((p,q)=>p+q)/v.length;if(v.length!=+m[2])out.push(`L${k} count`);if(Math.abs(av-+m[1])>0.05)out.push(`L${k} avg ${m[1]} vs ${av}`);}
const hm=g(39).match(/(\d+)점/);if(hm&&+hm[1]!==mx)out.push(`L39 ${hm[1]} vs ${mx}`);
const p1=g(2).match(/0\d-[\d-]+/)[0],p2=(g(55).match(/0\d-[\d-]+/)||[''])[0];if(p1!==p2)out.push(`phone ${p1} vs ${p2}`);
}catch(e){out.push('ERR '+e.message)}
console.log(f+': '+out.join(' | '));}
