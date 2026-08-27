import { prisma } from '@/lib/prisma';
import { diagnoseDbError } from '@/lib/crm/db-error';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POINT DE CONTRÔLE — « est-ce que le CRM va bien ? », en une seconde.
 *
 * Né de l'incident des 26-27 août 2026 : le code d'une vague était déployé, sa
 * migration ne l'était pas, et personne — moi compris — n'avait de moyen simple
 * de le CONSTATER. Il a fallu lire les journaux d'erreurs pour comprendre, après
 * 24 h de panne et trois demandes perdues.
 *
 * Deux vérifications, dans cet ordre :
 *  1. la base répond-elle ?
 *  2. sa structure correspond-elle au code déployé ? On lit pour cela les
 *     colonnes ajoutées par la dernière migration : si l'une manque, Prisma
 *     lève P2022 et on le dit explicitement, au lieu d'annoncer une panne.
 *
 * Volontairement PUBLIC et pauvre : aucune donnée client, aucun compte, aucune
 * URL de base — juste trois booléens et un message. C'est ce qui permet de le
 * consulter depuis n'importe où, y compris quand le back-office est inaccessible.
 * Renvoie 200 si tout va bien, 503 sinon (lisible par un moniteur externe).
 */
export async function GET(): Promise<Response> {
  const debut = Date.now();

  try {
    // 1. La base répond-elle ? Requête la plus légère possible.
    await prisma.$queryRaw`SELECT 1`;
  } catch (e) {
    const d = diagnoseDbError(e);
    return Response.json(
      { ok: false, base: 'injoignable', schema: 'inconnu', probleme: d.message, action: d.action, code: d.code },
      { status: 503 }
    );
  }

  try {
    // 2. Structure à jour ? On touche les colonnes de la dernière migration —
    //    `take: 1` suffit : c'est la LECTURE de la colonne qui échouerait, pas
    //    le nombre de lignes.
    await prisma.lead.findFirst({ select: { phase: true, phaseSyncAt: true }, take: 1 });
    await prisma.facture.findFirst({ select: { leadId: true }, take: 1 });
  } catch (e) {
    const d = diagnoseDbError(e);
    return Response.json(
      {
        ok: false,
        base: 'ok',
        schema: d.kind === 'schema' ? 'en retard' : 'inconnu',
        probleme: d.message,
        action: d.action,
        code: d.code,
      },
      { status: 503 }
    );
  }

  return Response.json({
    ok: true,
    base: 'ok',
    schema: 'à jour',
    ms: Date.now() - debut,
  });
}
