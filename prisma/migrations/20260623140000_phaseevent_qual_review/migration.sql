-- T1 : horodatage des transitions de phase
CREATE TABLE "PhaseEvent" (
  "id" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "contactId" TEXT NOT NULL,
  "leadId" TEXT,
  "fromPhase" TEXT,
  "toPhase" TEXT NOT NULL,
  CONSTRAINT "PhaseEvent_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "PhaseEvent_contactId_idx" ON "PhaseEvent"("contactId");
CREATE INDEX "PhaseEvent_toPhase_idx" ON "PhaseEvent"("toPhase");
CREATE INDEX "PhaseEvent_createdAt_idx" ON "PhaseEvent"("createdAt");
ALTER TABLE "PhaseEvent" ADD CONSTRAINT "PhaseEvent_contactId_fkey"
  FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- C3 : moteur d'avis
ALTER TABLE "Contact" ADD COLUMN "reviewRequestedAt" TIMESTAMP(3);
ALTER TABLE "Contact" ADD COLUMN "reviewReceivedAt"  TIMESTAMP(3);

-- T2 : qualification & motif de perte structures
ALTER TABLE "Lead" ADD COLUMN "lostReasonCode" TEXT;
ALTER TABLE "Lead" ADD COLUMN "qualDelai"      TEXT;
ALTER TABLE "Lead" ADD COLUMN "qualDecision"   TEXT;
ALTER TABLE "Lead" ADD COLUMN "qualBien"       TEXT;
ALTER TABLE "Lead" ADD COLUMN "qualScoredAt"   TIMESTAMP(3);
