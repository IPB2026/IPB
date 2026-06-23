/**
 * Suivi de dossier IPB — état dérivé des artefacts (devis/RDV/facture/rapport),
 * pas d'un enum manuel. Reflète le cycle de vie officiel :
 * prospect → devis envoyé → (accepté = CLIENT) → RDV diagnostic → visite faite
 * → facture → payée → rapport → suivi travaux éventuel.
 */
import type {
  DevisStatus,
  FactureStatus,
  ReportStatus,
  AppointmentStatus,
  AppointmentType,
  ServiceType,
} from '@prisma/client';
import { RULES } from './rules';

export interface DossierInputs {
  devis: {
    status: DevisStatus;
    totalHT: number;
    acceptedAt: Date | null;
    /** AUTRE = 2ᵉ devis « accompagnement travaux » (cf. lib/crm/devis-templates). */
    serviceType?: ServiceType | null;
  }[];
  factures: { status: FactureStatus }[];
  /** budgetHT : estimation chiffrée des travaux dans le rapport. Présent (≠ null)
   *  ⟺ rapport AVEC estimation budgétaire → branche SUIVI ; absent → TERMINÉ. */
  rapports: { status: ReportStatus; budgetHT?: number | null }[];
  appointments: { type: AppointmentType; status: AppointmentStatus }[];
  /**
   * Étape du pipeline (lead.stage), si connue. Permet au suivi du dossier de
   * refléter une étape réglée MANUELLEMENT (ex. « Devis envoyé ») même avant
   * que l'artefact correspondant n'existe — cohérence Suivi prospect ↔ dossier.
   */
  stage?: string | null;
  /**
   * Phase forcée MANUELLEMENT (override « liberté totale »). Si renseignée, elle
   * PRIME sur toute la dérivation : `phase` = `manualPhase`, et les paliers du
   * suivi sont cochés jusqu'à cette phase — sans qu'aucun artefact (devis,
   * facture, rapport…) ne soit requis. `null` = suivi automatique (comportement
   * d'origine). Remis à `null` par le bouton « revenir au suivi auto ».
   */
  manualPhase?: string | null;
  /** Date d'envoi du rapport (≈ updatedAt du rapport ENVOYE). Sert à faire sortir
   *  le dossier de la phase « Suivi » au bout de 2 semaines → « Terminé ». */
  rapportEnvoyeAt?: Date | null;
}

/**
 * Construit l'entrée de `computeDossier` à partir des artefacts d'un contact.
 * SOURCE UNIQUE du mapping (Decimal→number, extraction des champs, rapportEnvoyeAt)
 * — évite la duplication (jadis recopiée dans 6 fichiers, source de divergences).
 * Les sélections Prisma doivent inclure : devis(status,totalHT,acceptedAt,serviceType),
 * factures(status), rapports(status,updatedAt,budgetHT), appointments(type,status).
 */
export function dossierInputFromContact(
  contact: {
    devis: { status: DevisStatus; totalHT: unknown; acceptedAt: Date | null; serviceType: ServiceType | null }[];
    factures: { status: FactureStatus }[];
    rapports: { status: ReportStatus; updatedAt: Date; budgetHT: unknown }[];
    appointments: { type: AppointmentType; status: AppointmentStatus }[];
  },
  opts?: { stage?: string | null; manualPhase?: string | null }
): DossierInputs {
  return {
    devis: contact.devis.map((d) => ({
      status: d.status,
      totalHT: Number(d.totalHT),
      acceptedAt: d.acceptedAt,
      serviceType: d.serviceType,
    })),
    factures: contact.factures.map((f) => ({ status: f.status })),
    rapports: contact.rapports.map((r) => ({
      status: r.status,
      budgetHT: r.budgetHT != null ? Number(r.budgetHT) : null,
    })),
    appointments: contact.appointments.map((a) => ({ type: a.type, status: a.status })),
    stage: opts?.stage ?? null,
    manualPhase: opts?.manualPhase ?? null,
    rapportEnvoyeAt: contact.rapports.find((r) => r.status === 'ENVOYE')?.updatedAt ?? null,
  };
}

