-- Override manuel de la phase du dossier (liberté totale).
-- null = suivi automatique (phase dérivée des artefacts).
ALTER TABLE "Lead" ADD COLUMN "manualPhase" TEXT;
