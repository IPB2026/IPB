import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { guardAdminPage } from '@/lib/auth-helpers';
import { PageHeader } from '@/components/admin/page-header';
import { NewFactureForm } from '@/components/admin/new-facture-form';

export const dynamic = 'force-dynamic';

export default async function NewFacturePage({
  searchParams,
}: {
  searchParams: { contactId?: string };
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
        href="/admin/factures"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Toutes les factures
      </Link>
      <PageHeader
        title="Nouvelle facture"
        subtitle="Facture directe (sans devis). TVA non applicable (art. 293 B)."
      />
      <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
        {contacts.length === 0 ? (
          <p className="text-sm text-slate-500">
            Aucun client en base. Créez d&apos;abord un prospect.
          </p>
        ) : (
          <NewFactureForm
            contacts={contacts}
            defaultContactId={searchParams.contactId}
          />
        )}
      </div>
    </div>
  );
}
