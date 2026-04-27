import { Award, Microscope, Phone, Shield } from 'lucide-react';

export function TrustSignals() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12">
        {/* Bande colorée en haut */}
        <div className="h-1 w-full bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-500 rounded-full mb-10 -mt-4"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 text-center">
          {/* Indépendance */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 mb-5 hover:scale-110 transition-transform">
              <Microscope size={32} />
            </div>
            <div className="bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-sm font-bold mb-3">
              Cabinet indépendant
            </div>
            <h3 className="font-display font-bold text-xl text-slate-900 mb-2">Diagnostic sans conflit d'intérêt</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Pas d'affiliation à un fabricant de produits, pas de commission sur solution. Fissuromètre, caméra thermique, niveau laser — on mesure d'abord, on prescrit ensuite.
            </p>
          </div>

          {/* Expertise structure */}
          <div className="flex flex-col items-center md:border-x md:border-slate-100 md:px-8">
            <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 mb-5 hover:scale-110 transition-transform">
              <Award size={32} />
            </div>
            <div className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-sm font-bold mb-3">
              Ingénieur structure en interne
            </div>
            <h3 className="font-display font-bold text-xl text-slate-900 mb-2">De l'étude au chantier</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Notre ingénieur calcule la poutre, nos équipes réalisent les travaux. Pas de sous-traitance cachée, pas de coordination à votre charge. Un seul interlocuteur.
            </p>
          </div>

          {/* Garantie */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-5 hover:scale-110 transition-transform">
              <Shield size={32} />
            </div>
            <div className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-sm font-bold mb-3">
              Assuré AXA France
            </div>
            <h3 className="font-display font-bold text-xl text-slate-900 mb-2">Garantie décennale sur tout</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Fissures, mur porteur, baie vitrée — chaque chantier est couvert 10 ans. Rapport technique remis sous 7 jours, attestation fournie avec le devis.
            </p>
          </div>
        </div>

        <div className="text-center mt-10 pt-8 border-t border-slate-100">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="/diagnostic"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 py-3 rounded-full transition-colors text-sm"
            >
              Évaluer ma situation gratuitement
            </a>
            <a
              href="tel:0582953375"
              className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium text-sm transition-colors"
            >
              <Phone size={16} />
              05 82 95 33 75
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
