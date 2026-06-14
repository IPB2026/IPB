import { requireAdmin } from '@/lib/auth-helpers';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Exports CSV (Phase 5) — devis, factures, clients. Réservé à l'ADMIN.
 * Séparateur « ; » + BOM UTF-8 pour une ouverture directe dans Excel (FR).
 *   GET /admin/exports?type=devis | factures | clients
 */

const n = (v: unknown) => Number(v ?? 0);

function csvCell(v: unknown): string {
  const s = v == null ? '' : String(v);
  // Échappe les guillemets ; encadre si séparateur, guillemet ou saut de ligne.
  if (/[";\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function toCsv(headers: string[], rows: (string | number | null)[][]): string {
  const lines = [headers, ...rows].map((r) => r.map(csvCell).join(';'));
  return '﻿' + lines.join('\r\n');
}

function fr(d: Date | null | undefined): string {
  return d ? new Date(d).toLocaleDateString('fr-FR') : '';
}

const FILE: Record<string, string> = {
  devis: 'devis',
  factures: 'factures',
  clients: 'clients',
};

export async function GET(req: Request) {
  try {
    await requireAdmin();
  } catch {
    return new Response('Non autorisé', { status: 401 });
  }

  const type = new URL(req.url).searchParams.get('type') ?? '';
  let csv: string;

  if (type === 'devis') {
    const rows = await prisma.devis.findMany({
      orderBy: { createdAt: 'desc' },
      include: { contact: { select: { name: true } } },
    });
    csv = toCsv(
      ['Numéro', 'Date', 'Client', 'Objet', 'Statut', 'Montant HT', 'Accepté le'],
      rows.map((d) => [
        d.number,
        fr(d.createdAt),
        d.contact.name,
        d.object,
        d.status,
        n(d.totalHT),
        fr(d.acceptedAt),
      ])
    );
  } else if (type === 'factures') {
    const rows = await prisma.facture.findMany({
      orderBy: { createdAt: 'desc' },
      include: { contact: { select: { name: true } } },
    });
    csv = toCsv(
      ['Numéro', 'Date', 'Client', 'Objet', 'Statut', 'Montant HT', 'Échéance'],
      rows.map((f) => [
        f.number,
        fr(f.issuedAt ?? f.createdAt),
        f.contact.name,
        f.object,
        f.status,
        n(f.totalHT),
        fr(f.dueDate),
      ])
    );
  } else if (type === 'clients') {
    const rows = await prisma.contact.findMany({
      where: {
        OR: [{ devis: { some: { status: 'ACCEPTE' } } }, { factures: { some: {} } }],
      },
      orderBy: { updatedAt: 'desc' },
      include: {
        devis: { select: { status: true, totalHT: true, acceptedAt: true } },
        factures: { select: { status: true } },
      },
    });
    csv = toCsv(
      ['Nom', 'E-mail', 'Téléphone', 'Ville', 'Devis acceptés', 'CA signé HT', 'Client depuis'],
      rows.map((c) => {
        const acc = c.devis.filter((d) => d.status === 'ACCEPTE');
        const ca = acc.reduce((s, d) => s + n(d.totalHT), 0);
        const since = acc
          .map((d) => d.acceptedAt)
          .filter(Boolean)
          .sort((a, b) => (a as Date).getTime() - (b as Date).getTime())[0] as
          | Date
          | undefined;
        return [
          c.name,
          c.email ?? '',
          c.phone ?? '',
          c.city ?? '',
          acc.length,
          ca,
          fr(since),
        ];
      })
    );
  } else {
    return new Response('Type inconnu (devis | factures | clients)', { status: 400 });
  }

  const today = new Date().toISOString().slice(0, 10);
  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="ipb-${FILE[type]}-${today}.csv"`,
    },
  });
}
