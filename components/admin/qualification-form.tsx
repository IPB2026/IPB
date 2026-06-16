'use client';

import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { qualifyLead } from '@/app/admin/(app)/leads/actions';
import {
  QUAL_OPTIONS,
  scoreQualification,
  type QualDelai,
  type QualDecision,
  type QualBien,
} from '@/lib/crm/qualification';

const field =
  'h-10 w-full rounded-lg border border-slate-300 px-3 text-base sm:text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200';
const label = 'mb-1 block text-xs font-medium text-slate-500';

const TIER_TONE: Record<string, string> = {
  HOT: 'bg-red-50 text-red-700 ring-red-600/20',
  WARM: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  COLD: 'bg-slate-100 text-slate-600 ring-slate-500/20',
};

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="h-10 rounded-lg bg-slate-900 px-4 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
    >
      {pending ? 'Enregistrement…' : 'Enregistrer la qualification'}
    </button>
  );
}

function Select<T extends string>({
  name,
  title,
  options,
  value,
  onChange,
}: {
  name: string;
  title: string;
  options: readonly { value: string; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div>
      <label className={label} htmlFor={`q-${name}`}>
        {title}
      </label>
      <select
        id={`q-${name}`}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className={field}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function QualificationForm({
  leadId,
  current,
}: {
  leadId: string;
  current?: {
    delai?: QualDelai;
    decision?: QualDecision;
    bien?: QualBien;
    note?: string;
  } | null;
}) {
  const [delai, setDelai] = useState<QualDelai>(current?.delai ?? 'INCONNU');
  const [decision, setDecision] = useState<QualDecision>(
    current?.decision ?? 'INCONNU'
  );
  const [bien, setBien] = useState<QualBien>(current?.bien ?? 'INCONNU');

  const preview = scoreQualification({ delai, decision, bien });

  return (
    <form action={qualifyLead} className="space-y-4">
      <input type="hidden" name="leadId" value={leadId} />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Select
          name="delai"
          title="Délai du projet"
          options={QUAL_OPTIONS.delai}
          value={delai}
          onChange={setDelai}
        />
        <Select
          name="decision"
          title="Décisionnaire"
          options={QUAL_OPTIONS.decision}
          value={decision}
          onChange={setDecision}
        />
        <Select
          name="bien"
          title="Type de bien"
          options={QUAL_OPTIONS.bien}
          value={bien}
          onChange={setBien}
        />
      </div>

      <div>
        <label className={label} htmlFor="q-note">
          Note de qualification (facultatif)
        </label>
        <input
          id="q-note"
          name="note"
          defaultValue={current?.note ?? ''}
          placeholder="Contexte de l'appel, point de vigilance…"
          className={field}
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-slate-50 px-4 py-3">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <span>Résultat&nbsp;:</span>
          <span
            className={`rounded-md px-2 py-0.5 text-xs font-semibold ring-1 ring-inset ${
              TIER_TONE[preview.tier] ?? TIER_TONE.COLD
            }`}
          >
            {preview.tier}
          </span>
          <span className="tabular-nums text-slate-500">
            {preview.score}/{preview.maxScore}
          </span>
        </div>
        <Submit />
      </div>
    </form>
  );
}
