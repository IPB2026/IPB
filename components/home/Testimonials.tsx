"use client"

import { Star, ArrowUpRight } from 'lucide-react';

const reviews = [
  {
    name: "Yusra G.",
    date: "Janvier 2026",
    text: "Entreprise sérieuse et professionnelle. Diagnostic clair, intervention efficace et résultats visibles sur mes problèmes d'humidité. Équipe ponctuelle et soignée.",
  },
  {
    name: "Luc C.",
    date: "Septembre 2025",
    text: "J'avais remarqué que la peinture commençait à cloquer en bas du mur avec des traces blanches. L'expert a tout de suite identifié l'origine du problème. Intervention rapide et efficace.",
  },
  {
    name: "Paul T.",
    date: "Janvier 2026",
    text: "Le travail a été réalisé avec soin et dans les délais. Merci beaucoup.",
  },
  {
    name: "Arnaud B.",
    date: "Janvier 2026",
    text: "Super service. Équipe professionnelle et réactive. Je recommande vivement.",
  },
];

const GOOGLE_REVIEWS_URL = "https://maps.app.goo.gl/6yDtzs7D1UcKSdJf6";

export function Testimonials() {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-16">
          <p className="text-[13px] font-semibold tracking-[0.15em] uppercase text-slate-400 mb-4">
            Témoignages
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
            La confiance de nos clients
          </h2>
          <p className="text-slate-500 text-lg">
            850+ diagnostics réalisés en Occitanie.{' '}
            <a 
              href={GOOGLE_REVIEWS_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-1 text-slate-900 font-medium hover:text-orange-600 transition-colors"
            >
              4.9/5 sur Google <ArrowUpRight size={14} />
            </a>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-[#fafafa] hover:bg-slate-100/80 transition-colors"
            >
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} className="text-orange-400 fill-orange-400" />
                ))}
              </div>

              <p className="text-slate-600 text-[15px] leading-relaxed mb-6 line-clamp-4">
                {review.text}
              </p>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-slate-500 font-semibold text-xs">
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
      </div>
    </section>
  );
}
