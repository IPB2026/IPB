import 'server-only';
import Anthropic from '@anthropic-ai/sdk';
import { isAiConfigured } from '@/lib/ai/report';

/**
 * « Assistant IPB » — copilote commercial sur la fiche client (façon HubSpot
 * Breeze / Salesforce Einstein). À partir de l'état RÉEL du dossier, il produit :
 *  - un résumé en 2-3 phrases,
 *  - l'action la plus pertinente à faire MAINTENANT,
 *  - un brouillon d'e-mail prêt à relire/envoyer au client.
 *
 * Aucune persistance, aucune décision automatique : l'admin garde la main.
 * Sortie JSON structurée, même pattern que lib/ai/devis.ts.
 */

// Tâche = résumé + action + brouillon d'e-mail à partir d'un contexte client
// COMPACT (~500-1500 tokens). Haiku 4.5 est ~3× moins cher que Sonnet 4.6
// ($1/$5 vs $3/$15 par MTok), suffisant en qualité pour ce travail structuré,
// et compatible avec output_config.format (sorties structurées). On garde la
// possibilité de revenir à un modèle plus puissant via ASSISTANT_MODEL.
const MODEL = process.env.ASSISTANT_MODEL || 'claude-haiku-4-5';

export interface AssistantResult {
  resume: string;
  action: string;
  email: { objet: string; corps: string };
}

const SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    resume: {
      type: 'string',
      description: "Résumé du dossier en 2 à 3 phrases : où en est-on, depuis quand, point d'attention.",
    },
    action: {
      type: 'string',
      description: "L'action la plus pertinente à faire maintenant, en une phrase actionnable.",
    },
    email: {
      type: 'object',
      additionalProperties: false,
      properties: {
        objet: { type: 'string', description: "Objet de l'e-mail au client" },
        corps: { type: 'string', description: "Corps de l'e-mail, prêt à envoyer, signé « L'équipe IPB »" },
      },
      required: ['objet', 'corps'],
    },
  },
  required: ['resume', 'action', 'email'],
} as const;

const SYSTEM = `Tu es l'assistant commercial de l'IPB (Institut de Pathologie du Bâtiment), à Toulouse et en Occitanie. L'IPB DIAGNOSTIQUE, CONÇOIT et COORDONNE ; les travaux éventuels sont exécutés par les équipes de réalisation du réseau IPB. Tu aides le gérant à piloter un dossier client.

À partir de l'état du dossier fourni, produis :
- resume : 2 à 3 phrases factuelles (phase actuelle, ancienneté, dernier événement, point d'attention).
- action : LA prochaine action la plus utile, concrète et actionnable (ex. « Relancer par téléphone aujourd'hui : le devis est envoyé depuis 9 jours sans réponse »).
- email : un brouillon d'e-mail au client, cohérent avec l'action conseillée, prêt à relire puis envoyer.

Règles strictes :
- Ton sobre, professionnel, chaleureux mais jamais « vendeur agressif ». Vouvoiement. Français.
- N'invente AUCUN prix, AUCUNE garantie, aucun délai autre que « 3 à 5 jours ouvrés » (délai du rapport après paiement).
- Respecte le positionnement : IPB est un institut indépendant, jamais « entreprise de travaux ».
- Signe l'e-mail « L'équipe IPB ». N'invente pas de coordonnées.
- Si le dossier est déjà terminé/perdu, propose une action adaptée (clôture, demande d'avis, ou réactivation).`;

export async function generateDossierAssistance(
  contexte: string
): Promise<AssistantResult | { error: string }> {
  if (!isAiConfigured()) return { error: "Clé API Anthropic absente (ANTHROPIC_API_KEY)." };
  const text = contexte.trim();
  if (!text) return { error: 'Contexte du dossier vide.' };

  const client = new Anthropic();
  const params = {
    model: MODEL,
    max_tokens: 1500,
    system: SYSTEM,
    output_config: { format: { type: 'json_schema', schema: SCHEMA } },
    messages: [{ role: 'user', content: `État du dossier :\n"""${text}"""` }],
  };

  try {
    const response = await client.messages.create(
      params as unknown as Anthropic.MessageCreateParamsNonStreaming
    );
    const textBlock = response.content.find((b) => b.type === 'text');
    const raw = textBlock && 'text' in textBlock ? textBlock.text : '';
    if (!raw) return { error: 'Réponse IA vide.' };
    const parsed = JSON.parse(raw) as Partial<AssistantResult>;
    if (!parsed.resume || !parsed.action || !parsed.email?.objet || !parsed.email?.corps) {
      return { error: 'Réponse IA incomplète.' };
    }
    return {
      resume: parsed.resume,
      action: parsed.action,
      email: { objet: parsed.email.objet, corps: parsed.email.corps },
    };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Échec de l'assistant IA." };
  }
}
