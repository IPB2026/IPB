import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { GoogleReviewsSection } from '@/components/GoogleReviewsSection';
import { CheckCircle, Phone, ArrowRight, MapPin, AlertTriangle, Shield, FileText, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Expert Fissures Toulouse (31) | Agrafage Structurel Garanti 10 ans | IPB',
  description: 'Expert fissures maison Toulouse & Haute-Garonne. Agrafage structurel, harpage, réparation fondations. Diagnostic 149€ (déductible). ☎ 05 82 95 33 75. Intervention 48h.',
  keywords: [
    'expert fissures toulouse',
    'fissures maison toulouse',
    'agrafage fissures 31',
    'harpage mur toulouse',
    'réparation fissures façade',
    'fissure structurelle maison',
    'tassement différentiel toulouse',
    'fissure mur extérieur 31',
    'expert bâtiment toulouse',
    'diagnostic fissures haute-garonne',
    'fissure en escalier causes',
    'fissure horizontale danger',
    'micropieux toulouse prix',
    'sol argileux fissures',
    'catastrophe naturelle sécheresse 31',
    'fissure fondation maison',
    'expertise fissures assurance',
    'devis agrafage fissures',
  ],
  alternates: {
    canonical: 'https://www.ipb-expertise.fr/expert-fissures-toulouse-31',
  },
  openGraph: {
    title: 'Expert Fissures Toulouse (31) | Agrafage & Harpage | IPB',
    description: 'Spécialiste traitement fissures structurelles à Toulouse. Agrafage 3x moins cher que micropieux. +200 maisons traitées. Garantie décennale.',
    url: 'https://www.ipb-expertise.fr/expert-fissures-toulouse-31',
    type: 'website',
    images: [{
      url: '/images/fissure-facade-verticale.webp',
      width: 1200,
      height: 630,
      alt: 'Expert fissures Toulouse - Agrafage structurel - IPB Haute-Garonne',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Expert Fissures Toulouse | IPB',
    description: 'Agrafage structurel garanti 10 ans. Diagnostic 48h.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
};

const communesHauteGaronne = [
  'Toulouse', 'Colomiers', 'Tournefeuille', 'Blagnac', 'Muret', 'Cugnaux', 
  'Plaisance-du-Touch', 'Balma', 'L\'Union', 'Ramonville-Saint-Agne', 'Saint-Orens',
  'Castanet-Tolosan', 'Fonsorbes', 'Saint-Gaudens', 'Portet-sur-Garonne'
];

const faqItems = [
  {
    question: "Combien coûte un diagnostic fissures à Toulouse ?",
    answer: "Le diagnostic fissures coûte 149€, déductibles des travaux si vous nous confiez la réparation. Ce tarif inclut le déplacement, l'inspection complète et le rapport détaillé avec préconisations."
  },
  {
    question: "Quels sont les délais d'intervention à Toulouse ?",
    answer: "Nous intervenons sous 24 à 48h sur Toulouse et toute la Haute-Garonne. En cas d'urgence (fissure évolutive, danger), nous pouvons intervenir le jour même."
  },
  {
    question: "Les fissures sont-elles couvertes par l'assurance ?",
    answer: "Si votre commune est reconnue en état de catastrophe naturelle sécheresse, votre assurance habitation peut prendre en charge les réparations. Nous vous accompagnons dans les démarches."
  },
  {
    question: "Quelle est la différence entre agrafage et micropieux ?",
    answer: "L'agrafage stabilise les murs fissurés pour 3x moins cher que les micropieux. C'est la solution recommandée pour 80% des cas de fissures en Haute-Garonne."
  },
  {
    question: "Intervenez-vous dans toute la Haute-Garonne ?",
    answer: "Oui, nous couvrons tout le département 31 : Toulouse, Colomiers, Blagnac, Muret, Tournefeuille, et toutes les communes jusqu'à Saint-Gaudens."
  },
  {
    question: "Comment savoir si mes fissures sont graves ?",
    answer: "Une fissure de plus de 2mm, en escalier, ou qui s'agrandit nécessite une expertise urgente. Les portes qui coincent sont aussi un signe d'alerte."
  }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "IPB - Expert Fissures Toulouse",
  "description": "Expert indépendant en diagnostic et traitement des fissures à Toulouse et Haute-Garonne",
  "url": "https://www.ipb-expertise.fr/expert-fissures-toulouse-31",
  "telephone": "+33582953375",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Toulouse",
    "addressRegion": "Haute-Garonne",
    "postalCode": "31000",
    "addressCountry": "FR"
  },
  "areaServed": {
    "@type": "State",
    "name": "Haute-Garonne"
  },
  "priceRange": "€€"
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqItems.map(item => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.answer
    }
  }))
};

