import 'server-only';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/email';
import { COMPANY, euros } from '@/lib/crm/company';
import { signBookingToken } from '@/lib/crm/booking';
import { signActionToken } from '@/lib/crm/client-actions';
import { devisRelance, factureRelance } from '@/lib/emailTemplates';
import {
  buildDevisPdf,
  buildFacturePdf,
  buildRapportPdf,
} from '@/lib/pdf/buffers';

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://www.ipb-expertise.fr';

/** Bouton d'action client (1 clic) — lien signé vers /c. */
function ctaButton(url: string, label: string, color = '#C8601F'): string {
  return `<a href="${url}" style="display:inline-block; background:${color}; color:#fff; text-decoration:none; padding:11px 20px; border-radius:8px; font-size:14px; font-weight:600; margin:0 6px 8px 0;">${label}</a>`;
}

/**
 * Logique d'envoi e-mail (PDF en pièce jointe) partagée entre les server actions
 * du CRM et le connecteur MCP Cowork. Aucune revalidation/redirection ici.
 */

function coverHtml(opts: {
  greeting: string;
  intro: string;
  number: string;
  actionsHtml?: string;
}): string {
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
        ${opts.actionsHtml ? `<div style="margin:0 0 16px;">${opts.actionsHtml}</div>` : ''}
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
  acceptUrl: string;
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
        <p style="margin:0 0 14px; color:#334155; font-size:14px; line-height:1.6;">Merci de votre confiance. Suite à votre demande concernant ${opts.demande}, vous trouverez ci-joint notre <strong>devis n° ${opts.number}</strong>.</p>
        <p style="margin:0 0 10px; color:#334155; font-size:14px; line-height:1.6;"><strong>Pour programmer la visite sur site,</strong> sélectionnez le créneau qui vous convient en cliquant ci-dessous — votre rendez-vous est confirmé instantanément :</p>
        <table role="presentation" style="width:100%; border-collapse:collapse; margin:0 0 12px;">${slotsHtml}</table>
        <p style="margin:0 0 10px; color:#334155; font-size:14px; line-height:1.6;"><strong>Pour valider le devis,</strong> un seul clic ci-dessous (« Bon pour accord » en ligne) :</p>
        <p style="margin:0 0 14px;">${ctaButton(opts.acceptUrl, '✓ Valider mon devis')}</p>
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

  const acceptUrl = `${SITE}/c?t=${signActionToken({ k: 'devis-accept', id: devis.id })}`;
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
        acceptUrl,
      })
    : coverHtml({
        greeting: 'Bonjour,',
        intro: `Vous trouverez ci-joint notre devis pour votre demande. Pour le valider, c'est en un clic ci-dessous (« Bon pour accord » en ligne) — ou retournez-le-nous par e-mail. Nous coordonnerons alors la visite sur site à votre convenance.`,
        number: devis.number,
        actionsHtml: ctaButton(acceptUrl, '✓ Valider mon devis'),
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

  // sentAt = base FIABLE des relances ; relanceCount remis à 0 → chaque (ré)envoi
  // redémarre proprement la séquence de relances (plus de matching de texte).
  await prisma.devis.update({
    where: { id },
    data: { status: 'ENVOYE', sentAt: new Date(), relanceCount: 0 },
  });
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

  const recuUrl = `${SITE}/c?t=${signActionToken({ k: 'facture-recu', id: facture.id })}`;
  const payeUrl = `${SITE}/c?t=${signActionToken({ k: 'facture-paye', id: facture.id })}`;
  const res = await sendEmail({
    to: facture.contact.email,
    subject: `Votre facture IPB ${facture.number}`,
    html: coverHtml({
      greeting: 'Bonjour,',
      intro: `Vous trouverez ci-joint votre facture. Le règlement se fait par virement, aux coordonnées bancaires indiquées sur le document. Dès réception de votre paiement, nous vous transmettrons le rapport d'expertise sous 3 à 5 jours ouvrés.`,
      number: facture.number,
      actionsHtml:
        ctaButton(recuUrl, "J'ai bien reçu la facture", '#475569') +
        ctaButton(payeUrl, "J'ai effectué le paiement", '#059669'),
    }),
    attachments: [
      { filename: `${facture.number}.pdf`, content: pdf.toString('base64'), encoding: 'base64', contentType: 'application/pdf' },
    ],
  });
  if (!res.success) return { ok: false, error: res.error ?? 'Échec envoi' };

  // relanceCount remis à 0 → l'envoi (ou le renvoi) redémarre la séquence de
  // relances de paiement (basée sur dueDate + ce compteur fiable).
  await prisma.facture.update({
    where: { id },
    data: { status: 'ENVOYEE', relanceCount: 0 },
  });
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
      intro: `Vous trouverez ci-joint votre rapport d'expertise. N'hésitez pas à nous contacter pour approfondir les conclusions ou si vous souhaitez des précisions — nous sommes là pour vous accompagner.`,
      number: rapport.number,
    }),
    attachments: [
      { filename: `${rapport.number}.pdf`, content: pdf.toString('base64'), encoding: 'base64', contentType: 'application/pdf' },
    ],
  });
  if (!res.success) return { ok: false, error: res.error ?? 'Échec envoi' };

  await prisma.rapport.update({ where: { id }, data: { status: 'ENVOYE' } });
  // COHÉRENCE : le rapport est transmis → la tâche « Rapport à rédiger » (créée à
  // l'encaissement) n'a plus lieu d'être. On la referme automatiquement pour que
  // le tableau de bord et la fiche ne se contredisent plus (fini « rapport à
  // traiter » alors que la fiche affiche « rapport transmis »).
  await prisma.activity.updateMany({
    where: {
      contactId: rapport.contactId,
      type: 'RELANCE',
      done: false,
      content: { contains: 'Rapport à rédiger' },
    },
    data: { done: true, doneAt: new Date() },
  });
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

