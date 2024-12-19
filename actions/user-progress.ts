"use server"

import { prisma } from "@/utils/prisma"
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

// Creates or gets initial progress without marking as completed
export async function initializeChapterProgress(chapterId: string) {
  try {
    const { userId } = await auth()
    if (!userId) {
      throw new Error("Unauthorized")
    }

    const userProgress = await prisma.userProgress.upsert({
      where: {
        userId_chapterId: {
          userId,
          chapterId,
        },
      },
      update: {}, // Don't update anything if exists
      create: {
        userId,
        chapterId,
        startedAt: new Date(),
        isCompleted: false,
        progress: 0,
      },
    })

    revalidatePath(`/learn/course/${chapterId}`)
    return { success: true, data: userProgress }
  } catch (error) {
    console.error("Failed to initialize progress:", error)
    return { success: false, error: "Failed to initialize progress" }
  }
}

// Marks chapter as completed
export async function markChapterCompleted(chapterId: string) {
  try {
    const { userId } = await auth()
    if (!userId) {
      throw new Error("Unauthorized")
    }

    await prisma.userProgress.upsert({
      where: {
        userId_chapterId: {
          userId,
          chapterId,
        },
      },
      create: {
        userId,
        chapterId,
        isCompleted: true,
        progress: 100,
        startedAt: new Date(),
        completedAt: new Date(),
      },
      update: {
        isCompleted: true,
        progress: 100,
        completedAt: new Date(),
      },
    })

    revalidatePath(`/learn/course/${chapterId}`)
    return { success: true }
  } catch (error) {
    console.error("Failed to mark chapter as completed:", error)
    return { success: false, error: "Failed to update progress" }
  }
}
