import 'server-only';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/email';
import { COMPANY } from '@/lib/crm/company';

/**
 * Notifications internes (diagnostiqueurs / admin) et accusés client automatiques.
 *
 * Objectif Phase 2 : que personne n'attende, que rien ne se perde. Toutes les
 * fonctions sont NON BLOQUANTES — un échec d'envoi est journalisé mais ne fait
 * jamais échouer l'action métier qui les appelle (assignation, soumission, RDV).
 */

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://www.ipb-expertise.fr';

const firstName = (name: string) => name.split(' ')[0] || name;

/** Destinataire des alertes admin : boîte équipe (EMAIL_TO), sinon 1er ADMIN. */
async function adminRecipient(): Promise<string | null> {
  if (process.env.EMAIL_TO) return process.env.EMAIL_TO;
  const admin = await prisma.user
    .findFirst({ where: { role: 'ADMIN' }, select: { email: true } })
    .catch(() => null);
  return admin?.email ?? process.env.EMAIL_FROM ?? process.env.SMTP_USER ?? null;
}

// ─────────────────────────────────────────────────────────────────
// Gabarit interne sobre (back-office) — distinct des e-mails client
// ─────────────────────────────────────────────────────────────────

function staffShell(opts: {
  eyebrow: string;
  title: string;
  rows: { label: string; value: string }[];
  intro?: string;
  cta?: { label: string; href: string };
}): string {
  const rows = opts.rows
    .map(
      (r) => `
      <tr>
        <td style="padding:6px 0; color:#94a3b8; font-size:12px; width:140px; vertical-align:top;">${r.label}</td>
        <td style="padding:6px 0; color:#0F172A; font-size:13px; font-weight:600;">${r.value}</td>
      </tr>`
    )
    .join('');
  return `
  <div style="font-family: Arial, sans-serif; background:#f1f5f9; padding:24px;">
    <div style="max-width:560px; margin:0 auto; background:#fff; border:1px solid #e2e8f0; border-radius:14px; overflow:hidden;">
      <div style="background:#0F172A; color:#fff; padding:16px 22px;">
        <div style="font-size:10px; letter-spacing:.16em; text-transform:uppercase; color:#94a3b8;">${opts.eyebrow}</div>
        <div style="font-size:16px; font-weight:700; margin-top:4px;">${opts.title}</div>
      </div>
      <div style="padding:20px 22px;">
        ${opts.intro ? `<p style="margin:0 0 14px; color:#334155; font-size:13px; line-height:1.6;">${opts.intro}</p>` : ''}
        <table style="width:100%; border-collapse:collapse;">${rows}</table>
        ${
          opts.cta
            ? `<p style="margin:20px 0 0;"><a href="${opts.cta.href}" style="display:inline-block; background:#C8601F; color:#fff; text-decoration:none; padding:11px 22px; border-radius:8px; font-size:13px; font-weight:600;">${opts.cta.label}</a></p>`
            : ''
        }
      </div>
      <div style="padding:12px 22px; border-top:1px solid #e2e8f0; font-size:11px; color:#94a3b8;">
        Notification automatique du CRM ${COMPANY.name}.
      </div>
    </div>
  </div>`;
}

// ─────────────────────────────────────────────────────────────────
// 1) Diagnostiqueur notifié à l'assignation d'un prospect
// ─────────────────────────────────────────────────────────────────

export async function notifyExpertAssigned(
  leadId: string,
  expertId: string
): Promise<void> {
  try {
    const [lead, expert] = await Promise.all([
      prisma.lead.findUnique({
        where: { id: leadId },
        include: { contact: true },
      }),
      prisma.user.findUnique({
        where: { id: expertId },
        select: { email: true, name: true, role: true },
      }),
    ]);
    if (!lead || !expert?.email || expert.role !== 'EXPERT') return;

    const c = lead.contact;
    const rows = [
      { label: 'Client', value: c.name },
      { label: 'Service', value: serviceLabel(lead.service) },
      ...(c.city ? [{ label: 'Secteur', value: c.city }] : []),
      ...(c.phone ? [{ label: 'Téléphone', value: c.phone }] : []),
      ...(lead.summary ? [{ label: 'Contexte', value: lead.summary }] : []),
    ];

    await sendEmail({
      to: expert.email,
      subject: `Nouvelle intervention assignée — ${c.name}`,
      html: staffShell({
        eyebrow: 'IPB · Espace diagnostiqueur',
        title: 'Un prospect vous a été assigné',
        intro: `Bonjour ${firstName(expert.name || expert.email)}, une intervention vient de vous être confiée. Retrouvez les coordonnées dans votre espace pour planifier le diagnostic.`,
        rows,
        cta: { label: 'Ouvrir mes interventions', href: `${SITE}/admin/rapports` },
      }),
    });
  } catch (err) {
    console.error('[notify] notifyExpertAssigned échec (non bloquant):', err);
  }
}

