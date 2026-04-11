"use client"

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-xl sticky top-0 z-50 border-b border-black/[0.04]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="text-[22px] font-black tracking-tight text-slate-900">IPB</span>
            <span className="hidden sm:block text-[11px] text-slate-400 font-medium tracking-widest uppercase border-l border-slate-200 pl-2.5">Institut de Pathologie<br />du Bâtiment</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link href="/expertise/fissures" className="text-[13px] text-slate-500 hover:text-slate-900 transition-colors font-medium">Fissures</Link>
            <Link href="/expertise/humidite" className="text-[13px] text-slate-500 hover:text-slate-900 transition-colors font-medium">Humidité</Link>
            <Link href="/zones-intervention" className="text-[13px] text-slate-500 hover:text-slate-900 transition-colors font-medium">Zones</Link>
            <Link href="/avis-clients" className="text-[13px] text-slate-500 hover:text-slate-900 transition-colors font-medium">Avis</Link>
            <Link href="/blog" className="text-[13px] text-slate-500 hover:text-slate-900 transition-colors font-medium">Blog</Link>
            <Link href="/contact" className="text-[13px] text-slate-500 hover:text-slate-900 transition-colors font-medium">Contact</Link>
            <Link
              href="/diagnostic"
              className="bg-slate-900 text-white px-5 py-2 rounded-full text-[13px] font-semibold hover:bg-slate-800 transition-colors"
            >
              Diagnostic gratuit
            </Link>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isMenuOpen}
            className="md:hidden p-2 text-slate-600"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-black/[0.04] absolute w-full z-50">
          <div className="px-6 py-8 space-y-1">
            {[
              { href: '/expertise/fissures', label: 'Expertise Fissures' },
              { href: '/expertise/humidite', label: 'Expertise Humidité' },
              { href: '/zones-intervention', label: 'Zones d\'intervention' },
              { href: '/avis-clients', label: 'Avis Clients' },
              { href: '/blog', label: 'Blog' },
              { href: '/contact', label: 'Contact' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block py-3 text-slate-600 font-medium text-[15px] border-b border-slate-100 last:border-0"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/diagnostic"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full bg-slate-900 text-white text-center py-3.5 rounded-full font-semibold mt-4 text-[15px]"
            >
              Diagnostic gratuit
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
