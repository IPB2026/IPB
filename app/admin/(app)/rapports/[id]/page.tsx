import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import {
  ArrowLeft,
  Download,
  AlertTriangle,
  Mail,
  Send,
  Phone,
  MapPin,
  Lock,
  CheckCircle2,
} from 'lucide-react';
import type { ReportStatus } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { getSessionUser } from '@/lib/auth-helpers';
import { isBlobConfigured } from '@/lib/blob';
import { euros } from '@/lib/crm/company';
import {
  isAiConfigured,
  isReportDraft,
  type ReportContent,
  type ReportZoneInput,
} from '@/lib/ai/report';
import {
  updateRapportStatus,
  validateAndSendRapport,
  submitRapportToAdmin,
} from '@/app/admin/(app)/rapports/actions';
import { RapportPhotos } from '@/components/admin/rapport-photos';
import { RapportGenerate } from '@/components/admin/rapport-generate';
import { RapportContentEditor } from '@/components/admin/rapport-content-editor';
import { RapportZonesEditor } from '@/components/admin/rapport-zones-editor';
import { ConfirmSubmit } from '@/components/admin/confirm-submit';

export const dynamic = 'force-dynamic';
// La génération IA (server action de cette page) peut durer plusieurs minutes :
// on étend le budget temps de la fonction au maximum permis par le plan Vercel.
// (Hobby plafonne à 60 s ; Pro applique réellement 300 s.)
export const maxDuration = 300;

const STATUS_LABEL: Record<ReportStatus, string> = {
  BROUILLON: 'Brouillon',
  SOUMIS: 'Soumis — à valider',
  GENERE: 'Généré — à valider',
  VALIDE: 'Validé',
  ENVOYE: 'Envoyé au client',
};

