import { createElement } from 'react';
import { renderToBuffer } from '@react-pdf/renderer';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { DevisDocument } from '@/lib/pdf/devis-document';

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
    include: { contact: true, lines: { orderBy: { position: 'asc' } } },
  });
  if (!devis) return new Response('Introuvable', { status: 404 });

  const element = createElement(DevisDocument, {
    data: {
        number: devis.number,
        object: devis.object,
        bienConcerne: devis.bienConcerne,
        introLetter: devis.introLetter,
        createdAt: devis.createdAt,
        validUntil: devis.validUntil,
        contact: devis.contact,
        totalHT: Number(devis.totalHT),
        lines: devis.lines.map((l) => ({
          designation: l.designation,
          detail: l.detail,
          unit: l.unit,
          qty: Number(l.qty),
          unitPrice: Number(l.unitPrice),
          total: Number(l.total),
        })),
      },
  }) as unknown as Parameters<typeof renderToBuffer>[0];

  const buffer = await renderToBuffer(element);

  return new Response(new Uint8Array(buffer), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="${devis.number}.pdf"`,
    },
  });
}
