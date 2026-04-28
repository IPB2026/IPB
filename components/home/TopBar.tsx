/**
 * TopBar — bandeau navy ~36px en tête de page.
 * Style éditorial : pas de discours commercial, juste l'essentiel.
 *
 * Cf. IPB_Design_Handoff.md §5.7
 */
export function TopBar() {
  return (
    <div className="bg-ipb-navy text-white px-6 py-[9px]">
      <div className="max-w-ipb mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
        <div className="hidden md:flex items-center gap-6 text-[11px] tracking-[0.04em] text-white/35 uppercase">
          <span>Cabinet de pathologie du bâtiment</span>
          <span aria-hidden="true">·</span>
          <span>Toulouse · Montauban · Auch · Albi</span>
        </div>
        <div className="flex items-center gap-3 text-[11px] tracking-[0.04em]">
          <div className="w-1.5 h-1.5 bg-[#5CB85C] rounded-full animate-pulse" aria-hidden="true" />
          <span className="text-white/55">Cabinet ouvert</span>
          <span aria-hidden="true" className="text-white/20">—</span>
          <a
            href="tel:0582953375"
            className="text-white/55 hover:text-white transition-colors font-medium tracking-wide"
          >
            05 82 95 33 75
          </a>
        </div>
      </div>
    </div>
  );
}
