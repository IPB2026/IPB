import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Phone, CheckCircle, Shield, Star, Activity, Hammer } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative bg-slate-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/8 rounded-full blur-[140px] -translate-y-1/3 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-500/8 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/3"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* COLONNE GAUCHE — Copy */}
          <div className="max-w-2xl">

            {/* Badges autorité */}
            <div className="flex flex-wrap gap-2 mb-8">
              <span className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/40 text-orange-300 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                <Activity size={12} />
                Expert Fissures
              </span>
              <span className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 text-amber-300 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                <Hammer size={12} />
                Ouverture Mur Porteur
              </span>
              <span className="inline-flex items-center gap-2 bg-green-500/20 border border-green-400/40 text-green-300 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                <Star size={12} className="fill-current" />
                4.9/5 Google
              </span>
            </div>

            {/* H1 — double ancrage SEO + émotionnel */}
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-300">
                Votre maison se fissure.
              </span>
              <span className="block mt-2 text-white">
                Un mur porteur à abattre.
              </span>
              <span className="block mt-2 text-2xl md:text-3xl lg:text-4xl text-slate-300 font-medium tracking-normal leading-snug">
                Il faut <span className="text-white font-bold">le bon expert.</span>{' '}
                Pas juste un artisan.
              </span>
            </h1>

            {/* Proposition de valeur — 2 phrases, chacune fait le travail */}
            <p className="text-lg md:text-xl text-slate-300 mb-2 leading-relaxed">
              Cabinet indépendant spécialisé en{' '}
              <strong className="text-white">pathologie et structure du bâtiment</strong>.
              Nous diagnostiquons avec précision, calculons avec rigueur, et réalisons les travaux avec une{' '}
              <strong className="text-orange-300">garantie décennale</strong>.
            </p>
            <p className="text-base text-slate-400 mb-8 leading-relaxed">
              Pas de solution préconçue. Pas de sous-traitance. Nos ingénieurs et nos équipes terrain — un seul interlocuteur du premier appel à la réception de chantier.
            </p>

            {/* Deux parcours clients — cards */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              <Link
                href="/expertise/fissures"
                className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4 hover:bg-orange-500/20 hover:border-orange-500/50 transition-all group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Activity size={16} className="text-orange-400" />
                  <span className="text-orange-300 text-xs font-bold uppercase tracking-wide">Fissures</span>
                </div>
                <p className="text-white text-sm font-bold leading-snug">Diagnostic + agrafage structurel</p>
                <p className="text-slate-400 text-xs mt-1">Garanti 10 ans · Sous 48h</p>
                <span className="text-orange-400 text-xs font-semibold mt-2 inline-block group-hover:translate-x-1 transition-transform">En savoir plus →</span>
              </Link>
              <Link
                href="/expertise/mur-porteur"
                className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 hover:bg-amber-500/20 hover:border-amber-500/50 transition-all group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Hammer size={16} className="text-amber-400" />
                  <span className="text-amber-300 text-xs font-bold uppercase tracking-wide">Mur Porteur</span>
                </div>
                <p className="text-white text-sm font-bold leading-snug">Étude structure + travaux</p>
                <p className="text-slate-400 text-xs mt-1">Baie vitrée · Garanti 10 ans</p>
                <span className="text-amber-400 text-xs font-semibold mt-2 inline-block group-hover:translate-x-1 transition-transform">En savoir plus →</span>
              </Link>
            </div>

            {/* CTAs principaux */}
            <div className="flex flex-col sm:flex-row gap-4 mb-5">
              <Link
                href="/diagnostic"
                className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-orange-900/30 transition-all flex items-center justify-center gap-3 hover:-translate-y-0.5"
              >
                Diagnostic gratuit en ligne
                <ArrowRight size={20} />
              </Link>
              <a
                href="tel:0582953375"
                className="bg-white/5 backdrop-blur border border-white/10 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-3"
              >
                <Phone size={20} className="text-orange-400" />
                05 82 95 33 75
              </a>
            </div>

            {/* Rappel disponibilité */}
            <div className="bg-green-500/15 border border-green-400/30 rounded-xl p-3 mb-6 flex items-center gap-3">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse flex-shrink-0" />
              <p className="text-green-200 text-sm flex-1">
                <strong className="text-green-100">Expert disponible</strong> — Intervention sur site sous 48h en Occitanie
              </p>
              <a href="tel:0582953375" className="bg-green-500 hover:bg-green-600 text-white text-xs font-bold px-4 py-1.5 rounded-lg transition-colors flex-shrink-0">
                Appeler
              </a>
            </div>

            {/* Micro-preuves */}
            <div className="flex flex-wrap items-center gap-5 text-sm">
              <span className="flex items-center gap-2">
                <CheckCircle size={15} className="text-emerald-400 shrink-0" />
                <span className="text-slate-300">Devis <strong className="text-white">gratuit</strong></span>
              </span>
              <span className="flex items-center gap-2">
                <Shield size={15} className="text-blue-400 shrink-0" />
                <span className="text-slate-300">Garantie <strong className="text-white">décennale AXA</strong></span>
              </span>
              <span className="flex items-center gap-2">
                <Activity size={15} className="text-orange-400 shrink-0" />
                <span className="text-slate-300"><strong className="text-white">850+</strong> chantiers</span>
              </span>
            </div>
          </div>

          {/* COLONNE DROITE — Visuels */}
          <div className="hidden lg:grid grid-cols-2 gap-4">
            {/* Image Fissure */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-orange-500/30">
              <Image
                src="/images/fissure-facade-verticale.webp"
                alt="Fissure structurelle façade — Expert fissures Toulouse Montauban Auch (31-82-32)"
                width={300}
                height={400}
                sizes="(max-width: 1024px) 0px, 300px"
                className="w-full h-64 object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Activity className="text-orange-400" size={16} />
                  <span className="text-white font-bold text-sm">Fissures</span>
                </div>
                <p className="text-slate-300 text-xs">Diagnostic + agrafage structurel</p>
              </div>
            </div>

            {/* Image Mur Porteur */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-500/30 mt-8">
              <Image
                src="/images/fissure-facade-diagonale.webp"
                alt="Ouverture mur porteur création baie vitrée — IPB Expertise Toulouse Occitanie"
                width={300}
                height={400}
                sizes="(max-width: 1024px) 0px, 300px"
                className="w-full h-64 object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Hammer className="text-amber-400" size={16} />
                  <span className="text-white font-bold text-sm">Mur Porteur</span>
                </div>
                <p className="text-slate-300 text-xs">Étude structure + baie vitrée</p>
              </div>
            </div>

            {/* Stats flottantes */}
            <div className="col-span-2 grid grid-cols-3 gap-3">
              {[
                { val: '850+', label: 'Chantiers réalisés' },
                { val: '4.9/5', label: 'Note Google' },
                { val: '10 ans', label: 'Garantie décennale' },
              ].map(({ val, label }) => (
                <div key={label} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                  <p className="text-white font-extrabold text-lg">{val}</p>
                  <p className="text-slate-400 text-xs">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Vague de transition */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" className="w-full h-auto">
          <path d="M0 80L60 70C120 60 240 40 360 35C480 30 600 40 720 45C840 50 960 50 1080 45C1200 40 1320 30 1380 25L1440 20V80H0Z" fill="#F8FAFC"/>
        </svg>
      </div>
    </div>
  );
}
