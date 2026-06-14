'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { nextDevisNumber, nextFactureNumber } from '@/lib/crm/numbering';
import { DevisStatus } from '@prisma/client';

async function requireUser() {
  const session = await auth();
  if (!session?.user) throw new Error('Non authentifié');
  return session.user;
}

const lineSchema = z.object({
  designation: z.string().trim().min(1),
  detail: z.string().trim().optional().default(''),
  unit: z.string().trim().default('Forfait'),
  qty: z.coerce.number().min(0).default(1),
  unitPrice: z.coerce.number().min(0).default(0),
});

const num = (v: FormDataEntryValue | null) => String(v ?? '');

export async function createDevis(
  _prev: string | undefined,
  formData: FormData
): Promise<string | undefined> {
  await requireUser();

  const contactId = num(formData.get('contactId'));
  const object = num(formData.get('object')).trim();
  if (!contactId || !object) return 'Client et objet sont obligatoires.';

  let lines: z.infer<typeof lineSchema>[];
  try {
    const raw = JSON.parse(num(formData.get('lines')) || '[]');
    lines = z.array(lineSchema).parse(raw).filter((l) => l.designation);
  } catch {
    return 'Lignes de prestation invalides.';
  }
  if (lines.length === 0) return 'Ajoutez au moins une ligne de prestation.';

  const contact = await prisma.contact.findUnique({ where: { id: contactId } });
  if (!contact) return 'Client introuvable.';

  const validRaw = num(formData.get('validUntil'));
  const validUntil = validRaw ? new Date(validRaw) : defaultValidUntil();
  const number = await nextDevisNumber();

  const computed = lines.map((l, i) => ({
    designation: l.designation,
    detail: l.detail || null,
    unit: l.unit || 'Forfait',
    qty: l.qty,
    unitPrice: l.unitPrice,
    total: Math.round(l.qty * l.unitPrice * 100) / 100,
    position: i,
  }));
  const totalHT = computed.reduce((s, l) => s + l.total, 0);

  const devis = await prisma.devis.create({
    data: {
      number,
      contactId,
      leadId: num(formData.get('leadId')) || null,
      object,
      bienConcerne: num(formData.get('bienConcerne')).trim() || null,
      introLetter: num(formData.get('introLetter')).trim() || null,
      validUntil,
      totalHT,
      lines: { create: computed },
    },
  });

  revalidatePath('/admin/devis');
  redirect(`/admin/devis/${devis.id}`);
}

function defaultValidUntil(): Date {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  return d;
}

export async function updateDevisStatus(formData: FormData) {
  await requireUser();
  const id = num(formData.get('devisId'));
  const status = num(formData.get('status'));
  if (!id || !(status in DevisStatus)) return;
  await prisma.devis.update({
    where: { id },
    data: { status: status as DevisStatus },
  });
  revalidatePath(`/admin/devis/${id}`);
  revalidatePath('/admin/devis');
}

export async function convertDevisToFacture(formData: FormData) {
  await requireUser();
  const id = num(formData.get('devisId'));
  if (!id) return;

  const devis = await prisma.devis.findUnique({
    where: { id },
    include: { contact: true, lines: { orderBy: { position: 'asc' } } },
  });
  if (!devis) return;

  const number = await nextFactureNumber(devis.contact.name);
  const due = new Date();
  due.setDate(due.getDate() + 30);

  const facture = await prisma.facture.create({
    data: {
      number,
      contactId: devis.contactId,
      devisId: devis.id,
      object: devis.object,
      dueDate: due,
      totalHT: devis.totalHT,
      lines: {
        create: devis.lines.map((l, i) => ({
          designation: l.designation,
          detail: l.detail,
          unit: l.unit,
          qty: l.qty,
          unitPrice: l.unitPrice,
          total: l.total,
          position: i,
        })),
      },
    },
  });

  await prisma.devis.update({
    where: { id },
    data: { status: 'ACCEPTE' },
  });

  revalidatePath('/admin/factures');
  revalidatePath(`/admin/devis/${id}`);
  redirect(`/admin/factures/${facture.id}`);
}
