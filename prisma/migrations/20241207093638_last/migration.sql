-- AlterTable
ALTER TABLE "Attachment" ADD COLUMN     "size" INTEGER;

-- CreateTable
CREATE TABLE "Chapter" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "videoUrl" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "isFree" BOOLEAN NOT NULL DEFAULT false,
    "courseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Chapter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MuxData" (
    "id" TEXT NOT NULL,
    "assetId" TEXT NOT NULL,
    "playBackId" TEXT,
    "chapterId" TEXT NOT NULL,

    CONSTRAINT "MuxData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserProgess" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "chapterId" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserProgess_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Purchase" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StripeCustomer" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "stripeCutomerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StripeCustomer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Chapter_courseId_idx" ON "Chapter"("courseId");

-- CreateIndex
CREATE UNIQUE INDEX "MuxData_chapterId_key" ON "MuxData"("chapterId");

-- CreateIndex
CREATE INDEX "UserProgess_chapterId_idx" ON "UserProgess"("chapterId");

-- CreateIndex
CREATE UNIQUE INDEX "UserProgess_userId_chapterId_key" ON "UserProgess"("userId", "chapterId");

-- CreateIndex
CREATE INDEX "Purchase_courseId_idx" ON "Purchase"("courseId");

-- CreateIndex
CREATE UNIQUE INDEX "StripeCustomer_stripeCutomerId_key" ON "StripeCustomer"("stripeCutomerId");

-- AddForeignKey
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MuxData" ADD CONSTRAINT "MuxData_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProgess" ADD CONSTRAINT "UserProgess_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
