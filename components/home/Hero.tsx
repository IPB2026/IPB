"use client"

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Phone, CheckCircle, Shield, Star, AlertTriangle } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative bg-slate-900 text-white overflow-hidden">
      {/* Background simple mais élégant */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-orange-950/50"></div>
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      
      {/* Cercle décoratif */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="max-w-2xl">
          {/* Badge urgence */}
          <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/40 text-red-300 px-4 py-2 rounded-full text-xs font-bold mb-6 uppercase tracking-wider">
            <AlertTriangle size={14} className="animate-pulse" />
            Depuis 2025 : +47% de fissures dues à la sécheresse en Occitanie
          </div>
          
          {/* Titre principal - plus émotionnel */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
            Votre maison se{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">dégrade</span> ?{' '}
            <span className="block mt-2">Stoppez les dégâts <span className="text-emerald-400">avant qu'il soit trop tard</span>.</span>
          </h1>
          
          {/* Sous-titre avec preuve sociale */}
          <p className="text-lg md:text-xl text-slate-300 mb-4 max-w-2xl leading-relaxed">
            Depuis 2019, nous avons <strong className="text-white">sauvé plus de 200 maisons</strong> de l'effondrement en Haute-Garonne, 
            Tarn-et-Garonne et Gers. Fissures, humidité, fondations : diagnostic expert sous 48h.
          </p>
          
          {/* Comparaison économies - design épuré */}
          <div className="flex items-center gap-4 mb-8 max-w-lg">
            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
              <div className="text-center">
                <p className="text-xs text-slate-400 uppercase tracking-wide">Micropieux</p>
                <p className="text-lg font-bold text-slate-400 line-through">35 000€</p>
              </div>
            </div>
            <div className="text-slate-500">→</div>
            <div className="flex items-center gap-3 bg-emerald-500/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-emerald-500/30">
              <div className="text-center">
                <p className="text-xs text-emerald-400 uppercase tracking-wide">Notre solution</p>
                <p className="text-lg font-bold text-white">12 000€</p>
              </div>
            </div>
            <div className="bg-emerald-500/20 px-3 py-1.5 rounded-full">
              <p className="text-emerald-400 text-sm font-bold">-65%</p>
            </div>
          </div>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <Link 
              href="/diagnostic" 
              className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white px-8 py-5 rounded-xl font-bold text-lg shadow-xl shadow-orange-900/40 transition-all flex items-center justify-center gap-3 hover:-translate-y-1 hover:shadow-2xl"
            >
              🚨 DIAGNOSTIC GRATUIT EN 3 MIN
              <ArrowRight size={22} />
            </Link>
            <a 
              href="tel:0582953375" 
              className="bg-white/5 backdrop-blur border border-white/10 text-white px-8 py-5 rounded-xl font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-3"
            >
              <Phone size={20} className="text-orange-400" />
              05 82 95 33 75
            </a>
          </div>
          
          {/* Trust badges améliorés */}
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <span className="flex items-center gap-2 text-emerald-400">
              <CheckCircle size={18} /> 
              <span className="text-slate-300">Réponse garantie <strong className="text-white">24h</strong></span>
            </span>
            <span className="flex items-center gap-2 text-blue-400">
              <Shield size={18} /> 
              <span className="text-slate-300">Garantie <strong className="text-white">décennale</strong></span>
            </span>
            <span className="flex items-center gap-2 text-yellow-400">
              <Star size={18} className="fill-yellow-400" /> 
              <span className="text-slate-300"><strong className="text-white">4.9/5</strong> sur Google (14 avis)</span>
            </span>
          </div>
        </div>
        
        {/* Image de fissure - visible sur desktop */}
        <div className="hidden lg:block relative">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
            <Image
              src="/images/fissure-facade-verticale.webp"
              alt="Fissure structurelle sur façade - IPB Expert Fissures Toulouse"
              width={600}
              height={450}
              className="w-full h-auto object-cover"
              priority
            />
            {/* Overlay avec badge */}
            <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-sm rounded-xl p-4 border border-orange-500/30">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                  <AlertTriangle className="text-red-400" size={24} />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Fissure structurelle</p>
                  <p className="text-slate-400 text-xs">Nécessite une expertise urgente</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Petite image secondaire en overlay */}
          <div className="absolute -bottom-6 -left-6 w-40 h-32 rounded-xl overflow-hidden shadow-xl border-2 border-white/20 hidden xl:block">
            <Image
              src="/images/fissure-coin-maison.webp"
              alt="Fissure angle maison"
              width={160}
              height={128}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        </div>
      </div>
      
      {/* Vague de transition */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none" className="w-full h-auto">
          <path d="M0 100L60 90C120 80 240 60 360 50C480 40 600 40 720 45C840 50 960 60 1080 65C1200 70 1320 70 1380 70L1440 70V100H0Z" fill="#F8FAFC"/>
        </svg>
      </div>
    </div>
  );
}
