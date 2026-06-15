'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  UserCheck,
  CalendarClock,
  ClipboardCheck,
  Search,
  Settings,
} from 'lucide-react';

type Role = 'ADMIN' | 'EXPERT';

const adminItems = [
  { href: '/admin', label: 'Accueil', icon: LayoutDashboard, exact: true },
  { href: '/admin/clients', label: 'Clients', icon: UserCheck },
  { href: '/admin/agenda', label: 'Agenda', icon: CalendarClock },
  { href: '/admin/rapports', label: 'Rapports', icon: ClipboardCheck },
  { href: '/admin/recherche', label: 'Recherche', icon: Search },
];

const expertItems = [
  { href: '/admin/rapports', label: 'Interventions', icon: ClipboardCheck, exact: true },
  { href: '/admin/parametres', label: 'Compte', icon: Settings },
];

/**
 * Barre de navigation fixe en bas d'écran (mobile/tablette uniquement, masquée
 * en `lg:`). Met les vues clés à 1 tap au lieu de 2 (ouvrir le menu → choisir).
 */
export function BottomNav({ role }: { role: Role }) {
  const pathname = usePathname();
  const items = role === 'EXPERT' ? expertItems : adminItems;

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 flex border-t border-slate-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
      {items.map(({ href, label, icon: Icon, exact }) => {
        const active = exact ? pathname === href : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? 'page' : undefined}
            className={`flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-[10px] font-medium transition-colors ${
              active ? 'text-orange-600' : 'text-slate-400 active:text-slate-600'
            }`}
          >
            <Icon className="h-5 w-5" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
