import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { SmartBackBar } from "@/components/ui/SmartBackBar";
import { Footer } from '@/components/home/Footer';
import { CtaFinal } from '@/components/home/CtaFinal';
import { Testimonials } from '@/components/home/Testimonials';
import { murPorteurReviews } from '@/app/data/testimonials';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import Image from 'next/image';
import Script from 'next/script';
import type { Metadata } from 'next';
import { MurPorteurDiagram } from '@/components/ui/MurPorteurDiagram';

export const metadata: Metadata = {
  title: "Ouverture Mur Porteur Toulouse · IPN/HEB · Eurocodes",
  description: "Ouverture mur porteur Toulouse : étude IPN/HEB, dimensionnement poutre selon Eurocodes, travaux clé en main. Un seul interlocuteur, du devis à la livraison. Pré-étude sous 24h. ☎ 05 82 95 33 75",
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
    description: "Étude IPN/HEB, dimensionnement poutre selon Eurocodes, travaux clé en main. Un seul interlocuteur, du devis à la livraison. Pré-étude sous 24h.",
    url: 'https://www.ipb-expertise.fr/expertise/mur-porteur',
    siteName: 'IPB - Institut de Pathologie du Bâtiment',
    locale: 'fr_FR',
    type: 'website',
    images: [{ url: '/images/baie-coulissante-apres.webp', width: 1200, height: 630, alt: 'Baie coulissante installée après ouverture de mur porteur — chantier IPB' }],
  },
};

