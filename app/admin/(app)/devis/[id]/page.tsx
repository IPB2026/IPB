import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Download, FileCheck2, ReceiptText, CheckCircle2, CalendarClock, Trash2, Copy } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { guardAdminPage } from '@/lib/auth-helpers';
import {
  DevisStatusBadge,
  DEVIS_STATUS_LABEL,
} from '@/components/admin/badges';
import { Money } from '@/components/admin/money';
import {
  updateDevisStatus,
  convertDevisToFacture,
  acceptDevis,
  deleteDevis,
  duplicateDevis,
} from '@/app/admin/(app)/devis/actions';
import { DevisSendForm } from '@/components/admin/devis-send-form';
import { EditDevisForm } from '@/components/admin/edit-devis-form';
import { DevisTravauxForm } from '@/components/admin/devis-travaux-form';
import { ConfirmSubmit } from '@/components/admin/confirm-submit';
import { isDevisTravaux } from '@/lib/crm/devis-templates';

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
        coordinationAppts: { orderBy: { start: 'asc' } },
      },
    })
    .catch(() => null);

  if (!devis) notFound();

  const isAccepted = devis.status === 'ACCEPTE';
  const isTravaux = isDevisTravaux(devis);
  const isSurMesure = devis.serviceType === null && !isTravaux;
  const fraisLine = devis.lines.find((l) => l.designation === 'Frais de déplacement');
  const hasFrais = Boolean(fraisLine);
  // Prix de BASE (hors frais) = ce qu'édite le champ « Montant » ; updateDevis
  // ré-ajoute les frais si la case est cochée → pas de double comptage.
  const basePrix = Number(devis.totalHT) - (fraisLine ? Number(fraisLine.total) : 0);
  const coordAppt = devis.coordinationAppts[0] ?? null;
  const planUrl =
    `/admin/agenda?type=LANCEMENT_TRAVAUX&contactId=${devis.contactId}` +
    `&devisId=${devis.id}${devis.leadId ? `&leadId=${devis.leadId}` : ''}`;
  // Type de RDV de visite selon le diagnostic (cycle normal après acceptation).
  const VISIT_TYPE: Record<string, string> = {
    FISSURES: 'DIAGNOSTIC_FISSURES',
    HUMIDITE: 'DIAGNOSTIC_HUMIDITE',
    EXPERTISE_ACHAT: 'EXPERTISE_ACHAT',
    MUR_PORTEUR: 'MUR_PORTEUR',
  };
  const visitUrl =
    `/admin/agenda?type=${VISIT_TYPE[devis.serviceType ?? 'FISSURES'] ?? 'DIAGNOSTIC_FISSURES'}` +
    `&contactId=${devis.contactId}${devis.leadId ? `&leadId=${devis.leadId}` : ''}`;
  const validUntilStr = devis.validUntil
    ? new Date(devis.validUntil).toISOString().slice(0, 10)
    : '';
  const canDelete = devis.factures.length === 0;

  // Borne « min » des sélecteurs de créneaux = aujourd'hui + 3 jours (local),
  // arrondie à l'heure pleine pour que les pas de 30 min tombent sur :00/:30.
  const minSlot = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
  minSlot.setMinutes(0, 0, 0);
  const pad = (n: number) => String(n).padStart(2, '0');
  const minDateTime = `${minSlot.getFullYear()}-${pad(minSlot.getMonth() + 1)}-${pad(minSlot.getDate())}T${pad(minSlot.getHours())}:${pad(minSlot.getMinutes())}`;

  // RDV à venir (rappel anti-conflit dans le formulaire de créneaux).
  const upcomingAppts = devis.contact.email
    ? await prisma.appointment.findMany({
        where: { status: { not: 'ANNULE' }, start: { gte: new Date() } },
        orderBy: { start: 'asc' },
        take: 8,
        select: { id: true, start: true, title: true },
      })
    : [];
  const upcoming = upcomingAppts.map((a) => ({
    id: a.id,
    label: `${a.start.toLocaleString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })} — ${a.title}`,
  }));

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
            {devis.object} —{' '}
            <Link
              href={`/admin/clients/${devis.contactId}`}
              className="font-medium text-slate-600 hover:text-orange-600 hover:underline"
            >
              {devis.contact.name}
            </Link>
          </p>
          {isTravaux && (
            <span className="mt-1.5 inline-flex rounded-md bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-700 ring-1 ring-inset ring-amber-600/20">
              Devis travaux (2ᵉ devis)
            </span>
          )}
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
            <DevisSendForm
              devisId={devis.id}
              minDateTime={minDateTime}
              upcoming={upcoming}
            />
          )}
          <form action={duplicateDevis}>
            <input type="hidden" name="devisId" value={devis.id} />
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              <Copy className="h-4 w-4" />
              Dupliquer
            </button>
          </form>
          <form action={deleteDevis}>
            <input type="hidden" name="devisId" value={devis.id} />
            <ConfirmSubmit
              message={
                canDelete
                  ? `Supprimer définitivement le devis ${devis.number} ? Cette action est irréversible.`
                  : `Ce devis a une facture liée (elle sera conservée). Supprimer quand même le devis ${devis.number} ? Action irréversible.`
              }
              className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
              Supprimer
            </ConfirmSubmit>
          </form>
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
                className="h-10 w-full rounded-lg border border-slate-300 px-3 text-base sm:text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
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

          <div className="flex flex-wrap items-end gap-2">
            {!isAccepted && (
              <form action={acceptDevis}>
                <input type="hidden" name="devisId" value={devis.id} />
                <button
                  type="submit"
                  className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-emerald-600 px-4 text-sm font-semibold text-white hover:bg-emerald-700"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Marquer accepté
                </button>
              </form>
            )}
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

        {/* Après acceptation — cycle NORMAL : planifier la date d'intervention (visite).
            Le cas travaux (devis AUTRE) reste l'exception et garde son lancement. */}
        {isAccepted && !isTravaux && (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3">
            <p className="text-sm text-slate-700">
              Devis accepté
              {devis.acceptedAt
                ? ` le ${devis.acceptedAt.toLocaleDateString('fr-FR')}`
                : ''}{' '}
              — planifiez maintenant la <strong>date d&apos;intervention</strong> (visite sur site).
            </p>
            <Link
              href={visitUrl}
              className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg bg-emerald-600 px-4 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              <CalendarClock className="h-4 w-4" />
              Planifier la visite
            </Link>
          </div>
        )}

        {/* Cas exceptionnel : devis d'accompagnement travaux accepté. */}
        {isAccepted && isTravaux && (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
            {coordAppt ? (
              <p className="text-sm text-slate-600">
                Lancement des travaux planifié le{' '}
                <strong>{coordAppt.start.toLocaleString('fr-FR')}</strong>.
              </p>
            ) : (
              <p className="text-sm text-slate-600">
                Devis travaux accepté — planifiez le lancement/coordination quand vous le décidez.
              </p>
            )}
            <Link
              href={coordAppt ? '/admin/agenda' : planUrl}
              className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg bg-slate-900 px-4 text-sm font-semibold text-white hover:bg-slate-800"
            >
              <CalendarClock className="h-4 w-4" />
              {coordAppt ? "Voir dans l'agenda" : 'Planifier le lancement'}
            </Link>
          </div>
        )}
      </section>

      {/* Modifier le devis */}
      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Modifier le devis
          </h2>
        </div>
        {isTravaux ? (
          <DevisTravauxForm
            mode="edit"
            devisId={devis.id}
            prix={Number(devis.totalHT)}
            bienConcerne={devis.bienConcerne ?? ''}
            validUntil={validUntilStr}
          />
        ) : (
          <EditDevisForm
            devisId={devis.id}
            serviceType={devis.serviceType ?? 'FISSURES'}
            prix={basePrix}
            bienConcerne={devis.bienConcerne ?? ''}
            validUntil={validUntilStr}
            isSurMesure={isSurMesure}
            hasFrais={hasFrais}
          />
        )}
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
                  <Money value={Number(l.unitPrice)} />
                </td>
                <td className="px-5 py-3 text-right font-medium tabular-nums">
                  <Money value={Number(l.total)} />
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
            <Money value={Number(devis.totalHT)} />
          </span>
        </div>
      </section>
    </div>
  );
}
