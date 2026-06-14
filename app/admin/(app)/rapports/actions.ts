'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { del } from '@vercel/blob';
import { prisma } from '@/lib/prisma';
import { requireUser, requireAdmin } from '@/lib/auth-helpers';
import { nextRapportNumber } from '@/lib/crm/numbering';
import { ReportType, ReportStatus, Prisma } from '@prisma/client';
import {
  generateReport,
  REPORT_MODEL,
  type ReportZoneInput,
  type ReportPhotoInput,
} from '@/lib/ai/report';

const str = (v: FormDataEntryValue | null) => String(v ?? '').trim();

const zoneSchema = z.object({
  titre: z.string().trim().min(1),
  observations: z.string().trim().min(1),
  mesure: z.string().trim().optional().default(''),
  gravite: z.string().trim().optional().default(''),
});

/**
 * Charge un rapport et vérifie que l'utilisateur a le droit d'y toucher :
 * l'ADMIN sur tout, l'EXPERT uniquement sur ses propres rapports (authorId).
 */
async function loadOwned(id: string) {
  const user = await requireUser();
  const rapport = await prisma.rapport.findUnique({
    where: { id },
    include: { contact: true, photos: { orderBy: { position: 'asc' } } },
  });
  if (!rapport) return null;
  if (user.role !== 'ADMIN' && rapport.authorId !== user.id) return null;
  return { user, rapport };
}

export async function createRapport(
  _prev: string | undefined,
  formData: FormData
): Promise<string | undefined> {
  const user = await requireUser();

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
      authorId: user.id || null,
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

/** L'expert (propriétaire) ou l'admin met à jour la saisie terrain (zones). */
export async function updateRapportZones(
  _prev: string | undefined,
  formData: FormData
): Promise<string | undefined> {
  const id = str(formData.get('rapportId'));
  const owned = await loadOwned(id);
  if (!owned) return 'Rapport introuvable ou accès refusé.';

  let zones: ReportZoneInput[];
  try {
    const raw = JSON.parse(str(formData.get('zones')) || '[]');
    zones = z.array(zoneSchema).parse(raw).filter((zz) => zz.titre && zz.observations);
  } catch {
    return 'Zones invalides.';
  }
  if (zones.length === 0) return 'Ajoutez au moins une zone avec des observations.';

  await prisma.rapport.update({
    where: { id },
    data: { zonesInput: zones as unknown as Prisma.InputJsonValue },
  });
  revalidatePath(`/admin/rapports/${id}`);
  return undefined;
}

/** Enregistre une photo uploadée (Vercel Blob) en base. */
export async function attachRapportPhoto(formData: FormData): Promise<void> {
  const id = str(formData.get('rapportId'));
  const owned = await loadOwned(id);
  if (!owned) return;

  const url = str(formData.get('url'));
  const pathname = str(formData.get('pathname'));
  if (!url || !pathname) return;

  const count = await prisma.photo.count({ where: { rapportId: id } });
  await prisma.photo.create({
    data: {
      rapportId: id,
      url,
      pathname,
      caption: str(formData.get('caption')) || null,
      zoneRef: str(formData.get('zoneRef')) || null,
      gravite: str(formData.get('gravite')) || null,
      contentType: str(formData.get('contentType')) || null,
      position: count,
    },
  });
  revalidatePath(`/admin/rapports/${id}`);
}

export async function updatePhotoMeta(formData: FormData): Promise<void> {
  const id = str(formData.get('rapportId'));
  const photoId = str(formData.get('photoId'));
  const owned = await loadOwned(id);
  if (!owned || !photoId) return;
  await prisma.photo.update({
    where: { id: photoId },
    data: {
      caption: str(formData.get('caption')) || null,
      zoneRef: str(formData.get('zoneRef')) || null,
      gravite: str(formData.get('gravite')) || null,
    },
  });
  revalidatePath(`/admin/rapports/${id}`);
}

export async function deleteRapportPhoto(formData: FormData): Promise<void> {
  const id = str(formData.get('rapportId'));
  const photoId = str(formData.get('photoId'));
  const owned = await loadOwned(id);
  if (!owned || !photoId) return;

  const photo = await prisma.photo.findUnique({ where: { id: photoId } });
  if (!photo || photo.rapportId !== id) return;

  try {
    await del(photo.url);
  } catch (err) {
    console.error('[deleteRapportPhoto] suppression Blob échouée:', err);
  }
  await prisma.photo.delete({ where: { id: photoId } });
  revalidatePath(`/admin/rapports/${id}`);
}

/** L'expert marque sa saisie terrain prête (passage en GENERE côté admin). */
export async function markRapportReady(formData: FormData): Promise<void> {
  const id = str(formData.get('rapportId'));
  const owned = await loadOwned(id);
  if (!owned) return;
  await prisma.activity.create({
    data: {
      type: 'SYSTEME',
      content: `Saisie terrain marquée prête par ${owned.user.name || owned.user.email}.`,
      contactId: owned.rapport.contactId,
      leadId: owned.rapport.leadId,
      authorId: owned.user.id || null,
    },
  });
  revalidatePath(`/admin/rapports/${id}`);
  revalidatePath('/admin/rapports');
}

/** Génération IA — réservée à l'ADMIN (responsabilité éditoriale). */
export async function generateRapportAI(formData: FormData) {
  await requireAdmin();
  const id = str(formData.get('rapportId'));
  if (!id) return;

  const rapport = await prisma.rapport.findUnique({
    where: { id },
    include: { contact: true, photos: { orderBy: { position: 'asc' } } },
  });
  if (!rapport) return;

  const zones = (rapport.zonesInput as unknown as ReportZoneInput[]) ?? [];
  const photos: ReportPhotoInput[] = rapport.photos.map((p) => ({
    url: p.url,
    caption: p.caption ?? undefined,
    zoneRef: p.zoneRef ?? undefined,
    gravite: p.gravite ?? undefined,
  }));

  const result = await generateReport({
    type: rapport.type,
    clientName: rapport.contact.name,
    bienAdresse: rapport.bienAdresse ?? undefined,
    ville: rapport.ville ?? undefined,
    zones,
    photos,
  });

  if ('error' in result) {
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
  await requireAdmin();
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
