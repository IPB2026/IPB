import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { SmartBackBar } from "@/components/ui/SmartBackBar";
import { Footer } from '@/components/home/Footer';
import { Testimonials } from '@/components/home/Testimonials';
import { CheckCircle, Phone, ArrowRight, MapPin, Droplets, Shield, FileText, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Expert Humidité Toulouse (31) | Injection Résine | IPB',
  description: 'Expert humidité à Toulouse et Haute-Garonne. Traitement remontées capillaires, salpêtre, moisissures. Injection résine garantie 30 ans. 05 82 95 33 75.',
  keywords: [
    'expert humidité toulouse',
    'traitement humidité maison 31',
    'remontées capillaires toulouse',
    'injection résine hydrophobe',
    'salpêtre mur traitement',
    'moisissures maison toulouse',
    'cave humide toulouse',
    'cuvelage cave 31',
    'VMI ventilation toulouse',
    'humidité mur intérieur',
    'condensation maison',
    'infiltration eau mur',
    'ponts thermiques traitement',
    'mérule toulouse',
    'assèchement murs humides',
    'diagnostic humidité toulouse',
    'prix injection résine',
    'devis traitement humidité',
  ],
  alternates: {
    canonical: 'https://www.ipb-expertise.fr/expert-humidite-toulouse-31',
  },
  openGraph: {
    title: 'Expert Humidité Toulouse (31) | Injection & Cuvelage | IPB',
    description: 'Traitement définitif humidité à Toulouse. Remontées capillaires, salpêtre, moisissures. Résultat visible 3 mois. Garantie 30 ans.',
    url: 'https://www.ipb-expertise.fr/expert-humidite-toulouse-31',
    type: 'website',
    images: [{
      url: '/images/salpetre-avant-apres.webp',
      width: 1200,
      height: 630,
      alt: 'Expert humidité Toulouse Montauban Auch - Traitement salpêtre - IPB Occitanie',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Expert Humidité Toulouse | IPB',
    description: 'Injection résine garantie 30 ans. Diagnostic 48h.',
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
  'Plaisance-du-Touch', 'Balma', 'L\'Union', 'Ramonville-Saint-Agne'
];

const faqItems = [
  {
    question: "Comment savoir si j'ai des remontées capillaires ?",
    answer: "Les signes typiques sont : salpêtre (poudre blanche), peinture qui cloque, papier peint qui se décolle, odeur de moisi, taches d'humidité en bas des murs (jusqu'à 1,5m de haut)."
  },
  {
    question: "Combien coûte un traitement humidité à Toulouse ?",
    answer: "Le traitement par injection résine coûte entre 80 et 150€/ml de mur traité. Pour une maison moyenne, comptez 2500 à 6000€. Le diagnostic est une prestation sur site, déductible des travaux."
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
  "description": "Expert en traitement de l'humidité : Toulouse, Montauban, Auch (31-82-32). Injection résine, cuvelage, VMI.",
  "url": "https://www.ipb-expertise.fr/expert-humidite-toulouse-31",
  "telephone": "+33582953375",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Toulouse",
    "addressRegion": "Occitanie",
    "postalCode": "31000",
    "addressCountry": "FR"
  },
  "areaServed": [
    { "@type": "AdministrativeArea", "name": "Haute-Garonne (31)" },
    { "@type": "AdministrativeArea", "name": "Tarn-et-Garonne (82)" },
    { "@type": "AdministrativeArea", "name": "Gers (32)" }
  ]
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
    <div className="font-sans text-ipb-text bg-ipb-cream antialiased">
      <Script id="jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Script id="faq-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      
      <TopBar />
      <Navbar />
      <SmartBackBar />

      {/* Hero */}
      <section className="relative bg-ipb-navy text-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950/30"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-blue-400 text-sm font-bold mb-4">
              <MapPin size={18} />
              <span>Toulouse • Montauban • Auch (31-82-32)</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              Expert Humidité à <span className="text-blue-400">Toulouse</span>
            </h1>
            <p className="text-xl text-white/70 mb-8 max-w-2xl">
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
      <section className="py-12 bg-white border-b border-ipb-rule">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-extrabold text-blue-600">523</div>
              <div className="text-ipb-muted mt-1">Maisons assainies</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-blue-600">30 ans</div>
              <div className="text-ipb-muted mt-1">Garantie injection</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-blue-600">48h</div>
              <div className="text-ipb-muted mt-1">Délai intervention</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-blue-600">98%</div>
              <div className="text-ipb-muted mt-1">Clients satisfaits</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problématiques */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-ipb-text mb-4">
              Problèmes d'humidité que nous traitons
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { href: '/remontee-capillaire-solution', icon: '💧', title: 'Remontées capillaires', desc: 'Humidité qui monte du sol dans les murs' },
              { href: '/salpetre-mur-traitement', icon: '🧂', title: 'Salpêtre', desc: 'Dépôts blancs sur les murs humides' },
              { href: '/moisissures-maison-sante', icon: '🍄', title: 'Moisissures', desc: 'Champignons sur murs et plafonds' },
              { href: '/condensation-ou-infiltration', icon: '🏠', title: 'Cave humide', desc: 'Infiltrations et condensation en sous-sol' },
            ].map((item, i) => (
              <Link key={i} href={item.href} className="group bg-white rounded-2xl p-6 shadow-lg border border-ipb-rule hover:border-blue-300 hover:shadow-xl transition-all">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-ipb-text group-hover:text-blue-600 transition-colors mb-2">{item.title}</h3>
                <p className="text-ipb-muted">{item.desc}</p>
                <span className="text-blue-600 text-sm font-bold mt-3 block opacity-0 group-hover:opacity-100 transition-opacity">En savoir plus →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-16 md:py-24 bg-ipb-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Nos solutions professionnelles</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-ipb-navy-2 rounded-2xl p-8">
              <Droplets className="text-blue-400 mb-4" size={40} />
              <h3 className="text-xl font-bold mb-3">Injection résine</h3>
              <p className="text-ipb-light mb-4">Barrière étanche injectée dans le mur. Stoppe définitivement les remontées capillaires.</p>
              <div className="text-blue-400 font-bold">Garantie 30 ans</div>
            </div>
            <div className="bg-ipb-navy-2 rounded-2xl p-8">
              <Shield className="text-blue-400 mb-4" size={40} />
              <h3 className="text-xl font-bold mb-3">Cuvelage cave</h3>
              <p className="text-ipb-light mb-4">Étanchéité totale des sous-sols et caves par application d'un revêtement imperméable.</p>
              <div className="text-blue-400 font-bold">Garantie 10 ans</div>
            </div>
            <div className="bg-ipb-navy-2 rounded-2xl p-8">
              <FileText className="text-blue-400 mb-4" size={40} />
              <h3 className="text-xl font-bold mb-3">VMI / Ventilation</h3>
              <p className="text-ipb-light mb-4">Système de ventilation pour traiter les problèmes de condensation et améliorer l'air.</p>
              <div className="text-blue-400 font-bold">Solution complémentaire</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pourquoi Toulouse est touchée */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-ipb-text mb-8">
            Pourquoi Toulouse et la Haute-Garonne sont si touchées par l&apos;humidité ?
          </h2>
          
          <div className="prose prose-slate max-w-none">
            <p className="text-lg text-ipb-text mb-6">
              La Haute-Garonne concentre plusieurs facteurs qui favorisent les problèmes d&apos;humidité dans les maisons. Comprendre ces causes locales est essentiel pour choisir le bon traitement.
            </p>

            <h3 className="text-xl font-bold text-ipb-text mt-8 mb-4">Les sols argileux du bassin toulousain</h3>
            <p className="text-ipb-text mb-4">
              Plus de <strong>80% des sols en Haute-Garonne sont argileux</strong>. L&apos;argile retient l&apos;eau comme une éponge : elle gonfle en période de pluie et pousse l&apos;humidité vers les fondations. Les maisons construites sans barrière étanche (la majorité des constructions avant 1990) absorbent cette humidité par capillarité. Le phénomène est particulièrement marqué dans les quartiers anciens de Toulouse (Saint-Cyprien, Minimes, Côte Pavée) et les communes périphériques comme Colomiers, Tournefeuille ou Muret.
            </p>

            <h3 className="text-xl font-bold text-ipb-text mt-8 mb-4">Le climat semi-continental</h3>
            <p className="text-ipb-text mb-4">
              Toulouse alterne entre des <strong>hivers humides</strong> (800 mm de précipitations annuelles) et des <strong>étés caniculaires</strong>. Ce contraste provoque des cycles de gonflement/retrait du sol qui stressent les fondations et aggravent les remontées capillaires. En hiver, la condensation sur les murs froids crée un terrain propice aux moisissures, surtout dans les logements mal ventilés.
            </p>

            <h3 className="text-xl font-bold text-ipb-text mt-8 mb-4">Le parc immobilier ancien</h3>
            <p className="text-ipb-text mb-4">
              <strong>42% des logements toulousains ont été construits avant 1975</strong>, avant les réglementations thermiques et les normes d&apos;étanchéité modernes. Ces maisons n&apos;ont souvent ni membrane d&apos;étanchéité en fondation, ni ventilation mécanique. Résultat : les remontées capillaires remontent parfois jusqu&apos;à <strong>1,50 m de hauteur</strong> sur les murs intérieurs.
            </p>

            <h3 className="text-xl font-bold text-ipb-text mt-8 mb-4">Les signaux qui doivent vous alerter</h3>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-2 text-ipb-text">
                <span className="text-red-500 font-bold mt-1">1.</span>
                <span>Peinture qui cloque ou se décolle en bas des murs</span>
              </li>
              <li className="flex items-start gap-2 text-ipb-text">
                <span className="text-red-500 font-bold mt-1">2.</span>
                <span>Odeur de moisi persistante, même en aérant</span>
              </li>
              <li className="flex items-start gap-2 text-ipb-text">
                <span className="text-red-500 font-bold mt-1">3.</span>
                <span>Taches noires (moisissures) sur les murs ou plafonds</span>
              </li>
              <li className="flex items-start gap-2 text-ipb-text">
                <span className="text-red-500 font-bold mt-1">4.</span>
                <span>Salpêtre blanc poudreux à la base des murs</span>
              </li>
              <li className="flex items-start gap-2 text-ipb-text">
                <span className="text-red-500 font-bold mt-1">5.</span>
                <span>Papier peint qui se décolle ou gondole</span>
              </li>
              <li className="flex items-start gap-2 text-ipb-text">
                <span className="text-red-500 font-bold mt-1">6.</span>
                <span>Taux d&apos;humidité intérieur supérieur à 65% (mesurable avec un hygromètre)</span>
              </li>
            </ul>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg my-8">
              <p className="font-bold text-blue-900 mb-2">Notre méthode : diagnostic instrumenté avant tout traitement</p>
              <p className="text-blue-800">Contrairement aux entreprises qui vendent directement des travaux, IPB réalise d&apos;abord un <strong>diagnostic avec des instruments de mesure professionnels</strong> (humidimètre à sonde, caméra thermique, test à la bombe à carbure). Ce diagnostic identifie précisément la source de l&apos;humidité — car traiter des remontées capillaires avec un déshumidificateur, ou traiter de la condensation avec de l&apos;injection résine, c&apos;est jeter l&apos;argent par la fenêtre.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA intermédiaire */}
      <section className="py-8 bg-blue-50 border-y border-blue-100">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <p className="text-ipb-text font-medium text-sm">Murs humides, salpêtre, moisissures ? Identifions la cause avant qu'elle ne s'aggrave.</p>
          <div className="flex items-center gap-3">
            <Link href="/diagnostic" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-full text-sm transition-colors whitespace-nowrap">Diagnostic gratuit →</Link>
            <a href="tel:0582953375" className="text-ipb-muted hover:text-ipb-text font-medium text-sm whitespace-nowrap">📞 05 82 95 33 75</a>
          </div>
        </div>
      </section>

      {/* Tarifs */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-ipb-text mb-4">Tarifs traitement humidité</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg border border-ipb-rule p-8 text-center">
              <h3 className="text-xl font-bold text-ipb-text mb-2">Diagnostic</h3>
              <div className="inline-block bg-green-100 text-green-700 text-sm font-bold px-3 py-1 rounded-full mb-2">Déduit à 100% des travaux</div>
              <p className="text-ipb-muted">Expertise sur site · Rapport détaillé</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border-2 border-blue-500 p-8 text-center">
              <h3 className="text-xl font-bold text-ipb-text mb-2">Injection résine</h3>
              <div className="text-4xl font-extrabold text-blue-600 mb-4">2,5-6K€</div>
              <p className="text-ipb-muted">Garantie 30 ans</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border border-ipb-rule p-8 text-center">
              <h3 className="text-xl font-bold text-ipb-text mb-2">Cuvelage cave</h3>
              <div className="text-4xl font-extrabold text-blue-600 mb-4">Sur devis</div>
              <p className="text-ipb-muted">Selon surface</p>
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
                  <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-6 pb-6 text-ipb-muted">{item.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Topic Cluster - Types d'humidité */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-ipb-text mb-4">Guides par type d'humidité</h2>
            <p className="text-ipb-muted">Tout comprendre sur les problèmes d'humidité : causes, diagnostic et solutions</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/remontees-capillaires-traitement" className="group bg-ipb-cream hover:bg-blue-50 border border-ipb-rule hover:border-blue-200 rounded-2xl p-6 transition-all">
              <div className="text-3xl mb-3">💧</div>
              <h3 className="text-lg font-bold text-ipb-text group-hover:text-blue-600 mb-2">Remontées capillaires</h3>
              <p className="text-ipb-muted text-sm">L'eau du sol remonte dans vos murs. Causes, diagnostic et traitements.</p>
            </Link>
            <Link href="/moisissures-maison-sante" className="group bg-ipb-cream hover:bg-blue-50 border border-ipb-rule hover:border-blue-200 rounded-2xl p-6 transition-all">
              <div className="text-3xl mb-3">🍄</div>
              <h3 className="text-lg font-bold text-ipb-text group-hover:text-blue-600 mb-2">Moisissures & Santé</h3>
              <p className="text-ipb-muted text-sm">Risques pour la santé et traitement efficace des moisissures.</p>
            </Link>
            <Link href="/cave-humide-solutions" className="group bg-ipb-cream hover:bg-blue-50 border border-ipb-rule hover:border-blue-200 rounded-2xl p-6 transition-all">
              <div className="text-3xl mb-3">🏚️</div>
              <h3 className="text-lg font-bold text-ipb-text group-hover:text-blue-600 mb-2">Cave humide</h3>
              <p className="text-ipb-muted text-sm">Cuvelage, drainage, pompe : solutions pour caves et sous-sols.</p>
            </Link>
            <Link href="/ponts-thermiques-condensation" className="group bg-ipb-cream hover:bg-blue-50 border border-ipb-rule hover:border-blue-200 rounded-2xl p-6 transition-all">
              <div className="text-3xl mb-3">🌡️</div>
              <h3 className="text-lg font-bold text-ipb-text group-hover:text-blue-600 mb-2">Ponts thermiques</h3>
              <p className="text-ipb-muted text-sm">Zones froides et condensation : diagnostic et isolation.</p>
            </Link>
            <Link href="/salpetre-mur-traitement" className="group bg-ipb-cream hover:bg-blue-50 border border-ipb-rule hover:border-blue-200 rounded-2xl p-6 transition-all">
              <div className="text-3xl mb-3">🧂</div>
              <h3 className="text-lg font-bold text-ipb-text group-hover:text-blue-600 mb-2">Salpêtre</h3>
              <p className="text-ipb-muted text-sm">Poudre blanche sur vos murs ? Causes et traitement définitif.</p>
            </Link>
            <Link href="/condensation-ou-infiltration" className="group bg-ipb-cream hover:bg-blue-50 border border-ipb-rule hover:border-blue-200 rounded-2xl p-6 transition-all">
              <div className="text-3xl mb-3">🌧️</div>
              <h3 className="text-lg font-bold text-ipb-text group-hover:text-blue-600 mb-2">Condensation vs Infiltration</h3>
              <p className="text-ipb-muted text-sm">Comment différencier et traiter ces deux problèmes.</p>
            </Link>
            <Link href="/merule-champignon-traitement" className="group bg-ipb-cream hover:bg-blue-50 border border-ipb-rule hover:border-blue-200 rounded-2xl p-6 transition-all">
              <div className="text-3xl mb-3">🦠</div>
              <h3 className="text-lg font-bold text-ipb-text group-hover:text-blue-600 mb-2">Mérule</h3>
              <p className="text-ipb-muted text-sm">Le champignon destructeur : identification et traitement d'urgence.</p>
            </Link>
            <Link href="/vmi-ventilation-insufflation" className="group bg-ipb-cream hover:bg-blue-50 border border-ipb-rule hover:border-blue-200 rounded-2xl p-6 transition-all">
              <div className="text-3xl mb-3">🌀</div>
              <h3 className="text-lg font-bold text-ipb-text group-hover:text-blue-600 mb-2">VMI®</h3>
              <p className="text-ipb-muted text-sm">La ventilation par insufflation contre condensation et moisissures.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Zones */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-ipb-text mb-4">Zone d'intervention : 3 départements</h2>
            <p className="text-ipb-muted">Haute-Garonne (31) • Tarn-et-Garonne (82) • Gers (32)</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-blue-50 rounded-2xl p-6">
              <h3 className="font-bold text-ipb-text mb-3 flex items-center gap-2">
                <MapPin className="text-blue-600" size={20} /> Haute-Garonne (31)
              </h3>
              <p className="text-ipb-muted text-sm">Toulouse, Colomiers, Tournefeuille, Blagnac, Muret, Cugnaux, Balma, Castanet, Saint-Gaudens...</p>
            </div>
            <div className="bg-blue-50 rounded-2xl p-6">
              <h3 className="font-bold text-ipb-text mb-3 flex items-center gap-2">
                <MapPin className="text-blue-600" size={20} /> Tarn-et-Garonne (82)
              </h3>
              <p className="text-ipb-muted text-sm">Montauban, Castelsarrasin, Moissac, Caussade, Valence-d'Agen, Montech, Verdun-sur-Garonne...</p>
            </div>
            <div className="bg-blue-50 rounded-2xl p-6">
              <h3 className="font-bold text-ipb-text mb-3 flex items-center gap-2">
                <MapPin className="text-blue-600" size={20} /> Gers (32)
              </h3>
              <p className="text-ipb-muted text-sm">Auch, Condom, Fleurance, Lectoure, L'Isle-Jourdain, Mirande, Nogaro, Gimont, Samatan...</p>
            </div>
          </div>
          {/* Liens vers pages locales */}
          <div className="text-center">
            <p className="text-ipb-muted mb-4">Pages dédiées par ville :</p>
            <div className="flex flex-wrap justify-center gap-2">
              {['toulouse', 'colomiers', 'tournefeuille', 'blagnac', 'muret', 'montauban', 'castelsarrasin', 'auch', 'condom'].map((ville) => (
                <Link key={ville} href={`/expert-humidite/${ville}`} className="text-blue-600 hover:text-blue-700 text-sm underline">
                  Expert humidité {ville.charAt(0).toUpperCase() + ville.slice(1)}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Avis Google */}
      <Testimonials />

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
