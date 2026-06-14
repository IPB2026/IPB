'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth-helpers';
import { FactureStatus } from '@prisma/client';

export async function updateFactureStatus(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get('factureId') ?? '');
  const status = String(formData.get('status') ?? '');
  if (!id || !(status in FactureStatus)) return;
  await prisma.facture.update({
    where: { id },
    data: { status: status as FactureStatus },
  });
  revalidatePath(`/admin/factures/${id}`);
  revalidatePath('/admin/factures');
}

/**
 * Enregistre un encaissement (total ou partiel) sur une facture, via le champ
 * `acompte` (cumul des règlements). La facture passe en PAYEE une fois soldée ;
 * sinon elle reste « partiellement réglée » (acompte > 0, dérivé à l'affichage).
 */
export async function recordFacturePayment(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get('factureId') ?? '');
  const montant =
    Math.round(
      (Number(String(formData.get('montant') ?? '').replace(',', '.')) || 0) * 100
    ) / 100;
  if (!id || montant <= 0) return;

  const f = await prisma.facture.findUnique({
    where: { id },
    select: { number: true, totalHT: true, acompte: true, contactId: true },
  });
  if (!f) return;

  const total = Number(f.totalHT);
  const dejaPaye = Number(f.acompte ?? 0);
  const nouveau = Math.min(total, dejaPaye + montant);
  const solde = Math.round((total - nouveau) * 100) / 100;
  const soldee = solde <= 0;

  await prisma.facture.update({
    where: { id },
    data: { acompte: nouveau, status: soldee ? 'PAYEE' : undefined },
  });
  await prisma.activity.create({
    data: {
      type: 'SYSTEME',
      contactId: f.contactId,
      content: soldee
        ? `Facture ${f.number} soldée (encaissement de ${montant.toLocaleString('fr-FR')} €)`
        : `Encaissement de ${montant.toLocaleString('fr-FR')} € sur la facture ${f.number} — reste dû ${solde.toLocaleString('fr-FR')} €`,
    },
  });

  revalidatePath(`/admin/factures/${id}`);
  revalidatePath('/admin/factures');
  revalidatePath('/admin');
}
