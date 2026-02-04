import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { FaqSection } from '@/components/ui/FaqSection';
import { InternalLinks } from '@/components/seo/InternalLinks';
import { Testimonials } from '@/components/home/Testimonials';
import { humidityFaq } from '@/app/data/faqs';
import Link from 'next/link';
import Image from 'next/image';
import { Droplets, AlertTriangle, CheckCircle, ArrowRight, Shield, Phone, Clock, Star, Home, Wind, Award } from 'lucide-react';
import Script from 'next/script';

export const metadata = {
  title: 'Expert Humidité Toulouse | Injection Résine Garantie 30 ans | IPB',
  description: 'Murs humides, salpêtre, moisissures ? Solutions complètes : injection résine, cuvelage, drainage, ventilation (VMC/VMI), traitement condensation. Garantie 30 ans. Diagnostic 149€. ☎ 05 82 95 33 75. Intervention 48h.',
  keywords: [
    'expert humidité toulouse',
    'traitement humidité murs',
    'remontées capillaires toulouse',
    'injection résine hydrophobe',
    'salpêtre traitement',
    'moisissures maison',
    'cuvelage cave toulouse',
    'VMI ventilation',
    'humidité ascensionnelle',
    'assèchement murs',
    'peinture qui cloque',
    'diagnostic humidité prix',
  ],
  alternates: {
    canonical: 'https://www.ipb-expertise.fr/expertise/humidite',
  },
  openGraph: {
    title: 'Expert Humidité Toulouse | Solutions complètes | IPB',
    description: 'Injection résine, cuvelage, ventilation, drainage, traitement condensation. Diagnostic 48h.',
    url: 'https://www.ipb-expertise.fr/expertise/humidite',
    siteName: 'IPB - Institut de Pathologie du Bâtiment',
    locale: 'fr_FR',
    type: 'website',
    images: [{ url: '/images/salpetre-avant-apres.webp', width: 1200, height: 630, alt: 'Expert Humidité Toulouse - Injection Résine - IPB' }],
  },
};

// JSON-LD schemas
const generateFaqJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": humidityFaq.map((item) => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": { "@type": "Answer", "text": item.answer }
  }))
});

const generateServiceJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Traitement de l'humidité",
  "provider": {
    "@type": "LocalBusiness",
    "name": "IPB - Institut de Pathologie du Bâtiment",
    "telephone": "+33582953375",
    "address": { "@type": "PostalAddress", "addressLocality": "Toulouse", "addressRegion": "Haute-Garonne", "postalCode": "31000", "addressCountry": "FR" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "14" }
  },
  "areaServed": { "@type": "City", "name": "Toulouse" },
  "description": "Expert en traitement de l'humidité. Injection résine hydrophobe, cuvelage, VMI. Solution définitive contre remontées capillaires avec garantie 30 ans."
});

