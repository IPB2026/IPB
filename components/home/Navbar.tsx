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

  const links = [
    { href: '/expertise/fissures', label: 'Fissures' },
    { href: '/expertise/mur-porteur', label: 'Mur porteur' },
    { href: '/notre-expert', label: 'Le cabinet' },
    { href: '/partenaires', label: 'Pros' },
    { href: '/blog', label: 'Journal' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav
      className={`bg-ipb-white sticky top-0 z-50 transition-all border-b ${
        scrolled
          ? 'border-ipb-rule shadow-[0_2px_20px_rgba(0,0,0,0.05)]'
          : 'border-transparent'
      }`}
      style={{ height: '68px' }}
    >
      <div className="max-w-ipb mx-auto px-6 lg:px-12 h-full flex items-center justify-between">
        {/* LOGO carré orange */}
        <Link href="/" className="flex items-center gap-3 group" aria-label="IPB Expertise — Accueil">
          <div className="w-9 h-9 bg-ipb-orange text-white rounded-[4px] flex items-center justify-center font-extrabold text-[13px] tracking-tight transition-transform duration-200 group-hover:-rotate-[4deg]">
            IPB
          </div>
          <div className="hidden lg:flex flex-col leading-tight">
            <span className="font-serif text-[15px] text-ipb-text font-medium leading-none">Institut</span>
            <span className="text-[10px] text-ipb-muted uppercase tracking-[0.14em] mt-0.5">Pathologie du bâtiment</span>
          </div>
        </Link>

        {/* MENU DESKTOP */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-[11px] uppercase tracking-[0.09em] font-medium text-ipb-muted hover:text-ipb-orange transition-colors py-2 border-b border-transparent hover:border-ipb-orange"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/diagnostic"
            className="bg-ipb-orange text-white px-5 py-2.5 rounded-[3px] font-semibold text-[12px] tracking-[0.02em] hover:bg-[#b35519] transition-all hover:shadow-[0_8px_24px_rgba(200,96,31,0.25)] hover:-translate-y-px ml-2"
          >
            Demander une expertise
          </Link>
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
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsMenuOpen(false)}
                role="menuitem"
                className="block py-3 font-serif text-xl text-ipb-text hover:text-ipb-orange transition-colors"
              >
                {label}
              </Link>
            ))}
            <Link
              href="/diagnostic"
              onClick={() => setIsMenuOpen(false)}
              role="menuitem"
              className="block w-full bg-ipb-orange text-white text-center py-4 rounded-[3px] font-semibold text-sm mt-4"
            >
              Demander une expertise
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
