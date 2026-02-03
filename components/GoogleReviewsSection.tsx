"use client"

import { Star, ExternalLink } from 'lucide-react';

// Vrais avis Google My Business - IPB
const reviews = [
  {
    name: "Yusra G.",
    date: "Janvier 2026",
    rating: 5,
    text: "Entreprise sérieuse et professionnelle. Diagnostic clair, intervention efficace et résultats visibles sur mes problèmes d'humidité.",
  },
  {
    name: "Luc C.",
    date: "Septembre 2025",
    rating: 5,
    text: "J'avais remarqué que la peinture commençait à cloquer en bas du mur. L'expert a tout de suite vu que l'humidité était le problème. Intervention rapide !",
  },
  {
    name: "Paul T.",
    date: "Janvier 2026",
    rating: 5,
    text: "Le travail a été réalisé avec soin et dans les délais ! Merci beaucoup.",
  },
  {
    name: "Arnaud B.",
    date: "Janvier 2026",
    rating: 5,
    text: "Au top ! Super service. Équipe professionnelle et réactive. Je recommande vivement.",
  },
];

const GOOGLE_REVIEWS_URL = "https://maps.app.goo.gl/6yDtzs7D1UcKSdJf6";

interface GoogleReviewsSectionProps {
  variant?: 'default' | 'compact' | 'mini';
  title?: string;
  showLink?: boolean;
}

export function GoogleReviewsSection({ 
  variant = 'default', 
  title = "Ce que disent nos clients",
  showLink = true 
}: GoogleReviewsSectionProps) {
  
  // Version mini - juste le badge Google
  if (variant === 'mini') {
    return (
      <a 
        href={GOOGLE_REVIEWS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 bg-white px-4 py-3 rounded-xl shadow-md border border-slate-200 hover:shadow-lg hover:border-orange-200 transition-all group"
      >
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        <div>
          <div className="flex items-center gap-1">
            <span className="font-bold text-lg text-slate-900">4.9</span>
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
            </div>
          </div>
          <span className="text-xs text-slate-500">14 avis Google</span>
        </div>
      </a>
    );
  }

  // Version compacte - 2 avis + badge
  if (variant === 'compact') {
    return (
      <div className="bg-slate-50 rounded-2xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <h3 className="text-xl font-bold text-slate-900">{title}</h3>
          <a 
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-all"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="font-bold text-slate-900">4.9</span>
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
            </div>
          </a>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          {reviews.slice(0, 2).map((review, index) => (
            <div key={index} className="bg-white p-4 rounded-xl border border-slate-100">
              <div className="flex gap-0.5 mb-2">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-slate-600 text-sm mb-3 line-clamp-3">{review.text}</p>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {review.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-medium text-slate-900 text-sm">{review.name}</p>
                  <p className="text-xs text-slate-400">{review.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {showLink && (
          <div className="text-center mt-4">
            <a 
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-orange-600 text-sm font-medium hover:text-orange-700"
            >
              Voir tous les avis <ExternalLink size={14} />
            </a>
          </div>
        )}
      </div>
    );
  }

  // Version default - complète avec 4 avis
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">{title}</h2>
            <p className="text-slate-500 mt-1">Avis vérifiés de nos clients</p>
          </div>
          
          <a 
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-white px-5 py-3 rounded-xl shadow-lg border border-slate-200 hover:shadow-xl transition-all"
          >
            <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xl text-slate-900">4.9</span>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
              </div>
              <span className="text-xs text-slate-500">14 avis Google</span>
            </div>
            <ExternalLink size={14} className="text-slate-400" />
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {reviews.map((review, index) => (
            <div 
              key={index}
              className="bg-slate-50 p-5 rounded-xl border border-slate-100 hover:shadow-md transition-all"
            >
              <div className="flex gap-0.5 mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-4">{review.text}</p>
              <div className="flex items-center gap-3 border-t border-slate-200 pt-3">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                  {review.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">{review.name}</p>
                  <p className="text-xs text-slate-400">{review.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {showLink && (
          <div className="text-center mt-8">
            <a 
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-orange-600 font-semibold hover:text-orange-700 transition-colors"
            >
              Voir tous nos avis sur Google <ExternalLink size={16} />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
