import { prisma } from '@/lib/prisma';
import { guardAdminPage } from '@/lib/auth-helpers';
import { PageHeader } from '@/components/admin/page-header';
import { SERVICE_LABEL } from '@/components/admin/badges';
import { Money } from '@/components/admin/money';
import { computeDossier, dossierInputFromContact } from '@/lib/crm/dossier';
import { PipelineBoard, type PipelineColumn } from '@/components/admin/pipeline-board';

export const dynamic = 'force-dynamic';

// LIBERTÉ TOTALE : toutes les colonnes du flux sont désormais déposables — on peut
// glisser une carte dans n'importe quelle étape, y compris celles habituellement
// déduites des documents (facture, paiement, rapport, suivi). Le dépôt pose un
// override manuel (lead.manualPhase) qui prime sur l'avancement automatique.
const EDITABLE: { stage: string; label: string; phases: string[] }[] = [
  { stage: 'NOUVEAU', label: 'Nouveau', phases: ['NOUVEAU', 'A_RAPPELER'] },
  { stage: 'DEVIS_ENVOYE', label: 'Devis envoyé', phases: ['DEVIS_ENVOYE'] },
  { stage: 'DEVIS_VALIDE', label: 'Devis validé', phases: ['DEVIS_VALIDE', 'GAGNE'] },
  { stage: 'RDV_PLANIFIE', label: 'RDV planifié', phases: ['RDV_PLANIFIE'] },
  { stage: 'VISITE_FAITE', label: 'Visite réalisée', phases: ['VISITE_FAITE'] },
  { stage: 'FACTURE_ENVOYEE', label: 'Facture envoyée', phases: ['FACTURE_ENVOYEE'] },
  { stage: 'PAIEMENT_RECU', label: 'Paiement reçu', phases: ['PAIEMENT_RECU'] },
  { stage: 'RAPPORT', label: 'Rapport à faire', phases: ['RAPPORT'] },
  { stage: 'SUIVI', label: 'Suivi (2 sem.)', phases: ['SUIVI'] },
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
        manualPhase: true,
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
      const dossier = computeDossier(
        dossierInputFromContact(r.contact, { stage: r.stage, manualPhase: r.manualPhase })
      );
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
    // Branche travaux : déposable aussi, mais affichée seulement si au moins un
    // dossier y est (pour ne pas encombrer la majorité des pipelines).
    ...TRAVAUX.filter((t) => cards.some((c) => c.phase === t.stage)).map((t) => ({
      stage: t.stage,
      label: t.label,
      leads: inPhase([t.stage]),
    })),
    // Colonne « Perdu » : cible de dépôt pour clore un dossier d'un glissement.
    // Hors navigation par flèches (noArrow) ; les dossiers perdus quittent ensuite
    // le pipeline (filtrés à la requête). Vide par construction → action seulement.
    { stage: 'PERDU', label: 'Perdu', noArrow: true, leads: [] },
  ];

  const actifs = cards.filter((c) => c.phase !== 'TERMINE');
  const pipeTotal = actifs.reduce((s, c) => s + c.montant, 0);

  return (
    <div className="space-y-5">
      <PageHeader
        title="Pipeline"
        subtitle={dbError ? undefined : <>{actifs.length} dossier(s) actif(s) · pipe <Money value={pipeTotal} /></>}
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
