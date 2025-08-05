/*
  Warnings:

  - You are about to drop the column `title` on the `files` table. All the data in the column will be lost.
  - Added the required column `file_name` to the `files` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."files" DROP COLUMN "title",
ADD COLUMN     "file_name" TEXT NOT NULL;
