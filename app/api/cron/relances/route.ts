import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/email';
import { emailTemplates, emailSequence, devisRelance } from '@/lib/emailTemplates';
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
  if (
    process.env.CRON_SECRET &&
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
  // Pas de champ dédié sur Devis : l'envoi et les relances sont tracés via
  // Activity (le numéro de devis, unique, sert de clé). Stop automatique dès
  // que le devis quitte ENVOYE (accepté / refusé / expiré).
  const DEVIS_STEPS = [3, 7] as const;
  let devisSent = 0;
  try {
    const devisList = await prisma.devis.findMany({
      where: { status: 'ENVOYE', contact: { email: { not: null } } },
      include: { contact: true },
      take: 100,
      orderBy: { createdAt: 'asc' },
    });

    for (const devis of devisList) {
      const email = devis.contact.email;
      if (!email) continue;

      const sentAct = await prisma.activity.findFirst({
        where: {
          contactId: devis.contactId,
          type: 'EMAIL',
          content: { contains: `Devis ${devis.number} envoyé` },
        },
        orderBy: { createdAt: 'asc' },
        select: { createdAt: true },
      });
      const sentAt = sentAct?.createdAt ?? devis.updatedAt;

      const relanceCount = await prisma.activity.count({
        where: {
          contactId: devis.contactId,
          content: { contains: `Relance devis ${devis.number}` },
        },
      });
      if (relanceCount >= DEVIS_STEPS.length) continue;

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

  return Response.json({
    ok: true,
    candidates: leads.length,
    sent,
    devisSent,
    errors: errors.slice(0, 10),
  });
}
