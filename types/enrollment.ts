import { EnrollmentStatus } from "@prisma/client"

export interface CourseWithEnrollments {
  id: string
  title: string
  price: number | null
  description: string | null
  maxEnrollment: number | null
  _count: { enrollments: number }
}

export interface Enrollment {
  id: string
  userId: string
  courseId: string
  status: EnrollmentStatus
  enrolledAt: Date
  completedAt?: Date
}
