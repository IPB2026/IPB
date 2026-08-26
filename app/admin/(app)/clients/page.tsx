import Link from 'next/link';
import { UserCheck, Download, Plus, Search, Trash2, RotateCcw, GitMerge, Archive } from 'lucide-react';
import { Prisma, type ServiceType, type LeadTier } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { guardAdminPage } from '@/lib/auth-helpers';
import { Money } from '@/components/admin/money';
import { computeDossier, dossierInputFromContact } from '@/lib/crm/dossier';
import { PageHeader } from '@/components/admin/page-header';
import { EmptyState } from '@/components/admin/empty-state';
import { Avatar } from '@/components/admin/avatar';
import { MobileCardList, MobileCardRow } from '@/components/admin/mobile-card';
import { PhaseBadge, SERVICE_LABEL } from '@/components/admin/badges';
import {
  CLIENT_CONTACT_WHERE,
  PROSPECT_CONTACT_WHERE,
  LOST_CONTACT_WHERE,
  NOT_LOST_CONTACT_WHERE,
} from '@/lib/crm/client-status';
import { Pagination, parsePage } from '@/components/admin/pagination';
import { QuickActionMenu } from '@/components/admin/quick-action-menu';
import { ConfirmSubmit } from '@/components/admin/confirm-submit';
import {
  restoreContact,
  purgeContact,
  archiveContact,
  archiveContacts,
  restoreContacts,
  purgeContacts,
} from '@/app/admin/(app)/contact-actions';
import { clearManualPhase, markContactsLost, reopenContacts } from '@/app/admin/(app)/leads/actions';
import {
  BulkSelectProvider,
  BulkSelectToggle,
  BulkRowCheckbox,
  BulkSelectAll,
  BulkActionBar,
  type BulkAction,
} from '@/components/admin/bulk-select';

export const dynamic = 'force-dynamic';

type SearchParams = {
  q?: string;
  etat?: string;
  service?: string;
  tier?: string;
  canal?: string;
  corbeille?: string;
  archives?: string;
  page?: string;
};

function buildWhere(sp: SearchParams): Prisma.ContactWhereInput {
  const and: Prisma.ContactWhereInput[] = [];
  // Trois vues exclusives :
  //  · ?corbeille=1 → clients à la corbeille (soft-delete, purge à 30 j)
  //  · ?archives=1  → clients dont tous les dossiers sont PERDUS (shadow, rien
  //                   n'est supprimé : la fiche et son historique restent entiers)
  //  · sinon        → clients actifs (ni corbeille, ni perdus)
  if (sp.corbeille) {
    and.push({ archivedAt: { not: null } });
  } else if (sp.archives) {
    and.push({ archivedAt: null }, LOST_CONTACT_WHERE);
  } else {
    and.push({ archivedAt: null }, NOT_LOST_CONTACT_WHERE);
  }
  if (sp.q) {
    const like = { contains: sp.q, mode: 'insensitive' as const };
    and.push({
      OR: [{ name: like }, { email: like }, { phone: like }, { city: like }],
    });
  }
  if (sp.etat === 'clients') {
    and.push(CLIENT_CONTACT_WHERE);
  } else if (sp.etat === 'prospects') {
    and.push(PROSPECT_CONTACT_WHERE);
  }
  // Filtres portés par le dossier (lead) : service, priorité (tier), canal.
  if (sp.service) and.push({ leads: { some: { service: sp.service as ServiceType } } });
  if (sp.tier) and.push({ leads: { some: { tier: sp.tier as LeadTier } } });
  if (sp.canal) and.push({ leads: { some: { channel: sp.canal } } });
  return { AND: and };
}

/** URL de la vue courante (filtres compris) — retour après une action groupée. */
function currentUrl(sp: SearchParams): string {
  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(sp)) if (v) qs.set(k, String(v));
  const s = qs.toString();
  return s ? `/admin/clients?${s}` : '/admin/clients';
}

