import { Metadata } from 'next';
import Link from 'next/link';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { SmartBackBar } from "@/components/ui/SmartBackBar";
import { Footer } from '@/components/home/Footer';
import { Phone, ArrowRight, AlertTriangle, Home, ChevronRight, Shield, CheckCircle, Droplets, Wind } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cave Humide : Cuvelage, Drainage et Solutions | Prix Occitanie (31-82-32)',
  description: 'Cave humide ou sous-sol inondé ? Causes (infiltrations, nappe, condensation). Solutions : cuvelage (200-400€/m²), drainage, VMI. Diagnostic gratuit Toulouse, Montauban, Auch.',
  keywords: ['cave humide', 'cuvelage cave', 'drainage sous-sol', 'infiltration cave', 'étanchéité sous-sol'],
  alternates: { canonical: 'https://www.ipb-expertise.fr/cave-humide-solutions' },
};

const solutions = [
  {
    titre: 'Cuvelage',
    description: 'Revêtement étanche appliqué sur les parois. Résiste à la pression de l\'eau.',
    prix: '150-250€/m²',
    adapte: 'Infiltrations latérales',
    garantie: '10 ans',
    icon: '🛡️',
    couleur: 'blue',
  },
  {
    titre: 'Drainage périphérique',
    description: 'Tranchée drainante autour des fondations. Évacue l\'eau avant qu\'elle n\'entre.',
    prix: '150-300€/ml',
    adapte: 'Nappe phréatique haute',
    garantie: '20 ans',
    icon: '🚰',
    couleur: 'cyan',
  },
  {
    titre: 'Pompe de relevage',
    description: 'Évacue l\'eau qui s\'accumule dans un puisard. Solution complémentaire.',
    prix: '800-2000€',
    adapte: 'Inondations récurrentes',
    garantie: '5 ans',
    icon: '⬆️',
    couleur: 'teal',
  },
  {
    titre: 'VMI',
    description: 'Ventilation par insufflation. Élimine la condensation et l\'humidité ambiante.',
    prix: '2500-4500€',
    adapte: 'Condensation',
    garantie: '10 ans',
    icon: '💨',
    couleur: 'emerald',
  },
];

const causesCave = [
  { cause: 'Infiltrations latérales', frequence: '45%', signe: 'Eau qui suinte des murs' },
  { cause: 'Remontées par le sol', frequence: '25%', signe: 'Sol toujours humide' },
  { cause: 'Condensation', frequence: '20%', signe: 'Buée, moisissures' },
  { cause: 'Nappe phréatique', frequence: '10%', signe: 'Inondation saisonnière' },
];

