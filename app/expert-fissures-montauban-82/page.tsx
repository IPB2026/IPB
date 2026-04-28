import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { CheckCircle, Phone, ArrowRight, MapPin, AlertTriangle, Shield, FileText, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Expert Fissures Montauban (82) | Diagnostic Indépendant | IPB Expertise',
  description: 'Expert fissures maison à Montauban et Tarn-et-Garonne (82). Diagnostic instrumenté sous 48h, agrafage structurel garanti 10 ans, garantie décennale. 850+ diagnostics en Occitanie.',
  keywords: ['expert fissures montauban', 'fissures maison 82', 'diagnostic fissures tarn-et-garonne', 'expert bâtiment montauban'],
  alternates: {
    canonical: 'https://www.ipb-expertise.fr/expert-fissures-montauban-82',
  },
  openGraph: {
    title: 'Expert Fissures Montauban (82) | IPB Expertise',
    description: 'Expert indépendant en fissures à Montauban. Diagnostic complet sous 48h.',
    url: 'https://www.ipb-expertise.fr/expert-fissures-montauban-82',
  },
};

const communesTarnEtGaronne = [
  'Montauban', 'Castelsarrasin', 'Moissac', 'Caussade', 'Montech', 
  'Valence d\'Agen', 'Beaumont-de-Lomagne', 'Grisolles', 'Labastide-Saint-Pierre',
  'Nègrepelisse', 'Verdun-sur-Garonne', 'Lafrançaise'
];

const faqItems = [
  {
    question: "Intervenez-vous sur tout le Tarn-et-Garonne ?",
    answer: "Oui, nous couvrons l'intégralité du département 82 : Montauban, Castelsarrasin, Moissac, Caussade et toutes les communes environnantes. Déplacement inclus dans le diagnostic."
  },
  {
    question: "Le Tarn-et-Garonne est-il touché par les fissures ?",
    answer: "Oui, le département 82 présente des sols argileux similaires à la Haute-Garonne. De nombreuses communes ont été reconnues en catastrophe naturelle sécheresse ces dernières années."
  },
  {
    question: "Le diagnostic est-il gratuit à Montauban ?",
    answer: "Le diagnostic est une vraie expertise technique sur site : c'est une prestation payante qui inclut le déplacement, l'analyse complète et un rapport détaillé. La bonne nouvelle : son montant est intégralement déduit si vous nous confiez les travaux."
  },
  {
    question: "Combien de temps pour recevoir le rapport ?",
    answer: "Vous recevez votre rapport détaillé sous 48 à 72h après la visite, avec photos, analyse et préconisations de traitement."
  },
  {
    question: "Proposez-vous des facilités de paiement ?",
    answer: "Oui, nous proposons des facilités de paiement en 3 ou 4 fois sans frais pour les travaux supérieurs à 3000€."
  }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "IPB - Expert Fissures Montauban",
  "description": "Expert indépendant en diagnostic et traitement des fissures à Montauban et Tarn-et-Garonne",
  "url": "https://www.ipb-expertise.fr/expert-fissures-montauban-82",
  "telephone": "+33582953375",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Montauban",
    "addressRegion": "Tarn-et-Garonne",
    "postalCode": "82000",
    "addressCountry": "FR"
  },
  "areaServed": {
    "@type": "State",
    "name": "Tarn-et-Garonne"
  }
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqItems.map(item => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": { "@type": "Answer", "text": item.answer }
  }))
};

