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
  title: 'L’institut · Ludovic D. · IPB Toulouse',
  description: "IPB est un institut de pathologie et de structure du bâtiment fondé en 2019 à Toulouse. Ludovic D. en est le fondateur, ingénieur structure. 850 chantiers livrés en Occitanie.",
  keywords: ['institut pathologie bâtiment toulouse', 'expert fissures toulouse', "Ludovic IPB", 'ingénieur structure toulouse', "expertise bâtiment Haute-Garonne"],
  alternates: { canonical: 'https://www.ipb-expertise.fr/notre-expert' },
  openGraph: {
    title: 'L’institut · Ludovic D. · IPB Toulouse',
    description: "Institut de pathologie et de structure du bâtiment fondé en 2019 à Toulouse. 850 chantiers livrés.",
    url: 'https://www.ipb-expertise.fr/notre-expert',
    type: 'profile',
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Ludovic D.",
  "jobTitle": "Fondateur · Ingénieur structure",
  "worksFor": {
    "@type": "Organization",
    "name": "IPB - Institut de Pathologie du Bâtiment",
    "url": "https://www.ipb-expertise.fr",
  },
  "image": "https://www.ipb-expertise.fr/images/ludovic-expert-ipb.webp",
  "description": "Ingénieur structure spécialisé en diagnostic de fissures et ouverture de mur porteur. 15 ans d'expérience dans le bâtiment, 850 chantiers livrés en Occitanie depuis la création d'IPB en 2019.",
};

const certifications = [
  { name: 'Diplôme d\'ingénieur structure', detail: '15 ans de pratique en bâtiment' },
  { name: 'Garantie décennale active', detail: 'AXA France IARD · Police active depuis 2019' },
  { name: 'Responsabilité civile professionnelle', detail: 'AXA France · Étendue à toute la mission' },
];

const valeurs = [
  { titre: "Indépendance", desc: "Aucun partenariat avec un fabricant. Le diagnostic guide la solution, jamais l'inverse." },
  { titre: "Continuité", desc: "L'étude technique et les travaux sont réalisés par le même institut. Une seule responsabilité, une seule garantie." },
  { titre: "Documentation", desc: "Chaque intervention est documentée : photos, mesures, plans, attestations. Le dossier est à vous à la livraison." },
];

export default function NotreExpertPage() {
  return (
    <div className="font-sans bg-ipb-cream text-ipb-text antialiased">
      <Script id="person-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />

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
                  alt="Ludovic D., fondateur de l’institut IPB Expertise et ingénieur structure"
                  fill
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover"
                  priority
                />
              </div>
            </RevealOnScroll>

            <div>
              <RevealOnScroll delay={0.06}>
                <Eyebrow>L’institut</Eyebrow>
                <h1
                  className="font-serif text-ipb-text mb-8"
                  style={{
                    fontSize: 'clamp(40px, 4vw, 62px)',
                    lineHeight: 1.06,
                    letterSpacing: '-0.025em',
                    fontWeight: 700,
                  }}
                >
                  Ludovic D.<br />
                  <em>Fondateur, ingénieur structure.</em>
                </h1>
              </RevealOnScroll>
              <RevealOnScroll delay={0.12}>
                <p className="text-[15px] leading-[1.9] font-light text-ipb-muted mb-6">
                  J'ai créé IPB en 2019 après quinze ans passés sur des chantiers de bâtiment et en bureau d'études. L'idée était simple : faire le diagnostic et les travaux dans le même institut, sans renvoyer le client d'un prestataire à l'autre, et sans vendre une solution préconçue.
                </p>
                <p className="text-[15px] leading-[1.9] font-light text-ipb-muted mb-10">
                  Aujourd'hui, nous sommes huit. L'équipe travaille en Haute-Garonne, dans le Tarn-et-Garonne, le Gers et le Tarn. Nous traitons en moyenne soixante-dix dossiers par an — diagnostic de fissures, ouverture de mur porteur, expertises avant achat. Chaque chantier est documenté, signé, garanti.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.18}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <MagneticButton href="/diagnostic" variant="primary">
                    Diagnostic gratuit
                  </MagneticButton>
                  <MagneticButton href="/contact" variant="ghost">
                    Écrire à l’institut
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
                { value: 8, label: 'Personnes à l’institut', sublabel: 'Étude + travaux' },
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
                <p className="mt-6 text-[14px] leading-[1.85] font-light text-white/55">
                  Notre attestation décennale et notre RCP sont remises sur simple demande, avec le devis. Vous pouvez les transmettre à votre notaire, votre assureur ou votre conseil avant tout engagement.
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
                        <p className="text-[13px] leading-[1.6] font-light text-white/55">
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
