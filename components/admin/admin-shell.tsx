'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, LogOut, Search, Eye, EyeOff } from 'lucide-react';
import { AdminNav } from '@/components/admin/admin-nav';
import { BottomNav } from '@/components/admin/bottom-nav';
import { Avatar } from '@/components/admin/avatar';
import { CommandPalette } from '@/components/admin/command-palette';
import { logout } from '@/app/admin/(app)/auth-actions';

type Role = 'ADMIN' | 'EXPERT';

/** Bouton confidentialité : masque/affiche les montants du CRM (ADMIN). */
function PrivacyToggle({
  on,
  onToggle,
  className = '',
}: {
  on: boolean;
  onToggle: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={on}
      title={on ? 'Afficher les montants' : 'Masquer les montants (confidentialité)'}
      className={className}
    >
      {on ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
    </button>
  );
}

function SidebarContent({
  displayName,
  email,
  role,
  privacy,
  onTogglePrivacy,
  onNavigate,
}: {
  displayName: string;
  email: string;
  role: Role;
  privacy: boolean;
  onTogglePrivacy: () => void;
  onNavigate?: () => void;
}) {
  return (
    <div className="flex h-full flex-col">
      {/* Wordmark — cliquable : retour au tableau de bord */}
      <Link
        href={role === 'EXPERT' ? '/admin/rapports' : '/admin'}
        onClick={onNavigate}
        className="flex items-center gap-2.5 px-5 py-5 transition-opacity hover:opacity-80"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-600 text-sm font-bold text-white">
          IPB
        </span>
        <div className="leading-tight">
          <p className="text-sm font-semibold text-white">
            {role === 'EXPERT' ? 'Espace terrain' : 'Back-office'}
          </p>
          <p className="text-[11px] text-slate-400">Institut de Pathologie</p>
        </div>
      </Link>

      <div className="flex-1 overflow-y-auto px-3">
        <AdminNav role={role} onNavigate={onNavigate} />
      </div>

      {/* User footer */}
      <div className="border-t border-white/10 p-3">
        <div className="flex items-center gap-2.5 rounded-lg px-2 py-2">
          <Avatar name={displayName} size="sm" />
          <div className="min-w-0 flex-1 leading-tight">
            <p className="truncate text-sm font-medium text-white">
              {displayName}
            </p>
            <p className="truncate text-[11px] text-slate-400">{email}</p>
          </div>
          {role === 'ADMIN' && (
            <PrivacyToggle
              on={privacy}
              onToggle={onTogglePrivacy}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors duration-150 hover:bg-white/10 hover:text-white"
            />
          )}
          <form action={logout}>
            <button
              type="submit"
              title="Déconnexion"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors duration-150 hover:bg-white/10 hover:text-white"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export function AdminShell({
  displayName,
  email,
  role,
  initialPrivacy = false,
  children,
}: {
  displayName: string;
  email: string;
  role: Role;
  initialPrivacy?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [privacy, setPrivacy] = useState(Boolean(initialPrivacy));

  // Bascule confidentialité : applique la classe racine (flou CSS instantané sur
  // les <Money>) et mémorise le choix dans un cookie (1 an), lu côté serveur au
  // prochain rendu pour éviter tout flash.
  const togglePrivacy = () => {
    setPrivacy((p) => {
      const next = !p;
      document.cookie = `crm_privacy=${next ? '1' : '0'};path=/;max-age=31536000;samesite=lax`;
      return next;
    });
  };

  return (
    <div className={`min-h-screen bg-slate-50${privacy ? ' crm-private' : ''}`}>
      {/* Sidebar desktop */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 bg-slate-900 lg:block">
        <SidebarContent
          displayName={displayName}
          email={email}
          role={role}
          privacy={privacy}
          onTogglePrivacy={togglePrivacy}
        />
      </aside>

      {/* Topbar mobile */}
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur lg:hidden">
        <Link
          href={role === 'EXPERT' ? '/admin/rapports' : '/admin'}
          className="flex items-center gap-2"
          aria-label="Retour au tableau de bord"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-orange-600 text-xs font-bold text-white">
            IPB
          </span>
          <span className="text-sm font-semibold text-slate-900">
            {role === 'EXPERT' ? 'Espace terrain' : 'Back-office'}
          </span>
        </Link>
        <div className="flex items-center gap-1">
          {role === 'ADMIN' && (
            <PrivacyToggle
              on={privacy}
              onToggle={togglePrivacy}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100"
            />
          )}
          {role !== 'EXPERT' && (
            <Link
              href="/admin/recherche"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100"
              aria-label="Recherche"
            >
              <Search className="h-5 w-5" />
            </Link>
          )}
          <button
            onClick={() => setOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100"
            aria-label="Ouvrir le menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Drawer mobile */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-slate-900/50"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <aside className="absolute inset-y-0 left-0 w-72 bg-slate-900 shadow-xl">
            <button
              onClick={() => setOpen(false)}
              className="absolute right-3 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-white/10 hover:text-white"
              aria-label="Fermer le menu"
            >
              <X className="h-5 w-5" />
            </button>
            <SidebarContent
              displayName={displayName}
              email={email}
              role={role}
              privacy={privacy}
              onTogglePrivacy={togglePrivacy}
              onNavigate={() => setOpen(false)}
            />
          </aside>
        </div>
      )}

      {/* Contenu */}
      <main className="lg:pl-64">
        <div className="mx-auto max-w-7xl p-4 pb-24 sm:p-6 lg:p-8 lg:pb-8">
          {children}
        </div>
      </main>

      {/* Navigation basse (mobile/tablette) */}
      <BottomNav role={role} />

      {/* Palette de recherche ⌘K (ADMIN uniquement) */}
      {role === 'ADMIN' && <CommandPalette />}
    </div>
  );
}
