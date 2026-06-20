/*
  Warnings:

  - The primary key for the `lists` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "fields" DROP CONSTRAINT "fields_listId_fkey";

-- AlterTable
ALTER TABLE "fields" ALTER COLUMN "listId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "lists" DROP CONSTRAINT "lists_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "lists_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "lists_id_seq";

-- AddForeignKey
ALTER TABLE "fields" ADD CONSTRAINT "fields_listId_fkey" FOREIGN KEY ("listId") REFERENCES "lists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
