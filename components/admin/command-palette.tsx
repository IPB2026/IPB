'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

interface Hit {
  id: string;
  href: string;
  title: string;
  subtitle?: string;
}
interface Results {
  contacts: Hit[];
  devis: Hit[];
  factures: Hit[];
  rapports: Hit[];
  total: number;
}

/**
 * Palette de recherche globale ⌘K / Ctrl+K (ADMIN). Recherche débouncée sur
 * /api/admin/search ; résultats groupés cliquables. Échap ferme, Entrée ouvre la
 * page de recherche complète. Sans dépendance externe.
 */
export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [res, setRes] = useState<Results | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 0);
      return () => clearTimeout(t);
    }
    // Réinitialise à la fermeture.
    setQ('');
    setRes(null);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const term = q.trim();
    if (term.length < 2) {
      setRes(null);
      return;
    }
    setLoading(true);
    const t = setTimeout(async () => {
      try {
        const r = await fetch(`/api/admin/search?q=${encodeURIComponent(term)}`);
        if (r.ok) setRes((await r.json()) as Results);
      } catch {
        /* réseau indisponible — on ignore */
      } finally {
        setLoading(false);
      }
    }, 200);
    return () => clearTimeout(t);
  }, [q, open]);

  if (!open) return null;

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  const groups: [string, Hit[]][] = res
    ? [
        ['Clients', res.contacts],
        ['Devis', res.devis],
        ['Factures', res.factures],
        ['Rapports', res.rapports],
      ]
    : [];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-slate-900/40 p-4 pt-[12vh]"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 border-b border-slate-100 px-4">
          <Search className="h-4 w-4 shrink-0 text-slate-400" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && q.trim().length >= 2) {
                go(`/admin/recherche?q=${encodeURIComponent(q.trim())}`);
              }
            }}
            placeholder="Rechercher un client, devis, facture, rapport…"
            className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
          />
          <kbd className="hidden rounded border border-slate-200 px-1.5 py-0.5 text-[10px] text-slate-400 sm:block">
            Échap
          </kbd>
        </div>
        <div className="max-h-[50vh] overflow-y-auto p-2">
          {q.trim().length < 2 ? (
            <p className="px-3 py-6 text-center text-sm text-slate-400">
              Tapez au moins 2 caractères.
            </p>
          ) : loading && !res ? (
            <p className="px-3 py-6 text-center text-sm text-slate-400">Recherche…</p>
          ) : res && res.total === 0 ? (
            <p className="px-3 py-6 text-center text-sm text-slate-400">
              Aucun résultat pour «&nbsp;{q.trim()}&nbsp;».
            </p>
          ) : (
            groups
              .filter(([, hits]) => hits.length > 0)
              .map(([label, hits]) => (
                <div key={label} className="mb-1">
                  <p className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    {label}
                  </p>
                  {hits.map((h) => (
                    <button
                      key={h.id}
                      onClick={() => go(h.href)}
                      className="flex w-full flex-col items-start rounded-lg px-3 py-2 text-left hover:bg-orange-50"
                    >
                      <span className="text-sm font-medium text-slate-800">{h.title}</span>
                      {h.subtitle && (
                        <span className="text-xs text-slate-500">{h.subtitle}</span>
                      )}
                    </button>
                  ))}
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
}
