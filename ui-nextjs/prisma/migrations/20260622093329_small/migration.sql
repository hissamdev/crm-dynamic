/*
  Warnings:

  - Made the column `type` on table `fields` required. This step will fail if there are existing NULL values in that column.
  - Made the column `emoji` on table `fields` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "fields" ALTER COLUMN "type" SET NOT NULL,
ALTER COLUMN "emoji" SET NOT NULL;
