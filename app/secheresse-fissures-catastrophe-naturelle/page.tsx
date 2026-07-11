import { Metadata } from 'next';
import Link from 'next/link';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { SmartBackBar } from '@/components/ui/SmartBackBar';
import { Footer } from '@/components/home/Footer';
import { CtaFinal } from '@/components/home/CtaFinal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';

export const metadata: Metadata = {
  title: { absolute: 'Fissures de sécheresse et catastrophe naturelle à Toulouse · IPB' },
  description:
    "Sols argileux, fissures, arrêté CAT-NAT : IPB documente vos désordres, éclaire votre dossier d'indemnisation et coordonne les réparations. Toulouse et Occitanie.",
  keywords: [
    'fissures sécheresse toulouse',
    'catastrophe naturelle sécheresse haute-garonne',
    'indemnisation fissures maison',
    'retrait-gonflement des argiles',
    'déclaration cat nat fissures',
    'arrêté catastrophe naturelle occitanie',
  ],
  alternates: {
    canonical: 'https://www.ipb-expertise.fr/secheresse-fissures-catastrophe-naturelle',
  },
  openGraph: {
    title: { absolute: 'Fissures de sécheresse et catastrophe naturelle à Toulouse · IPB' },
    description:
      "IPB documente le lien entre vos fissures et le retrait-gonflement des argiles, éclaire votre dossier CAT-NAT et coordonne les réparations. Toulouse et Occitanie.",
    url: 'https://www.ipb-expertise.fr/secheresse-fissures-catastrophe-naturelle',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

const parcours = [
  {
    titre: 'Documenter, dès maintenant',
    desc: "N'attendez pas l'arrêté. Photographies datées, mesures d'ouverture, témoin posé sur la fissure : un désordre documenté tôt est un désordre démontrable. C'est l'objet de notre rapport d'inspection — il fixe l'état du bâti à une date certaine.",
  },
  {
    titre: 'Vérifier la reconnaissance de votre commune',
    desc: "Les arrêtés sont publiés au Journal officiel. Votre mairie sait si une demande de reconnaissance est en cours ; nous le vérifions également lors de notre visite.",
  },
  {
    titre: 'Déclarer dans les délais',
    desc: "Vous disposez de trente jours après la publication de l'arrêté pour déclarer le sinistre à votre assureur. Ce délai est court ; un dossier préparé en amont fait la différence.",
  },
  {
    titre: "La visite de l'expert d'assurance",
    desc: "L'assureur mandate son expert. Vous n'êtes pas tenu de l'affronter seul : notre rapport d'inspection objective le débat — mesures contre impressions. Lorsque les conclusions divergent, il fonde une discussion sérieuse.",
  },
  {
    titre: "L'indemnisation, puis les travaux",
    desc: "Une fois l'indemnisation acquise, restent les travaux — et la question de leur bonne exécution. Si vous le souhaitez, nous pouvons en assurer la coordination : cadrage du devis, suivi du chantier, réception.",
  },
];

const faqItems = [
  {
    question: "Ma commune n'est pas encore reconnue. Faut-il attendre ?",
    answer:
      "Non — c'est même le contresens le plus fréquent. Les désordres se documentent quand ils apparaissent ; l'arrêté peut venir des mois plus tard. Un rapport établi tôt fait foi de l'antériorité et de l'évolution des désordres.",
  },
  {
    question: 'Mes fissures sont anciennes. Est-ce trop tard ?',
    answer:
      "Pas nécessairement. Les arrêtés reconnaissent des épisodes de sécheresse passés, et une fissure ancienne qui évolue reste un désordre actif. La lecture du bâti permet de dater, au moins en ordre de grandeur, ce qui s'est joué.",
  },
  {
    question: "L'expert de mon assurance a conclu que ce n'était pas la sécheresse. Que faire ?",
    answer:
      "Ses conclusions ne sont pas définitives. Un rapport d'inspection contradictoire, fondé sur des mesures, permet de rouvrir la discussion — et, si nécessaire, d'appuyer un recours. Nous vous orientons vers les bons interlocuteurs lorsque le dossier prend un tour juridique.",
  },
  {
    question: "L'indemnisation couvre-t-elle tous les travaux ?",
    answer:
      "Elle couvre la réparation des dommages reconnus, déduction faite d'une franchise légale. Le périmètre exact dépend du rapport d'expertise de l'assureur — raison de plus pour que le vôtre soit solide.",
  },
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
};

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Diagnostic de fissures de sécheresse — dossier catastrophe naturelle',
  provider: { '@id': 'https://www.ipb-expertise.fr#localbusiness' },
  areaServed: [
    { '@type': 'AdministrativeArea', name: 'Haute-Garonne (31)' },
    { '@type': 'AdministrativeArea', name: 'Tarn-et-Garonne (82)' },
    { '@type': 'AdministrativeArea', name: 'Gers (32)' },
    { '@type': 'AdministrativeArea', name: 'Tarn (81)' },
  ],
  description:
    "Rapport d'inspection documentant le lien entre les fissures et le retrait-gonflement des argiles, pour éclairer un dossier d'indemnisation en catastrophe naturelle sécheresse.",
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.ipb-expertise.fr' },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Diagnostic de fissures',
      item: 'https://www.ipb-expertise.fr/expertise/fissures',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Fissures de sécheresse et catastrophe naturelle',
      item: 'https://www.ipb-expertise.fr/secheresse-fissures-catastrophe-naturelle',
    },
  ],
};

