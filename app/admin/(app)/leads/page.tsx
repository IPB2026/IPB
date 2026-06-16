import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

/**
 * La liste des prospects est fusionnée dans l'onglet « Clients » (un seul onglet
 * pour prospects + clients). On y redirige, filtré sur les prospects.
 */
export default function LeadsListRedirect() {
  redirect('/admin/clients?etat=prospects');
}
