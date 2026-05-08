/**
 * KeyTakeaways — bloc "L'essentiel" affiché en début d'article.
 *
 * Triple bénéfice :
 *  - Lisibilité : les lecteurs pressés ont la réponse en 5 secondes
 *  - SEO : Google indexe ce bloc comme passage citable (rich snippets)
 *  - AI Overviews : ChatGPT/Perplexity/AI Overviews citent en priorité ces points clés
 *
 * Style éditorial cohérent avec le reste de l'article (pas un encadré coloré
 * SaaS, mais un bloc sobre avec barre orange à gauche).
 */
interface KeyTakeawaysProps {
  items: string[];
}

export function KeyTakeaways({ items }: KeyTakeawaysProps) {
  if (!items.length) return null;

  return (
    <aside
      className="my-8 border-l-2 border-ipb-orange pl-6 py-2"
      aria-label="Points essentiels de l'article"
    >
      <p className="text-[10px] uppercase tracking-[0.18em] text-ipb-orange font-semibold mb-4">
        L'essentiel
      </p>
      <ul className="space-y-3 list-none p-0 m-0">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex gap-3 text-[14px] leading-[1.7] text-ipb-text font-light"
          >
            <span
              aria-hidden="true"
              className="font-serif text-ipb-orange font-bold flex-shrink-0 leading-[1.7]"
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <span dangerouslySetInnerHTML={{ __html: item }} />
          </li>
        ))}
      </ul>
    </aside>
  );
}