const SERVICE_OPTIONS: ServiceType[] = ['FISSURES', 'HUMIDITE', 'EXPERTISE_ACHAT', 'MUR_PORTEUR', 'AUTRE'];
const TIER_OPTIONS: { value: LeadTier; label: string }[] = [
  { value: 'HOT', label: 'Chaud' },
  { value: 'WARM', label: 'Tiède' },
  { value: 'COLD', label: 'Froid' },
];
const CANAL_OPTIONS: { value: string; label: string }[] = [
  { value: 'ADS', label: 'Publicité (Ads)' },
  { value: 'SEO', label: 'Référencement' },
  { value: 'SOCIAL', label: 'Réseaux sociaux' },
  { value: 'REFERRAL', label: 'Site référent' },
  { value: 'DIRECT', label: 'Direct' },
];
const hasActiveFilter = (sp: SearchParams) =>
  Boolean(sp.q || sp.etat || sp.service || sp.tier || sp.canal);

/** Actions de corbeille (restaurer / supprimer définitivement) pour une ligne. */
function TrashActions({ id, name }: { id: string; name: string }) {
  return (
    <div className="flex items-center justify-end gap-1.5">
      <form action={restoreContact}>
        <input type="hidden" name="contactId" value={id} />
        <button
          type="submit"
          className="inline-flex h-8 items-center gap-1 rounded-lg border border-emerald-200 bg-emerald-50 px-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-100"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Restaurer
        </button>
      </form>
      <form action={purgeContact}>
        <input type="hidden" name="contactId" value={id} />
        <ConfirmSubmit
          message={`Supprimer DÉFINITIVEMENT « ${name} » et tout son dossier (devis, factures, rapports, RDV, photos) ? Cette action est IRRÉVERSIBLE.`}
          className="inline-flex h-8 items-center gap-1 rounded-lg border border-red-200 bg-white px-2 text-xs font-semibold text-red-700 hover:bg-red-50"
        >
          <Trash2 className="h-3.5 w-3.5" /> Supprimer
        </ConfirmSubmit>
      </form>
    </div>
  );
}

/**
 * Actions de ligne dans les ARCHIVES : rouvrir le dossier (il revient dans la
 * liste active) ou l'envoyer à la corbeille (soft-delete, purge à 30 j).
 */
function ArchiveActions({ id, name, leadId }: { id: string; name: string; leadId: string | null }) {
  return (
    <div className="flex items-center justify-end gap-1.5">
      {leadId && (
        <form action={clearManualPhase}>
          <input type="hidden" name="leadId" value={leadId} />
          <button
            type="submit"
            className="inline-flex h-8 items-center gap-1 rounded-lg border border-emerald-200 bg-emerald-50 px-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-100"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Rouvrir
          </button>
        </form>
      )}
      <form action={archiveContact}>
        <input type="hidden" name="contactId" value={id} />
        <input type="hidden" name="redirectTo" value="/admin/clients?archives=1" />
        <ConfirmSubmit
          message={`Mettre « ${name} » à la corbeille ? Le client disparaît du CRM mais reste récupérable 30 jours.`}
          confirmLabel="Mettre à la corbeille"
          className="inline-flex h-8 items-center gap-1 rounded-lg border border-red-200 bg-white px-2 text-xs font-semibold text-red-700 hover:bg-red-50"
        >
          <Trash2 className="h-3.5 w-3.5" /> Corbeille
        </ConfirmSubmit>
      </form>
    </div>
  );
}

