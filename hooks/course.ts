import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateCourse } from "@/actions/course"
import { toast } from "react-hot-toast"
import { onCreateCourse } from "@/actions/course"
import { CourseSchema } from "@/app/(dashboard)/(routes)/teacher/_components/schema"
import { z } from "zod"
import { Course } from "@prisma/client"

type CreateCourseData = z.infer<typeof CourseSchema>

export const useCreateCourse = (userId: string) => {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending, data } = useMutation({
    mutationFn: async (data: { userId: string; title: string }) => {
      const result = await onCreateCourse(data.userId, data.title)
      if (result.status !== 200) {
        throw new Error(result.message || "Unknown error occurred")
      }
      return result
    },
    onSuccess: (data) => {
      toast.success("Course created successfully")
    },
    onError: (error: Error) => {
      toast.error(`Failed to create course: ${error.message}`)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] })
    },
  })

  const createCourse = async (data: CreateCourseData) => {
    return await mutateAsync({ userId, title: data.title })
  }

  return {
    createCourse,
    isPending,
    data,
  }
}

export const useUpdateCourseMutation = (courseId: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["course"],
    mutationFn: async (data: Partial<Course>) => {
      return await updateCourse(courseId, data)
    },
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: ["course", courseId] })
      const previousCourse = queryClient.getQueryData(["course", courseId])
      queryClient.setQueryData(["course", courseId], (old: any) => ({
        ...old,
        data: data,
      }))
      return { previousCourse }
    },
    onError: (err, newTitle, context: any) => {
      queryClient.setQueryData(["course", courseId], context.previousCourse)
      toast.error("Failed to update course title")
    },
    onSuccess: () => {
      toast.success("Course updated successfully")
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["course", courseId] })
    },
  })
}
