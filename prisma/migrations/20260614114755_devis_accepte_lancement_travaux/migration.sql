-- AlterEnum
ALTER TYPE "AppointmentType" ADD VALUE 'LANCEMENT_TRAVAUX';

-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "devisId" TEXT;

-- AlterTable
ALTER TABLE "Devis" ADD COLUMN     "acceptedAt" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "Appointment_devisId_idx" ON "Appointment"("devisId");

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_devisId_fkey" FOREIGN KEY ("devisId") REFERENCES "Devis"("id") ON DELETE SET NULL ON UPDATE CASCADE;
