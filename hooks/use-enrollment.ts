// hooks/use-enrollment.ts
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query"
import {
  createEnrollment,
  checkEnrollmentStatus,
  type EnrollmentStatusType,
} from "@/actions/enrollments"
import toast from "react-hot-toast"
import { CoursePurchase } from "@/actions/purchase"
import { Enrollment } from "@/types/enrollment"

export const useEnrollment = (courseId: string) => {
  const queryClient = useQueryClient()

  // Query to check enrollment status using the server action
  const { data: enrollmentStatus, isLoading: isCheckingEnrollment } =
    useQuery<EnrollmentStatusType>({
      queryKey: ["enrollment", courseId],
      queryFn: () => checkEnrollmentStatus(courseId),
    })

  const enrollMutation = useMutation({
    mutationFn: async (data: Partial<Enrollment>) => {
      return createEnrollment(courseId, data)
    },
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: ["enrollment", courseId] })

      const previousStatus = queryClient.getQueryData<EnrollmentStatusType>([
        "enrollment",
        courseId,
      ])

      queryClient.setQueryData<EnrollmentStatusType>(["enrollment", courseId], {
        isEnrolled: true,
        enrollStatus: data.status || "PENDING",
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
    onSuccess: (data) => {
      toast.success(
        data.status === "ACTIVE"
          ? "Successfully enrolled in course!"
          : "Enrollment pending confirmation",
      )
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["enrollment", courseId] })
    },
  })

  const purchaseMutation = useMutation({
    mutationFn: CoursePurchase,
    onSuccess: async () => {
      // Update enrollment status to ACTIVE after successful purchase
      await enrollMutation.mutateAsync({ status: "ACTIVE" })
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to purchase the course")
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["enrollment", courseId] })
    },
  })

  return {
    enrollmentStatus,
    isCheckingEnrollment,
    purchaseCourse: purchaseMutation.mutate,
    enrollInCourse: enrollMutation.mutate,
    isEnrolling: enrollMutation.isLoading,
  }
}
