import Link from 'next/link';
import { UserCheck, ArrowRight, Download, Plus, Search, Phone } from 'lucide-react';
import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { guardAdminPage } from '@/lib/auth-helpers';
import { euros } from '@/lib/crm/company';
import { computeDossier } from '@/lib/crm/dossier';
import { PageHeader } from '@/components/admin/page-header';
import { EmptyState } from '@/components/admin/empty-state';
import { Avatar } from '@/components/admin/avatar';
import { MobileCardList, MobileCardRow } from '@/components/admin/mobile-card';
import { PhaseBadge, SERVICE_LABEL } from '@/components/admin/badges';

export const dynamic = 'force-dynamic';

type SearchParams = { q?: string; etat?: string };

function buildWhere(sp: SearchParams): Prisma.ContactWhereInput {
  const and: Prisma.ContactWhereInput[] = [];
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
  return and.length ? { AND: and } : {};
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

  let contacts: Awaited<ReturnType<typeof load>> = [];
  let dbError = false;
  try {
    contacts = await load(searchParams);
  } catch {
    dbError = true;
  }

  const rows = contacts.map((c) => {
    const stage = c.leads[0]?.stage ?? null;
    const dossier = computeDossier({
      devis: c.devis.map((d) => ({
        status: d.status,
        totalHT: Number(d.totalHT),
        acceptedAt: d.acceptedAt,
        serviceType: d.serviceType,
      })),
      factures: c.factures.map((f) => ({ status: f.status })),
      rapports: c.rapports.map((r) => ({ status: r.status })),
      appointments: c.appointments.map((a) => ({ type: a.type, status: a.status })),
      // Cohérence avec la fiche : on tient compte de l'étape pipeline.
      stage,
    });
    const service = c.leads[0]?.service ?? null;
    return {
      c,
      dossier,
      isClient: dossier.isClient,
      service,
    };
  });

  const hasFilters = Boolean(searchParams.q || searchParams.etat);

  return (
    <div className="space-y-5">
      <PageHeader
        title="Clients"
        subtitle={dbError ? undefined : `${rows.length} contact(s) — prospects & clients`}
        actions={
          <>
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
        }
      />

      {/* Recherche + filtre état */}
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

      {dbError || rows.length === 0 ? (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <EmptyState
            icon={UserCheck}
            title={hasFilters ? 'Aucun résultat' : 'Aucun contact'}
            description={
              hasFilters
                ? 'Essayez d’élargir votre recherche ou le filtre.'
                : 'Ajoutez votre premier prospect — il apparaîtra ici avec son état.'
            }
            actionLabel={hasFilters ? undefined : 'Nouveau prospect'}
            actionHref={hasFilters ? undefined : '/admin/leads/nouveau'}
          />
        </div>
      ) : (
        <>
          {/* Mobile : cartes */}
          <MobileCardList>
            {rows.map(({ c, dossier, isClient, service }) => (
              <MobileCardRow
                key={c.id}
                href={`/admin/clients/${c.id}`}
                leading={<Avatar name={c.name} size="sm" />}
                title={c.name}
                badge={<EtatBadge isClient={isClient} />}
                amount={dossier.montantDevis != null ? euros(dossier.montantDevis) : undefined}
                lines={[
                  [service ? SERVICE_LABEL[service] : null, c.city || c.phone || c.email]
                    .filter(Boolean)
                    .join(' · ') || '—',
                  <PhaseBadge key="p" phase={dossier.phase} />,
                ]}
                action={
                  c.phone ? (
                    <a
                      href={`tel:${c.phone}`}
                      aria-label={`Appeler ${c.name}`}
                      className="inline-flex h-11 w-11 sm:h-9 sm:w-9 items-center justify-center rounded-lg text-orange-600 active:bg-orange-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                    >
                      <Phone className="h-4 w-4" />
                    </a>
                  ) : undefined
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
                {rows.map(({ c, dossier, isClient, service }) => (
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
                      {dossier.montantDevis != null ? euros(dossier.montantDevis) : '—'}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <Link
                        href={`/admin/clients/${c.id}`}
                        className="inline-flex items-center text-slate-400 group-hover:text-orange-600"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </Link>
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
      rapports: { select: { status: true } },
      appointments: { select: { type: true, status: true } },
      leads: { select: { stage: true, service: true }, orderBy: { createdAt: 'desc' }, take: 1 },
    },
  });
}
