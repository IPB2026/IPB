import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { Testimonials } from '@/components/home/Testimonials';
import { CheckCircle, Phone, ArrowRight, MapPin, Shield, Clock, FileText, AlertTriangle, Home, TreeDeciduous, Droplets, TrendingUp, Calendar, Users, Award } from 'lucide-react';
import { villesData, villeSlugs, getVillesMemesDepartement, type VilleInfo } from '@/app/data/villes';
import { RelatedPagesLinks } from '@/components/seo/RelatedPagesLinks';
import { VilleBreadcrumb } from '@/components/seo/BreadcrumbSchema';

// Génération statique des pages
export async function generateStaticParams() {
  return villeSlugs.map((ville) => ({ ville }));
}

// Génération des métadonnées SEO
export async function generateMetadata({ params }: { params: Promise<{ ville: string }> }): Promise<Metadata> {
  const { ville } = await params;
  const villeData = villesData[ville];
  
  if (!villeData) {
    return { title: 'Expert Fissures | IPB Expertise' };
  }

  const deptCode = villeData.codePostal.slice(0, 2);
  const villeNom = villeData.nom;
  const villeNomLower = villeNom.toLowerCase().replace(/\s+/g, '-');

  // Mots-clés enrichis avec données locales
  const keywords = [
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
    `RGA ${villeNomLower}`,
    `catastrophe naturelle sécheresse ${villeNomLower}`,
    `micropieux ${villeNomLower}`,
    `stabilisation fondations ${villeNomLower}`,
  ];

  // Description personnalisée
  const description = villeData.risqueRGA === 'tres-fort' || villeData.risqueRGA === 'fort'
    ? `Expert fissures à ${villeNom} (${deptCode}). Zone RGA ${villeData.risqueRGA}, diagnostic sur site + agrafage garanti 10 ans. 05 82 95 33 75`
    : `Expert fissures à ${villeNom} (${deptCode}). Diagnostic expert sur site, agrafage garanti 10 ans. Intervention 48h. 05 82 95 33 75`;

  return {
    title: `Expert Fissures ${villeNom} (${deptCode}) | IPB`,
    description,
    keywords,
    alternates: {
      canonical: `https://www.ipb-expertise.fr/expert-fissures/${ville}`,
    },
    openGraph: {
      title: `Expert Fissures ${villeNom} (${deptCode}) | IPB`,
      description: `Spécialiste fissures à ${villeNom}. ${villeData.arretesCATNAT?.length || 0} arrêtés CAT-NAT récents. Diagnostic 48h.`,
      url: `https://www.ipb-expertise.fr/expert-fissures/${ville}`,
      type: 'website',
      images: [{ url: '/images/fissure-facade-verticale.webp', width: 1200, height: 630, alt: `Expert fissures ${villeNom}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Expert Fissures ${villeNom} | IPB`,
      description: `Agrafage structurel garanti 10 ans à ${villeNom}. Diagnostic sous 48h. ☎ 05 82 95 33 75`,
    },
    robots: { index: true, follow: true },
  };
}

// Fonction pour obtenir la couleur du risque RGA
function getRisqueColor(risque?: string) {
  switch (risque) {
    case 'tres-fort': return 'text-red-600 bg-red-100';
    case 'fort': return 'text-orange-600 bg-orange-100';
    case 'moyen': return 'text-yellow-600 bg-yellow-100';
    case 'faible': return 'text-green-600 bg-green-100';
    default: return 'text-slate-600 bg-slate-100';
  }
}

function getRisqueLabel(risque?: string) {
  switch (risque) {
    case 'tres-fort': return 'Très Fort';
    case 'fort': return 'Fort';
    case 'moyen': return 'Moyen';
    case 'faible': return 'Faible';
    default: return 'Non évalué';
  }
}

export default async function ExpertFissuresVillePage({ params }: { params: Promise<{ ville: string }> }) {
  const { ville } = await params;
  const villeData = villesData[ville];

  if (!villeData) {
    notFound();
  }

  // JSON-LD enrichi
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": `IPB - Expert Fissures ${villeData.nom}`,
    "description": villeData.description,
    "url": `https://www.ipb-expertise.fr/expert-fissures/${ville}`,
    "telephone": "+33582953375",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": villeData.nom,
      "addressRegion": villeData.departement,
      "postalCode": villeData.codePostal,
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "43.6047",
      "longitude": "1.4442"
    },
    "areaServed": [
      { "@type": "City", "name": villeData.nom },
      ...(villeData.communesProches?.map(c => ({ "@type": "City", "name": c })) || [])
    ],
    "priceRange": "€€"
  };

  // FAQ personnalisée
  const faqItems = [
    {
      question: `Intervenez-vous à ${villeData.nom} pour les fissures ?`,
      answer: `Oui, nous intervenons régulièrement à ${villeData.nom} et dans les communes environnantes : ${villeData.communesProches?.join(', ') || 'toute la zone'}. ${villeData.specificitesFissures || ''} Diagnostic sous 48h, déplacement inclus.`
    },
    {
      question: `Quel est le risque de fissures à ${villeData.nom} ?`,
      answer: `${villeData.nom} est classée en aléa RGA ${getRisqueLabel(villeData.risqueRGA).toLowerCase()}. ${villeData.geologie || ''} ${villeData.tauxSinistralite ? `Le taux de sinistralité local est de ${villeData.tauxSinistralite}.` : ''}`
    },
    {
      question: `Comment se déroule un diagnostic fissures à ${villeData.nom} ?`,
      answer: `Le diagnostic est une prestation d'expertise réalisée sur site, incluant le déplacement sur ${villeData.nom}, les mesures instrumentées (niveau laser, fissuromètre) et un rapport détaillé avec photos et recommandations. Son coût est déductible des travaux si vous nous confiez la réparation.`
    },
    {
      question: `Ma maison à ${villeData.nom} est-elle éligible à la garantie CAT-NAT ?`,
      answer: `${villeData.arretesCATNAT && villeData.arretesCATNAT.length > 0 
        ? `${villeData.nom} a fait l'objet de ${villeData.arretesCATNAT.length} arrêtés de catastrophe naturelle sécheresse récents : ${villeData.arretesCATNAT.slice(0, 2).join(', ')}... Votre assurance peut prendre en charge une partie des travaux.`
        : `Nous vous aidons à vérifier l'éligibilité de votre commune et à constituer votre dossier d'indemnisation.`}`
    },
    {
      question: `Quelle solution pour les fissures à ${villeData.nom} ?`,
      answer: `${villeData.conseillExpert || `Selon le diagnostic, nous proposons l'agrafage structurel (8-15K€, garantie 10 ans) ou les micropieux pour les cas graves. L'agrafage convient à 85% des situations.`}`
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
      <VilleBreadcrumb villeName={villeData.nom} villeSlug={ville} service="fissures" />

      <main id="main-content">

      {/* Hero enrichi */}
      <section className="relative bg-slate-900 text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-orange-950/30"></div>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              {/* Badge risque RGA */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${getRisqueColor(villeData.risqueRGA)}`}>
                  <AlertTriangle size={16} />
                  Risque RGA : {getRisqueLabel(villeData.risqueRGA)}
                </div>
                {villeData.arretesCATNAT && villeData.arretesCATNAT.length > 0 && (
                  <div className="inline-flex items-center gap-2 bg-red-500/20 text-red-300 px-4 py-2 rounded-full text-sm font-bold">
                    <Calendar size={16} />
                    {villeData.arretesCATNAT.length} arrêtés CAT-NAT
                  </div>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
                Expert Fissures à <span className="text-orange-400">{villeData.nom}</span>
                <span className="block text-2xl md:text-3xl text-slate-300 mt-2">({villeData.codePostal})</span>
              </h1>

              <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                {villeData.description}
              </p>

              {villeData.tauxSinistralite && (
                <div className="bg-orange-500/20 border border-orange-500/40 rounded-xl p-4 mb-8">
                  <p className="text-orange-200">
                    <strong className="text-white">📊 Statistique locale :</strong> {villeData.tauxSinistralite} des maisons de {villeData.nom} ont déclaré des fissures liées au RGA.
                    {villeData.risqueRGA === 'tres-fort' || villeData.risqueRGA === 'fort' 
                      ? " Ne sous-estimez pas ce risque."
                      : " Un diagnostic préventif peut vous faire économiser des milliers d'euros."}
                  </p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Link href="/diagnostic" className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-xl">
                  🚨 DIAGNOSTIC GRATUIT <ArrowRight size={20} />
                </Link>
                <a href="tel:0582953375" className="bg-white/10 border border-white/20 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all">
                  <Phone size={20} /> 05 82 95 33 75
                </a>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                <span className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" /> Intervention {villeData.distance} de Toulouse
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={16} className="text-orange-400" /> Diagnostic sous 48h
                </span>
                <span className="flex items-center gap-2">
                  <Shield size={16} className="text-blue-400" /> Garantie décennale
                </span>
              </div>
            </div>

            {/* Encart données locales */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <MapPin size={20} className="text-orange-400" />
                Données locales {villeData.nom}
              </h2>
              
              <div className="space-y-4">
                {villeData.population && (
                  <div className="flex items-center gap-3">
                    <Users size={18} className="text-slate-400" />
                    <div>
                      <div className="text-sm text-slate-400">Population</div>
                      <div className="text-white font-bold">{villeData.population} habitants</div>
                    </div>
                  </div>
                )}
                
                {villeData.quartiersRisque && villeData.quartiersRisque.length > 0 && (
                  <div>
                    <div className="text-sm text-slate-400 mb-2 flex items-center gap-2">
                      <Home size={16} /> Quartiers les plus touchés
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {villeData.quartiersRisque.slice(0, 4).map((q, i) => (
                        <span key={i} className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-xs font-medium">
                          {q.split(' (')[0]}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {villeData.arretesCATNAT && villeData.arretesCATNAT.length > 0 && (
                  <div>
                    <div className="text-sm text-slate-400 mb-2 flex items-center gap-2">
                      <FileText size={16} /> Derniers arrêtés CAT-NAT
                    </div>
                    <ul className="text-sm text-slate-300 space-y-1">
                      {villeData.arretesCATNAT.slice(0, 3).map((arr, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-orange-400 rounded-full"></span>
                          {arr}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sommaire */}
      <section className="py-8 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Sommaire de la page</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
              <a href="#stats-cles" className="text-orange-600 hover:text-orange-700 underline-offset-2 hover:underline">Statistiques clés</a>
              <a href="#contexte-local" className="text-orange-600 hover:text-orange-700 underline-offset-2 hover:underline">Contexte local</a>
              <a href="#tarifs" className="text-orange-600 hover:text-orange-700 underline-offset-2 hover:underline">Prestations</a>
              <a href="#solutions" className="text-orange-600 hover:text-orange-700 underline-offset-2 hover:underline">Solutions & méthode</a>
              <a href="#avis" className="text-orange-600 hover:text-orange-700 underline-offset-2 hover:underline">Avis clients</a>
              <a href="#faq" className="text-orange-600 hover:text-orange-700 underline-offset-2 hover:underline">FAQ</a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats clés */}
      <section id="stats-cles" className="py-10 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-extrabold text-orange-600">48h</div>
              <div className="text-slate-600 text-sm">Intervention</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-orange-600">Expert</div>
              <div className="text-slate-600 text-sm">Diagnostic sur site</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-orange-600">10 ans</div>
              <div className="text-slate-600 text-sm">Garantie agrafage</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-orange-600">-65%</div>
              <div className="text-slate-600 text-sm">vs micropieux</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contexte géologique local */}
      {villeData.geologie && (
        <section id="contexte-local" className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-extrabold text-slate-900 mb-6">
                  Pourquoi les maisons de {villeData.nom} se fissurent
                </h2>
                
                <div className="prose prose-lg text-slate-600">
                  <p className="mb-4">{villeData.geologie}</p>
                  
                  {villeData.historiqueLocal && (
                    <p className="mb-4">{villeData.historiqueLocal}</p>
                  )}
                  
                  {villeData.typesConstruction && (
                    <div className="bg-slate-100 rounded-xl p-6 my-6">
                      <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <Home size={20} className="text-orange-600" />
                        Parc immobilier local
                      </h3>
                      <p className="text-slate-600 text-base">{villeData.typesConstruction}</p>
                    </div>
                  )}
                </div>

                {villeData.problemesFrequents && villeData.problemesFrequents.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">
                      Problèmes fréquents à {villeData.nom}
                    </h3>
                    <ul className="space-y-3">
                      {villeData.problemesFrequents.map((p, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-600">
                          <AlertTriangle size={18} className="text-orange-600 flex-shrink-0 mt-1" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {/* Conseil expert */}
                {villeData.conseillExpert && (
                  <div className="bg-orange-50 border-l-4 border-orange-600 rounded-r-xl p-6">
                    <h3 className="font-bold text-orange-900 mb-3 flex items-center gap-2">
                      <Award size={20} />
                      Conseil de notre expert pour {villeData.nom}
                    </h3>
                    <p className="text-orange-800">{villeData.conseillExpert}</p>
                  </div>
                )}

                {/* Spécificités fissures */}
                {villeData.specificitesFissures && (
                  <div className="bg-slate-100 rounded-xl p-6">
                    <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                      <TrendingUp size={20} className="text-orange-600" />
                      Ce que nous observons à {villeData.nom}
                    </h3>
                    <p className="text-slate-600">{villeData.specificitesFissures}</p>
                  </div>
                )}

                {/* Communes proches */}
                {villeData.communesProches && villeData.communesProches.length > 0 && (
                  <div className="bg-white rounded-xl p-6 border border-slate-200">
                    <h3 className="font-bold text-slate-900 mb-4">
                      Nous intervenons aussi à proximité
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {villeData.communesProches.map((commune, i) => {
                        const communeSlug = commune.toLowerCase().replace(/[']/g, '').replace(/\s+/g, '-');
                        return (
                          <Link 
                            key={i} 
                            href={`/expert-fissures/${communeSlug}`}
                            className="bg-slate-100 hover:bg-orange-100 text-slate-700 hover:text-orange-700 px-4 py-2 rounded-full text-sm font-medium transition-colors"
                          >
                            {commune}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Solutions & méthode */}
      <section id="solutions" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
              Notre méthode IPB pour stabiliser durablement les fissures
            </h2>
            <p className="text-lg text-slate-600">
              À {villeData.nom}, les fissures sont souvent liées au retrait-gonflement des argiles. 
              Nous appliquons une méthode en 3 étapes, documentée et reproductible, pour stopper l’évolution.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-3">1. Diagnostic expert sur site</h3>
              <p className="text-slate-600 text-sm mb-4">
                Relevés précis, prise de mesures, analyse des causes et des zones de tension.
              </p>
              <ul className="text-sm text-slate-600 space-y-2">
                <li>• Mesures d’ouverture des fissures</li>
                <li>• Analyse des fondations et du sol</li>
                <li>• Rapport écrit + préconisations</li>
              </ul>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-3">2. Stabilisation structurelle</h3>
              <p className="text-slate-600 text-sm mb-4">
                Intervention ciblée selon la gravité : agrafage, harpage, renforts ou micropieux.
              </p>
              <ul className="text-sm text-slate-600 space-y-2">
                <li>• Agrafes inox et mortiers techniques</li>
                <li>• Reprise en sous-œuvre si nécessaire</li>
                <li>• Garantie décennale sur travaux</li>
              </ul>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-3">3. Suivi et prévention</h3>
              <p className="text-slate-600 text-sm mb-4">
                Conseils d’entretien et surveillance pour éviter la réapparition des fissures.
              </p>
              <ul className="text-sm text-slate-600 space-y-2">
                <li>• Conseils sur gestion des eaux</li>
                <li>• Prévention des mouvements de sol</li>
                <li>• Contrôle périodique recommandé</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Tarifs */}
      <section id="tarifs" className="py-16 bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-center mb-4">Nos prestations à {villeData.nom}</h2>
          <p className="text-slate-400 text-center mb-12">Déplacement inclus dans le rayon de {villeData.distance} depuis Toulouse</p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-800 rounded-2xl p-6 text-center">
              <h3 className="font-bold mb-2">Diagnostic Expert</h3>
              <div className="text-2xl font-extrabold text-orange-400 mb-2">Sur devis</div>
              <p className="text-slate-400 text-sm mb-4">Déductible des travaux</p>
              <ul className="text-sm text-slate-300 text-left space-y-2">
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> Visite sur site (1h30)</li>
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> Mesures niveau laser</li>
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> Rapport photos + recommandations</li>
              </ul>
            </div>
            <div className="bg-slate-800 rounded-2xl p-6 text-center border-2 border-orange-500 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-xs font-bold">
                85% DES CAS
              </div>
              <h3 className="font-bold mb-2">Agrafage Structurel</h3>
              <div className="text-4xl font-extrabold text-orange-400 mb-2">8-18K€</div>
              <p className="text-slate-400 text-sm mb-4">Garantie 10 ans</p>
              <ul className="text-sm text-slate-300 text-left space-y-2">
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> Agrafes inox tous les 40cm</li>
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> Mortier fibré élastique</li>
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> Finition enduit</li>
              </ul>
            </div>
            <div className="bg-slate-800 rounded-2xl p-6 text-center">
              <h3 className="font-bold mb-2">Micropieux</h3>
              <div className="text-4xl font-extrabold text-orange-400 mb-2">25-50K€</div>
              <p className="text-slate-400 text-sm mb-4">Cas graves uniquement</p>
              <ul className="text-sm text-slate-300 text-left space-y-2">
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> Ancrage profond (10-15m)</li>
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> Affaissements &gt; 5cm</li>
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> Garantie décennale</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ locale */}
      <section id="faq" className="py-16 bg-slate-100">
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
              <p className="text-xs text-slate-500 mt-1">Tassement différentiel</p>
            </Link>
            <Link href="/fissure-horizontale-danger" className="bg-slate-50 hover:bg-orange-50 border border-slate-200 hover:border-orange-200 rounded-xl p-4 transition-all group">
              <span className="text-2xl mb-2 block">➖</span>
              <h3 className="font-bold text-slate-900 group-hover:text-orange-600 text-sm">Fissure horizontale</h3>
              <p className="text-xs text-slate-500 mt-1">Poussée ou flexion</p>
            </Link>
            <Link href="/microfissure-quand-sinquieter" className="bg-slate-50 hover:bg-orange-50 border border-slate-200 hover:border-orange-200 rounded-xl p-4 transition-all group">
              <span className="text-2xl mb-2 block">🔍</span>
              <h3 className="font-bold text-slate-900 group-hover:text-orange-600 text-sm">Microfissure</h3>
              <p className="text-xs text-slate-500 mt-1">Quand s'inquiéter ?</p>
            </Link>
            <Link href="/fissure-secheresse-indemnisation" className="bg-slate-50 hover:bg-orange-50 border border-slate-200 hover:border-orange-200 rounded-xl p-4 transition-all group">
              <span className="text-2xl mb-2 block">☀️</span>
              <h3 className="font-bold text-slate-900 group-hover:text-orange-600 text-sm">Fissure sécheresse</h3>
              <p className="text-xs text-slate-500 mt-1">CAT-NAT & indemnisation</p>
            </Link>
            <Link href="/fissure-fondation-maison" className="bg-slate-50 hover:bg-orange-50 border border-slate-200 hover:border-orange-200 rounded-xl p-4 transition-all group">
              <span className="text-2xl mb-2 block">🏠</span>
              <h3 className="font-bold text-slate-900 group-hover:text-orange-600 text-sm">Fissure fondation</h3>
              <p className="text-xs text-slate-500 mt-1">Stabilisation urgente</p>
            </Link>
          </div>
          <div className="mt-8 text-center">
            <Link href="/expert-fissures-toulouse-31" className="inline-flex items-center gap-2 text-orange-600 font-bold hover:text-orange-700">
              Consultez notre guide complet Expert Fissures <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Avis Google */}
      <section id="avis" className="bg-white">
        <Testimonials />
      </section>

      {/* CTA Final */}
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
          
          {villeData.tauxSinistralite && (
            <div className="bg-white/10 rounded-xl p-4 mb-8 max-w-md mx-auto backdrop-blur-sm">
              <p className="text-sm">
                📊 <strong>{villeData.tauxSinistralite}</strong> de sinistralité à {villeData.nom}<br />
                ⭐ <strong>4.9/5</strong> sur Google · <strong>10 ans</strong> de garantie
              </p>
            </div>
          )}
          
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

      </main>
      
      {/* Maillage interne SEO - Autres villes */}
      <RelatedPagesLinks
        title={`Nos experts fissures dans votre département`}
        pages={[
          { href: '/expertise/fissures', label: 'Nos solutions fissures', description: 'Toutes nos méthodes' },
          { href: '/zones-intervention', label: 'Toutes nos zones', description: '56 villes couvertes' },
          { href: '/diagnostic', label: 'Diagnostic gratuit', description: 'Évaluez votre situation' },
          ...getVillesMemesDepartement(ville)
            .slice(0, 10)
            .map(v => ({
              href: `/expert-fissures/${v}`,
              label: `Expert fissures ${villesData[v]?.nom || v}`,
            })),
        ]}
      />
      
      <Footer />
    </div>
  );
}
