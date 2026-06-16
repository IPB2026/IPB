'use client';

import Link from 'next/link';
import { useState, useTransition } from 'react';
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
 * autre colonne. Tout passe par l'action serveur moveLead.
 */
export function PipelineBoard({ columns }: { columns: PipelineColumn[] }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [dragId, setDragId] = useState<string | null>(null);
  // Séquence des étapes déplaçables = colonnes modifiables (non lecture seule).
  const stages = columns.filter((c) => !c.readOnly).map((c) => c.stage);

  const move = (leadId: string, stage: string) =>
    start(async () => {
      await moveLead(leadId, stage);
      router.refresh();
    });

  return (
    <div className={`flex gap-3 overflow-x-auto pb-3 ${pending ? 'opacity-60' : ''}`}>
      {columns.map((col) => (
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
                            disabled={idx <= 0 || pending}
                            onClick={() => move(l.id, stages[idx - 1])}
                            className="flex h-9 w-9 sm:h-7 sm:w-7 items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                            aria-label="Étape précédente"
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            disabled={idx >= stages.length - 1 || pending}
                            onClick={() => move(l.id, stages[idx + 1])}
                            className="flex h-9 w-9 sm:h-7 sm:w-7 items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
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
