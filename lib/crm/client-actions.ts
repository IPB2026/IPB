import 'server-only';
import crypto from 'crypto';

/**
 * Jetons signés pour les actions client EN UN CLIC depuis un e-mail (sans
 * compte, sans friction) : valider un devis, accuser réception d'une facture,
 * déclarer l'avoir payée. Le jeton encode {kind, id} + signature HMAC — aucune
 * donnée stockée, et le client ne peut pas forger une action sur un autre objet.
 * Même mécanisme que lib/crm/booking.ts (réservation de créneau).
 */

export type ClientActionKind = 'devis-accept' | 'facture-recu' | 'facture-paye';
const KINDS: ClientActionKind[] = ['devis-accept', 'facture-recu', 'facture-paye'];

export interface ActionToken {
  k: ClientActionKind;
  id: string;
}

function secret(): string {
  return process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || '';
}

export function signActionToken(p: ActionToken): string {
  const body = Buffer.from(JSON.stringify(p)).toString('base64url');
  const sig = crypto.createHmac('sha256', secret()).update(body).digest('base64url');
  return `${body}.${sig}`;
}

export function verifyActionToken(token: string | undefined | null): ActionToken | null {
  if (!token || !secret()) return null;
  const [body, sig] = token.split('.');
  if (!body || !sig) return null;
  const expected = crypto.createHmac('sha256', secret()).update(body).digest('base64url');
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    const p = JSON.parse(Buffer.from(body, 'base64url').toString()) as ActionToken;
    if (!p.id || !KINDS.includes(p.k)) return null;
    return p;
  } catch {
    return null;
  }
}
