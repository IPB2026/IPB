import 'server-only';
import Anthropic from '@anthropic-ai/sdk';

/**
 * Générateur de rapports d'expertise par IA (Claude).
 * Transforme la saisie terrain (zones + observations + mesures) en rapport
 * structuré de niveau cabinet, fidèle au gabarit IPB (cf. rapport GARCIA).
 *
 * Modèle : claude-opus-4-8 · thinking adaptatif · sortie JSON structurée.
 * L'expert relit et valide TOUJOURS avant envoi (responsabilité).
 */

export const REPORT_MODEL = 'claude-opus-4-8';

export interface ReportZoneInput {
  titre: string;
  observations: string;
  mesure?: string;
  gravite?: string; // À TRAITER / IMPORTANT / À SURVEILLER / INFO
}

export interface ReportInput {
  type: 'FISSURES' | 'HUMIDITE' | 'EXPERTISE_ACHAT' | 'MUR_PORTEUR';
  clientName: string;
  bienAdresse?: string;
  ville?: string;
  zones: ReportZoneInput[];
}

export interface ReportContent {
  conclusionGenerale: string;
  zones: {
    titre: string;
    analyse: string;
    refsTechniques: string[];
    gravite: string;
    preconisation: string;
  }[];
  synthese: {
    zone: string;
    mesure: string;
    gravite: string;
    preconisation: string;
  }[];
  preconisations: { priorite: string; titre: string; detail: string }[];
  estimationTravaux: { designation: string; unite: string; montantHT: number }[];
  conclusion: string;
  recommandations: string[];
  budgetHT: number;
}

const TYPE_LABEL: Record<ReportInput['type'], string> = {
  FISSURES: 'pathologies de fissures',
  HUMIDITE: 'humidité et infiltrations',
  EXPERTISE_ACHAT: 'expertise structurelle avant achat',
  MUR_PORTEUR: 'faisabilité ouverture de mur porteur',
};

const SYSTEM = `Tu es le rédacteur expert de l'IPB — Institut de Pathologie du Bâtiment (Toulouse, Occitanie). Tu rédiges des RAPPORTS DE DIAGNOSTIC TECHNIQUE de niveau cabinet de conseil de haut niveau, en français professionnel, sobre et rigoureux.

STYLE & EXIGENCES :
- Ton expert, factuel, précis. Aucune exagération commerciale. Vouvoiement neutre.
- Pour CHAQUE zone : développe l'observation brute du diagnostiqueur en une analyse technique structurée (mécanismes probables, gravité, implications), sans jamais inventer de mesures ou de constats non fournis. Si une donnée manque, reste prudent et recommande l'investigation adaptée.
- Cite les référentiels pertinents quand ils s'appliquent : classification ITSIM des ouvertures de fissures (< 0,2 mm esthétique ; 0,2–0,5 mm surveillance ; ≥ 2 mm structurelle significative), DTU 26.1 (reprise des fissures > 1 mm par agrafage avant enduit), retrait-gonflement des argiles (BRGM, contexte Haute-Garonne), étude géotechnique mission G5 en escalade. N'invoque une référence que si elle est réellement pertinente.
- Gravités normalisées : "À TRAITER", "IMPORTANT", "À SURVEILLER", "INFO".
- Estimation des travaux : postes réalistes en € HT, TVA 10 % (art. 279-0 bis CGI, rénovation > 2 ans) — toujours indicative et non contractuelle. budgetHT = somme des postes.
- Conclusion : synthèse claire des désordres et de la conduite à tenir.
- N'invente jamais de coordonnées, de noms ou de chiffres non fournis.

Tu réponds UNIQUEMENT via le schéma JSON imposé. Pas de texte hors schéma.`;

const SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    conclusionGenerale: { type: 'string' },
    zones: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          titre: { type: 'string' },
          analyse: { type: 'string' },
          refsTechniques: { type: 'array', items: { type: 'string' } },
          gravite: { type: 'string' },
          preconisation: { type: 'string' },
        },
        required: ['titre', 'analyse', 'refsTechniques', 'gravite', 'preconisation'],
      },
    },
    synthese: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          zone: { type: 'string' },
          mesure: { type: 'string' },
          gravite: { type: 'string' },
          preconisation: { type: 'string' },
        },
        required: ['zone', 'mesure', 'gravite', 'preconisation'],
      },
    },
    preconisations: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          priorite: { type: 'string' },
          titre: { type: 'string' },
          detail: { type: 'string' },
        },
        required: ['priorite', 'titre', 'detail'],
      },
    },
    estimationTravaux: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          designation: { type: 'string' },
          unite: { type: 'string' },
          montantHT: { type: 'number' },
        },
        required: ['designation', 'unite', 'montantHT'],
      },
    },
    conclusion: { type: 'string' },
    recommandations: { type: 'array', items: { type: 'string' } },
    budgetHT: { type: 'number' },
  },
  required: [
    'conclusionGenerale',
    'zones',
    'synthese',
    'preconisations',
    'estimationTravaux',
    'conclusion',
    'recommandations',
    'budgetHT',
  ],
} as const;

export function isAiConfigured(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY);
}

export async function generateReport(
  input: ReportInput
): Promise<{ content: ReportContent } | { error: string }> {
  if (!isAiConfigured()) {
    return { error: "Clé API Anthropic absente (ANTHROPIC_API_KEY)." };
  }

  const client = new Anthropic();

  const userPrompt = [
    `Type de mission : diagnostic ${TYPE_LABEL[input.type]}.`,
    `Client : ${input.clientName}.`,
    input.bienAdresse ? `Bien : ${input.bienAdresse}.` : '',
    input.ville ? `Commune : ${input.ville}.` : '',
    '',
    'Constats terrain du diagnostiqueur (à développer en analyse experte) :',
    ...input.zones.map(
      (z, i) =>
        `Zone ${i + 1} — ${z.titre}\n` +
        `  Observations : ${z.observations}\n` +
        (z.mesure ? `  Mesure : ${z.mesure}\n` : '') +
        (z.gravite ? `  Gravité estimée : ${z.gravite}\n` : '')
    ),
    '',
    "Rédige le rapport complet (conclusion générale, analyse par zone avec références techniques pertinentes, tableau de synthèse, préconisations ordonnées par priorité, estimation budgétaire des travaux en € HT, conclusion, recommandations finales).",
  ]
    .filter(Boolean)
    .join('\n');

  // output_config.format (json_schema) + adaptive thinking : on caste car le
  // typage du SDK n'expose pas encore `format` sur output_config.
  const params = {
    model: REPORT_MODEL,
    max_tokens: 16000,
    thinking: { type: 'adaptive' },
    system: SYSTEM,
    output_config: {
      effort: 'high',
      format: { type: 'json_schema', schema: SCHEMA },
    },
    messages: [{ role: 'user', content: userPrompt }],
  };

  try {
    const response = await client.messages.create(
      params as unknown as Anthropic.MessageCreateParamsNonStreaming
    );

    const textBlock = response.content.find((b) => b.type === 'text');
    const raw = textBlock && 'text' in textBlock ? textBlock.text : '';
    if (!raw) return { error: 'Réponse IA vide.' };

    const content = JSON.parse(raw) as ReportContent;
    return { content };
  } catch (err) {
    console.error('[generateReport] échec IA:', err);
    const msg = err instanceof Error ? err.message : 'Erreur inconnue';
    return { error: `Génération IA échouée : ${msg}` };
  }
}
