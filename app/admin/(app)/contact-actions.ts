'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth-helpers';
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
  const parsed = contactSchema.safeParse({
    name: str('name'),
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
