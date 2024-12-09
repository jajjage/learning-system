"use client"

import { useState, useCallback, useEffect } from "react"
import { useSignUp } from "@clerk/nextjs"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "react-hot-toast"
import { onSignUpUser } from "@/actions/auth"
import { Role } from "@prisma/client"

export function useCustomSignUp() {
  const [isLoading, setIsLoading] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSubmit = async (data: {
    firstName: string
    lastName: string
    email: string
    password: string
  }) => {
    if (!isLoaded) return
    setIsLoading(true)

    try {
      await signUp.create({
        firstName: data.firstName,
        lastName: data.lastName,
        emailAddress: data.email,
        password: data.password,
      })

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" })
      setVerifying(true)
    } catch (err: any) {
      if (err.errors[0].code === "form_identifier_exists") {
        toast.error(
          "An account with this email already exists. Redirecting to sign-in...",
        )
        router.push("/sign-in")
      } else {
        toast.error(err.errors[0].message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
  }

  const handleVerify = useCallback(async () => {
    if (!isLoaded) return
    setIsLoading(true)

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: otp.join(""),
      })

      if (completeSignUp.status !== "complete") {
        console.log(JSON.stringify(completeSignUp, null, 2))
        throw new Error("Unable to complete sign up")
      }

      await setActive({ session: completeSignUp.createdSessionId })

      const role = searchParams.get("role")
      const selectedRole =
        role === "STUDENT" || role === "TEACHER" ? role : Role.STUDENT

      console.log(role)
      const result = await onSignUpUser({
        firstName: signUp.firstName ?? "",
        lastName: signUp.lastName ?? "",
        email: signUp.emailAddress ?? "",
        role: selectedRole,
        clerkId: completeSignUp.createdUserId ?? "",
      })
      if (result.success && result.status === 200) {
        if (result.user?.role === "TEACHER") {
          toast.success(`User created as ${result.user?.role} successfully`)
          router.push("/teacher/courses")
        } else {
          toast.success(`User created as ${result.user?.role} successfully`)
          router.push("/dashboard")
        }
      } else {
        toast.error(
          "Failed to create user in database. Please contact support.",
        )
      }
    } catch (err: any) {
      if (err.errors?.[0]?.code === "session_exists") {
        router.push("/dashboard") // or to a page explaining the situation
      } else if (err.errors?.[0]?.code === "form_code_incorrect") {
        toast.error("Incorrect verification code. Please try again.")
        setOtp(["", "", "", "", "", ""]) // Reset OTP input
        return // Prevent further processing
      } else {
        toast.error(
          err.errors?.[0]?.message || "An error occurred during verification.",
        )
      }
    } finally {
      setIsLoading(false)
    }
  }, [isLoaded, signUp, otp, setActive, router])

  return {
    isLoading,
    verifying,
    setVerifying,
    otp,
    setOtp,
    isLoaded,
    handleSubmit,
    handleVerify,
    handleOtpChange,
  }
}
