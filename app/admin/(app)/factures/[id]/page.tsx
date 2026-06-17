import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Download, Mail, Trash2 } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { guardAdminPage } from '@/lib/auth-helpers';
import {
  FactureStatusBadge,
  FACTURE_STATUS_LABEL,
} from '@/components/admin/badges';
import { euros, COMPANY } from '@/lib/crm/company';
import { CopyButton } from '@/components/admin/copy-button';
import {
  updateFactureStatus,
  recordFacturePayment,
  deleteFacture,
} from '@/app/admin/(app)/factures/actions';
import { sendFacture } from '@/app/admin/(app)/send-actions';
import { ConfirmSubmit } from '@/components/admin/confirm-submit';
import { SubmitButton } from '@/components/admin/submit-button';
import { EditFactureForm } from '@/components/admin/edit-facture-form';

export const dynamic = 'force-dynamic';

export default async function FactureDetailPage({
  params,
}: {
  params: { id: string };
}) {
  await guardAdminPage();
  const facture = await prisma.facture
    .findUnique({
      where: { id: params.id },
      include: {
        contact: true,
        lines: { orderBy: { position: 'asc' } },
        devis: true,
      },
    })
    .catch(() => null);

  if (!facture) notFound();
  const net = Number(facture.totalHT) - Number(facture.acompte ?? 0);
  const dueStr = facture.dueDate
    ? new Date(facture.dueDate).toISOString().slice(0, 10)
    : '';

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Link
        href="/admin/factures"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Toutes les factures
      </Link>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tabular-nums tracking-tight text-slate-900">
            {facture.number}
          </h1>
          <p className="text-sm text-slate-500">
            {facture.object} —{' '}
            <Link
              href={`/admin/clients/${facture.contactId}`}
              className="font-medium text-slate-600 hover:text-orange-600 hover:underline"
            >
              {facture.contact.name}
            </Link>
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <FactureStatusBadge status={facture.status} />
          <a
            href={`/admin/factures/${facture.id}/pdf`}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            <Download className="h-4 w-4" />
            PDF
          </a>
          {facture.contact.email && (
            <form action={sendFacture}>
              <input type="hidden" name="factureId" value={facture.id} />
              <SubmitButton
                spinner
                pendingLabel="Envoi…"
                className="rounded-lg bg-orange-600 px-3 py-2 text-sm font-semibold text-white hover:bg-orange-700"
              >
                <Mail className="h-4 w-4" />
                Envoyer au client
              </SubmitButton>
            </form>
          )}
          <form action={deleteFacture}>
            <input type="hidden" name="factureId" value={facture.id} />
            <ConfirmSubmit
              message={
                facture.status === 'PAYEE'
                  ? `Cette facture est PAYÉE. La supprimer effacera aussi son encaissement du suivi. Supprimer quand même la facture ${facture.number} ? Action irréversible.`
                  : `Supprimer la facture ${facture.number} ? Cette action est irréversible.`
              }
              className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
              Supprimer
            </ConfirmSubmit>
          </form>
        </div>
      </div>

      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <form action={updateFactureStatus} className="flex items-end gap-2">
            <input type="hidden" name="factureId" value={facture.id} />
            <div className="flex-1">
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Statut de la facture
              </label>
              <select
                name="status"
                defaultValue={facture.status}
                className="h-10 w-full rounded-lg border border-slate-300 px-3 text-base sm:text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
              >
                {Object.entries(FACTURE_STATUS_LABEL).map(([v, l]) => (
                  <option key={v} value={v}>
                    {l}
                  </option>
                ))}
              </select>
            </div>
            <SubmitButton
              pendingLabel="Mise à jour…"
              className="h-10 rounded-lg bg-slate-900 px-4 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Mettre à jour
            </SubmitButton>
          </form>

          <dl className="space-y-1.5 text-sm">
            <div className="flex justify-between">
              <dt className="text-slate-500">Émise le</dt>
              <dd className="font-medium">
                {facture.issuedAt.toLocaleDateString('fr-FR')}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Échéance</dt>
              <dd className="font-medium">
                {facture.dueDate
                  ? facture.dueDate.toLocaleDateString('fr-FR')
                  : '—'}
              </dd>
            </div>
            {facture.devis ? (
              <div className="flex justify-between">
                <dt className="text-slate-500">Devis source</dt>
                <dd>
                  <Link
                    href={`/admin/devis/${facture.devis.id}`}
                    className="font-medium text-orange-600 hover:underline"
                  >
                    {facture.devis.number}
                  </Link>
                </dd>
              </div>
            ) : null}
          </dl>
        </div>
      </section>

      {/* Règlement / encaissement */}
      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Règlement
        </h2>
        <div className="mb-4 grid grid-cols-3 gap-3">
          <div className="rounded-lg bg-slate-50 px-3 py-2.5">
            <p className="text-[11px] text-slate-400">Total HT</p>
            <p className="mt-0.5 text-sm font-semibold tabular-nums text-slate-800">
              {euros(Number(facture.totalHT))}
            </p>
          </div>
          <div className="rounded-lg bg-slate-50 px-3 py-2.5">
            <p className="text-[11px] text-slate-400">Encaissé</p>
            <p className="mt-0.5 text-sm font-semibold tabular-nums text-emerald-600">
              {euros(Number(facture.acompte ?? 0))}
            </p>
          </div>
          <div className="rounded-lg bg-slate-50 px-3 py-2.5">
            <p className="text-[11px] text-slate-400">Reste dû</p>
            <p
              className={`mt-0.5 text-sm font-semibold tabular-nums ${
                net > 0 ? 'text-orange-600' : 'text-emerald-600'
              }`}
            >
              {euros(net)}
            </p>
          </div>
        </div>
        {facture.status !== 'PAYEE' && net > 0 ? (
          <form
            action={recordFacturePayment}
            className="flex flex-wrap items-end gap-2"
          >
            <input type="hidden" name="factureId" value={facture.id} />
            <div className="flex-1">
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Encaissement (€)
              </label>
              <input
                name="montant"
                type="number"
                min="0"
                step="0.01"
                placeholder={`${net}`}
                className="h-10 w-full rounded-lg border border-slate-300 px-3 text-base outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 sm:text-sm"
              />
            </div>
            <SubmitButton
              pendingLabel="Enregistrement…"
              className="h-10 rounded-lg bg-emerald-600 px-4 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Enregistrer le paiement
            </SubmitButton>
          </form>
        ) : (
          <p className="text-sm font-medium text-emerald-700">Facture soldée.</p>
        )}
      </section>

      {/* Modifier la facture */}
      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Modifier la facture
        </h2>
        <EditFactureForm
          factureId={facture.id}
          object={facture.object}
          montant={Number(facture.totalHT)}
          dueDate={dueStr}
        />
      </section>

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left text-xs font-medium uppercase tracking-wider text-slate-400">
              <th className="px-5 py-2.5">Désignation</th>
              <th className="px-5 py-2.5 text-center">Unité</th>
              <th className="px-5 py-2.5 text-center">Qté</th>
              <th className="px-5 py-2.5 text-right">P.U. HT</th>
              <th className="px-5 py-2.5 text-right">Total HT</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {facture.lines.map((l) => (
              <tr key={l.id}>
                <td className="px-5 py-3">
                  <span className="font-medium text-slate-800">
                    {l.designation}
                  </span>
                  {l.detail ? (
                    <span className="block text-xs text-slate-400">
                      {l.detail}
                    </span>
                  ) : null}
                </td>
                <td className="px-5 py-3 text-center text-slate-600">{l.unit}</td>
                <td className="px-5 py-3 text-center tabular-nums text-slate-600">
                  {Number(l.qty)}
                </td>
                <td className="px-5 py-3 text-right tabular-nums text-slate-600">
                  {euros(Number(l.unitPrice))}
                </td>
                <td className="px-5 py-3 text-right font-medium tabular-nums">
                  {euros(Number(l.total))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-5 py-3">
          <span className="text-sm text-slate-500">{COMPANY.tvaMention}</span>
          <span className="text-lg font-bold tabular-nums text-orange-600">
            Net à payer&nbsp;: {euros(net)}
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 px-5 py-3">
          <div className="text-sm">
            <span className="text-slate-500">Règlement par virement · IBAN&nbsp;</span>
            <span className="font-medium tabular-nums text-slate-800">{COMPANY.bank.iban}</span>
            <span className="text-slate-400"> · BIC {COMPANY.bank.bic}</span>
          </div>
          <CopyButton value={COMPANY.bank.iban.replace(/\s/g, '')} label="Copier l'IBAN" />
        </div>
      </section>
    </div>
  );
}
