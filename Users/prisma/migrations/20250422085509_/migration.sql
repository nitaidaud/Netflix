/*
  Warnings:

  - You are about to alter the column `popularity` on the `movies` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "movies" ALTER COLUMN "popularity" SET DATA TYPE DOUBLE PRECISION;
