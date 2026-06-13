import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
  tone = 'slate',
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  tone?: 'slate' | 'amber';
}) {
  const iconWrap =
    tone === 'amber'
      ? 'bg-amber-50 text-amber-500'
      : 'bg-slate-100 text-slate-400';
  return (
    <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
      <span
        className={`inline-flex h-12 w-12 items-center justify-center rounded-full ${iconWrap}`}
      >
        <Icon className="h-6 w-6" />
      </span>
      <p className="mt-4 text-sm font-semibold text-slate-900">{title}</p>
      {description && (
        <p className="mt-1 max-w-sm text-sm text-slate-500">{description}</p>
      )}
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="mt-4 rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-700"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
