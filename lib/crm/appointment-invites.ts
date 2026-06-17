import 'server-only';
import { prisma } from '@/lib/prisma';
import {
  createCalendarEvent,
  updateCalendarEvent,
  isCalendarConfigured,
  type CalendarEventInput,
} from '@/lib/google/calendar';
import { slotLabelLong } from '@/lib/crm/booking';
import { COMPANY } from '@/lib/crm/company';

export interface InviteResult {
  /** Google Agenda configuré ? Sinon tout est no-op (repli e-mail maison côté appelant). */
  configured: boolean;
  /** Invitation client créée/mise à jour. */
  clientEventId: string | null;
  /** Invitation diagnostiqueur créée/mise à jour. */
  expertEventId: string | null;
  /** Aucun diagnostiqueur (expert) assigné au dossier → 2e invitation non envoyée. */
  expertMissing: boolean;
}

/**
 * (Re)envoie les DEUX invitations Google Agenda d'un rendez-vous de diagnostic :
 *   1) CLIENT          — adresse du lieu + message de confirmation dans le corps.
 *   2) DIAGNOSTIQUEUR  — (= expert assigné au dossier) adresse + date + heure.
 *
 * Idempotent : si un événement existe déjà (au renvoi / décalage), on le MET À JOUR
 * (Google notifie l'invité) au lieu d'en recréer un → pas de doublon. Les IDs Google
 * sont persistés sur l'Appointment. Non bloquant : un échec Google est journalisé.
 *
 * Le diagnostiqueur est l'expert assigné au DOSSIER (lead) ; repli sur l'expert
 * directement rattaché au RDV. S'il n'y en a pas, seule l'invitation client part
 * et `expertMissing` vaut true (l'appelant trace une alerte).
 */
export async function sendAppointmentInvites(
  appointmentId: string,
  opts?: { message?: string | null }
): Promise<InviteResult> {
  const result: InviteResult = {
    configured: isCalendarConfigured(),
    clientEventId: null,
    expertEventId: null,
    expertMissing: false,
  };
  if (!result.configured) return result; // pas de Google → l'appelant gère le repli

  const appt = await prisma.appointment.findUnique({
    where: { id: appointmentId },
    include: {
      contact: true,
      lead: { include: { assignedTo: true } },
      assignedTo: true,
    },
  });
  if (!appt) return result;

  // Diagnostiqueur = expert du dossier (lead) ; à défaut, expert rattaché au RDV.
  const leadExpert =
    appt.lead?.assignedTo && appt.lead.assignedTo.role === 'EXPERT'
      ? appt.lead.assignedTo
      : null;
  const apptExpert =
    appt.assignedTo && appt.assignedTo.role === 'EXPERT' ? appt.assignedTo : null;
  const expert = leadExpert ?? apptExpert;

  const location = appt.location || appt.contact.address || null;
  const when = slotLabelLong(appt.start);
  const customMsg = opts?.message?.trim();

  result.clientEventId = appt.googleEventId;
  result.expertEventId = appt.googleEventIdExpert;

  // ── 1) Invitation CLIENT (adresse + confirmation) ────────────────────────
  if (appt.contact.email) {
    const description = [
      'Bonjour,',
      '',
      'Votre rendez-vous de diagnostic est confirmé. Notre diagnostiqueur se présentera à l’adresse indiquée ci-dessous.',
      '',
      location ? `📍 Lieu : ${location}` : null,
      `🗓️ ${when}`,
      customMsg ? `\n${customMsg}` : null,
      '',
      `Une question ou un imprévu ? Appelez le ${COMPANY.phone} ou répondez à cette invitation.`,
      '',
      COMPANY.name,
    ]
      .filter((l): l is string => l !== null)
      .join('\n');

    const input: CalendarEventInput = {
      summary: `IPB — ${appt.title}`,
      description,
      location: location ?? undefined,
      start: appt.start,
      end: appt.end,
      attendeeEmail: appt.contact.email,
      attendeeName: appt.contact.name,
    };
    if (appt.googleEventId) {
      await updateCalendarEvent(appt.googleEventId, input);
    } else {
      result.clientEventId = await createCalendarEvent(input);
    }
  }

  // ── 2) Invitation DIAGNOSTIQUEUR (adresse + date + heure) ────────────────
  if (expert?.email) {
    const description = [
      'Mission de diagnostic IPB.',
      '',
      `👤 Client : ${appt.contact.name}${appt.contact.phone ? ` — ${appt.contact.phone}` : ''}`,
      location ? `📍 Adresse : ${location}` : null,
      `🗓️ ${when}`,
      `🔧 Intervention : ${appt.title}`,
      appt.notes ? `\n📝 Notes : ${appt.notes}` : null,
      '',
      'Merci de confirmer votre présence.',
    ]
      .filter((l): l is string => l !== null)
      .join('\n');

    const input: CalendarEventInput = {
      summary: `Diagnostic IPB — ${appt.contact.name}`,
      description,
      location: location ?? undefined,
      start: appt.start,
      end: appt.end,
      attendeeEmail: expert.email,
      attendeeName: expert.name ?? undefined,
    };
    if (appt.googleEventIdExpert) {
      await updateCalendarEvent(appt.googleEventIdExpert, input);
    } else {
      result.expertEventId = await createCalendarEvent(input);
    }
  } else {
    result.expertMissing = true;
  }

  // Persiste les IDs si création (au renvoi/décalage, ils sont inchangés).
  if (
    result.clientEventId !== appt.googleEventId ||
    result.expertEventId !== appt.googleEventIdExpert
  ) {
    await prisma.appointment.update({
      where: { id: appt.id },
      data: {
        googleEventId: result.clientEventId,
        googleEventIdExpert: result.expertEventId,
      },
    });
  }

  return result;
}
