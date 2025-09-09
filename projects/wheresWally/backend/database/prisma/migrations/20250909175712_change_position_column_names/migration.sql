/*
  Warnings:

  - Added the required column `sceneName` to the `scenes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."scenes" ADD COLUMN     "sceneName" TEXT NOT NULL;
