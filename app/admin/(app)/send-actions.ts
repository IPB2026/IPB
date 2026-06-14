'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';
import {
  sendDevisEmail,
  sendFactureEmail,
  sendRapportEmail,
} from '@/lib/crm/send';

async function requireUser() {
  const session = await auth();
  if (!session?.user) throw new Error('Non authentifié');
}

const str = (v: FormDataEntryValue | null) => String(v ?? '').trim();

export async function sendDevis(formData: FormData) {
  await requireUser();
  const id = str(formData.get('devisId'));
  if (!id) return;
  await sendDevisEmail(id);
  revalidatePath(`/admin/devis/${id}`);
  revalidatePath('/admin/devis');
}

export async function sendFacture(formData: FormData) {
  await requireUser();
  const id = str(formData.get('factureId'));
  if (!id) return;
  await sendFactureEmail(id);
  revalidatePath(`/admin/factures/${id}`);
  revalidatePath('/admin/factures');
}

export async function sendRapport(formData: FormData) {
  await requireUser();
  const id = str(formData.get('rapportId'));
  if (!id) return;
  await sendRapportEmail(id);
  revalidatePath(`/admin/rapports/${id}`);
  revalidatePath('/admin/rapports');
}
