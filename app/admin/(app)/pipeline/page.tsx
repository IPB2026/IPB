import type { PipelineStage } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { guardAdminPage } from '@/lib/auth-helpers';
import { PageHeader } from '@/components/admin/page-header';
import { SERVICE_LABEL, STAGE_LABEL, PIPELINE_STAGES } from '@/components/admin/badges';
import { PipelineBoard, type PipelineColumn } from '@/components/admin/pipeline-board';

export const dynamic = 'force-dynamic';

export default async function PipelinePage() {
  await guardAdminPage();

  type Row = {
    id: string;
    contactId: string;
    stage: PipelineStage;
    service: keyof typeof SERVICE_LABEL;
    contact: {
      name: string;
      city: string | null;
      factures: { id: string }[];
      rapports: { id: string }[];
    };
  };
  let leads: Row[] = [];
  let dbError = false;
  try {
    leads = await prisma.lead.findMany({
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
            factures: { select: { id: true }, take: 1 },
            rapports: { where: { status: 'ENVOYE' }, select: { id: true }, take: 1 },
          },
        },
      },
    });
  } catch {
    dbError = true;
  }

  const toCard = (l: Row) => ({
    id: l.id,
    contactId: l.contactId,
    name: l.contact.name,
    sub: [SERVICE_LABEL[l.service], l.contact.city].filter(Boolean).join(' · '),
  });

  // Placement : le dossier prime sur l'étape manuelle pour la fin de cycle.
  const placement = (l: Row): string => {
    if (l.contact.rapports.length > 0) return 'RAPPORT_ENVOYE';
    if (l.contact.factures.length > 0) return 'FACTURE';
    // Devis accepté (GAGNE) sans facture encore : dossier avancé → « Visite faite ».
    if (l.stage === 'GAGNE') return 'VISITE_FAITE';
    return l.stage;
  };

  const columns: PipelineColumn[] = [
    ...PIPELINE_STAGES.map((stage) => ({
      stage,
      label: STAGE_LABEL[stage],
      leads: leads.filter((l) => placement(l) === stage).map(toCard),
    })),
    {
      stage: 'FACTURE',
      label: 'Facturé',
      readOnly: true,
      leads: leads.filter((l) => placement(l) === 'FACTURE').map(toCard),
    },
    {
      stage: 'RAPPORT_ENVOYE',
      label: 'Rapport envoyé',
      readOnly: true,
      leads: leads.filter((l) => placement(l) === 'RAPPORT_ENVOYE').map(toCard),
    },
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
