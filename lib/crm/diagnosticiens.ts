/**
 * Registre des entreprises de diagnostic mandatées par l'IPB.
 * Le diagnostiqueur réalise le diagnostic, produit le rapport et engage sa RC pro.
 * L'IPB coordonne et met en forme. Cf. mémoire identité légale + cycle client.
 *
 * Sélection : Bâti Halli est le diagnostiqueur privilégié (par défaut, tous types).
 * Toi mon Toit n'intervient QUE sur les diagnostics humidité, et uniquement s'il
 * est l'expert assigné au dossier.
 */
import type { ServiceType } from '@prisma/client';

export interface Diagnosticien {
  nomCommercial: string;
  siret: string;
  rcAssureur: string | null;
  rcPolice: string | null;
}

export const BATI_HALLI: Diagnosticien = {
  nomCommercial: 'Bâti Halli',
  siret: '398 185 421 00037',
  rcAssureur: 'MILA',
  rcPolice: 'RCPML005417',
};

export const TOI_MON_TOIT: Diagnosticien = {
  nomCommercial: 'Toi mon Toit',
  siret: '979 947 587 00015',
  rcAssureur: null, // RC pro à fournir
  rcPolice: null,
};

/** E-mails des comptes EXPERT → entreprise mandatée. */
const BY_EMAIL: Record<string, Diagnosticien> = {
  'contact@toimontoit31.fr': TOI_MON_TOIT,
  'talal.halli24@gmail.com': BATI_HALLI,
};

/**
 * Détermine le diagnostiqueur mandaté à afficher sur le devis.
 * Priorité à l'expert réellement assigné ; sinon Toi mon Toit si humidité
 * explicitement ciblée ; sinon Bâti Halli (défaut).
 */
export function diagnosticienFor(opts: {
  assignedEmail?: string | null;
  service?: ServiceType | null;
}): Diagnosticien {
  const { assignedEmail } = opts;
  if (assignedEmail && BY_EMAIL[assignedEmail.toLowerCase()]) {
    return BY_EMAIL[assignedEmail.toLowerCase()];
  }
  return BATI_HALLI;
}
