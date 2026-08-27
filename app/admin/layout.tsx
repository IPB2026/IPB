import type { Metadata, Viewport } from 'next';
import { adminFont } from './fonts';

// Tout le back-office est exclu de l'indexation.
// `manifest` pointe sur le manifeste terrain (et non celui du site public) :
// installé sur l'écran d'accueil, le back-office s'ouvre en plein écran sur
// /admin — l'outil du diagnostiqueur, pas la vitrine.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
  manifest: '/admin/manifest.webmanifest',
  icons: {
    icon: [{ url: '/admin/icon-192.png', sizes: '192x192', type: 'image/png' }],
    apple: [{ url: '/admin/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  appleWebApp: {
    capable: true,
    title: 'IPB Terrain',
    statusBarStyle: 'default',
  },
};

// L'en-tête mobile du back-office est blanc : la barre d'état iOS/Android doit
// s'y fondre (le orange du site public jurerait ici).
export const viewport: Viewport = {
  themeColor: '#FFFFFF',
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`admin-scope ${adminFont.variable} font-[family-name:var(--font-admin)] antialiased [font-feature-settings:'cv02','cv03','cv04','cv11']`}
    >
      {children}
    </div>
  );
}
