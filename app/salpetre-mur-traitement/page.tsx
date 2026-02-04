import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { Phone, ArrowRight, AlertTriangle, Droplets, ChevronRight, Shield, CheckCircle, XCircle, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Salpêtre Mur : Causes, Dangers et Traitement Injection | Expert Occitanie',
  description: 'Salpêtre (poudre blanche) sur vos murs ? ⚠️ Signe de remontées capillaires. Traitement par injection résine hydrophobe. Garantie 30 ans. Expert Toulouse, Montauban, Auch (31-82-32) ☎ 05 82 95 33 75',
  keywords: ['salpêtre mur', 'poudre blanche mur', 'nitrate potassium', 'traitement salpêtre', 'humidité murs'],
  alternates: { canonical: 'https://www.ipb-expertise.fr/salpetre-mur-traitement' },
};

const faussesSolutions = [
  { solution: 'Brosser le salpêtre', resultat: 'Réapparaît en quelques semaines', efficacite: '0%' },
  { solution: 'Peinture anti-humidité', resultat: 'Cloque et s\'écaille', efficacite: '0%' },
  { solution: 'Enduit "respirant"', resultat: 'Masque temporairement', efficacite: '10%' },
  { solution: 'Produit anti-salpêtre', resultat: 'Effet 3-6 mois max', efficacite: '20%' },
];

