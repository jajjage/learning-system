"use client"

import React, { useEffect, useState, useRef } from "react"
import { useEnrollment } from "@/hooks/use-enrollment"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Loader2, CheckCircle, XCircle, AlertTriangle } from "lucide-react"

interface EnrollProps {
  courseId: string
}

const Enroll = ({ courseId }: EnrollProps) => {
  const router = useRouter()
  const { enrollInCourse, purchaseCourse } = useEnrollment(courseId)
  const [enrollmentStatus, setEnrollmentStatus] = useState<
    "verifying" | "success" | "error" | "already-enrolled"
  >("verifying")
  const [progress, setProgress] = useState(0)
  const enrollmentAttempted = useRef(false)

  useEffect(() => {
    const handleEnrollment = async () => {
      if (enrollmentAttempted.current) return
      enrollmentAttempted.current = true

      try {
        setProgress(33)
        await enrollInCourse({ status: "PENDING" })
        setProgress(66)
        await purchaseCourse(courseId) // This will automatically update status to ACTIVE
        setProgress(100)
        setEnrollmentStatus("success")

        // Add a small delay before redirect for better UX
        setTimeout(() => {
          router.push(`/learn/course/${courseId}`)
        }, 2000)
      } catch (error) {
        if (
          error instanceof Error &&
          error.message.includes("already enrolled")
        ) {
          setEnrollmentStatus("already-enrolled")
          // Redirect to the course page after a short delay
          setTimeout(() => {
            router.push(`/learn/course/${courseId}`)
          }, 2000)
        } else {
          setEnrollmentStatus("error")
        }
      }
    }

    handleEnrollment()
  }, [courseId, enrollInCourse, purchaseCourse, router])

  const renderContent = () => {
    switch (enrollmentStatus) {
      case "verifying":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <Loader2 className="w-12 h-12 animate-spin text-primary" />
            </div>
            <Progress value={progress} className="w-full" />
            <p className="text-center text-sm text-muted-foreground">
              Processing your enrollment...
            </p>
          </div>
        )
      case "success":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
            <p className="text-center">Enrollment successful!</p>
            <p className="text-center text-sm text-muted-foreground">
              Redirecting you to the course...
            </p>
          </div>
        )
      case "already-enrolled":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <AlertTriangle className="w-12 h-12 text-yellow-500" />
            </div>
            <p className="text-center">
              You're already enrolled in this course.
            </p>
            <p className="text-center text-sm text-muted-foreground">
              Redirecting you to the course page...
            </p>
          </div>
        )
      case "error":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <XCircle className="w-12 h-12 text-red-500" />
            </div>
            <p className="text-center">
              There was an error processing your enrollment.
            </p>
            <div className="flex justify-center">
              <Button
                onClick={() => router.push(`/course/${courseId}`)}
                variant="destructive"
              >
                Try Again
              </Button>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Course Enrollment
          </CardTitle>
        </CardHeader>
        <CardContent>{renderContent()}</CardContent>
      </Card>
    </div>
  )
}

export default Enroll
