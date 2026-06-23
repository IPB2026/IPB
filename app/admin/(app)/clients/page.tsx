import Link from 'next/link';
import { UserCheck, Download, Plus, Search, Trash2, RotateCcw } from 'lucide-react';
import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { guardAdminPage } from '@/lib/auth-helpers';
import { Money } from '@/components/admin/money';
import { computeDossier } from '@/lib/crm/dossier';
import { PageHeader } from '@/components/admin/page-header';
import { EmptyState } from '@/components/admin/empty-state';
import { Avatar } from '@/components/admin/avatar';
import { MobileCardList, MobileCardRow } from '@/components/admin/mobile-card';
import { PhaseBadge, SERVICE_LABEL } from '@/components/admin/badges';
import { QuickActionMenu } from '@/components/admin/quick-action-menu';
import { ConfirmSubmit } from '@/components/admin/confirm-submit';
import { restoreContact, purgeContact } from '@/app/admin/(app)/contact-actions';

export const dynamic = 'force-dynamic';

type SearchParams = { q?: string; etat?: string; corbeille?: string };

function buildWhere(sp: SearchParams): Prisma.ContactWhereInput {
  const and: Prisma.ContactWhereInput[] = [];
  // Corbeille : on liste les clients ARCHIVÉS si ?corbeille=1, sinon les ACTIFS.
  and.push(sp.corbeille ? { archivedAt: { not: null } } : { archivedAt: null });
  if (sp.q) {
    const like = { contains: sp.q, mode: 'insensitive' as const };
    and.push({
      OR: [{ name: like }, { email: like }, { phone: like }, { city: like }],
    });
  }
  if (sp.etat === 'clients') {
    and.push({
      OR: [{ devis: { some: { status: 'ACCEPTE' } } }, { factures: { some: {} } }],
    });
  } else if (sp.etat === 'prospects') {
    and.push({ devis: { none: { status: 'ACCEPTE' } }, factures: { none: {} } });
  }
  return { AND: and };
}

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

const ETAT_FILTERS: [string, string][] = [
  ['', 'Tous'],
  ['prospects', 'Prospects'],
  ['clients', 'Clients'],
];

export default async function ClientsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  await guardAdminPage();
  const corbeille = Boolean(searchParams.corbeille);

  let contacts: Awaited<ReturnType<typeof load>> = [];
  let dbError = false;
  try {
    contacts = await load(searchParams);
  } catch {
    dbError = true;
  }

  const rows = contacts.map((c) => {
    const stage = c.leads[0]?.stage ?? null;
    const manualPhase = c.leads[0]?.manualPhase ?? null;
    const dossier = computeDossier({
      devis: c.devis.map((d) => ({
        status: d.status,
        totalHT: Number(d.totalHT),
        acceptedAt: d.acceptedAt,
        serviceType: d.serviceType,
      })),
      factures: c.factures.map((f) => ({ status: f.status })),
      rapports: c.rapports.map((r) => ({
        status: r.status,
        budgetHT: r.budgetHT != null ? Number(r.budgetHT) : null,
      })),
      appointments: c.appointments.map((a) => ({ type: a.type, status: a.status })),
      // Cohérence avec la fiche : étape pipeline + date d'envoi du rapport.
      stage,
      manualPhase,
      rapportEnvoyeAt: c.rapports.find((r) => r.status === 'ENVOYE')?.updatedAt ?? null,
    });
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

  const hasFilters = Boolean(searchParams.q || searchParams.etat);

  return (
    <div className="space-y-5">
      <PageHeader
        title={corbeille ? 'Corbeille' : 'Clients'}
        subtitle={
          dbError
            ? undefined
            : corbeille
              ? `${rows.length} client(s) à la corbeille — suppression définitive automatique après 30 jours`
              : `${rows.length} contact(s) — prospects & clients`
        }
        actions={
          corbeille ? (
            <Link
              href="/admin/clients"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              ← Retour aux clients
            </Link>
          ) : (
            <>
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

      {/* Recherche + filtre état (masqués dans la corbeille) */}
      {!corbeille && (
      <form className="flex flex-col gap-2.5 rounded-xl border border-slate-200 bg-white p-3 sm:flex-row sm:items-end">
        <div className="relative sm:min-w-[220px] sm:flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            name="q"
            defaultValue={searchParams.q ?? ''}
            placeholder="Rechercher un nom, téléphone, e-mail, ville…"
            className="h-10 w-full rounded-lg border border-slate-300 pl-9 pr-3 text-base outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 sm:text-sm"
          />
        </div>
        <div className="grid grid-cols-3 gap-2 sm:flex sm:gap-2">
          {ETAT_FILTERS.map(([v, l]) => {
            const active = (searchParams.etat ?? '') === v;
            const href = `/admin/clients?${new URLSearchParams({
              ...(searchParams.q ? { q: searchParams.q } : {}),
              ...(v ? { etat: v } : {}),
            }).toString()}`;
            return (
              <Link
                key={v || 'tous'}
                href={href}
                className={`flex h-10 items-center justify-center rounded-lg px-3 text-sm font-medium ${
                  active
                    ? 'bg-slate-900 text-white'
                    : 'border border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {l}
              </Link>
            );
          })}
        </div>
      </form>
      )}

      {dbError || rows.length === 0 ? (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <EmptyState
            icon={corbeille ? Trash2 : UserCheck}
            title={corbeille ? 'Corbeille vide' : hasFilters ? 'Aucun résultat' : 'Aucun contact'}
            description={
              corbeille
                ? 'Aucun client à la corbeille.'
                : hasFilters
                  ? 'Essayez d’élargir votre recherche ou le filtre.'
                  : 'Ajoutez votre premier prospect — il apparaîtra ici avec son état.'
            }
            actionLabel={corbeille || hasFilters ? undefined : 'Nouveau prospect'}
            actionHref={corbeille || hasFilters ? undefined : '/admin/leads/nouveau'}
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
                leading={<Avatar name={c.name} size="sm" />}
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
                  ) : (
                    <QuickActionMenu contactId={c.id} phone={c.phone} leadId={leadId} />
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
                      ) : (
                        <QuickActionMenu contactId={c.id} phone={c.phone} leadId={leadId} />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
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

function load(sp: SearchParams) {
  return prisma.contact.findMany({
    where: buildWhere(sp),
    orderBy: { updatedAt: 'desc' },
    take: 300,
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
  });
}
