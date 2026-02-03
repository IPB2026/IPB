import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { CheckCircle, Phone, ArrowRight, MapPin, Shield, Clock, FileText } from 'lucide-react';

// Données des villes pour le SEO local
const villesExpertise: Record<string, {
  nom: string;
  departement: string;
  codePostal: string;
  population?: string;
  communesProches: string[];
  specificites: string;
}> = {
  'toulouse': {
    nom: 'Toulouse',
    departement: 'Haute-Garonne (31)',
    codePostal: '31000',
    population: '500 000',
    communesProches: ['Colomiers', 'Tournefeuille', 'Blagnac', 'Balma', 'L\'Union'],
    specificites: 'Capitale de l\'Occitanie, sols argileux sensibles au RGA. Plus de 200 arrêtés CAT-NAT depuis 2018.'
  },
  'colomiers': {
    nom: 'Colomiers',
    departement: 'Haute-Garonne (31)',
    codePostal: '31770',
    population: '40 000',
    communesProches: ['Toulouse', 'Tournefeuille', 'Plaisance-du-Touch', 'Pibrac', 'Cornebarrieu'],
    specificites: '2ème ville de Haute-Garonne. Nombreux lotissements des années 80-90 sur sol argileux.'
  },
  'tournefeuille': {
    nom: 'Tournefeuille',
    departement: 'Haute-Garonne (31)',
    codePostal: '31170',
    population: '27 000',
    communesProches: ['Toulouse', 'Colomiers', 'Plaisance-du-Touch', 'Cugnaux', 'Villeneuve-Tolosane'],
    specificites: 'Zone pavillonnaire en expansion. Sols argileux avec forts risques de retrait-gonflement.'
  },
  'blagnac': {
    nom: 'Blagnac',
    departement: 'Haute-Garonne (31)',
    codePostal: '31700',
    population: '25 000',
    communesProches: ['Toulouse', 'Colomiers', 'Beauzelle', 'Cornebarrieu', 'L\'Union'],
    specificites: 'Proximité aéroportuaire. Constructions variées, du pavillonnaire aux immeubles récents.'
  },
  'muret': {
    nom: 'Muret',
    departement: 'Haute-Garonne (31)',
    codePostal: '31600',
    population: '27 000',
    communesProches: ['Portet-sur-Garonne', 'Seysses', 'Eaunes', 'Labarthe-sur-Lèze', 'Pins-Justaret'],
    specificites: 'Sous-préfecture. Zone très touchée par les sécheresses et le RGA. Nombreuses maisons anciennes.'
  },
  'cugnaux': {
    nom: 'Cugnaux',
    departement: 'Haute-Garonne (31)',
    codePostal: '31270',
    population: '18 000',
    communesProches: ['Tournefeuille', 'Villeneuve-Tolosane', 'Frouzins', 'Portet-sur-Garonne'],
    specificites: 'Forte croissance urbaine. Sols argileux à risque modéré à fort.'
  },
  'balma': {
    nom: 'Balma',
    departement: 'Haute-Garonne (31)',
    codePostal: '31130',
    population: '17 000',
    communesProches: ['Toulouse', 'L\'Union', 'Quint-Fonsegrives', 'Pin-Balma', 'Flourens'],
    specificites: 'Commune résidentielle à l\'est de Toulouse. Mix de constructions anciennes et récentes.'
  },
  'ramonville-saint-agne': {
    nom: 'Ramonville-Saint-Agne',
    departement: 'Haute-Garonne (31)',
    codePostal: '31520',
    population: '14 000',
    communesProches: ['Toulouse', 'Castanet-Tolosan', 'Auzeville-Tolosane', 'Labège'],
    specificites: 'Zone universitaire et résidentielle. Constructions sur sol argileux.'
  },
  'montauban': {
    nom: 'Montauban',
    departement: 'Tarn-et-Garonne (82)',
    codePostal: '82000',
    population: '62 000',
    communesProches: ['Bressols', 'Montbeton', 'Villemade', 'Lacourt-Saint-Pierre', 'Albias'],
    specificites: 'Préfecture du Tarn-et-Garonne. Sols argileux similaires à la Haute-Garonne. Peu d\'experts locaux.'
  },
  'castelsarrasin': {
    nom: 'Castelsarrasin',
    departement: 'Tarn-et-Garonne (82)',
    codePostal: '82100',
    population: '14 000',
    communesProches: ['Moissac', 'Montech', 'Saint-Aignan', 'Castelmayran'],
    specificites: '2ème ville du Tarn-et-Garonne. Zone agricole avec maisons anciennes.'
  },
  'auch': {
    nom: 'Auch',
    departement: 'Gers (32)',
    codePostal: '32000',
    population: '23 000',
    communesProches: ['Pavie', 'Preignan', 'Duran', 'Roquelaure', 'Montégut'],
    specificites: 'Préfecture du Gers. Territoire quasi-vierge pour l\'expertise fissures. Fort potentiel.'
  },
  'condom': {
    nom: 'Condom',
    departement: 'Gers (32)',
    codePostal: '32100',
    population: '7 000',
    communesProches: ['Valence-sur-Baïse', 'Cassaigne', 'Larressingle', 'Mouchan'],
    specificites: 'Patrimoine ancien. Peu de concurrence sur l\'expertise fissures.'
  },
  'saint-gaudens': {
    nom: 'Saint-Gaudens',
    departement: 'Haute-Garonne (31)',
    codePostal: '31800',
    population: '12 000',
    communesProches: ['Valentine', 'Villeneuve-de-Rivière', 'Miramont-de-Comminges', 'Estancarbon'],
    specificites: 'Sous-préfecture du Comminges. Maisons de caractère, parfois anciennes.'
  },
  'plaisance-du-touch': {
    nom: 'Plaisance-du-Touch',
    departement: 'Haute-Garonne (31)',
    codePostal: '31830',
    population: '20 000',
    communesProches: ['Tournefeuille', 'Colomiers', 'Fonsorbes', 'La Salvetat-Saint-Gilles'],
    specificites: 'Commune en forte expansion. Lotissements récents sur sol argileux.'
  },
  'l-union': {
    nom: 'L\'Union',
    departement: 'Haute-Garonne (31)',
    codePostal: '31240',
    population: '12 000',
    communesProches: ['Toulouse', 'Balma', 'Saint-Jean', 'Montrabé', 'Launaguet'],
    specificites: 'Banlieue nord-est de Toulouse. Pavillons des années 70-90.'
  },
  'castanet-tolosan': {
    nom: 'Castanet-Tolosan',
    departement: 'Haute-Garonne (31)',
    codePostal: '31320',
    population: '15 000',
    communesProches: ['Ramonville', 'Auzeville-Tolosane', 'Labège', 'Escalquens', 'Pechabou'],
    specificites: 'Sud-est toulousain. Zone très touchée par le RGA après les sécheresses.'
  },
  'saint-orens-de-gameville': {
    nom: 'Saint-Orens-de-Gameville',
    departement: 'Haute-Garonne (31)',
    codePostal: '31650',
    population: '13 000',
    communesProches: ['Toulouse', 'Labège', 'Quint-Fonsegrives', 'Escalquens'],
    specificites: 'Commune résidentielle. Nombreuses maisons individuelles sur sol sensible.'
  },
  'fonsorbes': {
    nom: 'Fonsorbes',
    departement: 'Haute-Garonne (31)',
    codePostal: '31470',
    population: '12 000',
    communesProches: ['Plaisance-du-Touch', 'Saint-Lys', 'La Salvetat-Saint-Gilles', 'Bonrepos-sur-Aussonnelle'],
    specificites: 'Croissance rapide. Lotissements sur terrain argileux.'
  },
  'portet-sur-garonne': {
    nom: 'Portet-sur-Garonne',
    departement: 'Haute-Garonne (31)',
    codePostal: '31120',
    population: '10 000',
    communesProches: ['Toulouse', 'Muret', 'Cugnaux', 'Roques', 'Villeneuve-Tolosane'],
    specificites: 'Zone commerciale et résidentielle. Proximité Garonne.'
  },
  'labege': {
    nom: 'Labège',
    departement: 'Haute-Garonne (31)',
    codePostal: '31670',
    population: '5 000',
    communesProches: ['Toulouse', 'Ramonville', 'Auzeville-Tolosane', 'Escalquens', 'Castanet-Tolosan'],
    specificites: 'Technopole et zone résidentielle. Constructions récentes mais sol sensible.'
  }
};

