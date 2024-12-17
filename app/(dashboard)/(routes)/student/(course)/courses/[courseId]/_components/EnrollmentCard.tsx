"use client"

import { useState } from "react"
import { useEnrollment } from "@/hooks/use-enrollment"
import { useUser } from "@clerk/nextjs"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface EnrollmentCardProps {
  courseId: string
  title: string
  price?: number
  enrollmentLimit?: number
  currentEnrollments?: number
  description?: string
}

export const EnrollmentCard = ({
  courseId,
  title,
  price,
  enrollmentLimit,
  currentEnrollments = 0,
  description,
}: EnrollmentCardProps) => {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const {
    enrollmentStatus,
    enrollInCourse,
    isEnrolling,
    isCheckingEnrollment,
  } = useEnrollment(courseId)
  const { user } = useUser()

  const handleEnroll = () => {
    if (price && price > 0) {
      setConfirmOpen(true)
    } else {
      enrollInCourse(courseId)
    }
  }

  const redirectToSignIn = () => {
    // Implement sign-in redirection logic here
    console.log("Redirecting to sign in...")
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {description && (
          <div
            className="text-sm text-gray-600 mb-4"
            dangerouslySetInnerHTML={{
              __html: description || "No description",
            }}
          />
        )}
        {enrollmentLimit && (
          <p className="text-sm text-gray-600 mb-4">
            {currentEnrollments} / {enrollmentLimit} enrolled
          </p>
        )}
        {price !== undefined && (
          <p className="text-lg font-bold mb-4">
            {price > 0 ? `Price: $${price.toFixed(2)}` : "Free"}
          </p>
        )}
      </CardContent>
      <CardFooter>
        {!user ? (
          <Button
            className="w-full"
            variant="outline"
            onClick={redirectToSignIn}
          >
            Sign in to enroll
          </Button>
        ) : isCheckingEnrollment ? (
          <Button className="w-full" disabled>
            Loading...
          </Button>
        ) : enrollmentStatus && enrollmentStatus.isEnrolled ? (
          <Button className="w-full" variant="secondary" disabled>
            {enrollmentStatus.enrollStatus === "PENDING"
              ? "Enrollment Pending"
              : "Enrolled"}
          </Button>
        ) : enrollmentLimit && currentEnrollments >= enrollmentLimit ? (
          <Button className="w-full" variant="secondary" disabled>
            Course Full
          </Button>
        ) : (
          <Button
            className="w-full"
            onClick={handleEnroll}
            disabled={isEnrolling}
          >
            {isEnrolling
              ? "Enrolling..."
              : price
                ? `Enroll for $${price}`
                : "Enroll for Free"}
          </Button>
        )}
      </CardFooter>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Enrollment</DialogTitle>
            <DialogDescription>
              {price
                ? `You will be charged $ ${price} for this course.`
                : "Confirm your enrollment in this course."}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                enrollInCourse(courseId)
                setConfirmOpen(false)
              }}
              disabled={isEnrolling}
            >
              {isEnrolling ? "Processing..." : "Confirm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
