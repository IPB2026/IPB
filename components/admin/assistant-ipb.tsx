'use client';

import { useState, useTransition } from 'react';
import { Sparkles, Loader2, Copy, Check, Mail, RefreshCw } from 'lucide-react';
import { runDossierAssistant } from '@/app/admin/(app)/clients/assistant-actions';
import type { AssistantResult } from '@/lib/ai/assistant';

/**
 * « Assistant IPB » — copilote IA sur la fiche client. Un clic : résumé du dossier,
 * action conseillée, brouillon d'e-mail prêt à relire/envoyer. Lecture seule.
 */
export function AssistantIPB({
  contactId,
  clientEmail,
}: {
  contactId: string;
  clientEmail?: string | null;
}) {
  const [pending, start] = useTransition();
  const [res, setRes] = useState<AssistantResult | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const run = () => {
    setErr(null);
    start(async () => {
      const r = await runDossierAssistant(contactId);
      if ('error' in r) {
        setErr(r.error);
        setRes(null);
      } else {
        setRes(r);
      }
    });
  };

  const copyEmail = async () => {
    if (!res) return;
    try {
      await navigator.clipboard.writeText(`${res.email.objet}\n\n${res.email.corps}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard indisponible — l'utilisateur peut sélectionner manuellement */
    }
  };

  const mailto =
    res && clientEmail
      ? `mailto:${clientEmail}?subject=${encodeURIComponent(res.email.objet)}&body=${encodeURIComponent(res.email.corps)}`
      : null;

  return (
    <section className="rounded-xl border border-indigo-200 bg-gradient-to-b from-indigo-50/60 to-white p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-indigo-900">
          <Sparkles className="h-4 w-4 text-indigo-600" /> Assistant IPB
          <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-medium text-indigo-700">
            IA
          </span>
        </h2>
        <button
          type="button"
          onClick={run}
          disabled={pending}
          className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
        >
          {pending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Analyse…
            </>
          ) : res ? (
            <>
              <RefreshCw className="h-4 w-4" /> Réanalyser
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" /> Analyser le dossier
            </>
          )}
        </button>
      </div>

      {!res && !err && !pending && (
        <p className="mt-2 text-xs text-slate-500">
          Résumé du dossier, action conseillée et brouillon d&apos;e-mail — en un clic.
        </p>
      )}

      {err && (
        <p className="mt-3 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
          {err}
        </p>
      )}

      {res && (
        <div className="mt-4 space-y-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Résumé</p>
            <p className="mt-1 text-sm text-slate-700">{res.resume}</p>
          </div>
          <div className="rounded-lg border border-indigo-200 bg-white p-3">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-indigo-500">
              Action conseillée
            </p>
            <p className="mt-1 text-sm font-medium text-slate-900">{res.action}</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Brouillon d&apos;e-mail
              </p>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex h-8 items-center gap-1.5 rounded-md border border-slate-200 px-2.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? 'Copié' : 'Copier'}
                </button>
                {mailto && (
                  <a
                    href={mailto}
                    className="inline-flex h-8 items-center gap-1.5 rounded-md bg-slate-900 px-2.5 text-xs font-semibold text-white hover:bg-slate-800"
                  >
                    <Mail className="h-3.5 w-3.5" /> Ouvrir
                  </a>
                )}
              </div>
            </div>
            <p className="mt-2 text-sm font-medium text-slate-800">{res.email.objet}</p>
            <p className="mt-1 whitespace-pre-wrap text-sm text-slate-600">{res.email.corps}</p>
          </div>
          <p className="text-[11px] text-slate-400">
            Suggestions générées par IA — à relire avant d&apos;agir ou d&apos;envoyer.
          </p>
        </div>
      )}
    </section>
  );
}
