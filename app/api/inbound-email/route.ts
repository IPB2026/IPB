import { prisma } from '@/lib/prisma';
import { normalizePhoneFR } from '@/lib/crm/phone';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Webhook E-MAIL ENTRANT (T4). Un fournisseur d'inbound parsing (Resend Inbound,
 * SendGrid Inbound Parse, Mailgun Routes, Postmark…) POST ici chaque réponse client.
 * On rattache la réponse au dossier (activité) et on MET EN PAUSE la séquence de
 * relances auto (le client a engagé la conversation → c'est au gérant de suivre).
 *
 * Sécurité : un secret partagé (INBOUND_EMAIL_SECRET) en en-tête `x-inbound-secret`
 * ou en query `?secret=`. Sans secret configuré, l'endpoint refuse tout.
 *
 * Corps accepté (souple, on tente plusieurs formats fournisseurs) :
 *   { from | sender | "From", subject, text | "stripped-text" | body, html }
 */
function extractEmail(raw: unknown): string | null {
  if (!raw) return null;
  const s = typeof raw === 'string' ? raw : (raw as { email?: string; address?: string }).email ?? (raw as { address?: string }).address ?? '';
  const m = String(s).match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  return m ? m[0].toLowerCase() : null;
}

export async function POST(req: Request): Promise<Response> {
  const secret = process.env.INBOUND_EMAIL_SECRET;
  if (!secret) return new Response('Inbound non configuré', { status: 503 });
  const url = new URL(req.url);
  const provided = req.headers.get('x-inbound-secret') ?? url.searchParams.get('secret');
  if (provided !== secret) return new Response('Non autorisé', { status: 401 });

  let body: Record<string, unknown> = {};
  try {
    const ct = req.headers.get('content-type') ?? '';
    if (ct.includes('application/json')) {
      body = (await req.json()) as Record<string, unknown>;
    } else {
      // form-encoded (SendGrid / Mailgun) → on récupère les champs utiles.
      const form = await req.formData();
      body = Object.fromEntries([...form.entries()].map(([k, v]) => [k, typeof v === 'string' ? v : '']));
    }
  } catch {
    return new Response('Corps illisible', { status: 400 });
  }

  const from = extractEmail(body.from ?? body.sender ?? body.From ?? body['from_email']);
  const subject = String(body.subject ?? body.Subject ?? '').slice(0, 200);
  const text = String(body.text ?? body['stripped-text'] ?? body['body-plain'] ?? body.body ?? '').slice(0, 600);
  if (!from) return new Response('Expéditeur manquant', { status: 400 });

  // Rattachement : par e-mail, sinon (si présent) par téléphone normalisé.
  const phone = normalizePhoneFR(String(body.phone ?? ''));
  const contact = await prisma.contact.findFirst({
    where: { OR: [{ email: from }, ...(phone ? [{ phone }] : [])] },
    select: { id: true },
  });
  if (!contact) {
    // Expéditeur inconnu : on accuse réception (200) pour ne pas faire réessayer le
    // fournisseur, mais on ne crée rien.
    return Response.json({ ok: true, matched: false });
  }

  await prisma.activity.create({
    data: {
      type: 'EMAIL',
      contactId: contact.id,
      content: `↩ Réponse client${subject ? ` — « ${subject} »` : ''}${text ? ` : ${text}` : ''}`,
    },
  });

  // PAUSE des relances auto : le client a répondu → on coupe la séquence d'e-mails
  // nurture (relanceStep au-delà du max) pour ne plus le solliciter automatiquement.
  await prisma.lead.updateMany({
    where: { contactId: contact.id },
    data: { relanceStep: 99 },
  });

  return Response.json({ ok: true, matched: true });
}
