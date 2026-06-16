'use client';

import { useEffect, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { AlertTriangle, Loader2 } from 'lucide-react';

/**
 * Bouton de soumission avec confirmation, pour les actions irréversibles ou
 * destructrices. Remplace `window.confirm` (bloquant, non stylé, non mobile) par
 * une vraie boîte de dialogue accessible (overlay + focus + bouton « pending »).
 * API inchangée (message / children / className) → remplaçable partout tel quel.
 */
export function ConfirmSubmit({
  message,
  children,
  className,
  confirmLabel = 'Confirmer',
  danger = true,
}: {
  message: string;
  children: React.ReactNode;
  className?: string;
  confirmLabel?: string;
  danger?: boolean;
}) {
  const [open, setOpen] = useState(false);

  // Esc pour fermer.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>
        {children}
      </button>
      {open && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center p-0 sm:items-center sm:p-4">
          <button
            type="button"
            aria-label="Fermer"
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1px]"
            onClick={() => setOpen(false)}
          />
          <div
            role="alertdialog"
            aria-modal="true"
            className="relative w-full max-w-sm rounded-t-2xl border border-slate-200 bg-white p-5 shadow-xl sm:rounded-2xl"
          >
            <div className="flex items-start gap-3">
              <span
                className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                  danger ? 'bg-red-50 text-red-600' : 'bg-orange-50 text-orange-600'
                }`}
              >
                <AlertTriangle className="h-5 w-5" />
              </span>
              <p className="pt-1 text-sm leading-relaxed text-slate-700">{message}</p>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="min-h-[44px] rounded-lg border border-slate-300 px-4 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Annuler
              </button>
              <ConfirmButton danger={danger} label={confirmLabel} onDone={() => setOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/** Bouton qui SOUMET réellement le formulaire englobant ; ferme à la fin. */
function ConfirmButton({
  danger,
  label,
  onDone,
}: {
  danger: boolean;
  label: string;
  onDone: () => void;
}) {
  const { pending } = useFormStatus();
  const was = useRef(false);
  useEffect(() => {
    // L'envoi vient de se terminer (revalidation en place) → on ferme la boîte.
    if (was.current && !pending) onDone();
    was.current = pending;
  }, [pending, onDone]);

  return (
    <button
      type="submit"
      disabled={pending}
      className={`inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-lg px-4 text-sm font-semibold text-white disabled:opacity-70 ${
        danger ? 'bg-red-600 hover:bg-red-700' : 'bg-slate-900 hover:bg-slate-800'
      }`}
    >
      {pending && <Loader2 className="h-4 w-4 animate-spin" />}
      {pending ? 'En cours…' : label}
    </button>
  );
}
