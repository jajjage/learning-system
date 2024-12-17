import { EnrollmentStatus } from "@prisma/client"

export interface Enrollment {
  id: string
  status: EnrollmentStatus
  enrolledAt: Date
  completedAt?: Date
  grade?: number
  lastAccessed?: Date
  notes?: string
  userId: string
  courseId: string
  courseTitle: string
  price?: number
  enrollmentLimit?: number
  currentEnrollments?: number
  //   _count: {
  //     enrollments: number
  //   }
}
