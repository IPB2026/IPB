import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/email';
import {
  emailTemplates,
  emailSequence,
  devisRelance,
  factureRelance,
  postChantierReviewRequest,
} from '@/lib/emailTemplates';
import { euros } from '@/lib/crm/company';
import { createInvoiceForAppointment, DIAGNOSTIC_APPT_TYPES } from '@/lib/crm/invoicing';
import { markDevisLost } from '@/lib/crm/send';
import { notifyClientReminder } from '@/lib/crm/notify';
import { purgeContactById, TRASH_RETENTION_DAYS } from '@/lib/crm/contacts';
import { closeResolvedRelances } from '@/lib/crm/relances-cleanup';
import { RULES } from '@/lib/crm/rules';
import type { LeadTier } from '@prisma/client';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

// Étapes de relance (hors J+0 déjà envoyé à la création) : J+1, J+3, J+7, J+14
const STEPS = emailSequence.filter((s) => s.offsetDays >= 1);

type TemplateName = keyof typeof emailTemplates;

const DAY = 86_400_000;

/**
 * Cron quotidien : envoie l'étape de relance due suivante à chaque prospect
 * éligible (e-mail connu, dossier encore ouvert), une seule étape par passage.
 * Protégé par CRON_SECRET (Vercel ajoute `Authorization: Bearer $CRON_SECRET`).
 */
