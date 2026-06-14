'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth-helpers';
import {
  sendDevisEmail,
  sendFactureEmail,
  sendRapportEmail,
} from '@/lib/crm/send';

const str = (v: FormDataEntryValue | null) => String(v ?? '').trim();

export async function sendDevis(formData: FormData) {
  await requireAdmin();
  const id = str(formData.get('devisId'));
  if (!id) return;
  const res = await sendDevisEmail(id);
  if (!res.ok) throw new Error(`Échec de l'envoi du devis : ${res.error}`);
  revalidatePath(`/admin/devis/${id}`);
  revalidatePath('/admin/devis');
}

export async function sendFacture(formData: FormData) {
  await requireAdmin();
  const id = str(formData.get('factureId'));
  if (!id) return;
  const res = await sendFactureEmail(id);
  if (!res.ok) throw new Error(`Échec de l'envoi de la facture : ${res.error}`);
  revalidatePath(`/admin/factures/${id}`);
  revalidatePath('/admin/factures');
}

export async function sendRapport(formData: FormData) {
  await requireAdmin();
  const id = str(formData.get('rapportId'));
  if (!id) return;
  const res = await sendRapportEmail(id);
  if (!res.ok) throw new Error(`Échec de l'envoi du rapport : ${res.error}`);
  revalidatePath(`/admin/rapports/${id}`);
  revalidatePath('/admin/rapports');
}
