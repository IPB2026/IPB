import { revalidatePath } from 'next/cache';

/**
 * Revalidation transversale du CRM : à appeler après TOUTE action qui change
 * l'état d'un dossier (devis, facture, RDV, rapport, étape…). Garantit que la
 * fiche client unique, le pipeline et le tableau de bord reflètent le changement
 * immédiatement — sans que l'utilisateur ait à rafraîchir ou re-saisir quoi que
 * ce soit.
 *
 * On revalide le segment dynamique `/admin/clients/[id]` (type 'page') pour
 * couvrir toutes les fiches, plus la fiche précise si le contactId est connu.
 */
export function revalidateCrm(contactId?: string | null): void {
  if (contactId) revalidatePath(`/admin/clients/${contactId}`);
  revalidatePath('/admin/clients/[id]', 'page');
  revalidatePath('/admin/clients');
  revalidatePath('/admin/pipeline');
  // NOTE PERF : on ne revalide PLUS le pilotage à chaque mutation (≈15 requêtes +
  // calcul par dossier). Il se rafraîchit tout seul via ISR (revalidate = 60 s sur
  // la page) → données au plus 1 min de retard, pour un coût quasi nul.
  revalidatePath('/admin');
}
