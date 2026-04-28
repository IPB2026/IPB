import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin, Clock, Euro, CheckCircle } from 'lucide-react';

const cases = [
  {
    badge: 'Mur porteur + baie vitrée',
    badgeBg: 'bg-orange-500',
    image: '/images/etude-cas-baie-vitree-1.webp',
    imageAlt: 'Avant/après : ouverture mur porteur 4 mètres dans un T3 toulousain à Saint-Cyprien',
    title: 'T3 toulousain, cuisine ouverte sur séjour',
    subtitle: 'Mur porteur de 4 m abattu, baie vitrée posée',
    location: 'Toulouse — Saint-Cyprien',
    duration: '5 jours',
    budget: '11 800 € TTC',
    summary: 'Avant : cuisine fermée 9 m², salon sombre 16 m². Après : un seul espace lumineux de 32 m² avec baie vitrée 3,5 m sur la terrasse.',
    result: 'Bien revendu à +28 000 € après chantier.',
  },
  {
    badge: 'Création baie vitrée',
    badgeBg: 'bg-amber-500',
    image: '/images/etude-cas-baie-vitree-2.webp',
    imageAlt: 'Création baie vitrée panoramique sur jardin — chantier IPB Toulouse',
    title: 'Maison de plain-pied, baie sur jardin',
    subtitle: 'Mur de pierre 60 cm, ouverture 3,8 m',
    location: 'Toulouse — Carmes',
    duration: '4 jours',
    budget: '14 200 € TTC',
    summary: 'Mur en pierre épais à ouvrir sur cour intérieure. Pose d\'une poutre de 4,8 m. Logement transformé : « lumineux et atypique », loyer +32 %.',
    result: 'Loyer mensuel passé de 720 € à 950 €.',
  },
  {
    badge: 'Sécurisation fissures',
    badgeBg: 'bg-emerald-500',
    image: '/images/etude-cas-baie-vitree-3.webp',
    imageAlt: 'Maison sinistrée sécheresse 2022 réparée par agrafage et micropieux — IPB Tournefeuille',
    title: 'Maison sinistrée par la sécheresse',
    subtitle: 'Agrafage façade + reprise des fondations',
    location: 'Tournefeuille (31)',
    duration: '8 jours',
    budget: '24 600 € TTC',
    summary: 'Fissure traversante de 12 mm en escalier, portes bloquées. Maison reconnue catastrophe naturelle 2022 — 92 % du chantier pris en charge par l\'assurance.',
    result: 'Tassement bloqué, maison à nouveau commercialisable.',
  },
];

export function CaseStudies() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-orange-600 font-semibold text-xs uppercase tracking-[0.2em] mb-4">
            Chantiers récents
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            Trois maisons. Trois transformations.
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Pas des « cas d'école » théoriques — des vrais chantiers, avec des vraies adresses et des budgets réels.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {cases.map((c) => (
            <article
              key={c.title}
              className="group bg-white border border-slate-200 rounded-3xl overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {/* Photo en haut avec badge */}
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <Image
                  src={c.image}
                  alt={c.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
                <span className={`absolute top-4 left-4 ${c.badgeBg} text-white px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg`}>
                  {c.badge}
                </span>
              </div>

              {/* Contenu */}
              <div className="p-6 md:p-7 flex-1 flex flex-col">
                <h3 className="font-display text-xl md:text-2xl font-bold text-slate-900 mb-2 leading-tight">
                  {c.title}
                </h3>
                <p className="text-slate-500 text-sm mb-5">{c.subtitle}</p>

                {/* Métadonnées chantier */}
                <div className="grid grid-cols-3 gap-2 mb-5 pb-5 border-b border-slate-100">
                  <div className="flex flex-col items-start">
                    <MapPin size={14} className="text-orange-500 mb-1" />
                    <span className="text-[11px] text-slate-400 uppercase tracking-wide">Lieu</span>
                    <span className="text-xs font-semibold text-slate-700 leading-tight">{c.location.split(' — ')[1] || c.location}</span>
                  </div>
                  <div className="flex flex-col items-start">
                    <Clock size={14} className="text-orange-500 mb-1" />
                    <span className="text-[11px] text-slate-400 uppercase tracking-wide">Durée</span>
                    <span className="text-xs font-semibold text-slate-700">{c.duration}</span>
                  </div>
                  <div className="flex flex-col items-start">
                    <Euro size={14} className="text-orange-500 mb-1" />
                    <span className="text-[11px] text-slate-400 uppercase tracking-wide">Budget</span>
                    <span className="text-xs font-semibold text-slate-700 leading-tight">{c.budget}</span>
                  </div>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-1">{c.summary}</p>

                {/* Résultat — punchline */}
                <div className="bg-orange-50 border-l-4 border-orange-500 px-4 py-3 rounded-r-lg">
                  <p className="text-orange-900 text-sm font-semibold leading-snug flex items-start gap-2">
                    <CheckCircle size={16} className="text-orange-500 mt-0.5 flex-shrink-0" />
                    {c.result}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/diagnostic"
            className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:shadow-2xl hover:-translate-y-0.5"
          >
            Mon projet est-il faisable ? Devis gratuit
            <ArrowRight size={20} />
          </Link>
          <p className="text-xs text-slate-500 mt-3">
            Réponse d'un expert sous 24h · Garantie 10 ans · Sans engagement
          </p>
        </div>
      </div>
    </section>
  );
}
