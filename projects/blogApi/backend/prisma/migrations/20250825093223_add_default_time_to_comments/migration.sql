/*
  Warnings:

  - You are about to drop the column `commment_title` on the `comments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."comments" DROP COLUMN "commment_title",
ADD COLUMN     "comment_title" TEXT,
ALTER COLUMN "creation_time" SET DEFAULT CURRENT_TIMESTAMP;
