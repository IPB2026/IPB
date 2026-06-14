import 'server-only';
import { prisma } from '@/lib/prisma';
import type { ServiceType, PipelineStage } from '@prisma/client';

/**
 * Agrégations de pilotage (Phase 3). Lecture seule, aucune écriture, aucune
 * migration. Toutes les valeurs monétaires sont en € HT (TVA non applicable 293 B).
 */

export interface KpiData {
  ca: { signe: number; facture: number; encaisse: number };
  conversion: { prospects: number; clients: number; rate: number };
  delaiMoyenJours: number | null;
  leadsParMois: { label: string; count: number }[];
  parService: { service: ServiceType; count: number }[];
  funnel: { stage: PipelineStage; label: string; count: number }[];
  diagnostiqueurs: {
    name: string;
    assignes: number;
    enCours: number;
    realises: number;
  }[];
  totals: {
    prospects: number;
    clients: number;
    devis: number;
    factures: number;
    rapports: number;
  };
}

const n = (v: unknown) => Number(v ?? 0);
const DAY = 86_400_000;

const SERVICE_ORDER: ServiceType[] = [
  'FISSURES',
  'HUMIDITE',
  'EXPERTISE_ACHAT',
  'MUR_PORTEUR',
  'AUTRE',
];

const FUNNEL: { stage: PipelineStage; label: string }[] = [
  { stage: 'NOUVEAU', label: 'Nouveau' },
  { stage: 'A_RAPPELER', label: 'À rappeler' },
  { stage: 'RDV_PLANIFIE', label: 'RDV planifié' },
  { stage: 'VISITE_FAITE', label: 'Visite faite' },
  { stage: 'DEVIS_ENVOYE', label: 'Devis envoyé' },
  { stage: 'GAGNE', label: 'Gagné (client)' },
];

const MONTHS_FR = [
  'janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin',
  'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.',
];

export async function computeKpis(): Promise<KpiData> {
  // ── CA (signé / facturé / encaissé) ──
  const [devisSigne, factureEmise, facturePayee] = await Promise.all([
    prisma.devis.aggregate({ _sum: { totalHT: true }, where: { status: 'ACCEPTE' } }),
    prisma.facture.aggregate({
      _sum: { totalHT: true },
      where: { status: { in: ['ENVOYEE', 'PAYEE'] } },
    }),
    prisma.facture.aggregate({ _sum: { totalHT: true }, where: { status: 'PAYEE' } }),
  ]);

  // ── Conversion prospect → client (au niveau contact) ──
  const [prospects, clients] = await Promise.all([
    prisma.contact.count(),
    prisma.contact.count({
      where: {
        OR: [{ devis: { some: { status: 'ACCEPTE' } } }, { factures: { some: {} } }],
      },
    }),
  ]);

  // ── Totaux ──
  const [totalLeads, totalDevis, totalFactures, totalRapports] = await Promise.all([
    prisma.lead.count(),
    prisma.devis.count(),
    prisma.facture.count(),
    prisma.rapport.count(),
  ]);

  // ── Délai moyen demande → rapport remis ──
  // Approximation : updatedAt du rapport ENVOYÉ (≈ date d'envoi, plus aucune
  // édition ensuite) − createdAt du prospect lié.
  let delaiMoyenJours: number | null = null;
  const rapportsEnvoyes = await prisma.rapport.findMany({
    where: { status: 'ENVOYE', leadId: { not: null } },
    select: { updatedAt: true, leadId: true },
  });
  if (rapportsEnvoyes.length > 0) {
    const leadIds = rapportsEnvoyes
      .map((r) => r.leadId)
      .filter((x): x is string => Boolean(x));
    const leads = await prisma.lead.findMany({
      where: { id: { in: leadIds } },
      select: { id: true, createdAt: true },
    });
    const leadCreatedAt = new Map(leads.map((l) => [l.id, l.createdAt]));
    const delays: number[] = [];
    for (const r of rapportsEnvoyes) {
      const start = r.leadId ? leadCreatedAt.get(r.leadId) : null;
      if (!start) continue;
      const d = (r.updatedAt.getTime() - start.getTime()) / DAY;
      if (d >= 0) delays.push(d);
    }
    if (delays.length > 0) {
      delaiMoyenJours =
        Math.round((delays.reduce((a, b) => a + b, 0) / delays.length) * 10) / 10;
    }
  }

  // ── Leads / mois (12 derniers mois) ──
  const since = new Date();
  since.setHours(0, 0, 0, 0);
  since.setDate(1);
  since.setMonth(since.getMonth() - 11);
  const recentLeads = await prisma.lead.findMany({
    where: { createdAt: { gte: since } },
    select: { createdAt: true },
  });
  const buckets = new Map<string, number>();
  const labels: { key: string; label: string }[] = [];
  for (let i = 0; i < 12; i++) {
    const d = new Date(since);
    d.setMonth(since.getMonth() + i);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    buckets.set(key, 0);
    labels.push({ key, label: MONTHS_FR[d.getMonth()] });
  }
  for (const l of recentLeads) {
    const key = `${l.createdAt.getFullYear()}-${l.createdAt.getMonth()}`;
    if (buckets.has(key)) buckets.set(key, (buckets.get(key) ?? 0) + 1);
  }
  const leadsParMois = labels.map((x) => ({
    label: x.label,
    count: buckets.get(x.key) ?? 0,
  }));

  // ── Répartition par service ──
  const serviceGroups = await prisma.lead.groupBy({
    by: ['service'],
    _count: { _all: true },
  });
  const serviceCount = new Map<ServiceType, number>(
    serviceGroups.map((g) => [g.service, g._count._all])
  );
  const parService = SERVICE_ORDER.map((service) => ({
    service,
    count: serviceCount.get(service) ?? 0,
  })).filter((s) => s.count > 0);

  // ── Entonnoir (par étape de pipeline) ──
  const stageGroups = await prisma.lead.groupBy({
    by: ['stage'],
    _count: { _all: true },
  });
  const stageCount = new Map<PipelineStage, number>(
    stageGroups.map((g) => [g.stage, g._count._all])
  );
  const funnel = FUNNEL.map((f) => ({
    ...f,
    count: stageCount.get(f.stage) ?? 0,
  }));

  // ── Activité par diagnostiqueur ──
  const experts = await prisma.user.findMany({
    where: { role: 'EXPERT' },
    select: { id: true, name: true, email: true },
    orderBy: { name: 'asc' },
  });
  const diagnostiqueurs = await Promise.all(
    experts.map(async (e) => {
      const [assignes, realises, enCours] = await Promise.all([
        prisma.lead.count({ where: { assignedToId: e.id } }),
        prisma.rapport.count({ where: { authorId: e.id, status: 'ENVOYE' } }),
        prisma.rapport.count({
          where: {
            authorId: e.id,
            status: { in: ['BROUILLON', 'SOUMIS', 'GENERE', 'VALIDE'] },
          },
        }),
      ]);
      return { name: e.name || e.email, assignes, enCours, realises };
    })
  );

  return {
    ca: {
      signe: n(devisSigne._sum.totalHT),
      facture: n(factureEmise._sum.totalHT),
      encaisse: n(facturePayee._sum.totalHT),
    },
    conversion: {
      prospects,
      clients,
      rate: prospects > 0 ? Math.round((clients / prospects) * 1000) / 10 : 0,
    },
    delaiMoyenJours,
    leadsParMois,
    parService,
    funnel,
    diagnostiqueurs,
    totals: {
      prospects: totalLeads,
      clients,
      devis: totalDevis,
      factures: totalFactures,
      rapports: totalRapports,
    },
  };
}
