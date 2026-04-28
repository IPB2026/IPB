import { Eyebrow } from '@/components/ui/Eyebrow';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';

/**
 * PullQuote — citation éditoriale de Ludovic, fond navy-2.
 * Ligne orange verticale à gauche.
 *
 * Cf. IPB_Design_Handoff.md §8 — Homepage section 2
 */
export function PullQuote() {
  return (
    <section className="bg-ipb-navy-2 py-24 lg:py-32">
      <div className="max-w-ipb mx-auto px-6 lg:px-12">
        <RevealOnScroll>
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-3">
              <Eyebrow variant="dark">Notre approche</Eyebrow>
            </div>
            <div className="lg:col-span-9 relative pl-6 lg:pl-10">
              <div className="absolute left-0 top-2 bottom-2 w-px bg-ipb-orange" aria-hidden="true" />
              <blockquote
                className="font-serif text-white leading-[1.18] tracking-[-0.022em]"
                style={{ fontSize: 'clamp(28px, 3.2vw, 44px)' }}
              >
                <em className="not-italic">«&nbsp;</em>
                Une fissure, un mur porteur, ce n'est pas un travail de bricolage. C'est de la structure. Notre métier, c'est de regarder, de calculer, et de construire — sans jamais vendre une solution qu'on ne ferait pas chez nous.
                <em className="not-italic">&nbsp;»</em>
              </blockquote>
              <footer className="mt-8 flex items-center gap-3">
                <div className="h-px w-9 bg-ipb-orange" aria-hidden="true" />
                <span className="text-white/60 text-[12px] uppercase tracking-[0.14em] font-medium">
                  Ludovic D. — Fondateur, ingénieur structure
                </span>
              </footer>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