const OCCUPANT_LABEL: Record<string, string> = {
  PROPRIETAIRE: 'Propriétaire occupant',
  BAILLEUR: 'Propriétaire bailleur',
  LOCATAIRE: 'Locataire',
  ACHETEUR: "En projet d'achat",
  INVESTISSEUR: 'Investisseur / marchand de biens',
  INCONNU: 'Non précisé',
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
  const user = await getSessionUser();
  if (!user) redirect('/admin/login');

  const rapport = await prisma.rapport
    .findUnique({
      where: { id: params.id },
      include: { contact: true, photos: { orderBy: { position: 'asc' } } },
    })
    .catch(() => null);
  if (!rapport) notFound();

  const isAdmin = user.role === 'ADMIN';
  const isOwner = rapport.authorId === user.id;
  // Cloisonnement : un EXPERT ne voit que ses propres rapports.
  if (!isAdmin && !isOwner) redirect('/admin/rapports');

  // Infos prospect (non financières) utiles au diagnostiqueur.
  const lead = rapport.leadId
    ? await prisma.lead
        .findUnique({
          where: { id: rapport.leadId },
          select: { service: true, summary: true, payload: true },
        })
        .catch(() => null)
    : null;
  const note =
    lead?.payload && typeof lead.payload === 'object' && 'note' in lead.payload
      ? String((lead.payload as { note?: unknown }).note ?? '')
      : '';

  // Règle métier : le rapport ne part au client qu'une fois la facture PAYÉE.
  const facturePayee = isAdmin
    ? Boolean(
        await prisma.facture
          .findFirst({
            where: { contactId: rapport.contactId, status: 'PAYEE' },
            select: { id: true },
          })
          .catch(() => null)
      )
    : false;

  const status = rapport.status;
  // Édition de la saisie / ajout de photos : le diagnostiqueur tant que le rapport
  // n'est pas pris en main par l'IPB (BROUILLON ou SOUMIS) ; l'admin tant que non envoyé.
  const canEditField = isAdmin
    ? status !== 'ENVOYE'
    : isOwner && (status === 'BROUILLON' || status === 'GENERE');

  const zones = (rapport.zonesInput as unknown as ReportZoneInput[]) ?? [];
  const zoneTitles = zones.map((z) => z.titre).filter(Boolean);
  const ai = rapport.aiContent as unknown as
    | ReportContent
    | { error: string }
    | null;
  const hasError = ai != null && 'error' in ai;
  // Brouillon = génération multi-passes en cours/interrompue : ne pas l'afficher
  // comme un rapport fini (il lui manque des sections).
  const building = isReportDraft(ai);
  const content = ai && !hasError && !building ? (ai as ReportContent) : null;

  // Génération : auteur (diagnostiqueur) tant qu'il n'a pas transmis (BROUILLON/
  // GENERE), ou admin tant que non envoyé.
  const canGenerate =
    isAiConfigured() &&
    status !== 'ENVOYE' &&
    zones.length > 0 &&
    (isAdmin || (isOwner && (status === 'BROUILLON' || status === 'GENERE')));
  // Édition du contenu généré : admin (avant envoi) ou auteur (avant transmission).
  const canEditContent =
    content != null && status !== 'ENVOYE' && (isAdmin || (isOwner && status === 'GENERE'));
  // L'auteur transmet son rapport finalisé à l'IPB (GENERE → SOUMIS).
  const canSubmitToAdmin = isOwner && !isAdmin && content != null && status === 'GENERE';

  const c = rapport.contact;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Link
        href="/admin/rapports"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft className="h-4 w-4" />
        {isAdmin ? 'Tous les rapports' : 'Mes interventions'}
      </Link>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tabular-nums tracking-tight text-slate-900">
            {rapport.number}
          </h1>
          <p className="text-sm text-slate-500">
            {rapport.title} —{' '}
            <Link
              href={`/admin/clients/${rapport.contactId}`}
              className="font-medium text-slate-600 hover:text-orange-600 hover:underline"
            >
              {c.name}
            </Link>
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
            {STATUS_LABEL[status]}
          </span>
          {content && isAdmin && (
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
        </div>
      </div>

      {/* Coordonnées client (sans aucune donnée financière) */}
      <Card title="Client & bien">
        <div className="grid grid-cols-1 gap-x-8 gap-y-2 text-sm sm:grid-cols-2">
          <Info label="Nom" value={c.name} />
          <Info label="Service" value={lead ? SERVICE_FR[lead.service] : null} />
          {c.phone && (
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-slate-400" />
              <a href={`tel:${c.phone}`} className="font-medium text-slate-700 hover:text-orange-600">
                {c.phone}
              </a>
            </p>
          )}
          {c.email && (
            <p className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-slate-400" />
              <a href={`mailto:${c.email}`} className="font-medium text-slate-700 hover:text-orange-600">
                {c.email}
              </a>
            </p>
          )}
          <p className="flex items-center gap-2 sm:col-span-2">
            <MapPin className="h-4 w-4 shrink-0 text-slate-400" />
            <span className="text-slate-700">
              {[c.address, [c.postalCode, c.city].filter(Boolean).join(' ')]
                .filter(Boolean)
                .join(', ') || '—'}
            </span>
          </p>
          <Info label="Statut occupant" value={OCCUPANT_LABEL[c.occupantStatus]} />
          <Info label="Type de bien" value={c.propertyType} />
        </div>
        {(lead?.summary || note) && (
          <div className="mt-3 border-t border-slate-100 pt-3">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
              Demande du client
            </p>
            <p className="mt-1 text-sm text-slate-600">{note || lead?.summary}</p>
          </div>
        )}
      </Card>

      {/* Saisie terrain — éditable selon le rôle/statut, sinon lecture seule */}
      <Card title="Saisie terrain — constats par zone">
        {canEditField ? (
          <RapportZonesEditor
            rapportId={rapport.id}
            initialZones={zones.map((z) => ({
              titre: z.titre ?? '',
              observations: z.observations ?? '',
              mesure: z.mesure ?? '',
              gravite: z.gravite ?? 'À TRAITER',
            }))}
          />
        ) : zones.length === 0 ? (
          <p className="text-sm text-slate-500">Aucune zone saisie.</p>
        ) : (
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
        )}
      </Card>

      {/* Photos terrain */}
      <RapportPhotos
        rapportId={rapport.id}
        photos={rapport.photos.map((p) => ({
          id: p.id,
          url: p.url,
          caption: p.caption,
          zoneRef: p.zoneRef,
          gravite: p.gravite,
        }))}
        zones={zoneTitles}
        blobConfigured={isBlobConfigured()}
        canEdit={canEditField}
      />

      {/* Génération, édition & validation — diagnostiqueur (auteur) ou IPB */}
      {(isAdmin || isOwner) && (
        <section className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">
                {isAdmin ? 'Génération & validation' : 'Génération du rapport'}
              </h2>
              <p className="text-xs text-slate-500">
                {rapport.aiGeneratedAt
                  ? `Généré le ${rapport.aiGeneratedAt.toLocaleString('fr-FR')} · ${rapport.aiModel}`
                  : building
                    ? 'Génération en cours ou interrompue — cliquez pour reprendre.'
                    : 'Pas encore généré.'}
                {rapport.photos.length > 0 &&
                  ` · ${rapport.photos.length} photo(s) analysée(s)`}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {canGenerate && (
                <RapportGenerate
                  rapportId={rapport.id}
                  disabled={zones.length === 0}
                  hasContent={Boolean(content)}
                  building={building}
                />
              )}
              {isAdmin && content && c.email && status !== 'ENVOYE' && facturePayee && (
                <form action={validateAndSendRapport}>
                  <input type="hidden" name="rapportId" value={rapport.id} />
                  <ConfirmSubmit
                    message={`Envoyer définitivement le rapport ${rapport.number} à ${c.email} ? Le PDF part immédiatement au client.`}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    Valider et envoyer au client
                  </ConfirmSubmit>
                </form>
              )}
              {isAdmin && content && c.email && status !== 'ENVOYE' && !facturePayee && (
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-medium text-amber-800">
                  <Lock className="h-4 w-4" />
                  Facture non payée — envoi bloqué
                </span>
              )}
              {content && status === 'ENVOYE' && (
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-violet-50 px-3 py-2 text-sm font-medium text-violet-700">
                  <Mail className="h-4 w-4" />
                  Envoyé au client
                </span>
              )}
            </div>
          </div>

          {/* Diagnostiqueur : transmettre le rapport finalisé à l'IPB */}
          {canSubmitToAdmin && (
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-3">
              <p className="text-sm text-emerald-800">
                Rapport relu et corrigé ? Transmettez-le à l'IPB pour validation finale
                et envoi au client.
              </p>
              <form action={submitRapportToAdmin}>
                <input type="hidden" name="rapportId" value={rapport.id} />
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                >
                  <Send className="h-4 w-4" />
                  Transmettre à l'IPB
                </button>
              </form>
            </div>
          )}

          {/* Diagnostiqueur : rapport transmis, en attente de validation */}
          {isOwner && !isAdmin && status === 'SOUMIS' && (
            <p className="mt-3 flex items-start gap-2 rounded-lg border border-violet-200 bg-violet-50 p-3 text-sm text-violet-800">
              <Lock className="mt-0.5 h-4 w-4 shrink-0" />
              Rapport transmis à l'IPB — en attente de validation finale et d'envoi au client.
            </p>
          )}

          {isAdmin && content && c.email && status !== 'ENVOYE' && (
            <p className="mt-2 text-xs text-slate-400">
              « Valider et envoyer » transmet le PDF à <strong>{c.email}</strong>{' '}
              et clôt le rapport (statut Envoyé).
            </p>
          )}
          {isAdmin && content && !c.email && (
            <p className="mt-2 text-xs text-amber-700">
              Aucun e-mail client : renseignez-le sur la fiche prospect pour
              activer l'envoi automatique.
            </p>
          )}
          {!isAiConfigured() && (
            <p className="mt-2 text-xs text-amber-700">
              Clé Anthropic non configurée — génération indisponible.
            </p>
          )}
        </section>
      )}

      {/* Éditeur du contenu généré — auteur (avant transmission) ou IPB (avant envoi) */}
      {canEditContent && content && (
        <Card title="Relire et corriger le rapport">
          <RapportContentEditor rapportId={rapport.id} initialContent={content} />
        </Card>
      )}

      {hasError && (isAdmin || isOwner) && (
        <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{(ai as { error: string }).error}</span>
        </div>
      )}

      {/* Aperçu lecture seule — quand on n'est PAS en train d'éditer (sinon l'éditeur fait foi) */}
      {content && !canEditContent && (
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
                  <p className="mt-1 text-sm text-slate-600">{z.description}</p>
                  {z.analyseCausale?.length ? (
                    <ul className="mt-1 space-y-0.5 text-xs text-slate-500">
                      {z.analyseCausale.map((m, j) => (
                        <li key={j}>• {m}</li>
                      ))}
                    </ul>
                  ) : null}
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

          <Card title="Estimation budgétaire des travaux">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-slate-100">
                {content.estimationTravaux.map((e, i) => (
                  <tr key={i}>
                    <td className="py-2 text-slate-700">{e.designation}</td>
                    <td className="py-2 text-center text-slate-500">{e.unite}</td>
                    <td className="py-2 text-center text-xs text-slate-400">
                      TVA {e.tva} %
                    </td>
                    <td className="py-2 text-right font-medium tabular-nums">
                      {euros(e.montantHT)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-2 text-right text-sm font-bold text-orange-600">
              Total estimé {euros(content.budgetHT)} HT
            </p>
          </Card>

          <p className="rounded-lg bg-blue-50 px-4 py-2.5 text-xs text-blue-800">
            Aperçu synthétique. Le <strong>rapport complet</strong> (contexte de
            localisation, limites &amp; périmètre, matrice de criticité, orientations,
            annexe photo) est dans le <strong>PDF</strong> — relisez-le avant envoi au client.
          </p>

          {/* Statut manuel — ADMIN uniquement (override) */}
          {isAdmin && (
            <section className="rounded-xl border border-slate-200 bg-white p-5">
              <form action={updateRapportStatus} className="flex flex-wrap items-end gap-2">
                <input type="hidden" name="rapportId" value={rapport.id} />
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Statut (modification manuelle)
                  </label>
                  <select
                    name="status"
                    defaultValue={status}
                    className="h-10 rounded-lg border border-slate-300 px-3 text-base sm:text-sm outline-none focus:border-orange-500"
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
                  L'envoi au client se fait via « Valider et envoyer » ci-dessus.
                </p>
              </form>
            </section>
          )}
        </>
      )}
    </div>
  );
}

const SERVICE_FR: Record<string, string> = {
  FISSURES: 'Fissures',
  HUMIDITE: 'Humidité',
  EXPERTISE_ACHAT: 'Expertise avant achat',
  MUR_PORTEUR: 'Mur porteur',
  AUTRE: 'Autre',
};

function Info({ label, value }: { label: string; value?: string | null }) {
  return (
    <p className="flex justify-between gap-4">
      <span className="text-slate-500">{label}</span>
      <span className="text-right font-medium text-slate-800">
        {value || <span className="text-slate-300">—</span>}
      </span>
    </p>
  );
}
