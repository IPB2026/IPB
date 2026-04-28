import Link from 'next/link';
import { ArrowRight, MapPin, Ruler, Clock, Euro, Hammer, CheckCircle } from 'lucide-react';

const cases = [
  {
    badge: 'Mur porteur',
    badgeBg: 'bg-orange-100 text-orange-700',
    title: 'Transformation d\'un T3 toulousain',
    subtitle: 'Ouverture mur porteur 4 m + création baie vitrée',
    location: 'Toulouse — Saint-Cyprien',
    duration: '5 jours',
    poutre: 'IPN 220 — portée 4,2 m',
    budget: '11 800 € TTC',
    avant: ['Cuisine fermée 9 m², salon 16 m²', 'Mur porteur en briques foraines de 25 cm', 'Lumière limitée à 1 fenêtre côté cour'],
    apres: ['Espace ouvert cuisine + salon de 32 m²', 'Baie vitrée 3,5 m côté terrasse', 'Lumière traversante toute la journée'],
    livrable: 'DOE complet remis à l\'acquéreur (revente du bien à +28 000 € après chantier)',
  },
  {
    badge: 'Fissures structurelles',
    badgeBg: 'bg-amber-100 text-amber-700',
    title: 'Sécurisation maison Catastrophe Naturelle',
    subtitle: 'Agrafage façade + reprise sous-œuvre micropieux',
    location: 'Tournefeuille (31)',
    duration: '8 jours',
    poutre: '14 agrafes inox + 6 micropieux Ø 178 mm',
    budget: '24 600 € TTC (couvert assurance CAT-NAT à 92%)',
    avant: ['Fissure traversante en escalier 12 mm', 'Portes intérieures bloquées', 'Arrêté CAT-NAT sécheresse 2022 reconnu'],
    apres: ['Façade stabilisée et recousue', 'Tassement bloqué (suivi sur 2 cycles été/hiver)', 'Maison à nouveau commercialisable'],
    livrable: 'Rapport opposable transmis à l\'expert d\'assurance — indemnisation finalisée sous 4 mois',
  },
  {
    badge: 'Baie vitrée',
    badgeBg: 'bg-emerald-100 text-emerald-700',
    title: 'Loft des Carmes — investisseur LMNP',
    subtitle: 'Création baie vitrée 3,8 m sur cour intérieure',
    location: 'Toulouse — Carmes',
    duration: '4 jours',
    poutre: 'HEB 200 — descente de charges sur 3 niveaux',
    budget: '14 200 € TTC',
    avant: ['Mur porteur de pierre 60 cm sur cour', 'Logement sombre, peu attractif locatif', 'Loyer marché : 720 €/mois'],
    apres: ['Baie alu 3,8 m × 2,4 m, double vitrage', 'Logement « lumineux et atypique »', 'Loyer marché : 950 €/mois (+32 %)'],
    livrable: 'PV de réception co-signé + photos avant/après pour annonce',
  },
];

export function CaseStudies() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-orange-600 font-semibold text-xs uppercase tracking-[0.2em] mb-4">
            Études de cas — chantiers récents
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Des projets concrets, des résultats mesurables
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Trois exemples de chantiers récents en Occitanie. Pour chacun : la situation initiale, la solution technique, le livrable final.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-10">
          {cases.map((c) => (
            <article key={c.title} className="bg-slate-50 border border-slate-200 rounded-3xl overflow-hidden hover:shadow-xl transition-shadow flex flex-col">
              <div className="p-6 border-b border-slate-200">
                <span className={`inline-block ${c.badgeBg} px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-4`}>
                  {c.badge}
                </span>
                <h3 className="font-display text-xl font-bold text-slate-900 mb-1">{c.title}</h3>
                <p className="text-slate-600 text-sm">{c.subtitle}</p>

                <div className="grid grid-cols-2 gap-3 mt-5 text-xs">
                  <div className="flex items-center gap-2 text-slate-700">
                    <MapPin size={14} className="text-orange-500" />
                    <span>{c.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <Clock size={14} className="text-orange-500" />
                    <span>{c.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <Ruler size={14} className="text-orange-500" />
                    <span className="truncate" title={c.poutre}>{c.poutre}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <Euro size={14} className="text-orange-500" />
                    <span>{c.budget}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 grid grid-cols-2 gap-4 flex-1">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase mb-2">Avant</p>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {c.avant.map((item) => (
                      <li key={item} className="flex items-start gap-1.5">
                        <span className="text-slate-300 mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-bold text-orange-500 uppercase mb-2">Après</p>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {c.apres.map((item) => (
                      <li key={item} className="flex items-start gap-1.5">
                        <CheckCircle size={11} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-orange-50 border-t border-orange-100 p-4">
                <p className="text-xs text-orange-900 leading-snug">
                  <strong className="font-bold">Livrable :</strong> {c.livrable}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/diagnostic"
            className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors shadow-lg"
          >
            Mon projet est-il faisable ? Devis gratuit <ArrowRight size={20} />
          </Link>
          <p className="text-xs text-slate-500 mt-3">
            ✓ Devis sous 24h · ✓ Décennale AXA · ✓ Sans engagement
          </p>
        </div>
      </div>
    </section>
  );
}
