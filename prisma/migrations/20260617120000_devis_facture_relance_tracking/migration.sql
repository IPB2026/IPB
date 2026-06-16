-- Fiabilisation des relances : champs dédiés (vs matching de texte dans Activity).
-- Migration ADDITIVE : colonnes nullable / avec défaut → aucune perte de données.

-- AlterTable Devis : date d'envoi (base de calcul des relances) + compteur de relances auto
ALTER TABLE "Devis" ADD COLUMN "sentAt" TIMESTAMP(3);
ALTER TABLE "Devis" ADD COLUMN "relanceCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable Facture : compteur de relances de paiement auto
ALTER TABLE "Facture" ADD COLUMN "relanceCount" INTEGER NOT NULL DEFAULT 0;
