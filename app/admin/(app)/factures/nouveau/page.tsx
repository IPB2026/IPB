import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { guardAdminPage } from '@/lib/auth-helpers';
import { PageHeader } from '@/components/admin/page-header';
import { NewFactureForm } from '@/components/admin/new-facture-form';

export const dynamic = 'force-dynamic';

// Objet de facture par domaine — registre DIAGNOSTIC (sans « structurel » : IPB
// n'est pas un BET). Propre à la FACTURE ; ne touche pas au libellé du devis.
const FACTURE_OBJET_BY_SERVICE: Record<string, string> = {
  FISSURES: 'Diagnostic des pathologies de fissures',
  HUMIDITE: 'Diagnostic humidité et infiltrations',
  EXPERTISE_ACHAT: 'Diagnostic du bâti avant achat',
  MUR_PORTEUR: 'Étude de faisabilité — ouverture de mur porteur',
};

export default async function NewFacturePage({
  searchParams,
}: {
  searchParams: { contactId?: string };
}) {
  await guardAdminPage();
  const contacts = await prisma.contact
    .findMany({
      orderBy: { createdAt: 'desc' },
      take: 300,
      select: { id: true, name: true, city: true },
    })
    .catch(() => []);

  // Pré-remplissage par domaine : arrivé depuis une fiche client, on dérive
  // l'objet (gabarit du service du dossier) et le montant (devis diagnostic
  // accepté/envoyé le plus récent, sinon prix du diagnostic saisi sur le lead).
  let defaultObject = '';
  let defaultMontant = '';
  if (searchParams.contactId) {
    const cid = searchParams.contactId;
    const [lead, devis] = await Promise.all([
      prisma.lead
        .findFirst({
          where: { contactId: cid },
          orderBy: { createdAt: 'desc' },
          select: { service: true },
        })
        .catch(() => null),
      prisma.devis
        .findFirst({
          where: {
            contactId: cid,
            status: { in: ['ACCEPTE', 'ENVOYE'] },
            OR: [{ serviceType: { not: 'AUTRE' } }, { serviceType: null }],
          },
          orderBy: { createdAt: 'desc' },
          select: { totalHT: true },
        })
        .catch(() => null),
    ]);
    if (lead && lead.service !== 'AUTRE') {
      defaultObject = FACTURE_OBJET_BY_SERVICE[lead.service] ?? '';
    }
    // Le montant vient du PRIX DU DEVIS (coordination validée), pas d'une
    // estimation du lead. S'il n'y a pas encore de devis, on laisse vide.
    const m = devis ? Number(devis.totalHT) : 0;
    if (m > 0) defaultMontant = String(Math.round(m));
  }

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <Link
        href="/admin/factures"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Toutes les factures
      </Link>
      <PageHeader
        title="Nouvelle facture"
        subtitle="Facture directe (sans devis). TVA non applicable (art. 293 B)."
      />
      <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
        {contacts.length === 0 ? (
          <p className="text-sm text-slate-500">
            Aucun client en base. Créez d&apos;abord un prospect.
          </p>
        ) : (
          <NewFactureForm
            contacts={contacts}
            defaultContactId={searchParams.contactId}
            defaultObject={defaultObject}
            defaultMontant={defaultMontant}
          />
        )}
      </div>
    </div>
  );
}
