import cryptoTiming from 'crypto';
import { prisma } from '@/lib/prisma';
import { normalizePhoneFR } from '@/lib/crm/phone';
import { captureLead } from '@/lib/crm/captureLead';
import { syncContactPhases } from '@/lib/crm/phase-sync';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Webhook APPEL ENTRANT (vague 2 de l'audit d'août 2026).
 *
 * Le téléphone porte ≈ 80 % des demandes IPB et n'était instrumenté nulle part :
 * toute la mesure (attribution, canal, scoring, SLA de rappel) ne couvrait que
 * les 20 % venus du site. Un numéro de suivi d'appel (Twilio, Ringover, CallRail,
 * OVH Télécom…) POST ici à chaque appel ; le CRM crée alors la fiche, le dossier
 * et l'activité horodatée — sans ressaisie, et avec le canal réellement à
 * l'origine de l'appel.
 *
 * Ce que l'endpoint garantit :
 *  - RÉUTILISE `captureLead` : mêmes règles que les formulaires du site
 *    (déduplication du contact par téléphone normalisé, rattachement à un
 *    dossier ouvert de moins de 90 j, attribution, activité) ;
 *  - un appel MANQUÉ crée une TÂCHE datée, pas une simple ligne d'historique —
 *    un appel manqué non rappelé est un lead perdu ;
 *  - idempotent sur l'identifiant d'appel du fournisseur (`callId`) : les
 *    webhooks sont rejoués, on ne veut pas deux fiches pour un appel.
 *
 * Sécurité : secret partagé `INBOUND_CALL_SECRET`, en en-tête `x-inbound-secret`
 * (recommandé) ou en query `?secret=` (compatibilité). Sans secret configuré,
 * l'endpoint refuse tout — comme le webhook e-mail entrant.
 *
 * Corps accepté (JSON ou form-encoded), champs tolérants aux fournisseurs :
 *   from | caller | From | callerNumber   → numéro de l'appelant (requis)
 *   callId | CallSid | uuid               → identifiant d'appel (idempotence)
 *   status | CallStatus                   → completed / no-answer / busy / failed
 *   duration | CallDuration               → durée en secondes
 *   to | called                           → numéro composé (= le canal tracé)
 *   name | callerName                     → nom si le fournisseur le connaît
 */

/** Statuts fournisseurs considérés comme « appel non abouti ». */
const MANQUE = ['no-answer', 'noanswer', 'busy', 'failed', 'canceled', 'cancelled', 'missed'];

function str(v: unknown): string {
  return typeof v === 'string' ? v.trim() : v == null ? '' : String(v).trim();
}

