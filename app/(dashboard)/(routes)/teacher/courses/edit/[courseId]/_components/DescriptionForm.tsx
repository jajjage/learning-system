"use client"

import { useEffect, useRef, useState } from "react"
import { Pencil } from "lucide-react"
import { useUpdateCourseMutation } from "@/hooks/course"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { Course } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import RichEditor from "@/components/global/editor/RichEditor"

interface DescriptionFormProps {
  initialData: Course
  courseId: string
}

const descriptionSchema = z.object({
  description: z.string().min(1, {
    message: "Description required",
  }),
})

export default function DescriptionForm({
  initialData,
  courseId,
}: DescriptionFormProps) {
  const [isEditing, setIsEditing] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [isEditing])

  const { mutate: updateDescription, isLoading } =
    useUpdateCourseMutation(courseId)

  const form = useForm<z.infer<typeof descriptionSchema>>({
    resolver: zodResolver(descriptionSchema),
    defaultValues: {
      description: initialData?.description || "",
    },
  })
  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof descriptionSchema>) => {
    updateDescription(values as Partial<Course>, {
      onSuccess: () => setIsEditing(false),
    })
  }

  return (
    <Card className="mt-6 bg-slate-100">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Course Description
          <Button
            onClick={() => setIsEditing(!isEditing)}
            variant="ghost"
            className="flex items-center gap-x-2"
          >
            {isEditing ? (
              <>Cancel</>
            ) : (
              <>
                <Pencil className="h-4 w-4" />
                Edit description
              </>
            )}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!isEditing ? (
          <div
            className={cn(
              "text-sm mt-2",
              !initialData.description && "text-slate-500 italic",
            )}
            dangerouslySetInnerHTML={{
              __html: initialData.description || "No description",
            }}
          />
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RichEditor
                        content={field.value}
                        onChange={field.onChange}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end gap-x-2 mt-4">
                <Button type="submit" disabled={!isValid || isSubmitting}>
                  Save
                </Button>
              </div>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  )
}
