import { useMutation, useQueryClient } from "@tanstack/react-query"
import { allCourses, teacherCourses, updateCourse } from "@/actions/course"
import { toast } from "react-hot-toast"
import { onCreateCourse } from "@/actions/course"

import { z } from "zod"
import { Course } from "@prisma/client"

import { CourseSchema } from "@/app/(dashboard)/_components/dashboard/schema"
import { CourseWithCount } from "@/types/course"

type CreateCourseData = z.infer<typeof CourseSchema>
interface UpdateCoursePublishParams {
  courseId: string
  isPublished: boolean
}

export const fetchStudentCourses = async (
  searchQuery: string,
  categoryId: string,
): Promise<CourseWithCount[]> => {
  const courses = await allCourses(searchQuery, categoryId)
  if (!courses) {
    // Handle the null case, e.g., return an empty array or throw an error
    return []
  }
  return courses
}

export const fetchTeacherCourses = async (
  searchQuery: string,
  categoryId: string,
): Promise<CourseWithCount[]> => {
  const courses = await teacherCourses(searchQuery, categoryId)
  if (!courses) {
    // Handle the null case, e.g., return an empty array or throw an error
    return []
  }
  return courses
}

export const useCreateCourse = (userId: string) => {
  const queryClient = useQueryClient()

  const { mutateAsync, isLoading, data } = useMutation({
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
    isLoading,
    data,
  }
}

export const useUpdateCourseMutation = (courseId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["course"],
    mutationFn: async (data: Partial<Course>) => {
      const parsedData = {
        ...data,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        endDate: data.endDate ? new Date(data.endDate) : undefined,
        enrollmentDeadline: data.enrollmentDeadline
          ? new Date(data.enrollmentDeadline)
          : undefined,
      }
      console.log("Parsed data being sent to updateCourse:", parsedData)
      return await updateCourse(courseId, parsedData)
    },
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: ["course", courseId] })

      const previousCourse = queryClient.getQueryData(["course", courseId])

      queryClient.setQueryData(["course", courseId], (old: any) => ({
        ...old,
        ...data,
      }))

      return { previousCourse }
    },
    onError: (err, context: any) => {
      queryClient.setQueryData(["course", courseId], context.previousCourse)
      toast.error("Failed to update course")
    },
    onSuccess: () => {
      toast.success("Course updated successfully")
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["course", courseId] })
    },
  })
}
