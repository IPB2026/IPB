import { Award, Microscope, Wallet } from 'lucide-react';

export function TrustSignals() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 md:p-8 lg:p-12 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
        <div className="flex flex-col items-center pt-6 md:pt-0">
          <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 mb-6 shadow-sm transform transition hover:scale-110 duration-300">
            <Award size={32} />
          </div>
          <h3 className="font-bold text-xl text-slate-900 mb-2">Protection 10 ans garantie</h3>
          <p className="text-slate-500 leading-relaxed">Votre tranquillité d'esprit assurée : toutes nos interventions sont couvertes par une Garantie Décennale auprès d'un assureur de référence.</p>
        </div>
        <div className="flex flex-col items-center pt-6 md:pt-0 pl-0 md:pl-8">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 shadow-sm transform transition hover:scale-110 duration-300">
            <Microscope size={32} />
          </div>
          <h3 className="font-bold text-xl text-slate-900 mb-2">Diagnostic scientifique</h3>
          <p className="text-slate-500 leading-relaxed">Fini les approximations. Nos experts utilisent des instruments de mesure professionnels pour identifier la cause exacte de vos problèmes.</p>
        </div>
        <div className="flex flex-col items-center pt-6 md:pt-0 pl-0 md:pl-8">
          <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-700 mb-6 shadow-sm transform transition hover:scale-110 duration-300">
            <Wallet size={32} />
          </div>
          <h3 className="font-bold text-xl text-slate-900 mb-2">Économies garanties</h3>
          <p className="text-slate-500 leading-relaxed">Nos solutions ciblées (agrafage, injection résine) vous font économiser en moyenne 15 000€ à 30 000€ par rapport aux micropieux, sans compromis sur la qualité.</p>
        </div>
      </div>
    </div>
  );
}

