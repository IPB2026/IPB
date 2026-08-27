/**
 * Génère les icônes de l'app terrain (PWA /admin) dans public/admin/.
 * Ré-exécuter après tout changement de charte :  node scripts/generate-admin-icons.mjs
 *
 * Icône volontairement distincte du site public : le diagnostiqueur doit
 * reconnaître son outil de saisie sur son écran d'accueil, pas la vitrine.
 */
import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';

const SLATE = '#0F172A';
const ORANGE = '#EA580C';

/** @param {number} pad Marge intérieure en % (zone de sécurité des icônes maskable). */
const svg = (size, pad = 0) => {
  const inner = size * (1 - pad * 2);
  const off = size * pad;
  const r = inner * 0.22;
  const fs = inner * 0.34;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="${SLATE}"/>
  <rect x="${off}" y="${off}" width="${inner}" height="${inner}" rx="${r}" fill="${ORANGE}"/>
  <text x="${size / 2}" y="${size / 2}" fill="#ffffff"
        font-family="Helvetica, Arial, sans-serif" font-size="${fs}" font-weight="700"
        text-anchor="middle" dominant-baseline="central" letter-spacing="${fs * 0.02}">IPB</text>
</svg>`;
};

const out = 'public/admin';
const jobs = [
  ['icon-192.png', 192, 0.14],
  ['icon-512.png', 512, 0.14],
  ['icon-maskable-512.png', 512, 0.22], // contenu dans la zone sûre des 80 %
  ['apple-touch-icon.png', 180, 0.0],   // iOS applique lui-même le masque arrondi
];

for (const [name, size, pad] of jobs) {
  const buf = await sharp(Buffer.from(svg(size, pad))).png().toBuffer();
  await writeFile(`${out}/${name}`, buf);
  console.log(name, size, buf.length, 'octets');
}