// ─────────────────────────────────────────────────────────────────
// 2) Admin notifié quand un diagnostiqueur soumet sa saisie terrain
// ─────────────────────────────────────────────────────────────────

export async function notifyAdminRapportSubmitted(
  rapportId: string
): Promise<void> {
  try {
    const to = await adminRecipient();
    if (!to) return;
    const rapport = await prisma.rapport.findUnique({
      where: { id: rapportId },
      include: {
        contact: { select: { name: true } },
        author: { select: { name: true, email: true } },
      },
    });
    if (!rapport) return;

    await sendEmail({
      to,
      subject: `Saisie terrain à traiter — ${rapport.number}`,
      html: staffShell({
        eyebrow: 'IPB · À traiter',
        title: 'Une saisie terrain a été soumise',
        intro:
          'Un diagnostiqueur vient de soumettre sa saisie. Vous pouvez lancer la génération du rapport puis le valider.',
        rows: [
          { label: 'Référence', value: rapport.number },
          { label: 'Client', value: rapport.contact.name },
          {
            label: 'Diagnostiqueur',
            value: rapport.author?.name || rapport.author?.email || '—',
          },
        ],
        cta: {
          label: 'Ouvrir le rapport',
          href: `${SITE}/admin/rapports/${rapport.id}`,
        },
      }),
    });
  } catch (err) {
    console.error(
      '[notify] notifyAdminRapportSubmitted échec (non bloquant):',
      err
    );
  }
}

/**
 * Alerte ADMIN : un client vient de CHOISIR UNE DATE en ligne (depuis l'e-mail de
 * devis). On prévient le gérant tout de suite, avec les coordonnées et un lien
 * direct vers la fiche → réactivité maximale, plus rien ne se perd. Non bloquant.
 */
export async function notifyAdminBooking(appointmentId: string): Promise<void> {
  try {
    const to = await adminRecipient();
    if (!to) return;
    const appt = await prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: {
        contact: { select: { id: true, name: true, phone: true, email: true, city: true } },
        assignedTo: { select: { name: true, email: true } },
      },
    });
    if (!appt) return;

    const when = appt.start.toLocaleString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit',
    });

    await sendEmail({
      to,
      subject: `📅 ${appt.contact.name} a choisi une date — ${when}`,
      noUnsubscribe: true,
      html: staffShell({
        eyebrow: 'IPB · Nouveau créneau confirmé',
        title: `${appt.contact.name} a confirmé un rendez-vous`,
        intro:
          "Le client vient de choisir une date en ligne. Pensez à préparer la visite et à assigner un diagnostiqueur si ce n'est pas déjà fait.",
        rows: [
          { label: 'Client', value: appt.contact.name },
          { label: 'Visite', value: appt.title },
          { label: 'Date', value: when },
          ...(appt.location ? [{ label: 'Lieu', value: appt.location }] : []),
          ...(appt.contact.phone ? [{ label: 'Téléphone', value: appt.contact.phone }] : []),
          ...(appt.contact.email ? [{ label: 'E-mail', value: appt.contact.email }] : []),
          {
            label: 'Diagnostiqueur',
            value: appt.assignedTo?.name || appt.assignedTo?.email || '— à assigner',
          },
        ],
        cta: {
          label: 'Ouvrir la fiche client',
          href: `${SITE}/admin/clients/${appt.contact.id}`,
        },
      }),
    });
  } catch (err) {
    console.error('[notify] notifyAdminBooking échec (non bloquant):', err);
  }
}

// ─────────────────────────────────────────────────────────────────
// 3) Accusé client : confirmation de rendez-vous
// ─────────────────────────────────────────────────────────────────

