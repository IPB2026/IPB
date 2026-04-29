/**
 * MurPorteurDiagram — Infographie SVG inline pour la page expertise mur porteur.
 *
 * Trois panneaux éditoriaux : Avant · Pendant · Après.
 * Style trait fin (1.5 px), palette IPB (navy / orange / cream).
 * Annotations Playfair via classes Tailwind.
 *
 * Remplace /images/schema-ouverture-mur-porteur.webp (4 MB, qualité dégradée).
 * Léger (< 5 KB), scalable, accessible (role + aria-label).
 *
 * Cf. Plan de remédiation 2026-04-29 (point 3 — infographie).
 */

interface PanelProps {
  num: '01' | '02' | '03';
  titre: string;
  legende: string;
  children: React.ReactNode;
}

function Panel({ num, titre, legende, children }: PanelProps) {
  return (
    <div className="flex flex-col">
      {/* SVG carré */}
      <div className="aspect-square bg-ipb-cream border border-ipb-rule rounded-[6px] p-6 lg:p-8 flex items-center justify-center">
        {children}
      </div>

      {/* Légende sous le panneau */}
      <div className="mt-5">
        <p className="font-serif text-ipb-orange text-[12px] font-bold tracking-[0.16em] mb-2">
          ÉTAPE {num}
        </p>
        <h3 className="font-serif text-ipb-text font-bold text-[20px] leading-tight mb-2">
          {titre}
        </h3>
        <p className="text-[13px] leading-[1.7] font-light text-ipb-muted">
          {legende}
        </p>
      </div>
    </div>
  );
}

// ─── Constantes graphiques (couleurs centralisées) ───────────────
const C_NAVY = '#0B1826';
const C_ORANGE = '#C8601F';
const C_RULE = '#736D67';
const C_LIGHT = '#A09A93';

