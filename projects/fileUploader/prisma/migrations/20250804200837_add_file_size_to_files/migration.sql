/*
  Warnings:

  - Added the required column `file_size` to the `files` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."files" ADD COLUMN     "file_size" INTEGER NOT NULL;
