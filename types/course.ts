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

export interface EnrolledCourseWithProgress {
  id: string
  title: string
  description: string | null
  imageUrl: string | null
  category: string | null
  enrollmentStatus: "PENDING" | "ACTIVE"
  enrolledAt: Date
  chapters: {
    id: string
    title: string
    isCompleted: boolean
  }[]
  progress: number
  courseProgress: {
    isCompleted: boolean
    completedChapters: number
    totalChapters: number
  }
  instructor: {
    firstName: string
    lastName: string
  }
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
  id: string
  title: string
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
    duration: string | null
    videoUrl: string
    isFree: boolean
    isPublished: boolean
    hasAccess: boolean
    muxData: {
      playBackId: string | null
    }
    userProgress: {
      id: string
      userId: string
      isCompleted: boolean
    }[]
  }[]
}
