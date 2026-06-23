import 'server-only';
import { prisma } from '@/lib/prisma';
import { computeDossier, dossierInputFromContact } from '@/lib/crm/dossier';
import { CLIENT_CONTACT_WHERE } from '@/lib/crm/client-status';
import type { ServiceType, PipelineStage } from '@prisma/client';

/**
 * Agrégations de pilotage (Phase 3). Lecture seule, aucune écriture, aucune
 * migration. Toutes les valeurs monétaires sont en € HT (TVA non applicable 293 B).
 */

export interface KpiData {
  ca: { signe: number; facture: number; encaisse: number; resteAEncaisser: number; tauxFacturation: number };
  /** « Pipe » : montant des devis ENVOYÉS en attente de réponse (CA potentiel). */
  pipe: { montant: number; nb: number };
  /** Prévision pondérée : Σ probabilité(phase) × montant, sur les dossiers actifs. */
  forecastPondere: number;
  /** Performance par canal d'acquisition (leads, clients, taux de conversion). */
  parCanal: { canal: string; leads: number; clients: number; taux: number }[];
  devis: { acceptes: number; emis: number; panierMoyen: number; tauxAcceptation: number };
  conversion: { prospects: number; clients: number; rate: number };
  rdvAVenir: number;
  rapportsLivres: number;
  delaiMoyenJours: number | null;
  /** T1 — délai moyen Devis envoyé → Devis validé (jours), via les transitions horodatées. */
  delaiValidationJours: number | null;
  /** C3 — moteur d'avis : demandés / reçus / taux. */
  avis: { demandes: number; recus: number; taux: number };
  leadsParMois: { label: string; count: number }[];
  parService: { service: ServiceType; count: number }[];
  funnel: { stage: string; label: string; count: number }[];
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

// Entonnoir = phases du dossier (mêmes que les colonnes du pipeline) pour une
// cohérence stricte pipeline ↔ pilotage.
const FUNNEL: { key: string; label: string }[] = [
  { key: 'NOUVEAU', label: 'Nouveau' },
  { key: 'DEVIS_ENVOYE', label: 'Devis envoyé' },
  { key: 'DEVIS_VALIDE', label: 'Devis validé' },
  { key: 'RDV_PLANIFIE', label: 'RDV planifié' },
  { key: 'VISITE_FAITE', label: 'Visite réalisée' },
  { key: 'FACTURE_ENVOYEE', label: 'Facture envoyée' },
  { key: 'PAIEMENT_RECU', label: 'Paiement reçu' },
  { key: 'RAPPORT', label: 'Rapport à faire' },
  { key: 'SUIVI', label: 'Suivi' },
];

/**
 * Probabilité de gain par phase (prévision pondérée, façon Einstein/Pipedrive).
 * Avant « Devis validé » c'est incertain ; après acceptation, c'est quasi acquis.
 */
const PHASE_WIN_PROBABILITY: Record<string, number> = {
  NOUVEAU: 0.05,
  A_RAPPELER: 0.05,
  DEVIS_ENVOYE: 0.3,
  DEVIS_VALIDE: 0.9,
  GAGNE: 0.9,
  RDV_PLANIFIE: 0.92,
  VISITE_FAITE: 0.95,
  FACTURE_ENVOYEE: 0.98,
  PAIEMENT_RECU: 1,
  RAPPORT: 1,
  SUIVI: 1,
  ACCOMPAGNEMENT_TRAVAUX: 1,
  TRAVAUX_LANCES: 1,
};

const MONTHS_FR = [
  'janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin',
  'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.',
];

export async function computeKpis(): Promise<KpiData> {
  const now = new Date();

  // ── CA, conversion et totaux : un seul aller-retour parallèle ──
  const [
    devisSigne,
    factureEmise,
    facturePayee,
    prospects,
    clients,
    totalLeads,
    totalDevis,
    totalFactures,
    totalRapports,
    devisAcceptesCount,
    devisEmisCount,
    rdvAVenir,
    rapportsLivres,
    pipeAgg,
  ] = await Promise.all([
    prisma.devis.aggregate({ _sum: { totalHT: true }, where: { status: 'ACCEPTE' } }),
    prisma.facture.aggregate({
      _sum: { totalHT: true },
      where: { status: { in: ['ENVOYEE', 'PAYEE'] } },
    }),
    prisma.facture.aggregate({ _sum: { totalHT: true }, where: { status: 'PAYEE' } }),
    prisma.contact.count(),
    prisma.contact.count({ where: CLIENT_CONTACT_WHERE }),
    prisma.lead.count(),
    prisma.devis.count(),
    prisma.facture.count(),
    prisma.rapport.count(),
    prisma.devis.count({ where: { status: 'ACCEPTE' } }),
    // Devis « sortis » (envoyés au moins une fois) = base du taux d'acceptation.
    prisma.devis.count({ where: { status: { in: ['ENVOYE', 'ACCEPTE', 'REFUSE', 'EXPIRE'] } } }),
    prisma.appointment.count({ where: { start: { gte: now }, status: { not: 'ANNULE' } } }),
    prisma.rapport.count({ where: { status: 'ENVOYE' } }),
    // Pipe : devis ENVOYÉS en attente de réponse (CA potentiel à signer).
    prisma.devis.aggregate({ _sum: { totalHT: true }, _count: true, where: { status: 'ENVOYE' } }),
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

  // ── Entonnoir (par PHASE de dossier — identique au pipeline) ──
  const funnelLeads = await prisma.lead.findMany({
    where: { stage: { notIn: ['PERDU'] } },
    take: 1000,
    select: {
      stage: true,
      manualPhase: true,
      contact: {
        select: {
          // orderBy déterministe identique à la fiche → phase/montant cohérents.
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
  const phaseCount = new Map<string, number>();
  // Prévision pondérée : Σ probabilité(phase) × montant du devis, sur les dossiers
  // ACTIFS (ni Terminé, ni Perdu). Inspiré d'Einstein/Pipedrive forecast.
  let forecastPondere = 0;
  for (const l of funnelLeads) {
    const dossier = computeDossier(
      dossierInputFromContact(l.contact, { stage: l.stage, manualPhase: l.manualPhase })
    );
    // « À rappeler » est fondu dans « Nouveau » (cf. pipeline).
    const key = dossier.phase === 'A_RAPPELER' ? 'NOUVEAU' : dossier.phase;
    phaseCount.set(key, (phaseCount.get(key) ?? 0) + 1);

    if (dossier.phase !== 'TERMINE' && dossier.phase !== 'PERDU') {
      const proba = PHASE_WIN_PROBABILITY[dossier.phase] ?? 0;
      forecastPondere += proba * (dossier.montantDevis ?? 0);
    }
  }
  forecastPondere = Math.round(forecastPondere);
  const funnel = FUNNEL.map((f) => ({
    stage: f.key,
    label: f.label,
    count: phaseCount.get(f.key) ?? 0,
  }));

  // ── Performance par canal d'acquisition (exploite l'attribution first-touch) ──
  // 2 agrégats : total leads par canal + leads devenus CLIENT par canal (même
  // critère que partout, cf. CLIENT_CONTACT_WHERE). Taux = clients / leads.
  // NB : `channel` est une colonne récente — le client Prisma local peut être en
  // retard de génération ; on type explicitement le résultat (forme garantie par
  // Prisma : { channel, _count:number }) pour rester robuste et lisible.
  type ChannelGroup = { channel: string | null; _count: number };
  const [leadsByChannelRaw, clientsByChannelRaw] = await Promise.all([
    prisma.lead.groupBy({ by: ['channel'], _count: true }),
    prisma.lead.groupBy({
      by: ['channel'],
      _count: true,
      where: { contact: CLIENT_CONTACT_WHERE },
    }),
  ]);
  const leadsByChannel = leadsByChannelRaw as unknown as ChannelGroup[];
  const clientsByChannel = clientsByChannelRaw as unknown as ChannelGroup[];
  const clientsMap = new Map<string, number>(
    clientsByChannel.map((c) => [c.channel ?? 'DIRECT', Number(c._count)])
  );
  const parCanal: { canal: string; leads: number; clients: number; taux: number }[] = leadsByChannel
    .map((c) => {
      const canal = c.channel ?? 'DIRECT';
      const leads = Number(c._count);
      const clientsN = clientsMap.get(canal) ?? 0;
      return {
        canal,
        leads,
        clients: clientsN,
        taux: leads > 0 ? Math.round((clientsN / leads) * 1000) / 10 : 0,
      };
    })
    .sort((a, b) => b.leads - a.leads);

  // ── T1 — VÉLOCITÉ : délai moyen « Devis envoyé → Devis validé » (jours), basé
  //    sur les transitions horodatées (PhaseEvent). Indicateur de réactivité du
  //    cycle commercial (un délai qui s'allonge = signal à traiter). ──
  let delaiValidationJours: number | null = null;
  try {
    const [envoyes, valides] = await Promise.all([
      prisma.phaseEvent.findMany({ where: { toPhase: 'DEVIS_ENVOYE' }, select: { contactId: true, createdAt: true }, orderBy: { createdAt: 'asc' } }),
      prisma.phaseEvent.findMany({ where: { toPhase: 'DEVIS_VALIDE' }, select: { contactId: true, createdAt: true }, orderBy: { createdAt: 'asc' } }),
    ]);
    const firstEnvoye = new Map<string, Date>();
    for (const e of envoyes) if (!firstEnvoye.has(e.contactId)) firstEnvoye.set(e.contactId, e.createdAt);
    let sum = 0;
    let count = 0;
    for (const v of valides) {
      const env = firstEnvoye.get(v.contactId);
      if (env && v.createdAt >= env) {
        sum += (v.createdAt.getTime() - env.getTime()) / DAY;
        count++;
      }
    }
    if (count > 0) delaiValidationJours = Math.round((sum / count) * 10) / 10;
  } catch {
    // PhaseEvent peut être vide au début : on laisse null (affiché « — »).
  }

  // ── C3 — moteur d'avis : demandés vs reçus → taux de transformation en avis. ──
  const [avisDemandes, avisRecus] = await Promise.all([
    prisma.contact.count({ where: { reviewRequestedAt: { not: null } } }),
    prisma.contact.count({ where: { reviewReceivedAt: { not: null } } }),
  ]);
  const avis = {
    demandes: avisDemandes,
    recus: avisRecus,
    taux: avisDemandes > 0 ? Math.round((avisRecus / avisDemandes) * 1000) / 10 : 0,
  };

  // ── Activité par diagnostiqueur ──
  // 3 requêtes au total (au lieu de N×3) : la liste + 2 groupBy agrégés en mémoire.
  const [experts, leadByExpert, rapportByExpert] = await Promise.all([
    prisma.user.findMany({
      where: { role: 'EXPERT' },
      select: { id: true, name: true, email: true },
      orderBy: { name: 'asc' },
    }),
    prisma.lead.groupBy({
      by: ['assignedToId'],
      _count: { _all: true },
      where: { assignedToId: { not: null } },
    }),
    prisma.rapport.groupBy({
      by: ['authorId', 'status'],
      _count: { _all: true },
      where: { authorId: { not: null } },
    }),
  ]);
  const assignesMap = new Map(leadByExpert.map((g) => [g.assignedToId, g._count._all]));
  const diagnostiqueurs = experts.map((e) => {
    const rapports = rapportByExpert.filter((g) => g.authorId === e.id);
    const realises = rapports
      .filter((g) => g.status === 'ENVOYE')
      .reduce((s, g) => s + g._count._all, 0);
    const enCours = rapports
      .filter((g) => ['BROUILLON', 'SOUMIS', 'GENERE', 'VALIDE'].includes(g.status))
      .reduce((s, g) => s + g._count._all, 0);
    return {
      name: e.name || e.email,
      assignes: assignesMap.get(e.id) ?? 0,
      enCours,
      realises,
    };
  });

  const caSigne = n(devisSigne._sum.totalHT);
  const caFacture = n(factureEmise._sum.totalHT);
  const caEncaisse = n(facturePayee._sum.totalHT);
  return {
    ca: {
      signe: caSigne,
      facture: caFacture,
      encaisse: caEncaisse,
      resteAEncaisser: Math.max(0, caFacture - caEncaisse),
      // Part du CA signé déjà facturée (alerte si on tarde à facturer).
      tauxFacturation: caSigne > 0 ? Math.round((caFacture / caSigne) * 1000) / 10 : 0,
    },
    pipe: {
      montant: n(pipeAgg._sum.totalHT),
      nb: pipeAgg._count,
    },
    forecastPondere,
    parCanal,
    devis: {
      acceptes: devisAcceptesCount,
      emis: devisEmisCount,
      panierMoyen: devisAcceptesCount > 0 ? Math.round(caSigne / devisAcceptesCount) : 0,
      tauxAcceptation:
        devisEmisCount > 0 ? Math.round((devisAcceptesCount / devisEmisCount) * 1000) / 10 : 0,
    },
    conversion: {
      prospects,
      clients,
      rate: prospects > 0 ? Math.round((clients / prospects) * 1000) / 10 : 0,
    },
    rdvAVenir,
    rapportsLivres,
    delaiMoyenJours,
    delaiValidationJours,
    avis,
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
