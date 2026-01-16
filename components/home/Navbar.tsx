"use client"

import { useState } from 'react';
import Link from 'next/link';
import { Search, Menu, X } from 'lucide-react';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-slate-200 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-gradient-to-br from-orange-600 to-orange-700 text-white p-2.5 rounded-xl font-black text-2xl shadow-lg shadow-orange-900/20 tracking-tighter group-hover:scale-105 transition-transform duration-300">
              IPB
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl text-slate-900 leading-none tracking-tight group-hover:text-orange-600 transition-colors">Institut Pathologie</span>
              <span className="font-bold text-xs text-blue-700 leading-none uppercase tracking-widest mt-1">du Bâtiment</span>
            </div>
          </Link>
          
          {/* MENU DESKTOP */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/expertise/fissures" className="text-slate-600 hover:text-orange-600 font-semibold transition text-sm uppercase tracking-wide">Fissures</Link>
            <Link href="/expertise/humidite" className="text-slate-600 hover:text-blue-600 font-semibold transition text-sm uppercase tracking-wide">Humidité</Link>
            <Link href="/blog" className="text-slate-600 hover:text-orange-600 font-semibold transition text-sm uppercase tracking-wide">Blog</Link>
            <Link href="/contact" className="text-slate-600 hover:text-orange-600 font-semibold transition text-sm uppercase tracking-wide">Contact</Link>
            
            <div className="flex items-center gap-3 ml-4 pl-4 border-l border-slate-200">
              <Link
                href="/diagnostic"
                aria-label="Accéder au diagnostic gratuit en ligne"
                className="bg-orange-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/30 text-sm flex items-center gap-2 transform hover:-translate-y-0.5 duration-200 ring-2 ring-orange-600 ring-offset-2"
              >
                <Search size={18} aria-hidden="true" />
                Mon Diagnostic Gratuit
              </Link>
            </div>
          </div>

          {/* MOBILE BURGER */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              className="text-slate-700 p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              {isMenuOpen ? <X size={28} aria-hidden="true" /> : <Menu size={28} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          role="menu"
          aria-label="Menu de navigation mobile"
          className="md:hidden bg-white border-t border-slate-100 absolute w-full z-50 shadow-2xl"
        >
          <div className="px-4 py-6 space-y-4">
            <Link
              href="/expertise/fissures"
              onClick={() => setIsMenuOpen(false)}
              role="menuitem"
              className="block text-slate-800 font-bold text-lg border-l-4 border-orange-500 pl-4 py-2 bg-slate-50"
            >
              Expertise Fissures
            </Link>
            <Link
              href="/expertise/humidite"
              onClick={() => setIsMenuOpen(false)}
              role="menuitem"
              className="block text-slate-800 font-bold text-lg border-l-4 border-blue-500 pl-4 py-2 bg-slate-50"
            >
              Expertise Humidité
            </Link>
            <Link
              href="/blog"
              onClick={() => setIsMenuOpen(false)}
              role="menuitem"
              className="block text-slate-600 font-medium pl-5 py-2"
            >
              Blog & Conseils
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
              role="menuitem"
              className="block text-slate-600 font-medium pl-5 py-2"
            >
              Contact
            </Link>
            <Link
              href="/diagnostic"
              onClick={() => setIsMenuOpen(false)}
              role="menuitem"
              className="block w-full bg-orange-600 text-white text-center py-4 rounded-xl font-bold shadow-lg mt-4"
            >
              Lancer le Diagnostic
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

