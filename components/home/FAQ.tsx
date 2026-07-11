import Link from 'next/link';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';

/**
 * FAQ — questions construites depuis les requêtes Google réelles
 * extraites du Search Console (3 mois, avril 2026).
 *
 * Top requêtes adressées :
 *  - "expert fissure toulouse" (318 imp) → Q1 + Q3
 *  - "prix maison fissurée" (46 imp) → Q2
 *  - "expert fissure tarn et garonne" (276 imp) → Q1
 *  - "expertise fissure haute garonne" (153 imp) → Q1
 *  - thème assurance fissures (récurrent) → Q4
 *
 * Cf. PLAN_REFONTE_V2.md vague E
 */
const faqs = [
  {
    q: "Comment savoir si une fissure sur ma maison est dangereuse ?",
    a: "Trois indices doivent vous alerter : une ouverture supérieure à 2 mm, un tracé en escalier suivant les joints, une évolution d'une saison à l'autre. Des portes qui coincent ou un carrelage qui se fissure indiquent que le bâti travaille. Dans ces cas, une inspection s'impose : un inspecteur IPB mesure l'évolution au fissuromètre et identifie la cause.",
  },
  {
    q: "Comment se passe un diagnostic de fissures à Toulouse ?",
    a: "La visite est réalisée à votre domicile par un inspecteur IPB : déplacement, mesures au fissuromètre, analyse des causes et rapport d'inspection écrit. Pour les dossiers CAT-NAT, ce rapport documente le lien entre les désordres et la sécheresse ; si un rapport opposable à votre assureur est requis, nous vous orientons vers un bureau d'études ou un expert judiciaire.",
  },
  {
    q: "Mon assurance prend-elle en charge les fissures de sécheresse ?",
    a: "Oui, si votre commune a été reconnue en catastrophe naturelle pour la sécheresse de l'année concernée. Le rapport d'inspection remis à l'issue de la visite documente les désordres et leur lien avec le retrait-gonflement des argiles, ce qui est essentiel pour étayer votre dossier. En 2022, plus de 9 000 communes françaises ont été reconnues, dont une grande partie de la Haute-Garonne.",
  },
  {
    q: "Quelle est la différence entre agrafage et micropieux ?",
    a: "L'agrafage stabilise le mur en cousant la fissure avec des aciers inoxydables — solution adaptée à la plupart des fissures structurelles. Les micropieux reprennent les fondations en profondeur — intervention lourde réservée aux tassements actifs majeurs. Le rôle d'IPB est de diagnostiquer la cause et de vous dire laquelle s'impose vraiment. Les interventions qui engagent les fondations relèvent de spécialistes : nous vous y orientons, votre dossier en main.",
  },
  {
    q: "Votre rapport d'inspection est-il opposable ?",
    a: "Le rapport d'inspection IPB est un document technique complet : mesures instrumentées, photographies datées, cause identifiée, préconisations. Il sert vos démarches auprès d'un assureur, d'un syndic ou d'un vendeur. Pour une procédure judiciaire ou un dossier d'assurance contesté, un rapport de bureau d'études ou d'expert judiciaire peut être requis : nous vous orientons alors, votre dossier en main.",
  },
  {
    q: "Réalisez-vous les travaux ?",
    a: "Non. Si des travaux s'imposent et que vous souhaitez être accompagné, nous en coordonnons la réalisation par des entreprises couvertes par leur garantie décennale : cadrage du devis, suivi du chantier, réception. Vous pouvez aussi ne nous demander que le rapport — il se suffit à lui-même.",
  },
  {
    q: "Pourquoi choisir un institut spécialisé en pathologie du bâtiment ?",
    a: "Parce qu'un désordre du bâti se juge sur pièces : mesures, comparaisons, expérience des mêmes causes dans les mêmes sols. C'est un métier de discernement — savoir ce qui est grave, ce qui ne l'est pas, et le dire clairement dans les deux cas.",
  },
  {
    q: "Quelles sont vos zones d'intervention ?",
    a: "Notre zone d'intervention couvre la Haute-Garonne (31), le Tarn-et-Garonne (82), le Gers (32), le Tarn (81), l'Ariège (09) et l'Aude (11). Cela représente plus de 50 communes — pour vérifier la couverture sur votre commune précise, appelez-nous au 05 82 95 33 75 ou faites notre pré-diagnostic en ligne (2 minutes).",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(({ q, a }) => ({
    "@type": "Question",
    "name": q,
    "acceptedAnswer": { "@type": "Answer", "text": a },
  })),
};

export function FAQ() {
  return (
    <section className="bg-ipb-white py-24 lg:py-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="max-w-ipb mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Côté gauche : titre */}
          <div className="lg:col-span-4">
            <RevealOnScroll>
              <div className="lg:sticky lg:top-24">
                <Eyebrow>Questions fréquentes</Eyebrow>
                <h2
                  className="font-serif text-ipb-text mb-8"
                  style={{
                    fontSize: 'clamp(32px, 3vw, 46px)',
                    lineHeight: 1.12,
                    letterSpacing: '-0.022em',
                    fontWeight: 700,
                  }}
                >
                  Ce qu'on nous demande<br /><em>le plus souvent.</em>
                </h2>
                <p className="text-[15px] leading-[1.9] font-light text-ipb-muted mb-8">
                  Si votre question ne figure pas ci-contre, écrivez-nous ou appelez l'institut directement.
                </p>
                <div className="space-y-3">
                  <Link href="/diagnostic" className="inline-flex items-center gap-2 text-ipb-orange-d font-medium text-[14px] tracking-wide border-b border-ipb-orange-d pb-1 hover:gap-3 transition-all">
                    Faire mon pré-diagnostic (2 min) →
                  </Link>
                  <a href="tel:0582953375" className="block text-ipb-muted font-light text-[14px] hover:text-ipb-text transition-colors">
                    05 82 95 33 75
                  </a>
                </div>
              </div>
            </RevealOnScroll>
          </div>

          {/* Côté droit : liste FAQ */}
          <div className="lg:col-span-8">
            <div className="border-t border-ipb-rule">
              {faqs.map((item, i) => (
                <RevealOnScroll key={item.q} delay={i * 0.03}>
                  <details className="group border-b border-ipb-rule">
                    <summary className="cursor-pointer list-none flex items-start justify-between gap-6 py-6 lg:py-7 hover:bg-ipb-stone/30 px-2 -mx-2 transition-colors">
                      <h3 className="font-serif text-ipb-text font-bold text-[17px] leading-tight pr-2">
                        {item.q}
                      </h3>
                      <span className="text-ipb-orange text-2xl leading-none flex-shrink-0 transition-transform group-open:rotate-45 font-light" aria-hidden="true">
                        +
                      </span>
                    </summary>
                    <div className="px-2 pb-6 -mt-2 text-[14px] leading-[1.85] font-light text-ipb-muted">
                      {item.a}
                    </div>
                  </details>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
