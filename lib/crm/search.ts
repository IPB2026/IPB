import 'server-only';
import { prisma } from '@/lib/prisma';

/**
 * Recherche globale du back-office (Phase 5) — prospects/clients, devis,
 * factures, rapports. Lecture seule, insensible à la casse. Plafonnée par
 * catégorie pour rester rapide.
 */

export interface SearchHit {
  id: string;
  href: string;
  title: string;
  subtitle?: string;
}

export interface SearchResults {
  q: string;
  contacts: SearchHit[];
  devis: SearchHit[];
  factures: SearchHit[];
  rapports: SearchHit[];
  total: number;
}

const TAKE = 8;
const empty = (q: string): SearchResults => ({
  q,
  contacts: [],
  devis: [],
  factures: [],
  rapports: [],
  total: 0,
});

export async function globalSearch(qRaw: string): Promise<SearchResults> {
  const q = qRaw.trim();
  if (q.length < 2) return empty(q);
  const like = { contains: q, mode: 'insensitive' as const };

  try {
    const [contacts, devis, factures, rapports] = await Promise.all([
      prisma.contact.findMany({
        where: {
          OR: [
            { name: like },
            { email: like },
            { phone: like },
            { city: like },
          ],
        },
        orderBy: { updatedAt: 'desc' },
        take: TAKE,
        select: { id: true, name: true, city: true, email: true, phone: true },
      }),
      prisma.devis.findMany({
        where: { OR: [{ number: like }, { object: like }] },
        orderBy: { createdAt: 'desc' },
        take: TAKE,
        select: {
          id: true,
          number: true,
          object: true,
          contact: { select: { name: true } },
        },
      }),
      prisma.facture.findMany({
        where: { OR: [{ number: like }, { object: like }] },
        orderBy: { createdAt: 'desc' },
        take: TAKE,
        select: {
          id: true,
          number: true,
          object: true,
          contact: { select: { name: true } },
        },
      }),
      prisma.rapport.findMany({
        where: { OR: [{ number: like }, { title: like }] },
        orderBy: { createdAt: 'desc' },
        take: TAKE,
        select: {
          id: true,
          number: true,
          title: true,
          contact: { select: { name: true } },
        },
      }),
    ]);

    const cHits: SearchHit[] = contacts.map((c) => ({
      id: c.id,
      href: `/admin/clients/${c.id}`,
      title: c.name,
      subtitle: [c.city, c.email || c.phone].filter(Boolean).join(' · ') || undefined,
    }));
    const dHits: SearchHit[] = devis.map((d) => ({
      id: d.id,
      href: `/admin/devis/${d.id}`,
      title: d.number,
      subtitle: [d.contact.name, d.object].filter(Boolean).join(' · '),
    }));
    const fHits: SearchHit[] = factures.map((f) => ({
      id: f.id,
      href: `/admin/factures/${f.id}`,
      title: f.number,
      subtitle: [f.contact.name, f.object].filter(Boolean).join(' · '),
    }));
    const rHits: SearchHit[] = rapports.map((r) => ({
      id: r.id,
      href: `/admin/rapports/${r.id}`,
      title: r.number,
      subtitle: [r.contact.name, r.title].filter(Boolean).join(' · '),
    }));

    return {
      q,
      contacts: cHits,
      devis: dHits,
      factures: fHits,
      rapports: rHits,
      total: cHits.length + dHits.length + fHits.length + rHits.length,
    };
  } catch {
    return empty(q);
  }
}
