import { createElement } from 'react';
import { renderToBuffer } from '@react-pdf/renderer';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { FactureDocument } from '@/lib/pdf/facture-document';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session?.user) return new Response('Non autorisé', { status: 401 });

  const facture = await prisma.facture.findUnique({
    where: { id: params.id },
    include: { contact: true, lines: { orderBy: { position: 'asc' } } },
  });
  if (!facture) return new Response('Introuvable', { status: 404 });

  const element = createElement(FactureDocument, {
    data: {
        number: facture.number,
        object: facture.object,
        mandataire: facture.mandataire,
        paymentMode: facture.paymentMode,
        issuedAt: facture.issuedAt,
        dueDate: facture.dueDate,
        acompte: facture.acompte != null ? Number(facture.acompte) : null,
        createdAt: facture.createdAt,
        contact: facture.contact,
        totalHT: Number(facture.totalHT),
        lines: facture.lines.map((l) => ({
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
      'Content-Disposition': `inline; filename="${facture.number}.pdf"`,
    },
  });
}
