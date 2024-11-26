"use client"

import { Button } from "@/components/ui/button"
import { useGoogleAuth } from "@/hooks/authentication"
import { FcGoogle } from "react-icons/fc"
import { Loader2 } from "lucide-react"
import { useSearchParams } from "next/navigation"

type GoogleAuthButtonProps = {
  method: "signup" | "signin"
}

export const GoogleAuthButton = ({ method }: GoogleAuthButtonProps) => {
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get("redirect_url") || "/dashboard"
  localStorage.setItem("redirect_url", redirectUrl)
  const { signUpWith, signInWith, isLoading } = useGoogleAuth()
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
