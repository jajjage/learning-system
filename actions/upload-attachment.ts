"use server"
import { prisma } from "@/utils/prisma"
import { auth } from "@clerk/nextjs/server"

export const uploadAttachment = async (
  courseId: string,
  url: string,
  name: string,
  size: number,
) => {
  try {
    const { userId } = await auth()

    if (!userId) {
      throw new Error("Unauthorized")
    }

    const courseOwner = await prisma.course.findUnique({
      where: {
        id: courseId,
        userId: userId,
      },
    })

    if (!courseOwner) {
      throw new Error("Unauthorized")
    }

    const attachment = await prisma.attachment.create({
      data: {
        url,
        name,
        size,
        courseId: courseId,
      },
    })

    return attachment
  } catch (error) {
    console.log("[COURSE_ID_ATTACHMENTS]", error)
    throw new Error("Failed to add attachment")
  }
}

export const deleteAttachment = async (
  courseId: string,
  attachmentId: string,
) => {
  try {
    const { userId } = await auth()

    if (!userId) {
      throw new Error("Unauthorized")
    }

    const courseOwner = await prisma.course.findUnique({
      where: {
        id: courseId,
        userId: userId,
      },
      include: {
        attachments: true,
      },
    })

    if (!courseOwner) {
      throw new Error("Unauthorized")
    }

    const attachment = await prisma.attachment.delete({
      where: {
        id: attachmentId,
        courseId: courseId,
      },
    })

    return attachment
  } catch (error) {
    console.log("[ATTACHMENT_ID_DELETE]", error)
    throw new Error("Failed to delete attachment")
  }
}
