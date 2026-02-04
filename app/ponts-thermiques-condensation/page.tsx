import { Metadata } from 'next';
import Link from 'next/link';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { Phone, ArrowRight, ChevronRight, Home, CheckCircle, AlertTriangle, Droplets, Thermometer } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Ponts Thermiques et Condensation : Causes et Solutions | Expert Occitanie',
  description: 'Condensation, moisissures aux angles des murs ? Ponts thermiques = zones froides. Diagnostic et solutions (isolation, VMI). Expert Toulouse, Montauban, Auch (31-82-32).',
  keywords: ['pont thermique', 'condensation mur', 'moisissures angles', 'isolation thermique'],
  alternates: { canonical: 'https://www.ipb-expertise.fr/ponts-thermiques-condensation' },
};

const zonesPontsThermiques = [
  { zone: 'Angles murs-plafond', frequence: '35%', icon: '📐' },
  { zone: 'Contours de fenetres', frequence: '25%', icon: '🪟' },
  { zone: 'Murs donnant sur exterieur', frequence: '20%', icon: '🏠' },
  { zone: 'Dalles de balcon', frequence: '10%', icon: '🏢' },
  { zone: 'Jonction mur-sol', frequence: '10%', icon: '⬇️' },
];

const solutions = [
  {
    titre: 'Isolation par interieur (ITI)',
    description: 'Pose de plaques isolantes sur les murs froids.',
    prix: '50-100 euros/m2',
    efficacite: '70%',
  },
  {
    titre: 'Isolation par exterieur (ITE)',
    description: 'Enveloppe isolante sur la facade. Supprime tous les ponts thermiques.',
    prix: '150-250 euros/m2',
    efficacite: '95%',
  },
  {
    titre: 'VMI (Ventilation)',
    description: 'Renouvelle air et baisse le taux humidite. Reduit la condensation.',
    prix: '2 500-4 500 euros',
    efficacite: '60%',
  },
];

