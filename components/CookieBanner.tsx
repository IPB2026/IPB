"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Cookie, Shield } from 'lucide-react';

type CookieConsent = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
};

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [consent, setConsent] = useState<CookieConsent>({
    necessary: true, // Toujours true
    analytics: false,
    marketing: false,
    timestamp: 0,
  });

  useEffect(() => {
    // Vérifier si le consentement existe déjà
    const savedConsent = localStorage.getItem('ipb-cookie-consent');
    if (savedConsent) {
      const parsed = JSON.parse(savedConsent);
      // Revérifier après 6 mois
      const sixMonths = 6 * 30 * 24 * 60 * 60 * 1000;
      if (Date.now() - parsed.timestamp < sixMonths) {
        setConsent(parsed);
        applyConsent(parsed);
        return;
      }
    }
    // Afficher le bandeau après un court délai
    const timer = setTimeout(() => setIsVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const applyConsent = (consentData: CookieConsent) => {
    // Activer/désactiver Google Analytics selon le consentement
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': consentData.analytics ? 'granted' : 'denied',
        'ad_storage': consentData.marketing ? 'granted' : 'denied',
      });
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
    saveConsent({
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: Date.now(),
    });
  };

  const acceptNecessary = () => {
    saveConsent({
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: Date.now(),
    });
  };

  const saveCustom = () => {
    saveConsent(consent);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/30 z-[998] backdrop-blur-sm" />
      
      {/* Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-[999] p-4 md:p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
          {/* Header */}
          <div className="p-6 pb-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Cookie className="text-orange-600" size={24} />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-slate-900 mb-2">
                  🍪 Votre vie privée nous importe
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Nous utilisons des cookies pour améliorer votre expérience, analyser le trafic et personnaliser le contenu. 
                  Vous pouvez choisir les cookies que vous acceptez.
                </p>
              </div>
            </div>
          </div>

          {/* Détails (si ouvert) */}
          {showDetails && (
            <div className="px-6 pb-4 border-t border-slate-100 pt-4">
              <div className="space-y-4">
                {/* Cookies nécessaires */}
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Shield className="text-green-600" size={20} />
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">Cookies nécessaires</h3>
                      <p className="text-slate-500 text-xs">Fonctionnement du site (session, sécurité)</p>
                    </div>
                  </div>
                  <div className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
                    Toujours actifs
                  </div>
                </div>

                {/* Cookies analytics */}
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-blue-100 rounded flex items-center justify-center text-blue-600 text-xs">📊</div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">Cookies analytiques</h3>
                      <p className="text-slate-500 text-xs">Google Analytics pour améliorer le site</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consent.analytics}
                      onChange={(e) => setConsent({ ...consent, analytics: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-100 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                  </label>
                </div>

                {/* Cookies marketing */}
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-purple-100 rounded flex items-center justify-center text-purple-600 text-xs">📢</div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">Cookies marketing</h3>
                      <p className="text-slate-500 text-xs">Publicités personnalisées (Google Ads)</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consent.marketing}
                      onChange={(e) => setConsent({ ...consent, marketing: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-100 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                  </label>
                </div>
              </div>

              <p className="text-xs text-slate-500 mt-4">
                Pour en savoir plus, consultez notre{' '}
                <Link href="/legal/confidentialite" className="text-orange-600 underline">
                  politique de confidentialité
                </Link>.
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="p-6 pt-2 flex flex-col sm:flex-row gap-3">
            {!showDetails ? (
              <>
                <button
                  onClick={acceptNecessary}
                  className="flex-1 px-6 py-3 border border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-colors text-sm"
                >
                  Refuser les optionnels
                </button>
                <button
                  onClick={() => setShowDetails(true)}
                  className="flex-1 px-6 py-3 border border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-colors text-sm"
                >
                  Personnaliser
                </button>
                <button
                  onClick={acceptAll}
                  className="flex-1 px-6 py-3 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-500 transition-colors text-sm"
                >
                  Tout accepter
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setShowDetails(false)}
                  className="flex-1 px-6 py-3 border border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-colors text-sm"
                >
                  Retour
                </button>
                <button
                  onClick={saveCustom}
                  className="flex-1 px-6 py-3 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-500 transition-colors text-sm"
                >
                  Enregistrer mes choix
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// Type declaration for gtag
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
