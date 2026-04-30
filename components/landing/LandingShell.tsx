import Link from 'next/link';
import Image from 'next/image';
import type { ReactNode } from 'react';
import { CrackSVG } from '@/components/ui/CrackSVG';

/**
 * LandingShell — coquille minimaliste pour landing pages Ads.
 *
 * Pas de Navbar / Footer riches : on enlève les sorties pour maximiser
 * la conversion. Logo + téléphone seulement, pas de menu.
 *
 * Cf. PLAN_LEADGEN.md §1 — Levier 6 (acquisition payante)
 */
interface LandingShellProps {
  children: ReactNode;
  phoneNumber?: string;
}

export function LandingShell({ children, phoneNumber = '0582953375' }: LandingShellProps) {
  const formattedPhone = phoneNumber.replace(/(\d{2})(?=\d)/g, '$1 ').trim();

  return (
    <div className="font-sans bg-ipb-cream text-ipb-text antialiased min-h-screen flex flex-col">
      {/* Header ultra-light : logo + téléphone */}
      <header className="bg-ipb-white border-b border-ipb-rule">
        <div className="max-w-ipb mx-auto px-6 lg:px-12 h-[60px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-ipb-orange text-white rounded-[4px] flex items-center justify-center font-extrabold text-[13px] tracking-tight">
              IPB
            </div>
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="font-serif text-[14px] text-ipb-text font-medium leading-none">Institut</span>
              <span className="text-[9px] text-ipb-muted uppercase tracking-[0.14em] mt-0.5">Pathologie du bâtiment</span>
            </div>
          </Link>

          <a
            href={`tel:${phoneNumber}`}
            className="flex items-center gap-2 text-ipb-orange font-bold text-[14px] hover:opacity-80 transition-opacity"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 1h2.5l1 3-1.5 1c1 2 2.5 3.5 4.5 4.5l1-1.5 3 1V12c0 .5-.5 1-1 1-6 0-11-5-11-11 0-.5.5-1 1-1z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="hidden sm:inline">{formattedPhone}</span>
            <span className="sm:hidden">Appeler</span>
          </a>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      {/* Footer ultra-light : adresse + décennale + lien légal seulement */}
      <footer className="bg-ipb-navy text-white py-10">
        <div className="max-w-ipb mx-auto px-6 lg:px-12 grid sm:grid-cols-[auto_1fr_auto] gap-6 items-center">
          <CrackSVG variant="mini" />
          <div className="text-[11px] text-white/50 leading-[1.7] uppercase tracking-[0.08em]">
            <p>IPB Expertise — 54 avenue Jean Jaurès, 31170 Tournefeuille</p>
            <p>Décennale AXA France IARD · Institut créé en 2019</p>
          </div>
          <div className="flex gap-4 text-[11px] text-white/40">
            <Link href="/legal/mentions-legales" className="hover:text-white/70 transition-colors">Mentions légales</Link>
            <Link href="/legal/confidentialite" className="hover:text-white/70 transition-colors">Confidentialité</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
