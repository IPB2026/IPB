'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

/**
 * Action de connexion au back-office.
 * Renvoie un message d'erreur si les identifiants sont invalides ;
 * en cas de succès, signIn lève une redirection vers /admin.
 */
export async function authenticate(
  _prevState: string | undefined,
  formData: FormData
): Promise<string | undefined> {
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
