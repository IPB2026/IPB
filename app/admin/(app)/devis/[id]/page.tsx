import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Download, FileCheck2, ReceiptText, Mail } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { guardAdminPage } from '@/lib/auth-helpers';
import {
  DevisStatusBadge,
  DEVIS_STATUS_LABEL,
} from '@/components/admin/badges';
import { euros } from '@/lib/crm/company';
import {
  updateDevisStatus,
  convertDevisToFacture,
} from '@/app/admin/(app)/devis/actions';
import { sendDevis } from '@/app/admin/(app)/send-actions';

export const dynamic = 'force-dynamic';

export default async function DevisDetailPage({
  params,
}: {
  params: { id: string };
}) {
  await guardAdminPage();
  const devis = await prisma.devis
    .findUnique({
      where: { id: params.id },
      include: {
        contact: true,
        lines: { orderBy: { position: 'asc' } },
        factures: true,
      },
    })
    .catch(() => null);

  if (!devis) notFound();

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Link
        href="/admin/devis"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Tous les devis
      </Link>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tabular-nums tracking-tight text-slate-900">
            {devis.number}
          </h1>
          <p className="text-sm text-slate-500">
            {devis.object} — {devis.contact.name}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <DevisStatusBadge status={devis.status} />
          <a
            href={`/admin/devis/${devis.id}/pdf`}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            <Download className="h-4 w-4" />
            PDF
          </a>
          {devis.contact.email && (
            <form action={sendDevis}>
              <input type="hidden" name="devisId" value={devis.id} />
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-lg bg-orange-600 px-3 py-2 text-sm font-semibold text-white hover:bg-orange-700"
              >
                <Mail className="h-4 w-4" />
                Envoyer au client
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Actions */}
      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <form action={updateDevisStatus} className="flex items-end gap-2">
            <input type="hidden" name="devisId" value={devis.id} />
            <div className="flex-1">
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Statut du devis
              </label>
              <select
                name="status"
                defaultValue={devis.status}
                className="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
              >
                {Object.entries(DEVIS_STATUS_LABEL).map(([v, l]) => (
                  <option key={v} value={v}>
                    {l}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="h-10 rounded-lg bg-slate-900 px-4 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Mettre à jour
            </button>
          </form>

          <div className="flex items-end">
            {devis.factures.length > 0 ? (
              <Link
                href={`/admin/factures/${devis.factures[0].id}`}
                className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-4 text-sm font-semibold text-emerald-700 hover:bg-emerald-100"
              >
                <ReceiptText className="h-4 w-4" />
                Voir la facture {devis.factures[0].number}
              </Link>
            ) : (
              <form action={convertDevisToFacture}>
                <input type="hidden" name="devisId" value={devis.id} />
                <button
                  type="submit"
                  className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-orange-600 px-4 text-sm font-semibold text-white hover:bg-orange-700"
                >
                  <FileCheck2 className="h-4 w-4" />
                  Convertir en facture
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Détail */}
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
            {devis.lines.map((l) => (
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
          <span className="text-sm text-slate-500">
            TVA non applicable, art. 293 B du CGI
          </span>
          <span className="text-lg font-bold tabular-nums text-orange-600">
            {euros(Number(devis.totalHT))}
          </span>
        </div>
      </section>
    </div>
  );
}
