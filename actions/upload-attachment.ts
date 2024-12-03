"use server"

import { auth } from "@clerk/nextjs/server"
import { prisma } from "@/utils/prisma"

export async function createAttachment(
  courseId: string,
  url: string,
  name: string,
) {
  const { userId } = await auth()

  if (!userId) {
    throw new Error("Unauthorized")
  }

  try {
    const attachment = await prisma.attachment.create({
      data: {
        url,
        name,
        courseId,
      },
    })

    return attachment
  } catch (error) {
    console.error("Error creating attachment:", error)
    throw new Error("Failed to create attachment")
  }
}

export async function deleteAttachment(attachmentId: string) {
  const { userId } = await auth()

  if (!userId) {
    throw new Error("Unauthorized")
  }

  try {
    await prisma.attachment.delete({
      where: { id: attachmentId },
    })
    return { success: true }
  } catch (error) {
    console.error("Failed to delete attachment:", error)
    throw new Error("Failed to delete attachment")
  }
}

export async function getAttachments(courseId: string) {
  const { userId } = await auth()

  if (!userId) {
    throw new Error("Unauthorized")
  }

  try {
    const attachments = await prisma.attachment.findMany({
      where: { courseId },
      select: { id: true, name: true, url: true },
    })
    return attachments
  } catch (error) {
    console.error("Failed to fetch attachments:", error)
    throw new Error("Failed to fetch attachments")
  }
}
