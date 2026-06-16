import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { blogPosts } from '@/app/data/blog';

// Génération dynamique de la cover sociale (Open Graph + Twitter) par article.
// Carte brandée IPB 1200×630 — unique par article, sans photo requise.
// Auto-injectée par Next.js pour og:image et twitter:image.
// Runtime Node (et non edge) : le fichier blog.ts est volumineux et dépasserait
// la limite de bundle edge.

export const runtime = 'nodejs';
export const alt = 'IPB · Institut de Pathologie du Bâtiment';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const CATEGORY_LABELS: Record<string, string> = {
  fissures: 'Fissures',
  humidite: 'Humidité',
  conseils: 'Conseils',
  expertise: 'Expertise',
};

// Charte IPB (tailwind.config)
const NAVY = '#0B1826';
const ORANGE = '#C8601F';
const CREAM = '#F3EFE8';
const MUTED = '#9A938A';

// Polices (TTF — Satori ne supporte pas le woff2).
// Playfair Display = titres serif signature ; DM Sans = UI/marque.
// Chargement résilient : fichiers locaux d'abord (runtime Node), repli CDN
// fontsource si non disponibles dans le bundle, puis repli police par défaut.
// On évite ainsi le `fetch(new URL(...))` qui produisait une URL relative
// impossible à résoudre côté serveur (cause des erreurs OG en prod).
const FONTS = [
  { name: 'Playfair Display', weight: 700 as const, file: 'PlayfairDisplay-700.ttf', cdn: 'https://cdn.jsdelivr.net/fontsource/fonts/playfair-display@latest/latin-700-normal.ttf' },
  { name: 'DM Sans', weight: 600 as const, file: 'DMSans-600.ttf', cdn: 'https://cdn.jsdelivr.net/fontsource/fonts/dm-sans@latest/latin-600-normal.ttf' },
  { name: 'DM Sans', weight: 700 as const, file: 'DMSans-700.ttf', cdn: 'https://cdn.jsdelivr.net/fontsource/fonts/dm-sans@latest/latin-700-normal.ttf' },
];

async function loadFont(file: string, cdn: string): Promise<ArrayBuffer | null> {
  try {
    const buf = await readFile(join(process.cwd(), 'app/blog/[slug]/_fonts', file));
    return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
  } catch {
    try {
      const res = await fetch(cdn);
      if (res.ok) return await res.arrayBuffer();
    } catch {
      /* repli silencieux sur la police par défaut */
    }
    return null;
  }
}

export default async function Image({ params }: { params: { slug: string } }) {
  const post = blogPosts[params.slug];

  const title = post?.title ?? 'Institut de Pathologie du Bâtiment';
  const category = post ? (CATEGORY_LABELS[post.category] ?? 'Expertise') : 'Expertise';

  const loaded = await Promise.all(FONTS.map((f) => loadFont(f.file, f.cdn)));
  const fonts = FONTS.map((f, i) => ({ name: f.name, data: loaded[i], weight: f.weight, style: 'normal' as const }))
    .filter((f): f is { name: string; data: ArrayBuffer; weight: 600 | 700; style: 'normal' } => f.data !== null);

  // Taille de titre adaptative selon la longueur (évite les débordements)
  const len = title.length;
  const titleSize = len > 110 ? 48 : len > 80 ? 56 : len > 55 ? 64 : 74;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: NAVY,
          padding: '72px 80px',
          position: 'relative',
          fontFamily: 'DM Sans',
        }}
      >
        {/* Filet décoratif vertical orange (rappel "fissure") */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 120,
            width: 3,
            height: '100%',
            backgroundColor: ORANGE,
            opacity: 0.25,
            transform: 'skewX(-8deg)',
          }}
        />

        {/* En-tête : catégorie */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              backgroundColor: ORANGE,
              color: '#fff',
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: 'uppercase',
              padding: '10px 22px',
              borderRadius: 4,
            }}
          >
            {category}
          </div>
        </div>

        {/* Titre — Playfair Display */}
        <div
          style={{
            display: 'flex',
            fontFamily: 'Playfair Display',
            fontSize: titleSize,
            lineHeight: 1.1,
            fontWeight: 700,
            color: CREAM,
            letterSpacing: -1,
            maxWidth: 1000,
          }}
        >
          {title}
        </div>

        {/* Pied : marque */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', fontSize: 34, fontWeight: 700, color: '#fff', letterSpacing: 1 }}>
              IPB
            </div>
            <div style={{ display: 'flex', fontSize: 22, color: MUTED, marginTop: 2 }}>
              Institut de Pathologie du Bâtiment
            </div>
          </div>
          <div style={{ display: 'flex', fontSize: 24, color: ORANGE, fontWeight: 600 }}>
            ipb-expertise.fr
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      ...(fonts.length ? { fonts } : {}),
    },
  );
}
