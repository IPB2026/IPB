import { MapPin, ArrowRight } from 'lucide-react';
import { ImageAvantApres } from '@/components/ui/ImageAvantApres';

export function Realizations() {
  return (
    <section id="realisations" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Des résultats visibles, des maisons sauvées</h2>
          <p className="text-lg text-slate-500">Découvrez les transformations réalisées chez nos clients en Haute-Garonne.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Case 1 - Fissures */}
          <div className="group cursor-pointer">
            <div className="relative h-80 rounded-3xl overflow-hidden mb-6 bg-slate-100 border border-slate-200 shadow-md group-hover:shadow-xl transition-all">
              <div className="relative w-full h-full">
                <ImageAvantApres
                  src="/images/fissures-avant-apres.webp"
                  alt="Avant/Après : Fissure dans un mur en briques réparée par agrafage avec barres métalliques - IPB"
                  className="rounded-3xl"
                />
              </div>
              <div className="absolute inset-y-0 left-1/2 w-1 bg-white transform -translate-x-1/2 shadow-lg z-10"></div>
              <div className="absolute top-1/2 left-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 shadow-lg z-20 text-slate-300">
                  <ArrowRight size={16} />
              </div>
              <span className="absolute top-4 left-4 bg-black/70 text-white text-[10px] font-bold px-3 py-1 rounded-full backdrop-blur-md z-10">AVANT</span>
              <span className="absolute top-4 right-4 bg-green-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-sm z-10">APRÈS</span>
            </div>
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide">Structure</span>
              <span className="text-xs text-slate-500 font-bold flex items-center gap-1"><MapPin size={12} /> Balma (31)</span>
            </div>
            <h3 className="font-bold text-xl text-slate-900 group-hover:text-orange-600 transition">Pavillon des années 80 sauvé de la démolition</h3>
            <p className="text-sm text-slate-500 mt-2">Fissures structurelles stabilisées par agrafage complet + ravalement souple. Maison sécurisée, économie de 25 000€ vs micropieux.</p>
          </div>

          {/* Case 2 - Humidité */}
          <div className="group cursor-pointer">
            <div className="relative h-80 rounded-3xl overflow-hidden mb-6 bg-slate-100 border border-slate-200 shadow-md group-hover:shadow-xl transition-all">
              <div className="relative w-full h-full">
                <ImageAvantApres
                  src="/images/humidite-avant-apres.webp"
                  alt="Avant/Après : Mur avec humidité, moisissures et salpêtre transformé en mur sain et rénové - IPB"
                  className="rounded-3xl"
                />
              </div>
              <div className="absolute inset-y-0 left-1/2 w-1 bg-white transform -translate-x-1/2 shadow-lg z-10"></div>
              <div className="absolute top-1/2 left-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 shadow-lg z-20 text-slate-300">
                  <ArrowRight size={16} />
              </div>
              <span className="absolute top-4 left-4 bg-black/70 text-white text-[10px] font-bold px-3 py-1 rounded-full backdrop-blur-md z-10">AVANT</span>
              <span className="absolute top-4 right-4 bg-green-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-sm z-10">APRÈS</span>
            </div>
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide">Humidité</span>
              <span className="text-xs text-slate-500 font-bold flex items-center gap-1"><MapPin size={12} /> Toulouse Centre</span>
            </div>
            <h3 className="font-bold text-xl text-slate-900 group-hover:text-blue-600 transition">Sous-sol transformé : de la cave humide à la pièce habitable</h3>
            <p className="text-sm text-slate-500 mt-2">Injection résine hydrophobe + cuvelage époxy + VMI. Humidité éliminée à 100%, salpêtre disparu, espace récupéré.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

