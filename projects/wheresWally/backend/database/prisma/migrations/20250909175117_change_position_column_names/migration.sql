/*
  Warnings:

  - You are about to drop the column `character_postition_x` on the `positions` table. All the data in the column will be lost.
  - Added the required column `character_posittion_x` to the `positions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."positions" DROP COLUMN "character_postition_x",
ADD COLUMN     "character_posittion_x" INTEGER NOT NULL;
