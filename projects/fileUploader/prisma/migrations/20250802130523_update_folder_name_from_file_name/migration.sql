/*
  Warnings:

  - You are about to drop the column `file_name` on the `folders` table. All the data in the column will be lost.
  - Added the required column `folder_name` to the `folders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."folders" DROP COLUMN "file_name",
ADD COLUMN     "folder_name" TEXT NOT NULL;
