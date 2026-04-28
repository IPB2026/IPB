import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { BackButton } from '@/components/ui/BackButton';
import { Footer } from '@/components/home/Footer';
import { Testimonials } from '@/components/home/Testimonials';
import { CheckCircle, Phone, ArrowRight, Shield, Clock, FileText, Hammer, Ruler, Award, AlertTriangle, Eye } from 'lucide-react';
import { villesData, type VilleInfo } from '@/app/data/villes';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';

const VILLES_MUR_PORTEUR = ['toulouse', 'montauban', 'auch', 'albi'];

export async function generateStaticParams() {
  return VILLES_MUR_PORTEUR.map((ville) => ({ ville }));
}

export async function generateMetadata({ params }: { params: Promise<{ ville: string }> }): Promise<Metadata> {
  const { ville } = await params;
  const villeData = villesData[ville];
  if (!villeData) return { title: 'Ouverture Mur Porteur | IPB Expertise' };

  const deptCode = villeData.codePostal.slice(0, 2);
  const villeNom = villeData.nom;
  const slug = ville;

  return {
    title: `Ouverture Mur Porteur ${villeNom} (${deptCode}) — Étude IPN/HEB + Travaux | IPB`,
    description: `Ouverture de mur porteur à ${villeNom} : bureau d'études structure intégré, dimensionnement IPN/HEB, pose. Création de baie vitrée sur projet de façade. Devis gratuit sous 24h. Décennale AXA. ☎ 05 82 95 33 75`,
    keywords: [
      `ouverture mur porteur ${slug}`,
      `prix ouverture mur porteur ${slug}`,
      `entreprise IPN ${villeData.departement.toLowerCase()}`,
      `bureau études structure ${slug}`,
      `création baie vitrée ${slug}`,
      `abattre mur porteur ${slug}`,
      `mur porteur prix ${slug}`,
      `pose poutre IPN ${slug}`,
      `étude structure ${slug}`,
      `agrandissement maison ${slug}`,
      `cuisine ouverte ${slug}`,
    ],
    alternates: { canonical: `https://www.ipb-expertise.fr/expert-mur-porteur/${slug}` },
    openGraph: {
      title: `Ouverture Mur Porteur ${villeNom} (${deptCode}) | IPB`,
      description: `Bureau d'études + travaux : étude IPN/HEB, étaiement, ouverture, finitions. Décennale AXA. Intervention sous 48h à ${villeNom}.`,
      url: `https://www.ipb-expertise.fr/expert-mur-porteur/${slug}`,
      type: 'website',
      images: [{ url: '/images/IPB_Logo_HD.png', width: 1200, height: 630, alt: `Ouverture mur porteur ${villeNom}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Ouverture Mur Porteur ${villeNom} | IPB`,
      description: `Étude structure + travaux. Décennale AXA. Devis 24h à ${villeNom}. ☎ 05 82 95 33 75`,
    },
    robots: { index: true, follow: true },
  };
}

export default async function ExpertMurPorteurVillePage({ params }: { params: Promise<{ ville: string }> }) {
  const { ville } = await params;
  const villeData: VilleInfo | undefined = villesData[ville];
  if (!villeData || !VILLES_MUR_PORTEUR.includes(ville)) notFound();

  const deptCode = villeData.codePostal.slice(0, 2);
  const villeNom = villeData.nom;

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": `Ouverture de mur porteur à ${villeNom}`,
    "areaServed": { "@type": "City", "name": villeNom, "addressRegion": villeData.departement },
    "provider": {
      "@type": "LocalBusiness",
      "name": "IPB - Institut de Pathologie du Bâtiment",
      "telephone": "+33582953375",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "13 rue du Recteur Dottin",
        "addressLocality": "Toulouse",
        "postalCode": "31100",
        "addressRegion": "Occitanie",
        "addressCountry": "FR"
      }
    },
    "description": `Bureau d'études structure intégré à ${villeNom}. Étude, dimensionnement IPN/HEB, pose et finitions. Décennale AXA.`,
    "offers": { "@type": "Offer", "priceRange": "4000-15000 EUR", "priceCurrency": "EUR" }
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Quel est le prix d'une ouverture de mur porteur à ${villeNom} ?`,
        "acceptedAnswer": { "@type": "Answer", "text": `À ${villeNom}, comptez 4 000 à 10 000 € TTC pour une ouverture standard de 2,5 m (étude structure + étaiement + pose poutre + finitions). Pour une grande baie vitrée (>3 m), le budget monte à 10 000 - 20 000 €. Notre devis est gratuit et établi sous 24h après visite.` }
      },
      {
        "@type": "Question",
        "name": `Combien de temps prennent les travaux à ${villeNom} ?`,
        "acceptedAnswer": { "@type": "Answer", "text": "L'intervention chantier dure 2 à 5 jours. La phase préparatoire (étude structure, démarches en mairie, commande poutre IPN/HEB) prend 3 à 6 semaines. Notre cabinet coordonne l'ensemble." }
      },
      {
        "@type": "Question",
        "name": `IPB intervient-il sur tout type de bâtiment à ${villeNom} ?`,
        "acceptedAnswer": { "@type": "Answer", "text": `Oui : maisons individuelles, appartements en copropriété (avec procès-verbal d'AG), immeubles haussmanniens des centres anciens de ${villeNom}, lofts, locaux commerciaux. Notre ingénieur s'adapte à la nature des planchers et à l'âge du bâti.` }
      }
    ]
  };

  return (
    <div className="font-sans text-slate-800 bg-slate-50 antialiased">
      <Script id="service-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <Script id="faq-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <BreadcrumbSchema
        items={[
          { name: 'Ouverture Mur Porteur', href: '/expertise/mur-porteur' },
          { name: villeNom, href: `/expert-mur-porteur/${ville}` },
        ]}
        showVisual={false}
      />

      <TopBar />
      <Navbar />
      <main id="main-content">
        {/* Bandeau retour discret éditorial */}
        <div className="bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <BackButton href="/expertise/mur-porteur" label="Retour à l'expertise mur porteur" />
          </div>
        </div>

        {/* HERO */}
        <section className="relative bg-slate-900 text-white overflow-hidden py-16 md:py-24">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-orange-950/60"></div>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-orange-300 font-semibold text-xs uppercase tracking-[0.2em] mb-4">
                  Les spécialistes de la structure de votre habitat
                </p>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
                  Ouverture <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">Mur Porteur</span>
                  <span className="block text-3xl md:text-4xl mt-2 text-white">à {villeNom} ({deptCode})</span>
                </h1>

                <p className="text-xl text-slate-300 mb-6 leading-relaxed">
                  <strong className="text-white">Bureau d'études structure intégré</strong> à {villeNom}. Notre ingénieur dimensionne la poutre IPN/HEB, nos équipes l'installent. <strong className="text-orange-300">Garantie décennale AXA sur l'ensemble.</strong>
                </p>

                {/* Prix indicatif */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-8 border border-white/20">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <p className="text-sm text-slate-400">Ouverture standard 2,5 m à {villeNom}</p>
                      <p className="text-2xl font-bold text-white">4 000 € – 10 000 € TTC</p>
                    </div>
                    <div className="bg-orange-500/20 px-3 py-2 rounded-lg">
                      <p className="text-orange-400 font-bold text-sm">Garantie</p>
                      <p className="text-orange-400 font-bold text-lg">10 ans AXA</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <Link href="/diagnostic" className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white px-8 py-5 rounded-xl font-bold text-lg shadow-xl flex items-center justify-center gap-2">
                    Devis gratuit sous 24h <ArrowRight size={20} />
                  </Link>
                  <a href="tel:0582953375" className="bg-white/10 backdrop-blur border border-white/20 text-white px-8 py-5 rounded-xl font-bold text-lg hover:bg-white/20 flex items-center justify-center gap-2">
                    <Phone size={20} /> 05 82 95 33 75
                  </a>
                </div>

                <div className="flex items-center gap-4 text-sm text-slate-400">
                  <span className="flex items-center gap-1"><Clock size={14} /> Réponse 24h</span>
                  <span className="flex items-center gap-1"><Shield size={14} className="text-blue-400" /> Décennale AXA</span>
                  <span className="flex items-center gap-1"><CheckCircle size={14} className="text-green-400" /> Sans engagement</span>
                </div>
              </div>

              {/* Trust box */}
              <div className="hidden lg:block">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-6">
                  <h2 className="text-xl font-bold mb-6 text-center">Pourquoi IPB à {villeNom} ?</h2>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                        <Ruler className="text-orange-400" size={24} />
                      </div>
                      <div>
                        <p className="font-bold text-white">Calcul technique en interne</p>
                        <p className="text-sm text-slate-400">Le dimensionnement de la poutre est signé par notre ingénieur</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                        <Shield className="text-blue-400" size={24} />
                      </div>
                      <div>
                        <p className="font-bold text-white">Décennale AXA — étude + travaux</p>
                        <p className="text-sm text-slate-400">Attestation remise avec le devis</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
                        <Award className="text-amber-400" size={24} />
                      </div>
                      <div>
                        <p className="font-bold text-white">850+ chantiers en Occitanie</p>
                        <p className="text-sm text-slate-400">{villeNom} et communes alentour</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Spécificités locales */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
                <Eye size={16} /> Spécificités du bâti à {villeNom}
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                Ouvrir un mur porteur à {villeNom} : ce qu'il faut savoir
              </h2>
            </div>

            <div className="prose prose-slate max-w-none text-slate-700">
              <p className="text-lg leading-relaxed">
                {villeData.description}
              </p>
              {villeData.typesConstruction && (
                <p>
                  <strong className="text-slate-900">Bâti dominant :</strong> {villeData.typesConstruction}
                </p>
              )}
              <p>
                Cette spécificité du bâti {villeNom.toLowerCase()} impose une <strong>étude structure rigoureuse</strong> avant toute ouverture : la nature des planchers (bois, hourdis, voûtains), l'âge du gros œuvre et les charges reprises conditionnent le choix de la poutre (IPN, HEB ou IPE) et la méthode d'étaiement.
              </p>
            </div>

            <div className="mt-10 bg-orange-50 border-l-4 border-orange-500 rounded-r-xl p-6">
              <p className="font-bold text-orange-900 mb-1">⚠️ La règle d'or à {villeNom}</p>
              <p className="text-orange-800">
                Ne jamais commander de travaux sans <strong>un calcul de la poutre écrit et signé par un ingénieur</strong>. Une poutre trop fine et c'est la garantie de fissures, d'un affaissement du plancher, voire d'un effondrement partiel. Les artisans généralistes n'ont pas les compétences pour ce calcul.
              </p>
            </div>
          </div>
        </section>

        {/* Processus 4 étapes */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                Notre processus à {villeNom} — 4 étapes
              </h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                De l'étude à la livraison, un seul interlocuteur, une seule responsabilité.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                { num: 1, icon: <FileText size={24} className="text-orange-600" />, title: 'Étude technique', detail: 'On vient sur place, on regarde le mur, on calcule la poutre. Calcul signé par notre ingénieur.' },
                { num: 2, icon: <Ruler size={24} className="text-orange-600" />, title: 'Démarches', detail: 'On s\'occupe des papiers en mairie. Si copropriété : on prépare le dossier pour l\'assemblée générale.' },
                { num: 3, icon: <Hammer size={24} className="text-orange-600" />, title: 'Travaux 2 à 5 jours', detail: 'On installe les étais, on découpe le mur, on pose la poutre, on fait les finitions.' },
                { num: 4, icon: <Shield size={24} className="text-orange-600" />, title: 'Livraison', detail: 'Contrôle final, retrait des étais. On vous remet tous les documents du chantier et l\'attestation de garantie 10 ans.' },
              ].map(({ num, icon, title, detail }) => (
                <div key={num} className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 text-center">
                  <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">{icon}</div>
                  <div className="text-xs font-bold text-orange-500 uppercase tracking-wider mb-1">Étape {num}</div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
                  <p className="text-sm text-slate-600">{detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Prix tableau */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                Prix d'une ouverture de mur porteur à {villeNom}
              </h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Fourchettes constatées sur nos chantiers récents à {villeNom} et communes alentour.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { titre: `Petite ouverture (≤ 1,5 m)`, prix: '2 500 – 5 000 €', ex: 'Passage cuisine ↔ salon' },
                { titre: `Ouverture standard (1,5 – 3 m)`, prix: '5 000 – 10 000 €', ex: 'Cuisine ouverte sur séjour' },
                { titre: `Grande baie (> 3 m)`, prix: '10 000 – 20 000 €', ex: 'Baie vitrée jardin / terrasse' },
              ].map(({ titre, prix, ex }) => (
                <div key={titre} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center">
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-2">{titre}</p>
                  <p className="text-2xl font-extrabold text-orange-600 mb-1">{prix}</p>
                  <p className="text-xs text-slate-500">{ex}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link href="/diagnostic" className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white px-8 py-4 rounded-xl font-bold text-lg">
                Devis gratuit pour {villeNom} <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </section>

        {/* Avis */}
        <section className="bg-white"><Testimonials /></section>

        {/* Lien interne expertise mère */}
        <section className="py-12 bg-slate-50 border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-slate-600 mb-4">Pour aller plus loin :</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/expertise/mur-porteur" className="text-orange-600 font-semibold hover:text-orange-700">→ Notre expertise mur porteur</Link>
              <span className="text-slate-300">·</span>
              <Link href="/partenaires/architectes-interieur" className="text-orange-600 font-semibold hover:text-orange-700">→ Partenariat architectes d'intérieur</Link>
              <span className="text-slate-300">·</span>
              <Link href="/bureau-etude-structure-toulouse" className="text-orange-600 font-semibold hover:text-orange-700">→ Bureau d'études structure</Link>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-16 md:py-20 bg-gradient-to-r from-orange-600 to-amber-600 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Votre projet à {villeNom}, notre expertise</h2>
            <p className="text-xl text-orange-100 mb-8">Décrivez votre projet à notre cabinet. Réponse d'un ingénieur structure sous 24 heures.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/diagnostic" className="bg-white text-orange-600 px-10 py-5 rounded-xl font-bold text-lg hover:bg-orange-50 flex items-center justify-center gap-2 shadow-xl">
                Lancer mon devis gratuit <ArrowRight size={20} />
              </Link>
              <a href="tel:0582953375" className="bg-orange-700 hover:bg-orange-800 px-8 py-5 rounded-xl font-bold text-lg flex items-center justify-center gap-2">
                <Phone size={20} /> 05 82 95 33 75
              </a>
            </div>
            <p className="text-sm text-orange-200 mt-6">✓ Décennale AXA · ✓ Sans engagement · ✓ Réponse 24h</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
