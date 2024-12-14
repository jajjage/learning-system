import { Course } from "@prisma/client"

export interface CourseWithCount extends Course {
  user: {
    firstName: string
    lastName: string
  }
  category: {
    name: string
  }
  _count: {
    chapters: number
  }
}
