/**
 * Rendu lisible des données du formulaire web d'un prospect (payload JSON).
 * Masque les clés internes (qualification, déjà affichée dans son panneau).
 */

const HIDE = new Set(['qualification']);

function humanize(key: string): string {
  const s = key
    .replace(/[_-]+/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .trim();
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function renderValue(v: unknown): string {
  if (v == null) return '—';
  if (Array.isArray(v)) return v.map((x) => renderValue(x)).join(', ');
  if (typeof v === 'object') {
    return Object.entries(v as Record<string, unknown>)
      .filter(([, x]) => x != null && x !== '')
      .map(([k, x]) => `${humanize(k)} : ${renderValue(x)}`)
      .join(' · ');
  }
  if (typeof v === 'boolean') return v ? 'Oui' : 'Non';
  return String(v);
}

export function PayloadView({ data }: { data: unknown }) {
  if (!data || typeof data !== 'object') {
    return <p className="text-sm text-slate-500">Aucune donnée détaillée.</p>;
  }
  const entries = Object.entries(data as Record<string, unknown>).filter(
    ([k, v]) =>
      !HIDE.has(k) &&
      v != null &&
      v !== '' &&
      !(Array.isArray(v) && v.length === 0)
  );
  if (entries.length === 0) {
    return <p className="text-sm text-slate-500">Aucune donnée détaillée.</p>;
  }
  return (
    <dl className="divide-y divide-slate-100 text-sm">
      {entries.map(([k, v]) => (
        <div key={k} className="flex justify-between gap-6 py-1.5">
          <dt className="shrink-0 text-slate-500">{humanize(k)}</dt>
          <dd className="text-right font-medium text-slate-800">{renderValue(v)}</dd>
        </div>
      ))}
    </dl>
  );
}
