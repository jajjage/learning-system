-- CreateTable
CREATE TABLE "UserChapterAccess" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "chapterId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserChapterAccess_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserChapterAccess_userId_idx" ON "UserChapterAccess"("userId");

-- CreateIndex
CREATE INDEX "UserChapterAccess_courseId_idx" ON "UserChapterAccess"("courseId");

-- CreateIndex
CREATE UNIQUE INDEX "UserChapterAccess_userId_chapterId_key" ON "UserChapterAccess"("userId", "chapterId");

-- AddForeignKey
ALTER TABLE "UserChapterAccess" ADD CONSTRAINT "UserChapterAccess_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserChapterAccess" ADD CONSTRAINT "UserChapterAccess_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
