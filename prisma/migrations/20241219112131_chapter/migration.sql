-- AlterTable
ALTER TABLE "Chapter" ADD COLUMN     "duration" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "UserProgess" ADD COLUMN     "completedAt" TIMESTAMP(3),
ADD COLUMN     "duration" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "progress" DOUBLE PRECISION,
ADD COLUMN     "startedAt" TIMESTAMP(3);
