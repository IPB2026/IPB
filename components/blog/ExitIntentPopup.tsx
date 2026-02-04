'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { X, Phone, ArrowRight, Clock, Shield, Star, AlertTriangle, CheckCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';

export function ExitIntentPopup() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  // Contexte de la page
  const isFissuresPage = pathname?.includes('fissure') || pathname?.includes('agrafage');
  const isHumiditePage = pathname?.includes('humid') || pathname?.includes('capillaire') || 
                         pathname?.includes('moisissure') || pathname?.includes('cave') ||
                         pathname?.includes('vmi') || pathname?.includes('condensation') ||
                         pathname?.includes('salpetre') || pathname?.includes('merule');

  useEffect(() => {
    // Ne pas afficher sur la page diagnostic ou contact
    if (pathname?.startsWith('/diagnostic') || pathname?.startsWith('/contact')) {
      return;
    }

    // Vérifier si déjà montré dans cette session
    const alreadyShown = sessionStorage.getItem('exitPopupShown');
    if (alreadyShown) {
      setHasShown(true);
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Détecter si la souris quitte par le haut (intention de fermer)
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
        sessionStorage.setItem('exitPopupShown', 'true');
      }
    };

    // Attendre 8 secondes avant d'activer (éviter popup trop rapide)
    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 8000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasShown, pathname]);

  if (!isVisible) return null;

  // Contenu contextuel
  const getContent = () => {
    if (isFissuresPage) {
      return {
        emoji: '🏠',
        title: 'Votre maison se fissure ?',
        subtitle: 'Ne laissez pas le problème s\'aggraver',
        stat: '+15% d\'aggravation par an sans traitement',
        offer: 'Diagnostic expert offert',
        urgency: '3 places disponibles cette semaine',
      };
    }
    if (isHumiditePage) {
      return {
        emoji: '💧',
        title: 'L\'humidité détruit votre maison',
        subtitle: 'Moisissures, salpêtre, odeurs...',
        stat: '40% des maisons en Occitanie sont touchées',
        offer: 'Diagnostic gratuit + devis',
        urgency: 'Intervention possible sous 48h',
      };
    }
    return {
      emoji: '⚠️',
      title: 'Un problème sur votre maison ?',
      subtitle: 'Fissures ou humidité, on a la solution',
      stat: 'Plus de 300 maisons sauvées depuis 2019',
      offer: 'Diagnostic gratuit en 5 minutes',
      urgency: 'Expert disponible maintenant',
    };
  };

  const content = getContent();

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && setIsVisible(false)}
    >
      <div 
        className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300"
        role="dialog"
        aria-modal="true"
      >
        {/* Header gradient */}
        <div className="relative bg-gradient-to-br from-orange-600 via-orange-500 to-red-500 p-6 text-white">
          {/* Bouton fermer */}
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-4 right-4 text-white/70 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition"
            aria-label="Fermer"
          >
            <X size={20} />
          </button>

          {/* Badge urgence */}
          <div className="inline-flex items-center gap-2 bg-red-500/30 backdrop-blur px-3 py-1.5 rounded-full text-sm font-bold mb-3 animate-pulse">
            <Clock size={14} />
            {content.urgency}
          </div>

          <div className="text-5xl mb-3">{content.emoji}</div>
          <h2 className="text-2xl font-black mb-2">{content.title}</h2>
          <p className="text-orange-100">{content.subtitle}</p>
        </div>

        {/* Corps */}
        <div className="p-6">
          {/* Stat alarmante */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-red-800 text-sm font-medium">{content.stat}</p>
            </div>
          </div>

          {/* Offre */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="font-bold text-green-900">{content.offer}</div>
                <div className="text-green-700 text-sm">Sans engagement</div>
              </div>
            </div>
          </div>

          {/* CTA Principal */}
          <Link
            href="/diagnostic"
            onClick={() => setIsVisible(false)}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-orange-500/30 transition-all transform hover:scale-[1.02] mb-4"
          >
            Lancer le diagnostic gratuit
            <ArrowRight size={20} />
          </Link>

          {/* CTA Secondaire - Téléphone */}
          <a
            href="tel:0582953375"
            onClick={() => setIsVisible(false)}
            className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 rounded-xl transition-all"
          >
            <Phone size={18} />
            Ou appelez : 05 82 95 33 75
          </a>

          {/* Réassurance */}
          <div className="mt-6 flex items-center justify-center gap-6 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <Star size={14} className="text-yellow-500 fill-yellow-500" />
              <span><strong className="text-slate-700">4.9/5</strong></span>
            </span>
            <span className="flex items-center gap-1.5">
              <Shield size={14} className="text-green-500" />
              <span>Garanti 10 ans</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} className="text-blue-500" />
              <span>RDV sous 48h</span>
            </span>
          </div>

          {/* Lien discret */}
          <button
            onClick={() => setIsVisible(false)}
            className="w-full mt-4 text-sm text-slate-400 hover:text-slate-600 transition"
          >
            Non merci, je continue ma navigation
          </button>
        </div>
      </div>
    </div>
  );
}
