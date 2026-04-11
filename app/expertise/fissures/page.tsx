import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { FaqSection } from '@/components/ui/FaqSection';
import { InternalLinks } from '@/components/seo/InternalLinks';
import { Testimonials } from '@/components/home/Testimonials';
import { fissureFaq } from '@/app/data/faqs';
import Link from 'next/link';
import Image from 'next/image';
import { Activity, AlertTriangle, CheckCircle, ArrowRight, Shield, Phone, Clock, Star, Award } from 'lucide-react';
import Script from 'next/script';
import { DiagnosticHowToSchema, AgrafageHowToSchema } from '@/components/seo/HowToSchema';
import { ExpertiseFissuresBreadcrumb } from '@/components/seo/BreadcrumbSchema';

export const metadata = {
  title: 'Expert Fissures Toulouse & Occitanie | Agrafage | IPB',
  description: 'Fissures maison à Toulouse, Montauban, Auch ? Agrafage garanti 10 ans, diagnostic 249€ déductible. Intervention sous 48h. 05 82 95 33 75',
  keywords: [
    'expert fissures toulouse',
    'agrafage fissures toulouse',
    'fissures maison toulouse',
    'réparation fissures façade',
    'tassement différentiel toulouse',
    'agrafage vs micropieux',
    'fissure mur extérieur',
    'expert bâtiment toulouse',
    'sol argileux fissures',
    'RGA haute-garonne',
    'fissures escalier maison',
    'diagnostic fissures prix',
  ],
  alternates: {
    canonical: 'https://www.ipb-expertise.fr/expertise/fissures',
  },
  openGraph: {
    title: 'Expert Fissures Occitanie (31-82-32) | Solutions structurelles | IPB',
    description: 'Diagnostic, agrafage/harpage, reprises en sous-oeuvre, renforts. Garantie décennale. Diagnostic 48h.',
    url: 'https://www.ipb-expertise.fr/expertise/fissures',
    siteName: 'IPB - Institut de Pathologie du Bâtiment',
    locale: 'fr_FR',
    type: 'website',
    images: [{ url: '/images/fissure-facade-verticale.webp', width: 1200, height: 630, alt: 'Expert Fissures Toulouse Montauban Auch - Agrafage Structurel - IPB Occitanie' }],
  },
};

// JSON-LD schemas
const generateFaqJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": fissureFaq.map((item) => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": { "@type": "Answer", "text": item.answer }
  }))
});

const generateServiceJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Traitement des fissures structurelles",
  "provider": {
    "@type": "LocalBusiness",
    "name": "IPB - Institut de Pathologie du Bâtiment",
    "telephone": "+33582953375",
    "address": { "@type": "PostalAddress", "streetAddress": "54 avenue Jean Jaurès", "addressLocality": "Tournefeuille", "addressRegion": "Occitanie", "postalCode": "31170", "addressCountry": "FR" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "bestRating": "5", "worstRating": "1", "reviewCount": "47" }
  },
  "areaServed": [{ "@type": "AdministrativeArea", "name": "Haute-Garonne (31)" }, { "@type": "AdministrativeArea", "name": "Tarn-et-Garonne (82)" }, { "@type": "AdministrativeArea", "name": "Gers (32)" }, { "@type": "AdministrativeArea", "name": "Tarn (81)" }],
  "description": "Expert en traitement des fissures structurelles. Agrafage, harpage. Alternative économique aux micropieux avec garantie décennale."
});

