import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Generates the local SVG placeholder illustrations used across the site.
 * Replace any file in /public/images with real photography — no code changes
 * are required, paths stay the same.
 *
 * Run with: node scripts/generate-placeholders.mjs
 */

const OUT = join(process.cwd(), "public", "images");
mkdirSync(OUT, { recursive: true });

const INK = "#351F1D";

const palettes = [
  { bg: "#F5E3D3", accent: "#FF8048", soft: "#FFE52E" },
  { bg: "#9EDDE4", accent: "#351F1D", soft: "#F8F0EB" },
  { bg: "#FFE52E", accent: "#351F1D", soft: "#FF8048" },
  { bg: "#F0D9CE", accent: "#6224A8", soft: "#FFE52E" },
  { bg: "#E7D8F2", accent: "#FF8048", soft: "#9EDDE4" },
  { bg: "#FCE7C6", accent: "#351F1D", soft: "#FF8048" },
];

function decor(seed) {
  const items = [];
  for (let i = 0; i < 14; i += 1) {
    const x = ((seed * 97 + i * 173) % 760) + 20;
    const y = ((seed * 61 + i * 211) % 760) + 20;
    const r = ((i * 7) % 5) + 2;
    items.push(`<circle cx="${x}" cy="${y}" r="${r}" fill="${INK}" opacity="0.07"/>`);
  }
  return items.join("");
}

