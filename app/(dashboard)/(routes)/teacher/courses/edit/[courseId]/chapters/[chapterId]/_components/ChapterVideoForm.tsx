"use client"

import * as z from "zod"
import { Loader2, LoaderCircle, Pencil, PlusCircle, Video } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Chapter, MuxData } from "@prisma/client"
import MuxPlayer from "@mux/mux-player-react"
import { Button } from "@/components/ui/button"
import { FileUpload } from "@/components/global/FileUpload"
import { useUpdateChapterMutation } from "@/hooks/useChapterMutation"
import toast from "react-hot-toast"
import { checkAssetStatus } from "@/actions/chapter"

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
  const [isVideoProcessing, setIsVideoProcessing] = useState(false)
  const [videoReady, setVideoReady] = useState(
    !!initialData.muxData?.playBackId,
  )

  const toggleEdit = () => setIsEditing((current) => !current)
  const router = useRouter()

  const updateChapterVideoMutation = useUpdateChapterMutation(
    courseId,
    chapterId,
  )

  // Check video processing status
  useEffect(() => {
    if (initialData.videoUrl && !videoReady) {
      const checkVideoStatus = async () => {
        try {
          const data = await checkAssetStatus(
            initialData.muxData?.assetId || "",
          )

          if (data?.status === "ready") {
            setVideoReady(true)
            setIsVideoProcessing(false)
          } else if (data?.status === "preparing") {
            setIsVideoProcessing(true)
          }
        } catch (error) {
          console.error("Error checking video status:", error)
        }
      }

      const interval = setInterval(checkVideoStatus, 5000)
      return () => clearInterval(interval)
    }
  }, [initialData.videoUrl, videoReady])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsUploading(true)
      setIsVideoProcessing(true)
      setVideoReady(false)

      await updateChapterVideoMutation.mutateAsync(values as Partial<Chapter>)
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
          {videoReady ? (
            <MuxPlayer playbackId={initialData?.muxData?.playBackId || ""} />
          ) : (
            <div className="flex items-center justify-center h-full bg-slate-200 rounded-md">
              <div className="text-sm text-slate-500">
                Video is processing... This may take a few minutes.
              </div>
            </div>
          )}
        </div>
      )}

      {isEditing && (
        <div className="mt-4">
          <FileUpload
            endpoint="chapterVideo"
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

      {isVideoProcessing && (
        <div className="text-sm text-muted-foreground mt-2">
          Video is currently processing... This may take several minutes. You
          can safely leave this page and come back later.
        </div>
      )}
    </div>
  )
}
