import { notFound, redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { guardAdminPage } from '@/lib/auth-helpers';

export const dynamic = 'force-dynamic';

/**
 * L'ancienne fiche prospect est fusionnée dans la fiche contact unique
 * (/admin/clients/[contactId]). On y redirige tout accès direct/bookmark.
 */
export default async function LeadRedirectPage({
  params,
}: {
  params: { id: string };
}) {
  await guardAdminPage();
  const lead = await prisma.lead
    .findUnique({ where: { id: params.id }, select: { contactId: true } })
    .catch(() => null);
  if (!lead) notFound();
  redirect(`/admin/clients/${lead.contactId}`);
}
