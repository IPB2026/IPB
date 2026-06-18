import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { auth } from '@/auth';
import { AdminShell } from '@/components/admin/admin-shell';
import { FlashToast } from '@/components/admin/flash-toast';

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
  // Confidentialité : état initial lu du cookie (évite le flash au chargement).
  const initialPrivacy = cookies().get('crm_privacy')?.value === '1';

  return (
    <AdminShell
      displayName={displayName}
      email={email}
      role={role}
      initialPrivacy={initialPrivacy}
    >
      {children}
      <FlashToast />
    </AdminShell>
  );
}
