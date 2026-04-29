"use client"

import { useState, useEffect } from 'react';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';

/**
 * Testimonials — carousel éditorial avec navigation latérale nommée.
 *
 * Auto-rotate 7 secondes. Fade out 0.35s → swap → fade in.
 * Navigation par prénom + ville + barre orange active.
 *
 * Cf. IPB_Design_Handoff.md §7 + §8
 */

const reviews = [
  {
    id: 'yusra',
    name: "Yusra G.",
    location: "Toulouse",
    date: "Janvier 2026",
    text: "Diagnostic clair, intervention efficace. L'équipe est ponctuelle et soignée — on sent qu'ils prennent le temps d'expliquer ce qu'ils font.",
  },
  {
    id: 'luc',
    name: "Luc C.",
    location: "Castanet-Tolosan",
    date: "Septembre 2025",
    text: "J'avais remarqué que la peinture commençait à cloquer en bas du mur avec des traces blanches. L'expert IPB a tout de suite identifié le problème. Intervention rapide et efficace.",
  },
  {
    id: 'paul',
    name: "Paul T.",
    location: "Tournefeuille",
    date: "Janvier 2026",
    text: "Le travail a été réalisé avec soin et dans les délais annoncés. Le rapport est complet, l'attestation décennale m'a été remise à la livraison. Je recommande.",
  },
  {
    id: 'arnaud',
    name: "Arnaud B.",
    location: "Saint-Cyprien",
    date: "Janvier 2026",
    text: "Mur porteur ouvert chez moi en 5 jours, comme prévu. L'équipe est professionnelle, le chantier propre. Le bien a été remis en vente trois semaines après.",
  },
];

const GOOGLE_REVIEWS_URL = "https://maps.app.goo.gl/6yDtzs7D1UcKSdJf6";

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  // Auto-rotate toutes les 7 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setActiveIndex((i) => (i + 1) % reviews.length);
        setIsFading(false);
      }, 350);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const goTo = (i: number) => {
    if (i === activeIndex) return;
    setIsFading(true);
    setTimeout(() => {
      setActiveIndex(i);
      setIsFading(false);
    }, 350);
  };

  const active = reviews[activeIndex];

  return (
    <section className="bg-ipb-white py-24 lg:py-32">
      <div className="max-w-ipb mx-auto px-6 lg:px-12">
        <RevealOnScroll>
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Côté gauche : navigation latérale nommée */}
            <div className="lg:col-span-4">
              <Eyebrow>Témoignages</Eyebrow>
              <h2
                className="font-serif text-ipb-text mb-12"
                style={{
                  fontSize: 'clamp(28px, 2.6vw, 38px)',
                  lineHeight: 1.15,
                  letterSpacing: '-0.022em',
                  fontWeight: 700,
                }}
              >
                Quatre clients,<br />
                <em>quatre histoires.</em>
              </h2>

              <ul className="space-y-1">
                {reviews.map((r, i) => (
                  <li key={r.id}>
                    <button
                      onClick={() => goTo(i)}
                      className={`w-full text-left flex items-center gap-4 py-3 transition-colors group ${
                        i === activeIndex ? 'text-ipb-text' : 'text-ipb-light hover:text-ipb-muted'
                      }`}
                    >
                      <span
                        className={`block h-px transition-all duration-500 ${
                          i === activeIndex ? 'w-12 bg-ipb-orange' : 'w-6 bg-ipb-rule group-hover:w-9'
                        }`}
                        aria-hidden="true"
                      />
                      <span className="flex-1">
                        <span className={`font-serif text-[17px] block ${i === activeIndex ? 'font-bold' : 'font-normal'}`}>
                          {r.name}
                        </span>
                        <span className="text-[11px] uppercase tracking-[0.12em] mt-0.5 block">
                          {r.location}
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Côté droite : citation active.
                min-h-[380px] dimensionne pour le témoignage le plus long
                (Luc C., 256 caractères) — évite tout reflow lors du swap. */}
            <div className="lg:col-span-8 lg:pl-8 lg:border-l lg:border-ipb-rule min-h-[420px] lg:min-h-[380px]">
              <div
                className="transition-opacity duration-300"
                style={{ opacity: isFading ? 0 : 1 }}
              >
                <blockquote
                  className="font-serif text-ipb-text mb-10"
                  style={{
                    fontSize: 'clamp(22px, 2.2vw, 32px)',
                    lineHeight: 1.4,
                    letterSpacing: '-0.012em',
                    fontWeight: 400,
                  }}
                >
                  <em className="not-italic text-ipb-orange text-4xl leading-none mr-1 align-text-top">«&nbsp;</em>
                  {active.text}
                  <em className="not-italic text-ipb-orange text-4xl leading-none ml-1 align-text-top">&nbsp;»</em>
                </blockquote>

                <footer className="flex items-center gap-3 text-[11px] uppercase tracking-[0.14em] text-ipb-light">
                  <div className="h-px w-9 bg-ipb-rule" aria-hidden="true" />
                  <span>{active.name} · {active.location} · {active.date}</span>
                </footer>
              </div>

              {/* Lien Google */}
              <div className="mt-10 pt-8 border-t border-ipb-rule">
                <a
                  href={GOOGLE_REVIEWS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[13px] text-ipb-muted hover:text-ipb-orange transition-colors"
                >
                  Lire les avis sur Google
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
