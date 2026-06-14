'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  CalendarClock,
  FileText,
  Receipt,
  ClipboardCheck,
  Settings,
} from 'lucide-react';

type Role = 'ADMIN' | 'EXPERT';

const adminItems = [
  { href: '/admin', label: 'Tableau de bord', icon: LayoutDashboard },
  { href: '/admin/leads', label: 'Prospects', icon: Users },
  { href: '/admin/clients', label: 'Clients', icon: UserCheck },
  { href: '/admin/agenda', label: 'Agenda', icon: CalendarClock },
  { href: '/admin/devis', label: 'Devis', icon: FileText },
  { href: '/admin/factures', label: 'Factures', icon: Receipt },
  { href: '/admin/rapports', label: 'Rapports', icon: ClipboardCheck },
  { href: '/admin/parametres', label: 'Paramètres', icon: Settings },
];

// L'EXPERT (diagnostiqueur) ne voit que ses interventions et ses paramètres.
const expertItems = [
  { href: '/admin/rapports', label: 'Mes interventions', icon: ClipboardCheck },
  { href: '/admin/parametres', label: 'Paramètres', icon: Settings },
];

const soon: { label: string; icon: typeof ClipboardCheck }[] = [];

export function AdminNav({
  role,
  onNavigate,
}: {
  role: Role;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const items = role === 'EXPERT' ? expertItems : adminItems;

  return (
    <nav className="flex flex-col gap-0.5">
      {items.map(({ href, label, icon: Icon }) => {
        const active =
          href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            aria-current={active ? 'page' : undefined}
            className={`relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150 ${
              active
                ? 'bg-white/10 text-white'
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            {active && (
              <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-orange-500" />
            )}
            <Icon className="h-[18px] w-[18px]" />
            {label}
          </Link>
        );
      })}

      {soon.length > 0 && (
        <p className="mb-1 mt-6 px-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">
          Bientôt
        </p>
      )}
      {soon.map(({ label, icon: Icon }) => (
        <span
          key={label}
          className="flex cursor-not-allowed items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600"
        >
          <Icon className="h-[18px] w-[18px]" />
          {label}
          <span className="ml-auto rounded bg-white/5 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-slate-500">
            Soon
          </span>
        </span>
      ))}
    </nav>
  );
}
