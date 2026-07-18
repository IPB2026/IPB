'use client';

import { AlertTriangle, RotateCcw } from 'lucide-react';

/**
 * Filet de sécurité des server actions de l'admin : un `throw` (échec d'envoi,
 * validation) affichait la page d'erreur générique Next et perdait le contexte.
 * Ici : message lisible, retour en un clic, saisie de la page conservée derrière.
 */
export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center p-6">
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
          <AlertTriangle className="h-6 w-6" />
        </span>
        <h1 className="mt-4 text-lg font-semibold text-slate-900">
          L&apos;action n&apos;a pas abouti
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          {error.message || 'Une erreur inattendue est survenue.'}
        </p>
        <div className="mt-5 flex justify-center gap-2">
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-[44px] cursor-pointer items-center gap-1.5 rounded-lg bg-slate-900 px-4 text-sm font-semibold text-white transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-200"
          >
            <RotateCcw className="h-4 w-4" />
            Réessayer
          </button>
          <a
            href="/admin"
            className="inline-flex min-h-[44px] cursor-pointer items-center rounded-lg border border-slate-300 px-4 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-200"
          >
            Tableau de bord
          </a>
        </div>
      </div>
    </div>
  );
}
