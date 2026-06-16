import 'server-only';

/**
 * Intégration Google Calendar (Phase 4) — appels REST directs (aucune dépendance
 * `googleapis`). Authentification OAuth2 par refresh token : on échange le
 * refresh token contre un access token (mis en cache ~1 h) à chaque besoin.
 *
 * Env requis (sinon tout est no-op et l'agenda reste purement interne) :
 *   GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN
 *   GOOGLE_CALENDAR_ID (optionnel, défaut "primary")
 *
 * Les RDV portent une invitation au client (`sendUpdates=all`) : Google envoie
 * l'invitation, la mise à jour et l'annulation directement au client.
 */

const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const CAL_BASE = 'https://www.googleapis.com/calendar/v3';
const TIME_ZONE = 'Europe/Paris';

export function isCalendarConfigured(): boolean {
  return Boolean(
    process.env.GOOGLE_CLIENT_ID &&
      process.env.GOOGLE_CLIENT_SECRET &&
      process.env.GOOGLE_REFRESH_TOKEN
  );
}

function calendarId(): string {
  return process.env.GOOGLE_CALENDAR_ID || 'primary';
}

// Cache mémoire du token d'accès (durée de vie ~1 h ; on garde une marge de 60 s).
let cachedToken: { token: string; exp: number } | null = null;

async function getAccessToken(): Promise<string | null> {
  if (!isCalendarConfigured()) return null;
  if (cachedToken && cachedToken.exp > Date.now() + 60_000) return cachedToken.token;

  try {
    const res = await fetch(TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID as string,
        client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
        refresh_token: process.env.GOOGLE_REFRESH_TOKEN as string,
        grant_type: 'refresh_token',
      }),
      cache: 'no-store',
    });
    if (!res.ok) {
      console.error(
        '[calendar] échec rafraîchissement token:',
        res.status,
        await res.text().catch(() => '')
      );
      return null;
    }
    const json = (await res.json()) as { access_token?: string; expires_in?: number };
    if (!json.access_token) return null;
    cachedToken = {
      token: json.access_token,
      exp: Date.now() + (json.expires_in ?? 3600) * 1000,
    };
    return json.access_token;
  } catch (err) {
    console.error('[calendar] exception rafraîchissement token:', err);
    return null;
  }
}

export interface CalendarEventInput {
  summary: string;
  description?: string;
  location?: string;
  start: Date;
  end: Date;
  attendeeEmail?: string | null;
  attendeeName?: string | null;
}

function eventBody(input: Partial<CalendarEventInput>): Record<string, unknown> {
  const body: Record<string, unknown> = {};
  if (input.summary !== undefined) body.summary = input.summary;
  if (input.description !== undefined) body.description = input.description;
  if (input.location !== undefined) body.location = input.location;
  if (input.start) body.start = { dateTime: input.start.toISOString(), timeZone: TIME_ZONE };
  if (input.end) body.end = { dateTime: input.end.toISOString(), timeZone: TIME_ZONE };
  if (input.attendeeEmail) {
    body.attendees = [
      { email: input.attendeeEmail, displayName: input.attendeeName ?? undefined },
    ];
  }
  return body;
}

/**
 * Crée un événement et envoie l'invitation au client. Renvoie l'ID de
 * l'événement Google, ou null si non configuré / erreur (non bloquant).
 */
export async function createCalendarEvent(
  input: CalendarEventInput
): Promise<string | null> {
  const token = await getAccessToken();
  if (!token) return null;
  try {
    const res = await fetch(
      `${CAL_BASE}/calendars/${encodeURIComponent(calendarId())}/events?sendUpdates=all`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(eventBody(input)),
        cache: 'no-store',
      }
    );
    if (!res.ok) {
      console.error('[calendar] échec création événement:', res.status, await res.text().catch(() => ''));
      return null;
    }
    const json = (await res.json()) as { id?: string };
    return json.id ?? null;
  } catch (err) {
    console.error('[calendar] exception création événement:', err);
    return null;
  }
}

/** Met à jour un événement existant (et notifie le client des changements). */
export async function updateCalendarEvent(
  eventId: string,
  input: Partial<CalendarEventInput>
): Promise<void> {
  if (!eventId) return;
  const token = await getAccessToken();
  if (!token) return;
  try {
    const res = await fetch(
      `${CAL_BASE}/calendars/${encodeURIComponent(calendarId())}/events/${encodeURIComponent(
        eventId
      )}?sendUpdates=all`,
      {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(eventBody(input)),
        cache: 'no-store',
      }
    );
    if (!res.ok) {
      console.error('[calendar] échec mise à jour événement:', res.status, await res.text().catch(() => ''));
    }
  } catch (err) {
    console.error('[calendar] exception mise à jour événement:', err);
  }
}

/** Supprime/annule un événement (envoie l'annulation au client). */
export async function deleteCalendarEvent(eventId: string): Promise<void> {
  if (!eventId) return;
  const token = await getAccessToken();
  if (!token) return;
  try {
    const res = await fetch(
      `${CAL_BASE}/calendars/${encodeURIComponent(calendarId())}/events/${encodeURIComponent(
        eventId
      )}?sendUpdates=all`,
      {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
      }
    );
    // 410 = déjà supprimé : on considère que c'est OK.
    if (!res.ok && res.status !== 410) {
      console.error('[calendar] échec suppression événement:', res.status, await res.text().catch(() => ''));
    }
  } catch (err) {
    console.error('[calendar] exception suppression événement:', err);
  }
}
