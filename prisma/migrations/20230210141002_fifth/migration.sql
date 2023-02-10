/*
  Warnings:

  - You are about to drop the column `basic_info_id` on the `Skill` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Skill" DROP CONSTRAINT "Skill_basic_info_id_fkey";

-- AlterTable
ALTER TABLE "Skill" DROP COLUMN "basic_info_id",
ADD COLUMN     "user_id" TEXT;

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
