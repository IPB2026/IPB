"use client";

import { useState, useEffect } from 'react';
import { X, Download, FileText, CheckCircle } from 'lucide-react';

export function ExitIntentLeadCapture() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if already shown in this session
    const hasShown = sessionStorage.getItem('exitIntentShown');
    if (hasShown) return;

    // Detect exit intent (mouse leaving viewport)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 50 && !hasShown) {
        setIsVisible(true);
        sessionStorage.setItem('exitIntentShown', 'true');
      }
    };

    // Add event listener after 5 seconds (to avoid showing too early)
    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Track event in Google Analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'lead_magnet_download', {
          category: 'lead_generation',
          label: 'Exit Intent Popup',
        });
      }

      // Send to your email/CRM (à implémenter avec une API route)
      const response = await fetch('/api/lead-magnet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, source: 'exit_intent' }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        
        // Trigger download after 1 second
        setTimeout(() => {
          window.open('/guides/guide-fissures-humidite.pdf', '_blank');
        }, 1000);
      }
    } catch (error) {
      console.error('Error submitting lead magnet:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 overflow-hidden">
        {/* Close button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
          aria-label="Fermer"
        >
          <X size={20} className="text-slate-600" />
        </button>

        {!isSubmitted ? (
          <div className="p-8 md:p-12">
            {/* Icon + Badge */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <FileText size={40} className="text-white" />
                </div>
                <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  GRATUIT
                </div>
              </div>
            </div>

            {/* Headline */}
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 text-center leading-tight">
              ⚠️ Attendez ! Ne partez pas sans votre guide gratuit
            </h2>
            
            <p className="text-lg text-slate-600 mb-6 text-center">
              Téléchargez <strong className="text-orange-600">GRATUITEMENT</strong> notre guide expert :
            </p>

            {/* Guide title */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 rounded-xl p-6 mb-6">
              <h3 className="text-2xl font-bold text-orange-900 mb-3 flex items-start gap-3">
                <Download size={28} className="flex-shrink-0 mt-1" />
                <span>"Les 10 Signes Que Votre Fissure Est Dangereuse"</span>
              </h3>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Comment identifier une fissure structurelle</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Quand faut-il s'inquiéter et agir rapidement</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Les 3 erreurs à éviter absolument</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Solutions et coûts comparés (agrafage vs micropieux)</span>
                </li>
              </ul>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Votre prénom"
                  required
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-lg"
                />
              </div>
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre email"
                  required
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-lg"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-orange-600 to-orange-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Téléchargement...
                  </>
                ) : (
                  <>
                    <Download size={24} />
                    Télécharger le guide GRATUIT
                  </>
                )}
              </button>
            </form>

            <p className="text-xs text-slate-500 text-center mt-4">
              🔒 Vos données sont 100% sécurisées. Pas de spam, promis !
            </p>
          </div>
        ) : (
          // Success state
          <div className="p-8 md:p-12 text-center">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={48} className="text-white" />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
              🎉 Merci {name} !
            </h2>
            <p className="text-lg text-slate-600 mb-6">
              Votre guide est en cours de téléchargement...
            </p>
            <p className="text-slate-500 mb-6">
              Vous allez également recevoir un email avec le lien de téléchargement et des conseils exclusifs.
            </p>
            <button
              onClick={() => setIsVisible(false)}
              className="bg-gradient-to-r from-orange-600 to-orange-500 text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
            >
              Continuer sur le site
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
