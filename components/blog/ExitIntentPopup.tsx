'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

export function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Vérifier si déjà montré dans cette session
    const alreadyShown = sessionStorage.getItem('exitPopupShown');
    if (alreadyShown) {
      setHasShown(true);
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Détecter si la souris quitte par le haut (intention de fermer l'onglet)
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
        sessionStorage.setItem('exitPopupShown', 'true');
      }
    };

    // Attendre 5 secondes avant d'activer (éviter popup trop rapide)
    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasShown]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg mx-4 p-8 animate-in slide-in-from-top-4 duration-500">
        {/* Bouton fermer */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition"
          aria-label="Fermer"
        >
          <X size={24} />
        </button>

        {/* Contenu */}
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-3">
            Attendez ! Avant de partir...
          </h2>
          <p className="text-slate-600 mb-6">
            Votre maison a des fissures ou de l'humidité ? <br />
            <strong className="text-slate-900">Obtenez un diagnostic gratuit en 5 minutes</strong>
          </p>

          {/* CTA */}
          <Link
            href="/diagnostic"
            onClick={() => setIsVisible(false)}
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-orange-600 hover:to-orange-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Lancer le diagnostic gratuit →
          </Link>

          {/* Réassurance */}
          <div className="mt-6 flex items-center justify-center gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1">
              <span className="text-green-500">✓</span> Sans engagement
            </span>
            <span className="flex items-center gap-1">
              <span className="text-green-500">✓</span> 5 minutes
            </span>
            <span className="flex items-center gap-1">
              <span className="text-green-500">✓</span> Résultat immédiat
            </span>
          </div>

          {/* Lien de fermeture discret */}
          <button
            onClick={() => setIsVisible(false)}
            className="mt-4 text-sm text-slate-400 hover:text-slate-600 underline transition"
          >
            Non merci, je continue ma lecture
          </button>
        </div>
      </div>
    </div>
  );
}
