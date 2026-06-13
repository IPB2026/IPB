import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/email';
import { emailTemplates, emailSequence } from '@/lib/emailTemplates';
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

  return Response.json({
    ok: true,
    candidates: leads.length,
    sent,
    errors: errors.slice(0, 10),
  });
}
