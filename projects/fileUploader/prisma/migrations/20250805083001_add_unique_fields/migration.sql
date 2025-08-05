/*
  Warnings:

  - A unique constraint covering the columns `[folder_name,userId]` on the table `folders` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "folders_folder_name_userId_key" ON "public"."folders"("folder_name", "userId");
