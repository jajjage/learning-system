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

export interface CourseWithCountAndRatings extends Course {
  user: {
    firstName: string
    lastName: string
    clerkId: string
  }
  category: {
    name: string
  } | null
  _count: {
    chapters: number
  }
  // ratings
}

export interface CourseEnroll extends Course {
  user: {
    firstName: string
    lastName: string
  }
  _count: {
    chapters: number
  }
  chapters: {
    id: string
    title: string
    position: number
    duration: string
    videoUrl: string
    muxData: {
      playBackId: string
    }
    userProgress: {
      id: string
      userId: string
      isCompleted: boolean
    }[]
  }[]
}
