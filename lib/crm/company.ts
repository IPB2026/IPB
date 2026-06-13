/**
 * Constantes société IPB — source unique pour devis, factures, rapports.
 * Cf. REFERENCE_DOCUMENTS_IPB.md §0. L'IBAN peut être surchargé par env.
 */
export const COMPANY = {
  name: 'IPB — Institut de Pathologie du Bâtiment',
  shortName: 'IPB',
  address: '54 avenue Jean Jaurès',
  postalCode: '31170',
  city: 'Tournefeuille',
  phone: '05 82 95 33 75',
  email: 'contact@ipb-expertise.fr',
  site: 'www.ipb-expertise.fr',
  siret: '908 995 103 00029',
  ape: '7022Z',
  tvaIntra: 'FR71908995103',
  tvaMention: 'TVA non applicable, art. 293 B du CGI',
  decennale: 'Garantie décennale en cours de souscription',
  cgvUrl: 'www.ipb-expertise.fr/legal/cgv',
  bank: {
    beneficiaire: 'IPB',
    iban: process.env.IPB_IBAN || 'FR76 1695 8000 0151 0958 0207 019',
    bic: process.env.IPB_BIC || 'QNTOFRP1XXX',
    banque: 'QONTO',
  },
  // Mentions de retard obligatoires (factures)
  penalites:
    'Pénalités de retard : 3 fois le taux d’intérêt légal en vigueur, exigibles de plein droit dès le lendemain de la date d’échéance.',
  indemnite:
    'Indemnité forfaitaire pour frais de recouvrement : 40 € (art. L.441-10 du Code de commerce).',
  escompte: 'Aucun escompte pour paiement anticipé.',
} as const;

export const BRAND = {
  navy: '#0F172A',
  orange: '#EA580C',
  slate600: '#475569',
  slate400: '#94A3B8',
  slate200: '#E2E8F0',
  slate50: '#F8FAFC',
} as const;

/** Formate un nombre en euros (fr-FR). */
export function euros(n: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(n);
}
