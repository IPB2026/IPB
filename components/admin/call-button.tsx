'use client';

import { Phone } from 'lucide-react';
import { logCall } from '@/app/admin/(app)/leads/actions';

/**
 * Lien « Appeler » (tel:) qui journalise automatiquement un « Appel passé » sur
 * la fiche. Le log part en fire-and-forget : il n'empêche/ralentit jamais
 * l'ouverture du composeur téléphonique.
 */
export function CallButton({
  contactId,
  phone,
  className,
}: {
  contactId: string;
  phone: string;
  className?: string;
}) {
  return (
    <a
      href={`tel:${phone}`}
      onClick={() => {
        void logCall(contactId).catch(() => {});
      }}
      className={className}
    >
      <Phone className="h-4 w-4" /> Appeler
    </a>
  );
}
