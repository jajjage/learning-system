"use client"

import { Button } from "@/components/ui/button"
import { useGoogleAuth } from "@/hooks/authentication"
import { FcGoogle } from "react-icons/fc"
import { Loader2 } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { Role } from "@prisma/client"
import { NONAME } from "dns"

type GoogleAuthButtonProps = {
  method: "signup" | "signin"
}

export const GoogleAuthButton = ({ method }: GoogleAuthButtonProps) => {
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get("redirect_url") || "/dashboard"
  const roleUrl = searchParams.get("role") || ""
  localStorage.setItem("redirect_url", redirectUrl)
  const { signUpWith, signInWith, isLoading, setRole } = useGoogleAuth()

  useEffect(() => {
    if (roleUrl) {
      const selectedRole = roleUrl === "STUDENT" ? Role.STUDENT : Role.TEACHER
      setRole(selectedRole)
    }
  }, [])

  return (
    <Button
      {...(method === "signin"
        ? {
            onClick: () => signInWith("oauth_google"),
          }
        : {
            onClick: () => signUpWith("oauth_google"),
          })}
      className="w-full rounded-2xl flex gap-3 bg-themeBlack border-themeGray"
      variant="outline"
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <FcGoogle className="w-5 h-5" />
      )}
      <span>{isLoading ? "Please wait" : "Continue with Google"}</span>
    </Button>
  )
}
