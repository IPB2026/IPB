import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { CheckCircle, Phone, ArrowRight, MapPin, Shield, Clock, Droplets, Wind, Home } from 'lucide-react';

// Données des villes pour le SEO local humidité
const villesExpertiseHumidite: Record<string, {
  nom: string;
  departement: string;
  codePostal: string;
  communesProches: string[];
  specificites: string;
  problematiques: string[];
}> = {
  'toulouse': {
    nom: 'Toulouse',
    departement: 'Haute-Garonne (31)',
    codePostal: '31000',
    communesProches: ['Colomiers', 'Tournefeuille', 'Blagnac', 'Balma', 'L\'Union'],
    specificites: 'Nombreux immeubles anciens et maisons toulousaines en brique. Problèmes fréquents de remontées capillaires et salpêtre.',
    problematiques: ['Remontées capillaires', 'Salpêtre sur murs de brique', 'Caves humides', 'Condensation']
  },
  'colomiers': {
    nom: 'Colomiers',
    departement: 'Haute-Garonne (31)',
    codePostal: '31770',
    communesProches: ['Toulouse', 'Tournefeuille', 'Plaisance-du-Touch', 'Pibrac', 'Cornebarrieu'],
    specificites: 'Nombreux pavillons des années 70-90. Problèmes de ventilation et condensation fréquents.',
    problematiques: ['Condensation', 'Moisissures', 'Défaut VMC', 'Isolation déficiente']
  },
  'tournefeuille': {
    nom: 'Tournefeuille',
    departement: 'Haute-Garonne (31)',
    codePostal: '31170',
    communesProches: ['Toulouse', 'Colomiers', 'Plaisance-du-Touch', 'Cugnaux'],
    specificites: 'Pavillons sur sol argileux. Remontées capillaires fréquentes après les sécheresses.',
    problematiques: ['Remontées capillaires', 'Salpêtre', 'Moisissures', 'Ponts thermiques']
  },
  'blagnac': {
    nom: 'Blagnac',
    departement: 'Haute-Garonne (31)',
    codePostal: '31700',
    communesProches: ['Toulouse', 'Colomiers', 'Beauzelle', 'Cornebarrieu'],
    specificites: 'Constructions variées, du centre ancien aux résidences récentes. Mix de problématiques.',
    problematiques: ['Infiltrations', 'Remontées capillaires', 'Condensation', 'Fuites toiture']
  },
  'muret': {
    nom: 'Muret',
    departement: 'Haute-Garonne (31)',
    codePostal: '31600',
    communesProches: ['Portet-sur-Garonne', 'Seysses', 'Eaunes', 'Labarthe-sur-Lèze'],
    specificites: 'Sous-préfecture avec patrimoine ancien. Remontées capillaires dans les vieilles bâtisses.',
    problematiques: ['Remontées capillaires', 'Salpêtre', 'Caves humides', 'Mérule']
  },
  'montauban': {
    nom: 'Montauban',
    departement: 'Tarn-et-Garonne (82)',
    codePostal: '82000',
    communesProches: ['Bressols', 'Montbeton', 'Villemade', 'Lacourt-Saint-Pierre'],
    specificites: 'Préfecture avec centre historique en brique rose. Problèmes d\'humidité courants dans le vieux Montauban.',
    problematiques: ['Remontées capillaires', 'Salpêtre', 'Infiltrations', 'Caves inondables']
  },
  'auch': {
    nom: 'Auch',
    departement: 'Gers (32)',
    codePostal: '32000',
    communesProches: ['Pavie', 'Preignan', 'Duran', 'Roquelaure'],
    specificites: 'Patrimoine historique important. Maisons anciennes sensibles à l\'humidité ascensionnelle.',
    problematiques: ['Remontées capillaires', 'Salpêtre', 'Caves humides', 'Ponts thermiques']
  },
  'cugnaux': {
    nom: 'Cugnaux',
    departement: 'Haute-Garonne (31)',
    codePostal: '31270',
    communesProches: ['Tournefeuille', 'Villeneuve-Tolosane', 'Frouzins', 'Portet-sur-Garonne'],
    specificites: 'Zone pavillonnaire. Problèmes de condensation et ponts thermiques dans les maisons des années 80.',
    problematiques: ['Condensation', 'Moisissures', 'Défaut isolation', 'VMC défaillante']
  },
  'balma': {
    nom: 'Balma',
    departement: 'Haute-Garonne (31)',
    codePostal: '31130',
    communesProches: ['Toulouse', 'L\'Union', 'Quint-Fonsegrives', 'Flourens'],
    specificites: 'Commune résidentielle mixte. Problèmes variés selon l\'âge des constructions.',
    problematiques: ['Remontées capillaires', 'Infiltrations', 'Condensation', 'Moisissures']
  },
  'ramonville-saint-agne': {
    nom: 'Ramonville-Saint-Agne',
    departement: 'Haute-Garonne (31)',
    codePostal: '31520',
    communesProches: ['Toulouse', 'Castanet-Tolosan', 'Auzeville-Tolosane', 'Labège'],
    specificites: 'Zone universitaire, nombreuses résidences. Problèmes de ventilation fréquents.',
    problematiques: ['Condensation', 'Moisissures', 'Ventilation insuffisante', 'Ponts thermiques']
  },
  'saint-gaudens': {
    nom: 'Saint-Gaudens',
    departement: 'Haute-Garonne (31)',
    codePostal: '31800',
    communesProches: ['Valentine', 'Villeneuve-de-Rivière', 'Miramont-de-Comminges'],
    specificites: 'Comminges, patrimoine ancien. Maisons de caractère avec problèmes d\'humidité ascensionnelle.',
    problematiques: ['Remontées capillaires', 'Salpêtre', 'Caves humides', 'Infiltrations']
  },
  'plaisance-du-touch': {
    nom: 'Plaisance-du-Touch',
    departement: 'Haute-Garonne (31)',
    codePostal: '31830',
    communesProches: ['Tournefeuille', 'Colomiers', 'Fonsorbes', 'La Salvetat-Saint-Gilles'],
    specificites: 'Forte croissance urbaine, constructions récentes. Problèmes d\'étanchéité et condensation.',
    problematiques: ['Infiltrations', 'Condensation', 'Défauts construction', 'VMC insuffisante']
  },
  'l-union': {
    nom: 'L\'Union',
    departement: 'Haute-Garonne (31)',
    codePostal: '31240',
    communesProches: ['Toulouse', 'Balma', 'Saint-Jean', 'Montrabé', 'Launaguet'],
    specificites: 'Banlieue nord-est. Pavillons des années 70-90 avec problèmes de ventilation.',
    problematiques: ['Condensation', 'Moisissures', 'Défaut VMC', 'Ponts thermiques']
  },
  'castanet-tolosan': {
    nom: 'Castanet-Tolosan',
    departement: 'Haute-Garonne (31)',
    codePostal: '31320',
    communesProches: ['Ramonville', 'Auzeville-Tolosane', 'Labège', 'Escalquens'],
    specificites: 'Sud-est toulousain. Sols argileux favorisant les remontées capillaires.',
    problematiques: ['Remontées capillaires', 'Salpêtre', 'Condensation', 'Moisissures']
  }
};

