import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { Warehouse, ArrowRight, Phone, AlertTriangle, CheckCircle, Droplets, Wind, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cave Humide : Cuvelage, Drainage et Solutions | Prix Occitanie (31-82-32)',
  description: 'Cave humide ou sous-sol inondé ? Causes (infiltrations, nappe, condensation). Solutions : cuvelage (200-400€/m²), drainage, VMI. Diagnostic gratuit Toulouse, Montauban, Auch.',
  keywords: [
    'cave humide solution',
    'cuvelage cave prix',
    'sous-sol humide traitement',
    'étanchéité cave enterrée',
    'drainage périphérique cave',
    'infiltration eau cave',
    'cave inondée que faire',
    'mur enterré humide',
    'pompe de relevage cave',
    'aménager cave humide',
    'expert cave toulouse',
    'devis cuvelage cave',
  ],
  alternates: {
    canonical: 'https://www.ipb-expertise.fr/cave-humide-solutions',
  },
  openGraph: {
    title: 'Cave Humide : Solutions Cuvelage et Drainage',
    description: 'Traitement définitif cave humide : cuvelage, drainage, ventilation. Devis gratuit.',
    url: 'https://www.ipb-expertise.fr/cave-humide-solutions',
    type: 'article',
  },
  robots: { index: true, follow: true },
};

const causesCave = [
  {
    cause: "Infiltrations latérales",
    description: "L'eau de pluie s'infiltre par les murs enterrés, particulièrement lors de fortes pluies.",
    signes: ["Murs mouillés après pluie", "Traces de ruissellement", "Efflorescences blanches"],
    icon: "💧"
  },
  {
    cause: "Remontées capillaires",
    description: "L'humidité du sol remonte par capillarité dans les murs et la dalle.",
    signes: ["Sol toujours humide", "Bas des murs dégradés", "Salpêtre"],
    icon: "⬆️"
  },
  {
    cause: "Nappe phréatique",
    description: "Le niveau de la nappe remonte et crée une pression hydrostatique sous la dalle.",
    signes: ["Eau qui remonte du sol", "Flaques sans pluie", "Niveau variable selon saisons"],
    icon: "🌊"
  },
  {
    cause: "Condensation",
    description: "L'air chaud se condense sur les parois froides de la cave.",
    signes: ["Buée sur surfaces froides", "Odeur de moisi", "Moisissures au plafond"],
    icon: "💨"
  },
];

const solutions = [
  {
    nom: "Cuvelage",
    description: "Revêtement étanche appliqué à l'intérieur de la cave. Forme une baignoire inversée.",
    ideal: "Infiltrations latérales, pression d'eau",
    avantages: ["Étanchéité totale", "Permet l'aménagement", "Pas de travaux extérieurs"],
    prix: "200-400€/m²",
    garantie: "10 ans"
  },
  {
    nom: "Drainage périphérique",
    description: "Tranchée avec drain autour de la maison pour capter et évacuer l'eau.",
    ideal: "Infiltrations, terrain en pente",
    avantages: ["Traite le problème à la source", "Protège les fondations", "Durable"],
    prix: "150-300€/ml",
    garantie: "Variable"
  },
  {
    nom: "Injection de résine",
    description: "Barrière étanche créée dans les murs par injection de produit hydrophobe.",
    ideal: "Remontées capillaires",
    avantages: ["Peu invasif", "Rapide", "Efficace"],
    prix: "80-150€/ml",
    garantie: "10-20 ans"
  },
  {
    nom: "Pompe de relevage",
    description: "Système de pompage automatique pour évacuer l'eau qui s'accumule.",
    ideal: "Nappe phréatique, zone inondable",
    avantages: ["Solution immédiate", "Complémentaire", "Automatique"],
    prix: "500-2000€",
    garantie: "2-5 ans"
  },
];

const erreurs = [
  "Poser un enduit étanche sur mur humide (l'humidité est piégée)",
  "Bétonner le sol sans traiter le problème (l'eau remonte ailleurs)",
  "Fermer les bouches d'aération (aggrave la condensation)",
  "Chauffer sans ventiler (crée plus de condensation)",
  "Utiliser des produits \"anti-humidité\" sans diagnostic",
];

const faqItems = [
  {
    question: "Peut-on aménager une cave humide ?",
    answer: "Oui, après traitement. Le cuvelage permet de créer un espace sain et sec. Attention : aménager SANS traiter l'humidité créera des problèmes de moisissures et de dégradation."
  },
  {
    question: "Combien coûte le traitement d'une cave humide ?",
    answer: "De 3 000€ à 15 000€ selon la surface et la solution. Le cuvelage complet d'une cave de 30m² coûte environ 8 000-12 000€. Le drainage périphérique peut aller de 5 000€ à 20 000€."
  },
  {
    question: "L'assurance couvre-t-elle une cave humide ?",
    answer: "Non, sauf en cas de catastrophe naturelle (inondation déclarée). L'humidité chronique est considérée comme un défaut d'entretien ou de construction."
  },
  {
    question: "Combien de temps pour assécher une cave ?",
    answer: "Après traitement, comptez 6 à 12 mois pour un assèchement complet des murs épais. L'installation d'un déshumidificateur peut accélérer le processus."
  },
];

const jsonLdArticle = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Cave Humide : Causes et Solutions Définitives",
  "description": "Guide complet sur le traitement des caves et sous-sols humides.",
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

