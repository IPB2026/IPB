import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { NewProspectForm } from '@/components/admin/new-prospect-form';
import { PageHeader } from '@/components/admin/page-header';
import { guardAdminPage } from '@/lib/auth-helpers';

export default async function NewProspectPage() {
  await guardAdminPage();
  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <Link
        href="/admin/leads"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-slate-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Tous les prospects
      </Link>

      <PageHeader
        title="Nouveau prospect"
        subtitle="Saisie rapide pendant ou après un appel. Seul le nom est obligatoire (avec un téléphone ou un email)."
      />

      <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
        <NewProspectForm />
      </div>
    </div>
  );
}
