import 'server-only';
import { prisma } from '@/lib/prisma';

/**
 * Auto-clôture des relances dont le MOTIF est déjà résolu — pour que le tableau de
 * bord et la fiche ne montrent JAMAIS de tâche en contradiction avec le statut du
 * client. Idempotent et bon marché (2 updateMany ciblés). Appelé au chargement du
 * tableau de bord (cohérence immédiate) et par le cron (filet de sécurité).
 *
 * Couvre les tâches « dérivées » historiques restées ouvertes :
 *  - « Rapport à rédiger » → le contact a désormais un rapport ENVOYÉ.
 *  - « Décision devis … »  → le contact n'a plus aucun devis en attente (ENVOYE).
 */
export async function closeResolvedRelances(): Promise<void> {
  try {
    await prisma.activity.updateMany({
      where: {
        type: 'RELANCE',
        done: false,
        content: { contains: 'Rapport à rédiger' },
        contact: { rapports: { some: { status: 'ENVOYE' } } },
      },
      data: { done: true, doneAt: new Date() },
    });
    await prisma.activity.updateMany({
      where: {
        type: 'RELANCE',
        done: false,
        content: { contains: 'Décision devis' },
        contact: { devis: { none: { status: 'ENVOYE' } } },
      },
      data: { done: true, doneAt: new Date() },
    });
  } catch {
    // Non bloquant : un échec de nettoyage ne doit jamais casser le tableau de bord.
  }
}
