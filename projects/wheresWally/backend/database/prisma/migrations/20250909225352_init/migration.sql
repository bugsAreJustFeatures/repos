-- CreateTable
CREATE TABLE "public"."users" (
    "id" SERIAL NOT NULL,
    "username" TEXT,
    "time_to_complete" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."characters" (
    "id" SERIAL NOT NULL,
    "character_name" TEXT NOT NULL,

    CONSTRAINT "characters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."scenes" (
    "id" SERIAL NOT NULL,
    "sceneName" TEXT NOT NULL,

    CONSTRAINT "scenes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."positions" (
    "id" SERIAL NOT NULL,
    "sceneId" INTEGER NOT NULL,
    "characterId" INTEGER NOT NULL,
    "character_position_x" INTEGER NOT NULL,
    "character_position_y" INTEGER NOT NULL,

    CONSTRAINT "positions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_charactersScenes" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_charactersScenes_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "public"."users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "characters_character_name_key" ON "public"."characters"("character_name");

-- CreateIndex
CREATE INDEX "_charactersScenes_B_index" ON "public"."_charactersScenes"("B");

-- AddForeignKey
ALTER TABLE "public"."positions" ADD CONSTRAINT "positions_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "public"."characters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."positions" ADD CONSTRAINT "positions_sceneId_fkey" FOREIGN KEY ("sceneId") REFERENCES "public"."scenes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_charactersScenes" ADD CONSTRAINT "_charactersScenes_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."characters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_charactersScenes" ADD CONSTRAINT "_charactersScenes_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."scenes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
