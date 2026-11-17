/**
 * Generates a minimal valid one-page placeholder PDF so the "Download Resume"
 * button does not 404 before the real resume is added.
 *
 * Replace client/public/resume/resume.pdf with Laxman's actual resume PDF.
 */
import fs from 'fs';

const out = 'client/public/resume/resume.pdf';

// Minimal valid PDF with one page of text.
const objects = [
  '<< /Type /Catalog /Pages 2 0 R >>',
  '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
  '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>',
  '<< /Length 160 >>\nstream\nBT /F1 20 Tf 72 720 Td (Resume placeholder.) Tj 0 -28 Td /F1 14 Tf (Replace client/public/resume/resume.pdf with your actual resume PDF.) Tj ET\nendstream',
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
];

let pdf = '%PDF-1.4\n';
const offsets = [];
for (let i = 0; i < objects.length; i++) {
  offsets.push(pdf.length);
  pdf += `${i + 1} 0 obj\n${objects[i]}\nendobj\n`;
}

const xrefStart = pdf.length;
pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
for (const off of offsets) {
  pdf += `${String(off).padStart(10, '0')} 00000 n \n`;
}
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

fs.mkdirSync('client/public/resume', { recursive: true });
fs.writeFileSync(out, pdf, 'latin1');
console.log('Wrote placeholder PDF to', out);
