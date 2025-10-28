/*
  Warnings:

  - The `guesses` column on the `ConnectionsAttempt` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `solvedCategories` column on the `ConnectionsAttempt` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "ConnectionsAttempt" ADD COLUMN     "userId" TEXT,
DROP COLUMN "guesses",
ADD COLUMN     "guesses" JSONB[],
DROP COLUMN "solvedCategories",
ADD COLUMN     "solvedCategories" JSONB[];

-- AlterTable
ALTER TABLE "ConnectionsGame" ADD COLUMN     "finalised" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "ConnectionsAttempt" ADD CONSTRAINT "ConnectionsAttempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
