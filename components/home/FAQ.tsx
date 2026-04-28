import Link from 'next/link';
import Script from 'next/script';
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
 *  - "ouverture mur porteur toulouse" (terrain à conquérir) → Q5 + Q6
 *  - thème assurance fissures (récurrent) → Q4
 *
 * Cf. PLAN_REFONTE_V2.md vague E
 */
const faqs = [
  {
    q: "Comment savoir si une fissure sur ma maison est dangereuse ?",
    a: "Trois indices doivent vous alerter : la fissure dépasse 2 mm de large, elle suit les joints en escalier, ou elle évolue (vous voyez qu'elle s'agrandit d'une saison à l'autre). Si vos portes coincent ou que du carrelage se fissure, c'est que la structure bouge. Notre institut vient sur place avec un fissuromètre pour mesurer précisément l'évolution et identifier la cause.",
  },
  {
    q: "Combien coûte une expertise fissures à Toulouse ?",
    a: "Notre diagnostic instrumenté complet est facturé 249 € TTC, déductibles si vous nous confiez ensuite les travaux. Pour comparaison, un constat d'huissier coûte 200 à 400 € sans expertise technique, et un expert d'assurance ne défend pas vos intérêts. Notre rapport est reconnu par les assurances et les tribunaux.",
  },
  {
    q: "Mon assurance prend-elle en charge les fissures de sécheresse ?",
    a: "Oui, si votre commune a été reconnue en catastrophe naturelle pour la sécheresse de l'année concernée. Notre rapport documente les désordres et leur lien avec le retrait-gonflement des argiles, ce qui est essentiel pour le dossier. En 2022, plus de 9 000 communes françaises ont été reconnues, dont une grande partie de la Haute-Garonne.",
  },
  {
    q: "Quelle est la différence entre agrafage et micropieux ?",
    a: "L'agrafage stabilise le mur en cousant la fissure avec des aciers inoxydables — solution adaptée à 90 % des fissures structurelles. Les micropieux reprennent les fondations en profondeur — solution lourde réservée aux tassements actifs majeurs (au-delà de 10 cm). Notre diagnostic détermine laquelle s'impose : un agrafage coûte 12 000 à 18 000 €, des micropieux 40 000 à 60 000 €.",
  },
  {
    q: "Faut-il déclarer une ouverture de mur porteur en mairie ?",
    a: "Pour une ouverture intérieure, une déclaration préalable suffit dans la majorité des communes. Pour une création de baie vitrée modifiant la façade, un permis de construire est généralement requis. En copropriété, un vote en assemblée générale est obligatoire. Notre institut prépare le dossier technique pour chacune de ces démarches.",
  },
  {
    q: "Combien de temps pour ouvrir un mur porteur dans un appartement ?",
    a: "L'intervention sur site dure 2 à 5 jours. La phase préparatoire (étude technique, démarches administratives, vote en AG si copropriété, commande de la poutre) prend 4 à 8 semaines en amont. Le calendrier complet est fixé avec vous avant le démarrage du chantier.",
  },
  {
    q: "Pourquoi choisir un institut indépendant plutôt qu'un artisan généraliste ?",
    a: "Un artisan ne calcule pas la structure — il pose ce qu'on lui dit de poser. Un sous-dimensionnement de poutre se traduit par des fissures, un affaissement du plancher, voire une rupture. Un institut de pathologie du bâtiment regarde, calcule, exécute et garantit l'ensemble. C'est la différence entre une intervention couverte par une décennale active et un risque non assuré.",
  },
  {
    q: "Vos rapports sont-ils acceptés par les assurances ?",
    a: "Oui. Nos rapports techniques sont rédigés dans les formes attendues par les assureurs et les tribunaux : photos datées, mesures instrumentées, identification des causes, préconisations chiffrées. Ils servent régulièrement de pièce technique dans les dossiers de catastrophe naturelle, les expertises judiciaires et les recours en garantie décennale.",
  },
  {
    q: "Intervenez-vous en dehors de Toulouse ?",
    a: "Notre zone d'intervention couvre la Haute-Garonne (31), le Tarn-et-Garonne (82), le Gers (32) et le Tarn (81). Cela représente plus de 50 communes : Montauban, Auch, Albi, Castres, Saint-Gaudens, Pamiers, et tous les villages alentour. Pour les communes plus éloignées, contactez-nous au 05 82 95 33 75.",
  },
  {
    q: "Que se passe-t-il après le chantier ?",
    a: "Vous recevez un dossier complet : calcul technique signé par notre ingénieur, plans d'exécution, photos avant/après, attestation de garantie décennale active. En cas de désordre dans les 10 ans suivant la livraison, notre responsabilité est engagée et nous intervenons sans frais.",
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
      <Script id="home-faq-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

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
                  Si votre question ne figure pas ci-contre, écrivez-nous ou appelez l’institut directement.
                </p>
                <div className="space-y-3">
                  <Link href="/diagnostic" className="inline-flex items-center gap-2 text-ipb-orange font-medium text-[14px] tracking-wide border-b border-ipb-orange pb-1 hover:gap-3 transition-all">
                    Diagnostic gratuit →
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
