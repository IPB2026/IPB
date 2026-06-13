'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/app/admin/login/actions';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-2 w-full rounded-lg bg-orange-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-700 disabled:opacity-60"
    >
      {pending ? 'Connexion…' : 'Se connecter'}
    </button>
  );
}

export function LoginForm() {
  const [errorMessage, formAction] = useFormState(authenticate, undefined);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label
          htmlFor="email"
          className="mb-1 block text-sm font-medium text-slate-700"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
          placeholder="vous@ipb-expertise.fr"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-1 block text-sm font-medium text-slate-700"
        >
          Mot de passe
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
          placeholder="••••••••"
        />
      </div>

      {errorMessage && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {errorMessage}
        </p>
      )}

      <SubmitButton />
    </form>
  );
}
