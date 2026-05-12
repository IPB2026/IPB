import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { SmartBackBar } from "@/components/ui/SmartBackBar";
import { Footer } from '@/components/home/Footer';
import { CtaFinal } from '@/components/home/CtaFinal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { StatCounter } from '@/components/ui/StatCounter';

export const metadata: Metadata = {
  title: "L'institut IPB · Diagnostic et travaux structure Toulouse",
  description: "L'institut IPB : équipe expérimentée en pathologie et structure du bâtiment. 850 chantiers en Occitanie depuis 2019. Décennale AXA. ☎ 05 82 95 33 75",
  keywords: ['institut pathologie bâtiment toulouse', 'expert fissures toulouse', 'expertise structure toulouse', "expertise bâtiment Haute-Garonne"],
  alternates: { canonical: 'https://www.ipb-expertise.fr/notre-expert' },
  openGraph: {
    title: "L'institut IPB · Diagnostic et travaux structure Toulouse",
    description: "Équipe expérimentée en pathologie et structure du bâtiment. 850 chantiers en Occitanie depuis 2019. Décennale AXA.",
    url: 'https://www.ipb-expertise.fr/notre-expert',
    type: 'website',
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "IPB — Institut de Pathologie du Bâtiment",
  "url": "https://www.ipb-expertise.fr",
  "logo": "https://www.ipb-expertise.fr/images/IPB_Logo_HD.png",
  "foundingDate": "2019",
  "description": "Institut spécialisé en pathologie et structure du bâtiment. Diagnostic et travaux sous garantie décennale AXA. Études techniques co-signées par notre bureau d'études structure partenaire.",
  "areaServed": [
    { "@type": "AdministrativeArea", "name": "Haute-Garonne" },
    { "@type": "AdministrativeArea", "name": "Tarn-et-Garonne" },
    { "@type": "AdministrativeArea", "name": "Gers" },
    { "@type": "AdministrativeArea", "name": "Tarn" },
  ],
};

const certifications = [
  { name: 'Garantie décennale active', detail: 'AXA France IARD — Construction BATISSUR · Police active depuis 2019' },
  { name: 'Responsabilité civile de l\'entreprise', detail: 'Étendue à toute la mission, avant et après réception des travaux' },
  { name: 'Bureau d\'études structure partenaire', detail: 'Notes de calcul opposables co-signées sous décennale études dédiée' },
];

const valeurs = [
  { titre: "Continuité", desc: "Le diagnostic, les préconisations et les travaux sont portés par la même équipe. Une seule responsabilité, une seule décennale." },
  { titre: "Sobriété", desc: "Nous décrivons ce que nous voyons, nous expliquons ce qu'il faut faire — sans surinvestir le vocabulaire. Si rien n'est urgent, nous le disons." },
  { titre: "Documentation", desc: "Chaque intervention est documentée : photos, mesures, plans, attestations. Le dossier complet est remis au client à la livraison." },
];

export default function NotreInstitutPage() {
  return (
    <div className="font-sans bg-ipb-cream text-ipb-text antialiased">
      <Script id="organization-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />

      <TopBar />
      <Navbar />
      <SmartBackBar />

      <main id="main-content">
        {/* HERO */}
        <section className="bg-ipb-cream">
          <div className="max-w-ipb mx-auto grid lg:grid-cols-[42fr_58fr] gap-12 lg:gap-20 px-6 lg:px-12 pt-16 lg:pt-24 pb-20 lg:pb-28 items-center">
            <RevealOnScroll direction="left">
              <div className="relative aspect-[4/5] rounded-[6px] overflow-hidden">
                <Image
                  src="/images/chantier-ouverture-mur-porteur.webp"
                  alt="Chantier IPB — ouverture de mur porteur en cours, étaiement et pose de poutre"
                  fill
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover"
                  priority
                />
              </div>
            </RevealOnScroll>

            <div>
              <RevealOnScroll delay={0.06}>
                <Eyebrow>L'institut</Eyebrow>
                <h1
                  className="font-serif text-ipb-text mb-8"
                  style={{
                    fontSize: 'clamp(40px, 4vw, 62px)',
                    lineHeight: 1.06,
                    letterSpacing: '-0.025em',
                    fontWeight: 700,
                  }}
                >
                  L'institut IPB.<br />
                  <em>Une équipe, une décennale, sept ans de bâti d'Occitanie.</em>
                </h1>
              </RevealOnScroll>
              <RevealOnScroll delay={0.12}>
                <p className="text-[15px] leading-[1.9] font-light text-ipb-muted mb-6">
                  L'institut a été fondé en 2019 sur une intuition simple : faire le diagnostic et les travaux dans la même main. Ne pas renvoyer le client d'un prestataire à l'autre. Ne pas vendre une solution préconçue.
                </p>
                <p className="text-[15px] leading-[1.9] font-light text-ipb-muted mb-6">
                  Sept ans plus tard, l'équipe est expérimentée, la décennale AXA est active, et 850 chantiers ont été signés en Haute-Garonne, dans le Tarn-et-Garonne, le Gers et le Tarn. Nous traitons en moyenne soixante-dix dossiers par an : diagnostic de fissures, ouverture de mur porteur, expertise avant achat.
                </p>
                <p className="text-[15px] leading-[1.9] font-light text-ipb-muted mb-10">
                  Lorsqu'un projet exige une note de calcul opposable, nous travaillons avec un bureau d'études structure partenaire qui co-signe l'étude sous sa propre décennale études. Le reste — diagnostic, pose, finitions — nous le portons.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.18}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <MagneticButton href="/diagnostic" variant="primary">
                    Diagnostic gratuit
                  </MagneticButton>
                  <MagneticButton href="/contact" variant="ghost">
                    Nous écrire
                  </MagneticButton>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* CHIFFRES */}
        <section className="bg-ipb-white py-20 lg:py-28 border-y border-ipb-rule">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
              {[
                { value: 2019, label: 'Année de création', sublabel: '7 ans d\'activité' },
                { value: 850, suffix: '+', label: 'Chantiers livrés', sublabel: 'Occitanie' },
                { value: 4, label: 'Départements', sublabel: '31 · 82 · 32 · 81' },
                { value: 4.9, decimals: 1, suffix: '/5', label: 'Avis Google', sublabel: 'Vérifiés sur Google' },
              ].map((s, i) => (
                <RevealOnScroll key={s.label} delay={i * 0.06}>
                  <div className="text-center lg:text-left">
                    <p className="font-serif text-ipb-text font-bold leading-none mb-3" style={{ fontSize: 'clamp(40px, 4.5vw, 64px)' }}>
                      <StatCounter value={s.value} decimals={s.decimals || 0} />
                      {s.suffix && <span className="text-ipb-orange">{s.suffix}</span>}
                    </p>
                    <p className="text-[12px] text-ipb-text uppercase tracking-[0.14em] font-medium mb-1">
                      {s.label}
                    </p>
                    <p className="text-[11px] text-ipb-light tracking-wide">{s.sublabel}</p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* VALEURS */}
        <section className="bg-ipb-cream py-24 lg:py-32">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <RevealOnScroll>
              <div className="text-center mb-16 max-w-2xl mx-auto">
                <Eyebrow className="justify-center">Notre approche</Eyebrow>
                <h2
                  className="font-serif text-ipb-text"
                  style={{ fontSize: 'clamp(32px, 3vw, 46px)', lineHeight: 1.12, letterSpacing: '-0.022em', fontWeight: 700 }}
                >
                  Trois principes,<br /><em>tenus à chaque chantier.</em>
                </h2>
              </div>
            </RevealOnScroll>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {valeurs.map((v, i) => (
                <RevealOnScroll key={v.titre} delay={i * 0.06}>
                  <article className="bg-ipb-white border border-ipb-rule rounded-[6px] p-8 lg:p-10 h-full">
                    <p className="font-serif text-ipb-orange text-[12px] font-bold tracking-wider mb-6">0{i + 1}</p>
                    <h3 className="font-serif text-ipb-text font-bold text-[24px] leading-tight mb-4">
                      {v.titre}
                    </h3>
                    <p className="text-[14px] leading-[1.85] font-light text-ipb-muted">
                      {v.desc}
                    </p>
                  </article>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* CERTIFICATIONS */}
        <section className="bg-ipb-navy py-24 lg:py-32">
          <div className="max-w-ipb mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              <RevealOnScroll className="lg:col-span-5">
                <Eyebrow variant="dark">Le sérieux</Eyebrow>
                <h2 className="font-serif text-white" style={{ fontSize: 'clamp(28px, 2.6vw, 38px)', lineHeight: 1.15, letterSpacing: '-0.022em', fontWeight: 700 }}>
                  Des assurances actives,<br /><em>vérifiables.</em>
                </h2>
                <p className="mt-6 text-[14px] leading-[1.85] font-light text-white/75">
                  L'attestation décennale et la responsabilité civile sont remises sur simple demande, avec le devis. Vous pouvez les transmettre à votre notaire, votre assureur ou votre conseil avant tout engagement.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-ipb-orange-l font-medium text-[14px] tracking-wide border-b border-ipb-orange-l pb-1 hover:gap-3 transition-all mt-8"
                >
                  Demander les attestations →
                </Link>
              </RevealOnScroll>

              <div className="lg:col-span-7 space-y-1 lg:pl-8">
                {certifications.map((c, i) => (
                  <RevealOnScroll key={c.name} delay={0.08 + i * 0.06}>
                    <div className="grid grid-cols-[40px_1fr] gap-5 items-start py-6 border-b border-white/10">
                      <span className="font-serif text-ipb-orange-l text-[14px] font-bold tracking-wider pt-1">
                        0{i + 1}
                      </span>
                      <div>
                        <h3 className="font-serif text-white text-[18px] font-bold leading-tight mb-1">
                          {c.name}
                        </h3>
                        <p className="text-[13px] leading-[1.6] font-light text-white/75">
                          {c.detail}
                        </p>
                      </div>
                    </div>
                  </RevealOnScroll>
                ))}
              </div>
            </div>
          </div>
        </section>

        <CtaFinal />
      </main>

      <Footer />
    </div>
  );
}
