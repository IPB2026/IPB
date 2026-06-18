import { prisma } from '@/lib/prisma';
import { guardAdminPage } from '@/lib/auth-helpers';
import { PageHeader } from '@/components/admin/page-header';
import { SERVICE_LABEL } from '@/components/admin/badges';
import { euros } from '@/lib/crm/company';
import { computeDossier } from '@/lib/crm/dossier';
import { PipelineBoard, type PipelineColumn } from '@/components/admin/pipeline-board';

export const dynamic = 'force-dynamic';

// Colonnes modifiables à la main (étapes amont du cycle diagnostic).
const EDITABLE: { stage: string; label: string; phases: string[] }[] = [
  { stage: 'NOUVEAU', label: 'Nouveau', phases: ['NOUVEAU', 'A_RAPPELER'] },
  { stage: 'DEVIS_ENVOYE', label: 'Devis envoyé', phases: ['DEVIS_ENVOYE'] },
  { stage: 'RDV_PLANIFIE', label: 'RDV planifié', phases: ['RDV_PLANIFIE'] },
  { stage: 'VISITE_FAITE', label: 'Visite réalisée', phases: ['VISITE_FAITE'] },
];
// Colonnes dérivées des artefacts (lecture seule, avancement automatique).
const DERIVED: { stage: string; label: string }[] = [
  { stage: 'FACTURE_ENVOYEE', label: 'Facture envoyée' },
  { stage: 'PAIEMENT_RECU', label: 'Paiement reçu' },
  { stage: 'RAPPORT', label: 'Rapport à faire' },
  { stage: 'SUIVI', label: 'Suivi (2 sem.)' },
];
// Branche travaux (distincte du diagnostic), affichée seulement si peuplée.
const TRAVAUX: { stage: string; label: string }[] = [
  { stage: 'ACCOMPAGNEMENT_TRAVAUX', label: 'Accompagnement travaux' },
  { stage: 'TRAVAUX_LANCES', label: 'Travaux lancés' },
];

export default async function PipelinePage() {
  await guardAdminPage();

  type Card = {
    id: string;
    contactId: string;
    name: string;
    sub: string;
    phase: string;
    montant: number;
    phone: string | null;
  };
  let cards: Card[] = [];
  let dbError = false;
  try {
    const rows = await prisma.lead.findMany({
      // On exclut les perdus ; un dossier gagné continue son cycle. Et les clients
      // mis à la corbeille (archivés) ne doivent plus apparaître dans le pipeline.
      where: { stage: { notIn: ['PERDU'] }, contact: { archivedAt: null } },
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
            phone: true,
            // orderBy déterministe identique à la liste/fiche → cohérence partout.
            devis: {
              select: { status: true, totalHT: true, acceptedAt: true, serviceType: true },
              orderBy: { createdAt: 'desc' },
            },
            factures: { select: { status: true } },
            rapports: { select: { status: true, updatedAt: true, budgetHT: true }, orderBy: { updatedAt: 'desc' } },
            appointments: { select: { type: true, status: true } },
          },
        },
      },
    });
    cards = rows.map((r) => {
      const rapportEnvoye = r.contact.rapports.find((rp) => rp.status === 'ENVOYE');
      const dossier = computeDossier({
        devis: r.contact.devis.map((d) => ({
          status: d.status,
          totalHT: Number(d.totalHT),
          acceptedAt: d.acceptedAt,
          serviceType: d.serviceType,
        })),
        factures: r.contact.factures.map((f) => ({ status: f.status })),
        rapports: r.contact.rapports.map((rp) => ({
          status: rp.status,
          budgetHT: rp.budgetHT != null ? Number(rp.budgetHT) : null,
        })),
        appointments: r.contact.appointments.map((a) => ({ type: a.type, status: a.status })),
        stage: r.stage,
        rapportEnvoyeAt: rapportEnvoye?.updatedAt ?? null,
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
        phone: r.contact.phone,
      };
    });
    // Tri commercial : les plus gros montants en haut de chaque colonne.
    cards.sort((a, b) => b.montant - a.montant);
  } catch {
    dbError = true;
  }

  const inPhase = (phases: string[]) => cards.filter((c) => phases.includes(c.phase));

  const columns: PipelineColumn[] = [
    ...EDITABLE.map((col) => ({ stage: col.stage, label: col.label, leads: inPhase(col.phases) })),
    ...DERIVED.map((d) => ({ stage: d.stage, label: d.label, readOnly: true, leads: inPhase([d.stage]) })),
    // Branche travaux : seulement si au moins un dossier y est.
    ...TRAVAUX.filter((t) => cards.some((c) => c.phase === t.stage)).map((t) => ({
      stage: t.stage,
      label: t.label,
      readOnly: true,
      leads: inPhase([t.stage]),
    })),
  ];

  const actifs = cards.filter((c) => c.phase !== 'TERMINE');
  const pipeTotal = actifs.reduce((s, c) => s + c.montant, 0);

  return (
    <div className="space-y-5">
      <PageHeader
        title="Pipeline"
        subtitle={dbError ? undefined : `${actifs.length} dossier(s) actif(s) · pipe ${euros(pipeTotal)}`}
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
