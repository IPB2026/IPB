'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth-helpers';
import {
  captureLead,
  parseAddress,
  type CaptureLeadScoring,
} from '@/lib/crm/captureLead';
import { notifyExpertAssigned } from '@/lib/crm/notify';
import {
  scoreQualification,
  QUAL_OPTIONS,
  type QualificationRecord,
  type QualDelai,
  type QualDecision,
  type QualBien,
} from '@/lib/crm/qualification';
import { Prisma } from '@prisma/client';
import {
  ServiceType,
  OccupantStatus,
  LeadTier,
  PipelineStage,
  ActivityType,
} from '@prisma/client';

// Garde-fou : toutes les écritures prospect (pipeline, qualification, relances,
// activités) sont réservées à l'ADMIN. Les EXPERT sont hors du back-office leads.
const requireUser = requireAdmin;

function revalidateLead(leadId: string) {
  revalidatePath(`/admin/leads/${leadId}`);
  revalidatePath('/admin/leads');
  // La fiche unique vit sous /admin/clients/[id] : on revalide le segment
  // dynamique (toutes les fiches) pour que le changement d'étape / la relance /
  // l'activité s'y reflètent immédiatement (Suivi du dossier, Prochaine étape).
  revalidatePath('/admin/clients/[id]', 'page');
  revalidatePath('/admin/clients');
  revalidatePath('/admin/pipeline');
  revalidatePath('/admin/pilotage');
  revalidatePath('/admin');
}

const prospectSchema = z
  .object({
    name: z.string().trim().min(2, 'Nom requis (2 caractères minimum).'),
    phone: z.string().trim().optional().default(''),
    email: z
      .union([z.string().trim().email('Email invalide.'), z.literal('')])
      .optional()
      .default(''),
    city: z.string().trim().optional().default(''),
    postalCode: z.string().trim().optional().default(''),
    address: z.string().trim().optional().default(''),
    service: z.nativeEnum(ServiceType).optional().default(ServiceType.AUTRE),
    occupantStatus: z
      .nativeEnum(OccupantStatus)
      .optional()
      .default(OccupantStatus.INCONNU),
    tier: z
      .union([z.nativeEnum(LeadTier), z.literal('')])
      .optional()
      .default(''),
    note: z.string().trim().optional().default(''),
    relanceDate: z.string().trim().optional().default(''),
    value: z.string().trim().optional().default(''),
  })
  .refine((d) => d.phone || d.email, {
    message: 'Renseignez au moins un téléphone ou un email.',
    path: ['phone'],
  });

export async function createProspect(
  _prevState: string | undefined,
  formData: FormData
): Promise<string | undefined> {
  const session = await auth();
  if (!session?.user) return 'Session expirée — reconnectez-vous.';

  const str = (k: string) => String(formData.get(k) ?? '');
  // Nom du contact : raison sociale (entreprise) en priorité, sinon prénom + nom
  // (particulier, recomposés), repli sur `name`. → permet de saisir une entreprise
  // sans prénom ni nom.
  const fullName =
    str('company').trim() ||
    [str('prenom'), str('nom')].map((s) => s.trim()).filter(Boolean).join(' ') ||
    str('name');
  const parsed = prospectSchema.safeParse({
    name: fullName,
    phone: str('phone'),
    email: str('email'),
    city: str('city'),
    postalCode: str('postalCode'),
    address: str('address'),
    service: str('service') || undefined,
    occupantStatus: str('occupantStatus') || undefined,
    tier: str('tier'),
    note: str('note'),
    relanceDate: str('relanceDate'),
    value: str('value'),
  });

  if (!parsed.success) {
    return parsed.error.issues[0]?.message ?? 'Données invalides.';
  }

  const d = parsed.data;
  // Code postal / ville saisis séparément (autocomplétion BAN). Repli : si seul le
  // champ ville contient « 31600 Muret », on en extrait le code postal.
  let postalCode = d.postalCode || null;
  let city = d.city || null;
  if (!postalCode && city) {
    const p = parseAddress(city);
    if (p.postalCode) {
      postalCode = p.postalCode;
      if (p.city) city = p.city;
    }
  }
  const valueNum = d.value ? Number(d.value.replace(',', '.')) : null;

  const scoring: CaptureLeadScoring | undefined = d.tier
    ? { tier: d.tier as LeadTier, reasons: ['Qualification manuelle (appel)'] }
    : undefined;

  const result = await captureLead({
    source: 'MANUEL',
    service: d.service,
    contact: {
      name: d.name,
      phone: d.phone || null,
      email: d.email || null,
      address: d.address || null,
      city,
      postalCode,
      occupantStatus: d.occupantStatus,
    },
    scoring,
    summary: d.note ? d.note.slice(0, 120) : 'Prospect saisi manuellement',
    value: valueNum != null && !Number.isNaN(valueNum) ? valueNum : null,
    payload: { note: d.note, saisiePar: session.user.email ?? null },
  });

  if (!result) {
    return "Erreur d'enregistrement. Vérifiez la connexion à la base de données.";
  }

  // RÈGLE MÉTIER : on n'assigne PAS de diagnostiqueur à la création du prospect.
  // L'assignation n'est possible qu'une fois le DEVIS VALIDÉ (cf. fiche client) —
  // un diagnostiqueur ne voit un client qu'après acceptation du devis.

  // Journalise l'appel + la relance éventuelle
  await prisma.activity.create({
    data: {
      type: 'APPEL',
      leadId: result.leadId,
      contactId: result.contactId,
      content: d.note || 'Appel entrant — prospect créé',
    },
  });

  if (d.relanceDate) {
    const due = new Date(d.relanceDate);
    if (!Number.isNaN(due.getTime())) {
      await prisma.activity.create({
        data: {
          type: 'RELANCE',
          leadId: result.leadId,
          contactId: result.contactId,
          content: 'Rappeler le prospect',
          dueAt: due,
        },
      });
      await prisma.lead.update({
        where: { id: result.leadId },
        data: { stage: 'A_RAPPELER' },
      });
    }
  }

  // Revalide toutes les surfaces (liste, fiche, pipeline, pilotage, dashboard)
  // pour que le nouveau prospect y apparaisse immédiatement.
  revalidateLead(result.leadId);
  redirect(`/admin/leads/${result.leadId}`);
}