/**
 * RÈGLE MÉTIER (« liberté totale ») : après 3 relances d'un devis restées sans
 * réponse, on NE classe PLUS le dossier perdu automatiquement. On crée une TÂCHE
 * de décision (relance « due ») pour que le gérant tranche lui-même : marquer
 * perdu OU relancer. Le devis reste en l'état (ni expiré, ni perdu) ; le cron de
 * relances s'arrête de lui-même (relanceCount au max). Idempotent (anti-doublon).
 * Le nom est conservé pour compatibilité d'appel (cron + relance manuelle).
 */
export async function markDevisLost(
  devisId: string,
  leadId: string | null,
  contactId: string,
  number: string
): Promise<void> {
  // Anti-doublon : une seule tâche de décision par devis.
  const already = await prisma.activity.count({
    where: { contactId, content: { contains: `Décision devis ${number}` } },
  });
  if (already > 0) return;
  await prisma.activity.create({
    data: {
      type: 'RELANCE',
      contactId,
      leadId,
      content: `Décision devis ${number} : sans réponse après 3 relances — à vous de trancher (marquer perdu ou relancer).`,
      dueAt: new Date(),
    },
  });
}

/**
 * Relance MANUELLE d'un devis resté sans réponse (1 clic depuis la fiche ou le
 * dashboard). E-mail chaleureux (template `devisRelance`, ton « douce »). Le
 * libellé d'activité ne percute PAS le matcher du cron de relances auto (qui
 * cherche « Relance devis <n°> ») → les deux mécanismes restent indépendants.
 */
