"use client"

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Phone, CheckCircle, Shield, Award, Activity, Droplets, ChevronDown, GraduationCap } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative bg-slate-900 text-white overflow-hidden">
      {/* Background sobre */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800"></div>
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
      
      {/* Ligne décorative subtile */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-orange-400 to-blue-500"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            {/* Badge institutionnel */}
            <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 text-slate-300 px-4 py-2 rounded-lg text-sm mb-8">
              <GraduationCap size={18} className="text-orange-400" />
              <span>Institut de Pathologie du Bâtiment — Depuis 2019</span>
            </div>
            
            {/* Double expertise */}
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-300 px-4 py-2 rounded-lg text-sm font-medium">
                <Activity size={14} />
                Expertise Fissures
              </span>
              <span className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-300 px-4 py-2 rounded-lg text-sm font-medium">
                <Droplets size={14} />
                Expertise Humidité
              </span>
            </div>
            
            {/* H1 professionnel */}
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-[1.15] mb-6">
              Diagnostic et traitement des{' '}
              <span className="text-orange-400">fissures</span> et de l'
              <span className="text-blue-400">humidité</span>
            </h1>
            
            {/* Sous-titre expert */}
            <p className="text-lg text-slate-400 mb-8 max-w-xl leading-relaxed">
              Notre équipe d'experts analyse l'origine de vos désordres et met en œuvre 
              des solutions durables, garanties par nos assurances décennales.
            </p>
            
            {/* Certifications / Garanties */}
            <div className="flex flex-wrap gap-6 mb-8 text-sm">
              <div className="flex items-center gap-2 text-slate-300">
                <Shield size={18} className="text-emerald-400" />
                <span>Garantie décennale</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Award size={18} className="text-orange-400" />
                <span>Certifié RGE</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle size={18} className="text-blue-400" />
                <span>Devis gratuit sous 48h</span>
              </div>
            </div>
            
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
            
            {/* CTAs professionnels */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/diagnostic" 
                className="group bg-orange-500 hover:bg-orange-400 text-white px-8 py-4 rounded-lg font-semibold text-base transition-all flex items-center justify-center gap-3"
              >
                <span>Demander un diagnostic</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a 
                href="tel:0582953375" 
                className="bg-white/5 border border-white/20 text-white px-8 py-4 rounded-lg font-semibold text-base hover:bg-white/10 transition-all flex items-center justify-center gap-3"
              >
                <Phone size={18} />
                <span>05 82 95 33 75</span>
              </a>
            </div>
          </div>
          
          {/* Images - Version Desktop */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-2 gap-4">
              {/* Image Fissure */}
              <div className="relative rounded-xl overflow-hidden border border-white/10">
                <Image
                  src="/images/fissure-facade-verticale.webp"
                  alt="Diagnostic fissure structurelle - IPB Expertise"
                  width={300}
                  height={400}
                  className="w-full h-56 object-cover"
                  priority
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/90 to-transparent p-4">
                  <div className="flex items-center gap-2">
                    <Activity className="text-orange-400" size={16} />
                    <span className="text-white font-medium text-sm">Expertise Fissures</span>
                  </div>
                </div>
              </div>
              
              {/* Image Humidité */}
              <div className="relative rounded-xl overflow-hidden border border-white/10 mt-8">
                <Image
                  src="/images/salpetre-avant-apres.webp"
                  alt="Traitement humidité et salpêtre - IPB Expertise"
                  width={300}
                  height={400}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/90 to-transparent p-4">
                  <div className="flex items-center gap-2">
                    <Droplets className="text-blue-400" size={16} />
                    <span className="text-white font-medium text-sm">Expertise Humidité</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Chiffres clés */}
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="text-2xl font-bold text-white">200+</div>
                <div className="text-xs text-slate-400">Interventions</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="text-2xl font-bold text-white">5 ans</div>
                <div className="text-xs text-slate-400">d'expérience</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="text-2xl font-bold text-white">100%</div>
                <div className="text-xs text-slate-400">Assuré</div>
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
