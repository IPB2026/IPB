'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { headers } from 'next/headers';
import { checkRateLimit } from '@/lib/rateLimit';

/**
 * Action de connexion au back-office.
 * Renvoie un message d'erreur si les identifiants sont invalides ;
 * en cas de succès, signIn lève une redirection vers /admin.
 */
export async function authenticate(
  _prevState: string | undefined,
  formData: FormData
): Promise<string | undefined> {
  // Anti brute-force : 5 tentatives / 15 min par couple IP+e-mail.
  const ip = headers().get('x-forwarded-for')?.split(',')[0]?.trim() || 'ip-inconnue';
  const email = String(formData.get('email') ?? '').toLowerCase();
  const rate = checkRateLimit(`login:${ip}:${email}`, { limit: 5, windowMs: 15 * 60 * 1000 });
  if (!rate.allowed) {
    const min = Math.ceil(rate.retryAfterMs / 60000);
    return `Trop de tentatives. Réessayez dans ${min} min.`;
  }
  try {
    await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirectTo: '/admin',
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return 'Email ou mot de passe incorrect.';
    }
    throw error; // laisse passer la redirection Next.js
  }
}