export function MurPorteurDiagram() {
  return (
    <div
      role="img"
      aria-label="Infographie en trois étapes : ouverture d'un mur porteur — avant, pendant l'étaiement, après pose de la poutre"
      className="grid md:grid-cols-3 gap-6 lg:gap-8"
    >
      {/* ─── PANNEAU 1 : AVANT ──────────────────────────────────── */}
      <Panel
        num="01"
        titre="Avant"
        legende="La maison telle qu'elle est. Le mur porteur supporte les charges du plancher du dessus."
      >
        <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Toit */}
          <path d="M30 60 L100 25 L170 60" fill="none" stroke={C_NAVY} strokeWidth="1.5" strokeLinejoin="round" />
          {/* Plancher haut */}
          <line x1="30" y1="80" x2="170" y2="80" stroke={C_NAVY} strokeWidth="1.5" />
          {/* Murs verticaux extérieurs */}
          <line x1="30" y1="60" x2="30" y2="180" stroke={C_NAVY} strokeWidth="1.5" />
          <line x1="170" y1="60" x2="170" y2="180" stroke={C_NAVY} strokeWidth="1.5" />
          {/* Sol */}
          <line x1="20" y1="180" x2="180" y2="180" stroke={C_NAVY} strokeWidth="1.5" />
          {/* Mur porteur central (mis en avant) */}
          <rect x="92" y="80" width="16" height="100" fill={C_ORANGE} fillOpacity="0.15" stroke={C_ORANGE} strokeWidth="1.5" />
          {/* Flèches charges du plancher (pression vers le bas) */}
          <g stroke={C_RULE} strokeWidth="1" fill="none">
            <line x1="60" y1="92" x2="60" y2="105" />
            <path d="M57 102 L60 105 L63 102" />
            <line x1="80" y1="92" x2="80" y2="105" />
            <path d="M77 102 L80 105 L83 102" />
            <line x1="120" y1="92" x2="120" y2="105" />
            <path d="M117 102 L120 105 L123 102" />
            <line x1="140" y1="92" x2="140" y2="105" />
            <path d="M137 102 L140 105 L143 102" />
          </g>
          {/* Annotation mur porteur */}
          <text x="100" y="200" textAnchor="middle" fontFamily="Georgia, serif" fontSize="9" fill={C_ORANGE} fontStyle="italic">
            mur porteur
          </text>
        </svg>
      </Panel>

      {/* ─── PANNEAU 2 : PENDANT ────────────────────────────────── */}
      <Panel
        num="02"
        titre="Pendant"
        legende="Étaiement provisoire sous le plancher. Le mur peut alors être ouvert sans risque pour la structure."
      >
        <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Toit (même base) */}
          <path d="M30 60 L100 25 L170 60" fill="none" stroke={C_NAVY} strokeWidth="1.5" strokeLinejoin="round" />
          {/* Plancher haut */}
          <line x1="30" y1="80" x2="170" y2="80" stroke={C_NAVY} strokeWidth="1.5" />
          {/* Murs verticaux */}
          <line x1="30" y1="60" x2="30" y2="180" stroke={C_NAVY} strokeWidth="1.5" />
          <line x1="170" y1="60" x2="170" y2="180" stroke={C_NAVY} strokeWidth="1.5" />
          {/* Sol */}
          <line x1="20" y1="180" x2="180" y2="180" stroke={C_NAVY} strokeWidth="1.5" />

          {/* Mur en cours d'ouverture : mur partiellement enlevé (pointillés) */}
          <rect x="92" y="80" width="16" height="100" fill="none" stroke={C_RULE} strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />

          {/* Étais (poteaux orange verticaux de chaque côté du mur en travaux) */}
          <g stroke={C_ORANGE} strokeWidth="2" fill="none" strokeLinecap="round">
            {/* étai gauche 1 */}
            <line x1="60" y1="80" x2="60" y2="180" />
            <circle cx="60" cy="80" r="2.5" fill={C_ORANGE} />
            <circle cx="60" cy="180" r="2.5" fill={C_ORANGE} />
            {/* étai gauche 2 */}
            <line x1="78" y1="80" x2="78" y2="180" />
            <circle cx="78" cy="80" r="2.5" fill={C_ORANGE} />
            <circle cx="78" cy="180" r="2.5" fill={C_ORANGE} />
            {/* étai droite 1 */}
            <line x1="122" y1="80" x2="122" y2="180" />
            <circle cx="122" cy="80" r="2.5" fill={C_ORANGE} />
            <circle cx="122" cy="180" r="2.5" fill={C_ORANGE} />
            {/* étai droite 2 */}
            <line x1="140" y1="80" x2="140" y2="180" />
            <circle cx="140" cy="80" r="2.5" fill={C_ORANGE} />
            <circle cx="140" cy="180" r="2.5" fill={C_ORANGE} />
          </g>

          {/* Annotation étais */}
          <text x="100" y="200" textAnchor="middle" fontFamily="Georgia, serif" fontSize="9" fill={C_ORANGE} fontStyle="italic">
            étais provisoires
          </text>
        </svg>
      </Panel>

      {/* ─── PANNEAU 3 : APRÈS ──────────────────────────────────── */}
      <Panel
        num="03"
        titre="Après"
        legende="La poutre métallique reprend toutes les charges. L'espace est ouvert, la structure tient."
      >
        <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Toit */}
          <path d="M30 60 L100 25 L170 60" fill="none" stroke={C_NAVY} strokeWidth="1.5" strokeLinejoin="round" />
          {/* Plancher haut */}
          <line x1="30" y1="80" x2="170" y2="80" stroke={C_NAVY} strokeWidth="1.5" />
          {/* Murs extérieurs */}
          <line x1="30" y1="60" x2="30" y2="180" stroke={C_NAVY} strokeWidth="1.5" />
          <line x1="170" y1="60" x2="170" y2="180" stroke={C_NAVY} strokeWidth="1.5" />
          {/* Sol */}
          <line x1="20" y1="180" x2="180" y2="180" stroke={C_NAVY} strokeWidth="1.5" />

          {/* Plus de mur porteur — l'espace est ouvert (l'ancien rectangle a disparu) */}

          {/* Poutre métallique horizontale orange */}
          <rect x="55" y="78" width="90" height="8" fill={C_ORANGE} stroke={C_NAVY} strokeWidth="1" />
          {/* Petits boulons / nervures sur la poutre */}
          <line x1="60" y1="80" x2="60" y2="84" stroke={C_NAVY} strokeWidth="0.6" />
          <line x1="80" y1="80" x2="80" y2="84" stroke={C_NAVY} strokeWidth="0.6" />
          <line x1="100" y1="80" x2="100" y2="84" stroke={C_NAVY} strokeWidth="0.6" />
          <line x1="120" y1="80" x2="120" y2="84" stroke={C_NAVY} strokeWidth="0.6" />
          <line x1="140" y1="80" x2="140" y2="84" stroke={C_NAVY} strokeWidth="0.6" />

          {/* Petits jambages (résidus de mur de chaque côté) */}
          <rect x="55" y="86" width="6" height="94" fill={C_NAVY} fillOpacity="0.1" stroke={C_NAVY} strokeWidth="1" />
          <rect x="139" y="86" width="6" height="94" fill={C_NAVY} fillOpacity="0.1" stroke={C_NAVY} strokeWidth="1" />

          {/* Flèches charges descendantes : la poutre les reprend toutes */}
          <g stroke={C_RULE} strokeWidth="1" fill="none">
            <line x1="70" y1="60" x2="70" y2="74" />
            <path d="M67 71 L70 74 L73 71" />
            <line x1="100" y1="55" x2="100" y2="74" />
            <path d="M97 71 L100 74 L103 71" />
            <line x1="130" y1="60" x2="130" y2="74" />
            <path d="M127 71 L130 74 L133 71" />
          </g>

          {/* Annotation poutre */}
          <text x="100" y="200" textAnchor="middle" fontFamily="Georgia, serif" fontSize="9" fill={C_ORANGE} fontStyle="italic">
            poutre IPN ou HEB
          </text>
        </svg>
      </Panel>
    </div>
  );
}
