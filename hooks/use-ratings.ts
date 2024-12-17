// hooks/use-rating.ts
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createRating, markHelpful } from "@/actions/rating"
import toast from "react-hot-toast"

type Rating = {
  id: string
  rating: number
  comment?: string
  helpfulCount: number
  user: {
    firstName: string
    lastName: string
  }
}

type Course = {
  id: string
  totalRatings: number
  averageRating: number | null
}

export const useRating = (courseId: string) => {
  const queryClient = useQueryClient()

  const createRatingMutation = useMutation({
    mutationFn: createRating,
    onMutate: async (newRating) => {
      await queryClient.cancelQueries({ queryKey: ["course", courseId] })

      const previousCourse = queryClient.getQueryData<Course>([
        "course",
        courseId,
      ])

      queryClient.setQueryData<Course | undefined>(
        ["course", courseId],
        (old) => {
          if (!old) return old

          return {
            ...old,
            totalRatings: (old.totalRatings || 0) + 1,
            averageRating: old.averageRating
              ? (old.averageRating * old.totalRatings + newRating.rating) /
                (old.totalRatings + 1)
              : newRating.rating,
          }
        },
      )

      return { previousCourse }
    },
    onError: (err, newRating, context) => {
      toast.error("Failed to create rating")
      if (context?.previousCourse) {
        queryClient.setQueryData(["course", courseId], context.previousCourse)
      }
    },
    onSuccess: () => {
      toast.success("Rating submitted successfully")
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["course", courseId] })
    },
  })

  const markHelpfulMutation = useMutation({
    mutationFn: markHelpful,
    onMutate: async (ratingId) => {
      await queryClient.cancelQueries({
        queryKey: ["course", courseId, "ratings"],
      })

      const previousRatings = queryClient.getQueryData<Rating[]>([
        "course",
        courseId,
        "ratings",
      ])

      queryClient.setQueryData<Rating[] | undefined>(
        ["course", courseId, "ratings"],
        (old) => {
          if (!old) return old

          return old.map((rating) =>
            rating.id === ratingId
              ? { ...rating, helpfulCount: rating.helpfulCount + 1 }
              : rating,
          )
        },
      )

      return { previousRatings }
    },
    onError: (err, ratingId, context) => {
      toast.error("Failed to mark as helpful")
      if (context?.previousRatings) {
        queryClient.setQueryData(
          ["course", courseId, "ratings"],
          context.previousRatings,
        )
      }
    },
    onSuccess: () => {
      toast.success("Marked as helpful")
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["course", courseId, "ratings"],
      })
    },
  })

  return {
    createRating: createRatingMutation.mutate,
    markHelpful: markHelpfulMutation.mutate,
    isLoading: createRatingMutation.isLoading || markHelpfulMutation.isLoading,
  }
}
