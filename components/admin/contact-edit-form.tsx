'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { updateContact } from '@/app/admin/(app)/contact-actions';
import { NameFields } from '@/components/admin/name-fields';
import { AddressAutocomplete } from '@/components/admin/address-autocomplete';

const field =
  'h-10 w-full rounded-lg border border-slate-300 px-3 text-base outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 sm:text-sm';
const label = 'mb-1 block text-xs font-medium text-slate-500';

const OCCUPANT: [string, string][] = [
  ['PROPRIETAIRE', 'Propriétaire occupant'],
  ['BAILLEUR', 'Propriétaire bailleur'],
  ['LOCATAIRE', 'Locataire'],
  ['ACHETEUR', "En projet d'achat"],
  ['INVESTISSEUR', 'Investisseur / marchand'],
  ['INCONNU', 'Non précisé'],
];

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="h-10 rounded-lg bg-slate-900 px-4 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
    >
      {pending ? 'Enregistrement…' : 'Enregistrer'}
    </button>
  );
}

export function ContactEditForm({
  contact,
}: {
  contact: {
    id: string;
    name: string;
    phone?: string | null;
    email?: string | null;
    address?: string | null;
    postalCode?: string | null;
    city?: string | null;
    occupantStatus?: string | null;
    propertyType?: string | null;
  };
}) {
  const [error, formAction] = useFormState(updateContact, undefined);
  // Pré-découpe le nom complet existant en prénom / nom (1er mot = prénom).
  const parts = (contact.name ?? '').trim().split(/\s+/);
  const defPrenom = parts.length > 1 ? parts[0] : '';
  const defNom = parts.length > 1 ? parts.slice(1).join(' ') : contact.name;

  return (
    <form action={formAction} className="space-y-3" key={error ? 'err' : 'ok'}>
      <input type="hidden" name="contactId" value={contact.id} />
      {/* Particulier (prénom + nom) OU entreprise (raison sociale = nom complet). */}
      <NameFields
        defPrenom={defPrenom}
        defNom={defNom}
        defCompany={contact.name}
        defaultMode="particulier"
        fieldClass={field}
        labelClass={label}
      />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="ce-phone">Téléphone</label>
          <input id="ce-phone" name="phone" type="tel" inputMode="tel" defaultValue={contact.phone ?? ''} className={field} />
        </div>
        <div>
          <label className={label} htmlFor="ce-email">E-mail</label>
          <input id="ce-email" name="email" type="email" inputMode="email" defaultValue={contact.email ?? ''} className={field} />
        </div>
      </div>
      <AddressAutocomplete
        defaultAddress={contact.address ?? ''}
        defaultPostalCode={contact.postalCode ?? ''}
        defaultCity={contact.city ?? ''}
        fieldClass={field}
        labelClass={label}
      />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="ce-occ">Statut</label>
          <select
            id="ce-occ"
            name="occupantStatus"
            defaultValue={contact.occupantStatus ?? 'INCONNU'}
            className={field}
          >
            {OCCUPANT.map(([v, l]) => (
              <option key={v} value={v}>{l}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={label} htmlFor="ce-type">Type de bien</label>
          <input id="ce-type" name="propertyType" defaultValue={contact.propertyType ?? ''} placeholder="Maison, appartement…" className={field} />
        </div>
      </div>
      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
      )}
      <Submit />
    </form>
  );
}
