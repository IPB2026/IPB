import { Award, Microscope, Shield } from 'lucide-react';

export function TrustSignals() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12">
        {/* Bande colorée en haut */}
        <div className="h-1 w-full bg-gradient-to-r from-orange-500 via-blue-500 to-emerald-500 rounded-full mb-10 -mt-4"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 text-center">
          {/* Méthodologie */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 mb-5 hover:scale-110 transition-transform">
              <Microscope size={32} />
            </div>
            <div className="bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-sm font-bold mb-3">
              Instrumentation de terrain
            </div>
            <h3 className="font-display font-bold text-xl text-slate-900 mb-2">Diagnostic instrumenté</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Fissuromètre, niveau laser, hygromètre, caméra thermique. Chaque diagnostic repose sur des mesures, pas sur des impressions.
            </p>
          </div>
          
          {/* Expertise */}
          <div className="flex flex-col items-center md:border-x md:border-slate-100 md:px-8">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-5 hover:scale-110 transition-transform">
              <Award size={32} />
            </div>
            <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-bold mb-3">
              Depuis 2019
            </div>
            <h3 className="font-display font-bold text-xl text-slate-900 mb-2">Spécialiste pathologie bâtiment</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Nous ne faisons que ça : fissures et humidité. Cette spécialisation nous permet de poser le bon diagnostic dès la première visite.
            </p>
          </div>
          
          {/* Garantie */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-5 hover:scale-110 transition-transform">
              <Shield size={32} />
            </div>
            <div className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-sm font-bold mb-3">
              Assuré SMABTP
            </div>
            <h3 className="font-display font-bold text-xl text-slate-900 mb-2">Garantie décennale</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Chaque intervention est couverte par notre assurance décennale. Rapport technique détaillé remis sous 7 jours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
