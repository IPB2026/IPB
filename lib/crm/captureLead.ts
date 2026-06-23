import 'server-only';
import { prisma } from '@/lib/prisma';
import {
  LeadSource,
  ServiceType,
  LeadTier,
  OccupantStatus,
} from '@prisma/client';
import { normalizePhoneFR, phoneVariants } from '@/lib/crm/phone';
import type { Attribution } from '@/lib/crm/attribution';

/**
 * Capture d'un lead dans le CRM.
 *
 * Appelé depuis les server actions des formulaires (diagnostic, calculateur,
 * contact, rappel) EN PLUS de l'envoi d'email. À utiliser dans un try/catch
 * non bloquant : si la base est indisponible, l'email part quand même et le
 * lead n'est jamais perdu côté boîte mail.
 */

export interface CaptureLeadContact {
  name: string;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  postalCode?: string | null;
  occupantStatus?: OccupantStatus;
  propertyType?: string | null;
  inServiceArea?: boolean | null;
}

export interface CaptureLeadScoring {
  tier?: LeadTier;
  score?: number;
  maxScore?: number;
  riskScore?: number;
  callbackPriority?: string;
  reasons?: string[];
}

export interface CaptureLeadInput {
  source: LeadSource;
  service: ServiceType;
  contact: CaptureLeadContact;
  scoring?: CaptureLeadScoring;
  summary?: string;
  payload: Record<string, unknown>;
  value?: number | null;
  /** Attribution d'acquisition first-touch (lue depuis le cookie côté serveur). */
  attribution?: Attribution | null;
}

const clean = (v?: string | null): string | null => {
  if (!v) return null;
  const t = String(v).trim();
  return t.length ? t : null;
};

const normEmail = (v?: string | null): string | null => {
  const c = clean(v);
  return c ? c.toLowerCase() : null;
};

/** Extrait le code postal et la ville d'une adresse libre, si possible. */
export function parseAddress(address?: string | null): {
  postalCode: string | null;
  city: string | null;
} {
  const a = clean(address);
  if (!a) return { postalCode: null, city: null };
  const cpMatch = a.match(/\b(\d{5})\b/);
  const postalCode = cpMatch ? cpMatch[1] : null;
  let city: string | null = null;
  if (cpMatch) {
    // ce qui suit le code postal est généralement la ville
    const after = a.slice(cpMatch.index! + 5).replace(/^[\s,]+/, '').trim();
    if (after) city = after.split(/[,\n]/)[0].trim() || null;
  }
  return { postalCode, city };
}

export interface CaptureLeadResult {
  leadId: string;
  contactId: string;
}

