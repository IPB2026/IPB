"use client"

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Phone, CheckCircle, Shield, Star } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative bg-slate-900 text-white overflow-hidden">
      {/* Background sobre */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-800"></div>
      
      {/* Accent subtil */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            {/* Badge simple */}
            <div className="inline-flex items-center gap-2 text-slate-400 text-sm mb-6 border border-slate-700 px-4 py-2 rounded-full">
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              Institut de Pathologie du Bâtiment — Toulouse
            </div>
            
            {/* H1 épuré */}
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-[1.1] mb-6 text-white">
              Expert en traitement des fissures et de l'humidité
            </h1>
            
            {/* Sous-titre sobre */}
            <p className="text-lg text-slate-400 mb-8 max-w-xl leading-relaxed">
              Depuis 2019, nous diagnostiquons et traitons les pathologies du bâtiment 
              en Haute-Garonne, Tarn-et-Garonne et Gers. Intervention garantie.
            </p>
            
            {/* Services - Design épuré */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="border border-slate-700 rounded-lg p-4 hover:border-slate-600 transition">
                <h3 className="text-white font-semibold mb-1">Fissures</h3>
                <p className="text-slate-500 text-sm">Agrafage structurel</p>
              </div>
              <div className="border border-slate-700 rounded-lg p-4 hover:border-slate-600 transition">
                <h3 className="text-white font-semibold mb-1">Humidité</h3>
                <p className="text-slate-500 text-sm">Injection & cuvelage</p>
              </div>
            </div>
            
            {/* CTAs sobres */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link 
                href="/diagnostic" 
                className="bg-orange-500 hover:bg-orange-400 text-white px-8 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-3"
              >
                Demander un diagnostic
                <ArrowRight size={18} />
              </Link>
              <a 
                href="tel:0582953375" 
                className="border border-slate-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-slate-800 transition-colors flex items-center justify-center gap-3"
              >
                <Phone size={18} />
                05 82 95 33 75
              </a>
            </div>
            
            {/* Trust badges minimalistes */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400">
              <span className="flex items-center gap-2">
                <CheckCircle size={16} className="text-slate-500" /> 
                Réponse sous 48h
              </span>
              <span className="flex items-center gap-2">
                <Shield size={16} className="text-slate-500" /> 
                Garantie décennale
              </span>
              <span className="flex items-center gap-2">
                <Star size={16} className="text-slate-500" /> 
                4.9/5 sur Google
              </span>
            </div>
          </div>
          
          {/* Images - Design sobre */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative rounded-lg overflow-hidden">
                <Image
                  src="/images/fissure-facade-verticale.webp"
                  alt="Diagnostic fissure - IPB Expertise Toulouse"
                  width={300}
                  height={400}
                  className="w-full h-56 object-cover"
                  priority
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 to-transparent p-4">
                  <span className="text-white text-sm font-medium">Expertise Fissures</span>
                </div>
              </div>
              
              <div className="relative rounded-lg overflow-hidden mt-8">
                <Image
                  src="/images/salpetre-avant-apres.webp"
                  alt="Traitement humidité - IPB Expertise Toulouse"
                  width={300}
                  height={400}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 to-transparent p-4">
                  <span className="text-white text-sm font-medium">Expertise Humidité</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Transition sobre */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 to-transparent"></div>
    </div>
  );
}
