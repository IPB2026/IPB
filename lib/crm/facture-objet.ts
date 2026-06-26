import type { ServiceType } from '@prisma/client';
import { devisTemplate } from '@/lib/crm/devis-templates';

/**
 * Assainissement de l'objet de FACTURE.
 *
 * La facture REPREND le gabarit du devis (cohérence devis ↔ facture), mais IPB
 * n'est ni un bureau d'études, ni un expert judiciaire ou d'assurance : sur une
 * facture on bannit « structurel / structurelle / expertise structurelle » au
 * profit du registre diagnostic (« diagnostic visuel / instrumenté / indépendant »).
 *
 * Cette couche s'applique UNIQUEMENT quand un libellé de gabarit devis alimente
 * une facture. Le devis lui-même n'est pas modifié (cf. lib/crm/devis-templates.ts).
 */

// Reformulations exactes préférées (priorité sur le filet regex ci-dessous).
const FACTURE_OBJET_OVERRIDES: Record<string, string> = {
  'Expertise structurelle avant achat': 'Diagnostic du bâti avant achat',
};

/**
 * Filet de sécurité : retire toute occurrence résiduelle de « structurel(le) »
 * dans un libellé destiné à une facture, en préservant la casse de tête.
 */
export function sanitizeStructurel(text: string): string {
  return text
    .replace(/expertise\s+structurelle/gi, (m) =>
      m[0] === 'E' ? 'Diagnostic indépendant' : 'diagnostic indépendant'
    )
    .replace(/structurel(?:le)?s?/gi, 'du bâti');
}

/** Objet de facture, dérivé d'un libellé (de gabarit devis ou libre), assaini. */
export function factureObjet(input: string): string {
  const trimmed = (input ?? '').trim();
  return FACTURE_OBJET_OVERRIDES[trimmed] ?? sanitizeStructurel(trimmed);
}

/** Objet de facture repris du gabarit DEVIS d'un service, assaini pour la facture. */
export function factureObjetForService(service?: ServiceType | null): string {
  return factureObjet(devisTemplate(service).objet);
}
