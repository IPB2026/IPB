import { createElement } from 'react';
import { renderToBuffer } from '@react-pdf/renderer';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { RapportDocument } from '@/lib/pdf/rapport-document';
import type { ReportContent } from '@/lib/ai/report';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session?.user) return new Response('Non autorisé', { status: 401 });

  const rapport = await prisma.rapport.findUnique({
    where: { id: params.id },
    include: { contact: true },
  });
  if (!rapport) return new Response('Introuvable', { status: 404 });

  const content = rapport.aiContent as unknown as ReportContent | { error: string } | null;
  if (!content || 'error' in content) {
    return new Response('Rapport non encore généré.', { status: 409 });
  }

  const element = createElement(RapportDocument, {
    data: {
      number: rapport.number,
      title: rapport.title,
      type: rapport.type,
      bienAdresse: rapport.bienAdresse,
      ville: rapport.ville,
      createdAt: rapport.createdAt,
      status: rapport.status,
      contact: rapport.contact,
      content,
    },
  }) as unknown as Parameters<typeof renderToBuffer>[0];

  const buffer = await renderToBuffer(element);
  return new Response(new Uint8Array(buffer), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="${rapport.number}.pdf"`,
    },
  });
}
