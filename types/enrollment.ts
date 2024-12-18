export interface CourseWithEnrollments {
  id: string
  title: string
  price: number | null
  description: string | null
  maxEnrollment: number | null
  _count: { enrollments: number }
}