const shapes = {
  croissant: (p) => `
    <path d="M180 520 A 220 220 0 0 1 620 520 L 560 520 A 160 160 0 0 0 240 520 Z" fill="${p.accent}"/>
    <path d="M300 355 l 30 -60 M400 320 l 0 -65 M500 355 l -30 -60" stroke="${INK}" stroke-width="14" stroke-linecap="round" opacity="0.35"/>
    <circle cx="180" cy="520" r="38" fill="${p.soft}" stroke="${INK}" stroke-width="12"/>
    <circle cx="620" cy="520" r="38" fill="${p.soft}" stroke="${INK}" stroke-width="12"/>`,
  cookie: (p) => `
    <circle cx="400" cy="430" r="195" fill="${p.soft}" stroke="${INK}" stroke-width="14"/>
    <circle cx="330" cy="370" r="26" fill="${INK}"/>
    <circle cx="470" cy="350" r="20" fill="${INK}"/>
    <circle cx="430" cy="470" r="28" fill="${INK}"/>
    <circle cx="300" cy="500" r="18" fill="${INK}"/>
    <circle cx="510" cy="480" r="16" fill="${INK}"/>`,
  cakeSlice: (p) => `
    <path d="M400 230 L 640 580 L 160 580 Z" fill="${p.soft}" stroke="${INK}" stroke-width="14" stroke-linejoin="round"/>
    <path d="M255 430 L 545 430" stroke="${p.accent}" stroke-width="26"/>
    <path d="M210 505 L 590 505" stroke="${p.accent}" stroke-width="26"/>
    <circle cx="400" cy="215" r="30" fill="${p.accent}" stroke="${INK}" stroke-width="12"/>`,
  cakeRound: (p) => `
    <rect x="185" y="360" width="430" height="240" rx="36" fill="${p.soft}" stroke="${INK}" stroke-width="14"/>
    <ellipse cx="400" cy="365" rx="215" ry="62" fill="${p.accent}" stroke="${INK}" stroke-width="14"/>
    <path d="M230 430 q 25 45 50 0 q 25 45 50 0 q 25 45 50 0 q 25 45 50 0 q 25 45 50 0 q 25 45 50 0 q 25 45 50 0" fill="none" stroke="${INK}" stroke-width="10" opacity="0.4"/>
    <circle cx="400" cy="320" r="26" fill="#FF8048" stroke="${INK}" stroke-width="12"/>`,
  bagel: (p) => `
    <path d="M400 220 a 210 210 0 1 0 0.1 0 Z M400 340 a 90 90 0 1 1 -0.1 0 Z" fill="${p.soft}" fill-rule="evenodd" stroke="${INK}" stroke-width="14"/>
    <ellipse cx="320" cy="300" rx="16" ry="9" fill="${INK}" opacity="0.7" transform="rotate(-25 320 300)"/>
    <ellipse cx="500" cy="330" rx="16" ry="9" fill="${INK}" opacity="0.7" transform="rotate(20 500 330)"/>
    <ellipse cx="420" cy="560" rx="16" ry="9" fill="${INK}" opacity="0.7" transform="rotate(-10 420 560)"/>
    <ellipse cx="280" cy="470" rx="16" ry="9" fill="${INK}" opacity="0.7" transform="rotate(40 280 470)"/>
    <ellipse cx="520" cy="470" rx="16" ry="9" fill="${INK}" opacity="0.7" transform="rotate(-40 520 470)"/>`,
  tart: (p) => `
    <circle cx="400" cy="430" r="210" fill="${p.accent}" stroke="${INK}" stroke-width="14"/>
    <circle cx="400" cy="430" r="150" fill="${p.soft}" stroke="${INK}" stroke-width="10"/>
    <circle cx="330" cy="380" r="42" fill="#FFFFFF" stroke="${INK}" stroke-width="10"/>
    <circle cx="430" cy="360" r="36" fill="#FFFFFF" stroke="${INK}" stroke-width="10"/>
    <circle cx="470" cy="440" r="40" fill="#FFFFFF" stroke="${INK}" stroke-width="10"/>
    <circle cx="370" cy="480" r="38" fill="#FFFFFF" stroke="${INK}" stroke-width="10"/>`,
  brownie: (p) => `
    <rect x="200" y="250" width="400" height="360" rx="34" fill="${p.accent}" stroke="${INK}" stroke-width="14"/>
    <path d="M260 330 q 70 30 140 0 q 70 -30 140 10" fill="none" stroke="${INK}" stroke-width="10" opacity="0.5"/>
    <path d="M250 470 q 80 40 160 0 q 60 -25 120 10" fill="none" stroke="${INK}" stroke-width="10" opacity="0.5"/>
    <circle cx="330" cy="410" r="18" fill="${p.soft}"/>
    <circle cx="470" cy="530" r="16" fill="${p.soft}"/>`,
  macaron: (p) => `
    <path d="M200 380 a 200 110 0 0 1 400 0 Z" fill="${p.soft}" stroke="${INK}" stroke-width="14"/>
    <rect x="205" y="380" width="390" height="70" rx="28" fill="#FFFFFF" stroke="${INK}" stroke-width="14"/>
    <path d="M200 450 a 200 110 0 0 0 400 0 Z" fill="${p.soft}" stroke="${INK}" stroke-width="14"/>`,
  spiral: (p) => `
    <circle cx="400" cy="430" r="205" fill="${p.soft}" stroke="${INK}" stroke-width="14"/>
    <path d="M400 430 m0 -30 a30 30 0 1 1 -21 51 M400 430 m0 -80 a80 80 0 1 1 -57 137 M400 430 m0 -130 a130 130 0 1 1 -92 222 M400 430 m0 -180 a180 180 0 1 1 -127 307" fill="none" stroke="${p.accent}" stroke-width="20" stroke-linecap="round"/>`,
  brioche: (p) => `
    <path d="M180 560 q 0 -190 220 -190 q 220 0 220 190 Z" fill="${p.soft}" stroke="${INK}" stroke-width="14"/>
    <circle cx="310" cy="330" r="88" fill="${p.soft}" stroke="${INK}" stroke-width="14"/>
    <circle cx="490" cy="330" r="88" fill="${p.soft}" stroke="${INK}" stroke-width="14"/>
    <circle cx="400" cy="270" r="95" fill="${p.accent}" stroke="${INK}" stroke-width="14"/>
    <rect x="180" y="540" width="440" height="60" rx="26" fill="${p.accent}" stroke="${INK}" stroke-width="14"/>`,
  loaf: (p) => `
    <path d="M170 580 q 0 -260 230 -260 q 230 0 230 260 Z" fill="${p.soft}" stroke="${INK}" stroke-width="14"/>
    <path d="M290 380 l 60 -60 M400 350 l 0 -70 M510 380 l -60 -60" stroke="${INK}" stroke-width="16" stroke-linecap="round" opacity="0.45"/>
    <rect x="170" y="560" width="460" height="56" rx="24" fill="${p.accent}" stroke="${INK}" stroke-width="14"/>`,
  baguette: (p) => `
    <g transform="rotate(-32 400 430)">
      <rect x="140" y="360" width="520" height="140" rx="70" fill="${p.soft}" stroke="${INK}" stroke-width="14"/>
      <path d="M240 430 l 55 -38 M350 430 l 55 -38 M460 430 l 55 -38" stroke="${INK}" stroke-width="14" stroke-linecap="round" opacity="0.45"/>
    </g>`,
  chefhat: (p) => `
    <circle cx="290" cy="300" r="95" fill="#FFFFFF" stroke="${INK}" stroke-width="14"/>
    <circle cx="510" cy="300" r="95" fill="#FFFFFF" stroke="${INK}" stroke-width="14"/>
    <circle cx="400" cy="255" r="105" fill="#FFFFFF" stroke="${INK}" stroke-width="14"/>
    <path d="M270 330 q 0 -70 130 -70 q 130 0 130 70 v 120 h -260 Z" fill="#FFFFFF" stroke="${INK}" stroke-width="14"/>
    <rect x="290" y="430" width="220" height="90" rx="22" fill="${p.accent}" stroke="${INK}" stroke-width="14"/>
    <path d="M340 475 h 120" stroke="${INK}" stroke-width="12" stroke-linecap="round" opacity="0.5"/>`,
  scene: (p) => `
    <circle cx="620" cy="210" r="95" fill="${p.soft}" opacity="0.9"/>
    <rect x="90" y="560" width="820" height="70" rx="26" fill="${p.accent}" opacity="0.85"/>
    <circle cx="330" cy="330" r="60" fill="#F2C9A8" stroke="${INK}" stroke-width="12"/>
    <circle cx="295" cy="270" r="52" fill="#FFFFFF" stroke="${INK}" stroke-width="12"/>
    <circle cx="365" cy="270" r="52" fill="#FFFFFF" stroke="${INK}" stroke-width="12"/>
    <path d="M270 320 q 0 -55 60 -55 q 60 0 60 55 v 40 h -120 Z" fill="#FFFFFF" stroke="${INK}" stroke-width="12"/>
    <path d="M255 430 q 75 -50 150 0 v 130 h -150 Z" fill="${p.soft}" stroke="${INK}" stroke-width="12"/>
    <rect x="470" y="440" width="330" height="34" rx="17" fill="${p.accent}" stroke="${INK}" stroke-width="12" transform="rotate(-12 470 440)"/>
    <ellipse cx="620" cy="530" rx="150" ry="55" fill="#F2C9A8" stroke="${INK}" stroke-width="12"/>`,
};

