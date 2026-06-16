'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/email';
import { COMPANY } from '@/lib/crm/company';
import { revalidateCrm } from '@/lib/crm/revalidate';
import { verifyActionToken } from '@/lib/crm/client-actions';

/** Destinataire des alertes internes : boîte équipe sinon 1er ADMIN. */
async function adminEmail(): Promise<string | null> {
  if (process.env.EMAIL_TO) return process.env.EMAIL_TO;
  const admin = await prisma.user
    .findFirst({ where: { role: 'ADMIN' }, select: { email: true } })
    .catch(() => null);
  return admin?.email ?? process.env.EMAIL_FROM ?? process.env.SMTP_USER ?? null;
}

function shell(title: string, body: string): string {
  return `
  <div style="font-family: Arial, sans-serif; background:#f8fafc; padding:24px;">
    <div style="max-width:560px; margin:0 auto; background:#fff; border:1px solid #e2e8f0; border-radius:14px; overflow:hidden;">
      <div style="background:#0F172A; color:#fff; padding:16px 22px;">
        <div style="font-size:15px; font-weight:700;">${COMPANY.name}</div>
        <div style="font-size:11px; opacity:.8; margin-top:2px;">${title}</div>
      </div>
      <div style="padding:20px 22px; color:#334155; font-size:14px; line-height:1.6;">${body}</div>
    </div>
  </div>`;
}

/** Action client en un clic depuis un e-mail. Idempotente. */
export async function confirmClientAction(formData: FormData): Promise<void> {
  const token = String(formData.get('t') ?? '');
  const p = verifyActionToken(token);
  if (!p) redirect('/c?err=1');

  const back = (code: string) => `/c?ok=${code}&t=${encodeURIComponent(token)}`;

  // ── Validation du devis (« Bon pour accord » en ligne) ──
  if (p.k === 'devis-accept') {
    const devis = await prisma.devis.findUnique({
      where: { id: p.id },
      include: { contact: true },
    });
    if (!devis) redirect('/c?err=1');
    // Idempotent : déjà accepté → page de succès. On n'accepte que depuis ENVOYE.
    if (devis.status === 'ACCEPTE') redirect(back('accept'));
    if (devis.status !== 'ENVOYE') redirect(back('accept'));

    await prisma.devis.update({
      where: { id: p.id },
      data: { status: 'ACCEPTE', acceptedAt: new Date() },
    });
    if (devis.leadId) {
      await prisma.lead.updateMany({
        where: {
          id: devis.leadId,
          contactId: devis.contactId,
          stage: { in: ['NOUVEAU', 'A_RAPPELER', 'DEVIS_ENVOYE'] },
        },
        data: { stage: 'RDV_PLANIFIE' },
      });
    }
    await prisma.activity.create({
      data: {
        type: 'SYSTEME',
        contactId: devis.contactId,
        leadId: devis.leadId,
        content: `Devis ${devis.number} VALIDÉ en ligne par le client (Bon pour accord).`,
      },
    });
    const to = await adminEmail();
    if (to) {
      await sendEmail({
        to,
        subject: `Devis accepté en ligne — ${devis.contact.name}`,
        html: shell(
          'Devis accepté',
          `Le client <strong>${devis.contact.name}</strong> vient de valider le devis <strong>${devis.number}</strong> en ligne. Prochaine étape : planifier la visite.`
        ),
      }).catch(() => {});
    }
    revalidatePath('/admin/devis');
    revalidateCrm(devis.contactId);
    redirect(back('accept'));
  }

  // ── Factures (accusé de réception / déclaration de paiement) ──
  const facture = await prisma.facture.findUnique({
    where: { id: p.id },
    include: { contact: true },
  });
  if (!facture) redirect('/c?err=1');

  if (p.k === 'facture-recu') {
    const already = await prisma.activity.findFirst({
      where: { contactId: facture.contactId, content: { contains: `accusé réception de la facture ${facture.number}` } },
      select: { id: true },
    });
    if (!already) {
      await prisma.activity.create({
        data: {
          type: 'SYSTEME',
          contactId: facture.contactId,
          content: `Le client a accusé réception de la facture ${facture.number}.`,
        },
      });
      if (facture.contact.email) {
        await sendEmail({
          to: facture.contact.email,
          subject: `Bien reçu — facture IPB ${facture.number}`,
          html: shell(
            'Accusé de réception',
            `Bonjour,<br/><br/>Merci d'avoir confirmé la réception de votre facture <strong>${facture.number}</strong>. Dès réception de votre règlement, nous finalisons et vous transmettons votre <strong>rapport d'expertise sous 3 à 5 jours ouvrés</strong>.<br/><br/>À très bientôt,<br/>${COMPANY.name}`
          ),
        }).catch(() => {});
      }
      revalidateCrm(facture.contactId);
    }
    redirect(back('recu'));
  }

  // facture-paye : DÉCLARATION de paiement → alerte admin (ne marque PAS payé auto :
  // l'admin vérifie le virement puis marque « Payée », ce qui débloque le rapport).
  const declared = await prisma.activity.findFirst({
    where: { contactId: facture.contactId, content: { contains: `DÉCLARE avoir payé la facture ${facture.number}` } },
    select: { id: true },
  });
  if (!declared) {
    await prisma.activity.create({
      data: {
        type: 'SYSTEME',
        contactId: facture.contactId,
        content: `Le client DÉCLARE avoir payé la facture ${facture.number} — à vérifier puis marquer payée.`,
      },
    });
    const to = await adminEmail();
    if (to) {
      await sendEmail({
        to,
        subject: `Paiement déclaré — facture ${facture.number} (${facture.contact.name})`,
        html: shell(
          'Paiement déclaré',
          `<strong>${facture.contact.name}</strong> déclare avoir réglé la facture <strong>${facture.number}</strong>.<br/><br/>Vérifiez le virement, puis marquez la facture « Payée » dans le CRM — cela débloque la phase « Rapport ».`
        ),
      }).catch(() => {});
    }
    revalidateCrm(facture.contactId);
  }
  redirect(back('paye'));
}
