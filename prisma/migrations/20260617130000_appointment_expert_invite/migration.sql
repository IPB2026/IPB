-- Double invitation Google Agenda : suivi de l'événement DIAGNOSTIQUEUR.
-- Migration ADDITIVE : colonne nullable → aucune perte de données.

ALTER TABLE "Appointment" ADD COLUMN "googleEventIdExpert" TEXT;
