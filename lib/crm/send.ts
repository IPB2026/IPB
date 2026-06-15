import 'server-only';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/email';
import { COMPANY } from '@/lib/crm/company';
import { signBookingToken } from '@/lib/crm/booking';
import {
  buildDevisPdf,
  buildFacturePdf,
  buildRapportPdf,
} from '@/lib/pdf/buffers';

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://www.ipb-expertise.fr';

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

const DEMANDE_LABEL: Record<string, string> = {
  FISSURES: 'des fissures',
  HUMIDITE: "un problème d'humidité",
  EXPERTISE_ACHAT: 'une expertise avant achat',
  MUR_PORTEUR: "un projet d'ouverture de mur porteur",
  AUTRE: 'votre projet',
};

const slotLabel = (d: Date) =>
  d.toLocaleString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  });

/** E-mail devis AVEC créneaux de visite proposés — chaque créneau est un bouton
 *  cliquable qui confirme la visite EN LIGNE (création auto dans l'agenda). */
function devisSlotsCover(opts: {
  demande: string;
  number: string;
  slots: { date: Date; url: string }[];
}): string {
  const slotsHtml = opts.slots
    .map(
      (s) =>
        `<tr><td style="padding:0 0 8px;"><a href="${s.url}" style="display:block; background:#fff; border:1px solid #C8601F; border-radius:8px; padding:11px 14px; color:#0F172A; text-decoration:none; font-size:14px; font-weight:600;">🗓️ ${slotLabel(s.date)} <span style="color:#C8601F; font-weight:700;">— Choisir ce créneau →</span></a></td></tr>`
    )
    .join('');
  return `
  <div style="font-family: Arial, sans-serif; background:#f8fafc; padding:24px;">
    <div style="max-width:600px; margin:0 auto; background:#fff; border:1px solid #e2e8f0; border-radius:14px; overflow:hidden;">
      <div style="background:#0F172A; color:#fff; padding:18px 22px;">
        <div style="font-size:16px; font-weight:700;">${COMPANY.name}</div>
        <div style="font-size:12px; opacity:.8; margin-top:2px;">Expertise fissures · humidité · structure — Occitanie</div>
      </div>
      <div style="padding:22px;">
        <p style="margin:0 0 12px; color:#0F172A; font-size:15px;">Bonjour,</p>
        <p style="margin:0 0 14px; color:#334155; font-size:14px; line-height:1.6;">Suite à votre demande concernant ${opts.demande}, veuillez trouver ci-joint notre <strong>devis n° ${opts.number}</strong> (PDF).</p>
        <p style="margin:0 0 10px; color:#334155; font-size:14px; line-height:1.6;"><strong>Pour fixer la visite sur site,</strong> choisissez le créneau qui vous convient en cliquant ci-dessous — votre rendez-vous est confirmé immédiatement :</p>
        <table role="presentation" style="width:100%; border-collapse:collapse; margin:0 0 12px;">${slotsHtml}</table>
        <p style="margin:0 0 14px; color:#334155; font-size:14px; line-height:1.6;">Pour valider le devis, retournez-le-nous avec la mention « Bon pour accord ».</p>
        <p style="margin:0 0 14px; color:#64748b; font-size:12.5px; font-style:italic; line-height:1.6;">Visite réalisée par le diagnostiqueur indépendant mandaté ; rapport remis sous 3 à 5 jours ouvrés après la visite.</p>
        <p style="margin:0; color:#64748b; font-size:13px;">Une question ? Appelez le <strong>${COMPANY.phone}</strong>.</p>
        <p style="margin:16px 0 0; color:#0F172A; font-size:14px;">Cordialement,<br/>${COMPANY.name}</p>
      </div>
      <div style="padding:12px 22px; border-top:1px solid #e2e8f0; font-size:11px; color:#94a3b8;">
        ${COMPANY.postalCode} ${COMPANY.city} · ${COMPANY.phone} · ${COMPANY.email}
      </div>
    </div>
  </div>`;
}

export type SendResult = { ok: true } | { ok: false; error: string };

export async function sendDevisEmail(
  id: string,
  slots?: Date[]
): Promise<SendResult> {
  const devis = await prisma.devis.findUnique({
    where: { id },
    include: { contact: true },
  });
  if (!devis) return { ok: false, error: 'Devis introuvable' };
  if (!devis.contact.email) return { ok: false, error: 'Client sans e-mail' };
  const pdf = await buildDevisPdf(id);
  if (!pdf) return { ok: false, error: 'PDF indisponible' };

  const withSlots = Array.isArray(slots) && slots.length > 0;
  const html = withSlots
    ? devisSlotsCover({
        demande: DEMANDE_LABEL[devis.serviceType ?? 'AUTRE'] ?? 'votre projet',
        number: devis.number,
        slots: (slots as Date[]).map((date) => ({
          date,
          url: `${SITE}/rdv?t=${signBookingToken({
            d: devis.id,
            c: devis.contactId,
            s: date.toISOString(),
          })}`,
        })),
      })
    : coverHtml({
        greeting: 'Bonjour,',
        intro: `Veuillez trouver ci-joint notre devis pour votre demande. Pour le valider, retournez-le avec la mention « Bon pour accord » ; nous fixons alors la visite sur site.`,
        number: devis.number,
      });

  const res = await sendEmail({
    to: devis.contact.email,
    subject: withSlots
      ? `Votre devis IPB ${devis.number} + créneaux pour le diagnostic`
      : `Votre devis IPB ${devis.number}`,
    html,
    attachments: [
      { filename: `${devis.number}.pdf`, content: pdf.toString('base64'), encoding: 'base64', contentType: 'application/pdf' },
    ],
  });
  if (!res.success) return { ok: false, error: res.error ?? 'Échec envoi' };

  await prisma.devis.update({ where: { id }, data: { status: 'ENVOYE' } });
  // Interconnexion : l'envoi du devis fait AVANCER le pipeline automatiquement
  // (Nouveau / À rappeler → Devis envoyé). Pas de saisie manuelle.
  if (devis.leadId) {
    await prisma.lead.updateMany({
      where: { id: devis.leadId, stage: { in: ['NOUVEAU', 'A_RAPPELER'] } },
      data: { stage: 'DEVIS_ENVOYE' },
    });
  }
  await prisma.activity.create({
    data: {
      type: 'EMAIL',
      contactId: devis.contactId,
      leadId: devis.leadId,
      content: withSlots
        ? `Devis ${devis.number} envoyé à ${devis.contact.email} avec ${slots!.length} créneau(x) proposé(s)`
        : `Devis ${devis.number} envoyé par e-mail à ${devis.contact.email}`,
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
      greeting: 'Bonjour,',
      intro: `Veuillez trouver ci-joint votre facture. Le règlement s'effectue par virement (coordonnées indiquées sur la facture).`,
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
      greeting: 'Bonjour,',
      intro: `Veuillez trouver ci-joint votre rapport d'expertise. Nous restons à votre disposition pour en échanger et répondre à vos questions.`,
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
