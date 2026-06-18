'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { del } from '@vercel/blob';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth-helpers';
import { getBlobToken } from '@/lib/blob';
import { OccupantStatus } from '@prisma/client';

export type ContactFormState = string | undefined;

const contactSchema = z
  .object({
    name: z.string().trim().min(2, 'Nom requis (2 caractères minimum).'),
    phone: z.string().trim().optional().default(''),
    email: z
      .union([z.string().trim().email('Email invalide.'), z.literal('')])
      .optional()
      .default(''),
    address: z.string().trim().optional().default(''),
    postalCode: z.string().trim().optional().default(''),
    city: z.string().trim().optional().default(''),
    occupantStatus: z
      .nativeEnum(OccupantStatus)
      .optional()
      .default(OccupantStatus.INCONNU),
    propertyType: z.string().trim().optional().default(''),
  })
  .refine((d) => d.phone || d.email, {
    message: 'Renseignez au moins un téléphone ou un email.',
    path: ['phone'],
  });

function revalidateFiches() {
  revalidatePath('/admin/leads');
  revalidatePath('/admin/clients');
  revalidatePath('/admin/leads/[id]', 'page');
  revalidatePath('/admin/clients/[id]', 'page');
  revalidatePath('/admin/pipeline');
  revalidatePath('/admin/pilotage');
  revalidatePath('/admin');
}

/** Édite les coordonnées d'un contact (corriger un nom/téléphone/email saisi à l'appel). */
export async function updateContact(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  await requireAdmin();
  const id = String(formData.get('contactId') ?? '');
  if (!id) return 'Contact introuvable.';

  const str = (k: string) => String(formData.get(k) ?? '');
  // Nom du contact : raison sociale (entreprise) en priorité, sinon prénom + nom
  // (particulier), repli sur un champ `name` legacy.
  const fullName =
    str('company').trim() ||
    [str('prenom'), str('nom')].map((s) => s.trim()).filter(Boolean).join(' ') ||
    str('name');
  const parsed = contactSchema.safeParse({
    name: fullName,
    phone: str('phone'),
    email: str('email'),
    address: str('address'),
    postalCode: str('postalCode'),
    city: str('city'),
    occupantStatus: str('occupantStatus') || undefined,
    propertyType: str('propertyType'),
  });
  if (!parsed.success) {
    return parsed.error.issues[0]?.message ?? 'Données invalides.';
  }
  const d = parsed.data;

  await prisma.contact.update({
    where: { id },
    data: {
      name: d.name,
      phone: d.phone || null,
      email: d.email ? d.email.toLowerCase() : null,
      address: d.address || null,
      postalCode: d.postalCode || null,
      city: d.city || null,
      occupantStatus: d.occupantStatus,
      propertyType: d.propertyType || null,
    },
  });
  revalidateFiches();
  return undefined;
}

/**
 * Fusionne deux fiches contact (source → cible) : réassigne toutes les relations
 * (leads, activités, devis, factures, RDV, rapports), complète les champs vides
 * de la cible avec ceux de la source, puis supprime la source. Transaction.
 */
export async function mergeContacts(formData: FormData) {
  await requireAdmin();
  const targetId = String(formData.get('targetId') ?? '');
  const sourceId = String(formData.get('sourceId') ?? '');
  if (!targetId || !sourceId || targetId === sourceId) return;

  const [target, source] = await Promise.all([
    prisma.contact.findUnique({ where: { id: targetId } }),
    prisma.contact.findUnique({ where: { id: sourceId } }),
  ]);
  if (!target || !source) return;

  await prisma.$transaction([
    prisma.lead.updateMany({ where: { contactId: sourceId }, data: { contactId: targetId } }),
    prisma.activity.updateMany({ where: { contactId: sourceId }, data: { contactId: targetId } }),
    prisma.devis.updateMany({ where: { contactId: sourceId }, data: { contactId: targetId } }),
    prisma.facture.updateMany({ where: { contactId: sourceId }, data: { contactId: targetId } }),
    prisma.appointment.updateMany({ where: { contactId: sourceId }, data: { contactId: targetId } }),
    prisma.rapport.updateMany({ where: { contactId: sourceId }, data: { contactId: targetId } }),
    prisma.contact.update({
      where: { id: targetId },
      data: {
        email: target.email ?? source.email,
        phone: target.phone ?? source.phone,
        address: target.address ?? source.address,
        city: target.city ?? source.city,
        postalCode: target.postalCode ?? source.postalCode,
        propertyType: target.propertyType ?? source.propertyType,
        occupantStatus:
          target.occupantStatus !== 'INCONNU'
            ? target.occupantStatus
            : source.occupantStatus,
      },
    }),
    prisma.contact.delete({ where: { id: sourceId } }),
  ]);
  revalidateFiches();
}

/**
 * Supprime DÉFINITIVEMENT un client et tout son dossier. La cascade Prisma
 * (`onDelete: Cascade` sur leads, activités, devis, factures, RDV, rapports +
 * lignes/photos en base) fait le reste. On efface d'abord les FICHIERS photos du
 * stockage Blob (best-effort) pour ne pas laisser d'orphelins. ADMIN uniquement,
 * irréversible (confirmation forte côté UI).
 */
export async function deleteContact(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get('contactId') ?? '');
  if (!id) return;

  // 1) Fichiers Blob des photos de tous les rapports du client (les lignes Photo
  //    partiront ensuite en cascade). Tolérant aux échecs : on ne bloque pas la
  //    suppression si un fichier Blob est déjà absent.
  const photos = await prisma.photo
    .findMany({ where: { rapport: { contactId: id } }, select: { url: true } })
    .catch(() => []);
  if (photos.length) {
    const token = getBlobToken();
    await Promise.allSettled(photos.map((p) => del(p.url, { token })));
  }

  // 2) Suppression du contact → cascade sur l'intégralité du dossier.
  await prisma.contact.delete({ where: { id } }).catch(() => null);

  revalidateFiches();
  redirect('/admin/clients');
}
