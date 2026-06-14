import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { buildDevisPdf } from '@/lib/pdf/buffers';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session?.user) return new Response('Non autorisé', { status: 401 });

  const devis = await prisma.devis.findUnique({
    where: { id: params.id },
    select: { number: true },
  });
  if (!devis) return new Response('Introuvable', { status: 404 });

  const buffer = await buildDevisPdf(params.id);
  if (!buffer) return new Response('PDF indisponible', { status: 409 });

  return new Response(new Uint8Array(buffer), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="${devis.number}.pdf"`,
    },
  });
}
