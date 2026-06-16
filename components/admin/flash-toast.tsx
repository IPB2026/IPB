'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { CheckCircle2, AlertTriangle, X } from 'lucide-react';

/**
 * Toast de confirmation léger : lit `?ok=<code>` / `?err=<code>` dans l'URL
 * (posés par les actions qui redirigent), affiche un message 3,5 s, puis nettoie
 * l'URL. Donne un vrai retour « pro » après une action sans recharger la page.
 */
const OK_MSG: Record<string, string> = {
  '1': 'Effectué ✓',
  rdv: 'Rendez-vous planifié ✓',
  proposed: 'Proposition de créneaux envoyée ✓',
  facture: 'Facture créée ✓',
  paiement: 'Paiement enregistré ✓',
  envoye: 'Envoyé au client ✓',
};
const ERR_MSG: Record<string, string> = {
  '1': 'Une erreur est survenue.',
  email: 'Client sans e-mail — renseignez-le sur sa fiche.',
  slots: 'Ajoutez au moins un créneau futur valide.',
  send: "L'envoi a échoué. Réessayez.",
};

function FlashToastInner() {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const okCode = sp.get('ok');
  const errCode = sp.get('err');
  const [shown, setShown] = useState<{ ok: boolean; msg: string } | null>(null);

  // 1) Détecte le code → affiche le toast → nettoie l'URL (les autres params,
  //    ex. filtres q/etat, sont préservés).
  useEffect(() => {
    if (!okCode && !errCode) return;
    const ok = Boolean(okCode);
    const msg = ok
      ? OK_MSG[okCode as string] ?? 'Effectué ✓'
      : ERR_MSG[errCode as string] ?? 'Une erreur est survenue.';
    setShown({ ok, msg });
    const params = new URLSearchParams(Array.from(sp.entries()));
    params.delete('ok');
    params.delete('err');
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [okCode, errCode]);

  // 2) Auto-masquage SÉPARÉ : sinon le nettoyage d'URL (qui remet okCode à null)
  //    relancerait cet effet et son cleanup annulerait le timeout → toast figé.
  useEffect(() => {
    if (!shown) return;
    const t = setTimeout(() => setShown(null), 3500);
    return () => clearTimeout(t);
  }, [shown]);

  if (!shown) return null;
  return (
    <div className="fixed bottom-20 left-1/2 z-[70] -translate-x-1/2 px-4 sm:bottom-6">
      <div
        role="status"
        className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-white shadow-lg ${
          shown.ok ? 'bg-emerald-600' : 'bg-red-600'
        }`}
      >
        {shown.ok ? (
          <CheckCircle2 className="h-4 w-4 shrink-0" />
        ) : (
          <AlertTriangle className="h-4 w-4 shrink-0" />
        )}
        {shown.msg}
        <button
          type="button"
          onClick={() => setShown(null)}
          aria-label="Fermer"
          className="ml-1 opacity-80 hover:opacity-100"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

export function FlashToast() {
  // useSearchParams nécessite une frontière Suspense.
  return (
    <Suspense fallback={null}>
      <FlashToastInner />
    </Suspense>
  );
}
