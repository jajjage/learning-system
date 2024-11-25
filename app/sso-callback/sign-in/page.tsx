import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs/server"
import { onSignInUser } from '@/actions/auth'
import SignInCompletionClient from "@/app/(auth)/_components/SignInCompletionClient"


const SignInCompletionPage = async () => {
  try {
    const user = await currentUser()

    if (!user) {
      throw new Error('No user found')
    }

    const userData = {
      clerkId: user.id,
      email: user.emailAddresses[0]?.emailAddress ?? '',
      firstName: user.firstName ?? '',
      lastName: user.lastName ?? '',
      // Add any other fields you want to pass
    }

    const result = await onSignInUser(userData)
    
    if (result.success) {
      return <SignInCompletionClient isNewUser={result.isNewUser ?? false} />
    } else {
      throw new Error(result.error || 'Failed to process user data')
    }
  } catch (error) {
    console.error('Error during user processing:', error)
    return <SignInCompletionClient error="An error occurred. Please try again." isNewUser={false} />
  }
}

export default SignInCompletionPage