const faqMurPorteur = [
  {
    question: "Combien d'interlocuteurs aurai-je sur ce projet ?",
    answer: "Un seul : IPB. Vous décrivez votre projet, notre institut prend en charge l'opération de A à Z — calcul de la poutre selon les Eurocodes, démarches administratives, étaiement, ouverture, pose, finitions. Chaque étape est exécutée par les corps de métier requis, sous leurs décennales propres. Vous, vous parlez à une seule personne, du premier appel à la levée des étais. C'est ce qui distingue notre institut d'un montage à plusieurs prestataires, où chacun renvoie vers l'autre quand quelque chose dérive.",
  },
  {
    question: "Et si on découvre que mon mur n'est pas porteur, ou que l'ouverture n'est pas faisable ?",
    answer: "C'est précisément ce que la visite technique permet de vérifier. Si votre mur n'est pas porteur, on vous le dit dès la visite, et l'intervention peut souvent se simplifier (passage d'un linteau léger, voire pas d'étude structurelle). Si l'ouverture n'est pas faisable telle que vous l'imaginez (contraintes copropriété, urbanisme, bâti ancien), on vous explique pourquoi et on chiffre les alternatives compatibles. Aucun engagement avant la signature du devis.",
  },
  {
    question: "Comment se passe le chantier au quotidien — bruit, poussière, protections ?",
    answer: "L'intervention est intense mais courte (2 à 5 jours). Avant les travaux, les sols et meubles sont protégés (bâches, films, cloisons temporaires). La poussière est contenue à la zone de chantier autant que possible. Les horaires sont conformes aux usages locaux (8h-18h hors weekends et jours fériés). Si vous êtes en copropriété ou en mitoyenneté, IPB se charge de prévenir les voisins en amont. La zone de chantier est nettoyée chaque soir, l'ensemble restitué propre à la livraison.",
  },
  {
    question: "Si je change d'avis après la visite, dois-je payer quelque chose ?",
    answer: "Non. La visite technique et la première analyse de faisabilité sont gratuites et sans engagement. Tant que vous n'avez pas signé le devis, vous ne devez rien — pas même les frais de déplacement. C'est une garantie que peu d'acteurs offrent sur ce métier : nous tenons à ce que vous décidiez en conscience, sans pression commerciale.",
  },
  {
    question: "Pendant le chantier, à qui je m'adresse si j'ai une question ou un imprévu ?",
    answer: "À IPB, votre interlocuteur unique. Un numéro direct, qui suit votre dossier de bout en bout. Vous n'avez pas à courir derrière les corps de métier ou à arbitrer entre des prestataires : tout passe par nous, du premier appel à la levée des étais.",
  },
  {
    question: "Comment savoir si mon mur est porteur ?",
    answer: "Un mur porteur supporte des charges venues du plancher du dessus ou de la toiture. Les indices visuels sont peu fiables. Notre institut identifie le caractère porteur d'un mur lors d'une visite technique : observation du sens des solives, recherche des chaînages, sondage si nécessaire. Sans cette vérification, ne touchez à aucun mur.",
  },
  {
    question: "Comment dimensionne-t-on la poutre d'une ouverture de mur porteur ?",
    answer: "Le dimensionnement repose sur la descente de charges (poids des murs, dalles et charges d'exploitation au-dessus), la portée libre de l'ouverture, et la nature des appuis. La note de calcul est rédigée selon les Eurocodes (EN 1993 pour l'acier, EN 1992 pour le béton) et signée sous décennale études dédiée. Le profil retenu — IPN, IPE ou HEB — dépend du moment de flexion à reprendre et de la flèche admissible. Sur une portée standard de 2,5 m sous étage habité, un IPN 200 ou un HEB 160 sont les profils les plus fréquents en construction toulousaine.",
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
    answer: "Oui. Nous préparons le dossier technique pour le vote en assemblée générale (calcul, plans, attestations). Les décennales métier (études et travaux) et nos rapports rassurent généralement les copropriétaires et le syndic. La démarche prend 2 à 4 mois selon le calendrier des AG.",
  },
  {
    question: "IPN, HEB ou IPE : quelle poutre choisir ?",
    answer: "Le choix dépend de la portée, des charges à reprendre et de l'épaisseur du mur. La poutre est dimensionnée selon les normes en vigueur (Eurocode). Un sous-dimensionnement entraîne fissures, affaissement de plancher, voire rupture. Ce calcul n'est jamais à la charge d'un artisan généraliste.",
  },
  {
    question: "Quel est le prix d'une ouverture de mur porteur ?",
    answer: "Le budget dépend de plusieurs paramètres concrets : la portée de l'ouverture, le type de mur (brique foraine, parpaing, pierre, béton banché), ce qui se trouve au-dessus (combles, étage habité), et la complexité des finitions. Plutôt qu'une fourchette générique qui peut induire en erreur, nous mettons à votre disposition un calculateur en ligne basé sur nos chantiers récents en Occitanie — 4 questions, 2 minutes, fourchette précise envoyée par email. Devis ferme remis sous 24 h après visite gratuite, un seul interlocuteur de A à Z.",
  },
  {
    question: "Faut-il prévoir un étaiement pendant les travaux ?",
    answer: "Oui, l'étaiement est non négociable. Avant toute découpe du mur porteur, on installe des étais qui reprennent les charges du plancher du dessus pendant l'intervention. Sans étaiement, le plancher du dessus s'affaisse — ça arrive plusieurs fois par an à Toulouse sur des chantiers mal préparés. Tout devis sérieux chiffre l'étaiement séparément, ce que nous faisons systématiquement.",
  },
  {
    question: "Les finitions sont-elles incluses dans le devis ?",
    answer: "Beaucoup d'artisans \"oublient\" les finitions dans leur devis pour afficher un prix plus bas. Chez IPB, nous les chiffrons systématiquement : ragréage des coupes, jonctions plâtre, peinture des bords de l'ouverture, repose des plinthes. Le montant varie selon la complexité du projet et il est toujours détaillé dans le devis. Vous pouvez les externaliser si vous voulez gérer cette partie vous-même : nous le précisons alors clairement.",
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
  "description": "Étude de structure, dimensionnement de poutre IPN/HEB, ouverture de mur porteur et création de baie vitrée. Un seul interlocuteur, de l'étude à la livraison."
});

