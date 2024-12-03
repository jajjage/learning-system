"use client"

import { useEffect, useRef, useState } from "react"
import { Pencil } from "lucide-react"
import { useDescriptionMutation } from "@/hooks/course"
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
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { Course } from "@prisma/client"

interface DescriptionFormProps {
  initialData: Course
  courseId: string
}
const descriptionSchema = z.object({
  description: z.string().min(1, {
    message: "Description require",
  }), // Allow null values here
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
  const { mutate: updateDescription, isPending } =
    useDescriptionMutation(courseId)

  const form = useForm<z.infer<typeof descriptionSchema>>({
    resolver: zodResolver(descriptionSchema),
    defaultValues: {
      description: initialData?.description || "",
    },
  })
  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof descriptionSchema>) => {
    const description = values.description ?? ""
    updateDescription(description, {
      onSuccess: () => setIsEditing(false),
    })
  }

  return (
    <div className="mt-6 bg-slate-200 rounded-md border border-zinc-200 p-4">
      <div className="p-6">
        <div className="font-medium flex items-center justify-between">
          <h3 className="text-lg">Course Description</h3>
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
          <p
            className={cn(
              "text-sm mt-2",
              !initialData.description && "text-slate-400 italic",
            )}
          >
            {initialData.description || "No description provided"}
          </p>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        {...{ ...field, value: field.value ?? "" }} // Spread the rest of the field properties except value
                        ref={textareaRef}
                        disabled={isSubmitting}
                        className="w-full p-2 border bg-slate-50 rounded-md"
                        placeholder="e.g 'Advanced web development'"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-cnter gap-x-2 mt-5">
                <button
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  Save
                </button>
              </div>
            </form>
          </Form>
        )}
      </div>
    </div>
  )
}
