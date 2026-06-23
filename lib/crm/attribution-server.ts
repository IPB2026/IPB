import 'server-only';
import { cookies } from 'next/headers';
import { ATTRIBUTION_COOKIE, parseAttribution, type Attribution } from './attribution';

/**
 * Lit l'attribution first-touch depuis le cookie (posé par AttributionTracker).
 * Appelé dans les server actions de capture de lead. Non bloquant : en cas de
 * souci, renvoie null (le lead est capturé sans attribution).
 */
export function readAttribution(): Attribution | null {
  try {
    return parseAttribution(cookies().get(ATTRIBUTION_COOKIE)?.value ?? null);
  } catch {
    return null;
  }
}
