/*
  Warnings:

  - The primary key for the `fields` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "fields" DROP CONSTRAINT "fields_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "fields_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "fields_id_seq";
