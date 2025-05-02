-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('Pending', 'Completed', 'Failed', 'Canceled');

-- CreateEnum
CREATE TYPE "Plan" AS ENUM ('Basic', 'Standard', 'Premium');

-- CreateTable
CREATE TABLE "Order" (
    "id" INTEGER NOT NULL,
    "orderStatus" "OrderStatus" NOT NULL,
    "plan" "Plan" NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
