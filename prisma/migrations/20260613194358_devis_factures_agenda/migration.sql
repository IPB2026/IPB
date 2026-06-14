-- CreateEnum
CREATE TYPE "DevisStatus" AS ENUM ('BROUILLON', 'ENVOYE', 'ACCEPTE', 'REFUSE', 'EXPIRE');

-- CreateEnum
CREATE TYPE "FactureStatus" AS ENUM ('BROUILLON', 'ENVOYEE', 'PAYEE', 'ANNULEE');

-- CreateEnum
CREATE TYPE "AppointmentType" AS ENUM ('DIAGNOSTIC_FISSURES', 'DIAGNOSTIC_HUMIDITE', 'EXPERTISE_ACHAT', 'MUR_PORTEUR', 'AUTRE');

-- CreateEnum
CREATE TYPE "AppointmentStatus" AS ENUM ('PLANIFIE', 'CONFIRME', 'REALISE', 'ANNULE');

-- CreateTable
CREATE TABLE "Counter" (
    "key" TEXT NOT NULL,
    "value" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Counter_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "Devis" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "DevisStatus" NOT NULL DEFAULT 'BROUILLON',
    "contactId" TEXT NOT NULL,
    "leadId" TEXT,
    "object" TEXT NOT NULL,
    "bienConcerne" TEXT,
    "introLetter" TEXT,
    "notes" TEXT,
    "validUntil" TIMESTAMP(3),
    "totalHT" DECIMAL(10,2) NOT NULL DEFAULT 0,

    CONSTRAINT "Devis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DevisLine" (
    "id" TEXT NOT NULL,
    "devisId" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "detail" TEXT,
    "unit" TEXT NOT NULL DEFAULT 'Forfait',
    "qty" DECIMAL(10,2) NOT NULL DEFAULT 1,
    "unitPrice" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "total" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "position" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "DevisLine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Facture" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "FactureStatus" NOT NULL DEFAULT 'BROUILLON',
    "contactId" TEXT NOT NULL,
    "devisId" TEXT,
    "object" TEXT NOT NULL,
    "mandataire" TEXT,
    "paymentMode" TEXT NOT NULL DEFAULT 'Virement bancaire',
    "issuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dueDate" TIMESTAMP(3),
    "acompte" DECIMAL(10,2),
    "notes" TEXT,
    "totalHT" DECIMAL(10,2) NOT NULL DEFAULT 0,

    CONSTRAINT "Facture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FactureLine" (
    "id" TEXT NOT NULL,
    "factureId" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "detail" TEXT,
    "unit" TEXT NOT NULL DEFAULT 'Forfait',
    "qty" DECIMAL(10,2) NOT NULL DEFAULT 1,
    "unitPrice" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "total" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "position" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "FactureLine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "contactId" TEXT NOT NULL,
    "leadId" TEXT,
    "assignedToId" TEXT,
    "title" TEXT NOT NULL,
    "type" "AppointmentType" NOT NULL DEFAULT 'DIAGNOSTIC_FISSURES',
    "status" "AppointmentStatus" NOT NULL DEFAULT 'PLANIFIE',
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "location" TEXT,
    "notes" TEXT,
    "googleEventId" TEXT,
    "factureId" TEXT,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Devis_number_key" ON "Devis"("number");

-- CreateIndex
CREATE INDEX "Devis_status_idx" ON "Devis"("status");

-- CreateIndex
CREATE INDEX "Devis_contactId_idx" ON "Devis"("contactId");

-- CreateIndex
CREATE UNIQUE INDEX "Facture_number_key" ON "Facture"("number");

-- CreateIndex
CREATE INDEX "Facture_status_idx" ON "Facture"("status");

-- CreateIndex
CREATE INDEX "Facture_contactId_idx" ON "Facture"("contactId");

-- CreateIndex
CREATE UNIQUE INDEX "Appointment_factureId_key" ON "Appointment"("factureId");

-- CreateIndex
CREATE INDEX "Appointment_start_idx" ON "Appointment"("start");

-- CreateIndex
CREATE INDEX "Appointment_status_idx" ON "Appointment"("status");

-- AddForeignKey
ALTER TABLE "Devis" ADD CONSTRAINT "Devis_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DevisLine" ADD CONSTRAINT "DevisLine_devisId_fkey" FOREIGN KEY ("devisId") REFERENCES "Devis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Facture" ADD CONSTRAINT "Facture_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Facture" ADD CONSTRAINT "Facture_devisId_fkey" FOREIGN KEY ("devisId") REFERENCES "Devis"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FactureLine" ADD CONSTRAINT "FactureLine_factureId_fkey" FOREIGN KEY ("factureId") REFERENCES "Facture"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_factureId_fkey" FOREIGN KEY ("factureId") REFERENCES "Facture"("id") ON DELETE SET NULL ON UPDATE CASCADE;
