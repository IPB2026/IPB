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
      devisTravaux: { id: string }[];
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
            factures: { where: { status: { in: ['ENVOYEE', 'PAYEE'] } }, select: { id: true }, take: 1 },
            rapports: { where: { status: 'ENVOYE' }, select: { id: true }, take: 1 },
            devis: { where: { serviceType: 'AUTRE' }, select: { id: true }, take: 1 },
          },
        },
      },
    }).then((rows) =>
      rows.map((r) => ({
        id: r.id,
        contactId: r.contactId,
        stage: r.stage,
        service: r.service as keyof typeof SERVICE_LABEL,
        contact: {
          name: r.contact.name,
          city: r.contact.city,
          factures: r.contact.factures,
          rapports: r.contact.rapports,
          devisTravaux: r.contact.devis,
        },
      }))
    );
  } catch {
    dbError = true;
  }

  const toCard = (l: Row) => ({
    id: l.id,
    contactId: l.contactId,
    name: l.contact.name,
    sub: [SERVICE_LABEL[l.service], l.contact.city].filter(Boolean).join(' · '),
  });

  // Placement : le dossier (artefacts réels) prime sur l'étape manuelle pour la
  // fin de cycle. Reflète le workflow : Visite → Facture → Rapport → Suivi.
  const placement = (l: Row): string => {
    const rapportEnvoye = l.contact.rapports.length > 0;
    const hasFacture = l.contact.factures.length > 0;
    const hasTravaux = l.contact.devisTravaux.length > 0;
    if (rapportEnvoye) return hasTravaux ? 'SUIVI' : 'RAPPORT_ENVOYE';
    if (hasFacture) return 'FACTURE_ENVOYEE';
    // Devis accepté (GAGNE) sans facture encore : dossier avancé → « Visite faite ».
    if (l.stage === 'GAGNE') return 'VISITE_FAITE';
    return l.stage;
  };

  const derived: { stage: string; label: string }[] = [
    { stage: 'FACTURE_ENVOYEE', label: 'Facture envoyée' },
    { stage: 'RAPPORT_ENVOYE', label: 'Rapport envoyé' },
    { stage: 'SUIVI', label: 'Suivi' },
  ];

  const columns: PipelineColumn[] = [
    ...PIPELINE_STAGES.map((stage) => ({
      stage,
      label: STAGE_LABEL[stage],
      leads: leads.filter((l) => placement(l) === stage).map(toCard),
    })),
    ...derived.map((d) => ({
      stage: d.stage,
      label: d.label,
      readOnly: true,
      leads: leads.filter((l) => placement(l) === d.stage).map(toCard),
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
