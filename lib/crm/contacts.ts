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
  // RÉTENTION LÉGALE : les factures émises se conservent 10 ans (L123-22 C. com).
  // La cascade Prisma les détruirait avec le contact → on BLOQUE la purge tant
  // qu'une facture non-brouillon existe. Alternative : archiver le contact
  // (corbeille) sans jamais le purger, ou anonymiser (préconisation audit).
  const facturesLegales = await prisma.facture.count({
    where: { contactId: id, status: { not: 'BROUILLON' } },
  });
  if (facturesLegales > 0) {
    await prisma.activity.create({
      data: {
        type: 'SYSTEME',
        contactId: id,
        content: `Purge bloquée : ${facturesLegales} facture(s) émise(s) à conserver 10 ans (rétention légale). Le contact reste en corbeille.`,
      },
    }).catch(() => null);
    return;
  }
  const photos = await prisma.photo
    .findMany({ where: { rapport: { contactId: id } }, select: { url: true } })
    .catch(() => []);
  if (photos.length) {
    const token = getBlobToken();
    await Promise.allSettled(photos.map((p) => del(p.url, { token })));
  }
  await prisma.contact.delete({ where: { id } }).catch(() => null);
}
