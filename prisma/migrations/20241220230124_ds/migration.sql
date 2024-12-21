-- AddForeignKey
ALTER TABLE "UserChapterAccess" ADD CONSTRAINT "UserChapterAccess_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
