"use server"

import { prisma } from "@/utils/prisma"
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

export const updateCourseTitle = async (courseId: string, title: string) => {
  try {
    await prisma.course.update({
      where: { id: courseId },
      data: { title },
    })
    revalidatePath(`/courses/${courseId}`)
    return { success: true }
  } catch (error) {
    console.error("Failed to update course title:", error)
    return { success: false }
  }
}

export async function updateCourseDescription(
  courseId: string,
  description: string,
) {
  try {
    await prisma.course.update({
      where: { id: courseId },
      data: { description },
    })
    revalidatePath(`/courses/${courseId}`)
    return { success: true }
  } catch (error) {
    console.error("Failed to update course description:", error)
    return { success: false }
  }
}

export async function updateCoursePrice(
  courseId: string,
  price: number | null,
) {
  try {
    await prisma.course.update({
      where: { id: courseId },
      data: { price },
    })
    revalidatePath(`/courses/${courseId}`)
    return { success: true }
  } catch (error) {
    console.error("Failed to update course price:", error)
    return { success: false }
  }
}

export async function updateCourseImage(
  courseId: string,
  imageUrl: string | null,
) {
  try {
    await prisma.course.update({
      where: { id: courseId },
      data: { imageUrl },
    })
    revalidatePath(`/courses/${courseId}`)
    return { success: true }
  } catch (error) {
    console.error("Failed to update course image:", error)
    return { success: false }
  }
}

export async function updateCourseCategory(
  courseId: string,
  categoryId: string | null,
) {
  try {
    await prisma.course.update({
      where: { id: courseId },
      data: { categoryId },
    })
    revalidatePath(`/courses/${courseId}`)
    return { success: true }
  } catch (error) {
    console.error("Failed to update course category:", error)
    return { success: false }
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
