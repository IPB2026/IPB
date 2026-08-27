import { NextResponse } from 'next/server';

/**
 * Manifeste du site public.
 *
 * Route handler et non convention `app/manifest.ts` : la convention de fichier
 * injecte son <link rel="manifest"> sur TOUTES les pages, y compris /admin, et
 * écrase la surcharge du back-office. Servi ici, le lien redevient une simple
 * métadonnée — que app/admin/layout.tsx peut remplacer par le manifeste terrain.
 * L'URL et le contenu sont inchangés.
 */
export const dynamic = 'force-static';

export function GET() {
  return NextResponse.json(
    {
      name: 'IPB - Institut de Pathologie du Bâtiment',
      short_name: 'IPB Expertise',
      description:
        "Institut de diagnostic en pathologie du bâtiment en Occitanie. Diagnostic de fissures, humidité, inspection avant achat et diagnostic avant vente. Un rapport clair, remis sous 3 à 5 jours.",
      start_url: '/',
      display: 'standalone',
      background_color: '#FFFFFF',
      theme_color: '#EA580C',
      orientation: 'portrait-primary',
      icons: [
        {
          src: '/favicon.svg',
          sizes: 'any',
          type: 'image/svg+xml',
          purpose: 'any',
        },
      ],
      categories: ['business', 'construction', 'services'],
      lang: 'fr-FR',
    },
    {
      headers: {
        'Content-Type': 'application/manifest+json; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    }
  );
}
