import { Course } from "@prisma/client"

export interface CourseWithCount extends Course {
  _count: {
    chapters: number
  }
}
