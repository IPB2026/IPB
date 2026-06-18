import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth-helpers';
import { revalidateCrm } from '@/lib/crm/revalidate';
import { fetchLocationRisk, formatLocationRisk } from '@/lib/geo/georisques';
import {
  generateSkeleton,
  generateOneZone,
  generateSynthesis,
  isReportDraft,
  REPORT_MODEL,
  type ReportInput,
  type ReportZoneInput,
  type ReportPhotoInput,
  type ReportDraft,
  type ReportContent,
} from '@/lib/ai/report';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60; // plafond Hobby : chaque passe doit tenir dedans

/**
 * Génération PROGRESSIVE du rapport : une passe courte par appel (squelette →
 * une zone → … → synthèse). Le client ré-appelle jusqu'à `done: true`. Permet de
 * produire un rapport complet malgré le plafond de 60 s par fonction (Vercel Hobby).
 * Réservé à l'ADMIN (responsabilité éditoriale). Idempotent et REPRENABLE : l'état
 * intermédiaire vit dans Rapport.aiContent (forme « brouillon »).
 */
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: 'Non autorisé.' }, { status: 401 });
  }

  const id = params.id;
  const body = (await req.json().catch(() => ({}))) as { reset?: boolean };
  const reset = body.reset === true;

  const rapport = await prisma.rapport.findUnique({
    where: { id },
    include: { contact: true, photos: { orderBy: { position: 'asc' } } },
  });
  if (!rapport) return NextResponse.json({ error: 'Rapport introuvable.' }, { status: 404 });

  const zonesInput = (rapport.zonesInput as unknown as ReportZoneInput[]) ?? [];
  if (zonesInput.length === 0) {
    return NextResponse.json({ error: 'Ajoutez au moins une zone avant de générer.' }, { status: 400 });
  }

  const photos: ReportPhotoInput[] = rapport.photos.map((p) => ({
    url: p.url,
    caption: p.caption ?? undefined,
    zoneRef: p.zoneRef ?? undefined,
    gravite: p.gravite ?? undefined,
    contentType: p.contentType ?? undefined,
  }));

  const total = zonesInput.length + 2;

  // Reprise du brouillon si présent (et pas de reset explicite), sinon départ neuf.
  const existing = rapport.aiContent;
  const draft: ReportDraft =
    !reset && isReportDraft(existing)
      ? existing
      : { building: true, step: 0, total, model: REPORT_MODEL, locationRisk: null, zones: [] };

  // Données officielles de localisation : récupérées une seule fois (passe 0), réutilisées ensuite.
  let locationRisk: string | null = draft.locationRisk ?? null;
  if (draft.step === 0) {
    const adresse = [rapport.bienAdresse, rapport.ville].filter(Boolean).join(' ');
    if (adresse) {
      const risk = await fetchLocationRisk(adresse).catch(() => null);
      if (risk) locationRisk = formatLocationRisk(risk);
    }
  }

  const input: ReportInput = {
    type: rapport.type as ReportInput['type'],
    clientName: rapport.contact.name,
    bienAdresse: rapport.bienAdresse ?? undefined,
    ville: rapport.ville ?? undefined,
    zones: zonesInput,
    photos,
    locationRisk,
  };

  const fail = async (error: string) => {
    await prisma.rapport.update({ where: { id }, data: { aiContent: { error } } });
    revalidatePath(`/admin/rapports/${id}`);
    return NextResponse.json({ error }, { status: 502 });
  };

  // ── Passe 0 : squelette ──
  if (draft.step === 0) {
    const res = await generateSkeleton(input);
    if ('error' in res) return fail(res.error);
    draft.skeleton = res.data;
    draft.locationRisk = locationRisk;
    draft.step = 1;
  }
  // ── Passes 1..N : une zone ──
  else if (draft.step <= zonesInput.length) {
    const idx = draft.step - 1;
    const res = await generateOneZone(input, idx);
    if ('error' in res) return fail(res.error);
    draft.zones[idx] = res.data;
    draft.step += 1;
  }
  // ── Passe finale : synthèse + assemblage ──
  else {
    if (!draft.skeleton) return fail('Brouillon incohérent (squelette manquant). Relancez avec « Régénérer ».');
    const res = await generateSynthesis(input, draft.skeleton, draft.zones);
    if ('error' in res) return fail(res.error);
    const synth = res.data;
    const content: ReportContent = { ...draft.skeleton, zones: draft.zones, ...synth };
    await prisma.rapport.update({
      where: { id },
      data: {
        aiContent: content as unknown as object,
        aiModel: REPORT_MODEL,
        aiGeneratedAt: new Date(),
        status: 'GENERE',
        // Invariant : budgetHT renseigné UNIQUEMENT s'il y a une estimation.
        budgetHT: synth.estimationTravaux?.length ? synth.budgetHT ?? null : null,
      },
    });
    revalidatePath(`/admin/rapports/${id}`);
    revalidateCrm(rapport.contactId);
    return NextResponse.json({ done: true, step: total, total, label: 'Rapport généré' });
  }

  // Pas encore fini : on persiste le brouillon et on rend la main au client.
  await prisma.rapport.update({ where: { id }, data: { aiContent: draft as unknown as object } });
  revalidatePath(`/admin/rapports/${id}`);

  const label =
    draft.step <= zonesInput.length
      ? `Analyse des zones (${draft.step - 1}/${zonesInput.length})`
      : 'Synthèse du rapport';
  return NextResponse.json({ done: false, step: draft.step, total, label });
}
