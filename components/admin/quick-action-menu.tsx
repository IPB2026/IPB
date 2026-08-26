'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MoreHorizontal, User, Phone, FileText, Receipt, XCircle, Trash2 } from 'lucide-react';
import { changeStage } from '@/app/admin/(app)/leads/actions';
import { archiveContact } from '@/app/admin/(app)/contact-actions';
import { ConfirmSubmit } from '@/components/admin/confirm-submit';

/**
 * Menu d'actions rapides par ligne (pattern Salesforce/HubSpot) : ouvrir la
 * fiche, appeler, créer un devis/une facture, marquer perdu ou mettre à la
 * corbeille — sans quitter la liste ni ouvrir la fiche.
 */
export function QuickActionMenu({
  contactId,
  name,
  phone,
  leadId,
}: {
  contactId: string;
  name?: string | null;
  phone?: string | null;
  leadId?: string | null;
}) {
  const [open, setOpen] = useState(false);
  const devisHref = `/admin/devis/nouveau?contactId=${contactId}${leadId ? `&leadId=${leadId}` : ''}`;

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Actions"
        aria-expanded={open}
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>
      {open && (
        <>
          {/* Overlay invisible : ferme au clic en dehors. */}
          <button
            type="button"
            aria-hidden
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-10 cursor-default"
          />
          <div className="absolute right-0 z-20 mt-1 w-44 overflow-hidden rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
            <Link
              href={`/admin/clients/${contactId}`}
              className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              <User className="h-4 w-4 text-slate-400" /> Voir la fiche
            </Link>
            {phone && (
              <a
                href={`tel:${phone}`}
                className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
              >
                <Phone className="h-4 w-4 text-orange-500" /> Appeler
              </a>
            )}
            <Link
              href={devisHref}
              className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              <FileText className="h-4 w-4 text-slate-400" /> Créer un devis
            </Link>
            <Link
              href={`/admin/factures/nouveau?contactId=${contactId}`}
              className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              <Receipt className="h-4 w-4 text-slate-400" /> Créer une facture
            </Link>
            {leadId && (
              <form action={changeStage} className="border-t border-slate-100">
                <input type="hidden" name="leadId" value={leadId} />
                <input type="hidden" name="stage" value="PERDU" />
                <button
                  type="submit"
                  onClick={() => setOpen(false)}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-slate-600 hover:bg-slate-50"
                >
                  <XCircle className="h-4 w-4 text-slate-400" /> Marquer perdu
                </button>
              </form>
            )}
            {/* Suppression EN UN CLIC depuis la liste (soft-delete réversible
                30 j) : plus besoin d'ouvrir la fiche pour sortir un contact. */}
            <form action={archiveContact} className="border-t border-slate-100">
              <input type="hidden" name="contactId" value={contactId} />
              <ConfirmSubmit
                message={`Mettre ${name ? `« ${name} »` : 'ce client'} à la corbeille ? Il disparaît du CRM mais reste récupérable 30 jours (Clients → Corbeille).`}
                confirmLabel="Mettre à la corbeille"
                className="flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4 text-red-400" /> Mettre à la corbeille
              </ConfirmSubmit>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
