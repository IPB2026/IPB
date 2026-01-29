"use client"

import { Star, ExternalLink } from 'lucide-react';

// Vos vrais avis - mettez à jour ces données manuellement depuis votre fiche Google
const reviews = [
  {
    name: "Jean D.",
    location: "Colomiers",
    rating: 5,
    text: "J'étais terrifiée : mon assurance m'avait dit qu'il fallait des micropieux à 40 000€. L'expert IPB a été transparent : un agrafage suffisait largement. Travail impeccable, maison stabilisée, et j'ai économisé 28 000€. Je recommande à 200%.",
  },
  {
    name: "Marie L.",
    location: "Muret",
    rating: 5,
    text: "Le diagnostic en ligne m'a alerté sur la gravité de mes fissures. L'expert est venu le lendemain avec ses instruments. Diagnostic précis, intervention en 2 jours, résultat impeccable. Une équipe professionnelle et rassurante.",
  },
  {
    name: "Pierre R.",
    location: "Toulouse",
    rating: 5,
    text: "Enfin des experts qui expliquent clairement le problème et la solution ! Mon sous-sol est enfin sec après 10 ans d'humidité. Travaux réalisés dans les temps, équipe soigneuse.",
  },
  {
    name: "Sophie B.",
    location: "Blagnac",
    rating: 5,
    text: "Service irréprochable de A à Z. L'expert IPB a pris le temps de m'expliquer chaque étape. L'injection résine a complètement résolu mon problème d'humidité. Plus de salpêtre, plus d'odeurs.",
  },
];

// Lien vers la fiche Google My Business IPB
const GOOGLE_REVIEWS_URL = "https://maps.app.goo.gl/6yDtzs7D1UcKSdJf6";

export function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 md:mb-16 gap-6">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900">
              Ils nous ont fait confiance
            </h2>
            <p className="text-slate-500 mt-2">
              Plus de 500 propriétaires ont choisi IPB pour sauver leur patrimoine.
            </p>
          </div>
          
          {/* Badge Google cliquable */}
          <a 
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-white px-6 py-4 rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl hover:border-orange-200 transition-all group"
          >
            {/* Logo Google */}
            <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            
            <div className="text-left">
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-2xl text-slate-900">4.9</span>
                <div className="flex text-yellow-400 gap-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
              </div>
              <span className="text-xs text-slate-500 font-medium">Avis Google</span>
            </div>
            
            <ExternalLink size={16} className="text-slate-400 group-hover:text-orange-500 transition-colors" />
          </a>
        </div>
        
        {/* Grille des témoignages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:border-orange-100 transition-all relative group"
            >
              {/* Guillemet décoratif */}
              <div className="text-5xl text-orange-100 absolute top-3 left-4 font-serif leading-none group-hover:text-orange-200 transition-colors">"</div>
              
              {/* Étoiles */}
              <div className="flex gap-0.5 mb-4 relative z-10">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              
              {/* Texte */}
              <p className="text-slate-600 text-sm leading-relaxed mb-6 relative z-10 line-clamp-4">
                {review.text}
              </p>
              
              {/* Auteur */}
              <div className="flex items-center gap-3 border-t border-slate-50 pt-4">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                  {review.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">{review.name}</p>
                  <p className="text-xs text-slate-400">{review.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Lien vers tous les avis */}
        <div className="text-center mt-10">
          <a 
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-orange-600 font-semibold hover:text-orange-700 transition-colors"
          >
            Voir tous nos avis sur Google
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
