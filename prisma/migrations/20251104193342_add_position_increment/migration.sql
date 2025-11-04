/*
  Warnings:

  - You are about to drop the column `position` on the `ConnectionsWord` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[connectionsCategoryId,positionInCategory]` on the table `ConnectionsWord` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ConnectionsWord" DROP COLUMN "position",
ADD COLUMN     "positionInCategory" INTEGER,
ADD COLUMN     "positionInGrid" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "ConnectionsWord_connectionsCategoryId_positionInCategory_key" ON "ConnectionsWord"("connectionsCategoryId", "positionInCategory");

-- Create a trigger function to auto-increment positionInCategory per category
CREATE OR REPLACE FUNCTION set_position_in_category()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW."positionInCategory" IS NULL THEN
    SELECT COALESCE(MAX("positionInCategory"), 0) + 1
    INTO NEW."positionInCategory"
    FROM "ConnectionsWord"
    WHERE "connectionsCategoryId" = NEW."connectionsCategoryId";
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop old trigger if it exists (safe re-deploy)
DROP TRIGGER IF EXISTS set_position_in_category_trigger ON "ConnectionsWord";

-- Create the trigger
CREATE TRIGGER set_position_in_category_trigger
BEFORE INSERT ON "ConnectionsWord"
FOR EACH ROW
EXECUTE FUNCTION set_position_in_category();
