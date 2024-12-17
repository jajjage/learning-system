// hooks/use-enrollment.ts
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query"
import {
  createEnrollment,
  checkEnrollmentStatus,
  type EnrollmentStatusType,
} from "@/actions/enrollments"
import toast from "react-hot-toast"

export const useEnrollment = (courseId: string) => {
  const queryClient = useQueryClient()

  // Query to check enrollment status using the server action
  const { data: enrollmentStatus, isLoading: isCheckingEnrollment } =
    useQuery<EnrollmentStatusType>({
      queryKey: ["enrollment", courseId],
      queryFn: () => checkEnrollmentStatus(courseId),
    })

  const enrollMutation = useMutation({
    mutationFn: createEnrollment,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["enrollment", courseId] })

      const previousStatus = queryClient.getQueryData<EnrollmentStatusType>([
        "enrollment",
        courseId,
      ])

      // Optimistically update enrollment status
      queryClient.setQueryData<EnrollmentStatusType>(["enrollment", courseId], {
        isEnrolled: true,
        enrollStatus: "PENDING",
        courseId,
        enrolledAt: new Date(),
      })

      return { previousStatus }
    },
    onError: (error: any, variables, context) => {
      toast.error(error.message || "Failed to enroll in course")
      if (context?.previousStatus) {
        queryClient.setQueryData(
          ["enrollment", courseId],
          context.previousStatus,
        )
      }
    },
    onSuccess: () => {
      toast.success("Successfully enrolled in course!")
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["enrollment", courseId] })
    },
  })

  return {
    enrollmentStatus,
    isCheckingEnrollment,
    enrollInCourse: enrollMutation.mutate,
    isEnrolling: enrollMutation.isLoading,
  }
}
