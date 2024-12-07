import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createChapter, reorderChapters } from "@/actions/chapter"
import toast from "react-hot-toast"

// Types
interface Chapter {
  id: string
  position: number
}

interface CreateChapterVariables {
  title: string
}

interface ReorderChaptersVariables {
  items: { id: string; position: number }[]
}

export const useCreateChapterMutation = (courseId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (title: string) => {
      if (!title) {
        throw new Error("Title is required")
      }

      // Pass parameters separately as the server action expects
      return await createChapter(courseId, title)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["course", courseId],
      })
      toast.success("Chapter created successfully")
    },
    onError: (error) => {
      toast.error("Failed to create chapter")
      console.error("[CREATE_CHAPTER_ERROR]", error)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["course", courseId] })
    },
  })
}

export const useReorderChaptersMutation = (courseId: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (updateData: { id: string; position: number }[]) =>
      reorderChapters(courseId, updateData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["course", courseId] })
      toast.success("Chapters reordered successfully")
    },
    onError: (error) => {
      toast.error("Failed to reorder chapters")
      console.error(error)
    },
  })
}
