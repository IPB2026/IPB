import { Metadata } from 'next';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { CtaFinal } from '@/components/home/CtaFinal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { StatCounter } from '@/components/ui/StatCounter';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Avis clients · 4.9/5 sur Google · IPB Toulouse',
  description: "Avis vérifiés de nos clients en Occitanie : 4.9/5 sur Google, 47 avis. Diagnostic de fissures, ouverture de mur porteur, expertise avant achat. Toulouse, Montauban, Auch, Albi.",
  keywords: ['avis IPB', 'avis expert fissures toulouse', 'témoignages clients cabinet', 'IPB expertise avis', 'note google'],
  alternates: { canonical: 'https://www.ipb-expertise.fr/avis-clients' },
  openGraph: {
    title: 'Avis clients · 4.9/5 sur Google · IPB Toulouse',
    description: "47 avis vérifiés de clients en Occitanie. Cabinet de pathologie du bâtiment.",
    url: 'https://www.ipb-expertise.fr/avis-clients',
  },
};

const reviews = [
  {
    author: 'Marie L.', location: 'Toulouse',
    date: '2026-01-15',
    text: "Fissures importantes sur ma maison des années 70. IPB a fait le diagnostic en 48h et l'agrafage en 3 jours. Le travail est impeccable, l'équipe très professionnelle.",
    service: 'Agrafage de fissures',
  },
  {
    author: 'Pierre D.', location: 'Blagnac',
    date: '2026-01-08',
    text: "Notre projet d'ouverture de mur porteur entre cuisine et séjour s'est déroulé exactement comme prévu. Devis ferme, planning tenu, finitions soignées. La maison a complètement changé.",
    service: 'Ouverture mur porteur',
  },
  {
    author: 'Sophie M.', location: 'Montauban',
    date: '2025-12-20',
    text: "Le diagnostic a été très complet. L'expert a pris le temps d'expliquer l'origine des fissures et les solutions possibles. Le rapport est détaillé et bien présenté pour mon assurance.",
    service: 'Diagnostic de fissures',
  },
  {
    author: 'Jean-Marc B.', location: 'Colomiers',
    date: '2025-12-10',
    text: "Avant d'acheter notre maison, j'ai demandé une expertise structure à IPB. Le rapport a permis de négocier une décote de 15 000 €. Investissement rentabilisé instantanément.",
    service: 'Expertise avant achat',
  },
  {
    author: 'Catherine R.', location: 'Tournefeuille',
    date: '2025-11-28',
    text: "Fissure apparue après la sécheresse de 2022. Intervention rapide d'IPB pour le diagnostic, dossier transmis à l'assurance qui a indemnisé sans difficulté. Très rassurée.",
    service: 'Diagnostic + Agrafage',
  },
  {
    author: 'François L.', location: 'Auch',
    date: '2025-11-15',
    text: "Maison ancienne avec plusieurs désordres structurels. IPB a proposé une approche globale, claire, à mon budget. Le suivi de chantier a été régulier, je n'ai jamais été dans le flou.",
    service: 'Diagnostic complet',
  },
  {
    author: 'Isabelle G.', location: 'Cugnaux',
    date: '2025-11-01',
    text: "Travail effectué correctement. Seul bémol : délai un peu long pour obtenir un rendez-vous (3 semaines). Mais le résultat est là, et le rapport est clair.",
    service: 'Agrafage de fissures',
  },
  {
    author: 'Michel T.', location: 'Muret',
    date: '2025-10-20',
    text: "Expert très compétent qui a su identifier l'origine exacte des fissures (sol argileux + sécheresse). Devis détaillé, travaux conformes au plan. La garantie décennale est rassurante.",
    service: 'Diagnostic + Agrafage',
  },
  {
    author: 'Yusra G.', location: 'Toulouse',
    date: '2026-01-22',
    text: "Cabinet sérieux et à l'écoute. Le diagnostic a été clair, l'intervention efficace, l'équipe ponctuelle et soignée — on sent qu'ils prennent le temps d'expliquer ce qu'ils font.",
    service: 'Diagnostic structure',
  },
];

const reviewsSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.ipb-expertise.fr#organization",
  "name": "IPB - Institut de Pathologie du Bâtiment",
  "image": "https://www.ipb-expertise.fr/images/IPB_Logo_HD.png",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "13 rue du Recteur Dottin",
    "addressLocality": "Toulouse",
    "postalCode": "31100",
    "addressCountry": "FR"
  },
  "telephone": "+33582953375",
  "url": "https://www.ipb-expertise.fr",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "bestRating": "5",
    "worstRating": "1",
    "reviewCount": "47"
  },
  "review": reviews.map(r => ({
    "@type": "Review",
    "author": { "@type": "Person", "name": r.author },
    "datePublished": r.date,
    "reviewBody": r.text,
    "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5", "worstRating": "1" }
  }))
};

function formatDate(d: string) {
  const [, m, day] = d.split('-');
  const months = ['', 'janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
  return `${parseInt(day, 10)} ${months[parseInt(m, 10)]}`;
}

export default function AvisClientsPage() {
  return (
    <div className="font-sans bg-ipb-cream text-ipb-text antialiased">
      <Script id="reviews-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsSchema) }} />

      <TopBar />
      <Navbar />

      <main id="main-content">
        {/* HERO */}
        <section className="bg-ipb-cream pt-16 lg:pt-24 pb-16 lg:pb-20">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-12 gap-12 items-end">
              <RevealOnScroll className="lg:col-span-7">
                <Eyebrow>Avis clients</Eyebrow>
                <h1
                  className="font-serif text-ipb-text"
                  style={{
                    fontSize: 'clamp(40px, 4vw, 62px)',
                    lineHeight: 1.06,
                    letterSpacing: '-0.025em',
                    fontWeight: 700,
                  }}
                >
                  Quarante-sept avis,<br />
                  <em>une note constante.</em>
                </h1>
              </RevealOnScroll>

              <RevealOnScroll delay={0.06} className="lg:col-span-5 lg:border-l lg:border-ipb-rule lg:pl-12">
                <p className="font-serif text-ipb-text font-bold leading-none mb-3" style={{ fontSize: 'clamp(56px, 5.4vw, 84px)' }}>
                  <StatCounter value={4.9} decimals={1} /><span className="text-ipb-light">/5</span>
                </p>
                <p className="text-[12px] text-ipb-text uppercase tracking-[0.14em] font-medium mb-1">
                  Note moyenne sur Google
                </p>
                <p className="text-[13px] font-light text-ipb-muted leading-[1.7]">
                  47 avis vérifiés depuis 2019 · Mis à jour mensuellement
                </p>
                <a
                  href="https://maps.app.goo.gl/6yDtzs7D1UcKSdJf6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-ipb-orange font-medium text-[13px] tracking-wide border-b border-ipb-orange pb-1 hover:gap-3 transition-all mt-6"
                >
                  Lire les avis sur Google →
                </a>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* GRILLE AVIS */}
        <section className="bg-ipb-white py-20 lg:py-28">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {reviews.map((r, i) => (
                <RevealOnScroll key={r.author + r.date} delay={(i % 3) * 0.06}>
                  <article className="bg-ipb-cream border border-ipb-rule rounded-[6px] p-7 lg:p-8 h-full flex flex-col">
                    <p className="text-[10px] text-ipb-light uppercase tracking-[0.16em] mb-4">
                      {r.service}
                    </p>
                    <blockquote className="font-serif text-ipb-text text-[16px] leading-[1.55] flex-1 mb-6">
                      <em className="not-italic text-ipb-orange text-2xl leading-none mr-1 align-top">«&nbsp;</em>
                      {r.text}
                      <em className="not-italic text-ipb-orange text-2xl leading-none ml-1 align-top">&nbsp;»</em>
                    </blockquote>
                    <footer className="flex items-center gap-3 pt-5 border-t border-ipb-rule">
                      <div className="h-px w-7 bg-ipb-orange flex-shrink-0" aria-hidden="true" />
                      <div className="flex-1">
                        <p className="font-serif text-ipb-text font-bold text-[14px] leading-tight">
                          {r.author}
                        </p>
                        <p className="text-[11px] text-ipb-light uppercase tracking-[0.12em] mt-0.5">
                          {r.location} · {formatDate(r.date)}
                        </p>
                      </div>
                    </footer>
                  </article>
                </RevealOnScroll>
              ))}
            </div>

            <div className="text-center mt-16">
              <a
                href="https://maps.app.goo.gl/6yDtzs7D1UcKSdJf6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-ipb-orange font-medium text-[14px] tracking-wide border-b border-ipb-orange pb-1 hover:gap-3 transition-all"
              >
                Voir tous les avis sur Google →
              </a>
            </div>
          </div>
        </section>

        <CtaFinal />
      </main>

      <Footer />
    </div>
  );
}
