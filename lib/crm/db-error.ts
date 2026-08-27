/**
 * Diagnostic d'une erreur de base — pour que le CRM dise la VÉRITÉ.
 *
 * Incident du 26-27 août 2026 : le back-office affichait « base de données non
 * accessible » alors que la base répondait parfaitement ; il lui manquait des
 * colonnes qu'une migration non appliquée devait créer (Prisma P2022). Le
 * message générique a fait chercher une panne d'hébergeur pendant 24 h, pour un
 * problème qui se réglait en trente secondes.
 *
 * Module PUR (aucun accès base) → testable.
 */

export type DbErrorKind = 'connexion' | 'schema' | 'timeout' | 'autre';

export interface DbErrorDiagnostic {
  kind: DbErrorKind;
  /** Message affichable à l'exploitant — dit la cause, pas une généralité. */
  message: string;
  /** Geste correctif, en une phrase. */
  action: string;
  /** Code Prisma d'origine, si présent. */
  code?: string;
}

/** Codes Prisma de rupture de connexion (base injoignable, réveil trop lent). */
const CODES_CONNEXION = ['P1001', 'P1002', 'P1017'];
/** Codes de DÉSYNCHRONISATION schéma ↔ code (colonne/table absente). */
const CODES_SCHEMA = ['P2021', 'P2022'];

function codeDe(err: unknown): string | undefined {
  const c = (err as { code?: unknown })?.code;
  return typeof c === 'string' ? c : undefined;
}

function texteDe(err: unknown): string {
  if (err instanceof Error) return err.message;
  return String(err ?? '');
}

/**
 * Classe une erreur de base pour l'afficher et l'alerter correctement.
 * Une colonne manquante n'est PAS une panne de base : c'est un déploiement
 * arrivé avant sa migration, et ça se corrige autrement.
 */
export function diagnoseDbError(err: unknown): DbErrorDiagnostic {
  const code = codeDe(err);
  const texte = texteDe(err);

  if (code && CODES_SCHEMA.includes(code)) {
    const colonne =
      (err as { meta?: { column?: unknown } })?.meta?.column ??
      texte.match(/column `([^`]+)`/i)?.[1];
    return {
      kind: 'schema',
      code,
      message: colonne
        ? `La base ne contient pas « ${colonne} » : une migration n'a pas été appliquée.`
        : "La structure de la base ne correspond pas au code : une migration n'a pas été appliquée.",
      action:
        'Appliquer la migration en attente (prisma migrate deploy, ou le SQL de prisma/migrations). La base elle-même fonctionne.',
    };
  }

  if (code && CODES_CONNEXION.includes(code)) {
    return {
      kind: 'connexion',
      code,
      message: 'La base de données est injoignable.',
      action:
        "Vérifier l'état de l'hébergeur (Neon) et la variable DATABASE_URL. Un réveil de base endormie se résout parfois tout seul en réessayant.",
    };
  }

  if (code === 'P2024' || /timeout|timed out/i.test(texte)) {
    return {
      kind: 'timeout',
      code,
      message: 'La base met trop de temps à répondre.',
      action: 'Réessayer dans un instant ; si cela persiste, vérifier la charge côté hébergeur.',
    };
  }

  return {
    kind: 'autre',
    code,
    message: 'Erreur inattendue lors de la lecture de la base.',
    action: 'Consulter les journaux du déploiement pour le détail.',
  };
}
