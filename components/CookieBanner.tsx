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
    // Afficher après 2 secondes
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const applyConsent = (consentData: CookieConsent) => {
    if (typeof window !== 'undefined') {
      const gtag = (window as Window & { gtag?: (command: string, ...args: unknown[]) => void }).gtag;
      if (gtag) {
        gtag('consent', 'update', {
          'analytics_storage': consentData.analytics ? 'granted' : 'denied',
          'ad_storage': consentData.marketing ? 'granted' : 'denied',
        });
      }
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
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 animate-in slide-in-from-bottom-4 duration-300">
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-4 relative">
        {/* Bouton fermer (X) - très visible */}
        <button
          onClick={acceptNecessary}
          className="absolute -top-2 -right-2 w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-700 transition-colors shadow-sm border border-slate-200"
          aria-label="Fermer"
        >
          <X size={16} />
        </button>
        
        {/* Contenu compact */}
        <div className="flex items-start gap-3 mb-4">
          <Cookie className="text-orange-500 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <p className="text-slate-700 text-sm leading-relaxed">
              Ce site utilise des cookies pour améliorer votre expérience.{' '}
              <Link href="/legal/confidentialite" className="text-orange-600 underline hover:text-orange-700">
                En savoir plus
              </Link>
            </p>
          </div>
        </div>
        
        {/* Boutons d'action */}
        <div className="flex gap-2">
          <button
            onClick={acceptNecessary}
            className="flex-1 px-4 py-2 text-slate-600 text-sm font-medium hover:bg-slate-50 rounded-lg transition-colors"
          >
            Refuser
          </button>
          <button
            onClick={acceptAll}
            className="flex-1 px-4 py-2 bg-orange-600 text-white text-sm font-bold rounded-lg hover:bg-orange-500 transition-colors"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
