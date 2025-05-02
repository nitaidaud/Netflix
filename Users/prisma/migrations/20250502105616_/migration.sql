/*
  Warnings:

  - The values [Pending,Failed,Canceled] on the enum `OrderStatus` will be removed. If these variants are still used in the database, this will fail.
  - The primary key for the `Order` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "OrderStatus_new" AS ENUM ('Approved', 'Completed', 'Created', 'PayerActionRequired', 'Saved', 'Voided');
ALTER TABLE "Order" ALTER COLUMN "orderStatus" TYPE "OrderStatus_new" USING ("orderStatus"::text::"OrderStatus_new");
ALTER TYPE "OrderStatus" RENAME TO "OrderStatus_old";
ALTER TYPE "OrderStatus_new" RENAME TO "OrderStatus";
DROP TYPE "OrderStatus_old";
COMMIT;

-- AlterTable
ALTER TABLE "Order" DROP CONSTRAINT "Order_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Order_pkey" PRIMARY KEY ("id");
