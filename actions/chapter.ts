"use server"

import { prisma } from "@/utils/prisma"
import { auth } from "@clerk/nextjs/server"
import { Chapter } from "@prisma/client"

import { revalidatePath } from "next/cache"

export async function createChapter(courseId: string, title: string) {
  try {
    const { userId } = await auth()

    if (!userId) {
      throw new Error("Unauthorized")
    }

    // Validate inputs
    if (!courseId || !title) {
      throw new Error("Missing required fields")
    }

    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
      include: {
        chapters: {
          orderBy: {
            position: "desc",
          },
        },
      },
    })

    if (!course) {
      throw new Error("Course not found")
    }

    const lastChapter = course.chapters[0]
    const newPosition = lastChapter ? lastChapter.position + 1 : 1

    const chapter = await prisma.chapter.create({
      data: {
        title,
        courseId,
        position: newPosition,
      },
    })

    revalidatePath(`/teacher/courses/${courseId}`)
    return chapter
  } catch (error) {
    console.error("[CREATE_CHAPTER]", error)
    throw error // Throw the original error for better debugging
  }
}

export async function reorderChapters(
  courseId: string,
  updateData: { id: string; position: number }[],
) {
  try {
    const { userId } = await auth()

    if (!userId) {
      throw new Error("Unauthorized")
    }

    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
    })

    if (!course) {
      throw new Error("Course not found")
    }

    const updatedChapters = await Promise.all(
      updateData.map((chapter) =>
        prisma.chapter.update({
          where: { id: chapter.id },
          data: { position: chapter.position },
        }),
      ),
    )

    revalidatePath(`/teacher/courses/${courseId}`)
    return updatedChapters
  } catch (error) {
    console.error("[REORDER_CHAPTERS]", error)
    throw new Error("Failed to reorder chapters")
  }
}

export async function chapterList(chapterId: string, courseId: string) {
  try {
    const { userId } = await auth()

    if (!userId) {
      throw new Error("Unauthorized")
    }

    const chapters = await prisma.chapter.findUnique({
      where: {
        id: chapterId,
        courseId: courseId,
      },
      include: {
        muxData: true,
      },
    })

    if (!chapters) {
      throw new Error("Course not found")
    }

    return chapters
  } catch (error) {
    console.error("[CREATE_CHAPTER]", error)
    throw error // Throw the original error for better debugging
  }
}

export async function updateChapter(
  courseId: string,
  chapterId: string,
  data: Partial<Chapter>,
) {
  try {
    const { userId } = await auth()

    if (!userId) {
      throw new Error("Unauthorized")
    }

    const chapter = await prisma.chapter.update({
      where: {
        id: chapterId,
        courseId: courseId,
      },
      data,
    })

    revalidatePath(`/teacher/courses/${courseId}/chapters/${chapterId}`)
    return chapter
  } catch (error) {
    console.error("[UPDATE_CHAPTER]", error)
    throw new Error("Failed to update chapter")
  }
}

export async function updateChapterAccess(
  courseId: string,
  chapterId: string,
  isFree: boolean,
) {
  try {
    const { userId } = await auth()

    if (!userId) {
      throw new Error("Unauthorized")
    }

    const chapter = await prisma.chapter.update({
      where: {
        id: chapterId,
        courseId: courseId,
      },
      data: { isFree },
    })

    revalidatePath(`/teacher/courses/${courseId}/chapters/${chapterId}`)
    return chapter
  } catch (error) {
    console.error("[UPDATE_CHAPTER_ACCESS]", error)
    throw new Error("Failed to update chapter access")
  }
}

export async function updateChapterVideo(
  courseId: string,
  chapterId: string,
  videoUrl: string,
) {
  try {
    const { userId } = await auth()

    if (!userId) {
      throw new Error("Unauthorized")
    }

    const chapter = await prisma.chapter.update({
      where: {
        id: chapterId,
        courseId: courseId,
      },
      data: { videoUrl },
    })

    revalidatePath(`/teacher/courses/${courseId}/chapters/${chapterId}`)
    return chapter
  } catch (error) {
    console.error("[UPDATE_CHAPTER_VIDEO]", error)
    throw new Error("Failed to update chapter video")
  }
}
