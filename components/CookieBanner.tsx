"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Cookie } from 'lucide-react';

type CookieConsent = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
};

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [consent, setConsent] = useState<CookieConsent>({
    necessary: true,
    analytics: false,
    marketing: false,
    timestamp: 0,
  });

  useEffect(() => {
    const savedConsent = localStorage.getItem('ipb-cookie-consent');
    if (savedConsent) {
      const parsed = JSON.parse(savedConsent);
      const sixMonths = 6 * 30 * 24 * 60 * 60 * 1000;
      if (Date.now() - parsed.timestamp < sixMonths) {
        setConsent(parsed);
        applyConsent(parsed);
        return;
      }
    }
    // Afficher après 4 secondes pour laisser le visiteur découvrir le hero et
    // interagir avec les CTA above-the-fold avant que le bandeau apparaisse.
    const timer = setTimeout(() => setIsVisible(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  const applyConsent = (consentData: CookieConsent) => {
    if (typeof window === 'undefined') return;

    // Google Consent Mode v2 — on pousse l'update directement dans dataLayer
    // pour que ça fonctionne même si gtag.js n'est pas encore chargé
    // (lazyOnload). Quand gtag.js arrivera, il rejouera la file d'attente.
    const w = window as Window & {
      dataLayer?: unknown[];
      gtag?: (command: string, ...args: unknown[]) => void;
    };
    w.dataLayer = w.dataLayer || [];

    const consentUpdate = {
      'ad_storage': consentData.marketing ? 'granted' : 'denied',
      'ad_user_data': consentData.marketing ? 'granted' : 'denied',
      'ad_personalization': consentData.marketing ? 'granted' : 'denied',
      'analytics_storage': consentData.analytics ? 'granted' : 'denied',
    };

    if (w.gtag) {
      w.gtag('consent', 'update', consentUpdate);
    } else {
      // Fallback si gtag n'est pas encore initialisé : push direct dataLayer
      w.dataLayer.push(['consent', 'update', consentUpdate]);
    }
  };

  const saveConsent = (newConsent: CookieConsent) => {
    const consentWithTimestamp = { ...newConsent, timestamp: Date.now() };
    localStorage.setItem('ipb-cookie-consent', JSON.stringify(consentWithTimestamp));
    setConsent(consentWithTimestamp);
    applyConsent(consentWithTimestamp);
    setIsVisible(false);
  };

  const acceptAll = () => {
    saveConsent({ necessary: true, analytics: true, marketing: true, timestamp: Date.now() });
  };

  const acceptNecessary = () => {
    saveConsent({ necessary: true, analytics: false, marketing: false, timestamp: Date.now() });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-3 left-3 right-3 md:left-auto md:right-6 md:bottom-6 max-w-sm md:max-w-md mx-auto md:mx-0 z-50 animate-in slide-in-from-bottom-4 duration-300">
      <div className="bg-white rounded-xl md:rounded-2xl shadow-lg border border-slate-200 p-3 md:p-4 relative">
        {/* Bouton fermer (X) — touch target 44x44 (WCAG 2.5.5 / Lighthouse) */}
        <button
          onClick={acceptNecessary}
          className="absolute -top-3 -right-3 w-11 h-11 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center text-slate-700 hover:text-slate-900 transition-colors shadow-sm border border-slate-200"
          aria-label="Fermer"
        >
          <X size={18} />
        </button>

        {/* Contenu compact */}
        <div className="flex items-start gap-3 mb-4">
          <Cookie className="text-ipb-orange-d flex-shrink-0 mt-0.5" size={20} aria-hidden="true" />
          <div>
            <p className="text-slate-700 text-sm leading-relaxed">
              Ce site utilise des cookies pour améliorer votre expérience.{' '}
              <Link href="/legal/confidentialite" className="text-ipb-orange-d underline hover:text-[#7E390F]">
                En savoir plus
              </Link>
            </p>
          </div>
        </div>

        {/* Boutons d'action */}
        <div className="flex gap-2">
          <button
            onClick={acceptNecessary}
            className="flex-1 px-4 py-2 text-slate-700 text-sm font-medium hover:bg-slate-50 rounded-lg transition-colors"
          >
            Refuser
          </button>
          <button
            onClick={acceptAll}
            className="flex-1 px-4 py-2 bg-ipb-orange-d text-white text-sm font-bold rounded-lg hover:bg-[#7E390F] transition-colors"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
