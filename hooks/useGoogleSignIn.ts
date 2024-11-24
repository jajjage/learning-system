'use client'

import { useState } from 'react'
import { useSignIn, useSignUp } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

export function useGoogleSignIn() {
  const [isLoading, setIsLoading] = useState(false)
  const { signIn, isLoaded: isSignInLoaded } = useSignIn()
  const { signUp, isLoaded: isSignUpLoaded } = useSignUp()
  const router = useRouter()

  const handleGoogleSignIn = async () => {
    if (!isSignInLoaded || !isSignUpLoaded) return
    setIsLoading(true)

    try {
      const result = await signIn.authenticateWithRedirect({
        strategy: 'oauth_google',
        redirectUrl: '/sso-callback',
        redirectUrlComplete: '/dashboard',
      })

      // The user will be redirected to Google for authentication.
      // After successful authentication, they'll be redirected back to your app.
      // The actual sign-in/sign-up logic will be handled in the /sso-callback route.

    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
      toast.error('An error occurred during Google sign-in. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return { handleGoogleSignIn, isLoading }
}

