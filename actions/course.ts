"use server"

import {
  CourseEnroll,
  CourseWithCount,
  CourseWithCountAndRatings,
  EnrolledCourseWithProgress,
} from "@/types/course"
import { prisma } from "@/utils/prisma"
import { auth } from "@clerk/nextjs/server"
import { Course } from "@prisma/client"
import { revalidatePath } from "next/cache"

export const onCreateCourse = async (userId: string, title: string) => {
  try {
    const { userId } = await auth()

    if (!userId) {
      throw new Error("Unauthorized")
    }
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

export async function getCourseEdit(courseId: string, userId: string) {
  try {
    const { userId } = await auth()

    if (!userId) {
      throw new Error("Unauthorized")
    }
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

export async function getCourseDetail(
  courseId: string,
): Promise<CourseWithCountAndRatings | null> {
  try {
    const { userId } = await auth()

    if (!userId) {
      throw new Error("Unauthorized")
    }
    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
      include: {
        _count: {
          select: { chapters: true },
        },
        user: {
          select: {
            firstName: true,
            lastName: true,
            clerkId: true,
          },
        },
        category: {
          select: {
            name: true,
          },
        },
      },
    })
    return course as CourseWithCountAndRatings
  } catch (error) {
    console.error("Failed to fetch course:", error)
    return null
  }
}

export async function getEnrolledCourse(
  courseId: string,
): Promise<CourseEnroll | null> {
  try {
    const { userId } = await auth()
    if (!userId) {
      throw new Error("Unauthorized")
    }

    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
      include: {
        _count: {
          select: { chapters: true },
        },
        chapters: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
            title: true,
            position: true,
            duration: true,
            videoUrl: true,
            isFree: true,
            isPublished: true,
            muxData: {
              select: {
                playBackId: true,
              },
            },
            userProgress: {
              where: {
                userId: userId,
              },
              select: {
                id: true,
                userId: true,
                isCompleted: true,
              },
            },
            // Add this to include user-specific access records
            userChapterAccess: {
              where: {
                userId: userId,
              },
              select: {
                id: true,
              },
            },
          },
          orderBy: {
            position: "asc",
          },
        },
        user: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    })

    if (!course) {
      return null
    }

    // Transform the data to include hasAccess field
    const transformedCourse: CourseEnroll = {
      ...course,
      chapters: course.chapters.map((chapter) => ({
        ...chapter,
        hasAccess: chapter.isFree || chapter.userChapterAccess.length > 0,
        // Remove the UserChapterAccess field as it's not in our type definition
        UserChapterAccess: undefined,
      })) as CourseEnroll["chapters"],
    }

    console.log("course data:", transformedCourse)
    return transformedCourse
  } catch (error) {
    console.error("Failed to fetch course:", error)
    return null
  }
}

export async function teacherCourses(
  searchQuery?: string,
  categoryId?: string,
): Promise<CourseWithCount[] | null> {
  try {
    const { userId } = await auth()

    if (!userId) {
      throw new Error("Unauthorized")
    }

    // Build dynamic filter criteria
    const whereClause: any = {
      userId: userId,
    }

    if (searchQuery) {
      whereClause.OR = [
        { title: { contains: searchQuery, mode: "insensitive" } },
        { description: { contains: searchQuery, mode: "insensitive" } },
      ]
    }

    if (categoryId) {
      whereClause.categoryId = categoryId
    }

    const courses = await prisma.course.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        _count: {
          select: { chapters: true },
        },
        user: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        category: {
          select: {
            name: true,
          },
        },
      },
    }) // Ensure the result matches the expected `CourseWithCount[]` type
    return courses as CourseWithCount[]
  } catch (error) {
    console.error("Failed to fetch course:", error)
    return null
  }
}