function makeSvg({ shape, palette, label, width = 800, height = 800, seed = 1 }) {
  const draw = shapes[shape];
  if (!draw) throw new Error(`Unknown shape: ${shape}`);
  const labelWidth = Math.max(190, label.length * 15 + 60);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="${label}">
  <rect width="${width}" height="${height}" fill="${palette.bg}"/>
  ${decor(seed)}
  <g transform="translate(${(width - 800) / 2} ${(height - 800) / 2})">${draw(palette)}</g>
  <g>
    <rect x="${(width - labelWidth) / 2}" y="${height - 96}" width="${labelWidth}" height="56" rx="28" fill="${INK}"/>
    <text x="${width / 2}" y="${height - 58}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="700" letter-spacing="2" fill="#F8F0EB">${label.toUpperCase()}</text>
  </g>
</svg>
`;
}

const files = [
  ["hero-baker-placeholder.svg", "scene", 0, "Le fournil ROLLIN", 900, 1100, 3],
  ["featured-bread-placeholder.svg", "loaf", 1, "Pain du jour", 900, 900, 4],
  ["about-bakery-placeholder.svg", "chefhat", 3, "Notre atelier", 900, 800, 5],
  ["story-kneading-placeholder.svg", "scene", 2, "Façonné à la main", 900, 800, 6],
  ["category-cakes-placeholder.svg", "cakeRound", 3, "Gâteaux", 800, 800, 7],
  ["category-bread-placeholder.svg", "loaf", 0, "Pains", 800, 800, 8],
  ["category-cookies-placeholder.svg", "cookie", 2, "Biscuits", 800, 800, 9],
  ["category-bagels-placeholder.svg", "bagel", 1, "Bagels", 800, 800, 10],
  ["category-pastries-placeholder.svg", "croissant", 5, "Viennoiseries", 800, 800, 11],
  ["product-croissant-placeholder.svg", "croissant", 0, "Croissant", 800, 800, 12],
  ["product-pain-chocolat-placeholder.svg", "croissant", 5, "Pain au chocolat", 800, 800, 13],
  ["product-cookies-placeholder.svg", "cookie", 4, "Cookie", 800, 800, 14],
  ["product-cookie-speculoos-placeholder.svg", "cookie", 5, "Speculoos", 800, 800, 15],
  ["product-cake-placeholder.svg", "cakeSlice", 4, "Cheesecake", 800, 800, 16],
  ["product-carrot-cake-placeholder.svg", "cakeRound", 0, "Carottes & noix", 800, 800, 17],
  ["product-tart-placeholder.svg", "tart", 2, "Tarte citron", 800, 800, 18],
  ["product-bagel-placeholder.svg", "bagel", 3, "Bagel sésame", 800, 800, 19],
  ["product-bagel-seeded-placeholder.svg", "bagel", 5, "Bagel graines", 800, 800, 20],
  ["product-baguette-placeholder.svg", "baguette", 0, "Baguette", 800, 800, 21],
  ["product-country-loaf-placeholder.svg", "loaf", 4, "Pain levain", 800, 800, 22],
  ["product-brioche-placeholder.svg", "brioche", 2, "Brioche", 800, 800, 23],
  ["product-cinnamon-roll-placeholder.svg", "spiral", 5, "Cinnamon roll", 800, 800, 24],
  ["product-brownie-placeholder.svg", "brownie", 1, "Brownie", 800, 800, 25],
  ["product-macarons-placeholder.svg", "macaron", 3, "Macarons", 800, 800, 26],
  ["newsletter-doodle-placeholder.svg", "cookie", 2, "Restez gourmands", 600, 600, 27],
];

for (const [name, shape, paletteIndex, label, width, height, seed] of files) {
  const svg = makeSvg({
    shape,
    palette: palettes[paletteIndex],
    label,
    width,
    height,
    seed,
  });
  writeFileSync(join(OUT, name), svg, "utf8");
  console.log("wrote", name);
}
