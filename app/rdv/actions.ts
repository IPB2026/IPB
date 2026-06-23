'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { verifyBookingToken } from '@/lib/crm/booking';
import { revalidateCrm } from '@/lib/crm/revalidate';
import { sendAppointmentInvites } from '@/lib/crm/appointment-invites';
import { notifyClientAppointment, notifyAdminBooking } from '@/lib/crm/notify';
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
  // Proposition liée à un devis (e-mail de devis) OU proposition libre depuis
  // l'Agenda (sans devis : le type est porté par le token).
  const devis = p.d
    ? await prisma.devis.findUnique({
        where: { id: p.d },
        select: { serviceType: true, leadId: true, bienConcerne: true },
      })
    : null;

  const type: AppointmentType = devis
    ? VISIT_TYPE[devis.serviceType ?? ''] ?? 'DIAGNOSTIC_FISSURES'
    : p.ty && p.ty in TYPE_TITLE
      ? (p.ty as AppointmentType)
      : 'DIAGNOSTIC_FISSURES';
  const title = TYPE_TITLE[type];
  const leadId = devis?.leadId ?? p.l ?? null;
  const end = new Date(start.getTime() + 60 * 60000);
  const location = devis?.bienConcerne || contact.address || null;

  // Diagnostiqueur = expert assigné au DOSSIER (lead), s'il existe → rattaché au
  // RDV pour que la 2e invitation Google parte vers lui.
  let assignedToId: string | null = null;
  if (leadId) {
    const lead = await prisma.lead.findUnique({
      where: { id: leadId },
      select: { assignedToId: true },
    });
    assignedToId = lead?.assignedToId ?? null;
  }

  const appt = await prisma.appointment.create({
    data: {
      contactId: p.c,
      leadId,
      devisId: p.d ?? null,
      title,
      type,
      start,
      end,
      location,
      assignedToId,
    },
  });

  // Réserver un créneau lié à un devis = accord tacite → on marque le devis
  // ACCEPTÉ (s'il ne l'était pas). Fiabilise le pipe, le montant signé et le
  // fallback de facturation. Borné au contact du token (anti-escalade).
  if (p.d) {
    await prisma.devis.updateMany({
      where: { id: p.d, contactId: p.c, status: 'ENVOYE' },
      data: { status: 'ACCEPTE', acceptedAt: new Date() },
    });
  }

  await prisma.activity.create({
    data: {
      type: 'RDV',
      contactId: p.c,
      leadId,
      content: `Visite confirmée EN LIGNE par le client — ${start.toLocaleString('fr-FR')}`,
    },
  });

  // Le pipeline avance automatiquement. On VÉRIFIE que le lead appartient bien au
  // contact qui confirme (contactId: p.c) : un token au leadId incohérent ne peut
  // pas faire avancer le dossier d'un autre client.
  if (leadId) {
    await prisma.lead.updateMany({
      where: {
        id: leadId,
        contactId: p.c,
        stage: { in: ['NOUVEAU', 'A_RAPPELER', 'DEVIS_ENVOYE'] },
      },
      data: { stage: 'RDV_PLANIFIE' },
    });
  }

  // Invitations Google : client (adresse + confirmation) + diagnostiqueur (adresse
  // + date + heure). Sans Google, on envoie la confirmation maison au client. Si
  // aucun diagnostiqueur n'est assigné au dossier, on trace l'alerte.
  const invites = await sendAppointmentInvites(appt.id);
  if (!invites.configured) {
    await notifyClientAppointment(appt.id);
  } else if (invites.expertMissing) {
    await prisma.activity.create({
      data: {
        type: 'SYSTEME',
        contactId: p.c,
        leadId,
        content:
          'Invitation diagnostiqueur non envoyée — aucun expert assigné au dossier. Assignez un diagnostiqueur puis renvoyez les invitations depuis l’agenda.',
      },
    });
  }

  // Alerte le gérant : le client vient de CHOISIR UNE DATE → notification immédiate
  // (coordonnées + lien fiche) pour préparer la visite. Non bloquant.
  await notifyAdminBooking(appt.id);

  revalidatePath('/admin/agenda');
  revalidateCrm(p.c);
  redirect(`/rdv?ok=1&t=${encodeURIComponent(token)}`);
}
