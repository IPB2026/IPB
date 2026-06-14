'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth-helpers';
import { nextFactureNumber } from '@/lib/crm/numbering';
import {
  createCalendarEvent,
  updateCalendarEvent,
  deleteCalendarEvent,
  isCalendarConfigured,
} from '@/lib/google/calendar';
import { notifyClientAppointment } from '@/lib/crm/notify';
import { AppointmentStatus, AppointmentType } from '@prisma/client';

// Gestion de l'agenda : réservée à l'ADMIN.
const requireUser = requireAdmin;

const str = (v: FormDataEntryValue | null) => String(v ?? '').trim();

// Tarif diagnostic par défaut (HT) — modifiable sur la facture générée.
const DIAGNOSTIC_PRICE = 400;

const TYPE_OBJECT: Record<AppointmentType, string> = {
  DIAGNOSTIC_FISSURES: 'Diagnostic pathologies de fissures',
  DIAGNOSTIC_HUMIDITE: 'Diagnostic humidité et infiltrations',
  EXPERTISE_ACHAT: 'Expertise structurelle avant achat',
  MUR_PORTEUR: 'Étude de faisabilité ouverture de mur porteur',
  LANCEMENT_TRAVAUX: 'Lancement / coordination des travaux',
  AUTRE: 'Intervention IPB',
};

export async function createAppointment(formData: FormData) {
  await requireUser();
  const contactId = str(formData.get('contactId'));
  const startRaw = str(formData.get('start'));
  if (!contactId || !startRaw) return;

  const start = new Date(startRaw);
  if (Number.isNaN(start.getTime())) return;
  const durationMin = Number(str(formData.get('durationMin'))) || 60;
  const end = new Date(start.getTime() + durationMin * 60000);

  const type = (str(formData.get('type')) || 'DIAGNOSTIC_FISSURES') as AppointmentType;
  const title = str(formData.get('title')) || TYPE_OBJECT[type];
  const location = str(formData.get('location')) || null;
  const notes = str(formData.get('notes')) || null;
  const leadId = str(formData.get('leadId')) || null;
  const devisId = str(formData.get('devisId')) || null;

  const contact = await prisma.contact.findUnique({ where: { id: contactId } });
  if (!contact) return;

  // Synchro Google Calendar (no-op tant que non configuré)
  const googleEventId = await createCalendarEvent({
    summary: `IPB — ${title}`,
    description: notes ?? undefined,
    location: location ?? undefined,
    start,
    end,
    attendeeEmail: contact.email,
    attendeeName: contact.name,
  });

  const appt = await prisma.appointment.create({
    data: {
      contactId,
      leadId,
      devisId,
      title,
      type,
      start,
      end,
      location,
      notes,
      googleEventId,
    },
  });

  // Trace + avance le pipeline
  await prisma.activity.create({
    data: {
      type: 'RDV',
      contactId,
      leadId,
      content: `RDV planifié : ${title} — ${start.toLocaleString('fr-FR')}`,
    },
  });

  // Accusé client automatique (confirmation de RDV) — non bloquant.
  // Si Google Agenda est connecté, c'est lui qui envoie l'invitation : on évite
  // alors de doubler avec l'e-mail maison.
  if (!isCalendarConfigured()) {
    await notifyClientAppointment(appt.id);
  }
  if (leadId) {
    const lead = await prisma.lead.findUnique({
      where: { id: leadId },
      select: { stage: true },
    });
    if (lead && ['NOUVEAU', 'A_RAPPELER'].includes(lead.stage)) {
      await prisma.lead.update({
        where: { id: leadId },
        data: { stage: 'RDV_PLANIFIE' },
      });
    }
  }

  revalidatePath('/admin/agenda');
  if (leadId) revalidatePath(`/admin/leads/${leadId}`);
  redirect('/admin/agenda');
}

