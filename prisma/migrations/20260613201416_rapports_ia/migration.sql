-- CreateEnum
CREATE TYPE "ReportType" AS ENUM ('FISSURES', 'HUMIDITE', 'EXPERTISE_ACHAT', 'MUR_PORTEUR');

-- CreateEnum
CREATE TYPE "ReportStatus" AS ENUM ('BROUILLON', 'GENERE', 'VALIDE', 'ENVOYE');

-- CreateTable
CREATE TABLE "Rapport" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "ReportStatus" NOT NULL DEFAULT 'BROUILLON',
    "contactId" TEXT NOT NULL,
    "leadId" TEXT,
    "type" "ReportType" NOT NULL,
    "title" TEXT NOT NULL,
    "bienAdresse" TEXT,
    "ville" TEXT,
    "zonesInput" JSONB NOT NULL DEFAULT '[]',
    "aiContent" JSONB,
    "aiModel" TEXT,
    "aiGeneratedAt" TIMESTAMP(3),
    "budgetHT" DECIMAL(10,2),

    CONSTRAINT "Rapport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Rapport_number_key" ON "Rapport"("number");

-- CreateIndex
CREATE INDEX "Rapport_status_idx" ON "Rapport"("status");

-- CreateIndex
CREATE INDEX "Rapport_contactId_idx" ON "Rapport"("contactId");

-- AddForeignKey
ALTER TABLE "Rapport" ADD CONSTRAINT "Rapport_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;
