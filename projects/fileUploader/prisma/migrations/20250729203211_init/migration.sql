/*
  Warnings:

  - Added the required column `link` to the `files` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `files` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `files` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."files" ADD COLUMN     "link" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "public"."user" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "public"."user"("username");

-- AddForeignKey
ALTER TABLE "public"."files" ADD CONSTRAINT "files_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
