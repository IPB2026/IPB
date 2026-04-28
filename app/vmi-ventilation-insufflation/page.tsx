import { Metadata } from 'next';
import Link from 'next/link';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { Phone, ArrowRight, Wind, ChevronRight, Shield, CheckCircle, XCircle, ThermometerSun, Droplets, Home } from 'lucide-react';

export const metadata: Metadata = {
  title: 'VMI Ventilation Insufflation : Prix, Avis et Installation | Expert Occitanie',
  description: 'VMI (Ventilation Mécanique par Insufflation) : solution anti-condensation et moisissures. Prix 2500-4500€ installée. Avantages vs VMC. Installateur Toulouse, Montauban, Auch (31-82-32).',
  keywords: ['VMI', 'ventilation insufflation', 'anti condensation', 'VMI prix', 'VMI vs VMC'],
  alternates: { canonical: 'https://www.ipb-expertise.fr/vmi-ventilation-insufflation' },
};

const avantagesVMI = [
  { avantage: 'Élimine la condensation', detail: 'L\'air insufflé assèche naturellement les surfaces froides' },
  { avantage: 'Supprime les moisissures', detail: 'En supprimant l\'humidité, vous supprimez leur milieu de vie' },
  { avantage: 'Air filtré', detail: 'Filtration des pollens, particules fines et polluants extérieurs' },
  { avantage: 'Air préchauffé', detail: 'L\'air entre à température ambiante, pas de sensation de froid' },
  { avantage: 'Économies chauffage', detail: 'Jusqu\'à 30% d\'économies en hiver (air sec = air facile à chauffer)' },
  { avantage: 'Installation simple', detail: 'Pas de gaines dans toutes les pièces, juste un point central' },
];

const comparatif = [
  { critere: 'Principe', vmi: 'Insuffle de l\'air neuf (surpression)', vmc: 'Aspire l\'air vicié (dépression)' },
  { critere: 'Condensation', vmi: '✅ Élimine efficacement', vmc: '⚠️ Peut aggraver' },
  { critere: 'Air entrant', vmi: '✅ Filtré et préchauffé', vmc: '❌ Non filtré' },
  { critere: 'Installation', vmi: '✅ Simple (1 point)', vmc: '❌ Complexe (gaines)' },
  { critere: 'Rénovation', vmi: '✅ Idéal', vmc: '⚠️ Travaux importants' },
  { critere: 'Prix installé', vmi: '2 500 - 4 500€', vmc: '3 000 - 8 000€' },
];

