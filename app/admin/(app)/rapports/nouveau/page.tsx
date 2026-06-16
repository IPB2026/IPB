import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { guardAdminPage } from '@/lib/auth-helpers';
import { PageHeader } from '@/components/admin/page-header';
import { NewRapportForm } from '@/components/admin/new-rapport-form';
import { isAiConfigured } from '@/lib/ai/report';

export const dynamic = 'force-dynamic';

export default async function NewRapportPage() {
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
        href="/admin/rapports"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Tous les rapports
      </Link>
      <PageHeader
        title="Nouveau rapport d'expertise"
        subtitle="Saisissez vos constats terrain par zone. L'IA rédige ensuite le rapport complet."
      />
      {!isAiConfigured() && (
        <p className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 text-xs text-amber-800">
          Clé API Anthropic non configurée — la génération IA sera indisponible
          tant que <code>ANTHROPIC_API_KEY</code> n'est pas défini.
        </p>
      )}
      <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
        {contacts.length === 0 ? (
          <p className="text-sm text-slate-500">
            Créez d'abord un prospect pour établir un rapport.
          </p>
        ) : (
          <NewRapportForm contacts={contacts} />
        )}
      </div>
    </div>
  );
}
