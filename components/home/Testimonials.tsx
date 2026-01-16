import { Star } from 'lucide-react';

export function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 md:mb-16 gap-6">
          <div>
              <h2 className="text-3xl font-extrabold text-slate-900">Ils nous ont fait confiance</h2>
              <p className="text-slate-500 mt-2">Plus de 500 propriétaires ont choisi IPB pour sauver leur patrimoine. Voici ce qu'ils en pensent.</p>
          </div>
          <div className="flex items-center gap-4 bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex text-yellow-400 gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
            </div>
            <div className="text-left">
                <span className="block font-black text-slate-900 text-xl leading-none">4.9/5</span>
                <span className="text-xs text-slate-400 font-bold uppercase">Sur Google Avis</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <div className="bg-white p-6 md:p-8 rounded-xl md:rounded-2xl shadow-sm border border-slate-100 relative">
            <div className="text-5xl md:text-6xl text-orange-200 absolute top-3 left-3 md:top-4 md:left-4 font-serif leading-none">"</div>
            <p className="text-slate-700 italic mb-4 md:mb-6 text-sm md:text-base leading-relaxed relative z-10 pt-3 md:pt-4">"J'étais terrifiée : mon assurance m'avait dit qu'il fallait des micropieux à 40 000€. L'expert IPB a été transparent : un agrafage suffisait largement. Travail impeccable, maison stabilisée, et j'ai économisé 28 000€. Je recommande à 200%."</p>
            <div className="flex items-center gap-4 border-t border-slate-50 pt-4">
              <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-500 text-xs">JD</div>
              <div>
                <p className="font-bold text-slate-900 text-sm">Jean D.</p>
                <p className="text-xs text-slate-400">Colomiers</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 md:p-8 rounded-xl md:rounded-2xl shadow-sm border border-slate-100 relative">
            <div className="text-5xl md:text-6xl text-orange-200 absolute top-3 left-3 md:top-4 md:left-4 font-serif leading-none">"</div>
            <p className="text-slate-700 italic mb-4 md:mb-6 text-sm md:text-base leading-relaxed relative z-10 pt-3 md:pt-4">"Le diagnostic en ligne m'a alerté sur la gravité de mes fissures. L'expert est venu le lendemain avec ses instruments. Diagnostic précis, intervention en 2 jours, résultat impeccable. Une équipe professionnelle et rassurante."</p>
            <div className="flex items-center gap-4 border-t border-slate-50 pt-4">
              <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-500 text-xs">ML</div>
              <div>
                <p className="font-bold text-slate-900 text-sm">Marie L.</p>
                <p className="text-xs text-slate-400">Muret</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 md:p-8 rounded-xl md:rounded-2xl shadow-sm border border-slate-100 relative">
            <div className="text-5xl md:text-6xl text-orange-200 absolute top-3 left-3 md:top-4 md:left-4 font-serif leading-none">"</div>
            <p className="text-slate-700 italic mb-4 md:mb-6 text-sm md:text-base leading-relaxed relative z-10 pt-3 md:pt-4">"Enfin des experts qui expliquent clairement le problème et la solution ! Le rapport d'expertise détaillé m'a convaincu. Travaux réalisés dans les temps, équipe soigneuse, résultat conforme aux promesses. Mon sous-sol est enfin sec après 10 ans d'humidité."</p>
            <div className="flex items-center gap-4 border-t border-slate-50 pt-4">
              <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-500 text-xs">PR</div>
              <div>
                <p className="font-bold text-slate-900 text-sm">Pierre R.</p>
                <p className="text-xs text-slate-400">Toulouse</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 md:p-8 rounded-xl md:rounded-2xl shadow-sm border border-slate-100 relative">
            <div className="text-5xl md:text-6xl text-orange-200 absolute top-3 left-3 md:top-4 md:left-4 font-serif leading-none">"</div>
            <p className="text-slate-700 italic mb-4 md:mb-6 text-sm md:text-base leading-relaxed relative z-10 pt-3 md:pt-4">"Service irréprochable de A à Z. L'expert IPB a pris le temps de m'expliquer chaque étape. L'injection résine a complètement résolu mon problème d'humidité. Plus de salpêtre, plus d'odeurs. Je recommande vivement leur expertise technique et leur professionnalisme."</p>
            <div className="flex items-center gap-4 border-t border-slate-50 pt-4">
              <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-500 text-xs">SB</div>
              <div>
                <p className="font-bold text-slate-900 text-sm">Sophie B.</p>
                <p className="text-xs text-slate-400">Blagnac</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

