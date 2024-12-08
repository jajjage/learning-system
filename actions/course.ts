"use server"

import { prisma } from "@/utils/prisma"
import { auth } from "@clerk/nextjs/server"
import { Course } from "@prisma/client"
import { revalidatePath } from "next/cache"

export const onCreateCourse = async (userId: string, title: string) => {
  try {
    const course = await prisma.course.create({
      data: {
        userId,
        title,
      },
    })

    if (course) {
      return {
        id: course.id,
        status: 200,
        message: "Course successfully created",
      }
    }

    return { status: 404, message: "Group not found" }
  } catch (error) {
    return { status: 400, message: "Oops! something went wrong" }
  }
}

export async function getCourse(courseId: string, userId: string) {
  try {
    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
      include: {
        chapters: {
          orderBy: {
            position: "asc",
          },
        },

        attachments: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    })
    return course
  } catch (error) {
    console.error("Failed to fetch course:", error)
    return null
  }
}

export const updateCourse = async (courseId: string, data: Partial<Course>) => {
  try {
    const { userId } = await auth()

    if (!userId) {
      throw new Error("Unauthorized")
    }

    const course = await prisma.course.update({
      where: {
        id: courseId,
        userId: userId,
      },
      data,
    })

    revalidatePath(`/teacher/courses/${courseId}`)
    return course
  } catch (error) {
    console.error("[UPDATE_CHAPTER]", error)
    throw new Error("Failed to update chapter")
  }
}

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    })
    return categories
  } catch (error) {
    console.error("Failed to fetch categories:", error)
    return []
  }
}
