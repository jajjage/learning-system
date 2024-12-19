"use server"

import { prisma } from "@/utils/prisma"
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

export async function updateUserProgress(userId: string, chapterId: string) {
  try {
    const { userId } = await auth()
    if (!userId) {
      throw new Error("Unauthorized")
    }
    const existingProgress = await prisma.userProgress.findUnique({
      where: {
        userId_chapterId: {
          userId,
          chapterId,
        },
      },
    })

    if (existingProgress) {
      // Update existing progress
      await prisma.userProgress.update({
        where: {
          id: existingProgress.id,
        },
        data: {
          startedAt: existingProgress.startedAt ?? new Date(),
          updatedAt: new Date(),
        },
      })
    } else {
      // Create new progress
      await prisma.userProgress.create({
        data: {
          userId,
          chapterId,
          startedAt: new Date(),
        },
      })
    }

    revalidatePath("/courses/[courseId]")
    return { success: true }
  } catch (error) {
    console.error("Failed to update user progress:", error)
    return { success: false, error: "Failed to update progress" }
  }
}