/**
 * Ordre canonique des phases du dossier — du 1er contact au « Terminé ». SOURCE
 * UNIQUE de l'ordonnancement, utilisée pour (a) cocher les paliers quand une phase
 * est forcée à la main, et (b) la navigation ◄ ► du pipeline. « À rappeler » est
 * replié sur « Nouveau » (comme partout). Les états terminaux GAGNE/PERDU et la
 * branche TRAVAUX sont gérés à part (hors séquence linéaire).
 */
export const PHASE_SEQUENCE = [
  'NOUVEAU',
  'DEVIS_ENVOYE',
  'DEVIS_VALIDE',
  'RDV_PLANIFIE',
  'VISITE_FAITE',
  'FACTURE_ENVOYEE',
  'PAIEMENT_RECU',
  'RAPPORT',
  'SUIVI',
  'TERMINE',
] as const;

/**
 * Phase de la séquence à partir de laquelle chaque palier du suivi est « fait ».
 * Sert UNIQUEMENT au mode manuel : quand l'utilisateur force une phase, on coche
 * tous les paliers dont le seuil est ≤ à la phase choisie (sans artefact requis).
 */
const STEP_THRESHOLD: Record<string, (typeof PHASE_SEQUENCE)[number]> = {
  devis: 'DEVIS_ENVOYE',
  client: 'DEVIS_VALIDE', // devis accepté = « Devis validé » (avant la planif. du RDV)
  rdv: 'RDV_PLANIFIE',
  visite: 'VISITE_FAITE',
  facture: 'FACTURE_ENVOYEE',
  paiement: 'PAIEMENT_RECU',
  rapport: 'SUIVI', // « Rapport transmis » ⇒ on est en phase Suivi/Terminé
  suivi: 'TERMINE',
  devis_travaux: 'TERMINE',
  travaux: 'TERMINE',
};

/**
 * Toutes les phases qu'on peut forcer À LA MAIN (séquence linéaire + « À rappeler »,
 * états terminaux GAGNE/PERDU et branche TRAVAUX). Sert de garde-fou aux actions
 * serveur (« liberté totale », mais on n'accepte qu'une clé de phase connue).
 */
export const ALL_PHASES = [
  'NOUVEAU',
  'A_RAPPELER',
  'DEVIS_ENVOYE',
  'DEVIS_VALIDE',
  'RDV_PLANIFIE',
  'VISITE_FAITE',
  'FACTURE_ENVOYEE',
  'PAIEMENT_RECU',
  'RAPPORT',
  'SUIVI',
  'TERMINE',
  'ACCOMPAGNEMENT_TRAVAUX',
  'TRAVAUX_LANCES',
  'GAGNE',
  'PERDU',
] as const;

export type PhaseKey = (typeof ALL_PHASES)[number];

export function isValidPhase(p: string): p is PhaseKey {
  return (ALL_PHASES as readonly string[]).includes(p);
}

/**
 * Phases « CLIENT » : à partir de « Devis validé » et sur toute la suite du cycle
 * (RDV, visite, facture, paiement, rapport, suivi, travaux, gagné). En deçà
 * (Nouveau, À rappeler, Devis envoyé) ou en Perdu ⇒ encore un PROSPECT. SOURCE
 * UNIQUE du statut Prospect/Client, partagée par le badge (dérivé de la phase) et
 * la requête de comptage (cf. CLIENT_CONTACT_WHERE pour l'équivalent Prisma).
 */
export const CLIENT_PHASES = new Set<string>([
  'DEVIS_VALIDE',
  'RDV_PLANIFIE',
  'VISITE_FAITE',
  'FACTURE_ENVOYEE',
  'PAIEMENT_RECU',
  'RAPPORT',
  'SUIVI',
  'TERMINE',
  'ACCOMPAGNEMENT_TRAVAUX',
  'TRAVAUX_LANCES',
  'GAGNE',
]);