export async function sendDevisRelanceEmail(id: string): Promise<SendResult> {
  const devis = await prisma.devis.findUnique({
    where: { id },
    include: { contact: true },
  });
  if (!devis) return { ok: false, error: 'Devis introuvable' };
  if (!devis.contact.email) return { ok: false, error: 'Client sans e-mail' };
  const firstName = devis.contact.name.split(' ')[0] || devis.contact.name;
  // 0 → 1er rappel (doux) · 1 → 2e (ferme) · 2 → 3e (dernière relance avant clôture).
  const step: 1 | 2 | 3 =
    devis.relanceCount >= 2 ? 3 : devis.relanceCount >= 1 ? 2 : 1;

  const res = await sendEmail({
    to: devis.contact.email,
    subject:
      step === 1
        ? `Votre devis IPB ${devis.number} — une question ?`
        : step === 2
          ? `Votre devis IPB ${devis.number} est toujours valable`
          : `Votre devis IPB ${devis.number} — dernière relance avant clôture`,
    html: devisRelance({ firstName, object: devis.object, step }),
  });
  if (!res.success) return { ok: false, error: res.error ?? 'Échec envoi' };

  // La relance manuelle COMPTE comme une étape : on incrémente relanceCount pour
  // que le cron n'enchaîne pas sa propre relance le même jour (anti double-envoi).
  // Migre sentAt si le devis est antérieur à la migration (legacy).
  await prisma.devis.update({
    where: { id: devis.id },
    data: {
      relanceCount: { increment: 1 },
      ...(devis.sentAt ? {} : { sentAt: devis.updatedAt }),
    },
  });
  await prisma.activity.create({
    data: {
      type: 'EMAIL',
      contactId: devis.contactId,
      leadId: devis.leadId,
      content: `Relance manuelle du devis ${devis.number} envoyée à ${devis.contact.email}`,
    },
  });
  // Après la 3e relance sans réponse → on NE perd PLUS le dossier automatiquement :
  // on crée une tâche de décision (perdu ou relancer ?) que le gérant tranche.
  if (step === 3) {
    await markDevisLost(devis.id, devis.leadId, devis.contactId, devis.number);
  }
  return { ok: true };
}

/**
 * Relance MANUELLE d'une facture (1 clic depuis la fiche). E-mail bienveillant
 * (template `factureRelance`). Montant rappelé = RESTE DÛ (total − acompte).
 */
export async function sendFactureRelanceEmail(id: string): Promise<SendResult> {
  const facture = await prisma.facture.findUnique({
    where: { id },
    include: { contact: true },
  });
  if (!facture) return { ok: false, error: 'Facture introuvable' };
  if (!facture.contact.email) return { ok: false, error: 'Client sans e-mail' };
  const firstName = facture.contact.name.split(' ')[0] || facture.contact.name;
  const resteDu = Math.max(0, Number(facture.totalHT) - Number(facture.acompte ?? 0));
  // 0 → 1er rappel (doux) · 1 → 2e (ferme) · 2 → 3e (dernier rappel, plus dur mais respectueux).
  const step: 1 | 2 | 3 =
    facture.relanceCount >= 2 ? 3 : facture.relanceCount >= 1 ? 2 : 1;

  const res = await sendEmail({
    to: facture.contact.email,
    subject:
      step === 1
        ? `Facture ${facture.number} — petit rappel`
        : step === 2
          ? `Facture ${facture.number} — toujours en attente de règlement`
          : `Facture ${facture.number} — dernier rappel avant recouvrement`,
    html: factureRelance({
      firstName,
      number: facture.number,
      montant: euros(resteDu),
      dueDate: facture.dueDate
        ? facture.dueDate.toLocaleDateString('fr-FR')
        : '—',
      step,
    }),
  });
  if (!res.success) return { ok: false, error: res.error ?? 'Échec envoi' };

  // Compte comme une étape de relance (anti double-envoi avec le cron).
  await prisma.facture.update({
    where: { id: facture.id },
    data: { relanceCount: { increment: 1 } },
  });
  await prisma.activity.create({
    data: {
      type: 'EMAIL',
      contactId: facture.contactId,
      content: `Relance manuelle de la facture ${facture.number} envoyée à ${facture.contact.email}`,
    },
  });
  return { ok: true };
}
