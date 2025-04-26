/*
  Warnings:

  - The primary key for the `_FavoriteMovies` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `movies` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `movies` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `A` on the `_FavoriteMovies` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "_FavoriteMovies" DROP CONSTRAINT "_FavoriteMovies_A_fkey";

-- AlterTable
ALTER TABLE "_FavoriteMovies" DROP CONSTRAINT "_FavoriteMovies_AB_pkey",
DROP COLUMN "A",
ADD COLUMN     "A" INTEGER NOT NULL,
ADD CONSTRAINT "_FavoriteMovies_AB_pkey" PRIMARY KEY ("A", "B");

-- AlterTable
ALTER TABLE "movies" DROP CONSTRAINT "movies_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" INTEGER NOT NULL,
ADD CONSTRAINT "movies_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "_FavoriteMovies" ADD CONSTRAINT "_FavoriteMovies_A_fkey" FOREIGN KEY ("A") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
