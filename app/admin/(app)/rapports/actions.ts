'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { del } from '@vercel/blob';
import { prisma } from '@/lib/prisma';
import { requireUser, requireAdmin } from '@/lib/auth-helpers';
import { nextRapportNumber } from '@/lib/crm/numbering';
import { sendRapportEmail } from '@/lib/crm/send';
import { notifyAdminRapportSubmitted } from '@/lib/crm/notify';
import { ReportType, ReportStatus, ServiceType, Prisma } from '@prisma/client';
import {
  generateReport,
  REPORT_MODEL,
  type ReportZoneInput,
  type ReportPhotoInput,
} from '@/lib/ai/report';
import { fetchLocationRisk, formatLocationRisk } from '@/lib/geo/georisques';

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

const SERVICE_TO_REPORT: Record<string, ReportType> = {
  FISSURES: ReportType.FISSURES,
  HUMIDITE: ReportType.HUMIDITE,
  EXPERTISE_ACHAT: ReportType.EXPERTISE_ACHAT,
  MUR_PORTEUR: ReportType.MUR_PORTEUR,
  AUTRE: ReportType.FISSURES,
};

const REPORT_TITLE: Record<ReportType, string> = {
  FISSURES: 'Diagnostic pathologies de fissures',
  HUMIDITE: 'Diagnostic humidité et infiltrations',
  EXPERTISE_ACHAT: 'Expertise structurelle avant achat',
  MUR_PORTEUR: 'Étude de faisabilité — ouverture de mur porteur',
};

/**
 * Démarre un rapport à partir d'un prospect assigné. Le diagnostiqueur ne peut
 * démarrer que sur SES prospects (assignedToId) ; l'admin sur n'importe lequel.
 * Évite les doublons : si un rapport existe déjà pour ce lead, on y redirige.
 */
export async function startRapportFromLead(formData: FormData) {
  const user = await requireUser();
  const leadId = str(formData.get('leadId'));
  if (!leadId) return;

  const lead = await prisma.lead.findUnique({
    where: { id: leadId },
    include: { contact: true },
  });
  if (!lead) return;
  if (user.role !== 'ADMIN' && lead.assignedToId !== user.id) return;

  const existing = await prisma.rapport.findFirst({
    where: { leadId },
    select: { id: true },
  });
  if (existing) redirect(`/admin/rapports/${existing.id}`);

  const type = SERVICE_TO_REPORT[lead.service as ServiceType] ?? ReportType.FISSURES;
  const number = await nextRapportNumber(lead.contact.name);
  const rapport = await prisma.rapport.create({
    data: {
      number,
      contactId: lead.contactId,
      leadId: lead.id,
      authorId: lead.assignedToId ?? (user.id || null),
      type,
      title: REPORT_TITLE[type],
      bienAdresse: lead.contact.address || null,
      ville: lead.contact.city || null,
      zonesInput: [] as unknown as Prisma.InputJsonValue,
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

/**
 * Le diagnostiqueur soumet sa saisie terrain pour validation (BROUILLON → SOUMIS).
 * Après soumission, la saisie est verrouillée côté expert ; l'admin génère puis valide.
 */
export async function submitRapport(formData: FormData): Promise<void> {
  const id = str(formData.get('rapportId'));
  const owned = await loadOwned(id);
  if (!owned) return;
  if (owned.rapport.status !== 'BROUILLON') return;

  const zones = (owned.rapport.zonesInput as unknown as ReportZoneInput[]) ?? [];
  if (zones.length === 0) return; // rien à soumettre

  await prisma.rapport.update({ where: { id }, data: { status: 'SOUMIS' } });
  await prisma.activity.create({
    data: {
      type: 'SYSTEME',
      content: `Saisie terrain soumise pour validation par ${owned.user.name || owned.user.email}.`,
      contactId: owned.rapport.contactId,
      leadId: owned.rapport.leadId,
      authorId: owned.user.id || null,
    },
  });
  await notifyAdminRapportSubmitted(id);
  revalidatePath(`/admin/rapports/${id}`);
  revalidatePath('/admin/rapports');
}

/**
 * L'admin valide le rapport généré et l'envoie automatiquement au client par
 * e-mail (PDF joint). Statut → ENVOYE. Réservé à l'ADMIN (responsabilité finale).
 */
export async function validateAndSendRapport(
  formData: FormData
): Promise<void> {
  await requireAdmin();
  const id = str(formData.get('rapportId'));
  if (!id) return;

  const rapport = await prisma.rapport.findUnique({
    where: { id },
    select: {
      status: true,
      aiContent: true,
      contactId: true,
      leadId: true,
    },
  });
  if (!rapport) return;
  if (rapport.status === 'ENVOYE') return; // déjà envoyé — évite double envoi/relance
  const ai = rapport.aiContent as { error?: string } | null;
  if (!ai || ai.error) return; // pas de contenu valide à envoyer

  // Marque validé puis envoie (sendRapportEmail passe le statut à ENVOYE).
  await prisma.rapport.update({ where: { id }, data: { status: 'VALIDE' } });
  const sent = await sendRapportEmail(id);

  // Suivi client (Phase 2) : à la remise du rapport, planifie une relance dédiée
  // « savoir ce que veut faire le client » à J+3, qui remonte dans « Relances dues ».
  if (sent.ok) {
    const due = new Date();
    due.setDate(due.getDate() + 3);
    await prisma.activity.create({
      data: {
        type: 'RELANCE',
        contactId: rapport.contactId,
        leadId: rapport.leadId,
        content:
          'Faire le point avec le client après remise du rapport — décision sur les travaux de reprise ?',
        dueAt: due,
      },
    });
  }

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

  // Données officielles de localisation (Géorisques/BAN) — non bloquant.
  const adresse = [rapport.bienAdresse, rapport.ville].filter(Boolean).join(' ');
  let locationRisk: string | null = null;
  if (adresse) {
    const risk = await fetchLocationRisk(adresse).catch(() => null);
    if (risk) locationRisk = formatLocationRisk(risk);
  }

  const result = await generateReport({
    type: rapport.type,
    clientName: rapport.contact.name,
    bienAdresse: rapport.bienAdresse ?? undefined,
    ville: rapport.ville ?? undefined,
    zones,
    photos,
    locationRisk,
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
