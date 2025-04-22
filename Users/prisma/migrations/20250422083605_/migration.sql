/*
  Warnings:

  - You are about to drop the column `genre` on the `movies` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `movies` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `movies` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `movies` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `movies` table. All the data in the column will be lost.
  - Added the required column `overview` to the `movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `popularity` to the `movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `poster_path` to the `movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `release_date` to the `movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `movies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "movies" DROP COLUMN "genre",
DROP COLUMN "image",
DROP COLUMN "name",
DROP COLUMN "time",
DROP COLUMN "userId",
ADD COLUMN     "genre_ids" INTEGER[],
ADD COLUMN     "overview" TEXT NOT NULL,
ADD COLUMN     "popularity" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "poster_path" TEXT NOT NULL,
ADD COLUMN     "release_date" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
