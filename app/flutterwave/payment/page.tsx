"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useEnrollment } from "@/hooks/use-enrollment"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Loader2, CheckCircle, XCircle } from "lucide-react"

type PaymentStatus = "initializing" | "verifying" | "success" | "error"

const PaymentSuccessPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tx_ref = searchParams.get("tx_ref") || ""
  const transaction_id = searchParams.get("transaction_id") || ""
  const amount = searchParams.get("amount") || ""
  const courseId = searchParams.get("courseId") || ""

  const { enrollInCourse, purchaseCourse } = useEnrollment(courseId)
  const [paymentStatus, setPaymentStatus] =
    useState<PaymentStatus>("initializing")
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [numericAmount, setNumericAmount] = useState<number | null>(null)
  const [verificationAttempts, setVerificationAttempts] = useState(0)
  const [progress, setProgress] = useState(0)
  const MAX_ATTEMPTS = 3
  const VERIFICATION_DELAY = 2000 // 2 seconds delay between attempts

  useEffect(() => {
    if (amount) {
      const parsedAmount = parseFloat(amount)
      if (!isNaN(parsedAmount)) {
        setNumericAmount(parsedAmount)
      } else {
        setPaymentStatus("error")
        setErrorMessage("Invalid amount provided")
      }
    }
  }, [amount])

  useEffect(() => {
    if (!tx_ref || !transaction_id || numericAmount === null) {
      const timer = setTimeout(() => {
        if (paymentStatus === "initializing") {
          setPaymentStatus("error")
          setErrorMessage("Missing required payment parameters")
        }
      }, 3000)

      return () => clearTimeout(timer)
    }

    const verifyPayment = async () => {
      if (verificationAttempts >= MAX_ATTEMPTS) {
        setPaymentStatus("error")
        setErrorMessage("Maximum verification attempts reached")
        return
      }

      try {
        setPaymentStatus("verifying")
        setProgress((verificationAttempts + 1) * (100 / MAX_ATTEMPTS))

        const response = await fetch(
          `/api/flutterwave/verify?tx_ref=${tx_ref}&transaction_id=${transaction_id}&amount=${numericAmount}`,
          { headers: { Accept: "application/json" } },
        )

        const contentType = response.headers.get("content-type")
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Invalid response format from server")
        }

        const data = await response.json()

        if (response.ok && data.status === "success") {
          try {
            await enrollInCourse({ status: "PENDING" })
            await purchaseCourse(courseId)
            setPaymentStatus("success")
            setTimeout(() => router.push(`/learn/course/${courseId}`), 2000)
          } catch (error) {
            if (
              error instanceof Error &&
              error.message.includes("already enrolled")
            ) {
              setPaymentStatus("error")
              setErrorMessage("You're already enrolled in this course")
            } else {
              throw error
            }
          }
        } else {
          if (verificationAttempts < MAX_ATTEMPTS - 1) {
            setVerificationAttempts((prev) => prev + 1)
            setTimeout(verifyPayment, VERIFICATION_DELAY)
          } else {
            setPaymentStatus("error")
            setErrorMessage(data.message || "Payment verification failed")
          }
        }
      } catch (error) {
        if (verificationAttempts < MAX_ATTEMPTS - 1) {
          setVerificationAttempts((prev) => prev + 1)
          setTimeout(verifyPayment, VERIFICATION_DELAY)
        } else {
          setPaymentStatus("error")
          setErrorMessage(
            error instanceof Error
              ? error.message
              : "An unexpected error occurred while verifying payment",
          )
        }
      }
    }

    const initialTimer = setTimeout(verifyPayment, 1000)

    return () => clearTimeout(initialTimer)
  }, [
    tx_ref,
    transaction_id,
    numericAmount,
    verificationAttempts,
    courseId,
    enrollInCourse,
    purchaseCourse,
    router,
  ])

  const renderContent = () => {
    switch (paymentStatus) {
      case "initializing":
      case "verifying":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <Loader2 className="w-12 h-12 animate-spin text-primary" />
            </div>
            <Progress value={progress} className="w-full" />
            <p className="text-center text-sm text-muted-foreground">
              Verifying payment... Attempt {verificationAttempts + 1} of{" "}
              {MAX_ATTEMPTS}
            </p>
          </div>
        )

      case "success":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
            <p className="text-center">
              Your payment has been verified successfully.
            </p>
            <p className="text-center text-sm text-muted-foreground">
              Redirecting you to the course...
            </p>
          </div>
        )

      case "error":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <XCircle className="w-12 h-12 text-red-500" />
            </div>
            <p className="text-center">{errorMessage}</p>
            <div className="flex justify-center">
              <Button
                onClick={() => router.push("/payment")}
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
            Payment Verification
          </CardTitle>
        </CardHeader>
        <CardContent>{renderContent()}</CardContent>
      </Card>
    </div>
  )
}

export default PaymentSuccessPage
