'use client';

import { usePathname } from 'next/navigation';
import { BackButton } from '@/components/ui/BackButton';

/**
 * SmartBackBar — bandeau retour discret avec destination intelligente
 * selon le pathname courant.
 *
 * S'insère juste après <Navbar /> sur les pages internes profondes.
 * Ne rend rien sur la home, diagnostic, contact (pages racines).
 *
 * Logique de routage retour :
 *  - /blog/[slug]            → /blog
 *  - /problemes/[slug]       → /blog
 *  - /actualites/*           → /blog
 *  - /expert-fissures*       → /expertise/fissures
 *  - /expert-mur-porteur*    → /expertise/mur-porteur
 *  - /expert-humidite*       → /expertise/humidite
 *  - /quartiers/[quartier]   → /quartiers
 *  - /departements/[dept]    → /departements
 *  - /villes/[ville]         → /
 *  - /partenaires/*          → /partenaires
 *  - /lp/*                   → /diagnostic
 *  - /traitement-humidite/*  → /expertise/humidite
 *  - Pages humidité standalones → /expertise/humidite
 *  - Pages fissure standalones → /expertise/fissures
 *  - Autres                   → /
 */
function getBackContext(pathname: string | null): { href: string; label: string } | null {
  if (!pathname) return null;

  // Pages racines : pas de bandeau retour
  const skipPaths = ['/', '/diagnostic', '/contact'];
  if (skipPaths.includes(pathname)) return null;

  // Routes spécifiques (ordre important : du plus spécifique au plus large)
  if (pathname.startsWith('/blog/') && pathname !== '/blog') {
    return { href: '/blog', label: 'Retour au blog' };
  }
  if (pathname.startsWith('/problemes/')) {
    return { href: '/blog', label: 'Retour au blog' };
  }
  if (pathname.startsWith('/actualites/')) {
    return { href: '/blog', label: 'Retour au blog' };
  }
  if (pathname.startsWith('/expert-fissures')) {
    return { href: '/expertise/fissures', label: "Retour à l'expertise fissures" };
  }
  if (pathname.startsWith('/expert-mur-porteur')) {
    return { href: '/expertise/mur-porteur', label: "Retour à l'expertise mur porteur" };
  }
  if (pathname.startsWith('/expert-humidite')) {
    return { href: '/expertise/humidite', label: "Retour à l'expertise humidité" };
  }
  if (pathname.startsWith('/quartiers/') && pathname !== '/quartiers') {
    return { href: '/quartiers', label: 'Retour aux quartiers' };
  }
  if (pathname.startsWith('/departements/') && pathname !== '/departements') {
    return { href: '/departements', label: 'Retour aux départements' };
  }
  if (pathname.startsWith('/partenaires/') && pathname !== '/partenaires') {
    return { href: '/partenaires', label: 'Retour aux partenaires' };
  }
  if (pathname.startsWith('/lp/')) {
    return { href: '/diagnostic', label: 'Retour au diagnostic' };
  }
  if (pathname.startsWith('/traitement-humidite/')) {
    return { href: '/expertise/humidite', label: "Retour à l'expertise humidité" };
  }

  // Pages humidité standalones (slug-based)
  const humidityPages = [
    '/vmi-ventilation-insufflation',
    '/condensation-ou-infiltration',
    '/moisissures-maison-sante',
    '/salpetre-mur-traitement',
    '/merule-champignon-traitement',
    '/remontees-capillaires-traitement',
    '/remontee-capillaire-solution',
    '/cave-humide-solutions',
    '/ponts-thermiques-condensation',
  ];
  if (humidityPages.includes(pathname)) {
    return { href: '/expertise/humidite', label: "Retour à l'expertise humidité" };
  }

  // Pages fissures standalones
  const fissurePages = [
    '/microfissure-quand-sinquieter',
    '/fissure-en-escalier-causes',
    '/fissure-fondation-maison',
    '/fissure-horizontale-danger',
    '/fissure-secheresse-indemnisation',
    '/agrafage-fissures',
    '/carte-secheresse-occitanie',
  ];
  if (fissurePages.includes(pathname)) {
    return { href: '/expertise/fissures', label: "Retour à l'expertise fissures" };
  }

  // Pages legales
  if (pathname.startsWith('/legal/')) {
    return { href: '/', label: "Retour à l'accueil" };
  }

  // Default : retour accueil
  return { href: '/', label: "Retour à l'accueil" };
}

export function SmartBackBar() {
  const pathname = usePathname();
  const ctx = getBackContext(pathname);

  if (!ctx) return null;

  return (
    <div className="bg-ipb-cream border-b border-ipb-rule">
      <div className="max-w-ipb mx-auto px-6 lg:px-12 py-3">
        <BackButton href={ctx.href} label={ctx.label} />
      </div>
    </div>
  );
}
