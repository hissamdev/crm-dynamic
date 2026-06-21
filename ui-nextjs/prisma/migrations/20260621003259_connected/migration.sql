/*
  Warnings:

  - You are about to drop the column `fieldId` on the `values` table. All the data in the column will be lost.
  - Added the required column `listId` to the `values` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "values" DROP CONSTRAINT "values_fieldId_fkey";

-- AlterTable
ALTER TABLE "values" DROP COLUMN "fieldId",
ADD COLUMN     "listId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "values" ADD CONSTRAINT "values_listId_fkey" FOREIGN KEY ("listId") REFERENCES "lists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
