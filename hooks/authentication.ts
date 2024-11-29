import { useSignIn, useSignUp } from "@clerk/nextjs"
import { OAuthStrategy } from "@clerk/types"
import { useState } from "react"

export const useGoogleAuth = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { signIn, isLoaded: LoadedSignIn } = useSignIn()
  const { signUp, isLoaded: LoadedSignUp } = useSignUp()

  const signInWith = (strategy: OAuthStrategy) => {
    if (!LoadedSignIn) return
    setIsLoading(true)
    try {
      return signIn.authenticateWithRedirect({
        strategy,
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/sso-callback/sign-in",
      })
    } catch (error) {
      console.error(error)
    }
  }

  const signUpWith = (strategy: OAuthStrategy) => {
    if (!LoadedSignUp) return
    setIsLoading(true)
    try {
      return signUp.authenticateWithRedirect({
        strategy,
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/sso-callback/complete",
      })
    } catch (error) {
      console.error(error)
    }
  }

  return { signUpWith, signInWith, isLoading }
}