import 'server-only';
import { prisma } from '@/lib/prisma';
import type { ServiceType } from '@prisma/client';

/**
 * Bandes de prix (C8) : panier moyen des devis ACCEPTÉS par service. Sert d'aide à
 * la tarification au moment de créer un devis (éviter de sous/sur-coter). Lecture
 * seule, non bloquant (renvoie [] si la base est indisponible ou vide).
 */
export async function getPriceBands(): Promise<
  { service: ServiceType; avg: number; count: number }[]
> {
  try {
    const rows = await prisma.devis.groupBy({
      by: ['serviceType'],
      where: { status: 'ACCEPTE', serviceType: { not: null } },
      _avg: { totalHT: true },
      _count: { _all: true },
    });
    return rows
      .filter((r) => r.serviceType)
      .map((r) => ({
        service: r.serviceType as ServiceType,
        avg: Math.round(Number(r._avg.totalHT ?? 0)),
        count: r._count._all,
      }))
      .filter((r) => r.count > 0 && r.avg > 0)
      .sort((a, b) => b.count - a.count);
  } catch {
    return [];
  }
}
