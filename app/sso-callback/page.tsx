
import { AuthenticateWithRedirectCallback } from "@clerk/nextjs"
import { Spinner } from '@/components/ui/spinner'

const InitialCallbackPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Spinner className="mb-4" />
      <p className="text-lg text-gray-600 mb-4">Completing authentication...</p>
      <AuthenticateWithRedirectCallback 
        signInFallbackRedirectUrl="/sso-callback/sign-in"
        signUpFallbackRedirectUrl="/sso-callback/complete"
      />
    </div>
  )
}

export default InitialCallbackPage

