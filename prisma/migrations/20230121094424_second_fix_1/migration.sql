/*
  Warnings:

  - Added the required column `email` to the `BasicInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BasicInfo" ADD COLUMN     "email" VARCHAR(60) NOT NULL;
