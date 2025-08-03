/*
  Warnings:

  - Made the column `link` on table `files` required. This step will fail if there are existing NULL values in that column.
  - Made the column `title` on table `files` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."files" ALTER COLUMN "link" SET NOT NULL,
ALTER COLUMN "title" SET NOT NULL;
