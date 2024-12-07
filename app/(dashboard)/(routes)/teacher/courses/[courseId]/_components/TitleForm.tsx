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
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TitleFormProps {
  initialData: {
    title: string
  }
  courseId: string
}

export default function TitleForm({ initialData, courseId }: TitleFormProps) {
  const [isEditing, setIsEditing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditing])

  const { mutate: updateTitle, isPending } = useTitleMutation(courseId)

  const form = useForm<z.infer<typeof CourseSchema>>({
    resolver: zodResolver(CourseSchema),
    defaultValues: initialData,
  })
  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof CourseSchema>) => {
    try {
      updateTitle(values.title, {
        onSuccess: () => setIsEditing(false),
      })
      router.refresh()
    } catch (error) {
      console.error("Failed to update course title:", error)
    }
  }

  return (
    <Card className="mt-6 bg-slate-100">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Course Title
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
                Edit title
              </>
            )}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!isEditing && (
          <p className="text-sm text-slate-700">{initialData.title}</p>
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
                        ref={inputRef}
                        disabled={isSubmitting}
                        placeholder="e.g., 'Advanced Web Development'"
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
