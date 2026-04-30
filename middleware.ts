import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { villeSlugs } from '@/app/data/villes';

/**
 * Cannibalisation SEO — résolution du levier #1 de l'audit.
 *
 * Pour chaque ville, le site générait jusqu'à 5 URLs ciblant la même intention :
 *   /expert-fissures/{ville}
 *   /expert-humidite/{ville}
 *   /agrafage-fissures/{ville}    ← doublon technique
 *   /traitement-humidite/{ville}  ← doublon technique
 *   /villes/{ville}               ← doublon générique
 *
 * On consolide en 2 URLs canoniques par ville (fissures + humidité) en redirigeant
 * les 3 doublons en 301. Cas spéciaux Toulouse / Montauban → page d'autorité statique.
 *
 * Pré-construit en Set/Map au boot du runtime pour des lookups O(1) par requête.
 */

const villeSet = new Set<string>(villeSlugs);

const FISSURE_OVERRIDES: Record<string, string> = {
  toulouse: '/expert-fissures-toulouse-31',
  montauban: '/expert-fissures-montauban-82',
};

const HUMIDITE_OVERRIDES: Record<string, string> = {
  toulouse: '/expert-humidite-toulouse-31',
};

function fissureCanonical(ville: string): string {
  return FISSURE_OVERRIDES[ville] ?? `/expert-fissures/${ville}`;
}

function humiditeCanonical(ville: string): string {
  return HUMIDITE_OVERRIDES[ville] ?? `/expert-humidite/${ville}`;
}

/**
 * Si le pathname correspond à un doublon connu, renvoie la cible canonique.
 * Sinon renvoie null.
 */
function resolveCanonical(pathname: string): string | null {
  // /villes/{ville} → fissures (la page villes/* parle des deux mais l'intention SEO
  //  dominante en français est "expert fissures {ville}").
  const villesMatch = pathname.match(/^\/villes\/([^\/]+)\/?$/);
  if (villesMatch && villeSet.has(villesMatch[1])) {
    return fissureCanonical(villesMatch[1]);
  }

  // /agrafage-fissures/{ville} → fissures (l'agrafage est une technique parmi d'autres,
  //  pas un service distinct côté intention de recherche).
  const agrafageMatch = pathname.match(/^\/agrafage-fissures\/([^\/]+)\/?$/);
  if (agrafageMatch && villeSet.has(agrafageMatch[1])) {
    return fissureCanonical(agrafageMatch[1]);
  }

  // /traitement-humidite/{ville} → humidité (idem, traitement = technique).
  const traitementMatch = pathname.match(/^\/traitement-humidite\/([^\/]+)\/?$/);
  if (traitementMatch && villeSet.has(traitementMatch[1])) {
    return humiditeCanonical(traitementMatch[1]);
  }

  return null;
}

/**
 * Canonique : https://www.ipb-expertise.fr
 * 1. Redirige le domaine nu (apex) vers www pour regrouper les signaux SEO.
 * 2. Redirige les URLs en doublon vers leur version canonique (résolution cannibalisation).
 */
export function middleware(request: NextRequest) {
  const host = request.headers.get('host')?.split(':')[0]?.toLowerCase();
  const url = request.nextUrl.clone();

  // 1. Redirect apex → www (skip localhost et previews vercel)
  if (host === 'ipb-expertise.fr') {
    url.hostname = 'www.ipb-expertise.fr';
    url.protocol = 'https:';
    return NextResponse.redirect(url, 308);
  }

  // 2. Redirect cannibalisation
  const canonical = resolveCanonical(url.pathname);
  if (canonical) {
    url.pathname = canonical;
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)'],
};
