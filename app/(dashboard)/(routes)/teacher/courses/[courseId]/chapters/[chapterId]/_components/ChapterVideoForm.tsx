"use client"

import * as z from "zod"
import { Pencil, PlusCircle, Video } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Chapter, MuxData } from "@prisma/client"

import { Button } from "@/components/ui/button"
import { FileUpload } from "@/components/global/FileUpload"
import { useUpdateChapterVideoMutation } from "@/hooks/useChapterMutation"
import toast from "react-hot-toast"

interface ChapterVideoFormProps {
  initialData: Chapter & { muxData?: MuxData | null }
  courseId: string
  chapterId: string
}

const formSchema = z.object({
  videoUrl: z.string().min(1),
})

export const ChapterVideoForm = ({
  initialData,
  courseId,
  chapterId,
}: ChapterVideoFormProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const toggleEdit = () => setIsEditing((current) => !current)

  const router = useRouter()

  const updateChapterVideoMutation = useUpdateChapterVideoMutation(
    courseId,
    chapterId,
  )

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsUploading(true)
      await updateChapterVideoMutation.mutateAsync(values)
      toast.success("Video uploaded successfully")
      toggleEdit()
      router.refresh()
    } catch (error) {
      console.error("Upload error:", error)
      toast.error("Something went wrong during the upload. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Chapter video
        <Button onClick={toggleEdit} variant="ghost" disabled={isUploading}>
          {isEditing && "Cancel"}
          {!isEditing && !initialData.videoUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a video
            </>
          )}
          {!isEditing && initialData.videoUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit video
            </>
          )}
        </Button>
      </div>
      {!isEditing && !initialData.videoUrl && (
        <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md mt-4">
          <Video className="h-10 w-10 text-slate-500" />
        </div>
      )}
      {!isEditing && initialData.videoUrl && (
        <div className="relative aspect-video mt-4">
          <video
            className="w-full h-full rounded-md"
            controls
            src={initialData.videoUrl}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      )}
      {isEditing && (
        <div className="mt-4">
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({ videoUrl: url })
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Upload this chapter's video. Please be patient, as video processing
            may take several minutes.
          </div>
        </div>
      )}
      {initialData.videoUrl && !isEditing && (
        <div className="text-xs text-muted-foreground mt-2">
          Videos can take a few minutes to process. Refresh the page if the
          video does not appear.
        </div>
      )}
      {isUploading && (
        <div className="text-sm text-muted-foreground mt-2">
          Uploading and processing video... This may take several minutes.
          Please do not close this page.
        </div>
      )}
    </div>
  )
}
