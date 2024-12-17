// lib/actions/enrollment.ts
"use server"

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

export async function createEnrollment(courseId: string) {
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
      throw new Error("Already enrolled in this course")
    }

    // Check enrollment capacity if maxEnrollment is set
    if (course.maxEnrollment) {
      const currentEnrollments = await prisma.enrollment.count({
        where: { courseId },
      })

      if (currentEnrollments >= course.maxEnrollment) {
        throw new Error("Course is full")
      }
    }

    // Create enrollment
    const enrollment = await prisma.enrollment.create({
      data: {
        userId,
        courseId,
        status: "PENDING", // You might want to change this based on your workflow
      },
      include: {
        course: {
          select: {
            title: true,
          },
        },
      },
    })

    revalidatePath(`/courses/${courseId}`)
    return enrollment
  } catch (error) {
    console.error("[CREATE_ENROLLMENT]", error)
    throw error
  }
}
