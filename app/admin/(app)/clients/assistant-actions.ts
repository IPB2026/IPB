'use server';

import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth-helpers';
import { computeDossier } from '@/lib/crm/dossier';
import { PHASE_LABEL } from '@/components/admin/badges';
import { generateDossierAssistance, type AssistantResult } from '@/lib/ai/assistant';

const fmtDate = (d: Date | null | undefined) => (d ? d.toLocaleDateString('fr-FR') : '—');
const euros = (n: number) => `${Math.round(n).toLocaleString('fr-FR')} € HT`;

/**
 * « Assistant IPB » : assemble l'état RÉEL du dossier (source unique computeDossier)
 * et demande au copilote IA un résumé + l'action conseillée + un brouillon d'e-mail.
 * Lecture seule (aucune écriture) — l'admin relit puis agit lui-même.
 */
export async function runDossierAssistant(
  contactId: string
): Promise<AssistantResult | { error: string }> {
  await requireAdmin();
  if (!contactId) return { error: 'Client introuvable.' };

  const c = await prisma.contact.findUnique({
    where: { id: contactId },
    include: {
      leads: { orderBy: { createdAt: 'desc' } },
      devis: { orderBy: { createdAt: 'desc' } },
      factures: { orderBy: { createdAt: 'desc' } },
      rapports: { orderBy: { updatedAt: 'desc' } },
      appointments: { orderBy: { start: 'desc' } },
      activities: { orderBy: { createdAt: 'desc' }, take: 8 },
    },
  });
  if (!c) return { error: 'Client introuvable.' };

  const lead = c.leads[0] ?? null;
  const dossier = computeDossier({
    devis: c.devis.map((d) => ({
      status: d.status,
      totalHT: Number(d.totalHT),
      acceptedAt: d.acceptedAt,
      serviceType: d.serviceType,
    })),
    factures: c.factures.map((f) => ({ status: f.status })),
    rapports: c.rapports.map((r) => ({
      status: r.status,
      budgetHT: r.budgetHT != null ? Number(r.budgetHT) : null,
    })),
    appointments: c.appointments.map((a) => ({ type: a.type, status: a.status })),
    stage: lead?.stage ?? null,
    manualPhase: lead?.manualPhase ?? null,
    rapportEnvoyeAt: c.rapports.find((r) => r.status === 'ENVOYE')?.updatedAt ?? null,
  });

  const lines: string[] = [];
  lines.push(`Client : ${c.name}${c.city ? ` (${c.city})` : ''}`);
  lines.push(`Contact : ${c.email ? `e-mail ${c.email}` : 'pas d’e-mail'}${c.phone ? `, tél ${c.phone}` : ''}`);
  lines.push(`Statut : ${dossier.isClient ? 'CLIENT' : 'Prospect'} — phase « ${PHASE_LABEL[dossier.phase] ?? dossier.phase} »`);
  if (lead) {
    lines.push(`Service : ${lead.service} · Dossier ouvert le ${fmtDate(lead.createdAt)}${lead.tier ? ` · priorité ${lead.tier}` : ''}`);
  }
  if (dossier.montantDevis) lines.push(`Montant devis : ${euros(dossier.montantDevis)}`);

  if (c.devis.length) {
    lines.push('Devis :');
    for (const d of c.devis.slice(0, 4)) {
      lines.push(
        `  - ${d.number} : ${d.status}, ${euros(Number(d.totalHT))}, envoyé le ${fmtDate(d.sentAt ?? d.createdAt)}${
          d.relanceCount ? `, ${d.relanceCount} relance(s)` : ''
        }${d.acceptedAt ? `, accepté le ${fmtDate(d.acceptedAt)}` : ''}`
      );
    }
  }
  if (c.factures.length) {
    lines.push('Factures :');
    for (const f of c.factures.slice(0, 4)) {
      lines.push(`  - ${f.number} : ${f.status}, ${euros(Number(f.totalHT))}${f.dueDate ? `, échéance ${fmtDate(f.dueDate)}` : ''}`);
    }
  }
  if (c.rapports.length) {
    lines.push(`Rapports : ${c.rapports.map((r) => `${r.number} (${r.status})`).join(', ')}`);
  }
  if (c.appointments.length) {
    lines.push('Rendez-vous :');
    for (const a of c.appointments.slice(0, 3)) {
      lines.push(`  - ${a.type} : ${a.status}, le ${fmtDate(a.start)}`);
    }
  }
  if (c.activities.length) {
    lines.push('Dernières activités :');
    for (const a of c.activities) {
      lines.push(
        `  - ${fmtDate(a.createdAt)} [${a.type}] ${(a.content ?? '').slice(0, 120)}${
          a.dueAt && !a.done ? ` (à faire pour le ${fmtDate(a.dueAt)})` : ''
        }`
      );
    }
  }

  return generateDossierAssistance(lines.join('\n'));
}
