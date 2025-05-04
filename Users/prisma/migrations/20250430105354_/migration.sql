/*
  Warnings:

  - You are about to drop the `_MovieGenres` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `genres` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Genre" AS ENUM ('Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Music', 'Mystery', 'Romance', 'Science_Fiction', 'Thriller', 'TV_Movie', 'War', 'Western');

-- DropForeignKey
ALTER TABLE "_MovieGenres" DROP CONSTRAINT "_MovieGenres_A_fkey";

-- DropForeignKey
ALTER TABLE "_MovieGenres" DROP CONSTRAINT "_MovieGenres_B_fkey";

-- AlterTable
ALTER TABLE "movies" ADD COLUMN     "genre_ids" INTEGER[],
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "movies_id_seq";

-- DropTable
DROP TABLE "_MovieGenres";

-- DropTable
DROP TABLE "genres";
