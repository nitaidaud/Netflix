/*
  Warnings:

  - A unique constraint covering the columns `[profileId]` on the table `movies_favorite_list` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "movies_favorite_list_profileId_key" ON "movies_favorite_list"("profileId");