/**
 * Phases (réglées À LA MAIN) qui signifient que le RAPPORT est traité/transmis ou
 * au-delà → plus aucune tâche « rapport à générer / à rédiger » ne doit s'afficher
 * pour ce dossier, même sans rapport ENVOYÉ en base (cas du gérant qui pilote le
 * dossier manuellement ou produit le rapport hors CRM). « RAPPORT » est EXCLU
 * (= rapport encore à faire). SOURCE UNIQUE pour le tableau de bord + le nettoyage.
 */
export const REPORT_DONE_MANUAL_PHASES = [
  'SUIVI',
  'TERMINE',
  'ACCOMPAGNEMENT_TRAVAUX',
  'TRAVAUX_LANCES',
];

/** Index d'une phase dans la séquence canonique (-1 si hors séquence). */
export function phaseIndex(phase: string | null | undefined): number {
  if (!phase) return -1;
  const p = phase === 'A_RAPPELER' ? 'NOUVEAU' : phase;
  return (PHASE_SEQUENCE as readonly string[]).indexOf(p);
}

/** Nb de jours pendant lesquels un dossier reste en « Suivi » après le rapport. */
const SUIVI_DAYS = RULES.suiviDays; // cf. lib/crm/rules.ts (config unique)
const DAY = 86_400_000;

/**
 * Types de RDV « diagnostic » (= visite sur site qui fait avancer le dossier ET
 * facturable automatiquement). SOURCE UNIQUE — réutilisée par invoicing.ts, le
 * dashboard et l'agenda (ne pas redéfinir ailleurs : ajouter un type ici suffit).
 * ⚠️ Inclut EXPERTISE_ACHAT et MUR_PORTEUR : un `startsWith('DIAGNOSTIC')` les
 * raterait alors que ce sont des diagnostics à part entière.
 */
export const DIAGNOSTIC_VISIT_TYPES: AppointmentType[] = [
  'DIAGNOSTIC_FISSURES',
  'DIAGNOSTIC_HUMIDITE',
  'EXPERTISE_ACHAT',
  'MUR_PORTEUR',
];

export interface DossierStep {
  key: string;
  label: string;
  done: boolean;
  current: boolean;
}

export interface DossierView {
  isClient: boolean;
  clientSince: Date | null;
  montant: number | null; // total du devis ACCEPTÉ (CA signé) — null si pas encore accepté
  /** Montant du devis le plus pertinent, accepté OU envoyé (le « pipe » côté
   *  dossier). Exclut brouillons/refusés/expirés. Affichable dès le devis envoyé. */
  montantDevis: number | null;
  /** Phase canonique du dossier (= colonne de pipeline). SOURCE UNIQUE partagée
   *  par la liste, la fiche, le pipeline et le tableau de bord. */
  phase: string;
  travauxAPlanifier: boolean;
  /** Rapport remis, mais le client n'a pas encore décidé des suites (pas de devis travaux). */
  enSuiviClient: boolean;
  /** Un 2ᵉ devis « accompagnement travaux » a été émis pour ce dossier. */
  hasDevisTravaux: boolean;
  steps: DossierStep[];
}