export async function captureLead(
  input: CaptureLeadInput
): Promise<CaptureLeadResult | null> {
  try {
    const email = normEmail(input.contact.email);
    // Téléphone stocké au format CANONIQUE E.164 (+33…) → plus de doublons dus au
    // formatage (« 06 12 … » vs « 0612… » vs « +33 6 … »).
    const phone = normalizePhoneFR(input.contact.phone);
    const name = clean(input.contact.name) ?? 'Contact sans nom';

    // 1) Retrouver un contact existant par email OU par l'une des variantes du
    //    téléphone (national / E.164 / chiffres bruts) — pour rattraper les fiches
    //    déjà enregistrées sous un autre format avant la normalisation.
    const orClauses: Array<Record<string, unknown>> = [];
    if (email) orClauses.push({ email });
    const variants = phoneVariants(input.contact.phone);
    if (variants.length) orClauses.push({ phone: { in: variants } });

    const existing = orClauses.length
      ? await prisma.contact.findFirst({ where: { OR: orClauses } })
      : null;

    const contactData = {
      name,
      email,
      phone,
      address: clean(input.contact.address),
      city: clean(input.contact.city),
      postalCode: clean(input.contact.postalCode),
      propertyType: clean(input.contact.propertyType),
      occupantStatus: input.contact.occupantStatus ?? OccupantStatus.INCONNU,
      inServiceArea: input.contact.inServiceArea ?? null,
    };

    let contactId: string;
    if (existing) {
      // Ne pas écraser un champ déjà renseigné avec une valeur vide
      const update: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(contactData)) {
        if (k === 'occupantStatus') {
          if (v !== OccupantStatus.INCONNU) update[k] = v;
          continue;
        }
        if (v !== null && v !== undefined) update[k] = v;
      }
      const updated = await prisma.contact.update({
        where: { id: existing.id },
        data: update,
      });
      contactId = updated.id;
    } else {
      const created = await prisma.contact.create({ data: contactData });
      contactId = created.id;
    }

    // 2) Créer le lead (avec l'attribution d'acquisition first-touch si dispo)
    const attr = input.attribution ?? null;
    const lead = await prisma.lead.create({
      data: {
        contactId,
        source: input.source,
        service: input.service,
        tier: input.scoring?.tier ?? null,
        score: input.scoring?.score ?? null,
        maxScore: input.scoring?.maxScore ?? null,
        riskScore: input.scoring?.riskScore ?? null,
        callbackPriority: input.scoring?.callbackPriority ?? null,
        reasons: input.scoring?.reasons ?? [],
        summary: clean(input.summary),
        payload: input.payload as object,
        value: input.value ?? null,
        utmSource: attr?.utmSource ?? null,
        utmMedium: attr?.utmMedium ?? null,
        utmCampaign: attr?.utmCampaign ?? null,
        utmTerm: attr?.utmTerm ?? null,
        utmContent: attr?.utmContent ?? null,
        gclid: attr?.gclid ?? null,
        landingPage: attr?.landingPage ?? null,
        referrer: attr?.referrer ?? null,
        channel: attr?.channel ?? null,
      },
    });

    // 3) Activité système d'entrée. RÈGLE N9 — hygiène : on signale un lead sans
    //    AUCUNE coordonnée (ni e-mail ni téléphone) pour qu'il soit complété et
    //    reste contactable (sans perdre la donnée).
    const contactless = !email && !phone;
    await prisma.activity.create({
      data: {
        type: 'SYSTEME',
        leadId: lead.id,
        contactId,
        content: `Lead reçu via ${input.source}${
          input.scoring?.tier ? ` — ${input.scoring.tier}` : ''
        }${contactless ? ' — ⚠ sans coordonnées (e-mail/téléphone à compléter)' : ''}`,
      },
    });
    if (contactless) {
      await prisma.activity.create({
        data: {
          type: 'RELANCE',
          leadId: lead.id,
          contactId,
          content: 'Compléter les coordonnées du contact (ni e-mail ni téléphone).',
          dueAt: new Date(),
        },
      });
    }

    return { leadId: lead.id, contactId };
  } catch (err) {
    // Non bloquant : on log mais on ne fait jamais échouer le formulaire
    console.error('[captureLead] échec persistance lead (non bloquant):', err);
    return null;
  }
}

/** Déduit la famille de service depuis le parcours diagnostic + réponses. */
export function serviceFromDiagnostic(
  path: 'fissure' | 'mur-porteur',
  answers: Record<string, unknown>
): ServiceType {
  if (path === 'mur-porteur') return ServiceType.MUR_PORTEUR;
  const manifestation = answers?.['MANIFESTATION'];
  const humidite = ['salpetre', 'moisissure', 'peinture', 'odeur'];
  if (typeof manifestation === 'string' && humidite.includes(manifestation)) {
    return ServiceType.HUMIDITE;
  }
  return ServiceType.FISSURES;
}

/** Mappe la réponse STATUT du formulaire vers l'enum OccupantStatus. */
export function occupantFromAnswer(statut?: unknown): OccupantStatus {
  switch (statut) {
    case 'proprietaire':
      return OccupantStatus.PROPRIETAIRE;
    case 'bailleur':
      return OccupantStatus.BAILLEUR;
    case 'locataire':
      return OccupantStatus.LOCATAIRE;
    case 'achat':
    case 'acheteur':
      return OccupantStatus.ACHETEUR;
    case 'investisseur':
    case 'marchand_de_biens':
      return OccupantStatus.INVESTISSEUR;
    default:
      return OccupantStatus.INCONNU;
  }
}