const villesHumiditeSlugs = Object.keys(villesExpertiseHumidite);

export async function generateStaticParams() {
  return villesHumiditeSlugs.map((ville) => ({ ville }));
}

export async function generateMetadata({ params }: { params: Promise<{ ville: string }> }): Promise<Metadata> {
  const { ville } = await params;
  const villeData = villesExpertiseHumidite[ville];
  
  if (!villeData) {
    return { title: 'Expert Humidité | IPB Expertise' };
  }

  const deptCode = villeData.codePostal.slice(0, 2);
  const villeNom = villeData.nom;
  const villeNomLower = villeNom.toLowerCase();

  return {
    title: `Expert Humidité ${villeNom} (${deptCode}) | Injection Résine Garantie 30 ans | IPB`,
    description: `Expert humidité maison à ${villeNom} et ${villeData.communesProches[0]}. Traitement remontées capillaires, salpêtre, moisissures. Diagnostic 149€. ☎ 05 82 95 33 75`,
    keywords: [
      `expert humidité ${villeNomLower}`,
      `traitement humidité ${villeNomLower}`,
      `remontées capillaires ${villeNomLower}`,
      `salpêtre mur ${villeNomLower}`,
      `moisissures maison ${villeNomLower}`,
      `injection résine ${villeNomLower}`,
      `cave humide ${villeNomLower}`,
      `cuvelage ${villeNomLower}`,
      `humidité mur ${deptCode}`,
      `diagnostic humidité ${villeNomLower}`,
    ],
    alternates: {
      canonical: `https://www.ipb-expertise.fr/expert-humidite/${ville}`,
    },
    openGraph: {
      title: `Expert Humidité ${villeNom} (${deptCode}) | IPB`,
      description: `Traitement humidité à ${villeNom}. Injection résine garantie 30 ans. Diagnostic 48h.`,
      url: `https://www.ipb-expertise.fr/expert-humidite/${ville}`,
      type: 'website',
      images: [{ url: '/images/salpetre-avant-apres.webp', width: 1200, height: 630, alt: `Expert humidité ${villeNom}` }],
    },
    twitter: {
      card: 'summary',
      title: `Expert Humidité ${villeNom}`,
      description: `Injection résine garantie 30 ans. Diagnostic 48h.`,
    },
    robots: { index: true, follow: true },
  };
}

