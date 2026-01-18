import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { FaqSection } from '@/components/ui/FaqSection';
import { InternalLinks } from '@/components/seo/InternalLinks';
import { fissureFaq } from '@/app/data/faqs';
import Link from 'next/link';
import { Activity, AlertTriangle, CheckCircle, ArrowRight, Shield, FileText, Wrench, TrendingDown } from 'lucide-react';
import Script from 'next/script';

export const metadata = {
  title: 'Expert Fissure Toulouse - Expertise Fissures & Mouvements Structurels | IPB',
  description: 'Expert en traitement des fissures structurelles en Haute-Garonne. Solutions définitives par agrafage et harpage sur sols argileux. Alternative économique aux micropieux. Garantie décennale.',
  keywords: [
    'expert fissures toulouse',
    'fissures maison',
    'tassement différentiel',
    'agrafage',
    'micropieux',
    'fondations',
    'haute-garonne',
  ],
  alternates: {
    canonical: 'https://www.ipb-expertise.fr/expertise/fissures',
  },
  openGraph: {
    title: 'Expert Fissure Toulouse | IPB',
    description: 'Expert en fissures structurelles. Agrafage et solutions durables avec garantie décennale.',
    url: 'https://www.ipb-expertise.fr/expertise/fissures',
    siteName: 'IPB - Institut de Pathologie du Bâtiment',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/images/IPB_Logo_HD.png',
        width: 1200,
        height: 630,
        alt: 'Expertise fissures IPB',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Expert Fissure Toulouse | IPB',
    description: 'Expert en fissures structurelles. Agrafage et solutions durables.',
    images: ['/images/IPB_Logo_HD.png'],
  },
};

// Génération du JSON-LD pour le SEO (FAQPage Schema.org)
const generateFaqJsonLd = () => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": fissureFaq.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };
};

