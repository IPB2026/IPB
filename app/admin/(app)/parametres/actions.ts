'use server';

import bcrypt from 'bcryptjs';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export type ChangePasswordState = { ok: boolean; message: string } | undefined;

/**
 * Changement du mot de passe de l'utilisateur connecté.
 * Vérifie le mot de passe actuel (bcrypt), impose un minimum de robustesse,
 * puis remplace le hash. Aucune donnée sensible n'est renvoyée au client.
 */
export async function changePassword(
  _prev: ChangePasswordState,
  formData: FormData
): Promise<ChangePasswordState> {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) return { ok: false, message: 'Session expirée — reconnectez-vous.' };

  const current = String(formData.get('current') ?? '');
  const next = String(formData.get('next') ?? '');
  const confirm = String(formData.get('confirm') ?? '');

  if (!current || !next) return { ok: false, message: 'Tous les champs sont requis.' };
  if (next.length < 10)
    return { ok: false, message: 'Le nouveau mot de passe doit faire au moins 10 caractères.' };
  if (next !== confirm)
    return { ok: false, message: 'La confirmation ne correspond pas au nouveau mot de passe.' };

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return { ok: false, message: 'Utilisateur introuvable.' };

  const valid = await bcrypt.compare(current, user.passwordHash);
  if (!valid) return { ok: false, message: 'Mot de passe actuel incorrect.' };

  const same = await bcrypt.compare(next, user.passwordHash);
  if (same)
    return { ok: false, message: 'Le nouveau mot de passe doit être différent de l’actuel.' };

  const passwordHash = await bcrypt.hash(next, 10);
  await prisma.user.update({ where: { id: user.id }, data: { passwordHash } });

  return { ok: true, message: 'Mot de passe mis à jour avec succès.' };
}
