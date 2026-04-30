"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

/**
 * Navbar — sticky 68px, fond cream, premium éditorial.
 * Logo carré orange 36×36, liens uppercase 11px, CTA compact.
 *
 * Cf. IPB_Design_Handoff.md §5.1
 */
export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links: Array<{
    href: string;
    label: string;
    mobileLabel?: string;
    subtitle?: string;
    highlight?: boolean;
  }> = [
    { href: '/expertise/fissures', label: 'Fissures' },
    { href: '/expertise/mur-porteur', label: 'Mur porteur' },
    {
      href: '/calcul-prix-mur-porteur',
      label: 'Prix mur porteur',
      mobileLabel: 'Calculateur prix mur porteur',
      subtitle: 'Outil interactif · estimation en 2 min',
      highlight: true,
    },
    { href: '/notre-expert', label: 'L’institut' },
    { href: '/partenaires', label: 'Pros' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav
      className={`bg-ipb-white sticky top-0 z-50 border-b duration-200 ${
        scrolled
          ? 'border-ipb-rule shadow-[0_2px_20px_rgba(0,0,0,0.05)]'
          : 'border-transparent shadow-none'
      }`}
      style={{
        height: '68px',
        transitionProperty: 'border-color, box-shadow',
        transitionTimingFunction: 'ease-out',
      }}
    >
      <div className="max-w-ipb mx-auto px-5 lg:px-12 h-full flex items-center justify-between gap-3">
        {/* LOGO + CTA Diagnostic gratuit collés à gauche — proportions harmonisées */}
        <div className="flex items-center gap-3 lg:gap-4">
          <Link href="/" className="flex items-center gap-2.5 lg:gap-3 group shrink-0" aria-label="IPB Expertise — Accueil">
            <div className="w-11 h-11 lg:w-10 lg:h-10 bg-ipb-orange text-white rounded-[5px] flex items-center justify-center font-extrabold text-[15px] lg:text-[14px] tracking-tight transition-transform duration-200 group-hover:-rotate-[4deg] shadow-[0_2px_8px_rgba(200,96,31,0.25)]">
              IPB
            </div>
            <div className="hidden lg:flex flex-col leading-tight">
              <span className="font-serif text-[15px] text-ipb-text font-medium leading-none">Institut</span>
              <span className="text-[10px] text-ipb-muted uppercase tracking-[0.14em] mt-0.5">Pathologie du bâtiment</span>
            </div>
          </Link>

          {/* CTA Diagnostic gratuit collé au logo — proportions harmonisées avec le logo (h-11 mobile) */}
          <Link
            href="/diagnostic"
            className="group inline-flex items-center gap-1.5 h-11 lg:h-10 bg-ipb-orange hover:bg-[#b35519] text-white px-4 lg:px-5 rounded-[5px] font-semibold text-[12.5px] lg:text-[12px] tracking-[0.02em] transition-colors duration-300 shrink-0 shadow-[0_2px_8px_rgba(200,96,31,0.18)]"
            aria-label="Lancer un diagnostic gratuit"
          >
            <span className="sm:hidden">Diagnostic</span>
            <span className="hidden sm:inline">Diagnostic gratuit</span>
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
          </Link>
        </div>

        {/* MENU DESKTOP */}
        <div className="hidden md:flex items-center gap-5 lg:gap-7">
          {links.map(({ href, label, highlight }) => (
            <Link
              key={href}
              href={href}
              className={
                highlight
                  ? "inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.09em] font-semibold text-ipb-orange hover:text-[#b35519] transition-colors py-2 border-b border-ipb-orange/40 hover:border-ipb-orange"
                  : "text-[11px] uppercase tracking-[0.09em] font-medium text-ipb-muted hover:text-ipb-orange transition-colors py-2 border-b border-transparent hover:border-ipb-orange"
              }
              title={highlight ? "Calculateur de prix d'ouverture de mur porteur — estimation gratuite en 2 minutes" : undefined}
            >
              {highlight && (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="4" y="2" width="16" height="20" rx="2" />
                  <line x1="8" y1="6" x2="16" y2="6" />
                  <line x1="16" y1="14" x2="16" y2="18" />
                  <line x1="8" y1="14" x2="12" y2="14" />
                  <line x1="8" y1="18" x2="12" y2="18" />
                </svg>
              )}
              {label}
            </Link>
          ))}
        </div>

        {/* MOBILE BURGER */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          className="md:hidden text-ipb-text p-2 hover:bg-ipb-stone rounded-[3px] transition-colors"
        >
          {isMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          role="menu"
          aria-label="Menu de navigation mobile"
          className="md:hidden bg-ipb-white border-t border-ipb-rule absolute w-full z-50 shadow-2xl"
        >
          <div className="px-6 py-6 space-y-1">
            {links.map(({ href, label, mobileLabel, subtitle, highlight }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsMenuOpen(false)}
                role="menuitem"
                className={
                  highlight
                    ? "block py-3 text-ipb-orange transition-colors"
                    : "block py-3 font-serif text-xl text-ipb-text hover:text-ipb-orange transition-colors"
                }
              >
                {highlight ? (
                  <span className="flex items-center gap-3">
                    <span className="flex-shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-full bg-ipb-orange/10 text-ipb-orange" aria-hidden="true">
                      {/* icône calculatrice */}
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="4" y="2" width="16" height="20" rx="2" />
                        <line x1="8" y1="6" x2="16" y2="6" />
                        <line x1="8" y1="11" x2="8" y2="11" />
                        <line x1="12" y1="11" x2="12" y2="11" />
                        <line x1="16" y1="11" x2="16" y2="11" />
                        <line x1="8" y1="15" x2="8" y2="15" />
                        <line x1="12" y1="15" x2="12" y2="15" />
                        <line x1="16" y1="15" x2="16" y2="19" />
                        <line x1="8" y1="19" x2="12" y2="19" />
                      </svg>
                    </span>
                    <span className="flex flex-col">
                      <span className="font-serif text-xl font-semibold leading-tight">
                        {mobileLabel || label}
                      </span>
                      {subtitle && (
                        <span className="text-[12px] text-ipb-muted font-normal mt-0.5">
                          {subtitle}
                        </span>
                      )}
                    </span>
                  </span>
                ) : (
                  label
                )}
              </Link>
            ))}
            <Link
              href="/diagnostic"
              onClick={() => setIsMenuOpen(false)}
              role="menuitem"
              className="block w-full bg-ipb-orange text-white text-center py-4 rounded-[3px] font-semibold text-sm mt-4"
            >
              Diagnostic gratuit
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
