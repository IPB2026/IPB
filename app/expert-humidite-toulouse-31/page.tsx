import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { CheckCircle, Phone, ArrowRight, MapPin, Droplets, Shield, FileText, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Expert Humidité Toulouse (31) | Traitement Définitif | IPB Expertise',
  description: 'Expert humidité maison à Toulouse. Injection résine, cuvelage, VMI. Garantie 30 ans. Diagnostic gratuit →',
  keywords: ['expert humidité toulouse', 'traitement humidité 31', 'remontées capillaires toulouse', 'injection résine toulouse'],
  alternates: {
    canonical: 'https://www.ipb-expertise.fr/expert-humidite-toulouse-31',
  },
  openGraph: {
    title: 'Expert Humidité Toulouse (31) | IPB Expertise',
    description: 'Traitement définitif de l\'humidité à Toulouse. Diagnostic sous 48h.',
    url: 'https://www.ipb-expertise.fr/expert-humidite-toulouse-31',
  },
};

const communesHauteGaronne = [
  'Toulouse', 'Colomiers', 'Tournefeuille', 'Blagnac', 'Muret', 'Cugnaux', 
  'Plaisance-du-Touch', 'Balma', 'L\'Union', 'Ramonville-Saint-Agne'
];

const faqItems = [
  {
    question: "Comment savoir si j'ai des remontées capillaires ?",
    answer: "Les signes typiques sont : salpêtre (poudre blanche), peinture qui cloque, papier peint qui se décolle, odeur de moisi, taches d'humidité en bas des murs (jusqu'à 1,5m de haut)."
  },
  {
    question: "Combien coûte un traitement humidité à Toulouse ?",
    answer: "Le traitement par injection résine coûte entre 80 et 150€/ml de mur traité. Pour une maison moyenne, comptez 2500 à 6000€. Diagnostic à 149€ déductible des travaux."
  },
  {
    question: "Quelle est la durée de la garantie ?",
    answer: "Nos traitements par injection sont garantis 30 ans. C'est la solution la plus durable contre les remontées capillaires."
  },
  {
    question: "Combien de temps pour assécher les murs ?",
    answer: "Après injection, les murs s'assèchent progressivement en 6 à 12 mois selon leur épaisseur. Le traitement est efficace immédiatement, seul le séchage prend du temps."
  },
  {
    question: "Intervenez-vous en cave et sous-sol ?",
    answer: "Oui, nous proposons le cuvelage pour les caves et sous-sols. C'est la solution pour les espaces enterrés soumis à la pression de l'eau."
  }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "IPB - Expert Humidité Toulouse",
  "description": "Expert en traitement de l'humidité à Toulouse : injection résine, cuvelage, VMI",
  "url": "https://www.ipb-expertise.fr/expert-humidite-toulouse-31",
  "telephone": "+33582953375",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Toulouse",
    "addressRegion": "Haute-Garonne",
    "postalCode": "31000",
    "addressCountry": "FR"
  },
  "areaServed": { "@type": "State", "name": "Haute-Garonne" }
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

