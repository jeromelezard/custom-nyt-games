/*
  Warnings:

  - Added the required column `userId` to the `ConnectionsGame` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ConnectionsGame" ADD COLUMN     "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dateUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ConnectionsGame" ADD CONSTRAINT "ConnectionsGame_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
