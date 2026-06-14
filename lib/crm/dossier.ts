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
} from '@prisma/client';

export interface DossierInputs {
  devis: { status: DevisStatus; totalHT: number; acceptedAt: Date | null }[];
  factures: { status: FactureStatus }[];
  rapports: { status: ReportStatus }[];
  appointments: { type: AppointmentType; status: AppointmentStatus }[];
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
  steps: DossierStep[];
}

export function computeDossier(d: DossierInputs): DossierView {
  const acceptedDevis = d.devis
    .filter((x) => x.status === 'ACCEPTE' || x.acceptedAt != null)
    .sort((a, b) => (b.acceptedAt?.getTime() ?? 0) - (a.acceptedAt?.getTime() ?? 0));

  const isClient = acceptedDevis.length > 0 || d.factures.length > 0;
  const clientSince = acceptedDevis[0]?.acceptedAt ?? null;
  const montant = acceptedDevis[0]?.totalHT ?? null;

  const devisEnvoye = d.devis.some((x) =>
    ['ENVOYE', 'ACCEPTE', 'REFUSE', 'EXPIRE'].includes(x.status)
  );
  const visiteFaite = d.appointments.some(
    (a) => a.type.startsWith('DIAGNOSTIC') && a.status === 'REALISE'
  );
  const rdvPris = d.appointments.some((a) => a.type.startsWith('DIAGNOSTIC'));
  const factureEnvoyee = d.factures.some((f) =>
    ['ENVOYEE', 'PAYEE'].includes(f.status)
  );
  const facturePayee = d.factures.some((f) => f.status === 'PAYEE');
  const rapportEnvoye = d.rapports.some((r) => r.status === 'ENVOYE');
  const travauxPlanifies = d.appointments.some(
    (a) => a.type === 'LANCEMENT_TRAVAUX'
  );

  const raw: { key: string; label: string; done: boolean }[] = [
    { key: 'devis', label: 'Devis envoyé', done: devisEnvoye || isClient },
    { key: 'client', label: 'Devis accepté (client)', done: isClient },
    { key: 'rdv', label: 'RDV diagnostic', done: rdvPris },
    { key: 'visite', label: 'Visite réalisée', done: visiteFaite },
    { key: 'facture', label: 'Facture émise', done: factureEnvoyee },
    { key: 'paiement', label: 'Paiement reçu', done: facturePayee },
    { key: 'rapport', label: 'Rapport transmis', done: rapportEnvoye },
  ];

  // L'étape courante = la première non faite.
  const firstTodo = raw.findIndex((s) => !s.done);
  const steps: DossierStep[] = raw.map((s, i) => ({
    ...s,
    current: i === firstTodo,
  }));

  // Travaux à planifier : devis accepté + pas (encore) de RDV de lancement.
  const travauxAPlanifier = isClient && rapportEnvoye && !travauxPlanifies;

  return { isClient, clientSince, montant, travauxAPlanifier, steps };
}
