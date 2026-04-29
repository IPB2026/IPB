'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * ExitIntentPopup — déclenchement à la sortie souris (PC).
 *
 * Refonte 2026-04-29 : style éditorial IPB sobre.
 * Plus d'emoji, plus de gradient orange-red, plus de copy alarmiste.
 *
 * Cf. PLAN_REFONTE_V2.md (charte cabinet de prestige)
 */
export function ExitIntentPopup() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  // Contexte de la page (fissures vs mur porteur)
  const isFissuresPage = pathname?.includes('fissure') || pathname?.includes('agrafage');
  const isMurPorteurPage = pathname?.includes('mur-porteur') || pathname?.includes('baie-vitree');

  useEffect(() => {
    // Pages où le popup ne doit pas apparaître
    if (
      pathname?.startsWith('/diagnostic') ||
      pathname?.startsWith('/contact') ||
      pathname?.startsWith('/rdv-cabinet') ||
      pathname?.startsWith('/lp/') ||
      pathname?.startsWith('/legal') ||
      pathname?.startsWith('/calcul-prix-mur-porteur')
    ) {
      return;
    }

    if (sessionStorage.getItem('exitPopupShown')) {
      setHasShown(true);
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
        sessionStorage.setItem('exitPopupShown', 'true');
      }
    };

    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 8000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasShown, pathname]);

  if (!isVisible) return null;

  // Contenu adapté au contexte de la page (fissures > mur porteur > générique)
  const content = (() => {
    if (isFissuresPage) {
      return {
        eyebrow: 'Avant de partir',
        title: 'Une fissure observée',
        titleItalic: 'mérite un avis posé.',
        body: "Notre cabinet vient sur place sous sept jours, mesure ce qu'il y a à mesurer, et vous remet un rapport écrit. Sans engagement de votre part.",
        primaryCta: 'Décrire ma situation',
        primaryHref: '/diagnostic',
      };
    }
    if (isMurPorteurPage) {
      return {
        eyebrow: 'Avant de partir',
        title: 'Un projet en tête,',
        titleItalic: 'une estimation en deux minutes.',
        body: "Notre calculateur vous donne une fourchette précise basée sur les chantiers récents en Occitanie. Sans inscription.",
        primaryCta: "Estimer mon projet",
        primaryHref: '/calcul-prix-mur-porteur',
      };
    }
    return {
      eyebrow: 'Avant de partir',
      title: 'Une question technique,',
      titleItalic: 'une réponse posée.',
      body: "Notre cabinet répond à toutes les demandes sous 24 heures ouvrées, sans pression commerciale. Vous décrivez, nous analysons.",
      primaryCta: 'Échanger avec le cabinet',
      primaryHref: '/rdv-cabinet',
    };
  })();

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ipb-navy/85 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && setIsVisible(false)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-popup-title"
    >
      <div
        className="relative bg-ipb-cream max-w-lg w-full rounded-[6px] overflow-hidden border border-ipb-rule"
        style={{
          animation: 'exitPopupIn 0.4s cubic-bezier(.16,1,.3,1) both',
          boxShadow: '0 30px 80px rgba(11, 24, 38, 0.35)',
        }}
      >
        <style jsx>{`
          @keyframes exitPopupIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>

        {/* Bouton fermer */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 text-ipb-light hover:text-ipb-text transition-colors p-1.5"
          aria-label="Fermer"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {/* Header navy minimaliste */}
        <div className="bg-ipb-navy text-white px-8 lg:px-10 pt-8 pb-6">
          <p className="text-[10px] uppercase tracking-[0.18em] text-white/40 font-medium mb-3">
            {content.eyebrow}
          </p>
          <p className="font-serif text-white text-[12px] tracking-[0.16em] uppercase opacity-50">
            IPB · Cabinet de pathologie du bâtiment
          </p>
        </div>

        {/* Corps */}
        <div className="px-8 lg:px-10 py-8 lg:py-10">
          <h2
            id="exit-popup-title"
            className="font-serif text-ipb-text mb-5"
            style={{
              fontSize: 'clamp(24px, 3vw, 32px)',
              lineHeight: 1.15,
              letterSpacing: '-0.022em',
              fontWeight: 700,
            }}
          >
            {content.title}<br />
            <em className="text-ipb-orange not-italic" style={{ fontStyle: 'italic' }}>{content.titleItalic}</em>
          </h2>

          <p className="text-[14px] leading-[1.85] font-light text-ipb-muted mb-8">
            {content.body}
          </p>

          <div className="space-y-3">
            <Link
              href={content.primaryHref}
              onClick={() => setIsVisible(false)}
              className="inline-flex items-center justify-center w-full gap-2 bg-ipb-orange text-white font-semibold text-[13px] tracking-[0.03em] rounded-[3px] px-7 py-[14px] hover:bg-[#b35519] transition-colors"
            >
              {content.primaryCta}
            </Link>

            <a
              href="tel:0582953375"
              onClick={() => setIsVisible(false)}
              className="inline-flex items-center justify-center w-full gap-2 border border-ipb-rule text-ipb-text font-medium text-[13px] rounded-[3px] px-7 py-[13px] hover:border-ipb-orange hover:text-ipb-orange transition-all"
            >
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M3 1h2.5l1 3-1.5 1c1 2 2.5 3.5 4.5 4.5l1-1.5 3 1V12c0 .5-.5 1-1 1-6 0-11-5-11-11 0-.5.5-1 1-1z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              05 82 95 33 75
            </a>
          </div>

          <button
            onClick={() => setIsVisible(false)}
            className="block w-full mt-6 text-[12px] text-ipb-light hover:text-ipb-muted transition-colors"
          >
            Non merci, je continue ma navigation
          </button>
        </div>
      </div>
    </div>
  );
}
