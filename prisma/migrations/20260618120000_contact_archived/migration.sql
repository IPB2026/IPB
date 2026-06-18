-- Corbeille client (soft-delete). Migration ADDITIVE et NON DESTRUCTIVE :
-- colonne nullable + index. Aucune donnée existante modifiée.
ALTER TABLE "Contact" ADD COLUMN "archivedAt" TIMESTAMP(3);

CREATE INDEX "Contact_archivedAt_idx" ON "Contact"("archivedAt");
