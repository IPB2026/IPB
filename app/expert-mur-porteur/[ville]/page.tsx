import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { SmartBackBar } from "@/components/ui/SmartBackBar";
import { Footer } from '@/components/home/Footer';
import { Testimonials } from '@/components/home/Testimonials';
import { CheckCircle, Phone, ArrowRight, Shield, Clock, FileText, Hammer, Ruler, Award, AlertTriangle, Eye } from 'lucide-react';
import { villesData, type VilleInfo } from '@/app/data/villes';
import { VILLES_MUR_PORTEUR } from '@/app/data/villes-mur-porteur';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { IPB_AGGREGATE_RATING } from '@/lib/seo/localFAQ';

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
    title: `Ouverture Mur Porteur ${villeNom} ${deptCode} · IPN/HEB · Eurocodes`,
    description: `Mur porteur à ${villeNom} : étude IPN/HEB, pose poutre, travaux clé en main. Un seul interlocuteur, du devis à la livraison. Devis 24h. ☎ 05 82 95 33 75`,
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
      title: `Ouverture Mur Porteur ${villeNom} · IPB`,
      description: `Étude IPN/HEB, étaiement, ouverture, finitions à ${villeNom}. Un seul interlocuteur, du devis à la livraison. Devis 24h.`,
      url: `https://www.ipb-expertise.fr/expert-mur-porteur/${slug}`,
      type: 'website',
      images: [{ url: '/images/IPB_Logo_HD.png', width: 1200, height: 630, alt: `Ouverture mur porteur ${villeNom}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Ouverture Mur Porteur ${villeNom} | IPB`,
      description: `Étude structure + travaux. Un seul interlocuteur, du devis à la livraison. Devis 24h à ${villeNom}. ☎ 05 82 95 33 75`,
    },
    robots: { index: true, follow: true },
  };
}