// Liste des slugs pour generateStaticParams
const villesSlugs = Object.keys(villesExpertise);

export async function generateStaticParams() {
  return villesSlugs.map((ville) => ({ ville }));
}

export async function generateMetadata({ params }: { params: Promise<{ ville: string }> }): Promise<Metadata> {
  const { ville } = await params;
  const villeData = villesExpertise[ville];
  
  if (!villeData) {
    return { title: 'Expert Fissures | IPB Expertise' };
  }

  const deptCode = villeData.codePostal.slice(0, 2);
  const villeNom = villeData.nom;
  const villeNomLower = villeNom.toLowerCase();

  return {
    title: `Expert Fissures ${villeNom} (${deptCode}) | Agrafage Garanti 10 ans | IPB`,
    description: `Expert fissures maison à ${villeNom} et ${villeData.communesProches[0]}. Diagnostic 149€ déductible, agrafage structurel, harpage. Intervention 48h. ☎ 05 82 95 33 75`,
    keywords: [
      `expert fissures ${villeNomLower}`,
      `fissures maison ${villeNomLower}`,
      `agrafage fissures ${villeNomLower}`,
      `diagnostic fissures ${deptCode}`,
      `réparation fissures ${villeNomLower}`,
      `expert bâtiment ${villeNomLower}`,
      `fissure mur ${villeNomLower}`,
      `tassement différentiel ${villeNomLower}`,
      `sol argileux ${villeNomLower}`,
      `fissure façade ${deptCode}`,
    ],
    alternates: {
      canonical: `https://www.ipb-expertise.fr/expert-fissures/${ville}`,
    },
    openGraph: {
      title: `Expert Fissures ${villeNom} (${deptCode}) | IPB`,
      description: `Spécialiste fissures à ${villeNom}. Agrafage structurel garanti. Diagnostic 48h.`,
      url: `https://www.ipb-expertise.fr/expert-fissures/${ville}`,
      type: 'website',
      images: [{ url: '/images/fissure-facade-verticale.webp', width: 1200, height: 630, alt: `Expert fissures ${villeNom}` }],
    },
    twitter: {
      card: 'summary',
      title: `Expert Fissures ${villeNom}`,
      description: `Agrafage garanti 10 ans. Diagnostic 48h.`,
    },
    robots: { index: true, follow: true },
  };
}

