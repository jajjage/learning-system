"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Pencil } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Chapter } from "@prisma/client"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useUpdateChapterMutation } from "@/hooks/useChapterMutation"

interface ChapterDurationFormProps {
  initialData: Chapter
  courseId: string
  chapterId: string
}

const formSchema = z.object({
  duration: z.string().min(1),
})

export const ChapterDurationForm = ({
  initialData,
  courseId,
  chapterId,
}: ChapterDurationFormProps) => {
  const [isEditing, setIsEditing] = useState(false)

  const toggleEdit = () => setIsEditing((current) => !current)

  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      duration: initialData.duration || "",
    },
  })

  const { isSubmitting, isValid } = form.formState

  const updateChapterMutation = useUpdateChapterMutation(courseId, chapterId)

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    updateChapterMutation.mutate(values as Partial<Chapter>, {
      onSuccess: () => {
        toggleEdit()
        router.refresh()
      },
    })
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Chapter duration
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit duration
            </>
          )}
        </Button>
      </div>
      {!isEditing && <p className="text-sm mt-2">{initialData.duration}</p>}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. '12:00'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}
