"use client"
import { ourFileRouter } from "@/app/api/uploadthing/core"
import { UploadDropzone } from "@/lib/uploadthing"
import toast from "react-hot-toast"

interface FileUploadProps {
  onChange: (url?: string, name?: string, size?: number) => void
  endpoint: keyof typeof ourFileRouter
}

export const FileUpload = ({ onChange, endpoint }: FileUploadProps) => {
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        console.log("Upload completed:", res)
        onChange(res?.[0].url, res?.[0].name, res?.[0].size)
      }}
      onUploadError={(error: Error) => {
        console.error("Upload error:", error)
        toast.error(`Upload error: ${error?.message}`)
      }}
      onUploadBegin={(fileName) => {
        console.log("Upload starting:", fileName)
      }}
    />
  )
}
