"use client"

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Phone, CheckCircle, Shield, Star, Activity, Droplets } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative bg-slate-900 text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      
      {/* Cercles décoratifs - Orange (fissures) et Bleu (humidité) */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            {/* Double badge - Fissures ET Humidité */}
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/40 text-orange-300 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                <Activity size={12} />
                Expert Fissures
              </span>
              <span className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/40 text-blue-300 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                <Droplets size={12} />
                Expert Humidité
              </span>
            </div>
            
            {/* H1 équilibré */}
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-300">Fissures</span>
              {' '}ou{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Humidité</span> ?
              <span className="block mt-2 text-white">
                L'expert qui <span className="text-emerald-400">sauve votre maison</span>.
              </span>
            </h1>
            
            {/* Sous-titre équilibré */}
            <p className="text-lg md:text-xl text-slate-300 mb-6 max-w-2xl leading-relaxed">
              Depuis 2019, nous traitons les <strong className="text-orange-300">fissures structurelles</strong> et 
              les <strong className="text-blue-300">problèmes d'humidité</strong> en Haute-Garonne, Tarn-et-Garonne et Gers. 
              Diagnostic expert sous 48h.
            </p>
            
            {/* Double expertise - Cards côte à côte */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Activity size={16} className="text-orange-400" />
                  <span className="text-orange-300 text-xs font-bold uppercase">Fissures</span>
                </div>
                <p className="text-white text-sm font-bold">Agrafage & Harpage</p>
                <p className="text-slate-400 text-xs">Garantie décennale</p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Droplets size={16} className="text-blue-400" />
                  <span className="text-blue-300 text-xs font-bold uppercase">Humidité</span>
                </div>
                <p className="text-white text-sm font-bold">Injection & Cuvelage</p>
                <p className="text-slate-400 text-xs">Garantie 30 ans</p>
              </div>
            </div>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
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
            
            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <span className="flex items-center gap-2">
                <CheckCircle size={16} className="text-emerald-400" /> 
                <span className="text-slate-300">Réponse <strong className="text-white">24h</strong></span>
              </span>
              <span className="flex items-center gap-2">
                <Shield size={16} className="text-blue-400" /> 
                <span className="text-slate-300">Garantie <strong className="text-white">décennale</strong></span>
              </span>
              <span className="flex items-center gap-2">
                <Star size={16} className="text-yellow-400 fill-yellow-400" /> 
                <span className="text-slate-300"><strong className="text-white">4.9/5</strong> Google</span>
              </span>
            </div>
          </div>
          
          {/* Images côte à côte - Fissure ET Humidité */}
          <div className="hidden lg:grid grid-cols-2 gap-4">
            {/* Image Fissure */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-orange-500/30">
              <Image
                src="/images/fissure-facade-verticale.webp"
                alt="Fissure structurelle façade - Expert fissures Toulouse Haute-Garonne"
                width={300}
                height={400}
                className="w-full h-64 object-cover"
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent p-4">
                <div className="flex items-center gap-2">
                  <Activity className="text-orange-400" size={18} />
                  <span className="text-white font-bold text-sm">Fissures</span>
                </div>
                <p className="text-slate-300 text-xs">Agrafage structurel</p>
              </div>
            </div>
            
            {/* Image Humidité */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-blue-500/30 mt-8">
              <Image
                src="/images/salpetre-avant-apres.webp"
                alt="Traitement humidité salpêtre - Expert humidité Toulouse remontées capillaires"
                width={300}
                height={400}
                className="w-full h-64 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent p-4">
                <div className="flex items-center gap-2">
                  <Droplets className="text-blue-400" size={18} />
                  <span className="text-white font-bold text-sm">Humidité</span>
                </div>
                <p className="text-slate-300 text-xs">Injection résine</p>
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
