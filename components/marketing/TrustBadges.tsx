"use client";

import { Shield, Star, Clock, Award, CheckCircle, Users } from "lucide-react";

interface TrustBadgesProps {
  variant?: "horizontal" | "vertical" | "compact" | "hero";
  className?: string;
}

export function TrustBadges({ variant = "horizontal", className = "" }: TrustBadgesProps) {
  const badges = [
    { icon: <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />, value: "4.9/5", label: "127 avis Google" },
    { icon: <Shield className="w-5 h-5 text-green-500" />, value: "10 ans", label: "Garantie décennale" },
    { icon: <Clock className="w-5 h-5 text-blue-500" />, value: "48h", label: "Intervention rapide" },
    { icon: <Award className="w-5 h-5 text-orange-500" />, value: "2019", label: "Expert depuis" },
  ];

  if (variant === "compact") {
    return (
      <div className={`flex items-center gap-4 text-xs text-slate-500 ${className}`}>
        <span className="flex items-center gap-1">
          <Star size={14} className="text-yellow-500 fill-yellow-500" />
          <strong className="text-slate-700">4.9/5</strong>
        </span>
        <span className="flex items-center gap-1">
          <Shield size={14} className="text-green-500" />
          Garanti 10 ans
        </span>
        <span className="flex items-center gap-1">
          <Clock size={14} className="text-blue-500" />
          RDV 48h
        </span>
      </div>
    );
  }

  if (variant === "hero") {
    return (
      <div className={`flex flex-wrap justify-center gap-6 ${className}`}>
        {badges.map((badge, index) => (
          <div 
            key={index} 
            className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full"
          >
            {badge.icon}
            <div className="text-left">
              <div className="font-bold text-white text-sm">{badge.value}</div>
              <div className="text-white/70 text-xs">{badge.label}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "vertical") {
    return (
      <div className={`space-y-4 ${className}`}>
        {badges.map((badge, index) => (
          <div key={index} className="flex items-center gap-4 bg-slate-50 rounded-xl p-4">
            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center">
              {badge.icon}
            </div>
            <div>
              <div className="font-bold text-slate-900">{badge.value}</div>
              <div className="text-slate-500 text-sm">{badge.label}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Default: horizontal
  return (
    <div className={`flex flex-wrap items-center justify-center gap-8 ${className}`}>
      {badges.map((badge, index) => (
        <div key={index} className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
            {badge.icon}
          </div>
          <div className="text-left">
            <div className="font-bold text-slate-900">{badge.value}</div>
            <div className="text-slate-500 text-xs">{badge.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Composant de compteur social proof
export function SocialProofCounter({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-2xl p-6 ${className}`}>
      <div className="flex items-center justify-around">
        <div className="text-center">
          <div className="text-3xl font-black text-orange-600">300+</div>
          <div className="text-sm text-slate-600">Maisons sauvées</div>
        </div>
        <div className="w-px h-12 bg-orange-200"></div>
        <div className="text-center">
          <div className="text-3xl font-black text-orange-600">127</div>
          <div className="text-sm text-slate-600">Avis 5 étoiles</div>
        </div>
        <div className="w-px h-12 bg-orange-200"></div>
        <div className="text-center">
          <div className="text-3xl font-black text-orange-600">5 ans</div>
          <div className="text-sm text-slate-600">D'expertise</div>
        </div>
      </div>
    </div>
  );
}

// Composant "Pourquoi nous choisir"
export function WhyChooseUs({ className = "" }: { className?: string }) {
  const reasons = [
    { icon: "🎯", title: "Diagnostic précis", desc: "Analyse complète avec rapport détaillé" },
    { icon: "💰", title: "Prix justes", desc: "Devis transparent, sans surprise" },
    { icon: "🛡️", title: "Garantie 10 ans", desc: "Assurance décennale sur tous travaux" },
    { icon: "⚡", title: "Réactivité", desc: "Intervention sous 48h en Occitanie" },
  ];

  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${className}`}>
      {reasons.map((reason, index) => (
        <div key={index} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-all text-center">
          <div className="text-3xl mb-2">{reason.icon}</div>
          <div className="font-bold text-slate-900 text-sm mb-1">{reason.title}</div>
          <div className="text-slate-500 text-xs">{reason.desc}</div>
        </div>
      ))}
    </div>
  );
}

// Bandeau d'urgence animé
export function UrgencyBanner({ message = "⚡ Places limitées cette semaine - Appelez maintenant", className = "" }: { message?: string; className?: string }) {
  return (
    <div className={`bg-red-600 text-white py-2 overflow-hidden ${className}`}>
      <div className="animate-marquee whitespace-nowrap">
        <span className="mx-8">{message}</span>
        <span className="mx-8">{message}</span>
        <span className="mx-8">{message}</span>
      </div>
    </div>
  );
}
