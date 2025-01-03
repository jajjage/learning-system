// lib/actions/enrollment.ts
"use server"

import { CourseWithEnrollments, Enrollment } from "@/types/enrollment"
import { prisma } from "@/utils/prisma"
import { auth } from "@clerk/nextjs/server"
import { EnrollmentStatus } from "@prisma/client"
import { revalidatePath } from "next/cache"

export type EnrollmentStatusType = {
  isEnrolled: boolean
  enrollStatus: EnrollmentStatus | null
  enrolledAt?: Date
  courseId: string
}

export async function getEnrollCourse(
  courseId: string,
): Promise<CourseWithEnrollments | null> {
  try {
    const { userId } = await auth()

    if (!userId) {
      throw new Error("Unauthorized")
    }
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        _count: {
          select: { enrollments: true },
        },
      },
    })
    return course
  } catch (error) {
    console.error("[ENROLLMENT_STATUS]", error)
    throw new Error("Failed to check enrollment status")
  }
}

export async function checkEnrollmentStatus(
  courseId: string,
): Promise<EnrollmentStatusType> {
  try {
    const { userId } = await auth()

    if (!userId) {
      return {
        isEnrolled: false,
        enrollStatus: null,
        courseId,
      }
    }

    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
      select: {
        status: true,
        enrolledAt: true,
      },
    })

    if (!enrollment) {
      return {
        isEnrolled: false,
        enrollStatus: null,
        courseId,
      }
    }

    return {
      isEnrolled: true,
      enrollStatus: enrollment.status,
      enrolledAt: enrollment.enrolledAt,
      courseId,
    }
  } catch (error) {
    console.error("[CHECK_ENROLLMENT_STATUS]", error)
    throw new Error("Failed to check enrollment status")
  }
}

export async function grantCourseAccess(courseId: string) {
  try {
    const { userId } = await auth()

    if (!userId) {
      throw new Error("Unauthorized")
    }

    // 1. First get all chapters for the course
    const chapters = await prisma.chapter.findMany({
      where: {
        courseId: courseId,
        isPublished: true,
      },
      select: {
        id: true,
      },
    })

    // 2. Create UserChapterAccess records for each chapter
    const chapterAccesses = chapters.map((chapter) => ({
      userId: userId,
      chapterId: chapter.id,
      courseId: courseId,
    }))

    // 3. Use createMany to efficiently insert all records
    await prisma.userChapterAccess.createMany({
      data: chapterAccesses,
      skipDuplicates: true, // In case some access records already exist
    })

    return { success: true }
  } catch (error) {
    console.error("[GRANT_COURSE_ACCESS]", error)
    throw new Error("Failed to grant course access")
  }
}

export async function updateEnrollment(
  courseId: string,
  data: Partial<Enrollment>,
) {
  try {
    const { userId } = await auth()

    if (!userId) {
      throw new Error("Unauthorized")
    }

    const enrollment = await prisma.enrollment.update({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    })

    if (data.status === "ACTIVE") {
      // Grant access to all chapters when enrollment becomes active
      await grantCourseAccess(courseId)
    }

    revalidatePath(`/courses/${courseId}`)
    return enrollment
  } catch (error) {
    console.error("[UPDATE_ENROLLMENT]", error)
    throw error
  }
}

export async function createEnrollment(
  courseId: string,
  data: Partial<Enrollment>,
) {
  try {
    const { userId } = await auth()

    if (!userId) {
      throw new Error("Unauthorized")
    }

    // Check if course exists and is open for enrollment
    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
        isPublished: true,
        isEnrollmentOpen: true,
      },
    })

    if (!course) {
      throw new Error("Course not found or not available for enrollment")
    }

    // Check if user is already enrolled
    const existingEnrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    })

    if (existingEnrollment) {
      // If enrollment exists, update it instead
      return updateEnrollment(courseId, data)
    }

    // Check enrollment capacity
    if (course.maxEnrollment) {
      const currentEnrollments = await prisma.enrollment.count({
        where: { courseId },
      })

      if (currentEnrollments >= course.maxEnrollment) {
        throw new Error("Course is full")
      }
    }

    // Create enrollment with provided data
    const enrollment = await prisma.enrollment.create({
      data: {
        userId,
        courseId,
        status: data.status || "PENDING",
        ...data,
      },
      include: {
        course: {
          select: {
            title: true,
          },
        },
      },
    })

    // If status is ACTIVE, grant access to chapters
    if (enrollment.status === "ACTIVE") {
      await grantCourseAccess(courseId)
    }

    revalidatePath(`/courses/${courseId}`)
    return enrollment
  } catch (error) {
    console.error("[CREATE_ENROLLMENT]", error)
    throw error
  }
}
