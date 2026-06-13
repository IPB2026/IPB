import 'server-only';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/email';
import { COMPANY } from '@/lib/crm/company';
import {
  buildDevisPdf,
  buildFacturePdf,
  buildRapportPdf,
} from '@/lib/pdf/buffers';

/**
 * Logique d'envoi e-mail (PDF en pièce jointe) partagée entre les server actions
 * du CRM et le connecteur MCP Cowork. Aucune revalidation/redirection ici.
 */

function coverHtml(opts: { greeting: string; intro: string; number: string }): string {
  return `
  <div style="font-family: Arial, sans-serif; background:#f8fafc; padding:24px;">
    <div style="max-width:600px; margin:0 auto; background:#fff; border:1px solid #e2e8f0; border-radius:14px; overflow:hidden;">
      <div style="background:#0F172A; color:#fff; padding:18px 22px;">
        <div style="font-size:16px; font-weight:700;">${COMPANY.name}</div>
        <div style="font-size:12px; opacity:.8; margin-top:2px;">Expertise fissures, humidité & structure — Occitanie</div>
      </div>
      <div style="padding:22px;">
        <p style="margin:0 0 12px; color:#0F172A; font-size:15px;">${opts.greeting}</p>
        <p style="margin:0 0 14px; color:#334155; font-size:14px; line-height:1.6;">${opts.intro}</p>
        <p style="margin:0 0 14px; color:#334155; font-size:14px;">Le document <strong>${opts.number}</strong> est joint à cet e-mail au format PDF.</p>
        <p style="margin:0; color:#64748b; font-size:13px;">Pour toute question, contactez-nous au <strong>${COMPANY.phone}</strong> ou répondez à cet e-mail.</p>
        <p style="margin:16px 0 0; color:#0F172A; font-size:14px;">Cordialement,<br/>${COMPANY.name}</p>
      </div>
      <div style="padding:12px 22px; border-top:1px solid #e2e8f0; font-size:11px; color:#94a3b8;">
        ${COMPANY.address}, ${COMPANY.postalCode} ${COMPANY.city} · ${COMPANY.phone} · ${COMPANY.email}
      </div>
    </div>
  </div>`;
}

const firstName = (name: string) => name.split(' ')[0] || name;

export type SendResult = { ok: true } | { ok: false; error: string };

export async function sendDevisEmail(id: string): Promise<SendResult> {
  const devis = await prisma.devis.findUnique({
    where: { id },
    include: { contact: true },
  });
  if (!devis) return { ok: false, error: 'Devis introuvable' };
  if (!devis.contact.email) return { ok: false, error: 'Client sans e-mail' };
  const pdf = await buildDevisPdf(id);
  if (!pdf) return { ok: false, error: 'PDF indisponible' };

  const res = await sendEmail({
    to: devis.contact.email,
    subject: `Votre devis IPB ${devis.number}`,
    html: coverHtml({
      greeting: `Bonjour ${firstName(devis.contact.name)},`,
      intro: `Suite à votre demande, veuillez trouver ci-joint notre devis pour : <strong>${devis.object}</strong>. Pour l'accepter, retournez-le signé avec la mention « Bon pour accord » ; nous fixons alors la visite sous 72 heures.`,
      number: devis.number,
    }),
    attachments: [
      { filename: `${devis.number}.pdf`, content: pdf.toString('base64'), encoding: 'base64', contentType: 'application/pdf' },
    ],
  });
  if (!res.success) return { ok: false, error: res.error ?? 'Échec envoi' };

  await prisma.devis.update({ where: { id }, data: { status: 'ENVOYE' } });
  await prisma.activity.create({
    data: {
      type: 'EMAIL',
      contactId: devis.contactId,
      leadId: devis.leadId,
      content: `Devis ${devis.number} envoyé par e-mail à ${devis.contact.email}`,
    },
  });
  return { ok: true };
}

export async function sendFactureEmail(id: string): Promise<SendResult> {
  const facture = await prisma.facture.findUnique({
    where: { id },
    include: { contact: true },
  });
  if (!facture) return { ok: false, error: 'Facture introuvable' };
  if (!facture.contact.email) return { ok: false, error: 'Client sans e-mail' };
  const pdf = await buildFacturePdf(id);
  if (!pdf) return { ok: false, error: 'PDF indisponible' };

  const res = await sendEmail({
    to: facture.contact.email,
    subject: `Votre facture IPB ${facture.number}`,
    html: coverHtml({
      greeting: `Bonjour ${firstName(facture.contact.name)},`,
      intro: `Veuillez trouver ci-joint la facture relative à : <strong>${facture.object}</strong>. Le règlement s'effectue par virement (coordonnées sur la facture).`,
      number: facture.number,
    }),
    attachments: [
      { filename: `${facture.number}.pdf`, content: pdf.toString('base64'), encoding: 'base64', contentType: 'application/pdf' },
    ],
  });
  if (!res.success) return { ok: false, error: res.error ?? 'Échec envoi' };

  await prisma.facture.update({ where: { id }, data: { status: 'ENVOYEE' } });
  await prisma.activity.create({
    data: {
      type: 'EMAIL',
      contactId: facture.contactId,
      content: `Facture ${facture.number} envoyée par e-mail à ${facture.contact.email}`,
    },
  });
  return { ok: true };
}

export async function sendRapportEmail(id: string): Promise<SendResult> {
  const rapport = await prisma.rapport.findUnique({
    where: { id },
    include: { contact: true },
  });
  if (!rapport) return { ok: false, error: 'Rapport introuvable' };
  if (!rapport.contact.email) return { ok: false, error: 'Client sans e-mail' };
  const pdf = await buildRapportPdf(id);
  if (!pdf) return { ok: false, error: 'Rapport non généré' };

  const res = await sendEmail({
    to: rapport.contact.email,
    subject: `Votre rapport d'expertise IPB ${rapport.number}`,
    html: coverHtml({
      greeting: `Bonjour ${firstName(rapport.contact.name)},`,
      intro: `Veuillez trouver ci-joint votre rapport de diagnostic technique : <strong>${rapport.title}</strong>. Nous restons à votre disposition pour en discuter et envisager les suites.`,
      number: rapport.number,
    }),
    attachments: [
      { filename: `${rapport.number}.pdf`, content: pdf.toString('base64'), encoding: 'base64', contentType: 'application/pdf' },
    ],
  });
  if (!res.success) return { ok: false, error: res.error ?? 'Échec envoi' };

  await prisma.rapport.update({ where: { id }, data: { status: 'ENVOYE' } });
  await prisma.activity.create({
    data: {
      type: 'EMAIL',
      contactId: rapport.contactId,
      leadId: rapport.leadId,
      content: `Rapport ${rapport.number} envoyé par e-mail à ${rapport.contact.email}`,
    },
  });
  return { ok: true };
}
