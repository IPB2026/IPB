-- Index de performance (filtres combinés fréquents). CONCURRENTLY évité ici pour
-- rester dans une transaction de migration ; tables petites → création rapide.
CREATE INDEX IF NOT EXISTS "Lead_channel_idx" ON "Lead"("channel");
CREATE INDEX IF NOT EXISTS "Activity_type_done_dueAt_idx" ON "Activity"("type","done","dueAt");
CREATE INDEX IF NOT EXISTS "Activity_contactId_type_idx" ON "Activity"("contactId","type");
CREATE INDEX IF NOT EXISTS "Devis_status_contactId_idx" ON "Devis"("status","contactId");
CREATE INDEX IF NOT EXISTS "Devis_status_sentAt_idx" ON "Devis"("status","sentAt");
CREATE INDEX IF NOT EXISTS "Facture_status_dueDate_idx" ON "Facture"("status","dueDate");
CREATE INDEX IF NOT EXISTS "Facture_contactId_status_idx" ON "Facture"("contactId","status");
CREATE INDEX IF NOT EXISTS "Rapport_status_contactId_idx" ON "Rapport"("status","contactId");
CREATE INDEX IF NOT EXISTS "Appointment_status_start_idx" ON "Appointment"("status","start");
