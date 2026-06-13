// Avatar à initiales, couleur déterministe d'après le nom.
const PALETTE = [
  'bg-orange-100 text-orange-700',
  'bg-blue-100 text-blue-700',
  'bg-emerald-100 text-emerald-700',
  'bg-violet-100 text-violet-700',
  'bg-amber-100 text-amber-700',
  'bg-cyan-100 text-cyan-700',
  'bg-rose-100 text-rose-700',
];

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function colorFor(name: string): string {
  let sum = 0;
  for (let i = 0; i < name.length; i++) sum += name.charCodeAt(i);
  return PALETTE[sum % PALETTE.length];
}

export function Avatar({
  name,
  size = 'md',
}: {
  name: string;
  size?: 'sm' | 'md';
}) {
  const dim = size === 'sm' ? 'h-7 w-7 text-[11px]' : 'h-9 w-9 text-xs';
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-semibold ${dim} ${colorFor(
        name
      )}`}
      aria-hidden="true"
    >
      {initials(name)}
    </span>
  );
}
