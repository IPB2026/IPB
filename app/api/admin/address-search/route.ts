import { NextResponse } from 'next/server';
import { requireUser } from '@/lib/auth-helpers';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Proxy vers la Base Adresse Nationale (api-adresse.data.gouv.fr) — répertoire
 * OFFICIEL des adresses françaises, gratuit et sans clé. Appelé en même origine
 * par l'autocomplétion (AddressAutocomplete) → aucune contrainte CORS/CSP côté
 * client. Réservé aux utilisateurs authentifiés du back-office.
 */
export async function GET(req: Request) {
  await requireUser();
  const q = new URL(req.url).searchParams.get('q')?.trim() ?? '';
  if (q.length < 4) return NextResponse.json({ suggestions: [] });

  try {
    const res = await fetch(
      `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(q)}&limit=6&autocomplete=1`,
      { signal: AbortSignal.timeout(4000) }
    );
    if (!res.ok) return NextResponse.json({ suggestions: [] });
    const data = await res.json();
    const suggestions = (data.features ?? []).map(
      (f: { properties?: Record<string, string> }) => ({
        label: f.properties?.label ?? '',
        address: f.properties?.name ?? '',
        postalCode: f.properties?.postcode ?? '',
        city: f.properties?.city ?? '',
      })
    );
    return NextResponse.json({ suggestions });
  } catch {
    // Réseau indisponible / timeout → l'utilisateur garde la saisie manuelle.
    return NextResponse.json({ suggestions: [] });
  }
}
