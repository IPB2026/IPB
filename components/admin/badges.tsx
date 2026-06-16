import type {
  LeadTier,
  PipelineStage,
  LeadSource,
  ServiceType,
  DevisStatus,
  FactureStatus,
} from '@prisma/client';

// Libellés (texte seul — les indicateurs visuels sont des pastilles, pas des emojis)
export const TIER_LABEL: Record<LeadTier, string> = {
  HOT: 'Chaud',
  WARM: 'Tiède',
  COLD: 'Froid',
};

// Ordre du cycle (insertion = ordre d'affichage des selects/filtres).
export const STAGE_LABEL: Record<PipelineStage, string> = {
  NOUVEAU: 'Nouveau',
  A_RAPPELER: 'À rappeler',
  DEVIS_ENVOYE: 'Devis envoyé',
  RDV_PLANIFIE: 'RDV planifié',
  VISITE_FAITE: 'Visite faite',
  GAGNE: 'Gagné',
  PERDU: 'Perdu',
};

/** Étapes de progression du cycle (sans Gagné/Perdu) — colonnes Kanban & pipeline. */
export const PIPELINE_STAGES: PipelineStage[] = [
  'NOUVEAU',
  'A_RAPPELER',
  'DEVIS_ENVOYE',
  'RDV_PLANIFIE',
  'VISITE_FAITE',
];

export const SOURCE_LABEL: Record<LeadSource, string> = {
  DIAGNOSTIC: 'Diagnostic',
  CALCULATEUR: 'Calculateur',
  CONTACT: 'Contact',
  RAPPEL: 'Rappel',
  MANUEL: 'Manuel',
};

export const SERVICE_LABEL: Record<ServiceType, string> = {
  FISSURES: 'Fissures',
  HUMIDITE: 'Humidité',
  EXPERTISE_ACHAT: 'Expertise achat',
  MUR_PORTEUR: 'Mur porteur',
  AUTRE: 'Autre',
};

// Couleur du point par tier / étape (classes statiques pour Tailwind)
const TIER_DOT: Record<LeadTier, string> = {
  HOT: 'bg-orange-500',
  WARM: 'bg-amber-500',
  COLD: 'bg-slate-400',
};

const TIER_PILL: Record<LeadTier, string> = {
  HOT: 'bg-orange-50 text-orange-700 ring-orange-600/10',
  WARM: 'bg-amber-50 text-amber-700 ring-amber-600/10',
  COLD: 'bg-slate-100 text-slate-600 ring-slate-500/10',
};

const STAGE_DOT: Record<PipelineStage, string> = {
  NOUVEAU: 'bg-blue-500',
  A_RAPPELER: 'bg-orange-500',
  RDV_PLANIFIE: 'bg-violet-500',
  VISITE_FAITE: 'bg-cyan-500',
  DEVIS_ENVOYE: 'bg-amber-500',
  GAGNE: 'bg-emerald-500',
  PERDU: 'bg-slate-400',
};

const STAGE_PILL: Record<PipelineStage, string> = {
  NOUVEAU: 'bg-blue-50 text-blue-700 ring-blue-600/10',
  A_RAPPELER: 'bg-orange-50 text-orange-700 ring-orange-600/10',
  RDV_PLANIFIE: 'bg-violet-50 text-violet-700 ring-violet-600/10',
  VISITE_FAITE: 'bg-cyan-50 text-cyan-700 ring-cyan-600/10',
  DEVIS_ENVOYE: 'bg-amber-50 text-amber-700 ring-amber-600/10',
  GAGNE: 'bg-emerald-50 text-emerald-700 ring-emerald-600/10',
  PERDU: 'bg-slate-100 text-slate-500 ring-slate-500/10',
};

const pillBase =
  'inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset';

export function TierBadge({ tier }: { tier: LeadTier | null }) {
  if (!tier) return <span className="text-xs text-slate-300">—</span>;
  return (
    <span className={`${pillBase} ${TIER_PILL[tier]}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${TIER_DOT[tier]}`} />
      {TIER_LABEL[tier]}
    </span>
  );
}

export function StageBadge({ stage }: { stage: PipelineStage }) {
  return (
    <span className={`${pillBase} ${STAGE_PILL[stage]}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${STAGE_DOT[stage]}`} />
      {STAGE_LABEL[stage]}
    </span>
  );
}

