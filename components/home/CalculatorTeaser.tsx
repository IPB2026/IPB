import Link from 'next/link';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { MagneticButton } from '@/components/ui/MagneticButton';

/**
 * CalculatorTeaser — encart d'appel vers le calculateur de prix mur porteur.
 *
 * Pourquoi : le calculateur est un outil interactif à fort intent commercial
 * ("prix mur porteur Toulouse") qui n'était pas exposé sur la home. Cet encart
 * lui donne un point d'entrée visible, intégré entre la liste des services et
 * la méthode IPB.
 *
 * Pattern : preview éditoriale split — colonne gauche éditoriale + colonne
 * droite "fenêtre" sur l'outil avec mock des étapes.
 */
export function CalculatorTeaser() {
  return (
    <section className="bg-ipb-white py-24 lg:py-32">
      <div className="max-w-ipb mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-[5fr_7fr] gap-12 lg:gap-16 items-center">
          {/* Colonne éditoriale */}
          <RevealOnScroll>
            <Eyebrow>Outil interactif · sans inscription</Eyebrow>
            <h2
              className="font-serif text-ipb-text mb-6"
              style={{
                fontSize: 'clamp(32px, 3vw, 46px)',
                lineHeight: 1.12,
                letterSpacing: '-0.022em',
                fontWeight: 700,
              }}
            >
              Combien coûte<br />
              <em>l'ouverture de votre mur porteur&nbsp;?</em>
            </h2>
            <p className="text-[15px] leading-[1.85] font-light text-ipb-muted mb-8 max-w-[460px]">
              Quatre questions, deux minutes. Notre calculateur vous donne une fourchette précise, basée sur les chantiers réalisés ces derniers mois en Haute-Garonne, Tarn-et-Garonne, Gers, Tarn et Ariège. Sans inscription, sans engagement.
            </p>
            <MagneticButton href="/calcul-prix-mur-porteur" variant="primary">
              Lancer le calcul
            </MagneticButton>
          </RevealOnScroll>

          {/* Aperçu éditorial du calculateur */}
          <RevealOnScroll delay={0.12}>
            <Link
              href="/calcul-prix-mur-porteur"
              className="group block relative"
              aria-label="Accéder au calculateur de prix d'ouverture de mur porteur"
            >
              <div className="bg-ipb-cream border border-ipb-rule rounded-[6px] p-6 lg:p-10 group-hover:border-ipb-orange transition-colors duration-500">
                {/* Mock de l'interface */}
                <div className="flex items-center justify-between mb-8">
                  <p className="font-serif text-ipb-orange text-[11px] font-bold tracking-[0.18em]">
                    APERÇU DU CALCULATEUR
                  </p>
                  <span className="text-[11px] text-ipb-muted uppercase tracking-[0.14em]">
                    1 / 4
                  </span>
                </div>

                {/* Question simulée */}
                <p className="font-serif text-ipb-text font-bold text-[20px] lg:text-[24px] leading-tight mb-6">
                  Quel est le type d'ouverture envisagé&nbsp;?
                </p>

                {/* Options simulées */}
                <ul className="space-y-3 mb-8">
                  {[
                    'Cuisine ouverte sur séjour',
                    'Création de baie vitrée',
                    'Suite parentale étendue',
                    'Loft ou plateau',
                  ].map((option, i) => (
                    <li
                      key={option}
                      className={`flex items-center justify-between p-4 bg-ipb-white border rounded-[4px] transition-colors ${
                        i === 0
                          ? 'border-ipb-orange'
                          : 'border-ipb-rule group-hover:border-ipb-rule'
                      }`}
                    >
                      <span className="text-[14px] text-ipb-text font-medium">
                        {option}
                      </span>
                      <span
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          i === 0 ? 'border-ipb-orange' : 'border-ipb-rule'
                        }`}
                        aria-hidden="true"
                      >
                        {i === 0 && <span className="w-2 h-2 rounded-full bg-ipb-orange" />}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Footer avec bouton mock */}
                <div className="flex items-center justify-between pt-6 border-t border-ipb-rule">
                  <p className="text-[12px] text-ipb-muted">
                    Estimation transparente · données IPB Occitanie
                  </p>
                  <span className="text-[13px] text-ipb-orange font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Continuer
                    <span aria-hidden="true">→</span>
                  </span>
                </div>
              </div>

              {/* Bordure décorative subtile */}
              <div className="absolute -bottom-3 -right-3 w-full h-full bg-ipb-orange/5 rounded-[6px] -z-10 group-hover:bg-ipb-orange/10 transition-colors duration-500" aria-hidden="true" />
            </Link>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