export default function CaveHumidePage() {
  return (
    <div className="font-sans text-ipb-text bg-white antialiased">
      <TopBar />
      <Navbar />
      <SmartBackBar />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-cyan-950 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 30% 70%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)' }}></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <nav className="flex items-center gap-2 text-sm text-cyan-200 mb-8">
            <Link href="/" className="hover:text-white transition">Accueil</Link>
            <ChevronRight size={14} />
            <Link href="/expert-humidite-toulouse-31" className="hover:text-white transition">Expert Humidité</Link>
            <ChevronRight size={14} />
            <span className="text-white">Cave humide</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 px-4 py-2 rounded-full text-sm font-bold mb-6">
                <Home size={16} />
                Sous-sols et caves
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-[1.1]">
                Cave
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                  Humide ?
                </span>
              </h1>

              <p className="text-xl text-cyan-100 mb-8 leading-relaxed max-w-xl">
                <strong className="text-white">70% des caves en Occitanie</strong> présentent des problèmes d'humidité. 
                Infiltrations, remontées, condensation : chaque cause a sa solution. 
                Le cuvelage est la plus efficace pour les espaces enterrés.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur rounded-2xl p-4 text-center">
                  <div className="text-3xl font-black text-cyan-400">70%</div>
                  <div className="text-xs text-cyan-200">des caves concernées</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-2xl p-4 text-center">
                  <div className="text-3xl font-black text-cyan-400">10 ans</div>
                  <div className="text-xs text-cyan-200">garantie cuvelage</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/diagnostic" className="group bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-2xl">
                  Diagnostic cave gratuit
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="tel:0582953375" className="bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all">
                  <Phone size={20} />
                  05 82 95 33 75
                </a>
              </div>
            </div>

            {/* Causes fréquentes */}
            <div className="bg-white/10 backdrop-blur rounded-3xl p-8 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-6">Quelle est la cause ?</h3>
              <div className="space-y-4">
                {causesCave.map((item, index) => (
                  <div key={index} className="flex items-center justify-between bg-white/5 rounded-2xl p-4">
                    <div>
                      <div className="font-bold text-white">{item.cause}</div>
                      <div className="text-cyan-300 text-sm">{item.signe}</div>
                    </div>
                    <div className="text-2xl font-black text-cyan-400">{item.frequence}</div>
                  </div>
                ))}
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

      {/* Solutions */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block bg-cyan-100 text-cyan-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
              Nos solutions
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-ipb-text mb-4">
              4 solutions selon votre problème
            </h2>
            <p className="text-xl text-ipb-muted max-w-2xl mx-auto">
              Le diagnostic détermine la cause exacte et la solution adaptée.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {solutions.map((sol, index) => (
              <div 
                key={index}
                className={`rounded-3xl p-6 border-2 hover:shadow-xl transition-all ${
                  sol.couleur === 'blue' ? 'bg-blue-50 border-blue-200 hover:border-blue-400' :
                  sol.couleur === 'cyan' ? 'bg-cyan-50 border-cyan-200 hover:border-cyan-400' :
                  sol.couleur === 'teal' ? 'bg-teal-50 border-teal-200 hover:border-teal-400' :
                  'bg-emerald-50 border-emerald-200 hover:border-emerald-400'
                }`}
              >
                <div className="text-5xl mb-4">{sol.icon}</div>
                <h3 className="text-xl font-bold text-ipb-text mb-2">{sol.titre}</h3>
                <p className="text-ipb-muted text-sm mb-4">{sol.description}</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-ipb-muted">Prix</span>
                    <span className="font-bold text-ipb-text">{sol.prix}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ipb-muted">Adapté pour</span>
                    <span className="font-bold text-ipb-text">{sol.adapte}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ipb-muted">Garantie</span>
                    <span className="font-bold text-cyan-600">{sol.garantie}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Focus Cuvelage */}
      <section className="py-20 bg-ipb-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-cyan-500/20 text-cyan-300 px-4 py-2 rounded-full text-sm font-bold mb-6">
                Solution principale
              </span>
              <h2 className="text-3xl md:text-4xl font-black mb-6">
                Le cuvelage : l'étanchéité totale
              </h2>
              <p className="text-white/70 text-lg mb-6">
                Le cuvelage consiste à appliquer un revêtement étanche (mortier hydrofuge ou résine époxy) 
                sur toutes les parois de la cave. Il résiste à la pression de l'eau et transforme 
                votre cave humide en espace sain et utilisable.
              </p>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-cyan-400 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-white">Préparation du support</strong>
                    <p className="text-ipb-light text-sm">Nettoyage, traitement des fissures, application d'un primaire</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-cyan-400 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-white">Application multicouche</strong>
                    <p className="text-ipb-light text-sm">2 à 3 couches de mortier ou résine selon le support</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-cyan-400 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-white">Résistance à la pression</strong>
                    <p className="text-ipb-light text-sm">Jusqu'à 7 bars de pression d'eau (équivalent 70m de profondeur)</p>
                  </div>
                </li>
              </ul>

              <div className="bg-cyan-500/20 rounded-2xl p-6 border border-cyan-500/30">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-cyan-300 font-bold">PRIX CUVELAGE</div>
                    <div className="text-4xl font-black text-white">150-250€<span className="text-lg text-ipb-light">/m²</span></div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-cyan-300 font-bold">GARANTIE</div>
                    <div className="text-4xl font-black text-cyan-400">10 ans</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-3xl p-8 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-6">Quand choisir le cuvelage ?</h3>
              <ul className="space-y-4">
                {[
                  'Infiltrations d\'eau à travers les murs',
                  'Cave régulièrement inondée',
                  'Pression d\'eau latérale (nappe)',
                  'Projet d\'aménagement du sous-sol',
                  'Cave avec salpêtre persistant',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/70">
                    <CheckCircle size={18} className="text-cyan-400" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 p-4 bg-amber-500/20 rounded-xl border border-amber-500/30">
                <div className="flex items-start gap-3">
                  <AlertTriangle size={18} className="text-amber-400 flex-shrink-0 mt-1" />
                  <p className="text-amber-200 text-sm">
                    Le cuvelage ne convient pas si le problème vient uniquement de la condensation. 
                    Dans ce cas, la VMI est plus adaptée.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles connexes */}
      <section className="py-20 bg-ipb-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-ipb-text mb-8 text-center">
            Articles connexes
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { href: '/remontees-capillaires-traitement', icon: '💧', title: 'Remontées capillaires', desc: 'Injection résine' },
              { href: '/moisissures-maison-sante', icon: '🦠', title: 'Moisissures', desc: 'Risques santé' },
              { href: '/vmi-ventilation-insufflation', icon: '💨', title: 'VMI', desc: 'Ventilation' },
              { href: '/condensation-ou-infiltration', icon: '❓', title: 'Condensation ?', desc: 'Comment distinguer' },
            ].map((item, index) => (
              <Link 
                key={index}
                href={item.href}
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-ipb-rule"
              >
                <span className="text-4xl mb-4 block">{item.icon}</span>
                <h3 className="font-bold text-ipb-text group-hover:text-cyan-600 transition-colors mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-ipb-muted">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-6">
            Transformez votre cave humide
            <span className="block text-cyan-200">en espace sain.</span>
          </h2>
          <p className="text-xl text-cyan-100 mb-8">
            Diagnostic gratuit • Devis personnalisé • Garantie décennale
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/diagnostic" className="group bg-white text-cyan-600 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-cyan-50 flex items-center justify-center gap-3 shadow-2xl transform hover:scale-105 transition-all">
              Diagnostic cave gratuit
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
