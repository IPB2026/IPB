import type { Metadata } from 'next';
import { LoginForm } from '@/components/admin/login-form';

export const metadata: Metadata = {
  title: 'Connexion — Back-office IPB',
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-7 flex flex-col items-center text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-600 text-base font-bold text-white">
            IPB
          </span>
          <h1 className="mt-4 text-xl font-semibold tracking-tight text-slate-900">
            Back-office
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Institut de Pathologie du Bâtiment
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <LoginForm />
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          Accès réservé à l&apos;équipe IPB.
        </p>
      </div>
    </main>
  );
}
