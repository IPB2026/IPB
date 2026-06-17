import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/email';
import {
  emailTemplates,
  emailSequence,
  devisRelance,
  factureRelance,
} from '@/lib/emailTemplates';
import { euros } from '@/lib/crm/company';
import { createInvoiceForAppointment, DIAGNOSTIC_APPT_TYPES } from '@/lib/crm/invoicing';
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
  const leads = await prisma.lead.findMany({
    where: {
      relanceStep: { lt: STEPS.length },
      stage: { in: ['NOUVEAU', 'A_RAPPELER', 'RDV_PLANIFIE'] },
      contact: { email: { not: null } },
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

  // ── Relances commerciales : devis ENVOYE sans réponse (J+3 puis J+7) ──
  // FIABLE depuis la migration relance_tracking : on s'appuie sur les champs
  // Devis.sentAt (date d'envoi) et Devis.relanceCount (compteur), au lieu d'un
  // matching de texte sur les activités. Stop dès que le devis quitte ENVOYE.
  const DEVIS_STEPS = [3, 7] as const;
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

      const step = (relanceCount + 1) as 1 | 2;
      try {
        const res = await sendEmail({
          to: email,
          subject:
            step === 1
              ? 'Votre devis IPB — une question ?'
              : 'Votre devis IPB est toujours valable',
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
        devisSent++;
      } catch (e) {
        errors.push(`devis ${devis.id}: ${e instanceof Error ? e.message : 'err'}`);
      }
    }
  } catch (e) {
    errors.push(`devis-loop: ${e instanceof Error ? e.message : 'err'}`);
  }

  // ── Relances de factures impayées (échéance dépassée : J+3 puis J+7) ──
  const FACTURE_STEPS = [3, 7] as const;
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
            step: (relanceCount >= 1 ? 2 : 1) as 1 | 2,
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

  return Response.json({
    ok: true,
    candidates: leads.length,
    sent,
    devisSent,
    factureSent,
    factureAuto,
    errors: errors.slice(0, 10),
  });
}
