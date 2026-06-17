'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/auth-helpers';
import { prisma } from '@/lib/prisma';
import { revalidateCrm } from '@/lib/crm/revalidate';
import {
  sendDevisEmail,
  sendFactureEmail,
  sendRapportEmail,
  sendDevisRelanceEmail,
  sendFactureRelanceEmail,
} from '@/lib/crm/send';

const str = (v: FormDataEntryValue | null) => String(v ?? '').trim();

/**
 * Destination de retour après une relance. N'autorise QUE des chemins internes
 * `/admin/…` (anti open-redirect) ; sinon, repli sur la fiche du contact.
 */
function safeReturn(to: string, contactId: string): string {
  return to.startsWith('/admin/') && !to.startsWith('//')
    ? to
    : `/admin/clients/${contactId}`;
}

export async function sendDevis(formData: FormData) {
  await requireAdmin();
  const id = str(formData.get('devisId'));
  if (!id) return;
  const res = await sendDevisEmail(id);
  if (!res.ok) throw new Error(`Échec de l'envoi du devis : ${res.error}`);
  revalidatePath(`/admin/devis/${id}`);
  revalidatePath('/admin/devis');
  revalidateCrm();
}

// Délai minimum entre l'envoi du mail et le créneau proposé (3 jours pleins).
const MIN_LEAD_DAYS = 3;
// Fenêtre de chevauchement considérée comme un conflit d'agenda (± 1 h).
const CONFLICT_WINDOW_MIN = 60;

/**
 * Envoi du devis AVEC créneaux de visite proposés (mode collaboratif).
 * Garde-fous : chaque créneau doit être à ≥ 3 jours de l'envoi et ne pas
 * chevaucher un rendez-vous déjà planifié dans l'agenda (± 1 h).
 */
export async function sendDevisWithSlots(formData: FormData) {
  await requireAdmin();
  const id = str(formData.get('devisId'));
  if (!id) return;

  // Récupère les créneaux saisis (slot0..slot2), parse, ignore les vides.
  const slots: Date[] = [];
  for (let i = 0; i < 3; i++) {
    const raw = str(formData.get(`slot${i}`));
    if (!raw) continue;
    const d = new Date(raw);
    if (!Number.isNaN(d.getTime())) slots.push(d);
  }
  if (slots.length === 0) {
    throw new Error('Indiquez au moins un créneau de visite.');
  }

  const minDate = new Date(Date.now() + MIN_LEAD_DAYS * 24 * 60 * 60 * 1000);
  for (const d of slots) {
    if (d.getTime() < minDate.getTime()) {
      throw new Error(
        `Chaque créneau doit être au minimum à ${MIN_LEAD_DAYS} jours de l'envoi.`
      );
    }
  }

  // Anti-conflit agenda : aucun RDV actif ne doit chevaucher un créneau (± 1 h).
  const win = CONFLICT_WINDOW_MIN * 60 * 1000;
  for (const d of slots) {
    const conflict = await prisma.appointment.count({
      where: {
        status: { not: 'ANNULE' },
        start: { gte: new Date(d.getTime() - win), lte: new Date(d.getTime() + win) },
      },
    });
    if (conflict > 0) {
      throw new Error(
        `Le créneau du ${d.toLocaleString('fr-FR')} chevauche un rendez-vous existant.`
      );
    }
  }

  // Tri chronologique pour un affichage propre dans l'e-mail.
  slots.sort((a, b) => a.getTime() - b.getTime());

  const res = await sendDevisEmail(id, slots);
  if (!res.ok) throw new Error(`Échec de l'envoi du devis : ${res.error}`);
  revalidatePath(`/admin/devis/${id}`);
  revalidatePath('/admin/devis');
  revalidateCrm();
}

export async function sendFacture(formData: FormData) {
  await requireAdmin();
  const id = str(formData.get('factureId'));
  if (!id) return;
  const res = await sendFactureEmail(id);
  if (!res.ok) throw new Error(`Échec de l'envoi de la facture : ${res.error}`);
  revalidatePath(`/admin/factures/${id}`);
  revalidatePath('/admin/factures');
  revalidateCrm();
}

export async function sendRapport(formData: FormData) {
  await requireAdmin();
  const id = str(formData.get('rapportId'));
  if (!id) return;
  const res = await sendRapportEmail(id);
  if (!res.ok) throw new Error(`Échec de l'envoi du rapport : ${res.error}`);
  revalidatePath(`/admin/rapports/${id}`);
  revalidatePath('/admin/rapports');
  revalidateCrm();
}

/**
 * Relance MANUELLE d'un devis (1 clic depuis la fiche client) — e-mail
 * chaleureux. Revient sur la fiche avec un toast de confirmation.
 */
export async function relanceDevis(formData: FormData) {
  await requireAdmin();
  const id = str(formData.get('devisId'));
  const contactId = str(formData.get('contactId'));
  if (!id || !contactId) return;
  const res = await sendDevisRelanceEmail(id);
  revalidateCrm(contactId);
  const back = safeReturn(str(formData.get('redirectTo')), contactId);
  redirect(`${back}?${res.ok ? 'ok=relance' : 'err=relance'}`);
}

/**
 * Relance MANUELLE d'une facture (1 clic depuis la fiche client) — e-mail
 * bienveillant rappelant le reste dû. Revient sur la fiche avec un toast.
 */
export async function relanceFacture(formData: FormData) {
  await requireAdmin();
  const id = str(formData.get('factureId'));
  const contactId = str(formData.get('contactId'));
  if (!id || !contactId) return;
  const res = await sendFactureRelanceEmail(id);
  revalidateCrm(contactId);
  const back = safeReturn(str(formData.get('redirectTo')), contactId);
  redirect(`${back}?${res.ok ? 'ok=relance' : 'err=relance'}`);
}
