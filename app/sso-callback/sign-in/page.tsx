import { currentUser } from "@clerk/nextjs/server"
import SignInCompletionClient from "@/app/(auth)/_components/SignInCompletionClient"
import { onSignInUser } from "@/actions/auth"


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
    
    if (result?.status === 200) {
      return <SignInCompletionClient isNewUser={result.isNewUser ?? false} />
    } else {
      throw new Error(result?.message || 'Failed to process user data')
    }
  } catch (error) {
    console.error('Error during user processing:', error)
    return <SignInCompletionClient error="An error occurred. Please try again." isNewUser={false} />
  }
}

export default SignInCompletionPage

