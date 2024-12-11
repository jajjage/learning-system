"use server"

import { CourseWithCount } from "@/types/course"
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
export async function getCourses(userId: string) {
  try {
    const course = (await prisma.course.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        _count: {
          select: { chapters: true },
        },
      },
    })) as CourseWithCount[]
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

export async function updateCoursePublishStatus(
  courseId: string,
  isPublished: boolean,
): Promise<Course> {
  try {
    const { userId } = await auth()

    if (!userId) {
      throw new Error("Unauthorized")
    }

    const course = await prisma.course.update({
      where: {
        id: courseId,
        userId,
      },
      data: {
        isPublished,
      },
    })

    revalidatePath(`/teacher/courses/${courseId}`)
    return course
  } catch (error) {
    console.error("[UPDATE_COURSE_PUBLISH_STATUS]", error)
    throw new Error("Failed to update course publish status")
  }
}

export async function deleteCourse(courseId: string) {
  try {
    const { userId } = await auth()

    if (!userId) {
      throw new Error("Unauthorized")
    }

    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
        userId: userId,
      },
      include: {
        chapters: true,
      },
    })

    if (!course) {
      throw new Error("Course not found")
    }
    // if (course.chapters.) {
    //   const existingMuxData = await prisma.muxData.findFirst({
    //     where: { chapterId: chapterId },
    //   })

    //   if (existingMuxData) {
    //     try {
    //       await client.video.assets.delete(existingMuxData.assetId)
    //       await prisma.muxData.delete({
    //         where: { id: existingMuxData.id }, // Use the correct identifier
    //       })
    //     } catch (error) {
    //       console.error("Error during asset deletion:", error)
    //       throw new Error("Failed to delete existing video asset.")
    //     }
    //   }
    // }
    // Delete all chapters associated with the course
    await prisma.chapter.deleteMany({
      where: {
        courseId: courseId,
      },
    })

    // Delete the course
    await prisma.course.delete({
      where: {
        id: courseId,
      },
    })

    revalidatePath("/teacher/courses")
  } catch (error) {
    console.error("[DELETE_COURSE]", error)
    throw new Error("Failed to delete course")
  }
}
