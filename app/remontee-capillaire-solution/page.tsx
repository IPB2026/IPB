import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { SmartBackBar } from "@/components/ui/SmartBackBar";
import { Footer } from '@/components/home/Footer';
import { CtaFinal } from '@/components/home/CtaFinal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';

export const metadata: Metadata = {
  title: 'Remontées capillaires · Causes et traitement durable · Institut IPB',
  description: "Remontées capillaires dans vos murs ? Causes, signes, processus de traitement par injection de résine hydrophobe (garantie 30 ans). Institut IPB Toulouse, Montauban, Auch.",
  keywords: ['remontée capillaire', 'humidité ascensionnelle', 'injection résine', 'mur humide', 'traitement humidité', 'salpêtre toulouse'],
  alternates: {
    canonical: 'https://www.ipb-expertise.fr/remontee-capillaire-solution',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

const faqItems = [
  {
    question: "Comment savoir si j'ai des remontées capillaires ?",
    answer: "Signes révélateurs : humidité au bas des murs (jusqu'à 1,5 m), salpêtre, peinture qui cloque, papier peint qui se décolle, odeur de moisi, plinthes qui gondolent. Notre humidimètre confirme la mesure.",
  },
  {
    question: "Quelle différence avec une infiltration ?",
    answer: "Les remontées capillaires viennent du sol et touchent le bas des murs sur toute la périphérie. Les infiltrations viennent de l'extérieur (toiture, façade, joint de menuiserie) et peuvent toucher n'importe quelle zone. Le diagnostic instrumenté distingue les deux.",
  },
  {
    question: "L'injection de résine est-elle efficace ?",
    answer: "Oui, c'est la solution la plus durable. La résine hydrophobe crée une barrière étanche au cœur du mur qui stoppe la remontée. Notre traitement est garanti 30 ans.",
  },
  {
    question: "Combien de temps pour que les murs sèchent ?",
    answer: "Le traitement est efficace immédiatement (la barrière hydrophobe est posée dès l'injection), mais le séchage des murs eux-mêmes prend 6 à 12 mois selon leur épaisseur et leur exposition. Un suivi est inclus à 3 et 6 mois.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqItems.map((item) => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": { "@type": "Answer", "text": item.answer },
  })),
};

