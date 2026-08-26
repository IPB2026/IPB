-- Vague 1 de l'audit d'architecture (AUDIT_ARCHITECTURE_CRM_2026-08.md) :
-- le « dossier » devient l'unité de calcul de la phase, au lieu du contact.
--
-- Deux ajouts et un rattachement de l'historique :
--   1. Facture.leadId — les devis, rapports et RDV portaient déjà le dossier ;
--      la facture était le maillon manquant.
--   2. Lead.phase / Lead.phaseSyncAt — copie STOCKÉE de la phase calculée par
--      computeDossier, pour la rendre filtrable et agrégeable en SQL.
--   3. Backfill : chaque artefact orphelin est rattaché au dossier qui était
--      ouvert à sa création (le plus récent créé AVANT lui), sinon au plus
--      ancien dossier du contact. Sans ce rattachement, les artefacts anciens
--      d'un client fidèle tomberaient dans son dossier COURANT et le bug
--      corrigé par cette vague se rejouerait à l'identique.
--
-- Additive et réversible : aucune colonne supprimée, aucune donnée réécrite
-- en dehors des `leadId` restés NULL.

-- ── 1. Nouvelles colonnes ────────────────────────────────────────────────
ALTER TABLE "Facture" ADD COLUMN IF NOT EXISTS "leadId" TEXT;
ALTER TABLE "Lead"    ADD COLUMN IF NOT EXISTS "phase" TEXT;
ALTER TABLE "Lead"    ADD COLUMN IF NOT EXISTS "phaseSyncAt" TIMESTAMP(3);

-- ── 2. Index ─────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS "Facture_leadId_idx" ON "Facture"("leadId");
CREATE INDEX IF NOT EXISTS "Devis_leadId_idx"   ON "Devis"("leadId");
CREATE INDEX IF NOT EXISTS "Rapport_leadId_idx" ON "Rapport"("leadId");
CREATE INDEX IF NOT EXISTS "Lead_phase_idx"     ON "Lead"("phase");
CREATE INDEX IF NOT EXISTS "Lead_contactId_createdAt_idx" ON "Lead"("contactId", "createdAt");

-- ── 3. Backfill : dossier ouvert au moment de la création de l'artefact ──
UPDATE "Devis" a SET "leadId" = (
  SELECT l."id" FROM "Lead" l
  WHERE l."contactId" = a."contactId" AND l."createdAt" <= a."createdAt"
  ORDER BY l."createdAt" DESC LIMIT 1
) WHERE a."leadId" IS NULL;

UPDATE "Facture" a SET "leadId" = (
  SELECT l."id" FROM "Lead" l
  WHERE l."contactId" = a."contactId" AND l."createdAt" <= a."createdAt"
  ORDER BY l."createdAt" DESC LIMIT 1
) WHERE a."leadId" IS NULL;

UPDATE "Rapport" a SET "leadId" = (
  SELECT l."id" FROM "Lead" l
  WHERE l."contactId" = a."contactId" AND l."createdAt" <= a."createdAt"
  ORDER BY l."createdAt" DESC LIMIT 1
) WHERE a."leadId" IS NULL;

UPDATE "Appointment" a SET "leadId" = (
  SELECT l."id" FROM "Lead" l
  WHERE l."contactId" = a."contactId" AND l."createdAt" <= a."createdAt"
  ORDER BY l."createdAt" DESC LIMIT 1
) WHERE a."leadId" IS NULL;

-- Rattrapage : artefact antérieur à tout dossier du contact (import, saisie
-- rétroactive) → on le donne au plus ancien dossier plutôt que de le laisser
-- orphelin.
UPDATE "Devis" a SET "leadId" = (
  SELECT l."id" FROM "Lead" l WHERE l."contactId" = a."contactId"
  ORDER BY l."createdAt" ASC LIMIT 1
) WHERE a."leadId" IS NULL;

UPDATE "Facture" a SET "leadId" = (
  SELECT l."id" FROM "Lead" l WHERE l."contactId" = a."contactId"
  ORDER BY l."createdAt" ASC LIMIT 1
) WHERE a."leadId" IS NULL;

UPDATE "Rapport" a SET "leadId" = (
  SELECT l."id" FROM "Lead" l WHERE l."contactId" = a."contactId"
  ORDER BY l."createdAt" ASC LIMIT 1
) WHERE a."leadId" IS NULL;

UPDATE "Appointment" a SET "leadId" = (
  SELECT l."id" FROM "Lead" l WHERE l."contactId" = a."contactId"
  ORDER BY l."createdAt" ASC LIMIT 1
) WHERE a."leadId" IS NULL;

-- `Lead.phase` reste NULL : la première synchronisation (mutation ou passage
-- nocturne du cron) la remplit. Le code lit la phase calculée en secours tant
-- qu'elle est nulle — aucun écran ne dépend de ce backfill.
