// Render social preview images (1200x630): public/og.png (English, default) and public/og-id.png (Indonesian).
import sharp from "sharp";

const VARIANTS = [
  { file: "public/og.png", a: "Systems that turn business", b: "processes into growth." },
  { file: "public/og-id.png", a: "Sistem yang mengubah", b: "proses bisnis jadi pertumbuhan." },
];

const svg = ({ a, b }) => `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
<defs><pattern id="d" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="#22302b"/></pattern></defs>
<rect width="1200" height="630" fill="#0c100f"/><rect width="1200" height="630" fill="url(#d)"/>
<rect x="80" y="80" width="56" height="56" rx="12" fill="none" stroke="#f2b544" stroke-width="3"/>
<text x="108" y="117" text-anchor="middle" font-family="Consolas,monospace" font-size="22" font-weight="700" fill="#f2b544">AZ</text>
<text x="156" y="118" font-family="Arial,sans-serif" font-size="30" font-weight="700" fill="#e8ece7">auzan<tspan fill="#f2b544">.</tspan></text>
<text x="80" y="300" font-family="Arial Narrow,Arial,sans-serif" font-size="78" font-weight="800" fill="#e8ece7">${a}</text>
<text x="80" y="390" font-family="Arial Narrow,Arial,sans-serif" font-size="78" font-weight="800" fill="#f2b544">${b}</text>
<text x="80" y="520" font-family="Consolas,monospace" font-size="24" fill="#9ba7a1">FULL-STACK ENGINEER &amp; TECH LEAD · YOGYAKARTA</text>
<circle cx="1110" cy="512" r="8" fill="#6fd3a8"/></svg>`;

for (const v of VARIANTS) {
  await sharp(Buffer.from(svg(v))).png().toFile(v.file);
  console.log(v.file);
}
