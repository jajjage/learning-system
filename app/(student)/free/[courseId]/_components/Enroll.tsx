"use client"
import React, { useEffect, useState, useRef } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useEnrollment } from "@/hooks/use-enrollment"
import { useRouter } from "next/navigation"
import { CheckCircle, Loader2 } from "lucide-react"

interface EnrollProps {
  courseId: string
}

const Enroll = ({ courseId }: EnrollProps) => {
  const router = useRouter()
  const { enrollInCourse, purchaseCourse, isEnrolling } =
    useEnrollment(courseId)
  const [enrollmentStatus, setEnrollmentStatus] = useState<
    "verifying" | "success" | "error" | "already-enrolled"
  >("verifying")
  const enrollmentAttempted = useRef(false)

  useEffect(() => {
    const handleEnrollment = async () => {
      if (enrollmentAttempted.current) return
      enrollmentAttempted.current = true

      try {
        enrollInCourse(courseId)
        purchaseCourse(courseId)
        setEnrollmentStatus("success")

        // Add a small delay before redirect for better UX
        setTimeout(() => {
          router.push(`/learn/course/${courseId}`)
        }, 1500)
      } catch (error) {
        if (
          error instanceof Error &&
          error.message.includes("already enrolled")
        ) {
          setEnrollmentStatus("already-enrolled")
          // Redirect to the course page after a short delay
          setTimeout(() => {
            router.push(`/learn/course/${courseId}`)
          }, 1500)
        } else {
          setEnrollmentStatus("error")
        }
      }
    }

    handleEnrollment()
  }, [courseId, enrollInCourse, router])

  const getAlertContent = () => {
    switch (enrollmentStatus) {
      case "verifying":
        return {
          title: "Verifying Enrollment",
          description: "Please wait while we process your enrollment...",
          icon: <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />,
          bgColor: "bg-blue-50",
        }
      case "success":
        return {
          title: "Enrollment Successful!",
          description: "Redirecting you to your course...",
          icon: <CheckCircle className="w-6 h-6 text-green-500" />,
          bgColor: "bg-green-50",
        }
      case "already-enrolled":
        return {
          title: "Already Enrolled",
          description:
            "You're already enrolled in this course. Redirecting you to the course page...",
          icon: <CheckCircle className="w-6 h-6 text-green-500" />,
          bgColor: "bg-yellow-50",
        }
      case "error":
        return {
          title: "Enrollment Failed",
          description:
            "There was an error processing your enrollment. Please try again.",
          icon: <div className="w-6 h-6 text-red-500">❌</div>,
          bgColor: "bg-red-50",
        }
    }
  }

  const content = getAlertContent()

  return (
    <div className="flex items-center justify-center min-h-[200px] p-4">
      <Alert
        className={`w-full max-w-md shadow-lg ${content.bgColor} border-none`}
      >
        <AlertTitle className="text-lg font-semibold flex items-center gap-2">
          {content.icon}
          {content.title}
        </AlertTitle>
        <AlertDescription className="mt-2">
          <div className="flex flex-col items-center space-y-4">
            <p className="text-center text-gray-600">{content.description}</p>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  )
}

export default Enroll