export function computeDossier(d: DossierInputs): DossierView {
  const acceptedDevis = d.devis
    .filter((x) => x.status === 'ACCEPTE' || x.acceptedAt != null)
    .sort((a, b) => (b.acceptedAt?.getTime() ?? 0) - (a.acceptedAt?.getTime() ?? 0));

  // Artefact « client » concret (devis accepté ou facture). Sert à faire avancer
  // la phase ; le statut Prospect/Client public, lui, est DÉRIVÉ de la phase finale
  // (cf. `isClient` plus bas) pour une cohérence stricte badge ⇔ phase partout.
  const hasClientArtifact = acceptedDevis.length > 0 || d.factures.length > 0;
  // Montant/date du dossier = devis diagnostic accepté en priorité (pas le
  // 2ᵉ devis « travaux »), sinon le plus récent accepté.
  const primaryDevis =
    acceptedDevis.find((x) => x.serviceType !== 'AUTRE') ?? acceptedDevis[0];
  const clientSince = primaryDevis?.acceptedAt ?? null;
  const montant = primaryDevis?.totalHT ?? null;
  // Montant du devis le plus pertinent même non accepté : devis accepté en
  // priorité, sinon n'importe quel devis diagnostic (le plus récent fourni).
  // Devis envoyé/accepté uniquement (jamais brouillon, refusé ou expiré).
  const primaryAnyDevis =
    primaryDevis ??
    d.devis.find(
      (x) => x.serviceType !== 'AUTRE' && ['ENVOYE', 'ACCEPTE'].includes(x.status)
    );
  const montantDevis = primaryAnyDevis?.totalHT ?? null;

  // Avancement déduit AUSSI de l'étape pipeline réglée manuellement.
  const st = d.stage ?? '';
  const stageDevis = ['DEVIS_ENVOYE', 'RDV_PLANIFIE', 'VISITE_FAITE', 'GAGNE'].includes(st);
  const stageRdv = ['RDV_PLANIFIE', 'VISITE_FAITE'].includes(st);
  const stageVisite = st === 'VISITE_FAITE';

  const devisEnvoye =
    stageDevis ||
    d.devis.some((x) => ['ENVOYE', 'ACCEPTE', 'REFUSE', 'EXPIRE'].includes(x.status));
  const visiteFaite =
    stageVisite ||
    d.appointments.some(
      (a) => DIAGNOSTIC_VISIT_TYPES.includes(a.type) && a.status === 'REALISE'
    );
  const rdvPris =
    stageRdv || d.appointments.some((a) => DIAGNOSTIC_VISIT_TYPES.includes(a.type));
  const factureEnvoyee = d.factures.some((f) =>
    ['ENVOYEE', 'PAYEE'].includes(f.status)
  );
  const facturePayee = d.factures.some((f) => f.status === 'PAYEE');
  const rapportEnvoye = d.rapports.some((r) => r.status === 'ENVOYE');
  // Rapport en cours de rédaction (créé mais pas encore envoyé) = « à faire/à envoyer ».
  const rapportEnCours = !rapportEnvoye && d.rapports.length > 0;
  // Rapport remis AVEC estimation budgétaire (budgetHT chiffré) ⇒ branche SUIVI
  // (le client peut vouloir les travaux). Sans estimation ⇒ TERMINÉ direct.
  const rapportAvecEstimation = d.rapports.some(
    (r) => r.status === 'ENVOYE' && r.budgetHT != null && r.budgetHT > 0
  );
  const travauxPlanifies = d.appointments.some(
    (a) => a.type === 'LANCEMENT_TRAVAUX'
  );
  // 2ᵉ devis « accompagnement travaux » = devis de service AUTRE (sentinelle) —
  // MAIS uniquement s'il coexiste avec un VRAI devis diagnostic (service ≠ AUTRE).
  // Sinon un devis diagnostic légitimement créé en « AUTRE » (lead formulaire de
  // contact, dont le service par défaut est AUTRE) serait pris à tort pour un
  // devis travaux. ⚠️ montant/pipe = diagnostic, jamais travaux.
  const hasDiagnosticDevis = d.devis.some((x) => x.serviceType !== 'AUTRE');
  const hasDevisTravaux =
    hasDiagnosticDevis && d.devis.some((x) => x.serviceType === 'AUTRE');
  const perdu = st === 'PERDU';

  // Sortie automatique de « Suivi » après 2 semaines sans mouvement (→ Terminé),
  // sauf si une branche travaux est engagée.
  const rapportAt = d.rapportEnvoyeAt ?? null;
  const suiviExpire =
    rapportEnvoye &&
    !hasDevisTravaux &&
    !travauxPlanifies &&
    rapportAt != null &&
    Date.now() - rapportAt.getTime() > SUIVI_DAYS * DAY;

  // Cycle de vie réel IPB : il s'arrête au rapport. Les travaux sont
  // EXCEPTIONNELS (~10 % des dossiers) : on ne les affiche QUE si un 2ᵉ devis
  // « accompagnement travaux » a été émis (ou un lancement déjà planifié). On ne
  // pousse jamais à « planifier des travaux ».
  // Cycle DIAGNOSTIC (le tronc commun). Le « suivi » est toujours présent après
  // le rapport ; il est considéré « fait » dès qu'il expire (2 semaines) ou qu'une
  // branche travaux démarre.
  const raw: { key: string; label: string; done: boolean }[] = [
    { key: 'devis', label: 'Devis diagnostic envoyé', done: devisEnvoye || hasClientArtifact },
    { key: 'client', label: 'Devis accepté (client)', done: hasClientArtifact },
    { key: 'rdv', label: "Date d'intervention", done: rdvPris },
    { key: 'visite', label: 'Visite réalisée', done: visiteFaite },
    { key: 'facture', label: 'Facture envoyée', done: factureEnvoyee },
    { key: 'paiement', label: 'Paiement reçu', done: facturePayee },
    { key: 'rapport', label: 'Rapport transmis', done: rapportEnvoye },
    {
      key: 'suivi',
      label: 'Suivi client',
      // Suivi « fait » dès que : rapport sans estimation (rien à suivre), ou suivi
      // expiré (2 sem.), ou une branche travaux a démarré.
      done:
        rapportEnvoye &&
        (!rapportAvecEstimation || suiviExpire || hasDevisTravaux || travauxPlanifies),
    },
  ];

  // BRANCHE TRAVAUX (optionnelle, distincte du diagnostic) — seulement APRÈS le
  // diagnostic livré (rapport envoyé) ET si un devis travaux a été chiffré (ou un
  // lancement déjà planifié). Ne jamais confondre avec le devis diagnostic.
  if (rapportEnvoye && (hasDevisTravaux || travauxPlanifies)) {
    raw.push(
      { key: 'devis_travaux', label: 'Devis travaux émis', done: hasDevisTravaux },
      { key: 'travaux', label: 'Travaux lancés', done: travauxPlanifies },
    );
  }

  // OVERRIDE MANUEL (« liberté totale ») : si une phase est forcée à la main, on
  // coche TOUS les paliers dont le seuil est ≤ à la phase choisie — sans exiger
  // l'artefact correspondant (devis, facture, rapport…). On n'ajoute que des
  // « faits » : un artefact réel déjà coché ne peut pas être décoché par ce biais.
  const manualPhase = d.manualPhase ?? null;
  const manualIdx = phaseIndex(manualPhase);
  if (manualIdx >= 0) {
    for (const s of raw) {
      const t = STEP_THRESHOLD[s.key];
      if (t && phaseIndex(t) <= manualIdx) s.done = true;
    }
  }

  // MONOTONIE : un palier est « fait » dès qu'un palier PLUS AVANCÉ l'est. Sans
  // ça, une facture payée sans RDV enregistré ferait retomber l'étape courante
  // sur « planifier la visite » (bug Jeremy Duran). On propage donc 'done' vers
  // l'amont, puis l'étape courante = la 1ʳᵉ non faite après le dernier palier atteint.
  for (let i = raw.length - 2; i >= 0; i--) {
    if (raw[i + 1].done) raw[i].done = true;
  }
  const firstTodo = raw.findIndex((s) => !s.done);
  const steps: DossierStep[] = raw.map((s, i) => ({
    ...s,
    current: i === firstTodo,
  }));

  // Phase canonique (= colonne pipeline) : milestone le plus avancé atteint.
  // Séquence : Nouveau → Devis envoyé → RDV planifié → Visite réalisée → Facture
  // envoyée → Paiement reçu → Rapport (à faire/à envoyer) → Suivi (2 sem.) →
  // Terminé. Branche travaux séparée. Perdu = devis diagnostic non validé.
  let phase: string;
  if (perdu) phase = 'PERDU';
  // La branche travaux n'existe qu'APRÈS le diagnostic livré (rapport envoyé) :
  // un devis « AUTRE » ou un RDV travaux isolé ne doit JAMAIS court-circuiter le
  // cycle diagnostic (bug Maxim : facture envoyée non payée affichée « Travaux lancés »).
  else if (rapportEnvoye) {
    if (travauxPlanifies) phase = 'TRAVAUX_LANCES';
    else if (hasDevisTravaux) phase = 'ACCOMPAGNEMENT_TRAVAUX';
    // Préconisations SEULES (pas d'estimation) ⇒ TERMINÉ direct ; avec estimation
    // ⇒ SUIVI (2 sem. puis TERMINÉ). Conforme à la règle métier du gérant.
    else if (!rapportAvecEstimation) phase = 'TERMINE';
    else phase = suiviExpire ? 'TERMINE' : 'SUIVI';
  }
  // RÈGLE MÉTIER : le rapport ne se fait QU'APRÈS encaissement. Tant que la
  // facture n'est pas PAYÉE, un brouillon de rapport ne fait PAS passer en phase
  // « Rapport » — le dossier reste « Facture envoyée » (en attente de paiement).
  else if (facturePayee) phase = rapportEnCours ? 'RAPPORT' : 'PAIEMENT_RECU';
  else if (factureEnvoyee) phase = 'FACTURE_ENVOYEE';
  else if (visiteFaite) phase = 'VISITE_FAITE';
  else if (rdvPris) phase = 'RDV_PLANIFIE';
  // Devis accepté mais visite pas encore planifiée = « Devis validé » (étape
  // intercalée entre Devis envoyé et RDV planifié — cf. workflow officiel).
  else if (hasClientArtifact) phase = 'DEVIS_VALIDE';
  else if (devisEnvoye) phase = 'DEVIS_ENVOYE';
  else phase = st || 'NOUVEAU';

  // L'OVERRIDE MANUEL prime sur la phase dérivée (peut être en avant comme en
  // arrière du flux automatique). C'est le dernier mot : « liberté totale ».
  if (manualPhase) phase = manualPhase;

  // STATUT PROSPECT/CLIENT — DÉRIVÉ DE LA PHASE (source unique). Un contact devient
  // CLIENT dès « Devis validé » et le reste sur toute la suite du cycle. Garantit
  // que le badge Prospect/Client ne contredit JAMAIS la phase affichée (fini le cas
  // « phase = Rapport transmis » mais badge « Prospect »). Avant « Devis validé »
  // (Nouveau, À rappeler, Devis envoyé) ou en Perdu ⇒ Prospect.
  const isClient = CLIENT_PHASES.has(phase);

  // Suivi « simple » = rapport remis sans devis travaux (la norme). Pas de relance
  // travaux. Quand une phase est forcée à la main, on n'affiche plus de « prochaine
  // étape » automatique (l'utilisateur pilote lui-même).
  const enSuiviClient =
    !manualPhase &&
    rapportEnvoye && rapportAvecEstimation && !hasDevisTravaux && !travauxPlanifies;
  // Travaux à planifier : UNIQUEMENT après le rapport, si un devis travaux a été
  // émis sans lancement encore planifié.
  const travauxAPlanifier =
    !manualPhase && rapportEnvoye && hasDevisTravaux && !travauxPlanifies;

  return {
    isClient,
    clientSince,
    montant,
    montantDevis,
    phase,
    travauxAPlanifier,
    enSuiviClient,
    hasDevisTravaux,
    steps,
  };
}
