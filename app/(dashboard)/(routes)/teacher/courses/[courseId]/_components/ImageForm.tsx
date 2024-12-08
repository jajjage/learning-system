"use client"

import { useState } from "react"
import Image from "next/image"
import { ImageIcon, Pencil, PlusCircle } from "lucide-react"
import { useUpdateCourseMutation } from "@/hooks/course"
import { Course } from "@prisma/client"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { FileUpload } from "@/components/global/FileUpload"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import toast from "react-hot-toast"

interface ImageFormProps {
  initialData: Course
  courseId: string
}

const imageSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "Image is required",
  }),
})

export default function ImageForm({ initialData, courseId }: ImageFormProps) {
  const [isEditing, setIsEditing] = useState(false)
  const router = useRouter()

  const { mutate: updateImage } = useUpdateCourseMutation(courseId)

  const onSubmit = async (values: z.infer<typeof imageSchema>) => {
    try {
      updateImage(values as Partial<Course>, {
        onSuccess: () => {
          setIsEditing(false)
          router.refresh()
        },
        onError: () => {
          toast.error("Failed to update course image")
        },
      })
    } catch (error) {
      console.error("Failed to update course image:", error)
      toast.error("An unexpected error occurred")
    }
  }

  return (
    <Card className="mt-6 bg-slate-100">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Course Image
          <Button onClick={() => setIsEditing(!isEditing)} variant="ghost">
            {isEditing && <>Cancel</>}
            {!isEditing && !initialData.imageUrl && (
              <>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add an image
              </>
            )}
            {!isEditing && initialData.imageUrl && (
              <>
                <Pencil className="h-4 w-4 mr-2" />
                Change image
              </>
            )}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!isEditing && (
          <div className="aspect-video mt-2 relative">
            {!initialData.imageUrl ? (
              <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                <ImageIcon className="h-10 w-10 text-slate-500" />
              </div>
            ) : (
              <Image
                alt="Course image"
                fill
                src={initialData.imageUrl}
                className="object-cover rounded-md"
              />
            )}
          </div>
        )}
        {isEditing && (
          <div>
            <FileUpload
              endpoint="courseImage"
              onChange={(url) => {
                if (url) {
                  onSubmit({ imageUrl: url })
                }
              }}
            />
            <div className="text-xs text-muted-foreground mt-4">
              16:9 aspect ratio recommended
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
