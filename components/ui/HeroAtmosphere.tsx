/**
 * HeroAtmosphere — couches atmosphériques du panel navy du Hero.
 *
 * Deux couches purement décoratives (aria-hidden) qui font respirer le panneau :
 *   1. Lueur orange diffuse derrière la fissure (radial gradient, pulse 22s)
 *   2. Grain texturé blanc qui drift doucement (overlay 28s)
 *
 * Animations CSS pures, GPU-friendly. Désactivées via prefers-reduced-motion
 * (cf. globals.css @media reduce).
 */
export function HeroAtmosphere() {
  return (
    <>
      <div
        className="ipb-glow absolute inset-0 z-0"
        aria-hidden="true"
      />
      <div
        className="ipb-grain absolute inset-0 z-0 opacity-[0.18]"
        aria-hidden="true"
      />
    </>
  );
}
