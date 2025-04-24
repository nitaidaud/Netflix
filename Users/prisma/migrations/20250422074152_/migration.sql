/*
  Warnings:

  - Made the column `userId` on table `profiles` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "profiles" ALTER COLUMN "userId" SET NOT NULL;
