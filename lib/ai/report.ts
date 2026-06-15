import 'server-only';
import Anthropic from '@anthropic-ai/sdk';

/**
 * Générateur de rapports d'expertise par IA (Claude).
 * Transforme la saisie terrain (zones + observations + mesures + photos) en
 * rapport de diagnostic technique APPROFONDI (10-15 pages), de niveau cabinet,
 * fidèle au gabarit IPB de référence (rapport BRÉVARD-GELIN).
 *
 * Positionnement : le diagnostic est RÉALISÉ par le diagnostiqueur indépendant
 * mandaté (Bâti Halli / Toi mon Toit), qui engage sa RC professionnelle ; l'IPB
 * COORDONNE et met en forme. Le rapport doit apporter une vraie valeur au client
 * ET protéger juridiquement (section limites/périmètre stricte).
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

export interface ReportPhotoInput {
  url: string; // URL publique (Vercel Blob)
  caption?: string;
  zoneRef?: string;
  gravite?: string;
}

export interface ReportInput {
  type: 'FISSURES' | 'HUMIDITE' | 'EXPERTISE_ACHAT' | 'MUR_PORTEUR';
  clientName: string;
  bienAdresse?: string;
  ville?: string;
  zones: ReportZoneInput[];
  photos?: ReportPhotoInput[];
  /** Données officielles de localisation (Géorisques/BAN), si disponibles. */
  locationRisk?: string | null;
}

export interface ReportContent {
  // 1 — Contexte de la mission
  objetMission: string; // ce pour quoi la mission a été diligentée
  descriptionBien: string; // typologie, niveaux, accès, état général
  contexteLocalisation: string; // géologie / RGA-argiles / cat-nat / contexte de la commune (documentaire)
  limites: string; // limites & périmètre : différenciation BET / judiciaire / assurance (protection juridique)

  // Synthèse haute (encadré de tête)
  graviteGlobale: string; // ex. "INTERVENTION NÉCESSAIRE", "SITUATION MAÎTRISÉE"
  conclusionGenerale: string; // synthèse des désordres majeurs + conduite à tenir

  // 2 — Analyse détaillée par zone
  zones: {
    titre: string;
    description: string; // description du désordre observé (faciès, localisation, étendue)
    analyseCausale: string[]; // mécanismes possibles, par ordre de probabilité (PRUDENCE : ne jamais trancher sans instrumentation)
    mesure: string; // mesure instrumentale si fournie, sinon "—"
    refsTechniques: string[]; // ITSIM, DTU, BRGM, normes pertinentes
    gravite: string; // À TRAITER / IMPORTANT / À SURVEILLER / INFO / BON ÉTAT
    preconisation: string;
    encadre: string; // verdict synthétique de l'encadré coloré
  }[];

  // 3 — Synthèse tabulaire
  syntheseDesordres: {
    zone: string;
    nature: string;
    gravite: string;
    action: string;
  }[];

  // 4 — Matrice de criticité
  matriceCriticite: {
    desordre: string;
    probabilite: string; // Faible / Modérée / Élevée
    gravite: string; // Faible / Modérée / Élevée / Critique
    criticite: string; // Faible / Modérée / Élevée / Critique (croisement)
  }[];

  // 5 — Avis sur un projet éventuel (ouverture mur porteur, etc.) — 0 ou 1 item
  avisProjet: { titre: string; description: string; avis: string }[];

  // 6 — Estimation budgétaire
  estimationTravaux: {
    designation: string;
    unite: string;
    montantHT: number;
    tva: number; // taux : 10 (travaux logement) ou 20 (prestations intellectuelles BET)
  }[];
  budgetHT: number;

  // 7 — Orientations (BET structure, mandataire judiciaire, assurance…)
  orientations: { titre: string; detail: string }[];

  // 8 — Conclusion
  conclusion: string;
  conclusionFinale: string[]; // recommandations finales (négociation / actions à mener)
}

const TYPE_LABEL: Record<ReportInput['type'], string> = {
  FISSURES: 'pathologies de fissures',
  HUMIDITE: 'humidité et infiltrations',
  EXPERTISE_ACHAT: 'expertise structurelle avant acquisition',
  MUR_PORTEUR: 'faisabilité d’ouverture de mur porteur',
};