export async function notifyClientAppointment(
  appointmentId: string
): Promise<void> {
  try {
    const appt = await prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: { contact: true },
    });
    if (!appt) return;
    const c = appt.contact;
    const email = c.email;
    if (!email) return;
    const dateStr = appt.start.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    const timeStr = appt.start.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const html = `
    <div style="font-family: Arial, sans-serif; background:#F3EFE8; padding:24px;">
      <div style="max-width:560px; margin:0 auto; background:#FAF9F7; border:1px solid #D8D2C9; border-radius:14px; overflow:hidden;">
        <div style="background:#0B1826; color:#fff; padding:20px 24px;">
          <div style="font-size:10px; letter-spacing:.18em; text-transform:uppercase; color:rgba(255,255,255,.5);">Confirmation de rendez-vous</div>
          <div style="font-family:Georgia,serif; font-size:20px; font-weight:700; margin-top:8px;">Institut Pathologie du Bâtiment</div>
        </div>
        <div style="padding:24px;">
          <p style="margin:0 0 14px; color:#1A1917; font-size:15px;">Bonjour,</p>
          <p style="margin:0 0 16px; color:#736D67; font-size:14px; line-height:1.7;">Nous vous confirmons la visite de diagnostic prévue. Retrouvez tous les détails ci-dessous pour la préparer sereinement :</p>
          <div style="background:#fff; border:1px solid #E7E2DA; border-radius:10px; padding:16px 18px; margin:0 0 16px;">
            <p style="margin:0 0 8px; color:#1A1917; font-size:15px; font-weight:700;">${appt.title}</p>
            <p style="margin:0; color:#736D67; font-size:14px; line-height:1.7;">
              📅 ${dateStr}<br/>
              🕑 ${timeStr}${appt.location ? `<br/>📍 ${appt.location}` : ''}
            </p>
          </div>
          <p style="margin:0 0 16px; color:#736D67; font-size:13px; line-height:1.7;">Si vous avez une question, ou si vous devez décaler ce rendez-vous, répondez simplement à cet e-mail ou appelez-nous au <strong style="color:#1A1917;">${COMPANY.phone}</strong>. Nous sommes à votre écoute.</p>
          <p style="margin:0; color:#1A1917; font-size:14px;">À très bientôt,<br/>${COMPANY.name}</p>
        </div>
        <div style="padding:12px 24px; border-top:1px solid #E7E2DA; font-size:11px; color:#A09A93;">
          ${COMPANY.address}, ${COMPANY.postalCode} ${COMPANY.city} · ${COMPANY.phone}
        </div>
      </div>
    </div>`;

    const res = await sendEmail({
      to: email,
      subject: `Confirmation de votre rendez-vous IPB — ${dateStr}`,
      html,
    });
    if (res.success) {
      await prisma.activity.create({
        data: {
          type: 'EMAIL',
          contactId: appt.contactId,
          leadId: appt.leadId,
          content: `Confirmation de RDV envoyée à ${c.email} (${dateStr} ${timeStr})`,
        },
      });
    }
  } catch (err) {
    console.error(
      '[notify] notifyClientAppointment échec (non bloquant):',
      err
    );
  }
}

// ─────────────────────────────────────────────────────────────────
// Rappel client : visite de diagnostic le lendemain (J-1)
// ─────────────────────────────────────────────────────────────────

