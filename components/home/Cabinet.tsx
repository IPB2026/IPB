import Image from 'next/image';
import Link from 'next/link';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { StatCounter } from '@/components/ui/StatCounter';

/**
 * Cabinet — REMPLACE l'ancien TrustSignals "indépendants / tout en interne".
 *
 * Le brief client : "j'aime pas la section avec 'indépendants' et 'tout en
 * interne' c'est bullshit ça sert à rien, ça décrédibilise plus qu'autre
 * chose."
 *
 * Approche corrigée : pas de slogans, des FAITS VÉRIFIABLES.
 *  - Date de création (2019) → on peut vérifier au RCS
 *  - Nombre de chantiers (850+) → preuve sociale chiffrée
 *  - Note Google (4.9/5) → vérifiable en 1 clic
 *  - Décennale AXA active → numéro de police visible sur l'attestation
 *  - Photo + nom + parcours du fondateur (humanisation)
 *
 * Ton : neutre, factuel, posé. Pas de promesse.
 *
 * Cf. IPB_Design_Handoff.md §8 — Pourquoi IPB
 */
export function Cabinet() {
  return (
    <section className="bg-ipb-cream py-24 lg:py-32">
      <div className="max-w-ipb mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Photo Ludovic (5 col) */}
          <RevealOnScroll direction="left" className="lg:col-span-5">
            <div className="relative">
              <div className="aspect-[4/5] rounded-[6px] overflow-hidden bg-ipb-stone">
                <Image
                  src="/images/ludovic-expert-ipb.webp"
                  alt="Ludovic D., fondateur de l’institut IPB Expertise et ingénieur structure"
                  width={640}
                  height={800}
                  className="w-full h-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                />
              </div>

              {/* Légende sous la photo */}
              <div className="mt-6 pl-6 border-l border-ipb-orange">
                <p className="font-serif text-ipb-text text-2xl font-bold leading-tight mb-1">
                  Ludovic D.
                </p>
                <p className="text-[12px] text-ipb-muted uppercase tracking-[0.14em]">
                  Fondateur · Ingénieur structure
                </p>
              </div>
            </div>
          </RevealOnScroll>

          {/* Texte cabinet (7 col) */}
          <div className="lg:col-span-7">
            <RevealOnScroll>
              <Eyebrow>L’institut</Eyebrow>
              <h2
                className="font-serif text-ipb-text mb-8"
                style={{
                  fontSize: 'clamp(32px, 3vw, 46px)',
                  lineHeight: 1.12,
                  letterSpacing: '-0.022em',
                  fontWeight: 700,
                }}
              >
                Sept ans d'expérience.<br />
                <em>Une seule responsabilité.</em>
              </h2>
            </RevealOnScroll>

            <RevealOnScroll delay={0.06}>
              <div className="space-y-5 text-[15px] leading-[1.9] font-light text-ipb-muted mb-12">
                <p>
                  IPB Expertise est un institut créé en 2019, spécialisé en pathologie et structure du bâtiment. Notre activité couvre deux missions distinctes : le diagnostic et le traitement des fissures, l'étude et la réalisation d'ouvertures de murs porteurs.
                </p>
                <p>
                  Tout est traité en interne — l'étude technique par notre ingénieur, les travaux par nos équipes. Cette continuité explique pourquoi nos rapports sont reconnus par les assurances et pourquoi notre garantie décennale couvre l'étude comme la réalisation.
                </p>
              </div>
            </RevealOnScroll>

            {/* 4 chiffres factuels (PAS de slogans) */}
            <RevealOnScroll delay={0.12}>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-10 border-t border-ipb-rule">
                <div>
                  <p className="font-serif text-ipb-text font-bold leading-none mb-3" style={{ fontSize: 'clamp(40px, 4vw, 56px)' }}>
                    2019
                  </p>
                  <p className="text-[11px] text-ipb-light uppercase tracking-[0.14em]">
                    Année de création
                  </p>
                </div>
                <div>
                  <p className="font-serif text-ipb-text font-bold leading-none mb-3" style={{ fontSize: 'clamp(40px, 4vw, 56px)' }}>
                    <StatCounter value={850} /><span className="text-ipb-orange">+</span>
                  </p>
                  <p className="text-[11px] text-ipb-light uppercase tracking-[0.14em]">
                    Chantiers livrés
                  </p>
                </div>
                <div>
                  <p className="font-serif text-ipb-text font-bold leading-none mb-3" style={{ fontSize: 'clamp(40px, 4vw, 56px)' }}>
                    <StatCounter value={4.9} decimals={1} /><span className="text-ipb-light text-[60%]">/5</span>
                  </p>
                  <p className="text-[11px] text-ipb-light uppercase tracking-[0.14em]">
                    Avis Google (47)
                  </p>
                </div>
                <div>
                  <p className="font-serif text-ipb-text font-bold leading-none mb-3" style={{ fontSize: 'clamp(40px, 4vw, 56px)' }}>
                    AXA
                  </p>
                  <p className="text-[11px] text-ipb-light uppercase tracking-[0.14em]">
                    Décennale active
                  </p>
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.18}>
              <div className="mt-10 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                <Link
                  href="/notre-expert"
                  className="inline-flex items-center gap-2 text-ipb-orange font-medium text-[13px] tracking-wide border-b border-ipb-orange pb-1 hover:gap-3 transition-all"
                >
                  Découvrir le parcours de l’institut →
                </Link>
                <span className="text-ipb-light text-[12px] hidden sm:inline">·</span>
                <Link
                  href="/contact"
                  className="text-ipb-muted hover:text-ipb-text font-light text-[13px] tracking-wide transition-colors"
                >
                  Demander l'attestation décennale
                </Link>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
