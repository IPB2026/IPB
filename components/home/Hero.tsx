import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Phone, CheckCircle, Shield, Star, Activity, Hammer } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative bg-slate-900 text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/40 text-orange-300 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                <Activity size={12} />
                Expert Fissures
              </span>
              <span className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 text-amber-300 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                <Hammer size={12} />
                Ouverture Mur Porteur
              </span>
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-300">Expert Fissures</span>
              {' '}à Toulouse
              <span className="block mt-2 text-3xl md:text-4xl lg:text-5xl">
                &{' '}<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-300">Ouverture Mur Porteur</span>{' '}en Occitanie
              </span>
              <span className="block mt-3 text-white text-xl md:text-2xl lg:text-3xl font-medium tracking-normal">
                Du diagnostic aux travaux. <span className="text-emerald-400">Un seul interlocuteur.</span>
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-200 mb-6 max-w-2xl leading-relaxed">
              Cabinet indépendant spécialisé en <strong className="text-orange-300">pathologie du bâtiment</strong>.
              Nous vous accompagnons de A à Z : diagnostic instrumenté, plan de remédiation, 
              <strong className="text-orange-300">réalisation des travaux</strong> et suivi post-intervention.
              850+ clients accompagnés en Occitanie.
            </p>
            
            <div className="grid grid-cols-2 gap-3 mb-8">
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Activity size={16} className="text-orange-400" />
                  <span className="text-orange-300 text-xs font-bold uppercase">Fissures</span>
                </div>
                <p className="text-white text-sm font-bold">Agrafage structurel</p>
                <p className="text-slate-300 text-xs">Garanti 10 ans</p>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Hammer size={16} className="text-amber-400" />
                  <span className="text-amber-300 text-xs font-bold uppercase">Mur Porteur</span>
                </div>
                <p className="text-white text-sm font-bold">Ouverture & baie vitrée</p>
                <p className="text-slate-300 text-xs">Garanti 10 ans</p>
              </div>
            </div>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <Link 
                href="/diagnostic" 
                className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-orange-900/30 transition-all flex items-center justify-center gap-3 hover:-translate-y-1"
              >
                Diagnostic gratuit
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

            {/* Bandeau appel direct - très visible */}
            <div className="bg-green-500/20 border border-green-400/40 rounded-xl p-3 mb-8 flex items-center gap-3">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse flex-shrink-0" />
              <p className="text-green-200 text-sm flex-1">
                <strong className="text-green-100">Expert disponible</strong> — Intervention sur site sous 48h
              </p>
              <a href="tel:0582953375" className="bg-green-500 hover:bg-green-600 text-white text-sm font-bold px-4 py-1.5 rounded-lg transition-colors flex-shrink-0">
                Appeler
              </a>
            </div>
            
            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <span className="flex items-center gap-2">
                <CheckCircle size={16} className="text-emerald-400" /> 
                <span className="text-slate-200">Réponse <strong className="text-white">24h</strong></span>
              </span>
              <span className="flex items-center gap-2">
                <Shield size={16} className="text-blue-400" /> 
                <span className="text-slate-200">Garantie <strong className="text-white">décennale</strong></span>
              </span>
              <span className="flex items-center gap-2">
                <Star size={16} className="text-yellow-400 fill-yellow-400" /> 
                <span className="text-slate-200"><strong className="text-white">4.9/5</strong> Google</span>
              </span>
            </div>
          </div>
          
          {/* Images côte à côte - Fissure ET Humidité */}
          <div className="hidden lg:grid grid-cols-2 gap-4">
            {/* Image Fissure */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-orange-500/30">
              <Image
                src="/images/fissure-facade-verticale.webp"
                alt="Fissure structurelle façade - Expert fissures Toulouse Montauban Auch (31-82-32)"
                width={300}
                height={400}
                sizes="(max-width: 1024px) 0px, 300px"
                className="w-full h-64 object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent p-4">
                <div className="flex items-center gap-2">
                  <Activity className="text-orange-400" size={18} />
                  <span className="text-white font-bold text-sm">Fissures</span>
                </div>
                <p className="text-slate-200 text-xs">Agrafage structurel</p>
              </div>
            </div>
            
            {/* Image Mur Porteur */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-500/30 mt-8">
              <Image
                src="/images/fissure-facade-diagonale.webp"
                alt="Ouverture mur porteur création baie vitrée - IPB Expertise Toulouse Occitanie"
                width={300}
                height={400}
                sizes="(max-width: 1024px) 0px, 300px"
                className="w-full h-64 object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent p-4">
                <div className="flex items-center gap-2">
                  <Hammer className="text-amber-400" size={18} />
                  <span className="text-white font-bold text-sm">Mur Porteur</span>
                </div>
                <p className="text-slate-200 text-xs">Ouverture & baie vitrée</p>
              </div>
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
