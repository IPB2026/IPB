'use client';

import { useFormState, useFormStatus } from 'react-dom';
import {
  createExpert,
  resetExpertPassword,
} from '@/app/admin/(app)/parametres/actions';

const input =
  'w-full rounded-lg border border-slate-300 px-3 py-2.5 text-base sm:text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200';
const label = 'mb-1 block text-sm font-medium text-slate-700';

function Submit({ idle, busy }: { idle: string; busy: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-700 disabled:opacity-60"
    >
      {pending ? busy : idle}
    </button>
  );
}

function Feedback({
  state,
}: {
  state: { ok: boolean; message: string } | undefined;
}) {
  if (!state) return null;
  return (
    <p
      className={`rounded-lg px-3 py-2 text-sm ${
        state.ok ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
      }`}
    >
      {state.message}
    </p>
  );
}

export function ExpertAccounts({
  experts,
}: {
  experts: { id: string; name: string; email: string }[];
}) {
  const [createState, createAction] = useFormState(createExpert, undefined);
  const [resetState, resetAction] = useFormState(resetExpertPassword, undefined);

  return (
    <div className="space-y-6">
      {/* Liste */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <h3 className="border-b border-slate-100 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Diagnostiqueurs ({experts.length})
        </h3>
        {experts.length === 0 ? (
          <p className="px-4 py-4 text-sm text-slate-500">
            Aucun diagnostiqueur. Créez le premier compte ci-dessous.
          </p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {experts.map((e) => (
              <li key={e.id} className="flex items-center justify-between px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-slate-800">{e.name}</p>
                  <p className="text-xs text-slate-400">{e.email}</p>
                </div>
                <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500">
                  Diagnostiqueur
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Créer un compte */}
      <form
        action={createAction}
        key={createState?.ok ? 'created' : 'create'}
        className="space-y-4 rounded-xl border border-slate-200 bg-white p-5"
      >
        <h3 className="text-sm font-semibold text-slate-900">
          Nouveau compte diagnostiqueur
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={label} htmlFor="ex-name">
              Nom
            </label>
            <input id="ex-name" name="name" required className={input} placeholder="Jean Martin" />
          </div>
          <div>
            <label className={label} htmlFor="ex-email">
              E-mail
            </label>
            <input
              id="ex-email"
              name="email"
              type="email"
              required
              className={input}
              placeholder="jean@ipb-expertise.fr"
            />
          </div>
        </div>
        <div>
          <label className={label} htmlFor="ex-pass">
            Mot de passe provisoire
          </label>
          <input
            id="ex-pass"
            name="password"
            type="text"
            required
            minLength={10}
            className={input}
            placeholder="Au moins 10 caractères — à communiquer au diagnostiqueur"
          />
          <p className="mt-1 text-xs text-slate-400">
            Le diagnostiqueur pourra le changer depuis ses paramètres.
          </p>
        </div>
        <Feedback state={createState} />
        <Submit idle="Créer le compte" busy="Création…" />
      </form>

      {/* Réinitialiser un mot de passe */}
      {experts.length > 0 && (
        <form
          action={resetAction}
          key={resetState?.ok ? 'reset-done' : 'reset'}
          className="space-y-4 rounded-xl border border-slate-200 bg-white p-5"
        >
          <h3 className="text-sm font-semibold text-slate-900">
            Réinitialiser un mot de passe
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={label} htmlFor="rs-user">
                Diagnostiqueur
              </label>
              <select id="rs-user" name="userId" required className={input} defaultValue="">
                <option value="" disabled>
                  Choisir…
                </option>
                {experts.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.name} — {e.email}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={label} htmlFor="rs-pass">
                Nouveau mot de passe
              </label>
              <input
                id="rs-pass"
                name="password"
                type="text"
                required
                minLength={10}
                className={input}
                placeholder="Au moins 10 caractères"
              />
            </div>
          </div>
          <Feedback state={resetState} />
          <Submit idle="Réinitialiser" busy="Réinitialisation…" />
        </form>
      )}
    </div>
  );
}
