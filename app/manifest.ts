import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'IPB - Institut de Pathologie du Bâtiment',
    short_name: 'IPB Expertise',
    description: "Institut indépendant de diagnostic en pathologie du bâtiment en Occitanie. Diagnostic de fissures, expertise humidité, expertise avant achat et diagnostic avant vente. IPB diagnostique en toute indépendance ; si des travaux sont nécessaires, oriente vers des entreprises membres du réseau IPB.",
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
  };
}
