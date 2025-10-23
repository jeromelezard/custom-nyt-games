/*
  Warnings:

  - The values [Google,Microsoft] on the enum `AuthProvider` will be removed. If these variants are still used in the database, this will fail.
  - Changed the type of `providerId` on the `account` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AuthProvider_new" AS ENUM ('google', 'microsoft');
ALTER TABLE "account" ALTER COLUMN "providerId" TYPE "AuthProvider_new" USING ("providerId"::text::"AuthProvider_new");
ALTER TYPE "AuthProvider" RENAME TO "AuthProvider_old";
ALTER TYPE "AuthProvider_new" RENAME TO "AuthProvider";
DROP TYPE "public"."AuthProvider_old";
COMMIT;

-- AlterTable
ALTER TABLE "account" DROP COLUMN "providerId",
ADD COLUMN     "providerId" "AuthProvider" NOT NULL;

-- DropEnum
DROP TYPE "public"."AnimalType";
