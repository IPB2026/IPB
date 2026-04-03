import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { Phone, ArrowRight, AlertTriangle, Heart, Baby, Stethoscope, Wind, ChevronRight, Shield, CheckCircle, XCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Moisissures Maison : Risques Santé et Traitement Définitif | Expert Occitanie',
  description: 'Moisissures dans votre maison ? ⚠️ Risques santé : allergies, asthme, infections respiratoires. Causes (humidité, ventilation) et traitement définitif. Expert Toulouse, Montauban, Auch (31-82-32).',
  keywords: ['moisissures maison', 'risques santé moisissures', 'traitement moisissures', 'allergies moisissures', 'ventilation maison'],
  alternates: { canonical: 'https://www.ipb-expertise.fr/moisissures-maison-sante' },
};

const risquesSante = [
  {
    icon: <Stethoscope className="w-8 h-8" />,
    titre: 'Problèmes respiratoires',
    description: 'Toux chronique, essoufflement, crises d\'asthme aggravées. Les spores irritent les voies respiratoires.',
    personnes: 'Tout le monde',
    couleur: 'red',
  },
  {
    icon: <Heart className="w-8 h-8" />,
    titre: 'Allergies',
    description: 'Rhinite, yeux qui piquent, éternuements fréquents. 30% des allergies respiratoires sont liées aux moisissures.',
    personnes: 'Personnes allergiques',
    couleur: 'orange',
  },
  {
    icon: <Baby className="w-8 h-8" />,
    titre: 'Risque accru enfants',
    description: 'Système immunitaire en développement = plus vulnérable. Risque de développer de l\'asthme x2.',
    personnes: 'Enfants < 6 ans',
    couleur: 'purple',
  },
];

const typesMoisissures = [
  { nom: 'Aspergillus', couleur: 'Noir/vert', danger: 'Élevé', lieu: 'Salles d\'eau, cuisines' },
  { nom: 'Cladosporium', couleur: 'Vert olive', danger: 'Modéré', lieu: 'Fenêtres, tissus' },
  { nom: 'Penicillium', couleur: 'Bleu/vert', danger: 'Modéré', lieu: 'Papiers peints, tapis' },
  { nom: 'Stachybotrys', couleur: 'Noir profond', danger: 'Très élevé', lieu: 'Murs humides (grave)' },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Les moisissures dans la maison sont-elles dangereuses pour la santé ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui, les moisissures libèrent des spores toxiques dans l\'air qui causent des problèmes respiratoires (toux chronique, asthme), des allergies (rhinite, yeux irrités) et représentent un risque accru pour les enfants de moins de 6 ans. Selon l\'INSERM, les enfants vivant dans un logement avec moisissures ont 2 fois plus de risque de développer de l\'asthme. 30% des allergies respiratoires sont liées aux moisissures.',
      },
    },
    {
      '@type': 'Question',
      name: 'Comment éliminer définitivement les moisissures d\'une maison ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pour éliminer définitivement les moisissures, il faut traiter la cause de l\'humidité, pas seulement nettoyer. Selon l\'origine : injection de résine hydrophobe pour les remontées capillaires, installation d\'une VMI (Ventilation par Insufflation) pour la condensation, ou cuvelage/réparation pour les infiltrations. Le traitement de l\'humidité est garanti de 10 à 30 ans selon la solution.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quels sont les symptômes d\'une exposition aux moisissures ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Les symptômes courants sont : toux chronique, essoufflement, crises d\'asthme aggravées, rhinite, yeux qui piquent, éternuements fréquents, irritations de la peau. Les personnes les plus vulnérables sont les enfants de moins de 6 ans, les personnes allergiques, les asthmatiques et les personnes immunodéprimées. La moisissure noire Stachybotrys est particulièrement dangereuse car elle libère des mycotoxines.',
      },
    },
    {
      '@type': 'Question',
      name: 'Comment éviter le retour des moisissures après nettoyage ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Les moisissures reviennent systématiquement si la source d\'humidité n\'est pas traitée. Les solutions durables sont : identifier la cause exacte (diagnostic professionnel), traiter l\'humidité à la source (injection, VMI, cuvelage), assurer une ventilation suffisante (10 min d\'aération par jour minimum), et contrôler le taux d\'humidité intérieur (idéalement entre 40 et 60%).',
      },
    },
  ],
};

