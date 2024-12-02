import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
  updateCourseTitle,
  updateCourseDescription,
  updateCoursePrice,
  updateCourseImage,
  updateCourseCategory,
} from "@/actions/course"
import { toast } from "react-hot-toast"
import { onCreateCourse } from "@/actions/course"
import { CourseSchema } from "@/app/(dashboard)/(routes)/teacher/_components/schema"
import { z } from "zod"

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

export const useTitleMutation = (courseId: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (title: string) => updateCourseTitle(courseId, title),
    onMutate: async (newTitle) => {
      await queryClient.cancelQueries({ queryKey: ["course", courseId] })
      const previousCourse = queryClient.getQueryData(["course", courseId])
      queryClient.setQueryData(["course", courseId], (old: any) => ({
        ...old,
        title: newTitle,
      }))
      return { previousCourse }
    },
    onError: (err, newTitle, context: any) => {
      queryClient.setQueryData(["course", courseId], context.previousCourse)
      toast.error("Failed to update course title")
    },
    onSuccess: () => {
      toast.success("Course title updated successfully")
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["course", courseId] })
    },
  })
}

export const useDescriptionMutation = (courseId: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (description: string) =>
      updateCourseDescription(courseId, description),
    onMutate: async (newDescription) => {
      await queryClient.cancelQueries({ queryKey: ["course", courseId] })
      const previousCourse = queryClient.getQueryData(["course", courseId])
      queryClient.setQueryData(["course", courseId], (old: any) => ({
        ...old,
        description: newDescription,
      }))
      return { previousCourse }
    },
    onError: (err, newDescription, context: any) => {
      queryClient.setQueryData(["course", courseId], context.previousCourse)
      toast.error("Failed to update course description")
    },
    onSuccess: () => {
      toast.success("Course description updated successfully")
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["course", courseId] })
    },
  })
}

export const usePriceMutation = (courseId: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (price: number | null) => updateCoursePrice(courseId, price),
    onMutate: async (newPrice) => {
      await queryClient.cancelQueries({ queryKey: ["course", courseId] })
      const previousCourse = queryClient.getQueryData(["course", courseId])
      queryClient.setQueryData(["course", courseId], (old: any) => ({
        ...old,
        price: newPrice,
      }))
      return { previousCourse }
    },
    onError: (err, newPrice, context: any) => {
      queryClient.setQueryData(["course", courseId], context.previousCourse)
      toast.error("Failed to update course price")
    },
    onSuccess: () => {
      toast.success("Course price updated successfully")
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["course", courseId] })
    },
  })
}

export const useImageMutation = (courseId: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (imageUrl: string | null) =>
      updateCourseImage(courseId, imageUrl),
    onMutate: async (newImageUrl) => {
      await queryClient.cancelQueries({ queryKey: ["course", courseId] })
      const previousCourse = queryClient.getQueryData(["course", courseId])
      queryClient.setQueryData(["course", courseId], (old: any) => ({
        ...old,
        imageUrl: newImageUrl,
      }))
      return { previousCourse }
    },
    onError: (err, newImageUrl, context: any) => {
      queryClient.setQueryData(["course", courseId], context.previousCourse)
      toast.error("Failed to update course image")
    },
    onSuccess: () => {
      toast.success("Course image updated successfully")
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["course", courseId] })
    },
  })
}

export const useCategoryMutation = (courseId: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (categoryId: string | null) =>
      updateCourseCategory(courseId, categoryId),
    onMutate: async (newCategoryId) => {
      await queryClient.cancelQueries({ queryKey: ["course", courseId] })
      const previousCourse = queryClient.getQueryData(["course", courseId])
      queryClient.setQueryData(["course", courseId], (old: any) => ({
        ...old,
        categoryId: newCategoryId,
      }))
      return { previousCourse }
    },
    onError: (err, newCategoryId, context: any) => {
      queryClient.setQueryData(["course", courseId], context.previousCourse)
      toast.error("Failed to update course category")
    },
    onSuccess: () => {
      toast.success("Course category updated successfully")
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["course", courseId] })
    },
  })
}
