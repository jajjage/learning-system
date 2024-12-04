import { useMutation, useQueryClient } from "@tanstack/react-query"
import { uploadAttachment, deleteAttachment } from "@/actions/upload-attachment"
import toast from "react-hot-toast"

export const useUploadAttachmentMutation = (courseId: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (url: string) => uploadAttachment(courseId, url),
    onMutate: async (url) => {
      await queryClient.cancelQueries({ queryKey: ["course", courseId] })
      const previousCourse = queryClient.getQueryData(["course", courseId])
      queryClient.setQueryData(["course", courseId], (old: any) => ({
        ...old,
        Attachment: { name: url.split("/").pop() || url, url },
      }))
      return { previousCourse }
    },
    onError: (err, newAttachment, context: any) => {
      queryClient.setQueryData(["course", courseId], context.previousCourse)
      toast.error("Failed to upload attachment here")
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
