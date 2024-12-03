"use client"

import { useEffect, useRef, useState } from "react"
import { Pencil } from "lucide-react"
import { useTitleMutation } from "@/hooks/course"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CourseSchema } from "../../../_components/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

interface TitleFormProps {
  initialTitle: {
    title: string
  }
  courseId: string
}

export default function TitleForm({ initialTitle, courseId }: TitleFormProps) {
  const [isEditing, setIsEditing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditing])

  const { mutate: updateTitle, isPending } = useTitleMutation(courseId)

  const form = useForm<z.infer<typeof CourseSchema>>({
    resolver: zodResolver(CourseSchema),
    defaultValues: initialTitle,
  })
  const { isSubmitting, isValid } = form.formState
  const onSubmit = async (values: z.infer<typeof CourseSchema>) => {
    updateTitle(values.title, {
      onSuccess: () => setIsEditing(false),
    })
  }

  return (
    <div className="mt-6 bg-slate-200 rounded-md border border-zinc-200 p-4">
      <div className="p-6">
        <div className="font-medium flex items-center justify-between">
          <h3 className="text-lg">Course Title</h3>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-sm text-blue-600 hover:underline flex items-center"
          >
            {isEditing ? (
              <>Cancel</>
            ) : (
              <>
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </>
            )}
          </button>
        </div>
        {!isEditing && (
          <p className="mt-4 text-sm text-slate-700">{initialTitle.title}</p>
        )}
        {isEditing && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        ref={inputRef} // This will now only pass the ref once, without overwriting
                        disabled={isSubmitting}
                        className="bg-slate-50"
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
