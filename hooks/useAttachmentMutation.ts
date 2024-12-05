import { useMutation, useQueryClient } from "@tanstack/react-query"
import { uploadAttachment, deleteAttachment } from "@/actions/upload-attachment"
import toast from "react-hot-toast"

interface UploadAttachmentPayload {
  url: string
  name: string
  size: number
}

export const useUploadAttachmentMutation = (courseId: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: UploadAttachmentPayload) => {
      console.log("useUploadAttachmentMutation called with payload:", payload)

      if (
        !payload ||
        typeof payload !== "object" ||
        !payload.url ||
        !payload.name ||
        typeof payload.size !== "number"
      ) {
        console.error("Invalid payload:", payload)
        throw new Error("Invalid payload for attachment upload")
      }

      return await uploadAttachment(
        courseId,
        payload.url,
        payload.name,
        payload.size,
      )
    },
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: ["course", courseId] })
      const previousCourse = queryClient.getQueryData(["course", courseId])
      queryClient.setQueryData(["course", courseId], (old: any) => {
        if (!old) return { Attachment: [{ ...payload }] }
        return {
          ...old,
          Attachment: [...(old.Attachment || []), { ...payload }],
        }
      })
      return { previousCourse }
    },
    onError: (error: any, variables, context: any) => {
      console.error("Mutation error:", error)
      console.error("Mutation variables:", variables)
      queryClient.setQueryData(["course", courseId], context.previousCourse)
      toast.error(error.message || "Failed to upload attachment")
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["course", courseId] })
    },
  })
}

export const useDeleteAttachmentMutation = (courseId: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (attachmentId: string) =>
      deleteAttachment(courseId, attachmentId),
    onMutate: async (attachmentId) => {
      await queryClient.cancelQueries({ queryKey: ["course", courseId] })
      const previousCourse = queryClient.getQueryData(["course", courseId])
      queryClient.setQueryData(["course", courseId], (old: any) => ({
        ...old,
        Attachment: { id: attachmentId },
      }))
      return { previousCourse }
    },
    onError: (err, attachmentId, context: any) => {
      queryClient.setQueryData(["course", courseId], context.previousCourse)
      toast.error("Failed to delete attachment")
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["course", courseId] })
    },
  })
}
