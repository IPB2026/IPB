-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'EXPERT');

-- CreateEnum
CREATE TYPE "LeadSource" AS ENUM ('DIAGNOSTIC', 'CALCULATEUR', 'CONTACT', 'RAPPEL', 'MANUEL');

-- CreateEnum
CREATE TYPE "ServiceType" AS ENUM ('FISSURES', 'HUMIDITE', 'EXPERTISE_ACHAT', 'MUR_PORTEUR', 'AUTRE');

-- CreateEnum
CREATE TYPE "LeadTier" AS ENUM ('HOT', 'WARM', 'COLD');

-- CreateEnum
CREATE TYPE "PipelineStage" AS ENUM ('NOUVEAU', 'A_RAPPELER', 'RDV_PLANIFIE', 'VISITE_FAITE', 'DEVIS_ENVOYE', 'GAGNE', 'PERDU');

-- CreateEnum
CREATE TYPE "OccupantStatus" AS ENUM ('PROPRIETAIRE', 'BAILLEUR', 'LOCATAIRE', 'ACHETEUR', 'INVESTISSEUR', 'INCONNU');

-- CreateEnum
CREATE TYPE "ActivityType" AS ENUM ('NOTE', 'APPEL', 'EMAIL', 'RDV', 'RELANCE', 'CHANGEMENT_ETAPE', 'SYSTEME');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "passwordHash" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'ADMIN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "city" TEXT,
    "postalCode" TEXT,
    "occupantStatus" "OccupantStatus" NOT NULL DEFAULT 'INCONNU',
    "propertyType" TEXT,
    "inServiceArea" BOOLEAN,
    "notes" TEXT,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "contactId" TEXT NOT NULL,
    "source" "LeadSource" NOT NULL,
    "service" "ServiceType" NOT NULL,
    "stage" "PipelineStage" NOT NULL DEFAULT 'NOUVEAU',
    "tier" "LeadTier",
    "score" INTEGER,
    "maxScore" INTEGER,
    "riskScore" INTEGER,
    "callbackPriority" TEXT,
    "reasons" TEXT[],
    "summary" TEXT,
    "payload" JSONB NOT NULL,
    "value" DECIMAL(10,2),
    "lostReason" TEXT,
    "assignedToId" TEXT,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "ActivityType" NOT NULL,
    "content" TEXT,
    "leadId" TEXT,
    "contactId" TEXT,
    "authorId" TEXT,
    "dueAt" TIMESTAMP(3),
    "done" BOOLEAN NOT NULL DEFAULT false,
    "doneAt" TIMESTAMP(3),

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Contact_email_idx" ON "Contact"("email");

-- CreateIndex
CREATE INDEX "Contact_phone_idx" ON "Contact"("phone");

-- CreateIndex
CREATE INDEX "Lead_stage_idx" ON "Lead"("stage");

-- CreateIndex
CREATE INDEX "Lead_tier_idx" ON "Lead"("tier");

-- CreateIndex
CREATE INDEX "Lead_source_idx" ON "Lead"("source");

-- CreateIndex
CREATE INDEX "Lead_createdAt_idx" ON "Lead"("createdAt");

-- CreateIndex
CREATE INDEX "Activity_leadId_idx" ON "Activity"("leadId");

-- CreateIndex
CREATE INDEX "Activity_contactId_idx" ON "Activity"("contactId");

-- CreateIndex
CREATE INDEX "Activity_dueAt_idx" ON "Activity"("dueAt");

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
