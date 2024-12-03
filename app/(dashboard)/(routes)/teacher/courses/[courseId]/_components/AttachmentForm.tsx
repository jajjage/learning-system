"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "@uploadthing/react"
import { generateClientDropzoneAccept } from "uploadthing/client"
import { Pencil, X, File, Loader2 } from "lucide-react"
import { useUploadThing } from "@/lib/uploadthing"
import { createAttachment, deleteAttachment } from "@/actions/upload-attachment"

interface AttachmentFormProps {
  courseId: string
  initialAttachments: { id: string; name: string; url: string }[]
}

export default function AttachmentForm({ courseId }: AttachmentFormProps) {
  const [attachments, setAttachments] = useState<
    {
      courseId?: string
      id: string
      name: string
      url: string | null
      createdAt?: Date
      updatedAt?: Date
    }[]
  >([])

  const [files, setFiles] = useState<File[]>([])

  const permittedFileInfo = {
    allowedFileTypes: ["image/jpeg", "image/png"],
    maxFileSize: 5 * 1024 * 1024, // 5 MB
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles)
  }, [])

  const { startUpload, isUploading } = useUploadThing("courseAttachment", {
    onClientUploadComplete: async (res) => {
      const newAttachments = await Promise.all(
        res.map((file) => createAttachment(courseId, file.url, file.name)),
      )
      setAttachments((prev) => [...prev, ...newAttachments])
      setFiles([])
    },
    onUploadError: (error) => {
      console.error("Error uploading:", error)
      alert("Error uploading files")
    },
  })

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: generateClientDropzoneAccept(permittedFileInfo?.allowedFileTypes),
  })

  const removeAttachment = async (attachmentId: string) => {
    try {
      await deleteAttachment(attachmentId)
      setAttachments((prev) =>
        prev.filter((attachment) => attachment.id !== attachmentId),
      )
    } catch (error) {
      console.error("Failed to delete attachment:", error)
    }
  }

  return (
    <div className="bg-white rounded-lg border border-zinc-200 shadow-sm">
      <div className="p-6">
        <h3 className="text-lg font-medium">Course Attachments</h3>
        <div
          {...getRootProps()}
          className="mt-4 border-2 border-dashed rounded-md p-6 cursor-pointer"
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center gap-2">
            <File className="h-10 w-10 text-slate-400" />
            <p className="text-sm text-slate-600">
              Drag & drop files here, or click to select files
            </p>
            <p className="text-xs text-slate-400">
              (Up to 5 files, max 64MB for video, 8MB for PDF and audio, 4MB for
              images)
            </p>
          </div>
        </div>
        {files.length > 0 && (
          <div className="mt-4">
            <button
              onClick={() => startUpload(files)}
              disabled={isUploading}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              Upload {files.length} file(s)
            </button>
          </div>
        )}
        {isUploading && (
          <div className="mt-4 flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
            <span className="ml-2 text-sm text-slate-600">Uploading...</span>
          </div>
        )}
        {attachments.length > 0 && (
          <div className="mt-6 space-y-2">
            {attachments.map((attachment) => (
              <div
                key={attachment.id}
                className="flex items-center justify-between p-3 bg-slate-100 rounded-md"
              >
                <div className="flex items-center">
                  <File className="h-4 w-4 mr-2 text-blue-600" />
                  <span className="text-sm text-slate-700">
                    {attachment.name}
                  </span>
                </div>
                <button
                  onClick={() => removeAttachment(attachment.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
