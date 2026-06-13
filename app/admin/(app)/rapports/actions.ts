'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { nextRapportNumber } from '@/lib/crm/numbering';
import { ReportType, ReportStatus, Prisma } from '@prisma/client';
import {
  generateReport,
  REPORT_MODEL,
  type ReportZoneInput,
} from '@/lib/ai/report';

async function requireUser() {
  const session = await auth();
  if (!session?.user) throw new Error('Non authentifié');
  return session.user;
}

const str = (v: FormDataEntryValue | null) => String(v ?? '').trim();

const zoneSchema = z.object({
  titre: z.string().trim().min(1),
  observations: z.string().trim().min(1),
  mesure: z.string().trim().optional().default(''),
  gravite: z.string().trim().optional().default(''),
});

export async function createRapport(
  _prev: string | undefined,
  formData: FormData
): Promise<string | undefined> {
  await requireUser();

  const contactId = str(formData.get('contactId'));
  const type = str(formData.get('type'));
  const title = str(formData.get('title'));
  if (!contactId || !(type in ReportType)) return 'Client et type sont obligatoires.';

  let zones: ReportZoneInput[];
  try {
    const raw = JSON.parse(str(formData.get('zones')) || '[]');
    zones = z.array(zoneSchema).parse(raw).filter((zz) => zz.titre && zz.observations);
  } catch {
    return 'Zones invalides.';
  }
  if (zones.length === 0) return 'Ajoutez au moins une zone avec des observations.';

  const contact = await prisma.contact.findUnique({ where: { id: contactId } });
  if (!contact) return 'Client introuvable.';

  const number = await nextRapportNumber(contact.name);
  const rapport = await prisma.rapport.create({
    data: {
      number,
      contactId,
      leadId: str(formData.get('leadId')) || null,
      type: type as ReportType,
      title: title || `Diagnostic ${type.toLowerCase()}`,
      bienAdresse: str(formData.get('bienAdresse')) || contact.address || null,
      ville: str(formData.get('ville')) || contact.city || null,
      zonesInput: zones as unknown as Prisma.InputJsonValue,
    },
  });

  revalidatePath('/admin/rapports');
  redirect(`/admin/rapports/${rapport.id}`);
}

export async function generateRapportAI(formData: FormData) {
  await requireUser();
  const id = str(formData.get('rapportId'));
  if (!id) return;

  const rapport = await prisma.rapport.findUnique({
    where: { id },
    include: { contact: true },
  });
  if (!rapport) return;

  const zones = (rapport.zonesInput as unknown as ReportZoneInput[]) ?? [];
  const result = await generateReport({
    type: rapport.type,
    clientName: rapport.contact.name,
    bienAdresse: rapport.bienAdresse ?? undefined,
    ville: rapport.ville ?? undefined,
    zones,
  });

  if ('error' in result) {
    // Stocke l'erreur de façon visible côté UI via le statut inchangé + log
    await prisma.rapport.update({
      where: { id },
      data: { aiContent: { error: result.error } },
    });
    revalidatePath(`/admin/rapports/${id}`);
    return;
  }

  await prisma.rapport.update({
    where: { id },
    data: {
      aiContent: result.content as object,
      aiModel: REPORT_MODEL,
      aiGeneratedAt: new Date(),
      status: 'GENERE',
      budgetHT: result.content.budgetHT ?? null,
    },
  });
  revalidatePath(`/admin/rapports/${id}`);
}

export async function updateRapportStatus(formData: FormData) {
  await requireUser();
  const id = str(formData.get('rapportId'));
  const status = str(formData.get('status'));
  if (!id || !(status in ReportStatus)) return;
  await prisma.rapport.update({
    where: { id },
    data: { status: status as ReportStatus },
  });
  revalidatePath(`/admin/rapports/${id}`);
  revalidatePath('/admin/rapports');
}
