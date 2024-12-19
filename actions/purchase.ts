"use server"

import { prisma } from "@/utils/prisma"
import { auth } from "@clerk/nextjs/server"
import { Purchase } from "@prisma/client"

export const CoursePurchase = async (courseId: string) => {
  try {
    const { userId } = await auth()

    if (!userId) {
      throw new Error("Unauthorized")
    }

    const course = await prisma.purchase.create({
      data: {
        courseId,
        userId,
      },
    })

    return course
  } catch (error) {
    console.error("[UPDATE_CHAPTER]", error)
    throw new Error("Failed to update chapter")
  }
}
