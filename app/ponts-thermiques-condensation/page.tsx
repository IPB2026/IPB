import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { Thermometer, ArrowRight, Phone, AlertTriangle, CheckCircle, Wind, Droplets, Home } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Ponts Thermiques et Condensation : Diagnostic et Solutions | IPB Expertise',
  description: 'Ponts thermiques, zones froides, condensation : causes et solutions (isolation, ventilation). Expert humidité et thermique Toulouse.',
  keywords: ['pont thermique', 'condensation mur', 'zone froide', 'isolation thermique', 'moisissure angle'],
  alternates: {
    canonical: 'https://www.ipb-expertise.fr/ponts-thermiques-condensation',
  },
  openGraph: {
    title: 'Ponts Thermiques et Condensation : Diagnostic et Solutions',
    description: 'Comprendre et traiter les ponts thermiques responsables de la condensation.',
    url: 'https://www.ipb-expertise.fr/ponts-thermiques-condensation',
    type: 'article',
  },
};

const zonesPontThermique = [
  { zone: "Angles des murs", description: "Jonction mur extérieur / mur intérieur ou plancher", frequence: "Très fréquent" },
  { zone: "Contours de fenêtres", description: "Jonction menuiserie / maçonnerie", frequence: "Très fréquent" },
  { zone: "Plancher bas / murs", description: "Jonction avec cave ou vide sanitaire", frequence: "Fréquent" },
  { zone: "Balcons et terrasses", description: "Dalles en continuité avec le plancher intérieur", frequence: "Fréquent" },
  { zone: "Toiture / murs", description: "Jonction sous-toiture et murs extérieurs", frequence: "Modéré" },
  { zone: "Seuils de portes", description: "Jonction sol intérieur / extérieur", frequence: "Modéré" },
];

const signes = [
  "Moisissures noires dans les angles des pièces",
  "Condensation sur les murs froids le matin",
  "Parois froides au toucher (différence nette)",
  "Peinture qui cloque ou papier qui se décolle localement",
  "Odeur de moisi dans certaines zones",
  "Sensation de froid même avec chauffage",
];

const solutions = [
  {
    nom: "Isolation par l'intérieur (ITI)",
    description: "Ajout d'isolant sur la face intérieure des murs concernés.",
    avantages: ["Moins coûteux", "Pas de modification façade", "Rapide"],
    inconvenients: ["Réduit l'espace intérieur", "Traite pont par pont"],
    prix: "40-80€/m²"
  },
  {
    nom: "Isolation par l'extérieur (ITE)",
    description: "Enveloppe isolante sur toute la façade extérieure.",
    avantages: ["Traite tous les ponts", "Pas de perte de surface", "Efficacité maximale"],
    inconvenients: ["Coût élevé", "Modifie l'aspect extérieur", "Autorisations"],
    prix: "100-200€/m²"
  },
  {
    nom: "Rupture de pont thermique",
    description: "Éléments isolants insérés dans la structure (rupteurs).",
    avantages: ["Solution ciblée", "Efficace", "Discret"],
    inconvenients: ["Travaux lourds", "Surtout en construction neuve"],
    prix: "Variable"
  },
  {
    nom: "VMI (Ventilation Mécanique par Insufflation)",
    description: "Améliore la ventilation pour réduire l'humidité intérieure.",
    avantages: ["Réduit la condensation", "Améliore air intérieur", "Installation simple"],
    inconvenients: ["Ne traite pas l'isolation", "Solution complémentaire"],
    prix: "1500-3000€"
  },
];

const faqItems = [
  {
    question: "Qu'est-ce qu'un pont thermique ?",
    answer: "Un pont thermique est une zone de l'enveloppe du bâtiment où la résistance thermique est plus faible. Le froid passe plus facilement, créant une zone froide où l'humidité de l'air se condense."
  },
  {
    question: "Comment savoir si j'ai des ponts thermiques ?",
    answer: "Les signes révélateurs : moisissures dans les angles, condensation localisée, zones froides au toucher. Une caméra thermique permet de visualiser précisément les ponts thermiques."
  },
  {
    question: "Les ponts thermiques sont-ils dangereux ?",
    answer: "Ils ne sont pas dangereux structurellement, mais la condensation qu'ils génèrent favorise les moisissures, néfastes pour la santé. Ils augmentent aussi significativement les dépenses de chauffage."
  },
  {
    question: "Peut-on traiter les ponts thermiques sans gros travaux ?",
    answer: "Partiellement. Une VMI et une bonne ventilation réduisent la condensation. Mais pour un traitement efficace et durable, l'isolation (au moins localisée) est nécessaire."
  },
];

