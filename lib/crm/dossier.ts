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

export interface DossierInputs {
  devis: {
    status: DevisStatus;
    totalHT: number;
    acceptedAt: Date | null;
    /** AUTRE = 2ᵉ devis « accompagnement travaux » (cf. lib/crm/devis-templates). */
    serviceType?: ServiceType | null;
  }[];
  factures: { status: FactureStatus }[];
  rapports: { status: ReportStatus }[];
  appointments: { type: AppointmentType; status: AppointmentStatus }[];
  /**
   * Étape du pipeline (lead.stage), si connue. Permet au suivi du dossier de
   * refléter une étape réglée MANUELLEMENT (ex. « Devis envoyé ») même avant
   * que l'artefact correspondant n'existe — cohérence Suivi prospect ↔ dossier.
   */
  stage?: string | null;
  /** Date d'envoi du rapport (≈ updatedAt du rapport ENVOYE). Sert à faire sortir
   *  le dossier de la phase « Suivi » au bout de 2 semaines → « Terminé ». */
  rapportEnvoyeAt?: Date | null;
}

/** Nb de jours pendant lesquels un dossier reste en « Suivi » après le rapport. */
const SUIVI_DAYS = 14;
const DAY = 86_400_000;

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

  const isClient = acceptedDevis.length > 0 || d.factures.length > 0;
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
      (a) => a.type.startsWith('DIAGNOSTIC') && a.status === 'REALISE'
    );
  const rdvPris =
    stageRdv || d.appointments.some((a) => a.type.startsWith('DIAGNOSTIC'));
  const factureEnvoyee = d.factures.some((f) =>
    ['ENVOYEE', 'PAYEE'].includes(f.status)
  );
  const facturePayee = d.factures.some((f) => f.status === 'PAYEE');
  const rapportEnvoye = d.rapports.some((r) => r.status === 'ENVOYE');
  // Rapport en cours de rédaction (créé mais pas encore envoyé) = « à faire/à envoyer ».
  const rapportEnCours = !rapportEnvoye && d.rapports.length > 0;
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
    { key: 'devis', label: 'Devis diagnostic envoyé', done: devisEnvoye || isClient },
    { key: 'client', label: 'Devis accepté (client)', done: isClient },
    { key: 'rdv', label: "Date d'intervention", done: rdvPris },
    { key: 'visite', label: 'Visite réalisée', done: visiteFaite },
    { key: 'facture', label: 'Facture envoyée', done: factureEnvoyee },
    { key: 'paiement', label: 'Paiement reçu', done: facturePayee },
    { key: 'rapport', label: 'Rapport transmis', done: rapportEnvoye },
    {
      key: 'suivi',
      label: 'Suivi client',
      done: suiviExpire || (rapportEnvoye && (hasDevisTravaux || travauxPlanifies)),
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
    else phase = suiviExpire ? 'TERMINE' : 'SUIVI';
  }
  // RÈGLE MÉTIER : le rapport ne se fait QU'APRÈS encaissement. Tant que la
  // facture n'est pas PAYÉE, un brouillon de rapport ne fait PAS passer en phase
  // « Rapport » — le dossier reste « Facture envoyée » (en attente de paiement).
  else if (facturePayee) phase = rapportEnCours ? 'RAPPORT' : 'PAIEMENT_RECU';
  else if (factureEnvoyee) phase = 'FACTURE_ENVOYEE';
  else if (visiteFaite) phase = 'VISITE_FAITE';
  else if (rdvPris) phase = 'RDV_PLANIFIE';
  else if (isClient) phase = 'RDV_PLANIFIE'; // devis accepté → planifier la visite
  else if (devisEnvoye) phase = 'DEVIS_ENVOYE';
  else phase = st || 'NOUVEAU';

  // Suivi « simple » = rapport remis sans devis travaux (la norme). Pas de relance travaux.
  const enSuiviClient =
    rapportEnvoye && !hasDevisTravaux && !travauxPlanifies;
  // Travaux à planifier : UNIQUEMENT après le rapport, si un devis travaux a été
  // émis sans lancement encore planifié.
  const travauxAPlanifier = rapportEnvoye && hasDevisTravaux && !travauxPlanifies;

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
