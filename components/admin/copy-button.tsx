'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

/**
 * Bouton « copier dans le presse-papiers » générique (coordonnées bancaires,
 * IBAN, référence…). Affiche un retour visuel « Copié » ~1,5 s.
 */
export function CopyButton({
  value,
  label = 'Copier',
  className,
}: {
  value: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        } catch {
          /* presse-papiers indisponible (http, permissions) — on ignore */
        }
      }}
      className={
        className ??
        'inline-flex h-8 items-center gap-1.5 rounded-lg border border-slate-300 px-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50'
      }
    >
      {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? 'Copié' : label}
    </button>
  );
}
