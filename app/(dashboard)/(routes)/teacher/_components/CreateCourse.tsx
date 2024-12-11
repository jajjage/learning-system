"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CourseSchema } from "@/app/(dashboard)/(routes)/teacher/_components/schema"
import { useCreateCourse } from "@/hooks/course"
import { z } from "zod"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

interface CreateCourseProps {
  userId: string
}

const CreateCourse = ({ userId }: CreateCourseProps) => {
  const router = useRouter()
  const { createCourse, isPending: isLoading } = useCreateCourse(userId)

  const form = useForm<z.infer<typeof CourseSchema>>({
    resolver: zodResolver(CourseSchema),
    defaultValues: {
      title: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof CourseSchema>) => {
    try {
      const data = await createCourse(values)
      if (data.status === 200) {
        router.push(`/teacher/courses/${data.id}`)
        toast.success("Course created successfully!")
      } else {
        router.push("/teacher/courses/")
        toast.error("Failed to create course. Please try again.")
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.")
    }
  }

  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center min-h-[calc(100vh-4rem)] p-6">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6">Create a new course</h1>
        <p className="text-gray-600 mb-8">
          Get started by giving your course a name. You can change this later.
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. 'Advanced Web Development'"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Choose a clear and descriptive title for your course.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Course"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default CreateCourse
