import { Send } from 'lucide-react';
import { SubmitButton } from '@/components/admin/submit-button';
import { relanceDevis, relanceFacture } from '@/app/admin/(app)/send-actions';

/**
 * Contrôle de relance par paliers pour un devis / une facture :
 *  DEVIS (2 paliers, puis abandon) :
 *   - 0 → « Relancer » (doux) · 1 → « Seconde relance » (ferme) · ≥2 → « Perdu »
 *     (le devis est alors classé EXPIRÉ et le dossier marqué PERDU, cf. markDevisLost).
 *  FACTURE (3 paliers, on n'abandonne pas une créance) :
 *   - 0 → « Relancer » · 1 → « Seconde relance » · 2 → « Dernier rappel » (plus ferme
 *     mais respectueux) · ≥3 → « Impayé ».
 * `relanceCount` est PARTAGÉ par les relances manuelles ET automatiques (cron).
 */
export function RelanceControl({
  kind,
  id,
  contactId,
  relanceCount,
  redirectTo,
  compact = false,
}: {
  kind: 'devis' | 'facture';
  id: string;
  contactId: string;
  relanceCount: number;
  /** Où revenir après l'envoi (liste). Absent → la fiche du contact. */
  redirectTo?: string;
  /** Mode icône seule (cartes mobile). */
  compact?: boolean;
}) {
  const maxRelances = kind === 'devis' ? 2 : 3;
  // Cycle de relances épuisé → plus de bouton, on affiche l'état final.
  if (relanceCount >= maxRelances) {
    const term = kind === 'devis' ? 'Perdu' : 'Impayé';
    return (
      <span
        className={`inline-flex shrink-0 items-center rounded-md px-2 py-0.5 text-xs font-semibold ${
          kind === 'devis' ? 'bg-slate-100 text-slate-500' : 'bg-red-50 text-red-600'
        }`}
        title={`${maxRelances} relances envoyées sans réponse`}
      >
        {term}
      </span>
    );
  }

  const action = kind === 'devis' ? relanceDevis : relanceFacture;
  const idField = kind === 'devis' ? 'devisId' : 'factureId';
  const labels = ['Relancer', 'Seconde relance', 'Dernier rappel'];
  const label = labels[Math.min(relanceCount, labels.length - 1)];

  return (
    <form action={action} className="shrink-0">
      <input type="hidden" name={idField} value={id} />
      <input type="hidden" name="contactId" value={contactId} />
      {redirectTo ? <input type="hidden" name="redirectTo" value={redirectTo} /> : null}
      {compact ? (
        <SubmitButton
          pendingLabel="…"
          title={`${label} le client`}
          className="inline-flex h-11 w-11 sm:h-9 sm:w-9 items-center justify-center rounded-lg text-orange-600 active:bg-orange-50"
        >
          <Send className="h-4 w-4" />
        </SubmitButton>
      ) : (
        <SubmitButton
          pendingLabel="…"
          title="Envoyer une relance bienveillante au client"
          className="inline-flex h-8 items-center gap-1 whitespace-nowrap rounded-lg border border-orange-200 bg-orange-50 px-2 text-xs font-semibold text-orange-700 hover:bg-orange-100"
        >
          <Send className="h-3.5 w-3.5" /> {label}
        </SubmitButton>
      )}
    </form>
  );
}
