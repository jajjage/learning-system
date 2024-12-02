/*
  Warnings:

  - You are about to drop the column `categoryid` on the `Course` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_categoryid_fkey";

-- DropIndex
DROP INDEX "Course_categoryid_idx";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "categoryid",
ADD COLUMN     "categoryId" TEXT;

-- CreateIndex
CREATE INDEX "Course_categoryId_idx" ON "Course"("categoryId");

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
