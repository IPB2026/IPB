import { Eyebrow } from '@/components/ui/Eyebrow';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { StaggerDigits } from '@/components/ui/StaggerDigits';

/**
 * CtaFinal — split éditorial : texte gauche / grand téléphone Playfair droite.
 *
 * Cf. IPB_Design_Handoff.md §8 — Homepage section 8
 */
export function CtaFinal() {
  return (
    <section className="bg-ipb-cream py-24 lg:py-32 border-t border-ipb-rule">
      <div className="max-w-ipb mx-auto px-6 lg:px-12">
        <RevealOnScroll>
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <Eyebrow>Démarrer un dossier</Eyebrow>
              <h2
                className="font-serif text-ipb-text mb-6"
                style={{
                  fontSize: 'clamp(36px, 3.6vw, 56px)',
                  lineHeight: 1.08,
                  letterSpacing: '-0.025em',
                  fontWeight: 700,
                }}
              >
                Un projet,<br />
                <em>une question.</em>
              </h2>
              <p className="text-[15px] leading-[1.9] font-light text-ipb-muted mb-10 max-w-[520px]">
                Décrivez-nous votre situation en quelques minutes. Notre institut vous répondra sous 24 heures, par téléphone ou par mail, selon ce que vous préférez.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <MagneticButton href="/diagnostic" variant="primary">
                  Décrire ma situation
                </MagneticButton>
                <MagneticButton href="/contact" variant="ghost">
                  Nous écrire
                </MagneticButton>
              </div>
            </div>

            <div className="lg:col-span-5 lg:border-l lg:border-ipb-rule lg:pl-12">
              <p className="text-[10px] text-ipb-light uppercase tracking-[0.18em] mb-4">
                Ou par téléphone
              </p>
              <a
                href="tel:0582953375"
                className="group relative inline-block font-serif text-ipb-text hover:text-ipb-orange transition-colors duration-500 leading-none mb-3"
                style={{
                  fontSize: 'clamp(34px, 3.6vw, 52px)',
                  letterSpacing: '-0.02em',
                  fontWeight: 700,
                }}
                aria-label="Téléphone : 05 82 95 33 75"
              >
                <StaggerDigits text="05 82 95 33 75" />
                <span
                  aria-hidden="true"
                  className="absolute left-0 right-0 -bottom-1 h-px bg-ipb-orange origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)]"
                />
              </a>
              <p className="text-[13px] font-light text-ipb-muted leading-[1.7]">
                Lundi au vendredi, 8h&nbsp;–&nbsp;19h.<br />
                Samedi sur rendez-vous.
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
