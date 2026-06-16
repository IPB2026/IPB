import 'server-only';
import { prisma } from '@/lib/prisma';
import { nextFactureNumber } from '@/lib/crm/numbering';
import type { AppointmentType } from '@prisma/client';

/**
 * Création de la facture d'un RDV réalisé — logique PARTAGÉE entre l'action
 * manuelle (bouton « Facturer ») et le cron de facturation automatique J+1.
 */

const DIAGNOSTIC_PRICE = 400;

const TYPE_OBJECT: Record<AppointmentType, string> = {
  DIAGNOSTIC_FISSURES: 'Diagnostic pathologies de fissures',
  DIAGNOSTIC_HUMIDITE: 'Diagnostic humidité et infiltrations',
  EXPERTISE_ACHAT: 'Expertise structurelle avant achat',
  MUR_PORTEUR: 'Étude de faisabilité ouverture de mur porteur',
  LANCEMENT_TRAVAUX: 'Lancement / coordination des travaux',
  AUTRE: 'Intervention IPB',
};

/** Types de RDV diagnostic (facturables automatiquement). LANCEMENT_TRAVAUX exclu. */
export const DIAGNOSTIC_APPT_TYPES: AppointmentType[] = [
  'DIAGNOSTIC_FISSURES',
  'DIAGNOSTIC_HUMIDITE',
  'EXPERTISE_ACHAT',
  'MUR_PORTEUR',
];

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
      lines: {
        create: [
          {
            designation: object,
            detail: appt.location || null,
            unit: 'Forfait',
            qty: 1,
            unitPrice: prix,
            total: prix,
            position: 0,
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
