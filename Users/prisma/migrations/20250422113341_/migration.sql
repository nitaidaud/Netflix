/*
  Warnings:

  - You are about to drop the column `movieFavoriteListId` on the `movies` table. All the data in the column will be lost.
  - You are about to drop the `movies_favorite_list` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "movies" DROP CONSTRAINT "movies_movieFavoriteListId_fkey";

-- DropForeignKey
ALTER TABLE "movies_favorite_list" DROP CONSTRAINT "movies_favorite_list_profileId_fkey";

-- DropIndex
DROP INDEX "movies_movieFavoriteListId_key";

-- AlterTable
ALTER TABLE "movies" DROP COLUMN "movieFavoriteListId";

-- DropTable
DROP TABLE "movies_favorite_list";

-- CreateTable
CREATE TABLE "movie_favorite_lists" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "movie_favorite_lists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FavoriteMovies" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_FavoriteMovies_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "movie_favorite_lists_profileId_key" ON "movie_favorite_lists"("profileId");

-- CreateIndex
CREATE INDEX "_FavoriteMovies_B_index" ON "_FavoriteMovies"("B");

-- AddForeignKey
ALTER TABLE "movie_favorite_lists" ADD CONSTRAINT "movie_favorite_lists_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoriteMovies" ADD CONSTRAINT "_FavoriteMovies_A_fkey" FOREIGN KEY ("A") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoriteMovies" ADD CONSTRAINT "_FavoriteMovies_B_fkey" FOREIGN KEY ("B") REFERENCES "movie_favorite_lists"("id") ON DELETE CASCADE ON UPDATE CASCADE;
