'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { revalidateCrm } from '@/lib/crm/revalidate';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth-helpers';
import { nextFactureNumber } from '@/lib/crm/numbering';
import {
  createCalendarEvent,
  updateCalendarEvent,
  deleteCalendarEvent,
  isCalendarConfigured,
} from '@/lib/google/calendar';
import {
  notifyClientAppointment,
  notifyClientCancellation,
} from '@/lib/crm/notify';
import { sendEmail } from '@/lib/email';
import { signBookingToken } from '@/lib/crm/booking';
import { proposalEmailHtml } from '@/lib/crm/appointment-proposal';
import { AppointmentStatus, AppointmentType } from '@prisma/client';

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://www.ipb-expertise.fr';

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

// Tournure « objet » insérée dans l'e-mail de proposition de créneaux.
const PROPOSAL_OBJET: Record<AppointmentType, string> = {
  DIAGNOSTIC_FISSURES: 'votre diagnostic fissures',
  DIAGNOSTIC_HUMIDITE: 'votre diagnostic humidité',
  EXPERTISE_ACHAT: 'votre expertise avant achat',
  MUR_PORTEUR: "votre étude d'ouverture de mur porteur",
  LANCEMENT_TRAVAUX: 'le lancement de vos travaux',
  AUTRE: 'votre intervention',
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
  revalidateCrm(contactId);
  redirect('/admin/agenda?ok=rdv');
}

export async function updateAppointmentStatus(formData: FormData) {
  await requireUser();
  const id = str(formData.get('appointmentId'));
  const status = str(formData.get('status'));
  if (!id || !(status in AppointmentStatus)) return;
  const appt = await prisma.appointment.update({
    where: { id },
    data: { status: status as AppointmentStatus },
    select: { leadId: true, contactId: true, googleEventId: true },
  });
  // Si réalisé et lead encore en amont, marquer « visite faite »
  if (status === 'REALISE' && appt.leadId) {
    await prisma.lead.updateMany({
      where: { id: appt.leadId, stage: { in: ['RDV_PLANIFIE'] } },
      data: { stage: 'VISITE_FAITE' },
    });
  }
  // Annulation : retirer l'événement Google (Google notifie le client) ; sinon
  // envoyer l'e-mail d'annulation maison.
  if (status === 'ANNULE') {
    if (appt.googleEventId) {
      await deleteCalendarEvent(appt.googleEventId);
      await prisma.appointment.update({
        where: { id },
        data: { googleEventId: null },
      });
    }
    if (!isCalendarConfigured()) {
      await notifyClientCancellation(id);
    }
  }
  revalidatePath('/admin/agenda');
  revalidateCrm(appt.contactId);
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
  revalidateCrm(appt.contactId);
}

/**
 * Supprime DÉFINITIVEMENT un rendez-vous : retiré de l'agenda Google ET de la
 * base (disparaît de la liste). Pour les RDV créés par erreur / doublons. Ne
 * notifie pas le client (≠ « Annuler » qui envoie un e-mail d'annulation).
 */
export async function deleteAppointment(formData: FormData) {
  await requireUser();
  const id = str(formData.get('appointmentId'));
  if (!id) return;
  const appt = await prisma.appointment.findUnique({
    where: { id },
    select: { googleEventId: true, contactId: true, leadId: true, title: true, start: true },
  });
  if (!appt) return;
  if (appt.googleEventId) {
    await deleteCalendarEvent(appt.googleEventId);
  }
  await prisma.appointment.delete({ where: { id } });
  await prisma.activity.create({
    data: {
      type: 'SYSTEME',
      contactId: appt.contactId,
      leadId: appt.leadId,
      content: `RDV supprimé : ${appt.title} — ${appt.start.toLocaleString('fr-FR')}`,
    },
  });
  revalidatePath('/admin/agenda');
  revalidateCrm(appt.contactId);
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

  // Montant = celui du devis diagnostic accepté du client (cohérence devis ↔
  // facture) ; à défaut le tarif par défaut, modifiable ensuite sur la facture.
  const devisAccepte = await prisma.devis.findFirst({
    where: { contactId: appt.contactId, status: 'ACCEPTE', serviceType: { not: 'AUTRE' } },
    orderBy: { acceptedAt: 'desc' },
    select: { totalHT: true },
  });
  const prix = devisAccepte ? Number(devisAccepte.totalHT) : DIAGNOSTIC_PRICE;

  const facture = await prisma.facture.create({
    data: {
      number,
      contactId: appt.contactId,
      object,
      dueDate: due,
      totalHT: prix,
      lines: {
        create: [
          {
            designation: object,
            detail: appt.location || null,
            unit: 'Forfait',
            qty: 1,
            unitPrice: prix,
            total: prix,
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
  revalidateCrm(appt.contactId);
  redirect(`/admin/factures/${facture.id}?ok=facture`);
}

/**
 * Propose au client PLUSIEURS créneaux par e-mail (depuis l'Agenda). Chaque
 * créneau est un bouton cliquable → /rdv?t=<token> qui crée le RDV en ligne.
 * Aucun RDV n'est créé maintenant : ils le sont quand le client choisit. Permet
 * d'utiliser l'Agenda à la fois pour ENREGISTRER et pour PROPOSER des RDV.
 */
export async function sendAppointmentProposals(formData: FormData) {
  await requireUser();
  const contactId = str(formData.get('contactId'));
  const type = (str(formData.get('type')) || 'DIAGNOSTIC_FISSURES') as AppointmentType;
  const leadId = str(formData.get('leadId')) || null;
  const message = str(formData.get('message')) || null;

  // Champs « slot » répétés (datetime-local) → dates futures, triées, max 6.
  const slots = formData
    .getAll('slot')
    .map((v) => new Date(String(v)))
    .filter((d) => !Number.isNaN(d.getTime()) && d.getTime() > Date.now())
    .sort((a, b) => a.getTime() - b.getTime())
    .slice(0, 6);

  if (!contactId || slots.length === 0) redirect('/admin/agenda?perr=slots');

  const contact = await prisma.contact.findUnique({
    where: { id: contactId },
    select: { name: true, email: true },
  });
  if (!contact?.email) redirect('/admin/agenda?perr=email');

  const objet = PROPOSAL_OBJET[type];
  const slotData = slots.map((date) => ({
    date,
    url: `${SITE}/rdv?t=${signBookingToken({
      c: contactId,
      s: date.toISOString(),
      ty: type,
      ...(leadId ? { l: leadId } : {}),
    })}`,
  }));

  const res = await sendEmail({
    to: contact.email,
    subject: `Proposition de créneaux — ${TYPE_OBJECT[type]} · IPB`,
    html: proposalEmailHtml({ clientName: contact.name, objet, slots: slotData, message }),
  });

  if (res.success) {
    await prisma.activity.create({
      data: {
        type: 'EMAIL',
        contactId,
        leadId,
        content: `Proposition de ${slots.length} créneau(x) envoyée à ${contact.email} (${TYPE_OBJECT[type]}).`,
      },
    });
  }

  revalidatePath('/admin/agenda');
  revalidateCrm(contactId);
  redirect(res.success ? '/admin/agenda?proposed=1' : '/admin/agenda?perr=send');
}
