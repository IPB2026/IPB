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

    // Apparition au scroll uniquement (pas de minuterie) : la barre ne
    // s'impose pas pendant la lecture du hero — registre premium, zéro intrusion.
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 300 && !hasScrolled) {
        setHasScrolled(true);
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
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

  const getSubText = () => "Réponse sous 48 h";

  if (!isVisible) return null;

  return (
    <>
      {/* Version Mobile/Tablet — Bottom bar éditorial signature IPB */}
      <div className={`lg:hidden fixed bottom-0 left-0 right-0 z-50 transform transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}>
        {/* Barre unique — le bandeau trust a été retiré : il doublonnait le
            TrustRibbon du haut de page et mangeait 33px de viewport mobile. */}
        <div className="relative bg-ipb-cream px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-12px_32px_rgba(11,24,38,0.12)] border-t border-ipb-rule">
          {/* Filet orange vertical signature à gauche */}
          <span aria-hidden="true" className="absolute left-0 top-0 bottom-0 w-[3px] bg-ipb-orange" />

          <div className="flex items-center gap-2.5">
            {/* Texte contextuel éditorial — pas de troncature : tailles calibrées 375px */}
            <div className="flex-1 min-w-0 pl-1">
              <div className="font-serif text-ipb-text font-bold text-[14px] leading-tight">
                {getContextText()}
              </div>
              <div className="text-ipb-muted text-[11px] tracking-wide mt-0.5">
                {getSubText()} · sans engagement
              </div>
            </div>

            {/* CTA primaire — cible tactile ≥48px */}
            <Link
              href="/diagnostic"
              className="group inline-flex items-center justify-center gap-1.5 min-h-[48px] bg-ipb-orange-d hover:bg-[#7E390F] text-white font-medium py-3 px-4 rounded-[3px] text-[13px] tracking-wide transition-colors duration-300 active:scale-[0.98] shrink-0"
              aria-label="Faire mon pré-diagnostic (2 min)"
            >
              <span>Démarrer</span>
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>

            {/* CTA téléphone — cible tactile ≥48px */}
            <a
              href="tel:0582953375"
              className="flex items-center justify-center min-w-[48px] min-h-[48px] bg-ipb-navy text-white rounded-[3px] border border-ipb-navy hover:bg-ipb-navy-2 transition-colors duration-300 shrink-0"
              aria-label="Appeler le 05 82 95 33 75"
            >
              <Phone size={17} />
            </a>
          </div>
        </div>
      </div>

    </>
  );
}
