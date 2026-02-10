"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, ArrowRight, X, Clock, Shield, Star } from "lucide-react";
import { usePathname } from "next/navigation";

export function StickyDiagnosticCta() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Déterminer le contexte (fissures ou humidité)
  const isFissuresPage = pathname?.includes('fissure') || pathname?.includes('agrafage');
  const isHumiditePage = pathname?.includes('humid') || pathname?.includes('capillaire') || 
                         pathname?.includes('moisissure') || pathname?.includes('cave') ||
                         pathname?.includes('vmi') || pathname?.includes('condensation') ||
                         pathname?.includes('salpetre') || pathname?.includes('merule');

  // Animation d'entrée après scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 300 && !hasScrolled) {
        setHasScrolled(true);
        setIsVisible(true);
      }
    };

    // Afficher après 2 secondes si pas de scroll
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, [hasScrolled]);

  // Pages où ne pas afficher
  if (pathname?.startsWith("/diagnostic") || pathname?.startsWith("/legal") || pathname?.startsWith("/contact")) {
    return null;
  }

  // Texte contextuel
  const getContextText = () => {
    if (isFissuresPage) return "Fissures ? Diagnostic gratuit";
    if (isHumiditePage) return "Humidité ? Diagnostic gratuit";
    return "Diagnostic gratuit";
  };

  const getSubText = () => {
    if (isFissuresPage) return "Réponse sous 48h";
    if (isHumiditePage) return "Réponse sous 48h";
    return "Réponse sous 48h";
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Version Mobile/Tablet - Sticky Bottom (Compact) */}
      <div className={`lg:hidden fixed bottom-0 left-0 right-0 z-50 transform transition-all duration-500 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}>
        {/* CTA Principal - Version compacte */}
        <div className="bg-gradient-to-r from-orange-600 to-orange-500 px-3 py-2.5 shadow-[0_-2px_20px_rgba(234,88,12,0.3)]">
          <div className="flex items-center gap-2">
            {/* Bouton principal */}
            <Link
              href="/diagnostic"
              className="flex-1 flex items-center justify-center gap-2 bg-white text-orange-600 font-bold py-2.5 px-4 rounded-lg shadow-md hover:bg-orange-50 transition-all active:scale-[0.98] text-sm"
              aria-label="Lancer le diagnostic gratuit"
            >
              <span>Diagnostic gratuit</span>
              <ArrowRight size={16} />
            </Link>

            {/* Bouton téléphone */}
            <a
              href="tel:0582953375"
              className="flex items-center justify-center bg-white/20 text-white p-2.5 rounded-lg border border-white/30 hover:bg-white/30 transition-all"
              aria-label="Appeler"
            >
              <Phone size={18} />
            </a>

            {/* Badges compacts */}
            <div className="hidden sm:flex items-center gap-2 text-white text-xs">
              <span className="flex items-center gap-1">
                <Star size={10} className="text-yellow-300 fill-yellow-300" />
                4.9
              </span>
              <span className="text-white/50">|</span>
              <span>48h</span>
            </div>
          </div>
        </div>
      </div>

      {/* Version Desktop - Floating Side CTA */}
      <div className={`hidden lg:block fixed right-6 bottom-6 z-50 transform transition-all duration-500 ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}>
        {isExpanded ? (
          <div className="bg-white rounded-3xl shadow-2xl shadow-orange-500/20 border border-slate-200 overflow-hidden w-80 animate-in slide-in-from-right-4 duration-500">
            {/* Header avec effet pulsant */}
            <div className="relative bg-gradient-to-r from-orange-600 to-red-500 p-4 text-white">
              <div className="absolute top-2 right-2">
                <button 
                  onClick={() => setIsExpanded(false)}
                  className="text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10 transition"
                  aria-label="Réduire"
                >
                  <X size={16} />
                </button>
              </div>
              
              {/* Badge pulsant */}
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-3 py-1 rounded-full text-xs font-bold mb-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Expert disponible
              </div>
              
              <h3 className="text-lg font-extrabold">
                {isFissuresPage ? "🏠 Fissures sur votre maison ?" : 
                 isHumiditePage ? "💧 Problème d'humidité ?" : 
                 "🔍 Besoin d'un diagnostic ?"}
              </h3>
              <p className="text-orange-100 text-sm mt-1">
                Réponse personnalisée sous 48h
              </p>
            </div>

            {/* Corps */}
            <div className="p-4">
              {/* Stats de confiance */}
              <div className="flex items-center justify-between text-xs text-slate-500 mb-4 pb-4 border-b border-slate-100">
                <span className="flex items-center gap-1">
                  <Star size={14} className="text-yellow-500 fill-yellow-500" />
                  <strong className="text-slate-700">4.9/5</strong> (127 avis)
                </span>
                <span className="flex items-center gap-1">
                  <Shield size={14} className="text-green-500" />
                  Garantie décennale
                </span>
              </div>

              {/* CTA Principal */}
              <Link
                href="/diagnostic"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-orange-500/30 transition-all transform hover:scale-[1.02] mb-3"
              >
                Diagnostic gratuit en 5 min
                <ArrowRight size={18} />
              </Link>

              {/* CTA Secondaire - Téléphone */}
              <a
                href="tel:0582953375"
                className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 rounded-xl transition-all"
              >
                <Phone size={18} />
                05 82 95 33 75
              </a>

              {/* Micro-réassurance */}
              <p className="text-center text-slate-400 text-xs mt-3">
                ✓ Devis gratuit · ✓ Réponse 48h
              </p>
            </div>
          </div>
        ) : (
          /* Version réduite - Bouton flottant */
          <button
            onClick={() => setIsExpanded(true)}
            className="group relative bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-2xl shadow-2xl shadow-orange-500/40 hover:shadow-orange-500/60 transition-all transform hover:scale-105"
          >
            {/* Badge notification */}
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse border-2 border-white"></span>
            
            <div className="flex items-center gap-3">
              <div className="text-2xl">🔍</div>
              <div className="text-left">
                <div className="font-bold text-sm">Diagnostic</div>
                <div className="text-orange-200 text-xs">Gratuit</div>
              </div>
            </div>
          </button>
        )}
      </div>
    </>
  );
}
