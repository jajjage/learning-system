"use client"

import { useState } from "react"
import { File, Paperclip, X, Loader2 } from "lucide-react"
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  useUploadAttachmentMutation,
  useDeleteAttachmentMutation,
} from "@/hooks/useAttachmentMutation"
import toast from "react-hot-toast"

interface AttachmentFormProps {
  initialData: Course & { Attachment: Attachment[] }
  courseId: string
}

const attachmentSchema = z.object({
  url: z.string().min(1, {
    message: "Attachment is required",
  }),
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
    uploadAttachment(values.url, {
      onSuccess: () => {
        toast.success("Attachment uploaded successfully")
        toggleEdit()
        router.refresh()
      },
      onError: () => {
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>File Name</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {initialData.Attachment.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={2}
                    className="text-center text-muted-foreground"
                  >
                    No attachments yet
                  </TableCell>
                </TableRow>
              )}
              {initialData.Attachment.map((attachment) => (
                <TableRow key={attachment.id}>
                  <TableCell className="flex items-center gap-x-2">
                    <File className="h-4 w-4" />
                    {attachment.name}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      onClick={() => onDelete(attachment.id)}
                      disabled={isDeleting}
                      variant="destructive"
                      size="icon"
                    >
                      {deletingId === attachment.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <X className="h-4 w-4" />
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        {isEditing && (
          <div className="mt-4">
            <FileUpload
              endpoint="courseAttachment"
              onChange={(url) => {
                if (url) {
                  onSubmit({ url })
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
