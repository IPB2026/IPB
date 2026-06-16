'use client';

import { useState, useTransition } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Sparkles, Loader2 } from 'lucide-react';
import {
  createDevisSurMesure,
  suggestDevisContent,
} from '@/app/admin/(app)/devis/actions';

const field =
  'w-full rounded-lg border border-slate-300 px-3 py-2 text-base sm:text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200';
const label = 'mb-1 block text-sm font-medium text-slate-700';
const eur = (n: number) =>
  new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(n || 0);

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-700 disabled:opacity-60"
    >
      {pending ? 'Création…' : 'Créer le devis sur-mesure'}
    </button>
  );
}

export function NewDevisSurMesureForm({
  contacts,
  defaultContactId,
  leadId,
}: {
  contacts: { id: string; name: string; city: string | null }[];
  defaultContactId?: string;
  leadId?: string;
}) {
  const [error, formAction] = useFormState(createDevisSurMesure, undefined);
  const [bien, setBien] = useState('');
  const [besoin, setBesoin] = useState('');
  const [objet, setObjet] = useState('');
  const [intervention, setIntervention] = useState('');
  const [livrable, setLivrable] = useState('');
  const [prix, setPrix] = useState('');
  const [frais, setFrais] = useState(false);
  const [aiErr, setAiErr] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const prixNum = (Number(prix.replace(',', '.')) || 0) + (frais ? 50 : 0);
  const hasContent = Boolean(objet.trim() && intervention.trim() && livrable.trim());

  const generer = () => {
    setAiErr(null);
    start(async () => {
      const res = await suggestDevisContent(besoin, bien || undefined);
      if ('error' in res) {
        setAiErr(res.error);
        return;
      }
      setObjet(res.objet);
      setIntervention(res.intervention.join('\n'));
      setLivrable(res.livrable.join('\n'));
    });
  };

  return (
    <form action={formAction} className="space-y-5">
      {leadId && <input type="hidden" name="leadId" value={leadId} />}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="contactId">
            Client <span className="text-orange-600">*</span>
          </label>
          <select id="contactId" name="contactId" required defaultValue={defaultContactId ?? ''} className={field}>
            <option value="" disabled>
              Choisir un client…
            </option>
            {contacts.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
                {c.city ? ` — ${c.city}` : ''}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={label} htmlFor="bienConcerne">
            Bien concerné
          </label>
          <input
            id="bienConcerne"
            name="bienConcerne"
            value={bien}
            onChange={(e) => setBien(e.target.value)}
            placeholder="Maison — 12 rue des Lilas, 31000 Toulouse"
            className={field}
          />
        </div>
      </div>

      <div className="rounded-lg border border-orange-200 bg-orange-50/40 p-4">
        <label className="flex items-center gap-1.5 text-sm font-semibold text-slate-800">
          <Sparkles className="h-4 w-4 text-orange-600" />
          Besoin du client (décrivez librement)
        </label>
        <p className="mb-2 mt-0.5 text-xs text-slate-500">
          L’IA rédige l’objet, le déroulé et le livrable. Vous relisez et fixez le prix.
        </p>
        <textarea
          value={besoin}
          onChange={(e) => setBesoin(e.target.value)}
          rows={3}
          placeholder="Ex. « Plancher bois du 1er étage qui s'affaisse côté salle de bain, craquements. Le client veut savoir si c'est dangereux et d'où ça vient. »"
          className={field}
        />
        {aiErr && <p className="mt-1.5 text-xs text-red-600">{aiErr}</p>}
        <button
          type="button"
          onClick={generer}
          disabled={pending || besoin.trim().length < 10}
          className="mt-2 inline-flex min-h-[40px] items-center gap-1.5 rounded-lg bg-orange-600 px-3.5 py-2 text-sm font-semibold text-white hover:bg-orange-700 disabled:opacity-60"
        >
          {pending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Génération…
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" /> Générer le contenu
            </>
          )}
        </button>
      </div>

      <div>
        <label className={label} htmlFor="objet">
          Objet de la mission <span className="text-orange-600">*</span>
        </label>
        <input
          id="objet"
          name="objet"
          value={objet}
          onChange={(e) => setObjet(e.target.value)}
          placeholder="Diagnostic d'un plancher bois affaissé — recherche de cause"
          className={field}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="intervention">
            Déroulé de l’intervention <span className="font-normal text-slate-400">(une ligne par point)</span>
          </label>
          <textarea
            id="intervention"
            name="intervention"
            value={intervention}
            onChange={(e) => setIntervention(e.target.value)}
            rows={7}
            className={field}
          />
        </div>
        <div>
          <label className={label} htmlFor="livrable">
            Livrable <span className="font-normal text-slate-400">(une ligne par point)</span>
          </label>
          <textarea
            id="livrable"
            name="livrable"
            value={livrable}
            onChange={(e) => setLivrable(e.target.value)}
            rows={7}
            className={field}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="prix">
            Montant (€ HT) <span className="text-orange-600">*</span>
          </label>
          <input
            id="prix"
            name="prix"
            type="text"
            inputMode="decimal"
            value={prix}
            onChange={(e) => setPrix(e.target.value.replace(/[^0-9.,]/g, ''))}
            placeholder="ex. 600"
            className={field}
          />
        </div>
      </div>

      <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 px-4 py-3 hover:bg-slate-50">
        <input
          type="checkbox"
          name="fraisDeplacement"
          checked={frais}
          onChange={(e) => setFrais(e.target.checked)}
          className="h-4 w-4 rounded border-slate-300 text-orange-600 focus:ring-orange-500"
        />
        <span className="flex-1">
          <span className="block text-sm font-medium text-slate-800">Frais de déplacement</span>
          <span className="block text-xs text-slate-500">Forfait aller-retour sur le lieu de l’intervention</span>
        </span>
        <span className="shrink-0 text-sm font-semibold tabular-nums text-slate-600">+ {eur(50)}</span>
      </label>

      <div className="rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-600">
        <div className="flex items-center justify-between">
          <span className="font-medium">Net à payer · TVA non applicable (293 B)</span>
          <span className="text-lg font-bold tabular-nums text-orange-600">{eur(prixNum)}</span>
        </div>
      </div>

      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      <div className="flex items-center gap-3">
        <Submit />
        {!hasContent && (
          <span className="text-xs text-slate-400">Générez ou saisissez le contenu avant de créer.</span>
        )}
      </div>
    </form>
  );
}
