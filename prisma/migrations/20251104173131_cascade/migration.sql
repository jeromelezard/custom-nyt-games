-- DropForeignKey
ALTER TABLE "public"."ConnectionsWord" DROP CONSTRAINT "ConnectionsWord_connectionsCategoryId_fkey";

-- AddForeignKey
ALTER TABLE "ConnectionsWord" ADD CONSTRAINT "ConnectionsWord_connectionsCategoryId_fkey" FOREIGN KEY ("connectionsCategoryId") REFERENCES "ConnectionsCategory"("connectionsCategoryId") ON DELETE CASCADE ON UPDATE CASCADE;
