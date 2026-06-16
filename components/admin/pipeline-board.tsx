'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { moveLead } from '@/app/admin/(app)/leads/actions';
import { QuickActionMenu } from '@/components/admin/quick-action-menu';

export interface PipelineCard {
  id: string;
  contactId: string;
  name: string;
  sub: string;
  /** Montant du devis (0 si aucun devis envoyé/accepté → non affiché). */
  montant: number;
  phone?: string | null;
}

export interface PipelineColumn {
  stage: string;
  label: string;
  leads: PipelineCard[];
  /** Colonne dérivée du dossier (Facturé, Rapport envoyé) : lecture seule,
   *  pas de déplacement (elle reflète l'avancement réel, pas une étape manuelle). */
  readOnly?: boolean;
}

const eur = (n: number) =>
  n > 0
    ? new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 0,
      }).format(n)
    : '';

/**
 * Vue Kanban du pipeline. Sur mobile : flèches ◄ ► pour avancer/reculer une
 * fiche d'une étape (au doigt). Sur desktop : glisser-déposer la carte dans une
 * autre colonne. Le déplacement est OPTIMISTE — la carte bouge instantanément,
 * puis le serveur (moveLead + refresh) réconcilie la vérité.
 */
export function PipelineBoard({ columns }: { columns: PipelineColumn[] }) {
  const router = useRouter();
  const [, start] = useTransition();
  const [dragId, setDragId] = useState<string | null>(null);
  const [board, setBoard] = useState<PipelineColumn[]>(columns);
  // Nb de déplacements en vol (moveLead pas encore résolu). On ne resynchronise
  // avec le serveur QUE lorsqu'il n'y en a plus → un 2ᵉ déplacement rapide n'est
  // jamais écrasé par le refresh du 1er.
  const inflight = useRef(0);

  // Re-synchronise avec le serveur quand les colonnes changent vraiment (après
  // refresh/navigation). Signature stable pour ne pas écraser l'optimisme à chaque rendu.
  const sig = useMemo(
    () => columns.map((c) => `${c.stage}:${c.leads.map((l) => l.id).join(',')}`).join('|'),
    [columns]
  );
  useEffect(() => {
    if (inflight.current === 0) setBoard(columns);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sig]);

  // Séquence des étapes déplaçables = colonnes modifiables (non lecture seule).
  const stages = board.filter((c) => !c.readOnly).map((c) => c.stage);

  const move = (leadId: string, toStage: string) => {
    // 1) Optimiste : on déplace la carte localement, tout de suite. Tri stable
    //    (montant puis id) pour coller à l'ordre serveur sur montants égaux.
    setBoard((prev) => {
      let card: PipelineCard | undefined;
      const cleared = prev.map((col) => {
        const found = col.leads.find((l) => l.id === leadId);
        if (found) card = found;
        return found ? { ...col, leads: col.leads.filter((l) => l.id !== leadId) } : col;
      });
      if (!card) return prev;
      const moved = card;
      return cleared.map((col) =>
        col.stage === toStage
          ? {
              ...col,
              leads: [moved, ...col.leads].sort(
                (a, b) => b.montant - a.montant || a.id.localeCompare(b.id)
              ),
            }
          : col
      );
    });
    // 2) Serveur. On ne rafraîchit (réconciliation) QUE quand le dernier
    //    déplacement en vol est résolu, pour ne pas écraser un autre optimisme.
    inflight.current += 1;
    start(async () => {
      try {
        await moveLead(leadId, toStage);
      } finally {
        inflight.current -= 1;
        if (inflight.current === 0) router.refresh();
      }
    });
  };

  return (
    <div className="flex gap-3 overflow-x-auto pb-3">
      {board.map((col) => (
        <div
          key={col.stage}
          className={`flex w-64 shrink-0 flex-col rounded-xl border bg-slate-50 ${
            col.readOnly ? 'border-emerald-200 bg-emerald-50/40' : 'border-slate-200'
          }`}
          onDragOver={(e) => {
            if (dragId && !col.readOnly) e.preventDefault();
          }}
          onDrop={() => {
            if (dragId && !col.readOnly) {
              move(dragId, col.stage);
              setDragId(null);
            }
          }}
        >
          <div className="border-b border-slate-200 px-3 py-2.5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-700">{col.label}</span>
              <span className="rounded-full bg-white px-2 py-0.5 text-xs font-medium tabular-nums text-slate-500 ring-1 ring-slate-200">
                {col.leads.length}
              </span>
            </div>
            {(() => {
              const total = col.leads.reduce((s, l) => s + (l.montant || 0), 0);
              return total > 0 ? (
                <div className="mt-1 text-[11px] font-semibold tabular-nums text-slate-400">
                  {eur(total)}
                </div>
              ) : null;
            })()}
          </div>
          <div className="flex-1 space-y-2 p-2">
            {col.leads.length === 0 ? (
              <p className="px-1 py-2 text-xs text-slate-300">Aucun</p>
            ) : (
              col.leads.map((l) => {
                const idx = stages.indexOf(col.stage);
                return (
                  <div
                    key={l.id}
                    draggable={!col.readOnly}
                    onDragStart={() => !col.readOnly && setDragId(l.id)}
                    onDragEnd={() => setDragId(null)}
                    className="rounded-lg border border-slate-200 bg-white p-2.5 shadow-sm"
                  >
                    <Link href={`/admin/clients/${l.contactId}`} className="block">
                      <div className="flex items-start justify-between gap-2">
                        <p className="truncate text-sm font-medium text-slate-900">
                          {l.name}
                        </p>
                        {l.montant > 0 && (
                          <span className="shrink-0 text-xs font-semibold tabular-nums text-emerald-600">
                            {eur(l.montant)}
                          </span>
                        )}
                      </div>
                      {l.sub && (
                        <p className="truncate text-xs text-slate-400">{l.sub}</p>
                      )}
                    </Link>
                    <div className="mt-2 flex items-center justify-between">
                      {col.readOnly ? (
                        <span />
                      ) : (
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            disabled={idx <= 0}
                            onClick={() => move(l.id, stages[idx - 1])}
                            className="flex h-11 w-11 sm:h-9 sm:w-9 items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                            aria-label="Étape précédente"
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            disabled={idx >= stages.length - 1}
                            onClick={() => move(l.id, stages[idx + 1])}
                            className="flex h-11 w-11 sm:h-9 sm:w-9 items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                            aria-label="Étape suivante"
                          >
                            <ChevronRight className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                      <QuickActionMenu contactId={l.contactId} phone={l.phone} leadId={l.id} />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