export default function MoisissuresSantePage() {
  return (
    <div className="font-sans text-slate-800 bg-white antialiased">
      <Script
        id="faq-schema-moisissures-maison-sante"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <TopBar />
      <Navbar />

      {/* Hero - Style Santé/Alerte */}
      <section className="relative bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.4) 0%, transparent 50%)' }}></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <nav className="flex items-center gap-2 text-sm text-emerald-200 mb-8">
            <Link href="/" className="hover:text-white transition">Accueil</Link>
            <ChevronRight size={14} />
            <Link href="/expert-humidite-toulouse-31" className="hover:text-white transition">Expert Humidité</Link>
            <ChevronRight size={14} />
            <span className="text-white">Moisissures & Santé</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-400/30 text-red-300 px-4 py-2 rounded-full text-sm font-bold mb-6 animate-pulse">
                <AlertTriangle size={16} />
                Risque sanitaire avéré
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-[1.1]">
                Moisissures
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                  & Santé
                </span>
              </h1>

              <p className="text-xl text-emerald-100 mb-8 leading-relaxed max-w-xl">
                Les moisissures ne sont pas qu'un problème esthétique. Elles libèrent des 
                <strong className="text-white"> spores toxiques</strong> dans l'air que vous respirez 
                chaque jour. Votre santé et celle de votre famille sont en jeu.
              </p>

              <div className="bg-red-500/20 border border-red-400/40 rounded-2xl p-6 mb-8">
                <div className="flex items-start gap-4">
                  <Heart className="w-8 h-8 text-red-400 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-white mb-2">Étude INSERM 2023</h3>
                    <p className="text-red-100">
                      <strong className="text-white">Les enfants vivant dans un logement avec moisissures ont 
                      2x plus de risque de développer de l'asthme</strong> dans les 5 premières années de vie.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/diagnostic" className="group bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-2xl">
                  Diagnostic sanitaire
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="tel:0582953375" className="bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all">
                  <Phone size={20} />
                  05 82 95 33 75
                </a>
              </div>
            </div>

            {/* Stats santé */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur rounded-3xl p-6 border border-white/20 text-center">
                <div className="text-5xl font-black text-red-400">30%</div>
                <div className="text-emerald-200 text-sm mt-2">des allergies respiratoires liées aux moisissures</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-3xl p-6 border border-white/20 text-center">
                <div className="text-5xl font-black text-orange-400">x2</div>
                <div className="text-emerald-200 text-sm mt-2">risque d'asthme chez l'enfant exposé</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-3xl p-6 border border-white/20 text-center">
                <div className="text-5xl font-black text-yellow-400">40%</div>
                <div className="text-emerald-200 text-sm mt-2">des logements français concernés</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-3xl p-6 border border-white/20 text-center">
                <div className="text-5xl font-black text-emerald-400">95%</div>
                <div className="text-emerald-200 text-sm mt-2">d'efficacité de nos traitements</div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" className="w-full">
            <path d="M0 50L60 45C120 40 240 30 360 35C480 40 600 60 720 65C840 70 960 60 1080 50C1200 40 1320 30 1380 25L1440 20V100H0V50Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Risques santé détaillés */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
              Comprendre les risques
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              Impact sur votre santé
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Les spores de moisissures sont invisibles mais présentes dans l'air. Vous les respirez sans le savoir.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {risquesSante.map((risque, index) => (
              <div key={index} className={`rounded-3xl p-8 ${
                risque.couleur === 'red' ? 'bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-200' :
                risque.couleur === 'orange' ? 'bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200' :
                'bg-gradient-to-br from-purple-50 to-violet-50 border-2 border-purple-200'
              }`}>
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                  risque.couleur === 'red' ? 'bg-red-100 text-red-600' :
                  risque.couleur === 'orange' ? 'bg-orange-100 text-orange-600' :
                  'bg-purple-100 text-purple-600'
                }`}>
                  {risque.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{risque.titre}</h3>
                <p className="text-slate-600 mb-4">{risque.description}</p>
                <div className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${
                  risque.couleur === 'red' ? 'bg-red-100 text-red-700' :
                  risque.couleur === 'orange' ? 'bg-orange-100 text-orange-700' :
                  'bg-purple-100 text-purple-700'
                }`}>
                  {risque.personnes}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Types de moisissures */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              Les types de moisissures
            </h2>
            <p className="text-xl text-slate-600">
              Toutes ne sont pas égales face au danger. Certaines sont particulièrement toxiques.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-4 bg-slate-900 text-white text-sm font-bold">
              <div className="p-4">Type</div>
              <div className="p-4 text-center">Couleur</div>
              <div className="p-4 text-center">Danger</div>
              <div className="p-4">Localisation</div>
            </div>
            {typesMoisissures.map((type, index) => (
              <div key={index} className={`grid grid-cols-4 border-b border-slate-100 ${
                type.danger === 'Très élevé' ? 'bg-red-50' : ''
              }`}>
                <div className="p-4 font-bold text-slate-900">{type.nom}</div>
                <div className="p-4 text-center text-slate-600">{type.couleur}</div>
                <div className="p-4 text-center">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                    type.danger === 'Très élevé' ? 'bg-red-100 text-red-700' :
                    type.danger === 'Élevé' ? 'bg-orange-100 text-orange-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {type.danger}
                  </span>
                </div>
                <div className="p-4 text-slate-600 text-sm">{type.lieu}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-red-50 border border-red-200 rounded-2xl">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-red-900 mb-1">⚠️ Moisissure noire (Stachybotrys)</h4>
                <p className="text-red-800 text-sm">
                  Si vous observez des taches noires profondes et humides, quittez la pièce et appelez un expert immédiatement. 
                  Cette moisissure libère des mycotoxines dangereuses.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block bg-emerald-500/20 text-emerald-300 px-4 py-2 rounded-full text-sm font-bold mb-4">
              Notre approche
            </span>
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              Traiter la cause, pas le symptôme
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Nettoyer les moisissures sans traiter l'humidité = elles reviendront. Notre méthode s'attaque à la source.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-3xl p-8">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-bold mb-3">1. Identifier la source</h3>
              <p className="text-slate-400 mb-4">
                Remontées capillaires ? Condensation ? Infiltration ? Le diagnostic détermine la cause exacte de l'humidité.
              </p>
              <ul className="text-sm text-slate-500 space-y-2">
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-emerald-400" /> Mesure du taux d'humidité</li>
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-emerald-400" /> Localisation des zones touchées</li>
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-emerald-400" /> Identification des moisissures</li>
              </ul>
            </div>

            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-3xl p-8">
              <div className="text-4xl mb-4">💧</div>
              <h3 className="text-xl font-bold mb-3">2. Traiter l'humidité</h3>
              <p className="text-slate-400 mb-4">
                Selon le diagnostic : injection résine (capillaires), VMI (condensation), cuvelage (infiltrations).
              </p>
              <ul className="text-sm text-slate-500 space-y-2">
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-emerald-400" /> Solution adaptée à la cause</li>
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-emerald-400" /> Garantie 10 à 30 ans</li>
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-emerald-400" /> Effet durable</li>
              </ul>
            </div>

            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-3xl p-8">
              <div className="text-4xl mb-4">🌬️</div>
              <h3 className="text-xl font-bold mb-3">3. Assainir l'air</h3>
              <p className="text-slate-400 mb-4">
                Installation VMI si nécessaire pour renouveler l'air et éviter toute récidive de moisissures.
              </p>
              <ul className="text-sm text-slate-500 space-y-2">
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-emerald-400" /> Air filtré et préchauffé</li>
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-emerald-400" /> Taux d'humidité contrôlé</li>
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-emerald-400" /> Confort thermique amélioré</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Articles connexes */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-slate-900 mb-8 text-center">
            Articles connexes
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { href: '/expertise/humidite', icon: '📋', title: 'Guide complet humidité', desc: 'Toutes nos solutions' },
              { href: '/salpetre-mur-traitement', icon: '🧂', title: 'Salpêtre', desc: 'Causes et traitement' },
              { href: '/remontee-capillaire-solution', icon: '💧', title: 'Remontées capillaires', desc: 'Solutions durables' },
              { href: '/expertise/fissures', icon: '🧱', title: 'Problème de fissures ?', desc: 'Diagnostic et agrafage' },
            ].map((item, index) => (
              <Link 
                key={index}
                href={item.href}
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-slate-100"
              >
                <span className="text-4xl mb-4 block">{item.icon}</span>
                <h3 className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-bold mb-6">
            <Heart size={16} />
            Protégez votre famille
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black mb-6">
            Votre santé n'a pas de prix.
          </h2>
          
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Les moisissures ne disparaissent jamais seules. Plus vous attendez, plus les risques augmentent.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/diagnostic" className="group bg-white text-emerald-600 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-emerald-50 flex items-center justify-center gap-3 shadow-2xl transform hover:scale-105 transition-all">
              Diagnostic sanitaire gratuit
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="tel:0582953375" className="bg-white/10 backdrop-blur border border-white/30 hover:bg-white/20 px-8 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3">
              <Phone size={20} />
              05 82 95 33 75
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
