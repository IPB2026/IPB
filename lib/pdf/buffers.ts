import 'server-only';
import { createElement } from 'react';
import { renderToBuffer } from '@react-pdf/renderer';
import { prisma } from '@/lib/prisma';
import { DevisDocument } from '@/lib/pdf/devis-document';
import { FactureDocument } from '@/lib/pdf/facture-document';
import { RapportDocument } from '@/lib/pdf/rapport-document';
import { devisTemplate } from '@/lib/crm/devis-templates';
import { diagnosticienFor } from '@/lib/crm/diagnosticiens';
import type { ReportContent } from '@/lib/ai/report';

type RenderEl = Parameters<typeof renderToBuffer>[0];

const num = (d: unknown) => Number(d ?? 0);

/** Rend un document PDF en Buffer ; renvoie null si le rendu échoue (police,
 * caractère non rendu…) plutôt que de propager l'exception jusqu'à l'envoi. */
async function safeRender(el: RenderEl): Promise<Buffer | null> {
  try {
    return await renderToBuffer(el);
  } catch (err) {
    console.error('[pdf] échec du rendu:', err);
    return null;
  }
}

export async function buildDevisPdf(id: string): Promise<Buffer | null> {
  const devis = await prisma.devis.findUnique({
    where: { id },
    include: { contact: true },
  });
  if (!devis) return null;

  // Diagnostiqueur mandaté = celui assigné au prospect lié, sinon défaut.
  let assignedEmail: string | null = null;
  if (devis.leadId) {
    const lead = await prisma.lead
      .findUnique({
        where: { id: devis.leadId },
        select: { assignedTo: { select: { email: true } } },
      })
      .catch(() => null);
    assignedEmail = lead?.assignedTo?.email ?? null;
  }

  const tpl = devisTemplate(devis.serviceType);
  const diag = diagnosticienFor({ assignedEmail, service: devis.serviceType });

  const el = createElement(DevisDocument, {
    data: {
      number: devis.number,
      objet: devis.object || tpl.objet,
      serviceType: devis.serviceType,
      bienConcerne: devis.bienConcerne,
      createdAt: devis.createdAt,
      validUntil: devis.validUntil,
      contact: devis.contact,
      intervention: tpl.intervention,
      livrable: tpl.livrable,
      diagnosticien: diag,
      prix: num(devis.totalHT),
    },
  }) as unknown as RenderEl;
  return safeRender(el);
}

export async function buildFacturePdf(id: string): Promise<Buffer | null> {
  const facture = await prisma.facture.findUnique({
    where: { id },
    include: { contact: true, lines: { orderBy: { position: 'asc' } } },
  });
  if (!facture) return null;
  const el = createElement(FactureDocument, {
    data: {
      number: facture.number,
      object: facture.object,
      mandataire: facture.mandataire,
      paymentMode: facture.paymentMode,
      issuedAt: facture.issuedAt,
      dueDate: facture.dueDate,
      acompte: facture.acompte != null ? num(facture.acompte) : null,
      createdAt: facture.createdAt,
      contact: facture.contact,
      totalHT: num(facture.totalHT),
      lines: facture.lines.map((l) => ({
        designation: l.designation,
        detail: l.detail,
        unit: l.unit,
        qty: num(l.qty),
        unitPrice: num(l.unitPrice),
        total: num(l.total),
      })),
    },
  }) as unknown as RenderEl;
  return safeRender(el);
}

export async function buildRapportPdf(id: string): Promise<Buffer | null> {
  const rapport = await prisma.rapport.findUnique({
    where: { id },
    include: { contact: true },
  });
  if (!rapport) return null;
  const content = rapport.aiContent as unknown as ReportContent | { error: string } | null;
  if (!content || 'error' in content) return null;
  const el = createElement(RapportDocument, {
    data: {
      number: rapport.number,
      title: rapport.title,
      type: rapport.type,
      bienAdresse: rapport.bienAdresse,
      ville: rapport.ville,
      createdAt: rapport.createdAt,
      status: rapport.status,
      contact: rapport.contact,
      content,
    },
  }) as unknown as RenderEl;
  return safeRender(el);
}
