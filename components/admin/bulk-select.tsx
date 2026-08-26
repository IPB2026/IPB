'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { CheckSquare, Trash2, RotateCcw, XCircle, X, Check } from 'lucide-react';
import { ConfirmSubmit } from '@/components/admin/confirm-submit';

/**
 * Sélection multiple d'une liste (pattern Gmail) : un bouton « Sélectionner »
 * fait apparaître une case par ligne, puis une barre flottante applique UNE
 * action à TOUTE la sélection.
 *
 * Découpage : le contexte est côté client (l'état de sélection est éphémère),
 * mais les lignes restent rendues par le serveur — seules les cases et la barre
 * sont des îlots clients. La barre porte un `<form>` avec un input caché par id
 * sélectionné : l'action serveur reçoit donc `formData.getAll('contactIds')`,
 * sans API ni état partagé.
 */

type BulkCtx = {
  active: boolean;
  setActive: (v: boolean) => void;
  selected: string[];
  isSelected: (id: string) => boolean;
  toggle: (id: string) => void;
  replaceAll: (ids: string[]) => void;
  clear: () => void;
};

const Ctx = createContext<BulkCtx | null>(null);

function useBulk(): BulkCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('Composant de sélection utilisé hors de <BulkSelectProvider>.');
  return ctx;
}

export function BulkSelectProvider({ children }: { children: React.ReactNode }) {
  const [active, setActiveState] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  const setActive = useCallback((v: boolean) => {
    setActiveState(v);
    if (!v) setSelected([]); // sortir du mode ne doit jamais laisser une sélection fantôme
  }, []);

  const value = useMemo<BulkCtx>(
    () => ({
      active,
      setActive,
      selected,
      isSelected: (id) => selected.includes(id),
      toggle: (id) =>
        setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id])),
      replaceAll: (ids) => setSelected(ids),
      clear: () => setSelected([]),
    }),
    [active, selected, setActive]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

/** Bouton d'entrée/sortie du mode sélection (à poser dans les actions de page). */
export function BulkSelectToggle({ label = 'Sélectionner' }: { label?: string }) {
  const { active, setActive } = useBulk();
  return (
    <button
      type="button"
      onClick={() => setActive(!active)}
      className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium ${
        active
          ? 'border border-orange-300 bg-orange-50 text-orange-700 hover:bg-orange-100'
          : 'border border-slate-300 text-slate-700 hover:bg-slate-50'
      }`}
    >
      {active ? <X className="h-4 w-4" /> : <CheckSquare className="h-4 w-4" />}
      {active ? 'Quitter la sélection' : label}
    </button>
  );
}

/**
 * Case à cocher — un BOUTON, pas un `<input type=checkbox>` : les lignes de
 * liste sont des liens, et un input coché à l'intérieur d'un `<a>` déclenche
 * la navigation native (que `stopPropagation` seul n'empêche pas, et qu'un
 * `preventDefault` empêcherait au prix du cochage). Le bouton intercepte le
 * clic proprement et garde la sémantique via role/aria-checked.
 */
function CheckBox({
  checked,
  onToggle,
  label,
}: {
  checked: boolean;
  onToggle: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={label}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onToggle();
      }}
      className={`flex h-5 w-5 shrink-0 items-center justify-center self-center rounded border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${
        checked
          ? 'border-orange-600 bg-orange-600 text-white'
          : 'border-slate-300 bg-white hover:border-orange-400'
      }`}
    >
      {checked && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
    </button>
  );
}

/** Case d'une ligne. Invisible tant que le mode sélection n'est pas actif. */
export function BulkRowCheckbox({ id, label }: { id: string; label?: string }) {
  const { active, isSelected, toggle } = useBulk();
  if (!active) return null;
  return (
    <CheckBox
      checked={isSelected(id)}
      onToggle={() => toggle(id)}
      label={label ? `Sélectionner ${label}` : 'Sélectionner cette ligne'}
    />
  );
}

/** Case « tout / rien » de l'en-tête de tableau, sur les lignes de la page. */
export function BulkSelectAll({ ids }: { ids: string[] }) {
  const { active, selected, replaceAll, clear } = useBulk();
  if (!active) return null;
  const all = ids.length > 0 && ids.every((id) => selected.includes(id));
  return (
    <CheckBox
      checked={all}
      onToggle={() => (all ? clear() : replaceAll(ids))}
      label={all ? 'Tout désélectionner' : 'Tout sélectionner'}
    />
  );
}

const ICONS = {
  trash: Trash2,
  restore: RotateCcw,
  lost: XCircle,
} as const;

export type BulkAction = {
  /** Clé stable (sert de `key` React). */
  key: string;
  label: string;
  icon: keyof typeof ICONS;
  /** Texte de la boîte de confirmation ; `{n}` est remplacé par le nombre d'éléments. */
  confirm: string;
  tone?: 'danger' | 'neutral';
  /** Action serveur, passée en prop depuis la page (référence sérialisable). */
  action: (formData: FormData) => Promise<void>;
};

/**
 * Vide la sélection une fois l'action groupée terminée : sans cela, la barre
 * continuerait d'annoncer « n sélectionnés » alors que les lignes viennent de
 * quitter la liste. Doit être rendu DANS le `<form>` (useFormStatus).
 */
function ClearOnDone({ onDone }: { onDone: () => void }) {
  const { pending } = useFormStatus();
  const was = useRef(false);
  useEffect(() => {
    if (was.current && !pending) onDone();
    was.current = pending;
  }, [pending, onDone]);
  return null;
}

/**
 * Barre flottante d'actions groupées. Ne s'affiche qu'avec au moins un élément
 * sélectionné ; chaque action est un formulaire distinct portant la sélection
 * en inputs cachés + confirmation obligatoire (une action groupée touche
 * plusieurs fiches d'un coup).
 */
export function BulkActionBar({
  actions,
  redirectTo,
  noun = 'client',
}: {
  actions: BulkAction[];
  /** Écran où revenir après l'action (la vue courante, filtres compris). */
  redirectTo?: string;
  noun?: string;
}) {
  const { active, selected, clear } = useBulk();
  if (!active || selected.length === 0) return null;
  const n = selected.length;

  return (
    <div className="sticky bottom-16 z-30 mx-auto w-full max-w-3xl md:bottom-4">
      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 shadow-lg">
        <span className="mr-auto text-sm font-semibold text-white">
          {n} {noun}
          {n > 1 ? 's' : ''} sélectionné{n > 1 ? 's' : ''}
        </span>
        <button
          type="button"
          onClick={clear}
          className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
        >
          Tout décocher
        </button>
        {actions.map((a) => {
          const Icon = ICONS[a.icon];
          return (
            <form key={a.key} action={a.action}>
              <ClearOnDone onDone={clear} />
              {selected.map((id) => (
                <input key={id} type="hidden" name="contactIds" value={id} />
              ))}
              {redirectTo && <input type="hidden" name="redirectTo" value={redirectTo} />}
              <ConfirmSubmit
                danger={a.tone !== 'neutral'}
                message={a.confirm.replace('{n}', String(n))}
                confirmLabel={a.label}
                className={`inline-flex min-h-[38px] cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold ${
                  a.tone === 'neutral'
                    ? 'bg-white text-slate-800 hover:bg-slate-100'
                    : 'bg-red-600 text-white hover:bg-red-700'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {a.label}
              </ConfirmSubmit>
            </form>
          );
        })}
      </div>
    </div>
  );
}
