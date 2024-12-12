"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "react-hot-toast"
import { Spinner } from "@/components/ui/spinner"

interface SignInCompletionClientProps {
  isNewUser: boolean
  error?: string
  role: "TEACHER" | "STUDENT"
}

export default function SignInCompletionClient({
  isNewUser,
  error,
  role,
}: SignInCompletionClientProps) {
  const router = useRouter()
  const [redirectUrl, setRedirectUrl] = useState(false) // Default value

  const [urlName, setUrlName] = useState("/") // Default extracted name

  useEffect(() => {
    // Retrieve the redirect URL from localStorage
    const redirectUrl = localStorage.getItem("redirectUrl")

    if (redirectUrl) {
      // Redirect to the stored URL if it exists
      setRedirectUrl(true)
      window.location.href = redirectUrl
      // Optionally remove the redirect URL from localStorage after redirecting
      localStorage.removeItem("redirectUrl")
    } else {
      // If no redirect URL is found, redirect to a fallback URL
      setRedirectUrl(false)
    }
  }, [])

  useEffect(() => {
    if (error) {
      toast.error(error)
      router.push("/sign-in")
    } else {
      if (isNewUser) {
        if (role === "TEACHER") {
          if (redirectUrl) {
            toast.success("account created successfully")
          } else {
            toast.success("account created successfully")
            router.push("/teacher")
          }
        } else {
          if (redirectUrl) {
            toast.success("account created successfully")
          } else {
            toast.success("account created successfully")
            router.push("/student")
          }
        }
      } else {
        if (role === "TEACHER") {
          if (redirectUrl) {
            toast.success("Welcome back")
          } else {
            toast.success("Welcome back")
            router.push("/teacher")
          }
        } else {
          if (redirectUrl) {
            toast.success("Welcome back")
          } else {
            toast.success("Welcome back")
            router.push("/student")
          }
        }
      }
    }
  }, [isNewUser, error, router])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Spinner className="mb-4" />
      <p className="text-lg text-gray-600">
        {error
          ? "Redirecting to sign-in..."
          : `Redirecting to ${urlName === "/" ? "...." : urlName}...`}
      </p>
    </div>
  )
}