export default function ExpertFissuresMontauban82Page() {
  return (
    <div className="font-sans text-ipb-text bg-ipb-cream antialiased">
      <Script id="local-business-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Script id="faq-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      
      <TopBar />
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-ipb-navy text-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-orange-950/30"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-ipb-orange-l text-sm font-bold mb-4">
              <MapPin size={18} />
              <span>Montauban & Tarn-et-Garonne (82)</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              Expert Fissures à <span className="text-ipb-orange-l">Montauban</span>
            </h1>
            <p className="text-xl text-white/70 mb-8 max-w-2xl">
              Votre maison présente des fissures ? Expert indépendant intervenant sur tout le Tarn-et-Garonne. 
              Diagnostic complet sous 48h, solutions durables.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/diagnostic" className="bg-ipb-orange hover:bg-ipb-orange text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all">
                Diagnostic gratuit <ArrowRight size={20} />
              </Link>
              <a href="tel:0582953375" className="bg-white/10 border border-white/20 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all">
                <Phone size={20} /> 05 82 95 33 75
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Statistiques */}
      <section className="py-12 bg-white border-b border-ipb-rule">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-extrabold text-ipb-orange">234</div>
              <div className="text-ipb-muted mt-1">Diagnostics en 82</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-ipb-orange">97%</div>
              <div className="text-ipb-muted mt-1">Clients satisfaits</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-ipb-orange">48h</div>
              <div className="text-ipb-muted mt-1">Délai d'intervention</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-ipb-orange">10 ans</div>
              <div className="text-ipb-muted mt-1">Garantie décennale</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contexte local */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-ipb-text mb-6">
                Fissures à Montauban : un problème croissant
              </h2>
              <div className="prose prose-lg text-ipb-muted">
                <p>
                  Le <strong>Tarn-et-Garonne</strong> connaît les mêmes problématiques que ses voisins : des sols argileux 
                  qui réagissent fortement aux variations climatiques. Les périodes de sécheresse suivies de pluies 
                  provoquent des mouvements de terrain qui fissurent les constructions.
                </p>
                <p>
                  <strong>Montauban</strong> et ses environs (Castelsarrasin, Moissac, Caussade) sont particulièrement 
                  concernés. Les maisons individuelles construites avant 2000 sont les plus vulnérables.
                </p>
              </div>
              <div className="mt-8 p-6 bg-ipb-stone border-l-4 border-ipb-orange rounded-r-xl">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="text-ipb-orange flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-bold text-ipb-text">Faible concurrence = intervention rapide</h3>
                    <p className="text-ipb-muted mt-1">
                      Peu d'experts interviennent sur le Tarn-et-Garonne. Nous garantissons une intervention sous 48h 
                      sur tout le département.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-ipb-stone rounded-2xl p-8">
              <h3 className="text-xl font-bold text-ipb-text mb-4">Communes couvertes en 82</h3>
              <div className="grid grid-cols-2 gap-3">
                {communesTarnEtGaronne.map((commune) => (
                  <div key={commune} className="flex items-center gap-2 text-ipb-text">
                    <CheckCircle size={16} className="text-ipb-orange" />
                    <span>{commune}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Processus */}
      <section className="py-16 md:py-24 bg-ipb-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Notre intervention en 3 étapes</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-ipb-navy-2 rounded-2xl p-8 relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-ipb-orange rounded-full flex items-center justify-center text-2xl font-bold">1</div>
              <Clock className="text-ipb-orange-l mb-4" size={40} />
              <h3 className="text-xl font-bold mb-3">Diagnostic expert</h3>
              <p className="text-ipb-light">Visite sur site sous 48h. Analyse des fissures, identification des causes, rapport détaillé avec photos.</p>
            </div>
            <div className="bg-ipb-navy-2 rounded-2xl p-8 relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-ipb-orange rounded-full flex items-center justify-center text-2xl font-bold">2</div>
              <FileText className="text-ipb-orange-l mb-4" size={40} />
              <h3 className="text-xl font-bold mb-3">Devis détaillé</h3>
              <p className="text-ipb-light">Solution adaptée à votre cas : agrafage, harpage ou micropieux. Devis transparent sous 72h.</p>
            </div>
            <div className="bg-ipb-navy-2 rounded-2xl p-8 relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-ipb-orange rounded-full flex items-center justify-center text-2xl font-bold">3</div>
              <Shield className="text-ipb-orange-l mb-4" size={40} />
              <h3 className="text-xl font-bold mb-3">Travaux garantis</h3>
              <p className="text-ipb-light">Intervention professionnelle avec garantie décennale. Suivi post-travaux inclus.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contexte RGA Tarn-et-Garonne */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-ipb-text mb-8">
            Le Tarn-et-Garonne : l&apos;un des départements les plus exposés au RGA
          </h2>
          
          <div className="space-y-6 text-ipb-text text-lg leading-relaxed">
            <p>
              Le <strong>retrait-gonflement des argiles (RGA)</strong> est la première cause de fissuration des maisons en France. Le Tarn-et-Garonne fait partie des départements les plus touchés : <strong>plus de 70% du territoire est classé en risque moyen à fort</strong>. Les communes de Montauban, Castelsarrasin, Moissac, Caussade et Valence-d&apos;Agen sont particulièrement concernées.
            </p>

            <p>
              Le mécanisme est simple mais redoutable : quand il fait sec, les sols argileux se rétractent et créent des <strong>vides sous les fondations</strong>. Quand il pleut, ils gonflent et exercent une pression latérale. Ce cycle répété provoque des <strong>tassements différentiels</strong> : une partie de la maison s&apos;enfonce plus que l&apos;autre, créant des fissures caractéristiques en escalier.
            </p>

            <div className="bg-ipb-stone border-l-4 border-ipb-orange p-6 rounded-r-lg my-8">
              <p className="font-bold text-orange-900 mb-2">Chiffre clé :</p>
              <p className="text-orange-800">Depuis 2020, <strong>23 communes du Tarn-et-Garonne</strong> ont bénéficié d&apos;au moins un arrêté de catastrophe naturelle sécheresse. Si votre commune est concernée, votre assurance peut prendre en charge les réparations — à condition de déclarer dans les 10 jours.</p>
            </div>

            <h3 className="text-xl font-bold text-ipb-text mt-8 mb-4">Les types de fissures que nous traitons à Montauban</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="text-ipb-orange mt-1 flex-shrink-0" size={18} />
                <span><strong>Fissures en escalier</strong> : suivent les joints de maçonnerie, signe de tassement différentiel</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-ipb-orange mt-1 flex-shrink-0" size={18} />
                <span><strong>Fissures horizontales</strong> : sur murs porteurs, indiquent une poussée latérale du sol</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-ipb-orange mt-1 flex-shrink-0" size={18} />
                <span><strong>Fissures autour des ouvertures</strong> : portes et fenêtres qui frottent ou ne ferment plus</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-ipb-orange mt-1 flex-shrink-0" size={18} />
                <span><strong>Fissures de fondation</strong> : visibles en bas des murs, nécessitent un diagnostic technique</span>
              </li>
            </ul>

            <h3 className="text-xl font-bold text-ipb-text mt-8 mb-4">L&apos;agrafage : la solution la plus adaptée au 82</h3>
            <p>
              Pour 90% des maisons fissurées du Tarn-et-Garonne, l&apos;<strong>agrafage structurel</strong> est la solution optimale. Cette technique redonne au mur sa cohérence monolithique en insérant des agrafes en acier inoxydable dans des saignées, puis en les scellant avec un mortier haute performance. Le résultat : un mur stabilisé, une <strong>garantie décennale</strong>, et un coût <strong>3 fois inférieur aux micropieux</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Guides fissures - Topic Cluster */}
      <section className="py-16 md:py-24 bg-ipb-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-ipb-text mb-4">Guides par type de fissure</h2>
            <p className="text-ipb-muted">Tout comprendre sur les fissures : causes, diagnostic et solutions</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { href: '/fissure-en-escalier-causes', icon: '📐', title: 'Fissure en escalier', desc: 'Causes et solutions pour les fissures en marches d\'escalier' },
              { href: '/fissure-horizontale-danger', icon: '➖', title: 'Fissure horizontale', desc: 'Danger structurel : quand intervenir en urgence' },
              { href: '/microfissure-quand-sinquieter', icon: '🔍', title: 'Microfissure', desc: 'Comment différencier une fissure bénigne d\'un danger' },
              { href: '/fissure-secheresse-indemnisation', icon: '☀️', title: 'Sécheresse & CAT-NAT', desc: 'Démarches pour être indemnisé par votre assurance' },
              { href: '/fissure-fondation-maison', icon: '🏠', title: 'Fissure de fondation', desc: 'Quand les fondations sont en cause : solutions' },
              { href: '/expertise/fissures', icon: '📋', title: 'Guide complet fissures', desc: 'Notre expertise complète en traitement des fissures' },
            ].map((item, i) => (
              <Link key={i} href={item.href} className="group bg-white hover:bg-ipb-stone border border-ipb-rule hover:border-ipb-rule rounded-2xl p-6 transition-all">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-bold text-ipb-text group-hover:text-ipb-orange mb-2">{item.title}</h3>
                <p className="text-ipb-muted text-sm">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tarifs */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-ipb-text mb-4">Nos tarifs à Montauban</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg border border-ipb-rule p-8 text-center">
              <h3 className="text-xl font-bold text-ipb-text mb-2">Diagnostic</h3>
              <div className="inline-block bg-green-100 text-green-700 text-sm font-bold px-3 py-1 rounded-full mb-2">Déduit à 100% des travaux</div>
              <p className="text-ipb-muted">Expertise sur site · Rapport détaillé</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border-2 border-ipb-orange p-8 text-center">
              <h3 className="text-xl font-bold text-ipb-text mb-2">Agrafage</h3>
              <div className="text-4xl font-extrabold text-ipb-orange mb-4">8-15K€</div>
              <p className="text-ipb-muted">Garantie 10 ans</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border border-ipb-rule p-8 text-center">
              <h3 className="text-xl font-bold text-ipb-text mb-2">Micropieux</h3>
              <div className="text-4xl font-extrabold text-ipb-orange mb-4">25-50K€</div>
              <p className="text-ipb-muted">Cas complexes</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-ipb-stone">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-ipb-text mb-4">Questions fréquentes</h2>
          </div>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <details key={index} className="bg-white rounded-xl shadow-sm border border-ipb-rule group">
                <summary className="p-6 cursor-pointer font-bold text-ipb-text flex items-center justify-between">
                  {item.question}
                  <span className="text-ipb-orange group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-6 pb-6 text-ipb-muted">{item.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-ipb-orange text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
            Expert fissures à Montauban
          </h2>
          <p className="text-xl text-ipb-orange-l mb-8">
            Diagnostic sous 48h sur tout le Tarn-et-Garonne. Devis gratuit.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/diagnostic" className="bg-white text-ipb-orange px-8 py-4 rounded-xl font-bold text-lg hover:bg-ipb-stone transition-all flex items-center justify-center gap-2">
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
