import { Award, FileCheck, Microscope, Phone, Shield, Building2 } from 'lucide-react';

export function TrustSignals() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
      {/* Bandeau autorité — assurance décennale en évidence */}
      <div className="bg-gradient-to-r from-blue-900 to-slate-900 rounded-2xl p-6 md:p-8 mb-10 shadow-2xl border border-blue-800/40">
        <div className="grid md:grid-cols-[auto_1fr_auto] gap-6 items-center">
          <div className="w-20 h-20 bg-blue-500/20 border-2 border-blue-400/50 rounded-2xl flex items-center justify-center mx-auto md:mx-0">
            <Shield className="text-blue-300" size={40} />
          </div>
          <div className="text-center md:text-left">
            <p className="text-blue-300 text-xs font-bold uppercase tracking-[0.2em] mb-2">Couverture décennale active</p>
            <h2 className="text-white font-bold text-xl md:text-2xl mb-2">
              Assuré <span className="text-blue-300">AXA France IARD</span> — police n° 10564321
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Étude structure, ouverture de mur porteur, agrafage de fissures et travaux de structure — chaque chantier est couvert 10 ans.
              <strong className="text-white"> Attestation remise systématiquement avec le devis.</strong>
            </p>
          </div>
          <a
            href="/contact"
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold px-6 py-3 rounded-xl text-sm whitespace-nowrap transition-colors flex items-center gap-2 justify-center"
          >
            <FileCheck size={16} />
            Demander l'attestation
          </a>
        </div>
      </div>

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

          {/* Bureau d'études intégré */}
          <div className="flex flex-col items-center md:border-x md:border-slate-100 md:px-8">
            <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 mb-5 hover:scale-110 transition-transform">
              <Award size={32} />
            </div>
            <div className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-sm font-bold mb-3">
              Bureau d'études en interne
            </div>
            <h3 className="font-display font-bold text-xl text-slate-900 mb-2">De la note de calcul au DOE</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Notre ingénieur structure dimensionne la poutre IPN/HEB, rédige la note de calcul, supervise le chantier. Note remise au client à la livraison, opposable à l'assurance.
            </p>
          </div>

          {/* Garantie / Travaux intégrés */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-5 hover:scale-110 transition-transform">
              <Building2 size={32} />
            </div>
            <div className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-sm font-bold mb-3">
              Étude + travaux
            </div>
            <h3 className="font-display font-bold text-xl text-slate-900 mb-2">Un seul interlocuteur, une seule responsabilité</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Pas de jeu de ping-pong entre bureau d'études et entreprise. C'est nous qui calculons, nous qui ouvrons, nous qui posons. La décennale couvre l'ensemble.
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
