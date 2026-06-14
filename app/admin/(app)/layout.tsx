import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { AdminShell } from '@/components/admin/admin-shell';

export default async function AdminAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect('/admin/login');

  const email = session.user.email ?? '';
  const displayName = session.user.name || email || 'Équipe IPB';
  const role =
    (session.user as { role?: string }).role === 'EXPERT' ? 'EXPERT' : 'ADMIN';

  return (
    <AdminShell displayName={displayName} email={email} role={role}>
      {children}
    </AdminShell>
  );
}