const SYSTEM = `Tu es un DIAGNOSTIQUEUR-PATHOLOGUE DU BÂTIMENT chevronné (15+ ans), mandaté par l'IPB. Tu rédiges un RAPPORT DE DIAGNOSTIC TECHNIQUE approfondi (cible : 10 à 15 pages), de niveau cabinet, en français professionnel sobre et rigoureux. Le rapport doit (1) apporter une VRAIE valeur au client et (2) PROTÉGER juridiquement l'IPB et le diagnostiqueur.

POSITIONNEMENT (à respecter à la lettre) :
- Le diagnostic est RÉALISÉ par le diagnostiqueur indépendant mandaté, qui engage sa responsabilité civile professionnelle. L'IPB COORDONNE la mission et met en forme le rapport. Écris à la 1ʳᵉ personne du pluriel sobre ("nous avons observé…") ou à la voix neutre.
- Tu n'es NI un bureau d'études structure (BET, au sens NF EN 1990), NI un expert judiciaire, NI un expert d'assurance. Tu réalises un DIAGNOSTIC VISUEL de conseil privé. Rappelle-le clairement.

EXIGENCES DE FOND :
- PRUDENCE D'EXPERT : pour chaque désordre, propose PLUSIEURS mécanismes causals plausibles (retrait/dessiccation, déformation en flexion, mouvement différentiel d'appui, tassement de fondation, concentration de contraintes, comportement de l'enduit…), classés par probabilité. Ne TRANCHE JAMAIS une cause unique sans instrumentation suffisante : si une donnée manque, dis-le et recommande l'investigation adaptée (sondage destructif, BET, étude géotechnique G5, pose de témoins).
- N'invente JAMAIS de mesure, de constat, de chiffre ou de coordonnée non fournis. Si le diagnostiqueur n'a pas mesuré, écris "—" pour la mesure et reste qualitatif.
- RÉFÉRENTIELS, à citer uniquement s'ils s'appliquent réellement : classification ITSIM des ouvertures (< 0,2 mm esthétique ; 0,2-2 mm à surveiller ; ≥ 2 mm structurelle significative), DTU 26.1 (reprise par agrafage), retrait-gonflement des argiles (BRGM / Géorisques), étude géotechnique mission G5, NF EN 1990 (BET).
- CONTEXTE DE LOCALISATION : si des DONNÉES OFFICIELLES (Géorisques / Base Adresse Nationale) te sont fournies dans le message, UTILISE-LES comme références FACTUELLES — cite l'aléa retrait-gonflement des argiles exact et le nombre/l'ancienneté des arrêtés de catastrophe naturelle "sécheresse" de la commune, et tire-en les implications pour les désordres observés. À DÉFAUT de données officielles, fournis un contexte général documentaire (géologie probable, exposition RGA en Occitanie) présenté comme "à confirmer auprès des sources officielles (Géorisques, BRGM)" sans affirmer un classement comme une certitude.
- PHOTOS : des photographies terrain peuvent t'être jointes (avec légende + zone). Analyse-les VISUELLEMENT pour étayer le diagnostic (orientation et faciès des fissures, traces d'humidité/efflorescences/salpêtre, état des matériaux). N'affirme que ce que la photo montre réellement ; ne décris jamais une photo non transmise. Référence-les ("la photographie n° X montre…").
- LIMITES & PÉRIMÈTRE : rédige une section ferme rappelant que le rapport repose sur des observations VISUELLES non destructives ; que les zones masquées/non accessibles ne sont pas couvertes ; qu'il ne se substitue ni à une étude de structure (BET), ni à une expertise judiciaire, ni à une expertise d'assurance ; et qu'il ne saurait engager la responsabilité de l'IPB au-delà du périmètre de conseil.
- MATRICE DE CRITICITÉ : pour chaque désordre majeur, croise une PROBABILITÉ (Faible/Modérée/Élevée) et une GRAVITÉ (Faible/Modérée/Élevée/Critique) pour en déduire une CRITICITÉ.
- ORIENTATIONS : indique explicitement quand orienter le client vers un BET structure, un mandataire/expert judiciaire, ou une déclaration d'assurance (catastrophe naturelle sécheresse), selon le cas.
- ESTIMATION : postes réalistes en € HT avec taux de TVA par poste (10 % pour les travaux sur logement de plus de 2 ans, art. 279-0 bis CGI ; 20 % pour les prestations intellectuelles type BET). Toujours indicative et non contractuelle. budgetHT = somme des montants HT.
- VALEUR : quand c'est pertinent (diagnostic avant achat), intègre l'angle négociation (éléments à porter au compromis de vente).
- Gravités normalisées : "À TRAITER", "IMPORTANT", "À SURVEILLER", "INFO", "BON ÉTAT".
- Style : factuel, précis, sans exagération commerciale. Développe : vise un rapport DENSE et complet (10-15 pages une fois mis en page).

Tu réponds UNIQUEMENT via le schéma JSON imposé. Aucun texte hors schéma.`;

const SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    objetMission: { type: 'string' },
    descriptionBien: { type: 'string' },
    contexteLocalisation: { type: 'string' },
    limites: { type: 'string' },
    graviteGlobale: { type: 'string' },
    conclusionGenerale: { type: 'string' },
    zones: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          titre: { type: 'string' },
          description: { type: 'string' },
          analyseCausale: { type: 'array', items: { type: 'string' } },
          mesure: { type: 'string' },
          refsTechniques: { type: 'array', items: { type: 'string' } },
          gravite: { type: 'string' },
          preconisation: { type: 'string' },
          encadre: { type: 'string' },
        },
        required: [
          'titre', 'description', 'analyseCausale', 'mesure',
          'refsTechniques', 'gravite', 'preconisation', 'encadre',
        ],
      },
    },
    syntheseDesordres: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          zone: { type: 'string' },
          nature: { type: 'string' },
          gravite: { type: 'string' },
          action: { type: 'string' },
        },
        required: ['zone', 'nature', 'gravite', 'action'],
      },
    },
    matriceCriticite: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          desordre: { type: 'string' },
          probabilite: { type: 'string' },
          gravite: { type: 'string' },
          criticite: { type: 'string' },
        },
        required: ['desordre', 'probabilite', 'gravite', 'criticite'],
      },
    },
    avisProjet: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          titre: { type: 'string' },
          description: { type: 'string' },
          avis: { type: 'string' },
        },
        required: ['titre', 'description', 'avis'],
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
          tva: { type: 'number' },
        },
        required: ['designation', 'unite', 'montantHT', 'tva'],
      },
    },
    budgetHT: { type: 'number' },
    orientations: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          titre: { type: 'string' },
          detail: { type: 'string' },
        },
        required: ['titre', 'detail'],
      },
    },
    conclusion: { type: 'string' },
    conclusionFinale: { type: 'array', items: { type: 'string' } },
  },
  required: [
    'objetMission', 'descriptionBien', 'contexteLocalisation', 'limites',
    'graviteGlobale', 'conclusionGenerale', 'zones', 'syntheseDesordres',
    'matriceCriticite', 'avisProjet', 'estimationTravaux', 'budgetHT',
    'orientations', 'conclusion', 'conclusionFinale',
  ],
} as const;

export function isAiConfigured(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY);
}

// ── Pré-structuration : dictée libre du diagnostiqueur → zones d'observation ──
// Étape légère (≠ génération du rapport complet) : on découpe et range, sans
// analyser ni inventer. Modèle rapide (Sonnet) pour une latence faible terrain.
const STRUCTURE_MODEL = 'claude-sonnet-4-6';

const STRUCTURE_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    zones: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          titre: { type: 'string', description: 'Localisation courte, ex. « Mur sud — séjour »' },
          observations: { type: 'string', description: 'Constats reformulés proprement, fidèles à la dictée' },
          mesure: { type: 'string', description: 'Valeur chiffrée si mentionnée, ex. « 3 mm ». Sinon vide.' },
          gravite: { type: 'string', enum: ['À TRAITER', 'IMPORTANT', 'À SURVEILLER', 'INFO'] },
        },
        required: ['titre', 'observations', 'mesure', 'gravite'],
      },
    },
  },
  required: ['zones'],
} as const;

const STRUCTURE_SYSTEM = `Tu assistes un diagnostiqueur du bâtiment en intervention. À partir de sa dictée libre (constats BRUTS sur site), tu DÉCOUPES le propos en zones d'observation distinctes.
Règles strictes :
- Ne rien inventer, ne rien interpréter au-delà de ce qui est dit. Pas d'analyse causale, pas de préconisation (ça vient après).
- titre : localisation courte (ex. « Mur sud — séjour », « Cave », « Façade Est »).
- observations : reformulation propre et fidèle des constats de cette zone.
- mesure : la valeur chiffrée si une est citée (ex. « 3 mm », « 80 % HR »), sinon chaîne vide.
- gravite : estimation prudente parmi À TRAITER / IMPORTANT / À SURVEILLER / INFO selon la teneur des propos — ne JAMAIS surévaluer ; en cas de doute, À SURVEILLER.
- Si la dictée ne porte que sur un seul sujet, renvoie une seule zone.
Langue : français.`;

