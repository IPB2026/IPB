/**
 * Gabarits de contenu des devis de diagnostic, par type de service.
 * Chaque gabarit alimente le PDF : objet de la mission, « l'intervention
 * comprend » (constats sur site) et « livrable remis ».
 * Fissures : matière fournie par le client. Humidité & expertise achat : 1ers jets.
 */
import type { ServiceType } from '@prisma/client';

export interface DevisTemplate {
  objet: string;
  intervention: string[];
  livrable: string[];
}

const FISSURES: DevisTemplate = {
  objet: 'Diagnostic des pathologies de fissures',
  intervention: [
    'Visite sur site et lecture complète du bâti, intérieur et extérieur',
    'Mesure des fissures au fissuromètre, caractérisation de leur morphologie et de leur activité',
    'Identification des causes probables : tassement différentiel, retrait-gonflement des argiles, défaut de structure ou de chaînage',
    'Examen des désordres associés : carrelages, menuiseries, planchers, huisseries',
    'Évaluation de la hiérarchie des désordres et de leur incidence structurelle',
    'Relevé photographique daté à l’appui de chaque constat',
  ],
  livrable: [
    'Rapport écrit remis sous 3 à 5 jours ouvrés après la visite',
    'Synthèse des constats appuyée de photographies légendées',
    'Identification des causes probables et hiérarchisation des points relevés',
    'Préconisations de principe et, si nécessaire, orientation vers les investigations complémentaires adaptées',
  ],
};

const HUMIDITE: DevisTemplate = {
  objet: 'Diagnostic humidité et infiltrations',
  intervention: [
    'Visite sur site et lecture complète du bâti, intérieur et extérieur',
    'Mesures d’humidité (humidimètre / hygromètre) sur murs, sols et points sensibles',
    'Recherche de l’origine : remontées capillaires, infiltration latérale, condensation, fuite, défaut d’étanchéité ou de ventilation',
    'Examen des manifestations : salpêtre, efflorescences, moisissures, décollements d’enduit, auréoles, odeurs',
    'Évaluation de l’étendue, de la gravité et de l’incidence sur le bâti et la salubrité',
    'Relevé photographique daté à l’appui de chaque constat',
  ],
  livrable: [
    'Rapport écrit remis sous 3 à 5 jours ouvrés après la visite',
    'Synthèse des constats avec photographies légendées et localisation des zones humides',
    'Identification de l’origine probable et hiérarchisation des désordres',
    'Préconisations de traitement (drainage, ventilation, traitement des remontées…) et orientation éventuelle vers des investigations complémentaires',
  ],
};

const EXPERTISE_ACHAT: DevisTemplate = {
  objet: 'Expertise structurelle avant achat',
  intervention: [
    'Visite du bien avec lecture structurelle complète, intérieur et extérieur',
    'Repérage des désordres apparents : fissures, humidité, affaissements, défauts de structure, charpente, toiture',
    'Mesures ciblées (fissuromètre, humidimètre) selon les constats',
    'Appréciation de l’état général et des risques d’évolution',
    'Mise en perspective avec le contexte : géologie / RGA, âge et mode constructif du bien',
    'Relevé photographique daté à l’appui de chaque constat',
  ],
  livrable: [
    'Rapport écrit remis sous 3 à 5 jours ouvrés après la visite, avant la décision d’achat',
    'Synthèse hiérarchisée des constats avec photographies légendées',
    'Points de vigilance et estimation indicative des travaux à prévoir',
    'Éléments d’aide à la négociation et, si nécessaire, orientation vers des investigations complémentaires',
  ],
};

const MUR_PORTEUR: DevisTemplate = {
  objet: 'Étude de faisabilité — ouverture de mur porteur',
  intervention: [
    'Visite sur site et repérage du mur concerné, intérieur et extérieur',
    'Analyse de la descente de charges et du rôle structurel du mur',
    'Examen du bâti existant : nature des matériaux, planchers, appuis, chaînages',
    'Évaluation des contraintes et des principes de reprise de charge possibles',
    'Relevé photographique et mesures à l’appui de chaque constat',
  ],
  livrable: [
    'Rapport écrit remis sous 3 à 5 jours ouvrés après la visite',
    'Synthèse de faisabilité avec photographies légendées',
    'Principes de reprise de charge envisageables et points de vigilance',
    'Orientation vers une note de calcul de bureau d’études (BET) pour le dimensionnement exécutif',
  ],
};

