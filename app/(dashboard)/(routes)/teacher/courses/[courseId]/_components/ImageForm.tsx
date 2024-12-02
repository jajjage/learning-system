"use client"
import { useEffect, useState } from "react"
import { Pencil } from "lucide-react"
import { useImageMutation } from "@/hooks/course"
import Image from "next/image"

interface ImageFormProps {
  initialImageUrl: string | null
  courseId: string
}

export default function ImageForm({
  initialImageUrl,
  courseId,
}: ImageFormProps) {
  const [imageUrl, setImageUrl] = useState(initialImageUrl)
  const [isEditing, setIsEditing] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)

  const { mutate: updateImage, isPending } = useImageMutation(courseId)

  useEffect(() => {
    if (imageUrl) {
      setPreview(imageUrl)
    }
  }, [imageUrl])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    updateImage(imageUrl, {
      onSuccess: () => setIsEditing(false),
    })
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <div className="font-medium flex items-center justify-between">
        <h3 className="text-lg">Course Image</h3>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-sm text-blue-600 hover:underline"
        >
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2 inline" />
              Edit
            </>
          )}
        </button>
      </div>
      {!isEditing ? (
        <div className="mt-2">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt="Course"
              width={300}
              height={200}
              className="w-full h-40 object-cover rounded-md"
            />
          ) : (
            <p>No image set</p>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="text"
            value={imageUrl || ""}
            onChange={(e) => {
              setImageUrl(e.target.value)
              setPreview(e.target.value)
            }}
            className="w-full p-2 border rounded-md"
            placeholder="Enter image URL"
          />
          {preview && (
            <div className="mt-2">
              <Image
                src={preview}
                alt="Preview"
                width={300}
                height={200}
                className="w-full h-40 object-cover rounded-md"
              />
            </div>
          )}
          <button
            type="submit"
            disabled={isPending}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            Save
          </button>
        </form>
      )}
    </div>
  )
}