export default async function ClientsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  await guardAdminPage();
  const corbeille = Boolean(searchParams.corbeille);
  const archives = !corbeille && Boolean(searchParams.archives);

  let loaded: Awaited<ReturnType<typeof load>> | null = null;
  let dbError = false;
  try {
    loaded = await load(searchParams);
  } catch {
    dbError = true;
  }
  const contacts = loaded?.contacts ?? [];
  const total = loaded?.total ?? 0;
  const page = loaded?.page ?? 1;

  const rows = contacts.map((c) => {
    const stage = c.leads[0]?.stage ?? null;
    const manualPhase = c.leads[0]?.manualPhase ?? null;
    const dossier = computeDossier(dossierInputFromContact(c, { stage, manualPhase }));
    const service = c.leads[0]?.service ?? null;
    const leadId = c.leads[0]?.id ?? null;
    return {
      c,
      dossier,
      isClient: dossier.isClient,
      service,
      leadId,
    };
  });

  const hasFilters = hasActiveFilter(searchParams);
  const pageIds = rows.map(({ c }) => c.id);

  // Actions groupées proposées selon la vue — mêmes gestes que les boutons de
  // ligne, appliqués à toute la sélection.
  const bulkActions: BulkAction[] = corbeille
    ? [
        {
          key: 'restore',
          label: 'Restaurer',
          icon: 'restore',
          tone: 'neutral',
          confirm: 'Restaurer {n} client(s) depuis la corbeille ?',
          action: restoreContacts,
        },
        {
          key: 'purge',
          label: 'Supprimer définitivement',
          icon: 'trash',
          confirm:
            'Supprimer DÉFINITIVEMENT {n} client(s) et tout leur dossier (devis, factures, rapports, RDV, photos) ? Cette action est IRRÉVERSIBLE.',
          action: purgeContacts,
        },
      ]
    : archives
      ? [
          {
            key: 'reopen',
            label: 'Rouvrir',
            icon: 'restore',
            tone: 'neutral',
            confirm: 'Rouvrir {n} dossier(s) ? Ils reviennent dans la liste des clients actifs.',
            action: reopenContacts,
          },
          {
            key: 'trash',
            label: 'Mettre à la corbeille',
            icon: 'trash',
            confirm:
              'Mettre {n} client(s) à la corbeille ? Ils restent récupérables 30 jours.',
            action: archiveContacts,
          },
        ]
      : [
          {
            key: 'lost',
            label: 'Marquer perdu',
            icon: 'lost',
            tone: 'neutral',
            confirm:
              'Marquer {n} dossier(s) comme perdus ? Ils quittent la liste active pour Clients → Archives (rien n’est supprimé).',
            action: markContactsLost,
          },
          {
            key: 'trash',
            label: 'Mettre à la corbeille',
            icon: 'trash',
            confirm:
              'Mettre {n} client(s) à la corbeille ? Ils disparaissent du CRM mais restent récupérables 30 jours.',
            action: archiveContacts,
          },
        ];

  return (
    <BulkSelectProvider>
    <div className="space-y-5">
      <PageHeader
        title={corbeille ? 'Corbeille' : archives ? 'Archives' : 'Clients'}
        subtitle={
          dbError
            ? undefined
            : corbeille
              ? `${total} client(s) à la corbeille — suppression définitive automatique après 30 jours`
              : archives
                ? `${total} dossier(s) perdu(s) — conservés intégralement, hors de la liste active`
                : `${total} contact(s) — prospects & clients`
        }
        actions={
          corbeille || archives ? (
            <>
              <BulkSelectToggle />
              <Link
                href="/admin/clients"
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                ← Retour aux clients
              </Link>
            </>
          ) : (
            <>
              <BulkSelectToggle />
              <Link
                href="/admin/clients/doublons"
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                <GitMerge className="h-4 w-4" />
                Doublons
              </Link>
              <Link
                href="/admin/clients?archives=1"
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                <Archive className="h-4 w-4" />
                Archives
              </Link>
              <Link
                href="/admin/clients?corbeille=1"
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                <Trash2 className="h-4 w-4" />
                Corbeille
              </Link>
              <a
                href="/admin/exports?type=clients"
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                <Download className="h-4 w-4" />
                CSV
              </a>
              <Link
                href="/admin/leads/nouveau"
                className="inline-flex items-center gap-1.5 rounded-lg bg-orange-600 px-3.5 py-2 text-sm font-semibold text-white hover:bg-orange-700"
              >
                <Plus className="h-4 w-4" />
                Nouveau
              </Link>
            </>
          )
        }
      />

      {/* Recherche + filtres multi-critères (masqués dans la corbeille). Form GET :
          chaque champ devient un paramètre d'URL → filtrage serveur, sans JS. */}
      {!corbeille && (
      <form
        method="get"
        action="/admin/clients"
        className="space-y-2.5 rounded-xl border border-slate-200 bg-white p-3"
      >
        {/* Reste dans la vue courante (Archives) après filtrage. */}
        {archives && <input type="hidden" name="archives" value="1" />}
        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
          <div className="relative sm:flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              name="q"
              defaultValue={searchParams.q ?? ''}
              placeholder="Rechercher un nom, téléphone, e-mail, ville…"
              className="h-10 w-full rounded-lg border border-slate-300 pl-9 pr-3 text-base outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 sm:text-sm"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="h-10 rounded-lg bg-slate-900 px-4 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Filtrer
            </button>
            {hasActiveFilter(searchParams) && (
              <Link
                href={archives ? '/admin/clients?archives=1' : '/admin/clients'}
                className="flex h-10 items-center rounded-lg border border-slate-300 px-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Réinitialiser
              </Link>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <select name="etat" defaultValue={searchParams.etat ?? ''} className="h-10 rounded-lg border border-slate-300 px-2.5 text-sm outline-none focus:border-orange-500">
            <option value="">État : tous</option>
            <option value="prospects">Prospects</option>
            <option value="clients">Clients</option>
          </select>
          <select name="service" defaultValue={searchParams.service ?? ''} className="h-10 rounded-lg border border-slate-300 px-2.5 text-sm outline-none focus:border-orange-500">
            <option value="">Service : tous</option>
            {SERVICE_OPTIONS.map((s) => (
              <option key={s} value={s}>{SERVICE_LABEL[s]}</option>
            ))}
          </select>
          <select name="tier" defaultValue={searchParams.tier ?? ''} className="h-10 rounded-lg border border-slate-300 px-2.5 text-sm outline-none focus:border-orange-500">
            <option value="">Priorité : toutes</option>
            {TIER_OPTIONS.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
          <select name="canal" defaultValue={searchParams.canal ?? ''} className="h-10 rounded-lg border border-slate-300 px-2.5 text-sm outline-none focus:border-orange-500">
            <option value="">Canal : tous</option>
            {CANAL_OPTIONS.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>
      </form>
      )}

      {dbError || rows.length === 0 ? (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <EmptyState
            icon={corbeille ? Trash2 : archives ? Archive : UserCheck}
            title={
              corbeille
                ? 'Corbeille vide'
                : archives
                  ? 'Aucun dossier archivé'
                  : hasFilters
                    ? 'Aucun résultat'
                    : 'Aucun contact'
            }
            description={
              corbeille
                ? 'Aucun client à la corbeille.'
                : archives
                  ? 'Les dossiers marqués « perdu » arrivent ici automatiquement.'
                  : hasFilters
                    ? 'Essayez d’élargir votre recherche ou le filtre.'
                    : 'Ajoutez votre premier prospect — il apparaîtra ici avec son état.'
            }
            actionLabel={corbeille || archives || hasFilters ? undefined : 'Nouveau prospect'}
            actionHref={corbeille || archives || hasFilters ? undefined : '/admin/leads/nouveau'}
          />
        </div>
      ) : (
        <>
          {/* Mobile : cartes */}
          <MobileCardList>
            {rows.map(({ c, dossier, isClient, service, leadId }) => (
              <MobileCardRow
                key={c.id}
                href={`/admin/clients/${c.id}`}
                leading={
                  <>
                    <BulkRowCheckbox id={c.id} label={c.name} />
                    <Avatar name={c.name} size="sm" />
                  </>
                }
                title={c.name}
                badge={<EtatBadge isClient={isClient} />}
                amount={dossier.montantDevis != null ? <Money value={dossier.montantDevis} /> : undefined}
                lines={[
                  [service ? SERVICE_LABEL[service] : null, c.city || c.phone || c.email]
                    .filter(Boolean)
                    .join(' · ') || '—',
                  <PhaseBadge key="p" phase={dossier.phase} />,
                ]}
                action={
                  corbeille ? (
                    <TrashActions id={c.id} name={c.name} />
                  ) : archives ? (
                    <ArchiveActions id={c.id} name={c.name} leadId={leadId} />
                  ) : (
                    <QuickActionMenu contactId={c.id} name={c.name} phone={c.phone} leadId={leadId} />
                  )
                }
              />
            ))}
          </MobileCardList>

          {/* Desktop : tableau */}
          <div className="hidden overflow-hidden rounded-xl border border-slate-200 bg-white md:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left text-xs font-medium uppercase tracking-wider text-slate-400">
                  <th className="py-2.5 pl-5 pr-0 empty:hidden">
                    <BulkSelectAll ids={pageIds} />
                  </th>
                  <th className="px-5 py-2.5">Contact</th>
                  <th className="px-5 py-2.5">Service</th>
                  <th className="px-5 py-2.5">État</th>
                  <th className="px-5 py-2.5">Étape</th>
                  <th className="px-5 py-2.5 text-right">Montant</th>
                  <th className="px-5 py-2.5"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map(({ c, dossier, isClient, service, leadId }) => (
                  <tr key={c.id} className="group transition-colors hover:bg-slate-50">
                    <td className="py-3 pl-5 pr-0 empty:hidden">
                      <BulkRowCheckbox id={c.id} label={c.name} />
                    </td>
                    <td className="px-5 py-3">
                      <Link href={`/admin/clients/${c.id}`} className="flex items-center gap-3">
                        <Avatar name={c.name} size="sm" />
                        <span>
                          <span className="block font-medium text-slate-900 group-hover:text-orange-600">
                            {c.name}
                          </span>
                          <span className="block text-xs text-slate-400">
                            {c.city || c.phone || c.email || '—'}
                          </span>
                        </span>
                      </Link>
                    </td>
                    <td className="px-5 py-3 text-slate-600">
                      {service ? SERVICE_LABEL[service] : '—'}
                    </td>
                    <td className="px-5 py-3">
                      <EtatBadge isClient={isClient} />
                    </td>
                    <td className="px-5 py-3">
                      <PhaseBadge phase={dossier.phase} />
                    </td>
                    <td className="px-5 py-3 text-right font-medium tabular-nums">
                      <Money value={dossier.montantDevis} />
                    </td>
                    <td className="px-5 py-3 text-right">
                      {corbeille ? (
                        <TrashActions id={c.id} name={c.name} />
                      ) : archives ? (
                        <ArchiveActions id={c.id} name={c.name} leadId={leadId} />
                      ) : (
                        <QuickActionMenu contactId={c.id} name={c.name} phone={c.phone} leadId={leadId} />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            page={page}
            pageSize={CLIENTS_PAGE_SIZE}
            total={total}
            basePath="/admin/clients"
            params={{
              ...(searchParams.q ? { q: searchParams.q } : {}),
              ...(searchParams.etat ? { etat: searchParams.etat } : {}),
              ...(searchParams.service ? { service: searchParams.service } : {}),
              ...(searchParams.tier ? { tier: searchParams.tier } : {}),
              ...(searchParams.canal ? { canal: searchParams.canal } : {}),
              ...(searchParams.corbeille ? { corbeille: searchParams.corbeille } : {}),
              ...(searchParams.archives ? { archives: searchParams.archives } : {}),
            }}
          />
        </>
      )}

      {/* Barre d'actions groupées — n'apparaît qu'avec une sélection en cours. */}
      <BulkActionBar actions={bulkActions} redirectTo={currentUrl(searchParams)} />
    </div>
    </BulkSelectProvider>
  );
}

function EtatBadge({ isClient }: { isClient: boolean }) {
  return isClient ? (
    <span className="inline-flex rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
      Client
    </span>
  ) : (
    <span className="inline-flex rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
      Prospect
    </span>
  );
}

const CLIENTS_PAGE_SIZE = 50;

async function load(sp: SearchParams) {
  const where = buildWhere(sp);
  const page = parsePage(sp.page);
  const [contacts, total] = await Promise.all([
    prisma.contact.findMany({
      where,
      orderBy: { updatedAt: 'desc' },
      skip: (page - 1) * CLIENTS_PAGE_SIZE,
      take: CLIENTS_PAGE_SIZE,
      select: {
        id: true,
        name: true,
        city: true,
        phone: true,
        email: true,
        devis: {
          select: { status: true, totalHT: true, acceptedAt: true, serviceType: true },
          orderBy: { createdAt: 'desc' },
        },
        factures: { select: { status: true } },
        rapports: { select: { status: true, updatedAt: true, budgetHT: true }, orderBy: { updatedAt: 'desc' } },
        appointments: { select: { type: true, status: true } },
        leads: { select: { id: true, stage: true, manualPhase: true, service: true }, orderBy: { createdAt: 'desc' }, take: 1 },
      },
    }),
    prisma.contact.count({ where }),
  ]);
  return { contacts, total, page };
}