export async function notifyClientReminder(
  appointmentId: string
): Promise<boolean> {
  try {
    const appt = await prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: { contact: true },
    });
    if (!appt) return false;
    const c = appt.contact;
    const email = c.email;
    if (!email) return false;
    const dateStr = appt.start.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
    const timeStr = appt.start.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const html = `
    <div style="font-family: Arial, sans-serif; background:#F3EFE8; padding:24px;">
      <div style="max-width:560px; margin:0 auto; background:#FAF9F7; border:1px solid #D8D2C9; border-radius:14px; overflow:hidden;">
        <div style="background:#0B1826; color:#fff; padding:20px 24px;">
          <div style="font-size:10px; letter-spacing:.18em; text-transform:uppercase; color:rgba(255,255,255,.5);">Rappel de rendez-vous</div>
          <div style="font-family:Georgia,serif; font-size:20px; font-weight:700; margin-top:8px;">Institut Pathologie du Bâtiment</div>
        </div>
        <div style="padding:24px;">
          <p style="margin:0 0 14px; color:#1A1917; font-size:15px;">Bonjour,</p>
          <p style="margin:0 0 16px; color:#736D67; font-size:14px; line-height:1.7;">Petit rappel&nbsp;: votre visite de diagnostic a lieu <strong style="color:#1A1917;">demain</strong>. Voici les détails pour la préparer sereinement&nbsp;:</p>
          <div style="background:#fff; border:1px solid #E7E2DA; border-radius:10px; padding:16px 18px; margin:0 0 16px;">
            <p style="margin:0 0 8px; color:#1A1917; font-size:15px; font-weight:700;">${appt.title}</p>
            <p style="margin:0; color:#736D67; font-size:14px; line-height:1.7;">
              📅 ${dateStr}<br/>
              🕑 ${timeStr}${appt.location ? `<br/>📍 ${appt.location}` : ''}
            </p>
          </div>
          <p style="margin:0 0 16px; color:#736D67; font-size:13px; line-height:1.7;">Merci de prévoir un accès aux zones concernées. Un imprévu ou une question&nbsp;? Appelez-nous au <strong style="color:#1A1917;">${COMPANY.phone}</strong> ou répondez à cet e-mail.</p>
          <p style="margin:0; color:#1A1917; font-size:14px;">À demain,<br/>${COMPANY.name}</p>
        </div>
        <div style="padding:12px 24px; border-top:1px solid #E7E2DA; font-size:11px; color:#A09A93;">
          ${COMPANY.address}, ${COMPANY.postalCode} ${COMPANY.city} · ${COMPANY.phone}
        </div>
      </div>
    </div>`;

    const res = await sendEmail({
      to: email,
      subject: `Rappel : votre visite IPB ${dateStr}`,
      html,
    });
    if (res.success) {
      await prisma.activity.create({
        data: {
          // LOG d'e-mail envoyé (pas une tâche) → type EMAIL, pas RELANCE, pour ne
          // jamais polluer la liste « Relances à faire ».
          type: 'EMAIL',
          contactId: appt.contactId,
          leadId: appt.leadId,
          content: `Rappel de visite J-1 (RDV ${appt.id}) envoyé à ${email} (${dateStr} ${timeStr})`,
        },
      });
      return true;
    }
    return false;
  } catch (err) {
    console.error('[notify] notifyClientReminder échec (non bloquant):', err);
    return false;
  }
}

// ─────────────────────────────────────────────────────────────────
// Accusé client : annulation de rendez-vous
// ─────────────────────────────────────────────────────────────────

export async function notifyClientCancellation(
  appointmentId: string
): Promise<void> {
  try {
    const appt = await prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: { contact: true },
    });
    if (!appt) return;
    const c = appt.contact;
    const email = c.email;
    if (!email) return;

    const dateStr = appt.start.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const html = `
    <div style="font-family: Arial, sans-serif; background:#F3EFE8; padding:24px;">
      <div style="max-width:560px; margin:0 auto; background:#FAF9F7; border:1px solid #D8D2C9; border-radius:14px; overflow:hidden;">
        <div style="background:#0B1826; color:#fff; padding:20px 24px;">
          <div style="font-size:10px; letter-spacing:.18em; text-transform:uppercase; color:rgba(255,255,255,.5);">Annulation de rendez-vous</div>
          <div style="font-family:Georgia,serif; font-size:20px; font-weight:700; margin-top:8px;">Institut Pathologie du Bâtiment</div>
        </div>
        <div style="padding:24px;">
          <p style="margin:0 0 14px; color:#1A1917; font-size:15px;">Bonjour,</p>
          <p style="margin:0 0 16px; color:#736D67; font-size:14px; line-height:1.7;">Nous vous informons que la visite de diagnostic initialement prévue le <strong style="color:#1A1917;">${dateStr}</strong> a dû être <strong style="color:#1A1917;">annulée</strong>. Nous vous prions de nous en excuser.</p>
          <p style="margin:0 0 16px; color:#736D67; font-size:14px; line-height:1.7;">Nous vous proposerons rapidement une nouvelle date. Répondez simplement à cet e-mail ou appelez-nous au <strong style="color:#1A1917;">${COMPANY.phone}</strong> pour convenir ensemble d'un créneau qui vous convient.</p>
          <p style="margin:0; color:#1A1917; font-size:14px;">Bien à vous,<br/>${COMPANY.name}</p>
        </div>
        <div style="padding:12px 24px; border-top:1px solid #E7E2DA; font-size:11px; color:#A09A93;">
          ${COMPANY.address}, ${COMPANY.postalCode} ${COMPANY.city} · ${COMPANY.phone}
        </div>
      </div>
    </div>`;

    const res = await sendEmail({
      to: email,
      subject: `Annulation de votre rendez-vous IPB du ${dateStr}`,
      html,
    });
    if (res.success) {
      await prisma.activity.create({
        data: {
          type: 'EMAIL',
          contactId: appt.contactId,
          leadId: appt.leadId,
          content: `Annulation de RDV envoyée à ${email} (${dateStr})`,
        },
      });
    }
  } catch (err) {
    console.error('[notify] notifyClientCancellation échec (non bloquant):', err);
  }
}