export default function FissuresPage() {
  const faqJsonLd = generateFaqJsonLd();

  return (
    <div className="font-sans text-slate-800 bg-slate-50 antialiased">
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <TopBar />
      <Navbar />
      
      {/* Hero Header */}
      <section className="relative bg-slate-900 text-white overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-orange-950 opacity-95"></div>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 text-orange-100 px-4 py-1.5 rounded-full text-xs font-bold mb-6 uppercase tracking-wider backdrop-blur-md">
              <Activity size={16} />
              <span>Expertise Structure & Fondations</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              Expertise Fissures & Mouvements Structurels en <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-200">Haute-Garonne</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed font-medium">
              Ne masquez pas les symptômes. Traitez la cause. Solutions définitives par agrafage et harpage sur sols argileux.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/diagnostic" className="bg-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:bg-orange-500 transition-all flex items-center justify-center gap-2">
                Demander un avis expert
                <ArrowRight size={20} />
              </Link>
              <a href="tel:0582953375" className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2">
                Consultation téléphonique
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1 : Le Diagnostic (Le Problème) */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-10 h-10 text-orange-600" />
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Pourquoi votre maison fissure-t-elle ?</h2>
            </div>
            
            <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed mb-8">
              <p className="text-lg mb-6">
                À <strong>Toulouse</strong> et ses environs, <strong>90% des fissures sont dues au phénomène de RGA (Retrait-Gonflement des Argiles)</strong>. 
                En période de sécheresse, le sol se rétracte sous vos fondations. En période de pluie, il gonfle. 
                Ces micro-mouvements créent des tensions que la maçonnerie ne peut plus supporter.
              </p>
            </div>

            <div className="bg-orange-50 border-l-4 border-orange-600 rounded-xl p-6 md:p-8 mb-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
                Les Signes d'alerte :
              </h3>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-orange-600 shrink-0 mt-0.5" />
                  <span><strong>Fissures en escalier</strong> (suivant les joints de briques/parpaings).</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-orange-600 shrink-0 mt-0.5" />
                  <span><strong>Fissures traversantes</strong> (visibles intérieur/extérieur).</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-orange-600 shrink-0 mt-0.5" />
                  <span><strong>Menuiseries qui ne ferment plus correctement.</strong></span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 : La Solution IPB (La Technique) */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">L'Agrafage : La chirurgie du bâtiment</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Plutôt que d'injecter des résines expansives (parfois aléatoires) ou de poser des micropieux (coût : 40k€+), 
              nous privilégions la <strong>"Couture de Maçonnerie"</strong>.
            </p>
          </div>

          {/* Notre Méthode en 3 étapes */}
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 text-center">
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl font-bold text-orange-600">1</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Saignée</h3>
                <p className="text-slate-600 leading-relaxed">
                  Ouverture des fissures sur <strong>40cm de part et d'autre</strong> pour préparer l'insertion des agrafes.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 text-center">
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl font-bold text-orange-600">2</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Agrafage</h3>
                <p className="text-slate-600 leading-relaxed">
                  Insertion d'<strong>aciers torsadés Haute Adhérence (HA)</strong> scellés chimiquement pour "recoudre" le mur.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 text-center">
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl font-bold text-orange-600">3</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Matage</h3>
                <p className="text-slate-600 leading-relaxed">
                  Remplissage avec un <strong>mortier résine fibré</strong> qui épouse les futurs mouvements sans casser.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 : Pourquoi nous choisir ? */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Pourquoi nous choisir ?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-orange-50 to-white rounded-2xl p-6 md:p-8 shadow-lg border-2 border-orange-200">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6">
                <TrendingDown className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Alternative Économique</h3>
              <p className="text-slate-700 leading-relaxed text-sm">
                <strong>3x moins cher que les micropieux</strong> pour une efficacité prouvée sur les affaissements modérés.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 md:p-8 shadow-lg border-2 border-blue-200">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Garantie Décennale</h3>
              <p className="text-slate-700 leading-relaxed text-sm">
                Travaux couverts <strong>10 ans</strong> par notre assureur partenaire. Votre tranquillité d'esprit assurée.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-6 md:p-8 shadow-lg border-2 border-green-200">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                <Wrench className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Finition</h3>
              <p className="text-slate-700 leading-relaxed text-sm">
                Nous ne laissons pas de "cicatrices". <strong>Le mur est prêt à peindre</strong> après notre intervention.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl p-6 md:p-8 shadow-lg border-2 border-purple-200">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                <FileText className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Accompagnement</h3>
              <p className="text-slate-700 leading-relaxed text-sm">
                Nous mettons en place un <strong>suivi post-intervention</strong> pour suivre l'évolution de nos actions et rassurer nos clients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparatif Tableau */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Comparatif des solutions</h2>
            <p className="text-lg text-slate-600">Agrafage IPB vs Solutions classiques</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-900 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-bold">Critère</th>
                    <th className="px-6 py-4 text-center font-bold bg-orange-600">Solution IPB (Agrafage)</th>
                    <th className="px-6 py-4 text-center font-bold">Micropieux</th>
                    <th className="px-6 py-4 text-center font-bold">Résines expansives</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-bold text-slate-900">Coût moyen</td>
                    <td className="px-6 py-4 text-center text-orange-600 font-bold">8 000€ - 15 000€</td>
                    <td className="px-6 py-4 text-center text-slate-600">40 000€ - 50 000€</td>
                    <td className="px-6 py-4 text-center text-slate-600">5 000€ - 8 000€</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-bold text-slate-900">Durée intervention</td>
                    <td className="px-6 py-4 text-center text-slate-700">2-4 jours</td>
                    <td className="px-6 py-4 text-center text-slate-700">2-3 semaines</td>
                    <td className="px-6 py-4 text-center text-slate-700">1-2 jours</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-bold text-slate-900">Efficacité</td>
                    <td className="px-6 py-4 text-center text-green-600 font-bold">✓ Prouvée 90% des cas</td>
                    <td className="px-6 py-4 text-center text-green-600">✓ Efficace</td>
                    <td className="px-6 py-4 text-center text-orange-600">⚠ Aléatoire</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-bold text-slate-900">Garantie</td>
                    <td className="px-6 py-4 text-center text-blue-600 font-bold">10 ans</td>
                    <td className="px-6 py-4 text-center text-blue-600">10 ans</td>
                    <td className="px-6 py-4 text-center text-slate-600">2-5 ans</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-bold text-slate-900">Invasivité</td>
                    <td className="px-6 py-4 text-center text-green-600 font-bold">Faible</td>
                    <td className="px-6 py-4 text-center text-red-600">Très élevée</td>
                    <td className="px-6 py-4 text-center text-green-600">Faible</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FaqSection 
        title="Questions fréquentes sur les fissures" 
        data={fissureFaq} 
        theme="orange" 
      />

      {/* CTA Final */}
      <section className="py-16 md:py-24 bg-slate-900 text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Vos murs vous inquiètent ?</h2>
          <p className="text-xl text-slate-300 mb-8">
            Ne laissez pas le doute s'installer. Obtenez un diagnostic expert pour évaluer la gravité de votre situation.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/diagnostic" 
              className="bg-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:bg-orange-500 transition-all flex items-center justify-center gap-2"
            >
              Diagnostic gratuit
              <ArrowRight size={20} />
            </Link>
            <a 
              href="tel:0582953375" 
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2"
            >
              Appeler un expert
            </a>
          </div>
        </div>
      </section>

      <InternalLinks variant="fissures" />

      <Footer />
    </div>
  );
}