// ── Phase de DOSSIER (source unique, identique partout : liste, fiche, pipeline,
//    pilotage). Couvre tout le cycle, du premier contact au suivi. ──────────────
export const PHASE_LABEL: Record<string, string> = {
  NOUVEAU: 'Nouveau',
  A_RAPPELER: 'À rappeler',
  DEVIS_ENVOYE: 'Devis envoyé',
  RDV_PLANIFIE: 'RDV planifié',
  VISITE_FAITE: 'Visite réalisée',
  FACTURE_ENVOYEE: 'Facture envoyée',
  PAIEMENT_RECU: 'Paiement reçu',
  RAPPORT: 'Rapport à faire',
  SUIVI: 'Suivi',
  TERMINE: 'Terminé',
  ACCOMPAGNEMENT_TRAVAUX: 'Accompagnement travaux',
  TRAVAUX_LANCES: 'Travaux lancés',
  GAGNE: 'Gagné',
  PERDU: 'Perdu',
};

const PHASE_PILL: Record<string, string> = {
  NOUVEAU: 'bg-slate-100 text-slate-600',
  A_RAPPELER: 'bg-amber-50 text-amber-700',
  DEVIS_ENVOYE: 'bg-orange-50 text-orange-700',
  RDV_PLANIFIE: 'bg-blue-50 text-blue-700',
  VISITE_FAITE: 'bg-violet-50 text-violet-700',
  FACTURE_ENVOYEE: 'bg-cyan-50 text-cyan-700',
  PAIEMENT_RECU: 'bg-emerald-50 text-emerald-700',
  RAPPORT: 'bg-blue-50 text-blue-700',
  SUIVI: 'bg-teal-50 text-teal-700',
  TERMINE: 'bg-slate-100 text-slate-500',
  ACCOMPAGNEMENT_TRAVAUX: 'bg-amber-50 text-amber-700',
  TRAVAUX_LANCES: 'bg-orange-50 text-orange-700',
  GAGNE: 'bg-emerald-50 text-emerald-700',
  PERDU: 'bg-slate-100 text-slate-500',
};

export function PhaseBadge({ phase }: { phase: string }) {
  return (
    <span className={`${pillBase} ${PHASE_PILL[phase] ?? 'bg-slate-100 text-slate-600'}`}>
      {PHASE_LABEL[phase] ?? phase}
    </span>
  );
}

export { TIER_DOT };

// ── Statuts devis / facture ─────────────────────────────────────
export const DEVIS_STATUS_LABEL: Record<DevisStatus, string> = {
  BROUILLON: 'Brouillon',
  ENVOYE: 'Envoyé',
  ACCEPTE: 'Accepté',
  REFUSE: 'Refusé',
  EXPIRE: 'Expiré',
};

const DEVIS_STATUS_PILL: Record<DevisStatus, string> = {
  BROUILLON: 'bg-slate-100 text-slate-600 ring-slate-500/10',
  ENVOYE: 'bg-blue-50 text-blue-700 ring-blue-600/10',
  ACCEPTE: 'bg-emerald-50 text-emerald-700 ring-emerald-600/10',
  REFUSE: 'bg-slate-100 text-slate-500 ring-slate-500/10',
  EXPIRE: 'bg-amber-50 text-amber-700 ring-amber-600/10',
};

export const FACTURE_STATUS_LABEL: Record<FactureStatus, string> = {
  BROUILLON: 'Brouillon',
  ENVOYEE: 'Envoyée',
  PAYEE: 'Payée',
  ANNULEE: 'Annulée',
};

const FACTURE_STATUS_PILL: Record<FactureStatus, string> = {
  BROUILLON: 'bg-slate-100 text-slate-600 ring-slate-500/10',
  ENVOYEE: 'bg-blue-50 text-blue-700 ring-blue-600/10',
  PAYEE: 'bg-emerald-50 text-emerald-700 ring-emerald-600/10',
  ANNULEE: 'bg-slate-100 text-slate-500 ring-slate-500/10',
};

export function DevisStatusBadge({ status }: { status: DevisStatus }) {
  return (
    <span className={`${pillBase} ${DEVIS_STATUS_PILL[status]}`}>
      {DEVIS_STATUS_LABEL[status]}
    </span>
  );
}

export function FactureStatusBadge({ status }: { status: FactureStatus }) {
  return (
    <span className={`${pillBase} ${FACTURE_STATUS_PILL[status]}`}>
      {FACTURE_STATUS_LABEL[status]}
    </span>
  );
}
