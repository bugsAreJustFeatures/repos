/*
  Warnings:

  - You are about to drop the column `post_name` on the `posts` table. All the data in the column will be lost.
  - Added the required column `post_title` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."posts" DROP COLUMN "post_name",
ADD COLUMN     "post_title" TEXT NOT NULL,
ADD COLUMN     "topics" TEXT;
