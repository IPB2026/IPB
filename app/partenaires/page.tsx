import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { SmartBackBar } from "@/components/ui/SmartBackBar";
import { Footer } from '@/components/home/Footer';
import { CtaFinal } from '@/components/home/CtaFinal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Programme partenaires · Architectes, marchands de biens, agences · IPB Toulouse",
  description: "IPB est le partenaire structure des professionnels toulousains : architectes d'intérieur, marchands de biens, agences immobilières. Bureau d'études + travaux. Décennale AXA.",
  keywords: ['partenariat structure toulouse', 'sous-traitance bureau études', 'partenaire architecte intérieur', 'partenaire marchand de biens', 'partenaire agence immobilière'],
  alternates: { canonical: 'https://www.ipb-expertise.fr/partenaires' },
};

const partenaires = [
  {
    href: '/partenaires/architectes-interieur',
    num: '01',
    title: "Architectes d'intérieur & décorateurs",
    desc: "Vos projets « espace ouvert » nécessitent une étude de structure et une décennale. Nous sommes votre partenaire technique en sous-traitance ou co-traitance.",
    points: ['Co-traitance ou sous-traitance', 'Calcul technique signé par notre ingénieur', 'Tarif partenaire dès 3 projets par an'],
  },
  {
    href: '/partenaires/marchands-de-biens',
    num: '02',
    title: 'Marchands de biens & investisseurs',
    desc: "Vous achetez un T3 dans les Carmes, Saint-Cyprien ou Minimes pour ouvrir cuisine + salon avant revente ? Chiffrage sous 24 heures, chantier en 5 jours.",
    points: ['Devis sous 24 heures', 'Chantier en 5 jours en moyenne', 'Décennale transmissible à l\'acheteur final'],
  },
  {
    href: '/partenaires/agences-immobilieres',
    num: '03',
    title: 'Agences immobilières & mandataires',
    desc: "Une vente bloquée par une fissure inquiétante ou un mur porteur à valider ? Notre rapport sous 7 jours débloque la transaction.",
    points: ['Visite sous 48 heures', 'Rapport reconnu par les assurances sous 7 jours', 'Discrétion totale auprès du vendeur'],
  },
];

export default function PartenairesPage() {
  return (
    <div className="font-sans bg-ipb-cream text-ipb-text antialiased">
      <TopBar />
      <Navbar />
      <SmartBackBar />

      <main id="main-content">
        {/* HERO */}
        <section className="bg-ipb-cream pt-16 lg:pt-24 pb-16 lg:pb-20">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-12 gap-12 items-end">
              <RevealOnScroll className="lg:col-span-7">
                <Eyebrow>Programme pros</Eyebrow>
                <h1
                  className="font-serif text-ipb-text"
                  style={{
                    fontSize: 'clamp(40px, 4vw, 62px)',
                    lineHeight: 1.06,
                    letterSpacing: '-0.025em',
                    fontWeight: 700,
                  }}
                >
                  Le partenaire structure<br />
                  <em>des pros toulousains.</em>
                </h1>
              </RevealOnScroll>
              <RevealOnScroll delay={0.06} className="lg:col-span-5 lg:border-l lg:border-ipb-rule lg:pl-12">
                <p className="text-[15px] leading-[1.9] font-light text-ipb-muted">
                  Bureau d'études intégré, équipes travaux internes, décennale active. Trois programmes adaptés au métier de nos partenaires.
                </p>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* LISTE ARCHITECTURALE 3 PROGRAMMES */}
        <section className="bg-ipb-white py-16 lg:py-24">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <div className="border-t border-ipb-rule">
              {partenaires.map((p, i) => (
                <RevealOnScroll key={p.href} delay={i * 0.06}>
                  <Link
                    href={p.href}
                    className="group grid grid-cols-[56px_1fr_48px] lg:grid-cols-[80px_1fr_64px] gap-4 lg:gap-8 items-start py-10 lg:py-14 border-b border-ipb-rule hover:bg-ipb-stone/30 transition-colors px-2 -mx-2"
                  >
                    <span className="font-serif text-[12px] font-bold text-ipb-rule group-hover:text-ipb-orange transition-colors tracking-wider pt-2">
                      {p.num}
                    </span>
                    <div>
                      <h2
                        className="font-serif text-ipb-text mb-3 group-hover:text-ipb-orange transition-colors"
                        style={{ fontSize: 'clamp(22px, 2vw, 30px)', fontWeight: 700, lineHeight: 1.25 }}
                      >
                        {p.title}
                      </h2>
                      <p className="text-[15px] leading-[1.9] font-light text-ipb-muted max-w-[640px] mb-5">
                        {p.desc}
                      </p>
                      <ul className="space-y-1.5">
                        {p.points.map((pt) => (
                          <li key={pt} className="flex gap-3 text-[13px] text-ipb-muted leading-[1.7]">
                            <span className="text-ipb-orange flex-shrink-0">—</span>
                            {pt}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="w-10 h-10 rounded-full border-[1.5px] border-ipb-rule group-hover:border-ipb-orange flex items-center justify-center text-ipb-rule group-hover:text-ipb-orange transition-all justify-self-end mt-2">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-x-1" aria-hidden="true">
                        <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </Link>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* INFO BLOC */}
        <section className="bg-ipb-cream py-20 lg:py-24">
          <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
            <RevealOnScroll>
              <Eyebrow className="justify-center">Une autre activité ?</Eyebrow>
              <p className="font-serif text-ipb-text text-[22px] lg:text-[26px] leading-[1.4] mb-6">
                Promoteur, contractant général, syndic, expert d'assurance, notaire — appelez le cabinet, on adapte le cadre de collaboration à votre métier.
              </p>
              <a href="tel:0582953375" className="inline-flex items-center gap-2 text-ipb-orange font-medium text-[14px] tracking-wide border-b border-ipb-orange pb-1 hover:gap-3 transition-all">
                05 82 95 33 75 →
              </a>
            </RevealOnScroll>
          </div>
        </section>

        <CtaFinal />
      </main>

      <Footer />
    </div>
  );
}
