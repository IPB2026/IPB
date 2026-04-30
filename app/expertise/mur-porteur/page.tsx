import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { SmartBackBar } from "@/components/ui/SmartBackBar";
import { Footer } from '@/components/home/Footer';
import { CtaFinal } from '@/components/home/CtaFinal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import Image from 'next/image';
import Script from 'next/script';
import type { Metadata } from 'next';
import { MurPorteurDiagram } from '@/components/ui/MurPorteurDiagram';

export const metadata: Metadata = {
  title: "Ouverture Mur Porteur Toulouse · IPN/HEB · AXA",
  description: "Ouverture mur porteur Toulouse : étude IPN/HEB, dimensionnement poutre, travaux clé en main. Décennale AXA. Devis sous 24h. ☎ 05 82 95 33 75",
  keywords: [
    'ouverture mur porteur toulouse',
    'création baie vitrée toulouse',
    'mur porteur prix toulouse',
    'étude structure mur porteur',
    'calcul poutre IPN HEB',
    'bureau études structure toulouse',
    'agrandissement baie vitrée',
    'abattre mur porteur toulouse',
    'expert structure bâtiment',
    'mur porteur copropriété',
  ],
  alternates: { canonical: 'https://www.ipb-expertise.fr/expertise/mur-porteur' },
  openGraph: {
    title: 'Ouverture Mur Porteur Toulouse · IPB',
    description: "Étude IPN/HEB, dimensionnement poutre, travaux clé en main. Décennale AXA. Devis sous 24h.",
    url: 'https://www.ipb-expertise.fr/expertise/mur-porteur',
    siteName: 'IPB - Institut de Pathologie du Bâtiment',
    locale: 'fr_FR',
    type: 'website',
    images: [{ url: '/images/baie-coulissante-apres.webp', width: 1200, height: 630, alt: 'Baie coulissante installée après ouverture de mur porteur — chantier IPB' }],
  },
};

const faqMurPorteur = [
  {
    question: "Comment savoir si mon mur est porteur ?",
    answer: "Un mur porteur supporte des charges venues du plancher du dessus ou de la toiture. Les indices visuels sont peu fiables. Notre institut identifie le caractère porteur d'un mur lors d'une visite technique : observation du sens des solives, recherche des chaînages, sondage si nécessaire. Sans cette vérification, ne touchez à aucun mur.",
  },
  {
    question: "Combien coûte une ouverture de mur porteur à Toulouse ?",
    answer: "À Toulouse, comptez 4 000 à 10 000 € TTC pour une ouverture standard de 2,5 m, finitions comprises. Pour une grande baie vitrée (au-delà de 3 m), le budget se situe entre 10 000 et 20 000 €. Le devis ferme est remis sous 7 jours après visite.",
  },
  {
    question: "Faut-il un permis de construire pour ouvrir un mur porteur ?",
    answer: "Pour une ouverture intérieure (entre deux pièces), une déclaration préalable suffit dans la plupart des cas. Pour une création de baie vitrée modifiant la façade, un permis de construire peut être nécessaire selon la commune et la surface créée. Notre institut vous accompagne dans les démarches.",
  },
  {
    question: "Combien de temps prennent les travaux ?",
    answer: "L'intervention sur site dure 2 à 5 jours selon la portée et la complexité du mur. La phase préparatoire (étude technique, démarches administratives, commande de la poutre) prend 3 à 6 semaines en amont. Le calendrier complet est validé avec vous avant le démarrage.",
  },
  {
    question: "IPB peut-il intervenir en copropriété ?",
    answer: "Oui. Nous préparons le dossier technique pour le vote en assemblée générale (calcul, plans, attestations). Notre garantie décennale et nos rapports rassurent généralement les copropriétaires et le syndic. La démarche prend 2 à 4 mois selon le calendrier des AG.",
  },
  {
    question: "IPN, HEB ou IPE : quelle poutre choisir ?",
    answer: "Le choix dépend de la portée, des charges à reprendre et de l'épaisseur du mur. Notre ingénieur dimensionne la poutre selon les normes en vigueur (Eurocode). Un sous-dimensionnement entraîne fissures, affaissement de plancher, voire rupture. Ce calcul n'est jamais à la charge d'un artisan généraliste.",
  },
];

const generateFaqJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqMurPorteur.map((item) => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": { "@type": "Answer", "text": item.answer }
  }))
});

const generateServiceJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Ouverture de mur porteur",
  "provider": {
    "@type": "LocalBusiness",
    "name": "IPB - Institut de Pathologie du Bâtiment",
    "telephone": "+33582953375",
    "address": { "@type": "PostalAddress", "streetAddress": "54 avenue Jean Jaurès", "addressLocality": "Tournefeuille", "postalCode": "31170", "addressRegion": "Occitanie", "addressCountry": "FR" }
  },
  "areaServed": [{ "@type": "AdministrativeArea", "name": "Haute-Garonne (31)" }, { "@type": "AdministrativeArea", "name": "Tarn-et-Garonne (82)" }, { "@type": "AdministrativeArea", "name": "Gers (32)" }, { "@type": "AdministrativeArea", "name": "Tarn (81)" }],
  "description": "Étude de structure, dimensionnement de poutre IPN/HEB, ouverture de mur porteur et création de baie vitrée. Décennale AXA."
});

const typesProjets = [
  {
    titre: 'Cuisine ouverte sur séjour',
    desc: 'Le projet le plus fréquent. Ouverture de 2 à 3 m, poutre IPN ou HEB selon les charges.',
    portee: '2 à 3 m',
    budget: '5 000 – 8 000 €',
    image: '/images/cuisine-ouverte-sejour.webp',
    imageAlt: 'Ouverture de mur porteur entre cuisine et séjour avec pose de poutre — chantier IPB Toulouse',
  },
  {
    titre: 'Baie vitrée sur jardin',
    desc: "Création d'une grande ouverture sur la façade arrière. Permis souvent nécessaire.",
    portee: '3 à 5 m',
    budget: '10 000 – 18 000 €',
    image: '/images/creation-baie-vitree-1.webp',
    imageAlt: 'Création d\'une baie vitrée sur façade arrière donnant sur jardin — chantier IPB',
  },
  {
    titre: 'Suite parentale étendue',
    desc: 'Ouverture entre deux chambres pour créer un dressing ou une salle de bain attenante.',
    portee: '1,5 à 2,5 m',
    budget: '4 000 – 6 500 €',
    image: '/images/suite-parentale-etendue.webp',
    imageAlt: 'Ouverture entre chambres pour suite parentale avec dressing — chantier IPB',
  },
  {
    titre: 'Loft ou plateau',
    desc: 'Plusieurs ouvertures dans un plateau brut. Étude globale avec plan d\'exécution complet.',
    portee: 'Variable',
    budget: 'Sur devis',
    image: '/images/loft-ou-plateau.webp',
    imageAlt: 'Plateau loft avec plusieurs ouvertures structurelles — chantier IPB',
  },
];

