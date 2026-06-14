-- AlterTable
ALTER TABLE "Rapport" ADD COLUMN     "authorId" TEXT;

-- CreateTable
CREATE TABLE "Photo" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rapportId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "pathname" TEXT NOT NULL,
    "caption" TEXT,
    "zoneRef" TEXT,
    "gravite" TEXT,
    "contentType" TEXT,
    "position" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Photo_rapportId_idx" ON "Photo"("rapportId");

-- CreateIndex
CREATE INDEX "Rapport_authorId_idx" ON "Rapport"("authorId");

-- AddForeignKey
ALTER TABLE "Rapport" ADD CONSTRAINT "Rapport_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_rapportId_fkey" FOREIGN KEY ("rapportId") REFERENCES "Rapport"("id") ON DELETE CASCADE ON UPDATE CASCADE;
