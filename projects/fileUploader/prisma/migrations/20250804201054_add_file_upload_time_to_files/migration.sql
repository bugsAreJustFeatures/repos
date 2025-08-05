/*
  Warnings:

  - Added the required column `uploaded_date` to the `files` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."files" ADD COLUMN     "uploaded_date" TIMESTAMP(3) NOT NULL;
