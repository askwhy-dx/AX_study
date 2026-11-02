// PDF를 "너비에 맞춤"으로 열리게 한다 (증분 업데이트로 Catalog만 다시 씀)
//   /OpenAction [1쪽 /FitH top]  → 페이지 폭을 창에 맞춰 연다
//   사용: node fitwidth.js <파일> [top(pt)]   기본 top=540 (7.5in 페이지)
const fs = require('fs');
function addFitToWidth(file, topPt) {
  const buf = fs.readFileSync(file);
  const s = buf.toString('latin1');
  const tIdx = s.lastIndexOf('trailer');
  const sIdx = s.lastIndexOf('startxref');
  const trailer = s.slice(tIdx, sIdx);
  const prev = parseInt(s.slice(sIdx).match(/startxref\s+(\d+)/)[1], 10);
  const size = parseInt(trailer.match(/\/Size\s+(\d+)/)[1], 10);
  const root = parseInt(trailer.match(/\/Root\s+(\d+)\s+0\s+R/)[1], 10);
  const info = (trailer.match(/\/Info\s+(\d+)\s+0\s+R/) || [])[1];
  const cat = s.match(new RegExp('(?:^|\\n)' + root + ' 0 obj\\s*<<([\\s\\S]*?)>>\\s*endobj'));
  let body = cat[1].trim().replace(/\s*\/OpenAction\s*\[[^\]]*\]/, '')
    .replace(/\s*\/PageLayout\s*\/\w+/, '').replace(/\s*\/PageMode\s*\/\w+/, '')
    .replace(/\s*\/ViewerPreferences\s*<<[^>]*>>/, '');
  const pagesNum = body.match(/\/Pages\s+(\d+)\s+0\s+R/)[1];
  const pages = s.match(new RegExp('(?:^|\\n)' + pagesNum + ' 0 obj\\s*<<([\\s\\S]*?)>>\\s*endobj'));
  const first = pages[1].match(/\/Kids\s*\[\s*(\d+)\s+0\s+R/)[1];
  body += `\n/PageLayout /SinglePage\n/PageMode /UseNone`
        + `\n/ViewerPreferences <</FitWindow true>>`
        + `\n/OpenAction [${first} 0 R /FitH ${topPt}]`;
  const objOffset = buf.length;
  const newObj = Buffer.from(`\n${root} 0 obj\n<<${body}>>\nendobj\n`, 'latin1');
  const xrefOffset = objOffset + newObj.length;
  const entry = (off) => String(off).padStart(10, '0') + ' 00000 n \n';
  const tail = Buffer.from(
    `xref\n0 1\n0000000000 65535 f \n${root} 1\n${entry(objOffset + 1)}` +
    `trailer\n<</Size ${size}\n/Root ${root} 0 R\n` +
    (info ? `/Info ${info} 0 R\n` : '') +
    `/Prev ${prev}>>\nstartxref\n${xrefOffset}\n%%EOF\n`, 'latin1');
  fs.writeFileSync(file, Buffer.concat([buf, newObj, tail]));
}
addFitToWidth(process.argv[2], parseFloat(process.argv[3] || '540'));
console.log('fit-to-width 적용:', process.argv[2]);
