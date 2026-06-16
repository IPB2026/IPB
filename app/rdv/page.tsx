import { prisma } from '@/lib/prisma';
import { verifyBookingToken, slotLabelLong } from '@/lib/crm/booking';
import { confirmBooking } from './actions';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Confirmer votre visite — IPB',
  robots: { index: false, follow: false },
};

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-5 py-16">
      <div className="w-full rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
        <div className="mb-5 flex items-center gap-2.5">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-sm font-bold text-white">
            IPB
          </span>
          <span className="text-sm font-semibold text-slate-700">
            Institut de Pathologie du Bâtiment
          </span>
        </div>
        {children}
      </div>
    </main>
  );
}

export default async function RdvPage({
  searchParams,
}: {
  searchParams: { t?: string; ok?: string; err?: string };
}) {
  const token = searchParams.t ?? '';
  const payload = verifyBookingToken(token);

  if (searchParams.err || !payload) {
    return (
      <Shell>
        <h1 className="text-xl font-semibold text-slate-900">Lien invalide ou expiré</h1>
        <p className="mt-2 text-sm text-slate-600">
          Ce lien de confirmation n&apos;est plus valable. Répondez à notre e-mail
          ou appelez-nous, nous fixerons la visite ensemble.
        </p>
      </Shell>
    );
  }

  const start = new Date(payload.s);
  const dateStr = slotLabelLong(start);

  const existing = await prisma.appointment.findFirst({
    where: { contactId: payload.c, start, status: { not: 'ANNULE' } },
    select: { id: true },
  });
  const confirmed = searchParams.ok === '1' || Boolean(existing);

  if (confirmed) {
    return (
      <Shell>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Visite confirmée
        </span>
        <h1 className="mt-3 text-xl font-semibold text-slate-900">
          C&apos;est noté, merci !
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Votre visite de diagnostic est confirmée le&nbsp;:
        </p>
        <p className="mt-2 rounded-lg bg-slate-50 px-4 py-3 text-base font-semibold capitalize text-slate-900">
          {dateStr}
        </p>
        <p className="mt-3 text-sm text-slate-600">
          Vous recevrez les détails par e-mail. Le diagnostiqueur indépendant
          mandaté réalisera la visite ; le rapport vous sera remis sous 3 à 5
          jours ouvrés.
        </p>
      </Shell>
    );
  }

  return (
    <Shell>
      <h1 className="text-xl font-semibold text-slate-900">
        Confirmer votre visite de diagnostic
      </h1>
      <p className="mt-2 text-sm text-slate-600">
        Vous avez choisi le créneau suivant pour la visite sur site :
      </p>
      <p className="mt-3 rounded-lg bg-slate-50 px-4 py-3 text-base font-semibold capitalize text-slate-900">
        {dateStr}
      </p>
      <form action={confirmBooking} className="mt-5">
        <input type="hidden" name="t" value={token} />
        <button
          type="submit"
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-orange-600 px-5 text-base font-semibold text-white hover:bg-orange-700"
        >
          Confirmer ma visite
        </button>
      </form>
      <p className="mt-3 text-center text-xs text-slate-400">
        Un empêchement ? Répondez à notre e-mail, nous reproposerons un créneau.
      </p>
    </Shell>
  );
}
