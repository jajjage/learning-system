// app/api/uploadthing/core.ts
import { createUploadthing, type FileRouter } from "uploadthing/next"
import { UploadThingError } from "uploadthing/server"
import { auth } from "@clerk/nextjs/server"

const f = createUploadthing()

export const ourFileRouter = {
  courseImage: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    .middleware(async () => {
      const { userId } = await auth()
      console.log("Middleware - userId:", userId)
      if (!userId) throw new UploadThingError("Unauthorized")
      return { userId }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete - userId:", metadata.userId)
      console.log("Upload complete - file:", file)
      return { uploadedBy: metadata.userId }
    }),

  courseAttachment: f({
    pdf: { maxFileSize: "16MB" },
    image: { maxFileSize: "4MB" },
    video: { maxFileSize: "512MB" },
    audio: { maxFileSize: "16MB" },
    text: { maxFileSize: "1MB" },
  })
    .middleware(async () => {
      const { userId } = await auth()
      console.log("Middleware - userId:", userId)
      if (!userId) throw new Error("Unauthorized")
      return { userId }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete - userId:", metadata.userId)
      console.log("Upload complete - file:", file)
      return { uploadedBy: metadata.userId }
    }),
  // ... other routes
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
