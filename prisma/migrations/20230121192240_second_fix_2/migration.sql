/*
  Warnings:

  - You are about to drop the column `skill` on the `BasicInfo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BasicInfo" DROP COLUMN "skill",
ADD COLUMN     "business" VARCHAR(20)[];

-- CreateTable
CREATE TABLE "Skill" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(40) NOT NULL,
    "score" SMALLINT NOT NULL DEFAULT 0,
    "basic_info_id" TEXT,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_basic_info_id_fkey" FOREIGN KEY ("basic_info_id") REFERENCES "BasicInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
