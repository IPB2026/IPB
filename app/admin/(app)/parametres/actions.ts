'use server';

import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth-helpers';

export type ChangePasswordState = { ok: boolean; message: string } | undefined;
export type AccountState = { ok: boolean; message: string } | undefined;

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

// ─────────────────────────────────────────────────────────────────
// Gestion des comptes diagnostiqueurs (EXPERT) — réservé à l'ADMIN.
// ─────────────────────────────────────────────────────────────────

const createExpertSchema = z.object({
  name: z.string().trim().min(2, 'Nom requis (2 caractères minimum).'),
  email: z.string().trim().email('E-mail invalide.'),
  password: z
    .string()
    .min(10, 'Le mot de passe doit faire au moins 10 caractères.'),
});

/** Crée un compte diagnostiqueur (role EXPERT). */
export async function createExpert(
  _prev: AccountState,
  formData: FormData
): Promise<AccountState> {
  try {
    await requireAdmin();
  } catch {
    return { ok: false, message: 'Réservé aux administrateurs.' };
  }

  const parsed = createExpertSchema.safeParse({
    name: String(formData.get('name') ?? ''),
    email: String(formData.get('email') ?? ''),
    password: String(formData.get('password') ?? ''),
  });
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? 'Données invalides.' };
  }

  const email = parsed.data.email.toLowerCase();
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return { ok: false, message: 'Un compte existe déjà avec cet e-mail.' };

  const passwordHash = await bcrypt.hash(parsed.data.password, 10);
  await prisma.user.create({
    data: { name: parsed.data.name, email, passwordHash, role: 'EXPERT' },
  });

  revalidatePath('/admin/parametres');
  return { ok: true, message: `Compte diagnostiqueur créé pour ${parsed.data.name}.` };
}

/** Réinitialise le mot de passe d'un diagnostiqueur. */
export async function resetExpertPassword(
  _prev: AccountState,
  formData: FormData
): Promise<AccountState> {
  try {
    await requireAdmin();
  } catch {
    return { ok: false, message: 'Réservé aux administrateurs.' };
  }

  const userId = String(formData.get('userId') ?? '');
  const next = String(formData.get('password') ?? '');
  if (!userId) return { ok: false, message: 'Sélectionnez un diagnostiqueur.' };
  if (next.length < 10)
    return { ok: false, message: 'Le mot de passe doit faire au moins 10 caractères.' };

  const user = await prisma.user.findFirst({
    where: { id: userId, role: 'EXPERT' },
    select: { id: true, name: true },
  });
  if (!user) return { ok: false, message: 'Diagnostiqueur introuvable.' };

  const passwordHash = await bcrypt.hash(next, 10);
  await prisma.user.update({ where: { id: user.id }, data: { passwordHash } });

  revalidatePath('/admin/parametres');
  return { ok: true, message: `Mot de passe réinitialisé pour ${user.name}.` };
}
