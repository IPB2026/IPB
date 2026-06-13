import type { LucideIcon } from 'lucide-react';

const TONES = {
  slate: 'bg-slate-100 text-slate-600',
  orange: 'bg-orange-50 text-orange-600',
  amber: 'bg-amber-50 text-amber-600',
  emerald: 'bg-emerald-50 text-emerald-600',
  blue: 'bg-blue-50 text-blue-600',
} as const;

export function StatCard({
  label,
  value,
  icon: Icon,
  tone = 'slate',
  hint,
}: {
  label: string;
  value: number | string;
  icon?: LucideIcon;
  tone?: keyof typeof TONES;
  hint?: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        {Icon && (
          <span
            className={`inline-flex h-8 w-8 items-center justify-center rounded-lg ${TONES[tone]}`}
          >
            <Icon className="h-4 w-4" />
          </span>
        )}
      </div>
      <p className="mt-2 text-3xl font-bold tabular-nums tracking-tight text-slate-900">
        {value}
      </p>
      {hint && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
    </div>
  );
}
