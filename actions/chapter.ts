"use server"

import { prisma } from "@/utils/prisma"
import { auth } from "@clerk/nextjs/server"
import Mux from "@mux/mux-node"
import { Assets } from "@mux/mux-node/resources/video/assets.mjs"
import { Chapter } from "@prisma/client"
import { revalidatePath } from "next/cache"

const client = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET,
})

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

    if (data.videoUrl) {
      const existingMuxData = await prisma.muxData.findFirst({
        where: { chapterId: chapterId },
      })

      if (existingMuxData) {
        try {
          await client.video.assets.delete(existingMuxData.assetId)
          await prisma.muxData.delete({
            where: { id: existingMuxData.id }, // Use the correct identifier
          })
        } catch (error) {
          console.error("Error during asset deletion:", error)
          throw new Error("Failed to delete existing video asset.")
        }
      }

      try {
        const asset = await client.video.assets.create({
          input: [{ url: data.videoUrl }],
          playback_policy: ["public"],
          test: false,
        })

        await prisma.muxData.create({
          data: {
            chapterId: chapterId,
            assetId: asset.id,
            playBackId: asset.playback_ids?.[0]?.id,
          },
        })
        // const assetId = await client.video.assets.retrieve(asset.id)
        // assetr = assetId
      } catch (error) {
        console.error("Error during video upload or Mux data creation:", error)
        throw new Error("Failed to upload new video or save Mux data.")
      }
    }

    revalidatePath(`/teacher/courses/${courseId}/chapters/${chapterId}`)
    return chapter
  } catch (error) {
    console.error("[UPDATE_CHAPTER]", error)
    throw new Error("Failed to update chapter")
  }
}

export const checkAssetStatus = async (assetId: string) => {
  try {
    const asset = await client.video.assets.retrieve(assetId)

    if (asset.status === "ready") {
      return {
        status: asset.status,
      }
    }
    if (asset.status === "preparing") {
      return {
        status: asset.status,
      }
    }
  } catch (error) {
    console.error("Error checking asset status:", error)
    throw error
  }
}

export async function updateChapterPublishStatus(
  chapterId: string,
  isPublished: boolean,
) {
  try {
    const { userId } = await auth()

    if (!userId) {
      throw new Error("Unauthorized")
    }

    const chapter = await prisma.chapter.update({
      where: {
        id: chapterId,
        course: {
          userId,
        },
      },
      data: {
        isPublished,
      },
    })

    revalidatePath(`/teacher/courses/${chapter.courseId}/chapters/${chapterId}`)
    return { isPublished: chapter.isPublished }
  } catch (error) {
    console.error("[UPDATE_CHAPTER_PUBLISH_STATUS]", error)
    throw new Error("Failed to update chapter publish status")
  }
}

export async function deleteChapter(chapterId: string, courseId?: string) {
  try {
    const { userId } = await auth()

    if (!userId) {
      throw new Error("Unauthorized")
    }

    const chapter = await prisma.chapter.findUnique({
      where: {
        id: chapterId,
      },
      include: {
        course: true,
        muxData: true,
      },
    })

    if (!chapter) {
      throw new Error("Chapter not found")
    }

    if (chapter.course.userId !== userId) {
      throw new Error("Unauthorized")
    }

    if (chapter.videoUrl) {
      const existingMuxData = await prisma.muxData.findFirst({
        where: { chapterId: chapterId },
      })

      if (existingMuxData) {
        try {
          await client.video.assets.delete(existingMuxData.assetId)
          await prisma.muxData.delete({
            where: { id: existingMuxData.id }, // Use the correct identifier
          })
        } catch (error) {
          console.error("Error during asset deletion:", error)
          throw new Error("Failed to delete existing video asset.")
        }
      }
    }
    await prisma.chapter.delete({
      where: {
        id: chapterId,
      },
    })
    const publishedChaptersInCourse = await prisma.chapter.findMany({
      where: {
        courseId: courseId,
        isPublished: true,
      },
    })

    if (!publishedChaptersInCourse.length) {
      await prisma.course.update({
        where: {
          id: chapter.course.id,
        },
        data: {
          isPublished: false,
        },
      })
    }
  } catch (error) {
    console.error("[DELETE_CHAPTER]", error)
    throw new Error("Failed to delete chapter")
  }
}

export async function hasChapterAccess(chapterId: string): Promise<boolean> {
  try {
    const { userId } = await auth()

    if (!userId) {
      throw new Error("Unauthorized")
    }

    // Check if chapter is marked as free for everyone
    const chapter = await prisma.chapter.findUnique({
      where: { id: chapterId },
      select: { isFree: true },
    })

    if (chapter?.isFree) {
      return true
    }

    // Check if user has specific access
    const access = await prisma.userChapterAccess.findUnique({
      where: {
        userId_chapterId: {
          userId: userId,
          chapterId: chapterId,
        },
      },
    })

    return !!access
  } catch {
    return false
  }
}
