import { prisma } from '@/lib/prisma';
import { euros, COMPANY } from '@/lib/crm/company';
import { verifyActionToken } from '@/lib/crm/client-actions';
import { SubmitButton } from '@/components/admin/submit-button';
import { confirmClientAction } from './actions';

export const dynamic = 'force-dynamic';

const OK: Record<string, { title: string; text: string }> = {
  accept: {
    title: 'Devis validé — merci !',
    text: 'Votre accord est bien enregistré. Nous vous recontactons très vite pour planifier la visite sur site.',
  },
  recu: {
    title: 'Bien noté, merci !',
    text: 'Nous avons enregistré la réception de votre facture. Dès réception de votre règlement, votre rapport vous sera transmis sous 3 à 5 jours ouvrés.',
  },
  paye: {
    title: 'Merci pour votre règlement',
    text: "Nous vérifions la réception du virement et finalisons votre rapport d'expertise. Vous serez informé(e) par e-mail.",
  },
};

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-7 text-center shadow-sm">
        <p className="mb-4 text-sm font-bold tracking-tight text-slate-900">{COMPANY.name}</p>
        {children}
      </div>
    </main>
  );
}

export default async function ClientActionPage({
  searchParams,
}: {
  searchParams: { t?: string; ok?: string; err?: string };
}) {
  const token = searchParams.t ?? '';

  if (searchParams.ok && OK[searchParams.ok]) {
    const m = OK[searchParams.ok];
    return (
      <Shell>
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-2xl">
          ✓
        </div>
        <h1 className="text-lg font-semibold text-slate-900">{m.title}</h1>
        <p className="mt-2 text-sm text-slate-600">{m.text}</p>
      </Shell>
    );
  }

  const p = searchParams.err ? null : verifyActionToken(token);
  if (!p) {
    return (
      <Shell>
        <h1 className="text-lg font-semibold text-slate-900">Lien invalide ou expiré</h1>
        <p className="mt-2 text-sm text-slate-600">
          Ce lien n'est plus valable. Répondez à notre e-mail ou appelez-nous au{' '}
          <strong>{COMPANY.phone}</strong>, nous nous occupons de tout.
        </p>
      </Shell>
    );
  }

  let heading = '';
  let summary = '';
  let cta = '';
  let note = '';

  if (p.k === 'devis-accept') {
    const devis = await prisma.devis.findUnique({
      where: { id: p.id },
      include: { contact: true },
    });
    if (!devis) return invalidShell();
    if (devis.status === 'ACCEPTE') {
      return (
        <Shell>
          <h1 className="text-lg font-semibold text-slate-900">Devis déjà validé</h1>
          <p className="mt-2 text-sm text-slate-600">
            Votre accord pour le devis {devis.number} est bien enregistré. Merci !
          </p>
        </Shell>
      );
    }
    heading = 'Validation de votre devis';
    summary = `Devis ${devis.number} · ${euros(Number(devis.totalHT))} HT`;
    cta = 'Je valide mon devis (Bon pour accord)';
    note = 'En cliquant, vous donnez votre accord pour la réalisation de la mission décrite dans le devis.';
  } else {
    const facture = await prisma.facture.findUnique({
      where: { id: p.id },
      include: { contact: true },
    });
    if (!facture) return invalidShell();
    if (p.k === 'facture-recu') {
      heading = 'Réception de votre facture';
      summary = `Facture ${facture.number} · ${euros(Number(facture.totalHT))} HT`;
      cta = "J'ai bien reçu la facture";
      note = 'Cela nous confirme que la facture vous est bien parvenue.';
    } else {
      heading = 'Déclaration de paiement';
      summary = `Facture ${facture.number} · ${euros(Number(facture.totalHT))} HT`;
      cta = "J'ai effectué le paiement";
      note = 'Nous vérifierons la réception du virement, puis finaliserons votre rapport.';
    }
  }

  return (
    <Shell>
      <h1 className="text-lg font-semibold text-slate-900">{heading}</h1>
      <p className="mt-2 rounded-lg bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-700">
        {summary}
      </p>
      <form action={confirmClientAction} className="mt-5">
        <input type="hidden" name="t" value={token} />
        <SubmitButton
          spinner
          pendingLabel="Enregistrement…"
          className="w-full rounded-lg bg-orange-600 px-4 py-3 text-sm font-semibold text-white hover:bg-orange-700"
        >
          {cta}
        </SubmitButton>
      </form>
      <p className="mt-3 text-xs text-slate-400">{note}</p>
    </Shell>
  );
}

function invalidShell() {
  return (
    <Shell>
      <h1 className="text-lg font-semibold text-slate-900">Document introuvable</h1>
      <p className="mt-2 text-sm text-slate-600">
        Ce document n'existe plus. Contactez-nous au <strong>{COMPANY.phone}</strong>.
      </p>
    </Shell>
  );
}
