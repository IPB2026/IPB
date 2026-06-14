import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { guardAdminPage } from '@/lib/auth-helpers';
import { PageHeader } from '@/components/admin/page-header';
import { DevisTravauxForm } from '@/components/admin/devis-travaux-form';

export const dynamic = 'force-dynamic';

/**
 * Création du 2ᵉ devis « accompagnement travaux ». Toujours rattaché à un client
 * existant (accédé depuis la fiche client, après remise du rapport).
 */
export default async function NewDevisTravauxPage({
  searchParams,
}: {
  searchParams: { contactId?: string; leadId?: string; bien?: string };
}) {
  await guardAdminPage();

  const contactId = searchParams.contactId;
  if (!contactId) notFound();

  const contact = await prisma.contact
    .findUnique({
      where: { id: contactId },
      select: { id: true, name: true, address: true, city: true },
    })
    .catch(() => null);
  if (!contact) notFound();

  const defaultBien =
    searchParams.bien ||
    [contact.address, contact.city].filter(Boolean).join(', ') ||
    '';

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <Link
        href={`/admin/clients/${contact.id}`}
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour à la fiche client
      </Link>
      <PageHeader
        title="Devis d'accompagnement travaux"
        subtitle={`2ᵉ devis pour ${contact.name} — coordination des travaux de reprise. TVA non applicable (art. 293 B).`}
      />
      <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
        <DevisTravauxForm
          mode="create"
          contactId={contact.id}
          leadId={searchParams.leadId}
          bienConcerne={defaultBien}
        />
      </div>
    </div>
  );
}
