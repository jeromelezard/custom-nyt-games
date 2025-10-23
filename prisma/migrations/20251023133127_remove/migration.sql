/*
  Warnings:

  - Changed the type of `providerId` on the `account` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "account" DROP COLUMN "providerId",
ADD COLUMN     "providerId" TEXT NOT NULL;

-- DropEnum
DROP TYPE "public"."AuthProvider";
