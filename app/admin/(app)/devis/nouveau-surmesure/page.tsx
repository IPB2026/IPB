import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { guardAdminPage } from '@/lib/auth-helpers';
import { isAiConfigured } from '@/lib/ai/report';
import { PageHeader } from '@/components/admin/page-header';
import { NewDevisSurMesureForm } from '@/components/admin/new-devis-surmesure-form';

export const dynamic = 'force-dynamic';

export default async function NewDevisSurMesurePage({
  searchParams,
}: {
  searchParams: { contactId?: string; leadId?: string };
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
        title="Devis sur-mesure"
        subtitle="Pour un besoin spécifique hors des diagnostics standards. L’IA rédige le contenu, vous fixez le prix. TVA non applicable (293 B)."
      />
      {!isAiConfigured() && (
        <p className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 text-xs text-amber-800">
          Génération IA indisponible (clé Anthropic non configurée) — vous pouvez tout de même
          saisir le contenu à la main.
        </p>
      )}
      <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
        {contacts.length === 0 ? (
          <p className="text-sm text-slate-500">Aucun prospect en base. Créez d&apos;abord un prospect.</p>
        ) : (
          <NewDevisSurMesureForm
            contacts={contacts}
            defaultContactId={searchParams.contactId}
            leadId={searchParams.leadId}
          />
        )}
      </div>
    </div>
  );
}
