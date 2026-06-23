import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import Link from 'next/link';

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
  href,
}: {
  label: string;
  value: ReactNode;
  icon?: LucideIcon;
  tone?: keyof typeof TONES;
  hint?: string;
  /** Si fourni, la carte devient cliquable (drill-down vers la liste concernée). */
  href?: string;
}) {
  const inner = (
    <>
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
    </>
  );
  const base = 'rounded-xl border border-slate-200 bg-white p-5';
  if (href) {
    return (
      <Link href={href} className={`${base} block transition-colors hover:border-orange-200 hover:bg-orange-50/30`}>
        {inner}
      </Link>
    );
  }
  return <div className={base}>{inner}</div>;
}
