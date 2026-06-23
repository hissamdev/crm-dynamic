-- DropForeignKey
ALTER TABLE "fields" DROP CONSTRAINT "fields_listId_fkey";

-- DropForeignKey
ALTER TABLE "values" DROP CONSTRAINT "values_listId_fkey";

-- AddForeignKey
ALTER TABLE "fields" ADD CONSTRAINT "fields_listId_fkey" FOREIGN KEY ("listId") REFERENCES "lists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "values" ADD CONSTRAINT "values_listId_fkey" FOREIGN KEY ("listId") REFERENCES "lists"("id") ON DELETE CASCADE ON UPDATE CASCADE;