const jsonLdArticle = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Ponts Thermiques et Condensation : Diagnostic et Solutions",
  "description": "Guide complet sur les ponts thermiques et leur traitement.",
  "author": { "@type": "Organization", "name": "IPB Expertise" },
  "publisher": {
    "@type": "Organization",
    "name": "IPB - Institut de Pathologie du Bâtiment",
    "logo": { "@type": "ImageObject", "url": "https://www.ipb-expertise.fr/images/IPB_Logo_HD.png" }
  },
  "datePublished": "2024-01-15",
  "dateModified": new Date().toISOString(),
};

const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqItems.map(item => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": { "@type": "Answer", "text": item.answer }
  }))
};

export default function PontsThermiquesCondensationPage() {
  return (
    <div className="font-sans text-slate-800 bg-slate-50 antialiased">
      <Script id="article-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }} />
      <Script id="faq-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }} />
      
      <TopBar />
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex text-sm text-slate-500">
            <Link href="/" className="hover:text-orange-600">Accueil</Link>
            <span className="mx-2">/</span>
            <Link href="/expert-humidite-toulouse-31" className="hover:text-orange-600">Expert Humidité</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-900">Ponts Thermiques</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-900 to-purple-900 text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-2 text-purple-300 text-sm font-bold mb-4">
            <Thermometer size={18} />
            <span>Problème thermique</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            Ponts Thermiques : <br/>
            <span className="text-purple-300">Causes de Condensation</span>
          </h1>
          <p className="text-xl text-indigo-200 mb-8">
            Ces zones froides de votre maison où l'humidité se condense et les moisissures 
            prolifèrent. Comprendre le problème pour mieux le traiter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/diagnostic" className="bg-purple-500 hover:bg-purple-400 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2">
              Diagnostic thermique <ArrowRight size={18} />
            </Link>
            <a href="tel:0582953375" className="bg-white/10 border border-white/20 px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2">
              <Phone size={18} /> 05 82 95 33 75
            </a>
          </div>
        </div>
      </section>

      {/* Explication */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-8">
            Comprendre les ponts thermiques
          </h2>
          <div className="prose prose-lg max-w-none mb-8">
            <p>
              Un <strong>pont thermique</strong> est une zone où l'isolation est interrompue ou affaiblie. 
              À cet endroit, le froid extérieur pénètre plus facilement, créant une <strong>zone froide</strong> 
              à l'intérieur du bâtiment.
            </p>
            <p>
              Quand l'air chaud et humide de la pièce entre en contact avec cette paroi froide, 
              la vapeur d'eau qu'il contient se <strong>condense</strong> (comme la buée sur une vitre froide). 
              Cette humidité persistante favorise les <strong>moisissures</strong>.
            </p>
          </div>

          {/* Schéma visuel */}
          <div className="bg-gradient-to-r from-blue-50 to-red-50 rounded-2xl p-8">
            <div className="flex items-center justify-between text-center">
              <div className="flex-1">
                <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">❄️</span>
                </div>
                <p className="font-bold text-blue-900">Extérieur froid</p>
                <p className="text-sm text-blue-700">5°C</p>
              </div>
              <div className="flex-1">
                <div className="w-20 h-20 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-3 relative">
                  <span className="text-white font-bold text-xs">Zone froide</span>
                  <div className="absolute -top-2 right-0 bg-amber-400 rounded-full p-1">
                    <Droplets className="text-amber-800" size={14} />
                  </div>
                </div>
                <p className="font-bold text-purple-900">Pont thermique</p>
                <p className="text-sm text-purple-700">12°C → Condensation !</p>
              </div>
              <div className="flex-1">
                <div className="w-16 h-16 bg-red-200 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🔥</span>
                </div>
                <p className="font-bold text-red-900">Intérieur chauffé</p>
                <p className="text-sm text-red-700">20°C</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Zones concernées */}
      <section className="py-16 bg-slate-100">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-8 text-center">
            Où se trouvent les ponts thermiques ?
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {zonesPontThermique.map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-slate-900">{item.zone}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                    item.frequence === 'Très fréquent' ? 'bg-red-100 text-red-700' :
                    item.frequence === 'Fréquent' ? 'bg-amber-100 text-amber-700' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {item.frequence}
                  </span>
                </div>
                <p className="text-sm text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signes */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-8 text-center">
            Signes révélateurs
          </h2>
          <div className="bg-amber-50 rounded-2xl p-8 border border-amber-200">
            <p className="text-amber-800 mb-6">
              Un ou plusieurs de ces signes indiquent probablement la présence de ponts thermiques :
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {signes.map((signe, index) => (
                <div key={index} className="flex items-start gap-3">
                  <AlertTriangle className="text-amber-600 flex-shrink-0 mt-0.5" size={18} />
                  <span className="text-slate-700">{signe}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-16 bg-slate-100">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-8 text-center">
            Solutions de traitement
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {solutions.map((solution, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{solution.nom}</h3>
                <p className="text-slate-600 text-sm mb-4">{solution.description}</p>
                
                <div className="space-y-3 mb-4">
                  <div>
                    <p className="text-sm font-bold text-green-700 mb-1">✓ Avantages</p>
                    <ul className="space-y-1">
                      {solution.avantages.map((a, i) => (
                        <li key={i} className="text-sm text-slate-600 flex items-center gap-2">
                          <CheckCircle className="text-green-500" size={14} />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-red-700 mb-1">✗ Inconvénients</p>
                    <ul className="space-y-1">
                      {solution.inconvenients.map((i, idx) => (
                        <li key={idx} className="text-sm text-slate-600 flex items-center gap-2">
                          <span className="w-3.5 h-3.5 flex items-center justify-center text-red-500">–</span>
                          {i}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <p className="text-sm"><strong>Prix indicatif :</strong> {solution.prix}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold mb-6">Moisissures dans les angles ?</h2>
          <p className="text-xl text-indigo-100 mb-8">
            Un diagnostic thermique permet d'identifier précisément les ponts thermiques 
            et de proposer la solution la plus adaptée.
          </p>
          <Link href="/diagnostic" className="inline-flex items-center gap-2 bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-50">
            Demander un diagnostic <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-8 text-center">
            Questions fréquentes
          </h2>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">{item.question}</h3>
                <p className="text-slate-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Liens hub */}
      <section className="py-16 bg-slate-100">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-8 text-center">
            Articles connexes
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/vmi-ventilation-insufflation" className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 hover:border-purple-300 transition-all group">
              <Wind className="text-purple-600 mb-3" size={28} />
              <h3 className="font-bold text-slate-900 group-hover:text-purple-600 mb-2">VMI / Ventilation</h3>
              <p className="text-slate-600 text-sm">Réduire la condensation</p>
            </Link>
            <Link href="/moisissures-maison-sante" className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 hover:border-purple-300 transition-all group">
              <AlertTriangle className="text-purple-600 mb-3" size={28} />
              <h3 className="font-bold text-slate-900 group-hover:text-purple-600 mb-2">Moisissures et Santé</h3>
              <p className="text-slate-600 text-sm">Risques et traitement</p>
            </Link>
            <Link href="/expert-humidite-toulouse-31" className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 hover:border-purple-300 transition-all group">
              <Home className="text-purple-600 mb-3" size={28} />
              <h3 className="font-bold text-slate-900 group-hover:text-purple-600 mb-2">Expert Humidité</h3>
              <p className="text-slate-600 text-sm">Tous nos services</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold mb-6">Stoppez la condensation</h2>
          <p className="text-xl text-slate-300 mb-8">
            Diagnostic sous 48h pour identifier vos ponts thermiques et proposer des solutions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/diagnostic" className="bg-purple-600 hover:bg-purple-500 px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2">
              Diagnostic gratuit <ArrowRight size={20} />
            </Link>
            <a href="tel:0582953375" className="bg-white/10 border border-white/20 hover:bg-white/20 px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2">
              <Phone size={20} /> 05 82 95 33 75
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