export default function FissuresPage() {
  return (
    <div className="font-sans text-slate-800 bg-slate-50 antialiased">
      <Script id="faq-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFaqJsonLd()) }} />
      <Script id="service-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateServiceJsonLd()) }} />
      
      {/* HowTo Schema pour Featured Snippets Google */}
      <DiagnosticHowToSchema />
      <AgrafageHowToSchema />
      
      {/* Breadcrumb Schema pour SERP */}
      <ExpertiseFissuresBreadcrumb />
      
      <TopBar />
      <Navbar />
      <main id="main-content">
      
      {/* HERO - Conversion optimisée */}
      <section className="relative bg-slate-900 text-white overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-orange-950/80"></div>
        <Image
          src="/images/fissure-facade-verticale.webp"
          alt="Fissure structurelle façade"
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
                <span className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/40 text-orange-300 px-3 py-1.5 rounded-full text-xs font-bold">
                  <Shield size={12} /> Garantie 10 ans
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
                Expert <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">Fissures</span> à Toulouse
                <span className="block text-3xl md:text-4xl mt-2 text-white">Diagnostic instrumenté. Agrafage garanti 10 ans.</span>
              </h1>
              
              <p className="text-xl text-slate-300 mb-6 leading-relaxed">
                <strong className="text-white">850+ diagnostics réalisés</strong> en Haute-Garonne, Tarn-et-Garonne et Gers depuis 2019.
                Agrafage structurel adapté au <strong className="text-orange-300">bâti sur sol argileux</strong>.
              </p>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-8 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Diagnostic expert sur site</p>
                    <p className="text-2xl font-bold text-white">249€ TTC</p>
                  </div>
                  <div className="text-center px-4 border-l border-white/20">
                    <p className="text-sm text-slate-400">Agrafage (ordre de grandeur)</p>
                    <p className="text-lg font-bold text-white">8 000€ – 15 000€</p>
                  </div>
                  <div className="bg-green-500/20 px-3 py-2 rounded-lg">
                    <p className="text-green-400 font-bold text-xs">Déductible</p>
                    <p className="text-green-400 font-bold text-sm">des travaux</p>
                  </div>
                </div>
              </div>
              
              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Link href="/diagnostic" className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl flex items-center justify-center gap-2 transition-all hover:-translate-y-1">
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
                    <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                      <Activity className="text-orange-400" size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-white">Diagnostic instrumenté</p>
                      <p className="text-sm text-slate-400">Fissuromètre, laser, rapport détaillé</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                      <Shield className="text-blue-400" size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-white">Garantie décennale</p>
                      <p className="text-sm text-slate-400">Travaux assurés SMABTP</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                      <Award className="text-green-400" size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-white">850+ diagnostics</p>
                      <p className="text-sm text-slate-400">en Occitanie (31-82-32-81)</p>
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
              <a href="#probleme" className="text-orange-600 hover:text-orange-700 underline-offset-2 hover:underline">Comprendre le problème</a>
              <a href="#solution" className="text-orange-600 hover:text-orange-700 underline-offset-2 hover:underline">Nos solutions</a>
              <a href="#comparatif" className="text-orange-600 hover:text-orange-700 underline-offset-2 hover:underline">Comparatif techniques</a>
              <a href="#avis" className="text-orange-600 hover:text-orange-700 underline-offset-2 hover:underline">Avis clients</a>
              <a href="#faq" className="text-orange-600 hover:text-orange-700 underline-offset-2 hover:underline">FAQ</a>
            </div>
          </div>
        </div>
      </section>

      {/* Section Problème */}
      <section id="probleme" className="py-16 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
              <AlertTriangle size={16} /> 90% des fissures en Occitanie = sol argileux
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              Pourquoi votre maison se fissure ?
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Le sol argileux de la région se contracte en été et gonfle en hiver. 
              Ces mouvements créent des tensions que vos murs ne supportent plus.
            </p>
          </div>
          
          <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <AlertTriangle className="text-orange-600" size={24} />
              Signes qui doivent vous alerter :
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="text-orange-600 shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-bold text-slate-900">Fissures en escalier</p>
                  <p className="text-sm text-slate-600">Suivent les joints de briques</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-orange-600 shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-bold text-slate-900">Fissures traversantes</p>
                  <p className="text-sm text-slate-600">Visibles intérieur/extérieur</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-orange-600 shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-bold text-slate-900">Portes qui coincent</p>
                  <p className="text-sm text-slate-600">Déformation de la structure</p>
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
              Nos solutions fissures : une approche complète
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Le bon traitement dépend de la cause (retrait‑gonflement, tassement, défaut de construction, infiltration).
              Nous choisissons la technique la plus pertinente pour stabiliser durablement.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Diagnostic & instrumentation</h3>
              <p className="text-slate-600 mb-4">
                Mesures précises, lecture des contraintes, analyse des causes et priorisation des risques.
              </p>
              <ul className="text-sm text-slate-600 space-y-2">
                <li>• Fissuromètre / relevés</li>
                <li>• Analyse des sols et des appuis</li>
                <li>• Rapport technique détaillé</li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Agrafage / harpage</h3>
              <p className="text-slate-600 mb-4">
                Couture structurelle de la maçonnerie pour stopper l’évolution des fissures.
              </p>
              <ul className="text-sm text-slate-600 space-y-2">
                <li>• Agrafes inox ou aciers HA</li>
                <li>• Mortiers techniques fibrés</li>
                <li>• Garantie décennale</li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Reprise en sous‑œuvre</h3>
              <p className="text-slate-600 mb-4">
                Stabilisation des fondations par techniques traditionnelles adaptées au bâti.
              </p>
              <ul className="text-sm text-slate-600 space-y-2">
                <li>• Reprise localisée des appuis</li>
                <li>• Longrines / semelles selon cas</li>
                <li>• Renforts structurels ciblés</li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Chaînage & reprises</h3>
              <p className="text-slate-600 mb-4">
                Renforts, reprise de maçonnerie, joints et finitions pour pérenniser l’ouvrage.
              </p>
              <ul className="text-sm text-slate-600 space-y-2">
                <li>• Renforts de linteaux</li>
                <li>• Rejointoiement technique</li>
                <li>• Finitions durables</li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Traitement des causes</h3>
              <p className="text-slate-600 mb-4">
                Gestion des eaux et des mouvements pour éviter la réapparition.
              </p>
              <ul className="text-sm text-slate-600 space-y-2">
                <li>• Drainage / évacuation</li>
                <li>• Gestion des abords</li>
                <li>• Prévention long terme</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-orange-600 rounded-2xl p-8 text-white text-center">
            <p className="text-xl font-bold mb-4">Vous constatez des fissures ?</p>
            <p className="text-orange-100 mb-6">Un diagnostic précoce permet de dimensionner l'intervention au juste nécessaire.</p>
            <Link href="/diagnostic" className="inline-flex items-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-50 transition-all">
              Évaluer ma situation gratuitement <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Comparatif */}
      <section id="comparatif" className="py-16 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Pourquoi l'agrafage IPB ?</h2>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-900 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-bold">Critère</th>
                    <th className="px-6 py-4 text-center font-bold bg-orange-600">Agrafage IPB</th>
                    <th className="px-6 py-4 text-center font-bold">Micropieux</th>
                    <th className="px-6 py-4 text-center font-bold">Résines</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-bold text-slate-900">Coût indicatif</td>
                    <td className="px-6 py-4 text-center text-orange-600 font-bold">8 – 15 k€</td>
                    <td className="px-6 py-4 text-center text-slate-600">40 – 50 k€</td>
                    <td className="px-6 py-4 text-center text-slate-600">5 – 8 k€</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-bold text-slate-900">Durée chantier</td>
                    <td className="px-6 py-4 text-center font-bold">2-4 jours</td>
                    <td className="px-6 py-4 text-center">2-3 semaines</td>
                    <td className="px-6 py-4 text-center">1-2 jours</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-bold text-slate-900">Efficacité</td>
                    <td className="px-6 py-4 text-center text-green-600 font-bold">Adapté dans 90% des cas</td>
                    <td className="px-6 py-4 text-center text-green-600">Efficace</td>
                    <td className="px-6 py-4 text-center text-orange-600">Variable</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-bold text-slate-900">Garantie</td>
                    <td className="px-6 py-4 text-center text-blue-600 font-bold">Décennale (10 ans)</td>
                    <td className="px-6 py-4 text-center">10 ans</td>
                    <td className="px-6 py-4 text-center">2-5 ans</td>
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
          data={fissureFaq} 
          theme="orange"
          linksVariant="fissures"
          linksTitle="Guides fissures"
        />
      </section>

      {/* CTA Final */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
            Vos fissures vous inquiètent ?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Diagnostic gratuit en 3 minutes. Réponse d'un expert sous 24h.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/diagnostic" className="bg-white text-orange-600 px-10 py-5 rounded-xl font-bold text-lg hover:bg-orange-50 flex items-center justify-center gap-2 shadow-xl">
              Lancer mon diagnostic gratuit <ArrowRight size={20} />
            </Link>
            <a href="tel:0582953375" className="bg-orange-700 hover:bg-orange-800 px-8 py-5 rounded-xl font-bold text-lg flex items-center justify-center gap-2">
              <Phone size={20} /> 05 82 95 33 75
            </a>
          </div>
          <p className="text-sm text-orange-200 mt-6">✓ Gratuit · ✓ Sans engagement · ✓ Réponse 24h</p>
        </div>
      </section>

      <InternalLinks variant="fissures" />
      </main>
      <Footer />
    </div>
  );
}
