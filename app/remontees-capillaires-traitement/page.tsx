import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { Droplets, ArrowRight, Phone, AlertTriangle, CheckCircle, ArrowUp, Home, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Remontées Capillaires : Causes, Diagnostic et Traitement | IPB Expertise',
  description: 'Remontées capillaires dans les murs ? Causes, signes, solutions (injection, drainage, cuvelage). Expert humidité Toulouse, Montauban, Auch.',
  keywords: ['remontées capillaires', 'humidité ascensionnelle', 'mur humide', 'traitement remontées capillaires', 'injection résine'],
  alternates: {
    canonical: 'https://www.ipb-expertise.fr/remontees-capillaires-traitement',
  },
  openGraph: {
    title: 'Remontées Capillaires : Causes, Diagnostic et Traitement',
    description: 'Tout comprendre sur les remontées capillaires et les solutions pour y remédier.',
    url: 'https://www.ipb-expertise.fr/remontees-capillaires-traitement',
    type: 'article',
  },
};

const signesRemontees = [
  { signe: "Auréoles d'humidité en bas des murs", description: "Marque caractéristique jusqu'à 1,50m de hauteur" },
  { signe: "Salpêtre (dépôts blancs)", description: "Cristaux de sel qui apparaissent sur les murs" },
  { signe: "Peinture qui cloque ou s'écaille", description: "L'humidité fait décoller les revêtements" },
  { signe: "Papier peint qui se décolle", description: "Particulièrement en bas des murs" },
  { signe: "Plinthes qui pourrissent", description: "Le bois absorbe l'humidité et se dégrade" },
  { signe: "Odeur de moisi persistante", description: "Surtout dans les pièces peu ventilées" },
];

const solutions = [
  {
    nom: "Injection de résine",
    description: "Création d'une barrière étanche dans le mur par injection de résine hydrophobe.",
    avantages: ["Solution définitive", "Peu invasif", "Efficace sur tous types de murs"],
    prix: "80-150€/ml",
    duree: "1-2 jours"
  },
  {
    nom: "Drainage périphérique",
    description: "Installation d'un drain autour des fondations pour évacuer l'eau.",
    avantages: ["Traite aussi les infiltrations", "Protège les fondations", "Solution préventive"],
    prix: "150-300€/ml",
    duree: "3-5 jours"
  },
  {
    nom: "Cuvelage",
    description: "Revêtement étanche appliqué sur les murs enterrés (caves, sous-sols).",
    avantages: ["Idéal pour caves", "Étanchéité totale", "Permet l'aménagement"],
    prix: "200-400€/m²",
    duree: "1 semaine"
  },
];

const faqItems = [
  {
    question: "Quelle est la différence entre remontées capillaires et infiltrations ?",
    answer: "Les remontées capillaires viennent du sol et montent dans les murs (humidité ascensionnelle). Les infiltrations viennent de l'extérieur (pluie, nappe phréatique). Le traitement est différent."
  },
  {
    question: "Combien de temps pour assécher un mur après traitement ?",
    answer: "Après injection de résine, comptez 6 à 18 mois pour un assèchement complet. La vitesse dépend de l'épaisseur du mur et du taux d'humidité initial."
  },
  {
    question: "L'assurance prend-elle en charge les remontées capillaires ?",
    answer: "Non, les remontées capillaires sont considérées comme un défaut d'entretien ou de construction. Elles ne sont pas couvertes par l'assurance habitation classique."
  },
  {
    question: "Peut-on traiter soi-même les remontées capillaires ?",
    answer: "Les produits grand public sont peu efficaces. Un diagnostic professionnel est indispensable pour identifier la cause exacte et choisir le bon traitement."
  },
];

const jsonLdArticle = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Remontées Capillaires : Causes, Diagnostic et Traitement",
  "description": "Guide complet sur les remontées capillaires : identification, causes et solutions de traitement.",
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

