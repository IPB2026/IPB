'use client';

import { useState } from 'react';
import { Menu, X, LogOut } from 'lucide-react';
import { AdminNav } from '@/components/admin/admin-nav';
import { Avatar } from '@/components/admin/avatar';
import { logout } from '@/app/admin/(app)/auth-actions';

function SidebarContent({
  displayName,
  email,
  onNavigate,
}: {
  displayName: string;
  email: string;
  onNavigate?: () => void;
}) {
  return (
    <div className="flex h-full flex-col">
      {/* Wordmark */}
      <div className="flex items-center gap-2.5 px-5 py-5">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-600 text-sm font-bold text-white">
          IPB
        </span>
        <div className="leading-tight">
          <p className="text-sm font-semibold text-white">Back-office</p>
          <p className="text-[11px] text-slate-400">Institut de Pathologie</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3">
        <AdminNav onNavigate={onNavigate} />
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
  children,
}: {
  displayName: string;
  email: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar desktop */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 bg-slate-900 lg:block">
        <SidebarContent displayName={displayName} email={email} />
      </aside>

      {/* Topbar mobile */}
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur lg:hidden">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-orange-600 text-xs font-bold text-white">
            IPB
          </span>
          <span className="text-sm font-semibold text-slate-900">
            Back-office
          </span>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100"
          aria-label="Ouvrir le menu"
        >
          <Menu className="h-5 w-5" />
        </button>
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
              onNavigate={() => setOpen(false)}
            />
          </aside>
        </div>
      )}

      {/* Contenu */}
      <main className="lg:pl-64">
        <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
