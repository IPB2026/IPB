import { ImageResponse } from 'next/og';
import { blogPosts } from '@/app/data/blog';

// Génération dynamique de la cover sociale (Open Graph + Twitter) par article.
// Carte brandée IPB 1200×630 — pas de photo requise, unique par article,
// auto-injectée par Next.js pour og:image et twitter:image.
// Runtime Node (et non edge) : le fichier blog.ts est volumineux et dépasserait
// la limite de bundle edge.

export const alt = 'IPB · Institut de Pathologie du Bâtiment';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const CATEGORY_LABELS: Record<string, string> = {
  fissures: 'Fissures',
  humidite: 'Humidité',
  conseils: 'Conseils',
  expertise: 'Expertise',
};

// Charte IPB
const NAVY = '#0B1826';
const ORANGE = '#C8601F';
const CREAM = '#F3EFE8';
const MUTED = '#9A938A';

export default async function Image({ params }: { params: { slug: string } }) {
  const post = blogPosts[params.slug];

  const title = post?.title ?? 'Institut de Pathologie du Bâtiment';
  const category = post ? (CATEGORY_LABELS[post.category] ?? 'Expertise') : 'Expertise';

  // Taille de titre adaptative selon la longueur (évite les débordements)
  const len = title.length;
  const titleSize = len > 110 ? 50 : len > 80 ? 58 : len > 55 ? 66 : 76;

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

        {/* Titre */}
        <div
          style={{
            display: 'flex',
            fontSize: titleSize,
            lineHeight: 1.1,
            fontWeight: 800,
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
            <div style={{ display: 'flex', fontSize: 34, fontWeight: 800, color: '#fff', letterSpacing: 1 }}>
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
    { ...size },
  );
}
