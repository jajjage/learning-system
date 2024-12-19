"use client"

import { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { handlePayment } from "@/actions/flutterwave"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

interface EnrollmentCardProps {
  courseId: string
  title: string
  price?: number
  enrollmentLimit?: number
  currentEnrollments?: number
  description?: string
  isFree?: boolean
  userData: {
    firstName: string
    email: string
  }
}

export const EnrollPopUp = ({
  courseId,
  title,
  price = 0,
  enrollmentLimit,
  currentEnrollments = 0,
  description,
  userData,
  isFree,
}: EnrollmentCardProps) => {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const route = useRouter()

  const { enrollmentStatus, isCheckingEnrollment } = useEnrollment(courseId)
  const { user } = useUser()

  const handleEnroll = () => {
    if (price && price > 0) {
      setConfirmOpen(true)
    } else {
      // enrollInCourse(courseId)
    }
  }
  const handleFreeEnroll = () => {
    if (isFree) {
      route.push(`/free/${courseId}`)
    } else {
      route.push(`/student/course/details/${courseId}`)
      toast.error("Error enrolling in course")
    }
  }

  const generateTxRef = (): string => {
    return `tx_${uuidv4()}` // Prefix with "tx_" to make it more descriptive
  }

  const redirectToSignIn = () => {
    // Implement sign-in redirection logic here
    console.log("Redirecting to sign in...")
  }

  return (
    <Card className="w-full">
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
            {price > 0 && !isFree ? `Price: ₦${price.toFixed(2)}` : "Free"}
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
            disabled={verifying}
          >
            {verifying ? (
              <div className="w-6 h-6 border-t-2 border-l-white rounded-full animate-spin"></div>
            ) : !isFree ? (
              "Proceed to Enrollment"
            ) : (
              "Enroll for Free"
            )}
          </Button>
        )}
      </CardFooter>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Enrollment</AlertDialogTitle>
            <AlertDialogDescription>
              {!isFree && price > 0
                ? `You will be charged ₦${price.toFixed(2)} for this course. Would you like to proceed with the enrollment?`
                : "This course is free. Would you like to proceed with the enrollment?"}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={
                !isFree && price > 0
                  ? () => {
                      const tx_ref: string = generateTxRef() // Generate unique transaction reference
                      const paymentDetails = {
                        tx_ref,
                        amount: price,
                        currency: "NGN",
                        redirect_url: `http://localhost:3000/flutterwave/payment?amount=${price}&courseId=${courseId}`,
                        customer: {
                          name: userData.firstName,
                          email: userData.email,
                        },
                      }

                      handlePayment(paymentDetails)
                      setConfirmOpen(false)
                      setVerifying(true)
                    }
                  : () => {
                      setVerifying(true)
                      setConfirmOpen(false)
                      handleFreeEnroll()
                    }
              }
              disabled={verifying}
            >
              {verifying ? "Processing..." : "Confirm Enrollment"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  )
}