// ─────────────────────────────────────────────────────────────────
// 2ᵉ devis « accompagnement travaux » — émis après le rapport.
// Repéré par serviceType = AUTRE (sentinelle, cf. isDevisTravaux). IPB
// coordonne ; les travaux sont exécutés par les équipes de réalisation du
// réseau IPB, sous leur garantie décennale (lexique IPB strict).
// ─────────────────────────────────────────────────────────────────
const TRAVAUX: DevisTemplate = {
  objet: 'Accompagnement et coordination des travaux de reprise',
  intervention: [
    'Établissement du programme de travaux à partir des conclusions du rapport d’expertise',
    'Consultation et sélection des équipes de réalisation du réseau IPB (travaux exécutés sous garantie décennale)',
    'Planification et organisation du chantier : phasage, accès, délais',
    'Coordination et suivi d’exécution avec points de contrôle aux étapes clés',
    'Vérification de la conformité des travaux aux préconisations du rapport',
    'Assistance à la réception des travaux et à la levée des réserves',
  ],
  livrable: [
    'Programme de travaux chiffré, établi avec les équipes de réalisation mandatées',
    'Planning prévisionnel du chantier',
    'Comptes rendus de suivi aux étapes clés',
    'Assistance à la réception et accompagnement jusqu’à la levée des réserves',
    'Travaux exécutés par les équipes de réalisation du réseau IPB, sous leur garantie décennale',
  ],
};

const TEMPLATES: Record<ServiceType, DevisTemplate> = {
  FISSURES,
  HUMIDITE,
  EXPERTISE_ACHAT,
  MUR_PORTEUR,
  AUTRE: TRAVAUX,
};

/**
 * Le 2ᵉ devis (« accompagnement travaux ») est repéré par serviceType = AUTRE.
 * Le formulaire des devis diagnostic n'expose que FISSURES/HUMIDITE/EXPERTISE_ACHAT/
 * MUR_PORTEUR : AUTRE est donc une sentinelle fiable, sans champ de schéma dédié.
 */
export function isDevisTravaux(d: { serviceType?: ServiceType | null }): boolean {
  return d.serviceType === 'AUTRE';
}

export function devisTemplate(service?: ServiceType | null): DevisTemplate {
  return TEMPLATES[service ?? 'FISSURES'] ?? FISSURES;
}

/**
 * Devis SUR-MESURE : serviceType = null + contenu rédigé par l'IA, stocké en JSON
 * dans `notes` (zéro migration). `serialize` produit la chaîne à enregistrer.
 */
export function serializeDevisContent(c: { intervention: string[]; livrable: string[] }): string {
  return JSON.stringify({
    sm: 1, // marqueur « sur-mesure »
    intervention: c.intervention.filter(Boolean),
    livrable: c.livrable.filter(Boolean),
  });
}

/**
 * Contenu d'AFFICHAGE d'un devis (objet / déroulé / livrable), utilisé par le PDF
 * et la fiche : sur-mesure stocké si présent (notes JSON marqué `sm`), sinon le
 * gabarit du type de diagnostic.
 */
export function devisContent(d: {
  object?: string | null;
  serviceType?: ServiceType | null;
  notes?: string | null;
}): DevisTemplate {
  if ((d.serviceType ?? null) === null && d.notes) {
    try {
      const c = JSON.parse(d.notes) as {
        sm?: number;
        intervention?: unknown;
        livrable?: unknown;
      };
      if (c.sm === 1 && Array.isArray(c.intervention) && Array.isArray(c.livrable)) {
        return {
          objet: d.object || 'Mission sur-mesure',
          intervention: (c.intervention as string[]).filter(Boolean),
          livrable: (c.livrable as string[]).filter(Boolean),
        };
      }
    } catch {
      /* notes non-JSON (notes libres normales) → gabarit */
    }
  }
  const tpl = devisTemplate(d.serviceType);
  return { objet: d.object || tpl.objet, intervention: tpl.intervention, livrable: tpl.livrable };
}
