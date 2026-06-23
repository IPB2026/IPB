import 'server-only';
import { prisma } from '@/lib/prisma';

/**
 * Horodate une transition de phase du dossier (T1) → base FIABLE de la vélocité
 * (temps passé par étape, goulets). Dédup : on n'enregistre pas deux fois la même
 * phase consécutive. Non bloquant (un échec n'interrompt jamais l'action métier).
 */
export async function recordPhaseEvent(
  contactId: string,
  leadId: string | null,
  toPhase: string
): Promise<void> {
  if (!contactId || !toPhase) return;
  try {
    const last = await prisma.phaseEvent.findFirst({
      where: { contactId },
      orderBy: { createdAt: 'desc' },
      select: { toPhase: true },
    });
    if (last?.toPhase === toPhase) return;
    await prisma.phaseEvent.create({
      data: { contactId, leadId, toPhase, fromPhase: last?.toPhase ?? null },
    });
  } catch {
    // silencieux : l'analytique ne doit jamais casser une mutation métier.
  }
}
