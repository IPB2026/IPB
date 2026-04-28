import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { SmartBackBar } from "@/components/ui/SmartBackBar";
import { Footer } from '@/components/home/Footer';
import { Phone, ArrowRight, AlertTriangle, Home, ChevronRight, Shield, CheckCircle, Clock, TrendingDown, Layers } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Fissure Fondation Maison : Causes et Solutions Durables | Expert Occitanie',
  description: 'Fissures dues aux fondations ? Causes (tassement, sol argileux, RGA). Comparatif solutions : agrafage (8-15k€) vs micropieux (25-50k€). Expert fondations Toulouse, Montauban, Auch (31-82-32).',
  keywords: ['fissure fondation', 'tassement fondation', 'reprise en sous-oeuvre', 'micropieux', 'agrafage fissures'],
  alternates: { canonical: 'https://www.ipb-expertise.fr/fissure-fondation-maison' },
};

const causesFondation = [
  {
    icon: <TrendingDown className="w-8 h-8" />,
    titre: 'Tassement différentiel',
    description: 'Une partie de la fondation s\'enfonce plus que l\'autre. Cause principale des fissures en escalier.',
    frequence: '60%',
  },
  {
    icon: <Layers className="w-8 h-8" />,
    titre: 'Sol argileux (RGA)',
    description: 'Les argiles gonflent et se rétractent selon l\'humidité. Phénomène amplifié par les sécheresses.',
    frequence: '85%',
  },
  {
    icon: <Home className="w-8 h-8" />,
    titre: 'Fondations sous-dimensionnées',
    description: 'Fréquent dans les maisons des années 60-80. Semelles trop étroites ou pas assez profondes.',
    frequence: '40%',
  },
];

const comparatifSolutions = [
  {
    solution: 'Agrafage structurel',
    prix: '8 000 - 18 000€',
    delai: '3-5 jours',
    garantie: '10 ans',
    adapte: '85% des cas',
    avantages: ['Adapté au bâti courant', 'Intervention rapide', 'Pas de terrassement lourd'],
    recommande: true,
  },
  {
    solution: 'Micropieux',
    prix: '25 000 - 50 000€',
    delai: '2-3 semaines',
    garantie: '10 ans',
    adapte: 'Cas graves',
    avantages: ['Ancrage profond (10-15m)', 'Cas extrêmes', 'Bâtiments lourds'],
    recommande: false,
  },
  {
    solution: 'Résine expansive',
    prix: '5 000 - 15 000€',
    delai: '1-2 jours',
    garantie: '10 ans',
    adapte: 'Tassements légers',
    avantages: ['Moins invasif', 'Rapide', 'Sols compatibles'],
    recommande: false,
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Comment savoir si les fissures de ma maison viennent des fondations ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Les fissures de fondation se reconnaissent par leur forme en escalier (suivant les joints de maçonnerie), leur présence sur plusieurs murs, des portes et fenêtres qui coincent, et une évolution progressive. En Occitanie, 85% des cas sont liés au sol argileux (retrait-gonflement des argiles). Un diagnostic professionnel permet de confirmer l\'origine.',
      },
    },
    {
      '@type': 'Question',
      name: 'Combien coûte la réparation de fondations fissurées ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Le coût dépend de la solution : l\'agrafage structurel coûte entre 8 000 et 18 000€ et convient à 85% des cas. Les micropieux reviennent entre 25 000 et 50 000€ pour les cas graves. La résine expansive coûte entre 5 000 et 15 000€ pour les tassements légers. Toutes ces solutions sont couvertes par une garantie décennale de 10 ans.',
      },
    },
    {
      '@type': 'Question',
      name: 'L\'agrafage structurel est-il efficace pour les fissures de fondation ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui, l\'agrafage structurel est la solution recommandée pour 85% des cas de fissures de fondation. Il est 3 fois moins cher que les micropieux, l\'intervention est rapide (3 à 5 jours), ne nécessite pas de terrassement lourd et bénéficie d\'une garantie décennale de 10 ans. Il est particulièrement adapté aux maisons individuelles en Occitanie.',
      },
    },
    {
      '@type': 'Question',
      name: 'Les fissures de fondation s\'aggravent-elles avec le temps ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui, une fissure de fondation s\'aggrave en moyenne de 15% par an sans traitement. Ce qui coûte 8 000€ aujourd\'hui peut en coûter 25 000€ dans 3 ans. Les cycles de sécheresse et de pluie en Occitanie accélèrent le phénomène de retrait-gonflement des argiles, aggravant les mouvements de fondation.',
      },
    },
  ],
};