// ─────────────────────────────────────────────────────────────────
// Accusé client : règlement reçu (facture soldée)
// ─────────────────────────────────────────────────────────────────

export async function notifyClientPayment(factureId: string): Promise<void> {
  try {
    const facture = await prisma.facture.findUnique({
      where: { id: factureId },
      include: { contact: true },
    });
    if (!facture) return;
    const c = facture.contact;
    const email = c.email;
    if (!email) return;

    // Un rapport est-il en cours pour ce client (saisi/généré mais pas encore
    // envoyé) ? Si oui, on rassure sur le délai de remise.
    const rapportEnCours = await prisma.rapport.count({
      where: { contactId: facture.contactId, status: { not: 'ENVOYE' } },
    });

    const reportLine =
      rapportEnCours > 0
        ? `<p style="margin:0 0 16px; color:#736D67; font-size:14px; line-height:1.7;">Votre rapport d'expertise est en cours de finalisation par notre équipe : vous le recevrez sous <strong style="color:#1A1917;">3 à 5 jours ouvrés</strong> — nous prenons le temps de soigner chaque conclusion.</p>`
        : '';

    const html = `
    <div style="font-family: Arial, sans-serif; background:#F3EFE8; padding:24px;">
      <div style="max-width:560px; margin:0 auto; background:#FAF9F7; border:1px solid #D8D2C9; border-radius:14px; overflow:hidden;">
        <div style="background:#0B1826; color:#fff; padding:20px 24px;">
          <div style="font-size:10px; letter-spacing:.18em; text-transform:uppercase; color:rgba(255,255,255,.5);">Règlement reçu</div>
          <div style="font-family:Georgia,serif; font-size:20px; font-weight:700; margin-top:8px;">Institut Pathologie du Bâtiment</div>
        </div>
        <div style="padding:24px;">
          <p style="margin:0 0 14px; color:#1A1917; font-size:15px;">Bonjour,</p>
          <p style="margin:0 0 16px; color:#736D67; font-size:14px; line-height:1.7;">Nous vous confirmons la bonne réception de votre règlement de la facture <strong style="color:#1A1917;">${facture.number}</strong>. Merci de votre confiance.</p>
          ${reportLine}
          <p style="margin:0 0 16px; color:#736D67; font-size:14px; line-height:1.7;">Pour toute question, ou si vous souhaitez des précisions, n'hésitez pas à nous écrire ou à nous appeler au <strong style="color:#1A1917;">${COMPANY.phone}</strong>.</p>
          <p style="margin:0; color:#1A1917; font-size:14px;">Bien à vous,<br/>${COMPANY.name}</p>
        </div>
        <div style="padding:12px 24px; border-top:1px solid #E7E2DA; font-size:11px; color:#A09A93;">
          ${COMPANY.address}, ${COMPANY.postalCode} ${COMPANY.city} · ${COMPANY.phone}
        </div>
      </div>
    </div>`;

    const res = await sendEmail({
      to: email,
      subject: `Règlement reçu — facture IPB ${facture.number}`,
      html,
    });
    if (res.success) {
      await prisma.activity.create({
        data: {
          type: 'EMAIL',
          contactId: facture.contactId,
          content: `Confirmation de règlement envoyée à ${email} (facture ${facture.number})`,
        },
      });
    }
  } catch (err) {
    console.error('[notify] notifyClientPayment échec (non bloquant):', err);
  }
}

// ─────────────────────────────────────────────────────────────────

const SERVICE_LABELS: Record<string, string> = {
  FISSURES: 'Fissures',
  HUMIDITE: 'Humidité',
  EXPERTISE_ACHAT: 'Expertise avant achat',
  MUR_PORTEUR: 'Ouverture de mur porteur',
  AUTRE: 'Autre',
};
function serviceLabel(s: string): string {
  return SERVICE_LABELS[s] ?? s;
}