export default function SalpetrePage() {
  return (
    <div className="font-sans text-slate-800 bg-white antialiased">
      <TopBar />
      <Navbar />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-amber-900 via-orange-900 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(251, 191, 36, 0.3) 0%, transparent 50%)' }}></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <nav className="flex items-center gap-2 text-sm text-amber-200 mb-8">
            <Link href="/" className="hover:text-white transition">Accueil</Link>
            <ChevronRight size={14} />
            <Link href="/expert-humidite-toulouse-31" className="hover:text-white transition">Expert Humidité</Link>
            <ChevronRight size={14} />
            <span className="text-white">Salpêtre</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/30 text-amber-300 px-4 py-2 rounded-full text-sm font-bold mb-6">
                <AlertTriangle size={16} />
                Signe de remontées capillaires
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-[1.1]">
                Salpêtre
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                  sur vos murs ?
                </span>
              </h1>

              <p className="text-xl text-amber-100 mb-8 leading-relaxed max-w-xl">
                Cette poudre blanche cristalline au pied de vos murs n'est pas de la moisissure : 
                c'est du <strong className="text-white">nitrate de potassium</strong>. Elle révèle un problème 
                d'humidité qui ne se réglera pas tout seul.
              </p>

              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 mb-8 border border-white/20">
                <h3 className="font-bold text-white mb-3">🧪 Qu'est-ce que le salpêtre ?</h3>
                <p className="text-amber-100 text-sm">
                  Le salpêtre (nitrate de potassium KNO₃) se forme quand l'eau chargée en sels minéraux 
                  remonte par capillarité dans le mur. En s'évaporant, l'eau laisse des cristaux blancs à la surface.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/diagnostic" className="group bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-2xl">
                  Diagnostic gratuit
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="tel:0582953375" className="bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all">
                  <Phone size={20} />
                  05 82 95 33 75
                </a>
              </div>
            </div>

            {/* Image Avant/Après */}
            <div className="relative">
              <div className="bg-white/10 backdrop-blur rounded-3xl p-6 border border-white/20">
                <h3 className="text-lg font-bold text-white mb-4 text-center">Avant / Après traitement</h3>
                <div className="relative rounded-2xl overflow-hidden aspect-video bg-slate-800">
                  <Image
                    src="/images/salpetre-avant-apres.webp"
                    alt="Traitement salpêtre avant après - IPB"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-center text-amber-200 text-sm mt-4">
                  Résultat visible en 3 mois • Murs secs en 6-12 mois
                </p>
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

      {/* Ce qui NE marche PAS */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
              Attention aux fausses solutions
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              Ce qui ne fonctionne PAS
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Beaucoup de propriétaires perdent du temps et de l'argent avec des solutions inefficaces.
            </p>
          </div>

          <div className="bg-red-50 rounded-3xl p-8 border-2 border-red-200">
            <div className="space-y-4">
              {faussesSolutions.map((item, index) => (
                <div key={index} className="flex items-center justify-between bg-white rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center gap-4">
                    <XCircle className="w-6 h-6 text-red-500" />
                    <div>
                      <div className="font-bold text-slate-900">{item.solution}</div>
                      <div className="text-sm text-slate-500">{item.resultat}</div>
                    </div>
                  </div>
                  <div className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-bold">
                    {item.efficacite}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-white rounded-2xl border-2 border-green-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                  <div>
                    <div className="font-bold text-slate-900 text-lg">✅ Injection résine hydrophobe</div>
                    <div className="text-slate-600">Traitement de la cause = résultat définitif</div>
                  </div>
                </div>
                <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold">
                  95% • 30 ans
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              Le seul traitement efficace
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Stopper les remontées capillaires = éliminer le salpêtre définitivement
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { num: '01', titre: 'Diagnostic', desc: 'Mesure du taux d\'humidité, localisation des zones touchées', icon: '🔍', duree: '1h30' },
              { num: '02', titre: 'Perçage', desc: 'Forages tous les 12cm à la base du mur', icon: '🔧', duree: '1 jour' },
              { num: '03', titre: 'Injection', desc: 'Résine hydrophobe injectée sous pression', icon: '💧', duree: '1-2 jours' },
              { num: '04', titre: 'Séchage', desc: 'Le mur s\'assèche naturellement, le salpêtre disparaît', icon: '☀️', duree: '3-6 mois' },
            ].map((etape, index) => (
              <div key={index} className="bg-white/5 backdrop-blur border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">{etape.icon}</span>
                  <span className="text-5xl font-black text-white/10">{etape.num}</span>
                </div>
                <h3 className="text-lg font-bold mb-2">{etape.titre}</h3>
                <p className="text-slate-400 text-sm mb-4">{etape.desc}</p>
                <div className="flex items-center gap-2 text-amber-400 text-sm">
                  <Clock size={14} />
                  {etape.duree}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="inline-block bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-3xl p-8 border border-amber-500/30">
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <div className="text-4xl font-black text-amber-400">80-120€</div>
                  <div className="text-slate-400">par mètre linéaire</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-amber-400">30 ans</div>
                  <div className="text-slate-400">de garantie</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-amber-400">95%</div>
                  <div className="text-slate-400">d'efficacité</div>
                </div>
              </div>
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
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { href: '/remontees-capillaires-traitement', icon: '💧', title: 'Remontées capillaires', desc: 'La cause du salpêtre' },
              { href: '/moisissures-maison-sante', icon: '🦠', title: 'Moisissures', desc: 'Risques santé' },
              { href: '/cave-humide-solutions', icon: '🏠', title: 'Cave humide', desc: 'Solutions cuvelage' },
              { href: '/vmi-ventilation-insufflation', icon: '💨', title: 'VMI', desc: 'Ventilation' },
            ].map((item, index) => (
              <Link 
                key={index}
                href={item.href}
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-slate-100"
              >
                <span className="text-4xl mb-4 block">{item.icon}</span>
                <h3 className="font-bold text-slate-900 group-hover:text-amber-600 transition-colors mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-amber-500 to-orange-500 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-6">
            Le salpêtre ne partira pas tout seul.
          </h2>
          <p className="text-xl text-amber-100 mb-8">
            Diagnostic gratuit sous 48h • Traitement garanti 30 ans
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/diagnostic" className="group bg-white text-amber-600 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-amber-50 flex items-center justify-center gap-3 shadow-2xl transform hover:scale-105 transition-all">
              Je veux des murs propres
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