export async function structureObservations(
  rawText: string,
  type: ReportInput['type']
): Promise<{ zones: ReportZoneInput[] } | { error: string }> {
  if (!isAiConfigured()) {
    return { error: "Clé API Anthropic absente (ANTHROPIC_API_KEY)." };
  }
  const text = rawText.trim();
  if (!text) return { error: 'Dictée vide.' };

  const client = new Anthropic();
  const params = {
    model: STRUCTURE_MODEL,
    max_tokens: 4000,
    system: STRUCTURE_SYSTEM,
    output_config: {
      format: { type: 'json_schema', schema: STRUCTURE_SCHEMA },
    },
    messages: [
      {
        role: 'user',
        content: `Type de mission : ${TYPE_LABEL[type]}.\n\nDictée du diagnostiqueur :\n"""${text}"""`,
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
    const parsed = JSON.parse(raw) as { zones?: ReportZoneInput[] };
    const zones = (parsed.zones ?? []).filter((z) => z.titre && z.observations);
    if (!zones.length) return { error: 'Aucune zone détectée dans la dictée.' };
    return { zones };
  } catch (err) {
    console.error('[structureObservations] échec IA:', err);
    const msg = err instanceof Error ? err.message : 'Erreur inconnue';
    return { error: `Structuration échouée : ${msg}` };
  }
}

export async function generateReport(
  input: ReportInput
): Promise<{ content: ReportContent } | { error: string }> {
  if (!isAiConfigured()) {
    return { error: "Clé API Anthropic absente (ANTHROPIC_API_KEY)." };
  }

  const client = new Anthropic();
  const photos = (input.photos ?? []).filter((p) => p.url);

  const userPrompt = [
    `Type de mission : diagnostic ${TYPE_LABEL[input.type]}.`,
    `Client : ${input.clientName}.`,
    input.bienAdresse ? `Bien expertisé : ${input.bienAdresse}.` : '',
    input.ville ? `Commune : ${input.ville}.` : '',
    input.locationRisk
      ? `\nDONNÉES OFFICIELLES DE LOCALISATION (Géorisques / Base Adresse Nationale) — RÉFÉRENCE FACTUELLE pour le contexte de localisation, à citer telle quelle (ne pas la présenter comme « à confirmer ») :\n${input.locationRisk}`
      : '',
    '',
    'CONSTATS TERRAIN du diagnostiqueur (matière brute à développer en analyse experte, sans rien inventer) :',
    ...input.zones.map(
      (z, i) =>
        `Zone ${i + 1} — ${z.titre}\n` +
        `  Observations : ${z.observations}\n` +
        (z.mesure ? `  Mesure : ${z.mesure}\n` : '  Mesure : (non mesurée)\n') +
        (z.gravite ? `  Gravité estimée terrain : ${z.gravite}\n` : '')
    ),
    '',
    photos.length
      ? `${photos.length} photographie(s) terrain te sont jointes ci-dessous (analyse visuelle attendue, référence-les par leur numéro).`
      : 'Aucune photographie fournie.',
    '',
    "Rédige le RAPPORT COMPLET et APPROFONDI (10-15 pages) selon le schéma : objet de la mission, description du bien, contexte de localisation documentaire, limites & périmètre (protection juridique, différenciation BET/judiciaire/assurance), conclusion générale, analyse détaillée par zone (description + analyse causale multi-mécanismes + références + gravité + préconisation + encadré), tableau de synthèse, matrice de criticité, avis sur projet éventuel, estimation budgétaire (TVA par poste), orientations, conclusion et recommandations finales.",
  ]
    .filter(Boolean)
    .join('\n');

  const userContent: Anthropic.ContentBlockParam[] = [
    { type: 'text', text: userPrompt },
  ];
  for (const [i, p] of photos.entries()) {
    const légende = [
      `Photo ${i + 1}`,
      p.zoneRef ? `zone : ${p.zoneRef}` : '',
      p.gravite ? `gravité : ${p.gravite}` : '',
      p.caption ? `légende : ${p.caption}` : '',
    ]
      .filter(Boolean)
      .join(' · ');
    userContent.push({ type: 'text', text: légende });
    userContent.push({ type: 'image', source: { type: 'url', url: p.url } });
  }

  const params = {
    model: REPORT_MODEL,
    max_tokens: 32000,
    thinking: { type: 'adaptive' },
    system: SYSTEM,
    output_config: {
      effort: 'high',
      format: { type: 'json_schema', schema: SCHEMA },
    },
    messages: [{ role: 'user', content: userContent }],
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
