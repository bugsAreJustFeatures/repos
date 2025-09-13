/*
  Warnings:

  - The `start_time` column on the `game_sessions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[userId]` on the table `game_sessions` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."game_sessions" DROP COLUMN "start_time",
ADD COLUMN     "start_time" BIGINT;

-- AlterTable
ALTER TABLE "public"."users" ALTER COLUMN "beach_club" SET DATA TYPE BIGINT;

-- CreateIndex
CREATE UNIQUE INDEX "game_sessions_userId_key" ON "public"."game_sessions"("userId");
