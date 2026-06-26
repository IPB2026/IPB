import 'server-only';
import { prisma } from '@/lib/prisma';
import { nextFactureNumber } from '@/lib/crm/numbering';
import { DIAGNOSTIC_VISIT_TYPES } from '@/lib/crm/dossier';
import type { AppointmentType } from '@prisma/client';

/**
 * Création de la facture d'un RDV réalisé — logique PARTAGÉE entre l'action
 * manuelle (bouton « Facturer ») et le cron de facturation automatique J+1.
 */

const DIAGNOSTIC_PRICE = 400;

const TYPE_OBJECT: Record<AppointmentType, string> = {
  DIAGNOSTIC_FISSURES: 'Diagnostic pathologies de fissures',
  DIAGNOSTIC_HUMIDITE: 'Diagnostic humidité et infiltrations',
  EXPERTISE_ACHAT: 'Diagnostic du bâti avant achat',
  MUR_PORTEUR: 'Étude de faisabilité ouverture de mur porteur',
  LANCEMENT_TRAVAUX: 'Lancement / coordination des travaux',
  AUTRE: 'Intervention IPB',
};

/** Types de RDV diagnostic facturables. Alias de la source unique (dossier.ts). */
export const DIAGNOSTIC_APPT_TYPES = DIAGNOSTIC_VISIT_TYPES;

/**
 * Crée la facture d'un RDV réalisé. Montant = devis diagnostic accepté du client,
 * sinon tarif par défaut (modifiable ensuite). IDEMPOTENT : si le RDV a déjà une
 * facture, renvoie son id sans rien créer. Renvoie null si le RDV est introuvable.
 */
export async function createInvoiceForAppointment(
  appointmentId: string
): Promise<{ id: string; created: boolean } | null> {
  const appt = await prisma.appointment.findUnique({
    where: { id: appointmentId },
    include: { contact: true, facture: true },
  });
  if (!appt) return null;
  if (appt.facture) return { id: appt.facture.id, created: false };

  const object = TYPE_OBJECT[appt.type];
  const number = await nextFactureNumber(appt.contact.name);
  const due = new Date();
  due.setDate(due.getDate() + 30);

  // Montant : le devis LIÉ à ce RDV en priorité (le plus juste), sinon le dernier
  // devis diagnostic accepté du client, sinon le tarif par défaut.
  let prix = DIAGNOSTIC_PRICE;
  if (appt.devisId) {
    const d = await prisma.devis.findUnique({
      where: { id: appt.devisId },
      select: { totalHT: true },
    });
    if (d) prix = Number(d.totalHT);
  } else {
    const devisAccepte = await prisma.devis.findFirst({
      // Devis diagnostic accepté (≠ AUTRE), sur-mesure (serviceType null) inclus :
      // { not: 'AUTRE' } seul exclurait les NULL en SQL → OR explicite.
      where: {
        contactId: appt.contactId,
        status: 'ACCEPTE',
        OR: [{ serviceType: { not: 'AUTRE' } }, { serviceType: null }],
      },
      orderBy: { acceptedAt: 'desc' },
      select: { totalHT: true },
    });
    if (devisAccepte) prix = Number(devisAccepte.totalHT);
  }

  const facture = await prisma.facture.create({
    data: {
      number,
      contactId: appt.contactId,
      object,
      dueDate: due,
      totalHT: prix,
      // RÈGLE MÉTIER : c'est la COORDINATION IPB qui porte le prix, PAS le diagnostic
      // (réalisé par le diagnostiqueur indépendant mandaté). Même structure que le
      // devis → cohérence devis ↔ facture, et facturation conforme.
      lines: {
        create: [
          {
            designation: 'Diagnostic sur site, analyse et production du rapport',
            detail: 'Réalisé par le diagnostiqueur indépendant mandaté, sous sa responsabilité',
            unit: 'Forfait',
            qty: 1,
            unitPrice: 0,
            total: 0,
            position: 0,
          },
          {
            designation: 'Coordination de la mission et mise en forme du rapport',
            detail: appt.location
              ? `Planification, suivi du dossier et production éditoriale du rapport — IPB · ${appt.location}`
              : 'Planification, suivi du dossier et production éditoriale du rapport — IPB',
            unit: 'Forfait',
            qty: 1,
            unitPrice: prix,
            total: prix,
            position: 1,
          },
        ],
      },
    },
  });

  // GARDE ANTI-COURSE : on lie la facture au RDV UNIQUEMENT s'il n'en a pas déjà
  // une (updateMany conditionnel = atomique). Si un autre process (cron concurrent
  // ou bouton manuel) a facturé entre-temps, on supprime notre doublon → pas de
  // facture orpheline ni de double envoi.
  const linked = await prisma.appointment.updateMany({
    where: { id: appointmentId, factureId: null },
    data: { factureId: facture.id, status: 'REALISE' },
  });
  if (linked.count === 0) {
    await prisma.facture.delete({ where: { id: facture.id } }).catch(() => {});
    const fresh = await prisma.appointment.findUnique({
      where: { id: appointmentId },
      select: { factureId: true },
    });
    return fresh?.factureId ? { id: fresh.factureId, created: false } : null;
  }

  return { id: facture.id, created: true };
}
