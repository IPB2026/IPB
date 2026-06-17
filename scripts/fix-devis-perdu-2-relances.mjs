// Correction ponctuelle : rouvrir les dossiers classés PERDU à tort sous
// l'ANCIENNE règle (2 relances) afin qu'ils reçoivent leur 3e relance.
//
// Signature de l'ancienne règle (écrite UNIQUEMENT par l'ancien markDevisLost) :
//   • lead.lostReason === 'Sans réponse après 2 relances de devis'
//   • activité « Devis <n°> classé perdu — sans réponse après 2 relances. »
// La fermeture MANUELLE d'un devis écrit un libellé différent (« statut → expiré »)
// et ne pose JAMAIS ce lostReason → on ne touche pas aux fermetures manuelles.
//
// Usage :
//   node --env-file=.env scripts/fix-devis-perdu-2-relances.mjs           (dry-run)
//   node --env-file=.env scripts/fix-devis-perdu-2-relances.mjs --apply   (écrit)
//
// Idempotent : un 2e passage ne re-corrige rien (devis déjà ENVOYÉ, lostReason vidé).

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const APPLY = process.argv.includes('--apply');

const OLD_LOST_REASON = 'Sans réponse après 2 relances de devis';
const OLD_ACTIVITY_NEEDLE = 'classé perdu — sans réponse après 2 relances';

async function main() {
  console.log(
    APPLY
      ? '⚙️  MODE APPLY — écriture en base\n'
      : '🔍 MODE DRY-RUN — lecture seule (relancer avec --apply pour corriger)\n'
  );

  // ── 1. Devis expirés à tort (auto, 2 relances) ───────────────────────────
  // On part du smoking-gun (l'activité), puis on confirme sur le devis lui-même :
  // encore EXPIRE + relanceCount === 2 (la NOUVELLE règle n'expire qu'à 3).
  const oldActs = await prisma.activity.findMany({
    where: { content: { contains: OLD_ACTIVITY_NEEDLE } },
    select: { content: true },
  });
  const numbers = [
    ...new Set(
      oldActs
        .map((a) => a.content.match(/^Devis (\S+) classé perdu/)?.[1])
        .filter(Boolean)
    ),
  ];

  const devisToFix = numbers.length
    ? await prisma.devis.findMany({
        where: { number: { in: numbers }, status: 'EXPIRE', relanceCount: 2 },
        select: { id: true, number: true, contactId: true, leadId: true },
      })
    : [];

  console.log(`Devis classés EXPIRÉ à tort (2 relances) : ${devisToFix.length}`);
  for (const d of devisToFix) console.log(`  • ${d.number}`);

  // ── 2. Dossiers (leads) marqués PERDU à tort ─────────────────────────────
  const leadsToFix = await prisma.lead.findMany({
    where: { stage: 'PERDU', lostReason: OLD_LOST_REASON },
    select: { id: true, contactId: true },
  });
  console.log(`\nDossiers (leads) marqués PERDU à tort : ${leadsToFix.length}`);

  if (!APPLY) {
    console.log('\n(DRY-RUN terminé — aucune écriture.)');
    return;
  }

  // ── Application ──────────────────────────────────────────────────────────
  let devisFixed = 0;
  for (const d of devisToFix) {
    // Garde-fou : ne re-bascule QUE si toujours EXPIRE (idempotent / anti-course).
    const res = await prisma.devis.updateMany({
      where: { id: d.id, status: 'EXPIRE' },
      data: { status: 'ENVOYE' }, // relanceCount reste à 2 → la 3e relance partira
    });
    if (res.count === 0) continue;
    await prisma.activity.create({
      data: {
        type: 'SYSTEME',
        contactId: d.contactId,
        leadId: d.leadId,
        content: `Devis ${d.number} rouvert (ENVOYÉ) — réouverture après correction de règle (3 relances au lieu de 2).`,
      },
    });
    devisFixed++;
  }

  let leadsFixed = 0;
  for (const l of leadsToFix) {
    const res = await prisma.lead.updateMany({
      where: { id: l.id, stage: 'PERDU', lostReason: OLD_LOST_REASON },
      data: { stage: 'DEVIS_ENVOYE', lostReason: null },
    });
    if (res.count === 0) continue;
    await prisma.activity.create({
      data: {
        type: 'SYSTEME',
        contactId: l.contactId,
        leadId: l.id,
        content:
          'Dossier rouvert (Devis envoyé) — réouverture après correction de règle (3 relances au lieu de 2).',
      },
    });
    leadsFixed++;
  }

  console.log(`\n✅ Devis rouverts (EXPIRÉ → ENVOYÉ) : ${devisFixed}`);
  console.log(`✅ Dossiers rouverts (PERDU → Devis envoyé) : ${leadsFixed}`);
}

main()
  .catch((e) => {
    console.error('❌ Échec :', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