export async function POST(req: Request): Promise<Response> {
  const secret = process.env.INBOUND_CALL_SECRET;
  if (!secret) return new Response('Suivi d’appel non configuré', { status: 503 });

  const url = new URL(req.url);
  const provided = req.headers.get('x-inbound-secret') ?? url.searchParams.get('secret');
  const pa = Buffer.from(provided ?? '');
  const pb = Buffer.from(secret);
  if (pa.length !== pb.length || !cryptoTiming.timingSafeEqual(pa, pb)) {
    return new Response('Non autorisé', { status: 401 });
  }

  let body: Record<string, unknown> = {};
  try {
    const ct = req.headers.get('content-type') ?? '';
    if (ct.includes('application/json')) {
      body = (await req.json()) as Record<string, unknown>;
    } else {
      const form = await req.formData();
      body = Object.fromEntries(
        [...form.entries()].map(([k, v]) => [k, typeof v === 'string' ? v : ''])
      );
    }
  } catch {
    return new Response('Corps illisible', { status: 400 });
  }

  const phone = normalizePhoneFR(
    str(body.from ?? body.caller ?? body.From ?? body.callerNumber ?? body.Caller)
  );
  if (!phone) return new Response('Numéro appelant manquant', { status: 400 });

  const callId = str(body.callId ?? body.CallSid ?? body.uuid ?? body.id);
  const status = str(body.status ?? body.CallStatus).toLowerCase();
  const manque = MANQUE.includes(status);
  const duree = Number(str(body.duration ?? body.CallDuration)) || 0;
  const compose = str(body.to ?? body.called ?? body.To);
  const nom = str(body.name ?? body.callerName ?? body.CallerName);

  // Idempotence : un webhook rejoué ne doit pas créer une seconde fiche. La
  // trace de l'appel porte son identifiant, qui sert de clé de recherche.
  if (callId) {
    const deja = await prisma.activity.findFirst({
      where: { type: 'APPEL', content: { contains: `[${callId}]` } },
      select: { id: true },
    });
    if (deja) return Response.json({ ok: true, duplicate: true });
  }

  const existant = await prisma.contact.findFirst({
    where: { phone },
    select: { id: true, name: true },
  });

  // Libellé de l'appel : ce que le gérant lira dans la timeline.
  const detail = [
    manque ? '📵 Appel MANQUÉ' : '📞 Appel entrant',
    duree > 0 ? `${Math.round(duree / 60)} min` : null,
    compose ? `ligne ${compose}` : null,
    callId ? `[${callId}]` : null,
  ]
    .filter(Boolean)
    .join(' · ');

  let contactId = existant?.id ?? null;
  let leadId: string | null = null;
  let cree = false;

  if (contactId) {
    // Client connu : on trace l'appel sur sa fiche et sur son dossier ouvert.
    const ouvert = await prisma.lead.findFirst({
      where: { contactId, stage: { notIn: ['PERDU', 'GAGNE'] } },
      orderBy: { createdAt: 'desc' },
      select: { id: true },
    });
    leadId = ouvert?.id ?? null;
  } else {
    // Inconnu : c'est une NOUVELLE demande. `captureLead` applique exactement
    // les mêmes règles que les formulaires du site — un seul endroit décide de
    // ce qu'est un lead, quel que soit le canal d'entrée.
    const res = await captureLead({
      // `RAPPEL` est la valeur d'énumération la plus proche d'un appel ; le canal
      // `PHONE` porte l'information exacte. Une valeur `TELEPHONE` dédiée est une
      // migration d'une ligne, à faire quand une autre passera de toute façon.
      source: 'RAPPEL',
      service: 'AUTRE',
      contact: {
        name: nom || `Appel ${phone}`,
        phone,
      },
      summary: manque ? 'Appel manqué — à rappeler' : 'Appel entrant',
      payload: { canal: 'PHONE', callId, status, duree, ligne: compose },
      // Le numéro composé EST le canal : une ligne de suivi par campagne
      // (Ads, plaquette, annuaire) attribue l'appel à sa source.
      attribution: { channel: 'PHONE', utmSource: compose || null },
    }).catch(() => null);
    contactId = res?.contactId ?? null;
    leadId = res?.leadId ?? null;
    cree = Boolean(res);
  }

  if (!contactId) {
    // Base indisponible : on accuse réception pour que le fournisseur ne rejoue
    // pas indéfiniment, mais on le dit dans la réponse.
    return Response.json({ ok: false, reason: 'contact non créé' }, { status: 200 });
  }

  await prisma.activity.create({
    data: { type: 'APPEL', contactId, leadId, content: detail },
  });

  // Un appel manqué est une TÂCHE, pas une ligne d'historique : sans rappel,
  // c'est un lead perdu — et personne ne relit une timeline.
  if (manque) {
    await prisma.activity.create({
      data: {
        type: 'RELANCE',
        contactId,
        leadId,
        content: `Rappeler ${existant?.name ?? phone} — appel manqué${compose ? ` sur la ligne ${compose}` : ''}.`,
        dueAt: new Date(),
      },
    });
  }

  await syncContactPhases(contactId);

  return Response.json({ ok: true, contactId, leadId, cree, manque });
}