export default async function ExpertFissuresVillePage({ params }: { params: Promise<{ ville: string }> }) {
  const { ville } = await params;
  const villeData = villesExpertise[ville];

  if (!villeData) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": `IPB - Expert Fissures ${villeData.nom}`,
    "description": `Expert indépendant en diagnostic et traitement des fissures à ${villeData.nom}`,
    "url": `https://www.ipb-expertise.fr/expert-fissures/${ville}`,
    "telephone": "+33582953375",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": villeData.nom,
      "addressRegion": villeData.departement,
      "postalCode": villeData.codePostal,
      "addressCountry": "FR"
    },
    "areaServed": { "@type": "City", "name": villeData.nom },
    "priceRange": "€€"
  };

  const faqItems = [
    {
      question: `Intervenez-vous à ${villeData.nom} ?`,
      answer: `Oui, nous intervenons à ${villeData.nom} et dans les communes environnantes : ${villeData.communesProches.join(', ')}. Diagnostic sous 48h, déplacement inclus.`
    },
    {
      question: `Combien coûte un diagnostic fissures à ${villeData.nom} ?`,
      answer: `Le diagnostic coûte 149€, déductibles des travaux si vous nous confiez la réparation. Ce tarif inclut le déplacement sur ${villeData.nom}.`
    },
    {
      question: `Les fissures sont-elles fréquentes à ${villeData.nom} ?`,
      answer: `${villeData.specificites} Les maisons individuelles sont particulièrement touchées après les périodes de sécheresse.`
    },
    {
      question: `Quelle solution pour les fissures à ${villeData.nom} ?`,
      answer: `Selon le diagnostic, nous proposons l'agrafage structurel (8-15K€, garantie 10 ans) ou les micropieux pour les cas graves. L'agrafage convient à 80% des situations.`
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
          <Link href="/" className="hover:text-orange-600">Accueil</Link>
          <span className="mx-2">›</span>
          <Link href="/expert-fissures-toulouse-31" className="hover:text-orange-600">Expert Fissures</Link>
          <span className="mx-2">›</span>
          <span className="text-slate-900">{villeData.nom}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative bg-slate-900 text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-orange-950/30"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-red-400 text-sm font-bold mb-4">
              <MapPin size={18} />
              <span>⚠️ {villeData.nom} : Zone à risque RGA depuis 2022</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
              Fissures à <span className="text-orange-400">{villeData.nom}</span> ?<br />
              <span className="text-slate-300 text-3xl">L'Expert Local Qui Intervient en 48h</span>
            </h1>
            <p className="text-xl text-slate-300 mb-4 max-w-2xl">
              À {villeData.nom}, les fissures ne sont pas un hasard. {villeData.specificites}
            </p>
            <div className="bg-orange-500/20 border border-orange-500/40 rounded-xl p-4 mb-8 max-w-2xl">
              <p className="text-orange-200 font-bold">
                💡 En 2025, <strong className="text-white">1 maison sur 8</strong> à {villeData.nom} présente des signes de fissuration. 
                Ne laissez pas les vôtres s'aggraver.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/diagnostic" className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-xl animate-pulse">
                🚨 DIAGNOSTIC GRATUIT - 48h <ArrowRight size={20} />
              </Link>
              <a href="tel:0582953375" className="bg-white/10 border border-white/20 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all">
                <Phone size={20} /> Urgence : 05 82 95 33 75
              </a>
            </div>
            <p className="text-sm text-slate-400 mt-4">✓ Déplacement gratuit sur {villeData.nom} · ✓ Rapport sous 48h · ✓ Devis offert</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-extrabold text-orange-600">48h</div>
              <div className="text-slate-600 text-sm">Intervention</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-orange-600">149€</div>
              <div className="text-slate-600 text-sm">Diagnostic</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-orange-600">10 ans</div>
              <div className="text-slate-600 text-sm">Garantie</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-orange-600">98%</div>
              <div className="text-slate-600 text-sm">Satisfaits</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contexte local */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-6">
                Fissures à {villeData.nom} : contexte local
              </h2>
              <div className="prose prose-lg text-slate-600">
                <p>{villeData.specificites}</p>
                <p>
                  Notre équipe intervient régulièrement à {villeData.nom} et connaît parfaitement les problématiques 
                  locales. Nous travaillons avec les assurances pour les dossiers de catastrophe naturelle sécheresse.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="bg-orange-50 rounded-xl p-4 text-center">
                  <Clock className="mx-auto text-orange-600 mb-2" size={24} />
                  <div className="font-bold text-slate-900">Diagnostic 48h</div>
                </div>
                <div className="bg-orange-50 rounded-xl p-4 text-center">
                  <FileText className="mx-auto text-orange-600 mb-2" size={24} />
                  <div className="font-bold text-slate-900">Rapport détaillé</div>
                </div>
                <div className="bg-orange-50 rounded-xl p-4 text-center">
                  <Shield className="mx-auto text-orange-600 mb-2" size={24} />
                  <div className="font-bold text-slate-900">Garantie 10 ans</div>
                </div>
              </div>
            </div>
            <div className="bg-slate-100 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Communes proches couvertes</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {villeData.communesProches.map((commune) => (
                  <span key={commune} className="bg-white text-slate-700 px-3 py-1 rounded-full text-sm">
                    {commune}
                  </span>
                ))}
              </div>
              <div className="border-t border-slate-200 pt-6">
                <h4 className="font-bold text-slate-900 mb-3">Nos services à {villeData.nom}</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-slate-700">
                    <CheckCircle size={16} className="text-green-500" /> Diagnostic fissures
                  </li>
                  <li className="flex items-center gap-2 text-slate-700">
                    <CheckCircle size={16} className="text-green-500" /> Agrafage structurel
                  </li>
                  <li className="flex items-center gap-2 text-slate-700">
                    <CheckCircle size={16} className="text-green-500" /> Expertise assurance
                  </li>
                  <li className="flex items-center gap-2 text-slate-700">
                    <CheckCircle size={16} className="text-green-500" /> Suivi post-travaux
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tarifs */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-center mb-12">Tarifs à {villeData.nom}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-800 rounded-2xl p-6 text-center">
              <h3 className="font-bold mb-2">Diagnostic</h3>
              <div className="text-4xl font-extrabold text-orange-400 mb-2">149€</div>
              <p className="text-slate-400 text-sm">Déductible des travaux</p>
            </div>
            <div className="bg-slate-800 rounded-2xl p-6 text-center border-2 border-orange-500">
              <h3 className="font-bold mb-2">Agrafage</h3>
              <div className="text-4xl font-extrabold text-orange-400 mb-2">8-15K€</div>
              <p className="text-slate-400 text-sm">Garantie 10 ans</p>
            </div>
            <div className="bg-slate-800 rounded-2xl p-6 text-center">
              <h3 className="font-bold mb-2">Micropieux</h3>
              <div className="text-4xl font-extrabold text-orange-400 mb-2">25-50K€</div>
              <p className="text-slate-400 text-sm">Cas complexes</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-slate-100">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-8 text-center">
            Questions fréquentes - {villeData.nom}
          </h2>
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

      {/* Topic Cluster - Liens vers spokes */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-8 text-center">
            Guides par type de fissure
          </h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
            <Link href="/fissure-en-escalier-causes" className="bg-slate-50 hover:bg-orange-50 border border-slate-200 hover:border-orange-200 rounded-xl p-4 transition-all group">
              <span className="text-2xl mb-2 block">🪜</span>
              <h3 className="font-bold text-slate-900 group-hover:text-orange-600 text-sm">Fissure en escalier</h3>
            </Link>
            <Link href="/fissure-horizontale-danger" className="bg-slate-50 hover:bg-orange-50 border border-slate-200 hover:border-orange-200 rounded-xl p-4 transition-all group">
              <span className="text-2xl mb-2 block">➖</span>
              <h3 className="font-bold text-slate-900 group-hover:text-orange-600 text-sm">Fissure horizontale</h3>
            </Link>
            <Link href="/microfissure-quand-sinquieter" className="bg-slate-50 hover:bg-orange-50 border border-slate-200 hover:border-orange-200 rounded-xl p-4 transition-all group">
              <span className="text-2xl mb-2 block">🔍</span>
              <h3 className="font-bold text-slate-900 group-hover:text-orange-600 text-sm">Microfissure</h3>
            </Link>
            <Link href="/fissure-secheresse-indemnisation" className="bg-slate-50 hover:bg-orange-50 border border-slate-200 hover:border-orange-200 rounded-xl p-4 transition-all group">
              <span className="text-2xl mb-2 block">☀️</span>
              <h3 className="font-bold text-slate-900 group-hover:text-orange-600 text-sm">Fissure sécheresse</h3>
            </Link>
            <Link href="/fissure-fondation-maison" className="bg-slate-50 hover:bg-orange-50 border border-slate-200 hover:border-orange-200 rounded-xl p-4 transition-all group">
              <span className="text-2xl mb-2 block">🏠</span>
              <h3 className="font-bold text-slate-900 group-hover:text-orange-600 text-sm">Fissure fondation</h3>
            </Link>
          </div>
          <div className="mt-8 text-center">
            <Link href="/expert-fissures-toulouse-31" className="inline-flex items-center gap-2 text-orange-600 font-bold hover:text-orange-700">
              Consultez notre guide complet Expert Fissures <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Final persuasif */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-orange-200 font-bold mb-3">⏰ Vous habitez {villeData.nom} ?</p>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Chaque Mois D'Attente Coûte +15% de Réparation
          </h2>
          <p className="text-xl text-orange-100 mb-6">
            Une fissure traitée rapidement = <strong className="text-white">8 000€</strong><br />
            La même fissure dans 2 ans = <strong className="text-white">25 000€ minimum</strong>
          </p>
          <div className="bg-white/10 rounded-xl p-4 mb-8 max-w-md mx-auto backdrop-blur-sm">
            <p className="text-sm">
              🏆 <strong>+50 interventions</strong> dans la zone de {villeData.nom}<br />
              ⭐ <strong>4.9/5</strong> sur Google · <strong>10 ans</strong> de garantie
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/diagnostic" className="bg-white text-orange-600 px-10 py-5 rounded-xl font-bold text-lg hover:bg-orange-50 flex items-center justify-center gap-2 shadow-2xl transform hover:scale-105 transition-all">
              JE VEUX MON DIAGNOSTIC GRATUIT <ArrowRight size={20} />
            </Link>
            <a href="tel:0582953375" className="bg-orange-700 hover:bg-orange-800 px-8 py-5 rounded-xl font-bold text-lg flex items-center justify-center gap-2">
              <Phone size={20} /> 05 82 95 33 75
            </a>
          </div>
          <p className="text-sm text-orange-200 mt-4">Réponse garantie sous 24h · Déplacement gratuit sur {villeData.nom}</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
