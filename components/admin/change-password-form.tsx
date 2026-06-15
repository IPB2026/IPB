'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { changePassword } from '@/app/admin/(app)/parametres/actions';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-2 w-full rounded-lg bg-orange-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-700 disabled:opacity-60"
    >
      {pending ? 'Enregistrement…' : 'Changer le mot de passe'}
    </button>
  );
}

const inputClass =
  'w-full rounded-lg border border-slate-300 px-3 py-2.5 text-base sm:text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200';

export function ChangePasswordForm() {
  const [state, formAction] = useFormState(changePassword, undefined);

  return (
    <form action={formAction} className="space-y-4" key={state?.ok ? 'done' : 'edit'}>
      <div>
        <label htmlFor="current" className="mb-1 block text-sm font-medium text-slate-700">
          Mot de passe actuel
        </label>
        <input
          id="current"
          name="current"
          type="password"
          required
          autoComplete="current-password"
          className={inputClass}
          placeholder="••••••••"
        />
      </div>

      <div>
        <label htmlFor="next" className="mb-1 block text-sm font-medium text-slate-700">
          Nouveau mot de passe
        </label>
        <input
          id="next"
          name="next"
          type="password"
          required
          minLength={10}
          autoComplete="new-password"
          className={inputClass}
          placeholder="Au moins 10 caractères"
        />
      </div>

      <div>
        <label htmlFor="confirm" className="mb-1 block text-sm font-medium text-slate-700">
          Confirmer le nouveau mot de passe
        </label>
        <input
          id="confirm"
          name="confirm"
          type="password"
          required
          minLength={10}
          autoComplete="new-password"
          className={inputClass}
          placeholder="Ressaisissez le nouveau mot de passe"
        />
      </div>

      {state && (
        <p
          className={`rounded-lg px-3 py-2 text-sm ${
            state.ok ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
          }`}
        >
          {state.message}
        </p>
      )}

      <SubmitButton />
    </form>
  );
}
