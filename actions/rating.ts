// actions/rating.ts
"use server"

import { prisma } from "@/utils/prisma"
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

type CreateRatingData = {
  courseId: string
  rating: number
  comment?: string
}

export async function createRating(data: CreateRatingData) {
  try {
    const { userId } = await auth()

    if (!userId) {
      throw new Error("Unauthorized")
    }

    return await prisma.$transaction(async (tx) => {
      // Create the rating
      const newRating = await tx.rating.create({
        data: {
          userId,
          courseId: data.courseId,
          rating: data.rating,
          comment: data.comment,
        },
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
      })

      // Update course statistics
      const ratings = await tx.rating.findMany({
        where: { courseId: data.courseId },
        select: { rating: true },
      })

      const totalRatings = ratings.length
      const averageRating =
        totalRatings > 0
          ? ratings.reduce((sum, r) => sum + r.rating, 0) / totalRatings
          : null

      await tx.course.update({
        where: { id: data.courseId },
        data: {
          averageRating,
          totalRatings,
        },
      })

      revalidatePath(`/courses/${data.courseId}`)
      return newRating
    })
  } catch (error) {
    console.error("[CREATE_RATING]", error)
    throw new Error("Failed to create rating")
  }
}

export async function markHelpful(ratingId: string) {
  try {
    const { userId } = await auth()

    if (!userId) {
      throw new Error("Unauthorized")
    }

    return await prisma.$transaction(async (tx) => {
      // Check for existing vote
      const existingVote = await tx.helpfulVote.findUnique({
        where: {
          userId_ratingId: {
            userId,
            ratingId,
          },
        },
      })

      if (existingVote) {
        throw new Error("Already marked as helpful")
      }

      // Create vote and increment count
      await tx.helpfulVote.create({
        data: {
          userId,
          ratingId,
        },
      })

      const updatedRating = await tx.rating.update({
        where: { id: ratingId },
        data: {
          helpfulCount: {
            increment: 1,
          },
        },
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
      })

      return updatedRating
    })
  } catch (error) {
    console.error("[MARK_HELPFUL]", error)
    throw new Error("Failed to mark as helpful")
  }
}
