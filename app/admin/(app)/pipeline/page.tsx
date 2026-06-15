import type { PipelineStage } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { guardAdminPage } from '@/lib/auth-helpers';
import { PageHeader } from '@/components/admin/page-header';
import { SERVICE_LABEL, STAGE_LABEL, PIPELINE_STAGES } from '@/components/admin/badges';
import { computeDossier } from '@/lib/crm/dossier';
import { PipelineBoard, type PipelineColumn } from '@/components/admin/pipeline-board';

export const dynamic = 'force-dynamic';

export default async function PipelinePage() {
  await guardAdminPage();

  type Card = {
    id: string;
    contactId: string;
    name: string;
    sub: string;
    phase: string;
    montant: number;
  };
  let cards: Card[] = [];
  let dbError = false;
  try {
    const rows = await prisma.lead.findMany({
      // On inclut GAGNE : un dossier gagné continue son cycle (facture → rapport).
      where: { stage: { in: [...PIPELINE_STAGES, 'GAGNE'] } },
      orderBy: { createdAt: 'desc' },
      take: 400,
      select: {
        id: true,
        contactId: true,
        stage: true,
        service: true,
        contact: {
          select: {
            name: true,
            city: true,
            // orderBy déterministe identique à la liste/fiche → montantDevis cohérent partout.
            devis: {
              select: { status: true, totalHT: true, acceptedAt: true, serviceType: true },
              orderBy: { createdAt: 'desc' },
            },
            factures: { select: { status: true } },
            rapports: { select: { status: true } },
            appointments: { select: { type: true, status: true } },
          },
        },
      },
    });
    // Phase calculée par computeDossier → STRICTEMENT la même que la fiche/liste.
    cards = rows.map((r) => {
      const dossier = computeDossier({
        devis: r.contact.devis.map((d) => ({
          status: d.status,
          totalHT: Number(d.totalHT),
          acceptedAt: d.acceptedAt,
          serviceType: d.serviceType,
        })),
        factures: r.contact.factures.map((f) => ({ status: f.status })),
        rapports: r.contact.rapports.map((rp) => ({ status: rp.status })),
        appointments: r.contact.appointments.map((a) => ({ type: a.type, status: a.status })),
        stage: r.stage,
      });
      return {
        id: r.id,
        contactId: r.contactId,
        name: r.contact.name,
        sub: [SERVICE_LABEL[r.service as keyof typeof SERVICE_LABEL], r.contact.city]
          .filter(Boolean)
          .join(' · '),
        phase: dossier.phase,
        montant: dossier.montantDevis ?? 0,
      };
    });
    // Tri commercial : les plus gros montants en haut de chaque colonne.
    cards.sort((a, b) => b.montant - a.montant);
  } catch {
    dbError = true;
  }

  const derived: { stage: string; label: string }[] = [
    { stage: 'FACTURE_ENVOYEE', label: 'Facture envoyée' },
    { stage: 'RAPPORT_ENVOYE', label: 'Rapport envoyé' },
    { stage: 'SUIVI', label: 'Suivi' },
  ];

  const columns: PipelineColumn[] = [
    ...PIPELINE_STAGES.map((stage) => ({
      stage,
      label: STAGE_LABEL[stage],
      leads: cards.filter((c) => c.phase === stage),
    })),
    ...derived.map((d) => ({
      stage: d.stage,
      label: d.label,
      readOnly: true,
      leads: cards.filter((c) => c.phase === d.stage),
    })),
  ];

  return (
    <div className="space-y-5">
      <PageHeader
        title="Pipeline"
        subtitle="Glissez une fiche (desktop) ou utilisez les flèches (mobile) pour changer d'étape."
      />
      {dbError ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-800">
          Données indisponibles (connexion à la base).
        </div>
      ) : (
        <PipelineBoard columns={columns} />
      )}
    </div>
  );
}
