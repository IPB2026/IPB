import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Canonique : https://www.ipb-expertise.fr
 * Redirige le domaine nu (apex) vers www pour éviter le duplicate content
 * et regrouper les signaux SEO. Ne s'applique pas à localhost ni aux déploiements *.vercel.app.
 */
export function middleware(request: NextRequest) {
  const host = request.headers.get('host')?.split(':')[0]?.toLowerCase();
  if (host !== 'ipb-expertise.fr') {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.hostname = 'www.ipb-expertise.fr';
  url.protocol = 'https:';
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)'],
};
