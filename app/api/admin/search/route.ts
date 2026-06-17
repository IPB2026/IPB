import { auth } from '@/auth';
import { globalSearch } from '@/lib/crm/search';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Recherche globale pour la palette ⌘K (back-office). Réservée aux ADMIN
 * (la palette n'est montée que pour eux), insensible à la casse.
 */
export async function GET(req: Request) {
  const session = await auth();
  const role = (session?.user as { role?: string } | undefined)?.role;
  if (!session?.user || role !== 'ADMIN') {
    return new Response('Non autorisé', { status: 401 });
  }
  const q = new URL(req.url).searchParams.get('q') ?? '';
  const results = await globalSearch(q);
  return Response.json(results);
}