// ─────────────────────────────────────────────────────────────────
// Actions de suivi (Phase 1) — pipeline, activités, relances
// ─────────────────────────────────────────────────────────────────

/** Change l'étape du pipeline + journalise le changement. */
export async function changeStage(formData: FormData) {
  await requireUser();
  const leadId = String(formData.get('leadId') ?? '');
  const stage = String(formData.get('stage') ?? '');
  const lostReason = String(formData.get('lostReason') ?? '').trim();
  if (!leadId || !(stage in PipelineStage)) return;

  const current = await prisma.lead.findUnique({
    where: { id: leadId },
    select: { stage: true, contactId: true },
  });
  if (!current || current.stage === stage) return;

  await prisma.lead.update({
    where: { id: leadId },
    data: {
      stage: stage as PipelineStage,
      lostReason: stage === 'PERDU' ? lostReason || null : null,
    },
  });
  await prisma.activity.create({
    data: {
      type: ActivityType.CHANGEMENT_ETAPE,
      leadId,
      contactId: current.contactId,
      content: `Étape : ${current.stage} → ${stage}${
        lostReason ? ` (${lostReason})` : ''
      }`,
    },
  });
  revalidateLead(leadId);
}

/** Ajoute une activité (note, appel, email) à la timeline. */
/**
 * Journalise un appel passé (clic sur « Appeler » depuis une fiche client). Crée
 * une activité APPEL « Appel passé » et rafraîchit la fiche. Appelée directement
 * depuis le client (fire-and-forget), pas via un formulaire.
 */
export async function logCall(contactId: string) {
  await requireUser();
  if (!contactId) return;
  const contact = await prisma.contact.findUnique({
    where: { id: contactId },
    select: { id: true },
  });
  if (!contact) return;
  await prisma.activity.create({
    data: { type: 'APPEL', contactId, content: 'Appel passé' },
  });
  revalidatePath(`/admin/clients/${contactId}`);
}

export async function addActivity(formData: FormData) {
  await requireUser();
  const leadId = String(formData.get('leadId') ?? '');
  const type = String(formData.get('type') ?? 'NOTE');
  const content = String(formData.get('content') ?? '').trim();
  if (!leadId || !content || !(type in ActivityType)) return;

  const lead = await prisma.lead.findUnique({
    where: { id: leadId },
    select: { contactId: true },
  });
  if (!lead) return;

  await prisma.activity.create({
    data: {
      type: type as ActivityType,
      leadId,
      contactId: lead.contactId,
      content,
    },
  });
  revalidateLead(leadId);
}

/** Planifie une relance (échéance) et bascule l'étape sur « À rappeler ». */
export async function scheduleRelance(formData: FormData) {
  await requireUser();
  const leadId = String(formData.get('leadId') ?? '');
  const dueRaw = String(formData.get('dueAt') ?? '');
  const content = String(formData.get('content') ?? '').trim();
  if (!leadId || !dueRaw) return;
  const due = new Date(dueRaw);
  if (Number.isNaN(due.getTime())) return;

  const lead = await prisma.lead.findUnique({
    where: { id: leadId },
    select: { contactId: true, stage: true },
  });
  if (!lead) return;

  await prisma.activity.create({
    data: {
      type: ActivityType.RELANCE,
      leadId,
      contactId: lead.contactId,
      content: content || 'Relance à effectuer',
      dueAt: due,
    },
  });
  // Si le dossier est encore ouvert en amont, le marquer « à rappeler »
  if (['NOUVEAU'].includes(lead.stage)) {
    await prisma.lead.update({
      where: { id: leadId },
      data: { stage: 'A_RAPPELER' },
    });
  }
  revalidateLead(leadId);
}