export default function CaveHumideSolutionsPage() {
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
            <span className="text-slate-900">Cave Humide</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-800 to-blue-900 text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-2 text-blue-300 text-sm font-bold mb-4">
            <Warehouse size={18} />
            <span>Problème d'humidité</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            Cave Humide : <br/>
            <span className="text-blue-300">Solutions Définitives</span>
          </h1>
          <p className="text-xl text-slate-300 mb-8">
            Votre cave ou sous-sol est humide, voire inondé ? Découvrez les causes 
            et les solutions professionnelles pour retrouver un espace sain et utilisable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/diagnostic" className="bg-blue-500 hover:bg-blue-400 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2">
              Diagnostic cave <ArrowRight size={18} />
            </Link>
            <a href="tel:0582953375" className="bg-white/10 border border-white/20 px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2">
              <Phone size={18} /> 05 82 95 33 75
            </a>
          </div>
        </div>
      </section>

      {/* Stat */}
      <section className="py-8 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-lg">
            <strong>70% des caves en Occitanie</strong> présentent des problèmes d'humidité. 
            C'est l'un des problèmes les plus courants que nous traitons.
          </p>
        </div>
      </section>

      {/* Causes */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-8 text-center">
            Pourquoi votre cave est-elle humide ?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {causesCave.map((item, index) => (
              <div key={index} className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{item.icon}</span>
                  <h3 className="text-xl font-bold text-slate-900">{item.cause}</h3>
                </div>
                <p className="text-slate-600 mb-4">{item.description}</p>
                <div>
                  <p className="text-sm font-bold text-slate-700 mb-2">Signes révélateurs :</p>
                  <ul className="space-y-1">
                    {item.signes.map((signe, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                        {signe}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl">
            <h3 className="font-bold text-amber-900 mb-2">💡 Bon à savoir</h3>
            <p className="text-amber-800">
              Une cave peut souffrir de <strong>plusieurs causes simultanées</strong>. 
              Un diagnostic professionnel permet d'identifier toutes les sources d'humidité 
              et de proposer un traitement adapté.
            </p>
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-16 bg-slate-100">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-8 text-center">
            Les solutions professionnelles
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {solutions.map((solution, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{solution.nom}</h3>
                <p className="text-slate-600 text-sm mb-4">{solution.description}</p>
                
                <div className="bg-blue-50 rounded-lg p-3 mb-4">
                  <p className="text-sm text-blue-800">
                    <strong>Idéal pour :</strong> {solution.ideal}
                  </p>
                </div>

                <ul className="space-y-2 mb-4">
                  {solution.avantages.map((avantage, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
                      <CheckCircle className="text-green-500" size={16} />
                      {avantage}
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-500">Prix indicatif</p>
                    <p className="font-bold text-slate-900">{solution.prix}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Garantie</p>
                    <p className="font-bold text-slate-900">{solution.garantie}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA milieu */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold mb-6">Votre cave mérite mieux</h2>
          <p className="text-xl text-blue-100 mb-8">
            Transformez votre cave humide en espace de stockage sain, 
            ou même en pièce à vivre. Diagnostic sous 48h.
          </p>
          <Link href="/diagnostic" className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50">
            Demander un diagnostic <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Erreurs */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-8 text-center">
            Les erreurs à éviter absolument
          </h2>
          <div className="bg-red-50 rounded-2xl p-8 border border-red-200">
            <div className="space-y-4">
              {erreurs.map((erreur, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="text-red-500 font-bold text-lg">✗</span>
                  <p className="text-red-800">{erreur}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Processus */}
      <section className="py-16 bg-slate-100">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-8 text-center">
            Notre processus de traitement
          </h2>
          <div className="space-y-6">
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">1</div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Diagnostic approfondi</h3>
                <p className="text-slate-600">Mesure d'humidité, inspection visuelle, identification des sources. Rapport détaillé.</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">2</div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Proposition de solutions</h3>
                <p className="text-slate-600">Plusieurs options adaptées à votre situation, avec devis détaillé et garanties.</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">3</div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Travaux par artisans qualifiés</h3>
                <p className="text-slate-600">Intervention par des professionnels expérimentés, respect des délais.</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">4</div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Suivi et garantie</h3>
                <p className="text-slate-600">Contrôle après travaux, garantie décennale sur les ouvrages.</p>
              </div>
            </div>
          </div>
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
            <Link href="/remontees-capillaires-traitement" className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 hover:border-blue-300 transition-all group">
              <Droplets className="text-blue-600 mb-3" size={28} />
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 mb-2">Remontées Capillaires</h3>
              <p className="text-slate-600 text-sm">Traitement de l'humidité ascensionnelle</p>
            </Link>
            <Link href="/vmi-ventilation-insufflation" className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 hover:border-blue-300 transition-all group">
              <Wind className="text-blue-600 mb-3" size={28} />
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 mb-2">VMI / Ventilation</h3>
              <p className="text-slate-600 text-sm">Contre la condensation</p>
            </Link>
            <Link href="/expert-humidite-toulouse-31" className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 hover:border-blue-300 transition-all group">
              <Shield className="text-blue-600 mb-3" size={28} />
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 mb-2">Expert Humidité</h3>
              <p className="text-slate-600 text-sm">Tous nos services</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold mb-6">Récupérez votre cave</h2>
          <p className="text-xl text-slate-300 mb-8">
            Une cave sèche, c'est possible. Diagnostic sous 48h pour identifier la solution adaptée.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/diagnostic" className="bg-blue-600 hover:bg-blue-500 px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2">
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
