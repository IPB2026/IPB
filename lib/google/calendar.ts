import 'server-only';

/**
 * Abstraction Google Calendar.
 *
 * Tant que les identifiants OAuth ne sont pas configurés, les fonctions sont
 * neutres (no-op) : l'agenda interne fonctionne, mais aucun événement Google
 * n'est créé. Quand les variables d'environnement seront en place, on branchera
 * `googleapis` ici sans toucher au reste de l'application.
 *
 * Env attendus (à venir) :
 *   GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN,
 *   GOOGLE_CALENDAR_ID (défaut: "primary")
 */

export function isCalendarConfigured(): boolean {
  return Boolean(
    process.env.GOOGLE_CLIENT_ID &&
      process.env.GOOGLE_CLIENT_SECRET &&
      process.env.GOOGLE_REFRESH_TOKEN
  );
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

/**
 * Crée un événement dans Google Calendar et envoie l'invitation à l'invité.
 * Renvoie l'ID de l'événement, ou null si Google n'est pas (encore) configuré.
 */
export async function createCalendarEvent(
  input: CalendarEventInput
): Promise<string | null> {
  if (!isCalendarConfigured()) return null;
  // TODO (quand les identifiants seront fournis) :
  //   const { google } = await import('googleapis');
  //   auth OAuth2 via refresh token → calendar.events.insert({
  //     calendarId, sendUpdates: 'all', requestBody: { summary, description,
  //     location, start:{dateTime}, end:{dateTime}, attendees:[{email}] } })
  //   return res.data.id;
  void input;
  return null;
}

export async function updateCalendarEvent(
  eventId: string,
  input: Partial<CalendarEventInput>
): Promise<void> {
  if (!isCalendarConfigured()) return;
  void eventId;
  void input;
}

export async function deleteCalendarEvent(eventId: string): Promise<void> {
  if (!isCalendarConfigured()) return;
  void eventId;
}