const typesProjets = [
  {
    titre: 'Cuisine ouverte sur séjour',
    desc: 'Le projet le plus fréquent. Ouverture de 2 à 3 m, poutre IPN ou HEB selon les charges.',
    portee: '2 à 3 m',
    image: '/images/baie-vitree-cuisine.webp',
    imageAlt: 'Cuisine ouverte sur séjour après ouverture de mur porteur — chantier IPB Toulouse',
  },
  {
    titre: 'Baie vitrée sur jardin',
    desc: "Création d'une grande ouverture sur la façade arrière. Permis souvent nécessaire.",
    portee: '3 à 5 m',
    image: '/images/creation-baie-vitree-1.webp',
    imageAlt: 'Création d\'une baie vitrée sur façade arrière donnant sur jardin — chantier IPB',
  },
  {
    titre: 'Suite parentale étendue',
    desc: 'Ouverture entre deux chambres pour créer un dressing ou une salle de bain attenante.',
    portee: '1,5 à 2,5 m',
    image: '/images/suite-parentale-etendue.webp',
    imageAlt: 'Ouverture entre chambres pour suite parentale avec dressing — chantier IPB',
  },
  {
    titre: 'Loft ou plateau',
    desc: 'Plusieurs ouvertures dans un plateau brut. Étude globale avec plan d\'exécution complet.',
    portee: 'Variable',
    image: '/images/ouverture-mur-porteur-grange.webp',
    imageAlt: 'Ouverture structurelle dans une grange réhabilitée en plateau — chantier IPB',
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
                  Ouvrir un mur, poser une baie.<br />
                  <em>Un seul interlocuteur, du calcul à la livraison.</em>
                </h1>
              </RevealOnScroll>
              <RevealOnScroll delay={0.12}>
                <p className="text-[15px] leading-[1.9] font-light text-ipb-muted mb-10 max-w-[560px]">
                  Vous décrivez votre projet à IPB. Nous prenons en charge l'opération de bout en bout : calcul de la poutre selon les Eurocodes, étaiement, ouverture, pose, finitions. Chaque étape est exécutée sous sa décennale métier. Vous, vous parlez à une seule personne, du premier appel à la levée des étais.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.18}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <MagneticButton href="/diagnostic" variant="primary">
                    Décrire mon projet
                  </MagneticButton>
                  <a
                    href="tel:0582953375"
                    className="inline-flex items-center justify-center gap-2 border border-ipb-text/15 text-ipb-text font-medium px-7 py-4 rounded-[3px] text-[14px] tracking-[0.02em] hover:border-ipb-orange hover:text-ipb-orange transition-colors min-h-[48px]"
                    aria-label="Appeler IPB au 05 82 95 33 75"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    05 82 95 33 75
                  </a>
                </div>
              </RevealOnScroll>

              {/* Mini trust-line sous les CTA — preuves rapides scannables */}
              <RevealOnScroll delay={0.22}>
                <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-5 text-[12px] text-ipb-muted font-light">
                  <li className="flex items-center gap-1.5">
                    <span className="text-ipb-orange" aria-hidden="true">✓</span>
                    <span>Un seul interlocuteur</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="text-ipb-orange" aria-hidden="true">✓</span>
                    <span>Pré-étude sous 24h</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="text-ipb-orange" aria-hidden="true">✓</span>
                    <span>Du devis à la livraison</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="text-ipb-orange" aria-hidden="true">✓</span>
                    <span>Décennales métier</span>
                  </li>
                </ul>
              </RevealOnScroll>
            </div>

            <RevealOnScroll direction="right" delay={0.1} className="hidden lg:block">
              <div className="relative aspect-[4/5] rounded-[6px] overflow-hidden">
                <Image
                  src="/images/chantier-ouverture-mur-porteur.webp"
                  alt="Chantier d'ouverture de mur porteur en cours — étaiement et pose de poutre par l'institut IPB"
                  fill
                  sizes="(max-width: 1024px) 0px, 500px"
                  className="object-cover"
                  priority
                />
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* RECONNAISSANCE DU PROBLÈME (PAS — miroir du visiteur) */}
        <section className="bg-ipb-white py-20 lg:py-24 border-t border-ipb-rule">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              <div className="lg:col-span-7">
                <RevealOnScroll>
                  <Eyebrow>Si vous lisez cette page…</Eyebrow>
                  <h2 className="font-serif text-ipb-text mb-8" style={{ fontSize: 'clamp(28px, 2.6vw, 38px)', lineHeight: 1.18, letterSpacing: '-0.022em', fontWeight: 700 }}>
                    Vous voulez ouvrir un mur.<br /><em>Pas piloter cinq prestataires.</em>
                  </h2>
                </RevealOnScroll>
                <div className="space-y-5 text-[15px] leading-[1.9] font-light text-ipb-muted">
                  <RevealOnScroll delay={0.06}>
                    <p>
                      Un projet d'ouverture de mur porteur classique mobilise un bureau d'études pour le calcul, un maçon pour l'étaiement et la découpe, un menuisier pour la baie, un peintre pour les finitions, parfois un architecte pour les démarches. Cinq devis. Cinq factures. Cinq calendriers à coordonner — souvent depuis votre cuisine, entre deux journées de travail.
                    </p>
                  </RevealOnScroll>
                  <RevealOnScroll delay={0.12}>
                    <p>
                      Et si quelque chose lâche dans cinq ans — fissure, affaissement, infiltration — la question revient toujours : <em>qui était responsable de quoi ?</em> Le maçon dira « moi je n'ai fait que poser », le bureau d'études dira « moi je n'ai fait que calculer », et votre assurance cherchera la note de calcul signée que personne ne lui remettra.
                    </p>
                  </RevealOnScroll>
                  <RevealOnScroll delay={0.18}>
                    <p className="text-ipb-text">
                      Notre institut a été pensé pour ne pas vous faire vivre ça. Un seul interlocuteur — IPB — vous suit du premier appel à la levée des étais. Le calcul de la poutre est rédigé selon les <strong className="not-italic">Eurocodes</strong> et couvert par une décennale études dédiée ; l'étaiement, l'ouverture, la pose et les finitions sont exécutés sous décennale travaux dédiée. Notre institut sécurise l'ensemble sous sa responsabilité civile professionnelle. <strong className="not-italic">Deux décennales métier, une RC pro IPB, un seul interlocuteur pour vous — du devis à la livraison.</strong>
                    </p>
                  </RevealOnScroll>
                </div>
              </div>

              <RevealOnScroll direction="right" delay={0.1} className="lg:col-span-5">
                <div className="relative aspect-[4/5] rounded-[6px] overflow-hidden">
                  <Image
                    src="/images/ouverture-mur-porteur-realisation.webp"
                    alt="Réalisation IPB d'une ouverture de mur porteur — note de calcul signée et chantier livré"
                    fill
                    sizes="(max-width: 1024px) 100vw, 420px"
                    className="object-cover"
                  />
                </div>
              </RevealOnScroll>
            </div>
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
                      <div className="pt-5 border-t border-ipb-rule">
                        <p className="text-[10px] uppercase tracking-[0.14em] text-ipb-light mb-1">Portée typique</p>
                        <p className="font-serif text-ipb-text font-bold text-[16px]">{p.portee}</p>
                      </div>
                    </div>
                  </article>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* DIFFÉRENCIATION — Un seul contact vs parcours classique */}
        <section className="bg-ipb-cream py-24 lg:py-32 border-t border-ipb-rule">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-16">
                <Eyebrow className="justify-center">Pourquoi un seul contact change tout</Eyebrow>
                <h2 className="font-serif text-ipb-text" style={{ fontSize: 'clamp(32px, 3vw, 46px)', lineHeight: 1.12, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  Un seul contact,<br /><em>pas trois.</em>
                </h2>
                <p className="text-[15px] leading-[1.9] font-light text-ipb-muted mt-6">
                  Côte à côte, le parcours d'un projet d'ouverture classique et celui d'un projet IPB. La différence n'est pas dans le calcul de la poutre — elle est dans tout ce qu'il y a autour.
                </p>
              </div>
            </RevealOnScroll>

            <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
              {/* Colonne gauche — Scénario classique */}
              <RevealOnScroll direction="left">
                <article className="bg-ipb-white border border-ipb-rule rounded-[6px] p-8 lg:p-10 h-full">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-ipb-light font-semibold mb-3">Le scénario classique</p>
                  <h3 className="font-serif text-ipb-text font-bold text-[22px] leading-tight mb-7">
                    Cinq prestataires,<br />cinq calendriers à coordonner.
                  </h3>
                  <ul className="space-y-5 text-[14px] leading-[1.75] font-light text-ipb-muted">
                    <li className="grid grid-cols-[32px_1fr] gap-3 items-start">
                      <span className="font-serif text-ipb-light text-[13px] font-bold tracking-wider pt-0.5">01</span>
                      <p>Vous trouvez un bureau d'études pour calculer la poutre.</p>
                    </li>
                    <li className="grid grid-cols-[32px_1fr] gap-3 items-start">
                      <span className="font-serif text-ipb-light text-[13px] font-bold tracking-wider pt-0.5">02</span>
                      <p>Vous trouvez un maçon, lui transmettez la note de calcul, il chiffre l'étaiement et l'ouverture.</p>
                    </li>
                    <li className="grid grid-cols-[32px_1fr] gap-3 items-start">
                      <span className="font-serif text-ipb-light text-[13px] font-bold tracking-wider pt-0.5">03</span>
                      <p>Vous trouvez un menuisier pour la baie, vous synchronisez ses dates avec celles du maçon.</p>
                    </li>
                    <li className="grid grid-cols-[32px_1fr] gap-3 items-start">
                      <span className="font-serif text-ipb-light text-[13px] font-bold tracking-wider pt-0.5">04</span>
                      <p>Vous trouvez un peintre pour reprendre les jonctions et les finitions.</p>
                    </li>
                    <li className="grid grid-cols-[32px_1fr] gap-3 items-start">
                      <span className="font-serif text-ipb-light text-[13px] font-bold tracking-wider pt-0.5">05</span>
                      <p>Si quelque chose lâche dans cinq ans : chacun renvoie vers l'autre. Personne n'est responsable de l'ensemble.</p>
                    </li>
                  </ul>
                </article>
              </RevealOnScroll>

              {/* Colonne droite — Avec IPB */}
              <RevealOnScroll direction="right" delay={0.08}>
                <article className="bg-ipb-navy border border-ipb-navy rounded-[6px] p-8 lg:p-10 h-full">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-ipb-orange-l font-semibold mb-3">Avec IPB</p>
                  <h3 className="font-serif text-white font-bold text-[22px] leading-tight mb-7">
                    Un institut,<br />du devis à la levée des étais.
                  </h3>
                  <ul className="space-y-5 text-[14px] leading-[1.75] font-light text-white/75">
                    <li className="grid grid-cols-[32px_1fr] gap-3 items-start">
                      <span className="font-serif text-ipb-orange-l text-[13px] font-bold tracking-wider pt-0.5">01</span>
                      <p>Vous décrivez votre projet à IPB. Visite technique sous 72h, 24h en urgence.</p>
                    </li>
                    <li className="grid grid-cols-[32px_1fr] gap-3 items-start">
                      <span className="font-serif text-ipb-orange-l text-[13px] font-bold tracking-wider pt-0.5">02</span>
                      <p>Note de calcul rédigée selon les Eurocodes, couverte par une décennale études dédiée.</p>
                    </li>
                    <li className="grid grid-cols-[32px_1fr] gap-3 items-start">
                      <span className="font-serif text-ipb-orange-l text-[13px] font-bold tracking-wider pt-0.5">03</span>
                      <p>Calendrier unique piloté par IPB. Étaiement, ouverture, baie et finitions exécutés sous décennale travaux dédiée.</p>
                    </li>
                    <li className="grid grid-cols-[32px_1fr] gap-3 items-start">
                      <span className="font-serif text-ipb-orange-l text-[13px] font-bold tracking-wider pt-0.5">04</span>
                      <p>Si quelque chose lâche dans cinq ans : un seul numéro à appeler — celui d'IPB. Deux décennales métier couvrent l'étude et le chantier ; notre RC pro vous couvre sur l'accompagnement IPB.</p>
                    </li>
                  </ul>
                  <p className="mt-7 pt-6 border-t border-white/10 text-[13px] leading-[1.75] text-white/60 italic">
                    « Notre institut suit votre chantier personnellement, du premier appel à la levée des étais. Vous, vous vous concentrez sur votre maison ; nous, sur ceux qui la transforment. »
                  </p>
                </article>
              </RevealOnScroll>
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
                    src="/images/Mur-porteur-et-baie-sur-l_exterieur.webp"
                    alt="Ouverture de mur porteur avec baie vitrée vers l'extérieur — finitions chantier IPB"
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
                    Un seul interlocuteur,<br /><em>de la note de calcul à la levée des étais.</em>
                  </h2>
                </RevealOnScroll>

                <ul className="space-y-8">
                  {[
                    { titre: "Visite et étude technique", desc: "Notre institut se déplace pour identifier les charges reprises et vérifier les contraintes (copropriété, bâti, urbanisme). La poutre est ensuite dimensionnée selon les Eurocodes." },
                    { titre: "Note de calcul et planning", desc: "Note de calcul rédigée sous 3 à 5 jours ouvrés après la visite. IPB cale le calendrier complet : démarches administratives, commande poutre, dates de chantier." },
                    { titre: "Étaiement et ouverture", desc: "Les étais sont posés pour reprendre les charges du plancher du dessus, le mur est découpé progressivement, la poutre scellée. IPB supervise sur site." },
                    { titre: "Finitions et livraison", desc: "Habillage de la poutre, ragréage, jonctions, peinture si demandée. Levée des étais. IPB vous remet tous les documents du chantier." },
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
                  Le schéma technique illustre le principe : étaiement provisoire pour reprendre temporairement les charges du plancher, découpe du mur porteur, pose et scellement de la poutre dimensionnée selon les Eurocodes, retrait des étais.
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
                  Estimez le prix de votre ouverture{' '}<br className="hidden sm:block" />
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

        {/* PREUVE SOCIALE — avis clients ciblés mur porteur / baie vitrée.
            On masque le lien Google car ces avis ne figurent pas sur la fiche
            publique (ils sont spécifiques au service mur porteur). */}
        <Testimonials reviews={murPorteurReviews} showGoogleLink={false} />

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

        {/* RENVERSEMENT DU RISQUE — bloc d'apaisement avant le CTA final */}
        <section className="bg-ipb-cream py-16 lg:py-20 border-t border-ipb-rule">
          <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
            <RevealOnScroll>
              <p className="text-[10px] text-ipb-orange uppercase tracking-[0.18em] font-semibold mb-4">
                Vous hésitez ?
              </p>
              <p className="font-serif text-ipb-text mb-5" style={{ fontSize: 'clamp(20px, 2vw, 26px)', lineHeight: 1.4, letterSpacing: '-0.015em', fontWeight: 500 }}>
                Décrire votre projet ne vous engage à rien.
              </p>
              <p className="text-[15px] leading-[1.85] font-light text-ipb-muted">
                Notre équipe revient vers vous sous 24h ouvrées avec une première analyse de faisabilité. <strong className="text-ipb-text not-italic">Dès cet appel, vous avez un seul interlocuteur</strong> — qui vous suivra jusqu'à la levée des étais. Si votre projet n'est pas compatible avec une ouverture (sécurité, copropriété, contraintes de bâti), <strong className="text-ipb-text not-italic">on vous le dira clairement</strong>, et on vous expliquera les alternatives. Et <strong className="text-ipb-text not-italic">tant que vous n'avez pas signé le devis, vous ne devez rien</strong> — pas même les frais de déplacement.
              </p>
            </RevealOnScroll>
          </div>
        </section>

        <CtaFinal />
      </main>

      <Footer />
    </div>
  );
}
