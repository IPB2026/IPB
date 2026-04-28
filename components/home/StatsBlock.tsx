import { Eyebrow } from '@/components/ui/Eyebrow';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { StatCounter } from '@/components/ui/StatCounter';

/**
 * StatsBlock — chiffres monumentaux fond navy.
 *
 * Cf. IPB_Design_Handoff.md §8 Homepage section 5
 */
const stats = [
  { value: 850, suffix: '+', label: 'Chantiers livrés', sublabel: '2019 — 2026' },
  { value: 4.9, decimals: 1, suffix: '/5', label: 'Avis Google', sublabel: '47 avis vérifiés' },
  { value: 10, suffix: ' ans', label: 'Décennale AXA', sublabel: 'Étude + travaux' },
  { value: 7, suffix: ' j', label: 'Délai de visite', sublabel: 'Moyenne constatée' },
];

export function StatsBlock() {
  return (
    <section className="bg-ipb-navy py-24 lg:py-32 relative overflow-hidden">
      <div className="max-w-ipb mx-auto px-6 lg:px-12 relative z-10">
        <RevealOnScroll>
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <Eyebrow variant="dark" className="justify-center">Le cabinet en chiffres</Eyebrow>
            <h2
              className="font-serif text-white"
              style={{
                fontSize: 'clamp(32px, 3vw, 46px)',
                lineHeight: 1.12,
                letterSpacing: '-0.022em',
                fontWeight: 700,
              }}
            >
              Pas des promesses,<br />
              <em>des faits.</em>
            </h2>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {stats.map((stat, i) => (
            <RevealOnScroll key={stat.label} delay={i * 0.08}>
              <div className="text-center lg:text-left lg:border-l lg:border-white/10 lg:pl-8">
                <p
                  className="font-serif text-white font-bold leading-[0.95] mb-4"
                  style={{ fontSize: 'clamp(60px, 6.5vw, 100px)', letterSpacing: '-0.03em' }}
                >
                  <StatCounter value={stat.value} decimals={stat.decimals || 0} />
                  <span className="text-ipb-orange-l">{stat.suffix}</span>
                </p>
                <p className="text-[13px] text-white uppercase tracking-[0.14em] font-medium mb-1">
                  {stat.label}
                </p>
                <p className="text-[11px] text-white/40 tracking-wide">{stat.sublabel}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
