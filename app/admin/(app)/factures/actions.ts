'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { FactureStatus } from '@prisma/client';

export async function updateFactureStatus(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error('Non authentifié');
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
