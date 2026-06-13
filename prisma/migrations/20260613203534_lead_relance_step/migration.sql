-- AlterTable
ALTER TABLE "Lead" ADD COLUMN     "relanceLastAt" TIMESTAMP(3),
ADD COLUMN     "relanceStep" INTEGER NOT NULL DEFAULT 0;