export default async function ExpertHumiditeVillePage({ params }: { params: Promise<{ ville: string }> }) {
  const { ville } = await params;
  const villeData = villesExpertiseHumidite[ville];

  if (!villeData) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": `IPB - Expert Humidité ${villeData.nom}`,
    "description": `Expert en traitement de l'humidité à ${villeData.nom} : remontées capillaires, salpêtre, moisissures`,
    "url": `https://www.ipb-expertise.fr/expert-humidite/${ville}`,
    "telephone": "+33582953375",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": villeData.nom,
      "addressRegion": villeData.departement,
      "postalCode": villeData.codePostal,
      "addressCountry": "FR"
    }
  };

  const faqItems = [
    {
      question: `Traitez-vous l'humidité à ${villeData.nom} ?`,
      answer: `Oui, nous intervenons à ${villeData.nom} et dans les communes voisines : ${villeData.communesProches.join(', ')}. Diagnostic sous 48h.`
    },
    {
      question: `Quels problèmes d'humidité à ${villeData.nom} ?`,
      answer: `À ${villeData.nom}, nous traitons principalement : ${villeData.problematiques.join(', ')}. ${villeData.specificites}`
    },
    {
      question: `Quel est le prix du traitement humidité à ${villeData.nom} ?`,
      answer: `Le diagnostic coûte 149€. Pour les remontées capillaires, l'injection résine coûte 2 000-5 000€ (garantie 30 ans). Le cuvelage de cave démarre à 3 000€.`
    },
    {
      question: `Combien de temps pour traiter l'humidité ?`,
      answer: `Le traitement lui-même prend 1-3 jours selon la surface. Les murs sèchent ensuite progressivement sur 6-12 mois.`
    }
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": { "@type": "Answer", "text": item.answer }
    }))
  };

  return (
    <div className="font-sans text-slate-800 bg-slate-50 antialiased">
      <Script id="local-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Script id="faq-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      
      <TopBar />
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200 py-3">
        <div className="max-w-7xl mx-auto px-4 text-sm text-slate-600">
          <Link href="/" className="hover:text-blue-600">Accueil</Link>
          <span className="mx-2">›</span>
          <Link href="/expert-humidite-toulouse-31" className="hover:text-blue-600">Expert Humidité</Link>
          <span className="mx-2">›</span>
          <span className="text-slate-900">{villeData.nom}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative bg-slate-900 text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950/30"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-blue-400 text-sm font-bold mb-4">
              <MapPin size={18} />
              <span>{villeData.nom} - {villeData.departement}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
              Expert Humidité à <span className="text-blue-400">{villeData.nom}</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl">
              Murs humides, salpêtre, moisissures à {villeData.nom} ? Diagnostic sous 48h et solutions durables garanties 30 ans.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/diagnostic" className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2">
                Diagnostic gratuit <ArrowRight size={20} />
              </Link>
              <a href="tel:0582953375" className="bg-white/10 border border-white/20 hover:bg-white/20 px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2">
                <Phone size={20} /> 05 82 95 33 75
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Problématiques locales */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-xl font-bold text-slate-900 mb-4 text-center">Problèmes traités à {villeData.nom}</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {villeData.problematiques.map((prob) => (
              <span key={prob} className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                {prob}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Contexte et solutions */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-6">
                L'humidité à {villeData.nom}
              </h2>
              <div className="prose prose-lg text-slate-600">
                <p>{villeData.specificites}</p>
                <p>
                  Nos experts connaissent les spécificités du bâti local et proposent des solutions 
                  adaptées à chaque situation. Toutes nos interventions sont garanties.
                </p>
              </div>
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-4 bg-blue-50 p-4 rounded-xl">
                  <Droplets className="text-blue-600 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-bold text-slate-900">Injection résine</h3>
                    <p className="text-slate-600 text-sm">Stoppe les remontées capillaires. Garantie 30 ans.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-blue-50 p-4 rounded-xl">
                  <Home className="text-blue-600 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-bold text-slate-900">Cuvelage</h3>
                    <p className="text-slate-600 text-sm">Étanchéité des caves et sous-sols. Garantie 10 ans.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-blue-50 p-4 rounded-xl">
                  <Wind className="text-blue-600 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-bold text-slate-900">VMI®</h3>
                    <p className="text-slate-600 text-sm">Ventilation mécanique pour éliminer condensation et moisissures.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-slate-100 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Zone d'intervention</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {villeData.communesProches.map((commune) => (
                  <span key={commune} className="bg-white text-slate-700 px-3 py-1 rounded-full text-sm">
                    {commune}
                  </span>
                ))}
              </div>
              <div className="border-t border-slate-200 pt-6 space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">Diagnostic</span>
                  <span className="font-bold text-slate-900">48h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Devis</span>
                  <span className="font-bold text-slate-900">Gratuit</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Garantie injection</span>
                  <span className="font-bold text-blue-600">30 ans</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tarifs */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-center mb-12">Tarifs traitement humidité {villeData.nom}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-800 rounded-2xl p-6 text-center">
              <h3 className="font-bold mb-2">Diagnostic</h3>
              <div className="text-4xl font-extrabold text-blue-400 mb-2">149€</div>
              <p className="text-slate-400 text-sm">Déductible des travaux</p>
            </div>
            <div className="bg-slate-800 rounded-2xl p-6 text-center border-2 border-blue-500">
              <h3 className="font-bold mb-2">Injection résine</h3>
              <div className="text-4xl font-extrabold text-blue-400 mb-2">2-5K€</div>
              <p className="text-slate-400 text-sm">Garantie 30 ans</p>
            </div>
            <div className="bg-slate-800 rounded-2xl p-6 text-center">
              <h3 className="font-bold mb-2">Cuvelage</h3>
              <div className="text-4xl font-extrabold text-blue-400 mb-2">3-8K€</div>
              <p className="text-slate-400 text-sm">Selon surface</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-slate-100">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-8 text-center">
            Questions fréquentes - Humidité {villeData.nom}
          </h2>
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

      {/* Topic Cluster - Liens vers spokes */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-8 text-center">
            Guides par type d'humidité
          </h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            <Link href="/remontees-capillaires-traitement" className="bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-xl p-4 transition-all group">
              <span className="text-2xl mb-2 block">💧</span>
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 text-sm">Remontées capillaires</h3>
            </Link>
            <Link href="/moisissures-maison-sante" className="bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-xl p-4 transition-all group">
              <span className="text-2xl mb-2 block">🍄</span>
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 text-sm">Moisissures & Santé</h3>
            </Link>
            <Link href="/cave-humide-solutions" className="bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-xl p-4 transition-all group">
              <span className="text-2xl mb-2 block">🏚️</span>
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 text-sm">Cave humide</h3>
            </Link>
            <Link href="/salpetre-mur-traitement" className="bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-xl p-4 transition-all group">
              <span className="text-2xl mb-2 block">🧂</span>
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 text-sm">Salpêtre</h3>
            </Link>
            <Link href="/ponts-thermiques-condensation" className="bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-xl p-4 transition-all group">
              <span className="text-2xl mb-2 block">🌡️</span>
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 text-sm">Ponts thermiques</h3>
            </Link>
            <Link href="/condensation-ou-infiltration" className="bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-xl p-4 transition-all group">
              <span className="text-2xl mb-2 block">🌧️</span>
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 text-sm">Condensation vs Infiltration</h3>
            </Link>
            <Link href="/vmi-ventilation-insufflation" className="bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-xl p-4 transition-all group">
              <span className="text-2xl mb-2 block">🌀</span>
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 text-sm">VMI® Ventilation</h3>
            </Link>
            <Link href="/merule-champignon-traitement" className="bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-xl p-4 transition-all group">
              <span className="text-2xl mb-2 block">🦠</span>
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 text-sm">Mérule</h3>
            </Link>
          </div>
          <div className="mt-8 text-center">
            <Link href="/expert-humidite-toulouse-31" className="inline-flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700">
              Consultez notre guide complet Traitement Humidité <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold mb-6">Problème d'humidité à {villeData.nom} ?</h2>
          <p className="text-xl text-blue-100 mb-8">Diagnostic sous 48h. Solutions garanties 30 ans.</p>
          <Link href="/diagnostic" className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50">
            Demander un diagnostic <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
