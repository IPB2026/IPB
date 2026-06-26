import { createMcpHandler } from 'mcp-handler';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import {
  SOURCE_LABEL,
  SERVICE_LABEL,
  STAGE_LABEL,
  TIER_LABEL,
} from '@/components/admin/badges';
import {
  ActivityType,
  PipelineStage,
  ServiceType,
  LeadTier,
  ReportType,
  AppointmentType,
  Prisma,
} from '@prisma/client';
import { captureLead, parseAddress } from '@/lib/crm/captureLead';
import {
  nextDevisNumber,
  nextFactureNumber,
  nextRapportNumber,
} from '@/lib/crm/numbering';
import {
  generateReport,
  REPORT_MODEL,
  type ReportZoneInput,
} from '@/lib/ai/report';
import {
  sendDevisEmail,
  sendFactureEmail,
  sendRapportEmail,
} from '@/lib/crm/send';
import { createInvoiceForAppointment } from '@/lib/crm/invoicing';
import { factureObjet, sanitizeStructurel } from '@/lib/crm/facture-objet';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Connecteur MCP du CRM IPB pour Cowork — pilote complet de l'activité.
 * Le secret (MCP_TOKEN) est dans l'URL : /api/mcp/<MCP_TOKEN>/mcp — le
 * connecteur Cowork se branche SANS authentification (pas d'OAuth). Le secret
 * du chemin protège l'accès (URL = capacité ; à garder confidentielle).
 */

const TOKEN = process.env.MCP_TOKEN || '';

const ok = (data: unknown) => ({
  content: [{ type: 'text' as const, text: JSON.stringify(data, null, 2) }],
});

const OPEN_STAGES: PipelineStage[] = [
  'NOUVEAU',
  'A_RAPPELER',
  'RDV_PLANIFIE',
  'VISITE_FAITE',
  'DEVIS_ENVOYE',
];

const APPT_OBJECT: Record<AppointmentType, string> = {
  DIAGNOSTIC_FISSURES: 'Diagnostic pathologies de fissures',
  DIAGNOSTIC_HUMIDITE: 'Diagnostic humidité et infiltrations',
  EXPERTISE_ACHAT: 'Expertise structurelle avant achat',
  MUR_PORTEUR: 'Étude de faisabilité ouverture de mur porteur',
  LANCEMENT_TRAVAUX: 'Lancement / coordination des travaux',
  AUTRE: 'Intervention IPB',
};

const REPORT_TITLE: Record<ReportType, string> = {
  FISSURES: 'Diagnostic pathologies de fissures',
  HUMIDITE: 'Diagnostic humidité et infiltrations',
  EXPERTISE_ACHAT: 'Expertise structurelle avant achat',
  MUR_PORTEUR: 'Étude de faisabilité ouverture de mur porteur',
};

const baseHandler = createMcpHandler(
  (server) => {
    // ───────────────── LECTURE ─────────────────
    server.tool(
      'tableau_de_bord',
      "Indicateurs clés : total prospects, chauds à traiter, relances dues, devis/factures, CA.",
      {},
      async () => {
        const now = new Date();
        const [total, hot, relancesDues, devis, facturesPayees, ca] =
          await Promise.all([
            prisma.lead.count(),
            prisma.lead.count({ where: { tier: 'HOT', stage: { in: OPEN_STAGES } } }),
            prisma.activity.count({ where: { type: 'RELANCE', done: false, dueAt: { lte: now } } }),
            prisma.devis.count(),
            prisma.facture.count({ where: { status: 'PAYEE' } }),
            prisma.facture.aggregate({ where: { status: 'PAYEE' }, _sum: { totalHT: true } }),
          ]);
        return ok({
          total_prospects: total,
          chauds_a_traiter: hot,
          relances_dues: relancesDues,
          devis: devis,
          factures_payees: facturesPayees,
          ca_encaisse_HT: Number(ca._sum.totalHT ?? 0),
        });
      }
    );

    server.tool(
      'prospects_a_relancer',
      'Prospects encore ouverts à relancer (coordonnées, service, tier, étape, dernier contact).',
      { limit: z.number().int().min(1).max(100).optional() },
      async ({ limit }) => {
        const leads = await prisma.lead.findMany({
          where: { stage: { in: OPEN_STAGES } },
          include: { contact: true, activities: { orderBy: { createdAt: 'desc' }, take: 1 } },
          orderBy: { createdAt: 'asc' },
          take: limit ?? 25,
        });
        return ok(leads.map((l) => ({
          id: l.id,
          nom: l.contact.name,
          telephone: l.contact.phone,
          email: l.contact.email,
          ville: l.contact.city,
          service: SERVICE_LABEL[l.service],
          source: SOURCE_LABEL[l.source],
          tier: l.tier ? TIER_LABEL[l.tier] : null,
          etape: STAGE_LABEL[l.stage],
          recu_le: l.createdAt.toISOString().slice(0, 10),
          relances_auto: l.relanceStep,
          dernier_contact: l.activities[0]?.createdAt.toISOString().slice(0, 10) ?? null,
          resume: l.summary,
        })));
      }
    );

    server.tool(
      'rechercher_prospect',
      'Recherche un prospect (nom, e-mail, téléphone, ville) avec historique, devis et factures.',
      { query: z.string().min(1) },
      async ({ query }) => {
        const contact = await prisma.contact.findFirst({
          where: {
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
              { email: { contains: query, mode: 'insensitive' } },
              { phone: { contains: query } },
              { city: { contains: query, mode: 'insensitive' } },
            ],
          },
          include: {
            leads: true,
            activities: { orderBy: { createdAt: 'desc' }, take: 8 },
            devis: { select: { id: true, number: true, status: true, totalHT: true } },
            factures: { select: { id: true, number: true, status: true, totalHT: true } },
          },
        });
        if (!contact) return ok({ trouve: false, query });
        return ok({
          trouve: true,
          id: contact.id,
          nom: contact.name,
          telephone: contact.phone,
          email: contact.email,
          ville: contact.city,
          dossiers: contact.leads.map((l) => ({ id: l.id, service: SERVICE_LABEL[l.service], etape: STAGE_LABEL[l.stage] })),
          devis: contact.devis.map((d) => ({ id: d.id, number: d.number, statut: d.status, montantHT: Number(d.totalHT) })),
          factures: contact.factures.map((f) => ({ id: f.id, number: f.number, statut: f.status, montantHT: Number(f.totalHT) })),
          historique: contact.activities.map((a) => ({ date: a.createdAt.toISOString().slice(0, 10), type: a.type, contenu: a.content })),
        });
      }
    );

    server.tool(
      'prospects_recents',
      'Derniers prospects entrés dans le CRM.',
      { limit: z.number().int().min(1).max(50).optional() },
      async ({ limit }) => {
        const leads = await prisma.lead.findMany({ include: { contact: true }, orderBy: { createdAt: 'desc' }, take: limit ?? 10 });
        return ok(leads.map((l) => ({ id: l.id, nom: l.contact.name, telephone: l.contact.phone, email: l.contact.email, service: SERVICE_LABEL[l.service], etape: STAGE_LABEL[l.stage], tier: l.tier ? TIER_LABEL[l.tier] : null, recu_le: l.createdAt.toISOString().slice(0, 10) })));
      }
    );

    server.tool(
      'relances_dues',
      'Relances planifiées arrivées à échéance et non effectuées.',
      {},
      async () => {
        const items = await prisma.activity.findMany({
          where: { type: 'RELANCE', done: false, dueAt: { lte: new Date() } },
          include: { lead: { include: { contact: true } } },
          orderBy: { dueAt: 'asc' },
          take: 50,
        });
        return ok(items.map((a) => ({ activityId: a.id, prospectId: a.leadId, nom: a.lead?.contact.name ?? null, echeance: a.dueAt?.toISOString().slice(0, 10), objet: a.content })));
      }
    );

    server.tool(
      'rdv_a_venir',
      "Rendez-vous (diagnostics) à venir dans l'agenda.",
      { limit: z.number().int().min(1).max(50).optional() },
      async ({ limit }) => {
        const appts = await prisma.appointment.findMany({ where: { start: { gte: new Date() } }, include: { contact: true }, orderBy: { start: 'asc' }, take: limit ?? 20 });
        return ok(appts.map((a) => ({ id: a.id, titre: a.title, client: a.contact.name, debut: a.start.toISOString(), lieu: a.location, statut: a.status })));
      }
    );

    server.tool(
      'lister_devis_factures',
      'Liste les derniers devis et factures avec leur statut.',
      {},
      async () => {
        const [devis, factures] = await Promise.all([
          prisma.devis.findMany({ include: { contact: true }, orderBy: { createdAt: 'desc' }, take: 20 }),
          prisma.facture.findMany({ include: { contact: true }, orderBy: { createdAt: 'desc' }, take: 20 }),
        ]);
        return ok({
          devis: devis.map((d) => ({ id: d.id, number: d.number, client: d.contact.name, statut: d.status, montantHT: Number(d.totalHT) })),
          factures: factures.map((f) => ({ id: f.id, number: f.number, client: f.contact.name, statut: f.status, montantHT: Number(f.totalHT) })),
        });
      }
    );

    // ───────────────── PROSPECTS / PIPELINE ─────────────────
    server.tool(
      'creer_prospect',
      'Crée un prospect dans le CRM (ex. suite à un appel).',
      {
        nom: z.string().min(1),
        telephone: z.string().optional(),
        email: z.string().email().optional(),
        ville: z.string().optional(),
        service: z.nativeEnum(ServiceType).optional(),
        tier: z.nativeEnum(LeadTier).optional(),
        note: z.string().optional(),
      },
      async ({ nom, telephone, email, ville, service, tier, note }) => {
        const { postalCode, city } = parseAddress(ville);
        const res = await captureLead({
          source: 'MANUEL',
          service: service ?? 'AUTRE',
          contact: { name: nom, phone: telephone ?? null, email: email ?? null, city: city ?? ville ?? null, postalCode },
          scoring: tier ? { tier, reasons: ['Créé via Cowork'] } : undefined,
          summary: note?.slice(0, 120) ?? 'Prospect créé via Cowork',
          payload: { note: note ?? '', source: 'cowork' },
        });
        if (!res) return ok({ ok: false, erreur: 'Échec création' });
        if (note) {
          await prisma.activity.create({ data: { type: 'NOTE', leadId: res.leadId, contactId: res.contactId, content: `[Cowork] ${note}` } });
        }
        return ok({ ok: true, prospectId: res.leadId, contactId: res.contactId });
      }
    );

    server.tool(
      'changer_etape',
      'Change l’étape pipeline d’un prospect (NOUVEAU, A_RAPPELER, RDV_PLANIFIE, VISITE_FAITE, DEVIS_ENVOYE, GAGNE, PERDU).',
      { prospectId: z.string().min(1), etape: z.nativeEnum(PipelineStage) },
      async ({ prospectId, etape }) => {
        const lead = await prisma.lead.findUnique({ where: { id: prospectId }, select: { stage: true, contactId: true } });
        if (!lead) return ok({ ok: false, erreur: 'Prospect introuvable' });
        // Réglage MANUEL : pose `manualPhase` (override « liberté totale ») + synchronise
        // l'enum stage. Rouvrir un dossier (depuis PERDU/GAGNE) repasse en suivi auto.
        const reopen = etape !== 'PERDU' && (lead.stage === 'PERDU' || lead.stage === 'GAGNE');
        await prisma.lead.update({
          where: { id: prospectId },
          data: {
            stage: etape,
            manualPhase: reopen ? null : etape,
            lostReason: etape === 'PERDU' ? 'Marqué perdu (Cowork)' : null,
          },
        });
        await prisma.activity.create({ data: { type: 'CHANGEMENT_ETAPE', leadId: prospectId, contactId: lead.contactId, content: `[Cowork] Étape : ${lead.stage} → ${etape}` } });
        return ok({ ok: true });
      }
    );

    server.tool(
      'planifier_relance',
      'Planifie une relance (échéance) pour un prospect.',
      { prospectId: z.string().min(1), date: z.string(), objet: z.string().optional() },
      async ({ prospectId, date, objet }) => {
        const lead = await prisma.lead.findUnique({ where: { id: prospectId }, select: { contactId: true } });
        if (!lead) return ok({ ok: false, erreur: 'Prospect introuvable' });
        const due = new Date(date);
        if (Number.isNaN(due.getTime())) return ok({ ok: false, erreur: 'Date invalide' });
        await prisma.activity.create({ data: { type: 'RELANCE', leadId: prospectId, contactId: lead.contactId, content: objet || 'Relance à effectuer', dueAt: due } });
        return ok({ ok: true });
      }
    );

    server.tool(
      'terminer_relance',
      'Marque une relance comme effectuée.',
      { activityId: z.string().min(1) },
      async ({ activityId }) => {
        await prisma.activity.update({ where: { id: activityId }, data: { done: true, doneAt: new Date() } }).catch(() => null);
        return ok({ ok: true });
      }
    );

    server.tool(
      'journaliser_activite',
      "Ajoute une activité à l'historique d'un prospect (note, appel, e-mail, relance).",
      { prospectId: z.string().min(1), type: z.enum(['NOTE', 'APPEL', 'EMAIL', 'RELANCE']), contenu: z.string().min(1) },
      async ({ prospectId, type, contenu }) => {
        const lead = await prisma.lead.findFirst({ where: { OR: [{ id: prospectId }, { contactId: prospectId }] }, select: { id: true, contactId: true } });
        const contactId = lead?.contactId ?? (await prisma.contact.findUnique({ where: { id: prospectId }, select: { id: true } }))?.id;
        if (!contactId) return ok({ ok: false, erreur: 'Prospect introuvable' });
        await prisma.activity.create({ data: { type: type as ActivityType, leadId: lead?.id ?? null, contactId, content: `[Cowork] ${contenu}` } });
        return ok({ ok: true });
      }
    );

    // ───────────────── DEVIS / FACTURES ─────────────────
    server.tool(
      'creer_devis',
      'Crée un devis pour un prospect (contactId) avec des lignes de prestation.',
      {
        contactId: z.string().min(1),
        objet: z.string().min(1),
        bienConcerne: z.string().optional(),
        lignes: z.array(z.object({ designation: z.string().min(1), detail: z.string().optional(), unit: z.string().optional(), qty: z.number().optional(), unitPrice: z.number() })).min(1),
      },
      async ({ contactId, objet, bienConcerne, lignes }) => {
        const contact = await prisma.contact.findUnique({ where: { id: contactId } });
        if (!contact) return ok({ ok: false, erreur: 'Client introuvable' });
        const computed = lignes.map((l, i) => ({ designation: l.designation, detail: l.detail ?? null, unit: l.unit ?? 'Forfait', qty: l.qty ?? 1, unitPrice: l.unitPrice, total: Math.round((l.qty ?? 1) * l.unitPrice * 100) / 100, position: i }));
        const totalHT = computed.reduce((s, l) => s + l.total, 0);
        const validUntil = new Date(); validUntil.setDate(validUntil.getDate() + 30);
        const devis = await prisma.devis.create({ data: { number: await nextDevisNumber(), contactId, object: objet, bienConcerne: bienConcerne ?? null, validUntil, totalHT, lines: { create: computed } } });
        return ok({ ok: true, devisId: devis.id, number: devis.number, totalHT });
      }
    );

    server.tool('envoyer_devis', 'Envoie le devis au client par e-mail (PDF joint).', { devisId: z.string().min(1) }, async ({ devisId }) => ok(await sendDevisEmail(devisId)));

    server.tool(
      'convertir_devis_en_facture',
      'Convertit un devis accepté en facture.',
      { devisId: z.string().min(1) },
      async ({ devisId }) => {
        const devis = await prisma.devis.findUnique({ where: { id: devisId }, include: { contact: true, lines: { orderBy: { position: 'asc' } } } });
        if (!devis) return ok({ ok: false, erreur: 'Devis introuvable' });
        const due = new Date(); due.setDate(due.getDate() + 30);
        const facture = await prisma.facture.create({ data: { number: await nextFactureNumber(devis.contact.name), contactId: devis.contactId, devisId: devis.id, object: factureObjet(devis.object), dueDate: due, totalHT: devis.totalHT, lines: { create: devis.lines.map((l, i) => ({ designation: sanitizeStructurel(l.designation), detail: l.detail ? sanitizeStructurel(l.detail) : l.detail, unit: l.unit, qty: l.qty, unitPrice: l.unitPrice, total: l.total, position: i })) } } });
        await prisma.devis.update({ where: { id: devisId }, data: { status: 'ACCEPTE' } });
        return ok({ ok: true, factureId: facture.id, number: facture.number });
      }
    );

    server.tool('envoyer_facture', 'Envoie la facture au client par e-mail (PDF joint).', { factureId: z.string().min(1) }, async ({ factureId }) => ok(await sendFactureEmail(factureId)));

    server.tool('marquer_facture_payee', 'Marque une facture comme payée.', { factureId: z.string().min(1) }, async ({ factureId }) => {
      await prisma.facture.update({ where: { id: factureId }, data: { status: 'PAYEE' } }).catch(() => null);
      return ok({ ok: true });
    });

    // ───────────────── RAPPORTS IA ─────────────────
    server.tool(
      'creer_rapport',
      'Crée un rapport de diagnostic à partir de constats terrain (zones).',
      {
        contactId: z.string().min(1),
        type: z.nativeEnum(ReportType),
        title: z.string().optional(),
        bienAdresse: z.string().optional(),
        ville: z.string().optional(),
        zones: z.array(z.object({ titre: z.string().min(1), observations: z.string().min(1), mesure: z.string().optional(), gravite: z.string().optional() })).min(1),
      },
      async ({ contactId, type, title, bienAdresse, ville, zones }) => {
        const contact = await prisma.contact.findUnique({ where: { id: contactId } });
        if (!contact) return ok({ ok: false, erreur: 'Client introuvable' });
        const rapport = await prisma.rapport.create({ data: { number: await nextRapportNumber(contact.name), contactId, type, title: title || REPORT_TITLE[type], bienAdresse: bienAdresse ?? contact.address ?? null, ville: ville ?? contact.city ?? null, zonesInput: zones as unknown as Prisma.InputJsonValue } });
        return ok({ ok: true, rapportId: rapport.id, number: rapport.number });
      }
    );

    server.tool(
      'generer_rapport_ia',
      "Génère le contenu du rapport via l'IA (Claude) à partir des constats terrain.",
      { rapportId: z.string().min(1) },
      async ({ rapportId }) => {
        const rapport = await prisma.rapport.findUnique({ where: { id: rapportId }, include: { contact: true } });
        if (!rapport) return ok({ ok: false, erreur: 'Rapport introuvable' });
        const result = await generateReport({ type: rapport.type, clientName: rapport.contact.name, bienAdresse: rapport.bienAdresse ?? undefined, ville: rapport.ville ?? undefined, zones: (rapport.zonesInput as unknown as ReportZoneInput[]) ?? [] });
        if ('error' in result) return ok({ ok: false, erreur: result.error });
        await prisma.rapport.update({ where: { id: rapportId }, data: { aiContent: result.content as object, aiModel: REPORT_MODEL, aiGeneratedAt: new Date(), status: 'GENERE', budgetHT: result.content.budgetHT ?? null } });
        return ok({ ok: true, budgetHT: result.content.budgetHT, zones: result.content.zones.length });
      }
    );

    server.tool('envoyer_rapport', 'Envoie le rapport au client par e-mail (PDF joint).', { rapportId: z.string().min(1) }, async ({ rapportId }) => ok(await sendRapportEmail(rapportId)));

    // ───────────────── AGENDA ─────────────────
    server.tool(
      'creer_rdv',
      'Planifie un rendez-vous de diagnostic.',
      { contactId: z.string().min(1), type: z.nativeEnum(AppointmentType).optional(), debut: z.string(), dureeMin: z.number().optional(), lieu: z.string().optional() },
      async ({ contactId, type, debut, dureeMin, lieu }) => {
        const contact = await prisma.contact.findUnique({ where: { id: contactId } });
        if (!contact) return ok({ ok: false, erreur: 'Client introuvable' });
        const start = new Date(debut);
        if (Number.isNaN(start.getTime())) return ok({ ok: false, erreur: 'Date invalide' });
        const t = type ?? 'DIAGNOSTIC_FISSURES';
        const end = new Date(start.getTime() + (dureeMin ?? 60) * 60000);
        const appt = await prisma.appointment.create({ data: { contactId, title: APPT_OBJECT[t], type: t, start, end, location: lieu ?? null } });
        await prisma.activity.create({ data: { type: 'RDV', contactId, content: `[Cowork] RDV ${APPT_OBJECT[t]} — ${start.toLocaleString('fr-FR')}` } });
        return ok({ ok: true, rdvId: appt.id });
      }
    );

    server.tool(
      'facturer_rdv',
      'Génère la facture de l’intervention pour un RDV réalisé.',
      { rdvId: z.string().min(1) },
      async ({ rdvId }) => {
        // Logique PARTAGÉE avec le bouton CRM + le cron J+1 : prix = devis lié au
        // RDV → dernier devis diagnostic accepté → tarif par défaut, garde
        // anti-course atomique, idempotence. (Plus de prix codé en dur ici.)
        const inv = await createInvoiceForAppointment(rdvId);
        if (!inv) return ok({ ok: false, erreur: 'RDV introuvable' });
        const facture = await prisma.facture.findUnique({
          where: { id: inv.id },
          select: { number: true },
        });
        return ok({
          ok: true,
          factureId: inv.id,
          number: facture?.number,
          note: inv.created ? undefined : 'Déjà facturé',
        });
      }
    );
  },
  {},
  { basePath: `/api/mcp/${TOKEN}`, maxDuration: 60 }
);

// Le secret est dans le chemin : on vérifie le segment [secret] avant de servir.
async function guarded(
  req: Request,
  ctx: { params: { secret: string; transport: string } }
): Promise<Response> {
  if (!TOKEN || ctx.params.secret !== TOKEN) {
    return new Response('Not found', { status: 404 });
  }
  return baseHandler(req);
}

export { guarded as GET, guarded as POST };
