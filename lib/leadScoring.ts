/**
 * Lead scoring — qualifie automatiquement chaque lead diagnostic.
 *
 * Sortie : score 0-50 + tier HOT / WARM / COLD + raisons explicites.
 * Le tier est inséré dans le sujet de l'email interne pour qu'on
 * puisse prioriser les rappels en 30 secondes.
 *
 * Cf. PLAN_LEADGEN.md §3.4
 */

export type LeadTier = 'HOT' | 'WARM' | 'COLD';

export interface LeadScoreResult {
  score: number;
  maxScore: number;
  tier: LeadTier;
  tierColor: string;          // pour le HTML email
  tierEmoji: string;
  reasons: string[];          // raisons positives (pourquoi c'est chaud)
  signals: string[];          // signaux faibles ou négatifs (pour Ludovic)
  recommendedAction: string;  // ce que l’institut devrait faire
  callbackPriority: 'P1_4H' | 'P2_24H' | 'P3_72H';
}

interface ScoringInput {
  path: 'fissure' | 'mur-porteur';
  answers: Record<string, string>;
  hasPhone?: boolean;
  hasEmail?: boolean;
  inServiceArea?: boolean; // basé sur l'adresse / commune
  preferredTime?: string;
}

// ─────────────────────────────────────────────────────────────────
// Tables de scoring (centralisées pour ajustement facile)
// ─────────────────────────────────────────────────────────────────

const FISSURE_RULES: Array<{
  key: string;
  values: string[];
  points: number;
  reason: string;
}> = [
  // Largeur — facteur principal de gravité
  { key: 'LARGEUR', values: ['large'], points: 12, reason: 'Fissure large (> 2 mm) — signal structurel fort' },
  { key: 'LARGEUR', values: ['moyenne'], points: 6, reason: 'Fissure moyenne (0,2 à 2 mm) — surveillance nécessaire' },

  // Évolution — fissure active = urgence
  { key: 'EVOLUTION', values: ['rapide'], points: 12, reason: 'Évolution rapide observée — intervention prioritaire' },
  { key: 'EVOLUTION', values: ['lente'], points: 5, reason: 'Évolution lente — fissure active' },

  // Forme
  { key: 'FORME_FISSURE', values: ['escalier'], points: 8, reason: 'Forme en escalier — signature de tassement différentiel' },
  { key: 'FORME_FISSURE', values: ['horizontale'], points: 6, reason: 'Fissure horizontale — possible défaut de chaînage' },

  // Localisation
  { key: 'LOCALISATION', values: ['facade'], points: 4, reason: 'Localisation façade extérieure' },
  { key: 'LOCALISATION', values: ['interieur'], points: 3, reason: 'Localisation murs intérieurs traversants possibles' },

  // Signes associés (très fort indice)
  { key: 'SIGNES_ASSOCIES', values: ['portes'], points: 6, reason: 'Portes qui coincent — la structure bouge' },
  { key: 'SIGNES_ASSOCIES', values: ['carrelage'], points: 5, reason: 'Carrelage fissuré — déformation du sol' },
  { key: 'SIGNES_ASSOCIES', values: ['infiltration'], points: 4, reason: 'Infiltrations associées' },

  // Statut occupant
  { key: 'STATUT', values: ['proprietaire'], points: 5, reason: 'Propriétaire occupant — décisionnaire direct' },

  // Urgence ressentie (auto-déclarée)
  { key: 'URGENCE', values: ['eleve'], points: 6, reason: "Niveau d'urgence ressenti élevé" },
  { key: 'URGENCE', values: ['moyen'], points: 3, reason: "Niveau d'urgence ressenti modéré" },

  // Ancienneté
  { key: 'ANCIENNETE', values: ['recent'], points: 3, reason: 'Apparition récente (< 6 mois) — phase active possible' },
];

const MUR_PORTEUR_RULES: Array<{
  key: string;
  values: string[];
  points: number;
  reason: string;
}> = [
  // Horizon de travaux — l'urgence commerciale
  { key: 'HORIZON', values: ['immediat', 'moins_3_mois'], points: 14, reason: 'Projet à très court terme (< 3 mois)' },
  { key: 'HORIZON', values: ['3_6_mois'], points: 10, reason: 'Projet sous 3 à 6 mois' },
  { key: 'HORIZON', values: ['6_12_mois'], points: 5, reason: 'Projet sous 6 à 12 mois' },

  // Statut occupant
  { key: 'STATUT', values: ['proprietaire'], points: 6, reason: 'Propriétaire — décisionnaire direct' },
  { key: 'STATUT', values: ['marchand_de_biens', 'investisseur'], points: 8, reason: 'Marchand de biens / investisseur — récurrent potentiel' },

  // Devis existants — concurrence active
  { key: 'DEVIS_EXISTANT', values: ['oui_devis'], points: 6, reason: 'Devis déjà reçu ailleurs — décision imminente' },
  { key: 'DEVIS_EXISTANT', values: ['en_cours'], points: 4, reason: 'Démarche en cours — phase de comparaison' },

  // Plans dispos = projet mûr
  { key: 'PLANS', values: ['oui'], points: 4, reason: 'Plans disponibles — projet mûr' },

  // Type de projet
  { key: 'PROJET', values: ['abattre'], points: 5, reason: 'Abattre un mur porteur — projet structurel ferme' },
  { key: 'PROJET', values: ['baie'], points: 6, reason: 'Création de baie vitrée — projet à valeur ajoutée' },
  { key: 'PROJET', values: ['agrandir'], points: 4, reason: "Agrandissement d'ouverture existante" },

  // Portée — projets > 3 m = ticket plus élevé
  { key: 'PORTEE', values: ['grande'], points: 4, reason: 'Grande portée (> 3 m) — chantier valorisant' },

  // Bâtiment
  { key: 'TYPE_BATIMENT', values: ['maison'], points: 3, reason: 'Maison individuelle — décision plus rapide qu\'en copropriété' },
  { key: 'TYPE_BATIMENT', values: ['immeuble'], points: 1, reason: 'Immeuble / appartement — démarches AG à anticiper' },
];

