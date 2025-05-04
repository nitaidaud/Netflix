/*
  Warnings:

  - You are about to drop the `_FavoriteMovies` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `movie_favorite_lists` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `movies` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Type" AS ENUM ('Movie', 'Show');

-- DropForeignKey
ALTER TABLE "_FavoriteMovies" DROP CONSTRAINT "_FavoriteMovies_A_fkey";

-- DropForeignKey
ALTER TABLE "_FavoriteMovies" DROP CONSTRAINT "_FavoriteMovies_B_fkey";

-- DropForeignKey
ALTER TABLE "movie_favorite_lists" DROP CONSTRAINT "movie_favorite_lists_profileId_fkey";

-- DropTable
DROP TABLE "_FavoriteMovies";

-- DropTable
DROP TABLE "movie_favorite_lists";

-- DropTable
DROP TABLE "movies";

-- CreateTable
CREATE TABLE "favorite_lists" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "favorite_lists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favoriteItems" (
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "release_date" TEXT NOT NULL,
    "poster_path" TEXT NOT NULL,
    "backdrop_path" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "popularity" DOUBLE PRECISION NOT NULL,
    "adult" BOOLEAN NOT NULL,
    "type" "Type" NOT NULL,

    CONSTRAINT "favoriteItems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FavoriteItems" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_FavoriteItems_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "favorite_lists_profileId_key" ON "favorite_lists"("profileId");

-- CreateIndex
CREATE INDEX "_FavoriteItems_B_index" ON "_FavoriteItems"("B");

-- AddForeignKey
ALTER TABLE "favorite_lists" ADD CONSTRAINT "favorite_lists_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoriteItems" ADD CONSTRAINT "_FavoriteItems_A_fkey" FOREIGN KEY ("A") REFERENCES "favoriteItems"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoriteItems" ADD CONSTRAINT "_FavoriteItems_B_fkey" FOREIGN KEY ("B") REFERENCES "favorite_lists"("id") ON DELETE CASCADE ON UPDATE CASCADE;