export default function HumiditePage() {
  return (
    <div className="font-sans text-slate-800 bg-slate-50 antialiased">
      <Script id="faq-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFaqJsonLd()) }} />
      <Script id="service-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateServiceJsonLd()) }} />
      
      <TopBar />
      <Navbar />
      <main id="main-content">
      
      {/* HERO - Conversion optimisée */}
      <section className="relative bg-slate-900 text-white overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950/80"></div>
        <Image
          src="/images/salpetre-avant-apres.webp"
          alt="Mur avec salpêtre avant traitement"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          className="opacity-20"
          priority
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Badge confiance */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/40 text-green-300 px-3 py-1.5 rounded-full text-xs font-bold">
                  <Star size={12} className="fill-current" /> 4.9/5 sur Google
                </span>
                <span className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/40 text-blue-300 px-3 py-1.5 rounded-full text-xs font-bold">
                  <Shield size={12} /> Garantie 30 ans
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
                Murs <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Humides</span> ?
                <span className="block text-3xl md:text-4xl mt-2 text-white">On Stoppe l'Eau. Définitivement.</span>
              </h1>
              
              <p className="text-xl text-slate-300 mb-6 leading-relaxed">
                <strong className="text-white">+200 maisons assainies</strong> en Haute-Garonne.
                Injection résine hydrophobe = <strong className="text-blue-300">barrière étanche permanente</strong>.
              </p>
              
              {/* Chiffre clé */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-8 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Traitement injection</p>
                    <p className="text-2xl font-bold text-white">80€ - 120€/ml</p>
                  </div>
                  <div className="text-center px-4 border-l border-white/20">
                    <p className="text-sm text-slate-400">Maison moyenne</p>
                    <p className="text-lg font-bold text-white">2 500€ - 5 000€</p>
                  </div>
                  <div className="bg-green-500/20 px-3 py-2 rounded-lg">
                    <p className="text-green-400 font-bold text-sm">Garanti</p>
                    <p className="text-green-400 font-bold text-lg">30 ans</p>
                  </div>
                </div>
              </div>
              
              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Link href="/diagnostic" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl flex items-center justify-center gap-2 transition-all hover:-translate-y-1">
                  Diagnostic gratuit en 3 min
                  <ArrowRight size={20} />
                </Link>
                <a href="tel:0582953375" className="bg-white/10 backdrop-blur border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 flex items-center justify-center gap-2">
                  <Phone size={20} /> 05 82 95 33 75
                </a>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-slate-400">
                <span className="flex items-center gap-1"><Clock size={14} /> Réponse 24h</span>
                <span className="flex items-center gap-1"><CheckCircle size={14} className="text-green-400" /> Devis gratuit</span>
              </div>
            </div>
            
            {/* Trust signals desktop */}
            <div className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-xl font-bold mb-6 text-center">Pourquoi IPB ?</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                      <Droplets className="text-blue-400" size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-white">Solution définitive</p>
                      <p className="text-sm text-slate-400">Barrière étanche dans le mur</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                      <Shield className="text-green-400" size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-white">Garantie 30 ans</p>
                      <p className="text-sm text-slate-400">La plus longue du marché</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                      <Award className="text-orange-400" size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-white">+200 interventions</p>
                      <p className="text-sm text-slate-400">en Haute-Garonne</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sommaire */}
      <section className="py-8 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Sommaire de la page</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
              <a href="#probleme" className="text-blue-600 hover:text-blue-700 underline-offset-2 hover:underline">Comprendre le problème</a>
              <a href="#solution" className="text-blue-600 hover:text-blue-700 underline-offset-2 hover:underline">Nos solutions</a>
              <a href="#comparatif" className="text-blue-600 hover:text-blue-700 underline-offset-2 hover:underline">Comparatif techniques</a>
              <a href="#avis" className="text-blue-600 hover:text-blue-700 underline-offset-2 hover:underline">Avis clients</a>
              <a href="#faq" className="text-blue-600 hover:text-blue-700 underline-offset-2 hover:underline">FAQ</a>
            </div>
          </div>
        </div>
      </section>

      {/* Section Problème */}
      <section id="probleme" className="py-16 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
              <AlertTriangle size={16} /> L'humidité détruit votre maison et votre santé
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              L'eau remonte du sol dans vos murs
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Les matériaux traditionnels (brique, pierre) agissent comme des éponges. 
              L'eau chargée de sels minéraux remonte par capillarité.
            </p>
          </div>
          
          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <AlertTriangle className="text-blue-600" size={24} />
              Les dégâts que vous constatez :
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="text-blue-600 shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-bold text-slate-900">Salpêtre (poudre blanche)</p>
                  <p className="text-sm text-slate-600">Corrosif pour les matériaux</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-blue-600 shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-bold text-slate-900">Moisissures noires</p>
                  <p className="text-sm text-slate-600">Allergies, problèmes respiratoires</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-blue-600 shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-bold text-slate-900">Peinture qui cloque</p>
                  <p className="text-sm text-slate-600">Revêtements qui se décollent</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Solution */}
      <section id="solution" className="py-16 md:py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              Nos solutions humidité : traitement global
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              L’humidité n’a pas une seule cause, donc pas une seule solution. Nous mettons en œuvre
              l’ensemble des techniques efficaces selon la cause réelle.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-10">
            <h3 className="text-xl font-bold text-slate-900 mb-2">1) Remontées capillaires : injection résine</h3>
            <p className="text-slate-600 text-sm">
              La barrière hydrophobe est la solution de référence contre l’eau qui remonte par capillarité.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 text-center">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Forage</h3>
              <p className="text-sm text-slate-600">Perçage tous les <strong>10-15cm</strong> en bas du mur.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 text-center">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Injection</h3>
              <p className="text-sm text-slate-600">Résine silane/siloxane <strong>sous pression</strong>.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 text-center">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Barrière</h3>
              <p className="text-sm text-slate-600">Zone <strong>totalement étanche</strong> créée.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 text-center">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-blue-600">4</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Assèchement</h3>
              <p className="text-sm text-slate-600">Mur sèche en <strong>6-12 mois</strong>.</p>
            </div>
          </div>
          
          {/* Solutions complémentaires */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <Home className="text-orange-600" size={32} />
                <h3 className="text-xl font-bold text-slate-900">Cuvelage cave</h3>
              </div>
              <p className="text-slate-600 mb-3">Caisson étanche pour caves et sous-sols enterrés.</p>
              <p className="text-sm text-orange-700 font-medium">→ Infiltrations latérales, pression hydrostatique</p>
            </div>
            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <Wind className="text-green-600" size={32} />
                <h3 className="text-xl font-bold text-slate-900">VMI Ventilation</h3>
              </div>
              <p className="text-slate-600 mb-3">Air sec et filtré pour chasser l'humidité résiduelle.</p>
              <p className="text-sm text-green-700 font-medium">→ Condensation, moisissures, atmosphère humide</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Autres solutions que nous réalisons</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-slate-600">
              <div>• Drainage périphérique et gestion des eaux</div>
              <div>• Étanchéité / imperméabilisation des murs</div>
              <div>• Traitement du salpêtre et des moisissures</div>
              <div>• Ventilation (VMC, VMI) et correction condensation</div>
              <div>• Assèchement contrôlé des supports</div>
              <div>• Traitements curatifs et préventifs adaptés</div>
            </div>
            <p className="text-xs text-slate-500 mt-4">
              Objectif : supprimer la cause, pas masquer le symptôme.
            </p>
          </div>
          
          {/* CTA intermédiaire */}
          <div className="bg-blue-600 rounded-2xl p-8 text-white text-center">
            <p className="text-xl font-bold mb-4">Murs humides depuis des mois ?</p>
            <p className="text-blue-100 mb-6">Plus vous attendez, plus les dégâts s'aggravent (structure, santé)</p>
            <Link href="/diagnostic" className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all">
              Diagnostiquer mon problème gratuitement <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Comparatif */}
      <section id="comparatif" className="py-16 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Pourquoi la bonne solution IPB ?</h2>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-900 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-bold">Critère</th>
                    <th className="px-6 py-4 text-center font-bold bg-blue-600">Injection IPB</th>
                    <th className="px-6 py-4 text-center font-bold">Drainage</th>
                    <th className="px-6 py-4 text-center font-bold">Déshumidificateur</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-bold text-slate-900">✅ Efficacité</td>
                    <td className="px-6 py-4 text-center text-green-600 font-bold">Définitive</td>
                    <td className="px-6 py-4 text-center text-orange-600">Partielle</td>
                    <td className="px-6 py-4 text-center text-red-600">Temporaire</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-bold text-slate-900">🛡️ Garantie</td>
                    <td className="px-6 py-4 text-center text-blue-600 font-bold">30 ans</td>
                    <td className="px-6 py-4 text-center">5-10 ans</td>
                    <td className="px-6 py-4 text-center">Aucune</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-bold text-slate-900">💰 Coût</td>
                    <td className="px-6 py-4 text-center font-bold">80-120€/ml</td>
                    <td className="px-6 py-4 text-center">150-200€/ml</td>
                    <td className="px-6 py-4 text-center">Achat + élec</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-bold text-slate-900">🔧 Invasivité</td>
                    <td className="px-6 py-4 text-center text-green-600 font-bold">Faible</td>
                    <td className="px-6 py-4 text-center text-red-600">Très élevée</td>
                    <td className="px-6 py-4 text-center">Aucune</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Avis Google */}
      <section id="avis" className="bg-white">
        <Testimonials />
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-slate-50">
        <FaqSection 
          title="Questions fréquentes" 
          data={humidityFaq} 
          theme="blue"
          linksVariant="humidite"
          linksTitle="Guides humidité"
        />
      </section>

      {/* CTA Final */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
            Vos murs sont humides ?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Diagnostic gratuit en 3 minutes. Réponse d'un expert sous 24h.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/diagnostic" className="bg-white text-blue-600 px-10 py-5 rounded-xl font-bold text-lg hover:bg-blue-50 flex items-center justify-center gap-2 shadow-xl">
              Lancer mon diagnostic gratuit <ArrowRight size={20} />
            </Link>
            <a href="tel:0582953375" className="bg-blue-700 hover:bg-blue-800 px-8 py-5 rounded-xl font-bold text-lg flex items-center justify-center gap-2">
              <Phone size={20} /> 05 82 95 33 75
            </a>
          </div>
          <p className="text-sm text-blue-200 mt-6">✓ Gratuit · ✓ Sans engagement · ✓ Réponse 24h</p>
        </div>
      </section>

      <InternalLinks variant="humidite" />
      </main>
      <Footer />
    </div>
  );
}
