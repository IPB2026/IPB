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
  title: "L'institut IPB · Pathologie & structure du bâtiment · Occitanie",
  description: "IPB est un institut indépendant de diagnostic en pathologie du bâtiment : fissures, humidité, expertise avant achat et avant vente. Un rapport clair, en toute indépendance. ☎ 05 82 95 33 75",
  keywords: ['institut pathologie bâtiment toulouse', 'expert fissures toulouse', 'expertise structure toulouse', "expertise bâtiment Haute-Garonne"],
  alternates: { canonical: 'https://www.ipb-expertise.fr/notre-expert' },
  openGraph: {
    title: "L'institut IPB · Pathologie & structure du bâtiment · Occitanie",
    description: "Institut indépendant de coordination. Diagnostic et travaux exécutés sous décennale par les équipes du réseau IPB.",
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
  // foundingDate = date d'immatriculation de l'EI IPB (2022). Le « réseau IPB »
  // au sens marketing fonctionne depuis 2019, mais l'entité juridique date de 2022.
  "foundingDate": "2022",
  "description": "Institut indépendant de coordination spécialisé dans la pathologie et la structure du bâtiment. Diagnostic et travaux exécutés sous décennale par les équipes du réseau IPB.",
  "areaServed": [
    { "@type": "AdministrativeArea", "name": "Haute-Garonne" },
    { "@type": "AdministrativeArea", "name": "Tarn-et-Garonne" },
    { "@type": "AdministrativeArea", "name": "Gers" },
    { "@type": "AdministrativeArea", "name": "Tarn" },
  ],
};

const certifications = [
  { name: "Garantie décennale 10 ans sur les travaux", detail: "Travaux d'agrafage, traitement humidité, ouverture de mur porteur et finitions exécutés par les équipes du réseau IPB, sous décennale." },
  { name: "RC pro IPB", detail: "Responsabilité civile professionnelle de l'institut au titre de ses activités de coordination, d'intermédiation et de production du dossier de synthèse." },
  { name: "Rapports reconnus par les assurances", detail: "Documents techniques rédigés dans les formes attendues par les assureurs et utilisés régulièrement dans les dossiers CAT-NAT et recours décennale." },
];

const valeurs = [
  { titre: "Continuité", desc: "Diagnostic, étude et travaux conduits selon un même protocole, sous une seule coordination. Un seul interlocuteur, du premier appel à la livraison." },
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
                  src="/images/ludovic-expert-ipb.webp"
                  alt="Ludovic, expert structure partenaire du réseau IPB"
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
                  Un institut spécialisé.<br />
                  <em>Un interlocuteur unique.</em>
                </h1>
              </RevealOnScroll>
              <RevealOnScroll delay={0.12}>
                <p className="text-[15px] leading-[1.9] font-light text-ipb-muted mb-6">
                  IPB est un institut indépendant de diagnostic, spécialisé dans la pathologie et la structure du bâtiment. Basé à Toulouse, il intervient en Occitanie. Son champ d'action : fissures, humidité, diagnostic du bâti avant achat et avant vente — tout ce qui touche à la solidité d'un bâti et à la lecture de ses désordres.
                </p>
                <p className="text-[15px] leading-[1.9] font-light text-ipb-muted mb-6">
                  L'institut qualifie le besoin, oriente le dossier, et coordonne sa conduite jusqu'à la livraison. Le diagnostic technique et les travaux sont confiés à des artisans structure intégrés au réseau IPB — formés à notre protocole, titulaires de leur propre décennale. Du premier appel à la dernière finition, vous n'avez qu'un seul interlocuteur, et une seule responsabilité de coordination en face de vous.
                </p>
                <p className="text-[15px] leading-[1.9] font-light text-ipb-muted mb-10">
                  Le réseau IPB est actif depuis 2019 en Haute-Garonne, dans le Tarn-et-Garonne, le Gers et le Tarn. Plus de 850 chantiers ont été menés ; le réseau traite en moyenne soixante-dix dossiers fissures par an, en complément des expertises humidité, avant achat, et des ouvertures de murs porteurs.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.18}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <MagneticButton href="/diagnostic" variant="primary">
                    Mon diagnostic en 2 min
                  </MagneticButton>
                  <MagneticButton href="/contact" variant="ghost">
                    Demander un rappel
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
                { value: 2019, label: 'Réseau IPB actif depuis', sublabel: 'Occitanie' },
                { value: 850, suffix: '+', label: 'Chantiers · réseau IPB', sublabel: 'Menés en Occitanie' },
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
