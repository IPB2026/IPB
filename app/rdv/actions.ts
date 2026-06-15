'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { verifyBookingToken } from '@/lib/crm/booking';
import { revalidateCrm } from '@/lib/crm/revalidate';
import { createCalendarEvent, isCalendarConfigured } from '@/lib/google/calendar';
import { notifyClientAppointment } from '@/lib/crm/notify';
import type { AppointmentType } from '@prisma/client';

const VISIT_TYPE: Record<string, AppointmentType> = {
  FISSURES: 'DIAGNOSTIC_FISSURES',
  HUMIDITE: 'DIAGNOSTIC_HUMIDITE',
  EXPERTISE_ACHAT: 'EXPERTISE_ACHAT',
  MUR_PORTEUR: 'MUR_PORTEUR',
};
const TYPE_TITLE: Record<AppointmentType, string> = {
  DIAGNOSTIC_FISSURES: 'Diagnostic pathologies de fissures',
  DIAGNOSTIC_HUMIDITE: 'Diagnostic humidité et infiltrations',
  EXPERTISE_ACHAT: 'Expertise structurelle avant achat',
  MUR_PORTEUR: 'Étude de faisabilité ouverture de mur porteur',
  LANCEMENT_TRAVAUX: 'Lancement / coordination des travaux',
  AUTRE: 'Visite technique IPB',
};

/**
 * Confirmation EN LIGNE d'un créneau par le client (depuis l'e-mail de devis).
 * Endpoint public protégé par la signature du token (verifyBookingToken). Crée
 * le RDV dans l'agenda (+ Google), avance le pipeline, prévient en interne.
 * Idempotent : si le créneau est déjà réservé, on ne crée pas de doublon.
 */
export async function confirmBooking(formData: FormData): Promise<void> {
  const token = String(formData.get('t') ?? '');
  const p = verifyBookingToken(token);
  if (!p) redirect('/rdv?err=1');

  const start = new Date(p.s);
  if (Number.isNaN(start.getTime())) redirect('/rdv?err=1');

  // Idempotence : créneau déjà confirmé pour ce client → page de succès.
  const existing = await prisma.appointment.findFirst({
    where: { contactId: p.c, start, status: { not: 'ANNULE' } },
    select: { id: true },
  });
  if (existing) redirect(`/rdv?ok=1&t=${encodeURIComponent(token)}`);

  const contact = await prisma.contact.findUnique({ where: { id: p.c } });
  if (!contact) redirect('/rdv?err=1');
  const devis = await prisma.devis.findUnique({
    where: { id: p.d },
    select: { serviceType: true, leadId: true, bienConcerne: true },
  });

  const type = VISIT_TYPE[devis?.serviceType ?? ''] ?? 'DIAGNOSTIC_FISSURES';
  const title = TYPE_TITLE[type];
  const end = new Date(start.getTime() + 60 * 60000);
  const location = devis?.bienConcerne || contact.address || null;

  const googleEventId = await createCalendarEvent({
    summary: `IPB — ${title}`,
    location: location ?? undefined,
    start,
    end,
    attendeeEmail: contact.email,
    attendeeName: contact.name,
  });

  const appt = await prisma.appointment.create({
    data: {
      contactId: p.c,
      leadId: devis?.leadId ?? null,
      devisId: p.d,
      title,
      type,
      start,
      end,
      location,
      googleEventId,
    },
  });

  await prisma.activity.create({
    data: {
      type: 'RDV',
      contactId: p.c,
      leadId: devis?.leadId ?? null,
      content: `Visite confirmée EN LIGNE par le client — ${start.toLocaleString('fr-FR')}`,
    },
  });

  // Le pipeline avance automatiquement.
  if (devis?.leadId) {
    await prisma.lead.updateMany({
      where: {
        id: devis.leadId,
        stage: { in: ['NOUVEAU', 'A_RAPPELER', 'DEVIS_ENVOYE'] },
      },
      data: { stage: 'RDV_PLANIFIE' },
    });
  }

  // Sans Google, on envoie la confirmation maison ; sinon Google envoie l'invitation.
  if (!isCalendarConfigured()) {
    await notifyClientAppointment(appt.id);
  }

  revalidatePath('/admin/agenda');
  revalidateCrm(p.c);
  redirect(`/rdv?ok=1&t=${encodeURIComponent(token)}`);
}
