import { ShieldCheck } from 'lucide-react';
import { PageHeader } from '@/components/admin/page-header';
import { ChangePasswordForm } from '@/components/admin/change-password-form';

export const dynamic = 'force-dynamic';

export default function ParametresPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Paramètres" subtitle="Sécurité de votre compte" />

      <div className="max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-sm font-semibold text-slate-900">Changer le mot de passe</h2>
            <p className="text-xs text-slate-500">Choisissez un mot de passe fort et personnel.</p>
          </div>
        </div>
        <ChangePasswordForm />
      </div>
    </div>
  );
}