// ─────────────────────────────────────────────────────────────────
// Algorithme principal
// ─────────────────────────────────────────────────────────────────

export function calculateLeadScore(input: ScoringInput): LeadScoreResult {
  const rules = input.path === 'fissure' ? FISSURE_RULES : MUR_PORTEUR_RULES;
  const reasons: string[] = [];
  const signals: string[] = [];
  let score = 0;
  const maxScore = 50;

  // 1) Appliquer les règles métier
  for (const rule of rules) {
    const answerValue = input.answers[rule.key];
    if (answerValue && rule.values.includes(answerValue)) {
      score += rule.points;
      reasons.push(rule.reason);
    }
  }

  // 2) Bonus contact direct
  if (input.hasPhone) {
    score += 4;
    reasons.push('Téléphone fourni — joignable directement');
  }
  if (!input.hasEmail && input.hasPhone) {
    signals.push('Pas d\'email : prévoir SMS / appel comme suite');
  }

  // 3) Bonus zone d'intervention
  if (input.inServiceArea === true) {
    score += 3;
    reasons.push('Adresse dans la zone d\'intervention');
  } else if (input.inServiceArea === false) {
    score -= 5;
    signals.push('⚠️ Adresse possiblement hors zone — vérifier avant déplacement');
  }

  // 4) Créneau préféré explicite = engagement
  if (input.preferredTime && input.preferredTime !== 'flexible') {
    score += 2;
    reasons.push('Créneau de rappel précisé');
  }

  // 5) Cap le score à maxScore
  score = Math.min(Math.max(score, 0), maxScore);

  // 6) Détermination tier
  let tier: LeadTier;
  let tierColor: string;
  let tierEmoji: string;
  let recommendedAction: string;
  let callbackPriority: LeadScoreResult['callbackPriority'];

  if (score >= 25) {
    tier = 'HOT';
    tierColor = '#C8601F';
    tierEmoji = '🔥';
    recommendedAction = 'Rappel sous 4 heures ouvrées. Prioriser sur tous les autres dossiers.';
    callbackPriority = 'P1_4H';
  } else if (score >= 12) {
    tier = 'WARM';
    tierColor = '#0F2033';
    tierEmoji = '🌡️';
    recommendedAction = 'Rappel sous 24 heures ouvrées. Préparer un argumentaire chiffré.';
    callbackPriority = 'P2_24H';
  } else {
    tier = 'COLD';
    tierColor = '#736D67';
    tierEmoji = '❄️';
    recommendedAction = 'Email automatique de suivi. Rappel téléphonique sous 72 heures si non répondu.';
    callbackPriority = 'P3_72H';
  }

  return {
    score,
    maxScore,
    tier,
    tierColor,
    tierEmoji,
    reasons,
    signals,
    recommendedAction,
    callbackPriority,
  };
}

/**
 * Détermine si une adresse est dans la zone d'intervention IPB.
 * Heuristique simple : codes postaux 31, 32, 81, 82.
 */
export function isInServiceArea(address?: string): boolean | undefined {
  if (!address) return undefined;
  const cpMatch = address.match(/\b(\d{5})\b/);
  if (!cpMatch) return undefined;
  const cp = cpMatch[1];
  const dept = cp.slice(0, 2);
  return ['31', '32', '81', '82', '09'].includes(dept);
}

/**
 * Génère le HTML d'un bandeau de scoring intégré à l'email interne.
 */
export function renderScoringBanner(scoring: LeadScoreResult): string {
  const reasonsHtml = scoring.reasons.length
    ? scoring.reasons.map(r => `<li style="margin: 4px 0;">${r}</li>`).join('')
    : '<li style="color: #A09A93;">Aucun signal fort détecté</li>';

  const signalsHtml = scoring.signals.length
    ? `<div style="margin-top: 12px; padding: 12px; background: #FFF8F0; border-left: 3px solid #F08040; border-radius: 4px;">
         <p style="margin: 0 0 6px; font-weight: 700; color: #C8601F; font-size: 13px;">À retenir avant l'appel :</p>
         <ul style="margin: 0; padding-left: 18px; font-size: 13px; color: #1A1917;">
           ${scoring.signals.map(s => `<li style="margin: 3px 0;">${s}</li>`).join('')}
         </ul>
       </div>`
    : '';

  return `
    <div style="background: ${scoring.tierColor}; color: white; padding: 18px 24px; text-align: center;">
      <p style="margin: 0; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; opacity: 0.7;">Scoring automatique</p>
      <p style="margin: 6px 0 0; font-size: 24px; font-weight: 700;">
        ${scoring.tierEmoji} ${scoring.tier} · ${scoring.score}/${scoring.maxScore}
      </p>
      <p style="margin: 6px 0 0; font-size: 13px; opacity: 0.85;">${scoring.recommendedAction}</p>
    </div>

    <div style="background: white; margin: 16px; padding: 18px 22px; border-radius: 8px; border: 1px solid #D8D2C9;">
      <p style="margin: 0 0 10px; font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: #A09A93; font-weight: 600;">
        Pourquoi ce score
      </p>
      <ul style="margin: 0; padding-left: 18px; font-size: 14px; color: #1A1917; line-height: 1.7;">
        ${reasonsHtml}
      </ul>
      ${signalsHtml}
    </div>
  `;
}
