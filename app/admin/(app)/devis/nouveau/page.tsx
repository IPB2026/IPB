import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { guardAdminPage } from '@/lib/auth-helpers';
import { PageHeader } from '@/components/admin/page-header';
import { NewDevisForm } from '@/components/admin/new-devis-form';
import { getPriceBands } from '@/lib/crm/price-bands';
import { SERVICE_LABEL } from '@/components/admin/badges';

export const dynamic = 'force-dynamic';

export default async function NewDevisPage({
  searchParams,
}: {
  searchParams: {
    contactId?: string;
    serviceType?: string;
    leadId?: string;
    bien?: string;
  };
}) {
  await guardAdminPage();
  const [contacts, priceBands] = await Promise.all([
    prisma.contact
      .findMany({
        orderBy: { createdAt: 'desc' },
        take: 300,
        select: { id: true, name: true, city: true },
      })
      .catch(() => []),
    getPriceBands(),
  ]);

  // Pré-remplissage depuis la fiche prospect : prix du diagnostic (lead.value le
  // plus récent) + adresse du bien → zéro ressaisie.
  let defaultPrix: number | undefined;
  let prefillBien: string | undefined;
  if (searchParams.contactId) {
    const c = await prisma.contact
      .findUnique({
        where: { id: searchParams.contactId },
        select: {
          address: true,
          postalCode: true,
          city: true,
          leads: { select: { value: true }, orderBy: { createdAt: 'desc' }, take: 1 },
        },
      })
      .catch(() => null);
    const v = c?.leads[0]?.value != null ? Number(c.leads[0].value) : null;
    if (v != null && v > 0) defaultPrix = v;
    // Adresse STRUCTURÉE complète (rue + CP + ville) reprise sur le devis.
    const bienParts = [
      c?.address,
      [c?.postalCode, c?.city].filter(Boolean).join(' '),
    ].filter(Boolean);
    if (bienParts.length) prefillBien = bienParts.join(', ');
  }

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <Link
        href="/admin/devis"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Tous les devis
      </Link>
      <PageHeader
        title="Nouveau devis"
        subtitle="Sélectionnez un prospect et détaillez la prestation. TVA non applicable (art. 293 B)."
      />

      {/* C8 — bandes de prix : panier moyen des devis acceptés par service, en
          aide à la tarification (le montant porte sur la coordination). */}
      {priceBands.length > 0 && (
        <div className="rounded-xl border border-indigo-200 bg-indigo-50/40 p-3.5 text-sm">
          <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-indigo-700/80">
            Panier moyen (devis acceptés) — aide à la tarification
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-slate-600">
            {priceBands.map((b) => (
              <span key={b.service}>
                {SERVICE_LABEL[b.service]} :{' '}
                <strong className="tabular-nums text-slate-900">{b.avg.toLocaleString('fr-FR')} € HT</strong>
                <span className="text-slate-400"> ({b.count})</span>
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
        {contacts.length === 0 ? (
          <p className="text-sm text-slate-500">
            Aucun prospect en base. Créez d'abord un prospect.
          </p>
        ) : (
          <NewDevisForm
            contacts={contacts}
            defaultContactId={searchParams.contactId}
            defaultServiceType={searchParams.serviceType}
            defaultBien={searchParams.bien ?? prefillBien}
            defaultPrix={defaultPrix}
            leadId={searchParams.leadId}
          />
        )}
      </div>
    </div>
  );
}
