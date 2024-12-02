/*
  Warnings:

  - You are about to drop the column `authorId` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `bannerId` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `difficulty` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `enrollmentType` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `languageId` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `prerequisites` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `publishedAt` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `targetAudienceId` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnailId` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the `Enrollment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Language` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Lesson` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Media` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Module` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TargetAudience` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_bannerId_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_languageId_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_targetAudienceId_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_thumbnailId_fkey";

-- DropForeignKey
ALTER TABLE "Enrollment" DROP CONSTRAINT "Enrollment_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Enrollment" DROP CONSTRAINT "Enrollment_userId_fkey";

-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "Module" DROP CONSTRAINT "Module_courseId_fkey";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "authorId",
DROP COLUMN "bannerId",
DROP COLUMN "categoryId",
DROP COLUMN "difficulty",
DROP COLUMN "enrollmentType",
DROP COLUMN "languageId",
DROP COLUMN "prerequisites",
DROP COLUMN "publishedAt",
DROP COLUMN "targetAudienceId",
DROP COLUMN "thumbnailId",
ADD COLUMN     "categoryid" TEXT,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "isPublished" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "price" DROP DEFAULT;

-- DropTable
DROP TABLE "Enrollment";

-- DropTable
DROP TABLE "Language";

-- DropTable
DROP TABLE "Lesson";

-- DropTable
DROP TABLE "Media";

-- DropTable
DROP TABLE "Module";

-- DropTable
DROP TABLE "TargetAudience";

-- DropEnum
DROP TYPE "DifficultyLevel";

-- DropEnum
DROP TYPE "EnrollmentType";

-- DropEnum
DROP TYPE "LessonType";

-- DropEnum
DROP TYPE "MediaType";

-- CreateTable
CREATE TABLE "Attachment" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "courseId" TEXT NOT NULL,

    CONSTRAINT "Attachment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Attachment_courseId_idx" ON "Attachment"("courseId");

-- CreateIndex
CREATE INDEX "Course_categoryid_idx" ON "Course"("categoryid");

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_categoryid_fkey" FOREIGN KEY ("categoryid") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
