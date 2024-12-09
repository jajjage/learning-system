import { auth, currentUser } from "@clerk/nextjs/server"
import SignInCompletionClient from "@/app/(auth)/_components/SignInCompletionClient"
import { onAuthenticatedUser, onSignInUser } from "@/actions/auth"
import { User } from "lucide-react"

const SignInCompletionPage = async () => {
  // Get the userId from auth() -- if null, the user is not signed in
  const { user } = await onAuthenticatedUser()

  if (!user?.id) {
    throw new Error("No user found")
  }
  try {
    const result = await onSignInUser({ email: user.email })

    if (result.status === 200) {
      return (
        <SignInCompletionClient
          isNewUser={result.isNewUser ?? false}
          role={user.role}
        />
      )
    } else {
      throw new Error(result?.message || "Failed to process user data")
    }
  } catch (error) {
    console.error("Error during user processing:", error)
    return (
      <SignInCompletionClient
        error="An error occurred. Please try again."
        isNewUser={false}
        role={user.role}
      />
    )
  }
}

export default SignInCompletionPage