export async function updateAppointmentStatus(formData: FormData) {
  await requireUser();
  const id = str(formData.get('appointmentId'));
  const status = str(formData.get('status'));
  if (!id || !(status in AppointmentStatus)) return;
  const appt = await prisma.appointment.update({
    where: { id },
    data: { status: status as AppointmentStatus },
    select: { leadId: true, googleEventId: true },
  });
  // Si réalisé et lead encore en amont, marquer « visite faite »
  if (status === 'REALISE' && appt.leadId) {
    await prisma.lead.updateMany({
      where: { id: appt.leadId, stage: { in: ['RDV_PLANIFIE'] } },
      data: { stage: 'VISITE_FAITE' },
    });
  }
  // Annulation : retirer l'événement Google (le client est notifié).
  if (status === 'ANNULE' && appt.googleEventId) {
    await deleteCalendarEvent(appt.googleEventId);
    await prisma.appointment.update({
      where: { id },
      data: { googleEventId: null },
    });
  }
  revalidatePath('/admin/agenda');
}

/**
 * Re-planifie un RDV existant (date/heure/lieu) et met à jour l'événement Google
 * (le client est notifié du changement). Évite le cycle annuler→recréer.
 */
export async function rescheduleAppointment(formData: FormData) {
  await requireUser();
  const id = str(formData.get('appointmentId'));
  const startRaw = str(formData.get('start'));
  if (!id || !startRaw) return;
  const start = new Date(startRaw);
  if (Number.isNaN(start.getTime())) return;
  const durationMin = Number(str(formData.get('durationMin'))) || 60;
  const end = new Date(start.getTime() + durationMin * 60000);
  const location = str(formData.get('location')) || null;

  const appt = await prisma.appointment.findUnique({
    where: { id },
    select: { googleEventId: true, contactId: true, leadId: true },
  });
  if (!appt) return;

  await prisma.appointment.update({
    where: { id },
    data: { start, end, location },
  });
  if (appt.googleEventId) {
    await updateCalendarEvent(appt.googleEventId, {
      start,
      end,
      location: location ?? undefined,
    });
  }
  await prisma.activity.create({
    data: {
      type: 'RDV',
      contactId: appt.contactId,
      leadId: appt.leadId,
      content: `RDV décalé au ${start.toLocaleString('fr-FR')}`,
    },
  });
  revalidatePath('/admin/agenda');
  if (appt.leadId) revalidatePath(`/admin/leads/${appt.leadId}`);
}

/**
 * Workflow facture-après-diagnostic : génère une facture pour l'intervention
 * réalisée et la lie au RDV. (L'envoi e-mail auto viendra en Phase F.)
 */
export async function generateInvoiceFromAppointment(formData: FormData) {
  await requireUser();
  const id = str(formData.get('appointmentId'));
  if (!id) return;

  const appt = await prisma.appointment.findUnique({
    where: { id },
    include: { contact: true, facture: true },
  });
  if (!appt || appt.facture) {
    // déjà facturé → aller sur la facture existante
    if (appt?.factureId) redirect(`/admin/factures/${appt.factureId}`);
    return;
  }

  const object = TYPE_OBJECT[appt.type];
  const number = await nextFactureNumber(appt.contact.name);
  const due = new Date();
  due.setDate(due.getDate() + 30);

  const facture = await prisma.facture.create({
    data: {
      number,
      contactId: appt.contactId,
      object,
      dueDate: due,
      totalHT: DIAGNOSTIC_PRICE,
      lines: {
        create: [
          {
            designation: object,
            detail: appt.location || null,
            unit: 'Forfait',
            qty: 1,
            unitPrice: DIAGNOSTIC_PRICE,
            total: DIAGNOSTIC_PRICE,
            position: 0,
          },
        ],
      },
    },
  });

  await prisma.appointment.update({
    where: { id },
    data: { factureId: facture.id, status: 'REALISE' },
  });

  revalidatePath('/admin/agenda');
  revalidatePath('/admin/factures');
  redirect(`/admin/factures/${facture.id}`);
}
