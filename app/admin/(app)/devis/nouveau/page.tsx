import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { guardAdminPage } from '@/lib/auth-helpers';
import { PageHeader } from '@/components/admin/page-header';
import { NewDevisForm } from '@/components/admin/new-devis-form';

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
  const contacts = await prisma.contact
    .findMany({
      orderBy: { createdAt: 'desc' },
      take: 300,
      select: { id: true, name: true, city: true },
    })
    .catch(() => []);

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
            defaultBien={searchParams.bien}
            leadId={searchParams.leadId}
          />
        )}
      </div>
    </div>
  );
}
