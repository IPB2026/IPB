-- Stockage de documents établis HORS CRM (devis/facture/rapport importés).
ALTER TABLE "Devis"   ADD COLUMN "externalUrl" TEXT;
ALTER TABLE "Facture" ADD COLUMN "externalUrl" TEXT;
ALTER TABLE "Rapport" ADD COLUMN "externalUrl" TEXT;