export default function RemonteeCapillairePage() {
  return (
    <div className="font-sans bg-ipb-cream text-ipb-text antialiased">
      <Script id="faq-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <TopBar />
      <Navbar />
      <SmartBackBar />

      {/* Breadcrumb */}
      <div className="bg-ipb-cream border-b border-ipb-rule py-3">
        <div className="max-w-ipb mx-auto px-6 lg:px-12 text-sm text-ipb-muted">
          <Link href="/" className="hover:text-ipb-orange transition-colors">Accueil</Link>
          <span className="mx-2" aria-hidden="true">›</span>
          <Link href="/expert-humidite-toulouse-31" className="hover:text-ipb-orange transition-colors">Expert humidité</Link>
          <span className="mx-2" aria-hidden="true">›</span>
          <span className="text-ipb-text">Remontées capillaires</span>
        </div>
      </div>

      <main id="main-content">
        {/* HERO */}
        <section className="bg-ipb-cream">
          <div className="max-w-ipb mx-auto px-6 lg:px-12 pt-16 lg:pt-24 pb-20 lg:pb-28">
            <div className="max-w-3xl">
              <RevealOnScroll>
                <Eyebrow>Humidité ascensionnelle</Eyebrow>
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
                  Remontées capillaires&nbsp;à Toulouse.<br />
                  <em>Le guide complet.</em>
                </h1>
              </RevealOnScroll>
              <RevealOnScroll delay={0.12}>
                <p className="text-[15px] leading-[1.9] font-light text-ipb-muted mb-10 max-w-[620px]">
                  L'eau du sol remonte dans vos murs par capillarité. Ce guide détaille comment identifier le phénomène, ses causes en zone toulousaine, et la solution la plus durable — l'injection de résine hydrophobe garantie 30 ans.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.18}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <MagneticButton href="/diagnostic" variant="primary">
                    Diagnostic gratuit
                  </MagneticButton>
                  <MagneticButton href="/expert-humidite-toulouse-31" variant="ghost">
                    Voir notre méthode
                  </MagneticButton>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* CONTENU ÉDITORIAL */}
        <section className="bg-ipb-white py-24 lg:py-32">
          <div className="max-w-3xl mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <article className="prose prose-slate prose-lg max-w-none prose-headings:font-serif prose-headings:text-ipb-text prose-h2:text-[28px] prose-h2:mt-12 prose-h3:text-[20px] prose-p:text-[15px] prose-p:leading-[1.9] prose-p:font-light prose-p:text-ipb-muted prose-strong:text-ipb-text prose-strong:font-medium prose-a:text-ipb-orange prose-a:no-underline hover:prose-a:underline">
                <h2>Qu'est-ce que la remontée capillaire ?</h2>
                <p>
                  La <strong>remontée capillaire</strong> (ou humidité ascensionnelle) est un phénomène physique : l'eau contenue dans le sol remonte dans les murs par les micro-canaux de la maçonnerie, comme l'eau monte dans une éponge.
                </p>
                <p>
                  Ce phénomène peut faire monter l'humidité jusqu'à <strong>1,5 mètre de hauteur</strong>, voire plus dans certains cas. Il touche principalement les maisons anciennes sans coupure de capillarité, mais aussi les constructions récentes sur terrain humide.
                </p>

                <div className="not-prose bg-ipb-cream border-l-4 border-ipb-orange p-6 lg:p-7 my-10">
                  <p className="font-serif text-ipb-orange text-[12px] font-bold tracking-[0.18em] mb-3">CHIFFRES CLÉS</p>
                  <ul className="space-y-2 text-[14px] text-ipb-text">
                    <li>▸ <strong>30 %</strong> des maisons anciennes touchées en France</li>
                    <li>▸ Hauteur d'ascension typique : <strong>0,5 à 1,5 m</strong></li>
                    <li>▸ Évaporation : <strong>15 à 20 litres / jour</strong> par mètre linéaire de mur</li>
                  </ul>
                </div>

                <h2>Comment reconnaître les remontées capillaires ?</h2>

                <div className="not-prose bg-ipb-cream border border-ipb-rule rounded-[6px] p-6 lg:p-8 my-10">
                  <p className="font-serif text-ipb-orange text-[12px] font-bold tracking-[0.18em] mb-5">SIGNES RÉVÉLATEURS</p>
                  <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3 text-[14px] text-ipb-text">
                    <li className="flex items-start gap-3">
                      <span className="text-ipb-orange mt-1" aria-hidden="true">▸</span>
                      <span>Humidité au bas des murs (0 à 1,5 m)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-ipb-orange mt-1" aria-hidden="true">▸</span>
                      <span>Salpêtre — dépôts blancs poudreux</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-ipb-orange mt-1" aria-hidden="true">▸</span>
                      <span>Peinture qui cloque et se décolle</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-ipb-orange mt-1" aria-hidden="true">▸</span>
                      <span>Papier peint qui se décolle</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-ipb-orange mt-1" aria-hidden="true">▸</span>
                      <span>Plinthes qui gondolent</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-ipb-orange mt-1" aria-hidden="true">▸</span>
                      <span>Odeur de moisi persistante</span>
                    </li>
                  </ul>
                </div>

                <h2>Les causes des remontées capillaires</h2>

                <h3>1. Absence de coupure de capillarité</h3>
                <p>
                  Les maisons construites avant 1960 n'ont généralement pas de membrane étanche entre les fondations et les murs. C'est la cause principale, et elle concerne la majorité du bâti ancien toulousain.
                </p>

                <h3>2. Sols argileux ou humides</h3>
                <p>
                  En Occitanie (31, 82, 32), les sols argileux retiennent l'eau et alimentent en permanence les remontées capillaires. Plus de 80 % des sols de la Haute-Garonne sont concernés.
                </p>

                <h3>3. Nappe phréatique haute</h3>
                <p>
                  Dans certaines zones (bords de Garonne, vallées), la nappe phréatique est proche de la surface, amplifiant le phénomène en saison humide.
                </p>

                <h3>4. Enduits étanches inadaptés</h3>
                <p>
                  Un enduit ciment (imperméable) empêche l'évaporation et concentre l'humidité, aggravant les dégâts en hauteur. Toujours préférer un enduit à la chaux respirant sur du bâti ancien.
                </p>

                <h2>La solution : l'injection de résine hydrophobe</h2>
                <p>
                  C'est la méthode la plus efficace et la plus durable pour traiter les remontées capillaires. Elle crée une <strong>barrière étanche au cœur du mur</strong>, en pied de mur, qui bloque définitivement l'absorption d'eau du sol.
                </p>

                <h3>Le processus IPB</h3>
                <ol>
                  <li><strong>Diagnostic hygrométrique :</strong> mesure précise du taux d'humidité avec humidimètre à sonde et caméra thermique</li>
                  <li><strong>Forage :</strong> trous espacés de 10-15 cm à la base du mur, sur la périphérie concernée</li>
                  <li><strong>Injection :</strong> résine silicone ou silane injectée par gravité ou sous pression</li>
                  <li><strong>Polymérisation :</strong> la résine se diffuse dans la maçonnerie et forme une barrière étanche</li>
                  <li><strong>Suivi de séchage :</strong> les murs s'assèchent en 6 à 12 mois, suivi inclus à 3 et 6 mois</li>
                </ol>

                <div className="not-prose bg-ipb-cream border-l-4 border-ipb-orange p-6 lg:p-7 my-10">
                  <p className="font-serif text-ipb-orange text-[12px] font-bold tracking-[0.18em] mb-3">GARANTIE 30 ANS</p>
                  <p className="text-[14px] leading-[1.85] text-ipb-text">
                    Notre traitement par injection résine est garanti 30 ans contre les remontées capillaires. Si le problème réapparaît dans cette période, nous intervenons sans frais.
                  </p>
                </div>

                <h2>Tarifs traitement remontées capillaires</h2>
                <ul>
                  <li><strong>Diagnostic instrumenté :</strong> expertise sur site, montant déduit à 100 % des travaux si nous les réalisons</li>
                  <li><strong>Injection résine :</strong> 80 à 120 € par mètre linéaire de mur traité</li>
                  <li><strong>Maison individuelle type :</strong> 2 000 à 5 000 € selon le linéaire concerné</li>
                </ul>

                <h2>Les fausses solutions à éviter</h2>
                <ul>
                  <li><strong>Peinture anti-humidité :</strong> ne traite que le symptôme, pas la cause. L'humidité ressortira à côté.</li>
                  <li><strong>Enduit étanche au ciment :</strong> aggrave le problème en bloquant l'évaporation, fait monter l'humidité plus haut.</li>
                  <li><strong>Drainage périphérique seul :</strong> inefficace contre la capillarité, traite uniquement les infiltrations.</li>
                  <li><strong>Assécheurs électroniques :</strong> efficacité jamais démontrée scientifiquement.</li>
                </ul>
              </article>
            </RevealOnScroll>

            {/* Lien vers le HUB */}
            <div className="mt-16 bg-ipb-cream border border-ipb-rule rounded-[6px] p-8 lg:p-10">
              <p className="font-serif text-ipb-orange text-[12px] font-bold tracking-[0.18em] mb-3">EN SAVOIR PLUS</p>
              <h3 className="font-serif text-ipb-text font-bold text-[22px] leading-tight mb-3">
                Toutes les pathologies de l'humidité
              </h3>
              <p className="text-[14px] leading-[1.85] font-light text-ipb-muted mb-6">
                Consultez notre guide complet sur tous les problèmes d'humidité du bâti — remontées capillaires, salpêtre, moisissures, condensation, mérule.
              </p>
              <Link href="/expert-humidite-toulouse-31" className="text-[13px] text-ipb-orange font-medium hover:underline">
                Guide expert humidité Toulouse →
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-ipb-cream py-24 lg:py-32">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="text-center mb-16">
                <Eyebrow className="justify-center">Questions fréquentes</Eyebrow>
                <h2 className="font-serif text-ipb-text" style={{ fontSize: 'clamp(28px, 2.6vw, 38px)', lineHeight: 1.15, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  Sur les remontées<br /><em>capillaires.</em>
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

        {/* Articles connexes */}
        <nav aria-label="Articles connexes" className="bg-ipb-white py-20 lg:py-24">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <p className="text-2xl font-serif font-bold text-ipb-text mb-8 text-center">
              Articles connexes
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-ipb-rule border border-ipb-rule">
              {[
                { href: '/expertise/humidite', title: "Guide complet humidité", desc: 'Toutes nos solutions' },
                { href: '/salpetre-mur-traitement', title: 'Salpêtre', desc: 'Causes et traitement' },
                { href: '/moisissures-maison-sante', title: 'Moisissures', desc: 'Risques santé' },
                { href: '/expertise/fissures', title: 'Fissures structurelles', desc: 'Diagnostic et agrafage' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group block bg-ipb-white p-6 lg:p-7 hover:bg-ipb-stone transition-colors duration-300"
                >
                  <h3 className="font-serif text-ipb-text font-bold text-[16px] leading-tight mb-2 group-hover:text-ipb-orange transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[13px] leading-[1.7] font-light text-ipb-muted">
                    {item.desc}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <CtaFinal />
      </main>

      <Footer />
    </div>
  );
}
