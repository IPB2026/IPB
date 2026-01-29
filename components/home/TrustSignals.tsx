import { Award, Microscope, Wallet } from 'lucide-react';

export function TrustSignals() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12">
        {/* Bande colorée en haut */}
        <div className="h-1 w-full bg-gradient-to-r from-orange-500 via-blue-500 to-emerald-500 rounded-full mb-10 -mt-4"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 text-center">
          {/* Garantie */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 mb-5 hover:scale-110 transition-transform">
              <Award size={32} />
            </div>
            <div className="bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-sm font-bold mb-3">
              100% couvert
            </div>
            <h3 className="font-display font-bold text-xl text-slate-900 mb-2">Garantie 10 ans</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Toutes nos interventions sont couvertes par une garantie décennale auprès d'un assureur de référence.
            </p>
          </div>
          
          {/* Diagnostic */}
          <div className="flex flex-col items-center md:border-x md:border-slate-100 md:px-8">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-5 hover:scale-110 transition-transform">
              <Microscope size={32} />
            </div>
            <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-bold mb-3">
              Sous 24h
            </div>
            <h3 className="font-display font-bold text-xl text-slate-900 mb-2">Diagnostic scientifique</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Nos experts utilisent des instruments professionnels pour identifier la cause exacte de vos problèmes.
            </p>
          </div>
          
          {/* Économies */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-5 hover:scale-110 transition-transform">
              <Wallet size={32} />
            </div>
            <div className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-sm font-bold mb-3">
              -70% vs micropieux
            </div>
            <h3 className="font-display font-bold text-xl text-slate-900 mb-2">Économies garanties</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Nos solutions vous font économiser 15 000€ à 30 000€ par rapport aux micropieux, sans compromis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
