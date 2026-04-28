/**
 * TrustRibbon — bandeau marquee mobile avec preuves sociales en continu.
 *
 * Mobile only (lg:hidden) — sur desktop la TopBar et la Navbar suffisent.
 * Marquee CSS pur infini (cf. animate-marquee dans globals.css).
 *
 * Côté "usine à lead" sobre : preuves sociales défilantes sans crier.
 * Pas d'icônes lucide criardes — juste typo et chiffres Playfair italique.
 */
const items = [
  { value: '850+', label: 'chantiers livrés' },
  { value: '4.9/5', label: 'Google · 47 avis' },
  { value: '10 ans', label: 'décennale AXA' },
  { value: '48h', label: 'délai de réponse' },
  { value: '7j', label: 'délai de visite' },
  { value: '2019', label: 'cabinet créé en' },
];

function RibbonItems({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <>
      {items.map((item, i) => (
        <span
          key={`${item.label}-${i}`}
          className="inline-flex items-center gap-2 mx-6 shrink-0"
          aria-hidden={ariaHidden || undefined}
        >
          <span className="font-serif italic text-ipb-orange text-[14px] font-bold leading-none">
            {item.value}
          </span>
          <span className="text-[11px] text-ipb-muted tracking-[0.06em]">
            {item.label}
          </span>
          <span className="text-ipb-rule mx-2" aria-hidden="true">·</span>
        </span>
      ))}
    </>
  );
}

export function TrustRibbon() {
  return (
    <div
      className="lg:hidden bg-ipb-stone border-b border-ipb-rule overflow-hidden"
      role="region"
      aria-label="Preuves de confiance du cabinet"
    >
      <div className="flex animate-marquee whitespace-nowrap py-2.5 will-change-transform">
        {/* Trois copies pour une boucle parfaitement fluide (translate -33.33%) */}
        <div className="flex shrink-0">
          <RibbonItems />
        </div>
        <div className="flex shrink-0">
          <RibbonItems ariaHidden />
        </div>
        <div className="flex shrink-0">
          <RibbonItems ariaHidden />
        </div>
      </div>
    </div>
  );
}
