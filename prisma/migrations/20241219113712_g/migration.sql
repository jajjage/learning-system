-- AlterTable
ALTER TABLE "Chapter" ALTER COLUMN "duration" DROP NOT NULL,
ALTER COLUMN "duration" DROP DEFAULT,
ALTER COLUMN "duration" SET DATA TYPE TEXT;