export default function MurPorteurPage() {
  return (
    <div className="font-sans bg-ipb-cream text-ipb-text antialiased">
      <Script id="faq-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFaqJsonLd()) }} />
      <Script id="service-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateServiceJsonLd()) }} />

      <TopBar />
      <Navbar />
      <SmartBackBar />

      <main id="main-content">
        {/* HERO */}
        <section className="bg-ipb-cream">
          <div className="max-w-ipb mx-auto grid lg:grid-cols-[58fr_42fr] gap-12 lg:gap-16 px-6 lg:px-12 pt-16 lg:pt-24 pb-20 lg:pb-28 items-center">
            <div>
              <RevealOnScroll>
                <Eyebrow>Expertise · Ouverture de mur porteur</Eyebrow>
              </RevealOnScroll>
              <RevealOnScroll delay={0.06}>
                <h1
                  className="font-serif text-ipb-text mb-8"
                  style={{
                    fontSize: 'clamp(40px, 4vw, 62px)',
                    lineHeight: 1.06,
                    letterSpacing: '-0.025em',
                    fontWeight: 700,
                  }}
                >
                  Ouvrir un mur porteur à Toulouse,<br />
                  <em>poser une baie vitrée.</em>
                </h1>
              </RevealOnScroll>
              <RevealOnScroll delay={0.12}>
                <p className="text-[15px] leading-[1.9] font-light text-ipb-muted mb-10 max-w-[560px]">
                  Notre ingénieur dimensionne la poutre, nos équipes l'installent. Un seul interlocuteur, un seul devis, une seule garantie. Le projet aboutit dans les délais annoncés, avec tous les documents techniques remis à la livraison.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.18}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <MagneticButton href="/diagnostic" variant="primary">
                    Décrire mon projet
                  </MagneticButton>
                  <MagneticButton href="/blog/prix-ouverture-mur-porteur-toulouse-2026" variant="ghost">
                    Voir les tarifs détaillés
                  </MagneticButton>
                </div>
              </RevealOnScroll>
            </div>

            <RevealOnScroll direction="right" delay={0.1} className="hidden lg:block">
              <div className="relative aspect-[4/5] rounded-[6px] overflow-hidden">
                <Image
                  src="/images/baie-coulissante-apres.webp"
                  alt="Baie coulissante installée après ouverture d'un mur porteur — chantier IPB Toulouse"
                  fill
                  sizes="(max-width: 1024px) 0px, 500px"
                  className="object-cover"
                  priority
                />
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* TYPES DE PROJETS */}
        <section className="bg-ipb-white py-24 lg:py-32">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="grid lg:grid-cols-12 gap-8 items-end mb-16">
                <div className="lg:col-span-6">
                  <Eyebrow>Quatre projets typiques</Eyebrow>
                  <h2 className="font-serif text-ipb-text" style={{ fontSize: 'clamp(32px, 3vw, 46px)', lineHeight: 1.12, letterSpacing: '-0.022em', fontWeight: 700 }}>
                    Quel projet<br /><em>vous correspond ?</em>
                  </h2>
                </div>
                <div className="lg:col-span-5 lg:col-start-8">
                  <p className="text-[15px] leading-[1.9] font-light text-ipb-muted">
                    Notre institut intervient sur les configurations les plus fréquentes en Occitanie. Voici les ordres de grandeur constatés sur nos chantiers récents.
                  </p>
                </div>
              </div>
            </RevealOnScroll>

            <div className="grid md:grid-cols-2 gap-6">
              {typesProjets.map((p, i) => (
                <RevealOnScroll key={p.titre} delay={i * 0.06}>
                  <article className="bg-ipb-cream border border-ipb-rule rounded-[6px] overflow-hidden h-full flex flex-col group hover:shadow-[0_12px_36px_rgba(11,24,38,0.07)] transition-shadow duration-500">
                    <div className="relative aspect-[16/10] bg-ipb-stone overflow-hidden">
                      <Image
                        src={p.image}
                        alt={p.imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-8 flex-1 flex flex-col">
                      <h3 className="font-serif text-ipb-text font-bold text-[24px] leading-tight mb-4">
                        {p.titre}
                      </h3>
                      <p className="text-[14px] leading-[1.75] font-light text-ipb-muted mb-6 flex-1">
                        {p.desc}
                      </p>
                      <div className="grid grid-cols-2 gap-4 pt-5 border-t border-ipb-rule">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.14em] text-ipb-light mb-1">Portée</p>
                          <p className="font-serif text-ipb-text font-bold text-[16px]">{p.portee}</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.14em] text-ipb-light mb-1">Budget</p>
                          <p className="font-serif text-ipb-text font-bold text-[16px]">{p.budget}</p>
                        </div>
                      </div>
                    </div>
                  </article>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* MÉTHODE */}
        <section className="bg-ipb-navy py-24 lg:py-32">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <RevealOnScroll direction="left" className="lg:col-span-5">
                <div className="relative aspect-[4/5] rounded-[6px] overflow-hidden">
                  <Image
                    src="/images/creation-baie-vitree-1.webp"
                    alt="Création d'une baie vitrée après ouverture de mur porteur — chantier IPB Toulouse"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
              </RevealOnScroll>

              <div className="lg:col-span-7">
                <RevealOnScroll>
                  <Eyebrow variant="dark">Notre méthode</Eyebrow>
                  <h2 className="font-serif text-white mb-10" style={{ fontSize: 'clamp(32px, 3vw, 46px)', lineHeight: 1.12, letterSpacing: '-0.022em', fontWeight: 700 }}>
                    Du calcul technique<br /><em>aux finitions.</em>
                  </h2>
                </RevealOnScroll>

                <ul className="space-y-8">
                  {[
                    { titre: "Visite et étude technique", desc: "Notre ingénieur regarde le mur, identifie les charges reprises, vérifie les contraintes de la copropriété si applicable. Il calcule la poutre selon les normes en vigueur." },
                    { titre: "Devis ferme et planning", desc: "Devis détaillé sous 7 jours après la visite. Calendrier précis : démarches administratives, commande poutre, dates de chantier." },
                    { titre: "Étaiement et ouverture", desc: "Pose des étais pour reprendre les charges du plancher du dessus. Découpe progressive du mur. Pose et scellement de la poutre." },
                    { titre: "Finitions et livraison", desc: "Habillage de la poutre, ragréage, jonctions, peinture si demandée. Levée des étais. Tous les documents du chantier vous sont remis." },
                  ].map((etape, i) => (
                    <RevealOnScroll key={etape.titre} delay={0.08 + i * 0.06}>
                      <li className="grid grid-cols-[40px_1fr] gap-5 items-start pb-8 border-b border-white/10">
                        <span className="font-serif text-ipb-orange-l text-[14px] font-bold tracking-wider pt-2">
                          0{i + 1}
                        </span>
                        <div>
                          <h3 className="font-serif text-white text-[20px] font-bold leading-tight mb-2">{etape.titre}</h3>
                          <p className="text-[14px] leading-[1.75] font-light text-white/65">{etape.desc}</p>
                        </div>
                      </li>
                    </RevealOnScroll>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SCHÉMA TECHNIQUE — pédagogie */}
        <section className="bg-ipb-cream py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="text-center mb-12 max-w-3xl mx-auto">
                <Eyebrow className="justify-center">Comprendre le principe</Eyebrow>
                <h2 className="font-serif text-ipb-text" style={{ fontSize: 'clamp(28px, 2.6vw, 38px)', lineHeight: 1.15, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  Une poutre reprend les charges<br /><em>que le mur supportait.</em>
                </h2>
                <p className="text-[15px] leading-[1.85] font-light text-ipb-muted mt-6">
                  Le schéma technique illustre le principe : étaiement provisoire pour reprendre temporairement les charges du plancher, découpe du mur porteur, pose et scellement de la poutre dimensionnée par notre ingénieur, retrait des étais.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.08}>
              <div className="bg-ipb-white border border-ipb-rule rounded-[6px] p-4 md:p-6 lg:p-10 overflow-hidden">
                <MurPorteurDiagram />
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* Bandeau calculateur — outil interactif, capture leads chauds */}
        <section className="bg-ipb-navy text-white py-16 md:py-20 lg:py-24 relative overflow-hidden">
          {/* Halo orange en arrière-plan pour signaler l'interactivité */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-40 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at 50% 0%, rgba(232,116,60,0.25) 0%, transparent 60%)',
            }}
          />

          <div className="relative max-w-3xl mx-auto px-5 sm:px-6">
            <RevealOnScroll>
              {/* Carte outil — délimitation visuelle claire */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/15 rounded-[8px] p-7 md:p-10 lg:p-12 text-center">
                {/* Icône calculatrice — signal visuel "outil" */}
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-ipb-orange/15 border border-ipb-orange/30 mb-6">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#E89763" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="4" y="2" width="16" height="20" rx="2" />
                    <line x1="8" y1="6" x2="16" y2="6" />
                    <line x1="8" y1="11" x2="8" y2="11" />
                    <line x1="12" y1="11" x2="12" y2="11" />
                    <line x1="16" y1="11" x2="16" y2="11" />
                    <line x1="8" y1="15" x2="8" y2="15" />
                    <line x1="12" y1="15" x2="12" y2="15" />
                    <line x1="16" y1="15" x2="16" y2="19" />
                    <line x1="8" y1="19" x2="12" y2="19" />
                  </svg>
                </div>

                <p className="text-ipb-orange-l text-[11px] uppercase tracking-[0.18em] font-semibold mb-3">
                  Outil interactif · Gratuit · 2 minutes
                </p>
                <h2 className="text-white font-serif mb-5" style={{ fontSize: 'clamp(24px, 2.6vw, 36px)', lineHeight: 1.18, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  Estimez le prix de votre ouverture<br className="hidden sm:block" />
                  <em className="text-ipb-orange-l not-italic sm:italic">avant de nous parler.</em>
                </h2>
                <p className="text-white/80 text-[14px] md:text-[15px] leading-[1.8] mb-7 max-w-xl mx-auto">
                  Quatre questions sur votre projet (type de mur, dimensions, étage…) et notre calculateur vous donne une fourchette précise basée sur nos chantiers récents en Occitanie. Vous recevez le détail par email.
                </p>

                {/* Aperçu visuel des étapes — montre que c'est un outil structuré */}
                <div className="flex flex-wrap items-center justify-center gap-2 mb-8 text-[11px] uppercase tracking-[0.06em] text-white/70">
                  <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15">1. Projet</span>
                  <span aria-hidden="true" className="text-ipb-orange-l">→</span>
                  <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15">2. Dimensions</span>
                  <span aria-hidden="true" className="text-ipb-orange-l">→</span>
                  <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15">3. Type de mur</span>
                  <span aria-hidden="true" className="text-ipb-orange-l">→</span>
                  <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15">4. Étage</span>
                </div>

                <a
                  href="/calcul-prix-mur-porteur?utm_source=site&utm_medium=expertise_hub&utm_campaign=mur_porteur"
                  className="inline-flex items-center justify-center gap-2 bg-ipb-orange text-white font-bold px-9 md:px-10 py-4 rounded-[3px] text-[14px] md:text-[15px] tracking-[0.03em] hover:bg-[#b35519] transition-colors min-h-[52px] shadow-[0_8px_24px_rgba(200,96,31,0.35)]"
                >
                  Lancer le calculateur
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>

                {/* Trust signals + alternative téléphone */}
                <div className="mt-7 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-[12px] text-white/65">
                  <span className="flex items-center gap-1.5">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="#E89763" aria-hidden="true">
                      <path d="M8 1l1.95 4.31L14.5 6 11.25 9.36 12 14l-4-2.27L4 14l.75-4.64L1.5 6l4.55-.69L8 1z" />
                    </svg>
                    4,9/5 · 850 chantiers livrés
                  </span>
                  <span className="hidden sm:inline text-white/30" aria-hidden="true">·</span>
                  <a href="tel:0582953375" className="inline-flex items-center gap-1.5 hover:text-white transition-colors">
                    Préférez parler ? Appelez le 05 82 95 33 75
                  </a>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-ipb-white py-24 lg:py-32">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="text-center mb-16">
                <Eyebrow className="justify-center">Questions fréquentes</Eyebrow>
                <h2 className="font-serif text-ipb-text" style={{ fontSize: 'clamp(28px, 2.6vw, 38px)', lineHeight: 1.15, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  Sur l'ouverture<br /><em>de murs porteurs.</em>
                </h2>
              </div>
            </RevealOnScroll>

            <div className="space-y-3">
              {faqMurPorteur.map((item, i) => (
                <RevealOnScroll key={item.question} delay={i * 0.04}>
                  <details className="group bg-ipb-cream border border-ipb-rule rounded-[6px]">
                    <summary className="cursor-pointer list-none flex items-start justify-between gap-6 p-6 lg:p-7">
                      <h3 className="font-serif text-ipb-text font-bold text-[17px] leading-tight pr-2">
                        {item.question}
                      </h3>
                      <span className="text-ipb-orange text-2xl leading-none flex-shrink-0 transition-transform group-open:rotate-45 font-light" aria-hidden="true">+</span>
                    </summary>
                    <div className="px-6 lg:px-7 pb-7 -mt-2 text-[14px] leading-[1.85] font-light text-ipb-muted">
                      {item.answer}
                    </div>
                  </details>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        <CtaFinal />
      </main>

      <Footer />
    </div>
  );
}
