/*
  Warnings:

  - You are about to drop the column `averageRating` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `totalRatings` on the `Course` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Level" AS ENUM ('ALL', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'PROFESSIONAL');

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "averageRating",
DROP COLUMN "totalRatings",
ADD COLUMN     "isCertificateOffered" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "level" "Level" NOT NULL DEFAULT 'BEGINNER';