export default function VMIPage() {
  return (
    <div className="font-sans text-ipb-text bg-white antialiased">
      <TopBar />
      <Navbar />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-teal-900 via-emerald-900 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(20, 184, 166, 0.4) 0%, transparent 50%)' }}></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <nav className="flex items-center gap-2 text-sm text-teal-200 mb-8">
            <Link href="/" className="hover:text-white transition">Accueil</Link>
            <ChevronRight size={14} />
            <Link href="/expert-humidite-toulouse-31" className="hover:text-white transition">Expert Humidité</Link>
            <ChevronRight size={14} />
            <span className="text-white">VMI</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-teal-500/20 border border-teal-400/30 text-teal-300 px-4 py-2 rounded-full text-sm font-bold mb-6">
                <Wind size={16} />
                Solution anti-condensation
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-[1.1]">
                VMI®
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">
                  Ventilation par Insufflation
                </span>
              </h1>

              <p className="text-xl text-teal-100 mb-8 leading-relaxed max-w-xl">
                La VMI insuffle de l'air filtré et préchauffé dans votre maison, créant une 
                <strong className="text-white"> légère surpression</strong> qui évacue naturellement 
                l'humidité et empêche la condensation. Idéale en rénovation.
              </p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur rounded-2xl p-4 text-center">
                  <div className="text-3xl font-black text-teal-400">-70%</div>
                  <div className="text-xs text-teal-200">condensation</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-2xl p-4 text-center">
                  <div className="text-3xl font-black text-teal-400">-30%</div>
                  <div className="text-xs text-teal-200">chauffage</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-2xl p-4 text-center">
                  <div className="text-3xl font-black text-teal-400">10 ans</div>
                  <div className="text-xs text-teal-200">garantie</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/diagnostic" className="group bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-2xl">
                  Devis VMI gratuit
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="tel:0582953375" className="bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all">
                  <Phone size={20} />
                  05 82 95 33 75
                </a>
              </div>
            </div>

            {/* Schéma fonctionnement */}
            <div className="bg-white/10 backdrop-blur rounded-3xl p-8 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-6 text-center">Comment ça marche ?</h3>
              
              <div className="relative bg-ipb-navy-2/50 rounded-2xl p-6 h-64">
                {/* Maison schématique */}
                <div className="absolute inset-4 border-2 border-teal-400/50 rounded-lg">
                  {/* Toit */}
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-32 h-12 bg-ipb-navy-2/50 rounded-t-lg"></div>
                  
                  {/* VMI au centre */}
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center animate-pulse">
                    <Wind size={24} className="text-white" />
                  </div>
                  
                  {/* Flèches d'air */}
                  <div className="absolute top-20 left-1/2 transform -translate-x-1/2 flex gap-8">
                    <ArrowRight size={20} className="text-teal-400 animate-pulse" style={{ animationDelay: '0.2s' }} />
                    <ArrowRight size={20} className="text-teal-400 rotate-90 animate-pulse" style={{ animationDelay: '0.4s' }} />
                    <ArrowRight size={20} className="text-teal-400 rotate-180 animate-pulse" style={{ animationDelay: '0.6s' }} />
                  </div>
                  
                  {/* Légende */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
                    <div className="text-teal-300 text-sm font-bold">Air filtré + préchauffé</div>
                    <div className="text-ipb-light text-xs">→ Surpression → Évacuation humidité</div>
                  </div>
                </div>
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

      {/* Avantages */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
              Pourquoi la VMI ?
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-ipb-text mb-4">
              6 avantages de la VMI
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {avantagesVMI.map((item, index) => (
              <div key={index} className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-3xl p-6 border border-teal-100 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle size={20} className="text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-ipb-text mb-1">{item.avantage}</h3>
                    <p className="text-ipb-muted text-sm">{item.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparatif VMI vs VMC */}
      <section className="py-20 bg-ipb-cream">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block bg-slate-200 text-ipb-text px-4 py-2 rounded-full text-sm font-bold mb-4">
              Comparatif
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-ipb-text mb-4">
              VMI vs VMC : quelle différence ?
            </h2>
          </div>

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-3 bg-ipb-navy text-white font-bold">
              <div className="p-4">Critère</div>
              <div className="p-4 text-center bg-teal-600">VMI ✓</div>
              <div className="p-4 text-center">VMC</div>
            </div>
            {comparatif.map((row, index) => (
              <div key={index} className="grid grid-cols-3 border-b border-ipb-rule">
                <div className="p-4 font-bold text-ipb-text">{row.critere}</div>
                <div className="p-4 text-center bg-teal-50 text-ipb-text">{row.vmi}</div>
                <div className="p-4 text-center text-ipb-muted">{row.vmc}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-teal-50 border border-teal-200 rounded-2xl">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Home className="w-6 h-6 text-teal-600" />
              </div>
              <div>
                <h4 className="font-bold text-teal-900 mb-1">💡 Idéal en rénovation</h4>
                <p className="text-teal-800 text-sm">
                  Contrairement à la VMC qui nécessite des gaines dans toutes les pièces, la VMI s'installe 
                  en un seul point (combles ou placard technique). Parfait pour les maisons anciennes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prix */}
      <section className="py-20 bg-ipb-navy text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-12">
            Prix VMI installée
          </h2>

          <div className="bg-gradient-to-br from-teal-500/20 to-emerald-500/20 rounded-3xl p-8 md:p-12 border border-teal-500/30">
            <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400 mb-4">
              2 500 - 4 500€
            </div>
            <div className="text-ipb-light mb-8">Fourniture + installation + mise en service</div>

            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="bg-white/5 rounded-2xl p-4">
                <div className="font-bold text-white mb-2">Inclus</div>
                <ul className="text-ipb-light text-sm space-y-1">
                  <li>✓ Centrale VMI</li>
                  <li>✓ Filtres G4 + F7</li>
                  <li>✓ Pose et raccordement</li>
                  <li>✓ Mise en service</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-2xl p-4">
                <div className="font-bold text-white mb-2">Durée</div>
                <ul className="text-ipb-light text-sm space-y-1">
                  <li>• Installation : 1 journée</li>
                  <li>• Effet immédiat</li>
                  <li>• Garantie 10 ans</li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-2xl p-4">
                <div className="font-bold text-white mb-2">Entretien</div>
                <ul className="text-ipb-light text-sm space-y-1">
                  <li>• Filtres : 50-100€/an</li>
                  <li>• Conso élec : ~100€/an</li>
                  <li>• Maintenance minimale</li>
                </ul>
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
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { href: '/condensation-ou-infiltration', icon: '❓', title: 'Condensation ?', desc: 'Comment distinguer' },
              { href: '/moisissures-maison-sante', icon: '🦠', title: 'Moisissures', desc: 'Risques santé' },
              { href: '/ponts-thermiques-condensation', icon: '🌡️', title: 'Ponts thermiques', desc: 'Zones froides' },
              { href: '/remontees-capillaires-traitement', icon: '💧', title: 'Remontées capillaires', desc: 'Autre cause humidité' },
            ].map((item, index) => (
              <Link 
                key={index}
                href={item.href}
                className="group bg-ipb-cream rounded-2xl p-6 hover:bg-teal-50 transition-all hover:-translate-y-1 border border-ipb-rule hover:border-teal-200"
              >
                <span className="text-4xl mb-4 block">{item.icon}</span>
                <h3 className="font-bold text-ipb-text group-hover:text-teal-600 transition-colors mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-ipb-muted">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-emerald-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-6">
            Un air sain.
            <span className="block text-teal-200">Une maison sèche.</span>
          </h2>
          <p className="text-xl text-teal-100 mb-8">
            Devis gratuit • Installation en 1 jour • Garantie 10 ans
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/diagnostic" className="group bg-white text-teal-600 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-teal-50 flex items-center justify-center gap-3 shadow-2xl transform hover:scale-105 transition-all">
              Devis VMI gratuit
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
