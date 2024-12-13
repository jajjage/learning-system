"use client"

import { useState, useCallback } from "react"
import { useSignUp, useSession } from "@clerk/nextjs"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "react-hot-toast"
import { onSignUpUser } from "@/actions/auth"
import { Role } from "@prisma/client"

export function useCustomSignUp() {
  const [isLoading, setIsLoading] = useState(false)
  const [isRole, setIsRole] = useState<Role>("TEACHER")
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
      const result = await signUp.create({
        firstName: data.firstName,
        lastName: data.lastName,
        emailAddress: data.email,
        password: data.password,
      })

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" })
      setVerifying(true)
    } catch (err: any) {
      console.error("Clerk sign-up error:", err)
      if (err.errors?.[0]?.code === "form_identifier_exists") {
        toast.error(
          "An account with this email already exists. Redirecting to sign-in...",
        )
        router.push("/sign-in")
      } else {
        toast.error(
          err.errors?.[0]?.message || "An error occurred during sign up.",
        )
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleOtpChange = useCallback((index: number, value: string) => {
    setOtp((prev) => {
      const newOtp = [...prev]
      newOtp[index] = value
      return newOtp
    })
  }, [])

  const handleVerify = useCallback(async () => {
    if (!isLoaded) return
    setIsLoading(true)

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: otp.join(""),
      })

      if (completeSignUp.status !== "complete") {
        throw new Error("Unable to complete sign up")
      }

      await setActive({ session: completeSignUp.createdSessionId })

      const role = searchParams.get("role")
      const selectedRole =
        role === "STUDENT" || role === "TEACHER" ? role : Role.STUDENT
      setIsRole(selectedRole)
      const result = await onSignUpUser({
        firstName: signUp.firstName ?? "",
        lastName: signUp.lastName ?? "",
        email: signUp.emailAddress ?? "",
        role: selectedRole,
        clerkId: completeSignUp.createdUserId ?? "",
      })

      if (result.success && result.status === 200) {
        toast.success(`user created successfully`)
        router.push(
          result.user?.role === "TEACHER" ? "/teacher/courses" : "/student",
        )
      } else {
        toast.error(
          "Failed to create user in database. Please contact support.",
        )
      }
    } catch (err: any) {
      if (err.errors?.[0]?.code === "form_code_incorrect") {
        toast.error("Incorrect verification code. Please try again.")
        setOtp(["", "", "", "", "", ""])
      } else {
        // toast.error(
        //   err.errors?.[0]?.message || "An error occurred during verification.",
        // )
      }
    } finally {
      setIsLoading(false)
    }
  }, [isLoaded, signUp, otp, setActive, router, searchParams])

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
