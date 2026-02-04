"use client";

import Link from "next/link";
import { Phone, ArrowRight, CheckCircle, Clock, Shield, Star, Calendar } from "lucide-react";

interface InlineCtaProps {
  variant?: "diagnostic" | "call" | "urgent" | "mini" | "comparison";
  title?: string;
  subtitle?: string;
  className?: string;
}

export function InlineCta({ 
  variant = "diagnostic", 
  title,
  subtitle,
  className = "" 
}: InlineCtaProps) {
  
  // Variante Mini - Discret mais efficace
  if (variant === "mini") {
    return (
      <div className={`bg-orange-50 border-l-4 border-orange-500 rounded-r-xl p-4 my-6 ${className}`}>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="font-bold text-slate-900">{title || "💡 Besoin d'un avis d'expert ?"}</p>
            <p className="text-sm text-slate-600">{subtitle || "Diagnostic gratuit sous 48h"}</p>
          </div>
          <Link 
            href="/diagnostic"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-all"
          >
            Diagnostic gratuit
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  // Variante Urgent - Avec compteur/urgence
  if (variant === "urgent") {
    return (
      <div className={`relative overflow-hidden bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-6 my-8 text-white ${className}`}>
        {/* Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            <span className="text-sm font-bold text-orange-200">🔥 Forte demande cette semaine</span>
          </div>
          
          <h3 className="text-xl font-black mb-2">{title || "N'attendez pas que ça s'aggrave"}</h3>
          <p className="text-orange-100 mb-4">{subtitle || "Chaque mois sans traitement = +15% de dégâts supplémentaires"}</p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Link 
              href="/diagnostic"
              className="flex items-center justify-center gap-2 bg-white text-orange-600 px-6 py-3 rounded-xl font-bold hover:bg-orange-50 transition-all shadow-lg"
            >
              Diagnostic urgent
              <ArrowRight size={18} />
            </Link>
            <a 
              href="tel:0582953375"
              className="flex items-center justify-center gap-2 bg-white/20 backdrop-blur text-white px-6 py-3 rounded-xl font-bold hover:bg-white/30 transition-all border border-white/30"
            >
              <Phone size={18} />
              05 82 95 33 75
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Variante Call - Focus téléphone
  if (variant === "call") {
    return (
      <div className={`bg-slate-900 rounded-2xl p-6 my-8 text-white ${className}`}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-2">{title || "Parlez à un expert maintenant"}</h3>
            <p className="text-slate-400">{subtitle || "Réponse immédiate, conseil gratuit"}</p>
          </div>
          
          <a 
            href="tel:0582953375"
            className="flex items-center gap-4 bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-4 rounded-2xl font-bold text-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/30"
          >
            <Phone size={24} />
            <div className="text-left">
              <div className="text-xs text-orange-200">Appelez gratuitement</div>
              <div>05 82 95 33 75</div>
            </div>
          </a>
        </div>
      </div>
    );
  }

  // Variante Comparison - Avec tableau comparatif
  if (variant === "comparison") {
    return (
      <div className={`bg-gradient-to-br from-slate-50 to-orange-50 rounded-2xl p-6 my-8 border border-slate-200 ${className}`}>
        <h3 className="text-xl font-black text-slate-900 mb-4 text-center">
          {title || "Agir maintenant vs Attendre"}
        </h3>
        
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="font-bold text-green-800 mb-2">✅ Agir maintenant</div>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Coût : 8 000 - 15 000€</li>
              <li>• Durée : 3-5 jours</li>
              <li>• Maison stabilisée</li>
            </ul>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="font-bold text-red-800 mb-2">❌ Attendre 2 ans</div>
            <ul className="text-sm text-red-700 space-y-1">
              <li>• Coût : 25 000 - 45 000€</li>
              <li>• Durée : 2-3 semaines</li>
              <li>• Dégâts structurels</li>
            </ul>
          </div>
        </div>
        
        <div className="text-center">
          <Link 
            href="/diagnostic"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-xl font-bold hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg"
          >
            Évaluer ma situation
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  // Variante par défaut - Diagnostic complet
  return (
    <div className={`bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-8 my-8 text-white ${className}`}>
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="text-2xl font-black mb-3">{title || "Diagnostic gratuit en 5 minutes"}</h3>
          <p className="text-orange-100 mb-4">{subtitle || "Décrivez votre problème, recevez une analyse personnalisée et un devis sous 48h."}</p>
          
          <ul className="space-y-2 mb-6">
            <li className="flex items-center gap-2 text-sm">
              <CheckCircle size={16} className="text-orange-200" />
              Sans engagement
            </li>
            <li className="flex items-center gap-2 text-sm">
              <CheckCircle size={16} className="text-orange-200" />
              Réponse personnalisée
            </li>
            <li className="flex items-center gap-2 text-sm">
              <CheckCircle size={16} className="text-orange-200" />
              Devis gratuit sous 48h
            </li>
          </ul>
          
          <Link 
            href="/diagnostic"
            className="inline-flex items-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-50 transition-all shadow-lg"
          >
            Lancer le diagnostic
            <ArrowRight size={20} />
          </Link>
        </div>
        
        <div className="hidden md:block">
          <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
            <div className="flex items-center justify-around text-center">
              <div>
                <Star className="w-8 h-8 mx-auto mb-2 fill-yellow-300 text-yellow-300" />
                <div className="font-bold">4.9/5</div>
                <div className="text-xs text-orange-200">127 avis</div>
              </div>
              <div className="w-px h-16 bg-white/20"></div>
              <div>
                <Shield className="w-8 h-8 mx-auto mb-2" />
                <div className="font-bold">10 ans</div>
                <div className="text-xs text-orange-200">Garantie</div>
              </div>
              <div className="w-px h-16 bg-white/20"></div>
              <div>
                <Clock className="w-8 h-8 mx-auto mb-2" />
                <div className="font-bold">48h</div>
                <div className="text-xs text-orange-200">RDV</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Composant CTA flottant qui apparaît après scroll
export function ScrollTriggeredCta() {
  return null; // Intégré dans StickyDiagnosticCta maintenant
}
