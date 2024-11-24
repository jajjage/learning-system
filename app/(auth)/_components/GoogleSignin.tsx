'use client'

import { useState } from 'react'
import { useSignIn } from '@clerk/nextjs'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

export function GoogleSignIn() {
  const [isLoading, setIsLoading] = useState(false)
  const { signIn, isLoaded } = useSignIn()
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleGoogleSignIn = async () => {
    if (!isLoaded) return
    setIsLoading(true)

    try {
      const redirectUrl = searchParams.get('redirect_url')
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: redirectUrl || "/dashboard",
      })
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
      toast.error('Failed to sign in with Google')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isLoaded) {
    return null
  }

  return (
    <Button 
      type="button" 
      onClick={handleGoogleSignIn}
      className="w-full bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <img src="/google-logo.svg" alt="Google logo" className="w-5 h-5 mr-2" />
      )}
      Sign in with Google
    </Button>
  )
}