export async function allCourses(
  searchQuery?: string,
  categoryId?: string,
): Promise<CourseWithCount[] | null> {
  try {
    const { userId } = await auth()

    if (!userId) {
      throw new Error("Unauthorized")
    }

    // Build dynamic filter criteria
    const whereClause: any = {
      isPublished: true,
    }

    if (searchQuery) {
      whereClause.OR = [
        { title: { contains: searchQuery, mode: "insensitive" } },
        { description: { contains: searchQuery, mode: "insensitive" } },
      ]
    }

    if (categoryId) {
      whereClause.categoryId = categoryId
    }

    const courses = await prisma.course.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        _count: {
          select: { chapters: true },
        },
        user: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        category: {
          select: {
            name: true,
          },
        },
        enrollments: {
          where: {
            userId: userId,
          },
        },

        chapters: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
            title: true,
            position: true,
            userProgress: {
              where: {
                userId: userId,
                isCompleted: true,
              },
            },
          },
          orderBy: {
            position: "asc",
          },
        },
      },
    })

    // Calculate progress only for purchased courses
    const coursesWithProgress = courses.map((course) => {
      const hasEnroll = course.enrollments.length > 0

      if (!hasEnroll) {
        return {
          ...course,
          progress: null,
          purchases: undefined, // Optional: remove purchases from returned data
        }
      }

      const publishedChapters = course._count.chapters
      const completedChapters = course.chapters.reduce((acc, chapter) => {
        if (chapter.userProgress.length > 0) {
          return acc + 1
        }
        return acc
      }, 0)
      const progressPercentage =
        publishedChapters === 0
          ? 0
          : (completedChapters / publishedChapters) * 100

      return {
        ...course,
        progress: Math.round(progressPercentage),
        purchases: undefined,
      }
    })

    return coursesWithProgress as CourseWithCount[]
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
    console.log(data)
    const course = await prisma.course.update({
      where: {
        id: courseId,
        userId: userId,
      },
      data: {
        ...data,
      },
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
    //TODO: delete the course mux data if have one

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

export async function getUserEnrolledCourses(): Promise<
  EnrolledCourseWithProgress[]
> {
  try {
    const { userId } = await auth()

    if (!userId) {
      throw new Error("Unauthorized")
    }

    const enrollments = await prisma.enrollment.findMany({
      where: {
        userId: userId,
        OR: [{ status: "ACTIVE" }, { status: "PENDING" }],
      },
      select: {
        status: true,
        createdAt: true,
        course: {
          select: {
            id: true,
            title: true,
            description: true,
            imageUrl: true,
            category: true,
            user: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
            chapters: {
              where: {
                isPublished: true,
              },
              select: {
                id: true,
                title: true,
                userProgress: {
                  where: {
                    userId: userId,
                  },
                  select: {
                    isCompleted: true,
                  },
                },
              },
              orderBy: {
                position: "asc",
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    const courses = enrollments.map((enrollment) => {
      const course = enrollment.course
      const completedChapters = course.chapters.filter(
        (chapter) => chapter.userProgress[0]?.isCompleted,
      ).length

      const totalChapters = course.chapters.length
      const progressPercentage =
        totalChapters === 0 ? 0 : (completedChapters / totalChapters) * 100

      return {
        id: course.id,
        title: course.title,
        description: course.description,
        imageUrl: course.imageUrl,
        category: course.category?.name || "",
        enrollmentStatus: enrollment.status as "ACTIVE" | "PENDING",
        enrolledAt: enrollment.createdAt,
        chapters: course.chapters.map((chapter) => ({
          id: chapter.id,
          title: chapter.title,
          isCompleted: chapter.userProgress[0]?.isCompleted || false,
        })),
        progress: Math.round(progressPercentage),
        courseProgress: {
          isCompleted: completedChapters === totalChapters && totalChapters > 0,
          completedChapters,
          totalChapters,
        },
        instructor: course.user,
      }
    })

    return courses
  } catch (error) {
    console.error("[GET_USER_ENROLLED_COURSES]", error)
    throw error
  }
}