export async function GET(req: Request) {
  // CRON_SECRET OBLIGATOIRE : sans lui, cet endpoint enverrait des e-mails en
  // masse à qui le déclenche. On refuse plutôt que d'ouvrir la route.
  if (!process.env.CRON_SECRET) {
    return new Response('CRON_SECRET non configuré', { status: 503 });
  }
  if (
    req.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return new Response('Non autorisé', { status: 401 });
  }

  const now = Date.now();

  // Filet de sécurité : referme les relances dont le motif est résolu (rapport
  // transmis, devis tranché) — cohérence garantie même sans ouvrir le tableau de bord.
  await closeResolvedRelances();

  const leads = await prisma.lead.findMany({
    where: {
      relanceStep: { lt: STEPS.length },
      stage: { in: ['NOUVEAU', 'A_RAPPELER', 'RDV_PLANIFIE'] },
      // « Liberté totale » : un dossier piloté À LA MAIN (phase forcée) ne reçoit
      // plus la séquence d'e-mails de relance automatique — c'est vous qui menez.
      manualPhase: null,
      contact: { email: { not: null }, archivedAt: null }, // pas de relance aux clients à la corbeille
    },
    include: { contact: true },
    take: 100,
    orderBy: { createdAt: 'asc' },
  });

  let sent = 0;
  const errors: string[] = [];

  for (const lead of leads) {
    const step = STEPS[lead.relanceStep];
    if (!step) continue;
    const ageDays = (now - lead.createdAt.getTime()) / DAY;
    if (ageDays < step.offsetDays) continue;
    const email = lead.contact.email;
    if (!email) continue;
    // RÈGLE N10 — pause : si le gérant a été en contact (appel/note) avec ce client
    // dans les 3 derniers jours, on n'envoie PAS d'e-mail auto (il est déjà suivi).
    const recentTouch = await prisma.activity.count({
      where: {
        contactId: lead.contactId,
        type: { in: ['APPEL', 'NOTE'] },
        createdAt: { gte: new Date(now - RULES.relancePauseDays * DAY) },
      },
    });
    if (recentTouch > 0) continue;

    const ctx = {
      firstName: lead.contact.name.split(' ')[0] || lead.contact.name,
      city: lead.contact.city ?? undefined,
      tier: (lead.tier as LeadTier | null) ?? undefined,
      path: (lead.service === 'MUR_PORTEUR' ? 'mur-porteur' : 'fissure') as
        | 'fissure'
        | 'mur-porteur',
    };

    try {
      const html = emailTemplates[step.name as TemplateName](ctx);
      const res = await sendEmail({
        to: email,
        subject: step.subject(ctx),
        html,
      });
      if (!res.success) {
        errors.push(`${lead.id}: ${res.error}`);
        continue;
      }
      await prisma.lead.update({
        where: { id: lead.id },
        data: { relanceStep: { increment: 1 }, relanceLastAt: new Date() },
      });
      await prisma.activity.create({
        data: {
          type: 'EMAIL',
          leadId: lead.id,
          contactId: lead.contactId,
          content: `Relance auto J+${step.offsetDays} (${step.name}) envoyée à ${email}`,
        },
      });
      sent++;
    } catch (e) {
      errors.push(`${lead.id}: ${e instanceof Error ? e.message : 'err'}`);
    }
  }

  // ── Relances commerciales : devis ENVOYE sans réponse (J+3, J+7 puis J+14) ──
  // FIABLE depuis la migration relance_tracking : on s'appuie sur les champs
  // Devis.sentAt (date d'envoi) et Devis.relanceCount (compteur), au lieu d'un
  // matching de texte sur les activités. Stop dès que le devis quitte ENVOYE.
  // 3 relances sans réponse → tâche de décision (perdu/relancer ?), JAMAIS de
  // passage automatique en PERDU (markDevisLost crée désormais un rappel).
  const DEVIS_STEPS = RULES.relanceDevisDays;
  let devisSent = 0;
  try {
    const devisList = await prisma.devis.findMany({
      where: {
        status: 'ENVOYE',
        relanceCount: { lt: DEVIS_STEPS.length },
        contact: { email: { not: null } },
      },
      include: { contact: true },
      take: 100,
      orderBy: { createdAt: 'asc' },
    });

    for (const devis of devisList) {
      const email = devis.contact.email;
      if (!email) continue;

      // FRONTIÈRE DE MIGRATION : un devis envoyé AVANT la migration relance_tracking
      // a sentAt=null et relanceCount=0 même s'il a déjà reçu des relances (ancien
      // système, dérivé des activités). On reconstruit alors son état depuis les
      // activités pour NE PAS le relancer à zéro (double e-mail au client).
      const legacy = devis.sentAt == null;
      let relanceCount = devis.relanceCount;
      if (legacy) {
        relanceCount = await prisma.activity.count({
          where: {
            contactId: devis.contactId,
            content: { contains: `Relance devis ${devis.number} ` },
          },
        });
        if (relanceCount >= DEVIS_STEPS.length) continue;
      }
      const sentAt = devis.sentAt ?? devis.updatedAt;
      const offset = DEVIS_STEPS[relanceCount];
      const ageDays = (now - sentAt.getTime()) / DAY;
      if (ageDays < offset) continue;

      const step = (relanceCount + 1) as 1 | 2 | 3;
      try {
        const res = await sendEmail({
          to: email,
          subject:
            step === 1
              ? 'Votre devis IPB — une question ?'
              : step === 2
                ? 'Votre devis IPB est toujours valable'
                : 'Votre devis IPB — dernière relance avant clôture',
          html: devisRelance({
            firstName: devis.contact.name.split(' ')[0] || devis.contact.name,
            object: devis.object,
            step,
          }),
        });
        if (!res.success) {
          errors.push(`devis ${devis.id}: ${res.error}`);
          continue;
        }
        // Écrit l'état RÉEL (set explicite) : fige le compteur et migre sentAt
        // pour un devis legacy → les passages suivants utilisent les champs.
        await prisma.devis.update({
          where: { id: devis.id },
          data: { relanceCount: relanceCount + 1, ...(legacy ? { sentAt } : {}) },
        });
        await prisma.activity.create({
          data: {
            type: 'EMAIL',
            contactId: devis.contactId,
            leadId: devis.leadId,
            content: `Relance devis ${devis.number} J+${offset} envoyée à ${email}`,
          },
        });
        // Après la dernière relance prévue (3e) sans réponse → client PERDU.
        if (relanceCount + 1 >= DEVIS_STEPS.length) {
          await markDevisLost(devis.id, devis.leadId, devis.contactId, devis.number);
        }
        devisSent++;
      } catch (e) {
        errors.push(`devis ${devis.id}: ${e instanceof Error ? e.message : 'err'}`);
      }
    }
  } catch (e) {
    errors.push(`devis-loop: ${e instanceof Error ? e.message : 'err'}`);
  }

  // ── Relances de factures impayées (échéance dépassée : J+3, J+7, puis J+14
  //    en dernier rappel plus ferme). On n'abandonne pas une créance. ──
  const FACTURE_STEPS = RULES.relanceFactureDays;
  let factureSent = 0;
  try {
    const factures = await prisma.facture.findMany({
      where: {
        status: 'ENVOYEE',
        relanceCount: { lt: FACTURE_STEPS.length },
        dueDate: { not: null, lt: new Date(now) },
        contact: { email: { not: null } },
      },
      include: { contact: true },
      take: 100,
      orderBy: { dueDate: 'asc' },
    });

    for (const f of factures) {
      const email = f.contact.email;
      if (!email || !f.dueDate) continue;

      // FRONTIÈRE DE MIGRATION : une facture relancée avant la migration a
      // relanceCount=0 (pas de champ pour la distinguer d'une facture jamais
      // relancée). Quand le compteur est à 0, on vérifie les activités pour ne
      // pas re-relancer une facture déjà relancée sous l'ancien système.
      let relanceCount = f.relanceCount;
      if (relanceCount === 0) {
        relanceCount = await prisma.activity.count({
          where: {
            contactId: f.contactId,
            content: { contains: `Relance facture ${f.number} ` },
          },
        });
        if (relanceCount >= FACTURE_STEPS.length) continue;
      }
      const overdueDays = (now - f.dueDate.getTime()) / DAY;
      const offset = FACTURE_STEPS[relanceCount];
      if (overdueDays < offset) continue;

      // Montant rappelé = RESTE DÛ (total − acompte), cohérent avec la relance
      // manuelle ; ne sur-facture pas un client ayant déjà versé un acompte.
      const resteDu = Math.max(0, Number(f.totalHT) - Number(f.acompte ?? 0));
      try {
        const res = await sendEmail({
          to: email,
          subject: `Facture ${f.number} — en attente de règlement`,
          html: factureRelance({
            firstName: f.contact.name.split(' ')[0] || f.contact.name,
            number: f.number,
            montant: euros(resteDu),
            dueDate: f.dueDate.toLocaleDateString('fr-FR'),
            step: (relanceCount >= 2 ? 3 : relanceCount >= 1 ? 2 : 1) as 1 | 2 | 3,
          }),
        });
        if (!res.success) {
          errors.push(`facture ${f.id}: ${res.error}`);
          continue;
        }
        await prisma.facture.update({
          where: { id: f.id },
          data: { relanceCount: relanceCount + 1 },
        });
        await prisma.activity.create({
          data: {
            type: 'EMAIL',
            contactId: f.contactId,
            content: `Relance facture ${f.number} (J+${offset} après échéance) envoyée à ${email}`,
          },
        });
        factureSent++;
      } catch (e) {
        errors.push(`facture ${f.id}: ${e instanceof Error ? e.message : 'err'}`);
      }
    }
  } catch (e) {
    errors.push(`facture-loop: ${e instanceof Error ? e.message : 'err'}`);
  }

  // ── Facturation automatique J+1 : RDV diagnostic RÉALISÉ hier ou avant (≤ 7 j),
  //    sans facture, client avec e-mail → on GÉNÈRE ET on ENVOIE la facture.
  //    (Workflow gérant : « le lendemain de la visite, on transmet la facture ».)
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const sevenDaysAgo = new Date(now - 7 * DAY);
  let factureAuto = 0;
  try {
    const appts = await prisma.appointment.findMany({
      where: {
        status: 'REALISE',
        factureId: null,
        type: { in: DIAGNOSTIC_APPT_TYPES },
        start: { lt: startOfToday, gte: sevenDaysAgo },
        contact: { email: { not: null } },
      },
      include: { contact: true },
      // Génération PDF + envoi = lourd → on plafonne par passage (budget 60 s).
      // Un éventuel backlog est traité aux passages suivants (idempotent).
      take: 15,
      orderBy: { start: 'asc' },
    });
    for (const appt of appts) {
      try {
        const inv = await createInvoiceForAppointment(appt.id);
        if (!inv || !inv.created) continue; // déjà facturé entre-temps
        // PAS d'envoi automatique : la facture est créée en BROUILLON. L'admin la
        // relit et l'envoie lui-même. On la fait remonter dans les relances dues.
        await prisma.activity.create({
          data: {
            type: 'RELANCE',
            contactId: appt.contactId,
            leadId: appt.leadId,
            content: `Facture à relire et envoyer — visite du ${appt.start.toLocaleDateString('fr-FR')} réalisée.`,
            dueAt: new Date(),
          },
        });
        factureAuto++;
      } catch (e) {
        errors.push(`facture-auto ${appt.id}: ${e instanceof Error ? e.message : 'err'}`);
      }
    }
  } catch (e) {
    errors.push(`facture-auto-loop: ${e instanceof Error ? e.message : 'err'}`);
  }

  // ── Demande d'avis Google : J+7 après l'envoi du rapport. Le bouche-à-oreille
  //    et la note Google sont la 1ʳᵉ source de dossiers → on sollicite UNE fois par
  //    rapport (dédup via activité). Délai réglable (REVIEW_DELAY_DAYS). Le lien
  //    direct vient de IPB_GOOGLE_REVIEW_URL (sinon repli vers la fiche Google). ──
  const REVIEW_DELAY_DAYS = RULES.reviewDelayDays;
  let avisSent = 0;
  try {
    const cutoff = new Date(now - REVIEW_DELAY_DAYS * DAY);
    const rapports = await prisma.rapport.findMany({
      where: {
        status: 'ENVOYE',
        updatedAt: { lt: cutoff },
        // C3 — moteur d'avis : une SEULE demande par client (reviewRequestedAt null).
        contact: { email: { not: null }, reviewRequestedAt: null },
      },
      include: { contact: true },
      take: 50,
      orderBy: { updatedAt: 'asc' },
    });
    for (const r of rapports) {
      const email = r.contact.email;
      if (!email) continue;
      try {
        const res = await sendEmail({
          to: email,
          subject: 'Votre avis sur votre expertise IPB',
          html: postChantierReviewRequest({
            firstName: r.contact.name.split(' ')[0] || r.contact.name,
            city: r.contact.city ?? undefined,
            serviceType: 'diagnostic',
          }),
        });
        if (!res.success) {
          errors.push(`avis ${r.id}: ${res.error}`);
          continue;
        }
        await prisma.activity.create({
          data: {
            type: 'EMAIL',
            contactId: r.contactId,
            leadId: r.leadId,
            content: `Demande d'avis Google (rapport ${r.number}) envoyée à ${email}`,
          },
        });
        // C3 — trace la demande d'avis sur le contact (dédup + métrique pilotage).
        await prisma.contact.update({
          where: { id: r.contactId },
          data: { reviewRequestedAt: new Date() },
        });
        avisSent++;
      } catch (e) {
        errors.push(`avis ${r.id}: ${e instanceof Error ? e.message : 'err'}`);
      }
    }
  } catch (e) {
    errors.push(`avis-loop: ${e instanceof Error ? e.message : 'err'}`);
  }

  // ── Rappel client J-1 : RDV de diagnostic planifiés DEMAIN. Un seul envoi par
  //    RDV (dédup par activité). Cron quotidien → fenêtre = la journée de demain. ──
  const tomorrowStart = new Date(startOfToday);
  tomorrowStart.setDate(tomorrowStart.getDate() + 1);
  const tomorrowEnd = new Date(tomorrowStart);
  tomorrowEnd.setDate(tomorrowEnd.getDate() + 1);
  let rappelsSent = 0;
  try {
    const appts = await prisma.appointment.findMany({
      where: {
        status: 'PLANIFIE',
        start: { gte: tomorrowStart, lt: tomorrowEnd },
        contact: { email: { not: null } },
      },
      include: { contact: true },
      take: 50,
      orderBy: { start: 'asc' },
    });
    for (const a of appts) {
      const already = await prisma.activity.count({
        where: {
          contactId: a.contactId,
          content: { contains: `Rappel de visite J-1 (RDV ${a.id})` },
        },
      });
      if (already > 0) continue;
      if (await notifyClientReminder(a.id)) rappelsSent++;
    }
  } catch (e) {
    errors.push(`rappel-j1-loop: ${e instanceof Error ? e.message : 'err'}`);
  }

  // ── Purge de la corbeille : suppression DÉFINITIVE des clients archivés depuis
  //    plus de 30 jours (fichiers Blob + cascade DB). Bornée par passage. ──
  let purged = 0;
  try {
    const cutoff = new Date(now - TRASH_RETENTION_DAYS * DAY);
    const stale = await prisma.contact.findMany({
      where: { archivedAt: { not: null, lt: cutoff } },
      select: { id: true },
      take: 50,
    });
    for (const c of stale) {
      try {
        await purgeContactById(c.id);
        purged++;
      } catch (e) {
        errors.push(`purge ${c.id}: ${e instanceof Error ? e.message : 'err'}`);
      }
    }
  } catch (e) {
    errors.push(`purge-loop: ${e instanceof Error ? e.message : 'err'}`);
  }

  // ── RÈGLE N4 : prospects DORMANTS (aucun échange depuis 30 j, pas encore client,
  //    non perdus) → tâche « à requalifier » (une seule par contact, dédup). ──
  let dormants = 0;
  try {
    const cutoff = new Date(now - RULES.dormantDays * DAY);
    const stale = await prisma.lead.findMany({
      where: {
        stage: { notIn: ['PERDU', 'GAGNE'] },
        contact: {
          archivedAt: null,
          activities: { none: { createdAt: { gte: cutoff } } },
          devis: { none: { status: 'ACCEPTE' } },
          factures: { none: {} },
        },
      },
      select: { id: true, contactId: true },
      take: 50,
      orderBy: { createdAt: 'asc' },
    });
    for (const l of stale) {
      const already = await prisma.activity.count({
        where: { contactId: l.contactId, type: 'RELANCE', done: false, content: { contains: 'à requalifier' } },
      });
      if (already > 0) continue;
      await prisma.activity.create({
        data: {
          type: 'RELANCE',
          leadId: l.id,
          contactId: l.contactId,
          content: 'Prospect dormant (aucun échange depuis 30 j) — à requalifier ou classer.',
          dueAt: new Date(),
        },
      });
      dormants++;
    }
  } catch (e) {
    errors.push(`dormants-loop: ${e instanceof Error ? e.message : 'err'}`);
  }

  // ── RÈGLE N8 : dossiers TERMINÉS de longue date (rapport transmis + aucun échange
  //    depuis 6 mois) → SUGGESTION « à archiver ? » (jamais d'archivage automatique :
  //    on ne supprime pas une donnée client sans décision humaine). ──
  let aArchiver = 0;
  try {
    const sixMonths = new Date(now - RULES.archiveSuggestDays * DAY);
    const oldDone = await prisma.contact.findMany({
      where: {
        archivedAt: null,
        rapports: { some: { status: 'ENVOYE' } },
        activities: { none: { createdAt: { gte: sixMonths } } },
      },
      select: { id: true, leads: { select: { id: true }, take: 1 } },
      take: 50,
    });
    for (const c of oldDone) {
      const already = await prisma.activity.count({
        where: { contactId: c.id, type: 'RELANCE', done: false, content: { contains: 'à archiver' } },
      });
      if (already > 0) continue;
      await prisma.activity.create({
        data: {
          type: 'RELANCE',
          contactId: c.id,
          leadId: c.leads[0]?.id ?? null,
          content: 'Dossier terminé depuis plus de 6 mois — à archiver ?',
          dueAt: new Date(),
        },
      });
      aArchiver++;
    }
  } catch (e) {
    errors.push(`archiver-loop: ${e instanceof Error ? e.message : 'err'}`);
  }

  return Response.json({
    ok: true,
    candidates: leads.length,
    sent,
    devisSent,
    factureSent,
    factureAuto,
    avisSent,
    rappelsSent,
    purged,
    dormants,
    aArchiver,
    errors: errors.slice(0, 10),
  });
}
