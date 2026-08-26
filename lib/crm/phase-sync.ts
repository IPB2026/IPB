import 'server-only';
import { prisma } from '@/lib/prisma';
import { computeDossier, dossierInputFromLead } from '@/lib/crm/dossier';

/**
 * Matérialisation de la phase du dossier (vague 1 de l'audit d'août 2026).
 *
 * `computeDossier` reste la SEULE autorité de calcul : ce module ne décide rien,
 * il recopie son résultat dans `Lead.phase` pour que la phase — jusqu'ici
 * calculée en mémoire et donc invisible de SQL — devienne filtrable, paginable
 * et agrégeable. Le patron est celui des champs formule matérialisés : on ne
 * choisit pas entre « dérivé » et « stocké », on stocke le dérivé.
 *
 * Deux déclencheurs, volontairement redondants :
 *  - `syncCrm()` après chaque mutation d'un dossier (chemin nominal) ;
 *  - le passage nocturne du cron, filet pour tout ce qui aurait été manqué
 *    (écriture directe en base, import, action oubliée).
 */

/** Sélection Prisma minimale pour recalculer les phases d'un contact. */
const CONTACT_ARTIFACTS = {
  devis: {
    select: { leadId: true, status: true, totalHT: true, acceptedAt: true, serviceType: true },
    orderBy: { createdAt: 'desc' },
  },
  factures: { select: { leadId: true, status: true } },
  rapports: {
    select: { leadId: true, status: true, updatedAt: true, budgetHT: true },
    orderBy: { updatedAt: 'desc' },
  },
  appointments: { select: { leadId: true, type: true, status: true } },
  leads: {
    select: { id: true, stage: true, manualPhase: true, phase: true },
    orderBy: { createdAt: 'desc' },
  },
} as const;

/**
 * Recalcule la phase de chaque dossier d'un contact ; n'écrit que celles qui
 * ont changé. Renvoie le nombre de corrections.
 */
async function recomputeContact(contactId: string): Promise<number> {
  const contact = await prisma.contact.findUnique({
    where: { id: contactId },
    select: CONTACT_ARTIFACTS,
  });
  if (!contact) return 0;

  // Le dossier le plus récent absorbe les artefacts non rattachés (règle de
  // `artifactsOfLead`) : c'est le premier de la liste, triée par date DESC.
  const latestId = contact.leads[0]?.id ?? null;

  let fixed = 0;
  for (const lead of contact.leads) {
    const dossier = computeDossier(
      dossierInputFromLead(contact, lead, lead.id === latestId)
    );
    if (lead.phase === dossier.phase) continue;
    await prisma.lead.update({
      where: { id: lead.id },
      data: { phase: dossier.phase, phaseSyncAt: new Date() },
    });
    fixed++;
  }
  return fixed;
}

/**
 * Met à jour la phase stockée des dossiers d'un contact, après une mutation.
 * Ne lève JAMAIS : la phase stockée est un cache, son échec ne doit pas faire
 * échouer l'action métier qui vient de réussir (envoi d'un devis, encaissement).
 * Un cache manqué est rattrapé au passage nocturne.
 */
export async function syncContactPhases(contactId: string): Promise<void> {
  if (!contactId) return;
  try {
    await recomputeContact(contactId);
  } catch {
    // Silencieux par conception (cf. ci-dessus). Le rattrapage nocturne, lui,
    // remonte ses erreurs.
  }
}

/**
 * Rattrapage : recalcule les dossiers des contacts indiqués et renvoie le
 * nombre de phases corrigées. Un chiffre durablement non nul signale un chemin
 * d'écriture qui ne passe pas par `syncCrm`. Laisse remonter ses erreurs — son
 * appelant (le cron) sait les journaliser.
 */
export async function syncPhasesOfContacts(contactIds: string[]): Promise<number> {
  let fixed = 0;
  for (const contactId of [...new Set(contactIds)].filter(Boolean)) {
    fixed += await recomputeContact(contactId);
  }
  return fixed;
}
