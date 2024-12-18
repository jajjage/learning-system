"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

type PaymentStatus = "initializing" | "verifying" | "success" | "error"

const PaymentSuccessPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tx_ref = searchParams.get("tx_ref") || ""
  const transaction_id = searchParams.get("transaction_id") || ""
  const amount = searchParams.get("amount") || ""
  const courseId = searchParams.get("courseId") || ""

  const [paymentStatus, setPaymentStatus] =
    useState<PaymentStatus>("initializing")
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [numericAmount, setNumericAmount] = useState<number | null>(null)
  const [verificationAttempts, setVerificationAttempts] = useState(0)
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
      // Don't show error immediately, wait a bit
      const timer = setTimeout(() => {
        if (paymentStatus === "initializing") {
          setPaymentStatus("error")
          setErrorMessage("Missing required payment parameters")
        }
      }, 3000) // Wait 3 seconds before showing missing parameters error

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

        const response = await fetch(
          `/api/flutterwave/verify?tx_ref=${tx_ref}&transaction_id=${transaction_id}&amount=${numericAmount}`,
          {
            headers: {
              Accept: "application/json",
            },
          },
        )

        const contentType = response.headers.get("content-type")
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Invalid response format from server")
        }

        const data = await response.json()

        if (response.ok && data.status === "success") {
          setPaymentStatus("success")
          router.push(`/paid/${courseId}`)
        } else {
          // If verification fails, try again after delay
          if (verificationAttempts < MAX_ATTEMPTS - 1) {
            setVerificationAttempts((prev) => prev + 1)
            setTimeout(verifyPayment, VERIFICATION_DELAY)
          } else {
            setPaymentStatus("error")
            setErrorMessage(data.message || "Payment verification failed")
          }
        }
      } catch (error) {
        // If there's an error, try again after delay
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

    // Start verification with initial delay
    const initialTimer = setTimeout(verifyPayment, 1000) // Wait 1 second before first attempt

    return () => clearTimeout(initialTimer)
  }, [tx_ref, transaction_id, numericAmount, verificationAttempts])

  const renderContent = () => {
    switch (paymentStatus) {
      case "initializing":
      case "verifying":
        return (
          <Alert className="bg-blue-50">
            <AlertTitle>Verifying Payment</AlertTitle>
            <AlertDescription>
              <div className="flex flex-col items-center space-y-4">
                <p>Please wait while we verify your payment...</p>
                {verificationAttempts > 0 && (
                  <p className="text-sm text-gray-600">
                    Verification attempt {verificationAttempts + 1} of{" "}
                    {MAX_ATTEMPTS}
                  </p>
                )}
                <div className="w-6 h-6 border-t-2 border-blue-500 rounded-full animate-spin"></div>
              </div>
            </AlertDescription>
          </Alert>
        )

      case "success":
        return (
          <Alert className="bg-green-50">
            <AlertTitle>Payment Successful</AlertTitle>
            <AlertDescription>
              <div className="flex flex-col items-center">
                <p>Your payment has been verified successfully.</p>
              </div>
            </AlertDescription>
          </Alert>
        )

      case "error":
        return (
          <Alert variant="destructive">
            <AlertTitle>Payment Verification Failed</AlertTitle>
            <AlertDescription>
              <div className="flex flex-col items-center">
                <p>{errorMessage}</p>
                <button
                  onClick={() => router.push("/payment")}
                  className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Try Again
                </button>
              </div>
            </AlertDescription>
          </Alert>
        )
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Payment Status</h1>
      {renderContent()}
    </div>
  )
}

export default PaymentSuccessPage
