-- Audit interconnexions 2026-07 : verrous d'intégrité au niveau base.
-- Données vérifiées AVANT application : 0 doublon email, 0 doublon téléphone,
-- 0 facture multiple par devis (2026-07-18). Migration approuvée explicitement.

CREATE UNIQUE INDEX "Contact_email_key" ON "Contact"("email");
CREATE UNIQUE INDEX "Contact_phone_key" ON "Contact"("phone");

-- Une seule facture ACTIVE par devis (l'annulation autorise la re-facturation).
-- Index PARTIEL : non exprimable dans schema.prisma — ne pas le supprimer lors
-- d'une future régénération.
CREATE UNIQUE INDEX "Facture_devisId_active_key" ON "Facture"("devisId")
  WHERE "devisId" IS NOT NULL AND "status" <> 'ANNULEE';
