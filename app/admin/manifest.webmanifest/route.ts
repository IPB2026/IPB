import { NextResponse } from 'next/server';

/**
 * Manifeste de l'app terrain (PWA du back-office).
 *
 * Distinct du manifeste du site public (app/manifest.ts) : le diagnostiqueur
 * installe « IPB Terrain » sur son écran d'accueil et retombe directement sur
 * ses interventions, en plein écran, sans barre d'adresse ni onglets à retrouver
 * au milieu d'une visite. Le `scope` limité à /admin empêche l'app d'avaler la
 * navigation vers le site vitrine.
 */
export const dynamic = 'force-static';

export function GET() {
  return NextResponse.json(
    {
      id: '/admin',
      name: 'IPB Terrain — saisie de diagnostic',
      short_name: 'IPB Terrain',
      description:
        'Saisie des constats et du reportage photo pendant la visite. La saisie est conservée sur l’appareil même sans réseau.',
      start_url: '/admin',
      scope: '/admin',
      display: 'standalone',
      orientation: 'portrait-primary',
      background_color: '#F8FAFC',
      theme_color: '#FFFFFF',
      lang: 'fr-FR',
      dir: 'ltr',
      categories: ['business', 'productivity'],
      icons: [
        { src: '/admin/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
        { src: '/admin/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
        {
          src: '/admin/icon-maskable-512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable',
        },
      ],
      shortcuts: [
        {
          name: 'Mes interventions',
          short_name: 'Interventions',
          url: '/admin/rapports',
          icons: [{ src: '/admin/icon-192.png', sizes: '192x192', type: 'image/png' }],
        },
      ],
    },
    {
      headers: {
        'Content-Type': 'application/manifest+json; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    }
  );
}