export default function FissureFondationPage() {
  return (
    <div className="font-sans text-ipb-text bg-white antialiased">
      <Script
        id="faq-schema-fissure-fondation-maison"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <TopBar />
      <Navbar />
      <SmartBackBar />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-orange-950/40 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(45deg, transparent 45%, rgba(255,255,255,0.03) 45%, rgba(255,255,255,0.03) 55%, transparent 55%)', backgroundSize: '20px 20px' }}></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-8">
            <Link href="/" className="hover:text-white transition">Accueil</Link>
            <ChevronRight size={14} />
            <Link href="/expert-fissures-toulouse-31" className="hover:text-white transition">Expert Fissures</Link>
            <ChevronRight size={14} />
            <span className="text-white">Fondations</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-ipb-orange/20 border border-orange-400/30 text-ipb-orange-l px-4 py-2 rounded-full text-sm font-bold mb-6">
                <Home size={16} />
                Problème structurel majeur
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-[1.1]">
                Fissures de
                <span className="block text-transparent bg-clip-text bg-ipb-orange">
                  Fondation
                </span>
              </h1>

              <p className="text-xl text-white/70 mb-8 leading-relaxed max-w-xl">
                Quand les fissures viennent des fondations, c'est que le bâtiment bouge. 
                En <strong className="text-white">Occitanie (31, 82, 32)</strong>, 85% des cas sont liés au sol argileux. 
                L'agrafage structurel est la solution adaptée dans la majorité des cas de fissures sur bâti courant.
              </p>

              <div className="bg-red-500/20 border border-red-400/40 rounded-2xl p-6 mb-8">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-8 h-8 text-red-400 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-white mb-2">Pourquoi ne pas attendre ?</h3>
                    <p className="text-red-100">
                      Une fissure de fondation <strong className="text-white">s'aggrave de 15% par an</strong> en moyenne. 
                      Ce qui coûte 8 000€ aujourd'hui peut en coûter 25 000€ dans 3 ans.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/diagnostic" className="group bg-ipb-orange hover:bg-[#b35519] text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-2xl">
                  Diagnostic fondations
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="tel:0582953375" className="bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all">
                  <Phone size={20} />
                  05 82 95 33 75
                </a>
              </div>
            </div>

            {/* Stats impact */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur rounded-3xl p-6 border border-white/20 text-center">
                <div className="text-5xl font-black text-ipb-orange-l">85%</div>
                <div className="text-white/70 text-sm mt-2">des cas liés au sol argileux en Occitanie</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-3xl p-6 border border-white/20 text-center">
                <div className="text-5xl font-black text-green-400">-65%</div>
                <div className="text-white/70 text-sm mt-2">coût agrafage vs micropieux</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-3xl p-6 border border-white/20 text-center">
                <div className="text-5xl font-black text-red-400">+15%</div>
                <div className="text-white/70 text-sm mt-2">aggravation par an sans traitement</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-3xl p-6 border border-white/20 text-center">
                <div className="text-5xl font-black text-cyan-400">10 ans</div>
                <div className="text-white/70 text-sm mt-2">garantie décennale</div>
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

      {/* Causes */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block bg-ipb-stone text-ipb-orange px-4 py-2 rounded-full text-sm font-bold mb-4">
              Comprendre le problème
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-ipb-text mb-4">
              Pourquoi vos fondations bougent ?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {causesFondation.map((cause, index) => (
              <div key={index} className="bg-gradient-to-br from-slate-50 to-orange-50 rounded-3xl p-8 border border-ipb-rule hover:shadow-xl transition-all">
                <div className="w-16 h-16 bg-ipb-stone rounded-2xl flex items-center justify-center text-ipb-orange mb-6">
                  {cause.icon}
                </div>
                <h3 className="text-xl font-bold text-ipb-text mb-3">{cause.titre}</h3>
                <p className="text-ipb-muted mb-4">{cause.description}</p>
                <div className="inline-block bg-ipb-stone text-ipb-orange px-4 py-2 rounded-full text-sm font-bold">
                  {cause.frequence} des cas
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparatif solutions */}
      <section className="py-20 bg-ipb-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block bg-green-500/20 text-green-300 px-4 py-2 rounded-full text-sm font-bold mb-4">
              Comparatif
            </span>
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              Quelle solution pour vos fondations ?
            </h2>
            <p className="text-xl text-ipb-light">
              L'agrafage convient à 85% des cas. Les micropieux sont réservés aux situations extrêmes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {comparatifSolutions.map((sol, index) => (
              <div 
                key={index} 
                className={`rounded-3xl p-8 ${
                  sol.recommande 
                    ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-2 border-green-500/50' 
                    : 'bg-white/5 border border-white/10'
                }`}
              >
                {sol.recommande && (
                  <div className="inline-block bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold mb-4">
                    ✓ RECOMMANDÉ
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-4">{sol.solution}</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-ipb-light">Prix</span>
                    <span className="font-bold text-xl">{sol.prix}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-ipb-light">Délai</span>
                    <span className="font-bold">{sol.delai}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-ipb-light">Garantie</span>
                    <span className="font-bold">{sol.garantie}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-ipb-light">Adapté pour</span>
                    <span className="font-bold text-ipb-orange-l">{sol.adapte}</span>
                  </div>
                </div>

                <ul className="space-y-2">
                  {sol.avantages.map((av, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-white/70">
                      <CheckCircle size={16} className={sol.recommande ? 'text-green-400' : 'text-ipb-muted'} />
                      {av}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-amber-500/20 border border-amber-500/30 rounded-2xl">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-amber-300 mb-1">📝 Note importante</h4>
                <p className="text-amber-100 text-sm">
                  IPB ne réalise pas les micropieux (nous ne sommes pas équipés pour cette intervention lourde). 
                  Nous vous orientons vers des partenaires qualifiés si votre cas l'exige. Notre spécialité : l'agrafage structurel.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles connexes */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-ipb-text mb-8 text-center">
            Articles connexes
          </h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { href: '/fissure-en-escalier-causes', icon: '🪜', title: 'Fissure en escalier', desc: 'Tassement différentiel' },
              { href: '/fissure-horizontale-danger', icon: '➖', title: 'Fissure horizontale', desc: 'Danger structurel' },
              { href: '/microfissure-quand-sinquieter', icon: '🔍', title: 'Microfissure', desc: 'Quand s\'inquiéter ?' },
              { href: '/fissure-secheresse-indemnisation', icon: '☀️', title: 'Fissure sécheresse', desc: 'Indemnisation CAT-NAT' },
              { href: '/expertise/fissures', icon: '📋', title: 'Guide complet fissures', desc: 'Tout savoir sur nos solutions' },
              { href: '/expertise/humidite', icon: '💧', title: 'Problème d\'humidité ?', desc: 'Nos solutions humidité' },
            ].map((item, index) => (
              <Link 
                key={index}
                href={item.href}
                className="group bg-ipb-cream rounded-2xl p-6 hover:bg-ipb-stone transition-all hover:-translate-y-1 border border-ipb-rule hover:border-ipb-rule"
              >
                <span className="text-4xl mb-4 block">{item.icon}</span>
                <h3 className="font-bold text-ipb-text group-hover:text-ipb-orange transition-colors mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-ipb-muted">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-ipb-orange text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-6">
            Vos fondations méritent un expert.
          </h2>
          <p className="text-xl text-ipb-orange-l mb-8">
            Diagnostic expert sur site (déduit à 100% des travaux) • Devis gratuit • Garantie décennale
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/diagnostic" className="group bg-white text-ipb-orange px-10 py-5 rounded-2xl font-bold text-lg hover:bg-ipb-stone flex items-center justify-center gap-3 shadow-2xl transform hover:scale-105 transition-all">
              Diagnostic fondations
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
