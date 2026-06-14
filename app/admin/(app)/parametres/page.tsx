import { ShieldCheck, Users } from 'lucide-react';
import { PageHeader } from '@/components/admin/page-header';
import { ChangePasswordForm } from '@/components/admin/change-password-form';
import { ExpertAccounts } from '@/components/admin/expert-accounts';
import { getSessionUser } from '@/lib/auth-helpers';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function ParametresPage() {
  const user = await getSessionUser();
  const isAdmin = user?.role === 'ADMIN';

  const experts = isAdmin
    ? await prisma.user
        .findMany({
          where: { role: 'EXPERT' },
          orderBy: { name: 'asc' },
          select: { id: true, name: true, email: true },
        })
        .then((rows) => rows.map((e) => ({ ...e, name: e.name || e.email })))
        .catch(() => [])
    : [];

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

      {isAdmin && (
        <div className="max-w-2xl">
          <div className="mb-4 flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
              <Users className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-sm font-semibold text-slate-900">
                Comptes diagnostiqueurs
              </h2>
              <p className="text-xs text-slate-500">
                Créez et gérez les accès des diagnostiqueurs (espace terrain).
              </p>
            </div>
          </div>
          <ExpertAccounts experts={experts} />
        </div>
      )}
    </div>
  );
}
