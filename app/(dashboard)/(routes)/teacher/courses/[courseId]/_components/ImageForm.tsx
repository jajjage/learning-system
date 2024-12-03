"use client"

import { useState, useCallback } from "react"
import Image from "next/image"
import { ImageIcon, Pencil, PlusCircle, Upload, X } from "lucide-react"
import { useImageMutation } from "@/hooks/course"
import { Course } from "@prisma/client"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FileUpload } from "@/components/global/FileUpload"

interface ImageFormProps {
  initialData: Course
  courseId: string
}

const imageSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "Upload image",
  }), // Allow null values here
})

export default function ImageForm({ initialData, courseId }: ImageFormProps) {
  // const [imageUrl, setImageUrl] = useState(initialData)
  const [isEditing, setIsEditing] = useState(false)

  const { mutate: updateImage } = useImageMutation(courseId)

  const onSubmit = (values: z.infer<typeof imageSchema>) => {
    updateImage(values.imageUrl, {
      onSuccess: () => {
        setIsEditing(false)
      },
    })
  }

  return (
    <div className="mt-6 bg-slate-200 rounded-md border border-zinc-200 p-4">
      <div className="p-6">
        <div className="font-medium flex items-center justify-between">
          <h3 className="text-lg">Course Image</h3>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-sm text-blue-600 hover:underline flex items-center"
          >
            {isEditing && <>Cancel</>}
            {!isEditing && !initialData.imageUrl && (
              <>
                <PlusCircle className="h-4 w-4 r-2" />
                Add an image
              </>
            )}
            {!isEditing && initialData.imageUrl && (
              <>
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </>
            )}
          </button>
        </div>
        {!isEditing &&
          (!initialData.imageUrl ? (
            <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
              <ImageIcon className="h-10 w-10 text-slate-500" />
            </div>
          ) : (
            <div className="relative aspect-video mt-2">
              <Image
                alt="upload"
                fill
                src={initialData.imageUrl}
                className="object-cover rounded-md"
              />
            </div>
          ))}
        {isEditing && (
          <FileUpload
            endpoint="courseImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ imageUrl: url })
              }
            }}
          />
        )}
      </div>
    </div>
  )
}
