import { redirect } from "next/navigation"
import { Role } from "@prisma/client"
import { onSignUpUser } from "@/actions/auth"
import SignInCompletionClient from "@/app/(auth)/_components/SignInCompletionClient"
import { currentUser, auth } from "@clerk/nextjs/server"
import { Suspense } from "react"

// Loading component
const LoadingState = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    <p className="ml-3 text-lg">Completing your registration...</p>
  </div>
)

async function getUserDetailsWithRetry(maxRetries = 3, delayMs = 1000) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const { userId } = await auth()
      if (!userId) {
        if (attempt === maxRetries - 1) {
          throw new Error("No authenticated user found")
        }
        await new Promise((resolve) => setTimeout(resolve, delayMs))
        continue
      }

      const user = await currentUser()
      if (!user) {
        if (attempt === maxRetries - 1) {
          throw new Error("User not found in Clerk")
        }
        await new Promise((resolve) => setTimeout(resolve, delayMs))
        continue
      }

      return {
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.emailAddresses[0]?.emailAddress,
        clerkId: user.id,
      }
    } catch (error) {
      if (attempt === maxRetries - 1) {
        throw error
      }
      await new Promise((resolve) => setTimeout(resolve, delayMs))
    }
  }
  throw new Error("Failed to get user details after maximum retries")
}

interface PageProps {
  searchParams: {
    role?: Role
  }
}

const CompleteOAuthCallback = async ({ searchParams }: PageProps) => {
  try {
    // Validate role parameter
    const role = searchParams.role
    if (!role || !["STUDENT", "TEACHER"].includes(role)) {
      return (
        <div className="p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
          <h2 className="text-lg font-bold mb-2">Invalid Role</h2>
          <p>
            Please select either STUDENT or TEACHER role to complete
            registration.
          </p>
        </div>
      )
    }

    // Get user details with retry mechanism
    const userDetails = await getUserDetailsWithRetry()
    if (!userDetails.email) {
      throw new Error("No email address found for user")
    }

    // Create user in database
    const result = await onSignUpUser({
      firstName: userDetails.firstName,
      lastName: userDetails.lastName ?? " ",
      email: userDetails.email,
      role: role as Role,
      clerkId: userDetails.clerkId,
    })

    // Handle successful creation
    if (result.status === 200) {
      return <SignInCompletionClient isNewUser={result.isNewUser ?? false} />
    }

    // Handle unsuccessful creation
    console.error("User creation failed:", result)
    throw new Error(`User creation failed with status: ${result.status}`)
  } catch (error) {
    console.error("Error in CompleteOAuthCallback:", error)

    // If it's an authentication error, redirect to sign-in
    if ((error as Error).message.includes("No authenticated user")) {
      redirect("/sign-in")
    }

    return (
      <div className="max-w-md mx-auto mt-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
        <h2 className="text-lg font-bold mb-2">Registration Error</h2>
        <p className="mb-4">
          We encountered an error while completing your registration. This might
          be because:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Your session has expired</li>
          <li>There was an issue with your account details</li>
          <li>Our service is temporarily unavailable</li>
        </ul>
        <p className="mt-4">
          Please try signing in again or contact support if the problem
          persists.
        </p>
      </div>
    )
  }
}

// Wrap the main component with Suspense
const CompleteOAuthAfterCallback = (props: PageProps) => (
  <Suspense fallback={<LoadingState />}>
    <CompleteOAuthCallback {...props} />
  </Suspense>
)

export default CompleteOAuthAfterCallback
