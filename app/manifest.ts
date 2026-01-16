import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'IPB - Institut de Pathologie du Bâtiment',
    short_name: 'IPB Expertise',
    description: 'Expert en réparation de fissures et traitement de l\'humidité à Toulouse. Diagnostic gratuit, interventions rapides, garantie décennale.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FFFFFF',
    theme_color: '#EA580C',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/images/ipb-logo.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/images/ipb-logo.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    categories: ['business', 'construction', 'services'],
    lang: 'fr-FR',
  };
}
