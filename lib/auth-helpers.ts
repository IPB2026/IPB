import 'server-only';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export interface SessionUser {
  id: string;
  email: string;
  name?: string | null;
  role: 'ADMIN' | 'EXPERT';
}

/** Récupère l'utilisateur de session, ou null. */
export async function getSessionUser(): Promise<SessionUser | null> {
  const session = await auth();
  const u = session?.user as
    | { id?: string; email?: string | null; name?: string | null; role?: string }
    | undefined;
  if (!u?.email) return null;
  return {
    id: u.id ?? '',
    email: u.email,
    name: u.name,
    role: u.role === 'EXPERT' ? 'EXPERT' : 'ADMIN',
  };
}

/** Exige une session (server action). Lève si absent. */
export async function requireUser(): Promise<SessionUser> {
  const user = await getSessionUser();
  if (!user) throw new Error('Non authentifié');
  return user;
}

/** Exige un ADMIN (server action). Lève sinon. */
export async function requireAdmin(): Promise<SessionUser> {
  const user = await requireUser();
  if (user.role !== 'ADMIN') throw new Error('Réservé aux administrateurs');
  return user;
}

/**
 * Garde de page réservée aux ADMIN : redirige les EXPERT vers leur espace
 * (« Mes interventions »). À appeler en tête des pages back-office sensibles.
 */
export async function guardAdminPage(): Promise<SessionUser> {
  const user = await getSessionUser();
  if (!user) redirect('/admin/login');
  if (user.role !== 'ADMIN') redirect('/admin/rapports');
  return user;
}

export function isAdmin(user: { role?: string } | null | undefined): boolean {
  return user?.role === 'ADMIN';
}

/** Liste les comptes diagnostiqueurs (EXPERT) pour l'assignation des prospects. */
export async function listExperts(): Promise<
  { id: string; name: string; email: string }[]
> {
  const experts = await prisma.user
    .findMany({
      where: { role: 'EXPERT' },
      orderBy: { name: 'asc' },
      select: { id: true, name: true, email: true },
    })
    .catch(() => []);
  return experts.map((e) => ({
    id: e.id,
    name: e.name || e.email,
    email: e.email,
  }));
}
