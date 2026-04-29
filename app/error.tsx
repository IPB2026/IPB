"use client";

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.error('Application error:', error);
    }
  }, [error]);

  return (
    <div className="font-sans bg-ipb-cream text-ipb-text antialiased min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-xl w-full">
        <div className="bg-ipb-white border border-ipb-rule rounded-[6px] p-8 lg:p-12 relative overflow-hidden">
          {/* Filet orange signature en haut */}
          <span aria-hidden="true" className="absolute top-0 left-0 right-0 h-px bg-ipb-orange" />

          <p className="text-[10px] text-ipb-light uppercase tracking-[0.18em] mb-4">Erreur technique · 500</p>

          <h1
            className="font-serif text-ipb-text mb-5"
            style={{
              fontSize: 'clamp(32px, 3.6vw, 48px)',
              lineHeight: 1.08,
              letterSpacing: '-0.024em',
              fontWeight: 700,
            }}
          >
            Une erreur <em>est survenue.</em>
          </h1>

          <p className="text-[15px] leading-[1.85] font-light text-ipb-muted mb-8">
            Quelque chose s&apos;est mal passé de notre côté. Notre équipe a été notifiée. En attendant, vous pouvez réessayer ou retourner à l&apos;accueil.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <button
              onClick={reset}
              className="group inline-flex items-center justify-center gap-2 bg-ipb-orange hover:bg-[#b35519] text-white font-medium px-6 py-3.5 rounded-[3px] text-[14px] tracking-wide transition-colors duration-300"
            >
              Réessayer
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 border border-ipb-rule hover:border-ipb-orange text-ipb-text hover:text-ipb-orange font-medium px-6 py-3.5 rounded-[3px] text-[14px] tracking-wide transition-colors duration-300"
            >
              Retour à l&apos;accueil
            </Link>
          </div>

          <p className="text-[12px] text-ipb-light tracking-wide">
            Si le problème persiste, écrivez-nous au{' '}
            <a href="tel:0582953375" className="text-ipb-orange hover:text-[#b35519] font-medium transition-colors">
              05 82 95 33 75
            </a>
            .
          </p>

          {process.env.NODE_ENV === 'development' && (
            <details className="mt-8 pt-6 border-t border-ipb-rule text-left">
              <summary className="text-[11px] text-ipb-light cursor-pointer uppercase tracking-[0.16em]">
                Détails techniques (dev uniquement)
              </summary>
              <pre className="mt-3 text-[11px] bg-ipb-stone/40 p-4 rounded overflow-auto text-ipb-muted">
                {error.message}
                {error.stack}
              </pre>
            </details>
          )}
        </div>
      </div>
    </div>
  );
}