export default function RemonteesCapillairesPage() {
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
            <span className="text-slate-900">Remontées Capillaires</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 to-cyan-900 text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-2 text-cyan-300 text-sm font-bold mb-4">
            <AlertTriangle size={18} />
            <span>⚠️ Votre maison absorbe l'eau comme une éponge</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            Remontées Capillaires : <br/>
            <span className="text-cyan-300">L'Ennemi Invisible Qui Ronge Vos Murs</span>
          </h1>
          <p className="text-xl text-blue-100 mb-4">
            Chaque jour, <strong className="text-white">des litres d'eau</strong> remontent dans vos murs depuis le sol. 
            Résultat : salpêtre, papiers peints décollés, plinthes pourries... et une maison qui perd de sa valeur.
          </p>
          <div className="bg-cyan-500/20 border border-cyan-500/50 rounded-xl p-4 mb-8">
            <p className="text-cyan-200 font-bold flex items-center gap-2">
              <Zap size={18} />
              En 2 ans, une remontée capillaire non traitée peut dégrader votre mur sur 1,50m de haut.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/diagnostic" className="bg-cyan-500 hover:bg-cyan-400 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 animate-pulse">
              💧 DIAGNOSTIC HUMIDITÉ GRATUIT <ArrowRight size={18} />
            </Link>
            <a href="tel:0582953375" className="bg-white/10 border border-white/20 px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2">
              <Phone size={18} /> 05 82 95 33 75
            </a>
          </div>
          <p className="text-sm text-blue-300 mt-4">✓ Mesure du taux d'humidité · ✓ Identification de la source · ✓ Devis détaillé</p>
        </div>
      </section>

      {/* Qu'est-ce que c'est */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-8">
            Qu'est-ce que les remontées capillaires ?
          </h2>
          <div className="prose prose-lg max-w-none">
            <p>
              Les <strong>remontées capillaires</strong> (ou humidité ascensionnelle) sont un phénomène 
              physique où l'eau du sol remonte dans les murs par <strong>capillarité</strong>. 
              Comme une éponge qui absorbe l'eau, les matériaux poreux (pierre, brique, parpaing) 
              aspirent l'humidité du sol.
            </p>
            <p>
              Ce phénomène touche particulièrement les <strong>maisons anciennes</strong> construites 
              sans barrière d'étanchéité (ou avec une barrière défaillante). L'eau peut monter 
              jusqu'à <strong>1,50 mètre de hauteur</strong> dans les cas les plus graves.
            </p>
          </div>

          {/* Schéma explicatif */}
          <div className="mt-8 p-6 bg-blue-50 rounded-2xl">
            <h3 className="font-bold text-slate-900 mb-4">Comment ça fonctionne ?</h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Droplets className="text-blue-600" size={28} />
                </div>
                <p className="font-bold text-slate-900">1. Eau dans le sol</p>
                <p className="text-sm text-slate-600">Nappe phréatique, pluie, arrosage...</p>
              </div>
              <div>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <ArrowUp className="text-blue-600" size={28} />
                </div>
                <p className="font-bold text-slate-900">2. Capillarité</p>
                <p className="text-sm text-slate-600">L'eau monte dans les pores du mur</p>
              </div>
              <div>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Home className="text-blue-600" size={28} />
                </div>
                <p className="font-bold text-slate-900">3. Dégâts visibles</p>
                <p className="text-sm text-slate-600">Salpêtre, moisissures, dégradations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signes */}
      <section className="py-16 bg-slate-100">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-8 text-center">
            Comment reconnaître les remontées capillaires ?
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {signesRemontees.map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 flex gap-4">
                <div className="flex-shrink-0">
                  <AlertTriangle className="text-amber-500" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">{item.signe}</h3>
                  <p className="text-sm text-slate-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl">
            <h3 className="font-bold text-amber-900 mb-2">⚠️ Ne pas confondre avec...</h3>
            <p className="text-amber-800">
              Les remontées capillaires créent une <strong>ligne horizontale</strong> d'humidité 
              en bas des murs. Si l'humidité est localisée (tache isolée) ou en hauteur, 
              il s'agit probablement d'une <strong>infiltration</strong> ou de <strong>condensation</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Causes */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-8">
            Causes des remontées capillaires
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-3">🏠 Absence de barrière étanche</h3>
              <p className="text-slate-600 text-sm">
                Les maisons construites avant 1960 n'ont souvent pas de membrane d'étanchéité 
                entre les fondations et les murs. L'eau remonte librement.
              </p>
            </div>
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-3">💧 Nappe phréatique haute</h3>
              <p className="text-slate-600 text-sm">
                Dans certaines zones (vallées, bords de rivière), la nappe phréatique est proche 
                de la surface, alimentant en permanence les remontées.
              </p>
            </div>
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-3">🧱 Matériaux poreux</h3>
              <p className="text-slate-600 text-sm">
                Pierre, brique, parpaing... Plus le matériau est poreux, plus l'eau monte haut. 
                Les murs épais sont plus touchés.
              </p>
            </div>
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-3">🌧️ Drainage défaillant</h3>
              <p className="text-slate-600 text-sm">
                Un mauvais drainage autour de la maison concentre l'eau près des fondations, 
                aggravant les remontées capillaires.
              </p>
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
          <div className="grid md:grid-cols-3 gap-6">
            {solutions.map((solution, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-3">{solution.nom}</h3>
                <p className="text-slate-600 text-sm mb-4">{solution.description}</p>
                <ul className="space-y-2 mb-4">
                  {solution.avantages.map((avantage, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
                      <CheckCircle className="text-green-500" size={16} />
                      {avantage}
                    </li>
                  ))}
                </ul>
                <div className="pt-4 border-t border-slate-100 space-y-1">
                  <p className="text-sm"><strong>Prix indicatif :</strong> {solution.prix}</p>
                  <p className="text-sm"><strong>Durée travaux :</strong> {solution.duree}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold mb-6">Vos murs sont humides en bas ?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Un diagnostic précis est essentiel pour choisir le bon traitement. 
            Intervention sous 48h dans toute la région.
          </p>
          <Link href="/diagnostic" className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50">
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
            Autres problèmes d'humidité
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/salpetre-mur-traitement" className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 hover:border-blue-300 transition-all group">
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 mb-2">Salpêtre</h3>
              <p className="text-slate-600 text-sm">Dépôts blancs sur les murs</p>
            </Link>
            <Link href="/moisissures-maison-sante" className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 hover:border-blue-300 transition-all group">
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 mb-2">Moisissures</h3>
              <p className="text-slate-600 text-sm">Risques santé et traitement</p>
            </Link>
            <Link href="/expert-humidite-toulouse-31" className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 hover:border-blue-300 transition-all group">
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 mb-2">Expert Humidité Toulouse</h3>
              <p className="text-slate-600 text-sm">Tous nos services humidité</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold mb-6">Traitez le problème à la source</h2>
          <p className="text-xl text-slate-300 mb-8">
            Les remontées capillaires ne disparaissent pas seules. Plus vous attendez, plus les dégâts s'aggravent.
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
