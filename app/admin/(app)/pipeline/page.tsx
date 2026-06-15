import type { PipelineStage } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { guardAdminPage } from '@/lib/auth-helpers';
import { PageHeader } from '@/components/admin/page-header';
import { SERVICE_LABEL, STAGE_LABEL, PIPELINE_STAGES } from '@/components/admin/badges';
import { PipelineBoard, type PipelineColumn } from '@/components/admin/pipeline-board';

export const dynamic = 'force-dynamic';

export default async function PipelinePage() {
  await guardAdminPage();

  let leads: {
    id: string;
    contactId: string;
    stage: PipelineStage;
    service: keyof typeof SERVICE_LABEL;
    contact: { name: string; city: string | null };
  }[] = [];
  let dbError = false;
  try {
    leads = await prisma.lead.findMany({
      where: { stage: { in: PIPELINE_STAGES } },
      orderBy: { createdAt: 'desc' },
      take: 400,
      select: {
        id: true,
        contactId: true,
        stage: true,
        service: true,
        contact: { select: { name: true, city: true } },
      },
    });
  } catch {
    dbError = true;
  }

  const columns: PipelineColumn[] = PIPELINE_STAGES.map((stage) => ({
    stage,
    label: STAGE_LABEL[stage],
    leads: leads
      .filter((l) => l.stage === stage)
      .map((l) => ({
        id: l.id,
        contactId: l.contactId,
        name: l.contact.name,
        sub: [SERVICE_LABEL[l.service], l.contact.city]
          .filter(Boolean)
          .join(' · '),
      })),
  }));

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
