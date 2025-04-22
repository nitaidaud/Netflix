/*
  Warnings:

  - You are about to drop the column `profileId` on the `movies` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[movieFavoriteListId]` on the table `movies` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `movieFavoriteListId` to the `movies` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "movies" DROP CONSTRAINT "movies_profileId_fkey";

-- AlterTable
ALTER TABLE "movies" DROP COLUMN "profileId",
ADD COLUMN     "movieFavoriteListId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "movies_favorite_list" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "movies_favorite_list_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "movies_movieFavoriteListId_key" ON "movies"("movieFavoriteListId");

-- AddForeignKey
ALTER TABLE "movies_favorite_list" ADD CONSTRAINT "movies_favorite_list_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movies" ADD CONSTRAINT "movies_movieFavoriteListId_fkey" FOREIGN KEY ("movieFavoriteListId") REFERENCES "movies_favorite_list"("id") ON DELETE CASCADE ON UPDATE CASCADE;
