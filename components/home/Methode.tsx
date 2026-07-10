import { Eyebrow } from '@/components/ui/Eyebrow';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';

/**
 * Méthode — l'accompagnement complet en 5 étapes.
 * Demandé explicitement par le client : "j'aime bien garder le".
 *
 * Format horizontal avec connecteur ligne.
 *
 * Cf. IPB_Design_Handoff.md §8 — Process
 */
const etapes = [
  {
    num: '01',
    titre: 'La visite',
    desc: "Sous 72 heures, un inspecteur IPB se déplace. Il observe, mesure, et vous écoute — ce que vous avez remarqué fait partie du diagnostic.",
  },
  {
    num: '02',
    titre: 'L’analyse',
    desc: "Le bâti se relit à froid : indices recoupés, hypothèses pesées, cause identifiée. Un avis sérieux ne se rend pas sur un pas de porte.",
  },
  {
    num: '03',
    titre: 'Le rapport d’inspection',
    desc: "Sous trois à cinq jours : mesures, photographies datées, cause identifiée, préconisations. Rédigé pour être compris — il vous appartient.",
  },
  {
    num: '04',
    titre: 'La suite, si vous le souhaitez',
    desc: "Si des travaux s'imposent et que vous préférez ne pas les piloter seul, nous pouvons en assurer la coordination. C'est un choix qui vous revient — le rapport se suffit à lui-même.",
  },
];

export function Methode() {
  return (
    <section className="bg-ipb-white py-24 lg:py-32">
      <div className="max-w-ipb mx-auto px-6 lg:px-12">
        <RevealOnScroll>
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <Eyebrow className="justify-center">Notre méthode</Eyebrow>
            <h2
              className="font-serif text-ipb-text"
              style={{
                fontSize: 'clamp(32px, 3vw, 46px)',
                lineHeight: 1.12,
                letterSpacing: '-0.022em',
                fontWeight: 700,
              }}
            >
              De la première visite<br />
              <em>au rapport qui décide.</em>
            </h2>
            <p className="text-[15px] leading-[1.9] font-light text-ipb-muted mt-6">
              Quatre étapes, un seul interlocuteur. Vous savez à chaque instant où en est votre dossier.
            </p>
          </div>
        </RevealOnScroll>

        <div className="relative">
          {/* Ligne connectrice horizontale (desktop) */}
          <div
            className="hidden lg:block absolute top-[31px] left-[10%] right-[10%] h-px bg-ipb-rule"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-6 relative">
            {etapes.map((etape, i) => (
              <RevealOnScroll key={etape.num} delay={i * 0.08}>
                <div className="relative text-center">
                  {/* Disque numéro */}
                  <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-ipb-cream border border-ipb-rule mb-6">
                    <span className="font-serif text-ipb-orange-d text-[15px] font-bold tracking-wider">
                      {etape.num}
                    </span>
                  </div>
                  <h3 className="font-serif text-ipb-text font-bold text-[19px] mb-3 leading-tight">
                    {etape.titre}
                  </h3>
                  <p className="text-[13px] leading-[1.75] font-light text-ipb-muted px-2">
                    {etape.desc}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
