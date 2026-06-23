'use server';

import { put } from '@vercel/blob';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth-helpers';
import { revalidateCrm } from '@/lib/crm/revalidate';
import { getBlobToken } from '@/lib/blob';
import { nextDevisNumber, nextFactureNumber, nextRapportNumber } from '@/lib/crm/numbering';
import { ServiceType, ReportType } from '@prisma/client';

/** ServiceType (lead) → ReportType (rapport). Repli FISSURES. */
function reportTypeFromService(s: ServiceType | null | undefined): ReportType {
  switch (s) {
    case 'HUMIDITE':
      return ReportType.HUMIDITE;
    case 'EXPERTISE_ACHAT':
      return ReportType.EXPERTISE_ACHAT;
    case 'MUR_PORTEUR':
      return ReportType.MUR_PORTEUR;
    default:
      return ReportType.FISSURES;
  }
}

const COORD_LINES = (prix: number) => [
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
    detail: 'Planification, suivi du dossier et production éditoriale du rapport — IPB',
    unit: 'Forfait',
    qty: 1,
    unitPrice: prix,
    total: prix,
    position: 1,
  },
];

/**
 * Importe dans le CRM un document établi HORS CRM (devis, facture ou rapport déjà
 * produit ailleurs) et le range dans sa catégorie. PDF optionnel stocké sur Vercel
 * Blob. Statut « déjà sorti » (envoyé/transmis) pour refléter la réalité du dossier.
 * RÈGLE MÉTIER respectée : pour devis/facture, le prix porte sur la COORDINATION.
 */
export async function importExternalDocument(formData: FormData): Promise<void> {
  await requireAdmin();
  const contactId = String(formData.get('contactId') ?? '');
  const kind = String(formData.get('kind') ?? ''); // devis | facture | rapport
  const objet = String(formData.get('objet') ?? '').trim() || 'Document importé';
  const prix = Math.round(Number(String(formData.get('prix') ?? '').replace(',', '.')) || 0);
  if (!contactId || !['devis', 'facture', 'rapport'].includes(kind)) return;

  const contact = await prisma.contact.findUnique({
    where: { id: contactId },
    include: { leads: { orderBy: { createdAt: 'desc' }, take: 1 } },
  });
  if (!contact) return;
  const lead = contact.leads[0] ?? null;

  // Upload du PDF (optionnel) sur Vercel Blob.
  let externalUrl: string | null = null;
  const file = formData.get('file');
  if (file && typeof file === 'object' && 'size' in file && (file as File).size > 0) {
    const f = file as File;
    const token = getBlobToken();
    if (token) {
      try {
        const safeName = (f.name || 'document.pdf').replace(/[^a-zA-Z0-9._-]/g, '_');
        const res = await put(`documents-externes/${contactId}/${Date.now()}-${safeName}`, f, {
          access: 'public',
          token,
          contentType: f.type || 'application/pdf',
          addRandomSuffix: true,
        });
        externalUrl = res.url;
      } catch (e) {
        console.error('[importExternalDocument] upload Blob échoué:', e);
      }
    }
  }

  if (kind === 'devis') {
    const service =
      lead?.service && lead.service !== 'AUTRE' ? lead.service : ServiceType.FISSURES;
    const number = await nextDevisNumber();
    await prisma.devis.create({
      data: {
        number,
        contactId,
        leadId: lead?.id ?? null,
        object: objet,
        serviceType: service,
        status: 'ENVOYE',
        sentAt: new Date(),
        totalHT: prix,
        externalUrl,
        lines: { create: COORD_LINES(prix) },
      },
    });
  } else if (kind === 'facture') {
    const number = await nextFactureNumber(contact.name);
    const due = new Date();
    due.setDate(due.getDate() + 30);
    await prisma.facture.create({
      data: {
        number,
        contactId,
        object: objet,
        status: 'ENVOYEE',
        dueDate: due,
        totalHT: prix,
        externalUrl,
        lines: { create: COORD_LINES(prix) },
      },
    });
  } else {
    const number = await nextRapportNumber(contact.name);
    // RÈGLE N6 — rapport complet : un rapport n'est « transmis » (ENVOYE) que s'il
    // a un document joint. Sans PDF, on l'enregistre « validé » (prêt), jamais vide.
    await prisma.rapport.create({
      data: {
        number,
        contactId,
        leadId: lead?.id ?? null,
        type: reportTypeFromService(lead?.service),
        title: objet,
        status: externalUrl ? 'ENVOYE' : 'VALIDE',
        externalUrl,
      },
    });
  }

  await prisma.activity.create({
    data: {
      type: 'SYSTEME',
      contactId,
      leadId: lead?.id ?? null,
      content: `Document importé (${kind}) : ${objet}${externalUrl ? ' — PDF joint' : ''}`,
    },
  });

  revalidateCrm(contactId);
}