export default function SecheresseCatNatPage() {
  return (
    <div className="font-sans bg-ipb-cream text-ipb-text antialiased">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <TopBar />
      <Navbar />
      <SmartBackBar />

      <main id="main-content">
        {/* HERO */}
        <section className="bg-ipb-cream">
          <div className="max-w-ipb mx-auto px-6 lg:px-12 pt-16 lg:pt-24 pb-20 lg:pb-28">
            <div className="max-w-3xl">
              <RevealOnScroll>
                <Eyebrow>Fissures · Sécheresse & catastrophe naturelle</Eyebrow>
              </RevealOnScroll>
              <RevealOnScroll delay={0.06} variant="editorial">
                <h1
                  className="font-serif text-ipb-text mb-6"
                  style={{
                    fontSize: 'clamp(40px, 4vw, 62px)',
                    lineHeight: 1.06,
                    letterSpacing: '-0.025em',
                    fontWeight: 700,
                  }}
                >
                  Fissures de sécheresse<br />
                  <em>et catastrophe naturelle.</em>
                </h1>
              </RevealOnScroll>
              <RevealOnScroll delay={0.1}>
                <p
                  className="font-serif text-ipb-text mb-8 italic"
                  style={{
                    fontSize: 'clamp(20px, 1.8vw, 26px)',
                    lineHeight: 1.3,
                    letterSpacing: '-0.015em',
                    fontWeight: 400,
                  }}
                >
                  Votre maison a travaillé avec le sol. Votre dossier, lui, doit être solide.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.14}>
                <p className="text-[15px] leading-[1.9] font-light text-ipb-muted mb-10 max-w-[640px]">
                  En Occitanie, la plupart des fissures ont la même origine : des sols argileux qui gonflent l'hiver et se rétractent l'été. Lorsque votre commune est reconnue en état de catastrophe naturelle, une indemnisation est possible — à condition que le lien entre la sécheresse et vos désordres soit correctement établi, dans les délais. C'est précisément ce que fait notre rapport d'inspection.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.2}>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <MagneticButton href="/diagnostic" variant="primary">
                    Demander un diagnostic
                  </MagneticButton>
                  <MagneticButton href="tel:+33582953375" variant="ghost">
                    05 82 95 33 75
                  </MagneticButton>
                </div>
              </RevealOnScroll>
              <RevealOnScroll delay={0.26} variant="subtle">
                <p className="text-[12px] leading-[1.7] tracking-[0.02em] text-ipb-light">
                  Réponse sous 48 heures · Toulouse et Occitanie
                </p>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* SECTION 1 — COMPRENDRE */}
        <section className="bg-ipb-white py-24 lg:py-32 border-t border-ipb-rule">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              <RevealOnScroll className="lg:col-span-5">
                <Eyebrow>Comprendre</Eyebrow>
                <h2
                  className="font-serif text-ipb-text"
                  style={{ fontSize: 'clamp(32px, 3vw, 46px)', lineHeight: 1.12, letterSpacing: '-0.022em', fontWeight: 700 }}
                >
                  Le retrait-gonflement<br />
                  <em>des argiles, simplement.</em>
                </h2>
              </RevealOnScroll>
              <RevealOnScroll delay={0.08} className="lg:col-span-7">
                <div className="space-y-6 text-[15px] leading-[1.9] font-light text-ipb-muted">
                  <p>
                    Les sols argileux se comportent comme une éponge : gorgés d'eau l'hiver, ils se rétractent lors des sécheresses. La maison, posée dessus, suit ces mouvements — inégalement. C'est ce tassement différentiel qui ouvre les fissures : en escalier le long des joints, au droit des angles, autour des ouvertures.
                  </p>
                  <p>
                    La Haute-Garonne et ses départements voisins comptent parmi les territoires les plus exposés de France. Si votre maison est récente ou ancienne, sur vide sanitaire ou sur terre-plein, cela change la lecture — pas le principe.
                  </p>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* SECTION 2 — ÊTES-VOUS CONCERNÉ */}
        <section className="bg-ipb-cream py-24 lg:py-32">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="mb-16 max-w-2xl">
                <Eyebrow>L'indemnisation</Eyebrow>
                <h2
                  className="font-serif text-ipb-text"
                  style={{ fontSize: 'clamp(32px, 3vw, 46px)', lineHeight: 1.12, letterSpacing: '-0.022em', fontWeight: 700 }}
                >
                  Deux conditions<br />
                  <em>ouvrent le droit à la garantie.</em>
                </h2>
              </div>
            </RevealOnScroll>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {[
                {
                  titre: 'Votre commune est reconnue',
                  desc: "L'état de catastrophe naturelle est constaté par arrêté interministériel, publié au Journal officiel. Les arrêtés se succèdent chaque année ; votre commune peut être reconnue pour une sécheresse passée sans que vous en ayez été informé.",
                },
                {
                  titre: 'Vos désordres sont de nature à être pris en charge',
                  desc: "Le cadre réglementaire vise les dommages qui compromettent la solidité ou l'habitabilité du logement — fissures traversantes des murs porteurs et des façades, désordres des fondations, des dallages et des planchers. Les microfissures d'aspect, en principe, n'en relèvent pas.",
                },
              ].map((c, i) => (
                <RevealOnScroll key={c.titre} delay={i * 0.06}>
                  <article className="h-full bg-ipb-white border border-ipb-rule rounded-[6px] p-8 lg:p-10">
                    <p className="font-serif text-ipb-orange text-[14px] font-bold tracking-wider mb-4">0{i + 1}</p>
                    <h3 className="font-serif text-ipb-text font-bold text-[22px] leading-tight mb-4">{c.titre}</h3>
                    <p className="text-[14px] leading-[1.8] font-light text-ipb-muted">{c.desc}</p>
                  </article>
                </RevealOnScroll>
              ))}
            </div>

            <RevealOnScroll delay={0.14}>
              <p className="mt-10 text-[15px] leading-[1.9] font-light text-ipb-text max-w-[760px]">
                C'est là que tout se joue : distinguer ce qui relève de l'aspect de ce qui relève du bâti, et le démontrer. Un dossier se gagne sur la qualité de sa documentation.
              </p>
            </RevealOnScroll>
          </div>
        </section>

        {/* SECTION 3 — LE PARCOURS */}
        <section className="bg-ipb-navy py-24 lg:py-32">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="mb-16 max-w-2xl">
                <Eyebrow variant="dark">Le parcours</Eyebrow>
                <h2
                  className="font-serif text-white"
                  style={{ fontSize: 'clamp(32px, 3vw, 46px)', lineHeight: 1.12, letterSpacing: '-0.022em', fontWeight: 700 }}
                >
                  De la fissure constatée<br />
                  <em>à l'indemnisation.</em>
                </h2>
              </div>
            </RevealOnScroll>

            <ol className="space-y-8">
              {parcours.map((etape, i) => (
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
            </ol>
          </div>
        </section>

        {/* SECTION 4 — CE QUE FAIT IPB */}
        <section className="bg-ipb-white py-24 lg:py-32">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="mb-16 max-w-2xl">
                <Eyebrow>Notre rôle</Eyebrow>
                <h2
                  className="font-serif text-ipb-text"
                  style={{ fontSize: 'clamp(32px, 3vw, 46px)', lineHeight: 1.12, letterSpacing: '-0.022em', fontWeight: 700 }}
                >
                  Ce que fait IPB,<br />
                  <em>concrètement.</em>
                </h2>
              </div>
            </RevealOnScroll>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {[
                {
                  temps: "Avant l'arrêté",
                  desc: "Le rapport d'inspection fixe l'état de votre bâti : mesures au fissuromètre, photographies datées, lecture des désordres et de leur cause probable. C'est la pièce qui manque à la plupart des dossiers.",
                },
                {
                  temps: 'Pendant la procédure',
                  desc: "Le rapport documente le lien entre vos désordres et le retrait-gonflement des argiles. Il se transmet à votre assureur et éclaire la visite de son expert.",
                },
                {
                  temps: "Après l'indemnisation",
                  desc: "Si vous le souhaitez, nous coordonnons les travaux de réparation — agrafage, reprise d'enduit — avec des entreprises couvertes par leur garantie décennale.",
                },
              ].map((c, i) => (
                <RevealOnScroll key={c.temps} delay={i * 0.06}>
                  <article className="h-full bg-ipb-cream border border-ipb-rule rounded-[6px] p-8">
                    <p className="text-[10px] uppercase tracking-[0.16em] text-ipb-orange-d font-medium mb-4">{c.temps}</p>
                    <p className="text-[14px] leading-[1.8] font-light text-ipb-muted">{c.desc}</p>
                  </article>
                </RevealOnScroll>
              ))}
            </div>

            <RevealOnScroll delay={0.16}>
              <p className="mt-10 text-[14px] leading-[1.85] font-light text-ipb-muted max-w-[760px]">
                Notre intervention reste une inspection visuelle et instrumentée. Lorsqu'un dossier exige des investigations qui la dépassent — étude de sol, calculs —, nous vous le disons et nous vous orientons vers un bureau d'études, votre dossier en main.
              </p>
            </RevealOnScroll>
          </div>
        </section>

        {/* SECTION 5 — FAQ */}
        <section className="bg-ipb-cream py-24 lg:py-32">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="text-center mb-16">
                <Eyebrow className="justify-center">Questions fréquentes</Eyebrow>
                <h2
                  className="font-serif text-ipb-text"
                  style={{ fontSize: 'clamp(28px, 2.6vw, 38px)', lineHeight: 1.15, letterSpacing: '-0.022em', fontWeight: 700 }}
                >
                  Sécheresse & CAT-NAT<br />
                  <em>vos questions.</em>
                </h2>
              </div>
            </RevealOnScroll>

            <div className="space-y-3">
              {faqItems.map((item, i) => (
                <RevealOnScroll key={item.question} delay={i * 0.04}>
                  <details className="group bg-ipb-white border border-ipb-rule rounded-[6px]">
                    <summary className="cursor-pointer list-none flex items-start justify-between gap-6 p-6 lg:p-7">
                      <h3 className="font-serif text-ipb-text font-bold text-[17px] leading-tight pr-2">
                        {item.question}
                      </h3>
                      <span
                        className="text-ipb-orange text-2xl leading-none flex-shrink-0 transition-transform group-open:rotate-45 font-light"
                        aria-hidden="true"
                      >
                        +
                      </span>
                    </summary>
                    <div className="px-6 lg:px-7 pb-7 -mt-2 text-[14px] leading-[1.85] font-light text-ipb-muted">
                      {item.answer}
                    </div>
                  </details>
                </RevealOnScroll>
              ))}
            </div>

            <div className="text-center mt-12 space-y-3">
              <Link href="/expertise/fissures" className="block text-[13px] text-ipb-orange hover:underline">
                Voir le diagnostic de fissures →
              </Link>
              <Link href="/expertise/retrait-gonflement-argiles" className="block text-[13px] text-ipb-muted hover:text-ipb-orange">
                Comprendre le retrait-gonflement des argiles →
              </Link>
              <Link href="/contact" className="block text-[13px] text-ipb-muted hover:text-ipb-orange">
                Décrire ma situation à l'institut →
              </Link>
            </div>
          </div>
        </section>

        <CtaFinal />
      </main>

      <Footer />
    </div>
  );
}
