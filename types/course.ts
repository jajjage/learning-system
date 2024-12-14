import { Course } from "@prisma/client"

export interface CourseWithCount extends Course {
  user: {
    firstName: string
    lastName: string
  }
  category: {
    name: string
  } | null
  _count: {
    chapters: number
  }
  chapters: {
    id: string
    title: string
    position: number
    userProgress: {
      id: string
      userId: string
      isCompleted: boolean
    }[]
  }[]

  progress: number | null // percentage of completed chapters
}
