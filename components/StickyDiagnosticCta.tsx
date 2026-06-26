"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";

export function StickyDiagnosticCta() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const isHiddenPage = pathname?.startsWith("/diagnostic") || pathname?.startsWith("/legal");

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

    window.addEventListener('scroll', handleScroll, { passive: true });
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
    if (isFissuresPage) return "Une fissure vous inquiète ?";
    if (isHumiditePage) return "Un problème d'humidité ?";
    return "Un doute sur votre bâti ?";
  };

  const getSubText = () => "Réponse de l'institut sous 48h";

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
            <span className="text-white/75 tracking-[0.08em]">Google</span>
          </span>
          <span className="text-white/20" aria-hidden="true">·</span>
          <span className="flex items-center gap-1.5">
            <span className="font-serif italic text-ipb-orange-l text-[13px] font-bold leading-none">850+</span>
            <span className="text-white/75 tracking-[0.08em]">chantiers</span>
          </span>
          <span className="text-white/20" aria-hidden="true">·</span>
          <span className="text-white/75 tracking-[0.08em]">Un seul interlocuteur</span>
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
              className="group inline-flex items-center justify-center gap-1.5 bg-ipb-orange-d hover:bg-[#7E390F] text-white font-medium py-2.5 px-4 rounded-[3px] text-[13px] tracking-wide transition-colors duration-300 active:scale-[0.98]"
              aria-label="Demander un diagnostic"
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

    </>
  );
}
