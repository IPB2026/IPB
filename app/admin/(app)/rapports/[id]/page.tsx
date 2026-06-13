import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Download, Sparkles, AlertTriangle, Mail } from 'lucide-react';
import type { ReportStatus } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { euros } from '@/lib/crm/company';
import { isAiConfigured, type ReportContent, type ReportZoneInput } from '@/lib/ai/report';
import {
  generateRapportAI,
  updateRapportStatus,
} from '@/app/admin/(app)/rapports/actions';
import { sendRapport } from '@/app/admin/(app)/send-actions';

export const dynamic = 'force-dynamic';

const STATUS_LABEL: Record<ReportStatus, string> = {
  BROUILLON: 'Brouillon',
  GENERE: 'Généré',
  VALIDE: 'Validé',
  ENVOYE: 'Envoyé',
};

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5">
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default async function RapportDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const rapport = await prisma.rapport
    .findUnique({ where: { id: params.id }, include: { contact: true } })
    .catch(() => null);
  if (!rapport) notFound();

  const zones = (rapport.zonesInput as unknown as ReportZoneInput[]) ?? [];
  const ai = rapport.aiContent as unknown as
    | ReportContent
    | { error: string }
    | null;
  const hasError = ai != null && 'error' in ai;
  const content = ai && !hasError ? (ai as ReportContent) : null;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Link
        href="/admin/rapports"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Tous les rapports
      </Link>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tabular-nums tracking-tight text-slate-900">
            {rapport.number}
          </h1>
          <p className="text-sm text-slate-500">
            {rapport.title} — {rapport.contact.name}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
            {STATUS_LABEL[rapport.status]}
          </span>
          {content && (
            <a
              href={`/admin/rapports/${rapport.id}/pdf`}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              <Download className="h-4 w-4" />
              PDF
            </a>
          )}
          {content && rapport.contact.email && (
            <form action={sendRapport}>
              <input type="hidden" name="rapportId" value={rapport.id} />
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

      {/* Saisie terrain */}
      <Card title="Saisie terrain">
        <ul className="space-y-3">
          {zones.map((z, i) => (
            <li key={i} className="border-l-2 border-slate-200 pl-3">
              <p className="text-sm font-medium text-slate-800">
                {i + 1}. {z.titre}
                {z.gravite ? (
                  <span className="ml-2 text-xs font-normal text-orange-600">
                    {z.gravite}
                  </span>
                ) : null}
              </p>
              <p className="text-sm text-slate-600">{z.observations}</p>
              {z.mesure ? (
                <p className="text-xs text-slate-400">Mesure : {z.mesure}</p>
              ) : null}
            </li>
          ))}
        </ul>
      </Card>

      {/* Génération IA */}
      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              Génération par IA
            </h2>
            <p className="text-xs text-slate-500">
              {rapport.aiGeneratedAt
                ? `Généré le ${rapport.aiGeneratedAt.toLocaleString('fr-FR')} · ${rapport.aiModel}`
                : 'Pas encore généré.'}
            </p>
          </div>
          {isAiConfigured() ? (
            <form action={generateRapportAI}>
              <input type="hidden" name="rapportId" value={rapport.id} />
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700"
              >
                <Sparkles className="h-4 w-4" />
                {content ? 'Régénérer' : 'Générer le rapport'}
              </button>
            </form>
          ) : (
            <span className="text-xs text-amber-700">
              Clé Anthropic non configurée.
            </span>
          )}
        </div>
        <p className="mt-2 text-xs text-slate-400">
          La génération peut prendre 15-40 s. L'expert relit et valide avant envoi.
        </p>
      </section>

      {hasError && (
        <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{(ai as { error: string }).error}</span>
        </div>
      )}

      {/* Contenu généré */}
      {content && (
        <>
          <div className="rounded-xl border-l-4 border-orange-500 bg-orange-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-orange-700">
              Conclusion générale
            </p>
            <p className="mt-1 text-sm text-slate-700">
              {content.conclusionGenerale}
            </p>
          </div>

          <Card title="Analyse par zone">
            <div className="space-y-5">
              {content.zones.map((z, i) => (
                <div key={i}>
                  <p className="font-medium text-slate-900">
                    {i + 1}. {z.titre}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">{z.analyse}</p>
                  {z.refsTechniques?.length ? (
                    <ul className="mt-2 rounded-lg bg-slate-50 p-2 text-xs text-slate-500">
                      {z.refsTechniques.map((r, j) => (
                        <li key={j}>▸ {r}</li>
                      ))}
                    </ul>
                  ) : null}
                  <p className="mt-1 text-xs font-semibold text-orange-700">
                    {z.gravite} — {z.preconisation}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Estimation budgétaire">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-slate-100">
                {content.estimationTravaux.map((e, i) => (
                  <tr key={i}>
                    <td className="py-2 text-slate-700">{e.designation}</td>
                    <td className="py-2 text-center text-slate-500">{e.unite}</td>
                    <td className="py-2 text-right font-medium tabular-nums">
                      {euros(e.montantHT)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-2 text-right text-sm font-bold text-orange-600">
              Total {euros(content.budgetHT)} HT · {euros(Math.round(content.budgetHT * 1.1))} TTC (TVA 10 %)
            </p>
          </Card>

          {/* Validation */}
          <section className="rounded-xl border border-slate-200 bg-white p-5">
            <form action={updateRapportStatus} className="flex flex-wrap items-end gap-2">
              <input type="hidden" name="rapportId" value={rapport.id} />
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Statut du rapport
                </label>
                <select
                  name="status"
                  defaultValue={rapport.status}
                  className="h-10 rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-orange-500"
                >
                  {Object.entries(STATUS_LABEL).map(([v, l]) => (
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
              <p className="ml-auto self-center text-xs text-slate-400">
                Relisez le contenu avant de passer à « Validé » puis « Envoyé ».
              </p>
            </form>
          </section>
        </>
      )}
    </div>
  );
}
