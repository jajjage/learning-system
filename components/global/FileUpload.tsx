import { UploadDropzone } from "@/lib/uploadthing"
import { ourFileRouter } from "@/app/api/uploadthing/core"
import toast from "react-hot-toast"

interface FileUploadProps {
  onChange: (url?: string) => void
  endpoint: keyof typeof ourFileRouter
}

export const FileUpload = ({ onChange, endpoint }: FileUploadProps) => {
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url)
      }}
      onUploadError={(error: Error) => {
        if (error.name === "HeadersTimeoutError") {
          toast.error(
            "Upload successful, but server response timed out. Please refresh the page.",
          )
        } else {
          toast.error(`Upload error: ${error.message}`)
        }
      }}
      // onUploadBegin={() => {
      //   toast.loading("Upload starting...")
      // }}
      config={{
        mode: "auto",
        appendOnPaste: true,
        // retries: 3,
        // chunkSize: 20 * 1024 * 1024, // 20MB chunks
      }}
    />
  )
}
