import { euros } from '@/lib/crm/company';

/**
 * Affiche un montant formaté en € — et porte la classe `crm-money` ciblée par le
 * mode confidentialité (flou CSS quand la racine admin a la classe `crm-private`,
 * basculée par le bouton œil de la barre admin). Pour l'AFFICHAGE uniquement ;
 * pour une chaîne (PDF, e-mail, libellé), utiliser `euros()` directement.
 */
export function Money({
  value,
  className = '',
}: {
  value: number | null | undefined;
  className?: string;
}) {
  if (value == null) return <span className={className}>—</span>;
  return <span className={`crm-money ${className}`.trim()}>{euros(value)}</span>;
}
