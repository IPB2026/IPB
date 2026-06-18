import 'server-only';
import { del } from '@vercel/blob';
import { prisma } from '@/lib/prisma';
import { getBlobToken } from '@/lib/blob';

/** Nombre de jours de rétention en corbeille avant purge automatique. */
export const TRASH_RETENTION_DAYS = 30;

/**
 * Purge DÉFINITIVE d'un client : efface d'abord les fichiers photos dans Vercel
 * Blob (anti-orphelins), puis supprime le contact → cascade Prisma sur tout le
 * dossier. Fonction serveur interne (NON exposée comme server action) : appelée
 * par l'action purgeContact (ADMIN) et par le cron de purge (CRON_SECRET).
 */
export async function purgeContactById(id: string): Promise<void> {
  const photos = await prisma.photo
    .findMany({ where: { rapport: { contactId: id } }, select: { url: true } })
    .catch(() => []);
  if (photos.length) {
    const token = getBlobToken();
    await Promise.allSettled(photos.map((p) => del(p.url, { token })));
  }
  await prisma.contact.delete({ where: { id } }).catch(() => null);
}