export default function ExpertFissuresToulouse31Page() {
  return (
    <div className="font-sans text-slate-800 bg-slate-50 antialiased">
      <Script id="local-business-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Script id="faq-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      
      <TopBar />
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-orange-950/30"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-red-400 text-sm font-bold mb-4">
              <AlertTriangle size={18} className="animate-pulse" />
              <span>⚠️ Haute-Garonne : +52% de fissures en 2024-2025 (sécheresse)</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              Votre Maison à <span className="text-orange-400">Toulouse</span> Se Fissure ?<br />
              <span className="text-slate-400 text-3xl md:text-4xl">L'Expert N°1 du 31 Intervient Sous 48h</span>
            </h1>
            <p className="text-xl text-slate-300 mb-4 max-w-2xl">
              Depuis 2019, nous avons <strong className="text-white">sauvé plus de 200 maisons</strong> en Haute-Garonne.
              Sol argileux, sécheresse, tassement différentiel : nous connaissons chaque problème local.
            </p>
            <div className="bg-orange-500/20 border border-orange-500/40 rounded-xl p-4 mb-8 max-w-2xl">
              <p className="text-orange-200 font-bold">
                💰 Nos clients économisent en moyenne <strong className="text-white text-xl">18 000€</strong> vs les solutions traditionnelles (micropieux)
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/diagnostic" className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-xl animate-pulse">
                🚨 DIAGNOSTIC GRATUIT - RÉPONSE 24h <ArrowRight size={20} />
              </Link>
              <a href="tel:0582953375" className="bg-white/10 border border-white/20 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all">
                <Phone size={20} /> 05 82 95 33 75
              </a>
            </div>
            <p className="text-sm text-slate-400 mt-4">✓ Déplacement gratuit sur tout le 31 · ✓ Rapport complet sous 48h · ✓ Garantie décennale</p>
          </div>
        </div>
      </section>

      {/* Statistiques locales */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-extrabold text-orange-600">847</div>
              <div className="text-slate-600 mt-1">Diagnostics réalisés en 31</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-orange-600">98%</div>
              <div className="text-slate-600 mt-1">Clients satisfaits</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-orange-600">48h</div>
              <div className="text-slate-600 mt-1">Délai d'intervention</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-orange-600">10 ans</div>
              <div className="text-slate-600 mt-1">Garantie décennale</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contexte local */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
                Pourquoi les maisons de Toulouse se fissurent ?
              </h2>
              <div className="prose prose-lg text-slate-600">
                <p>
                  La <strong>Haute-Garonne</strong> est l'un des départements les plus touchés par le phénomène de 
                  <strong> retrait-gonflement des argiles (RGA)</strong>. Les sols argileux de la région toulousaine 
                  se contractent en été et gonflent en hiver, créant des mouvements de terrain destructeurs.
                </p>
                <p>
                  Depuis les sécheresses de 2022-2023, <strong>plus de 200 communes de Haute-Garonne</strong> ont été 
                  reconnues en état de catastrophe naturelle. Les maisons construites sur vide sanitaire ou avec des 
                  fondations superficielles sont particulièrement vulnérables.
                </p>
              </div>
              <div className="mt-8 p-6 bg-orange-50 border-l-4 border-orange-500 rounded-r-xl">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="text-orange-600 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-bold text-slate-900">Alerte sécheresse 2024-2025</h3>
                    <p className="text-slate-600 mt-1">
                      De nouveaux arrêtés CAT-NAT sont attendus. Faites constater vos fissures maintenant pour 
                      constituer votre dossier d'indemnisation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-slate-100 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Communes les plus touchées en 31</h3>
              <div className="grid grid-cols-2 gap-3">
                {['Toulouse', 'Colomiers', 'Tournefeuille', 'Muret', 'Cugnaux', 'Plaisance-du-Touch', 'Balma', 'Castanet-Tolosan'].map((commune) => (
                  <div key={commune} className="flex items-center gap-2 text-slate-700">
                    <CheckCircle size={16} className="text-orange-600" />
                    <span>{commune}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-slate-500 mt-4">+ 150 autres communes couvertes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Processus en 3 étapes */}
      <section className="py-16 md:py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Notre processus en 3 étapes</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">De l'expertise au traitement, nous vous accompagnons à chaque étape.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800 rounded-2xl p-8 relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-2xl font-bold">1</div>
              <Clock className="text-orange-400 mb-4" size={40} />
              <h3 className="text-xl font-bold mb-3">Diagnostic sous 48h</h3>
              <p className="text-slate-400">
                Un expert se déplace chez vous pour analyser les fissures, identifier les causes et évaluer la gravité. 
                Rapport détaillé avec photos et préconisations.
              </p>
            </div>
            <div className="bg-slate-800 rounded-2xl p-8 relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-2xl font-bold">2</div>
              <FileText className="text-orange-400 mb-4" size={40} />
              <h3 className="text-xl font-bold mb-3">Devis personnalisé</h3>
              <p className="text-slate-400">
                Sur la base du diagnostic, nous vous proposons la solution la plus adaptée : agrafage, harpage ou 
                reprise en sous-œuvre. Devis détaillé sous 72h.
              </p>
            </div>
            <div className="bg-slate-800 rounded-2xl p-8 relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-2xl font-bold">3</div>
              <Shield className="text-orange-400 mb-4" size={40} />
              <h3 className="text-xl font-bold mb-3">Travaux garantis 10 ans</h3>
              <p className="text-slate-400">
                Intervention par nos équipes qualifiées. Travaux couverts par notre garantie décennale. 
                Suivi post-travaux inclus.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tarifs indicatifs */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Tarifs indicatifs</h2>
            <p className="text-slate-600">Prix transparents, sans surprise. Devis gratuit personnalisé.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Diagnostic fissures</h3>
              <div className="text-4xl font-extrabold text-orange-600 mb-4">149€</div>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-center gap-2"><CheckCircle size={18} className="text-green-500" /> Déplacement inclus</li>
                <li className="flex items-center gap-2"><CheckCircle size={18} className="text-green-500" /> Rapport détaillé</li>
                <li className="flex items-center gap-2"><CheckCircle size={18} className="text-green-500" /> Préconisations</li>
                <li className="flex items-center gap-2"><CheckCircle size={18} className="text-green-500" /> Déductible des travaux</li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border-2 border-orange-500 p-8 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-600 text-white text-xs font-bold px-4 py-1 rounded-full">POPULAIRE</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Agrafage structurel</h3>
              <div className="text-4xl font-extrabold text-orange-600 mb-4">8 000 - 15 000€</div>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-center gap-2"><CheckCircle size={18} className="text-green-500" /> Solution durable</li>
                <li className="flex items-center gap-2"><CheckCircle size={18} className="text-green-500" /> Garantie décennale</li>
                <li className="flex items-center gap-2"><CheckCircle size={18} className="text-green-500" /> 3x moins cher que micropieux</li>
                <li className="flex items-center gap-2"><CheckCircle size={18} className="text-green-500" /> Travaux en 3-5 jours</li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Micropieux</h3>
              <div className="text-4xl font-extrabold text-orange-600 mb-4">25 000 - 50 000€</div>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-center gap-2"><CheckCircle size={18} className="text-green-500" /> Cas complexes</li>
                <li className="flex items-center gap-2"><CheckCircle size={18} className="text-green-500" /> Fondations profondes</li>
                <li className="flex items-center gap-2"><CheckCircle size={18} className="text-green-500" /> Garantie décennale</li>
                <li className="flex items-center gap-2"><CheckCircle size={18} className="text-green-500" /> Sur devis uniquement</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Questions fréquentes</h2>
          </div>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <details key={index} className="bg-white rounded-xl shadow-sm border border-slate-200 group">
                <summary className="p-6 cursor-pointer font-bold text-slate-900 flex items-center justify-between">
                  {item.question}
                  <span className="text-orange-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-6 pb-6 text-slate-600">{item.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Topic Cluster - Types de fissures */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Guides par type de fissure</h2>
            <p className="text-slate-600">Tout comprendre sur les fissures : causes, gravité et solutions</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/fissure-en-escalier-causes" className="group bg-slate-50 hover:bg-orange-50 border border-slate-200 hover:border-orange-200 rounded-2xl p-6 transition-all">
              <div className="text-3xl mb-3">🪜</div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-orange-600 mb-2">Fissure en escalier</h3>
              <p className="text-slate-600 text-sm">Signe de tassement différentiel. Causes et solutions.</p>
            </Link>
            <Link href="/fissure-horizontale-danger" className="group bg-slate-50 hover:bg-orange-50 border border-slate-200 hover:border-orange-200 rounded-2xl p-6 transition-all">
              <div className="text-3xl mb-3">➖</div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-orange-600 mb-2">Fissure horizontale</h3>
              <p className="text-slate-600 text-sm">Poussée latérale ou désolidarisation. Évaluer le danger.</p>
            </Link>
            <Link href="/microfissure-quand-sinquieter" className="group bg-slate-50 hover:bg-orange-50 border border-slate-200 hover:border-orange-200 rounded-2xl p-6 transition-all">
              <div className="text-3xl mb-3">🔍</div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-orange-600 mb-2">Microfissure</h3>
              <p className="text-slate-600 text-sm">Quand s'inquiéter ? Faïençage vs fissure structurelle.</p>
            </Link>
            <Link href="/fissure-secheresse-indemnisation" className="group bg-slate-50 hover:bg-orange-50 border border-slate-200 hover:border-orange-200 rounded-2xl p-6 transition-all">
              <div className="text-3xl mb-3">☀️</div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-orange-600 mb-2">Fissure sécheresse</h3>
              <p className="text-slate-600 text-sm">Indemnisation CAT-NAT : démarches et délais.</p>
            </Link>
            <Link href="/fissure-fondation-maison" className="group bg-slate-50 hover:bg-orange-50 border border-slate-200 hover:border-orange-200 rounded-2xl p-6 transition-all">
              <div className="text-3xl mb-3">🏠</div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-orange-600 mb-2">Fissure fondation</h3>
              <p className="text-slate-600 text-sm">Problèmes de fondation : signes et réparations.</p>
            </Link>
            <Link href="/blog/agrafage-vs-micropieux-choix" className="group bg-slate-50 hover:bg-orange-50 border border-slate-200 hover:border-orange-200 rounded-2xl p-6 transition-all">
              <div className="text-3xl mb-3">⚖️</div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-orange-600 mb-2">Agrafage vs Micropieux</h3>
              <p className="text-slate-600 text-sm">Comparatif complet pour choisir la bonne solution.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Zone d'intervention */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Zone d'intervention en Haute-Garonne</h2>
            <p className="text-slate-600">Nous intervenons dans toutes les communes du département 31</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {communesHauteGaronne.map((commune) => (
              <span key={commune} className="bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-sm font-medium">
                {commune}
              </span>
            ))}
            <span className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-bold">
              + 150 communes
            </span>
          </div>
          {/* Liens vers pages locales */}
          <div className="mt-8 text-center">
            <p className="text-slate-600 mb-4">Pages dédiées par ville :</p>
            <div className="flex flex-wrap justify-center gap-2">
              {['toulouse', 'colomiers', 'tournefeuille', 'blagnac', 'muret', 'montauban', 'auch'].map((ville) => (
                <Link key={ville} href={`/expert-fissures/${ville}`} className="text-orange-600 hover:text-orange-700 text-sm underline">
                  Expert fissures {ville.charAt(0).toUpperCase() + ville.slice(1)}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Avis Google */}
      <GoogleReviewsSection 
        variant="default" 
        title="Avis de nos clients à Toulouse" 
      />

      {/* CTA Final */}
      <section className="py-16 md:py-24 bg-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
            Votre maison se fissure à Toulouse ?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Diagnostic expert sous 48h. Devis gratuit et sans engagement.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/diagnostic" className="bg-white text-orange-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-50 transition-all flex items-center justify-center gap-2">
              Demander un diagnostic <ArrowRight size={20} />
            </Link>
            <a href="tel:0582953375" className="bg-orange-700 hover:bg-orange-800 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all">
              <Phone size={20} /> 05 82 95 33 75
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
