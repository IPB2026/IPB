import Link from 'next/link';
import { ArrowLeft, Users, GitMerge } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { guardAdminPage } from '@/lib/auth-helpers';
import { PageHeader } from '@/components/admin/page-header';
import { EmptyState } from '@/components/admin/empty-state';
import { ConfirmSubmit } from '@/components/admin/confirm-submit';
import { normalizePhoneFR } from '@/lib/crm/phone';
import { mergeContacts } from '@/app/admin/(app)/contact-actions';

export const dynamic = 'force-dynamic';

type C = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  city: string | null;
  createdAt: Date;
  _count: { devis: number; factures: number; rapports: number; appointments: number };
};

/** Détecte les groupes de fiches partageant le MÊME téléphone (normalisé) ou e-mail. */
function findDuplicateGroups(contacts: C[]): C[][] {
  const byKey = new Map<string, C[]>();
  for (const c of contacts) {
    const keys = new Set<string>();
    const p = normalizePhoneFR(c.phone);
    if (p) keys.add('tel:' + p);
    if (c.email) keys.add('mail:' + c.email.toLowerCase());
    for (const k of keys) {
      const arr = byKey.get(k);
      if (arr) arr.push(c);
      else byKey.set(k, [c]);
    }
  }
  // Groupes de 2+ ; dédup (une même paire peut matcher par tel ET par e-mail).
  const seen = new Set<string>();
  const groups: C[][] = [];
  for (const arr of byKey.values()) {
    if (arr.length < 2) continue;
    const sig = arr.map((c) => c.id).sort().join('|');
    if (seen.has(sig)) continue;
    seen.add(sig);
    groups.push([...arr].sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime()));
  }
  return groups;
}

export default async function DoublonsPage() {
  await guardAdminPage();
  const contacts = (await prisma.contact.findMany({
    where: { archivedAt: null },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      city: true,
      createdAt: true,
      _count: { select: { devis: true, factures: true, rapports: true, appointments: true } },
    },
    take: 2000,
  })) as C[];

  const groups = findDuplicateGroups(contacts);

  return (
    <div className="space-y-5">
      <Link href="/admin/clients" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900">
        <ArrowLeft className="h-4 w-4" /> Tous les clients
      </Link>
      <PageHeader
        title="Doublons de fiches"
        subtitle={`${groups.length} groupe(s) de doublons détecté(s) — même téléphone ou e-mail.`}
      />

      {groups.length === 0 ? (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <EmptyState icon={Users} title="Aucun doublon" description="Toutes vos fiches sont uniques (téléphone et e-mail distincts)." />
        </div>
      ) : (
        <div className="space-y-4">
          {groups.map((group) => {
            const keep = group[0]; // le plus ancien = à conserver par défaut
            return (
              <div key={keep.id} className="overflow-hidden rounded-xl border border-amber-200 bg-amber-50/40">
                <div className="border-b border-amber-200 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-amber-700">
                  {keep.phone || keep.email} · {group.length} fiches
                </div>
                <ul className="divide-y divide-amber-100">
                  {group.map((c) => {
                    const isKeep = c.id === keep.id;
                    const docs = c._count.devis + c._count.factures + c._count.rapports + c._count.appointments;
                    return (
                      <li key={c.id} className="flex flex-wrap items-center justify-between gap-3 bg-white px-4 py-3">
                        <div className="min-w-0">
                          <Link href={`/admin/clients/${c.id}`} className="font-medium text-slate-900 hover:text-orange-600">
                            {c.name}
                          </Link>
                          {isKeep && (
                            <span className="ml-2 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                              à conserver
                            </span>
                          )}
                          <div className="text-xs text-slate-400">
                            {[c.email, c.phone, c.city].filter(Boolean).join(' · ')} · {docs} document(s) · créé le {c.createdAt.toLocaleDateString('fr-FR')}
                          </div>
                        </div>
                        {!isKeep && (
                          <form action={mergeContacts}>
                            <input type="hidden" name="targetId" value={keep.id} />
                            <input type="hidden" name="sourceId" value={c.id} />
                            <ConfirmSubmit
                              message={`Fusionner « ${c.name} » dans « ${keep.name} » ? Tout son historique (devis, factures, rapports, RDV) sera transféré, puis cette fiche supprimée. Action irréversible.`}
                              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                            >
                              <GitMerge className="h-3.5 w-3.5" /> Fusionner dans « {keep.name} »
                            </ConfirmSubmit>
                          </form>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