export default async function ExpertMurPorteurVillePage({ params }: { params: Promise<{ ville: string }> }) {
  const { ville } = await params;
  const villeData: VilleInfo | undefined = villesData[ville];
  if (!villeData || !(VILLES_MUR_PORTEUR as readonly string[]).includes(ville)) notFound();

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
      "aggregateRating": IPB_AGGREGATE_RATING,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "54 avenue Jean Jaurès",
        "addressLocality": "Tournefeuille",
        "postalCode": "31170",
        "addressRegion": "Occitanie",
        "addressCountry": "FR"
      }
    },
    "description": `Ouverture de mur porteur à ${villeNom} : l'institut IPB conçoit l'étude de structure et dimensionne la poutre IPN/HEB ; nos équipes de réalisation exécutent étaiement, pose et finitions sous garantie décennale 10 ans. Un seul interlocuteur, du diagnostic à la livraison.`,
    "offers": { "@type": "Offer", "priceRange": "4000-15000 EUR", "priceCurrency": "EUR" },
    "aggregateRating": IPB_AGGREGATE_RATING
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Quel est le prix d'une ouverture de mur porteur à ${villeNom} ?`,
        "acceptedAnswer": { "@type": "Answer", "text": `À ${villeNom}, le prix dépend de plusieurs paramètres concrets : la portée de l'ouverture, le type de mur (brique foraine, parpaing, pierre), ce qui se trouve au-dessus (combles, étage habité) et la complexité des finitions. Plutôt qu'une fourchette générique, utilisez notre calculateur en ligne basé sur des chantiers récents du réseau IPB — 4 questions, 2 minutes, fourchette précise par email. Devis remis sous 3 à 5 jours après visite gratuite, un seul interlocuteur du diagnostic à la livraison.` }
      },
      {
        "@type": "Question",
        "name": `Comment savoir si un mur est porteur à ${villeNom} ?`,
        "acceptedAnswer": { "@type": "Answer", "text": `Quatre indices fiables : épaisseur supérieure à 15 cm (souvent 20-25 cm pour la brique foraine toulousaine), son sourd au choc (vs. son creux pour une cloison placo), présence sur les plans d'origine, alignement vertical d'un étage à l'autre. Seul un diagnostic technique sur site peut confirmer formellement le caractère porteur. À ${villeNom}, ce diagnostic est compris dans notre prestation.` }
      },
      {
        "@type": "Question",
        "name": `Combien de temps prennent les travaux à ${villeNom} ?`,
        "acceptedAnswer": { "@type": "Answer", "text": "L'intervention chantier dure 2 à 5 jours. La phase préparatoire (étude structure, démarches en mairie, commande poutre IPN/HEB) prend 3 à 6 semaines. Notre institut coordonne l'ensemble." }
      },
      {
        "@type": "Question",
        "name": `Faut-il un permis pour ouvrir un mur porteur à ${villeNom} ?`,
        "acceptedAnswer": { "@type": "Answer", "text": `Pour une maison individuelle à ${villeNom}, une déclaration préalable de travaux suffit dans la majorité des cas. Si l'ouverture modifie la façade (création de baie vitrée), c'est obligatoire. En copropriété, vous devez obtenir l'accord en assemblée générale (procès-verbal d'AG). Notre institut prépare le dossier technique pour vous.` }
      },
      {
        "@type": "Question",
        "name": `Quelle poutre pour ouvrir un mur porteur ?`,
        "acceptedAnswer": { "@type": "Answer", "text": "Le choix dépend de la portée et des charges reprises. IPN (profil en I) pour les portées courtes (≤2,5 m). HEB (profil en H, plus rigide) pour les grandes portées (>3 m) et les charges importantes (étages au-dessus). IPE pour les configurations intermédiaires. La poutre est calculée pour reprendre les charges identifiées (poids, déformation admissible) selon les Eurocodes, et la note de calcul est signée sous note de calcul signée par un bureau d'études." }
      },
      {
        "@type": "Question",
        "name": `IPB intervient-il sur tout type de bâtiment à ${villeNom} ?`,
        "acceptedAnswer": { "@type": "Answer", "text": `Oui : maisons individuelles, appartements en copropriété (avec procès-verbal d'AG), immeubles haussmanniens des centres anciens de ${villeNom}, lofts, locaux commerciaux. Notre institut s'adapte à la nature des planchers et à l'âge du bâti.` }
      }
    ]
  };

  return (
    <div className="font-sans text-ipb-text bg-ipb-cream antialiased">
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
      <SmartBackBar />
      <main id="main-content">
        {/* HERO */}
        <section className="relative bg-ipb-navy text-white overflow-hidden py-16 md:py-24">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-orange-950/60"></div>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-ipb-orange/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-ipb-orange-l font-semibold text-xs uppercase tracking-[0.2em] mb-4">
                  Les spécialistes de la structure de votre habitat
                </p>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
                  Ouverture <span className="text-transparent bg-clip-text bg-ipb-orange">Mur Porteur</span>
                  <span className="block text-3xl md:text-4xl mt-2 text-white">à {villeNom} ({deptCode})</span>
                </h1>

                <p className="text-xl text-white/70 mb-6 leading-relaxed">
                  <strong className="text-white">L'institut qui conçoit et coordonne votre ouverture de mur porteur</strong> à {villeNom}. Étude de structure, dimensionnement IPN/HEB, démarches administratives ; étaiement, pose et finitions par les équipes du réseau IPB sous décennale. <strong className="text-ipb-orange-l">Un seul interlocuteur, du premier appel à la livraison.</strong>
                </p>

                {/* Encadré confiance — estimation en ligne */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-8 border border-white/20">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <p className="text-sm text-ipb-light">Estimation personnalisée à {villeNom}</p>
                      <p className="text-2xl font-bold text-white">Calculateur · 2 min</p>
                    </div>
                    <div className="bg-ipb-orange/20 px-3 py-2 rounded-lg">
                      <p className="text-ipb-orange-l font-bold text-sm">Accompagnement</p>
                      <p className="text-ipb-orange-l font-bold text-lg">IPB inclus</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <Link href="/diagnostic" className="bg-ipb-orange hover:bg-[#b35519] text-white px-8 py-5 rounded-xl font-bold text-lg shadow-xl flex items-center justify-center gap-2">
                    Diagnostic gratuit · 2 min <ArrowRight size={20} />
                  </Link>
                  <a href="tel:0582953375" className="bg-white/10 backdrop-blur border border-white/20 text-white px-8 py-5 rounded-xl font-bold text-lg hover:bg-white/20 flex items-center justify-center gap-2">
                    <Phone size={20} /> 05 82 95 33 75
                  </a>
                </div>

                <div className="flex items-center gap-4 text-sm text-ipb-light">
                  <span className="flex items-center gap-1"><Clock size={14} /> Réponse 24h</span>
                  <span className="flex items-center gap-1"><Shield size={14} className="text-blue-400" /> Du devis à la livraison</span>
                  <span className="flex items-center gap-1"><CheckCircle size={14} className="text-green-400" /> Sans engagement</span>
                </div>
              </div>

              {/* Trust box */}
              <div className="hidden lg:block">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-6">
                  <h2 className="text-xl font-bold mb-6 text-center">Pourquoi IPB à {villeNom} ?</h2>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-ipb-orange/20 rounded-xl flex items-center justify-center">
                        <Ruler className="text-ipb-orange-l" size={24} />
                      </div>
                      <div>
                        <p className="font-bold text-white">Calcul selon les Eurocodes</p>
                        <p className="text-sm text-ipb-light">La poutre est dimensionnée selon les normes en vigueur, sous note de calcul signée par un bureau d'études</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                        <Shield className="text-blue-400" size={24} />
                      </div>
                      <div>
                        <p className="font-bold text-white">Travaux sous décennale 10 ans</p>
                        <p className="text-sm text-ipb-light">Étaiement, ouverture, pose et finitions exécutés par les équipes du réseau IPB sous garantie décennale. Attestations remises avec le devis.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
                        <Award className="text-amber-400" size={24} />
                      </div>
                      <div>
                        <p className="font-bold text-white">850+ chantiers · réseau IPB</p>
                        <p className="text-sm text-ipb-light">Menés en Occitanie — {villeNom} et communes alentour</p>
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
              <div className="inline-flex items-center gap-2 bg-ipb-stone text-ipb-orange px-4 py-2 rounded-full text-sm font-bold mb-4">
                <Eye size={16} /> Spécificités du bâti à {villeNom}
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-ipb-text mb-4">
                Ouvrir un mur porteur à {villeNom} : ce qu'il faut savoir
              </h2>
            </div>

            <div className="prose prose-slate max-w-none text-ipb-text">
              <p className="text-lg leading-relaxed">
                {villeData.description}
              </p>
              {villeData.typesConstruction && (
                <p>
                  <strong className="text-ipb-text">Bâti dominant :</strong> {villeData.typesConstruction}
                </p>
              )}
              <p>
                Cette spécificité du bâti {villeNom.toLowerCase()} impose une <strong>étude structure rigoureuse</strong> avant toute ouverture : la nature des planchers (bois, hourdis, voûtains), l'âge du gros œuvre et les charges reprises conditionnent le choix de la poutre (IPN, HEB ou IPE) et la méthode d'étaiement.
              </p>
            </div>

            <div className="mt-10 bg-ipb-stone border-l-4 border-ipb-orange rounded-r-xl p-6">
              <p className="font-bold text-orange-900 mb-1">⚠️ La règle d'or à {villeNom}</p>
              <p className="text-orange-800">
                Ne jamais commander de travaux sans <strong>un calcul de la poutre écrit et signé par un ingénieur</strong>. Une poutre trop fine et c'est la garantie de fissures, d'un affaissement du plancher, voire d'un effondrement partiel. Les artisans généralistes n'ont pas les compétences pour ce calcul.
              </p>
            </div>
          </div>
        </section>

        {/* Processus 4 étapes */}
        <section className="py-16 bg-ipb-cream">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-ipb-text mb-4">
                Notre processus à {villeNom} — 4 étapes
              </h2>
              <p className="text-lg text-ipb-muted max-w-3xl mx-auto">
                De l'étude à la livraison, un seul interlocuteur pour vous accompagner.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                { num: 1, icon: <FileText size={24} className="text-ipb-orange" />, title: 'Étude technique', detail: 'Visite sur site, observation du mur. La poutre est dimensionnée selon les Eurocodes, sous note de calcul signée par un bureau d'études.' },
                { num: 2, icon: <Ruler size={24} className="text-ipb-orange" />, title: 'Démarches', detail: 'IPB s\'occupe des papiers en mairie. Si copropriété : préparation du dossier pour l\'assemblée générale.' },
                { num: 3, icon: <Hammer size={24} className="text-ipb-orange" />, title: 'Travaux 2 à 5 jours', detail: 'Étais installés, mur découpé, poutre posée et finitions assurées sous garantie décennale 10 ans.' },
                { num: 4, icon: <Shield size={24} className="text-ipb-orange" />, title: 'Livraison', detail: 'Contrôle final, retrait des étais. IPB vous remet tous les documents du chantier et les attestations de garantie décennale.' },
              ].map(({ num, icon, title, detail }) => (
                <div key={num} className="bg-white rounded-2xl p-6 shadow-lg border border-ipb-rule text-center">
                  <div className="w-14 h-14 bg-ipb-stone rounded-full flex items-center justify-center mx-auto mb-4">{icon}</div>
                  <div className="text-xs font-bold text-ipb-orange uppercase tracking-wider mb-1">Étape {num}</div>
                  <h3 className="text-lg font-bold text-ipb-text mb-2">{title}</h3>
                  <p className="text-sm text-ipb-muted">{detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Facteurs de prix — sans fourchettes brutes, redirection calculateur */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-extrabold text-ipb-text mb-4">
                Ce qui fait varier le prix de votre projet à {villeNom}
              </h2>
              <p className="text-lg text-ipb-muted max-w-3xl mx-auto">
                Quatre paramètres concrets, identifiés sur nos chantiers récents en Occitanie.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { titre: "La portée de l'ouverture", desc: "Au-delà de 3 m, on passe d'un IPN classique à un HEB plus lourd. Le profil retenu impacte directement le coût." },
                { titre: 'La nature du mur', desc: 'Brique foraine, parpaing armé, pierre, béton banché — chaque matériau demande son propre effort de découpe et de scellement.' },
                { titre: "Ce qui se trouve au-dessus", desc: "Un étage habité, des combles ou deux étages exigent un étaiement et un dimensionnement renforcés." },
                { titre: 'Les finitions demandées', desc: 'Ragréage, jonctions plâtre, peinture, repose des plinthes — chiffrés séparément et toujours détaillés au devis.' },
              ].map((p) => (
                <div key={p.titre} className="bg-ipb-cream border border-ipb-rule rounded-2xl p-6">
                  <h3 className="font-bold text-ipb-text text-lg mb-2">{p.titre}</h3>
                  <p className="text-sm text-ipb-muted leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href={`/calcul-prix-mur-porteur?utm_source=site&utm_medium=ville&utm_campaign=mur_porteur_${ville}`} className="inline-flex items-center gap-2 bg-ipb-orange hover:bg-[#b35519] text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl transition-colors">
                Estimer mon projet en 2 min <ArrowRight size={20} />
              </Link>
              <Link href="/diagnostic" className="inline-flex items-center gap-2 bg-ipb-navy text-white border border-ipb-navy hover:bg-[#1a2d40] px-8 py-4 rounded-xl font-bold text-lg transition-colors">
                Devis détaillé sous 24h
              </Link>
            </div>
            <p className="mt-4 text-center text-sm text-ipb-muted">
              <strong className="text-ipb-text">Calcul instantané</strong> basé sur la portée, le type de mur et la configuration. Recevez l'estimation par email.
            </p>
          </div>
        </section>

        {/* Bandeau calculateur — capture de leads chauds */}
        <section className="bg-ipb-navy text-white py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-5 sm:px-6 text-center">
            <p className="text-ipb-orange-l text-[11px] uppercase tracking-[0.18em] font-medium mb-4">
              Estimation gratuite
            </p>
            <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-extrabold mb-4 leading-tight">
              Combien va vous coûter votre ouverture à {villeNom} ?
            </h2>
            <p className="text-white/70 text-sm md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              Notre calculateur, basé sur les chantiers IPB récents, vous donne une fourchette précise en 2 minutes. Vous recevez le détail par email — sans engagement.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Link
                href={`/calcul-prix-mur-porteur?utm_source=site&utm_medium=ville_banner&utm_campaign=mur_porteur_${ville}`}
                className="inline-flex items-center justify-center gap-2 bg-ipb-orange text-white font-bold px-7 md:px-8 py-4 rounded-xl text-base md:text-lg hover:bg-[#b35519] transition-colors min-h-[48px]"
              >
                Lancer le calcul → 2 min
              </Link>
              <a href="tel:0582953375" className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white font-bold px-7 md:px-8 py-4 rounded-xl text-base md:text-lg hover:bg-white/20 transition-colors min-h-[48px]">
                <Phone size={20} /> 05 82 95 33 75
              </a>
            </div>
          </div>
        </section>

        {/* Avis */}
        <section className="bg-white"><Testimonials /></section>

        {/* Lien interne expertise mère */}
        <section className="py-12 bg-ipb-cream border-t border-ipb-rule">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-ipb-muted mb-4">Pour aller plus loin :</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/expertise/mur-porteur" className="text-ipb-orange font-semibold hover:text-ipb-orange">→ Notre expertise mur porteur</Link>
              <span className="text-ipb-muted">·</span>
              <Link href="/calcul-prix-mur-porteur" className="text-ipb-orange font-semibold hover:text-ipb-orange">→ Calculateur prix express</Link>
              <span className="text-ipb-muted">·</span>
              <Link href="/blog/prix-ouverture-mur-porteur-toulouse-2026" className="text-ipb-orange font-semibold hover:text-ipb-orange">→ Guide tarifs 2026</Link>
              <span className="text-ipb-muted">·</span>
              <Link href="/partenaires/architectes-interieur" className="text-ipb-orange font-semibold hover:text-ipb-orange">→ Partenariat architectes</Link>
              <span className="text-ipb-muted">·</span>
              <Link href="/bureau-etude-structure-toulouse" className="text-ipb-orange font-semibold hover:text-ipb-orange">→ Bureau d'études structure</Link>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-16 md:py-20 bg-ipb-orange text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-white text-3xl md:text-4xl font-extrabold mb-6">Votre projet à {villeNom}, notre expertise</h2>
            <p className="text-xl text-ipb-orange-l mb-8">Décrivez votre projet à notre institut. Réponse de notre équipe sous 48 heures.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/diagnostic" className="bg-white text-ipb-orange px-10 py-5 rounded-xl font-bold text-lg hover:bg-ipb-stone flex items-center justify-center gap-2 shadow-xl">
                Diagnostic gratuit · 2 min <ArrowRight size={20} />
              </Link>
              <a href="tel:0582953375" className="bg-orange-700 hover:bg-orange-800 px-8 py-5 rounded-xl font-bold text-lg flex items-center justify-center gap-2">
                <Phone size={20} /> 05 82 95 33 75
              </a>
            </div>
            <p className="text-sm text-ipb-orange-l mt-6">✓ Un seul interlocuteur · ✓ Sans engagement · ✓ Réponse 24h</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
