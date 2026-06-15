import 'server-only';
import crypto from 'crypto';

/**
 * Jeton signé pour la réservation EN LIGNE d'un créneau de visite par le client.
 * Chaque créneau proposé dans l'e-mail de devis porte un lien `/rdv?t=<token>`.
 * Le token encode {devisId, contactId, créneau} + signature HMAC : aucune donnée
 * stockée en base (zéro migration), et le client ne peut pas forger un autre
 * créneau (signature vérifiée côté serveur avant création du RDV).
 */

export interface BookingPayload {
  d: string; // devisId
  c: string; // contactId
  s: string; // début du créneau (ISO)
}

function secret(): string {
  return process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || '';
}

export function signBookingToken(p: BookingPayload): string {
  const body = Buffer.from(JSON.stringify(p)).toString('base64url');
  const sig = crypto.createHmac('sha256', secret()).update(body).digest('base64url');
  return `${body}.${sig}`;
}

export function verifyBookingToken(token: string | undefined | null): BookingPayload | null {
  if (!token || !secret()) return null;
  const [body, sig] = token.split('.');
  if (!body || !sig) return null;
  const expected = crypto.createHmac('sha256', secret()).update(body).digest('base64url');
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    const p = JSON.parse(Buffer.from(body, 'base64url').toString()) as BookingPayload;
    if (!p.d || !p.c || !p.s) return null;
    if (Number.isNaN(new Date(p.s).getTime())) return null;
    return p;
  } catch {
    return null;
  }
}

/** Libellé lisible d'un créneau (e-mail, page de confirmation). */
export function slotLabelLong(d: Date): string {
  return d.toLocaleString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
