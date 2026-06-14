import Link from 'next/link';
import { Plus, Search, Users } from 'lucide-react';
import type { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { guardAdminPage } from '@/lib/auth-helpers';
import { PageHeader } from '@/components/admin/page-header';
import { EmptyState } from '@/components/admin/empty-state';
import { Avatar } from '@/components/admin/avatar';
import {
  TierBadge,
  StageBadge,
  SOURCE_LABEL,
  SERVICE_LABEL,
  STAGE_LABEL,
  TIER_LABEL,
} from '@/components/admin/badges';

export const dynamic = 'force-dynamic';

type SearchParams = {
  q?: string;
  tier?: string;
  source?: string;
  stage?: string;
};

function buildWhere(sp: SearchParams): Prisma.LeadWhereInput {
  const where: Prisma.LeadWhereInput = {};
  if (sp.q) {
    where.contact = {
      OR: [
        { name: { contains: sp.q, mode: 'insensitive' } },
        { email: { contains: sp.q, mode: 'insensitive' } },
        { phone: { contains: sp.q } },
        { city: { contains: sp.q, mode: 'insensitive' } },
      ],
    };
  }
  if (sp.tier) where.tier = sp.tier as Prisma.LeadWhereInput['tier'];
  if (sp.source) where.source = sp.source as Prisma.LeadWhereInput['source'];
  if (sp.stage) where.stage = sp.stage as Prisma.LeadWhereInput['stage'];
  return where;
}

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  await guardAdminPage();
  let leads: Prisma.LeadGetPayload<{ include: { contact: true } }>[] = [];
  let dbError = false;
  try {
    leads = await prisma.lead.findMany({
      where: buildWhere(searchParams),
      orderBy: { createdAt: 'desc' },
      include: { contact: true },
      take: 200,
    });
  } catch {
    dbError = true;
  }

  const hasFilters = Boolean(
    searchParams.q || searchParams.tier || searchParams.source || searchParams.stage
  );

  return (
    <div className="space-y-5">
      <PageHeader
        title="Prospects"
        subtitle={dbError ? undefined : `${leads.length} fiche(s)`}
        actions={
          <Link
            href="/admin/leads/nouveau"
            className="inline-flex items-center gap-1.5 rounded-lg bg-orange-600 px-3.5 py-2 text-sm font-semibold text-white transition-colors duration-150 hover:bg-orange-700"
          >
            <Plus className="h-4 w-4" />
            Nouveau prospect
          </Link>
        }
      />

      {/* Toolbar filtres */}
      <form className="flex flex-wrap items-end gap-2.5 rounded-xl border border-slate-200 bg-white p-3">
        <div className="relative min-w-[200px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            name="q"
            defaultValue={searchParams.q ?? ''}
            placeholder="Rechercher nom, téléphone, ville…"
            className="h-10 w-full rounded-lg border border-slate-300 pl-9 pr-3 text-sm outline-none transition-colors focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
          />
        </div>
        <FilterSelect name="tier" value={searchParams.tier} placeholder="Tier" options={Object.entries(TIER_LABEL)} />
        <FilterSelect name="source" value={searchParams.source} placeholder="Source" options={Object.entries(SOURCE_LABEL)} />
        <FilterSelect name="stage" value={searchParams.stage} placeholder="Étape" options={Object.entries(STAGE_LABEL)} />
        <button
          type="submit"
          className="h-10 rounded-lg bg-slate-900 px-4 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
        >
          Filtrer
        </button>
        {hasFilters && (
          <Link
            href="/admin/leads"
            className="h-10 px-2 text-sm leading-10 text-slate-500 transition-colors hover:text-slate-800"
          >
            Réinitialiser
          </Link>
        )}
      </form>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        {dbError ? (
          <EmptyState
            icon={Users}
            title="Base de données non connectée"
            description="Configurez DATABASE_URL puis lancez la migration (SETUP_CRM.md)."
            tone="amber"
          />
        ) : leads.length === 0 ? (
          <EmptyState
            icon={Users}
            title={hasFilters ? 'Aucun résultat' : 'Aucun prospect'}
            description={
              hasFilters
                ? 'Essayez d\'élargir vos filtres.'
                : 'Ajoutez votre premier prospect ou attendez une demande du site.'
            }
            actionLabel={hasFilters ? undefined : 'Nouveau prospect'}
            actionHref={hasFilters ? undefined : '/admin/leads/nouveau'}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left text-xs font-medium uppercase tracking-wider text-slate-400">
                  <th className="px-5 py-2.5">Contact</th>
                  <th className="px-5 py-2.5">Ville</th>
                  <th className="px-5 py-2.5">Service</th>
                  <th className="px-5 py-2.5">Source</th>
                  <th className="px-5 py-2.5">Tier</th>
                  <th className="px-5 py-2.5">Étape</th>
                  <th className="px-5 py-2.5 text-right">Reçu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {leads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="group transition-colors duration-150 hover:bg-slate-50"
                  >
                    <td className="px-5 py-3">
                      <Link href={`/admin/leads/${lead.id}`} className="flex items-center gap-3">
                        <Avatar name={lead.contact.name} size="sm" />
                        <span>
                          <span className="block font-medium text-slate-900 group-hover:text-orange-600">
                            {lead.contact.name}
                          </span>
                          <span className="block text-xs text-slate-400">
                            {lead.contact.phone || lead.contact.email || '—'}
                          </span>
                        </span>
                      </Link>
                    </td>
                    <td className="px-5 py-3 text-slate-600">
                      {lead.contact.city || lead.contact.postalCode || '—'}
                    </td>
                    <td className="px-5 py-3 text-slate-600">
                      {SERVICE_LABEL[lead.service]}
                    </td>
                    <td className="px-5 py-3 text-slate-600">
                      {SOURCE_LABEL[lead.source]}
                    </td>
                    <td className="px-5 py-3">
                      <TierBadge tier={lead.tier} />
                    </td>
                    <td className="px-5 py-3">
                      <StageBadge stage={lead.stage} />
                    </td>
                    <td className="px-5 py-3 text-right text-xs tabular-nums text-slate-400">
                      {lead.createdAt.toLocaleDateString('fr-FR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function FilterSelect({
  name,
  value,
  placeholder,
  options,
}: {
  name: string;
  value?: string;
  placeholder: string;
  options: [string, string][];
}) {
  return (
    <select
      name={name}
      defaultValue={value ?? ''}
      className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none transition-colors focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
    >
      <option value="">{placeholder} : tous</option>
      {options.map(([val, lbl]) => (
        <option key={val} value={val}>
          {lbl}
        </option>
      ))}
    </select>
  );
}
