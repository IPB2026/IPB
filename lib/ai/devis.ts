import 'server-only';
import Anthropic from '@anthropic-ai/sdk';
import { isAiConfigured } from '@/lib/ai/report';

/**
 * Génère le CONTENU d'un devis sur-mesure (objet / déroulé / livrable) à partir
 * d'un besoin client décrit librement. Le PRIX reste saisi par l'admin. Sortie
 * JSON structurée (Sonnet). Aucune persistance ici.
 */

const MODEL = 'claude-sonnet-4-6';

const SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    objet: { type: 'string', description: 'Titre court et précis de la mission' },
    intervention: {
      type: 'array',
      items: { type: 'string' },
      description: "4 à 7 puces : ce que comprend l'intervention sur site (périmètre diagnostic/expertise)",
    },
    livrable: {
      type: 'array',
      items: { type: 'string' },
      description: '3 à 5 puces : ce qui est remis au client',
    },
  },
  required: ['objet', 'intervention', 'livrable'],
} as const;

const SYSTEM = `Tu rédiges le CONTENU d'un devis SUR-MESURE pour l'IPB (Institut de Pathologie du Bâtiment) — un institut qui DIAGNOSTIQUE, CONÇOIT et COORDONNE (les travaux éventuels sont exécutés par les équipes de réalisation du réseau IPB). À partir du besoin spécifique décrit par le gérant, produis un contenu professionnel, réaliste et adapté au cas.
Règles strictes :
- objet : titre court et précis de la mission (ex. « Diagnostic d'un plancher bois affaissé — recherche de cause »).
- intervention : 4 à 7 puces concrètes (visite et lecture du bâti, mesures instrumentées ADAPTÉES au cas, examens ciblés, mise en perspective du contexte, relevé photographique daté). Reste dans le périmètre du DIAGNOSTIC / de l'expertise — PAS l'exécution de travaux.
- livrable : 3 à 5 puces (rapport écrit remis sous 3 à 5 jours ouvrés après la visite, synthèse appuyée de photographies légendées, identification des causes probables et hiérarchisation, préconisations de principe et orientations éventuelles vers investigations complémentaires).
- N'invente AUCUN prix, AUCUNE garantie, aucun délai autre que « 3 à 5 jours ouvrés ». Vocabulaire technique du bâtiment, français, ton professionnel et sobre. Ne mentionne pas de montant.`;

export async function generateDevisContent(
  besoin: string,
  bien?: string | null
): Promise<{ objet: string; intervention: string[]; livrable: string[] } | { error: string }> {
  if (!isAiConfigured()) return { error: "Clé API Anthropic absente (ANTHROPIC_API_KEY)." };
  const text = besoin.trim();
  if (text.length < 10) return { error: 'Décrivez le besoin du client (quelques mots au minimum).' };

  const client = new Anthropic();
  const params = {
    model: MODEL,
    max_tokens: 2000,
    system: SYSTEM,
    output_config: { format: { type: 'json_schema', schema: SCHEMA } },
    messages: [
      {
        role: 'user',
        content: `Besoin du client${bien ? ` (bien concerné : ${bien})` : ''} :\n"""${text}"""`,
      },
    ],
  };

  try {
    const response = await client.messages.create(
      params as unknown as Anthropic.MessageCreateParamsNonStreaming
    );
    const textBlock = response.content.find((b) => b.type === 'text');
    const raw = textBlock && 'text' in textBlock ? textBlock.text : '';
    if (!raw) return { error: 'Réponse IA vide.' };
    const parsed = JSON.parse(raw) as {
      objet?: string;
      intervention?: string[];
      livrable?: string[];
    };
    const objet = (parsed.objet ?? '').trim();
    const intervention = (parsed.intervention ?? []).filter(Boolean);
    const livrable = (parsed.livrable ?? []).filter(Boolean);
    if (!objet || !intervention.length || !livrable.length) {
      return { error: 'Contenu généré incomplet — reformulez le besoin.' };
    }
    return { objet, intervention, livrable };
  } catch (err) {
    console.error('[generateDevisContent] échec IA:', err);
    return { error: `Génération échouée : ${err instanceof Error ? err.message : 'erreur'}` };
  }
}