/** (Ré)assigne un prospect à un diagnostiqueur (ou le désassigne). Admin only. */
export async function assignLead(formData: FormData) {
  await requireAdmin();
  const leadId = String(formData.get('leadId') ?? '');
  const expertId = String(formData.get('assignedToId') ?? '').trim();
  if (!leadId) return;

  const lead = await prisma.lead.findUnique({
    where: { id: leadId },
    select: { contactId: true, assignedToId: true },
  });
  if (!lead) return;

  let label = 'Prospect désassigné';
  let newId: string | null = null;
  if (expertId) {
    const expert = await prisma.user.findFirst({
      where: { id: expertId, role: 'EXPERT' },
      select: { id: true, name: true, email: true },
    });
    if (!expert) return;
    newId = expert.id;
    label = `Prospect assigné à ${expert.name || expert.email}`;
  }

  if (lead.assignedToId === newId) return; // pas de changement

  // RÈGLE MÉTIER (enforcement SERVEUR, pas seulement l'UI) : on n'assigne un
  // diagnostiqueur qu'APRÈS un devis ACCEPTÉ. La désassignation reste permise.
  if (newId) {
    const accepted = await prisma.devis.count({
      where: { contactId: lead.contactId, status: 'ACCEPTE' },
    });
    if (accepted === 0) return;
  }

  await prisma.lead.update({
    where: { id: leadId },
    data: { assignedToId: newId },
  });
  await prisma.activity.create({
    data: {
      type: ActivityType.SYSTEME,
      leadId,
      contactId: lead.contactId,
      content: label,
    },
  });
  if (newId) await notifyExpertAssigned(leadId, newId);
  revalidateLead(leadId);
  revalidatePath('/admin/rapports');
}

/**
 * Qualification structurée (appel) : budget / délai / décisionnaire / type de
 * bien → score + tier auto. Rangé dans `payload.qualification` (aucune
 * migration) ; met à jour `Lead.tier` pour piloter priorité & relances.
 */
export async function qualifyLead(formData: FormData) {
  await requireUser();
  const leadId = String(formData.get('leadId') ?? '');
  if (!leadId) return;

  const pick = <T extends string>(
    axis: keyof typeof QUAL_OPTIONS,
    fallback: T
  ): T => {
    const raw = String(formData.get(axis) ?? '');
    const ok = (QUAL_OPTIONS[axis] as readonly { value: string }[]).some(
      (o) => o.value === raw
    );
    return (ok ? raw : fallback) as T;
  };

  const input = {
    delai: pick<QualDelai>('delai', 'INCONNU'),
    decision: pick<QualDecision>('decision', 'INCONNU'),
    bien: pick<QualBien>('bien', 'INCONNU'),
    note: String(formData.get('note') ?? '').trim() || undefined,
  };

  const lead = await prisma.lead.findUnique({
    where: { id: leadId },
    select: { contactId: true, payload: true },
  });
  if (!lead) return;

  const result = scoreQualification(input);
  const record: QualificationRecord = {
    ...input,
    ...result,
    at: new Date().toISOString(),
  };

  const basePayload =
    lead.payload && typeof lead.payload === 'object' && !Array.isArray(lead.payload)
      ? (lead.payload as Prisma.JsonObject)
      : {};

  await prisma.lead.update({
    where: { id: leadId },
    data: {
      // La qualification d'appel prime (80 % des prospects sont des appels) et
      // réaligne aussi score/maxScore/reasons pour rester cohérent avec le tier.
      tier: result.tier,
      score: result.score,
      maxScore: result.maxScore,
      reasons: result.reasons,
      payload: {
        ...basePayload,
        qualification: record as unknown as Prisma.InputJsonValue,
      },
    },
  });
  await prisma.activity.create({
    data: {
      type: ActivityType.NOTE,
      leadId,
      contactId: lead.contactId,
      content: `Qualification mise à jour — ${result.tier} (${result.score}/${result.maxScore})${
        input.note ? ` · ${input.note}` : ''
      }`,
    },
  });
  revalidateLead(leadId);
}

/** Déplace un prospect d'une étape de pipeline à une autre (Kanban). */
export async function moveLead(leadId: string, stage: string) {
  await requireUser();
  if (!leadId || !(stage in PipelineStage)) return;
  const current = await prisma.lead.findUnique({
    where: { id: leadId },
    select: { stage: true, contactId: true },
  });
  if (!current || current.stage === stage) return;
  await prisma.lead.update({
    where: { id: leadId },
    data: { stage: stage as PipelineStage },
  });
  await prisma.activity.create({
    data: {
      type: ActivityType.CHANGEMENT_ETAPE,
      leadId,
      contactId: current.contactId,
      content: `Étape : ${current.stage} → ${stage}`,
    },
  });
  // Revalide toutes les vues (fiche, liste, pipeline, pilotage, dashboard).
  revalidateLead(leadId);
}

/** Marque une relance comme effectuée. */
export async function completeRelance(formData: FormData) {
  await requireUser();
  const activityId = String(formData.get('activityId') ?? '');
  const leadId = String(formData.get('leadId') ?? '');
  if (!activityId) return;
  await prisma.activity.update({
    where: { id: activityId },
    data: { done: true, doneAt: new Date() },
  });
  if (leadId) revalidateLead(leadId);
  revalidatePath('/admin');
}
