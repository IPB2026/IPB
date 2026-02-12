import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { Testimonials } from '@/components/home/Testimonials';
import { CheckCircle, Phone, ArrowRight, MapPin, Shield, Clock, Droplets, AlertTriangle, Home, Award, Users, ThermometerSun, Wind } from 'lucide-react';
import { villesData, villeSlugs, type VilleInfo } from '@/app/data/villes';
import { RelatedPagesLinks } from '@/components/seo/RelatedPagesLinks';

// Génération statique des pages
export async function generateStaticParams() {
  return villeSlugs.map((ville) => ({ ville }));
}

// Génération des métadonnées SEO
export async function generateMetadata({ params }: { params: Promise<{ ville: string }> }): Promise<Metadata> {
  const { ville } = await params;
  const villeData = villesData[ville];
  
  if (!villeData) {
    return { title: 'Expert Humidité | IPB Expertise' };
  }

  const deptCode = villeData.codePostal.slice(0, 2);
  const villeNom = villeData.nom;
  const villeNomLower = villeNom.toLowerCase().replace(/\s+/g, '-');

  const keywords = [
    `expert humidité ${villeNomLower}`,
    `traitement humidité ${villeNomLower}`,
    `remontées capillaires ${villeNomLower}`,
    `injection résine ${villeNomLower}`,
    `salpêtre ${villeNomLower}`,
    `moisissures maison ${villeNomLower}`,
    `cave humide ${villeNomLower}`,
    `murs humides ${villeNomLower}`,
    `assèchement murs ${villeNomLower}`,
    `cuvelage ${deptCode}`,
    `VMI ${villeNomLower}`,
    `ventilation maison ${villeNomLower}`,
    `traitement mérule ${villeNomLower}`,
    `étanchéité ${villeNomLower}`,
  ];

  const description = `Expert traitement humidité à ${villeNom} (${deptCode}). Injection résine garantie 30 ans, cuvelage, VMI. Diagnostic 149€. Remontées capillaires, salpêtre, moisissures. ☎ 05 82 95 33 75`;

  return {
    title: `Expert Humidité ${villeNom} (${deptCode}) | Injection Résine Garantie 30 ans | IPB`,
    description,
    keywords,
    alternates: {
      canonical: `https://www.ipb-expertise.fr/expert-humidite/${ville}`,
    },
    openGraph: {
      title: `Expert Humidité ${villeNom} (${deptCode}) | IPB`,
      description: `Traitement définitif humidité à ${villeNom}. Injection résine, cuvelage, VMI. Diagnostic 48h.`,
      url: `https://www.ipb-expertise.fr/expert-humidite/${ville}`,
      type: 'website',
      images: [{ url: '/images/humidite-avant-apres.webp', width: 1200, height: 630, alt: `Expert humidité ${villeNom}` }],
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
  const villeData = villesData[ville];

  if (!villeData) {
    notFound();
  }

  // JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": `IPB - Expert Humidité ${villeData.nom}`,
    "description": `Expert en traitement de l'humidité à ${villeData.nom}. Injection résine, cuvelage, VMI.`,
    "url": `https://www.ipb-expertise.fr/expert-humidite/${ville}`,
    "telephone": "+33582953375",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": villeData.nom,
      "addressRegion": villeData.departement,
      "postalCode": villeData.codePostal,
      "addressCountry": "FR"
    },
    "areaServed": [
      { "@type": "City", "name": villeData.nom },
      ...(villeData.communesProches?.map(c => ({ "@type": "City", "name": c })) || [])
    ],
    "priceRange": "€€",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "14"
    }
  };

  // FAQ personnalisée humidité
  const faqItems = [
    {
      question: `Intervenez-vous à ${villeData.nom} pour les problèmes d'humidité ?`,
      answer: `Oui, nous intervenons à ${villeData.nom} et dans les communes voisines : ${villeData.communesProches?.join(', ') || 'toute la zone'}. ${villeData.specificitesHumidite || 'Notre équipe connaît parfaitement les problématiques locales d\'humidité.'} Diagnostic sous 48h.`
    },
    {
      question: `Comment savoir si j'ai des remontées capillaires à ${villeData.nom} ?`,
      answer: `Les signes caractéristiques sont : salpêtre (poudre blanche) au pied des murs, peinture qui cloque en bas de mur, odeur de moisi persistante, moisissures en partie basse. Si ces signes sont présents, vous avez probablement des remontées capillaires. Un diagnostic permet de confirmer.`
    },
    {
      question: `Combien coûte un traitement humidité à ${villeData.nom} ?`,
      answer: `Le diagnostic coûte 149€ (déductible des travaux). L'injection résine coûte 80-120€/ml (soit 8 000-15 000€ pour une maison standard). Le cuvelage (caves) coûte 150-250€/m². Ces tarifs incluent le déplacement sur ${villeData.nom} et la garantie 30 ans.`
    },
    {
      question: `Quelle est la différence entre condensation et remontées capillaires ?`,
      answer: `La condensation se manifeste en haut de mur et sur les fenêtres (buée), surtout en hiver. Les remontées capillaires touchent le bas de mur (< 1m50) avec présence de salpêtre. Le traitement est différent : ventilation pour la condensation, injection résine pour les remontées.`
    },
    {
      question: `Combien de temps pour que les murs sèchent après traitement ?`,
      answer: `La barrière d'injection est active en 48h. Mais le mur doit évacuer l'eau accumulée : comptez 1 mois par cm d'épaisseur (soit 6-12 mois pour un mur de 20cm). Le résultat est définitif et garanti 30 ans.`
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

  // Problèmes d'humidité typiques
  const problemesHumidite = [
    { icon: <Droplets size={20} />, titre: 'Remontées capillaires', desc: 'Eau qui monte du sol dans les murs par capillarité' },
    { icon: <ThermometerSun size={20} />, titre: 'Condensation', desc: 'Vapeur d\'eau qui se condense sur les murs froids' },
    { icon: <AlertTriangle size={20} />, titre: 'Infiltrations', desc: 'Eau qui pénètre par des fissures ou défauts d\'étanchéité' },
    { icon: <Wind size={20} />, titre: 'Défaut de ventilation', desc: 'Air humide qui stagne et crée des moisissures' },
  ];

  return (
    <div className="font-sans text-slate-800 bg-slate-50 antialiased">
      <Script id="local-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Script id="faq-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      
      <TopBar />
      <Navbar />

      <main id="main-content">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-slate-200 py-3">
          <div className="max-w-7xl mx-auto px-4 text-sm text-slate-600">
            <Link href="/" className="hover:text-blue-600">Accueil</Link>
            <span className="mx-2">›</span>
            <Link href="/expert-humidite-toulouse-31" className="hover:text-blue-600">Expert Humidité</Link>
            <span className="mx-2">›</span>
            <span className="text-slate-900 font-medium">{villeData.nom}</span>
          </div>
        </div>

      {/* Hero */}
      <section className="relative bg-slate-900 text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950/30"></div>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-bold mb-6">
                <Droplets size={16} />
                Traitement définitif de l'humidité
              </div>

              <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
                Expert Humidité à <span className="text-blue-400">{villeData.nom}</span>
                <span className="block text-2xl md:text-3xl text-slate-300 mt-2">({villeData.codePostal})</span>
              </h1>

              <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                Salpêtre, moisissures, peinture qui cloque, odeurs de moisi... Les problèmes d'humidité à {villeData.nom} sont fréquents, 
                notamment dans les maisons anciennes et les constructions sur sol argileux. Notre traitement par injection résine 
                stoppe définitivement les remontées capillaires, avec une garantie de 30 ans.
              </p>

              {villeData.specificitesHumidite && (
                <div className="bg-blue-500/20 border border-blue-500/40 rounded-xl p-4 mb-8">
                  <p className="text-blue-200">
                    <strong className="text-white">💧 Spécificité locale :</strong> {villeData.specificitesHumidite}
                  </p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Link href="/diagnostic" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-xl">
                  💧 DIAGNOSTIC GRATUIT <ArrowRight size={20} />
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
                  <Clock size={16} className="text-blue-400" /> Diagnostic sous 48h
                </span>
                <span className="flex items-center gap-2">
                  <Shield size={16} className="text-cyan-400" /> Garantie 30 ans
                </span>
              </div>
            </div>

            {/* Encart types de problèmes */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <AlertTriangle size={20} className="text-blue-400" />
                Problèmes d'humidité traités
              </h2>
              
              <div className="space-y-4">
                {problemesHumidite.map((p, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-white/5 rounded-xl">
                    <div className="text-blue-400 mt-1">{p.icon}</div>
                    <div>
                      <div className="text-white font-bold text-sm">{p.titre}</div>
                      <div className="text-slate-400 text-xs">{p.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {villeData.communesProches && (
                <div className="mt-6 pt-4 border-t border-white/10">
                  <div className="text-sm text-slate-400 mb-2">Nous intervenons aussi à :</div>
                  <div className="flex flex-wrap gap-2">
                    {villeData.communesProches.slice(0, 4).map((c, i) => (
                      <span key={i} className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}
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
              <a href="#stats-cles" className="text-blue-600 hover:text-blue-700 underline-offset-2 hover:underline">Statistiques clés</a>
              <a href="#solutions" className="text-blue-600 hover:text-blue-700 underline-offset-2 hover:underline">Solutions & méthode</a>
              <a href="#contexte-local" className="text-blue-600 hover:text-blue-700 underline-offset-2 hover:underline">Contexte local</a>
              <a href="#tarifs" className="text-blue-600 hover:text-blue-700 underline-offset-2 hover:underline">Tarifs</a>
              <a href="#avis" className="text-blue-600 hover:text-blue-700 underline-offset-2 hover:underline">Avis clients</a>
              <a href="#faq" className="text-blue-600 hover:text-blue-700 underline-offset-2 hover:underline">FAQ</a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section id="stats-cles" className="py-10 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-extrabold text-blue-600">48h</div>
              <div className="text-slate-600 text-sm">Diagnostic</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-blue-600">30 ans</div>
              <div className="text-slate-600 text-sm">Garantie injection</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-blue-600">95%</div>
              <div className="text-slate-600 text-sm">Efficacité</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-blue-600">6-12 mois</div>
              <div className="text-slate-600 text-sm">Séchage complet</div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions proposées */}
      <section id="solutions" className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-12 text-center">
            Nos solutions contre l'humidité à {villeData.nom}
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Injection résine */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="bg-blue-600 text-white p-6">
                <Droplets size={32} className="mb-3" />
                <h3 className="text-xl font-bold">Injection Résine</h3>
                <p className="text-blue-100 text-sm mt-2">Pour remontées capillaires</p>
              </div>
              <div className="p-6">
                <p className="text-slate-600 mb-4">
                  Création d'une barrière étanche à la base du mur. La résine hydrophobe bloque définitivement 
                  la remontée d'eau par capillarité.
                </p>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Perçage tous les 12cm</li>
                  <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Injection basse pression</li>
                  <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Barrière active en 48h</li>
                  <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Garantie 30 ans</li>
                </ul>
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <div className="text-2xl font-bold text-blue-600">80-120€ <span className="text-sm text-slate-500 font-normal">/ml</span></div>
                </div>
              </div>
            </div>

            {/* Cuvelage */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="bg-cyan-600 text-white p-6">
                <Home size={32} className="mb-3" />
                <h3 className="text-xl font-bold">Cuvelage</h3>
                <p className="text-cyan-100 text-sm mt-2">Pour caves et sous-sols</p>
              </div>
              <div className="p-6">
                <p className="text-slate-600 mb-4">
                  Étanchéification complète des parois enterrées. Revêtement époxy ou mortier hydrofuge 
                  qui résiste à la pression de l'eau.
                </p>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Préparation support</li>
                  <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Application multicouche</li>
                  <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Résiste à la pression</li>
                  <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Garantie décennale</li>
                </ul>
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <div className="text-2xl font-bold text-cyan-600">150-250€ <span className="text-sm text-slate-500 font-normal">/m²</span></div>
                </div>
              </div>
            </div>

            {/* VMI */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="bg-teal-600 text-white p-6">
                <Wind size={32} className="mb-3" />
                <h3 className="text-xl font-bold">VMI</h3>
                <p className="text-teal-100 text-sm mt-2">Pour condensation</p>
              </div>
              <div className="p-6">
                <p className="text-slate-600 mb-4">
                  Ventilation Mécanique par Insufflation. Insuffle de l'air filtré et préchauffé, 
                  créant une surpression qui évacue l'humidité.
                </p>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Installation simple</li>
                  <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Air filtré et préchauffé</li>
                  <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Idéal en rénovation</li>
                  <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Économies chauffage</li>
                </ul>
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <div className="text-2xl font-bold text-teal-600">2 500-5 000€ <span className="text-sm text-slate-500 font-normal">posée</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tarifs */}
      <section id="tarifs" className="py-16 bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-center mb-4">Tarifs clairs à {villeData.nom}</h2>
          <p className="text-slate-400 text-center mb-12">Déplacement inclus dans le rayon de {villeData.distance} depuis Toulouse</p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-800 rounded-2xl p-6 text-center">
              <h3 className="font-bold mb-2">Diagnostic Expert</h3>
              <div className="text-4xl font-extrabold text-cyan-400 mb-2">149€</div>
              <p className="text-slate-400 text-sm mb-4">Déductible des travaux</p>
              <ul className="text-sm text-slate-300 text-left space-y-2">
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> Visite sur site (1h30)</li>
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> Mesures humidité</li>
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> Rapport & préconisations</li>
              </ul>
            </div>
            <div className="bg-slate-800 rounded-2xl p-6 text-center border-2 border-cyan-500 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-500 text-white px-4 py-1 rounded-full text-xs font-bold">
                SOLUTION PRINCIPALE
              </div>
              <h3 className="font-bold mb-2">Injection Résine</h3>
              <div className="text-4xl font-extrabold text-cyan-400 mb-2">80-120€</div>
              <p className="text-slate-400 text-sm mb-4">/ml - Garantie 30 ans</p>
              <ul className="text-sm text-slate-300 text-left space-y-2">
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> Remontées capillaires</li>
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> Barrière hydrophobe</li>
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> Résultat durable</li>
              </ul>
            </div>
            <div className="bg-slate-800 rounded-2xl p-6 text-center">
              <h3 className="font-bold mb-2">Cuvelage / VMI</h3>
              <div className="text-4xl font-extrabold text-cyan-400 mb-2">150-250€</div>
              <p className="text-slate-400 text-sm mb-4">/m² ou 2 500-5 000€</p>
              <ul className="text-sm text-slate-300 text-left space-y-2">
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> Caves et sous-sols</li>
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> Condensation</li>
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> Étanchéité complète</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Spécificités locales */}
      <section id="contexte-local" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-6">
                L'humidité à {villeData.nom} : contexte local
              </h2>
              
              <div className="prose prose-lg text-slate-600">
                <p>
                  {villeData.nom} présente des conditions favorables aux problèmes d'humidité, 
                  notamment dans les constructions anciennes et les maisons sur sol argileux.
                </p>
                
                {villeData.geologie && (
                  <p>{villeData.geologie}</p>
                )}

                {villeData.typesConstruction && (
                  <div className="bg-blue-50 rounded-xl p-6 my-6 not-prose">
                    <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                      <Home size={20} className="text-blue-600" />
                      Constructions concernées
                    </h3>
                    <p className="text-slate-600 text-base">{villeData.typesConstruction}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              {/* Conseil expert humidité */}
              <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r-xl p-6">
                <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                  <Award size={20} />
                  Conseil expert humidité
                </h3>
                <p className="text-blue-800">
                  {villeData.specificitesHumidite || 
                    `À ${villeData.nom}, nous recommandons un diagnostic pour distinguer remontées capillaires et condensation. 
                    Le traitement est très différent et une erreur de diagnostic peut coûter cher.`}
                </p>
              </div>

              {/* Signes à surveiller */}
              <div className="bg-slate-100 rounded-xl p-6">
                <h3 className="font-bold text-slate-900 mb-4">Signes d'humidité à surveiller</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-slate-600">
                    <AlertTriangle size={18} className="text-blue-600 flex-shrink-0 mt-1" />
                    Salpêtre (poudre blanche) au pied des murs
                  </li>
                  <li className="flex items-start gap-3 text-slate-600">
                    <AlertTriangle size={18} className="text-blue-600 flex-shrink-0 mt-1" />
                    Peinture qui cloque ou s'écaille
                  </li>
                  <li className="flex items-start gap-3 text-slate-600">
                    <AlertTriangle size={18} className="text-blue-600 flex-shrink-0 mt-1" />
                    Moisissures noires récurrentes
                  </li>
                  <li className="flex items-start gap-3 text-slate-600">
                    <AlertTriangle size={18} className="text-blue-600 flex-shrink-0 mt-1" />
                    Odeur de moisi persistante
                  </li>
                  <li className="flex items-start gap-3 text-slate-600">
                    <AlertTriangle size={18} className="text-blue-600 flex-shrink-0 mt-1" />
                    Buée excessive sur les fenêtres
                  </li>
                </ul>
              </div>

              {/* Communes proches */}
              {villeData.communesProches && villeData.communesProches.length > 0 && (
                <div className="bg-white rounded-xl p-6 border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-4">Intervention dans les communes voisines</h3>
                  <div className="flex flex-wrap gap-2">
                    {villeData.communesProches.map((commune, i) => {
                      const communeSlug = commune.toLowerCase().replace(/[']/g, '').replace(/\s+/g, '-');
                      return (
                        <Link 
                          key={i} 
                          href={`/expert-humidite/${communeSlug}`}
                          className="bg-slate-100 hover:bg-blue-100 text-slate-700 hover:text-blue-700 px-4 py-2 rounded-full text-sm font-medium transition-colors"
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

      {/* FAQ */}
      <section id="faq" className="py-16 bg-slate-100">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-8 text-center">
            Questions fréquentes - Humidité à {villeData.nom}
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

      {/* Topic Cluster - Liens vers spokes humidité */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-8 text-center">
            Guides par type de problème d'humidité
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            <Link href="/remontees-capillaires-traitement" className="bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-xl p-4 transition-all group">
              <span className="text-2xl mb-2 block">💧</span>
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 text-sm">Remontées capillaires</h3>
              <p className="text-xs text-slate-500 mt-1">Traitement définitif</p>
            </Link>
            <Link href="/moisissures-maison-sante" className="bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-xl p-4 transition-all group">
              <span className="text-2xl mb-2 block">🦠</span>
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 text-sm">Moisissures</h3>
              <p className="text-xs text-slate-500 mt-1">Risques santé</p>
            </Link>
            <Link href="/cave-humide-solutions" className="bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-xl p-4 transition-all group">
              <span className="text-2xl mb-2 block">🏠</span>
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 text-sm">Cave humide</h3>
              <p className="text-xs text-slate-500 mt-1">Cuvelage & drainage</p>
            </Link>
            <Link href="/salpetre-mur-traitement" className="bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-xl p-4 transition-all group">
              <span className="text-2xl mb-2 block">🧂</span>
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 text-sm">Salpêtre</h3>
              <p className="text-xs text-slate-500 mt-1">Causes & solutions</p>
            </Link>
          </div>
          <div className="grid md:grid-cols-4 gap-4 mt-4">
            <Link href="/condensation-ou-infiltration" className="bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-xl p-4 transition-all group">
              <span className="text-2xl mb-2 block">❓</span>
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 text-sm">Condensation ou infiltration ?</h3>
              <p className="text-xs text-slate-500 mt-1">Comment distinguer</p>
            </Link>
            <Link href="/vmi-ventilation-insufflation" className="bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-xl p-4 transition-all group">
              <span className="text-2xl mb-2 block">💨</span>
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 text-sm">VMI</h3>
              <p className="text-xs text-slate-500 mt-1">Ventilation par insufflation</p>
            </Link>
            <Link href="/ponts-thermiques-condensation" className="bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-xl p-4 transition-all group">
              <span className="text-2xl mb-2 block">🌡️</span>
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 text-sm">Ponts thermiques</h3>
              <p className="text-xs text-slate-500 mt-1">Condensation localisée</p>
            </Link>
            <Link href="/merule-champignon-traitement" className="bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-xl p-4 transition-all group">
              <span className="text-2xl mb-2 block">🍄</span>
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 text-sm">Mérule</h3>
              <p className="text-xs text-slate-500 mt-1">Champignon destructeur</p>
            </Link>
          </div>
          <div className="mt-8 text-center">
            <Link href="/expert-humidite-toulouse-31" className="inline-flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700">
              Consultez notre guide complet Expert Humidité <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Avis Google */}
      <section id="avis" className="bg-white">
        <Testimonials />
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-blue-200 font-bold mb-3">💧 Problème d'humidité à {villeData.nom} ?</p>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            L'Humidité Ne Disparaît Jamais Seule
          </h2>
          <p className="text-xl text-blue-100 mb-6">
            Chaque mois qui passe dégrade vos murs, vos boiseries, et votre santé.<br />
            <strong className="text-white">Un diagnostic aujourd'hui peut vous éviter une facture x3 demain.</strong>
          </p>
          
          <div className="bg-white/10 rounded-xl p-4 mb-8 max-w-md mx-auto backdrop-blur-sm">
            <p className="text-sm">
              ✓ <strong>30 ans</strong> de garantie sur injection résine<br />
              ✓ <strong>95%</strong> d'efficacité prouvée<br />
              ✓ <strong>149€</strong> de diagnostic déductible des travaux
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/diagnostic" className="bg-white text-blue-600 px-10 py-5 rounded-xl font-bold text-lg hover:bg-blue-50 flex items-center justify-center gap-2 shadow-2xl transform hover:scale-105 transition-all">
              JE VEUX MON DIAGNOSTIC GRATUIT <ArrowRight size={20} />
            </Link>
            <a href="tel:0582953375" className="bg-blue-700 hover:bg-blue-800 px-8 py-5 rounded-xl font-bold text-lg flex items-center justify-center gap-2">
              <Phone size={20} /> 05 82 95 33 75
            </a>
          </div>
          <p className="text-sm text-blue-200 mt-4">Réponse garantie sous 24h · Déplacement gratuit sur {villeData.nom}</p>
        </div>
      </section>

      </main>
      
      {/* Maillage interne SEO - Autres villes */}
      <RelatedPagesLinks
        title={`Nos experts humidité dans votre région`}
        pages={[
          { href: '/expertise/humidite', label: 'Nos solutions humidité', description: 'Toutes nos méthodes' },
          { href: '/diagnostic', label: 'Diagnostic gratuit', description: 'Évaluez votre situation' },
          ...villeSlugs
            .filter(v => v !== ville)
            .slice(0, 8)
            .map(v => ({
              href: `/expert-humidite/${v}`,
              label: `Expert humidité ${villesData[v]?.nom || v}`,
            })),
        ]}
      />
      
      <Footer />
    </div>
  );
}
