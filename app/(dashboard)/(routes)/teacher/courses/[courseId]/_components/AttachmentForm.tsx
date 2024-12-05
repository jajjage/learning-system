"use client"

import { useState } from "react"
import { File, Paperclip, X, Download, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { Course, Attachment } from "@prisma/client"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { FileUpload } from "@/components/global/FileUpload"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  useUploadAttachmentMutation,
  useDeleteAttachmentMutation,
} from "@/hooks/useAttachmentMutation"
import toast from "react-hot-toast"
import { url } from "inspector"

interface AttachmentFormProps {
  initialData: Course & { Attachment: Attachment[] }
  courseId: string
}

const attachmentSchema = z.object({
  url: z.string().min(1, {
    message: "Attachment is required",
  }),
  name: z.string().min(1),
  size: z.number(),
})

export default function AttachmentForm({
  initialData,
  courseId,
}: AttachmentFormProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const router = useRouter()

  const toggleEdit = () => setIsEditing((current) => !current)

  const { mutate: uploadAttachment, isPending: isUploading } =
    useUploadAttachmentMutation(courseId)
  const { mutate: deleteAttachment, isPending: isDeleting } =
    useDeleteAttachmentMutation(courseId)

  const onSubmit = (values: z.infer<typeof attachmentSchema>) => {
    console.log("Submitting attachment:", values)
    const payload = {
      url: values.url,
      name: values.name,
      size: values.size,
    }
    uploadAttachment(payload, {
      onSuccess: () => {
        toast.success("Attachment uploaded successfully")
        toggleEdit()
        router.refresh()
      },
      onError: (error) => {
        console.error("Upload error:", error)
        toast.error("Failed to upload attachment")
      },
    })
  }

  const onDelete = (id: string) => {
    setDeletingId(id)
    deleteAttachment(id, {
      onSuccess: () => {
        toast.success("Attachment deleted successfully")
        router.refresh()
      },
      onError: () => {
        toast.error("Failed to delete attachment")
      },
      onSettled: () => {
        setDeletingId(null)
      },
    })
  }

  const handleDownload = async (url: string, filename: string) => {
    try {
      const response = await fetch(url)
      if (!response.ok) throw new Error("Download failed")

      const blob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(blob)

      const link = document.createElement("a")
      link.href = downloadUrl
      link.download = filename
      document.body.appendChild(link)
      link.click()

      // Cleanup
      document.body.removeChild(link)
      window.URL.revokeObjectURL(downloadUrl)
    } catch (error) {
      console.error("Download failed:", error)
      toast.error("Failed to download file")
    }
  }

  const handleFileDownload = async (url: string, filename: string) => {
    try {
      await handleDownload(url, filename)
    } catch (error) {
      console.error("Download failed:", error)
      toast.error("Failed to download file")
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / 1048576).toFixed(1) + " MB"
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Course Attachments
          <Button onClick={toggleEdit} variant="ghost">
            {isEditing && <>Cancel</>}
            {!isEditing && (
              <>
                <Paperclip className="h-4 w-4 mr-2" />
                Add a file
              </>
            )}
          </Button>
        </CardTitle>
        <CardDescription>
          Add or remove attachments for your course. These can be downloaded by
          students.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!isEditing && (
          <ul className="space-y-2">
            {initialData.Attachment.length === 0 && (
              <li className="text-sm text-muted-foreground">
                No attachments yet
              </li>
            )}
            {initialData.Attachment.map((attachment) => (
              <TooltipProvider key={attachment.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <li className="flex items-center justify-between p-3 bg-slate-100 border rounded-md">
                      <div className="flex items-center gap-x-2">
                        <File className="h-4 w-4 flex-shrink-0" />
                        <span className="text-sm font-medium">
                          {attachment.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-x-2">
                        <Button
                          onClick={() =>
                            handleFileDownload(
                              attachment.url || "",
                              attachment.name,
                            )
                          }
                          size="sm"
                          variant="ghost"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={() => onDelete(attachment.id)}
                          disabled={isDeleting}
                          size="sm"
                          variant="destructive"
                        >
                          {deletingId === attachment.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <X className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </li>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Uploaded on:{" "}
                      {new Date(attachment.createdAt).toLocaleString()}
                    </p>
                    <p>File size: {formatFileSize(attachment.size || 0)}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </ul>
        )}
        {isEditing && (
          <div className="mt-4">
            <FileUpload
              endpoint="courseAttachment"
              onChange={(url, name, size) => {
                if (url && name && size) {
                  onSubmit({
                    url: url,
                    name: name,
                    size: size,
                  })
                } else {
                  console.error("Invalid response from FileUpload:")
                  toast.error("Failed to upload file. Please try again.")
                }
              }}
            />
            <div className="text-xs text-muted-foreground mt-4">
              Add anything your students might need to complete the course.
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
