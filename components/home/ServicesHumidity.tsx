import Link from 'next/link';
import { ArrowRight, Ruler, Shield, AlertTriangle, CheckCircle } from 'lucide-react';

export function ServicesHumidity() {
  return (
    <section className="py-16 md:py-24 bg-amber-50/40 border-t border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row-reverse gap-12 md:gap-16 lg:gap-20 items-center">

          {/* Contenu */}
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 text-amber-700 font-bold mb-6 bg-amber-100 px-5 py-2 rounded-full uppercase text-xs tracking-wider border border-amber-200">
              <Ruler size={16} /> Pôle Structure — Mur Porteur
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 md:mb-8 leading-tight">
              Un mur porteur n'est pas un obstacle.
              <span className="block text-orange-600 mt-1">C'est une question de calcul.</span>
            </h2>

            <p className="text-slate-600 text-base md:text-lg mb-8 leading-relaxed">
              Ouvrir un mur porteur sans étude structure, c'est jouer à la roulette avec la sécurité de votre bâtiment.
              Notre ingénieur <strong className="text-slate-900">calcule les charges, dimensionne la poutre et supervise le chantier</strong>.
              Résultat : votre espace s'ouvre, la lumière entre, la structure tient. Pour les 100 prochaines années.
            </p>

            <div className="space-y-4 md:space-y-5 mb-8">
              <div className="flex gap-4 p-5 rounded-2xl bg-white hover:bg-amber-50 transition border border-amber-100 group shadow-sm">
                <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 shrink-0 font-bold group-hover:scale-110 transition">1</div>
                <div>
                  <h3 className="font-bold text-base md:text-lg text-slate-900 mb-1">
                    Étude structure : calculer avant de démolir
                  </h3>
                  <p className="text-sm md:text-base text-slate-500">
                    Notre ingénieur analyse les charges descendantes, calcule la section de poutre (IPN, HEB ou béton armé) et rédige la note de calcul officielle.{' '}
                    <strong className="text-amber-700">Sans cette étape, aucun artisan sérieux ne devrait toucher à votre mur.</strong>
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-5 rounded-2xl bg-white hover:bg-amber-50 transition border border-amber-100 group shadow-sm">
                <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 shrink-0 font-bold group-hover:scale-110 transition">2</div>
                <div>
                  <h3 className="font-bold text-base md:text-lg text-slate-900 mb-1">
                    Chantier clé en main : étaiement, ouverture, finitions
                  </h3>
                  <p className="text-sm md:text-base text-slate-500">
                    Nos équipes posent l'étaiement provisoire, réalisent l'ouverture, posent la poutre et gèrent les finitions. Chantier propre, livré en{' '}
                    <strong className="text-amber-700">2 à 5 jours selon la portée.</strong>{' '}
                    Garantie décennale sur l'ensemble.
                  </p>
                </div>
              </div>
            </div>

            {/* Alerte sécurité */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8 flex items-start gap-3">
              <AlertTriangle className="text-red-500 shrink-0 mt-0.5" size={18} />
              <p className="text-red-700 text-sm leading-relaxed">
                <strong>À savoir :</strong> un artisan qui propose d'ouvrir un mur porteur sans étude structure préalable engage votre sécurité et annule votre assurance habitation. Exigez toujours une note de calcul signée.
              </p>
            </div>

            {/* Points forts */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                'Ingénieur structure en interne',
                'Démarches administratives incluses',
                'Baie vitrée : coordination menuiserie',
                'Note de calcul officielle fournie',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-slate-700">
                  <CheckCircle size={15} className="text-amber-600 shrink-0" />
                  {item}
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/diagnostic" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 py-3 rounded-full transition-colors text-sm">
                Décrire mon projet <ArrowRight size={16} />
              </Link>
              <Link href="/expertise/mur-porteur" className="inline-flex items-center gap-2 border-2 border-slate-200 hover:border-slate-300 text-slate-700 font-bold px-7 py-3 rounded-full transition-colors text-sm">
                Voir les prix & le processus <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Visuel — résultat concret */}
          <div className="lg:w-1/2">
            <div className="relative">
              {/* Card principale */}
              <div className="bg-slate-900 rounded-3xl p-8 shadow-2xl">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-6">Résultat typique d'une ouverture</p>

                {/* Before / After simplifié */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-800 rounded-2xl p-4 text-center">
                    <div className="text-4xl mb-3">🧱</div>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-wide mb-2">Avant</p>
                    <p className="text-slate-300 text-sm">Pièces séparées, espace cloisonné, manque de lumière</p>
                  </div>
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 text-center">
                    <div className="text-4xl mb-3">🪟</div>
                    <p className="text-amber-400 text-xs font-bold uppercase tracking-wide mb-2">Après</p>
                    <p className="text-slate-300 text-sm">Espace ouvert, lumière naturelle, valeur du bien augmentée</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { val: '2–5', unit: 'jours', label: 'Durée chantier' },
                    { val: '+15%', unit: '', label: 'Valeur bien' },
                    { val: '10', unit: 'ans', label: 'Garantie' },
                  ].map(({ val, unit, label }) => (
                    <div key={label} className="bg-white/5 rounded-xl p-3 text-center">
                      <p className="text-white font-extrabold text-xl">{val}<span className="text-sm text-slate-400 ml-0.5">{unit}</span></p>
                      <p className="text-slate-500 text-xs mt-1">{label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Badge flottant */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 border border-slate-100 max-w-[180px] hidden md:block">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs font-bold text-slate-500 uppercase">IPB Expertise</span>
                </div>
                <p className="text-sm font-bold text-slate-900">
                  Étude structure incluse dans chaque devis
                </p>
              </div>

              {/* Prix indicatif */}
              <div className="absolute -bottom-4 -left-4 bg-orange-600 rounded-2xl shadow-xl p-4 hidden md:block">
                <p className="text-orange-200 text-xs font-bold uppercase mb-1">Ouverture standard</p>
                <p className="text-white font-extrabold text-lg">4 000 – 10 000 €</p>
                <p className="text-orange-200 text-xs">Étude + travaux + garantie</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
