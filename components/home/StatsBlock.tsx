import { Eyebrow } from '@/components/ui/Eyebrow';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { StatItem } from '@/components/ui/StatItem';

/**
 * StatsBlock — chiffres monumentaux fond navy.
 *
 * Cf. IPB_Design_Handoff.md §8 Homepage section 5
 */
const stats = [
  { value: 850, suffix: '+', label: 'Chantiers livrés', sublabel: '2019 — 2026' },
  { value: 4.9, decimals: 1, suffix: '/5', label: 'Avis Google', sublabel: 'Vérifiés sur Google' },
  { value: 10, suffix: ' ans', label: 'Décennale AXA', sublabel: 'Étude + travaux' },
  { value: 7, suffix: ' j', label: 'Délai de visite', sublabel: 'Moyenne constatée' },
];

export function StatsBlock() {
  return (
    <section className="bg-ipb-navy py-24 lg:py-32 relative overflow-hidden">
      <div className="max-w-ipb mx-auto px-6 lg:px-12 relative z-10">
        <RevealOnScroll variant="editorial">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <Eyebrow variant="dark" className="justify-center">L’institut en chiffres</Eyebrow>
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
            <StatItem
              key={stat.label}
              value={stat.value}
              decimals={stat.decimals}
              suffix={stat.suffix}
              label={stat.label}
              sublabel={stat.sublabel}
              delay={i * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
