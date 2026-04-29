"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, ArrowRight, X, Clock, Shield, Star, MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";

export function StickyDiagnosticCta() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);

  const isHiddenPage = pathname?.startsWith("/diagnostic") || pathname?.startsWith("/legal") || pathname?.startsWith("/contact");

  const isFissuresPage = pathname?.includes('fissure') || pathname?.includes('agrafage');
  const isHumiditePage = pathname?.includes('humid') || pathname?.includes('capillaire') || 
                         pathname?.includes('moisissure') || pathname?.includes('cave') ||
                         pathname?.includes('vmi') || pathname?.includes('condensation') ||
                         pathname?.includes('salpetre') || pathname?.includes('merule');

  useEffect(() => {
    if (isHiddenPage) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 300 && !hasScrolled) {
        setHasScrolled(true);
        setIsVisible(true);
      }
    };

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, [hasScrolled, isHiddenPage]);

  if (isHiddenPage) {
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
      {/* Version Mobile/Tablet — Bottom bar éditorial signature IPB */}
      <div className={`lg:hidden fixed bottom-0 left-0 right-0 z-50 transform transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}>
        {/* Bandeau supérieur navy — trust signals éditoriaux */}
        <div className="bg-ipb-navy text-white/85 text-[11px] py-2 px-4 flex items-center justify-center gap-3 border-b border-white/5">
          <span className="flex items-center gap-1.5">
            <span className="font-serif italic text-ipb-orange-l text-[13px] font-bold leading-none">4.9</span>
            <span className="text-white/50 tracking-[0.08em]">Google</span>
          </span>
          <span className="text-white/20" aria-hidden="true">·</span>
          <span className="flex items-center gap-1.5">
            <span className="font-serif italic text-ipb-orange-l text-[13px] font-bold leading-none">850+</span>
            <span className="text-white/50 tracking-[0.08em]">chantiers</span>
          </span>
          <span className="text-white/20" aria-hidden="true">·</span>
          <span className="text-white/50 tracking-[0.08em]">Décennale AXA</span>
        </div>

        {/* CTA principal — fond cream avec filet orange signature */}
        <div className="relative bg-ipb-cream px-4 py-3 shadow-[0_-12px_32px_rgba(11,24,38,0.12)] border-t border-ipb-rule">
          {/* Filet orange vertical signature à gauche */}
          <span aria-hidden="true" className="absolute left-0 top-0 bottom-0 w-[3px] bg-ipb-orange" />

          <div className="flex items-center gap-3">
            {/* Texte contextuel éditorial */}
            <div className="flex-1 min-w-0 pl-1">
              <div className="font-serif text-ipb-text font-bold text-[15px] leading-tight truncate">
                {getContextText()}
              </div>
              <div className="text-ipb-muted text-[11px] tracking-wide mt-0.5">
                {getSubText()} · sans engagement
              </div>
            </div>

            {/* CTA primaire — orange éditorial */}
            <Link
              href="/diagnostic"
              className="group inline-flex items-center justify-center gap-1.5 bg-ipb-orange hover:bg-[#b35519] text-white font-medium py-2.5 px-4 rounded-[3px] text-[13px] tracking-wide transition-colors duration-300 active:scale-[0.98]"
              aria-label="Lancer le diagnostic gratuit"
            >
              <span>Démarrer</span>
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>

            {/* CTA téléphone — discret, navy outline */}
            <a
              href="tel:0582953375"
              className="flex items-center justify-center bg-ipb-navy text-white p-2.5 rounded-[3px] border border-ipb-navy hover:bg-ipb-navy-2 transition-colors duration-300"
              aria-label="Appeler le 05 82 95 33 75"
            >
              <Phone size={16} />
            </a>
          </div>
        </div>
      </div>

      {/* Version Desktop : désactivée pour éviter la superposition avec
          components/ui/LeadWidget (bottom-right z-40). Le LeadWidget récent
          assure la capture progressive 3 étapes sur desktop, plus aligné
          avec la charte éditoriale IPB. Le bloc ci-dessous reste désactivé
          sur desktop (lg:hidden), à supprimer dans une refonte ultérieure. */}
      <div className={`hidden fixed right-6 bottom-6 z-40 transform transition-all duration-500 ${
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

              {/* CTAs Secondaires - Téléphone & WhatsApp */}
              <div className="grid grid-cols-2 gap-2 mb-3">
                <a
                  href="tel:0582953375"
                  className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 rounded-xl transition-all text-sm"
                >
                  <Phone size={16} />
                  Appeler
                </a>
                <a
                  href="https://wa.me/33582953375?text=Bonjour%2C%20je%20souhaite%20un%20diagnostic%20pour%20ma%20maison."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 rounded-xl transition-all text-sm"
                >
                  <MessageCircle size={16} />
                  WhatsApp
                </a>
              </div>

              {/* Micro-réassurance */}
              <p className="text-center text-slate-400 text-xs">
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
