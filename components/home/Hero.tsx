"use client"

import Link from 'next/link';
import { ArrowRight, Phone, CheckCircle, Shield, Star } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative bg-slate-900 text-white overflow-hidden">
      {/* Background simple mais élégant */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-orange-950/50"></div>
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      
      {/* Cercle décoratif */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-36">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 text-orange-200 px-4 py-2 rounded-full text-xs font-bold mb-8 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></span>
            Expert RGA & Infiltrations • Toulouse et environs
          </div>
          
          {/* Titre principal */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-8">
            Votre maison se{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-300">fissure</span> ?{' '}
            L'<span className="text-blue-400">humidité</span> envahit vos murs ?
          </h1>
          
          {/* Sous-titre */}
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed">
            <strong className="text-white">Expert reconnu en Haute-Garonne, Tarn-et-Garonne et Gers</strong>. 
            Nous stabilisons vos fondations et asséchons vos murs.
            <span className="block mt-3 text-orange-300 font-semibold">
              → Économisez jusqu'à 70% par rapport aux micropieux
            </span>
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <Link 
              href="/diagnostic" 
              className="bg-orange-600 hover:bg-orange-500 text-white px-8 py-5 rounded-xl font-bold text-lg shadow-xl shadow-orange-900/30 transition-all flex items-center justify-center gap-3 hover:-translate-y-0.5"
            >
              Diagnostic gratuit en 3 min
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
          
          {/* Trust badges */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400">
            <span className="flex items-center gap-2">
              <CheckCircle size={18} className="text-emerald-500" /> 
              Diagnostic sous 24h
            </span>
            <span className="flex items-center gap-2">
              <Shield size={18} className="text-blue-400" /> 
              Garantie décennale
            </span>
            <span className="flex items-center gap-2">
              <Star size={18} className="text-yellow-400 fill-yellow-400" /> 
              4.9/5 sur Google
            </span>
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
