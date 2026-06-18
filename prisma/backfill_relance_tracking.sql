-- Backfill ponctuel après la migration 20260617120000 (relance_tracking).
-- Les colonnes Devis.sentAt / Devis.relanceCount / Facture.relanceCount ont été
-- créées avec DEFAULT 0 / NULL. Sans backfill, le cron (qui ne lit plus les
-- activités de relance) re-relancerait à zéro tout devis/facture déjà en cours
-- de séquence → e-mails en DOUBLE au client. On reconstruit l'état depuis les
-- activités existantes (« Relance devis <n°> … » / « Relance facture <n°> … »),
-- plafonné à 2 (le nb d'étapes du cron). sentAt ≈ updatedAt (date d'envoi).

UPDATE "Devis" d
SET "sentAt" = COALESCE(d."sentAt", d."updatedAt"),
    "relanceCount" = LEAST(2, (
      SELECT COUNT(*) FROM "Activity" a
      WHERE a."contactId" = d."contactId"
        AND a."content" LIKE 'Relance devis ' || d."number" || ' %'
    ))
WHERE d."status" = 'ENVOYE';

UPDATE "Facture" f
SET "relanceCount" = LEAST(2, (
      SELECT COUNT(*) FROM "Activity" a
      WHERE a."contactId" = f."contactId"
        AND a."content" LIKE 'Relance facture ' || f."number" || ' %'
    ))
WHERE f."status" = 'ENVOYEE';
