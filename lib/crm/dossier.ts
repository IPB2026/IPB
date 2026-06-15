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
}

export interface DossierStep {
  key: string;
  label: string;
  done: boolean;
  current: boolean;
}

export interface DossierView {
  isClient: boolean;
  clientSince: Date | null;
  montant: number | null; // total du devis accepté le plus récent
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
  const travauxPlanifies = d.appointments.some(
    (a) => a.type === 'LANCEMENT_TRAVAUX'
  );
  // 2ᵉ devis « accompagnement travaux » = devis de service AUTRE (sentinelle).
  const hasDevisTravaux = d.devis.some((x) => x.serviceType === 'AUTRE');

  // Cycle de vie réel IPB : il s'arrête au rapport. Les travaux sont
  // EXCEPTIONNELS (~10 % des dossiers) : on ne les affiche QUE si un 2ᵉ devis
  // « accompagnement travaux » a été émis (ou un lancement déjà planifié). On ne
  // pousse jamais à « planifier des travaux ».
  const raw: { key: string; label: string; done: boolean }[] = [
    { key: 'devis', label: 'Devis envoyé', done: devisEnvoye || isClient },
    { key: 'client', label: 'Devis accepté (client)', done: isClient },
    { key: 'rdv', label: "Date d'intervention", done: rdvPris },
    { key: 'visite', label: 'Visite réalisée', done: visiteFaite },
    { key: 'facture', label: 'Facture envoyée', done: factureEnvoyee },
    { key: 'paiement', label: 'Paiement reçu', done: facturePayee },
    { key: 'rapport', label: 'Rapport transmis', done: rapportEnvoye },
    // Après le rapport il y a TOUJOURS un suivi client (faire le point sur les
    // préconisations) — « terminé » seulement si les travaux sont lancés. Le
    // libellé bascule en « Accompagnement travaux » dès qu'un devis travaux existe.
    {
      key: 'suivi',
      label: hasDevisTravaux ? 'Accompagnement travaux' : 'Suivi client',
      done: travauxPlanifies,
    },
  ];

  // Étape « Travaux lancés » ajoutée seulement si des travaux sont engagés.
  if (hasDevisTravaux || travauxPlanifies) {
    raw.push({ key: 'travaux', label: 'Travaux lancés', done: travauxPlanifies });
  }

  // L'étape courante = la première non faite.
  const firstTodo = raw.findIndex((s) => !s.done);
  const steps: DossierStep[] = raw.map((s, i) => ({
    ...s,
    current: i === firstTodo,
  }));

  // Suivi « simple » = rapport remis sans devis travaux (la norme). Pas de relance travaux.
  const enSuiviClient =
    rapportEnvoye && !hasDevisTravaux && !travauxPlanifies;
  // Travaux à planifier : UNIQUEMENT si un devis travaux a été émis sans lancement.
  const travauxAPlanifier = hasDevisTravaux && !travauxPlanifies;

  return {
    isClient,
    clientSince,
    montant,
    travauxAPlanifier,
    enSuiviClient,
    hasDevisTravaux,
    steps,
  };
}