export default function ExpertHumiditeToulouse31Page() {
  return (
    <div className="font-sans text-slate-800 bg-slate-50 antialiased">
      <Script id="jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Script id="faq-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      
      <TopBar />
      <Navbar />

      {/* Hero */}
      <section className="relative bg-slate-900 text-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950/30"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-blue-400 text-sm font-bold mb-4">
              <MapPin size={18} />
              <span>Toulouse & Haute-Garonne (31)</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              Expert Humidité à <span className="text-blue-400">Toulouse</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl">
              Murs humides, salpêtre, moisissures ? Diagnostic expert sous 48h. 
              Traitement définitif par injection résine, garanti 30 ans.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/diagnostic" className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all">
                Diagnostic gratuit <ArrowRight size={20} />
              </Link>
              <a href="tel:0582953375" className="bg-white/10 border border-white/20 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all">
                <Phone size={20} /> 05 82 95 33 75
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-extrabold text-blue-600">523</div>
              <div className="text-slate-600 mt-1">Maisons assainies</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-blue-600">30 ans</div>
              <div className="text-slate-600 mt-1">Garantie injection</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-blue-600">48h</div>
              <div className="text-slate-600 mt-1">Délai intervention</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-blue-600">98%</div>
              <div className="text-slate-600 mt-1">Clients satisfaits</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problématiques */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              Problèmes d'humidité que nous traitons
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '💧', title: 'Remontées capillaires', desc: 'Humidité qui monte du sol dans les murs' },
              { icon: '🧂', title: 'Salpêtre', desc: 'Dépôts blancs sur les murs humides' },
              { icon: '🍄', title: 'Moisissures', desc: 'Champignons sur murs et plafonds' },
              { icon: '🏠', title: 'Cave humide', desc: 'Infiltrations et condensation en sous-sol' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-16 md:py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Nos solutions professionnelles</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800 rounded-2xl p-8">
              <Droplets className="text-blue-400 mb-4" size={40} />
              <h3 className="text-xl font-bold mb-3">Injection résine</h3>
              <p className="text-slate-400 mb-4">Barrière étanche injectée dans le mur. Stoppe définitivement les remontées capillaires.</p>
              <div className="text-blue-400 font-bold">Garantie 30 ans</div>
            </div>
            <div className="bg-slate-800 rounded-2xl p-8">
              <Shield className="text-blue-400 mb-4" size={40} />
              <h3 className="text-xl font-bold mb-3">Cuvelage cave</h3>
              <p className="text-slate-400 mb-4">Étanchéité totale des sous-sols et caves par application d'un revêtement imperméable.</p>
              <div className="text-blue-400 font-bold">Garantie 10 ans</div>
            </div>
            <div className="bg-slate-800 rounded-2xl p-8">
              <FileText className="text-blue-400 mb-4" size={40} />
              <h3 className="text-xl font-bold mb-3">VMI / Ventilation</h3>
              <p className="text-slate-400 mb-4">Système de ventilation pour traiter les problèmes de condensation et améliorer l'air.</p>
              <div className="text-blue-400 font-bold">Solution complémentaire</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tarifs */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Tarifs traitement humidité</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 text-center">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Diagnostic</h3>
              <div className="text-4xl font-extrabold text-blue-600 mb-4">149€</div>
              <p className="text-slate-600">Déductible des travaux</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border-2 border-blue-500 p-8 text-center">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Injection résine</h3>
              <div className="text-4xl font-extrabold text-blue-600 mb-4">2,5-6K€</div>
              <p className="text-slate-600">Garantie 30 ans</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 text-center">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Cuvelage cave</h3>
              <div className="text-4xl font-extrabold text-blue-600 mb-4">Sur devis</div>
              <p className="text-slate-600">Selon surface</p>
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
                  <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-6 pb-6 text-slate-600">{item.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Topic Cluster - Types d'humidité */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Guides par type d'humidité</h2>
            <p className="text-slate-600">Tout comprendre sur les problèmes d'humidité : causes, diagnostic et solutions</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/remontees-capillaires-traitement" className="group bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-2xl p-6 transition-all">
              <div className="text-3xl mb-3">💧</div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 mb-2">Remontées capillaires</h3>
              <p className="text-slate-600 text-sm">L'eau du sol remonte dans vos murs. Causes, diagnostic et traitements.</p>
            </Link>
            <Link href="/moisissures-maison-sante" className="group bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-2xl p-6 transition-all">
              <div className="text-3xl mb-3">🍄</div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 mb-2">Moisissures & Santé</h3>
              <p className="text-slate-600 text-sm">Risques pour la santé et traitement efficace des moisissures.</p>
            </Link>
            <Link href="/cave-humide-solutions" className="group bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-2xl p-6 transition-all">
              <div className="text-3xl mb-3">🏚️</div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 mb-2">Cave humide</h3>
              <p className="text-slate-600 text-sm">Cuvelage, drainage, pompe : solutions pour caves et sous-sols.</p>
            </Link>
            <Link href="/ponts-thermiques-condensation" className="group bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-2xl p-6 transition-all">
              <div className="text-3xl mb-3">🌡️</div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 mb-2">Ponts thermiques</h3>
              <p className="text-slate-600 text-sm">Zones froides et condensation : diagnostic et isolation.</p>
            </Link>
            <Link href="/salpetre-mur-traitement" className="group bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-2xl p-6 transition-all">
              <div className="text-3xl mb-3">🧂</div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 mb-2">Salpêtre</h3>
              <p className="text-slate-600 text-sm">Poudre blanche sur vos murs ? Causes et traitement définitif.</p>
            </Link>
            <Link href="/condensation-ou-infiltration" className="group bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-2xl p-6 transition-all">
              <div className="text-3xl mb-3">🌧️</div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 mb-2">Condensation vs Infiltration</h3>
              <p className="text-slate-600 text-sm">Comment différencier et traiter ces deux problèmes.</p>
            </Link>
            <Link href="/merule-champignon-traitement" className="group bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-2xl p-6 transition-all">
              <div className="text-3xl mb-3">🦠</div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 mb-2">Mérule</h3>
              <p className="text-slate-600 text-sm">Le champignon destructeur : identification et traitement d'urgence.</p>
            </Link>
            <Link href="/vmi-ventilation-insufflation" className="group bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-2xl p-6 transition-all">
              <div className="text-3xl mb-3">🌀</div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 mb-2">VMI®</h3>
              <p className="text-slate-600 text-sm">La ventilation par insufflation contre condensation et moisissures.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Zones */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Zone d'intervention</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {communesHauteGaronne.map((commune) => (
              <span key={commune} className="bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-sm font-medium">
                {commune}
              </span>
            ))}
            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold">+ 150 communes</span>
          </div>
          {/* Liens vers pages locales */}
          <div className="mt-8 text-center">
            <p className="text-slate-600 mb-4">Pages dédiées par ville :</p>
            <div className="flex flex-wrap justify-center gap-2">
              {['toulouse', 'colomiers', 'tournefeuille', 'blagnac', 'muret', 'montauban', 'auch'].map((ville) => (
                <Link key={ville} href={`/expert-humidite/${ville}`} className="text-blue-600 hover:text-blue-700 text-sm underline">
                  Expert humidité {ville.charAt(0).toUpperCase() + ville.slice(1)}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Murs humides à Toulouse ?</h2>
          <p className="text-xl text-blue-100 mb-8">Diagnostic expert sous 48h. Traitement garanti 30 ans.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/diagnostic" className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all flex items-center justify-center gap-2">
              Demander un diagnostic <ArrowRight size={20} />
            </Link>
            <a href="tel:0582953375" className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all">
              <Phone size={20} /> 05 82 95 33 75
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
