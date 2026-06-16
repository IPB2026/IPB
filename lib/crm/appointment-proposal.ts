import { COMPANY } from '@/lib/crm/company';

/**
 * E-mail « proposition de créneaux » envoyé depuis l'Agenda. Chaque créneau est
 * un bouton cliquable (`/rdv?t=<token>`) qui confirme le RDV EN LIGNE et le crée
 * automatiquement dans l'agenda (+ Google). Aucune donnée stockée : le token
 * signé porte {contact, créneau, type}. Builder PUR (aucune dépendance serveur).
 */

const slotLabel = (d: Date) =>
  d.toLocaleString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  });

export function proposalEmailHtml(opts: {
  clientName: string;
  objet: string; // ex. « votre diagnostic fissures »
  slots: { date: Date; url: string }[];
  message?: string | null;
}): string {
  const firstName = opts.clientName.split(' ')[0] || opts.clientName;
  const slotsHtml = opts.slots
    .map(
      (s) =>
        `<tr><td style="padding:0 0 8px;"><a href="${s.url}" style="display:block; background:#fff; border:1px solid #C8601F; border-radius:8px; padding:12px 14px; color:#0F172A; text-decoration:none; font-size:14px; font-weight:600;">🗓️ ${slotLabel(
          s.date
        )} <span style="color:#C8601F; font-weight:700;">— Réserver ce créneau →</span></a></td></tr>`
    )
    .join('');

  const messageHtml = opts.message
    ? `<p style="margin:0 0 14px; color:#334155; font-size:14px; line-height:1.6;">${opts.message
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/\n/g, '<br/>')}</p>`
    : '';

  return `
  <div style="font-family: Arial, sans-serif; background:#f8fafc; padding:24px;">
    <div style="max-width:600px; margin:0 auto; background:#fff; border:1px solid #e2e8f0; border-radius:14px; overflow:hidden;">
      <div style="background:#0F172A; color:#fff; padding:18px 22px;">
        <div style="font-size:16px; font-weight:700;">${COMPANY.name}</div>
        <div style="font-size:12px; opacity:.8; margin-top:2px;">Expertise fissures · humidité · structure — Occitanie</div>
      </div>
      <div style="padding:22px;">
        <p style="margin:0 0 12px; color:#0F172A; font-size:15px;">Bonjour ${firstName},</p>
        <p style="margin:0 0 14px; color:#334155; font-size:14px; line-height:1.6;">Pour réaliser ${opts.objet}, nous vous proposons les créneaux ci-dessous. Choisissez celui qui vous convient le mieux — votre rendez-vous est confirmé immédiatement :</p>
        ${messageHtml}
        <table role="presentation" style="width:100%; border-collapse:collapse; margin:4px 0 12px;">${slotsHtml}</table>
        <p style="margin:0 0 14px; color:#64748b; font-size:12.5px; font-style:italic; line-height:1.6;">Aucun de ces créneaux ne vous convient&nbsp;? <strong>Proposez-nous vos disponibilités</strong> en répondant simplement à cet e-mail (ou appelez-nous) — nous nous adapterons à votre agenda.</p>
        <p style="margin:0; color:#64748b; font-size:13px;">Une question ? Appelez le <strong>${COMPANY.phone}</strong>.</p>
        <p style="margin:16px 0 0; color:#0F172A; font-size:14px;">À très bientôt,<br/>${COMPANY.name}</p>
      </div>
      <div style="padding:12px 22px; border-top:1px solid #e2e8f0; font-size:11px; color:#94a3b8;">
        ${COMPANY.postalCode} ${COMPANY.city} · ${COMPANY.phone} · ${COMPANY.email}
      </div>
    </div>
  </div>`;
}