export default function PontsThermiquesPage() {
  return (
    <div className="font-sans text-slate-800 bg-white antialiased">
      <TopBar />
      <Navbar />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-sky-900 via-blue-900 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(14, 165, 233, 0.4) 0%, transparent 50%)' }}></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <nav className="flex items-center gap-2 text-sm text-sky-200 mb-8">
            <Link href="/" className="hover:text-white transition">Accueil</Link>
            <ChevronRight size={14} />
            <Link href="/expert-humidite-toulouse-31" className="hover:text-white transition">Expert Humidite</Link>
            <ChevronRight size={14} />
            <span className="text-white">Ponts thermiques</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-sky-500/20 border border-sky-400/30 text-sky-300 px-4 py-2 rounded-full text-sm font-bold mb-6">
                <Thermometer size={16} />
                Zones froides = condensation
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-[1.1]">
                Ponts
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-400">
                  Thermiques
                </span>
              </h1>

              <p className="text-xl text-sky-100 mb-8 leading-relaxed max-w-xl">
                Un pont thermique est une zone ou isolation est insuffisante ou absente. 
                <strong className="text-white"> En hiver, ces zones sont froides</strong> : humidite de air 
                sy condense, creant moisissures et degradations.
              </p>

              <div className="bg-sky-500/20 border border-sky-400/30 rounded-2xl p-6 mb-8">
                <h3 className="font-bold text-white mb-3">Le phenomene explique</h3>
                <p className="text-sky-100 text-sm">
                  Air chaud de votre maison contient de la vapeur eau. Quand cet air touche une surface froide 
                  (mur mal isole), la vapeur se transforme en gouttelettes : cest la condensation.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/diagnostic" className="group bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-400 hover:to-blue-400 text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-2xl">
                  Diagnostic thermique
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="tel:0582953375" className="bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all">
                  <Phone size={20} />
                  05 82 95 33 75
                </a>
              </div>
            </div>

            {/* Zones frequentes */}
            <div className="bg-white/10 backdrop-blur rounded-3xl p-8 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-6">Ou se trouvent les ponts thermiques ?</h3>
              <div className="space-y-4">
                {zonesPontsThermiques.map((item, index) => (
                  <div key={index} className="flex items-center justify-between bg-white/5 rounded-2xl p-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.icon}</span>
                      <span className="text-white font-medium">{item.zone}</span>
                    </div>
                    <div className="text-xl font-black text-sky-400">{item.frequence}</div>
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

      {/* Symptomes */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block bg-sky-100 text-sky-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
              Reconnaitre le probleme
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              Symptomes dun pont thermique
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { symptome: 'Moisissures aux angles', detail: 'Taches noires dans les coins murs-plafond', icon: '🦠' },
              { symptome: 'Condensation sur vitres', detail: 'Buee persistante sur les fenetres', icon: '💧' },
              { symptome: 'Murs froids au toucher', detail: 'Difference de temperature nette', icon: '❄️' },
              { symptome: 'Papier peint qui se decolle', detail: 'Humidite fait lacher la colle', icon: '📜' },
            ].map((item, index) => (
              <div key={index} className="bg-sky-50 rounded-3xl p-6 border border-sky-100 hover:shadow-lg transition-all">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-slate-900 mb-2">{item.symptome}</h3>
                <p className="text-slate-600 text-sm">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
              Solutions
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              Comment traiter un pont thermique ?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {solutions.map((sol, index) => (
              <div key={index} className={`rounded-3xl p-8 ${
                sol.efficacite === '95%' 
                  ? 'bg-gradient-to-br from-sky-50 to-blue-50 border-2 border-sky-300' 
                  : 'bg-white border border-slate-200'
              }`}>
                {sol.efficacite === '95%' && (
                  <div className="inline-block bg-sky-500 text-white px-3 py-1 rounded-full text-xs font-bold mb-4">
                    SOLUTION OPTIMALE
                  </div>
                )}
                <h3 className="text-xl font-bold text-slate-900 mb-3">{sol.titre}</h3>
                <p className="text-slate-600 text-sm mb-6">{sol.description}</p>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Prix</span>
                    <span className="font-bold text-slate-900">{sol.prix}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Efficacite</span>
                    <span className={`font-bold ${
                      sol.efficacite === '95%' ? 'text-sky-600' : 'text-slate-900'
                    }`}>{sol.efficacite}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-amber-50 border border-amber-200 rounded-2xl">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-amber-900 mb-1">Conseil expert</h4>
                <p className="text-amber-800 text-sm">
                  La VMI seule peut suffire si le pont thermique est leger. Elle coute moins cher 
                  quune isolation et reduit la condensation de 60-70%.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles connexes */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-slate-900 mb-8 text-center">
            Articles connexes
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { href: '/vmi-ventilation-insufflation', icon: '💨', title: 'VMI', desc: 'Solution anti-condensation' },
              { href: '/condensation-ou-infiltration', icon: '❓', title: 'Condensation ?', desc: 'Comment distinguer' },
              { href: '/moisissures-maison-sante', icon: '🦠', title: 'Moisissures', desc: 'Risques sante' },
              { href: '/remontees-capillaires-traitement', icon: '💧', title: 'Remontees capillaires', desc: 'Autre cause humidite' },
            ].map((item, index) => (
              <Link 
                key={index}
                href={item.href}
                className="group bg-slate-50 rounded-2xl p-6 hover:bg-sky-50 transition-all hover:-translate-y-1 border border-slate-100 hover:border-sky-200"
              >
                <span className="text-4xl mb-4 block">{item.icon}</span>
                <h3 className="font-bold text-slate-900 group-hover:text-sky-600 transition-colors mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-sky-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-6">
            Froid aux murs ?
            <span className="block text-sky-200">On identifie les ponts thermiques.</span>
          </h2>
          <p className="text-xl text-sky-100 mb-8">
            Diagnostic thermique - Solution adaptee (VMI ou isolation) - Devis gratuit
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/diagnostic" className="group bg-white text-sky-600 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-sky-50 flex items-center justify-center gap-3 shadow-2xl transform hover:scale-105 transition-all">
              Diagnostic thermique
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
