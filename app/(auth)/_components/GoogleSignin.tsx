'use client'

import { Button } from '@/components/ui/button'
import { useGoogleSignIn } from '@/hooks/useGoogleSignIn'
import { FcGoogle } from 'react-icons/fc'
import { Loader2 } from 'lucide-react'

export function GoogleSignIn() {
  const { handleGoogleSignIn, isLoading } = useGoogleSignIn()

  return (
    <Button
      variant="outline"
      onClick={handleGoogleSignIn}
      disabled={isLoading}
      className="w-full flex items-center justify-center space-x-2"
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <FcGoogle className="w-5 h-5" />
      )}
      <span>{isLoading ? 'Please wait' : 'Continue with Google'}</span>
    </Button>
  )
}

