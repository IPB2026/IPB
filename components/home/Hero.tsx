import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 md:pt-32 md:pb-36 lg:pt-40 lg:pb-44">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[13px] font-semibold tracking-[0.2em] uppercase text-slate-400 mb-6">
            Expertise bâtiment — Occitanie
          </p>

          <h1 className="text-[clamp(2.25rem,5vw,4.5rem)] font-bold tracking-tight leading-[1.08] text-slate-900 mb-6">
            Diagnostic et traitement{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-500">des fissures</span>{' '}
            et de{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-500">l&apos;humidité</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Nous identifions l&apos;origine exacte des pathologies de votre bâtiment, 
            puis nous les traitons à la source. Méthodologie instrumentée, 
            rapport technique opposable, garantie décennale.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/diagnostic"
              className="group bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-full font-semibold text-base transition-all flex items-center gap-3"
            >
              Lancer le diagnostic gratuit
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="tel:0582953375"
              className="text-slate-500 hover:text-slate-900 font-medium text-base transition-colors px-4 py-4"
            >
              ou appelez le 05 82 95 33 75
            </a>
          </div>
        </div>
      </div>

      {/* Séparateur subtil */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
    </section>
  );
}
