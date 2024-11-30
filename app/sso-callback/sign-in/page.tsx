import { auth, currentUser } from "@clerk/nextjs/server"
import SignInCompletionClient from "@/app/(auth)/_components/SignInCompletionClient"
import { onSignInUser } from "@/actions/auth"

const SignInCompletionPage = async () => {
  try {
    // Get the userId from auth() -- if null, the user is not signed in
    const { userId } = await auth()

    if (!userId) {
      throw new Error("No user found")
    }

    const userData = {
      clerkId: userId,
      // Add any other fields you want to pass
    }

    const result = await onSignInUser(userData)

    if (result.status === 200) {
      return <SignInCompletionClient isNewUser={result.isNewUser ?? false} />
    } else {
      throw new Error(result?.message || "Failed to process user data")
    }
  } catch (error) {
    console.error("Error during user processing:", error)
    return (
      <SignInCompletionClient
        error="An error occurred. Please try again."
        isNewUser={false}
      />
    )
  }
}

export default SignInCompletionPage
